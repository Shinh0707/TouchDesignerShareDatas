<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Matrix/SobelKernel/ -->

# SobelKernel

`Math/Matrix` フォルダのパレットです。

## 説明

Sobel フィルタの 3×3 の係数の表。outX = [[−1, 0, 1], [−2, 0, 2], [−1, 0, 1]]（横方向の勾配）、outY はその転置（縦方向）。Convolve TOP の係数に使う（Image/Filter/Sobel が中で使っている）。

入力: なし
出力: outX、outY（3×3 の DAT）

## ダウンロード

[SobelKernel.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/SobelKernel.tox) [使用例 SobelKernelExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/SobelKernelExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | DAT | `outX` | Table |
| 出力 1 | DAT | `outY` | Table |

## 使用例

### Sobel の係数

![Sobel の係数](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Matrix-SobelKernel-example.svg)

横方向(outX)と縦方向(outY)の Sobel フィルタの 3 × 3 の係数を、行ごとのチャンネルにして並べた例です。x0〜x2 が outX の行([−1, 0, 1]、[−2, 0, 2]、[−1, 0, 1])、y0〜y2 が outY の行です。

ネットワーク: `SobelKernel` (パレット) → `x_rows` (dattoCHOP: `dat=outX`, `output=chanperrow`, `firstrow=values`, `firstcolumn=values`) → `x` (renameCHOP: `renamefrom=*`, `renameto=x[0-2]`) → `y_rows` (dattoCHOP: `dat=outY`, `output=chanperrow`, `firstrow=values`, `firstcolumn=values`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y[0-2]`) → `kernels` (mergeCHOP) → `out1`

[SobelKernelExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/SobelKernelExample.toe)

??? note "手順(Math/Matrix/SobelKernel.example.py)"

    ```python
    """Sobel の係数

    横方向(outX)と縦方向(outY)の Sobel フィルタの 3 × 3 の係数を、行ごとのチャンネルにして並べた例です。x0〜x2 が outX の行([−1, 0, 1]、[−2, 0, 2]、[−1, 0, 1])、y0〜y2 が outY の行です。
    """

    def build(ex, tox):
        k = ex.palette(tox)
        parts = []
        for name, label in (("outX", "x"), ("outY", "y")):
            rows = ex.op("dattoCHOP", name=label + "_rows", dat=k.op(name), output="chanperrow", firstrow="values",
                         firstcolumn="values")
            parts.append(ex.op("renameCHOP", name=label, input=rows, renamefrom="*", renameto=label + "[0-2]"))
        ex.out(ex.op("mergeCHOP", name="kernels", input=parts))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `575ec8724020c405…`
