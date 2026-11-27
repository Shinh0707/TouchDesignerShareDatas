<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/HoldFeedback/ -->

# HoldFeedback

`Math` フォルダのパレットです。

## 説明

in1 を Rate の間隔でサンプル＆ホールドし、in2 を初期値にしてフィードバックで回す（一定間隔で状態を進めるシミュレーションのクロック）。

入力

- in1: 次の状態
- in2: 初期状態（Reset のとき）

出力: out1 ホールドした状態（いつも in2 と同じ形。in1 の形が違うときは、同じ名前のチャンネルだけ引き継ぐ）

パラメータ

- Rate / Rateunit: 更新の速さと単位（Per Second / Per Frame）
- Timeslice: タイムスライスで扱うか
- Play: 進めるか
- Reset: オンの間、初期状態に戻す

## ダウンロード

[HoldFeedback.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/HoldFeedback.tox) [使用例 HoldFeedbackExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/HoldFeedbackExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 入力 1 | CHOP | `in2` | Any / 初期状態 |
| 出力 0 | CHOP | `out1` | Any |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Timeslice` | Timeslice | Parameter | Toggle | `True` |  |
| `Rate` | Rate | Parameter | Float | `60` | 1.0 … 120.0 |
| `Fps` | Fps | Parameter | Float | `0` | 0.0 … 1.0 |
| `Rateunit` | Rate Unit | Parameter | Menu | `1` | `0` / `1` |
| `Play` | Play | Action | Toggle | `True` |  |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 一定間隔で進めるカウンター

![一定間隔で進めるカウンター](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-HoldFeedback-example.svg)

HoldFeedback の出力に 1 を足して次の状態にし、Rate = 2(1 秒に 2 回)で進めた例です。初期状態は 0 で、0.5 秒ごとに 1 ずつ増えます。2 秒分の値を Trail CHOP で記録して、階段の形にしています。

ネットワーク: `in0` (constantCHOP: `const0name=count`, `const0value=0`) → `HoldFeedback` (パレット: `Rate=2`, `Rateunit=0`) → `plus1` (mathCHOP: `postoff=1`) → `history` (trailCHOP: `wlength=120`, `wlengthunit=samples`) → `out1`

[HoldFeedbackExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/HoldFeedbackExample.toe)

??? note "手順(Math/HoldFeedback.example.py)"

    ```python
    """一定間隔で進めるカウンター

    HoldFeedback の出力に 1 を足して次の状態にし、Rate = 2(1 秒に 2 回)で進めた例です。初期状態は 0 で、0.5 秒ごとに 1 ずつ増えます。2 秒分の値を Trail CHOP で記録して、階段の形にしています。
    """

    FRAMES = 120

    def build(ex, tox):
        init = ex.input("constantCHOP", const0name="count", const0value=0)
        hold = ex.palette(tox, None, init, Rate=2, Rateunit="0")
        nxt = ex.op("mathCHOP", name="plus1", input=hold, postoff=1)
        hold.inputConnectors[0].connect(nxt)
        ex.out(ex.op("trailCHOP", name="history", input=hold, wlength=120, wlengthunit="samples"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

8 個のオペレータ。sha256: `db8f8dc6ebc7ac84…`
