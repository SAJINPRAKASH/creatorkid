// Central Data Store for CreatorKid

const prompts = [
    {
        id: "CK001",
        title: "remo",
        category: "Portrait",
        description: "",
        promptText: `A romantic impressionist watercolor painting of a young couple standing close together in an
intimate pose. The girl has long dark flowing hair with a small purple flower tucked near her ear,
wearing a bright magenta dress that softly blends into the watercolor texture. The boy is dressed in
a simple white shirt. The painting style is loose, blurry, and emotional, with soft brush strokes,
smudged edges, and a dreamy unfinished look. The watercolor effect should feel expressive and
fluid, with gentle color bleeding and natural paper texture visible. Background is minimal — plain
textured beige paper like vintage parchment, with large empty negative space above the couple.
The couple is positioned at the bottom-right corner of the frame, leaving wide space for text. Soft
pastel watercolor splashes in purple and pink appear subtly around the edges.`,
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
