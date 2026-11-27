<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/PositionsPairDist/ -->

# PositionsPairDist

`Image/Math` フォルダのパレットです。

## 説明

1 行 N 画素の点（RGB = 位置）から、全ペアの差を N×N の画像で出す。画素 (i, j) に点 i と点 j の差を入れる。

- distOut: 距離（32 bit float の 1 チャンネル）
- normDiffOut: 長さ 1 にした差（RGB）。距離 0 の組（自分自身）は 0

入力: in1 TOP（1 行 N 画素、RGB = 位置）
出力: distOut、normDiffOut（N×N）

## ダウンロード

[PositionsPairDist.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/PositionsPairDist.tox) [使用例 PositionsPairDistExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/PositionsPairDistExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data / RGB = 位置 |
| 出力 0 | TOP | `distOut` | Data |
| 出力 1 | TOP | `normDiffOut` | VectorField |

## 使用例

### 全ペアの距離

![全ペアの距離](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-PositionsPairDist-example.svg)

円の上に等間隔に並べた 8 点(1 行 8 画素、RGB = x, y, z)の、全ペアの距離を 8 × 8 の画像で出した例です(distOut、値はアルファ)。隣どうしは 2·sin(π/8) ≈ 0.77、向かい合う点どうしは 2 で、対角(自分自身)は 0 です。1 行目(点 0 から各点への距離)を CHOP にして見せています。

ネットワーク: `x` (patternCHOP: `channelname=r`, `wavetype=cos`, `length=8`, `numcycles=1`) → `y` (patternCHOP: `channelname=g`, `wavetype=sin`, `length=8`, `numcycles=1`) → `z` (patternCHOP: `channelname=b`, `wavetype=const`, `length=8`, `amp=0`) → `xyz` (mergeCHOP) → `in0` (choptoTOP: `chop=xyz`, `dataformat=rgb`, `format=rgba32float`) → `PositionsPairDist` (パレット) → `row0` (toptoCHOP: `top=distOut`, `r=`, `g=`, `b=`, `a=a`, `crop=row`, `vstart=0`) → `from_point0` (renameCHOP: `renamefrom=*`, `renameto=dist`) → `out1`

[PositionsPairDistExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/PositionsPairDistExample.toe)

??? note "手順(Image/Math/PositionsPairDist.example.py)"

    ```python
    """全ペアの距離

    円の上に等間隔に並べた 8 点(1 行 8 画素、RGB = x, y, z)の、全ペアの距離を 8 × 8 の画像で出した例です(distOut、値はアルファ)。隣どうしは 2·sin(π/8) ≈ 0.77、向かい合う点どうしは 2 で、対角(自分自身)は 0 です。1 行目(点 0 から各点への距離)を CHOP にして見せています。
    """

    def build(ex, tox):
        x = ex.op("patternCHOP", name="x", channelname="r", wavetype="cos", length=8, numcycles=1)
        y = ex.op("patternCHOP", name="y", channelname="g", wavetype="sin", length=8, numcycles=1)
        z = ex.op("patternCHOP", name="z", channelname="b", wavetype="const", length=8, amp=0)
        xyz = ex.op("mergeCHOP", name="xyz", input=[x, y, z])
        pts = ex.input("choptoTOP", chop=xyz, dataformat="rgb", format="rgba32float")
        d = ex.palette(tox, pts)
        row = ex.op("toptoCHOP", name="row0", top=d.op("distOut"), r="", g="", b="", a="a", crop="row", vstart=0)
        ex.out(ex.op("renameCHOP", name="from_point0", input=row, renamefrom="*", renameto="dist"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

14 個のオペレータ。sha256: `6c24447ca1031850…`
