<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/MultiChannelPreTrail/ -->

# MultiChannelPreTrail

`Audio/Stereo` フォルダのパレットです。

## 説明

タイムスライスの全サンプルを、1 サンプルずつ別のチャンネルに並べ替える（Shuffle: チャンネルとサンプルを入れ替え → 全部を分割）。N チャンネル × S サンプルが N·S チャンネル × 1 サンプルになる。Trail CHOP の前処理用（後ろの Trail CHOP で、全サンプルの履歴を取れる）。チャンネル数はタイムスライスの長さで毎フレーム変わり、数千になることもある。決まった数にしたいときは、前で Resample CHOP などを使う（この部品はしない）。

入力: in1 オーディオ CHOP（タイムスライス）
出力: out1 N·S チャンネル × 1 サンプル（チャンネル名は chan<サンプル><チャンネル>）

## ダウンロード

[MultiChannelPreTrail.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/MultiChannelPreTrail.tox) [使用例 MultiChannelPreTrailExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/MultiChannelPreTrailExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Sequence |

## 使用例

### 全サンプルを別のチャンネルに

![全サンプルを別のチャンネルに](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Stereo-MultiChannelPreTrail-example.svg)

ステレオの音(2 チャンネル × 1 フレーム分のサンプル)を、1 サンプルずつ別のチャンネルに並べ替えた例です。チャンネルの数は 2 × 1 フレームのサンプル数(44.1 kHz・60 fps で 2 × 735 = 1470)、各チャンネルは 1 サンプルになります(チャンネル名は chan<サンプル><チャンネル>)。

ネットワーク: `left` (audiooscillatorCHOP: `frequency=220`, `amp=0.5`) → `right` (audiooscillatorCHOP: `frequency=330`, `amp=0.5`) → `in0` (mergeCHOP) → `MultiChannelPreTrail` (パレット) → `out1`

[MultiChannelPreTrailExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/MultiChannelPreTrailExample.toe)

??? note "手順(Audio/Stereo/MultiChannelPreTrail.example.py)"

    ```python
    """全サンプルを別のチャンネルに

    ステレオの音(2 チャンネル × 1 フレーム分のサンプル)を、1 サンプルずつ別のチャンネルに並べ替えた例です。チャンネルの数は 2 × 1 フレームのサンプル数(44.1 kHz・60 fps で 2 × 735 = 1470)、各チャンネルは 1 サンプルになります(チャンネル名は chan<サンプル><チャンネル>)。
    """

    def build(ex, tox):
        a = ex.op("audiooscillatorCHOP", name="left", frequency=220, amp=0.5)
        b = ex.op("audiooscillatorCHOP", name="right", frequency=330, amp=0.5)
        st = ex.input("mergeCHOP", input=[a, b])
        ex.palette(tox, st)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `af075028c9eb73ef…`
