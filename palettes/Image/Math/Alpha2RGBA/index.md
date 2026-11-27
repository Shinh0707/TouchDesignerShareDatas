<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/Alpha2RGBA/ -->

# Alpha2RGBA

`Image/Math` フォルダのパレットです。

## 説明

アルファを RGBA の全チャンネルに写す（1 チャンネルの値を、ほかの画像に掛けられる形にする）。32 bit float。

入力: in1 TOP
出力: out1 RGBA = (a, a, a, a)

## ダウンロード

[Alpha2RGBA.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/Alpha2RGBA.tox) [使用例 Alpha2RGBAExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/Alpha2RGBAExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Any |
| 出力 0 | TOP | `out1` | Data |

## 使用例

### アルファを RGBA に

![アルファを RGBA に](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-Alpha2RGBA-example.png)

横方向のランプ(左 0 → 右 1)をアルファに入れた画像から、アルファの値を RGBA の全部に写した例です。黒から白へのランプになります(アルファも同じ値なので、黒の上に重ねています)。

ネットワーク: `ramp` (rampTOP: `type=horizontal`, `resolutionw=256`, `resolutionh=64`) → `in0` (reorderTOP: `outputredchan=zero`, `outputgreenchan=zero`, `outputbluechan=zero`, `outputalphachan=red`) → `Alpha2RGBA` (パレット) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=256`, `resolutionh=64`) → `on_black` (overTOP) → `out1`

[Alpha2RGBAExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/Alpha2RGBAExample.toe)

??? note "手順(Image/Math/Alpha2RGBA.example.py)"

    ```python
    """アルファを RGBA に

    横方向のランプ(左 0 → 右 1)をアルファに入れた画像から、アルファの値を RGBA の全部に写した例です。黒から白へのランプになります(アルファも同じ値なので、黒の上に重ねています)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        ramp = ex.op("rampTOP", name="ramp", type="horizontal", resolutionw=256, resolutionh=64)
        src = ex.input("reorderTOP", input=ramp, outputredchan="zero", outputgreenchan="zero", outputbluechan="zero",
                       outputalphachan="red")
        on_black(ex, ex.palette(tox, src))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `2f9b6ea2d7998b47…`
