// Central Data Store for CreatorKid

const prompts = [
    {
        id: "CK001",
        title: "A Dreamy Watercolor Embrace",
        category: "Portrait",
        description: "Dreamy watercolor couple, soft strokes, magenta dress, vintage backdrop, minimal frame.",
        promptText: `A romantic impressionist watercolor painting of a young couple standing close together in an
intimate pose. The girl has long dark flowing hair with a small purple flower tucked near her ear,
wearing a bright magenta dress that softly blends into the watercolor texture. The boy is dressed in
a simple white shirt. The painting style is loose, blurry, and emotional, with soft brush strokes,
smudged edges, and a dreamy unfinished look. The watercolor effect should feel expressive and
fluid, with gentle color bleeding and natural paper texture visible. Background is minimal — plain
textured beige paper like vintage parchment, with large empty negative space above the couple.
The couple is positioned at the bottom-right corner of the frame, leaving wide space for text. Soft
pastel watercolor splashes in purple and pink appear subtly around the edges.`,
        image: "assets/images/Gemini_Generated_Image_k52ar9k52ar9k52a.png"
    },
    {
        id: "CK002",
        title: "Playful Love in Teal",
        category: "Portrait",
        description: "A dreamy watercolor sketch of a couple in a café, capturing her playful scolding and his quiet smile in an intimate, teasing moment.",
        promptText: `Create a sott, romantic hand-drawn digital illustration of an Indian couple sitting at a café table. The man is smiling warmly at the woman across from him, wearing a teal blue shirt. The woman is seen from behind wearing a teal glittering saree. Minimalist watercolor and ink sketch style, loose expressive line art, soft muted teal and sage green color palette, painterly brush strokes, gentle lighting, intimate mood, cinematic framing, sketchbook aesthetic, dreamy and emotional atmosphere, high detail facial expressions, Instagram art style, 4K quality
WOMEN (Focus on Woman)
Create a soft, romantic hand-drawn digital illustration of an Indian couple sitting at a café table. The woman is scolding the man with a loving, playful smile on her face. The woman is wearing a teal blue glittering saree. The man is seen from behind wearing a teal shirt. Minimalist watercolor and ink sketch style, loose expressive line art, soft muted teal and sage green color palette, painterly brush strokes, gentle lighting, intimate mood, cinematic framing, sketchbook aesthetic, dreamy and emotional atmosphere, high detail facial expressions, Instagram art style, 4K quality`,
        image: "assets/images/ChatGPT Image May 5, 2026, 09_50_26 AM.png"
    },
    {
        id: "CK003",
        title: "Golden Hour Joy",
        category: "Portrait",
        description: "A carefree smile captured against a blooming ivy wall, glowing in warm sunset light.",
        promptText: "Hyper-realistic overhead 9:16 close-up of myself with glasses, playfully leaning against an ivy-covered stone wall of an old countryside cottage during golden hour. I'm laughing with my head slightly tilted back, one hand brushing away a dangling vine, wearing a textured earth-tone knit sweater layered over a soft white t-shirt. The flowering vines are in full bloom with orange, magenta, and lavender hues, softly blurred in the foreground.",
        image: "assets/images/ChatGPT Image May 5, 2026, 09_52_56 AM.png"
    },
    {
        id: "CK004",
        title: "Ethereal Indian Portrait Collage",
        category: "Portrait",
        description: "A cinematic black-and-white collage capturing a serene side profile and an intense gaze of a traditionally dressed Indian woman with soft elegance.",
        promptText: `Ultra-realistic black and white cinematic portrait collage of a young Indian woman. Traditional elegant look with soft natural beauty. She has long dark hair, small bindi on forehead, and is wearing ethnic outfit with detailed embroidery.
Frame 1 (top): close-up side profile with eyes closed, soft smile, calm peaceful expression, soft diffused lighting.
Frame 2 (middle): intense eye-level close-up, looking directly at camera, partially covering face with embroidered dupatta, focus on expressive eyes.`,
        image: "assets/images/ChatGPT Image May 5, 2026, 10_00_48 AM.png"
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
