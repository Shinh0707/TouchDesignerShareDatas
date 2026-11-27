<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DLn/ -->

# DLn

`AutoDiff/Function` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。自然対数 y = ln x。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。 x は正の値にする。

入力: in1 CHOP（何チャンネル × 何サンプルでもよい）
出力

- out1: f(x)（in1 と同じ形）
- outD1: dL/dx = dL/dy ÷ x

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）

## ダウンロード

[DLn.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DLn.tox) [使用例 DLnExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DLnExample.toe)

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

## 使用例

### 自然対数とその勾配

![自然対数とその勾配](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Function-DLn-example.svg)

0.1〜4 の値の ln x(y)と、D1 に 1 を入れて逆伝播した勾配(grad = 1/x)を並べた例です。入力は正の値にします(0 以下は定義域の外でエラーになります)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[0.1, 4]`) → `DLn` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad` (selectCHOP: `chops=outD1`) → `grad_named` (renameCHOP: `renamefrom=*`, `renameto=grad`) → `y_and_grad` (mergeCHOP) → `out1`

[DLnExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DLnExample.toe)

??? note "手順(AutoDiff/Function/DLn.example.py)"

    ```python
    """自然対数とその勾配

    0.1〜4 の値の ln x(y)と、D1 に 1 を入れて逆伝播した勾配(grad = 1/x)を並べた例です。入力は正の値にします(0 以下は定義域の外でエラーになります)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(0.1, 4))
        forward_and_gradient(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

8 個のオペレータ。sha256: `f5c571697a2fbb5f…`
