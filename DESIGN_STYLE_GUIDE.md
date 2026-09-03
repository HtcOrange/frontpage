# Nova ML 平台 — 前端设计风格规范

> 本文档用于向 AI 编码工具(如 Codex)描述一套完整的前端视觉与交互风格。
> 严格按照本文档实现,即可复现一套与参考页面高度一致的「简约现代 · 科技/SaaS」风格界面。

---

## 0. 总体基调

- **风格定位**:简约现代(Minimal Modern),面向科技/SaaS 产品的专业后台工具。
- **气质关键词**:克制、干净、留白充足、信息层级清晰、蓝色科技感、等宽字体点缀数据。
- **设计原则**:
  - 卡片式分区,弱边框 + 微弱背景对比,而非重阴影。
  - 单一主强调色(蓝紫色),其余全部用中性灰阶。
  - 所有"数值型"内容(参数、ID、金额、名称)使用等宽字体,强化技术专业感。
  - 圆角统一、间距走 Tailwind 标准刻度,绝不使用随意的任意值。
  - 交互反馈只用颜色/边框过渡,不做花哨动画。

---

## 1. 技术栈

| 项目 | 选型 |
|------|------|
| 框架 | Next.js (App Router) + React,TypeScript |
| 样式 | Tailwind CSS v4(`@import "tailwindcss"`,主题写在 `globals.css` 的 `@theme` / `:root`) |
| 图标 | `lucide-react`(线性图标,统一 `size-4`) |
| 字体 | `next/font/google` 引入 Geist(正文)+ Geist Mono(等宽) |
| 组件 | shadcn/ui 的 Button(其余控件用原生元素 + Tailwind 手写) |
| 客户端交互 | React `useState`,组件顶部标 `'use client'` |

---

## 2. 颜色系统(OKLCH,浅色主题)

> 使用语义化 design token,**禁止**在组件里直接写 `text-white` / `bg-black` 等硬编码颜色。
> 全部通过 `bg-background`、`text-foreground`、`border-border`、`text-primary` 等语义类调用。

在 `app/globals.css` 的 `:root` 中定义(浅色):

```css
:root {
  color-scheme: light;
  --background: oklch(0.985 0.002 250);   /* 页面底:极浅冷灰白 */
  --foreground: oklch(0.21 0.02 260);     /* 主文字:近黑带蓝调 */
  --card: oklch(1 0 0);                    /* 卡片:纯白 */
  --card-foreground: oklch(0.21 0.02 260);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.21 0.02 260);
  --primary: oklch(0.55 0.19 260);         /* 主强调:蓝紫色 */
  --primary-foreground: oklch(0.99 0 0);   /* 强调色上的文字:近白 */
  --secondary: oklch(0.965 0.005 250);
  --secondary-foreground: oklch(0.3 0.02 260);
  --muted: oklch(0.965 0.005 250);         /* 次级背景:浅灰 */
  --muted-foreground: oklch(0.53 0.02 260);/* 次级文字:中灰 */
  --accent: oklch(0.955 0.02 260);         /* 选中态浅蓝底 */
  --accent-foreground: oklch(0.4 0.12 260);
  --destructive: oklch(0.577 0.245 27.325);/* 警示红(必填星号等) */
  --border: oklch(0.915 0.008 255);        /* 边框:浅灰 */
  --input: oklch(0.915 0.008 255);
  --ring: oklch(0.55 0.19 260);            /* 聚焦环 = 主强调色 */
  --chart-1: oklch(0.55 0.19 260);         /* 蓝紫 */
  --chart-2: oklch(0.68 0.15 200);         /* 青 */
  --chart-3: oklch(0.72 0.16 145);         /* 绿 */
  --chart-4: oklch(0.75 0.15 70);          /* 橙黄 */
  --chart-5: oklch(0.65 0.2 20);           /* 红橙 */
  --radius: 0.625rem;                       /* 基础圆角 10px */
  /* 侧边栏专用 token */
  --sidebar: oklch(0.99 0.002 250);
  --sidebar-foreground: oklch(0.21 0.02 260);
  --sidebar-primary: oklch(0.55 0.19 260);
  --sidebar-primary-foreground: oklch(0.99 0 0);
  --sidebar-accent: oklch(0.955 0.02 260);
  --sidebar-accent-foreground: oklch(0.4 0.12 260);
  --sidebar-border: oklch(0.915 0.008 255);
  --sidebar-ring: oklch(0.55 0.19 260);
}
```

**颜色用法约束(共 4~5 色):**
- 1 个主强调色:蓝紫 `--primary`(按钮、选中边框、聚焦环、关键数字)。
- 中性灰阶:`background` / `card` / `muted` / `border` / `foreground` / `muted-foreground`。
- 1 个警示色:`--destructive`,仅用于必填标记、错误。
- 图表色 `chart-1..5` 仅在需要可视化时使用。
- **改背景色必改文字色**以保证对比度。

