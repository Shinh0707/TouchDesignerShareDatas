<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNLinear/ -->

# NNLinear

`AutoDiff/NN` フォルダのパレットです。

## 説明

学習する全結合層 y = x · W + b。重み W（入力のサンプル数 × Outsize）は He の初期化、バイアス b は 0 から始め、D1 に入れた勾配で毎フレーム AdamW で更新する。in1 についての勾配を outD1 に出すので、層を重ねて逆伝播できる。

入力: in1 CHOP（C チャンネル × 入力サイズのサンプル。各チャンネルが 1 つのデータ）
出力

- out1: C チャンネル × Outsize サンプル
- outD1: in1 についての勾配
- outvis1: 今の重み W（入力サイズ チャンネル × Outsize サンプル。見るため）

パラメータ

- Outsize: 出力のサイズ
- Bias: バイアスを使うか
- Lr / Lambda: AdamW の学習率と重み減衰（バイアスの学習率は Lr × 0.01）
- D1: out1 についての勾配の CHOP
- Reset: オンの間、重みを初期化し直す

入力の大きさや Outsize を変えると、重みとバイアスは形の合う初期値から自動でやり直す（Reset は要らない）。

## ダウンロード

[NNLinear.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNLinear.tox) [使用例 NNLinearExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNLinearExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix |
| 出力 0 | CHOP | `out1` | Matrix |
| 出力 1 | CHOP | `outD1` | Matrix / in1 についての勾配 |
| 出力 2 | CHOP | `outvis1` | Matrix / 重み |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Outsize` | Outsize | Parameter | Int | `3` | 1.0 … 30.0 |
| `Bias` | Bias | Parameter | Toggle | `True` |  |
| `Lr` | Learning Rate | Parameter | Float | `0.001` | 0.0 … 1.0 |
| `Lambda` | Lambda | Parameter | Float | `0.01` | 0.0 … 1.0 |
| `D1` | D1 | D | CHOP | `outD1` |  |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 直線を学習する

![直線を学習する](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-NN-NNLinear-example.svg)

32 個のデータ(x、各チャンネルが 1 つのデータ)から y = 2x を当てるように、NNLinear(Outsize=1)と NNL2Loss で 600 フレーム学習した例です。NNL2Loss の outD1 を NNLinear の D1 に指すと、毎フレーム AdamW で重みが更新されます。図は正解(target)と推定(estimated)です。バイアスの学習率は Lr の 1/100 なので、y = 2x − 0.5 のようにずれのある直線は、傾きより時間をかけて合っていきます。

ネットワーク: `xs` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=32`, `torange=[-1, 1]`) → `in0` (shuffleCHOP: `method=swap`) → `ys` (mathCHOP: `gain=2`) → `target_data` (shuffleCHOP: `method=swap`) → `L` (パレット: `Outsize=1`, `Lr=0.02`) → `NNL2Loss` (パレット) → `target_curve` (shuffleCHOP: `method=swap`) → `target` (renameCHOP: `renamefrom=*`, `renameto=target`) → `estimated_curve` (shuffleCHOP: `method=swap`) → `estimated` (renameCHOP: `renamefrom=*`, `renameto=estimated`) → `curves` (mergeCHOP) → `out1`

[NNLinearExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNLinearExample.toe)

??? note "手順(AutoDiff/NN/NNLinear.example.py)"

    ```python
    """直線を学習する

    32 個のデータ(x、各チャンネルが 1 つのデータ)から y = 2x を当てるように、NNLinear(Outsize=1)と NNL2Loss で 600 フレーム学習した例です。NNL2Loss の outD1 を NNLinear の D1 に指すと、毎フレーム AdamW で重みが更新されます。図は正解(target)と推定(estimated)です。バイアスの学習率は Lr の 1/100 なので、y = 2x − 0.5 のようにずれのある直線は、傾きより時間をかけて合っていきます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES, curves  # noqa: E402

    FRAMES = 600

    def build(ex, tox):
        xs = ex.op("patternCHOP", name="xs", channelname="x", wavetype="ramp", length=32, torange=(-1, 1))
        x = ex.input("shuffleCHOP", input=xs, method="swap")  # 32 channels x 1 sample: one datum each
        target = ex.op("shuffleCHOP", name="target_data", input=ex.op("mathCHOP", name="ys", input=xs, gain=2),
                       method="swap")
        lin = ex.palette(tox, x, Outsize=1, Lr=0.02)
        loss = ex.palette(PALETTES + "/AutoDiff/NN/NNL2Loss.tox", target, lin)
        lin.par.D1 = loss.op("outD1").path
        curves(ex, [("target", target), ("estimated", lin)])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

139 個のオペレータ。sha256: `cf0333f2deee6858…`
