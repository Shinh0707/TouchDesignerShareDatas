<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/SoftenCenterGravityAcc/ -->

# SoftenCenterGravityAcc

`Simulation/Galaxy` フォルダのパレットです。

## 説明

点群の重心に向かう重力の加速度を、各点に書き込む（ソフトニング付き: a = −Gm·(P−c) / (|P−c|² + Soft²)^(3/2)、c = 全点の平均位置）。Soft で中心近くの発散を和らげる。SpeedUpdate で速度・位置に積分する。

入力: in1 POP
出力: out1 POP（Acc 属性を追加・上書き）

パラメータ

- Gm: 重力の強さ
- Soft: ソフトニング長（中心近くの加速度の上限を決める）
- P: 位置の属性名、Acc: 書き込む属性名

## ダウンロード

[SoftenCenterGravityAcc.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/SoftenCenterGravityAcc.tox) [使用例 SoftenCenterGravityAccExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/SoftenCenterGravityAccExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | POP | `in1` | Points |
| 出力 0 | POP | `out1` | Points / Acc を追加 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Gm` | Gravity Scale | Parameter | Float | `5` | 0.0 … 20.0 |
| `Soft` | SofteningLength | Parameter | Float | `0.1` | 0.0 … 1.0 |
| `P` | Position | Parameter | Str | `P` |  |
| `Acc` | Output Name | Parameter | Str | `Acc` |  |

## 使用例

### 中心へ向かう重力の加速度

![中心へ向かう重力の加速度](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Galaxy-SoftenCenterGravityAcc-example.svg)

x 軸の上に 0〜4 の 9 点を並べ、全点の平均(x = 2)へ向かう加速度(Acc の x 成分)を出した例です。a = −Gm·(x − 2) / ((x − 2)² + Soft²)^(3/2) なので、中心から離れるほど弱くなり、中心のすぐ近くは Soft で抑えられて 0 に戻ります。

ネットワーク: `in0` (gridPOP: `surftype=none`, `sizex=4`, `sizey=0`, `cols=9`, `rows=1`, `tx=2`) → `SoftenCenterGravityAcc` (パレット) → `acc` (poptoCHOP: `pop=out1`, `attribscope=Acc`) → `out1`

[SoftenCenterGravityAccExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/SoftenCenterGravityAccExample.toe)

??? note "手順(Simulation/Galaxy/SoftenCenterGravityAcc.example.py)"

    ```python
    """中心へ向かう重力の加速度

    x 軸の上に 0〜4 の 9 点を並べ、全点の平均(x = 2)へ向かう加速度(Acc の x 成分)を出した例です。a = −Gm·(x − 2) / ((x − 2)² + Soft²)^(3/2) なので、中心から離れるほど弱くなり、中心のすぐ近くは Soft で抑えられて 0 に戻ります。
    """

    def build(ex, tox):
        pts = ex.input("gridPOP", surftype="none", sizex=4, sizey=0, cols=9, rows=1, tx=2)
        g = ex.palette(tox, pts)
        ex.out(ex.op("poptoCHOP", name="acc", pop=g.op("out1"), attribscope="Acc"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `7b28d5a98df61cfc…`
