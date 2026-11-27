<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/4DTorus/ -->

# 4DTorus

`Geometry` フォルダのパレットです。

## 説明

4 次元のトーラス（クリフォードトーラス風）を 3 次元に射影した点群。4D の 2 つの面（xw と zw）で回転させてから、透視投影（Projection 0）か正射影（Projection 1）で 3D に落とすので、回転につれて裏返るように形が変わる。

入力: in1 POP（省略可。省略時は中のトーラスの点 6867 個。各点の P を 4D の角度の元にする）
出力: out1 POP（P が射影後の位置）

パラメータ

- Projection: 0 = 透視投影、1 = 正射影
- Distance: 透視投影の 4D カメラ距離（既定 Rs + Rl + 10）
- Rs / Rladd: 小さい半径と、大きい半径への足し分（Rl = Rs + Rladd）
- Rotxw / Rotzw: xw 面・zw 面の回転（回数。既定は時間で回る式）

## ダウンロード

[4DTorus.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/4DTorus.tox) [使用例 4DTorusExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/4DTorusExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | POP | `in1` | Points(省略可) |
| 出力 0 | POP | `out1` | Points / P = 射影後の位置 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Projection` | Projection | Parameter | Menu | `0` | `0` / `1` |
| `Distance` | Distance | Parameter | Float | `0` | 0.0 … 1.0 |
| `Rs` | Rs | Parameter | Float | `1` | 0.0001 … 5.0 |
| `Rladd` | Rl Add | Parameter | Float | `1` | 1e-05 … 5.0 |
| `Rl` | Rl | Parameter | Float | `0` | 0.0 … 1.0 |
| `Rotxw` | Rotxw | Parameter | Float | `0` | 0.0 … 1.0 |
| `Rotzw` | Rotzw | Parameter | Float | `0` | 0.0 … 1.0 |

## 使用例

### 4 次元トーラスの影

![4 次元トーラスの影](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-4DTorus-example.png)

4DTorus の点群を点で描いた例です。Rotxw / Rotzw(既定は時間で回る式)を動かすと、裏返るように形が変わります。

ネットワーク: `4DTorus` (パレット: `Rotxw=0.12`, `Rotzw=0.07`) → `geo` (geometryCOMP: `rx=25`, `ry=0.0`) → `points` (pointspriteMAT: `pointsize=1.5`, `sizingmodel=const`, `colorr=1`, `colorg=0.75`, `colorb=0.4`) → `cam` (cameraCOMP: `tz=22`, `ty=0.0`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[4DTorusExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/4DTorusExample.toe)

??? note "手順(Geometry/4DTorus.example.py)"

    ```python
    """4 次元トーラスの影

    4DTorus の点群を点で描いた例です。Rotxw / Rotzw(既定は時間で回る式)を動かすと、裏返るように形が変わります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import render_pop  # noqa: E402

    def build(ex, tox):
        t = ex.palette(tox, Rotxw=0.12, Rotzw=0.07)
        render_pop(ex, t, tz=22, rx=25, size=1.5, color=(1, 0.75, 0.4))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

15 個のオペレータ。sha256: `6ae3fe1ea73d4813…`
