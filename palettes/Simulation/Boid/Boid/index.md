<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/Boid/ -->

# Boid

`Simulation/Boid` フォルダのパレットです。

## 説明

ボイド（群れのシミュレーション）。Points 個の点を円の上に置き、ランダムな速度を与えて、フィードバックで毎フレーム次の 4 つの力を足して動かす。鳥や魚の群れのように動く。

- 結合（Cohesion）: Neighbordist 以内の平均位置へ寄る
- 整列（Alignment）: その平均速度にそろえる
- 分離（Separation）: Separationdist より近い相手から離れる
- 原点へ戻る力（Centerpull）

入力: なし
出力: out1 POP（P, Vel。途中の力 Cohesion, Alignment, Separation, Center, lSep も残る）

パラメータ

- Points: 点の数（変えたら Reset で反映）
- Cohesion / Alignment / Separation: 3 つの力の強さ（既定 0.02 / 0.02 / 2）
- Neighbordist / Separationdist: 仲間とみなす距離、離れる距離（既定 1 / 0.203）
- Centerpull: 原点へ戻る強さ（既定 5）
- Step: 1 フレームに進む量（位置 += Vel × Step）
- Reset: 初期の円からやり直す

以前の BoidSOP は、Points 522、Alignment 0、Cohesion 0.03、Separation 0 にしたもの（結合だけで集まる動き）。

## ダウンロード

[Boid.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/Boid.tox) [使用例 BoidExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | POP | `out1` | Points / P と Vel |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Points` | Points | Parameter | Int | `2510` | 1.0 … 20000.0 |
| `Cohesion` | Cohesion | Parameter | Float | `0.02` | 0.0 … 0.2 |
| `Alignment` | Alignment | Parameter | Float | `0.02` | 0.0 … 0.2 |
| `Separation` | Separation | Parameter | Float | `2` | 0.0 … 5.0 |
| `Neighbordist` | Neighbordist | Parameter | Float | `1` | 0.0 … 3.0 |
| `Separationdist` | Separationdist | Parameter | Float | `0.203` | 0.0 … 1.0 |
| `Centerpull` | Centerpull | Parameter | Float | `5` | 0.0 … 20.0 |
| `Step` | Step | Parameter | Float | `0.05` | 0.0 … 0.5 |
| `Reset` | Reset | Parameter | Pulse | `False` |  |

## 使用例

### 群れのシミュレーション

![群れのシミュレーション](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Boid-Boid-example.png)

Boid を 300 フレーム動かして、点で描いた例です。結合・整列・分離の強さを変えると、群れのまとまり方が変わります。

ネットワーク: `Boid` (パレット) → `geo` (geometryCOMP: `rx=0.0`, `ry=0.0`) → `points` (pointspriteMAT: `pointsize=2`, `sizingmodel=const`, `colorr=1`, `colorg=0.9`, `colorb=0.6`) → `cam` (cameraCOMP: `tz=12`, `ty=0.0`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[BoidExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidExample.toe)

??? note "手順(Simulation/Boid/Boid.example.py)"

    ```python
    """群れのシミュレーション

    Boid を 300 フレーム動かして、点で描いた例です。結合・整列・分離の強さを変えると、群れのまとまり方が変わります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import render_pop  # noqa: E402

    FRAMES = 300

    def build(ex, tox):
        b = ex.palette(tox)
        render_pop(ex, b, tz=12, size=2, color=(1, 0.9, 0.6))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

14 個のオペレータ。sha256: `c275152caeb85bb5…`
