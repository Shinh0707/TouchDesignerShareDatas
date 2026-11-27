<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Utility/FrameDelay/ -->

# FrameDelay

`Utility` フォルダのパレットです。

## 説明

入力の CHOP を Frames フレーム遅らせて出す（形・チャンネル名はそのまま）。「1 フレーム前の値」が要るときに使う（差分、時刻をそろえる、など）。

フレーム番号（absTime.frame）をキーに履歴を持つので、1 フレームに何度 cook されても、必ず「d フレーム前」になる。Feedback CHOP は、ループの外で使うと cook の順番しだいで今の値を返すことがあるため、中は Script CHOP（numpy）にした。データは小さい前提。

入力: in1 CHOP（形は自由。Time Slice はオフ）
出力: out1 Frames フレーム前の in1

パラメータ

- Frames: 遅らせるフレーム数（1〜60）
- Reset: オンの間、履歴を今の入力で埋め直す（その間は今の値を出す）

## ダウンロード

[FrameDelay.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Utility/FrameDelay.tox) [使用例 FrameDelayExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Utility/FrameDelayExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Frames` | Frames | FrameDelay | Int | `1` | 1.0 … 60.0 |
| `Reset` | Reset | FrameDelay | Toggle | `False` |  |

## 使用例

### 遅らせた値

![遅らせた値](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Utility-FrameDelay-example.svg)

時間で変わる値(now)と、それを 30 フレーム遅らせた値(delayed)を、Trail CHOP で 120 フレーム記録した例です。

ネットワーク: `in0` (lfoCHOP: `frequency=1`) → `FrameDelay` (パレット: `Frames=30`) → `now` (renameCHOP: `renamefrom=*`, `renameto=now`) → `delayed` (renameCHOP: `renamefrom=*`, `renameto=delayed`) → `both` (mergeCHOP) → `history` (trailCHOP: `wlength=120`, `wlengthunit=samples`) → `out1`

[FrameDelayExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Utility/FrameDelayExample.toe)

??? note "手順(Utility/FrameDelay.example.py)"

    ```python
    """遅らせた値

    時間で変わる値(now)と、それを 30 フレーム遅らせた値(delayed)を、Trail CHOP で 120 フレーム記録した例です。
    """

    FRAMES = 120

    def build(ex, tox):
        now = ex.input("lfoCHOP", frequency=1)
        later = ex.palette(tox, now, Frames=30)
        a = ex.op("renameCHOP", name="now", input=now, renamefrom="*", renameto="now")
        b = ex.op("renameCHOP", name="delayed", input=later, renamefrom="*", renameto="delayed")
        ex.out(ex.op("trailCHOP", name="history", input=ex.op("mergeCHOP", name="both", input=[a, b]), wlength=120,
                     wlengthunit="samples"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

8 個のオペレータ。sha256: `a3fd015ea5922a0a…`
