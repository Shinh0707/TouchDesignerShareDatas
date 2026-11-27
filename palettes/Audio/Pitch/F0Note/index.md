<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/F0Note/ -->

# F0Note

`Audio/Pitch` フォルダのパレットです。

## 説明

F0 で推定した音の高さを、整数の MIDI ノート番号で出す（F0 → F0ToNote → 四捨五入）。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 1 サンプル（チャンネルごと）: ノート番号（整数）

パラメータ

- Audiospect: Audio Spectrum CHOP
- Fmin / Fmax: 探す音の高さの範囲 Hz（中の F0 に渡す。既定 20〜500）

既知の制限: F0 と同じ（基本周波数の成分が無い音では、いちばん低い倍音の高さになることがある）。tests に音程テストあり。

## ダウンロード

[F0Note.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0Note.tox) [使用例 F0NoteExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0NoteExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | CHOP | `out1` | Note / 整数の MIDI ノート番号, channels: same as Audiospect, samples: 1, rate: fps, range: [0, 127] |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Audiospect` | Audiospect | Parameter | CHOP |  |  |
| `Fmin` | Fmin | Parameter | Float | `20` | 0.0 … 22000.0 |
| `Fmax` | Fmax | Parameter | Float | `500` | 0.0 … 22000.0 |

## 使用例

### 音の高さをノート番号にする

![音の高さをノート番号にする](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Pitch-F0Note-example.svg)

三角波 110 Hz・正弦波 220 Hz・矩形波 440 Hz の高さを、MIDI ノート番号で出した例です(A2 = 45、A3 = 57、A4 = 69)。

ネットワーク: `tri110_sound` (audiooscillatorCHOP: `wavetype=tri`, `frequency=110`) → `BaseAudioSpect` (パレット) → `F0Note` (パレット: `Audiospect=audiospect1`, `Fmax=600`) → `tri110` (renameCHOP: `renamefrom=*`, `renameto=tri110`) → `sin220_sound` (audiooscillatorCHOP: `wavetype=sin`, `frequency=220`) → `BaseAudioSpect1` (パレット) → `F0Note1` (パレット: `Audiospect=audiospect1`, `Fmax=600`) → `sin220` (renameCHOP: `renamefrom=*`, `renameto=sin220`) → `square440_sound` (audiooscillatorCHOP: `wavetype=square`, `frequency=440`) → `BaseAudioSpect2` (パレット) → `F0Note2` (パレット: `Audiospect=audiospect1`, `Fmax=600`) → `square440` (renameCHOP: `renamefrom=*`, `renameto=square440`) → `results` (mergeCHOP) → `out1`

[F0NoteExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0NoteExample.toe)

??? note "手順(Audio/Pitch/F0Note.example.py)"

    ```python
    """音の高さをノート番号にする

    三角波 110 Hz・正弦波 220 Hz・矩形波 440 Hz の高さを、MIDI ノート番号で出した例です(A2 = 45、A3 = 57、A4 = 69)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import compare_spectra  # noqa: E402

    def build(ex, tox):
        compare_spectra(ex, tox, [("tri110", {"wavetype": "tri", "frequency": 110}),
                                  ("sin220", {"wavetype": "sin", "frequency": 220}),
                                  ("square440", {"wavetype": "square", "frequency": 440})], Fmax=600)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

19 個のオペレータ。sha256: `be45d461fcf90057…`
