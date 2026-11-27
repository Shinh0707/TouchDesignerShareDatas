<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/HzLissajous3D/ -->

# HzLissajous3D

`Visualize` フォルダのパレットです。

## 説明

Lissajous を奥行き方向に伸ばした 3D の線。t に沿って z を 0 → −Depth に進め、手前から奥へ色（Color → ColorEnd）と太さが変わるらせん状の線にする。Grouping をオンにすると、z を Faces 段に丸めて階段状（層）にする（見た目のための機能）。SOP と、その描画の画像の両方を出す。

入力: in1, in2 は Lissajous と同じ（x と y の周波数）
出力

- out1: 線の SOP（点数 = Samples、x, y は ±1、z は −Depth〜0）
- out2: 透視カメラで描いた画像 1280×720

パラメータ

- Samples / Thickness: 点の数・手前の太さ（奥は 0.1）
- Color / ColorEnd: 手前と奥の色（RGBA）
- Depth: 奥行きの長さ（既定 25.5）
- Grouping / Faces: z を Faces 段に丸めるか、その段数

## ダウンロード

[HzLissajous3D.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/HzLissajous3D.tox) [使用例 HzLissajous3DExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/HzLissajous3DExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Control |
| 入力 1 | CHOP | `in2` | Control |
| 出力 0 | SOP | `out1` | Geometry / 点数 = Samples の線 |
| 出力 1 | TOP | `out2` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Samples` | Samples | Parameter | Int | `1000` | 1.0 … 3000.0 |
| `Thickness` | Thickness | Parameter | Float | `1` | 0.0 … 10.0 |
| `Colorr` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colorg` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colorb` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colora` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colorendr` | ColorEnd | Parameter | RGBA | `0` | 0.0 … 1.0 |
| `Colorendg` | ColorEnd | Parameter | RGBA | `0` | 0.0 … 1.0 |
| `Colorendb` | ColorEnd | Parameter | RGBA | `0` | 0.0 … 1.0 |
| `Colorenda` | ColorEnd | Parameter | RGBA | `0` | 0.0 … 1.0 |
| `Depth` | Depth | Parameter | Float | `20` | 0.0 … 100.0 |
| `Grouping` | Grouping | Parameter | Toggle | `False` |  |
| `Faces` | Faces | Parameter | Float | `5` | 1.0 … 100.0 |

## 使用例

### 奥へ伸びるリサジュー

![奥へ伸びるリサジュー](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Visualize-HzLissajous3D-example.png)

x を 3 Hz、y を 2 Hz にした Lissajous を、奥行き方向に伸ばして描いた例です(out2 の画像)。手前が赤く太く、奥へ行くほど青く細くなり、Grouping で z が 4 段に分かれます。

ネットワーク: `in0` (constantCHOP: `const0name=fx`, `const0value=3`) → `in1` (constantCHOP: `const0name=fy`, `const0value=2`) → `HzLissajous3D` (パレット) → `image` (selectTOP: `top=out2`) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `on_black` (overTOP) → `out1`

[HzLissajous3DExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/HzLissajous3DExample.toe)

??? note "手順(Visualize/HzLissajous3D.example.py)"

    ```python
    """奥へ伸びるリサジュー

    x を 3 Hz、y を 2 Hz にした Lissajous を、奥行き方向に伸ばして描いた例です(out2 の画像)。手前が赤く太く、奥へ行くほど青く細くなり、Grouping で z が 4 段に分かれます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        fx = ex.input("constantCHOP", const0name="fx", const0value=3)
        fy = ex.input("constantCHOP", const0name="fy", const0value=2)
        comp = ex.palette(tox, fx, fy)
        on_black(ex, ex.op("selectTOP", name="image", top=comp.op("out2")))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

22 個のオペレータ。sha256: `af9557a0adeccffe…`
