# 2026-05-23 锻件算重报价系统 - 导出Excel单重/总重/总价错乱修复

## 问题描述
导出Excel中单重(KG)值错乱：套管头本体应为425.3却显示4553.4，防喷管四通本体应为624.6却显示4553.4，升高法兰应为4553.4却显示425.3。

## 根因
`loadRecord()` 加载不同记录时没有清空 `top_unitWt`（单重输入框）。calcAll 中的逻辑是：`if (manualUnitWt === null) setVal('top_unitWt', f(actualCutWt, 1))` —— 只在单重框为空时自动填入。当加载新记录时，单重框保留了上一条记录的值，calcAll 跳过了自动填入，导致后续保存存入了错误的单重。

## 修复
1. **loadRecord**: 在调用 `calcAll()` 前加 `setVal('top_unitWt','')` 清空单重框
2. **saveRecord**: 改为直接用计算变量存数（之前的修复），而非从DOM input读字符串

## 注意
已有记录在localStorage中存了错误值，需逐条「加载→保存」后才能导出正确数据。