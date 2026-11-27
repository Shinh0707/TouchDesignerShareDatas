<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/SteerRGB/ -->

# SteerRGB

`Simulation/Boid` フォルダのパレットです。

## 説明

舵取りの力（Reynolds の steering）: 目標の速度 dst − 今の速度 src を、長さ Max 以下に抑えて出す。ボイドなどで「向きたい方向へ少しずつ曲がる」力に使う。

入力

- dst: 目標の速度（RGB）
- src: 今の速度（RGB）

出力: out1 力（RGB、長さ ≤ Max）

パラメータ

- Max: 力の上限

## ダウンロード

[SteerRGB.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/SteerRGB.tox) [使用例 SteerRGBExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/SteerRGBExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `dst` | Data / 目標の速度 |
| 入力 1 | TOP | `src` | Data / 今の速度 |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Max` | Max | Parameter | Float | `1` | 0.0 … 3.0 |

## 使用例

### 舵取りの力

![舵取りの力](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Boid-SteerRGB-example.png)

目標の速度 (1, 0, 0)(dst)と、色のノイズで作ったいまの速度(src、各成分 0〜1)から、舵取りの力 dst − src を長さ Max = 0.5 以下に抑えて出した例です。どの画素も力の長さは 0.5 以下で、目標から遠い速度ほど 0.5 に張りつきます(RGB を 0.5 + 力 で表示)。

ネットワーク: `in0` (constantTOP: `colorr=1`, `colorg=0`, `colorb=0`, `resolutionw=256`, `resolutionh=144`, `format=rgba32float`) → `in1` (noiseTOP: `resolutionw=256`, `resolutionh=144`, `mono=False`, `format=rgba32float`) → `SteerRGB` (パレット: `Max=0.5`) → `show` (levelTOP: `brightness1=1`, `outlow=0.5`, `outhigh=1.5`, `clampinput=unclamped`) → `out1`

[SteerRGBExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/SteerRGBExample.toe)

??? note "手順(Simulation/Boid/SteerRGB.example.py)"

    ```python
    """舵取りの力

    目標の速度 (1, 0, 0)(dst)と、色のノイズで作ったいまの速度(src、各成分 0〜1)から、舵取りの力 dst − src を長さ Max = 0.5 以下に抑えて出した例です。どの画素も力の長さは 0.5 以下で、目標から遠い速度ほど 0.5 に張りつきます(RGB を 0.5 + 力 で表示)。
    """

    def build(ex, tox):
        dst = ex.input("constantTOP", colorr=1, colorg=0, colorb=0, resolutionw=256, resolutionh=144, format="rgba32float")
        src = ex.input("noiseTOP", resolutionw=256, resolutionh=144, mono=False, format="rgba32float")
        f = ex.palette(tox, dst, src, Max=0.5)
        ex.out(ex.op("levelTOP", name="show", input=f, brightness1=1, outlow=0.5, outhigh=1.5, clampinput="unclamped"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- C. W. Reynolds (1999). [Steering Behaviors For Autonomous Characters](https://www.red3d.com/cwr/steer/). Proc. Game Developers Conference 1999, 763-782. — 舵取りの力（目標の速度 − 今の速度を、最大の力で抑える）

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

38 個のオペレータ。sha256: `f8cb91d42ce8d2ff…`
