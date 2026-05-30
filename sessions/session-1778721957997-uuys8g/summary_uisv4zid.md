## 任务背景
用户希望优化 CAD 图纸矢量化工具（CAD.py），解决旧版轮廓检测方案的线条断裂、文字丢失、圆弧变折线等问题。

## 执行过程
1. 分析旧方案问题（轮廓检测不适配工程图纸）
2. 设计新方案：HoughLinesP+HoughCircles+线段合并
3. 尝试安装Tesseract OCR（网络失败，暂跳过）
4. 重写CAD.py v2.0
5. 多轮调参：圆检测从9413→1674→541→111，线段合并2988→680
6. 修复GBK编码和PowerShell中文乱码问题

## 关键结果
- CAD.py 从v1升级到v2.0（D:\CS\CAD.py）
- v1: 1244轮廓（线条断裂/文字丢失/圆弧变折线）
- v2: 680直线段+111圆（线条更连续，圆更准确）
- DXF文件成功生成
- 新增参数：--hough-threshold/--circle-threshold/--bin-method等
- Tesseract OCR未安装成功，功能预留

## 结论建议
v2大幅改善矢量化质量，建议在CAD软件中打开DXF验证效果；后续可重试安装Tesseract启用OCR文字识别，也可微调参数进一步优化。