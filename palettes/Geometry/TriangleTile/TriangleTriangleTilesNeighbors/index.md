<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/TriangleTriangleTilesNeighbors/ -->

# TriangleTriangleTilesNeighbors

`Geometry/TriangleTile` フォルダのパレットです。

## 説明

三角形の中の三角形タイルで、各タイル (j, i) の隣（左右と、上か下の 3 つ）の通し番号を出す。上向き（i が偶数）の三角形は 1 つ下の段の i + 1、下向き（i が奇数）は 1 つ上の段の i − 1 が 3 つ目の隣になる。左右は段の中で巻き戻す（TorusMod）。いちばん下の段（j = 0）の上向きの三角形には下の隣が無いので、3 つ目は −1 になる。

入力

- inj: 段 j
- ini: 段の中の位置 i

出力: outIdx タイルごとに 1 チャンネル × 3 サンプル（左、右、上か下の隣の番号。無い隣は −1）。outj, outi も出す

パラメータ

- N: いちばん下の行（段 0）の三角形の数（奇数）。段 j には N − 2j 個あり、全部で ((N + 1) / 2)² 個

## ダウンロード

[TriangleTriangleTilesNeighbors.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleTriangleTilesNeighbors.tox) [使用例 TriangleTriangleTilesNeighborsExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleTriangleTilesNeighborsExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inj` | Index |
| 入力 1 | CHOP | `ini` | Index |
| 出力 0 | CHOP | `outIdx` | Index |
| 出力 1 | CHOP | `outj` |  |
| 出力 2 | CHOP | `outi` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `N` | N | Parameter | Int | `17` | 1.0 … 32.0 |

## 使用例

### 三角タイルの隣

![三角タイルの隣](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-TriangleTile-TriangleTriangleTilesNeighbors-example.svg)

N = 5(段ごとに 5・3・1 個)の三角タイル 9 枚それぞれの、左・右・上か下の隣の番号を出した例です(チャンネル = タイル、3 サンプル)。いちばん下の段の上向きの三角形(0・2・4)には下の隣が無いので、3 つ目は −1 です。たとえば下向きのタイル 1 の隣は 0・2・5 です。

ネットワーク: `idx` (patternCHOP: `channelname=idx`, `wavetype=rampsamples`, `length=9`) → `TriangleTriangleTileIdx` (パレット: `N=5`) → `in0` (nullCHOP) → `in1` (nullCHOP) → `TriangleTriangleTilesNeighbors` (パレット: `N=5`) → `neighbors` (selectCHOP: `chops=outIdx`) → `out1`

[TriangleTriangleTilesNeighborsExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleTriangleTilesNeighborsExample.toe)

??? note "手順(Geometry/TriangleTile/TriangleTriangleTilesNeighbors.example.py)"

    ```python
    """三角タイルの隣

    N = 5(段ごとに 5・3・1 個)の三角タイル 9 枚それぞれの、左・右・上か下の隣の番号を出した例です(チャンネル = タイル、3 サンプル)。いちばん下の段の上向きの三角形(0・2・4)には下の隣が無いので、3 つ目は −1 です。たとえば下向きのタイル 1 の隣は 0・2・5 です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES  # noqa: E402

    def build(ex, tox):
        idx = ex.op("patternCHOP", name="idx", channelname="idx", wavetype="rampsamples", length=9)
        ji = ex.palette(PALETTES + "/Geometry/TriangleTile/TriangleTriangleTileIdx.tox", idx, N=5)
        j = ex.input("nullCHOP", input=ji.op("outj"))
        i = ex.input("nullCHOP", input=ji.op("outi"))
        nb = ex.palette(tox, j, i, N=5)
        ex.out(ex.op("selectCHOP", name="neighbors", chops=nb.op("outIdx")))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

89 個のオペレータ。sha256: `49c6e1b5c2f18fb2…`
