<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PanAngle/ -->

# PanAngle

`Audio/Stereo` フォルダのパレットです。

## 説明

ステレオ信号の定位（左右どちらに寄っているか）を −1〜1 で出す。左右の RMS の角度 atan2(L, R)（0° = 右だけ、45° = 中央、90° = 左だけ）を −1（左だけ）〜 0（中央）〜 +1（右だけ）に直したもの（定パワーのパン則に対応）。位相は見ないので、逆相でも 0。無音は 0。

入力: in1 ステレオのオーディオ CHOP（1 番目 = L、2 番目 = R のチャンネルを使う）
出力: out1 1 サンプル: −1（左）〜 +1（右）

## ダウンロード

[PanAngle.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PanAngle.tox) [使用例 PanAngleExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PanAngleExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio / 1 番目 = L、2 番目 = R |
| 出力 0 | CHOP | `out1` | Feature / −1 = 左だけ、0 = 中央、+1 = 右だけ |

## 使用例

### 音の定位

![音の定位](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Stereo-PanAngle-example.svg)

左を音量 1、右を音量 0.3 にしたステレオの正弦波の定位を −1〜1 で出した例です。左に寄っているので負の値になります。

ネットワーク: `left` (patternCHOP: `channelname=l`, `wavetype=sin`, `length=2000`, `numcycles=20`) → `right` (patternCHOP: `channelname=r`, `wavetype=sin`, `length=2000`, `numcycles=20`, `amp=0.3`) → `in0` (mergeCHOP) → `PanAngle` (パレット) → `out1`

[PanAngleExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PanAngleExample.toe)

??? note "手順(Audio/Stereo/PanAngle.example.py)"

    ```python
    """音の定位

    左を音量 1、右を音量 0.3 にしたステレオの正弦波の定位を −1〜1 で出した例です。左に寄っているので負の値になります。
    """

    def build(ex, tox):
        left = ex.op("patternCHOP", name="left", channelname="l", wavetype="sin", length=2000, numcycles=20)
        right = ex.op("patternCHOP", name="right", channelname="r", wavetype="sin", length=2000, numcycles=20, amp=0.3)
        st = ex.input("mergeCHOP", input=[left, right])
        ex.palette(tox, st)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

12 個のオペレータ。sha256: `d03603c1e6541d9b…`
