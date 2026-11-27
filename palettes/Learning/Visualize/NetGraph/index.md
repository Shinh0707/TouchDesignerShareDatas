<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/NetGraph/ -->

# NetGraph

`Learning/Visualize` フォルダのパレットです。

## 説明

ネットの層と重みを、表に書くだけで自動で並べて描く（ニューラルネットの可視化）。layers の行ごとに層のノード（LayerNodes）を、edges の行ごとに層の間の重みの線（LayerEdges）を Replicator で作り、Render TOP で描く。層は表の順に左から右へ等間隔に並び、ノードの数・線の数・大きさは CHOP の形から自動で決まるので、出力の数や埋め込みの次元を変えても描き直さなくてよい。

表（Layers / Edges パラメータで外の Table DAT を指す。空なら中の layers / edges。パスは Target からの相対パス）

- layers: name、chop（層の値の CHOP。全部の値を 1 本に並べた順がノードの順）、mode（centered | unit | minmax、空なら minmax）、color（"r g b"、空なら自動）
- edges: from / to（layers の name）、weights（重みの CHOP）、transpose（on: チャンネル = 後の層、OnlineGHA の W など。off: チャンネル = 前の層、NNLinear の outvis1）、alpha（任意。その線の不透明度の倍率、空なら 1。線が数千本ある重みは 0.3 などに下げる）
- 線は前の層のノードの今の値でも光る（LayerEdges の Glow）
- 値が 1 つの層は中央に 1 点で描く
- 各列の下に層の名前と値の数を出す（Labels）

入力: なし（表の CHOP を参照する）
出力: out1 描いた画像（TOP）

パラメータ

- Layers / Edges: 層と重みの表（Table DAT）。部品の中で使うときは、表を部品の側に置いてここで指す（NetGraph をパレットから読み込み直しても表が消えない）
- Target: 表のパスの基準になる COMP（空なら NetGraph の親。部品の中に置けばその部品）
- Width: 層を並べる横の半幅
- Height: 層の半分の高さ
- Linewidth / Edgealpha: 重みの線の太さと不透明度
- Res: 出力の解像度
- Bgcolor: 背景の色
- Labels: 層の名前と値の数を各列の下に出す

## ダウンロード

[NetGraph.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/NetGraph.tox) [使用例 NetGraphExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/NetGraphExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Target` | Target | NetGraph | COMP |  |  |
| `Width` | Width | NetGraph | Float | `3.2` | 0.0 … 10.0 |
| `Height` | Height | NetGraph | Float | `1.4` | 0.0 … 10.0 |
| `Linewidth` | Linewidth | NetGraph | Float | `3` | 0.0 … 50.0 |
| `Edgealpha` | Edgealpha | NetGraph | Float | `0.6` | 0.0 … 1.0 |
| `Resw` | Res | NetGraph | WH | `1280` | 0.0 … 1.0 |
| `Resh` | Res | NetGraph | WH | `720` | 0.0 … 1.0 |
| `Bgcolorr` | Bgcolor | NetGraph | RGBA | `0.02` | 0.0 … 1.0 |
| `Bgcolorg` | Bgcolor | NetGraph | RGBA | `0.02` | 0.0 … 1.0 |
| `Bgcolorb` | Bgcolor | NetGraph | RGBA | `0.03` | 0.0 … 1.0 |
| `Layers` | Layers | NetGraph | DAT |  |  |
| `Edges` | Edges | NetGraph | DAT |  |  |
| `Labels` | Labels | NetGraph | Toggle | `True` |  |

## 使用例

### ネットのグラフを表から描く

![ネットのグラフを表から描く](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Visualize-NetGraph-example.png)

入力 8 → 隠れ層 5 → 出力 3 の小さなネットを、layers と edges の 2 つの表だけで描いた例です。各層の値と重みは乱数の CHOP で、表の chop / weights 列にその名前(Target = この例の /project1 からの相対パス)を書いています。

ネットワーク: `x` (patternCHOP: `channelname=x`, `wavetype=random`, `length=8`, `seed=1`) → `h` (patternCHOP: `channelname=h`, `wavetype=random`, `length=5`, `seed=2`) → `y` (patternCHOP: `channelname=y`, `wavetype=random`, `length=3`, `seed=3`) → `W1` (patternCHOP: `channelname=w[0-7]`, `wavetype=random`, `length=5`, `amp=2`, `offset=-1`, `seed=4`) → `W2` (patternCHOP: `channelname=w[0-4]`, `wavetype=random`, `length=3`, `amp=2`, `offset=-1`, `seed=5`) → `layers` (tableDAT) → `edges` (tableDAT) → `ng` (パレット: `Target=project1`, `Layers=layers`, `Edges=edges`, `Resw=960`, `Resh=540`) → `out1`

[NetGraphExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/NetGraphExample.toe)

??? note "手順(Learning/Visualize/NetGraph.example.py)"

    ```python
    """ネットのグラフを表から描く

    入力 8 → 隠れ層 5 → 出力 3 の小さなネットを、layers と edges の 2 つの表だけで描いた例です。各層の値と重みは乱数の CHOP で、表の chop / weights 列にその名前(Target = この例の /project1 からの相対パス)を書いています。
    """

    def build(ex, tox):
        ex.op("patternCHOP", name="x", channelname="x", wavetype="random", length=8, seed=1)
        ex.op("patternCHOP", name="h", channelname="h", wavetype="random", length=5, seed=2)
        ex.op("patternCHOP", name="y", channelname="y", wavetype="random", length=3, seed=3)
        ex.op("patternCHOP", name="W1", channelname="w[0-7]", wavetype="random", length=5, amp=2, offset=-1, seed=4)
        ex.op("patternCHOP", name="W2", channelname="w[0-4]", wavetype="random", length=3, amp=2, offset=-1, seed=5)
        layers = ex.op("tableDAT", name="layers")
        layers.clear()
        for row in (["name", "chop", "mode", "color"], ["input", "x", "unit", ""], ["hidden", "h", "unit", ""],
                    ["output", "y", "unit", ""]):
            layers.appendRow(row)
        edges = ex.op("tableDAT", name="edges")
        edges.clear()
        for row in (["from", "to", "weights", "transpose", "alpha"], ["input", "hidden", "W1", "off", ""],
                    ["hidden", "output", "W2", "off", ""]):
            edges.appendRow(row)
        ex.palette(tox, Target=ex.root, Layers=layers, Edges=edges, Resw=960, Resh=540)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

97 個のオペレータ。sha256: `5051413fdc04313c…`
