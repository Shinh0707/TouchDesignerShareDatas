<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/LifeGame/NeighborLifeGame/ -->

# NeighborLifeGame

`Simulation/LifeGame` フォルダのパレットです。

## 説明

ライフゲームの 1 世代分。状態（0/1 の列）と、各セルの近傍の番号の表から、次の状態を出す。近傍が Under 以下か Over 以上で死、死んだセルは近傍がちょうど Birth で誕生（既定 1 / 4 / 3 = 標準の B3/S23）。格子の形は近傍の表で決まるので、正方格子以外にも使える。

入力

- inState: 状態（1 チャンネル、セル数サンプル、0/1）
- inNeighborIdx: 近傍の番号（セル数チャンネル × 近傍の数サンプル。SquareLifeGameNeighborIdx の出力など）

出力: outState 次の状態

パラメータ

- Under / Over / Birth: 近傍の数のしきい値

## ダウンロード

[NeighborLifeGame.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/NeighborLifeGame.tox) [使用例 NeighborLifeGameExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/NeighborLifeGameExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inState` | Gate |
| 入力 1 | CHOP | `inNeighborIdx` | Index |
| 出力 0 | CHOP | `outState` | Gate |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Under` | Underpopulation | Parameter | Float | `1` | 0.0 … 8.0 |
| `Over` | Overpopulation | Parameter | Float | `4` | 0.0 … 8.0 |
| `Birth` | Birth | Parameter | Float | `3` | 0.0 … 8.0 |

## 使用例

### ライフゲームの 1 世代

![ライフゲームの 1 世代](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-LifeGame-NeighborLifeGame-example.svg)

5 × 5 の格子(端は巻き戻す)に、横に 3 つ並んだ「ブリンカー」(セル 11・12・13)を置いて、1 世代進めた例です。now が今の状態、next が次の状態で、縦の 3 つ(セル 7・12・17)に変わります。

近傍の番号の表は SquareLifeGameNeighborIdx で作っています。表を差し替えれば、正方格子以外の形でも同じ規則で進められます。

ネットワーク: `grid25` (patternCHOP: `wavetype=const`, `length=25`, `amp=0`) → `in0` (expressionCHOP: `expr0expr={'expr': '1 if me.sampleIndex in (11, 12, 13) else 0'}`) → `SquareLifeGameNeighborIdx` (パレット: `Sizew=5`, `Sizeh=5`, `Column=1`, `Row=1`) → `NeighborLifeGame` (パレット) → `now` (renameCHOP: `renamefrom=*`, `renameto=now`) → `next` (renameCHOP: `renamefrom=*`, `renameto=next`) → `now_and_next` (mergeCHOP) → `out1`

[NeighborLifeGameExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/NeighborLifeGameExample.toe)

??? note "手順(Simulation/LifeGame/NeighborLifeGame.example.py)"

    ```python
    """ライフゲームの 1 世代

    5 × 5 の格子(端は巻き戻す)に、横に 3 つ並んだ「ブリンカー」(セル 11・12・13)を置いて、1 世代進めた例です。now が今の状態、next が次の状態で、縦の 3 つ(セル 7・12・17)に変わります。

    近傍の番号の表は SquareLifeGameNeighborIdx で作っています。表を差し替えれば、正方格子以外の形でも同じ規則で進められます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES  # noqa: E402

    def build(ex, tox):
        base = ex.op("patternCHOP", name="grid25", wavetype="const", length=25, amp=0)
        now = ex.input("expressionCHOP", input=base, expr0expr={"expr": "1 if me.sampleIndex in (11, 12, 13) else 0"})
        idx = ex.palette(PALETTES + "/Simulation/LifeGame/SquareLifeGameNeighborIdx.tox", Sizew=5, Sizeh=5,
                         Column="1", Row="1")
        life = ex.palette(tox, now, idx)
        a = ex.op("renameCHOP", name="now", input=now, renamefrom="*", renameto="now")
        b = ex.op("renameCHOP", name="next", input=life, renamefrom="*", renameto="next")
        ex.out(ex.op("mergeCHOP", name="now_and_next", input=[a, b]))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

51 個のオペレータ。sha256: `80d0cee752f1f4c0…`