---

## 3. 字体系统

- 最多 2 个字族:**Geist**(正文 `font-sans`)+ **Geist Mono**(等宽 `font-mono`)。
- 在 `app/layout.tsx` 引入并挂到 `<html>`:

```tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

// <html className={`bg-background ${geistSans.variable} ${geistMono.variable}`}>
//   <body className="font-sans antialiased">
```

- 在 `globals.css` 的 `@theme inline` 里映射:

```css
@theme inline {
  --font-sans: var(--font-sans), 'Geist Fallback', ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-mono), 'Geist Mono Fallback', ui-monospace, monospace;
}
```

**排版规则:**
- 正文 `text-sm`,行高 `leading-relaxed`。
- 页面主标题 `text-2xl font-semibold tracking-tight`;卡片标题 `text-base font-semibold`。
- 次要说明 `text-sm text-muted-foreground`,极小注释 `text-xs` 或 `text-[11px]`。
- **等宽字体 `font-mono` 的使用场景**:任务名/数据集名、学习率、Epochs、金额、ID、序号编号(01/02)、单价。这是本风格的标志性细节。
- 标题加 `text-balance`,段落加 `text-pretty`。

---

## 4. 布局结构

整体为经典 SaaS 后台三段式:**左侧固定导航栏 + 顶部栏 + 主内容区**。

```
┌─────────┬────────────────────────────────────┐
│         │  顶部栏 (h-16, sticky, 面包屑+搜索+通知) │
│ 侧边栏   ├────────────────────────────────────┤
│ w-60    │  主内容区 (max-w-5xl 居中, 内含表单)     │
│ (lg+)   │    ┌──────────────┬──────────────┐  │
│         │    │  分步卡片区    │  粘性摘要侧栏  │  │
│         │    └──────────────┴──────────────┘  │
└─────────┴────────────────────────────────────┘
```

**关键布局约定:**
- 布局优先用 **flexbox**;二维网格才用 `grid`。间距一律用 `gap-*`,**不要** margin/padding 与 gap 混用,不要用 `space-*`。
- 外层:`<div className="flex min-h-screen bg-background">`。
- 主内容包裹:`<main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">`。
- 表单主体 + 摘要侧栏:`grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]`。
- 侧边栏与摘要在小屏隐藏/堆叠:侧边栏 `hidden lg:flex`,摘要用 `xl:sticky xl:top-6`。
- 移动优先,再用 `sm:` / `md:` / `lg:` / `xl:` 逐级增强。

---

## 5. 圆角 / 边框 / 间距刻度

- **圆角**:控件/卡片内元素 `rounded-lg`;大卡片容器 `rounded-xl`;头像 `rounded-full`。
- **边框**:统一 `border border-border`(浅灰);选中态换成 `border-primary`。
- **卡片**:`rounded-xl border border-border bg-card p-5 sm:p-6`,**无阴影或极弱**。
- **间距刻度**:只用标准值 `gap-1.5 / gap-2 / gap-3 / gap-4 / gap-6`、`px-3 py-2`、`p-5`、`py-6 py-8` 等。禁止 `p-[16px]` 这类任意值。
- **图标尺寸**:统一 `size-4`(16px);头像/图标容器 `size-8` / `size-9`。

---

## 6. 组件模式(核心,务必复刻)

### 6.1 侧边栏 AppSidebar
- 容器:`hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex`。
- 顶部品牌区 `h-16`:主色方块 logo(`size-8 rounded-lg bg-primary text-primary-foreground` 内放 `Sparkles` 图标)+ 产品名 + 副标题。
- 导航项:`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium`。
  - 选中态:`bg-sidebar-accent text-sidebar-accent-foreground`,并加 `aria-current="page"`。
  - 未选中:`text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground`。
- 底部:分隔线 `border-t` + 设置入口 + 用户信息(圆形首字母头像 `rounded-full bg-accent`)。

### 6.2 顶部栏
- `sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6`。
- 左:面包屑,用 `ChevronRight size-4` 分隔,末级 `font-medium text-foreground`,其余 `text-muted-foreground`。
- 右:伪搜索框(`rounded-lg border bg-card px-3 py-1.5`,`md:flex` 才显示)+ 通知按钮(`size-9 rounded-lg border bg-card`)。

