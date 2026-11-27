<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/TriangleRowIdx/ -->

# TriangleRowIdx

`Geometry/TriangleTile` フォルダのパレットです。

## 説明

大きな三角形を小さな三角形で敷き詰めたときの、通し番号 i から行の番号 j を出す。行 j には N − 2j 個の三角形があり（0 行目に N 個、1 行目に N − 2 個 … 最後の行に 1 個。N は奇数）、行 j は番号 (N + 1 − j)·j から始まる（TriangleTriangleTileIdx と同じ並び）。東京ビッグサイトの三角ドームの面の番号づけに使った。

入力: in1 通し番号の CHOP
出力

- outIdx: 行の番号（整数）
- outNorm: 行の番号の連続値（切り捨てる前）

パラメータ

- N: いちばん下の行の三角形の数（奇数。大三角の 1 辺の小三角形の数を n とすると N = 2n − 1）

## ダウンロード

[TriangleRowIdx.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleRowIdx.tox) [使用例 TriangleRowIdxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleRowIdxExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Index |
| 出力 0 | CHOP | `outIdx` | Index |
| 出力 1 | CHOP | `outNorm` | Feature |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `N` | N | Parameter | Int | `17` | 1.0 … 32.0 |

## 使用例

### 通し番号から行

![通し番号から行](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-TriangleTile-TriangleRowIdx-example.svg)

N = 5(行ごとに 5・3・1 個、全部で 9 枚)の三角タイルの通し番号 0〜8 の行を出した例です。0〜4 が行 0、5〜7 が行 1、8 が行 2 になります(x = 番号、y = 行)。

ネットワーク: `in0` (patternCHOP: `channelname=idx`, `wavetype=rampsamples`, `length=9`) → `TriangleRowIdx` (パレット: `N=5`) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[TriangleRowIdxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleRowIdxExample.toe)

??? note "手順(Geometry/TriangleTile/TriangleRowIdx.example.py)"

    ```python
    """通し番号から行

    N = 5(行ごとに 5・3・1 個、全部で 9 枚)の三角タイルの通し番号 0〜8 の行を出した例です。0〜4 が行 0、5〜7 が行 1、8 が行 2 になります(x = 番号、y = 行)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        idx = ex.input("patternCHOP", channelname="idx", wavetype="rampsamples", length=9)
        in_out(ex, tox, idx, N=5)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

19 個のオペレータ。sha256: `2ef8c446a11c27f5…`
