<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/3DSphereMap/ -->

# 3DSphereMap

`Audio/Stereo` フォルダのパレットです。

## 説明

ステレオ信号を 3D の点列にする（ゴニオメーターの 3D 版）。各サンプルを、z = 区間内の位置（−1〜1）、y = √(1−z²)·L、x = √(1−y²)·√(1−z²)·R の点にする。L, R が ±1 以内なら、点は半径 1 の球の中に収まる。SOP/POP のインスタンスや線にすると、音の形が球状に描ける。

入力: in1 ステレオのオーディオ CHOP（L, R）
出力: out1 tx, ty, tz の 3 チャンネル × 入力と同じサンプル数（そのままインスタンスの位置に使える）

## ダウンロード

[3DSphereMap.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/3DSphereMap.tox) [使用例 3DSphereMapExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/3DSphereMapExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio |
| 出力 0 | CHOP | `out1` | Vector / tx、ty、tz |

## 使用例

### ステレオを球面の点列に

![ステレオを球面の点列に](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Stereo-3DSphereMap-example.svg)

付属のサンプル音声(ステレオ)を、3D の点列(x, y, z)にした例です。図はその x, y, z の値です(インスタンスや POP の位置に使います)。

ネットワーク: `in0` (audiofileinCHOP) → `3DSphereMap` (パレット) → `out1`

[3DSphereMapExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/3DSphereMapExample.toe)

??? note "手順(Audio/Stereo/3DSphereMap.example.py)"

    ```python
    """ステレオを球面の点列に

    付属のサンプル音声(ステレオ)を、3D の点列(x, y, z)にした例です。図はその x, y, z の値です(インスタンスや POP の位置に使います)。
    """

    def build(ex, tox):
        audio = ex.input("audiofileinCHOP")
        ex.palette(tox, audio)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

17 個のオペレータ。sha256: `fb387d66da9312a6…`
