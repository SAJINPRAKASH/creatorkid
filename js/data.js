// Central Data Store for CreatorKid

const prompts = [
    {
        id: "CK001",
        title: "",
        category: "Portrait",
        description: "",
        promptText: `Create a sott, romantic hand-drawn digital illustration of an Indian couple sitting at a café table. The man is smiling warmly at the woman across from him, wearing a teal blue shirt. The woman is seen from behind wearing a teal glittering saree. Minimalist watercolor and ink sketch style, loose expressive line art, soft muted teal and sage green color palette, painterly brush strokes, gentle lighting, intimate mood, cinematic framing, sketchbook aesthetic, dreamy and emotional atmosphere, high detail facial expressions, Instagram art style, 4K quality
WOMEN (Focus on Woman)
Create a soft, romantic hand-drawn digital illustration of an Indian couple sitting at a café table. The woman is scolding the man with a loving, playful smile on her face. The woman is wearing a teal blue glittering saree. The man is seen from behind wearing a teal shirt. Minimalist watercolor and ink sketch style, loose expressive line art, soft muted teal and sage green color palette, painterly brush strokes, gentle lighting, intimate mood, cinematic framing, sketchbook aesthetic, dreamy and emotional atmosphere, high detail facial expressions, Instagram art style, 4K quality`,
        image: ""
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
