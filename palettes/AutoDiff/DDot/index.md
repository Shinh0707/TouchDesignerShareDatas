<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DDot/ -->

# DDot

`AutoDiff` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。行列の積 Y = A · B（チャンネルが行、サンプルが列）。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1・in2 についての勾配を outD1・outD2 に出す（逆伝播）。

出力のチャンネル数がサンプル数より多いときは、中で転置した積を計算してから戻す（結果は同じで、チャンネルが多いときに速い）。

入力

- in1: in1 行列 A（M チャンネル × K サンプル）
- in2: in2 行列 B（K チャンネル × N サンプル）

出力

- out1: f(a, b)
- outD1: dL/da = dL/dY · Bᵀ
- outD2: dL/db = Aᵀ · dL/dY

パラメータ

- D1: out1 についての勾配の CHOP
- Transpose0 / Transpose1: A・B を転置してから掛ける

## ダウンロード

[DDot.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DDot.tox) [使用例 DDotExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DDotExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 入力 1 | CHOP | `in2` | Any |
| 出力 0 | CHOP | `out1` | Any |
| 出力 1 | CHOP | `outD1` | Any / in1 についての勾配 |
| 出力 2 | CHOP | `outD2` | Any / in2 についての勾配 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `D1` | D1 | D | CHOP | `outD1` |  |
| `Transpose0` | Transpose1 | Parameter | Toggle | `False` |  |
| `Transpose1` | Transpose2 | Parameter | Toggle | `False` |  |

## 使用例

### 行列の積とその勾配

![行列の積とその勾配](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-DDot-example.svg)

3 × 4 と 4 × 2 の行列(各チャンネルが行)の積(3 × 2、y)と、D1 に 1 を入れたときの勾配を並べた例です。行列の形は「1 つ目のサンプル数 = 2 つ目のチャンネル数」にそろえます(合わないとエラーになります)。

ネットワーク: `in0` (patternCHOP: `channelname=a[0-2]`, `wavetype=ramp`, `length=4`, `torange=[-1, 1]`) → `in1` (patternCHOP: `channelname=b[0-3]`, `wavetype=sin`, `length=2`, `numcycles=0.5`) → `DDot` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad_a` (selectCHOP: `chops=outD1`) → `grad_a_named` (renameCHOP: `renamefrom=*`, `renameto=grad_a`) → `grad_b` (selectCHOP: `chops=outD2`) → `grad_b_named` (renameCHOP: `renamefrom=*`, `renameto=grad_b`) → `y_and_grad` (mergeCHOP) → `out1`

[DDotExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DDotExample.toe)

??? note "手順(AutoDiff/DDot.example.py)"

    ```python
    """行列の積とその勾配

    3 × 4 と 4 × 2 の行列(各チャンネルが行)の積(3 × 2、y)と、D1 に 1 を入れたときの勾配を並べた例です。行列の形は「1 つ目のサンプル数 = 2 つ目のチャンネル数」にそろえます(合わないとエラーになります)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        a = ex.input("patternCHOP", channelname="a[0-2]", wavetype="ramp", length=4, torange=(-1, 1))
        b = ex.input("patternCHOP", channelname="b[0-3]", wavetype="sin", length=2, numcycles=0.5)
        forward_and_gradient(ex, tox, a, b)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

23 個のオペレータ。sha256: `99de8a312676d079…`