### 6.3 分区卡片 Section(带序号)
```tsx
<section className="rounded-xl border border-border bg-card p-5 sm:p-6">
  <div className="mb-5 flex items-start gap-3">
    <span className="mt-0.5 font-mono text-xs font-medium text-muted-foreground">01</span>
    <div>
      <h2 className="text-base font-semibold text-foreground text-balance">标题</h2>
      <p className="mt-0.5 text-sm text-muted-foreground text-pretty">说明文案</p>
    </div>
  </div>
  <div className="flex flex-col gap-4 pl-0 sm:pl-7">{/* 字段 */}</div>
</section>
```
- 序号用等宽字体 `01 / 02 / 03`,弱化为 `text-muted-foreground`(仅在真实的步骤序列中使用编号)。

### 6.4 字段 Field
- 结构:`flex flex-col gap-1.5`,label 为 `text-sm font-medium text-foreground`。
- 必填:label 后加 `<span className="text-destructive">*</span>`。
- 可选提示:`text-xs font-normal text-muted-foreground`。

### 6.5 输入框 / 文本域
```
w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none
transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20
```
- 数值/名称类输入额外加 `font-mono`。
- 文本域加 `resize-none`。

### 6.6 Chip(单选标签,如框架/优化器)
```
rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors
选中: border-primary bg-primary text-primary-foreground
未选: border-border bg-card text-muted-foreground hover:border-ring/40 hover:text-foreground
```

### 6.7 可选卡片(模型/数据集/GPU 选择)
- 卡片按钮:`rounded-lg border px-3 py-2.5 text-left transition-colors`。
  - 选中:`border-primary bg-accent`,右侧显示 `<Check className="size-4 text-primary" />`。
  - 未选:`border-border bg-card hover:border-ring/40`。
- 主文案 `text-sm font-medium text-foreground`,副标签/规格 `text-xs text-muted-foreground`。
- 名称类用 `font-mono`;图标容器选中时 `bg-primary text-primary-foreground`,否则 `bg-muted text-muted-foreground`。

### 6.8 滑块 Range
- 原生 `<input type="range">` + `className="mt-2 w-full accent-primary"`。
- label 内实时回显当前值,如 `训练轮数 (Epochs) · 50`。

### 6.9 摘要侧栏(粘性)
- 容器:`rounded-xl border border-border bg-card p-5`,外层 `xl:sticky xl:top-6 xl:self-start`。
- 用 `<dl>` 罗列键值行:key 为 `text-xs text-muted-foreground`,value 为 `text-sm font-medium text-foreground`(数值加 `font-mono`,溢出 `truncate`)。
- 费用/时长高亮块:`rounded-lg border border-border bg-muted/50 p-3`,金额用 `font-mono text-lg font-semibold`。
- 主按钮(Button 默认)+ 次按钮(`variant="outline"`),均 `h-9 w-full`,内含 `lucide` 图标。
- 底部说明:`text-[11px] leading-relaxed text-muted-foreground`,前置 `Info` 小图标。

### 6.10 按钮
- 使用 shadcn/ui `Button`;主操作用默认变体,次操作用 `variant="outline"`。
- 按钮内图标统一 `size-4`,图标在文字左侧。

---

## 7. 交互与状态

- 所有选择/切换用 React `useState` 管理,组件顶部加 `'use client'`。
- 摘要侧栏的值与费用/时长**随表单状态实时联动**计算并显示。
- 反馈只用 `transition-colors` 的颜色过渡,不加位移/缩放/阴影动画。
- 聚焦态统一:`focus:border-ring focus:ring-3 focus:ring-ring/20`。
- 悬停态:边框 `hover:border-ring/40`、文字 `hover:text-foreground`、背景 `hover:bg-sidebar-accent/60`。

---

## 8. 可访问性

- 语义化标签:`<aside> <header> <nav> <main> <section> <label> <dl>`。
- 交互元素带 `type="button"`;图标按钮加 `aria-label`。
- 当前导航项加 `aria-current="page"`。
- 每个输入都有对应 `<label>`。
- 装饰性图标无需 alt;必要处提供 `sr-only` 文本。

---

## 9. 复刻检查清单

- [ ] 浅色主题,冷灰白底 + 纯白卡片 + 蓝紫主强调色,总色数 ≤ 5。
- [ ] Geist + Geist Mono 双字族,数据类文本全部 `font-mono`。
- [ ] 三段式布局:`w-60` 侧边栏 + `h-16` sticky 顶栏 + `max-w-5xl` 主区。
- [ ] 卡片 `rounded-xl border bg-card`,控件 `rounded-lg`,无重阴影。
- [ ] 分区带等宽序号编号 + 标题 + 灰色说明。
- [ ] 选中态统一:`border-primary` + `bg-accent`/`bg-primary` + `Check` 图标。
- [ ] 右侧粘性摘要栏,值随表单实时联动。
- [ ] 全部使用语义 token,无硬编码颜色;间距走 Tailwind 标准刻度。
- [ ] flexbox 优先,`gap-*` 管理间距,不混用 margin/padding+gap。
