<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/BoidSimulationStep/ -->

# BoidSimulationStep

`Simulation/Boid` フォルダのパレットです。

## 説明

GPU（TOP）のボイドの 1 ステップ。全ペアの距離を正規化して、距離の帯ごとに力を切り替える。近い（< Septhres）と分離、中くらい（< Alithres）で整列、遠い（< 1）で結合。速度に足し、Dt で位置を進める。

入力

- positions: 位置（1 行 N 画素）
- speeds: 速度（1 行 N 画素）

出力

- deltaPositionOut: 次の位置
- deltaSpeedOut: 速度の変化

パラメータ

- Posnorm: 距離を正規化する倍率
- Septhres / Alithres: 分離・整列の帯の境目（正規化した距離）
- Dt: 1 ステップの時間

## ダウンロード

[BoidSimulationStep.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidSimulationStep.tox) [使用例 BoidSimulationStepExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidSimulationStepExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `positions` | Data |
| 入力 1 | TOP | `speeds` | Data |
| 出力 0 | TOP | `deltaPositionOut` | Data / 次の位置 |
| 出力 1 | TOP | `deltaSpeedOut` | Data / 速度の変化 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Posnorm` | PositionNormalizationScale | Parameter | Float | `0.0277778` | 0.0 … 1.0 |
| `Septhres` | SeparationThreshold | Parameter | Float | `0.166667` | 0.0 … 1.0 |
| `Alithres` | AlignmentThreshold | Parameter | Float | `0.5` | 0.0 … 1.0 |
| `Dt` | DeltaTime | Parameter | Float | `0` | 0.0 … 1.0 |

## 使用例

### ボイドの 1 ステップ(GPU)

![ボイドの 1 ステップ(GPU)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Boid-BoidSimulationStep-example.svg)

ランダムな位置と速度の 32 匹のボイド(1 行 32 画素の TOP)を 1 ステップ進めた例です。次の位置(deltaPositionOut)から元の位置を引いた、1 ステップの移動量の x, y, z を見せています。

ネットワーク: `pos` (patternCHOP: `channelname=r g b`, `wavetype=random`, `length=32`, `amp=2`, `offset=-1`) → `vel` (patternCHOP: `channelname=r g b`, `wavetype=random`, `length=32`, `amp=0.4`, `offset=-0.2`, `seed=5`) → `in0` (choptoTOP: `chop=pos`, `dataformat=rgb`, `format=rgba32float`) → `in1` (choptoTOP: `chop=vel`, `dataformat=rgb`, `format=rgba32float`) → `BoidSimulationStep` (パレット) → `next_pos` (toptoCHOP: `top=deltaPositionOut`, `a=`) → `pos_now` (toptoCHOP: `top=in0`, `a=`) → `moved` (mathCHOP: `chopop=sub`) → `out1`

[BoidSimulationStepExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidSimulationStepExample.toe)

??? note "手順(Simulation/Boid/BoidSimulationStep.example.py)"

    ```python
    """ボイドの 1 ステップ(GPU)

    ランダムな位置と速度の 32 匹のボイド(1 行 32 画素の TOP)を 1 ステップ進めた例です。次の位置(deltaPositionOut)から元の位置を引いた、1 ステップの移動量の x, y, z を見せています。
    """

    def build(ex, tox):
        pos = ex.op("patternCHOP", name="pos", channelname="r g b", wavetype="random", length=32, amp=2, offset=-1)
        vel = ex.op("patternCHOP", name="vel", channelname="r g b", wavetype="random", length=32, amp=0.4,
                    offset=-0.2, seed=5)
        p = ex.input("choptoTOP", chop=pos, dataformat="rgb", format="rgba32float")
        v = ex.input("choptoTOP", chop=vel, dataformat="rgb", format="rgba32float")
        s = ex.palette(tox, p, v)
        nxt = ex.op("toptoCHOP", name="next_pos", top=s.op("deltaPositionOut"), a="")
        now = ex.op("toptoCHOP", name="pos_now", top=p, a="")
        ex.out(ex.op("mathCHOP", name="moved", input=[nxt, now], chopop="sub"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

64 個のオペレータ。sha256: `fa84fbddd1a4cd55…`
