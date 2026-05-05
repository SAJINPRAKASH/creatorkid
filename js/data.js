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
        title: "afafsfsdf",
        category: "Portrait",
        description: "dadad",
        promptText: `Create a sott, romantic hand-drawn digital illustration of an Indian couple sitting at a café table. The man is smiling warmly at the woman across from him, wearing a teal blue shirt. The woman is seen from behind wearing a teal glittering saree. Minimalist watercolor and ink sketch style, loose expressive line art, soft muted teal and sage green color palette, painterly brush strokes, gentle lighting, intimate mood, cinematic framing, sketchbook aesthetic, dreamy and emotional atmosphere, high detail facial expressions, Instagram art style, 4K quality
WOMEN (Focus on Woman)
Create a soft, romantic hand-drawn digital illustration of an Indian couple sitting at a café table. The woman is scolding the man with a loving, playful smile on her face. The woman is wearing a teal blue glittering saree. The man is seen from behind wearing a teal shirt. Minimalist watercolor and ink sketch style, loose expressive line art, soft muted teal and sage green color palette, painterly brush strokes, gentle lighting, intimate mood, cinematic framing, sketchbook aesthetic, dreamy and emotional atmosphere, high detail facial expressions, Instagram art style, 4K quality`,
        image: "assets/images/687382745_18095615789162816_4390036812084512780_n.jpg"
    },
    {
        id: "CK003",
        title: "men",
        category: "Portrait",
        description: "afdfsdf",
        promptText: "Hyper-realistic overhead 9:16 close-up of myself with glasses, playfully leaning against an ivy-covered stone wall of an old countryside cottage during golden hour. I'm laughing with my head slightly tilted back, one hand brushing away a dangling vine, wearing a textured earth-tone knit sweater layered over a soft white t-shirt. The flowering vines are in full bloom with orange, magenta, and lavender hues, softly blurred in the foreground.",
        image: "assets/images/548773615_18525925240010287_4350285369306324642_n.jpg"
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
