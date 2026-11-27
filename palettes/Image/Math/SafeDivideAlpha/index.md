<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/SafeDivideAlpha/ -->

# SafeDivideAlpha

`Image/Math` フォルダのパレットです。

## 説明

in1 の RGBA 全部を、in2 のアルファで割る（0 で割らない）。重みの合計で割って平均にするときに使う。

入力: in1（割られる数）, in2（アルファ = 割る数）
出力: out1 商

## ダウンロード

[SafeDivideAlpha.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeDivideAlpha.tox) [使用例 SafeDivideAlphaExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeDivideAlphaExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data |
| 入力 1 | TOP | `in2` | Data / アルファを使う |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Eps` | Eps | Parameter | Float | `0.0001` | 0.0 … 1.0 |

## 使用例

### アルファで割る

![アルファで割る](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-SafeDivideAlpha-example.svg)

色 (0.2, 0.4, 0.6) の画像を、アルファが 0〜1 の横のランプで割った例です(in2 のアルファ)。アルファが 0.5 の所(中央)では (0.4, 0.8, 1.2) と 2 倍になります。アルファが小さい左端ほど大きな値になりますが、0 で割ることはありません。1 行を CHOP にして R の曲線を見せています。

ネットワーク: `in0` (constantTOP: `colorr=0.2`, `colorg=0.4`, `colorb=0.6`, `resolutionw=201`, `resolutionh=1`, `format=rgba32float`) → `ramp` (rampTOP: `type=horizontal`, `resolutionw=201`, `resolutionh=1`, `format=rgba32float`) → `in1` (reorderTOP: `outputalphachan=red`) → `SafeDivideAlpha` (パレット) → `quotient` (toptoCHOP: `top=out1`, `g=`, `b=`, `a=`) → `out1`

[SafeDivideAlphaExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeDivideAlphaExample.toe)

??? note "手順(Image/Math/SafeDivideAlpha.example.py)"

    ```python
    """アルファで割る

    色 (0.2, 0.4, 0.6) の画像を、アルファが 0〜1 の横のランプで割った例です(in2 のアルファ)。アルファが 0.5 の所(中央)では (0.4, 0.8, 1.2) と 2 倍になります。アルファが小さい左端ほど大きな値になりますが、0 で割ることはありません。1 行を CHOP にして R の曲線を見せています。
    """

    def build(ex, tox):
        c = ex.input("constantTOP", colorr=0.2, colorg=0.4, colorb=0.6, resolutionw=201, resolutionh=1,
                     format="rgba32float")
        ramp = ex.op("rampTOP", name="ramp", type="horizontal", resolutionw=201, resolutionh=1, format="rgba32float")
        w = ex.input("reorderTOP", input=ramp, outputalphachan="red")
        q = ex.palette(tox, c, w)
        ex.out(ex.op("toptoCHOP", name="quotient", top=q.op("out1"), g="", b="", a=""))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

18 個のオペレータ。sha256: `061286b6bee4da02…`
