<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/RMSNorm/ -->

# RMSNorm

`Audio/Feature` フォルダのパレットです。

## 説明

RMS で割って大きさをそろえる（x / RMS(x)）。音量によらない波形の形を比べたいときに使う。

入力: in1 CHOP
出力: out1 同じ形（RMS が 1）

## ダウンロード

[RMSNorm.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/RMSNorm.tox) [使用例 RMSNormExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/RMSNormExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## 使用例

### 音量をそろえる

![音量をそろえる](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Feature-RMSNorm-example.svg)

振幅 0.2 の正弦波(quiet)を RMS で割って、大きさを 1 にそろえた例です(normalized、振幅は √2 ≈ 1.41)。

ネットワーク: `in0` (patternCHOP: `channelname=quiet`, `wavetype=sin`, `length=400`, `numcycles=4`, `amp=0.2`) → `RMSNorm` (パレット) → `normalized` (renameCHOP: `renamefrom=*`, `renameto=normalized`) → `before_after` (mergeCHOP) → `out1`

[RMSNormExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/RMSNormExample.toe)

??? note "手順(Audio/Feature/RMSNorm.example.py)"

    ```python
    """音量をそろえる

    振幅 0.2 の正弦波(quiet)を RMS で割って、大きさを 1 にそろえた例です(normalized、振幅は √2 ≈ 1.41)。
    """

    def build(ex, tox):
        quiet = ex.input("patternCHOP", channelname="quiet", wavetype="sin", length=400, numcycles=4, amp=0.2)
        norm = ex.palette(tox, quiet)
        named = ex.op("renameCHOP", name="normalized", input=norm, renamefrom="*", renameto="normalized")
        ex.out(ex.op("mergeCHOP", name="before_after", input=[quiet, named]))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

13 個のオペレータ。sha256: `1e55b684f9ab2863…`
