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
    },
    {
        id: "CK009",
        title: "Golden Ethnic Collage Glow",
        category: "Portrait",
        description: "A dreamy three-frame vertical collage capturing sunlit elegance through flowing hair, expressive portraits, and intricate mehndi details in warm golden tones.",
        promptText: `Aesthetic vertical 9:16 collage portrait of a young South Asian woman in warm golden ethnic attire, captured in three stacked frames with soft natural sunlight casting window shadow patterns on a beige wall. The overall mood is dreamy, editorial, and Pinterest-inspired with a warm golden glow.

In the top frame, a close-up side profile captures the woman adjusting her large traditional jhumka earring with both hands. Her hands are adorned with dark mehndi (henna), and she is wearing multiple gold bangles. Her face is partially hidden, keeping the focus on the hands, jewelry, and natural motion.

In the middle frame, a soft portrait shows the woman facing slightly toward the camera with a gentle, confident smile. Her long, slightly wavy black hair flows naturally across her face. She is wearing heavy gold statement earrings, and the sunlight creates dramatic highlights and soft shadows, enhancing her facial features.

In the bottom frame, a close-up of her hand raised gracefully in sunl ight highlights the intricate mehndi design and stacked gold bangles. Strong window shadow lines fall across her arm and the background, adding depth and visual interest.

The lighting features warm natural sunlight with a golden hour feel, combined with strong geometric window shadow patterns. The background is a soft beige or cream wall, creating a clean and minimal base with a high-contrast interplay of light and shadow.

Styling includes a golden or peach ethnic outfit with subtle embroidery, paired with heavy gold jhumkas and multiple bangles. Her hair is styled loosely with a slightly messy, natural flow, and her makeup is minimal with glowing skin and natural tones. The mood remains candid, soft, and editorial throughout.

The composition follows a vertical 9:16 ratio with three stacked frames in a collage layout. It combines close-up and mid-shot perspectives, focusing on hands, jewelry, and facial expression. The overall style reflects editorial fashion photography with a stro ng aesthetic appeal.`,
        image: "assets/images/ChatGPT Image May 5, 2026, 10_33_30 AM.png"
    },
    {
        id: "CK010",
        title: "Flashlit Vintage Collage Portrait",
        category: "Portrait",
        description: "A warm amber-toned scrapbook collage of a young woman, captured in layered flash-lit panels with moody shadows, floral accents, and a nostalgic music player overlay.",
        promptText: `Ultra-realistic cinematic collage of a young woman using the uploaded face exactly.
The image is composed of multiple rectangular photo panels layered vertically and diagonally, creating a scrapbook-style layout. Each panel shows close-up and mid-shot portraits of the same girl in a dim indoor room.

Lighting: strong, warm, golden-orange direct flash lighting hitting the face from the front-left, creating high contrast, deep shadows, and a glowing skin effect. Background remains dark with visible window curtains slightly illuminated. Harsh highlights on cheekbones, nose, and lips. Slight film grain and soft blur for a dreamy vintage feel.
Color grading: intense amber, burnt orange, and golden tones dominating the entire image. High saturation, slightly crushed blacks, and glowing highlights.
Subject styling: messy tied-back hair with loose strands falling on face, glossy lips, subtle eyeliner, dewy skin. Wearing a delicate necklace with small pendants and a casual white top.
Composition details:
Top panel: serious expression, looking directly at
camera.
Middle panel: cropped lips and necklace close-up.
Bottom left: extreme close-up of eyes with strong shadow split across face.
Bottom right: angled portrait with soft side gaze.
Panels overlap slightly with uneven spacing for aesthetic collage look.
Overlay elements:
Add realistic flower stickers (lilies in orange, cream, and red tones) placed around the collage.
Add a music player Ul card in the center-left area with a soft rounded design.
Music player text:
Title: “Pavazhamalli”
Artist: “Devaa”
Include minimal playback bar and icons (play/ pause, skip).
Final touches:
Slight glow/bloom effect on highlights
Subtle vignette around edges
Flash photography look, like taken on a digital camera at night
Maintain natural skin texture, avoid over-smoothing`,
        image: "assets/images/ChatGPT Image May 5, 2026, 10_37_24 AM.png"
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
