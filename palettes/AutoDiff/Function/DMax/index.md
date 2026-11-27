<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DMax/ -->

# DMax

`AutoDiff/Function` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。各チャンネルのサンプルの最大値 y = max(x)。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。

入力: in1 CHOP（何チャンネル × 何サンプルでもよい）
出力

- out1: チャンネルごとの最大値（1 サンプル）
- outD1: dL/dx = 最大のサンプルだけに dL/dy を流す（mask = exp(Tempature · (x − max))、最大で 1、それ以外はほぼ 0）

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）
- Tempature: マスクの鋭さ（既定 1000。大きいほど最大値だけになる）

## ダウンロード

[DMax.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DMax.tox) [使用例 DMaxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DMaxExample.toe)

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
| `Tempature` | Tempature | Parameter | Float | `10` | 1.0 … 100.0 |
| `D1` | D1 | D | CHOP | `outD1` |  |

## 使用例

### なめらかな最大値とその勾配

![なめらかな最大値とその勾配](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Function-DMax-example.svg)

正弦波 32 サンプルの最大値(y、1 つの値)と、D1 に 1 を入れて逆伝播した勾配(grad)を並べた例です。勾配は最大のサンプルのまわりに集まります(Tempature が大きいほど鋭く)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=32`, `numcycles=1`, `amp=1`) → `DMax` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad` (selectCHOP: `chops=outD1`) → `grad_named` (renameCHOP: `renamefrom=*`, `renameto=grad`) → `y_and_grad` (mergeCHOP) → `out1`

[DMaxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DMaxExample.toe)

??? note "手順(AutoDiff/Function/DMax.example.py)"

    ```python
    """なめらかな最大値とその勾配

    正弦波 32 サンプルの最大値(y、1 つの値)と、D1 に 1 を入れて逆伝播した勾配(grad)を並べた例です。勾配は最大のサンプルのまわりに集まります(Tempature が大きいほど鋭く)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="sin", length=32, numcycles=1, amp=1)
        forward_and_gradient(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

10 個のオペレータ。sha256: `dc88c87ddd375924…`
