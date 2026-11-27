<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/SpeedUpdate/ -->

# SpeedUpdate

`Simulation` フォルダのパレットです。

## 説明

速度と位置を 1 ステップ進める（シンプレクティック・オイラー法: Vel += Acc·Dt、P += Vel·Dt）。中にフィードバックはないので、Feedback POP のループの中に置いて毎フレーム使う。

入力: in1 POP（P, Vel, Acc 属性を持つ）
出力: out1 POP（P と Vel を更新）

パラメータ

- Speed: 時間の速さ（Dt = 1/フレームレート × Speed）
- P / Vel / Acc: 使う属性名

## ダウンロード

[SpeedUpdate.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/SpeedUpdate.tox) [使用例 SpeedUpdateExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/SpeedUpdateExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | POP | `in1` | Points / P、Vel、Acc |
| 出力 0 | POP | `out1` | Points |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Dtbase` | Base Delta Time | Parameter | Float | `0` | 0.0 … 1.0 |
| `Speed` | Speed Scale | Parameter | Float | `1` | 0.0 … 10.0 |
| `Dt` | Delta Time | Parameter | Float | `0` | 0.0 … 1.0 |
| `P` | Position | Parameter | Str | `P` |  |
| `Vel` | Velocity | Parameter | Str | `Vel` |  |
| `Acc` | Acceleration | Parameter | Str | `Acc` |  |

## 使用例

### 速度と位置を 1 ステップ進める

![速度と位置を 1 ステップ進める](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-SpeedUpdate-example.svg)

原点の 1 点に、速度 Vel = (1, 0, 0) と加速度 Acc = (0, −9.8, 0) を持たせて、1 ステップ進めた例です(Speed 1、60 fps なので Dt = 1/60)。Vel は (1, −0.163, 0)、P はその新しい速度で (0.0167, −0.0027, 0) になります(シンプレクティック・オイラー法)。

ネットワーク: `origin` (pointPOP) → `vel` (attributePOP: `attr0name=custom`, `attr0customname=Vel`, `attr0numcomps=3`, `attr0value0=1`, `attr0value1=0`, `attr0value2=0`) → `in0` (attributePOP: `attr0name=custom`, `attr0customname=Acc`, `attr0numcomps=3`, `attr0value0=0`, `attr0value1=-9.8`, `attr0value2=0`) → `SpeedUpdate` (パレット) → `p_and_vel` (poptoCHOP: `pop=out1`, `attribscope=P Vel`) → `out1`

[SpeedUpdateExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/SpeedUpdateExample.toe)

??? note "手順(Simulation/SpeedUpdate.example.py)"

    ```python
    """速度と位置を 1 ステップ進める

    原点の 1 点に、速度 Vel = (1, 0, 0) と加速度 Acc = (0, −9.8, 0) を持たせて、1 ステップ進めた例です(Speed 1、60 fps なので Dt = 1/60)。Vel は (1, −0.163, 0)、P はその新しい速度で (0.0167, −0.0027, 0) になります(シンプレクティック・オイラー法)。
    """

    def build(ex, tox):
        pt = ex.op("pointPOP", name="origin")
        vel = ex.op("attributePOP", name="vel", input=pt, attr0name="custom", attr0customname="Vel",
                    attr0numcomps="3", attr0value0=1, attr0value1=0, attr0value2=0)
        acc = ex.input("attributePOP", input=vel, attr0name="custom", attr0customname="Acc", attr0numcomps="3",
                       attr0value0=0, attr0value1=-9.8, attr0value2=0)
        s = ex.palette(tox, acc)
        ex.out(ex.op("poptoCHOP", name="p_and_vel", pop=s.op("out1"), attribscope="P Vel"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `e7fb24120bdab596…`
