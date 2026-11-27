<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/OnlineGHA/ -->

# OnlineGHA

`Learning/Online` フォルダのパレットです。

## 説明

入力をオンライン PCA（Sanger 則 / 一般化ヘブ則 GHA）で k 個の主成分に埋め込む。y = W(x − μ)、W ← W + η(y xᵀ − tril(y yᵀ) W)。Whiten がオンなら成分ごとに標準偏差 1 にそろえる（白色化）。相関のある多数の要素（スペクトルの帯域、画像の画素など）を、少数の無相関な特徴にする。白色化した成分の差分の 2 乗和は、元の空間のマハラノビス距離（相関を考えた情報量）に近い。学習の外側で使う部品（逆伝播はしない）。

行列の更新のループなので中は Script CHOP（numpy）。入力の要素数 n と k は小さい前提（n = 768、k = 8 で約 0.1 ms）。1 フレームに何度 cook されても更新は 1 回。

入力: in1 CHOP（形は自由。全部の値を 1 本のベクトルとして扱う。Time Slice はオフ）
出力:

- out1 1 チャンネル（e）× k サンプル
- out2 重み W: k チャンネル（w0…）× n サンプル（可視化用。LayerEdges には Transpose オンでつなぐ）

パラメータ

- Components: 主成分の数 k
- Eta: 学習率（入力の大きさの移動平均で割るので、入力の単位に依らない）
- Alpha: 平均・成分の分散の移動平均の速さ
- Whiten: オンで白色化
- Seed: 初期値の乱数の種
- Active: オフの間は学習しない
- Reset: オンの間、初めに戻す

## ダウンロード

[OnlineGHA.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineGHA.tox) [使用例 OnlineGHAExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineGHAExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Feature / 主成分 k 個 |
| 出力 1 | CHOP | `out2` | Matrix / 重み W（k チャンネル × n サンプル） |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Components` | Components | GHA | Int | `8` | 1.0 … 64.0 |
| `Eta` | Eta | GHA | Float | `0.02` | 0.0 … 1.0 |
| `Alpha` | Alpha | GHA | Float | `0.005` | 0.0 … 1.0 |
| `Whiten` | Whiten | GHA | Toggle | `True` |  |
| `Seed` | Seed | GHA | Int | `0` | 0.0 … 1000.0 |
| `Active` | Active | GHA | Toggle | `True` |  |
| `Reset` | Reset | GHA | Toggle | `False` |  |

## 使用例

### 2 つの隠れた要因を見つける

![2 つの隠れた要因を見つける](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Online-OnlineGHA-example.svg)

16 個の値を、毎フレーム乱数で振った正弦と余弦の 2 つの形の和として作り、OnlineGHA(Components=2)で主成分を学習した例です(900 フレーム後)。図は学んだ重み W の 2 行で、正弦・余弦の形(またはそれを回したもの)になります。

ネットワーク: `sin` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=16`) → `cos` (patternCHOP: `channelname=x`, `wavetype=cos`, `length=16`) → `a_sin` (mathCHOP: `gain={'expr': 'tdu.rand(absTime.frame) * 2 - 1'}`) → `b_cos` (mathCHOP: `gain={'expr': 'tdu.rand(absTime.frame + 0.5) * 2 - 1'}`) → `in0` (mathCHOP: `chopop=add`) → `OnlineGHA` (パレット: `Components=2`, `Whiten=False`) → `weights` (selectCHOP: `chops=out2`) → `out1`

[OnlineGHAExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineGHAExample.toe)

??? note "手順(Learning/Online/OnlineGHA.example.py)"

    ```python
    """2 つの隠れた要因を見つける

    16 個の値を、毎フレーム乱数で振った正弦と余弦の 2 つの形の和として作り、OnlineGHA(Components=2)で主成分を学習した例です(900 フレーム後)。図は学んだ重み W の 2 行で、正弦・余弦の形(またはそれを回したもの)になります。
    """

    FRAMES = 900

    def build(ex, tox):
        s = ex.op("patternCHOP", name="sin", channelname="x", wavetype="sin", length=16)
        c = ex.op("patternCHOP", name="cos", channelname="x", wavetype="cos", length=16)
        a = ex.op("mathCHOP", name="a_sin", input=s, gain={"expr": "tdu.rand(absTime.frame) * 2 - 1"})
        b = ex.op("mathCHOP", name="b_cos", input=c, gain={"expr": "tdu.rand(absTime.frame + 0.5) * 2 - 1"})
        x = ex.input("mathCHOP", input=[a, b], chopop="add")
        g = ex.palette(tox, x, Components=2, Whiten=False)
        ex.out(ex.op("selectCHOP", name="weights", chops=g.op("out2")))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- T. D. Sanger (1989). [Optimal unsupervised learning in a single-layer linear feedforward neural network](https://doi.org/10.1016/0893-6080(89)90044-0). Neural Networks 2(6), 459-473. — 更新則（Sanger 則 / 一般化ヘブ則 GHA）

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

11 個のオペレータ。sha256: `0868c91c9895119c…`
