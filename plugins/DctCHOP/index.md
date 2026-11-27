<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DctCHOP/ -->

# DCT (DctCHOP)

## 概要

離散コサイン変換（DCT）と逆変換（iDCT）です。入力の各チャンネルを 1 本の数列として変換し、同じ長さ・同じチャンネル名で出します。
長さは 2 のべき乗でなくてもかまいません（どの長さでも O(N log N)）。

標準の Audio Spectrum CHOP / Spectrum TOP はフーリエ変換（DFT）で、区間を「繰り返す」ものとして扱うので、区間の両端で
値が合わないとそこが段差になり、スペクトルが広くにじみます。DCT-II は区間を「折り返す」ものとして扱うので両端に段差ができず、
窓をかけなくても少ない係数にエネルギーが集まります。出力は実数 1 本だけ（位相のチャンネルなし）で、逆 DCT にかけると
元の数列にちょうど戻ります。

- **Transform**: DCT / Inverse DCT。逆変換は、同じ Type・同じ Normalization の DCT の出力を元に戻します
- **Type**: DCT-I〜IV。ふつう「DCT」と言えば DCT-II（JPEG・MFCC など）、その逆が DCT-III です
- **Normalization**: Orthonormal（既定。変換の前後でエネルギー Σx² が変わらない）/ Scale Inverse（DCT はそのまま、逆変換で 1/2N。
  scipy の既定と同じ）/ Scale Forward（DCT で 1/2N。DCT-II の 0 番目が平均値になる）
- **Samples**: Whole Input（入力のサンプル全部を 1 回で変換）/ Latest Samples（タイムスライスのオーディオを貯めて、最新 Size
  サンプルを毎フレーム変換。Audio Spectrum CHOP と同じ考え方）

定義と正規化は `scipy.fft.dct` / `idct`（`type`, `norm="ortho" | "backward" | "forward"`）と同じ値になるようにしてあります。
DCT-II の k 番目の係数は、周波数 k × サンプルレート ÷ (2N) の成分です（N 個の係数で 0 〜 ナイキスト周波数。FFT の 2 倍の細かさ）。

!!! note "使いどころと注意"
    - 向いているもの: 係数を削る・書き換えて逆変換で戻す処理（ローパス、圧縮、スペクトルの包絡）、MFCC のような「対数スペクトルの DCT」、
      位相を持ちたくない特徴量。
    - DCT の係数は、音の位相（区間のどこから波が始まるか）で符号や大きさが変わります。音量メーターのように
      「その周波数がどれだけ鳴っているか」を安定して見たいときは、Audio Spectrum CHOP の振幅のほうが向いています。
    - Latest Samples の逆変換は、最新 Size サンプルの波形（タイムスライスではない Size サンプル）です。途切れのないオーディオとして
      鳴らすには、半分ずつ重ねて足し合わせる MDCT が必要で、この OP には入っていません。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Dct` |
| ラベル | DCT |
| 種類 | CHOP |
| 入力数 | 1 – 1 |
| バージョン | 1.0 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=DctCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 2x1024 | CHOP 2ch x 1024 | 0.009 ms<br>60→60.0 fps | 0.032 ms<br>60→59.9 fps |
| 2x4096 | CHOP 2ch x 4096 | 0.043 ms<br>60→59.8 fps | 0.175 ms<br>60→59.4 fps |
| 2x4096 DCT-IV | CHOP 2ch x 4096 | 0.083 ms<br>60→59.7 fps | 0.374 ms<br>60→58.7 fps |
| 2x735 (not a power of 2) | CHOP 2ch x 735 | 0.036 ms<br>60→59.9 fps | 0.136 ms<br>60→59.5 fps |
| latest 2048 of 2x735 | CHOP 2ch x 735 | 0.020 ms<br>60→59.9 fps | 0.071 ms<br>60→59.7 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `DctCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 音の DCT（最新 1024 サンプル）

![音の DCT（最新 1024 サンプル）](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/DctCHOP-default.svg)

オーディオ（タイムスライス）の最新 1024 サンプルを DCT-II にかけた例です。出力の k 番目のサンプルが
周波数 k × サンプルレート ÷ (2 × 1024) の成分で、FFT と違って実数 1 本だけになります（位相のチャンネルはありません）。

