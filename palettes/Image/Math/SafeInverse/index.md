<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/SafeInverse/ -->

# SafeInverse

`Image/Math` フォルダのパレットです。

## 説明

各チャンネルの逆数 1/x を、0 で割らないように出す: sign(x) / max(|x|, Eps)。0 は 0 のまま。

入力: in TOP
出力: out1 逆数（RGBA 各チャンネル）

パラメータ

- Eps: 絶対値の下限（既定 0.0001）

## ダウンロード

[SafeInverse.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeInverse.tox) [使用例 SafeInverseExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeInverseExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in` | Data |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Eps` | Eps | Parameter | Float | `0.0001` | 0.0 … 1.0 |

## 使用例

### 0 で割らない逆数

![0 で割らない逆数](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-SafeInverse-example.svg)

−1〜1 の横のランプ(32 bit float)の逆数 1/x を出した例です。|x| < 0.25 では 1/x の代わりに ±1/0.25 = ±4(Eps = 0.25)で止まり、0 の近くでも発散しません。1 行を CHOP にして曲線で見せています。

ネットワーク: `ramp` (rampTOP: `type=horizontal`, `resolutionw=201`, `resolutionh=1`, `format=rgba32float`) → `in0` (levelTOP: `outlow=-1`, `outhigh=1`, `clampinput=unclamped`, `format=rgba32float`) → `SafeInverse` (パレット: `Eps=0.25`) → `x` (toptoCHOP: `top=in0`, `g=`, `b=`, `a=`) → `inv` (toptoCHOP: `top=out1`, `g=`, `b=`, `a=`) → `x_named` (renameCHOP: `renamefrom=*`, `renameto=x`) → `inv_named` (renameCHOP: `renamefrom=*`, `renameto=inverse`) → `x_and_inverse` (mergeCHOP) → `out1`

[SafeInverseExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeInverseExample.toe)

??? note "手順(Image/Math/SafeInverse.example.py)"

    ```python
    """0 で割らない逆数

    −1〜1 の横のランプ(32 bit float)の逆数 1/x を出した例です。|x| < 0.25 では 1/x の代わりに ±1/0.25 = ±4(Eps = 0.25)で止まり、0 の近くでも発散しません。1 行を CHOP にして曲線で見せています。
    """

    def build(ex, tox):
        ramp = ex.op("rampTOP", name="ramp", type="horizontal", resolutionw=201, resolutionh=1, format="rgba32float")
        x = ex.input("levelTOP", input=ramp, outlow=-1, outhigh=1, clampinput="unclamped", format="rgba32float")
        inv = ex.palette(tox, x, Eps=0.25)
        xr = ex.op("toptoCHOP", name="x", top=x, g="", b="", a="")
        yr = ex.op("toptoCHOP", name="inv", top=inv.op("out1"), g="", b="", a="")
        a = ex.op("renameCHOP", name="x_named", input=xr, renamefrom="*", renameto="x")
        b = ex.op("renameCHOP", name="inv_named", input=yr, renamefrom="*", renameto="inverse")
        ex.out(ex.op("mergeCHOP", name="x_and_inverse", input=[a, b]))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

9 個のオペレータ。sha256: `1d0abaa396a21f2f…`
