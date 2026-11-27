<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HistogramCHOP/ -->

# Histogram (HistogramCHOP)

## 概要

CHOPのヒストグラムを計算します.
使用例: [HistogramCHOPExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/blob/main/Projects/HistogramCHOPExample.toe "HistogramCHOP使用例")

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Hist` |
| ラベル | Histogram |
| 種類 | CHOP |
| 入力数 | 1 – 2 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=HistogramCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 100k samples | CHOP 2ch x 100000 | 0.358 ms<br>60→58.7 fps | 0.562 ms<br>60→58.0 fps |
| default | CHOP 2ch x 1000 | 0.004 ms<br>60→60.0 fps | 0.006 ms<br>60→60.0 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `HistogramCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 値の分布を数える

![値の分布を数える](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/HistogramCHOP-default.svg)

2000 サンプルの Noise CHOP が、-1〜1 を 40 等分したどの区間にいくつ入るかを数えます。
出力は 40 サンプルで、値がその区間に入ったサンプルの個数です(合計は範囲内のサンプル数)。

ネットワーク: `in0` (noiseCHOP: `type=sparse`, `amp=0.5`, `period=0.05`, `startunit=samples`, `start=0`, `endunit=samples`, `end=1999`) → `plugin` (CPlusPlus CHOP: `Range=[-1, 1]`, `Bins=40`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.013 ms** — 余裕の無い 60 fps のプロジェクトなら **60.0 fps**(-0.1)。

ファイル: `HistogramCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """値の分布を数える

    2000 サンプルの Noise CHOP が、-1〜1 を 40 等分したどの区間にいくつ入るかを数えます。
    出力は 40 サンプルで、値がその区間に入ったサンプルの個数です(合計は範囲内のサンプル数)。
    """

    def build(ex):
        data = ex.input("noiseCHOP", type="sparse", amp=0.5, period=0.05, startunit="samples", start=0,
                        endunit="samples", end=1999)
        ex.plugin(data, Range=(-1, 1), Bins=40)
    ```

#### 区間の境目を CHOP で渡す

![区間の境目を CHOP で渡す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/HistogramCHOP-edges.svg)

入力 2 をつなぐと、その 1 チャンネル目の値を区間の始まりとして使います(小さい順に並べておきます)。
ここでは 0 付近を細かく、外側を粗くした 9 つの境目を渡しています。最後の区間は「その値以上すべて」です。

ネットワーク: `in0` (noiseCHOP: `type=sparse`, `amp=0.5`, `period=0.05`, `startunit=samples`, `start=0`, `endunit=samples`, `end=1999`) → `constant1` (constantCHOP) → `in1` (shuffleCHOP: `method=swap`) → `plugin` (CPlusPlus CHOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.016 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `HistogramCHOPExample_edges.toe`

??? note "手順(examples/edges.py)"

    ```python
    """区間の境目を CHOP で渡す

    入力 2 をつなぐと、その 1 チャンネル目の値を区間の始まりとして使います(小さい順に並べておきます)。
    ここでは 0 付近を細かく、外側を粗くした 9 つの境目を渡しています。最後の区間は「その値以上すべて」です。
    """

    def build(ex):
        data = ex.input("noiseCHOP", type="sparse", amp=0.5, period=0.05, startunit="samples", start=0,
                        endunit="samples", end=1999)
        edges = ex.op("constantCHOP", x=-440, y=-130)
        values = (-1, -0.5, -0.2, -0.1, 0, 0.1, 0.2, 0.5, 1)
        edges.seq.const.numBlocks = len(values)
        for i, v in enumerate(values):
            edges.par["const%dname" % i] = "edge%d" % i
            edges.par["const%dvalue" % i] = v
        # 境目は「1 チャンネルのサンプル列」で渡すので、チャンネルの並びをサンプルの並びに入れ替えます
        ex.plugin(data, ex.input("shuffleCHOP", input=edges, method="swap"))
    ```

### パラメータ: Histogram

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Range` | Range | Float[2] | (0, 1) | −∞ … ∞ | (-1, -1) … (1, 1) |
| `Bins` | Bins | Int | 10 | 1 … ∞ | 1 … 1000 |

## 使い方

入力 1 の各チャンネルについて、値がどの区間にいくつ入るかを数えます。出力のチャンネルは入力 1 と同じ名前で、
サンプル数が区間の数、値が個数です。

区間の決め方は 2 通りあります。

- **パラメータで決める**(入力 2 なし): **Range** の最小〜最大を **Bins** 個に等分します。範囲の外の値は数えません。
  最大値ちょうどの値は最後の区間に入ります。
- **CHOP で決める**(入力 2 あり): 入力 2 の 1 チャンネル目の各サンプルを、区間の始まりの値として使います(小さい順に並べておきます)。
  区間の数は入力 2 のサンプル数です。最後の区間は「その値以上すべて」、最初の値より小さい値は数えません。
  このとき Range と Bins は使われません。

割合にしたいときは、後ろの Math CHOP で入力のサンプル数で割ります。時間とともに変わる値の分布を見たいときは、
手前に Trail CHOP を置いて、直近の値をためてからつなぎます。
