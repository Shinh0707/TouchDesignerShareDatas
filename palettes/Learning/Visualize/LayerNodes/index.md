<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/LayerNodes/ -->

# LayerNodes

`Learning/Visualize` フォルダのパレットです。

## 説明

ネットの 1 つの層のノードを、点の POP にする（値 1 つにつき点 1 つ）。x = X、y = Y ± H に縦に並べ、活性で明るさと大きさを変える。LayerEdges と同じ並べ方なので、重ねると層のグラフになる。

- 活性を 0〜1 にする方法（Mode）: centered = 0.5 + 0.25x（白色化した値など、0 を中心に揺れる値）、unit = 0〜1 に切る（シグモイドの出力など）、minmax = 今の最小・最大で
- 色 = Color × (0.25 + 0.75 v)、大きさ（PointScale）= Size × (0.4 + 0.8 v)
- 属性は P・Color・PointScale。Line MAT（Draw Points）でそのまま描ける
- 毎フレームの計算はネイティブの CHOP だけ。位置はパラメータが変わったときだけ計算する

入力: in1 活性（形は自由。全部の値を 1 本に並べる）
出力: out1 POP（N 個の点）

パラメータ

- N: ノードの数。0（既定）で入力の値の数に自動で合わせる
- X / Y / H: 層の x、中心の y、半分の高さ
- Mode: 活性を 0〜1 にする方法
- Color: ノードの色
- Size: ノードの大きさ。0（既定）でノードの間隔に合わせて自動（0.012〜0.14）

## ダウンロード

[LayerNodes.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/LayerNodes.tox) [使用例 LayerNodesExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/LayerNodesExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any / 活性 |
| 出力 0 | POP | `out1` | Geometry |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `N` | N | Nodes | Int | `0` | 0.0 … 4096.0 |
| `X` | X | Nodes | Float | `0` | -10.0 … 10.0 |
| `Y` | Y | Nodes | Float | `0` | -10.0 … 10.0 |
| `H` | H | Nodes | Float | `1` | 0.0 … 10.0 |
| `Mode` | Mode | Nodes | Menu | `centered` | `centered` / `unit` / `minmax` |
| `Colorr` | Color | Nodes | RGBA | `0.4` | 0.0 … 1.0 |
| `Colorg` | Color | Nodes | RGBA | `0.7` | 0.0 … 1.0 |
| `Colorb` | Color | Nodes | RGBA | `1` | 0.0 … 1.0 |
| `Size` | Size | Nodes | Float | `0` | 0.0 … 2.0 |

## 使用例

### 層のノード

![層のノード](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Visualize-LayerNodes-example.png)

−2〜2 の 12 個の活性を、1 列のノードにした例です(Mode = centered: 0.5 + 0.25x で 0〜1 にそろえる)。下のノードほど暗く小さく、上ほど明るく大きくなります。

ネットワーク: `in0` (patternCHOP: `channelname=a`, `wavetype=ramp`, `length=12`, `torange=[-2, 2]`) → `fx` (パレット: `Mode=centered`) → `geo` (geometryCOMP) → `lines` (lineMAT: `drawpoints=True`, `pointsizemultiplier=100`) → `cam` (cameraCOMP: `tz=3`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[LayerNodesExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/LayerNodesExample.toe)

??? note "手順(Learning/Visualize/LayerNodes.example.py)"

    ```python
    """層のノード

    −2〜2 の 12 個の活性を、1 列のノードにした例です(Mode = centered: 0.5 + 0.25x で 0〜1 にそろえる)。下のノードほど暗く小さく、上ほど明るく大きくなります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import render_lines  # noqa: E402

    def build(ex, tox):
        a = ex.input("patternCHOP", channelname="a", wavetype="ramp", length=12, torange=(-2, 2))
        n = ex.palette(tox, a, Mode="centered")
        render_lines(ex, [n], tz=3)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

22 個のオペレータ。sha256: `93064bb93a12099a…`
