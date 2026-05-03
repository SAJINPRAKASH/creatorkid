def find_matching_bracket(content: str, start_idx: int) -> int:
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

content = """
const test = [
    { text: "a string with [ and ] and [ another" }
];
"""
start = content.find('[')
end = find_matching_bracket(content, start)
print(f"Start: {start}, End: {end}")
print(content[start:end+1])
