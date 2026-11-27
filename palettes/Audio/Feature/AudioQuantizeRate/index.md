<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/AudioQuantizeRate/ -->

# AudioQuantizeRate

`Audio/Feature` フォルダのパレットです。

## 説明

オーディオが Q ビットの段（±1 を 2^Q − 1 段に分けた格子）にどれだけ乗っているか（ビットクラッシュ・ローファイらしさ）を 0〜1 で出す。各サンプルの格子からのずれの平均を、Scale の強さの tanh で 0〜1 に写す。1 = ちょうど格子の上（Q ビットで量子化された音・無音）、普通の音で 0.2〜0.4、0 = いつも格子のちょうど中間。

入力: in1 オーディオ CHOP
出力: out1 1 サンプル（チャンネルごと）: 0〜1

パラメータ

- Q: 調べるビット数（既定 8）
- Scale: 判定の鋭さ（tanh の傾きは 2π × Scale、既定 5）

## ダウンロード

[AudioQuantizeRate.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/AudioQuantizeRate.tox) [使用例 AudioQuantizeRateExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/AudioQuantizeRateExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio |
| 出力 0 | CHOP | `out1` | Feature / 1 = Q ビットの格子の上 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Scale` | Scale | Parameter | Float | `5` | 0.0 … 10.0 |
| `Q` | Q | Parameter | Float | `8` | 1.0 … 64.0 |

## 使用例

### ビットクラッシュした音を見分ける

![ビットクラッシュした音を見分ける](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Feature-AudioQuantizeRate-example.svg)

ノイズ(clean)と、それを 3 ビット(8 段)に量子化したもの(crushed)を Q=3 で調べた例です。量子化した方は 1 に、そのままの音は低い値になります。

ネットワーク: `in0` (patternCHOP: `wavetype=random`, `length=2000`, `fromrange=[0, 1]`, `torange=[-1, 1]`) → `express1` (expressionCHOP: `expr0={'expr': 'round((me.inputVal + 1) / 2 * 7) / 7 * 2 - 1'}`) → `AudioQuantizeRate` (パレット: `Q=3`) → `clean` (renameCHOP: `renamefrom=*`, `renameto=clean`) → `AudioQuantizeRate1` (パレット: `Q=3`) → `crushed` (renameCHOP: `renamefrom=*`, `renameto=crushed`) → `results` (mergeCHOP) → `out1`

[AudioQuantizeRateExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/AudioQuantizeRateExample.toe)

??? note "手順(Audio/Feature/AudioQuantizeRate.example.py)"

    ```python
    """ビットクラッシュした音を見分ける

    ノイズ(clean)と、それを 3 ビット(8 段)に量子化したもの(crushed)を Q=3 で調べた例です。量子化した方は 1 に、そのままの音は低い値になります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import compare  # noqa: E402

    def build(ex, tox):
        clean = ex.input("patternCHOP", wavetype="random", length=2000, fromrange=(0, 1), torange=(-1, 1))
        crushed = ex.op("expressionCHOP", input=clean, expr0={"expr": "round((me.inputVal + 1) / 2 * 7) / 7 * 2 - 1"})
        compare(ex, tox, [("clean", clean), ("crushed", crushed)], Q=3)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

11 個のオペレータ。sha256: `718b8fa37e8b6c57…`
