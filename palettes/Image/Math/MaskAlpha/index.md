<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/MaskAlpha/ -->

# MaskAlpha

`Image/Math` フォルダのパレットです。

## 説明

target に maskAlpha のアルファを掛ける（アルファ = 0〜1 の重みやマスク）。

入力

- target: 掛けられる画像
- maskAlpha: アルファをマスクとして使う画像

出力: out1 target × マスク（RGBA）

## ダウンロード

[MaskAlpha.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MaskAlpha.tox) [使用例 MaskAlphaExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MaskAlphaExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `target` | Data |
| 入力 1 | TOP | `maskAlpha` | Mask / アルファを使う |
| 出力 0 | TOP | `out1` | Data |

## 使用例

### アルファでマスク

![アルファでマスク](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-MaskAlpha-example.png)

バナナの画像(target)に、円の画像(maskAlpha)のアルファを掛けた例です。円の中だけが残ります。

ネットワーク: `in0` (moviefileinTOP) → `in1` (circleTOP: `radiusx=0.22`, `radiusy=0.22`, `radiusunit=fractionaspect`, `resolutionw=1280`, `resolutionh=720`) → `MaskAlpha` (パレット) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `on_black` (overTOP) → `out1`

[MaskAlphaExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MaskAlphaExample.toe)

??? note "手順(Image/Math/MaskAlpha.example.py)"

    ```python
    """アルファでマスク

    バナナの画像(target)に、円の画像(maskAlpha)のアルファを掛けた例です。円の中だけが残ります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        circle = ex.input("circleTOP", radiusx=0.22, radiusy=0.22, radiusunit="fractionaspect", resolutionw=img.width,
                          resolutionh=img.height)
        on_black(ex, ex.palette(tox, img, circle))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

10 個のオペレータ。sha256: `9b93a931fae75446…`
