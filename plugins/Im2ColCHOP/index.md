<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/ -->

# Im2Col (Im2ColCHOP)

## 概要

CHOP で表した画像を、畳み込みのカーネルが当たる範囲(パッチ)ごとに切り出して並べ直します(im2col)。
出力に重みの行列を [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) で掛けると、それがそのまま畳み込みになります。
CHOP だけで畳み込みニューラルネットワークを組むための部品です。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Im2col` |
| ラベル | Im2Col |
| 種類 | CHOP |
| 入力数 | 1 – 1 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=Im2ColCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 128x128 img | CHOP 16384ch x 3 | 0.726 ms<br>60→57.5 fps 🔻 | 5.55 ms<br>60→45.0 fps 🔻 |
| 128x128 img Tin Tout | CHOP 3ch x 16384 | 0.194 ms<br>60→59.3 fps | 1.31 ms<br>60→55.6 fps 🔻 |
| 128x128 img Tout | CHOP 16384ch x 3 | 0.168 ms<br>60→59.4 fps | 1.32 ms<br>60→55.6 fps 🔻 |
| 32x32 img | CHOP 1024ch x 3 | 0.101 ms<br>60→59.6 fps | 0.339 ms<br>60→58.8 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `Im2ColCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 画像をパッチの列に並べ替える(im2col)

![画像をパッチの列に並べ替える(im2col)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/Im2ColCHOP-default.svg)

32x32 の画像(1024 チャンネル × 3 サンプル)を 3x3 のパッチに切り分け、1 パッチを 1 チャンネルにします。
DotCHOP と組み合わせると畳み込みになります。

ネットワーク: `in0` (noiseCHOP: `channelname=px[1-1024]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=2`) → `plugin` (CPlusPlus CHOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **1.634 ms** — 余裕の無い 60 fps のプロジェクトなら **54.6 fps**(-5.4)。

!!! warning "フレームレートへの影響が大きめです"
    この使用例では 60 fps から 2 fps 以上落ちます。入力の解像度やパラメータに注意してください。

ファイル: `Im2ColCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """画像をパッチの列に並べ替える(im2col)

    32x32 の画像(1024 チャンネル × 3 サンプル)を 3x3 のパッチに切り分け、1 パッチを 1 チャンネルにします。
    DotCHOP と組み合わせると畳み込みになります。
    """

    def build(ex):
        img = ex.input("noiseCHOP", channelname="px[1-1024]", startunit="samples", start=0, endunit="samples", end=2)
        ex.plugin(img)
    ```

### パラメータ: Im2Col

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Win` | Input Width | Int | 32 | −∞ … ∞ | 1 … 1024 |
| `K` | Kernel Size | WH | (3, 3) | −∞ … ∞ | (1, 1) … (16, 16) |
| `S` | Stride | WH | (1, 1) | −∞ … ∞ | (1, 1) … (8, 8) |
| `P` | Padding | WH | (0, 0) | −∞ … ∞ | (0, 0) … (8, 8) |
| `Transposein` | Transpose Input | Toggle | Off |  |  |
| `Transposeout` | Transpose Output | Toggle | Off |  |  |

### 出典・参考

- K. Chellapilla, S. Puri, P. Simard (2006). [High Performance Convolutional Neural Networks for Document Processing](https://inria.hal.science/inria-00112631). 10th International Workshop on Frontiers in Handwriting Recognition (IWFHR). — 畳み込みを「パッチを並べた行列 × 重みの行列」の積に直す考え方
- Y. Jia, E. Shelhamer, J. Donahue, S. Karayev, J. Long, R. Girshick, S. Guadarrama, T. Darrell (2014). [Caffe: Convolutional Architecture for Fast Feature Embedding](https://doi.org/10.1145/2647868.2654889). Proc. 22nd ACM International Conference on Multimedia, 675-678. — im2col / col2im という名前と処理の出どころ
- PyTorch. [torch.nn.Unfold / torch.nn.Fold](https://docs.pytorch.org/docs/stable/generated/torch.nn.Unfold.html). PyTorch documentation. — 出力の大きさの式とパッチ内の並び順(チャンネル → 縦 → 横)を合わせた先

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

入力は、画像を「チャンネル = 画素、サンプル = 画像のチャンネル」で表した CHOP です。

| | チャンネル | サンプル |
|---|---|---|
| 入力 | 画素。`H × W` 個、行ごとに左から右 | 画像のチャンネル。`C` 個(RGB なら 3) |
| 出力 | パッチ(出力位置)。`Hout × Wout` 個、行ごとに左から右(`c0`, `c1`, …) | パッチの中身。`C × Kh × Kw` 個(チャンネル → 縦 → 横の順) |

- **Input Width**: 画像の幅 `W`。高さは「チャンネル数 ÷ W」で決まるので、チャンネル数が W で割り切れないとエラーになります。
- **Kernel Size / Stride / Padding**: 畳み込みと同じ意味です。出力の大きさは
  `Hout = (H + 2·Ph − Kh) / Sh + 1`、`Wout = (W + 2·Pw − Kw) / Sw + 1`(切り捨て)。パディングの部分は 0 です。
- Info CHOP に `hout` と `wout` が出ます。

**畳み込みにする**: 重みを「`C × Kh × Kw` チャンネル × 出力チャンネル数サンプル」の CHOP で用意し、
[DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) で「Im2Col の出力 × 重み」を計算します。結果は「`Hout × Wout` チャンネル × 出力チャンネル数サンプル」、
つまりこの OP の入力と同じ並びの画像になるので、そのまま次の層につなげます。
TOP を CHOP にするには TOP to CHOP、戻すには CHOP to TOP を使います。

## 大きい画像を速く扱う(Transpose)

TouchDesigner は、C++ の CHOP が出すチャンネルが多いほど遅くなります(チャンネル数の 2 乗で増えます)。
既定の並びでは出力のチャンネル数がパッチの数になるので、画像が大きいとここが重くなります。

- **Transpose Output**: 出力を (C × Kh × Kw) チャンネル × (パッチの数) サンプルにします。値は同じで、チャンネルとサンプルが入れ替わるだけです。
- **Transpose Input**: 入力の画像を C チャンネル × (H × W) サンプルとして読みます。

Mac の TouchDesigner 2025.33230 で測った 1 回のクック時間です(3 チャンネルの画像、カーネル 3×3)。

| 画像 | 既定 | Transpose Output | Transpose Output + Shuffle CHOP で既定の並びに戻す |
|---|---|---|---|
| 32×32 | 1.5 ms | 0.08 ms | 0.09 ms |
| 64×64 | 23 ms | 0.13 ms | 0.17 ms |
| 128×128 | 419 ms | 0.27 ms | 0.46 ms |

- 後段をそのまま使いたいときは、直後に Shuffle CHOP(Swap Channels and Samples)を置くと既定と同じ並びになります。TouchDesigner 標準の CHOP は多チャンネルでも速いので、これだけで速くなります。
- [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) も出力のチャンネルが多いと同じ理由で遅くなります。畳み込みは「重み(出力チャンネル数 × C·Kh·Kw)を入力 1、Transpose Output の出力を入力 2」にして掛けると、出力チャンネル数 × パッチの数 サンプルになり、128×128 で 889 ms → 0.32 ms でした。
