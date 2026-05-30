## 任务背景
用户要求安装 Claude Code CLI，并配置 DeepSeek V4 Pro [1M] 作为其模型后端。

## 执行过程
1. 安装 Claude Code v2.1.143
2. 发现 Claude Code 不支持 DeepSeek，需协议转换
3. 搭建 Anthropic-to-DeepSeek 代理
4. 调试路径重复、模型验证、reasoning_content 转换等问题
5. 配置环境变量和启动脚本
6. 注册 Windows 开机自启任务

## 关键结果
- ✅ Claude Code v2.1.143 已安装
- ✅ 代理运行于 http://localhost:4000
- ✅ 文件: `C:\Users\Administrator\.qclaw\claude-code-proxy\proxy.mjs`
- ✅ 启动脚本: `claude-deepseek.cmd`
- ✅ 开机自启任务: ClaudeCode-DeepSeek-Proxy
- ✅ DeepSeek API Key 已内嵌

## 结论建议
配置完成，使用 `claude-deepseek.cmd` 或设置环境变量后运行 `claude --bare --model sonnet`。