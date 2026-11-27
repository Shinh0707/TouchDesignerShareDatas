<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/SafeDivide/ -->

# SafeDivide

`Image/Math` フォルダのパレットです。

## 説明

in1 ÷ in2 をチャンネルごとに、0 で割らないように出す（in1 × SafeInverse(in2)）。

入力: in1（割られる数）, in2（割る数）
出力: out1 商（RGBA 各チャンネル）

パラメータ

- Eps: 割る数の絶対値の下限

## ダウンロード

[SafeDivide.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeDivide.tox) [使用例 SafeDivideExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeDivideExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data |
| 入力 1 | TOP | `in2` | Data |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Eps` | Eps | Parameter | Float | `0.0001` | 0.0 … 1.0 |

## 使用例

### 0 で割らない割り算

![0 で割らない割り算](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-SafeDivide-example.svg)

1 を、−1〜1 の横のランプ(32 bit float)で割った例です(in1 = 1、in2 = x)。|x| が Eps = 0.25 より小さい所は ±4 で止まり、0 の近くでも発散しません。1 行を CHOP にして曲線で見せています。

ネットワーク: `ramp` (rampTOP: `type=horizontal`, `resolutionw=201`, `resolutionh=1`, `format=rgba32float`) → `in0` (levelTOP: `outlow=-1`, `outhigh=1`, `clampinput=unclamped`, `format=rgba32float`) → `in1` (constantTOP: `resolutionw=201`, `resolutionh=1`, `format=rgba32float`) → `SafeDivide` (パレット: `Eps=0.25`) → `quotient` (toptoCHOP: `top=out1`, `g=`, `b=`, `a=`) → `out1`

[SafeDivideExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeDivideExample.toe)

??? note "手順(Image/Math/SafeDivide.example.py)"

    ```python
    """0 で割らない割り算

    1 を、−1〜1 の横のランプ(32 bit float)で割った例です(in1 = 1、in2 = x)。|x| が Eps = 0.25 より小さい所は ±4 で止まり、0 の近くでも発散しません。1 行を CHOP にして曲線で見せています。
    """

    def build(ex, tox):
        ramp = ex.op("rampTOP", name="ramp", type="horizontal", resolutionw=201, resolutionh=1, format="rgba32float")
        x = ex.input("levelTOP", input=ramp, outlow=-1, outhigh=1, clampinput="unclamped", format="rgba32float")
        one = ex.input("constantTOP", resolutionw=201, resolutionh=1, format="rgba32float")
        q = ex.palette(tox, one, x, Eps=0.25)
        ex.out(ex.op("toptoCHOP", name="quotient", top=q.op("out1"), g="", b="", a=""))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

14 個のオペレータ。sha256: `847f6e737dad457b…`
