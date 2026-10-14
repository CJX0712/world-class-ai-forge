# ✦ World-Class AI Forge

> 单文件 · 零依赖 · 可运行 · 可复现 · 可验证 —— 站在世界顶级成果之上的 AI 锻造炉。

作者：**晨星**（GitHub: [CJX0712](https://github.com/CJX0712)）

---

## 一句话定位

**零重写**（直接复用世界最优解）、**集大成**（组合并超越）、**闭环交付**（开源、可运行、可验证、署名晨星）。
本仓库在已有 forge 数学核心（PCA / GMM / 数值线性代数）之上，组合并超越为世界顶级的
**微型 Transformer 语言模型**，全部以纯 JS 单文件实现，浏览器一键自检、无头 Node 8/8 全绿。

---

## 三大原则落地

| 原则 | 本仓库如何体现 |
|------|----------------|
| **零重写** | 不发明轮子：注意力/位置编码/归一化/激活/优化全部采用已发表的世界顶级方法（见下方引用），数值核心复用成熟算法（Jacobi 特征分解、稳定 logsumexp、正交旋转）。 |
| **集大成** | 把「嵌入 + RoPE + Pre-LN + 多头注意力 + GELU-FFN + LM Head + Adam」组合成完整可训练 Transformer，每个模块都有可验证数学不变量。 |
| **闭环交付** | 单文件 `world-class-ai-forge.html` + `verify.js`，无需构建、无外部依赖；自检全绿即交付；完整开源至 GitHub。 |

---

## 架构（集大成）

```
输入 token
   │
   ▼
Embedding ──► RoPE (Su 2021, 旋转位置编码)
   │
   ▼  Pre-LN Transformer Block
┌─────────────────────────────────────────────┐
│  LayerNorm (Ba 2016)                         │
│    └─ Multi-Head Self-Attention (Vaswani 2017)│  + 因果掩码
│  + 残差                                       │
│  LayerNorm (Ba 2016)                         │
│    └─ FFN: Linear → GELU (Hendrycks 2016) → │  Linear
│  + 残差                                       │
└─────────────────────────────────────────────┘
   │
   ▼
LM Head (Linear) ──► Softmax 交叉熵
   │
   ▼
Adam (Kingma 2015) 更新全部参数
```

数值核心：Jacobi 特征分解、稳定 `logsumexp`、正交旋转（均世界级数值线性代数）。

---

## 世界顶级来源（站在肩上，非从零发明）

| 模块 | 方法 | 来源 |
|------|------|------|
| Multi-Head Attention | Scaled Dot-Product Attention + 因果掩码 | Vaswani et al. 2017, *Attention Is All You Need* |
| 位置编码 | RoPE 旋转位置编码（Llama/GPT-NeoX 同款） | Su et al. 2021, *RoFormer* |
| 归一化 | Layer Normalization (Pre-LN) | Ba, Kiros, Hinton 2016 |
| 激活 | GELU | Hendrycks & Gimpel 2016 |
| 优化器 | Adam | Kingma & Ba 2015 |
| 数值核心 | Jacobi 特征分解 / 稳定 softmax | 经典数值线性代数 |

---

## 8/8 自检不变量（黄金标准）

每个不变量都是可被独立实现交叉验证的硬指标（解析解 vs 数值解、闭式梯度 vs 中心差分、
保范数、正交、PSD、单调）：

| # | 不变量 | 方法 | 验收 |
|---|--------|------|------|
| T1 | 梯度检验 | 解析梯度 vs 中心差分（24 个采样参数） | 最大相对误差 < 2e-2（实测 ~1e-8） |
| T2 | 损失单调下降 | Adam 训练 800 步 | 终损 < 0.9×初始（实测趋近 0） |
| T3 | softmax 行和为 1 | 稳定行 softmax | 偏差 < 1e-12（实测 ~2e-16） |
| T4 | LayerNorm 输出均值0方差1 | eps=0 精确归一化 | 偏差 < 1e-12（实测 ~4e-16） |
| T5 | RoPE 保范数 + 可逆 | 正交旋转 | 范数差/逆误差 < 1e-12（实测 ~4e-16） |
| T6 | MHA 形状 + 因果掩码 | 未来位注意力 | 最大 < 1e-6（实测 0） |
| T7 | PCA 对称/PSD/正交 | Jacobi 特征分解 | 对称 0、最小特征值>0、正交误差 ~1e-15 |
| T8 | GMM 责任度和1 | EM 责任度 | 偏差 < 1e-12（实测 ~2e-16） |

---

## 运行方式

**① 浏览器（一键自检）**
直接打开 `world-class-ai-forge.html`，页面顶部即显示 8/8 自检结果与架构图。

**② 无头 Node（CI / 命令行）**
```bash
node verify.js
# 退出码 0 表示 8/8 全绿
```

**③ 训练 / 复现**
在浏览器控制台或 Node 中调用：
```js
initParams();
const f = forward([0,1,2,3,4,0,1,2], [1,2,3,4,0,1,2,3]);
const g = backward(f);   // 解析梯度
// 或运行完整训练：testLossMonotonic()
```

---

## 文件

| 文件 | 说明 |
|------|------|
| `world-class-ai-forge.html` | 单文件零依赖实现 + 浏览器自检 UI（**主交付物**） |
| `verify.js` | 无头 Node 验证器（提取内联脚本运行，exit 0 = 全绿） |
| `LICENSE` | MIT License |
| `README.md` | 本文件 |

---

## 许可证

[MIT](LICENSE) © 晨星 (CJX0712)

> 锻造世界顶级 AI：架构最先进、性能最强、代码最优、文档最全。
