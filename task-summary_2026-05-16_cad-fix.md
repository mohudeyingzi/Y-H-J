# CAD.py 脚本修复与 Poppler 安装 - 2026-05-16

## 任务
修复 D:\CS\CAD.py 脚本的运行问题，使其能正确处理 PDF 文件并导出 DXF

## 问题与修复

### 1. Python 版本问题
- **问题**: py launcher 默认使用 Python 3.14，依赖库装在 Python 3.12
- **修复**: 脚本顶部添加 os.execv 自动切换到 Python 3.12

### 2. 闪退问题
- **问题**: 双击 .py 文件时 input() 在非交互模式下触发 EOFError
- **修复**: wait_and_exit() 改为 try input → except time.sleep(10)；提供 CAD.bat 作为启动器

### 3. Poppler 缺失
- **问题**: pdf2image 需要 poppler（pdftoppm/pdfinfo），系统未安装
- **修复**: `winget install oschwartz10612.Poppler` 安装 Poppler 25.07.0
- **路径**: `C:\Users\Administrator\AppData\Local\Microsoft\WinGet\Packages\oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe\poppler-25.07.0\Library\bin`
- 已自动添加到用户 PATH

## 测试结果
- 输入: `D:\CS\FLS3F-G-阀盖A2.pdf`
- 输出: `D:\CS\FLS3F-G-阀盖A2.dxf` (1.1MB)
- 检测到 1244 个轮廓，成功生成 DXF

## 环境状态
- Python 3.12.10 + opencv-python 4.13.0 + ezdxf 1.4.4 + numpy 2.4.4 + pdf2image 1.17.0
- Poppler 25.07.0 (通过 winget 安装)
- 启动方式: 双击 `D:\CS\CAD.bat` 或拖放文件到 bat 上
