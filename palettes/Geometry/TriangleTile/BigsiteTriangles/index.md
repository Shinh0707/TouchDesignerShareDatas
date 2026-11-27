<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/BigsiteTriangles/ -->

# BigsiteTriangles

`Geometry/TriangleTile` フォルダのパレットです。

## 説明

東京ビッグサイトの三角ドームのような、三角形を三角形に敷き詰めた面の、各小三角形の位置・回転・向き（上向き / 下向き）を出す。インスタンスでパネルを並べるのに使う。

入力: なし
出力

- posOut: 各三角形の中心（x, y, z）
- rotOut: 回転（上向き 0°、下向き 180°）
- downupOut: 向き（1 = 上向き、0 = 下向き）
- partOut: 1 枚分の形（SOP）

パラメータ

- Midr: 小三角形の大きさ
- Nmid: いちばん上の行の三角形の数（奇数）。行ごとに 2 つずつ減り、全部で ((Nmid + 1) / 2)² 枚（既定 17 で 81 枚）

## ダウンロード

[BigsiteTriangles.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/BigsiteTriangles.tox) [使用例 BigsiteTrianglesExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/BigsiteTrianglesExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | CHOP | `posOut` | Vector |
| 出力 1 | CHOP | `rotOut` | Control |
| 出力 2 | CHOP | `downupOut` | Gate |
| 出力 3 | SOP | `partOut` | Geometry |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Midr` | Middle Triangle Radius | Parameter | Float | `2` | 0.0 … 5.0 |
| `Nmid` | NMid | Parameter | Int | `17` | 1.0 … 17.0 |

## 使用例

### 三角形を三角形に敷き詰める

![三角形を三角形に敷き詰める](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-TriangleTile-BigsiteTriangles-example.png)

BigsiteTriangles の位置(posOut)と回転(rotOut)で、1 枚分の三角形(partOut)をインスタンスで並べて描いた例です。上向きと下向きの三角形が交互に並び、いちばん上の行の 17 枚から 2 枚ずつ減って、81 枚で逆さの大きな三角形になります。色は向き(downupOut)で変えています。

ネットワーク: `BigsiteTriangles` (パレット) → `instances` (mergeCHOP) → `panels` (geometryCOMP) → `panel_color` (constantMAT) → `cam` (cameraCOMP: `tx=8`, `ty=-6.5`, `tz=34`) → `render` (renderTOP: `camera=cam`, `geometry=panels`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[BigsiteTrianglesExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/BigsiteTrianglesExample.toe)

??? note "手順(Geometry/TriangleTile/BigsiteTriangles.example.py)"

    ```python
    """三角形を三角形に敷き詰める

    BigsiteTriangles の位置(posOut)と回転(rotOut)で、1 枚分の三角形(partOut)をインスタンスで並べて描いた例です。上向きと下向きの三角形が交互に並び、いちばん上の行の 17 枚から 2 枚ずつ減って、81 枚で逆さの大きな三角形になります。色は向き(downupOut)で変えています。
    """
    import td

    def build(ex, tox):
        t = ex.palette(tox)
        merged = ex.op("mergeCHOP", name="instances", input=[t.op("posOut"), t.op("rotOut"), t.op("downupOut")])
        geo = ex.op("geometryCOMP", name="panels")
        for k in list(geo.children):
            k.destroy()
        part = geo.create(td.selectSOP, "part")
        part.par.sop = t.op("partOut").path
        part.render = part.display = True
        geo.par.instancing = True
        geo.par.instanceop = merged.path
        chans = [c.name for c in merged.chans()]
        geo.par.instancetx, geo.par.instancety, geo.par.instancetz = chans[0], chans[1], chans[2]
        geo.par.instancerz = chans[3]
        geo.par.instancer, geo.par.instanceg = chans[4], chans[4]
        geo.par.instanceb = chans[3]
        mat = ex.op("constantMAT", name="panel_color")
        geo.par.material = mat.path
        cam = ex.op("cameraCOMP", name="cam", tx=8, ty=-6.5, tz=34)
        r = ex.op("renderTOP", name="render", camera=cam, geometry=geo, resolutionw=720, resolutionh=720, bgcolora=1)
        ex.out(r)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

63 個のオペレータ。sha256: `1bb1245634b3ba5c…`
