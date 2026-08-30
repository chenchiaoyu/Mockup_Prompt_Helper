export interface SubCategory {
  id: string;
  name: string;
  englishName: string;
  color: string;
  desc?: string;
  icon?: string;
}

export type ProductScale = 'all' | 'micro' | 'handheld' | 'medium' | 'large';
export type ProductCost = 'all' | 'cost_10' | 'cost_100' | 'cost_1000' | 'cost_10000';

export interface ScaleDefinition {
  id: ProductScale;
  label: string;
  englishLabel: string;
  range: string;
  desc: string;
  iconName: string;
  colorClass: string;
}

export interface CostDefinition {
  id: ProductCost;
  label: string;
  englishLabel: string;
  tier: string;
  desc: string;
  iconName: string;
  colorClass: string;
}

export const scaleDefinitions: ScaleDefinition[] = [
  {
    id: 'all',
    label: '全部尺度',
    englishLabel: 'All Scales',
    range: 'All',
    desc: '顯示所有尺寸載體模型',
    iconName: 'Maximize2',
    colorClass: 'bg-slate-100 text-slate-700 border-slate-200'
  },
  {
    id: 'large',
    label: '大型',
    englishLabel: 'Large Scale',
    range: '100 cm 以上',
    desc: '直式招牌、凸出燈箱、騎樓店招、T字巨型廣告看板、水果大紙箱、巨幅海報',
    iconName: 'Store',
    colorClass: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  {
    id: 'medium',
    label: '中型',
    englishLabel: 'Medium Scale',
    range: '30 ~ 100cm',
    desc: '純棉T-Shirt、連帽衛衣、棒球帽、托特包、畫框海報、中式摺扇、iPad平板、快遞飛機盒、手提紙袋',
    iconName: 'Shirt',
    colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  {
    id: 'handheld',
    label: '手持桌面',
    englishLabel: 'Handheld & Desk',
    range: '10 ~ 30cm',
    desc: '陶瓷吸水杯墊、漢堡小吃盒袋、手搖杯、143ml熱炒杯、手機、OPP袋、信封紅包、美妝瓶罐、咖啡杯',
    iconName: 'Smartphone',
    colorClass: 'bg-sky-50 text-sky-800 border-sky-200'
  },
  {
    id: 'micro',
    label: '微型',
    englishLabel: 'Micro Scale',
    range: '10cm 以下',
    desc: '雷射貼紙、郵票、金屬徽章、織嘜布標、名片、隨身面紙、封口防偽標籤、智慧手錶',
    iconName: 'Tag',
    colorClass: 'bg-purple-50 text-purple-800 border-purple-200'
  }
];

export const costDefinitions: CostDefinition[] = [
  {
    id: 'all',
    label: '全部價格',
    englishLabel: 'All Prices',
    tier: 'All',
    desc: '顯示所有成本價位模型',
    iconName: 'Coins',
    colorClass: 'bg-slate-100 text-slate-700 border-slate-200'
  },
  {
    id: 'cost_10',
    label: '10元',
    englishLabel: 'Under $50',
    tier: '10元 級距',
    desc: '銅板價與耗材：OPP袋、防油紙袋、漢堡盒、面紙包、封口貼紙、飲料杯、143ml玻璃杯、織標',
    iconName: 'Coins',
    colorClass: 'bg-teal-50 text-teal-800 border-teal-200'
  },
  {
    id: 'cost_100',
    label: '100元',
    englishLabel: '$50 ~ $500',
    tier: '100元 級距',
    desc: '普及文創與常規：純棉T-Shirt、陶瓷杯墊、帆布托特包、棒球帽、精裝禮盒、精裝書、香氛蠟燭、金屬徽章',
    iconName: 'Banknote',
    colorClass: 'bg-blue-50 text-blue-800 border-blue-200'
  },
  {
    id: 'cost_1000',
    label: '1000元',
    englishLabel: '$500 ~ $5,000',
    tier: '1000元 級距',
    desc: '專業精緻與中型看板：重磅帽T、A1鋁框海報、全套企業識別文具、圓形凸出燈箱、騎樓店招',
    iconName: 'Gem',
    colorClass: 'bg-indigo-50 text-indigo-800 border-indigo-200'
  },
  {
    id: 'cost_10000',
    label: '10000元',
    englishLabel: '$5,000+',
    tier: '10000元 級距',
    desc: '旗艦3C與大型工程：iPhone 16 Pro、iPad Pro、Apple Watch、直式長型街頭燈箱、T字巨型廣告看板',
    iconName: 'Crown',
    colorClass: 'bg-amber-50 text-amber-900 border-amber-300'
  }
];

export interface PromptItem {
  id: string;
  subCategory?: string;
  label: string;
  prompt: string;
  categoryId?: CategoryKey;
  isNegative?: boolean;
  scale?: 'micro' | 'handheld' | 'medium' | 'large';
  cost?: 'cost_10' | 'cost_100' | 'cost_1000' | 'cost_10000';
  dimension?: string; // 參考尺寸規格 (例如: 90x54mm, Ø11x0.6cm, A4: 210x297mm)
  aestheticConcept?: string; // 美學概念與設計哲學說明 (用於 Google AI 深度解析與彈窗展示)
}

export interface CategoryData {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  stepNumber: number;
  stepTitle: string;
  description: string;
  subCategories?: SubCategory[];
  items: PromptItem[];
}

export type CategoryKey = 
  | 'mockupProducts'
  | 'perspectivesComposition'
  | 'materialsFinishes'
  | 'studioLighting'
  | 'designAesthetics'
  | 'negativePurity';

export type AIPlatform = 'midjourney' | 'universal';

export type NoiseLevel = 'none' | 'clean' | 'subtle' | 'medium' | 'heavy' | 'dither';

export interface NoiseOption {
  id: NoiseLevel;
  label: string;
  shortLabel: string;
  description: string;
  prompt: string;
  negativePrompt?: string;
  intensity: number;
}

export const noiseOptions: NoiseOption[] = [
  {
    id: 'none',
    label: '預設 (無特定標註)',
    shortLabel: '預設',
    description: '不強制干預噪點，由模型與風格詞自然決定',
    prompt: '',
    intensity: 0
  },
  {
    id: 'clean',
    label: '純淨零噪點 (Zero Noise / Pristine Clean)',
    shortLabel: '0% 純淨',
    description: '去除任何雜訊顆粒，呈現極致平滑的現代工業數位渲染與純淨表面',
    prompt: 'clean noise-free rendering, smooth surface finish, pristine digital clarity, flawless commercial lighting',
    negativePrompt: 'grain, noise, ISO noise, chromatic aberration, dusty background, artifacts, scratches, dust specks',
    intensity: 0
  },
  {
    id: 'subtle',
    label: '微幅有機觸感 (Subtle Tactile Grain)',
    shortLabel: '20% 微質',
    description: '極微弱的細緻有機噪點，增加物理質感防塑料假感',
    prompt: 'subtle organic tactile grain, fine microscopic material texture, authentic studio feel',
    intensity: 20
  },
  {
    id: 'medium',
    label: '高階中片幅底片感 (Medium Format Film Grain)',
    shortLabel: '45% 膠卷',
    description: '哈蘇/Phase One 中片幅攝影底片顆粒，展現高級商業型錄質感',
    prompt: 'medium format film grain texture, rich analog photographic texture, authentic ISO 200 film depth',
    intensity: 45
  },
  {
    id: 'heavy',
    label: '粗礪復古印刷 (Gritty Print Texture)',
    shortLabel: '75% 粗礪',
    description: '強烈顆粒感與粗糙觸感，適合前衛潮流、復古工藝與街頭工業風',
    prompt: 'heavy analog grain, rough gritty noise texture, high ISO aesthetic, tactile paper roughness',
    intensity: 75
  },
  {
    id: 'dither',
    label: '孔版印刷與網點 (Risograph / Halftone Dot)',
    shortLabel: '網點/Dither',
    description: '復古印刷孔版網點與點陣散色雜訊，適合藝術海報與包裝概念',
    prompt: 'subtle risograph halftone dot pattern, organic dithering texture, screen-printed micro dots',
    intensity: 60
  }
];

export const subCategoryColorMap: Record<string, { dot: string; badge: string; text: string }> = {
  indigo: { dot: 'bg-indigo-500', badge: 'bg-indigo-50 border-indigo-200 text-indigo-700', text: 'text-indigo-600' },
  cyan: { dot: 'bg-cyan-500', badge: 'bg-cyan-50 border-cyan-200 text-cyan-700', text: 'text-cyan-600' },
  amber: { dot: 'bg-amber-500', badge: 'bg-amber-50 border-amber-200 text-amber-700', text: 'text-amber-700' },
  rose: { dot: 'bg-rose-500', badge: 'bg-rose-50 border-rose-200 text-rose-700', text: 'text-rose-600' },
  orange: { dot: 'bg-orange-500', badge: 'bg-orange-50 border-orange-200 text-orange-700', text: 'text-orange-600' },
  emerald: { dot: 'bg-emerald-500', badge: 'bg-emerald-50 border-emerald-200 text-emerald-700', text: 'text-emerald-600' },
  purple: { dot: 'bg-purple-500', badge: 'bg-purple-50 border-purple-200 text-purple-700', text: 'text-purple-600' },
  red: { dot: 'bg-rose-500', badge: 'bg-rose-50 border-rose-200 text-rose-700', text: 'text-rose-600' },
  slate: { dot: 'bg-slate-500', badge: 'bg-slate-100 border-slate-200 text-slate-700', text: 'text-slate-600' },
};

/**
 * 專為商業設計 Mockup 與產品/工業設計打造的核心提示詞庫
 * 流程嚴格依照「由上到下」：
 * 步驟 1: 產品與日常載體模型 (包含台灣日常、精簡3C、包裝、服飾周邊等)
 * 步驟 2: 視角角度與鏡頭構圖 (三視圖、等角透視、俯視90度、正面平視、微距特寫)
 * 步驟 3: 材質表面與工藝紋理 (陽極氧化鋁、磨砂玻璃、特厚純棉紙、液態矽膠)
 * 步驟 4: 攝影棚佈光與場景陳列 (柔光箱、雙色輪廓光、幾何石膏台座、零重力懸浮)
 * 步驟 5: 設計語彙與美學派系 (迪特拉姆斯、包浩斯、瑞士網格、蘋果極簡、C4D黏土原型)
 * 步驟 6: Mockup 專用純淨度與負向排除 (杜絕亂碼文字、去除人手背景、防幾何扭曲)
 */
export const promptDatabase: Record<CategoryKey, CategoryData> = {
  mockupProducts: {
    id: 'mockupProducts',
    name: '產品載體與日常模型',
    englishName: 'Mockup Objects & Vessels',
    icon: 'Package',
    stepNumber: 1,
    stepTitle: 'Step 1 • 選擇主體載體',
    description: '切分廣告看板、零售包裝、周邊商品、品牌印刷貼紙與3C容器模型',
    subCategories: [
      { 
        id: 'ad_outdoor', 
        name: '廣告戶外看板 (直式招牌/圓形燈箱/騎樓柱招/關東煮立旗/T字看板/展覽海報/畫框海報)', 
        englishName: 'Outdoor & Signage Advertising', 
        color: 'rose', 
        icon: 'Store',
        desc: '台灣街頭直式直立招牌、凸出式圓形燈箱、日式關東煮立旗/長型布旗、騎樓柱面店招、T字大型戶外廣告看板、A0巨幅海報、A1極簡鋁框海報' 
      },
      { 
        id: 'packaging_bottles', 
        name: '包裝瓶罐 (袋裝/盒裝/食品外帶盒/紙袋紙箱/易開罐/手搖杯/玻璃酒瓶/咖啡杯/美妝保養瓶罐)', 
        englishName: 'Packaging, Boxes & Bottles', 
        color: 'amber', 
        icon: 'Box',
        desc: 'OPP自黏透明袋、透明袋釘裝紙頭卡吊卡、開窗牛皮夾鏈立袋、天地蓋精裝禮盒、瓦楞紙飛機盒、抽屜盒、牛皮手提袋、水果紙箱、隨身面紙、抽取式衛生紙、炸雞排紙袋、白牛皮炸物袋、早餐漢堡盒、蛋餅餐盒、鐵路木片便當盒、夜市小吃紙袋、143ml熱炒啤酒杯、手搖飲封口杯、玻璃酒杯、消光鋁罐、雙層咖啡杯、精釀酒瓶、立體鋁箔袋、咖啡豆袋、磨砂香水瓶、精華液滴管瓶、消光擠壓軟管、奢華乳霜罐' 
      },
      { 
        id: 'merch_apparel', 
        name: '周邊與服飾 (手拿旗/露營旗/陶瓷吸水杯墊/摺扇/宣傳圓柄扇/宮扇/帆布托特包/T-Shirt/連帽衛衣/棒球帽/金屬徽章/織標/識別證/香氛蠟燭)', 
        englishName: 'Merchandise & Apparel', 
        color: 'emerald', 
        icon: 'Shirt',
        desc: '活動手拿旗/手搖旗、戶外露營三角旗/營地串旗、圓形陶瓷吸水杯墊、方形圓角吸水杯墊、中式竹骨宣紙摺扇、復古手搖塑膠圓柄扇、古典絲綢宮扇、文創純棉帆布托特包、重磅純棉購物袋、周邊純棉T-Shirt、重磅T-Shirt平拍、刺繡連帽衛衣、美式老帽棒球帽、金屬烤漆徽章、高密織嘜布標、掛繩工作識別證、香薰蠟燭陶瓷杯' 
      },
      { 
        id: 'paper_print', 
        name: '紙類印刷品 (紙膠帶/筆記本/掛式月曆/資料夾/雷射貼/防水貼/易碎防偽貼/模切貼紙組/封口標籤/燙金紅包/航空信封/郵票/名片/企業識別文具/精裝書)', 
        englishName: 'Paper, Print & Stickers', 
        color: 'purple', 
        icon: 'FileText',
        desc: '文創和紙膠帶捲、精裝線裝筆記本/手帳本、雙圈鐵圈掛式壁掛月曆、雙口袋商務提案資料夾、雷射全息幻彩貼紙、消光霧面防水貼紙、靜電無膠/易碎蛋殼貼、文創模切防水貼紙組、易碎封口標籤、燙金中式紅包袋、經典航空信封、復古齒孔郵票、600gsm棉卡名片、企業識別全套文具、精裝書本封面、開頁精裝畫冊' 
      },
      { 
        id: 'products_3c', 
        name: '產品3C類別 (iPhone 16 Pro/iPad Pro/Apple Watch/手機平板雙裝置組合)', 
        englishName: '3C Electronics & Digital Tech', 
        color: 'indigo', 
        icon: 'Smartphone',
        desc: 'iPhone 16 Pro 旗艦手機、iPad Pro 懸浮平板、Apple Watch 智慧手錶、手機 + 平板 雙裝置懸浮組合' 
      },
      { 
        id: 'others', 
        name: '其他 (壓克力展示立牌/原木雷雕掛牌/不鏽鋼VIP金屬卡)', 
        englishName: 'Others & Specialty Items', 
        color: 'cyan', 
        icon: 'Sparkles',
        desc: '透明壓克力桌面展示立牌、原木雷射雕刻掛牌、霧黑不鏽鋼金屬 VIP 會員卡等特殊載體模型' 
      }
    ],
    items: [
      // 1. 廣告戶外看板
      { 
        id: 'mp_tw_signboard_vertical', 
        subCategory: 'ad_outdoor', 
        scale: 'large',
        cost: 'cost_10000',
        dimension: '60 x 240 cm (1:4 直式街景標準比例)',
        label: '台灣街頭直式直立招牌 / 側掛長型燈箱 (Vertical Hanging Street Signboard)', 
        prompt: 'blank vertical rectangular outdoor shop signboard mockup hanging on Taiwanese street facade, classic weather-resistant acrylic panel, sturdy steel bracket mount, realistic daytime Taiwanese street atmosphere, clean blank surface for vertical typography' 
      },
      { 
        id: 'mp_tw_signboard', 
        subCategory: 'ad_outdoor', 
        scale: 'large',
        cost: 'cost_1000',
        dimension: '直徑 Ø60 cm (凸出式標準圓形燈箱)',
        label: '台灣街頭廣招牌 / 凸出式圓形燈箱 (Street Projecting Signboard)', 
        prompt: 'blank projecting round outdoor shop signboard mockup attached to weathered concrete textured wall in Taiwan urban street, sleek metal bracket, realistic daytime natural lighting, clean empty acrylic surface ready for graphic logo placement' 
      },
      { 
        id: 'mp_tw_arcade_pillar_sign', 
        subCategory: 'ad_outdoor', 
        scale: 'large',
        cost: 'cost_1000',
        dimension: '50 x 180 cm (騎樓行人步道視高規格)',
        label: '騎樓柱面直式鐵皮/木質店招 (Taiwan Arcade Pillar Signboard)', 
        prompt: 'blank vertical shop signboard mounted on covered pedestrian arcade concrete pillar in Taiwan old street, textured metal frame, natural soft daylight, pristine display area' 
      },
      { 
        id: 'mp_tw_t_billboard', 
        subCategory: 'ad_outdoor', 
        scale: 'large',
        cost: 'cost_10000',
        dimension: '18 x 6 m (1800 x 600 cm 巨型鋼構看板)',
        label: '公路/市區 Ｔ字大型廣告看板 (T-Shape Highway Billboard Mockup)', 
        prompt: 'blank monumental T-shaped highway outdoor advertising billboard mockup, sturdy steel pillar structure against clear sky, ultra-clean white canvas display area, crisp commercial elevation angle, wide perspective' 
      },
      { 
        id: 'mp_oden_flag', 
        subCategory: 'ad_outdoor', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '30 x 90 cm (直立式日式長型布旗標準比例)',
        label: '日式關東煮立旗 / 居酒屋長型布旗 (Japanese Oden Standing Banner & Tabletop Flag)', 
        prompt: 'blank traditional Japanese Oden izakaya vertical fabric banner flag mockup mounted on sleek wooden pole stand, textured rough linen cotton fabric, authentic Japanese food street stall ambiance, clean blank vertical surface for calligraphy and logo print' 
      },
      { 
        id: 'mp_poster_a0', 
        subCategory: 'ad_outdoor', 
        scale: 'large',
        cost: 'cost_100',
        dimension: '84.1 x 118.9 cm (A0 國際標準展覽海報)',
        label: 'A0 巨幅展覽海報 (藝廊清水模牆面 / 懸掛金屬軌道)', 
        prompt: 'blank A0 large format exhibition poster mockup suspended on brutalist architectural gallery concrete wall, sleek aluminum magnetic hanger, natural morning window light, blank paper canvas' 
      },
      { 
        id: 'mp_poster_a1_frame', 
        subCategory: 'ad_outdoor', 
        scale: 'medium',
        cost: 'cost_1000',
        dimension: '59.4 x 84.1 cm (A1 極細鋁合金畫框規格)',
        label: 'A1 畫框海報 (極細極簡鋁框 / 壓克力防塵面)', 
        prompt: 'blank A1 vertical poster in ultra-thin matte black metal frame, subtle reflection on museum glass, leaning against minimalist wall, clean interior setting' 
      },

      // 2. 包裝瓶罐
      { 
        id: 'mp_packaging_opp_bag', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '15 x 20 cm + 4cm 自黏封口折位',
        label: 'OPP 自黏透明包裝袋 (OPP Clear Self-Adhesive Poly Bag Packaging)', 
        prompt: 'blank transparent OPP plastic packaging bag mockup with peel-and-seal adhesive strip lip, ultra-clear glossy cellophane film texture, crisp heat-sealed side edges, displaying flat stationery or merch product inside, pristine reflective sheen' 
      },
      { 
        id: 'mp_packaging_header_card_bag', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '12 x 18 cm 袋身 + 12 x 5 cm 釘裝吊卡',
        label: '透明袋釘裝吊卡 / 印刷頭卡 (Clear Poly Bag with Stapled Cardboard Header Tag)', 
        prompt: 'blank retail product packaging mockup featuring a clear transparent poly bag sealed by a folded heavyweight cardboard header card with metal staples and sombrero euro hanging slot hole, studio lighting, pristine header card print canvas' 
      },
      { 
        id: 'mp_packaging_standup_ziplock_window', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '16 x 24 cm (底部展開 4cm / 500g 裝)',
        label: '開窗牛皮夾鏈立袋 / 吊掛平口袋 (Kraft Stand-up Pouch with Transparent Window)', 
        prompt: 'blank kraft paper stand-up pouch mockup with a wide clear transparent plastic viewing window, tear notches, secure ziplock top seal, tactile organic kraft fiber texture' 
      },
      { 
        id: 'mp_rigid_box', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '22 x 16 x 6 cm (標準天地蓋精裝禮盒)',
        label: '消光天地蓋精裝禮盒 (剛性紙板 / 倒角分線)', 
        prompt: 'blank luxury two-piece rigid gift box mockup, top lid lifted slightly, crisp paper board bevels, pure matte textured finish, pristine empty surface for brand packaging design' 
      },
      { 
        id: 'mp_mailer_box', 
        subCategory: 'packaging_bottles', 
        scale: 'medium',
        cost: 'cost_10',
        dimension: '28 x 20 x 8 cm (T3 規格三層瓦楞飛機盒)',
        label: '瓦楞紙快遞飛機盒 (E-commerce Mailer Box)', 
        prompt: 'blank corrugated cardboard mailer box mockup, open unboxing perspective, clean kraft or white paper lining, commercial product shipping presentation' 
      },
      { 
        id: 'mp_sliding_drawer', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '10 x 10 x 4 cm (精品飾品/文創抽屜盒)',
        label: '抽拉式抽屜盒 (Sliding Drawer Packaging Box)', 
        prompt: 'blank sliding drawer jewelry packaging box mockup with silk ribbon pull tab, thick rigid cardstock, elegant studio soft shadows, blank logo area' 
      },
      { 
        id: 'mp_kraft_tote', 
        subCategory: 'packaging_bottles', 
        scale: 'medium',
        cost: 'cost_10',
        dimension: '26 x 32 x 11 cm (標準中型直式手提紙袋)',
        label: '牛皮紙手提袋 (扭繩提把 / 底部風琴折)', 
        prompt: 'blank kraft paper shopping bag mockup with twisted paper handles, natural paper grain, realistic side gusset folds, standing on neutral surface' 
      },
      { 
        id: 'mp_tw_fruit_box', 
        subCategory: 'packaging_bottles', 
        scale: 'large',
        cost: 'cost_10',
        dimension: '50 x 35 x 28 cm (五層AB楞 10kg 水果紙箱)',
        label: '台灣經典水果紙箱 (Taiwan Rustic Fruit Cardboard Carton)', 
        prompt: 'blank traditional Taiwanese corrugated kraft paper fruit delivery carton box mockup, sturdy reinforced hand-hole handles, tactile cardboard flute texture, standing in clean rustic market ambient light' 
      },
      { 
        id: 'mp_tw_pocket_tissue', 
        subCategory: 'packaging_bottles', 
        scale: 'micro',
        cost: 'cost_10',
        dimension: '7.5 x 11.5 cm (10抽隨身便攜袖珍包)',
        label: '隨身袖珍包面紙包裝袋 (Taiwan Pocket Facial Tissue Pack)', 
        prompt: 'blank portable pocket tissue pack packaging mockup, clear glossy plastic film wrap with pull-tab opening sticker, stacked on clean minimalist desk, pristine empty front branding surface' 
      },
      { 
        id: 'mp_tw_tissue_softpack', 
        subCategory: 'packaging_bottles', 
        scale: 'medium',
        cost: 'cost_10',
        dimension: '20 x 10 x 9 cm (100抽家用抽取式軟包袋)',
        label: '家用抽取式衛生紙外包裝袋 (Taiwan Soft-Pack Facial Tissue Bag)', 
        prompt: 'blank soft plastic pack facial tissue dispenser mockup with top perforated opening and partially pulled soft paper sheet, clean matte packaging film texture, bright home lifestyle setting' 
      },
      { 
        id: 'mp_snack_fried_chicken_bag', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '15 x 22 cm (台灣夜市標準大雞排紙袋)',
        label: '鹽酥雞 / 炸雞排防油牛皮紙袋 (Taiwanese Fried Chicken Greaseproof Paper Bag)', 
        prompt: 'blank greaseproof brown kraft paper bag mockup for Taiwanese crispy fried chicken fillet, authentic crimped serrated top edge, heat steam venting texture, standing on wooden counter with bamboo skewer beside it, pristine empty center for branding' 
      },
      { 
        id: 'mp_snack_oilproof_white_bag', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '12.5 x 19 cm (4兩/6兩白牛皮防油袋)',
        label: '炸物防油透氣白牛皮紙袋 (Taiwan Street Snack White Greaseproof Bag)', 
        prompt: 'blank bleached white greaseproof paper snack pocket pouch mockup, subtle translucent oil-resistant paper texture, crimped bottom seam, warm golden hour ambient lighting, clean front print space' 
      },
      { 
        id: 'mp_breakfast_burger_box', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '11 x 11 x 7 cm (傳統美而美早餐漢堡卡紙盒)',
        label: '傳統早餐店漢堡紙盒 (Taiwan Breakfast Burger Paper Box)', 
        prompt: 'blank traditional Taiwanese breakfast diner folding cardstock hamburger box mockup with latch tab, clean white cardboard with crisp fold lines, fresh morning breakfast aesthetic, empty lid for retro logo stamp' 
      },
      { 
        id: 'mp_breakfast_crepe_box', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '17 x 12 x 3.5 cm (長型防油淋膜蛋餅餐盒)',
        label: '早餐店蛋餅 / 蘿蔔糕外帶長型紙餐盒 (Taiwan Breakfast Egg Crepe Takeaway Paper Box)', 
        prompt: 'blank rectangular coated paper food container box mockup for Taiwanese breakfast egg crepe and radish cake, secure folding closure, natural morning light, blank top area for branding' 
      },
      { 
        id: 'mp_tw_bento_box', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '18 x 13 x 4 cm (福隆鐵路木片便當規格)',
        label: '台灣木片鐵路便當盒 / 自助餐紙餐盒 (Taiwan Rail Bento Wood & Paper Box)', 
        prompt: 'blank traditional Taiwanese wooden chip bento box and folding paper meal box mockup with rubber band seal and wooden chopsticks, authentic Taiwanese lunchbox presentation, clean empty lid for label sticker' 
      },
      { 
        id: 'mp_tw_snack_bag', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '13 x 18 cm (台灣夜市紅豆餅/地瓜球小吃袋)',
        label: '台灣街頭小吃牛皮紙袋 (Taiwan Street Food Kraft Paper Bag)', 
        prompt: 'blank Taiwanese night market snack paper bag mockup, natural crinkled brown kraft paper, crimped bottom folds, warm street food aesthetic lighting, pristine empty front branding space' 
      },
      { 
        id: 'mp_tw_beer_glass_143ml', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: 'Ø6.4 x 8.5 cm (143ml 經典台灣熱炒小玻璃杯)',
        label: '143ml 台灣啤酒熱炒玻璃小杯 (Taiwan 143ml Classic Re Chao Beer Glass)', 
        prompt: 'blank iconic Taiwanese 143ml small clear glass beer tumbler mockup, classic heavy base, sparkling clear glass with cold condensation droplets, authentic Taiwanese hot fry re chao restaurant table ambiance' 
      },
      { 
        id: 'mp_tw_boba_cup', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '口徑 Ø9.5 x 高 16 cm (700ml / 24oz 大杯封口杯)',
        label: '台灣手搖飲塑膠/紙杯封口膜 (Taiwan Bubble Tea / Drink Cup Mockup)', 
        prompt: 'blank Taiwanese boba bubble tea takeaway plastic cup mockup with sealed plastic top film lid and wide straw, fine cold condensation droplets, clean modern cafe counter backdrop, pristine clear label space' 
      },
      { 
        id: 'mp_tw_wine_glass', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '口徑 Ø8.2 x 高 9.5 cm (300ml 威士忌古典水晶杯)',
        label: '精緻玻璃酒杯 / 威士忌古典杯 (Premium Glass Wine & Spirit Tumbler)', 
        prompt: 'blank ultra-clear luxury crystal glass wine cup tumbler mockup, heavy crystal bottom, exquisite caustic light refractions, sleek reflection, clean studio dark/light tabletop staging' 
      },
      { 
        id: 'mp_beverage_can', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '直徑 Ø6.6 x 高 11.5 cm (330ml 標準易開鋁罐)',
        label: '消光鋁質易開罐 (330ml/500ml / 水珠冷凝)', 
        prompt: 'blank sleek aluminum beverage soda can mockup, ultra-fine condensation water droplets, brushed metallic rim, pull tab detail, high commercial advertising quality' 
      },
      { 
        id: 'mp_coffee_cup', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '口徑 Ø9 x 高 13.5 cm (16oz / 480ml 雙層外帶紙杯)',
        label: '雙層外帶紙咖啡杯 (瓦楞隔熱套 / 塑膠杯蓋)', 
        prompt: 'blank takeaway paper coffee cup mockup, recyclable cardboard sleeve, snap-on sip lid, pristine white/kraft surface, minimalist cafe counter background' 
      },
      { 
        id: 'mp_beer_bottle', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '直徑 Ø6.1 x 高 22.8 cm (330ml 皇冠蓋精釀玻璃瓶)',
        label: '精釀啤酒玻璃棕瓶 (皇冠蓋 / 冰鎮霧氣)', 
        prompt: 'blank amber brown glass craft beer bottle mockup, classic crown cap, subtle frost chill condensation mist, studio backlight highlighting golden amber liquid' 
      },
      { 
        id: 'mp_standup_pouch', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '15 x 22 cm (底寬 4cm / 300g 夾鏈鋁箔立袋)',
        label: '立體站立夾鏈鋁箔袋 (Stand-Up Ziplock Pouch)', 
        prompt: 'blank stand-up ziplock barrier pouch bag mockup, matte foil finish, tear notches, realistic bottom gusset expand, food packaging commercial design' 
      },
      { 
        id: 'mp_coffee_bag', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '13 x 20 x 7 cm (半磅 250g 單向排氣閥咖啡袋)',
        label: '牛皮紙咖啡豆袋 (單向排氣閥 / 頂部折疊封口)', 
        prompt: 'blank kraft coffee bean pouch bag mockup with circular degassing aroma valve, tin-tie folding seal, tactile paper fiber texture, artisan roastery aesthetic' 
      },
      { 
        id: 'mp_perfume_frosted', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '5 x 5 x 9.5 cm (50ml 奢華方型厚底磨砂香水瓶)',
        label: '奢華磨砂玻璃香水瓶 (金屬噴頭 / 厚底晶瑩)', 
        prompt: 'blank luxury frosted glass perfume bottle mockup, heavy glass base, cylindrical aluminum spray cap, subtle subsurface light glow, high-end fragrance commercial visual' 
      },
      { 
        id: 'mp_dropper_bottle', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '直徑 Ø3.3 x 高 10.2 cm (30ml 精華液滴管玻璃瓶)',
        label: '精華液滴管玻璃瓶 (滴管按壓頭 / 琥珀/透明)', 
        prompt: 'blank cosmetic glass dropper serum bottle mockup, rubber bulb pipette dropper, pristine blank glass vessel, clean studio reflection, ready for skincare label composite' 
      },
      { 
        id: 'mp_squeeze_tube', 
        subCategory: 'packaging_bottles', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '直徑 Ø3.5 x 高 15 cm (100ml 洗面乳/護手霜軟管)',
        label: '消光擠壓軟管 (洗面乳 / 護手霜 / 翻蓋)', 
        prompt: 'blank matte cosmetic squeeze tube mockup, clean crimped tail, flip-top cap, soft diffused rim light, pristine empty label space, beauty product photography' 
      },
      { 
        id: 'mp_cream_jar', 
        subCategory: 'packaging_bottles', 
        scale: 'micro',
        cost: 'cost_100',
        dimension: '直徑 Ø6.2 x 高 4.8 cm (50g 雙層厚壁奢華面霜罐)',
        label: '奢華乳霜廣口玻璃罐 (雙層厚壁 / 旋蓋)', 
        prompt: 'blank luxury cosmetic cream jar mockup, thick-walled translucent glass pot with matte screw lid, smooth inner bevel, high cosmetic advertising quality' 
      },

      // 3. 周邊與服飾
      { 
        id: 'mp_handheld_flag', 
        subCategory: 'merch_apparel', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '14 x 21 cm 旗面 + 30 cm 白色握桿 (活動手搖小旗)',
        label: '活動宣傳手拿旗 / 手搖小旗幟 (Handheld Promotional Rally Waving Mini Flag)', 
        prompt: 'blank handheld promotional event waving flag mockup with white plastic stick and rounded safety cap, lightweight polyester fabric with natural dynamic wave ripples, clean isolated studio background, pristine blank rectangular banner canvas' 
      },
      { 
        id: 'mp_camping_flag', 
        subCategory: 'merch_apparel', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '15 x 25 cm (單面三角旗) / 200 cm 串旗掛繩',
        label: '戶外露營三角旗 / 營地掛繩串旗 (Outdoor Camping Triangle Pennant Flag & Bunting Banner)', 
        prompt: 'blank outdoor camping triangular pennant flag mockup hanging on camp guyline rope with wooden toggles, rugged canvas fabric texture, natural outdoor woodland forest ambient lighting, blank triangular canvas for adventure logo emblem' 
      },
      { 
        id: 'mp_coaster_round_ceramic', 
        subCategory: 'merch_apparel', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '直徑 Ø11 x 厚 0.6 cm (圓形珪藻土吸水陶瓷杯墊)',
        label: '圓形陶瓷吸水杯墊 (Circular Absorbent Ceramic Coaster)', 
        prompt: 'blank circular absorbent ceramic coaster mockup with natural porous matte diatomite ceramic surface and non-slip cork backing, realistic subtle bevel rim, displayed on clean cafe wooden table, pristine round canvas for artwork' 
      },
      { 
        id: 'mp_coaster_square_ceramic', 
        subCategory: 'merch_apparel', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '10.8 x 10.8 x 0.6 cm (方形圓角吸水陶瓷杯墊)',
        label: '方形圓角陶瓷吸水杯墊 (Square Rounded Absorbent Ceramic Coaster)', 
        prompt: 'blank square absorbent ceramic coaster mockup with soft rounded corners and cork base layer, tactile unglazed porous stone surface, overhead flatlay with morning daylight cast, blank square print area' 
      },
      { 
        id: 'mp_fan_chinese_folding', 
        subCategory: 'merch_apparel', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '展開 33 x 60 cm (十寸 18檔天然竹骨摺扇)',
        label: '中式竹骨宣紙 / 絹布摺扇 (Traditional Chinese Bamboo Folding Fan Mockup)', 
        prompt: 'blank traditional Chinese folding hand fan mockup open at 180-degree spread, natural polished bamboo ribs, fine textured rice paper or silk fan leaf canvas, elegant oriental studio lighting with bamboo shadow casting' 
      },
      { 
        id: 'mp_fan_plastic_paddle', 
        subCategory: 'merch_apparel', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '扇面 Ø17 cm / 全長 27 cm (PP 塑料手柄宣傳扇)',
        label: '台灣復古手搖塑膠宣傳圓柄扇 (Taiwan Retro Plastic Hand Fan with Handle)', 
        prompt: 'blank Taiwanese promotional plastic paddle hand fan with ergonomic finger-hole handle, smooth matte polypropylene surface, authentic festival street summer vibe, pristine dual-sided graphic print area' 
      },
      { 
        id: 'mp_fan_silk_round', 
        subCategory: 'merch_apparel', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '扇面 Ø21 cm / 楠木柄長 13 cm (古典中式團扇)',
        label: '古典中式團扇 / 圓形宮扇 (Chinese Silk Round Hand Fan / Court Fan)', 
        prompt: 'blank circular Chinese silk court fan (tuan shan) mockup with lacquered wooden handle and delicate hanging silk tassel, translucent silk gauze texture, poetic zen tea table staging' 
      },
      { 
        id: 'mp_canvas_tote_heavy', 
        subCategory: 'merch_apparel', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '36 x 40 cm (底寬 8cm / 12oz 重磅純棉帆布)',
        label: '文創純棉帆布托特包 (Taiwan Heavyweight Cotton Canvas Tote Bag)', 
        prompt: 'blank minimalist off-white cotton canvas tote bag mockup, sturdy dual webbing shoulder straps, natural organic cotton grain and drape wrinkles, pristine front graphic print area' 
      },
      { 
        id: 'mp_canvas_tote', 
        subCategory: 'merch_apparel', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '38 x 42 cm (大容量 10oz 帆布購物袋)',
        label: '重磅純棉帆布購物袋 (Canvas Tote Bag Mockup)', 
        prompt: 'blank heavyweight cotton canvas tote bag mockup, natural unbleached fabric texture, sturdy woven shoulder straps, clean flat lay or hanging presentation' 
      },
      { 
        id: 'mp_tw_merch_tshirt', 
        subCategory: 'merch_apparel', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '衣長 72 cm / 胸寬 54 cm (260gsm L號重磅落肩T)',
        label: '周邊商品系列：純棉 T-shirt (Merchandise Series T-Shirt)', 
        prompt: 'blank premium heavyweight cotton merchandise T-shirt mockup, neat flat lay with folded sleeve details, natural fabric drape wrinkles, clean isolated neutral background, optimal front chest print area' 
      },
      { 
        id: 'mp_tshirt_flatlay', 
        subCategory: 'merch_apparel', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '衣長 74 cm / 胸寬 58 cm (Oversized 寬版平拍)',
        label: '重磅純棉 T-Shirt 平放平拍 (Flat Lay / 領口細節)', 
        prompt: 'blank heavyweight oversized cotton t-shirt mockup, neat flat lay arrangement, natural fabric drape folds, ribbed collar detail, neutral studio concrete floor' 
      },
      { 
        id: 'mp_hoodie_hang', 
        subCategory: 'merch_apparel', 
        scale: 'medium',
        cost: 'cost_1000',
        dimension: '衣長 74 cm / 胸寬 62 cm (420gsm 重磅大絨布連帽衛衣)',
        label: '刺繡連帽衛衣 Hoodie (金屬衣架懸掛 / 抽繩金屬頭)', 
        prompt: 'blank streetwear hoodie sweatshirt mockup hanging on sleek minimalist metal hanger, thick French terry fleece texture, metal aglet drawstrings, blank chest area' 
      },
      { 
        id: 'mp_cap_hat', 
        subCategory: 'merch_apparel', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '帽圍 56~60 cm / 帽簷 7 cm (6片式棉質老帽)',
        label: '美式老帽棒球帽 (6-Panel Dad Cap Mockup)', 
        prompt: 'blank 6-panel cotton twill baseball dad cap mockup, curved brim, embroidered eyelets, brass buckle strap, angled product studio photo' 
      },
      { 
        id: 'mp_woven_label', 
        subCategory: 'merch_apparel', 
        scale: 'micro',
        cost: 'cost_10',
        dimension: '2.5 x 6 cm (折邊後 2.5 x 3 cm 高密經緯織嘜標)',
        label: '高密織嘜布標與洗水標 (Woven Neck Tag & Label)', 
        prompt: 'blank damask woven clothing neck tag mockup, fine thread stitching, macro fabric weave texture, attached to garment collar, crisp macro focus' 
      },
      { 
        id: 'mp_enamel_pin', 
        subCategory: 'merch_apparel', 
        scale: 'micro',
        cost: 'cost_100',
        dimension: '直徑 Ø3.5 cm x 厚度 2 mm (金屬烤漆胸章)',
        label: '金屬烤漆徽章與刺繡布章 (Enamel Pin & Patch)', 
        prompt: 'blank hard enamel lapel pin and embroidered fabric patch mockup, polished gold metallic edges, smooth colored enamel fill, tactile twill backing' 
      },
      { 
        id: 'mp_lanyard_badge', 
        subCategory: 'merch_apparel', 
        scale: 'micro',
        cost: 'cost_10',
        dimension: '卡套 6.5 x 10 cm (標準 CR80 卡片規格 / 織帶寬 2cm)',
        label: '掛繩工作識別證 / VIP 通行證 (壓克力卡套 / 織帶)', 
        prompt: 'blank vertical corporate ID card badge mockup with woven fabric neck lanyard, transparent acrylic sleeve, metallic swivel hook, studio softbox illumination' 
      },
      { 
        id: 'mp_scented_candle', 
        subCategory: 'merch_apparel', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '直徑 Ø7.5 x 高 8.5 cm (200g 大豆蠟陶瓷香薰杯)',
        label: '香薰蠟燭陶瓷杯 (素燒陶瓷 / 木質杯蓋)', 
        prompt: 'blank ceramic vessel scented candle mockup, natural soy wax, wooden wick, unglazed matte ceramic texture, warm cozy ambient aesthetic' 
      },

      // 4. 紙類印刷品
      { 
        id: 'mp_washi_tape', 
        subCategory: 'paper_print', 
        scale: 'micro',
        cost: 'cost_10',
        dimension: '寬度 15 mm x 總長 10 m / 軸心直徑 Ø38 mm',
        label: '文創和紙膠帶 / 裝飾紙膠帶捲 (Washi Masking Tape Roll Mockup)', 
        prompt: 'blank rolls of Japanese washi masking tape mockup with one strip partially unrolled and adhered to craft paper, translucent fibrous rice paper texture, clean cylindrical inner cardboard core for branding, minimalist stationery flatlay' 
      },
      { 
        id: 'mp_notebook_hardcover', 
        subCategory: 'paper_print', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '14.8 x 21 cm (A5 標準手帳 / 160頁 / 束帶書籤)',
        label: '精裝線裝筆記本 / 空白手帳本 (Hardcover Thread-Bound Journal Notebook Mockup)', 
        prompt: 'blank luxury hardcover thread-bound journal notebook mockup with elastic closure band and silk ribbon bookmark, premium textured buckram bookcloth cover, partially open showing blank creamy ivory interior paper pages, minimal aesthetic desk staging' 
      },
      { 
        id: 'mp_wall_calendar', 
        subCategory: 'paper_print', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '29.7 x 42 cm (A3 直式雙線鐵圈壁掛月曆)',
        label: '雙圈鐵圈掛式壁掛月曆 (Wire-O Bound Hanging Wall Calendar Mockup)', 
        prompt: 'blank vertical hanging wall calendar mockup with wire-o double loop spiral binding and wall hook hanger, heavyweight matte uncoated art paper with natural shadow cast against clean architectural gallery wall, crisp grid layout canvas' 
      },
      { 
        id: 'mp_presentation_folder', 
        subCategory: 'paper_print', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '展開 45 x 31 cm (合攏 22.5 x 31 cm / 適用 A4 文件)',
        label: '雙口袋商務提案資料夾 / L型文件夾 (Corporate Presentation Pocket Folder & L-Folder)', 
        prompt: 'blank corporate presentation pocket folder mockup with die-cut business card slot, thick 350gsm cardstock with smooth matte lamination, open dual-pocket layout displaying clean marketing paper sheets, professional branding presentation' 
      },
      { 
        id: 'mp_sticker_holographic_laser', 
        subCategory: 'paper_print', 
        scale: 'micro',
        cost: 'cost_10',
        dimension: '直徑 Ø6 cm (圓形全息彩虹膜模切貼紙)',
        label: '雷射全息幻彩貼紙 / 彩虹光膜 (Holographic Laser Rainbow Foil Sticker)', 
        prompt: 'blank die-cut holographic vinyl sticker mockup with iridescent metallic rainbow shimmer reflections, dynamic prismatic color-shift sheen under studio spotlight, sharp contour cut line, slightly peeled corner showing adhesive liner' 
      },
      { 
        id: 'mp_sticker_matte_waterproof', 
        subCategory: 'paper_print', 
        scale: 'micro',
        cost: 'cost_10',
        dimension: '7 x 7 cm (圓角 3mm 消光 PVC 防水貼紙)',
        label: '消光霧面防水貼紙 (Matte Finish Waterproof Vinyl Sticker)', 
        prompt: 'blank premium matte finish waterproof PVC vinyl sticker mockup, velvety non-glare surface, crisp kiss-cut silhouette, modern streetwear laptop sticker aesthetic' 
      },
      { 
        id: 'mp_sticker_static_eggshell', 
        subCategory: 'paper_print', 
        scale: 'micro',
        cost: 'cost_10',
        dimension: '5 x 8 cm (易碎防偽蛋殼貼紙 / 靜電無膠貼)',
        label: '靜電無膠貼 / 易碎蛋殼防偽貼 (Static Cling & Eggshell Destructible Sticker)', 
        prompt: 'blank security eggshell destructible sticker and static cling decal mockup, micro-textured paper surface with security slit edges, pristine blank surface' 
      },
      { 
        id: 'mp_stickers_diecut_sheet', 
        subCategory: 'paper_print', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '14.8 x 21 cm (A5 模切貼紙全張組合板)',
        label: '文創模切防水貼紙組 (Die-Cut Vinyl Stickers Sheet Mockup)', 
        prompt: 'blank collection of assorted die-cut matte vinyl stickers peeled slightly from backing sheet, crisp contour cut lines, waterproof PVC texture, scattered casually on laptop cover surface' 
      },
      { 
        id: 'mp_stickers_brittle_seal', 
        subCategory: 'paper_print', 
        scale: 'micro',
        cost: 'cost_10',
        dimension: '直徑 Ø3 cm (盒裝防拆封口易碎圓貼)',
        label: '易碎防撕裂封口標籤貼紙 (Brittle Paper Security Seal & Round Stickers)', 
        prompt: 'blank round packaging seal stickers and tamper-evident security tape label mockup with subtle metallic foil accent, applied across product cardboard seam, macro studio detail' 
      },
      { 
        id: 'mp_envelope_red_packet', 
        subCategory: 'paper_print', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '9 x 18 cm (標準中式萬元千元鈔直式紅包袋)',
        label: '燙金中式紅包袋 / 喜慶紅包 (Chinese New Year Gold Foil Red Packet Envelope)', 
        prompt: 'blank luxury crimson red packet envelope (hongbao) mockup with subtle metallic gold foil edge trim, rich textured velvet paper stock, elegant festive oriental aesthetic, empty front for calligraphy or emboss' 
      },
      { 
        id: 'mp_envelope_airmail', 
        subCategory: 'paper_print', 
        scale: 'handheld',
        cost: 'cost_10',
        dimension: '11 x 22 cm (國際標準 DL 航空信封)',
        label: '經典紅白藍滾邊航空信封 (Airmail Stripe Envelope Mockup)', 
        prompt: 'blank classic vintage airmail envelope mockup with blue and red chevron parallelogram border pattern, par avion motif, textured cotton stationery paper, overhead flatlay' 
      },
      { 
        id: 'mp_stamps_sheet', 
        subCategory: 'paper_print', 
        scale: 'micro',
        cost: 'cost_100',
        dimension: '單張 3 x 4 cm / 版張 15 x 20 cm (經典齒孔郵票)',
        label: '台灣郵政復古齒孔郵票版張與單張 (Taiwan Vintage Postage Stamp Sheet & Single Stamps)', 
        prompt: 'blank sheet of perforated vintage postage stamps with delicate serrated tooth edges, gummed paper sheen, magnifying glass and stamp tweezers beside it, museum archival presentation, blank stamp artwork canvases' 
      },
      { 
        id: 'mp_business_cards', 
        subCategory: 'paper_print', 
        scale: 'micro',
        cost: 'cost_100',
        dimension: '90 x 54 mm (標準台灣名片 / 600gsm 特厚純棉卡)',
        label: '600gsm 厚磅棉卡名片 (雙面懸浮 / 壓凹/燙金邊)', 
        prompt: 'blank stack of luxury 600gsm thick cotton business cards with floating front and back cards, blind letterpress debossing, gilded foil edges, tactile macro paper stock' 
      },
      { 
        id: 'mp_stationery_set', 
        subCategory: 'paper_print', 
        scale: 'medium',
        cost: 'cost_1000',
        dimension: 'A4 信紙 210x297mm + 名片 90x54mm + DL 信封 110x220mm',
        label: '企業識別全套文具 (信紙 + 信封 + 名片 + 鋼筆)', 
        prompt: 'blank comprehensive corporate stationery branding mockup, A4 letterhead, DL envelope with wax seal, business cards, sleek metal pen, organized knolling layout' 
      },
      { 
        id: 'mp_hardcover_book', 
        subCategory: 'paper_print', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '14.8 x 21 cm (A5 精裝書籍 / 書脊厚度 2.5cm)',
        label: '精裝書本封面與書脊 (布紋裝訂 / 壓凹書背)', 
        prompt: 'blank luxury hardcover book mockup displaying front cover and debossed spine, linen cloth binding, realistic book depth and inner paper block, studio lighting' 
      },
      { 
        id: 'mp_open_lookbook', 
        subCategory: 'paper_print', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '展開 42 x 29.7 cm (A4 橫開跨頁精裝畫冊)',
        label: '開頁精裝畫冊跨頁 (Open Spread Lookbook / 弧形紙頁)', 
        prompt: 'blank open hardcover lookbook mockup, two-page editorial spread layout, smooth organic page curvature, clean negative space for graphic design layout' 
      },

      // 5. 產品3C類別
      { 
        id: 'mp_iphone16', 
        subCategory: 'products_3c', 
        scale: 'handheld',
        cost: 'cost_10000',
        dimension: '6.3 吋螢幕 (149.6 x 71.5 x 8.25 mm 鈦金屬旗艦機)',
        label: 'iPhone 16 Pro 旗艦手機 (鈦金屬邊框 / 空白螢幕)', 
        prompt: 'blank Apple iPhone 16 Pro smartphone mockup, borderless screen placeholder ready for app UI composite, brushed titanium chassis, studio rim specular highlights, isolated clean aesthetic platform' 
      },
      { 
        id: 'mp_ipad_pro', 
        subCategory: 'products_3c', 
        scale: 'medium',
        cost: 'cost_10000',
        dimension: '11 吋 Ultra Retina XDR (249.7 x 177.5 x 5.3 mm)',
        label: 'iPad Pro 懸浮平板 (Liquid Retina / 磁吸筆)', 
        prompt: 'blank Apple iPad Pro tablet mockup floating at dynamic angle, blank Liquid Retina screen, space gray aluminum unibody, sleek stylus beside it, ultra-clean studio setting' 
      },
      { 
        id: 'mp_apple_watch', 
        subCategory: 'products_3c', 
        scale: 'micro',
        cost: 'cost_10000',
        dimension: '46 mm 錶殼 (46 x 39 x 9.7 mm / 藍寶石水晶鏡面)',
        label: 'Apple Watch 智慧手錶 (氟橡膠錶帶 / 藍寶石鏡面)', 
        prompt: 'blank modern smartwatch mockup with blank OLED watch face, fluoroelastomer sport band, titanium case, studio macro lighting, high detail product showcase' 
      },
      { 
        id: 'mp_phone_tablet_duo', 
        subCategory: 'products_3c', 
        scale: 'medium',
        cost: 'cost_10000',
        dimension: 'iPhone 16 Pro (6.3") + iPad Pro (11") 雙生態協同',
        label: '手機 + 平板 雙裝置懸浮組合 (Phone & Tablet Dual Ecosystem)', 
        prompt: 'synchronized dual-device ecosystem mockup, floating smartphone and tablet with blank screen placeholders, minimal clay studio aesthetic, clean depth of field' 
      },

      // 6. 其他
      { 
        id: 'mp_acrylic_standee', 
        subCategory: 'others', 
        scale: 'handheld',
        cost: 'cost_100',
        dimension: '15 x 21 cm (A5 規格 3mm 加厚透明壓克力展示牌)',
        label: '壓克力展示立牌 / 桌面展示架 (Acrylic Desk Standee & Sign Holder)', 
        prompt: 'blank clear acrylic display standee mockup with slot-in base, polished beveled edge, realistic transparent refractions, displayed on modern minimalist retail counter, clean printable area' 
      },
      { 
        id: 'mp_wooden_engraved_plaque', 
        subCategory: 'others', 
        scale: 'medium',
        cost: 'cost_100',
        dimension: '30 x 12 x 1.5 cm (天然櫸木實木雷雕門牌)',
        label: '原木雷射雕刻掛牌 (Laser Engraved Wooden Plaque)', 
        prompt: 'blank solid wood wall hanging plaque mockup with smooth beveled borders, natural beech wood grain texture, soft morning ambient light, blank central surface ready for laser engraving or paint' 
      },
      { 
        id: 'mp_metal_membership_card', 
        subCategory: 'others', 
        scale: 'micro',
        cost: 'cost_100',
        dimension: '85.6 x 54 x 0.8 mm (標準國際信用卡尺寸 / 霧黑不鏽鋼)',
        label: '霧黑不鏽鋼金屬 VIP 會員卡 (Matte Black Stainless Steel Metal Card)', 
        prompt: 'blank luxury matte black stainless steel VIP membership card mockup, brushed metal surface texture, subtle gilded foil edge trim, floating in dark studio staging, ultra-sleek high-end presentation' 
      }
    ]
  },

  perspectivesComposition: {
    id: 'perspectivesComposition',
    name: '視角角度與鏡頭構圖',
    englishName: 'Perspectives, Angles & Optics',
    icon: 'Compass',
    stepNumber: 2,
    stepTitle: 'Step 2 • 視角與鏡頭',
    description: '三視圖、等角透視、90度俯拍、正面平視、微距特寫、85mm 鏡頭與零件拆解圖',
    subCategories: [
      { 
        id: 'orthographic_isometric', 
        name: '工程視圖與等角透視 (三視圖 / 軸測等角 / 拆解爆炸圖)', 
        englishName: 'Engineering Views & Isometric Angles', 
        color: 'cyan', 
        icon: 'Layers',
        desc: '專業三視圖 (前視/頂視/側視)、等角透視 (Isometric)、零件拆解懸浮圖' 
      },
      { 
        id: 'camera_angles', 
        name: '拍攝視角 (90°俯拍/正面平視/45°斜角/微距特寫/仰角)', 
        englishName: 'Camera Angles & Elevations', 
        color: 'indigo', 
        icon: 'Camera',
        desc: 'Flat Lay 90度俯拍、正面平視、45度立體視角、極致微距細節、微仰英雄視角' 
      },
      { 
        id: 'optics_layouts', 
        name: '鏡頭光學與構圖法 (85mm/50mm/黃金分割/雙物對比)', 
        englishName: 'Lens Optics & Layout Grids', 
        color: 'purple', 
        icon: 'Maximize2',
        desc: '85mm 淺景深大光圈、50mm 無畸變、黃金分割留白、雙物件比例對比' 
      }
    ],
    items: [
      // 1. 工程視圖與等角透視
      { 
        id: 'pc_three_view', 
        subCategory: 'orthographic_isometric', 
        label: '三視圖視角 (Front / Top / Side Orthographic Three-View CAD Layout)', 
        prompt: 'professional industrial design three-view orthographic projection layout, front elevation view, top plan view, and side profile view aligned symmetrically on technical drawing grid, clean orthographic projection, CAD blueprint precision' 
      },
      { 
        id: 'pc_isometric_pure', 
        subCategory: 'orthographic_isometric', 
        label: '等角透視 / 軸測視角 (Pure Isometric Projection 30° Axonometric)', 
        prompt: 'true isometric projection perspective, 30-degree axonometric angle, parallel projection without perspective vanishing distortion, clean geometric alignment, realistic photographic product staging' 
      },
      { 
        id: 'pc_knolling_exploded', 
        subCategory: 'orthographic_isometric', 
        label: '模組化零件拆解懸浮圖 (Knolling / Exploded Assembly View)', 
        prompt: 'isometric exploded parts view, floating disassembled components in organized knolling grid, precision engineering hierarchy, industrial product architecture' 
      },

      // 2. 拍攝視角
      { 
        id: 'pc_flatlay_90', 
        subCategory: 'camera_angles', 
        label: 'Topview / 90度俯視平拍 (Flat Lay Top-Down View)', 
        prompt: 'flat lay top-down view, 90-degree overhead perspective, straight-down bird-eye mockup angle, neat geometric arrangement, isolated clean backdrop' 
      },
      { 
        id: 'pc_frontview', 
        subCategory: 'camera_angles', 
        label: 'Frontview / 正面平視幾何視角 (Straight-On Front Elevation)', 
        prompt: 'straight-on front eye-level view, symmetrical frontal perspective, orthogonal elevation, crisp ground contact shadow' 
      },
      { 
        id: 'pc_45deg_isometric', 
        subCategory: 'camera_angles', 
        label: '45° Angle / 45度斜角立體展示 (Three-Quarter Perspective Angle)', 
        prompt: 'elevated 45-degree angle perspective, three-quarter angle product view, dynamic diagonal lighting, three-dimensional depth' 
      },
      { 
        id: 'pc_side_profile', 
        subCategory: 'camera_angles', 
        label: 'Sideview / 側面正投影輪廓 (Orthographic Side Elevation)', 
        prompt: 'side profile view, 90-degree lateral perspective, orthogonal elevation view, clean silhouette, studio backdrop' 
      },
      { 
        id: 'pc_macro_extreme', 
        subCategory: 'camera_angles', 
        label: '極致微距特寫 (Extreme 1:1 Macro Close-Up Detail)', 
        prompt: 'extreme macro close-up angle, 1:1 reproduction ratio, razor-sharp edge definition, fine surface microscopic texture focus' 
      },
      { 
        id: 'pc_low_angle_hero', 
        subCategory: 'camera_angles', 
        label: '微仰角英雄氣勢視角 (Low-Angle Hero Shot)', 
        prompt: 'dynamic low-angle upward hero shot, commanding monumental presence, sharp perspective convergence, high-end product advertisement' 
      },

      // 3. 鏡頭光學與構圖法
      { 
        id: 'pc_85mm_lens', 
        subCategory: 'optics_layouts', 
        label: '85mm 商業黃金焦段 (f/1.8 柔美淺景深散景)', 
        prompt: 'shot on 85mm prime lens at f/1.8, creamy smooth bokeh background blur, natural optical compression, tack-sharp focal plane on product' 
      },
      { 
        id: 'pc_50mm_neutral', 
        subCategory: 'optics_layouts', 
        label: '50mm 標準人眼鏡頭 (零畸變自然透視)', 
        prompt: 'shot on 50mm standard prime lens, zero barrel distortion, authentic realistic eye-level perspective, clean geometric fidelity' 
      },
      { 
        id: 'pc_golden_ratio', 
        subCategory: 'optics_layouts', 
        label: '黃金分割不對稱留白 (Golden Ratio Negative Space Framing)', 
        prompt: 'golden ratio asymmetric composition, deliberate generous negative white space for copy and typography overlay, refined visual balance' 
      },
      { 
        id: 'pc_dual_comparison', 
        subCategory: 'optics_layouts', 
        label: '雙物件比例對比陳列 (Dual Product Scale Comparison)', 
        prompt: 'paired dual object composition, showing scale, side-by-side harmonious juxtaposition, clean commercial comparison display' 
      }
    ]
  },

  materialsFinishes: {
    id: 'materialsFinishes',
    name: '材質表面與工藝紋理',
    englishName: 'Materials & Industrial Finishes',
    icon: 'Brush',
    stepNumber: 3,
    stepTitle: 'Step 3 • 材質與工藝',
    description: '陽極氧化鋁、磨砂玻璃、特厚純棉紙、卡拉拉大理石、液態矽膠與燙金工藝',
    subCategories: [
      { 
        id: 'metals_alloys', 
        name: '金屬與科技合金 (陽極氧化/拉絲/鈦合金/碳纖維)', 
        englishName: 'Metals & Advanced Alloys', 
        color: 'indigo', 
        icon: 'Cpu',
        desc: '陽極氧化噴砂鋁、拉絲不鏽鋼、消光黑曜石合金、鏡面鉻酸鍍層、鍛造碳纖維' 
      },
      { 
        id: 'glass_optics', 
        name: '玻璃與光學透光 (磨砂/超白水晶/壓克力/冷凝水珠)', 
        englishName: 'Glass & Optical Refraction', 
        color: 'cyan', 
        icon: 'Sparkles',
        desc: '磨砂半透明玻璃、超白水晶玻璃、雙色偏光壓克力、表面清涼冷凝水珠附著' 
      },
      { 
        id: 'papers_crafts', 
        name: '紙張與印刷工藝 (純棉紙/壓凹/燙金/甘蔗紙漿)', 
        englishName: 'Fine Papers & Print Finishes', 
        color: 'amber', 
        icon: 'FileText',
        desc: '600gsm 特厚純棉無酸紙、無墨深壓凹、燙霧金箔、局部亮光 UV、甘蔗模塑紙漿' 
      },
      { 
        id: 'polymers_ceramics', 
        name: '塑料、橡膠與陶瓷 (液態矽膠/素燒白瓷/大理石/實木)', 
        englishName: 'Polymers, Ceramics & Stone', 
        color: 'emerald', 
        icon: 'Layers',
        desc: '類膚手感漆液態矽膠、啞光注塑工程塑料、素燒細膩白瓷、卡拉拉大理石、天然胡桃木' 
      }
    ],
    items: [
      // 1. 金屬與科技合金
      { id: 'mf_anodized_alum', subCategory: 'metals_alloys', label: '陽極氧化噴砂鋁合金 (Apple-Grade Anodized Aluminum)', prompt: 'premium aerospace-grade bead-blasted anodized aluminum finish, fine microscopic satin grain, crisp specular highlight sheen' },
      { id: 'mf_brushed_steel', subCategory: 'metals_alloys', label: '橫向拉絲不鏽鋼 (Brushed Stainless Steel)', prompt: 'fine directional brushed stainless steel texture, anisotropic reflections, clean machined metallic lines, industrial precision' },
      { id: 'mf_matte_titanium', subCategory: 'metals_alloys', label: '消光鈦金屬 PVD 鍍膜 (Matte PVD Titanium Finish)', prompt: 'matte micro-textured titanium alloy surface, dark gunmetal PVD coating, subtle warm metallic reflections, ultra-durable luxury look' },
      { id: 'mf_liquid_chrome', subCategory: 'metals_alloys', label: '液態鏡面電鍍鉻 (Liquid Mirror Chrome)', prompt: 'flawless mirror-polished liquid chrome plating, crisp 100% specular environment reflections, hyper-reflective silver metallic surface' },
      { id: 'mf_forged_carbon', subCategory: 'metals_alloys', label: '鍛造碳纖維大理石紋理 (Forged Carbon Fiber)', prompt: 'forged chopped carbon fiber composite texture, organic marbling flake pattern, satin clear coat protection, high-performance aesthetic' },
      { id: 'mf_matte_obsidian', subCategory: 'metals_alloys', label: '消光黑曜石合金 (Matte Obsidian Stealth Black)', prompt: 'ultra-dark matte obsidian black alloy, non-reflective stealth coating, deep charcoal absorption with subtle rim highlights' },

      // 2. 玻璃與光學透光
      { id: 'mf_frosted_glass', subCategory: 'glass_optics', label: '磨砂霧面半透明玻璃 (Frosted Matte Sea Glass)', prompt: 'fine-etched translucent frosted glass, soft internal light diffusion, subsurface scattering glow, velvety matte touch' },
      { id: 'mf_crystal_glass', subCategory: 'glass_optics', label: '超白高透水晶玻璃 (Ultra-Clear Crystal Glass)', prompt: 'heavy ultra-clear optical crystal glass, high refractive index, crisp caustic light refractions, pristine transparency' },
      { id: 'mf_holographic_foil', subCategory: 'glass_optics', label: '全息幻彩雷射偏光層 (Holographic Iridescent Laser Foil)', prompt: 'dazzling holographic rainbow foil coating, prismatic iridescent sheen shifting colors dynamically with viewing angle, futuristic metallic diffraction' },
      { id: 'mf_tinted_acrylic', subCategory: 'glass_optics', label: '彩色半透明有機壓克力 (Tinted Translucent Lucite/Acrylic)', prompt: 'fluorescent tinted translucent acrylic lucite sheet, vibrant edge-lit chromatic glow, smooth polished geometric surface' },
      { id: 'mf_dichroic_film', subCategory: 'glass_optics', label: '雙色漸層偏光膜 (Dichroic Iridescent Color-Shift)', prompt: 'iridescent dichroic optical coating, rainbow chromatic prism shift, prismatic metallic gradient reflections' },
      { id: 'mf_condensation_drops', subCategory: 'glass_optics', label: '表面清涼冰鎮冷凝水珠 (Crisp Condensation Droplets)', prompt: 'microscopic photorealistic cold condensation water droplets beaded naturally across surface, refreshing ice chill mist' },

      // 3. 紙張與印刷工藝
      { id: 'mf_cotton_paper', subCategory: 'papers_crafts', label: '600gsm 特厚純棉無酸紙 (600gsm Heavyweight Cotton Rag)', prompt: 'tactile 600gsm ultra-heavyweight cotton rag paper texture, fibrous organic deckle feel, premium archival matte cardstock' },
      { id: 'mf_blind_deboss', subCategory: 'papers_crafts', label: '無墨深壓凹凸版工藝 (Blind Letterpress Deboss)', prompt: 'deep blind debossed letterpress indentation, tactile 3D relief indentation into heavy cotton stock, crisp sharp paper shadows' },
      { id: 'mf_gold_foil', subCategory: 'papers_crafts', label: '燙霧金/燙黑金箔工藝 (Matte Metallic Gold Foil Stamping)', prompt: 'hot stamped matte champagne gold foil detailing, crisp metallic gilded edges, reflective foil luxury card finish' },
      { id: 'mf_spot_uv', subCategory: 'papers_crafts', label: '局部立體亮光 UV 漆 (Spot Gloss UV Varnish Finish)', prompt: 'raised glossy clear spot UV varnish layer over velvety soft-touch matte background, tactile dual-contrast finish' },
      { id: 'mf_opp_cellophane', subCategory: 'papers_crafts', label: '高透光 OPP 玻璃紙薄膜 (High-Clarity Glossy OPP Packaging Film)', prompt: 'ultra-transparent crisp OPP cellophane packaging film, subtle natural plastic surface crinkles and specular glints, pristine see-through clarity' },
      { id: 'mf_molded_pulp', subCategory: 'papers_crafts', label: '甘蔗模塑環保紙漿 (Eco-Friendly Molded Sugarcane Pulp)', prompt: 'sustainable beige molded bagasse sugarcane fiber pulp, organic porous texture, thermoformed biodegradable packaging' },
      { id: 'mf_linen_cloth', subCategory: 'papers_crafts', label: '天然亞麻布紋裝訂 (Natural Bookbinding Woven Linen)', prompt: 'natural textured bookbinding linen fabric weave, tactile woven cloth thread grid, organic earthy textile binding' },

      // 4. 塑料、橡膠與陶瓷
      { id: 'mf_porous_diatomite', subCategory: 'polymers_ceramics', label: '珪藻土陶瓷多孔吸水質地 (Porous Absorbent Diatomite Ceramic)', prompt: 'ultra-absorbent unglazed porous ceramic diatomite stone texture, micro-grain chalky surface, subtle bevel edge, earthy natural tactile feel' },
      { id: 'mf_crystal_epoxy_dome', subCategory: 'polymers_ceramics', label: '3D 水晶滴膠高透立體弧面 (3D Crystal Clear Polyurethane Epoxy Dome)', prompt: 'thick 3D curved crystal clear polyurethane epoxy dome resin lens, high gloss optical refraction, smooth rounded liquid bubble finish' },
      { id: 'mf_soft_touch_silicone', subCategory: 'polymers_ceramics', label: '類膚感手感漆液態矽膠 (Liquid Soft-Touch Silicone)', prompt: 'ultra-soft liquid silicone rubber, velvety matte tactile soft-touch coating, non-slip dust-resistant finish, smooth ergonomic radius' },
      { id: 'mf_matte_polycarbonate', subCategory: 'polymers_ceramics', label: '啞光注塑工程塑料 (Matte Molded Polycarbonate)', prompt: 'fine VDI 3400 spark-eroded matte textured injection molded polycarbonate plastic, clean parting line definition, robust finish' },
      { id: 'mf_matte_ceramic', subCategory: 'polymers_ceramics', label: '素燒細膩白瓷 (Unglazed Matte White Ceramic)', prompt: 'fine unglazed bisque porcelain ceramic texture, smooth chalky tactile finish, soft diffused surface lighting' },
      { id: 'mf_carrara_marble', subCategory: 'polymers_ceramics', label: '義大利卡拉拉白大理石 (Carrara White Polished Marble)', prompt: 'authentic Italian Carrara white marble with subtle smoky grey organic veins, polished honed stone surface, luxury architectural plinth' },
      { id: 'mf_natural_oak', subCategory: 'polymers_ceramics', label: '天然實木紋理 (Natural Solid White Oak / Walnut Wood)', prompt: 'solid Scandinavian white oak wood grain, fine open pores, matte organic wax finish, authentic warm timber texture' }
    ]
  },

  studioLighting: {
    id: 'studioLighting',
    name: '攝影棚佈光與場景陳列',
    englishName: 'Studio Lighting & Staging',
    icon: 'Camera',
    stepNumber: 4,
    stepTitle: 'Step 4 • 佈光與展台',
    description: '柔光箱、雙色邊緣光、幾何石膏台座、懸浮漂浮、百葉窗投影與極簡展台',
    subCategories: [
      { 
        id: 'studio_lighting', 
        name: '商業棚拍光影 (柔光箱/輪廓光/硬影/百葉窗)', 
        englishName: 'Commercial Studio Lighting', 
        color: 'indigo', 
        icon: 'Sun',
        desc: '柔光箱漫射、雙色輪廓光、陽光硬影、百葉窗幾何光影、高調無影純淨光' 
      },
      { 
        id: 'podiums_staging', 
        name: '展台基座與陳列 (懸浮/石膏展台/大理石水波/純色孤立)', 
        englishName: 'Podiums, Plinths & Staging', 
        color: 'emerald', 
        icon: 'Layers',
        desc: '零重力懸浮、無縫純色孤立、粗獷石膏幾何台座、大理石水波倒影、階梯展台' 
      }
    ],
    items: [
      // 1. 商業棚拍光影
      { id: 'sl_softbox_top', subCategory: 'studio_lighting', label: '大型頂部柔光箱漫射光 (Overhead Giant Softbox)', prompt: 'commercial product photography lighting, illuminated by large overhead diffuse softbox, ultra-smooth gradient transitions, delicate ground contact shadow' },
      { id: 'sl_rim_lighting', subCategory: 'studio_lighting', label: '雙色邊緣輪廓光 (Dual-Tone Rim & Edge Accent)', prompt: 'dramatic precision rim lighting, sharp specular edge highlights tracing product silhouette, high visual separation from dark background' },
      { id: 'sl_hard_sunlight', subCategory: 'studio_lighting', label: '戲劇性高對比陽光硬影 (Dramatic Hard Sunlight & Crisp Shadows)', prompt: 'crisp direct summer sunlight, sharp architectural diagonal shadows, high contrast chiaroscuro, natural golden warmth' },
      { id: 'sl_gobo_venetian', subCategory: 'studio_lighting', label: '百葉窗/幾何光影投影 (Venetian Blind Gobo Projection)', prompt: 'subtle window venetian blind shadow projection (gobo), artistic minimal shadow play, crisp diagonal light stripes slicing across product' },
      { id: 'sl_high_key', subCategory: 'studio_lighting', label: '高調透亮無影純淨光 (High-Key Floating Studio Light)', prompt: 'high-key commercial studio lighting, ethereal bright ambience, virtually shadowless clean aesthetic, floating product clarity' },
      { id: 'sl_tyndall_rays', subCategory: 'studio_lighting', label: '自然晨光丁達爾光束 (Morning Sunbeams / Volumetric Light)', prompt: 'soft volumetric morning sunbeams, Tyndall effect light shafts through airy dust motes, gentle organic atmosphere' },
      { id: 'sl_ring_flash', subCategory: 'studio_lighting', label: '時尚環形前衛光 (High-Fashion Ring Flash Look)', prompt: 'direct ring flash commercial lighting, glossy centered specular catchlights, avant-garde editorial product showcase' },

      // 2. 展台基座與陳列
      { id: 'sl_floating_zero_g', subCategory: 'podiums_staging', label: '懸浮漂浮零重力展示 (Zero-Gravity Levitating Composition)', prompt: 'levitating floating product composition, dynamic gravity-defying balance, clean isolated environment, sharp studio highlights' },
      { id: 'sl_seamless_cyclorama', subCategory: 'podiums_staging', label: '極簡純色無縫攝影棚孤立 (Seamless Monochromatic Cyclorama)', prompt: 'isolated on pure solid neutral cyclorama studio backdrop, seamless curve, crisp contact ground shadow, ready for graphic mockup composite' },
      { id: 'sl_plaster_podium', subCategory: 'podiums_staging', label: '建築感粗獷石膏幾何台座 (Brutalist Plaster Geometric Podium)', prompt: 'geometric matte plaster podium pedestal, clean aesthetic display stand, architectural casting, soft ambient light, blank mockup space' },
      { id: 'sl_marble_water_ripple', subCategory: 'podiums_staging', label: '大理石水波倒影展台 (Marble Plinth with Water Caustics)', prompt: 'luxury polished marble plinth with clean crystal water caustic reflections, clear ripple glass surface, high-end commercial photography' },
      { id: 'sl_tiered_steps', subCategory: 'podiums_staging', label: '幾何階梯式層次展台 (Multi-Tiered Architectural Steps)', prompt: 'minimalist architectural steps and tiered platform stage, brutalist plaster staircase display, clean directional daylight cast' },
      { id: 'sl_dark_obsidian_slate', subCategory: 'podiums_staging', label: '黑曜石消光奢華底座 (Dark Luxury Obsidian Slate Plinth)', prompt: 'dark matte obsidian slate plinth, moody low-key rim lighting, subtle specular highlights, ultra-luxury aesthetic' }
    ]
  },

  designAesthetics: {
    id: 'designAesthetics',
    name: '設計語彙與美學派系',
    englishName: 'Design Philosophy & Aesthetics',
    icon: 'Shapes',
    stepNumber: 5,
    stepTitle: 'Step 5 • 風格與美學',
    description: '迪特·拉姆斯工業美學、瑞士網格、包浩斯理性主義、蘋果極簡與3D黏土原型',
    subCategories: [
      { 
        id: 'functional_minimalism', 
        name: '理性極簡與現代主義 (Dieter Rams/瑞士網格/包浩斯/蘋果)', 
        englishName: 'Functionalism & Modernism', 
        color: 'indigo', 
        icon: 'Compass',
        desc: '迪特·拉姆斯十大原則、瑞士國際主義排版、包浩斯理性、蘋果工業設計' 
      },
      { 
        id: 'luxury_avantgarde', 
        name: '高奢、質樸與概念原型 (高奢極簡/侘寂/3D黏土/賽博工業)', 
        englishName: 'Luxury, Wabi-Sabi & Prototypes', 
        color: 'amber', 
        icon: 'Sparkles',
        desc: '高奢先鋒大牌、日式侘寂陶藝、C4D/Clay 3D純白原型、粗獷主義混凝土' 
      }
    ],
    items: [
      // 1. 理性極簡與現代主義
      { 
        id: 'da_dieter_rams', 
        subCategory: 'functional_minimalism', 
        label: '迪特·拉姆斯 (Dieter Rams / Braun) 十大原則工業美學', 
        aestheticConcept: '德國工業設計之父 Dieter Rams 提出的「少，卻更好 (Weniger, aber besser)」哲學。強調產品應具備純粹功能主義、幾何極簡、中性色調與低調優雅，避免多餘裝飾。',
        prompt: 'Dieter Rams Braun design philosophy, "less but better", pure functionalism, geometric simplicity, neutral tone, subtle matte buttons, understated elegance' 
      },
      { 
        id: 'da_swiss_style', 
        subCategory: 'functional_minimalism', 
        label: '瑞士國際主義排版 (Swiss Typographic Grid Style)', 
        aestheticConcept: '1950 年代興起於瑞士的國際主義平面設計風格。強調嚴謹非對稱網格系統（Grid System）、精確無襯線字體、大膽乾淨的負空間（Negative Space）與理性幾何秩序。',
        prompt: 'Swiss International Typographic Style, structured asymmetric grid, modern minimalism, bold negative space, high contrast precision' 
      },
      { 
        id: 'da_bauhaus', 
        subCategory: 'functional_minimalism', 
        label: '包浩斯功能理性主義 (Bauhaus Form Follows Function)', 
        aestheticConcept: '包浩斯學派的核心精神「形隨機能 (Form Follows Function)」。摒棄繁複裝飾，回歸紅黃藍原色與球體、立方體、圓錐等基本幾何量體，強調工業量產與純粹工藝結合。',
        prompt: 'Bauhaus industrial design aesthetic, form follows function, primary geometric volumes, clean functional clarity' 
      },
      { 
        id: 'da_apple_clean', 
        subCategory: 'functional_minimalism', 
        label: '蘋果極簡科技美學 (Apple Industrial Hardware Aesthetic)', 
        aestheticConcept: 'Jony Ive 與 Steve Jobs 奠定的當代頂級消費電子美學。強調無縫一體成型鋁合金（Unibody）、超精準雷射倒角、純淨玻璃光澤與極致對稱留白。',
        prompt: 'Apple hardware industrial design style, pristine aluminum unibody, seamless curvature, laser-cut precision, ultra-clean commercial visual' 
      },
      { 
        id: 'da_scandinavian', 
        subCategory: 'functional_minimalism', 
        label: '北歐斯堪地那維亞有機極簡 (Scandinavian Warm Minimalism)', 
        aestheticConcept: '融合大自然有機形態與溫暖人本主義的北歐風格。注重柔和大地色系、淺色木質肌理、柔光漫射與功能寧靜感，營造舒適溫馨的極簡氛圍。',
        prompt: 'Scandinavian design aesthetic, warm organic minimalism, muted earthy tones, light timber accents, harmonious functional serenity' 
      },

      // 2. 高奢、質樸與概念原型
      { 
        id: 'da_clay_prototype', 
        subCategory: 'luxury_avantgarde', 
        label: 'C4D / Clay 3D 消光純白黏土原型 (Clay Render / AO)', 
        aestheticConcept: '工業設計與 3D 概念提案必備的「白模原型（Clay Shader / Ambient Occlusion Pass）」。完全去除色彩與紋理干擾，以純粹消光白展現產品的曲面拓撲、輪廓光影與空間比例。',
        prompt: '3D clay render of product prototype, pure matte white shader, ambient occlusion pass, smooth topology, Industrial Design CAD rendering' 
      },
      { 
        id: 'da_luxury_haute', 
        subCategory: 'luxury_avantgarde', 
        label: '頂級高奢極簡攝影 (High-End Luxury Editorial Aesthetic)', 
        aestheticConcept: '如 Celine、The Row、Aesop 等高奢品牌的商業形象風格。注重低飽和氛圍感光影、精緻材質觸感、大片留白與高貴克制的藝術情緒。',
        prompt: 'high-fashion luxury brand commercial aesthetic, Celine and Aesop inspired minimalism, moody atmospheric sophistication, refined tactile wealth' 
      },
      { 
        id: 'da_wabi_sabi', 
        subCategory: 'luxury_avantgarde', 
        label: '日式侘寂質樸工藝 (Wabi-Sabi Organic Imperfection)', 
        aestheticConcept: '源自日本傳統美學的「侘寂 (Wabi-Sabi)」。欣賞質樸、殘缺、歲月風化與天然手工陶土的不對稱美感，呈現寧靜致遠的質地與禪意留白。',
        prompt: 'Wabi-sabi aesthetic, earthy raw clay textures, weathered organic serenity, handcrafted natural beauty, muted neutral palette' 
      },
      { 
        id: 'da_brutalism', 
        subCategory: 'luxury_avantgarde', 
        label: '粗獷主義混凝土幾何 (Brutalist Monolithic Architectural Form)', 
        aestheticConcept: '粗獷主義（Brutalism）以裸露澆築清水混凝土（Béton Brut）、龐大厚重的幾何單體結構與強烈的明暗光影為特色，賦予產品如同雕塑紀念碑般的莊嚴氣場。',
        prompt: 'Brutalism architectural aesthetic, raw cast concrete plinth, massive geometric monolithic forms, stark dramatic shadows' 
      },
      { 
        id: 'da_cyber_industrial', 
        subCategory: 'luxury_avantgarde', 
        label: '賽博工業概念硬體 (Cyber-Industrial Precision Hardware)', 
        aestheticConcept: '結合高科技賽博龐克與重工業精密機構的硬體美學。具備散熱鰭片、鈦合金緊固件、工程模組化接縫與冷冽金屬光澤，營造極致專業的未來儀器感。',
        prompt: 'cyber-industrial concept hardware, exposed cooling fins, precision titanium fasteners, technical futuristic device aesthetic' 
      }
    ]
  },

  negativePurity: {
    id: 'negativePurity',
    name: 'Mockup 專用純淨度與負向排除',
    englishName: 'Mockup Purity & Anti-Defect Controls',
    icon: 'ShieldAlert',
    stepNumber: 6,
    stepTitle: 'Step 6 • 純淨度與負向排除',
    description: '專為貼圖後製打造：杜絕亂碼文字、去除背景雜物、防止結構扭曲與塑膠反光',
    subCategories: [
      { 
        id: 'mockup_purity', 
        name: '純淨留白與文字排除 (Mockup 必選)', 
        englishName: 'Blank Purity & No Typography', 
        color: 'red', 
        icon: 'FileText',
        desc: '杜絕任何亂碼文字、去浮水印LOGO、去人物手指、純淨留白待貼圖' 
      },
      { 
        id: 'defect_control', 
        name: '結構校正與畫質防崩 (防止扭曲/廉價塑料/過曝)', 
        englishName: 'Defect Control & Optical Quality', 
        color: 'rose', 
        icon: 'ShieldAlert',
        desc: '防透視歪斜、防塑料廉價感、防過曝死白、防模糊噪點與壓縮雜訊' 
      }
    ],
    items: [
      // 1. 純淨留白與文字排除
      { id: 'np_no_text_logo', subCategory: 'mockup_purity', label: '杜絕任何文字、亂碼與LOGO (Mockup 貼圖核心必選)', prompt: 'text, letters, words, font, typography, gibberish writing, watermark, logo, brand emblem, signature, label text, copyright, barcode, qr code' },
      { id: 'np_no_people_hands', subCategory: 'mockup_purity', label: '去除人物、手指與身體 (無人純淨靜物展示)', prompt: 'human, people, person, man, woman, hands, fingers, distorted fingers, thumbs, model holding product, skin texture, crowd' },
      { id: 'np_clean_isolated', subCategory: 'mockup_purity', label: '排除雜亂背景與環境道具 (孤立純淨主體)', prompt: 'cluttered background, messy room, random objects, dirty surface, complex wallpaper, kitchen mess, outdoor crowds' },
      { id: 'np_no_noise_specks', subCategory: 'mockup_purity', label: '去除灰塵、刮痕與雜訊顆粒 (合成必選)', prompt: 'dust specks, dirty spots, scratches, sensor noise, dirty background, chromatic aberration, compression artifacts' },
      { id: 'np_no_crop_border', subCategory: 'mockup_purity', label: '完整邊緣 / 防止被邊框截斷 (Framing Protection)', prompt: 'cropped, cut off, out of frame, split screen, border, frame, margin cut' },

      // 2. 結構校正與畫質防崩
      { id: 'np_no_warped_geometry', subCategory: 'defect_control', label: '防止幾何歪斜扭曲 (Preserve Straight Geometric Lines)', prompt: 'warped geometry, crooked lines, bent edges, melted plastic, asymmetrical deformation, distorted perspective' },
      { id: 'np_no_cheap_plastic', subCategory: 'defect_control', label: '防止廉價塑料假感與油光 (Anti-Cheap Plastic Gloss)', prompt: 'cheap plastic look, toy plastic, overly shiny greasy gloss, oily reflections, uncanny valley render' },
      { id: 'np_no_overexposure', subCategory: 'defect_control', label: '防止高光過曝死白與死黑 (Balance Specular Highlights)', prompt: 'overexposed, blown out highlights, extreme specular flare, clipped shadows, washed out contrast' },
      { id: 'np_no_blurry_lowres', subCategory: 'defect_control', label: '防止畫面模糊與低解析度 (Crystal Sharp Focus)', prompt: 'blurry, out of focus, low resolution, jpeg artifacts, pixelated, muddy textures, smudged details' },
      { id: 'np_no_muddy_colors', subCategory: 'defect_control', label: '防止濁色與色彩混濁 (Clean Color Separation)', prompt: 'muddy colors, desaturated grey wash, dull uninspiring lighting, sickly yellow tint' }
    ]
  }
};

// 支援的 AI 引擎與模型版本
export const midjourneyVersions = [
  { 
    id: 'v8.2', 
    name: 'Midjourney v8.2', 
    shortName: 'V8.2',
    param: '--v 8.2', 
    strength: '超高解析商業級渲染、邊緣光影極度精準、細節零瑕疵', 
    suitableFor: '3C硬體、高端瓶器包裝、電商海報、UI Mockup',
    desc: '最新旗艦版，專為工業設計與商業視覺調校之頂級核心' 
  },
  { 
    id: 'v7', 
    name: 'Midjourney v7', 
    shortName: 'V7',
    param: '--v 7', 
    strength: '語義精準理解、幾何結構穩固、支援快速概念草稿', 
    suitableFor: '工業設計概念發想、結構草模、包裝多角度',
    desc: '精準語意理解，幾何控制力極佳' 
  },
  { 
    id: 'v6.1', 
    name: 'Midjourney v6.1', 
    shortName: 'V6.1',
    param: '--v 6.1', 
    strength: '成熟商業攝影光影、真實材質物理反光、柔和漸層', 
    suitableFor: '磨砂玻璃、陽極氧化鋁、奢華攝影棚展示',
    desc: '物理材質與高階光學反射成熟穩定' 
  },
  { 
    id: 'v6.0', 
    name: 'Midjourney v6.0', 
    shortName: 'V6.0',
    param: '--v 6.0', 
    strength: '標準商業排版構圖與穩定立體透視', 
    suitableFor: '平面印刷海報、名片精裝書、紙盒展示',
    desc: '結構穩定之經典通用版' 
  }
];

// 精選商業設計調色盤 (Commercial Design Hex Palettes)
export const presetPalettes = [
  {
    name: '瑞士冷調極簡 (Swiss Minimalist)',
    colors: ['#0A0A0A', '#F5F5F7', '#E2E8F0', '#0055FF', '#64748B']
  },
  {
    name: '科技鈦金黑曜 (Titanium Obsidian)',
    colors: ['#090D16', '#1E293B', '#94A3B8', '#FF6B00', '#F8FAFC']
  },
  {
    name: '北歐溫潤石膏 (Nordic Sandstone)',
    colors: ['#EBE6DD', '#3C3633', '#7469B6', '#AD8B73', '#F9F8F6']
  },
  {
    name: '高奢香氛黑白金 (Luxury Noir & Gold)',
    colors: ['#121212', '#D4AF37', '#E5E5E5', '#2A2A2A', '#FAFAFA']
  },
  {
    name: '包浩斯經典幾何 (Bauhaus Primary)',
    colors: ['#E63946', '#1D3557', '#F1FAEE', '#FFB703', '#111111']
  },
  {
    name: '生態甘蔗綠調 (Eco Botanical)',
    colors: ['#283618', '#606C38', '#DDA15E', '#BC6C25', '#FEFAE0']
  }
];

// 商業設計專用快速模板 (One-Click Studio Templates)
export interface MockupTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  subject: string;
  aspectRatio: string;
  stylize: string;
  selectedIds: string[];
}

export const mockupQuickTemplates: MockupTemplate[] = [
  {
    id: 'tw_street_signboard',
    name: '台灣街頭直式與凸出招牌',
    category: '台灣日常',
    description: '街頭直式側掛招牌與圓形凸出燈箱、水泥建築牆面、自然陽光斜射',
    subject: 'blank vertical hanging shop signboard and projecting round lightbox on Taiwanese street facade',
    aspectRatio: '16:9',
    stylize: '100',
    selectedIds: ['mp_tw_signboard_vertical', 'sl_hard_sunlight', 'pc_frontview', 'da_swiss_style', 'np_no_text_logo', 'np_no_people_hands']
  },
  {
    id: 'tw_breakfast_packaging',
    name: '台灣經典早餐店全套包裝',
    category: '台灣日常',
    description: '漢堡紙盒、三明治三角袋、大冰奶封口杯、晨間朝陽清新採光',
    subject: 'blank Taiwanese breakfast diner burger box, triangular sandwich pack, and iced milk tea cup with seal film',
    aspectRatio: '16:9',
    stylize: '120',
    selectedIds: ['mp_breakfast_burger_box', 'mp_breakfast_sandwich_bag', 'mp_breakfast_milk_tea_cup', 'sl_morning_sun', 'pc_eye_level', 'da_swiss_style', 'np_no_text_logo', 'np_no_people_hands']
  },
  {
    id: 'tw_fried_chicken_snack',
    name: '鹽酥雞與炸物防油紙袋',
    category: '台灣日常',
    description: '經典防油牛皮紙袋、鋸齒邊緣、竹籤、暖色市集光影',
    subject: 'blank Taiwanese crispy fried chicken greaseproof kraft paper bag mockup with bamboo skewers',
    aspectRatio: '4:3',
    stylize: '120',
    selectedIds: ['mp_snack_fried_chicken_bag', 'mp_tw_boba_cup', 'mf_cotton_paper', 'sl_high_key', 'pc_45deg_isometric', 'np_no_text_logo']
  },
  {
    id: 'tw_chinese_fan_merch',
    name: '中式竹骨摺扇與文創周邊',
    category: '台灣日常',
    description: '180° 展開竹骨宣紙摺扇、純棉帆布托特包、東方禪意竹影',
    subject: 'blank traditional Chinese bamboo folding fan and minimalist cotton canvas tote bag mockup',
    aspectRatio: '1:1',
    stylize: '100',
    selectedIds: ['mp_fan_chinese_folding', 'mp_canvas_tote_heavy', 'mf_cotton_paper', 'sl_softbox_top', 'pc_flatlay_90', 'da_wabi_sabi', 'np_no_text_logo', 'np_no_people_hands']
  },
  {
    id: 'tw_stamps_and_envelopes',
    name: '中式燙金紅包、航空信封與郵票',
    category: '台灣日常',
    description: '燙金紅包袋、經典航空信封、齒孔郵票版張、模切貼紙精緻平拍',
    subject: 'blank red packet envelope, par avion airmail envelope, and vintage perforated postage stamps sheet knolling',
    aspectRatio: '16:9',
    stylize: '100',
    selectedIds: ['mp_envelope_red_packet', 'mp_envelope_airmail', 'mp_stamps_sheet', 'mp_stickers_diecut_sheet', 'sl_softbox_top', 'pc_flatlay_90', 'da_swiss_style', 'np_no_text_logo']
  },
  {
    id: 'tw_beer_and_boba',
    name: '143ml 熱炒啤酒杯與手搖飲',
    category: '台灣日常',
    description: '經典 143ml 玻璃小杯、手搖飲封口杯、冰鎮水珠、熱炒在地氛圍',
    subject: 'blank iconic Taiwanese 143ml glass beer tumbler and takeaway drink cup with cold condensation droplets',
    aspectRatio: '4:3',
    stylize: '120',
    selectedIds: ['mp_tw_beer_glass_143ml', 'mp_tw_boba_cup', 'mf_condensation_drops', 'sl_high_key', 'pc_45deg_isometric', 'np_no_text_logo']
  },
  {
    id: 'tw_absorbent_coasters',
    name: '圓形與方形陶瓷吸水杯墊',
    category: '文創周邊',
    description: '圓形與方形圓角多孔珪藻土陶瓷吸水杯墊、防滑軟木底、自然晨光咖啡桌',
    subject: 'blank circular and square rounded absorbent diatomite ceramic coaster set with cork backing mockup',
    aspectRatio: '16:9',
    stylize: '100',
    selectedIds: ['mp_coaster_round_ceramic', 'mp_coaster_square_ceramic', 'mf_porous_diatomite', 'sl_tyndall_rays', 'pc_flatlay_90', 'da_swiss_style', 'np_no_text_logo']
  },
  {
    id: 'tw_holographic_stickers',
    name: '全息雷射幻彩貼紙與模切貼',
    category: '文創周邊',
    description: '雷射全息彩虹光膜、消光防水貼紙、微翹撕開感',
    subject: 'blank die-cut holographic rainbow laser foil sticker and matte waterproof stickers mockup set',
    aspectRatio: '4:3',
    stylize: '120',
    selectedIds: ['mp_sticker_holographic_laser', 'mp_sticker_matte_waterproof', 'mp_stickers_diecut_sheet', 'mf_holographic_foil', 'sl_ring_flash', 'pc_45deg_isometric', 'np_no_text_logo']
  },
  {
    id: 'tw_merch_opp_header',
    name: '商品 OPP 袋與釘裝吊卡包裝',
    category: '包裝設計',
    description: '高透 OPP 自黏袋、重磅紙板釘裝吊卡/頭卡、歐洲掛孔、乾淨商品陳列',
    subject: 'blank clear transparent poly OPP packaging bag with stapled cardstock header card and euro slot hole hanging mockup',
    aspectRatio: '1:1',
    stylize: '100',
    selectedIds: ['mp_packaging_header_card_bag', 'mp_packaging_opp_bag', 'mf_opp_cellophane', 'sl_softbox_top', 'pc_frontview', 'da_swiss_style', 'np_no_text_logo']
  },
  {
    id: 'apple_3c_showcase',
    name: 'Apple 3C 旗艦展示 (手機/平板)',
    category: '3C科技',
    description: 'iPhone 16 Pro 與懸浮平板，陽極氧化鋁與極簡石膏展台，柔光箱頂部漫射',
    subject: 'blank Apple iPhone 16 Pro and iPad Pro floating in synchronized harmony, blank screen placeholders',
    aspectRatio: '16:9',
    stylize: '150',
    selectedIds: ['mp_iphone16', 'mp_ipad_pro', 'mf_anodized_alum', 'sl_softbox_top', 'sl_plaster_podium', 'pc_45deg_isometric', 'da_apple_clean', 'np_no_text_logo', 'np_no_people_hands']
  },
  {
    id: 'industrial_three_view',
    name: '工業設計精確三視圖',
    category: '工業設計',
    description: '正面/頂面/側面 CAD 三視圖排版，等角視角，極簡工程藍圖網格',
    subject: 'industrial design product CAD three-view orthographic technical drawing projection layout',
    aspectRatio: '16:9',
    stylize: '50',
    selectedIds: ['pc_three_view', 'da_dieter_rams', 'np_no_warped_geometry', 'np_no_text_logo', 'np_no_people_hands']
  },
  {
    id: 'isometric_box_mockup',
    name: '等角透視包裝盒展示',
    category: '包裝設計',
    description: '純粹 30° 軸測等角透視，天地蓋精裝禮盒，消光紙質，純淨展台',
    subject: 'blank luxury two-piece rigid gift box mockup in pure isometric projection',
    aspectRatio: '1:1',
    stylize: '100',
    selectedIds: ['mp_rigid_box', 'pc_isometric_pure', 'mf_cotton_paper', 'sl_high_key', 'da_swiss_style', 'np_no_text_logo']
  }
];
