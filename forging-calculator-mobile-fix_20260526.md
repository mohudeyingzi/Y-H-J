# 锻件报价计算器 - 手机竖屏布局适配

## 问题
手机竖屏打开 `forging-calculator-template.html` 部分内容看不见——主要原因是布局按桌面设计，未适配窄屏。

## 根因
- `.result-wrap{margin-left:126px}` — 结果区左偏移量太大
- `.r-row{grid-template-columns:150px 1fr 120px 90px}` — 4 列固定宽度，手机屏放不下
- `.result-input{width:216px}` — 结果输入框太宽
- 900px 断点仍用 2-3 列网格，不适用于 375-414px 手机

## 修复
新增 `@media(max-width:600px)` 手机竖屏专用断点：

| 区域 | 桌面 | 平板(900px) | 手机(600px) |
|------|------|------------|------------|
| 信息行 | 5 列 1fr | 3 列 1fr | 2 列 1fr |
| 段区 seg-row | flex row | flex row wrap | flex column 纵向堆叠 |
| dim-input/dim-allow | 64px/48px | 保持 | 55px/42px |
| result-wrap margin-left | 126px | 60px | 0 |
| result-input | 216px | 100px | 70px max |
| r-row 列数 | 4 列 | 4 列 | 3 列(隐藏备注) |
| 工具栏/同步面板 | flex row | flex row | wrap/column |

## 文件
`forging-calculator-template.html` — 2 处 edit，JS 语法验证通过

## 验证
- JS 语法 OK
- viewport meta 标签已存在
- CSS 针对正确的 class 名（dim-input/dim-allow）