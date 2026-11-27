<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Activation/DSigmoid/ -->

# DSigmoid

`AutoDiff/Activation` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。シグモイド y = 1 / (1 + e^(−Gain·x))。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。

入力: in1 CHOP（何チャンネル × 何サンプルでもよい）
出力

- out1: f(x)（in1 と同じ形）
- outD1: dL/dx = Gain · y (1 − y) · dL/dy

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）
- Gain: 傾き（既定 1）

## ダウンロード

[DSigmoid.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DSigmoid.tox) [使用例 DSigmoidExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DSigmoidExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |
| 出力 1 | CHOP | `outD1` | Any / in1 についての勾配 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `D1` | D1 | D | CHOP | `outD1` |  |
| `Gain` | Gain | Parameter | Float | `1` | 0.0 … 2.0 |

## 使用例

### シグモイドとその勾配

![シグモイドとその勾配](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Activation-DSigmoid-example.svg)

−6〜6 の値をシグモイドに通し(y)、D1 に 1 を入れて逆伝播した勾配 dy/dx(grad)を並べた例です。勾配は y(1 − y) で、0 のところで最大の 0.25 になります。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[-6, 6]`) → `DSigmoid` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad` (selectCHOP: `chops=outD1`) → `grad_named` (renameCHOP: `renamefrom=*`, `renameto=grad`) → `y_and_grad` (mergeCHOP) → `out1`

[DSigmoidExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DSigmoidExample.toe)

??? note "手順(AutoDiff/Activation/DSigmoid.example.py)"

    ```python
    """シグモイドとその勾配

    −6〜6 の値をシグモイドに通し(y)、D1 に 1 を入れて逆伝播した勾配 dy/dx(grad)を並べた例です。勾配は y(1 − y) で、0 のところで最大の 0.25 になります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(-6, 6))
        forward_and_gradient(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

16 個のオペレータ。sha256: `56f2bcc98c0a26f8…`
