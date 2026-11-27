<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/SoftenCenterGravityVel/ -->

# SoftenCenterGravityVel

`Simulation/Galaxy` フォルダのパレットです。

## 説明

点群の重心のまわりを回る円軌道の速度を、各点に書き込む: Vel = (Up × d) · √(Gm / (|d|² + Soft²)^(3/2))（d = P − 重心）。軸から r 離れた点は、SoftenCenterGravityAcc の重力とつり合う速さ √(Gm·r² / (r² + Soft²)^(3/2)) で Up 軸のまわりを回る。重心ちょうどの点は 0。GalaxyBase の円盤の初期速度に使う。

入力: in1 POP
出力: out1 POP（Vel 属性を追加・上書き）

パラメータ

- Gm / Soft: SoftenCenterGravityAcc と同じ
- Up: 回転軸（既定 0 0 1）
- P: 位置の属性名、Vel: 書き込む属性名

## ダウンロード

[SoftenCenterGravityVel.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/SoftenCenterGravityVel.tox) [使用例 SoftenCenterGravityVelExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/SoftenCenterGravityVelExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | POP | `in1` | Points |
| 出力 0 | POP | `out1` | Points / Vel を追加 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Gm` | Gravity Scale | Parameter | Float | `5` | 0.0 … 20.0 |
| `Soft` | SofteningLength | Parameter | Float | `0.1` | 0.0 … 1.0 |
| `P` | Position | Parameter | Str | `P` |  |
| `Up` | Up | Parameter | Str | `0 0 1` |  |
| `Vel` | Output Name | Parameter | Str | `Vel` |  |

## 使用例

### 円軌道の速度

![円軌道の速度](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Galaxy-SoftenCenterGravityVel-example.svg)

x 軸の上に −4〜4 の 9 点を並べ、重心(原点)のまわりを Up = z 軸で回る円軌道の速度(Vel)を出した例です。速度は y の向きで、右側は +y、左側は −y、速さは SoftenCenterGravityAcc の重力とつり合う √(Gm·r² / (r² + Soft²)^(3/2)) です(原点の点は 0)。

ネットワーク: `in0` (gridPOP: `surftype=none`, `sizex=8`, `sizey=0`, `cols=9`, `rows=1`) → `SoftenCenterGravityVel` (パレット) → `vel` (poptoCHOP: `pop=out1`, `attribscope=Vel`) → `out1`

[SoftenCenterGravityVelExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/SoftenCenterGravityVelExample.toe)

??? note "手順(Simulation/Galaxy/SoftenCenterGravityVel.example.py)"

    ```python
    """円軌道の速度

    x 軸の上に −4〜4 の 9 点を並べ、重心(原点)のまわりを Up = z 軸で回る円軌道の速度(Vel)を出した例です。速度は y の向きで、右側は +y、左側は −y、速さは SoftenCenterGravityAcc の重力とつり合う √(Gm·r² / (r² + Soft²)^(3/2)) です(原点の点は 0)。
    """

    def build(ex, tox):
        pts = ex.input("gridPOP", surftype="none", sizex=8, sizey=0, cols=9, rows=1)
        g = ex.palette(tox, pts)
        ex.out(ex.op("poptoCHOP", name="vel", pop=g.op("out1"), attribscope="Vel"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `3c6f9ae45ab89628…`
