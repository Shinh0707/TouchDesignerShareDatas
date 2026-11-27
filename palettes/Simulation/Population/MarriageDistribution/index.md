<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Population/MarriageDistribution/ -->

# MarriageDistribution

`Simulation/Population` フォルダのパレットです。

## 説明

年齢の属性から、その年齢の初婚率（1 年あたり）を点ごとに出す（人口シミュレーション用）。Coale–McNeil の標準的な初婚の曲線: g(a) = Mrate/k · 0.19465 · exp(−0.174(z − 6.06) − exp(−0.2881(z − 6.06)))、z = (a − Range1)/k（k = Spread）。面積（一生で結婚する割合）が Mrate、平均の初婚年齢は Range1 + 11.36·Spread。既定（Range1 15、Spread 1.29）で平均 29.7 歳、山は 25 歳ごろ。Range1〜Range2 歳の外は 0。

入力: in1 POP（Target 属性 = 年齢）
出力: out1 POP（Output 属性 = 初婚率、既定 Marriage）

パラメータ

- Target / Output / Range1 / Range2: BirthDistribution と同じ（既定 15〜100）
- Mrate: 生涯で結婚する割合（既定 0.8。出典はパラメータのツールチップ）
- Spread: 年齢の広がり k（大きいほど遅く・なだらか）

## ダウンロード

[MarriageDistribution.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Population/MarriageDistribution.tox) [使用例 MarriageDistributionExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Population/MarriageDistributionExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | POP | `in1` | Points / Target に年齢 |
| 出力 0 | POP | `out1` | Points / Output に 1 年あたりの初婚率 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Target` | Target | Parameter | Str |  |  |
| `Suffix` | Suffix | Parameter | Str |  |  |
| `Output` | Output | Parameter | Str |  |  |
| `Range1` | Range | Parameter | Float | `18` | 0.0 … 100.0 |
| `Range2` | Range | Parameter | Float | `100` | 0.0 … 100.0 |
| `Mrate` | Life Marrige Rate | Parameter | Float | `0.8` | 0.0 … 1.0 |
| `Spread` | Spread | Parameter | Float | `1` | 0.001 … 2.0 |

## 使用例

### 年齢別の初婚率の曲線

![年齢別の初婚率の曲線](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Population-MarriageDistribution-example.svg)

0〜100 歳の 101 点(x 座標 = 年齢)に MarriageDistribution を当てて、年齢ごとの初婚率(Marriage)を曲線にした例です(既定の Mrate 0.8)。15 歳より前は 0、山は 25 歳ごろで、全年齢の合計(一生で結婚する割合)がほぼ Mrate の 0.8 になります。

ネットワーク: `in0` (gridPOP: `surftype=none`, `sizex=100`, `sizey=0`, `cols=101`, `rows=1`, `tx=50`) → `MarriageDistribution` (パレット: `Target=P(0)`) → `marriage` (poptoCHOP: `pop=out1`, `attribscope=Marriage`) → `out1`

[MarriageDistributionExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Population/MarriageDistributionExample.toe)

??? note "手順(Simulation/Population/MarriageDistribution.example.py)"

    ```python
    """年齢別の初婚率の曲線

    0〜100 歳の 101 点(x 座標 = 年齢)に MarriageDistribution を当てて、年齢ごとの初婚率(Marriage)を曲線にした例です(既定の Mrate 0.8)。15 歳より前は 0、山は 25 歳ごろで、全年齢の合計(一生で結婚する割合)がほぼ Mrate の 0.8 になります。
    """

    def build(ex, tox):
        ages = ex.input("gridPOP", surftype="none", sizex=100, sizey=0, cols=101, rows=1, tx=50)
        b = ex.palette(tox, ages, Target="P(0)")
        ex.out(ex.op("poptoCHOP", name="marriage", pop=b.op("out1"), attribscope="Marriage"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `ee8d5665391f265c…`
