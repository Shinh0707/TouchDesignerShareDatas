<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PhaseCorrelation/ -->

# PhaseCorrelation

`Audio/Stereo` フォルダのパレットです。

## 説明

位相相関計（コリレーションメーター）。左右がどれだけ同じ形かを −1〜1 で出す: Σ L·R / √(Σ L² · Σ R²)（1 フレーム分の区間）。+1 = 完全なモノラル、0 = 無相関（または片側だけ）、−1 = 逆相（モノラルにすると打ち消し合う）。無音は 0。1 フレーム分の区間で計算するので、無相関の音では値がフレームごとに揺れる（なめらかにするなら後ろに Lag CHOP や Filter CHOP）。

入力: in1 ステレオのオーディオ CHOP（L, R）
出力: out1 1 サンプル: −1〜1

## ダウンロード

[PhaseCorrelation.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PhaseCorrelation.tox) [使用例 PhaseCorrelationExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PhaseCorrelationExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio |
| 出力 0 | CHOP | `out1` | Feature / +1 = モノ、0 = 無相関、−1 = 逆相 |

## 使用例

### モノラル・無相関・逆相

![モノラル・無相関・逆相](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Stereo-PhaseCorrelation-example.svg)

左右が同じ音(mono)、左右で別々のノイズ(wide)、右を反転した音(inverted)の位相相関を比べた例です。mono が +1、wide が 0 付近、inverted が −1 になります。

ネットワーク: `in0` (patternCHOP: `channelname=l`, `wavetype=random`, `length=2000`, `fromrange=[0, 1]`, `torange=[-1, 1]`, `seed=5`) → `other` (patternCHOP: `channelname=r`, `wavetype=random`, `length=2000`, `fromrange=[0, 1]`, `torange=[-1, 1]`, `seed=9`) → `same` (renameCHOP: `renamefrom=l`, `renameto=r`) → `flipped` (mathCHOP: `gain=-1`) → `mono_lr` (mergeCHOP) → `wide_lr` (mergeCHOP) → `inverted_lr` (mergeCHOP) → `PhaseCorrelation` (パレット) → `mono` (renameCHOP: `renamefrom=*`, `renameto=mono`) → `PhaseCorrelation1` (パレット) → `wide` (renameCHOP: `renamefrom=*`, `renameto=wide`) → `PhaseCorrelation2` (パレット) → `inverted` (renameCHOP: `renamefrom=*`, `renameto=inverted`) → `results` (mergeCHOP) → `out1`

[PhaseCorrelationExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PhaseCorrelationExample.toe)

??? note "手順(Audio/Stereo/PhaseCorrelation.example.py)"

    ```python
    """モノラル・無相関・逆相

    左右が同じ音(mono)、左右で別々のノイズ(wide)、右を反転した音(inverted)の位相相関を比べた例です。mono が +1、wide が 0 付近、inverted が −1 になります。
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

16 個のオペレータ。sha256: `58e78008cbe56ee8…`
