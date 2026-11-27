<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Matrix/RotMatrix2D/ -->

# RotMatrix2D

`Math/Matrix` フォルダのパレットです。

## 説明

2 次元の回転行列を 2×2 の表（Table DAT）で出す: [[cos θ, sin θ], [−sin θ, cos θ]]。

入力: なし
出力: out1 2 行 × 2 列の DAT

パラメータ

- Rot: 角度 θ
- Angleunits: 角度の単位（Degrees / Radians / Cycles）

## ダウンロード

[RotMatrix2D.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/RotMatrix2D.tox) [使用例 RotMatrix2DExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/RotMatrix2DExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | DAT | `out1` | Table / 2×2 の回転行列 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Rot` | rot | Parameter | Float | `0` | 0.0 … 360.0 |
| `Angleunits` | AngleUnits | Parameter | StrMenu | `0` | `0` / `1` / `2` |

## 使用例

### 2 次元の回転行列

![2 次元の回転行列](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Matrix-RotMatrix2D-example.svg)

30° の回転行列 [[cos 30°, sin 30°], [−sin 30°, cos 30°]] = [[0.866, 0.5], [−0.5, 0.866]] を出した例です。出力は Table DAT なので、DAT to CHOP で行ごとのチャンネルにしています。

ネットワーク: `RotMatrix2D` (パレット: `Rot=30`) → `rows` (dattoCHOP: `dat=out1`, `output=chanperrow`, `firstrow=values`, `firstcolumn=values`) → `out1`

[RotMatrix2DExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/RotMatrix2DExample.toe)

??? note "手順(Math/Matrix/RotMatrix2D.example.py)"

    ```python
    """2 次元の回転行列

    30° の回転行列 [[cos 30°, sin 30°], [−sin 30°, cos 30°]] = [[0.866, 0.5], [−0.5, 0.866]] を出した例です。出力は Table DAT なので、DAT to CHOP で行ごとのチャンネルにしています。
    """

    def build(ex, tox):
        m = ex.palette(tox, Rot=30)
        ex.out(ex.op("dattoCHOP", name="rows", dat=m.op("out1"), output="chanperrow", firstrow="values",
                     firstcolumn="values"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

11 個のオペレータ。sha256: `9f613b9a1f39c6c8…`
