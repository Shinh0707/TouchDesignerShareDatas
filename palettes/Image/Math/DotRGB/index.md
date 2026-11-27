<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/DotRGB/ -->

# DotRGB

`Image/Math` フォルダのパレットです。

## 説明

2 つの画像の画素ごとの内積 r₁r₂ + g₁g₂ + b₁b₂ を出す（アルファは使わない）。

入力: in1, in2 TOP（RGB = ベクトル）
出力: out1 内積（32 bit float の 1 チャンネル）

## ダウンロード

[DotRGB.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/DotRGB.tox) [使用例 DotRGBExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/DotRGBExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data |
| 入力 1 | TOP | `in2` | Data |
| 出力 0 | TOP | `out1` | Data |

## 使用例

### 画素ごとの内積

![画素ごとの内積](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-DotRGB-example.png)

色のノイズ(in1)と、定数の色 (0.2, 0.7, 0.1)(in2、明るさの重みに近い)の、画素ごとの内積 0.2r + 0.7g + 0.1b を出した例です。白黒の明るさの画像のようになります。結果はアルファに入るので、Alpha2RGBA で見える形にして、黒の上に重ねています。

ネットワーク: `in0` (noiseTOP: `resolutionw=256`, `resolutionh=144`, `mono=False`) → `in1` (constantTOP: `colorr=0.2`, `colorg=0.7`, `colorb=0.1`, `resolutionw=256`, `resolutionh=144`) → `DotRGB` (パレット) → `Alpha2RGBA` (パレット) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=256`, `resolutionh=144`) → `on_black` (overTOP) → `out1`

[DotRGBExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/DotRGBExample.toe)

??? note "手順(Image/Math/DotRGB.example.py)"

    ```python
    """画素ごとの内積

    色のノイズ(in1)と、定数の色 (0.2, 0.7, 0.1)(in2、明るさの重みに近い)の、画素ごとの内積 0.2r + 0.7g + 0.1b を出した例です。白黒の明るさの画像のようになります。結果はアルファに入るので、Alpha2RGBA で見える形にして、黒の上に重ねています。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES, on_black  # noqa: E402

    def build(ex, tox):
        a = ex.input("noiseTOP", resolutionw=256, resolutionh=144, mono=False)
        b = ex.input("constantTOP", colorr=0.2, colorg=0.7, colorb=0.1, resolutionw=256, resolutionh=144)
        d = ex.palette(tox, a, b)
        on_black(ex, ex.palette(PALETTES + "/Image/Math/Alpha2RGBA.tox", d))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `77f82b3f22aeac26…`
