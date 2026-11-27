<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/LoxodromeDirection/ -->

# LoxodromeDirection

`Geometry` フォルダのパレットです。

## 説明

球面上の各点で、経線と一定の角度 α をなす方向（ロクソドローム・等角航路の向き）の単位ベクトルを出す。Center を中心、Axis を極とする球面で考える。α = 0 で極へ向かう向き（経線に沿う）、α = 0.25 で緯線に沿う向き。点をこの向きに流すと、極へ向かって巻きつくらせんになる。

入力: in1 POP
出力: out1 POP（Target 属性 = 長さ 1 の接線方向ベクトル、既定 Dir）

パラメータ

- Position: 位置の属性名
- Target: 書き込む属性名（既定 Dir）
- Alpha: 経線との角度（回数。0.125 = 45°）
- Axis: 極の向き（既定 0 1 0）
- Center: 球の中心

## ダウンロード

[LoxodromeDirection.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/LoxodromeDirection.tox) [使用例 LoxodromeDirectionExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/LoxodromeDirectionExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | POP | `in1` | Points |
| 出力 0 | POP | `out1` | Points / Target（Dir）に長さ 1 の方向 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Position` | Input Position | Parameter | Str | `P` |  |
| `Target` | Target | Parameter | Str | `P` |  |
| `Alpha` | Alpha (Cycles) | Parameter | Str | `0.125` |  |
| `Axis` | Axis | Parameter | Str | `0 1 0` |  |
| `Center` | Center | Parameter | Str | `0 0 0` |  |

## 使用例

### 等角航路の向き

![等角航路の向き](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-LoxodromeDirection-example.svg)

単位球の赤道の上の 8 点に、経線と 45°(Alpha = 0.125)をなす接線方向の単位ベクトル(Dir)を出した例です。極(+y)へ向かう成分と、緯線に沿う成分が同じ大きさ(0.707)になり、どれも球の中心から外向きの成分は 0 です。

ネットワーク: `in0` (circlePOP: `connectivity=none`, `divs=8`, `beginangle=0`, `endangle=315`, `orient=zx`) → `LoxodromeDirection` (パレット) → `dir` (poptoCHOP: `pop=out1`, `attribscope=P Dir`) → `out1`

[LoxodromeDirectionExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/LoxodromeDirectionExample.toe)

??? note "手順(Geometry/LoxodromeDirection.example.py)"

    ```python
    """等角航路の向き

    単位球の赤道の上の 8 点に、経線と 45°(Alpha = 0.125)をなす接線方向の単位ベクトル(Dir)を出した例です。極(+y)へ向かう成分と、緯線に沿う成分が同じ大きさ(0.707)になり、どれも球の中心から外向きの成分は 0 です。
    """

    def build(ex, tox):
        circle = ex.input("circlePOP", connectivity="none", divs=8, beginangle=0, endangle=315, orient="zx")
        d = ex.palette(tox, circle)
        ex.out(ex.op("poptoCHOP", name="dir", pop=d.op("out1"), attribscope="P Dir"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

10 個のオペレータ。sha256: `6470626bac74e82e…`
