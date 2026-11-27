<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/InverseTriangleTriangleTileIdx/ -->

# InverseTriangleTriangleTileIdx

`Geometry/TriangleTile` フォルダのパレットです。

## 説明

三角形の中の三角形タイルの (j, i) から通し番号を出す: idx = (N + 1 − j)·j + i。

入力

- inJ: 段 j
- inI: 段の中の位置 i

出力

- outIdx: 通し番号
- outj: その段の始まりの番号
- outi: i（そのまま）

パラメータ

- N: いちばん下の行（段 0）の三角形の数（奇数）。段 j には N − 2j 個あり、全部で ((N + 1) / 2)² 個

## ダウンロード

[InverseTriangleTriangleTileIdx.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/InverseTriangleTriangleTileIdx.tox) [使用例 InverseTriangleTriangleTileIdxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/InverseTriangleTriangleTileIdxExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inJ` | Index |
| 入力 1 | CHOP | `inI` | Index |
| 出力 0 | CHOP | `outIdx` | Index |
| 出力 1 | CHOP | `outj` | Index |
| 出力 2 | CHOP | `outi` | Index |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `N` | N | Parameter | Int | `17` | 1.0 … 32.0 |

## 使用例

### (段, 位置) から通し番号

![(段, 位置) から通し番号](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-TriangleTile-InverseTriangleTriangleTileIdx-example.svg)

N = 5 の三角タイルの 9 枚の (段 j, 位置 i) から、通し番号 idx = (N + 1 − j)·j + i を出した例です。(j, i) は TriangleTriangleTileIdx で通し番号 0〜8 から作っているので、元の 0〜8 に戻ります。

ネットワーク: `idx` (patternCHOP: `channelname=idx`, `wavetype=rampsamples`, `length=9`) → `TriangleTriangleTileIdx` (パレット: `N=5`) → `in0` (nullCHOP) → `in1` (nullCHOP) → `InverseTriangleTriangleTileIdx` (パレット: `N=5`) → `idx_back` (selectCHOP: `chops=outIdx`) → `out1`

[InverseTriangleTriangleTileIdxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/InverseTriangleTriangleTileIdxExample.toe)

??? note "手順(Geometry/TriangleTile/InverseTriangleTriangleTileIdx.example.py)"

    ```python
    """(段, 位置) から通し番号

    N = 5 の三角タイルの 9 枚の (段 j, 位置 i) から、通し番号 idx = (N + 1 − j)·j + i を出した例です。(j, i) は TriangleTriangleTileIdx で通し番号 0〜8 から作っているので、元の 0〜8 に戻ります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES  # noqa: E402

    def build(ex, tox):
        idx = ex.op("patternCHOP", name="idx", channelname="idx", wavetype="rampsamples", length=9)
        ji = ex.palette(PALETTES + "/Geometry/TriangleTile/TriangleTriangleTileIdx.tox", idx, N=5)
        j = ex.input("nullCHOP", input=ji.op("outj"))
        i = ex.input("nullCHOP", input=ji.op("outi"))
        back = ex.palette(tox, j, i, N=5)
        ex.out(ex.op("selectCHOP", name="idx_back", chops=back.op("outIdx")))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

11 個のオペレータ。sha256: `c11fdee268607a27…`
