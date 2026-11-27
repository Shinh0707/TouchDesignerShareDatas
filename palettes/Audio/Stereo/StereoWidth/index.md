<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/StereoWidth/ -->

# StereoWidth

`Audio/Stereo` フォルダのパレットです。

## 説明

ステレオの広がり。Side（L−R）と Mid（L+R）のエネルギーから ΣS² / (ΣS² + ΣM²) を出す。0 = モノラル（左右が同じ）、0.5 = 片側だけ・無相関、1 = 逆相。無音は 0。1 フレーム分の区間で計算するので、無相関の音では値がフレームごとに揺れる（なめらかにするなら後ろに Lag CHOP や Filter CHOP）。

入力: in1 ステレオのオーディオ CHOP（L, R）
出力: out1 1 サンプル: 0〜1

## ダウンロード

[StereoWidth.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/StereoWidth.tox) [使用例 StereoWidthExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/StereoWidthExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio |
| 出力 0 | CHOP | `out1` | Feature / 0 = モノ、0.5 = 無相関、1 = 逆相 |

## 使用例

### モノラル・無相関・逆相

![モノラル・無相関・逆相](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Stereo-StereoWidth-example.svg)

左右が同じ音(mono)、左右で別々のノイズ(wide)、右を反転した音(inverted)の広がりを比べた例です。mono が 0、wide が 0.5 付近、inverted が 1 になります。

ネットワーク: `in0` (patternCHOP: `channelname=l`, `wavetype=random`, `length=2000`, `fromrange=[0, 1]`, `torange=[-1, 1]`, `seed=5`) → `other` (patternCHOP: `channelname=r`, `wavetype=random`, `length=2000`, `fromrange=[0, 1]`, `torange=[-1, 1]`, `seed=9`) → `same` (renameCHOP: `renamefrom=l`, `renameto=r`) → `flipped` (mathCHOP: `gain=-1`) → `mono_lr` (mergeCHOP) → `wide_lr` (mergeCHOP) → `inverted_lr` (mergeCHOP) → `StereoWidth` (パレット) → `mono` (renameCHOP: `renamefrom=*`, `renameto=mono`) → `StereoWidth1` (パレット) → `wide` (renameCHOP: `renamefrom=*`, `renameto=wide`) → `StereoWidth2` (パレット) → `inverted` (renameCHOP: `renamefrom=*`, `renameto=inverted`) → `results` (mergeCHOP) → `out1`

[StereoWidthExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/StereoWidthExample.toe)

??? note "手順(Audio/Stereo/StereoWidth.example.py)"

    ```python
    """モノラル・無相関・逆相

    左右が同じ音(mono)、左右で別々のノイズ(wide)、右を反転した音(inverted)の広がりを比べた例です。mono が 0、wide が 0.5 付近、inverted が 1 になります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import compare  # noqa: E402

    def stereo(ex):
        left = ex.input("patternCHOP", channelname="l", wavetype="random", length=2000,
                        fromrange=(0, 1), torange=(-1, 1), seed=5)
        other = ex.op("patternCHOP", name="other", channelname="r", wavetype="random", length=2000,
                      fromrange=(0, 1), torange=(-1, 1), seed=9)
        same = ex.op("renameCHOP", name="same", input=left, renamefrom="l", renameto="r")
        flipped = ex.op("mathCHOP", name="flipped", input=same, gain=-1)
        mono = ex.op("mergeCHOP", name="mono_lr", input=[left, same])
        wide = ex.op("mergeCHOP", name="wide_lr", input=[left, other])
        inverted = ex.op("mergeCHOP", name="inverted_lr", input=[left, flipped])
        return mono, wide, inverted

    def build(ex, tox):
        mono, wide, inverted = stereo(ex)
        compare(ex, tox, [("mono", mono), ("wide", wide), ("inverted", inverted)])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

13 個のオペレータ。sha256: `adfc4ff77ac82e7e…`
