<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/LifeGame/SquareLifeGame/ -->

# SquareLifeGame

`Simulation/LifeGame` フォルダのパレットです。

## 説明

正方格子のライフゲーム（Sizew × Sizeh）。ランダムな初期状態から、Hz の速さで世代を進める。8 近傍（自分は数えない）で、近傍が Under 以下か Over 以上なら死、死んだセルは近傍がちょうど Birth なら誕生（既定 1 / 4 / 3 で標準の B3/S23 = 2〜3 で生存、3 で誕生）。in1 の CHOP を Mode で状態に足す・掛けるなどして、外から介入できる。

入力: in1 CHOP（省略可、外からの介入）
出力: out1 状態（Sizeh チャンネル × Sizew サンプル、0/1）

パラメータ

- Size (w, h): 格子の大きさ
- Column / Row: 左右・上下の端の扱い（Clamp at the edge / Wrap around / Mirror）
- Mode: in1 を状態に Add / Subtract / Multiply
- Hz: 1 秒あたりの世代数
- Under / Over / Birth: これ以下で死、これ以上で死、ちょうどこれで誕生（近傍の数）
- Play / Reset: 進める / 初期状態に戻す

## ダウンロード

[SquareLifeGame.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/SquareLifeGame.tox) [使用例 SquareLifeGameExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/SquareLifeGameExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any(省略可) |
| 出力 0 | CHOP | `out1` | Matrix / Sizeh チャンネル × Sizew サンプル |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Sizew` | W | Parameter | Int | `20` | 1.0 … 200.0 |
| `Sizeh` | H | Parameter | Int | `20` | 1.0 … 200.0 |
| `Hz` | Hz | Parameter | Float | `20` | 1.0 … 60.0 |
| `Under` | Underpopulation | Parameter | Int | `1` | 0.0 … 8.0 |
| `Over` | Overpopulation | Parameter | Int | `4` | 0.0 … 8.0 |
| `Birth` | Birth | Parameter | Int | `3` | 0.0 … 8.0 |
| `Column` | Column | Parameter | Menu | `1` | `0` / `1` / `2` |
| `Row` | Row | Parameter | Menu | `1` | `0` / `1` / `2` |
| `Mode` | Input Mode | Parameter | Menu | `0` | `0` / `1` / `2` |
| `Play` | Play | Action | Toggle | `True` |  |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 正方格子のライフゲーム

![正方格子のライフゲーム](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-LifeGame-SquareLifeGame-example.png)

33 × 26 の格子で、ランダムな初期状態から 3 秒(約 70 世代)進めた例です。白が生きているセルです。止まった形(ブロックなど)と、動き続ける形が残ります。

ネットワーク: `SquareLifeGame` (パレット) → `cells` (choptoTOP: `chop=out1`, `dataformat=r`) → `white` (reorderTOP: `outputgreenchan=red`, `outputbluechan=red`) → `enlarged` (fitTOP: `outputresolution=custom`, `resolutionw=660`, `resolutionh=520`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[SquareLifeGameExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/SquareLifeGameExample.toe)

??? note "手順(Simulation/LifeGame/SquareLifeGame.example.py)"

    ```python
    """正方格子のライフゲーム

    33 × 26 の格子で、ランダムな初期状態から 3 秒(約 70 世代)進めた例です。白が生きているセルです。止まった形(ブロックなど)と、動き続ける形が残ります。
    """

    FRAMES = 180

    def build(ex, tox):
        life = ex.palette(tox)
        img = ex.op("choptoTOP", name="cells", chop=life.op("out1"), dataformat="r")
        grey = ex.op("reorderTOP", name="white", input=img, outputgreenchan="red", outputbluechan="red")
        ex.out(ex.op("fitTOP", name="enlarged", input=grey, outputresolution="custom", resolutionw=660,
                     resolutionh=520, fit="fitbest", inputfiltertype="nearest", filtertype="nearest"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

130 個のオペレータ。sha256: `eb2427cdb6b9a8c2…`
