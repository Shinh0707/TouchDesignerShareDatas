<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/BoidOut/ -->

# BoidOut

`Simulation/Boid` フォルダのパレットです。

## 説明

CHOP の位置・速度から、BoidSimulationStep をフィードバックで回して、ボイドの位置を CHOP（x, y, z）で出す。Reset がオンの間と、ボイドの数（入力の長さ）が変わったときに、その時の入力から始め直す（入力を読むのはそのときだけ）。

入力

- positions: 位置の CHOP（x, y, z × N サンプル）
- speeds: 速度の CHOP

出力: out1 位置（x, y, z × N サンプル）

パラメータ

- Sepdist / Alidist / Cohdist: 分離・整列・結合の距離
- Active: 動かすか
- Reset: オンの間、入力の位置・速度に戻す

## ダウンロード

[BoidOut.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidOut.tox) [使用例 BoidOutExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidOutExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `positions` | Vector |
| 入力 1 | CHOP | `speeds` | Vector |
| 出力 0 | CHOP | `out1` | Vector |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Sepdist` | SeparationDistance | Parameter | Float | `0` | 0.0 … 1.0 |
| `Alidist` | AlignmentDistance | Parameter | Float | `0` | 0.0 … 1.0 |
| `Cohdist` | CohesionDistance | Parameter | Float | `0` | 0.0 … 1.0 |
| `Active` | Active | Action | Toggle | `False` |  |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### CHOP で使うボイド

![CHOP で使うボイド](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Boid-BoidOut-example.png)

ランダムな位置(−1〜1 の立方体)と速度の 64 匹のボイドを、BoidOut で 2 秒動かして、点で描いた例です。

ネットワーク: `in0` (patternCHOP: `channelname=x y z`, `wavetype=random`, `length=64`, `amp=2`, `offset=-1`) → `in1` (patternCHOP: `channelname=x y z`, `wavetype=random`, `length=64`, `amp=0.2`, `offset=-0.1`, `seed=7`) → `BoidOut` (パレット) → `points` (choptoPOP: `chop=out1`, `surftype=points`, `attrscope=P`, `chanscope=x y z`) → `geo` (geometryCOMP: `rx=0.0`, `ry=0.0`) → `points1` (pointspriteMAT: `pointsize=4`, `sizingmodel=const`, `colorr=1`, `colorg=0.8`, `colorb=0.3`) → `cam` (cameraCOMP: `tz=14`, `ty=0.0`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[BoidOutExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidOutExample.toe)

??? note "手順(Simulation/Boid/BoidOut.example.py)"

    ```python
    """CHOP で使うボイド

    ランダムな位置(−1〜1 の立方体)と速度の 64 匹のボイドを、BoidOut で 2 秒動かして、点で描いた例です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import render_pop  # noqa: E402

    FRAMES = 120

    def build(ex, tox):
        pos = ex.input("patternCHOP", channelname="x y z", wavetype="random", length=64, amp=2, offset=-1)
        vel = ex.input("patternCHOP", channelname="x y z", wavetype="random", length=64, amp=0.2, offset=-0.1, seed=7)
        b = ex.palette(tox, pos, vel)
        pts = ex.op("choptoPOP", name="points", chop=b.op("out1"), surftype="points", attrscope="P",
                    chanscope="x y z")
        render_pop(ex, pts, tz=14, size=4, color=(1, 0.8, 0.3))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

98 個のオペレータ。sha256: `dfd31611d8d30d4c…`
