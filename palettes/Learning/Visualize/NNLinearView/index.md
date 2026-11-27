<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/NNLinearView/ -->

# NNLinearView

`Learning/Visualize` フォルダのパレットです。

## 説明

全結合層（NNLinear）のノードと重みを、POP でリアルタイムに描く。左に入力のノード、右に出力のノードを縦に並べ、入力 i と出力 j を結ぶ線を重み W[i, j] ごとに引く。

- 線: 色 = 重みの符号（赤 = 正、青 = 負）、太さ・不透明度 = |w|（Autonorm オンなら今の |w| の最大で割る）
- ノード: 入力は青系（活性を tanh で 0〜1 にして明るさ・大きさに）、出力は橙系（0〜1 の活性をそのまま明るさ・大きさに）

POP の属性は P・Color・LineWidth・PointScale。Line MAT でそのまま描ける（out2 は中の Line MAT ＋ Render TOP で描いた確認用の画像）。

入力

- in1: 重み W（入力の数 チャンネル × 出力の数 サンプル。NNLinear の outvis1 をそのまま）
- in2: 入力の活性（1 チャンネル × 入力の数）
- in3: 出力の活性（1 チャンネル × 出力の数、0〜1）

出力

- out1: POP（線 入力の数 × 出力の数 本 ＋ 点 入力の数 ＋ 出力の数 個）
- out2: 確認用の画像 TOP（640 × 480。つないだときだけ描く）

パラメータ

- Ninputs / Noutputs: 入力・出力のノードの数（位置の計算に使う。重みの形に合わせる）
- Spread: 入力の層と出力の層の x の位置（−Spread と ＋Spread）
- Linewidth: |w| が一番大きい線の太さ
- Nodesize: ノードの大きさ
- Autonorm / Wscale: 重みの正規化（オン: 今の |w| の最大、オフ: Wscale）

## ダウンロード

[NNLinearView.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/NNLinearView.tox) [使用例 NNLinearViewExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/NNLinearViewExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix / 重み W |
| 入力 1 | CHOP | `in2` | Feature / 入力の活性 |
| 入力 2 | CHOP | `in3` | Control / 出力の活性 |
| 出力 0 | POP | `out1` | Geometry |
| 出力 1 | TOP | `out2` | Image / 確認用の画像 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Ninputs` | Ninputs | Viz | Int | `8` | 1.0 … 256.0 |
| `Noutputs` | Noutputs | Viz | Int | `5` | 1.0 … 256.0 |
| `Spread` | Spread | Viz | Float | `1` | 0.0 … 10.0 |
| `Linewidth` | Linewidth | Viz | Float | `4` | 0.0 … 50.0 |
| `Nodesize` | Nodesize | Viz | Float | `0.08` | 0.0 … 1.0 |
| `Autonorm` | Autonorm | Viz | Toggle | `True` |  |
| `Wscale` | Wscale | Viz | Float | `1` | 0.0001 … 100.0 |

## 使用例

### 全結合層を描く

![全結合層を描く](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Visualize-NNLinearView-example.png)

8 入力 → 5 出力の全結合層を、乱数の重み(8 チャンネル × 5 サンプル)と入力・出力の活性で描いた例です(out2 の確認用の画像)。左の青系が入力、右の橙系が出力のノードで、線の色は重みの符号(赤 = 正、青 = 負)です。

ネットワーク: `in0` (patternCHOP: `channelname=w[0-7]`, `wavetype=random`, `length=5`, `amp=2`, `offset=-1`, `seed=2`) → `in1` (patternCHOP: `channelname=a`, `wavetype=random`, `length=8`, `amp=2`, `offset=-1`, `seed=4`) → `in2` (patternCHOP: `channelname=y`, `wavetype=random`, `length=5`, `seed=6`) → `NNLinearView` (パレット: `Ninputs=8`, `Noutputs=5`) → `image` (selectTOP: `top=out2`) → `out1`

[NNLinearViewExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/NNLinearViewExample.toe)

??? note "手順(Learning/Visualize/NNLinearView.example.py)"

    ```python
    """全結合層を描く

    8 入力 → 5 出力の全結合層を、乱数の重み(8 チャンネル × 5 サンプル)と入力・出力の活性で描いた例です(out2 の確認用の画像)。左の青系が入力、右の橙系が出力のノードで、線の色は重みの符号(赤 = 正、青 = 負)です。
    """

    def build(ex, tox):
        w = ex.input("patternCHOP", channelname="w[0-7]", wavetype="random", length=5, amp=2, offset=-1, seed=2)
        a = ex.input("patternCHOP", channelname="a", wavetype="random", length=8, amp=2, offset=-1, seed=4)
        y = ex.input("patternCHOP", channelname="y", wavetype="random", length=5, seed=6)
        v = ex.palette(tox, w, a, y, Ninputs=8, Noutputs=5)
        ex.out(ex.op("selectTOP", name="image", top=v.op("out2")))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

25 個のオペレータ。sha256: `111196124554680a…`
