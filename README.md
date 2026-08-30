# 提示詞窮救星 PROMPT Helper (MJ • UNIVERSAL AI)

[![Deploy to GitHub Pages](https://github.com/chenchiaoyu/Prompt_Helper/actions/workflows/deploy.yml/badge.svg)](https://github.com/chenchiaoyu/Prompt_Helper/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?logo=github)](https://chenchiaoyu.github.io/Prompt_Helper/)

專為 Midjourney (V8.2, V7, V6.1, Niji 7) 與通用自然語言 AI 模型（DALL-E 3, SDXL, Flux 等）量身打造的專業級美學提示詞生成與商業視覺調校工作台。

## 🌐 線上展示 (Live Demo)
👉 [https://chenchiaoyu.github.io/Prompt_Helper/](https://chenchiaoyu.github.io/Prompt_Helper/)

---

## ✨ 核心特色功能 (Core Features)

### 1. 📸 產品設計與平面商業 Mockup 工作流
- **精準機位視角置頂**：支援 90° Topview 俯視平拍、Sideview 側面平視、正面平視、45° 斜角立體、高角度鳥瞰與微距特寫。
- **規格化海報與品牌實體**：完整收錄 A0 至 A4 國際標準尺寸紙張海報、企業掛繩識別證、垂墜布旗、精裝書本/作品集畫冊與頂級凹凸壓印名片。
- **Apple 蘋果數位載體**：iPad Pro 平板、iPhone 鈦金屬手機、MacBook Pro 筆電、iMac / Studio Display 5K 顯示器。
- **背景陳列與場景光影**：百葉窗幾何光影投影 (Gobo)、懸浮漂浮動態、幾何石膏展台、大理石水波紋、消光黑曜石奢華陳列。
- **3D 黏土原型與立體渲染**：C4D/Clay 純白黏土模型、灰階拓撲結構網格線 (Wireframe)、消光樹脂概念模型、純光影 AO 環境光遮蔽、爆炸拆解組件圖。

### 2. 🎛️ 即時參數與質地控制台
- **噪點與顆粒質感控制器 (Noise & Grain Controller)**：
  - 6 大質地檔位：`預設`、`0% 極致純淨無噪點 (Clean)`、`25% 微細有機顆粒 (Subtle)`、`50% 35mm 柯達膠卷 (ISO 400)`、`80% 粗礪復古噪點 (ISO 1600)`、`網點/孔版印刷 (Risograph Halftone)`。
  - 即時顯示顆粒強度指示條（Density %），自動注入正向質地標籤與負向降噪保護詞。
- **指定色票色感 (Hex Color Palette)**：
  - 支援自訂輸入 16 進位 HEX 色碼（最多 8 組）與精選經典色票快速套用。
  - 支援三大色彩權重模式：主色調支配 (Dominant)、局部點綴 (Accent)、環境氛圍渲染 (Atmospheric)。
- **指定參考構圖藍圖 (Composition Blueprint)**：
  - 支援填入構圖參考圖 URL，鎖定空間佈局與透視角度，並自動於負向提示詞加入風格隔離指令，防止原圖色彩與風格污染。

### 3. ⚡ 雙引擎提示詞架構
- **Midjourney 引擎**：支援最新 V8.2、V7、V6.1、Niji 7，精準調校 `--ar`、`--s`、`--c`、`--no` 等完整指令。
- **Universal 通用 AI 引擎**：為 DALL-E 3、SDXL、Flux 等模型自動轉換為語義流暢的英文提示詞句子結構。

### 4. 📱 極致的操作與行動端體驗
- **結構化子分類摺疊**：分類超過 10 個標籤時自動啟用標籤計數與獨立摺疊手風琴面板。
- **手機端專屬導航**：底部固定快速切換列與多欄標籤網格優化。
- **純淨起始狀態**：進入網頁或點擊重置時，預設保持完全乾淨空白，不預先帶入任何干擾選項。

---

## 🛠️ 技術架構 (Tech Stack)

- **前端框架**：React 18 + TypeScript + Vite
- **樣式與動畫**：Tailwind CSS + Motion (Framer Motion)
- **圖示庫**：Lucide React
- **部署支援**：GitHub Pages、Cloud Run、Vercel、Netlify

---

## 🚀 本地端開發 (Local Development)

```bash
# 1. 複製專案儲存庫
git clone https://github.com/chenchiaoyu/Prompt_Helper.git

# 2. 進入專案目錄
cd Prompt_Helper

# 3. 安裝依賴套件
npm install

# 4. 啟動開發伺服器
npm run dev
```

---

## 📄 授權條款 (License)
本專案採用 MIT 授權條款，歡迎自由使用與交流。

