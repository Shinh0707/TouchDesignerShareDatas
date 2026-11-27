<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/ConvVolume/ -->

# ConvVolume

`Learning/Visualize` フォルダのパレットです。

## 説明

畳み込みネットの 1 つの層の特徴マップ（高さ × 幅 × チャンネル）を、3 次元の点の POP にする（値 1 つにつき点 1 つ）。各チャンネルの W × W の格子を y–z 平面に置き（y = Y ± H、z = ±H）、チャンネルを x 方向に Dc ずつずらして重ねる。ConvEdges と同じ並べ方なので、重ねると畳み込みの 3D の図になる。

- 活性を 0〜1 にする方法（Mode）: centered = 0.5 + 0.25x、unit = 0〜1 に切る、minmax = 今の最小・最大で
- 色 = Color × (0.25 + 0.75 v)、大きさ（PointScale）= Size × (0.4 + 0.8 v)
- 属性は P・Color・PointScale。Line MAT（Draw Points）でそのまま描ける
- 毎フレームの計算はネイティブの CHOP だけ。位置はパラメータが変わったときだけ計算する

入力: in1 特徴マップ（画素 W² チャンネル × C サンプル。TOPRGB2ImCHOP・NNConv2d の出力の形）
出力: out1 POP（W² × C 個の点）

パラメータ

- C / W: チャンネル数と幅（正方形）
- X / Y / H: 層の x、中心の y、格子の半分の大きさ
- Dc: チャンネルごとの x の間隔
- Mode / Color / Size: 活性の 0〜1 への変換、色、大きさ

## ダウンロード

[ConvVolume.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/ConvVolume.tox) [使用例 ConvVolumeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/ConvVolumeExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix / 特徴マップ（画素 × チャンネル） |
| 出力 0 | POP | `out1` | Geometry |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `X` | X | Nodes | Float | `0` | -10.0 … 10.0 |
| `Y` | Y | Nodes | Float | `0` | -10.0 … 10.0 |
| `H` | H | Nodes | Float | `1` | 0.0 … 10.0 |
| `Mode` | Mode | Nodes | Menu | `centered` | `centered` / `unit` / `minmax` |
| `Colorr` | Color | Nodes | RGBA | `0.4` | 0.0 … 1.0 |
| `Colorg` | Color | Nodes | RGBA | `0.7` | 0.0 … 1.0 |
| `Colorb` | Color | Nodes | RGBA | `1` | 0.0 … 1.0 |
| `Size` | Size | Nodes | Float | `0.1` | 0.0 … 2.0 |
| `C` | C | Nodes | Int | `8` | 1.0 … 1.0 |
| `W` | W | Nodes | Int | `7` | 1.0 … 1.0 |
| `Dc` | Dc | Nodes | Float | `0.15` | 0.0 … 1.0 |

## 使用例

### 畳み込みの特徴マップ

![畳み込みの特徴マップ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Visualize-ConvVolume-example.png)

16 × 16 に縮めたバナナの画像の CHOP(256 画素 × 3 色)を、3 枚の格子の点(R, G, B の順に x 方向にずらして重ねたもの)で描いた例です。明るい画素ほど明るく大きな点になります(Mode = unit)。

ネットワーク: `banana` (moviefileinTOP) → `banana_16` (fitTOP: `outputresolution=custom`, `resolutionw=16`, `resolutionh=16`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `TOPRGB2ImCHOP` (パレット) → `fx` (パレット: `C=3`, `W=16`, `Mode=unit`, `Dc=0.5`, `X=-0.5`) → `geo` (geometryCOMP) → `lines` (lineMAT: `drawpoints=True`, `pointsizemultiplier=100`) → `cam` (cameraCOMP: `tz=4`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[ConvVolumeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/ConvVolumeExample.toe)

??? note "手順(Learning/Visualize/ConvVolume.example.py)"

    ```python
    """畳み込みの特徴マップ

    16 × 16 に縮めたバナナの画像の CHOP(256 画素 × 3 色)を、3 枚の格子の点(R, G, B の順に x 方向にずらして重ねたもの)で描いた例です。明るい画素ほど明るく大きな点になります(Mode = unit)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import image_chop, render_lines  # noqa: E402

    def build(ex, tox):
        img = image_chop(ex, 16)
        v = ex.palette(tox, img, C=3, W=16, Mode="unit", Dc=0.5, X=-0.5)
        render_lines(ex, [v], tz=4)
        ex.root.op("geo").par.ry = -35
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

22 個のオペレータ。sha256: `a3572c0a8139387f…`
