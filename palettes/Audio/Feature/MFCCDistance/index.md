<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/MFCCDistance/ -->

# MFCCDistance

`Audio/Feature` フォルダのパレットです。

## 説明

2 つの音の音色の違いを 1 つの数で出す（MFCC の L1 距離）。2 つの MFCC の差の絶対値を、係数について平均し、さらに直近 Window 秒のフレームについて平均する: d = mean |MFCC(a) − MFCC(b)|。0 = 同じ音色。聴取実験の評価と一番よく合った単純な指標で（相関 0.88）、波形の差（MAE, ESR）と違って位相のずれに惑わされない（Wright, Dal Santo, Schlecht "Predicting Subjective Ratings of Guitar Amplifier Emulations", JAES 74(10), 2026）。SimilarityRating に入れると 0〜100 の評価になる。

入力

- in1: 基準の MFCC（MFCC の out1）
- in2: 比べる音の MFCC（同じチャンネル数）

出力: out1 距離（1 チャンネル `distance` × 1 サンプル）。約 2.9 以下ならほぼ同じに聞こえ、10 で違いがはっきりし、30 を超えると別の音

パラメータ

- Window: 平均をとる長さ（秒）。3 秒が聴取実験のクリップの長さ。短くすると変化に速く追従する

c0（全体の大きさ）も数えるので、音量の差も距離になる。音色だけを比べたいときは、先に音量をそろえる。

## ダウンロード

[MFCCDistance.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/MFCCDistance.tox) [使用例 MFCCDistanceExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/MFCCDistanceExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Feature / 基準の MFCC, channels: any, samples: 1 |
| 入力 1 | CHOP | `in2` | Feature / 比べる音の MFCC, channels: same as in1, samples: 1 |
| 出力 0 | CHOP | `out1` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Window` | Window Seconds | Parameter | Float | `3` | 0.05 … 10.0 |

## 使用例

### 同じ音・矩形波・ノイズまでの距離

![同じ音・矩形波・ノイズまでの距離](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Feature-MFCCDistance-example.svg)

基準を 220 Hz の正弦波にして、同じ正弦波(same)、同じ高さの矩形波(square)、ホワイトノイズ(noise)までの MFCC の距離を比べた例です。同じ音なら 0、倍音が加わった矩形波で 10 を超え、ノイズはさらに離れます。

ネットワーク: `in0` (audiooscillatorCHOP: `wavetype=sin`, `frequency=220`, `amp=0.5`) → `MFCC` (パレット) → `same_sound` (audiooscillatorCHOP: `amp=0.5`, `wavetype=sin`, `frequency=220`) → `MFCC1` (パレット) → `square_sound` (audiooscillatorCHOP: `amp=0.5`, `wavetype=square`, `frequency=220`) → `MFCC2` (パレット) → `noise_sound` (audiooscillatorCHOP: `amp=0.5`, `wavetype=whitenoise`) → `MFCC3` (パレット) → `MFCCDistance` (パレット: `Window=0.5`) → `same` (renameCHOP: `renamefrom=*`, `renameto=same`) → `MFCCDistance1` (パレット: `Window=0.5`) → `square` (renameCHOP: `renamefrom=*`, `renameto=square`) → `MFCCDistance2` (パレット: `Window=0.5`) → `noise` (renameCHOP: `renamefrom=*`, `renameto=noise`) → `results` (mergeCHOP) → `out1`

[MFCCDistanceExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/MFCCDistanceExample.toe)

??? note "手順(Audio/Feature/MFCCDistance.example.py)"

    ```python
    """同じ音・矩形波・ノイズまでの距離

    基準を 220 Hz の正弦波にして、同じ正弦波(same)、同じ高さの矩形波(square)、ホワイトノイズ(noise)までの MFCC の距離を比べた例です。同じ音なら 0、倍音が加わった矩形波で 10 を超え、ノイズはさらに離れます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES, compare  # noqa: E402

    FRAMES = 120
    MFCC = PALETTES + "/Audio/Spectrum/MFCC.tox"

    def build(ex, tox):
        sine = ex.input("audiooscillatorCHOP", wavetype="sin", frequency=220, amp=0.5)
        ref = ex.palette(MFCC, sine)
        cases = []
        for label, pars in (("same", {"wavetype": "sin", "frequency": 220}),
                            ("square", {"wavetype": "square", "frequency": 220}),
                            ("noise", {"wavetype": "whitenoise"})):
            sound = ex.op("audiooscillatorCHOP", name=label + "_sound", amp=0.5, **pars)
            cases.append((label, [ref, ex.palette(MFCC, sound)]))
        compare(ex, tox, cases, Window=0.5)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- A. Wright, G. Dal Santo, S. J. Schlecht (2026). [Predicting Subjective Ratings of Guitar Amplifier Emulations](https://doi.org/10.17743/jaes.2026.0304). J. Audio Eng. Soc. 74(10), 762-772. — MFCC の L1 距離が聴取評価によく合うこと（式 8、図 7）
- A. Wright. [amp-emulation-metrics（論文のコードとデモ）](https://github.com/Alec-Wright/amp-emulation-metrics). — 距離の実装（差の絶対値を全係数・全フレームで平均）

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

10 個のオペレータ。sha256: `41e4e4a156be3b55…`
