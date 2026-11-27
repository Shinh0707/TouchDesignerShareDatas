<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Sequence/ValueToTrigger/ -->

# ValueToTrigger

`Sequence` フォルダのパレットです。

## 説明

値を Bins 個のビン（Min〜Max を等間隔に分けた点）のうち、いちばん近いもののワンホットにする。値をノートやボタンの番号に振り分けるのに使う。

入力: in1 CHOP（1 サンプル）
出力: out1 Bins サンプルのワンホット（0/1）

パラメータ

- Bins: ビンの数
- Min / Max: 範囲

## ダウンロード

[ValueToTrigger.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Sequence/ValueToTrigger.tox) [使用例 ValueToTriggerExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Sequence/ValueToTriggerExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Feature |
| 出力 0 | CHOP | `out1` | Trigger |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Bins` | Bins | Parameter | Int | `20` | 1.0 … 200.0 |
| `Min` | Min | Parameter | Float | `0` | 0.0 … 1.0 |
| `Max` | Max | Parameter | Float | `1` | 0.0 … 1.0 |

## 使用例

### 値をボタンの番号に

![値をボタンの番号に](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Sequence-ValueToTrigger-example.svg)

0.37 を、0〜1 を 20 個に分けたビンのいちばん近いもののワンホットにした例です。

ネットワーク: `in0` (constantCHOP: `name0=v`, `value0=0.37`) → `ValueToTrigger` (パレット: `Bins=20`) → `out1`

[ValueToTriggerExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Sequence/ValueToTriggerExample.toe)

??? note "手順(Sequence/ValueToTrigger.example.py)"

    ```python
    """値をボタンの番号に

    0.37 を、0〜1 を 20 個に分けたビンのいちばん近いもののワンホットにした例です。
    """

    def build(ex, tox):
        v = ex.input("constantCHOP", name0="v", value0=0.37)
        ex.palette(tox, v, Bins=20)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

11 個のオペレータ。sha256: `8713d7d1f8919dc6…`
