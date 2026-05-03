// Central Data Store for CreatorKid

const prompts = [
    {
        id: "CK001",
        title: "Car Poster",
        category: "Marketing",
        description: "",
        promptText: `Create a portrait ratio premium automotive poster using the uploaded vehicle photo.
Do NOT change the vehicle’s model, shape, or color — only stylize the poster design around it.

STYLE:
- Single-tone color theme based on vehicle paint
- Smooth gradients and soft geometric background
- Minimal, futuristic, premium automotive aesthetic

LAYOUT:

1. Background
- Clean gradient background
- Soft lighting and subtle reflections
- Minimal geometric shapes

2. Giant Vertical Typography
- Large stretched vertical model name behind vehicle
- Bold, dark, slightly transparent
- Top-to-bottom height
- Symmetrical alignment

3. Top Header
- Centered brand mark/logo (generic if unknown)
- Thin spaced typography
- Brand name
- Model name
- No "Designed by"
- No creator credits

4. Hero Vehicle
- Centered composition
- Slight angle
- Studio lighting
- Soft ground shadow
- Enhanced reflections
- Keep vehicle unchanged

5. Middle Section
- Small bold model name
- Short description paragraph
- Thin modern font
- Subtle boxed layout

6. Bottom Specs Row
- Horsepower
- 0–100 acceleration
- Top speed
- Engine/Fuel
- Minimal icons
- Thin dividers
- Clean spacing

7. Design Details
- Subtle watermark model text in background
- Perfect alignment
- Editorial automotive poster style

MOOD:
Premium
Sporty
Futuristic
Clean
High-end brochure style`
    }
];

const resources = [
];

const aiTools = [
];

const blogPosts = [
];

// Combine all items for global search
const allContent = [...prompts, ...resources, ...aiTools, ...blogPosts];
