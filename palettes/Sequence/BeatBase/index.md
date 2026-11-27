<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Sequence/BeatBase/ -->

# BeatBase

`Sequence` フォルダのパレットです。

## 説明

ドラムのステップシーケンサーの 1 パート。時間（in1、秒）から、拍子・細分化・スウィング・ユークリッドリズムで決まるタイミングに 0/1 のゲートを出す。Ehits 個の発音を、1 小節の Beats × Steps ステップに均等に配置する（ユークリッドリズム）。

入力: in1 時間の CHOP（秒。Timer CHOP や absTime など）
出力

- beatOut: ゲート（0/1）
- noteOut: 鳴らすノート番号（Note）

パラメータ

- Beats / Beatunit: 拍子（4 / 4 など）
- Steps: 1 拍の細分化（4 で 16 分音符）
- Swing: スウィング（0.5 で均等、大きいほど裏拍が遅れる）
- Gate: 1 ステップの中で鳴らす長さの割合
- Delay / Delayunit: 遅らせる量と単位（Beats / Seconds）
- Ehits / Eoffset: 1 小節の発音数と、パターンの回転
- Note: ノート番号

（Bpm は timeline のテンポ。Tbeat, Tbar, Nsteps, Delaytime は式で決まる内部の値）

## ダウンロード

[BeatBase.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Sequence/BeatBase.tox) [使用例 BeatBaseExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Sequence/BeatBaseExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Sequence / 時間 |
| 出力 0 | CHOP | `beatOut` | Gate |
| 出力 1 | CHOP | `noteOut` | Note |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Beats` | Beats Per Bar | Parameter | Float | `4` | 1.0 … 64.0 |
| `Beatunit` | Beat Unit | Parameter | Float | `4` | 1.0 … 64.0 |
| `Steps` | Steps Per Beat | Parameter | Float | `4` | 1.0 … 64.0 |
| `Swing` | Swing | Parameter | Float | `0.5` | 0.0 … 1.0 |
| `Gate` | Gate | Parameter | Float | `0` | 0.0 … 1.0 |
| `Delay` | Delay | Parameter | Float | `0` | 0.0 … 32.0 |
| `Delayunit` | Delay Unit | Parameter | Menu | `0` | `0` / `1` |
| `Eoffset` | Euclid Offset | Parameter | Float | `0` | 0.0 … 64.0 |
| `Ehits` | Euclid Hits | Parameter | Float | `4` | 0.0 … 64.0 |
| `Bpm` | Bpm | Parameter | Float | `0` | 60.0 … 250.0 |
| `Tbeat` | Tbeat | Parameter | Float | `0` | 0.0 … 1.0 |
| `Tbar` | Tbar | Parameter | Float | `0` | 1.0 … 64.0 |
| `Nsteps` | Nsteps | Parameter | Float | `0` | 1.0 … 64.0 |
| `Delaytime` | Delay Time | Parameter | Float | `0` | 0.0 … 1.0 |
| `Note` | Note | Extra | Int | `41` | 0.0 … 127.0 |

## 使用例

### 1 小節のユークリッドリズム

![1 小節のユークリッドリズム](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Sequence-BeatBase-example.svg)

0〜2 秒の時間(120 BPM の 1 小節)を 1000 サンプルの CHOP で入れて、ゲートを 1 小節分まとめて出した例です。16 ステップに 5 つの発音(Ehits=5)を均等に置いています。
実際に使うときは、in1 に Timer CHOP や absTime の秒を入れます。

ネットワーク: `in0` (patternCHOP: `channelname=t`, `wavetype=ramp`, `length=1000`, `torange=[0, 2]`) → `BeatBase` (パレット: `Ehits=5`, `Gate=0.5`) → `out1`

[BeatBaseExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Sequence/BeatBaseExample.toe)

??? note "手順(Sequence/BeatBase.example.py)"

    ```python
    """1 小節のユークリッドリズム

    0〜2 秒の時間(120 BPM の 1 小節)を 1000 サンプルの CHOP で入れて、ゲートを 1 小節分まとめて出した例です。16 ステップに 5 つの発音(Ehits=5)を均等に置いています。
    実際に使うときは、in1 に Timer CHOP や absTime の秒を入れます。
    """

    def build(ex, tox):
        t = ex.input("patternCHOP", channelname="t", wavetype="ramp", length=1000, torange=(0, 2))
        beat = ex.palette(tox, t, Ehits=5, Gate=0.5)
        ex.out(beat)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

54 個のオペレータ。sha256: `4198f766ca55906e…`
