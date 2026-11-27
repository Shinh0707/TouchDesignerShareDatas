<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralFlux/ -->

# SpectralFlux

`Audio/Spectrum` フォルダのパレットです。

## 説明

スペクトルフラックス（立ち上がり・オンセットの強さ）。前フレームからの増加分だけを二乗して合計: Σ max(0, X_k(t) − X_k(t−1))²。音が鳴り始めた瞬間に大きくなる。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 1 サンプル（チャンネルごと）

パラメータ

- Audiospect: Audio Spectrum CHOP

## ダウンロード

[SpectralFlux.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralFlux.tox) [使用例 SpectralFluxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralFluxExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | CHOP | `out1` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Audiospect` | Audiospect | Parameter | CHOP |  |  |

## 使用例

### 音の立ち上がり

![音の立ち上がり](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-SpectralFlux-example.svg)

220 Hz の三角波を 1 秒に 2 回鳴らしたり止めたりして(矩形波の LFO を掛ける)、スペクトルフラックスを 2 秒分記録した例です。音が鳴り始める瞬間だけ大きな山が立ち、鳴っている間と止まる瞬間はほぼ 0 です(増えた分だけを足すため)。

ネットワーク: `tone` (audiooscillatorCHOP: `wavetype=tri`, `frequency=220`, `amp=0.5`) → `gate` (lfoCHOP: `wavetype=square`, `frequency=2`, `amp=0.5`, `offset=0.5`, `rate=44100`, `timeslice=True`) → `sound` (mathCHOP: `chopop=mul`) → `BaseAudioSpect` (パレット) → `SpectralFlux` (パレット: `Audiospect=audiospect1`) → `history` (trailCHOP: `wlength=120`, `wlengthunit=samples`) → `out1`

[SpectralFluxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralFluxExample.toe)

??? note "手順(Audio/Spectrum/SpectralFlux.example.py)"

    ```python
    """音の立ち上がり

    220 Hz の三角波を 1 秒に 2 回鳴らしたり止めたりして(矩形波の LFO を掛ける)、スペクトルフラックスを 2 秒分記録した例です。音が鳴り始める瞬間だけ大きな山が立ち、鳴っている間と止まる瞬間はほぼ 0 です(増えた分だけを足すため)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import spectrum_of  # noqa: E402

    FRAMES = 120

    def build(ex, tox):
        tone = ex.op("audiooscillatorCHOP", name="tone", wavetype="tri", frequency=220, amp=0.5)
        gate = ex.op("lfoCHOP", name="gate", wavetype="square", frequency=2, amp=0.5, offset=0.5,
                     rate=44100, timeslice=True)
        sound = ex.op("mathCHOP", name="sound", input=[tone, gate], chopop="mul")
        flux = ex.palette(tox, Audiospect=spectrum_of(ex, sound))
        ex.out(ex.op("trailCHOP", name="history", input=flux, wlength=120, wlengthunit="samples"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

8 個のオペレータ。sha256: `aeeccb499fa0cef0…`
