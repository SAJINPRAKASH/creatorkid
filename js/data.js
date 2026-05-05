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
        image: "assets/images/ChatGPT Image May 5, 2026, 10_13_25 AM.png"
    },
    {
        id: "CK005",
        title: "Graceful Saree Twirl Portrait",
        category: "Portrait",
        description: "A radiant young woman mid-twirl on sunlit steps, her flowing hair and ivory saree catching warm light as she smiles with effortless elegance.",
        promptText: "Use uploaded image create a portrait of a smiling young woman in mid-twirl walking down sunlit stone steps, three-quarter turn torward the camera, long wavy hair flowing with motion and warm rim light highlighting the strands; she wears and elegant ivory saree with delicate silver brocade border and subtle paisley motifs, paired with a fitted silver blouse, traditional jhumka earrings, simple necklace, stacked gold bangles and a smile bindi, natural glowing makeup and soft smile conveying grace 1/2",
        image: "assets/images/ChatGPT Image May 5, 2026, 10_16_35 AM.png"
    },
    {
        id: "CK006",
        title: "Raw Identity Close-Up Portrait",
        category: "Portrait",
        description: "An ultra-realistic upward-angled close-up capturing untouched facial detail, with flowing black hair casting shadows and a subtle traditional elegance.",
        promptText: "Preserve the original person’s identity with extreme accuracy (100% likeness to the reference image). The face must remain exactly the same as the reference image, including real facial structure, proportions, skin tone, eyes, nose, lips, jawline, hairline, and all natural details. Do not alter, beautify, stylize, enhance, or modify the face in any way. No symmetry correction, no smoothing, no reshaping, no AI-like skin. The output must look like the same real person from the reference image. Apply the following style: An extreme close-up headshot, angled slightly upwards from eye-level, focusing on the subject's face from mid-forehead to just below the lips, with parts of the shoulders and collarbone visible on the lower left. Apply a slender and delicate build to the subject. The subject's head is tilted significantly towards their right (viewer’s left) and slightly backward with their gaze directed upwards and slightly to their left (viewer’s right), looking directly into the camera from this tilted angle. Long, pure black hair, natural and deep in tone, falls forward across the face in numerous strands, creating intricate shadow patterns over the eyes, nose, and forehead. The hair appears slightly textured and disheveled, yet styled to frame the face. The subject is wearing a sleeveless white lehenga blouse, minimal and elegant in appearance, with a simple chain on the neck. A small black bindi is placed at the center of the forehead, clearly visible and naturally integrated. Lighting is natural and soft with cinematic depth, emphasizing real skin texture and facial detail. Maintain a highly realistic, non-stylized photographic finish.",
        image: "assets/images/ChatGPT Image May 5, 2026, 10_23_11 AM.png"
    },
    {
        id: "CK007",
        title: "Dreamy Dandelion Gaze Portrait",
        category: "Portrait",
        description: "A natural outdoor close-up of a smiling woman gently gazing at a delicate dandelion seed above her palm, captured with soft cinematic realism.",
        promptText: `Preserve the original person’s identity exactly as in the reference image, with 100% accuracy. Do not change face shape, skin tone, features, or expression. No beautification, smoothing, or AI enhancement.
Create a cinematic outdoor portrait in a green natural background with soft blur. Frame is medium close-up from forehead to collarbone, with the subject slightly turned left in a gentle side pose. She has a natural bright smile and a calm, dreamy expression, looking at a floating object above her open palm.
Above her hand is a realistic dandelion seed (അപ്പൂപ്പൻതാടി) with a small brown center and fine white fibers, light and natural, no glow or fantasy effect.
She wears a black sleeveless V-neck top, gold round earrings, black and red bangles, a simple chain, and a small black bindi. Long black wavy hair flows naturally with a few loose strands.`,
        image: "assets/images/ChatGPT Image May 5, 2026, 10_26_24 AM.png"
    },
    {
        id: "CK008",
        title: "Bold Garage Bike Racer Portrait",
        category: "Portrait",
        description: "A moody full-body portrait of a young woman leaning against a chrome Royal Enfield cafe racer in a gritty parking garage, styled with edgy streetwear and quiet confidence.",
        promptText: `Photorealistic full-body shot of a young girl of this uploaded picture casually leaning against a classic A Royal Enfield Continental GT 650 cafe racer motorcycle in the "Mister Clean" finish. The bike features a highly reflective, polished chrome fuel tank with gold pinstriping and the classic Royal Enfield badge. It has a flat black cafe racer bench seat, black side panels with gold detailing, and a black tubular frame. The exposed twin-cylinder engine features polished chrome side casings and black cooling fins, leading into dual chrome upswept exhaust pipes on either side. It is equipped with wire-spoke wheels featuring black rims, black clip-on handlebars with round bar-end mirrors, a classic round headlight with amber turn signals, and black front and rear fenders black and chrome motorcycle.

She is wearing a black hoodie with white flame graphics, loose light blue jeans, and white sneakers. The setting is an indoor concrete parking garage with white pillars, corrugated metal walls, and a red "EXIT" sign in the background. She has a moody bold expression. She has a ponytail with a few sleek strands falling across the front. Makeup is soft and glowy with prominent rosy blush and matching nude lips.`,
        image: "assets/images/ChatGPT Image May 5, 2026, 10_30_17 AM.png"
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
