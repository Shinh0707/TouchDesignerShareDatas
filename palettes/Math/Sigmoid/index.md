<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Sigmoid/ -->

# Sigmoid

`Math` フォルダのパレットです。

## 説明

シグモイド 1 / (1 + exp(−Gain·x))。0〜1 のなめらかなスイッチ（x = 0 で 0.5）。

入力: in1 CHOP
出力: out1 同じ形（0〜1）

パラメータ

- Gain: 傾き

## ダウンロード

[Sigmoid.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Sigmoid.tox) [使用例 SigmoidExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/SigmoidExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Gain` | Gain | Parameters | Float | `1` | -4.0 … 4.0 |

## 使用例

### シグモイド

![シグモイド](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Sigmoid-example.svg)

−6〜6 の値(x)を Gain=1 のシグモイドに通した例です(y、0〜1、x = 0 で 0.5)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[-6, 6]`) → `Sigmoid` (パレット: `Gain=1`) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[SigmoidExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/SigmoidExample.toe)

??? note "手順(Math/Sigmoid.example.py)"

    ```python
    """シグモイド

    −6〜6 の値(x)を Gain=1 のシグモイドに通した例です(y、0〜1、x = 0 で 0.5)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(-6, 6))
        in_out(ex, tox, x, Gain=1)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

8 個のオペレータ。sha256: `4f03273e218d4327…`
