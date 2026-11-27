<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/OnlineStandardize/ -->

# OnlineStandardize

`Learning/Online` フォルダのパレットです。

## 説明

入力の各要素（チャンネル × サンプルのそれぞれ）を、その要素のオンラインの平均と分散で標準化する: z = (x − μ)/√(v + 10^Floorlog)。μ と v は毎フレーム指数移動平均で更新する（μ ← μ + α(x − μ)、v ← v + α((x − μ)² − v)）。画素ごと・帯域ごとに「いつもの揺れ」を 1σ にそろえたいときに使う。学習の外側で使う部品（逆伝播はしない）。Feedback と Cross の CHOP だけで組んである。

入力: in1 CHOP（形は自由。Time Slice はオフで、全サンプルを要素として扱う）
出力: out1 同じ形の z

パラメータ

- Alpha: 平均・分散の移動平均の速さ（1 フレームの重み）。0 で止まる
- Floorlog: 分散の下限の log10（既定 −6）。ほぼ一定の要素の小さな揺れを大きくしない
- Initvar: リセット時の分散
- Reset: オンの間、平均を今の入力に、分散を Initvar に戻す

## ダウンロード

[OnlineStandardize.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineStandardize.tox) [使用例 OnlineStandardizeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineStandardizeExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Alpha` | Alpha | Standardize | Float | `0.01` | 0.0 … 1.0 |
| `Initvar` | Initvar | Standardize | Float | `1` | 0.0 … 10.0 |
| `Reset` | Reset | Standardize | Toggle | `False` |  |
| `Floorlog` | Floorlog | Standardize | Float | `-6` | -12.0 … 0.0 |

## 使用例

### 揺れを 1σ にそろえる

![揺れを 1σ にそろえる](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Online-OnlineStandardize-example.svg)

平均 5・振れ幅 3 で揺れる値(raw)を OnlineStandardize に通し、300 フレーム分の推移を Trail CHOP で記録した例です。はじめは移動平均が追いつかずにずれますが、だんだん平均 0・標準偏差 1 前後(z)にそろいます。

ネットワーク: `in0` (patternCHOP: `channelname=raw`, `wavetype=random`, `length=1`, `fromrange=[0, 1]`, `torange=[2, 8]`, `seed={'expr': 'absTime.frame'}`) → `OnlineStandardize` (パレット: `Alpha=0.02`) → `z` (renameCHOP: `renamefrom=*`, `renameto=z`) → `raw_and_z` (mergeCHOP) → `history` (trailCHOP: `wlength=300`, `wlengthunit=samples`) → `out1`

[OnlineStandardizeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineStandardizeExample.toe)

??? note "手順(Learning/Online/OnlineStandardize.example.py)"

    ```python
    """揺れを 1σ にそろえる

    平均 5・振れ幅 3 で揺れる値(raw)を OnlineStandardize に通し、300 フレーム分の推移を Trail CHOP で記録した例です。はじめは移動平均が追いつかずにずれますが、だんだん平均 0・標準偏差 1 前後(z)にそろいます。
    """

    FRAMES = 300

    def build(ex, tox):
        raw = ex.input("patternCHOP", channelname="raw", wavetype="random", length=1, fromrange=(0, 1), torange=(2, 8),
                       seed={"expr": "absTime.frame"})
        z = ex.palette(tox, raw, Alpha=0.02)
        zn = ex.op("renameCHOP", name="z", input=z, renamefrom="*", renameto="z")
        both = ex.op("mergeCHOP", name="raw_and_z", input=[raw, zn])
        ex.out(ex.op("trailCHOP", name="history", input=both, wlength=300, wlengthunit="samples"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

14 個のオペレータ。sha256: `5f5e9571b9aea77d…`
