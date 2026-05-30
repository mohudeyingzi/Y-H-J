# 2026-05-27: 锻件计算器自动填充修复

## 问题
用户输入 `外径500 + 余量20mm，高200 + 余量20mm` 后，`top_unitWt`（单重KG）自动填充的值不正确（显示3.4，应该是374.1/377.8）。

## 根因分析
逐步输入场景下的竞态问题：
1. 用户先输入直径=500、高度=200 → `actualCutWt=317.5`，自动填充 `top_unitWt=317.5`
2. 用户补充直径余量=20 → `actualCutWt=343.4`，但 `top_unitWt` 已有值 `317.5`，不满足 `null||0` 条件，**跳过更新**
3. 用户补充高度余量=20 → `actualCutWt=377.8`，同样被**跳过**

这导致最终单重卡在第一步的中间值 `317.5`。

## 修复方案
使用 `_unitWtDirty` 标记区分"用户手动输入的单重"和"自动填充的值"：

- `_unitWtDirty=true`：用户手动编辑过 → 不再自动覆盖
- `_unitWtDirty=false`：自动填充的值 → 随时更新为最新计算值
- `manualUnitWt===null`（字段为空）：始终触发自动填充

新条件：`if(!_unitWtDirty||manualUnitWt===null||manualUnitWt===0)`

## 修改文件
- `forging-calculator-template.html` — 3处关键修改：
  1. 全局变量声明（+ `_unitWtDirty=false`）
  2. `#top_unitWt` 的 `oninput` → `_unitWtDirty=true;calcAll()`
  3. `calcAll()` 的自动填充条件
  4. `resetAll()` 和 `loadRecord()` 中重置 `_unitWtDirty=false`
