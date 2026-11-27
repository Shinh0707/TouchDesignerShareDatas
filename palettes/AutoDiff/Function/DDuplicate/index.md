<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DDuplicate/ -->

# DDuplicate

`AutoDiff/Function` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。1 つの値を 2 か所で使うための分岐。out1・out2 に in1 をそのまま出し、逆伝播では 2 つの行き先からの勾配を足して outD1 に出す（D1 + D2）。

入力: in1 CHOP
出力

- out1, out2: in1 と同じ
- outD1: dL/dx = D1 + D2

パラメータ

- D1: out1 についての勾配の CHOP
- D2: out2 についての勾配の CHOP

## ダウンロード

[DDuplicate.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DDuplicate.tox) [使用例 DDuplicateExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DDuplicateExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |
| 出力 1 | CHOP | `out2` | Any |
| 出力 2 | CHOP | `outD1` | Any / in1 についての勾配 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `D1` | D1 | D | CHOP | `outD1` |  |
| `D2` | D2 | D | CHOP |  |  |

## 使用例

### 1 つの値を 2 か所で使う

![1 つの値を 2 か所で使う](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Function-DDuplicate-example.svg)

−2〜2 の値を 2 つに分けた例です。D1 と D2(それぞれの行き先からの勾配)に 1 を入れると、in1 への勾配は 2 つの和の 2 になります。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[-2, 2]`) → `DDuplicate` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad` (selectCHOP: `chops=outD1`) → `grad_named` (renameCHOP: `renamefrom=*`, `renameto=grad`) → `y_and_grad` (mergeCHOP) → `out1`

[DDuplicateExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DDuplicateExample.toe)

??? note "手順(AutoDiff/Function/DDuplicate.example.py)"

    ```python
    """1 つの値を 2 か所で使う

    −2〜2 の値を 2 つに分けた例です。D1 と D2(それぞれの行き先からの勾配)に 1 を入れると、in1 への勾配は 2 つの和の 2 になります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(-2, 2))
        forward_and_gradient(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

9 個のオペレータ。sha256: `3f6a6f4da6dca506…`
