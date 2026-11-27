<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/ReactionDiffusion/GrayScott/ -->

# GrayScott

`Simulation/ReactionDiffusion` フォルダのパレットです。

## 説明

Gray-Scott 反応拡散のシミュレーション。2 種類の物質 u, v が拡散しながら反応する式（∂u/∂t = Du∇²u − uv² + F(1−u)、∂v/∂t = Dv∇²v + uv² − (F+K)v）を、フィードバックで毎フレーム 1 ステップずつ進める（格子の単位で 1 ステップ = Dt）。既定の設定では、1 分ほどで中央の種から模様が育ち始める。in2 の画像で F と K を場所ごとにずらせる。

入力

- in1: 初期状態（r = u、g = v）。省略時は 512×512 の u = 1 に、中央の四角だけ v を置いたもの
- in2: 揺らぎの画像（r と g を使う）。省略時は時間で動く simplex ノイズ

出力: out1 v（模様の本体）を 2 倍した灰色の画像 512×512（32 bit float）

パラメータ

- F: 補給率（Feed）、Krate: 消失率（Kill）の倍率。K は F から計算（Krate·(√F/2 − F)）
- Durate / Dvrate: u と v の拡散の強さ（Du, Dv はここから計算）
- Wurate / Wvrate: in2 の揺らぎをどれだけ F と K に混ぜるか
- H: 格子の間隔、Dt: 1 ステップの時間（既定 1。拡散の安定のため Du は Dt に反比例して決まる）
- Reset: オンの間、初期状態に戻す

（K, Du, Dv, Wurange, Wvrange, Bthres は式で決まる内部の値）

## ダウンロード

[GrayScott.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/ReactionDiffusion/GrayScott.tox) [使用例 GrayScottExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/ReactionDiffusion/GrayScottExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data / 初期状態 r = u、g = v(省略可) |
| 入力 1 | TOP | `in2` | Data / F と K の揺らぎ（r と g）(省略可) |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `H` | h | Parameter | Float | `1` | 0.0 … 1.0 |
| `Dt` | Dt | Parameter | Float | `0.7` | 0.0 … 1.0 |
| `F` | Feed Rate | Parameter | Float | `0.03` | 0.02 … 0.06 |
| `Krate` | Kill Rate | Parameter | Float | `0.5` | 0.0 … 1.0 |
| `Durate` | Diffusion U Rate | Parameter | Float | `0.7` | 0.0 … 1.0 |
| `Dvrate` | Diffusion V Rate | Parameter | Float | `0.5` | 0.0 … 1.0 |
| `Wurate` | Wu Rate | Parameter | Float | `0.7` | 0.0 … 1.0 |
| `Wvrate` | Wv Rate | Parameter | Float | `0.7` | 0.0 … 1.0 |
| `K` | Kill Scale | Parameter | Float | `0` | 0.0 … 1.0 |
| `Du` | Diffusion U | Parameter | Float | `0` | 0.0 … 1.0 |
| `Dv` | Diffusion V | Parameter | Float | `0` | 0.0 … 1.0 |
| `Wurange1` | Wu Range | Parameter | Float | `0` | 0.0 … 1.0 |
| `Wurange2` | Wu Range | Parameter | Float | `0` | 0.0 … 1.0 |
| `Wvrange1` | Wv Range | Parameter | Float | `0` | 0.0 … 1.0 |
| `Wvrange2` | Wv Range | Parameter | Float | `0` | 0.0 … 1.0 |
| `Bthres` | Birth Threshold | Parameter | Float | `0` | 0.0 … 1.0 |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 中央の種から育つ模様

![中央の種から育つ模様](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-ReactionDiffusion-GrayScott-example.png)

入力をつながず、既定の初期状態(中央の四角に v を置いたもの)と揺らぎで 1500 フレーム動かした例です。F と Krate を変えると、斑点・迷路・サンゴのように模様が変わります。

ネットワーク: `GrayScott` (パレット) → `out1`

[GrayScottExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/ReactionDiffusion/GrayScottExample.toe)

??? note "手順(Simulation/ReactionDiffusion/GrayScott.example.py)"

    ```python
    """中央の種から育つ模様

    入力をつながず、既定の初期状態(中央の四角に v を置いたもの)と揺らぎで 1500 フレーム動かした例です。F と Krate を変えると、斑点・迷路・サンゴのように模様が変わります。
    """

    FRAMES = 1500

    def build(ex, tox):
        ex.palette(tox)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- J. E. Pearson (1993). [Complex Patterns in a Simple System](https://doi.org/10.1126/science.261.5118.189). Science 261(5118), 189-192. — Gray-Scott モデルの 2 次元の模様と、F・k による分類
- P. Gray, S. K. Scott (1984). [Autocatalytic reactions in the isothermal, continuous stirred tank reactor: Oscillations and instabilities in the system A + 2B -> 3B; B -> C](https://doi.org/10.1016/0009-2509(84)87017-7). Chemical Engineering Science 39(6), 1087-1097. — 反応の式（u + 2v -> 3v、v -> 不活性）

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

28 個のオペレータ。sha256: `c45c4a36231b51fd…`
