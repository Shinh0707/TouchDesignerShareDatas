<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/ -->

# Col2Im (Col2ImCHOP)

## 概要

パッチを並べた行列(Im2ColCHOP の出力の形)を、画像の形に戻します(col2im)。
パッチ同士が重なる場所の値は足し合わせます。Im2ColCHOP の逆向きの並べ替えで、
転置畳み込み(アップサンプリング)や、畳み込みの勾配を画像の側に戻す計算に使います。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Col2im` |
| ラベル | Col2Im |
| 種類 | CHOP |
| 入力数 | 1 – 1 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=Col2ImCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 128x128 img | CHOP 15876ch x 27 | 0.682 ms<br>60→57.6 fps 🔻 | 4.36 ms<br>60→47.6 fps 🔻 |
| 128x128 img Tin Tout | CHOP 27ch x 15876 | 0.213 ms<br>60→59.2 fps | 1.19 ms<br>60→56.0 fps 🔻 |
| 32x32 img | CHOP 900ch x 27 | 0.106 ms<br>60→59.6 fps | 0.299 ms<br>60→58.9 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `Col2ImCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### パッチの列を画像に戻す(col2im)

![パッチの列を画像に戻す(col2im)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/Col2ImCHOP-default.svg)

900 個のパッチ(3x3 カーネル × 3 チャンネル = 27 値)を 32x32 の画像に戻します。Im2ColCHOP の逆の処理です。

ネットワーク: `in0` (noiseCHOP: `channelname=col[1-900]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=26`) → `plugin` (CPlusPlus CHOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **1.931 ms** — 余裕の無い 60 fps のプロジェクトなら **53.8 fps**(-6.2)。

!!! warning "フレームレートへの影響が大きめです"
    この使用例では 60 fps から 2 fps 以上落ちます。入力の解像度やパラメータに注意してください。

ファイル: `Col2ImCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """パッチの列を画像に戻す(col2im)

    900 個のパッチ(3x3 カーネル × 3 チャンネル = 27 値)を 32x32 の画像に戻します。Im2ColCHOP の逆の処理です。
    """

    def build(ex):
        cols = ex.input("noiseCHOP", channelname="col[1-900]", startunit="samples", start=0, endunit="samples",
                        end=26)
        ex.plugin(cols)
    ```

### パラメータ: Col2Im

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Win` | Output Width | Int | 32 | −∞ … ∞ | 1 … 1024 |
| `K` | Kernel Size | WH | (3, 3) | −∞ … ∞ | (1, 1) … (16, 16) |
| `S` | Stride | WH | (1, 1) | −∞ … ∞ | (1, 1) … (8, 8) |
| `P` | Padding | WH | (0, 0) | −∞ … ∞ | (0, 0) … (8, 8) |
| `Transposein` | Transpose Input | Toggle | Off |  |  |
| `Transposeout` | Transpose Output | Toggle | Off |  |  |

### 出典・参考

- Y. Jia, E. Shelhamer, J. Donahue, S. Karayev, J. Long, R. Girshick, S. Guadarrama, T. Darrell (2014). [Caffe: Convolutional Architecture for Fast Feature Embedding](https://doi.org/10.1145/2647868.2654889). Proc. 22nd ACM International Conference on Multimedia, 675-678. — im2col / col2im という名前と処理の出どころ
- PyTorch. [torch.nn.Unfold / torch.nn.Fold](https://docs.pytorch.org/docs/stable/generated/torch.nn.Unfold.html). PyTorch documentation. — Fold と同じく、重なったパッチの値は足し合わせる

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

入力は [Im2ColCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) の出力と同じ形です。

| | チャンネル | サンプル |
|---|---|---|
| 入力 | パッチ(出力位置)。`Hout × Wout` 個、行ごとに左から右 | パッチの中身。`C × Kh × Kw` 個(チャンネル → 縦 → 横の順) |
| 出力 | 画素。`H × W` 個、行ごとに左から右(`c0`, `c1`, …) | 画像のチャンネル。`C` 個 |

- **Output Width**: 戻す画像の幅 `W`。高さは入力のチャンネル数から決まります。
- **Kernel Size / Stride / Padding**: Im2ColCHOP で使ったのと同じ値にします。
- 重なったパッチの値は**足し合わせ**ます(平均ではありません)。Im2Col → Col2Im と続けても元の画像には戻らず、
  各画素が「その画素を含むパッチの数」倍になります。元に戻したいときは、1 だけの画像を同じ経路に通した結果で割ります。
- 大きさが合わないとき(サンプル数が `Kh × Kw` で割り切れない、など)はエラーになり、理由が OP に表示されます。
- Info CHOP に、計算した画像の高さ `hin` と幅 `win` が出ます。

## 大きい画像を速く扱う(Transpose)

TouchDesigner は、C++ の CHOP が出すチャンネルが多いほど遅くなります(チャンネル数の 2 乗で増えます)。
既定の並びでは出力のチャンネル数が画素の数になるので、画像が大きいとここが重くなります。

- **Transpose Input**: 入力を (C × Kh × Kw) チャンネル × (パッチの数) サンプルとして読みます([Im2ColCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) の Transpose Output と同じ並び)。
- **Transpose Output**: 出力を C チャンネル × (H × W) サンプルにします。値は同じで、チャンネルとサンプルが入れ替わるだけです。

Mac の TouchDesigner 2025.33230 で測った 1 回のクック時間です(3 チャンネルの画像、カーネル 3×3)。

| 画像 | 既定 | Transpose Input + Output | さらに Shuffle CHOP で既定の並びに戻す |
|---|---|---|---|
| 32×32 | 1.7 ms | 0.06 ms | 0.04 ms(差は計測のぶれ) |
| 64×64 | 29 ms | 0.09 ms | 0.09 ms |
| 128×128 | 489 ms | 0.23 ms | 0.27 ms |

速くなるのは Transpose Output の方です(Transpose Input だけでは変わりません)。後段をそのまま使いたいときは、直後に Shuffle CHOP(Swap Channels and Samples)を置くと既定と同じ並びになります。
