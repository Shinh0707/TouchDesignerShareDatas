<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/SquarePyramid/ -->

# SquarePyramid

`Geometry` フォルダのパレットです。

## 説明

正四角錐の SOP（底面の 1 辺 A、高さ H、底面の中心が原点、頂点が下向き）。インスタンスの元の形に使う。

入力: なし
出力: out1 SOP（5 点。側面は 1 つのメッシュ）

パラメータ

- A: 底面の 1 辺
- H: 高さ

## ダウンロード

[SquarePyramid.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/SquarePyramid.tox) [使用例 SquarePyramidExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/SquarePyramidExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | SOP | `out1` | Geometry |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `A` | a | Parameter | Float | `1` | 0.0 … 5.0 |
| `H` | Height | Parameter | Float | `1` | 0.0 … 2.0 |

## 使用例

### 正四角錐

![正四角錐](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-SquarePyramid-example.png)

底面の 1 辺 A = 1、高さ H = 1.5 の正四角錐(頂点が下向き)を、斜め上から描いた例です。

ネットワーク: `SquarePyramid` (パレット: `A=1`, `H=1.5`) → `geo` (geometryCOMP: `rx=-25`, `ry=35`) → `mat` (phongMAT: `diffr=1`, `diffg=0.7`, `diffb=0.3`) → `light` (lightCOMP: `tx=3`, `ty=4`, `tz=5`) → `cam` (cameraCOMP: `tz=4`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `lights=light`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[SquarePyramidExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/SquarePyramidExample.toe)

??? note "手順(Geometry/SquarePyramid.example.py)"

    ```python
    """正四角錐

    底面の 1 辺 A = 1、高さ H = 1.5 の正四角錐(頂点が下向き)を、斜め上から描いた例です。
    """
    import td

    def build(ex, tox):
        p = ex.palette(tox, A=1, H=1.5)
        geo = ex.op("geometryCOMP", name="geo", rx=-25, ry=35)
        for k in list(geo.children):
            k.destroy()
        s = geo.create(td.selectSOP, "pyramid")
        s.par.sop = p.op("out1").path
        s.render = s.display = True
        geo.par.material = ex.op("phongMAT", name="mat", diffr=1, diffg=0.7, diffb=0.3).path
        light = ex.op("lightCOMP", name="light", tx=3, ty=4, tz=5)
        cam = ex.op("cameraCOMP", name="cam", tz=4)
        ex.out(ex.op("renderTOP", name="render", camera=cam, geometry=geo, lights=light, resolutionw=720,
                     resolutionh=720, bgcolora=1))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `9c96475ba1667be8…`
