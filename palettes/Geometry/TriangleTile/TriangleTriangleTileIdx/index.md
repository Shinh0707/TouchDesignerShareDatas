<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/TriangleTriangleTileIdx/ -->

# TriangleTriangleTileIdx

`Geometry/TriangleTile` フォルダのパレットです。

## 説明

三角形の中の三角形タイルの通し番号を、(j, i)（j = 段、i = 段の中の位置）に変える。InverseTriangleTriangleTileIdx の逆。

入力: in1 通し番号
出力: outj, outi

パラメータ

- N: いちばん下の行（段 0）の三角形の数（奇数）。段 j には N − 2j 個あり、全部で ((N + 1) / 2)² 個

## ダウンロード

[TriangleTriangleTileIdx.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleTriangleTileIdx.tox) [使用例 TriangleTriangleTileIdxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleTriangleTileIdxExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Index |
| 出力 0 | CHOP | `outj` | Index |
| 出力 1 | CHOP | `outi` | Index |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `N` | N | Parameter | Int | `17` | 1.0 … 32.0 |

## 使用例

### 通し番号から (段, 位置)

![通し番号から (段, 位置)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-TriangleTile-TriangleTriangleTileIdx-example.svg)

N = 5(段ごとに 5・3・1 個)の三角タイルの通し番号 0〜8 を、段 j と段の中の位置 i に変えた例です。j = 0, 0, 0, 0, 0, 1, 1, 1, 2、i = 0, 1, 2, 3, 4, 0, 1, 2, 0 になります。

ネットワーク: `in0` (patternCHOP: `channelname=idx`, `wavetype=rampsamples`, `length=9`) → `TriangleTriangleTileIdx` (パレット: `N=5`) → `j` (renameCHOP: `renamefrom=*`, `renameto=j`) → `i` (renameCHOP: `renamefrom=*`, `renameto=i`) → `j_and_i` (mergeCHOP) → `out1`

[TriangleTriangleTileIdxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleTriangleTileIdxExample.toe)

??? note "手順(Geometry/TriangleTile/TriangleTriangleTileIdx.example.py)"

    ```python
    """通し番号から (段, 位置)

    N = 5(段ごとに 5・3・1 個)の三角タイルの通し番号 0〜8 を、段 j と段の中の位置 i に変えた例です。j = 0, 0, 0, 0, 0, 1, 1, 1, 2、i = 0, 1, 2, 3, 4, 0, 1, 2, 0 になります。
    """

    def build(ex, tox):
        idx = ex.input("patternCHOP", channelname="idx", wavetype="rampsamples", length=9)
        t = ex.palette(tox, idx, N=5)
        j = ex.op("renameCHOP", name="j", input=t.op("outj"), renamefrom="*", renameto="j")
        i = ex.op("renameCHOP", name="i", input=t.op("outi"), renamefrom="*", renameto="i")
        ex.out(ex.op("mergeCHOP", name="j_and_i", input=[j, i]))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

22 個のオペレータ。sha256: `f15aab716f333818…`
