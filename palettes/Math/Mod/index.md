<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Mod/ -->

# Mod

`Math` フォルダのパレットです。

## 説明

床関数の余り x − floor(x/m)·m と商 floor(x/m)。余りは常に 0〜m（負の数でも正の余り）。割る数 m は in2 の CHOP で与えるか、繋がなければ Value。

入力

- in1: 割られる数
- in2: 割る数（省略可。省略時は Value）

出力

- remainder: 余り（0〜m）
- quotient: 商

パラメータ

- Value: in2 がないときの割る数

## ダウンロード

[Mod.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Mod.tox) [使用例 ModExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/ModExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 入力 1 | CHOP | `inModValue` |  |
| 出力 0 | CHOP | `remainder` | Any |
| 出力 1 | CHOP | `quotient` | Index |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Value` | Value | Parameter | Float | `1` | 0.001 … 2.0 |

## 使用例

### 床関数の余り

![床関数の余り](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Mod-example.svg)

−3〜3 の値(x)を 1 で割った余り(y、常に 0〜1)です。商は quotient の出力に出ます。割る数は in2 か Value で与えます。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[-3, 3]`) → `Mod` (パレット: `Value=1`) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[ModExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/ModExample.toe)

??? note "手順(Math/Mod.example.py)"

    ```python
    """床関数の余り

    −3〜3 の値(x)を 1 で割った余り(y、常に 0〜1)です。商は quotient の出力に出ます。割る数は in2 か Value で与えます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(-3, 3))
        in_out(ex, tox, x, Value=1)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

10 個のオペレータ。sha256: `6ef28165aac58764…`
