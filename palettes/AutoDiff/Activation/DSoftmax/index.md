<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Activation/DSoftmax/ -->

# DSoftmax

`AutoDiff/Activation` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。ソフトマックス y = softmax(x / Tempature)（各チャンネルのサンプルについて。和が 1）。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。

入力: in1 CHOP（何チャンネル × 何サンプルでもよい）
出力

- out1: f(x)（in1 と同じ形）
- outD1: dL/dx = y · (dL/dy − Σ y·dL/dy) ÷ Tempature

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）
- Tempature: 温度（既定 1。大きいほどなだらか）

## ダウンロード

[DSoftmax.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DSoftmax.tox) [使用例 DSoftmaxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DSoftmaxExample.toe)

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
| `Tempature` | Tempature | Parameter | Float | `1` | 0.0 … 1.0 |

## 使用例

### ソフトマックス

![ソフトマックス](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Activation-DSoftmax-example.svg)

1 チャンネル 16 サンプルの値(1 周期の正弦波 × 3)をソフトマックスに通した例です。合計が 1 の確率の列になり、大きい値ほど強調されます。Tempature を上げるとなだらかになります。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=16`, `amp=3`) → `DSoftmax` (パレット) → `p` (selectCHOP: `chops=out1`) → `p_named` (renameCHOP: `renamefrom=*`, `renameto=p`) → `out1`

[DSoftmaxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DSoftmaxExample.toe)

??? note "手順(AutoDiff/Activation/DSoftmax.example.py)"

    ```python
    """ソフトマックス

    1 チャンネル 16 サンプルの値(1 周期の正弦波 × 3)をソフトマックスに通した例です。合計が 1 の確率の列になり、大きい値ほど強調されます。Tempature を上げるとなだらかになります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import output  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="sin", length=16, amp=3)
        comp = ex.palette(tox, x)
        ex.out(output(ex, comp, "out1", "p"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

17 個のオペレータ。sha256: `b83595b27cae99a4…`
