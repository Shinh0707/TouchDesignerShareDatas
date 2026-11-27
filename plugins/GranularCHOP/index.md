<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GranularCHOP/ -->

# Granular (GranularCHOP)

## 概要

CHOPに簡易的なグラニュラー効果をかけます.
２段階かけるといい感じになります.
使用例1: [TouchDesigner Plugin "Granular"](https://youtu.be/0uRVfFLauyg "TouchDesigner Plugin Granular YouTube")
使用例2: [GranularCHOPExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/blob/main/Projects/GranularCHOPExample.toe "GranularCHOP使用例")

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Granular` |
| ラベル | Granular |
| 種類 | CHOP |
| 入力数 | 1 – 1 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=GranularCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 1 s, 32 grains | CHOP 2ch x 44100 | 0.040 ms<br>60→59.9 fps | 0.145 ms<br>60→59.5 fps |
| default | CHOP 2ch x 1000 | 0.016 ms<br>60→59.9 fps | 0.042 ms<br>60→59.8 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `GranularCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 1 秒の音を 4 つの粒にする

![1 秒の音を 4 つの粒にする](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/GranularCHOP-default.svg)

1 秒ぶんの波形(Noise CHOP、44100 サンプル)から、長さ 0.05〜0.2 秒の粒を 4 つ取り出して繰り返し再生します。
出力は入力 1 チャンネルにつき粒の数だけ(`chan1:grain1` …)。図は Trail CHOP で 0.5 秒ぶんを並べたもので、
粒ごとに窓(Hann)がかかり、Hop Length のぶんだけ出だしがずれているのが見えます。

ネットワーク: `in0` (noiseCHOP: `type=harmonic`, `harmon=4`, `period=0.02`, `startunit=samples`, `start=0`, `endunit=samples`, `end=44099`, `rate=44100`) → `plugin` (CPlusPlus CHOP: `Numgrains=4`, `Unit=S`, `Minlengthseconds=0.05`, `Maxlengthseconds=0.2`, `Seed=3`) → `trail1` (trailCHOP: `wlength=0.5`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.010 ms** — 余裕の無い 60 fps のプロジェクトなら **60.0 fps**(-0.0)。

ファイル: `GranularCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """1 秒の音を 4 つの粒にする

    1 秒ぶんの波形(Noise CHOP、44100 サンプル)から、長さ 0.05〜0.2 秒の粒を 4 つ取り出して繰り返し再生します。
    出力は入力 1 チャンネルにつき粒の数だけ(`chan1:grain1` …)。図は Trail CHOP で 0.5 秒ぶんを並べたもので、
    粒ごとに窓(Hann)がかかり、Hop Length のぶんだけ出だしがずれているのが見えます。
    """

    def build(ex):
        src = ex.input("noiseCHOP", type="harmonic", harmon=4, period=0.02, startunit="samples", start=0,
                       endunit="samples", end=44099, rate=44100)
        grains = ex.plugin(src, Numgrains=4, Unit="S", Minlengthseconds=0.05, Maxlengthseconds=0.2, Seed=3)
        ex.out(ex.op("trailCHOP", input=grains, wlength=0.5))
    ```

### パラメータ: Granular

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Seed` | Seed | Int | 0 | −∞ … ∞ | 0 … 1000 |
| `Numgrains` | Number of Grains | Int | 10 | −∞ … ∞ | 1 … 128 |
| `Samplerate` | Sample Rate | Int | 44100 | 1 … ∞ | 8000 … 96000 |
| `Unit` | Grain Length Unit | Menu | `S` | `I` Samples / `F` Frames / `S` Seconds |  |
| `Minlengthsamples` | Min Grain Length (samples) | Int | 2205 | −∞ … ∞ | 1 … 44100 |
| `Maxlengthsamples` | Max Grain Length (samples) | Int | 8820 | −∞ … ∞ | 1 … 44100 |
| `Minlengthframes` | Min Grain Length (frames) | Int | 3 | −∞ … ∞ | 1 … 60 |
| `Maxlengthframes` | Max Grain Length (frames) | Int | 12 | −∞ … ∞ | 1 … 60 |
| `Minlengthseconds` | Min Grain Length (sec) | Float | 0.05 | −∞ … ∞ | 0.001 … 1 |
| `Maxlengthseconds` | Max Grain Length (sec) | Float | 0.2 | −∞ … ∞ | 0.001 … 1 |
| `Hoplength` | Hop Length | Float | 0.5 | −∞ … ∞ | 0 … 1 |
| `Window` | Window | Menu | `H` | `H` Hann / `C` Cosine / `B` Blackman / `T` Triangle |  |

### 出典・参考

- C. Roads (2001). [Microsound](https://doi.org/10.7551/mitpress/4601.001.0001). MIT Press. — グラニュラー合成(音を短い粒に切り、窓をかけて並べ直す)の解説
- D. Gabor (1947). [Acoustical Quanta and the Theory of Hearing](https://doi.org/10.1038/159591a0). Nature 159, 591-594. — 音を時間と周波数の小さな粒で捉える考え方の原点

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

入力には、**サンプル数が決まった波形**(Audio File In CHOP で読み込んだ音、Trail CHOP でためた音など、Time Slice オフ)をつなぎます。
その中から粒(グレイン)をランダムに選び、窓をかけて繰り返し再生します。出力は Time Slice の音声です。

- 出力のチャンネルは「入力のチャンネル数 × **Number of Grains**」で、名前は `<入力のチャンネル名>:grain1` … です。
  1 つの音にまとめるときは、後ろに Math CHOP(Combine Channels = Add)をつなぎ、粒の数に合わせて音量を下げます。
- **Grain Length Unit** と **Min / Max Grain Length**: 粒の長さの範囲。粒ごとにこの範囲でランダムに決まります。単位は選んだものだけが有効です。
- **Hop Length**: 粒ごとの出だしのずれ(粒の長さに対する割合)。0 だと全部の粒が同時に始まり、0.5 で半分ずつずれて重なります。
- **Window**: 粒にかける窓。粒のつなぎ目のプチッという音を防ぎます。
- **Seed**: 粒の選び方。変えると別の場所・別の長さの粒になります。
- **Sample Rate**: 出力のサンプルレート。入力と同じ値にします(違うと音の高さが変わります)。

粒の位置と長さは、パラメータか入力のチャンネル数が変わったときに選び直します。出力をもう 1 つの Granular CHOP に通すと、
粒の中からさらに粒を取ることになり、より細かく散った音になります。
