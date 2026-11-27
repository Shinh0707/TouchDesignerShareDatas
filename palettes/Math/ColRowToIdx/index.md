<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/ColRowToIdx/ -->

# ColRowToIdx

`Math` フォルダのパレットです。

## 説明

列と行の番号から、1 次元の通し番号を出す: idx = 列 + 行 × Colmax。

入力

- inCol: 列の番号
- inRow: 行の番号

出力: out1 通し番号

パラメータ

- Colmax: 1 行の列の数

## ダウンロード

[ColRowToIdx.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/ColRowToIdx.tox) [使用例 ColRowToIdxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/ColRowToIdxExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inCol` | Index |
| 入力 1 | CHOP | `inRow` | Index |
| 出力 0 | CHOP | `out1` | Index |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Colmax` | Column Max | Parameter | Float | `20` | 1.0 … 100.0 |

## 使用例

### 列と行から通し番号

![列と行から通し番号](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-ColRowToIdx-example.svg)

1 行に 4 列(Colmax = 4)の格子で、2 行目(行 = 2)の列 0〜3 の通し番号を出した例です。idx = 列 + 行 × 4 = 8、9、10、11 になります。

ネットワーク: `in0` (patternCHOP: `channelname=col`, `wavetype=rampsamples`, `length=4`) → `in1` (constantCHOP: `const0name=row`, `const0value=2`) → `ColRowToIdx` (パレット: `Colmax=4`) → `out1`

[ColRowToIdxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/ColRowToIdxExample.toe)

??? note "手順(Math/ColRowToIdx.example.py)"

    ```python
    """列と行から通し番号

    1 行に 4 列(Colmax = 4)の格子で、2 行目(行 = 2)の列 0〜3 の通し番号を出した例です。idx = 列 + 行 × 4 = 8、9、10、11 になります。
    """

    def build(ex, tox):
        col = ex.input("patternCHOP", channelname="col", wavetype="rampsamples", length=4)
        row = ex.input("constantCHOP", const0name="row", const0value=2)
        ex.palette(tox, col, row, Colmax=4)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `ef14aed05ba26ac0…`
