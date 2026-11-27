<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Population/BirthDistribution/ -->

# BirthDistribution

`Simulation/Population` フォルダのパレットです。

## 説明

年齢の属性から、その年齢の出生率（1 年あたり、年齢別出生率）を点ごとに出す（人口シミュレーション用）。曲線は Range1 歳から始まるガンマ分布の形で、平均 Meanage 歳、標準偏差 Sd 年、面積（一生の合計）が Tfr（合計特殊出生率）になる。Range1〜Range2 歳の外は 0。既定（Tfr 1.3、平均 31 歳、Sd 5.5）は日本のおおよその値で、山は 29 歳ごろ。

入力: in1 POP（Target 属性 = 年齢、既定 State(0)）
出力: out1 POP（Output 属性 = 出生率、既定 Birth）

パラメータ

- Target: 年齢の属性（State[:] のように配列も可）
- Output: 書き込む属性名
- Range1 / Range2: 出生がありうる年齢の範囲（既定 15〜50）
- Tfr: 合計特殊出生率（曲線の面積）
- Meanage / Sd: 出産年齢の平均と標準偏差

## ダウンロード

[BirthDistribution.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Population/BirthDistribution.tox) [使用例 BirthDistributionExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Population/BirthDistributionExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | POP | `in1` | Points / Target に年齢 |
| 出力 0 | POP | `out1` | Points / Output に 1 年あたりの出生率 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Target` | Target | Parameter | Str |  |  |
| `Suffix` | Suffix | Parameter | Str |  |  |
| `Output` | Output | Parameter | Str |  |  |
| `Range1` | Range | Parameter | Float | `15` | 0.0 … 100.0 |
| `Range2` | Range | Parameter | Float | `50` | 0.0 … 100.0 |
| `Tfr` | Total Fertility Rate | Parameter | Float | `1.3` | 0.0 … 8.0 |
| `Meanage` | Mean Age | Parameter | Float | `31` | 16.0 … 45.0 |
| `Sd` | Age SD | Parameter | Float | `5.5` | 1.0 … 15.0 |

## 使用例

### 年齢別の出生率の曲線

![年齢別の出生率の曲線](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Population-BirthDistribution-example.svg)

0〜100 歳の 101 点(x 座標 = 年齢)に BirthDistribution を当てて、年齢ごとの出生率(Birth)を曲線にした例です(既定の Tfr 1.3、平均 31 歳、Sd 5.5)。15〜50 歳の外は 0、山は 29 歳ごろで、全年齢の合計がほぼ Tfr の 1.3 になります。

ネットワーク: `in0` (gridPOP: `surftype=none`, `sizex=100`, `sizey=0`, `cols=101`, `rows=1`, `tx=50`) → `BirthDistribution` (パレット: `Target=P(0)`) → `birth` (poptoCHOP: `pop=out1`, `attribscope=Birth`) → `out1`

[BirthDistributionExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Population/BirthDistributionExample.toe)

??? note "手順(Simulation/Population/BirthDistribution.example.py)"

    ```python
    """年齢別の出生率の曲線

    0〜100 歳の 101 点(x 座標 = 年齢)に BirthDistribution を当てて、年齢ごとの出生率(Birth)を曲線にした例です(既定の Tfr 1.3、平均 31 歳、Sd 5.5)。15〜50 歳の外は 0、山は 29 歳ごろで、全年齢の合計がほぼ Tfr の 1.3 になります。
    """

    def build(ex, tox):
        ages = ex.input("gridPOP", surftype="none", sizex=100, sizey=0, cols=101, rows=1, tx=50)
        b = ex.palette(tox, ages, Target="P(0)")
        ex.out(ex.op("poptoCHOP", name="birth", pop=b.op("out1"), attribscope="Birth"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `013aebad88b72189…`
