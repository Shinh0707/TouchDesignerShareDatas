<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/StereographicProjection/ -->

# StereographicProjection

`Geometry` フォルダのパレットです。

## 説明

4 次元の点（3 次元球面 S³ の上）を、北極 w = 1 から 3 次元へ立体射影する: P = xyz / (1 − w)。InverseStereographicProjection の逆で、往復すると元に戻る。4D で回転させてから 3D に戻すと、空間全体が裏返るように動く。

入力: in1 POP（Target 属性 = 4 成分の点、既定 P4）
出力: out1 POP（Output 属性 = 3 成分、既定 P）

## ダウンロード

[StereographicProjection.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/StereographicProjection.tox) [使用例 StereographicProjectionExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/StereographicProjectionExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | POP | `in1` | Points / Target（4 成分） |
| 出力 0 | POP | `out1` | Points / Output（3 成分） |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Target` | Target | Parameter | Str | `P4` |  |
| `Output` | Output | Parameter | Str | `P` |  |

## 使用例

### 4 次元の球面から 3 次元へ戻す

![4 次元の球面から 3 次元へ戻す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-StereographicProjection-example.png)

格子の点を InverseStereographicProjection で 4 次元の球面 S³ に持ち上げ、StereographicProjection で 3 次元に戻した例です。往復すると元の格子に戻ります(点で描いた図)。間で 4 次元の回転を入れると、空間全体が裏返るように動きます。

ネットワーク: `in0` (gridPOP: `surftype=none`, `sizex=4`, `sizey=4`, `cols=21`, `rows=21`) → `InverseStereographicProjection` (パレット) → `StereographicProjection` (パレット) → `geo` (geometryCOMP: `rx=0.0`, `ry=0.0`) → `points` (pointspriteMAT: `pointsize=3`, `sizingmodel=const`, `colorr=0.5`, `colorg=0.8`, `colorb=1`) → `cam` (cameraCOMP: `tz=6`, `ty=0.0`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[StereographicProjectionExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/StereographicProjectionExample.toe)

??? note "手順(Geometry/StereographicProjection.example.py)"

    ```python
    """4 次元の球面から 3 次元へ戻す

    格子の点を InverseStereographicProjection で 4 次元の球面 S³ に持ち上げ、StereographicProjection で 3 次元に戻した例です。往復すると元の格子に戻ります(点で描いた図)。間で 4 次元の回転を入れると、空間全体が裏返るように動きます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES, render_pop  # noqa: E402

    def build(ex, tox):
        grid = ex.input("gridPOP", surftype="none", sizex=4, sizey=4, cols=21, rows=21)
        lift = ex.palette(PALETTES + "/Geometry/InverseStereographicProjection.tox", grid)
        back = ex.palette(tox, lift)
        render_pop(ex, back, tz=6, size=3, color=(0.5, 0.8, 1))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `87b8b6ce8978f95b…`
