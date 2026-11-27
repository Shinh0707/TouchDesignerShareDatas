<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Dilation/ -->

# Dilation

`Image/Filter` フォルダのパレットです。

## 説明

2 値画像の膨張（モルフォロジー）。白い部分を 1 px 太らせる（3×3 の近くに白があれば白）。マスクの穴埋めや、細い線を太くするのに使う。

入力: in1 白黒のマスク画像（RGB の最大を見る）
出力: out1 同じ解像度の 0/1 の画像（アルファも同じ）

## ダウンロード

[Dilation.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/Dilation.tox) [使用例 DilationExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/DilationExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Mask |
| 出力 0 | TOP | `out1` | Mask |

## 使用例

### 細い文字を太らせる

![細い文字を太らせる](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Filter-Dilation-example.png)

細い文字のマスクに Dilation を 3 回重ねた例です。1 回で 1 px ずつ太ります。

ネットワーク: `in0` (textTOP: `text=Dilation`, `fontsizex=90`, `resolutionw=720`, `resolutionh=360`, `bgalpha=1`, `fontcolorr=1`, `fontcolorg=1`, `fontcolorb=1`) → `Dilation` (パレット) → `Dilation1` (パレット) → `Dilation2` (パレット) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=720`, `resolutionh=360`) → `on_black` (overTOP) → `out1`

[DilationExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/DilationExample.toe)

??? note "手順(Image/Filter/Dilation.example.py)"

    ```python
    """細い文字を太らせる

    細い文字のマスクに Dilation を 3 回重ねた例です。1 回で 1 px ずつ太ります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        text = ex.input("textTOP", text="Dilation", fontsizex=90, resolutionw=720, resolutionh=360,
                        bgalpha=1, fontcolorr=1, fontcolorg=1, fontcolorb=1)
        a = ex.palette(tox, text)
        b = ex.palette(tox, a)
        on_black(ex, ex.palette(tox, b))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `f9d54a9bca0823ab…`
