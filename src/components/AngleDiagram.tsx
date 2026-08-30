import React from 'react';

interface AngleDiagramProps {
  itemId: string;
  className?: string;
}

export const AngleDiagram: React.FC<AngleDiagramProps> = ({ itemId, className = 'w-full h-28' }) => {
  switch (itemId) {
    case 'pc_three_view':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-cyan-400 border border-cyan-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Background CAD Technical Grid */}
            <defs>
              <pattern id="cadGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="280" height="100" fill="url(#cadGrid)" />

            {/* Top View (Plan) */}
            <g transform="translate(20, 10)">
              <rect x="0" y="0" width="55" height="30" rx="2" stroke="#22d3ee" strokeWidth="2" fill="rgba(6, 182, 212, 0.15)" />
              <text x="27.5" y="19" fontSize="10" fill="#a5f3fc" textAnchor="middle" stroke="none" className="font-mono font-bold">TOP 頂視</text>
            </g>

            {/* Projection Lines (Vertical) */}
            <line x1="20" y1="40" x2="20" y2="52" stroke="#0891b2" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="75" y1="40" x2="75" y2="52" stroke="#0891b2" strokeWidth="1.2" strokeDasharray="3 2" />
            
            {/* Front View (Elevation) */}
            <g transform="translate(20, 52)">
              <rect x="0" y="0" width="55" height="38" rx="2" stroke="#38bdf8" strokeWidth="2.2" fill="rgba(56, 189, 248, 0.25)" />
              <text x="27.5" y="23" fontSize="10" fill="#e0f2fe" textAnchor="middle" stroke="none" className="font-mono font-bold">FRONT 正視</text>
            </g>

            {/* Projection Lines (Horizontal) */}
            <line x1="75" y1="52" x2="95" y2="52" stroke="#0891b2" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="75" y1="90" x2="95" y2="90" stroke="#0891b2" strokeWidth="1.2" strokeDasharray="3 2" />

            {/* Side View (Profile) */}
            <g transform="translate(95, 52)">
              <rect x="0" y="0" width="35" height="38" rx="2" stroke="#22d3ee" strokeWidth="2" fill="rgba(6, 182, 212, 0.15)" />
              <text x="17.5" y="23" fontSize="10" fill="#a5f3fc" textAnchor="middle" stroke="none" className="font-mono font-bold">SIDE 側視</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(145, 18)">
              <rect x="0" y="0" width="125" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#0e7490" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#38bdf8" stroke="none" className="font-bold">📐 CAD 三視圖配置</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">前視 • 頂視 • 側視對齊</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">零透視變形 / 工業標準</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_isometric_pure':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-sky-400 border border-sky-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Isometric 30 degree Cube */}
            <g transform="translate(68, 52)">
              {/* 30° Baseline Guide Rays */}
              <line x1="-55" y1="18" x2="55" y2="-18" stroke="#0369a1" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="-55" y1="-18" x2="55" y2="18" stroke="#0369a1" strokeWidth="1" strokeDasharray="3 3" />

              {/* Top Face */}
              <polygon points="0,-32 38,-10 0,12 -38,-10" fill="rgba(56, 189, 248, 0.35)" stroke="#38bdf8" strokeWidth="2" />
              <text x="0" y="-8" fontSize="9" fill="#e0f2fe" textAnchor="middle" stroke="none" className="font-bold">TOP</text>

              {/* Left Face */}
              <polygon points="-38,-10 0,12 0,44 -38,22" fill="rgba(14, 165, 233, 0.2)" stroke="#38bdf8" strokeWidth="2" />
              <text x="-19" y="24" fontSize="9" fill="#bae6fd" textAnchor="middle" stroke="none" className="font-bold">30°</text>

              {/* Right Face */}
              <polygon points="0,12 38,-10 38,22 0,44" fill="rgba(2, 132, 199, 0.45)" stroke="#38bdf8" strokeWidth="2" />
              <text x="19" y="24" fontSize="9" fill="#bae6fd" textAnchor="middle" stroke="none" className="font-bold">30°</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#0369a1" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#38bdf8" stroke="none" className="font-bold">🧊 30° 軸測等角透視</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">平行軸線無消失點</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">Pure Isometric / 幾何立體</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_knolling_exploded':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-indigo-400 border border-indigo-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Exploded Disassembled Layers */}
            <g transform="translate(68, 18)">
              {/* Top Layer */}
              <rect x="-35" y="0" width="70" height="14" rx="3" stroke="#818cf8" strokeWidth="2" fill="rgba(129, 140, 248, 0.35)" />
              <text x="0" y="10" fontSize="8.5" fill="#e0e7ff" textAnchor="middle" stroke="none" className="font-bold">外殼 (Top Shell)</text>
              
              {/* Exploded Axis 1 */}
              <line x1="0" y1="14" x2="0" y2="24" stroke="#a5b4fc" strokeWidth="1.5" strokeDasharray="2 2" />

              {/* Middle Component */}
              <rect x="-42" y="24" width="84" height="16" rx="3" stroke="#6366f1" strokeWidth="2" fill="rgba(99, 102, 241, 0.3)" />
              <text x="0" y="35" fontSize="8.5" fill="#e0e7ff" textAnchor="middle" stroke="none" className="font-bold">核心主板 (Circuit/PCB)</text>

              {/* Exploded Axis 2 */}
              <line x1="0" y1="40" x2="0" y2="50" stroke="#a5b4fc" strokeWidth="1.5" strokeDasharray="2 2" />

              {/* Base Component */}
              <rect x="-48" y="50" width="96" height="16" rx="3" stroke="#818cf8" strokeWidth="2" fill="rgba(129, 140, 248, 0.45)" />
              <text x="0" y="62" fontSize="8.5" fill="#e0e7ff" textAnchor="middle" stroke="none" className="font-bold">底座結構 (Chassis)</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#4338ca" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#818cf8" stroke="none" className="font-bold">🧩 零件拆解懸浮圖</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">層次分明 Knolling</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">模組化結構 / 內部細節</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_flatlay_90':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-amber-400 border border-amber-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Top-down Camera Beam */}
            <g transform="translate(65, 12)">
              {/* Overhead Camera */}
              <rect x="-18" y="0" width="36" height="20" rx="4" stroke="#f59e0b" strokeWidth="2" fill="rgba(245, 158, 11, 0.25)" />
              <circle cx="0" cy="10" r="5" stroke="#fbbf24" strokeWidth="2" />
              <rect x="-6" y="-4" width="12" height="4" rx="1" fill="#f59e0b" />

              {/* 90° Downward Vision Cone */}
              <polygon points="-12,20 -40,62 40,62 12,20" fill="rgba(245, 158, 11, 0.12)" stroke="none" />
              <line x1="0" y1="20" x2="0" y2="58" stroke="#fbbf24" strokeWidth="1.8" strokeDasharray="3 2" />
              <polygon points="-3,54 0,60 3,54" fill="#fbbf24" stroke="none" />

              {/* Flat Desk Item */}
              <rect x="-44" y="62" width="88" height="14" rx="2" stroke="#fbbf24" strokeWidth="2.2" fill="rgba(255, 255, 255, 0.2)" />
              <text x="0" y="73" fontSize="9" fill="#fef3c7" textAnchor="middle" stroke="none" className="font-bold">桌面實物 Flat Lay</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#b45309" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#fbbf24" stroke="none" className="font-bold">📷 90° 垂直俯視平拍</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">鳥瞰正上方垂直投射</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">Top-Down / 桌面文具排版</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_frontview':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-emerald-400 border border-emerald-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Eye-level Horizontal Camera */}
            <g transform="translate(30, 50)">
              {/* Camera Body */}
              <rect x="0" y="-14" width="24" height="28" rx="4" stroke="#10b981" strokeWidth="2" fill="rgba(16, 185, 129, 0.2)" />
              <circle cx="12" cy="0" r="6" stroke="#34d399" strokeWidth="2" />
              
              {/* Horizontal Ray */}
              <line x1="26" y1="0" x2="60" y2="0" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="56,-4 64,0 56,4" fill="#10b981" stroke="none" />

              {/* Symmetrical Product */}
              <rect x="66" y="-28" width="32" height="56" rx="3" stroke="#34d399" strokeWidth="2.5" fill="rgba(16, 185, 129, 0.25)" />
              <line x1="82" y1="-28" x2="82" y2="28" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
              <text x="82" y="4" fontSize="9.5" fill="#a7f3d0" textAnchor="middle" stroke="none" className="font-bold">0° 對稱</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#047857" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#34d399" stroke="none" className="font-bold">🎯 0° 正面平視視角</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">人眼水平對稱直視</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">Front Elevation / 幾何正面</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_45deg_isometric':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-violet-400 border border-violet-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* 45 Degree Angled Camera */}
            <g transform="translate(30, 20)">
              {/* Elevated Camera */}
              <circle cx="10" cy="10" r="10" stroke="#a78bfa" strokeWidth="2" fill="rgba(167, 139, 250, 0.25)" />
              <line x1="17" y1="17" x2="48" y2="44" stroke="#a78bfa" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="44,36 52,48 40,46" fill="#a78bfa" stroke="none" />
              
              {/* 3D Box in 45° view */}
              <g transform="translate(70, 52)">
                <polygon points="0,-18 24,-6 0,6 -24,-6" fill="rgba(167, 139, 250, 0.4)" stroke="#c4b5fd" strokeWidth="1.8" />
                <polygon points="-24,-6 0,6 0,26 -24,14" fill="rgba(139, 92, 246, 0.25)" stroke="#c4b5fd" strokeWidth="1.8" />
                <polygon points="0,6 24,-6 24,14 0,26" fill="rgba(109, 40, 217, 0.5)" stroke="#c4b5fd" strokeWidth="1.8" />
              </g>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#6d28d9" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#c4b5fd" stroke="none" className="font-bold">📦 45° 斜角立體視角</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">兼顧正面/側面/頂部</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">Three-Quarter / 立體空間感</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_side_profile':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-rose-400 border border-rose-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* 90 Degree Side Camera */}
            <g transform="translate(30, 50)">
              <rect x="0" y="-12" width="22" height="24" rx="3" stroke="#fb7185" strokeWidth="2" fill="rgba(251, 113, 133, 0.2)" />
              <circle cx="11" cy="0" r="5" stroke="#f43f5e" strokeWidth="2" />
              
              <line x1="24" y1="0" x2="56" y2="0" stroke="#fb7185" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="52,-4 60,0 52,4" fill="#fb7185" stroke="none" />

              {/* Side Silhouette Outline */}
              <path d="M68 -24 L86 -16 L84 20 L66 26 Z" stroke="#fda4af" strokeWidth="2.5" fill="rgba(251, 113, 133, 0.3)" />
              <text x="76" y="4" fontSize="9" fill="#ffe4e6" textAnchor="middle" stroke="none" className="font-bold">側輪廓</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#be123c" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#fda4af" stroke="none" className="font-bold">👤 90° 側面正投影</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">強調瓶身/書脊側面線條</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">Side Elevation / 剪影輪廓</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_macro_extreme':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-teal-400 border border-teal-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Macro Lens Magnifier & Micro Details */}
            <g transform="translate(68, 50)">
              {/* Magnifier Body */}
              <circle cx="0" cy="0" r="28" stroke="#2dd4bf" strokeWidth="3" fill="rgba(45, 212, 191, 0.18)" />
              <line x1="20" y1="20" x2="38" y2="38" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
              
              {/* Microscopic Grid */}
              <circle cx="0" cy="0" r="15" stroke="#5eead4" strokeWidth="1.2" strokeDasharray="2 2" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#5eead4" strokeWidth="1.5" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#5eead4" strokeWidth="1.5" />
              <text x="0" y="24" fontSize="8" fill="#99f6e4" textAnchor="middle" stroke="none" className="font-mono font-bold">1:1 MACRO</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#0f766e" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#5eead4" stroke="none" className="font-bold">🔬 1:1 極致微距特寫</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">刀鋒對焦微觀材質紋理</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">紙張纖維 • 燙金壓凹細節</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_low_angle_hero':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-orange-400 border border-orange-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Low Angle Upward Looking Camera */}
            <g transform="translate(35, 75)">
              <circle cx="0" cy="0" r="9" stroke="#fb923c" strokeWidth="2" fill="rgba(251, 146, 60, 0.25)" />
              <line x1="6" y1="-6" x2="35" y2="-36" stroke="#fb923c" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="26,-36 38,-38 36,-26" fill="#fb923c" stroke="none" />

              {/* Towering Monumental Subject */}
              <polygon points="45,-65 80,-52 80,5 45,-8" fill="rgba(251, 146, 60, 0.3)" stroke="#fdba74" strokeWidth="2.2" />
              <text x="62" y="-26" fontSize="9" fill="#ffedd5" textAnchor="middle" stroke="none" className="font-bold">高聳主體</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#c2410c" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#fdba74" stroke="none" className="font-bold">🏛️ 仰角英雄氣勢視角</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">由下而上宏偉透視</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">Low-Angle / 旗艦廣告張力</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_85mm_lens':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-blue-400 border border-blue-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* 85mm Optical Aperture & Bokeh circles */}
            <g transform="translate(68, 50)">
              {/* Bokeh circles in background */}
              <circle cx="-25" cy="-18" r="12" fill="rgba(96, 165, 250, 0.25)" />
              <circle cx="28" cy="18" r="14" fill="rgba(96, 165, 250, 0.25)" />
              <circle cx="22" cy="-20" r="9" fill="rgba(96, 165, 250, 0.2)" />

              {/* Main Aperture Lens */}
              <circle cx="0" cy="0" r="26" stroke="#60a5fa" strokeWidth="2.5" fill="rgba(15, 23, 42, 0.7)" />
              <circle cx="0" cy="0" r="12" fill="rgba(96, 165, 250, 0.5)" stroke="#93c5fd" strokeWidth="1.5" />
              <text x="0" y="4" fontSize="9" fill="#eff6ff" textAnchor="middle" stroke="none" className="font-mono font-bold">f/1.8</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#1d4ed8" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#93c5fd" stroke="none" className="font-bold">📸 85mm 黃金人像焦段</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">奶油般柔美淺景深散景</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">自然光學壓縮 / 主體突出</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_50mm_neutral':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-emerald-400 border border-emerald-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* 50mm Standard Lens Reticle */}
            <g transform="translate(68, 50)">
              <circle cx="0" cy="0" r="26" stroke="#34d399" strokeWidth="2" fill="rgba(52, 211, 153, 0.12)" />
              <line x1="-30" y1="0" x2="30" y2="0" stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="0" y1="-30" x2="0" y2="30" stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 3" />
              <rect x="-10" y="-10" width="20" height="20" stroke="#10b981" strokeWidth="1.8" fill="none" />
              <text x="0" y="4" fontSize="8.5" fill="#a7f3d0" textAnchor="middle" stroke="none" className="font-mono font-bold">50mm</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#047857" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#6ee7b7" stroke="none" className="font-bold">👁️ 50mm 人眼真實標準鏡</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">零桶狀畸變 / 真實比例</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">自然無扭曲 / 商業型錄首選</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_golden_ratio':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-amber-400 border border-amber-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Golden Ratio Grid & Spiral */}
            <g transform="translate(25, 18)">
              <rect x="0" y="0" width="85" height="64" stroke="#fbbf24" strokeWidth="2" fill="none" />
              <line x1="52" y1="0" x2="52" y2="64" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 2" />
              <line x1="52" y1="39" x2="85" y2="39" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 2" />
              {/* Spiral curve */}
              <path d="M 85,64 A 52 52 0 0 0 33,12 A 32 32 0 0 0 1,44" fill="none" stroke="#fde68a" strokeWidth="2.2" />
              <text x="25" y="36" fontSize="10" fill="#fde68a" textAnchor="middle" stroke="none" className="font-mono font-bold">1:1.618</text>
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#b45309" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#fde68a" stroke="none" className="font-bold">✨ 黃金分割不對稱留白</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">經典非對稱美學構圖</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">預留視覺焦點與文案空間</text>
            </g>
          </svg>
        </div>
      );

    case 'pc_dual_comparison':
      return (
        <div className={`flex items-center justify-center bg-slate-950 rounded-xl p-2.5 text-purple-400 border border-purple-500/40 shadow-inner ${className}`}>
          <svg viewBox="0 0 280 100" className="w-full h-full" fill="none" stroke="currentColor">
            {/* Dual objects */}
            <g transform="translate(30, 20)">
              {/* Primary Object */}
              <rect x="0" y="8" width="28" height="52" rx="3" stroke="#c084fc" strokeWidth="2.2" fill="rgba(192, 132, 252, 0.25)" />
              <text x="14" y="38" fontSize="8.5" fill="#f3e8ff" textAnchor="middle" stroke="none" className="font-bold">主要品</text>

              {/* Secondary Object */}
              <rect x="36" y="24" width="34" height="36" rx="3" stroke="#e879f9" strokeWidth="2.2" fill="rgba(232, 121, 249, 0.35)" />
              <text x="53" y="45" fontSize="8.5" fill="#fdf4ff" textAnchor="middle" stroke="none" className="font-bold">配角/周邊</text>
              
              {/* Ground shadow line */}
              <line x1="-6" y1="62" x2="76" y2="62" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Right Information Legend */}
            <g transform="translate(138, 18)">
              <rect x="0" y="0" width="132" height="66" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#7e22ce" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="12" fill="#e9d5ff" stroke="none" className="font-bold">👥 雙物件比例對比</text>
              <text x="10" y="40" fontSize="9.5" fill="#e2e8f0" stroke="none">主次分明 / 大小層次對照</text>
              <text x="10" y="55" fontSize="9" fill="#94a3b8" stroke="none" className="font-mono">品牌組合 / 產品全套展示</text>
            </g>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
