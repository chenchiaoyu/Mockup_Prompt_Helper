import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const mockupTags = [
  { id: 'mp_coaster_round_ceramic', label: '圓形陶瓷吸水杯墊', prompt: 'blank circular absorbent ceramic coaster mockup with natural porous matte diatomite ceramic surface and non-slip cork backing', category: 'mockupProducts' },
  { id: 'mp_coaster_square_ceramic', label: '方形圓角陶瓷吸水杯墊', prompt: 'blank square absorbent ceramic coaster mockup with soft rounded corners and cork base layer, tactile unglazed porous stone surface', category: 'mockupProducts' },
  { id: 'mp_sticker_holographic_laser', label: '雷射全息幻彩貼紙/彩虹光膜', prompt: 'blank die-cut holographic vinyl sticker mockup with iridescent metallic rainbow shimmer reflections', category: 'mockupProducts' },
  { id: 'mp_sticker_clear_transparent', label: '高透PVC透明貼紙/白墨', prompt: 'blank ultra-clear transparent vinyl sticker mockup with backing release paper, subtle glossy light sheen', category: 'mockupProducts' },
  { id: 'mp_sticker_epoxy_3d_dome', label: '3D立體水晶滴膠貼紙', prompt: 'blank 3D crystal domed epoxy resin sticker mockup, glossy raised transparent polyurethane dome lens', category: 'mockupProducts' },
  { id: 'mp_packaging_opp_bag', label: 'OPP自黏透明包裝袋', prompt: 'blank transparent OPP plastic packaging bag mockup with peel-and-seal adhesive strip lip, ultra-clear glossy cellophane', category: 'mockupProducts' },
  { id: 'mp_packaging_header_card_bag', label: '透明袋釘裝吊卡/印刷頭卡', prompt: 'blank retail product packaging mockup featuring a clear transparent poly bag sealed by a folded heavyweight cardboard header card with metal staples and hanging slot', category: 'mockupProducts' },
  { id: 'mp_tw_signboard_vertical', label: '台灣街頭直式直立招牌', prompt: 'blank vertical rectangular outdoor shop signboard mockup hanging on Taiwanese street facade, classic weather-resistant acrylic panel', category: 'mockupProducts' },
  { id: 'mp_tw_signboard', label: '台灣街頭廣招牌/圓形燈箱', prompt: 'blank projecting round outdoor shop signboard mockup attached to weathered concrete textured wall in Taiwan urban street', category: 'mockupProducts' },
  { id: 'mp_snack_fried_chicken_bag', label: '鹽酥雞/炸雞排防油牛皮紙袋', prompt: 'blank greaseproof brown kraft paper bag mockup for Taiwanese crispy fried chicken fillet, authentic crimped serrated top edge', category: 'mockupProducts' },
  { id: 'mp_breakfast_burger_box', label: '傳統早餐店漢堡紙盒', prompt: 'blank traditional Taiwanese breakfast diner folding cardstock hamburger box mockup with latch tab', category: 'mockupProducts' },
  { id: 'mp_fan_chinese_folding', label: '中式竹骨宣紙/絹布摺扇', prompt: 'blank traditional Chinese folding hand fan mockup open at 180-degree spread, natural polished bamboo ribs', category: 'mockupProducts' },
  { id: 'mp_tw_pocket_tissue', label: '隨身袖珍包面紙包裝袋', prompt: 'blank portable pocket tissue pack packaging mockup, clear glossy plastic film wrap with pull-tab opening sticker', category: 'mockupProducts' },
  { id: 'mp_envelope_yellow_manila', label: '台灣傳統公文黃信封/薪資袋', prompt: 'blank traditional Taiwanese yellow manila string-and-button tie document envelope and salary wage packet mockup', category: 'mockupProducts' },
  { id: 'mp_stamps_sheet', label: '台灣郵政復古齒孔郵票版張', prompt: 'blank sheet of perforated vintage postage stamps with delicate serrated tooth edges', category: 'mockupProducts' },
  { id: 'mp_stickers_diecut_sheet', label: '文創模切防水貼紙組', prompt: 'blank collection of assorted die-cut matte vinyl stickers peeled slightly from backing sheet', category: 'mockupProducts' },
  { id: 'mp_tw_gaji_bag', label: '台灣經典茄芷袋/三色網袋', prompt: 'blank iconic Taiwanese traditional tricolor woven nylon mesh market tote bag mockup (red, green, blue striped Gaji bag)', category: 'mockupProducts' },
  { id: 'mp_tw_beer_glass_143ml', label: '143ml 台灣啤酒熱炒玻璃小杯', prompt: 'blank iconic Taiwanese 143ml small clear glass beer tumbler mockup, classic heavy base, cold condensation droplets', category: 'mockupProducts' },
  { id: 'pc_three_view', label: '工業設計精確三視圖', prompt: 'professional industrial design three-view orthographic projection layout (front, top, side views on technical blueprint)', category: 'perspectivesComposition' },
  { id: 'pc_isometric_pure', label: '純粹等角透視 (30° Isometric)', prompt: 'true isometric projection perspective, 30-degree axonometric angle, parallel projection without perspective distortion', category: 'perspectivesComposition' },
  { id: 'sl_softbox_top', label: '大型頂部柔光箱漫射光', prompt: 'commercial product photography lighting, illuminated by large overhead diffuse softbox, ultra-smooth gradient transitions', category: 'studioLighting' },
  { id: 'sl_rim_lighting', label: '雙色邊緣輪廓光', prompt: 'dramatic precision rim lighting, sharp specular edge highlights tracing product silhouette', category: 'studioLighting' },
  { id: 'sl_gobo_venetian', label: '百葉窗/幾何光影投影', prompt: 'subtle window venetian blind shadow projection (gobo), artistic minimal shadow play', category: 'studioLighting' },
  { id: 'sl_plaster_podium', label: '建築感粗獷石膏幾何台座', prompt: 'geometric matte plaster podium pedestal, clean aesthetic display stand, architectural casting', category: 'studioLighting' },
  { id: 'sl_floating_zero_g', label: '懸浮漂浮零重力展示', prompt: 'levitating floating product composition, dynamic gravity-defying balance, clean isolated environment', category: 'studioLighting' },
  { id: 'mf_anodized_alum', label: '陽極氧化噴砂鋁合金', prompt: 'premium aerospace-grade bead-blasted anodized aluminum finish, fine microscopic satin grain', category: 'materialsFinishes' },
  { id: 'mf_frosted_glass', label: '磨砂霧面半透明玻璃', prompt: 'fine-etched translucent frosted glass, soft internal light diffusion, subsurface scattering glow', category: 'materialsFinishes' },
  { id: 'mf_cotton_paper', label: '600gsm 特厚純棉無酸紙', prompt: 'tactile 600gsm ultra-heavyweight cotton rag paper texture, fibrous organic deckle feel', category: 'materialsFinishes' },
  { id: 'pc_45deg_isometric', label: '45度斜角立體展示', prompt: 'elevated 45-degree angle perspective, three-quarter angle product view, dynamic diagonal lighting', category: 'perspectivesComposition' },
  { id: 'pc_flatlay_90', label: '90度俯視平拍 (Flat Lay)', prompt: 'flat lay top-down view, 90-degree overhead perspective, straight-down bird-eye mockup angle', category: 'perspectivesComposition' },
  { id: 'da_dieter_rams', label: '迪特·拉姆斯工業美學', prompt: 'Dieter Rams Braun design philosophy, "less but better", pure functionalism, geometric simplicity', category: 'designAesthetics' },
  { id: 'da_swiss_style', label: '瑞士國際主義排版風格', prompt: 'Swiss International Typographic Style, structured asymmetric grid, modern minimalism, bold negative space', category: 'designAesthetics' },
  { id: 'np_no_text_logo', label: '杜絕任何文字與亂碼 (Mockup 核心)', prompt: 'text, letters, words, font, typography, gibberish writing, watermark, logo, brand emblem', category: 'negativePurity' }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint: Suggest keywords based on Mockup / Product Subject
  app.post("/api/suggest-keywords", async (req, res) => {
    try {
      const { subject } = req.body;
      const subjectText = (subject || "").trim();

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback recommendations
        const defaultSuggestions = mockupTags.slice(0, 3).map((t, idx) => ({
          id: t.id,
          label: t.label,
          prompt: t.prompt,
          reason: idx === 0 
            ? '為商業產品主體營造柔和無生硬陰影的高階攝影棚質感'
            : idx === 1 
            ? '強化產品邊緣金屬與輪廓反光，增強立體幾何張力'
            : '營造自然高級的幾何陳列台座，突顯產品視覺焦點'
        }));
        return res.json({ suggestions: defaultSuggestions });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `You are a world-class Industrial Designer, Commercial Mockup Director, and Midjourney Prompt Specialist.
Analyze the user's Commercial Mockup / Product Subject: "${subjectText || 'commercial product mockup'}".
Select exactly 3 MOST RELEVANT lighting, material, perspective, or aesthetic tags from the database below to dramatically optimize this commercial mockup presentation:

Available Tags Database:
${JSON.stringify(mockupTags, null, 2)}

Requirements:
- Pick the 3 best fitting tags based on the commercial design type (e.g. 3C device, glass bottle, packaging box, stationery print, appliance, poster).
- Write a short, professional explanation (in Traditional Chinese 繁體中文, ~15-25 words) explaining how it optimizes this product mockup.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              suggestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING, description: "The exact matching id from available tags (e.g. sl_softbox_top, sl_rim_lighting, mf_anodized_alum, etc.)" },
                    label: { type: Type.STRING, description: "The label of the tag" },
                    prompt: { type: Type.STRING, description: "The prompt of the tag" },
                    reason: { type: Type.STRING, description: "Concise reason in Traditional Chinese why this optimizes the mockup presentation" }
                  },
                  required: ["id", "label", "prompt", "reason"]
                }
              }
            },
            required: ["suggestions"]
          }
        }
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);

      const suggestions = (parsed.suggestions || []).slice(0, 3).map((s: any) => {
        const found = mockupTags.find(t => t.id === s.id) || mockupTags.find(t => t.label === s.label);
        return {
          id: found ? found.id : s.id,
          label: found ? found.label : s.label,
          prompt: found ? found.prompt : s.prompt,
          reason: s.reason || "提升商業產品設計之光影與材質質感"
        };
      });

      return res.json({ suggestions });
    } catch (error: any) {
      console.error("Error in /api/suggest-keywords:", error);
      const fallback = mockupTags.slice(0, 3).map((t, idx) => ({
        id: t.id,
        label: t.label,
        prompt: t.prompt,
        reason: idx === 0 
          ? '為商業產品主體營造柔和無生硬陰影的高階攝影棚質感'
          : idx === 1 
          ? '強化產品邊緣金屬與輪廓反光，增強立體幾何張力'
          : '營造自然高級的幾何陳列台座，突顯產品視覺焦點'
      }));
      return res.json({ suggestions: fallback });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
