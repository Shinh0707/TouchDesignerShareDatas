<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/PerceptualSimilarity/ -->

# PerceptualSimilarity

`Audio/Feature` フォルダのパレットです。

## 説明

2 つの音が、聴いてどれだけ似ているかを 0〜100 で出す（知覚類似度）。100 = 聞き分けられない、70 未満 = はっきり違う、30 前後 = 別の音。基準の音（in1）と比べる音（in2）をそれぞれ MFCC にし、その L1 距離（MFCCDistance、直近 Window 秒の平均）を、聴取実験に合わせた折れ線（SimilarityRating）で評価の予測に変換する。元の音とエフェクトをかけた音を入れれば、エフェクトが「聴感でどれだけ音を変えたか」になる。

Wright, Dal Santo, Schlecht "Predicting Subjective Ratings of Guitar Amplifier Emulations"（JAES 74(10), 2026）の方法。波形の差（MAE, ESR）は聴感とほとんど合わず、MFCC の距離がよく合う（相関 0.88）。位相がずれただけの音は 100 のままになる。

入力

- in1: 基準のオーディオ CHOP（タイムスライス）
- in2: 比べるオーディオ CHOP（タイムスライス、同じサンプルレート）

出力

- out1: 3 チャンネル × 1 サンプル: `rating`（評価の予測 0〜100）、`low` / `high`（評価 ± Bound）
- out2: MFCC の距離（`distance`。0 = 同じ、約 2.9 までは評価 100）

パラメータ

- Window: 平均をとる長さ（秒）。3 秒が聴取実験のクリップの長さ。短くすると変化に速く追従する
- Bound: low / high の幅。10 で聴取実験の中央値の 65 %、20 で 90 % が入った

音量の差も違いに数える（同じ音でも 12 dB 下げると 74 前後になる）。音色だけを比べたいときは、先に音量をそろえる。モデルはギターアンプ・歪みエフェクトの聴取実験（44.1 kHz、3 秒のクリップ）に合わせたものなので、ほかの音では違いの大きさの目安として使う。リバーブやディレイのような時間のエフェクトは検証されていない。

## ダウンロード

[PerceptualSimilarity.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/PerceptualSimilarity.tox) [使用例 PerceptualSimilarityExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/PerceptualSimilarityExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` |  |
| 入力 1 | CHOP | `in2` |  |
| 出力 0 | CHOP | `out1` |  |
| 出力 1 | CHOP | `out2` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Window` | Window Seconds | Parameter | Float | `3` | 0.05 … 10.0 |
| `Bound` | Bound B | Parameter | Float | `10` | 0.0 … 40.0 |

## 使用例

### 正弦波に、同じ音・矩形波・ノイズはどれだけ似ているか

![正弦波に、同じ音・矩形波・ノイズはどれだけ似ているか](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Feature-PerceptualSimilarity-example.svg)

基準(in1)を 220 Hz の正弦波にして、比べる音(in2)を同じ正弦波(same)、同じ高さの矩形波(square)、ホワイトノイズ(noise)にしたときの評価(rating)です。同じ音は 100、倍音が加わって音色がはっきり違う矩形波は 70 を下回り、ノイズはさらに低くなります。

ネットワーク: `in0` (audiooscillatorCHOP: `wavetype=sin`, `frequency=220`, `amp=0.5`) → `same_sound` (audiooscillatorCHOP: `amp=0.5`, `wavetype=sin`, `frequency=220`) → `PerceptualSimilarity` (パレット: `Window=0.5`) → `same_rating` (selectCHOP: `channames=rating`) → `same` (renameCHOP: `renamefrom=*`, `renameto=same`) → `square_sound` (audiooscillatorCHOP: `amp=0.5`, `wavetype=square`, `frequency=220`) → `PerceptualSimilarity1` (パレット: `Window=0.5`) → `square_rating` (selectCHOP: `channames=rating`) → `square` (renameCHOP: `renamefrom=*`, `renameto=square`) → `noise_sound` (audiooscillatorCHOP: `amp=0.5`, `wavetype=whitenoise`) → `PerceptualSimilarity2` (パレット: `Window=0.5`) → `noise_rating` (selectCHOP: `channames=rating`) → `noise` (renameCHOP: `renamefrom=*`, `renameto=noise`) → `results` (mergeCHOP) → `out1`

[PerceptualSimilarityExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/PerceptualSimilarityExample.toe)

??? note "手順(Audio/Feature/PerceptualSimilarity.example.py)"

    ```python
    """正弦波に、同じ音・矩形波・ノイズはどれだけ似ているか

    基準(in1)を 220 Hz の正弦波にして、比べる音(in2)を同じ正弦波(same)、同じ高さの矩形波(square)、ホワイトノイズ(noise)にしたときの評価(rating)です。同じ音は 100、倍音が加わって音色がはっきり違う矩形波は 70 を下回り、ノイズはさらに低くなります。
    """
    FRAMES = 120

    def build(ex, tox):
        sine = ex.input("audiooscillatorCHOP", wavetype="sin", frequency=220, amp=0.5)
        named = []
        for label, pars in (("same", {"wavetype": "sin", "frequency": 220}),
                            ("square", {"wavetype": "square", "frequency": 220}),
                            ("noise", {"wavetype": "whitenoise"})):
            sound = ex.op("audiooscillatorCHOP", name=label + "_sound", amp=0.5, **pars)
            comp = ex.palette(tox, sine, sound, Window=0.5)
            rating = ex.op("selectCHOP", name=label + "_rating", input=comp, channames="rating")
            named.append(ex.op("renameCHOP", name=label, input=rating, renamefrom="*", renameto=label))
        ex.out(ex.op("mergeCHOP", name="results", input=named))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

## 出典・参考

- A. Wright, G. Dal Santo, S. J. Schlecht (2026). [Predicting Subjective Ratings of Guitar Amplifier Emulations](https://doi.org/10.17743/jaes.2026.0304). J. Audio Eng. Soc. 74(10), 762-772. — 方法の全体（MFCC の L1 距離 → 折れ線で評価を予測）と定数
- A. Wright. [amp-emulation-metrics（論文のコードとデモ）](https://github.com/Alec-Wright/amp-emulation-metrics). — 距離と評価の予測の実装
- B. McFee, C. Raffel, D. Liang, D. P. W. Ellis, M. McVicar, E. Battenberg, O. Nieto (2015). [librosa: Audio and Music Signal Analysis in Python](https://doi.org/10.25080/Majora-7b98e3ed-003). Proc. 14th Python in Science Conference, 18-25. — MFCC の計算方法と既定値（librosa.feature.mfcc と同じ値になるようにしてある）

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

98 個のオペレータ。sha256: `20ee9aeaaeaba3e1…`
