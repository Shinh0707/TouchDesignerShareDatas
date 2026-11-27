<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/GalaxyBase/ -->

# GalaxyBase

`Simulation/Galaxy` フォルダのパレットです。

## 説明

銀河の初期状態の点群。中心のバルジ（球状、全体の Bulgerate の割合）と、ThinDisk で作る円盤から成る。円盤の点には、中心の重力とつり合う回転速度（SoftenCenterGravityVel）を与える。各点に初期質量関数（べき乗 −Mexps、Mmin〜Mmax）で質量を振り、主系列星の表面温度の目安 T ≈ 5772 K × 質量^0.5（太陽 = 5772 K）から黒体の色を付ける（色はパレットの PlanckianLocus を共有して読む）。重い星ほど青白く、軽い星ほど赤い。SpeedUpdate と組み合わせてフィードバックで動かす前提の初期値。

入力: なし
出力: out1 POP（P, Vel, Mass, Color, Tindex。Points 個）

パラメータ

- Points / Bulgerate / Bulgesize: 全体の点数、バルジの割合と大きさ（円盤の大きさは Bulgesize × 3）
- Gm / Soft: 回転速度を決める重力の強さと、近づきすぎを和らげる距離
- Mmin / Mmax / Mexps: 質量の範囲と、分布のべき（2.35 = サルピーターの初期質量関数）

（Disksize, Bulgepoints, Diskpoints, Mexp, Mdexp, Mrange は式で決まる内部の値）

## ダウンロード

[GalaxyBase.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/GalaxyBase.tox) [使用例 GalaxyBaseExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/GalaxyBaseExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | POP | `out1` | Points / P、Vel、Mass、Color |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Gm` | Gravity Scale | Parameter | Float | `5` | 0.0 … 20.0 |
| `Soft` | Softening Length | Parameter | Float | `0.1` | 0.0001 … 1.0 |
| `Points` | Total Points | Parameter | Int | `4000` | 0.0 … 10000.0 |
| `Bulgerate` | Bulge Rate | Parameter | Float | `0.5` | 0.0 … 1.0 |
| `Bulgesize` | Bulge Size | Parameter | Float | `1` | 0.0001 … 5.0 |
| `Disksize` | Disk Size | Parameter | Float | `0.0001` | 0.0001 … 20.0 |
| `Bulgepoints` | Bulge Points | Parameter | Int | `0` | 0.0 … 1.0 |
| `Diskpoints` | Disk Points | Parameter | Int | `0` | 0.0 … 1.0 |
| `Mmin` | Mass Min | Parameter | Float | `0.1` | 0.0 … 20.0 |
| `Mmax` | Mass Max | Parameter | Float | `20` | 0.0 … 40.0 |
| `Mexps` | Mass Exponent Scale | Parameter | Float | `2.35` | 0.9999 … 5.0 |
| `Mexp` | Mass Exponent | Parameter | Float | `0` | 0.0 … 1.0 |
| `Mdexp` | Mass Distribution Exponent | Parameter | Float | `0` | 0.0 … 1.0 |
| `Mrange1` | Mass Range | Parameter | Float | `0` | 0.0 … 1.0 |
| `Mrange2` | Mass Range | Parameter | Float | `0` | 0.0 … 1.0 |

## 使用例

### 銀河の初期状態を斜めから見る

![銀河の初期状態を斜めから見る](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Galaxy-GalaxyBase-example.png)

GalaxyBase の点群を、斜め上から点で描いた例です。重い星ほど青白く、軽い星ほど赤く色が付いています。
SpeedUpdate と組み合わせてフィードバックで動かすと、円盤が回り始めます。

ネットワーク: `GalaxyBase` (パレット: `Points=8000`) → `geo` (geometryCOMP: `rx=60`, `ry=0.0`) → `points` (pointspriteMAT: `pointsize=2`, `sizingmodel=const`) → `cam` (cameraCOMP: `tz=9`, `ty=0.0`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[GalaxyBaseExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/GalaxyBaseExample.toe)

??? note "手順(Simulation/Galaxy/GalaxyBase.example.py)"

    ```python
    """銀河の初期状態を斜めから見る

    GalaxyBase の点群を、斜め上から点で描いた例です。重い星ほど青白く、軽い星ほど赤く色が付いています。
    SpeedUpdate と組み合わせてフィードバックで動かすと、円盤が回り始めます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import render_pop  # noqa: E402

    def build(ex, tox):
        g = ex.palette(tox, Points=8000)
        render_pop(ex, g, tz=9, rx=60, size=2)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

30 個のオペレータ。sha256: `fbf9b8360fa1f676…`
