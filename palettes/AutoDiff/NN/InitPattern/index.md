<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/InitPattern/ -->

# InitPattern

`AutoDiff/NN` フォルダのパレットです。

## 説明

ニューラルネットの重みの初期値（乱数の行列 Chans × Samples）。Mode で初期化の方法を選ぶ: He（ReLU 向け、正規分布、分散 2/入力数）、Xavier（正規分布、分散 2/(入力数 + 出力数)）、SIREN（一様分布）、Basic Uniform（±1/入力数）、Custom（自分で範囲・平均・分散を決める）。in1 を繋ぐと、入力数（Chans）を in1 のサンプル数に合わせる。

入力: in1（任意。繋ぐと入力数とレートをそれに合わせる）
出力: out1 Chans チャンネル × Samples サンプル

パラメータ

- Mode: 初期化の方法
- Targetleakyrelu: 後ろの DLeakyReLU（He の分散を Slope で補正する）
- Targetsine: 後ろの正弦の層（SIREN の範囲を補正する）
- Custommin / Custommax / Customavg / Customvar: Custom のときの値
- Chans / Samples: 行列の大きさ（入力数 × 出力数）

## ダウンロード

[InitPattern.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/InitPattern.tox) [使用例 InitPatternExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/InitPatternExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any(省略可) |
| 出力 0 | CHOP | `out1` | Matrix |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Mode` | Init Mode | Parameter | Menu | `3` | `0` / `1` / `2` / `3` / `4` / `5` |
| `Modetype` | Mode Type | Parameter | Menu | `0` | `0` / `1` |
| `Iscustom` | Is Custom | Parameter | Toggle | `False` |  |
| `Targetleakyrelu` | Target Leaky ReLU | Parameter | COMP |  |  |
| `Hescl` | He Scale | Parameter | Float | `0` | 0.0 … 1.0 |
| `Targetsine` | Target Sine | Parameter | COMP |  |  |
| `Siscl` | SIREN Rotate Scale | Parameter | Float | `0` | 0.0 … 1.0 |
| `Custommin` | Custom Min | Parameter | Float | `-1` | -1.0 … 1.0 |
| `Custommax` | Custom Max | Parameter | Float | `1` | -1.0 … 1.0 |
| `Customavg` | Custom Average | Parameter | Float | `0` | 0.0 … 1.0 |
| `Customvar` | Custom Var | Parameter | Float | `1` | 0.0 … 1.0 |
| `Uminmax1` | Uniform Min/Max | Parameter | Float | `0` | 0.0 … 1.0 |
| `Uminmax2` | Uniform Min/Max | Parameter | Float | `0` | 0.0 … 1.0 |
| `Navgvar1` | Normal Average/Var | Parameter | Float | `0` | 0.0 … 1.0 |
| `Navgvar2` | Normal Average/Var | Parameter | Float | `0` | 0.0 … 1.0 |
| `Chans` | Channel Size | Parameter | Int | `10` | 1.0 … 100.0 |
| `Samples` | Sample Size | Parameter | Int | `10` | 1.0 … 100.0 |
| `Whw` | Width Height | Parameter | WH | `0` | 0.0 … 1.0 |
| `Whh` | Width Height | Parameter | WH | `0` | 0.0 … 1.0 |
| `Rate` | Rate | Parameter | Float | `60` | 0.0 … 120.0 |
| `R` | Rate | Parameter | Float | `0` | 0.0 … 1.0 |

## 使用例

### 重みの初期値

![重みの初期値](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-NN-InitPattern-example.svg)

4 × 64 の重みの行列を作った例です(各チャンネルが行)。Mode で He・Xavier・SIREN などの分布を選べます。

ネットワーク: `InitPattern` (パレット: `Chans=4`, `Samples=64`) → `out1`

[InitPatternExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/InitPatternExample.toe)

??? note "手順(AutoDiff/NN/InitPattern.example.py)"

    ```python
    """重みの初期値

    4 × 64 の重みの行列を作った例です(各チャンネルが行)。Mode で He・Xavier・SIREN などの分布を選べます。
    """

    def build(ex, tox):
        ex.palette(tox, Chans=4, Samples=64)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

27 個のオペレータ。sha256: `0049c2a5cba289e0…`
