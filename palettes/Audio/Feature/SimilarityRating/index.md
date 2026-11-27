<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/SimilarityRating/ -->

# SimilarityRating

`Audio/Feature` フォルダのパレットです。

## 説明

MFCC の距離を、聴取実験（MUSHRA）の評価の予測 0〜100 に変換する。100 = 基準と聞き分けられない、70 未満 = はっきり違う、30 前後 = 別の音。log10(距離) が Knee 以下なら 100、超えたら 100 + Slope·(log10 d − Knee) の折れ線で、0〜100 に収める。既定値は Wright, Dal Santo, Schlecht "Predicting Subjective Ratings of Guitar Amplifier Emulations"（JAES 74(10), 2026）が聴取者 23 人・150 音の評価の中央値に合わせた値（Slope −69.4、Knee 0.464、相関 0.88、平均誤差 9 点）。

入力: in1 距離（MFCCDistance の out1。チャンネルは 1 つ）
出力: out1 3 チャンネル × 1 サンプル: `rating`（評価の予測）、`low` / `high`（評価 ± Bound。聴取者の中央値のばらつきの幅）

パラメータ

- Slope: 距離が 10 倍になるごとに下がる点数（m）
- Knee: 評価が 100 のままでいる log10(距離) の上限（d0。距離でいうと約 2.9）
- Bound: low / high の幅（B）。10 で聴取実験の中央値の 65 %、20 で 90 % が入った

モデルはギターアンプ・歪みエフェクトのエミュレーション（3 秒のクリップ）の聴取実験に合わせたもの。ほかの音では、同じ基準に対する違いの大きさの目安として使う。リバーブやディレイのような時間のエフェクトは検証されていない。

## ダウンロード

[SimilarityRating.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/SimilarityRating.tox) [使用例 SimilarityRatingExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/SimilarityRatingExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Feature / MFCCDistance の距離, channels: 1, samples: 1, accept: [0, 1000] |
| 出力 0 | CHOP | `out1` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Slope` | Slope m | Parameter | Float | `-69.4` | -200.0 … 0.0 |
| `Knee` | Knee d0 | Parameter | Float | `0.464` | -1.0 … 2.0 |
| `Bound` | Bound B | Parameter | Float | `10` | 0.0 … 40.0 |

## 使用例

### 距離と評価の関係

![距離と評価の関係](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Feature-SimilarityRating-example.svg)

MFCC の距離を 1 から 100 まで(横軸は対数)動かしたときの評価です。距離が約 2.9 までは 100 のままで、そこから距離が 10 倍になるごとに 69.4 点ずつ下がり、80 付近で 0 になります。low / high は評価の ±10 です。

ネットワーク: `log10_distance` (patternCHOP: `wavetype=ramp`, `length=200`, `amp=2`, `channelname=distance`) → `in0` (functionCHOP: `func=pow10`) → `SimilarityRating` (パレット) → `out1`

[SimilarityRatingExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/SimilarityRatingExample.toe)

??? note "手順(Audio/Feature/SimilarityRating.example.py)"

    ```python
    """距離と評価の関係

    MFCC の距離を 1 から 100 まで(横軸は対数)動かしたときの評価です。距離が約 2.9 までは 100 のままで、そこから距離が 10 倍になるごとに 69.4 点ずつ下がり、80 付近で 0 になります。low / high は評価の ±10 です。
    """
    FRAMES = 5

    def build(ex, tox):
        log_d = ex.op("patternCHOP", name="log10_distance", wavetype="ramp", length=200, amp=2, channelname="distance")
        d = ex.input("functionCHOP", input=log_d, func="pow10")
        ex.palette(tox, d)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- A. Wright, G. Dal Santo, S. J. Schlecht (2026). [Predicting Subjective Ratings of Guitar Amplifier Emulations](https://doi.org/10.17743/jaes.2026.0304). J. Audio Eng. Soc. 74(10), 762-772. — 折れ線モデルと既定値（Slope, Knee, Bound。表 3）
- A. Wright. [amp-emulation-metrics（論文のコードとデモ）](https://github.com/Alec-Wright/amp-emulation-metrics). — 評価の予測の実装（utils/sim_pred.py）

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

16 個のオペレータ。sha256: `ae3161bcddf3b69b…`
