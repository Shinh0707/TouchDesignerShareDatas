<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/MagnitudeRGB/ -->

# MagnitudeRGB

`Image/Math` フォルダのパレットです。

## 説明

各画素の RGB をベクトルとみた長さ √(r² + g² + b²) を出す（アルファは使わない）。

入力: in1 TOP（RGB = ベクトル）
出力: out1 長さ（32 bit float の 1 チャンネル、アルファに入る）

## ダウンロード

[MagnitudeRGB.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MagnitudeRGB.tox) [使用例 MagnitudeRGBExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MagnitudeRGBExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data / RGB = ベクトル |
| 出力 0 | TOP | `out1` | Data / 長さ（アルファ） |

## 使用例

### RGB の長さ

![RGB の長さ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-MagnitudeRGB-example.png)

色のノイズの各画素の RGB を 3 次元のベクトルとみて、その長さ √(r² + g² + b²)(0〜√3)を出した例です。結果はアルファに入るので、Alpha2RGBA で見える形にして、黒の上に重ねています(1 を超える明るい所は白く飽和します)。

ネットワーク: `in0` (noiseTOP: `resolutionw=256`, `resolutionh=144`, `mono=False`) → `MagnitudeRGB` (パレット) → `Alpha2RGBA` (パレット) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=256`, `resolutionh=144`) → `on_black` (overTOP) → `out1`

[MagnitudeRGBExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MagnitudeRGBExample.toe)

??? note "手順(Image/Math/MagnitudeRGB.example.py)"

    ```python
    """RGB の長さ

    色のノイズの各画素の RGB を 3 次元のベクトルとみて、その長さ √(r² + g² + b²)(0〜√3)を出した例です。結果はアルファに入るので、Alpha2RGBA で見える形にして、黒の上に重ねています(1 を超える明るい所は白く飽和します)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES, on_black  # noqa: E402

    def build(ex, tox):
        a = ex.input("noiseTOP", resolutionw=256, resolutionh=144, mono=False)
        m = ex.palette(tox, a)
        on_black(ex, ex.palette(PALETTES + "/Image/Math/Alpha2RGBA.tox", m))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `716557ef2e91b93d…`
