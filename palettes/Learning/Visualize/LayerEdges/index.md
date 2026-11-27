<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/LayerEdges/ -->

# LayerEdges

`Learning/Visualize` フォルダのパレットです。

## 説明

ネットの層と層の間の重みを、線の POP にする（重み 1 つにつき線 1 本）。前の層のノード（x = Xfrom、y = Yfrom ± Hfrom に並ぶ）と後の層のノード（x = Xto、y = Yto ± Hto）を結ぶ。LayerNodes と同じ並べ方なので、重ねると層のグラフになる。

- 色 = 重みの符号（赤 = 正、青 = 負）、太さ・不透明度 = |w|（Autonorm オンなら今の |w| の最大で割る）
- 光らせ方（Glow）: in2 に前の層のノードの出力値をつなぐと、太さ・不透明度にその線の出ているノードの今の出力値（0〜1 にそろえたもの）も掛ける = いまその線を流れている信号の大きさ |w|·|a|。Glow 0 で重みだけ、1 で出力値に完全に合わせる。色は重みの符号のまま
- 属性は P・Color・LineWidth・PointScale（端点は 0）。Line MAT でそのまま描ける
- 毎フレームの計算はネイティブの CHOP だけ（重みの並べ替えは Shuffle、出力値は Lookup）。位置はパラメータが変わったときだけ計算する。6144 本（8 × 768）で約 1 ms

入力

- in1: 重み W（Transpose オフ: チャンネル = 前の層、サンプル = 後の層。オン: チャンネル = 後の層）
- in2: 前の層のノードの出力値（任意。形は自由で、全部の値を 1 本に並べた順がノードの順。LayerNodes の in1 と同じものをつなぐ）

出力: out1 POP（Nfrom × Nto 本の線）

パラメータ

- Nfrom / Nto: 前・後の層のノードの数。0（既定）で重みの形から自動で決める（Transpose を考えたあとのチャンネル数 / サンプル数）
- Transpose: 重みの向き（NNLinear の outvis1 はオフ、OnlineGHA の W はオン）
- Xfrom / Xto / Yfrom / Yto / Hfrom / Hto: 層の位置と半分の高さ
- Linewidth: |w| が一番大きい線の太さ
- Alpha: 線の不透明度の倍率（線が多い層では下げる）
- Autonorm / Wscale: 重みの正規化
- Glow: 出力値に合わせて光らせる度合い（0〜1）
- Actmode: 出力値を 0〜1 にする方法（abs = |a| / 今の最大、minmax、unit = 0〜1 に切る）

## ダウンロード

[LayerEdges.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/LayerEdges.tox) [使用例 LayerEdgesExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/LayerEdgesExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix / 重み W |
| 入力 1 | CHOP | `in2` | Feature / 前の層のノードの出力値（任意） |
| 出力 0 | POP | `out1` | Geometry |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Nfrom` | Nfrom | Edges | Int | `0` | 0.0 … 4096.0 |
| `Nto` | Nto | Edges | Int | `0` | 0.0 … 4096.0 |
| `Transpose` | Transpose | Edges | Toggle | `False` |  |
| `Xfrom` | Xfrom | Edges | Float | `-1` | -10.0 … 10.0 |
| `Xto` | Xto | Edges | Float | `1` | -10.0 … 10.0 |
| `Yfrom` | Yfrom | Edges | Float | `0` | -10.0 … 10.0 |
| `Yto` | Yto | Edges | Float | `0` | -10.0 … 10.0 |
| `Hfrom` | Hfrom | Edges | Float | `1` | 0.0 … 10.0 |
| `Hto` | Hto | Edges | Float | `1` | 0.0 … 10.0 |
| `Linewidth` | Linewidth | Edges | Float | `3` | 0.0 … 50.0 |
| `Alpha` | Alpha | Edges | Float | `1` | 0.0 … 1.0 |
| `Autonorm` | Autonorm | Edges | Toggle | `True` |  |
| `Wscale` | Wscale | Edges | Float | `1` | 0.0001 … 100.0 |
| `Glow` | Glow | Edges | Float | `1` | 0.0 … 1.0 |
| `Actmode` | Activation Mode | Edges | Menu | `abs` | `abs` / `minmax` / `unit` |

## 使用例

### 層の間の重み

![層の間の重み](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Visualize-LayerEdges-example.png)

8 入力 → 5 出力の全結合層の乱数の重み(8 チャンネル × 5 サンプル、−1〜1)を線にし、LayerNodes の 2 列のノードと重ねた例です。赤が正、青が負の重みで、|w| が大きいほど太く濃く、前の層のノードの値(in2)が大きい線ほど光ります。

ネットワーク: `in0` (patternCHOP: `channelname=w[0-7]`, `wavetype=random`, `length=5`, `amp=2`, `offset=-1`, `seed=2`) → `in1` (patternCHOP: `channelname=a`, `wavetype=random`, `length=8`, `seed=4`) → `fx` (パレット: `Xfrom=-1`, `Xto=1`) → `out_values` (patternCHOP: `channelname=y`, `wavetype=random`, `length=5`, `seed=6`) → `fx1` (パレット: `X=-1`, `Mode=unit`) → `fx2` (パレット: `X=1`, `Mode=unit`) → `geo` (geometryCOMP) → `lines` (lineMAT: `drawpoints=True`, `pointsizemultiplier=100`) → `cam` (cameraCOMP: `tz=3.5`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[LayerEdgesExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/LayerEdgesExample.toe)

??? note "手順(Learning/Visualize/LayerEdges.example.py)"

    ```python
    """層の間の重み

    8 入力 → 5 出力の全結合層の乱数の重み(8 チャンネル × 5 サンプル、−1〜1)を線にし、LayerNodes の 2 列のノードと重ねた例です。赤が正、青が負の重みで、|w| が大きいほど太く濃く、前の層のノードの値(in2)が大きい線ほど光ります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES, render_lines  # noqa: E402

    def build(ex, tox):
        w = ex.input("patternCHOP", channelname="w[0-7]", wavetype="random", length=5, amp=2, offset=-1, seed=2)
        a = ex.input("patternCHOP", channelname="a", wavetype="random", length=8, seed=4)
        edges = ex.palette(tox, w, a, Xfrom=-1, Xto=1)
        out_vals = ex.op("patternCHOP", name="out_values", channelname="y", wavetype="random", length=5, seed=6)
        left = ex.palette(PALETTES + "/Learning/Visualize/LayerNodes.tox", a, X=-1, Mode="unit")
        right = ex.palette(PALETTES + "/Learning/Visualize/LayerNodes.tox", out_vals, X=1, Mode="unit")
        render_lines(ex, [edges, left, right], tz=3.5)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

48 個のオペレータ。sha256: `4dc85deb366ae025…`