ネットワーク: `in0` (audiooscillatorCHOP: `wavetype=ramp`, `frequency=440`) → `plugin` (CPlusPlus CHOP: `Source=Latest`, `Size=1024`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.015 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `DctCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """音の DCT（最新 1024 サンプル）

    オーディオ（タイムスライス）の最新 1024 サンプルを DCT-II にかけた例です。出力の k 番目のサンプルが
    周波数 k × サンプルレート ÷ (2 × 1024) の成分で、FFT と違って実数 1 本だけになります（位相のチャンネルはありません）。
    """

    def build(ex):
        audio = ex.input("audiooscillatorCHOP", wavetype="ramp", frequency=440)
        ex.plugin(audio, Source="Latest", Size=1024)
    ```

#### 係数を削って元に戻す（DCT → 逆 DCT）

![係数を削って元に戻す（DCT → 逆 DCT）](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/DctCHOP-roundtrip.svg)

400 サンプルのノイズを DCT にかけ、低いほうの 40 個の係数だけ残して逆 DCT で戻した例です。
なめらかな形だけが残ります（ローパス）。係数を削らなければ、逆 DCT の出力は入力と同じになります。

ネットワーク: `in0` (noiseCHOP: `type=sparse`, `amp=1`, `period=0.2`, `startunit=samples`, `start=0`, `endunit=samples`, `end=399`, `channelname=value`) → `plugin` (CPlusPlus CHOP) → `express1` (expressionCHOP) → `inverse` (cplusplusCHOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.020 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `DctCHOPExample_roundtrip.toe`

??? note "手順(examples/roundtrip.py)"

    ```python
    """係数を削って元に戻す（DCT → 逆 DCT）

    400 サンプルのノイズを DCT にかけ、低いほうの 40 個の係数だけ残して逆 DCT で戻した例です。
    なめらかな形だけが残ります（ローパス）。係数を削らなければ、逆 DCT の出力は入力と同じになります。
    """

    def build(ex):
        data = ex.input("noiseCHOP", type="sparse", amp=1, period=0.2, startunit="samples", start=0,
                        endunit="samples", end=399, channelname="value")
        spectrum = ex.plugin(data)
        cut = ex.op("expressionCHOP", input=spectrum)
        cut.par.expr0expr.expr = "me.inputVal if me.sampleIndex < 40 else 0"
        back = ex.op("cplusplusCHOP", name="inverse", input=cut)
        back.par.plugin.expr = spectrum.par.plugin.expr
        back.cook(force=True)  # its parameters exist once the plugin is loaded
        back.par.Direction = "Inverse"
        ex.out(back)
    ```

**TouchDesigner テスト: 3 / 3 件合格**(test_inverse_gives_the_input_back, test_latest_samples_of_time_sliced_audio, test_matches_numpy_and_keeps_names)

### パラメータ: DCT

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Direction` | Transform | Menu | `Forward` | `Forward` DCT / `Inverse` Inverse DCT |  |
| `Type` | Type | Menu | `Type2` | `Type1` DCT-I / `Type2` DCT-II (the DCT) / `Type3` DCT-III / `Type4` DCT-IV |  |
| `Norm` | Normalization | Menu | `Ortho` | `Ortho` Orthonormal / `Backward` Scale Inverse (1/2N) / `Forward` Scale Forward (1/2N) |  |
| `Source` | Samples | Menu | `Input` | `Input` Whole Input / `Latest` Latest Samples (Time Sliced Input) |  |
| `Size` | Size | Int | 1024 | 1 … 16384 | 1 … 4096 |

### 出典・参考

- N. Ahmed, T. Natarajan, K. R. Rao (1974). [Discrete Cosine Transform](https://doi.org/10.1109/T-C.1974.223784). IEEE Transactions on Computers C-23(1), 90-93. — DCT（DCT-II）のもとの論文
- J. Makhoul (1980). [A fast cosine transform in one and two dimensions](https://doi.org/10.1109/TASSP.1980.1163351). IEEE Transactions on Acoustics, Speech, and Signal Processing 28(1), 27-34. — DCT-II / III を長さ N の FFT 1 回で計算する方法（この OP の計算方法）
- L. Bluestein (1970). [A linear filtering approach to the computation of discrete Fourier transform](https://doi.org/10.1109/TAU.1970.1162132). IEEE Transactions on Audio and Electroacoustics 18(4), 451-455. — 2 のべき乗でない長さの FFT（チャープ z 変換）
- SciPy. [scipy.fft.dct](https://docs.scipy.org/doc/scipy/reference/generated/scipy.fft.dct.html). SciPy documentation. — DCT-I〜IV の定義と正規化（ortho / backward / forward）を合わせた先

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

TODO: 入力・典型的な設定・注意点。
