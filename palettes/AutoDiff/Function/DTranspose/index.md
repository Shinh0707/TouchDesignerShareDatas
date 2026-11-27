<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DTranspose/ -->

# DTranspose

`AutoDiff/Function` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。転置（チャンネルとサンプルを入れ替える）。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。

入力: in1 CHOP（C チャンネル × S サンプル）
出力

- out1: 転置（S チャンネル × C サンプル）
- outD1: dL/dx = dL/dy の転置

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）

## ダウンロード

[DTranspose.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DTranspose.tox) [使用例 DTransposeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DTransposeExample.toe)

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

### 転置

![転置](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Function-DTranspose-example.svg)

2 チャンネル × 8 サンプルの行列を転置した例です(8 チャンネル × 2 サンプルになります。図は y の最初のチャンネルと勾配)。

ネットワーク: `in0` (patternCHOP: `channelname=r0 r1`, `wavetype=ramp`, `length=8`, `torange=[0, 1]`) → `DTranspose` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad` (selectCHOP: `chops=outD1`) → `grad_named` (renameCHOP: `renamefrom=*`, `renameto=grad`) → `y_and_grad` (mergeCHOP) → `out1`

[DTransposeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DTransposeExample.toe)

??? note "手順(AutoDiff/Function/DTranspose.example.py)"

    ```python
    """転置

    2 チャンネル × 8 サンプルの行列を転置した例です(8 チャンネル × 2 サンプルになります。図は y の最初のチャンネルと勾配)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="r0 r1", wavetype="ramp", length=8, torange=(0, 1))
        forward_and_gradient(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

8 個のオペレータ。sha256: `ceba86285614c3cd…`
