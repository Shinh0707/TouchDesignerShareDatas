<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/LifeGame/SquareLifeGameNeighborIdx/ -->

# SquareLifeGameNeighborIdx

`Simulation/LifeGame` フォルダのパレットです。

## 説明

正方格子（Sizew × Sizeh）の各セルの 8 近傍の番号の表を作る（NeighborLifeGame の inNeighborIdx 用）。端の扱いを Column / Row で選ぶ。

入力: なし（in に繋ぐと、その長さのセル数を使う）
出力: out1 セル数チャンネル × 8 サンプル（近傍のセルの番号）

パラメータ

- Size (w, h): 格子の大きさ（既定 20 × 20）
- Column / Row: 左右・上下の端の扱い（Clamp at the edge / Wrap around / Mirror）

## ダウンロード

[SquareLifeGameNeighborIdx.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/SquareLifeGameNeighborIdx.tox) [使用例 SquareLifeGameNeighborIdxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/SquareLifeGameNeighborIdxExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inInit` |  |
| 出力 0 | CHOP | `out1` | Index / セルごとの 8 近傍の番号 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Sizew` | W | Parameter | Int | `20` | 1.0 … 500.0 |
| `Sizeh` | H | Parameter | Int | `20` | 1.0 … 500.0 |
| `Column` | Column | Parameter | Menu | `1` | `0` / `1` / `2` |
| `Row` | Row | Parameter | Menu | `1` | `0` / `1` / `2` |
| `Active` | Active | Action | Toggle | `True` |  |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 8 近傍の番号の表

![8 近傍の番号の表](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-LifeGame-SquareLifeGameNeighborIdx-example.svg)

4 × 3 の格子(端は巻き戻す)の、12 個のセルそれぞれの 8 近傍の番号を出した例です。セル i の列 = i mod 4、行 = i ÷ 4 で、たとえばセル 0 の近傍は 1・3・4・5・7・8・9・11 です(並びは右下・右上・左下・左上・右・左・下・上。行は下向きに増える)。

ネットワーク: `SquareLifeGameNeighborIdx` (パレット: `Sizew=4`, `Sizeh=3`, `Column=1`, `Row=1`) → `out1`

[SquareLifeGameNeighborIdxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/SquareLifeGameNeighborIdxExample.toe)

??? note "手順(Simulation/LifeGame/SquareLifeGameNeighborIdx.example.py)"

    ```python
    """8 近傍の番号の表

    4 × 3 の格子(端は巻き戻す)の、12 個のセルそれぞれの 8 近傍の番号を出した例です。セル i の列 = i mod 4、行 = i ÷ 4 で、たとえばセル 0 の近傍は 1・3・4・5・7・8・9・11 です(並びは右下・右上・左下・左上・右・左・下・上。行は下向きに増える)。
    """

    def build(ex, tox):
        ex.palette(tox, Sizew=4, Sizeh=3, Column="1", Row="1")
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

30 個のオペレータ。sha256: `154561763ce88d48…`
