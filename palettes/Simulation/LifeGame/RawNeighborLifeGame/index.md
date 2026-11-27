<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/LifeGame/RawNeighborLifeGame/ -->

# RawNeighborLifeGame

`Simulation/LifeGame` フォルダのパレットです。

## 説明

ライフゲームの 1 世代の計算の中身。各セルの近傍の生きている数（環境）を数え、外から与えたルールで次の状態を作る: 次 = 生 × (1 − 死のルール) + 死 × 誕生のルール。ルールは環境から外で作る（NeighborLifeGame がしきい値で作っている）。

入力

- inState: 状態（0/1）
- inNeighborIdx: 近傍の番号
- inDeathRule: 死のルール（0/1、セルごと）
- inBirthRule: 誕生のルール（0/1、セルごと）

出力

- outEnvironment: 近傍の生きている数
- outState: 次の状態

## ダウンロード

[RawNeighborLifeGame.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/RawNeighborLifeGame.tox) [使用例 RawNeighborLifeGameExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/RawNeighborLifeGameExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inState` | Gate |
| 入力 1 | CHOP | `inNeighborIdx` | Index |
| 入力 2 | CHOP | `inDeathRule` | Gate |
| 入力 3 | CHOP | `inBirthRule` | Gate |
| 出力 0 | CHOP | `outEnvironment` | Feature / 近傍の生きている数 |
| 出力 1 | CHOP | `outState` | Gate |

## 使用例

### ライフゲームの 1 世代(規則を外から)

![ライフゲームの 1 世代(規則を外から)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-LifeGame-RawNeighborLifeGame-example.svg)

5 × 5 の格子(端は巻き戻す)の横 3 つのブリンカー(セル 11・12・13)を、外で作った規則で 1 世代進めた例です。この部品が出す近傍の数(outEnvironment)から、死の規則(1 以下か 4 以上)と誕生の規則(ちょうど 3)を Expression CHOP で作って戻しています。next は縦の 3 つ(セル 7・12・17)になります。

ネットワーク: `grid25` (patternCHOP: `wavetype=const`, `length=25`, `amp=0`) → `in0` (expressionCHOP: `expr0expr={'expr': '1 if me.sampleIndex in (11, 12, 13) else 0'}`) → `SquareLifeGameNeighborIdx` (パレット: `Sizew=5`, `Sizeh=5`, `Column=1`, `Row=1`) → `RawNeighborLifeGame` (パレット) → `environment` (selectCHOP: `chops=outEnvironment`) → `death_rule` (expressionCHOP: `expr0expr={'expr': '1 if (me.inputVal <= 1 or me.inputVal >= 4) else 0'}`) → `birth_rule` (expressionCHOP: `expr0expr={'expr': '1 if me.inputVal == 3 else 0'}`) → `now` (renameCHOP: `renamefrom=*`, `renameto=now`) → `next` (renameCHOP: `renamefrom=*`, `renameto=next`) → `now_and_next` (mergeCHOP) → `out1`

[RawNeighborLifeGameExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/RawNeighborLifeGameExample.toe)

??? note "手順(Simulation/LifeGame/RawNeighborLifeGame.example.py)"

    ```python
    """ライフゲームの 1 世代(規則を外から)

    5 × 5 の格子(端は巻き戻す)の横 3 つのブリンカー(セル 11・12・13)を、外で作った規則で 1 世代進めた例です。この部品が出す近傍の数(outEnvironment)から、死の規則(1 以下か 4 以上)と誕生の規則(ちょうど 3)を Expression CHOP で作って戻しています。next は縦の 3 つ(セル 7・12・17)になります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES  # noqa: E402

    DEATH = "1 if (me.inputVal <= 1 or me.inputVal >= 4) else 0"
    BIRTH = "1 if me.inputVal == 3 else 0"

    def build(ex, tox):
        base = ex.op("patternCHOP", name="grid25", wavetype="const", length=25, amp=0)
        now = ex.input("expressionCHOP", input=base, expr0expr={"expr": "1 if me.sampleIndex in (11, 12, 13) else 0"})
        idx = ex.palette(PALETTES + "/Simulation/LifeGame/SquareLifeGameNeighborIdx.tox", Sizew=5, Sizeh=5,
                         Column="1", Row="1")
        life = ex.palette(tox, now, idx)
        env = ex.op("selectCHOP", name="environment", chops=life.op("outEnvironment"))
        death = ex.op("expressionCHOP", name="death_rule", input=env, expr0expr={"expr": DEATH})
        birth = ex.op("expressionCHOP", name="birth_rule", input=env, expr0expr={"expr": BIRTH})
        life.inputConnectors[2].connect(death)
        life.inputConnectors[3].connect(birth)
        a = ex.op("renameCHOP", name="now", input=now, renamefrom="*", renameto="now")
        b = ex.op("renameCHOP", name="next", input=life.op("outState"), renamefrom="*", renameto="next")
        ex.out(ex.op("mergeCHOP", name="now_and_next", input=[a, b]))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

16 個のオペレータ。sha256: `8caeb93a86154f08…`
