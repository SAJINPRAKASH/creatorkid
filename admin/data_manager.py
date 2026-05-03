import json
import re
from pathlib import Path
from typing import Dict, List, Any
import shutil
from datetime import datetime
from config import DATA_FILE, IMAGES_DIR, DOWNLOADS_DIR

class DataManager:
    """Manages reading and writing data to the JS data file"""
    
    def __init__(self):
        self.data_file = DATA_FILE
        self.images_dir = IMAGES_DIR
        self.downloads_dir = DOWNLOADS_DIR
        
    def read_js_file(self) -> Dict[str, Any]:
        """Read the data.js file and extract JavaScript objects as Python dicts"""
        try:
            with open(self.data_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract each const variable
            data = {}
            
            # Extract prompts
            data['prompts'] = self._extract_array(content, 'const prompts')
            # Extract resources
            data['resources'] = self._extract_array(content, 'const resources')
            # Extract aiTools
            data['aiTools'] = self._extract_array(content, 'const aiTools')
            # Extract blogPosts
            data['blogPosts'] = self._extract_array(content, 'const blogPosts')
            
            return data
        except Exception as e:
            print(f"Error reading JS file: {e}")
            return {'prompts': [], 'resources': [], 'aiTools': [], 'blogPosts': []}
    
    def _extract_array(self, content: str, pattern: str) -> List[Dict]:
        """Extract a JavaScript array from content"""
        try:
            # Find the starting position
            start_idx = content.find(pattern)
            if start_idx == -1:
                return []
            
            # Find the opening bracket
            bracket_start = content.find('[', start_idx)
            if bracket_start == -1:
                return []
            
            # Find the closing bracket (accounting for strings and nesting)
            bracket_end = self._find_matching_bracket(content, bracket_start)
            if bracket_end == -1:
                return []
            
            # Extract the array content
            array_str = content[bracket_start:bracket_end + 1]
            
            # Convert JavaScript object notation to JSON
            json_str = self._js_to_json(array_str)
            
            return json.loads(json_str)
        except Exception as e:
            print(f"Error extracting array: {e}")
            return []
    
    def _js_to_json(self, js_str: str) -> str:
        """Convert JavaScript object notation to JSON"""
        # Step 1: Extract all string literals (backtick, double-quote, single-quote)
        # to protect their contents from regex transformations.
        placeholders = {}
        counter = [0]

        def extract_string(m):
            key = f'__STR{counter[0]}__'
            counter[0] += 1
            raw = m.group(0)
            if raw.startswith('`'):
                inner = raw[1:-1]
                # Escape backslashes, double-quotes, newlines, and carriage returns inside for JSON
                inner = inner.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r')
                placeholders[key] = f'"{inner}"'
            elif raw.startswith("'"):
                inner = raw[1:-1]
                # Convert single quotes to double quotes, so unescape single quotes and escape double quotes
                inner = inner.replace("\\'", "'").replace('"', '\\"')
                placeholders[key] = f'"{inner}"'
            else:
                placeholders[key] = raw
            return key

        # Match backtick strings, double-quoted strings, single-quoted strings
        pattern = r'`[^`\\]*(?:\\.[^`\\]*)*`|"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\''
        js_str = re.sub(pattern, extract_string, js_str, flags=re.DOTALL)

        # Step 2: Remove trailing commas
        json_str = re.sub(r',\s*}', '}', js_str)
        json_str = re.sub(r',\s*]', ']', json_str)

        # Step 3: Add quotes to unquoted object keys
        json_str = re.sub(r'([{,]\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', json_str)

        # Step 4: Re-insert placeholders (restore string literals)
        for ph, val in placeholders.items():
            json_str = json_str.replace(ph, val)

        return json_str
    
    def write_js_file(self, data: Dict[str, List[Dict]]) -> bool:
        """Write data back to the JS file"""
        try:
            # Read the original file to preserve comments and structure
            with open(self.data_file, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Replace each section
            content = original_content
            
            for section_name, items in data.items():
                content = self._replace_array_in_content(
                    content, 
                    f'const {section_name}',
                    items
                )
            
            # Write back to file
            with open(self.data_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            return True
        except Exception as e:
            print(f"Error writing JS file: {e}")
            return False
    
    def _replace_array_in_content(self, content: str, pattern: str, items: List[Dict]) -> str:
        """Replace a specific array in the content"""
        try:
            # Find the starting position
            start_idx = content.find(pattern)
            if start_idx == -1:
                return content
            
            # Find the opening bracket
            bracket_start = content.find('[', start_idx)
            if bracket_start == -1:
                return content
            
            # Find the closing bracket
            bracket_end = self._find_matching_bracket(content, bracket_start)
            if bracket_end == -1:
                return content
            
            # Format the new array
            new_array = self._format_array(items)
            
            # Replace
            return content[:bracket_start] + new_array + content[bracket_end + 1:]
        except Exception as e:
            print(f"Error replacing array: {e}")
            return content
    
    def _format_array(self, items: List[Dict]) -> str:
        """Format a Python list as JavaScript array"""
        if not items:
            return "[\n]"
        
        formatted_items = []
        
        for item in items:
            lines = ["    {"]
            keys = list(item.items())
            
            for idx, (key, value) in enumerate(keys):
                is_last = (idx == len(keys) - 1)
                comma = "" if is_last else ","
                
                if isinstance(value, str):
                    # Handle multi-line strings
                    if '\n' in value:
                        lines.append(f'        {key}: `{value}`{comma}')
                    else:
                        # Escape quotes in string values
                        escaped_value = value.replace('"', '\\"')
                        lines.append(f'        {key}: "{escaped_value}"{comma}')
                elif isinstance(value, bool):
                    lines.append(f'        {key}: {str(value).lower()}{comma}')
                elif isinstance(value, (int, float)):
                    lines.append(f'        {key}: {value}{comma}')
                elif isinstance(value, dict):
                    lines.append(f'        {key}: {json.dumps(value)}{comma}')
                else:
                    lines.append(f'        {key}: {json.dumps(value)}{comma}')
            
            lines.append("    }")
            formatted_items.append("\n".join(lines))
        
        return "[\n" + ",\n".join(formatted_items) + "\n]"
    
    def add_item(self, section: str, item: Dict[str, Any]) -> bool:
        """Add a new item to a section"""
        try:
            data = self.read_js_file()
            if section in data:
                data[section].append(item)
                return self.write_js_file(data)
            return False
        except Exception as e:
            print(f"Error adding item: {e}")
            return False
    
    def update_item(self, section: str, item_id: str, updated_item: Dict[str, Any]) -> bool:
        """Update an existing item"""
        try:
            data = self.read_js_file()
            if section in data:
                for i, item in enumerate(data[section]):
                    if item.get('id') == item_id:
                        data[section][i] = updated_item
                        return self.write_js_file(data)
            return False
        except Exception as e:
            print(f"Error updating item: {e}")
            return False
    
    def delete_item(self, section: str, item_id: str) -> bool:
        """Delete an item from a section"""
        try:
            data = self.read_js_file()
            if section in data:
                data[section] = [item for item in data[section] if item.get('id') != item_id]
                return self.write_js_file(data)
            return False
        except Exception as e:
            print(f"Error deleting item: {e}")
            return False
    
    def get_item(self, section: str, item_id: str) -> Dict[str, Any]:
        """Get a single item by ID"""
        try:
            data = self.read_js_file()
            if section in data:
                for item in data[section]:
                    if item.get('id') == item_id:
                        return item
            return {}
        except Exception as e:
            print(f"Error getting item: {e}")
            return {}
    
    def copy_image(self, source_path: str, filename: str) -> bool:
        """Copy an image file to the images directory"""
        try:
            dest_path = self.images_dir / filename
            shutil.copy2(source_path, dest_path)
            return True
        except Exception as e:
            print(f"Error copying image: {e}")
            return False
            
    def copy_file(self, source_path: str, filename: str) -> bool:
        """Copy a general file to the downloads directory"""
        try:
            dest_path = self.downloads_dir / filename
            shutil.copy2(source_path, dest_path)
            return True
        except Exception as e:
            print(f"Error copying file: {e}")
            return False
    
    def delete_image(self, filename: str) -> bool:
        """Delete an image file"""
        try:
            image_path = self.images_dir / filename
            if image_path.exists():
                image_path.unlink()
            return True
        except Exception as e:
            print(f"Error deleting image: {e}")
            return False
    
    def generate_id(self, section: str, prefix: str) -> str:
        """Generate a unique ID for a new item"""
        data = self.read_js_file()
        if section in data:
            existing_ids = [item.get('id', '') for item in data[section]]
            # Extract numbers from IDs
            numbers = []
            for id_str in existing_ids:
                match = re.search(r'\d+', id_str)
                if match:
                    numbers.append(int(match.group()))
            
            if numbers:
                next_num = max(numbers) + 1
            else:
                next_num = 1
            
            return f"{prefix}{next_num:03d}"
        
        return f"{prefix}001"

    def _find_matching_bracket(self, content: str, start_idx: int) -> int:
        """Find the matching closing bracket while ignoring brackets inside strings"""
        bracket_count = 0
        in_string = False
        escape = False
        string_char = ''
        
        for i in range(start_idx, len(content)):
            char = content[i]
            
            if escape:
                escape = False
                continue
                
            if char == '\\':
                escape = True
                continue
                
            if in_string:
                if char == string_char:
                    in_string = False
            else:
                if char in ('"', "'", '`'):
                    in_string = True
                    string_char = char
                elif char == '[':
                    bracket_count += 1
                elif char == ']':
                    bracket_count -= 1
                    if bracket_count == 0:
                        return i
        return -1
