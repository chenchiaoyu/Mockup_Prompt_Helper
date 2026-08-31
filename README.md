# 提示詞窮救星 Mockup Prompt Helper

<div align="center">

![React](https://img.shields.io/badge/React-18.x-blue.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg?logo=vite)
![Version](https://img.shields.io/badge/Version-v2.5.0-orange.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**專為品牌設計師、包裝設計師、電商視覺與行銷人打造的工業級 Mockup 提示詞建構工作台**  
告別 AI 生成時的拉伸變形、尺寸失真、塑料感與歐美千篇一律模板，精準控制光學透視與真實物理比例！

</div>

---

## 📋 版本更新日誌 (Changelog & Version Notes)

### 🚀 v2.5.0 (最新版本)
- 📐 **參考尺寸精確防形變系統**：
  - 重構尺寸輸入模組，支援長度/高度（H/L）、寬度（W）、厚度/深度（D）與單位（`cm`、`mm`、`m`、`inch`）自由設定。
  - 將過於擁擠的外層尺寸標籤移入「完整提示詞檢視器」內獨立展示，UI 介面更加清爽乾淨。
  - 自動注入 `accurate product scale ratio, true-to-scale commercial proportions` 工業防變形語法。
- 🔬 **光學原理與相機視角高解析幾何圖解**：
  - 在卡片點擊 **「i」** 彈窗中，全面升級為**寬幅高解析度幾何圖解**，清晰呈現 CAD 三視圖、30° 軸測等角透視、90° 垂直俯視（Flat Lay）、0° 正視對稱、85mm 人像淺景深與微距結構。
- 🌐 **UI 圖示語意全面優化**：
  - **地球圖示（Globe 🌐）**：一鍵開啟 Google 搜尋網路實物圖片與真實照片參考。
  - **資訊圖示（Info ℹ️）**：點擊開啟詳細提示詞檢視視窗，內含完整英文 Prompt、美學哲學解說、參考尺寸與光學大圖。
---

## 🎯 核心功能描述 (Core Features)

本系統以「專業工業設計與商業攝影工作流」為核心，提供 6 大功能模組：

### 1. 📐 參考尺寸比例鎖定 (Anti-Distortion Dimension Lock)
- **自由自訂長寬高**：提供長度/高度（H/L）、寬度（W）、厚度/深度（D，選填）與常用單位（`cm`、`mm`、`m`、`inch`）輸入介面。
- **物理比例語法注入**：自動在提示詞中注入 `exact real-world product dimensions`、`accurate physical scale ratio` 與 `true-to-scale commercial proportions` 指令，鎖定物理維度，解決 AI 缺乏尺度認知所導致的拉伸形變。

### 2. 🧋 台灣日常與在地化商業載體 (Taiwan & Asian Localization)
收錄專屬台灣與亞洲設計市場的高頻實體載體：
- **街頭與餐飲實景**：台灣街頭凸出圓形燈箱招牌、斑駁鐵捲門水泥牆、143ml 經典熱炒啤酒杯、手搖飲封口杯、日式居酒屋關東煮木座立旗。
- **文創與周邊商品**：日本和紙膠帶捲（Washi Tape）、精裝綁帶手帳本、雙圈鐵環掛式月曆、活動手拿旗、露營掛繩三角旗、純棉托特包、吸水陶瓷杯墊。
- **商務印刷與紙品**：A0-A4 國際規格海報、企業雙口袋厚磅提案資料夾、頂級燙金/壓凸名片、企業掛繩識別證。
- **旗艦數位 3C**：iPhone 16 Pro 旗艦手機、iPad Pro、MacBook Pro、Studio Display 5K 顯示器。
- **3D 結構原型**：C4D/Clay 純白黏土模型、消光樹脂概念模型、Knolling 零件拆解懸浮圖（Exploded View）、環境光遮蔽（AO）。

### 3. 🔬 光學原理與專業相機視角概念視覺化 (Optical Geometry & Perspectives)
點擊卡片右上角 **「i」** 資訊按鈕即可在完整檢視視窗中查閱**高解析度幾何光學概念大圖**：
- **CAD 三視圖 (Orthographic Three-View)**：前視、頂視、側視工程級無透視投影。
- **30° 軸測等角透視 (Pure Isometric 30°)**：無消失點、無透視畸變的平行投影。
- **90° 垂直俯視平拍 (Flat Lay / Top-Down)**：桌面文具排版與物件陳列必備。
- **0° 正視對稱 (Frontal Symmetrical Eye-Level)**：展現幾何平衡與標籤細節。
- **85mm 淺景深人像焦段 vs 50mm 人眼真實無畸變標準鏡頭**。
- **微距特寫 (Macro Close-up)**：捕捉紙張纖維、燙金反光與金屬拉絲微觀細節。

### 4. 🌐 網路實物對照 (Google Real-World Reference)
- 每個載體與美學標籤皆內嵌 **「地球 🌐」** 按鈕，一鍵直達 Google 搜尋真實產品實物圖與參考照片，方便設計師核對實體細節。

### 5. 🎨 品牌 Hex 色票注入 & 顆粒質感控制器 (Color Grading & Texture)
- **品牌 Hex 色票注入**：輸入品牌 16 進位色碼（如 `#0F172A`, `#0284C7`），支援 **主色調支配 (Dominant)**、**局部點綴 (Accent)**、**環境氛圍渲染 (Atmospheric)** 三種層級。
- **6 大物理噪點檔位**：從極致純淨商業棚拍（0% Clean）、微細有機顆粒（25% Subtle）、35mm 柯達膠卷（50% ISO 400）到粗礪復古（80% ISO 1600）與孔版印刷網點（Risograph）。

### 6. ⚡ 雙引擎切換 (Midjourney & Universal AI)
- **Midjourney 引擎**：針對 Midjourney V8.2、V7、V6.1、Niji 7 自動封裝 `--ar`、`--s`、`--c`、`--no` 等完整指令。
- **Universal 通用 AI 引擎**：針對 DALL-E 3、Stable Diffusion (SDXL)、Flux、Imagen 3 等自然語言模型自動重構為語義連貫的英文段落。

<div align="center">
  <sub>Made with ❤️ for Designers, Packaging Creators, and AI Prompters.</sub>
</div>
