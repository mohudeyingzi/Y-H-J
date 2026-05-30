# 2026-05-27: 锻件计算器删除重加后不显示结果修复

## 问题
删除某段后重新添加并填入尺寸，后面的结果（尺寸和重量）不自动显示。

## 根因
`calcAll()` 用数组下标 `i+1` 作为写入目标的 DOM ID，而非段落的实际 DOM ID。

**场景复现**：
1. 加段1 → DOM ID=1, 结果元素 `cyl_tsize_1`
2. 加段2 → DOM ID=2, 结果元素 `cyl_tsize_2`  
3. 删段1 → 只剩段2
4. 加新段 → DOM ID=3, 结果元素 `cyl_tsize_3`
5. `calcAll` 遍历数组 [段2, 段3] → 写 `cyl_tsize_1`（不存在!）、`cyl_tsize_2`

段3 的结果永远写不进 `cyl_tsize_3`。

## 修复（4处修改）

1. **`collectSeg()`** — 增加 `r.id=id` 返回段落真实 DOM ID
2. **`calcAll()` cyl 循环** — `var ti=i+1` → `var ti=c.id`
3. **`calcAll()` rect 循环** — `var ti=i+1` → `var ti=r.id`
4. **`calcAll()` hole 循环** — `var ti=i+1` → `var ti=h.id`

现在结果元素 ID (`cyl_tsize_3`) 始终与段落 DOM ID 匹配。
