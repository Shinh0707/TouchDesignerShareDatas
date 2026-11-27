<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/OnlineRLS/ -->

# OnlineRLS

`Learning/Online` フォルダのパレットです。

## 説明

線形回帰 y ≈ θ · [f, 1] を、忘却つきの逐次最小二乗（RLS）で毎フレーム更新する。最後の係数がバイアス。新しいデータほど重く、実効的な窓は 1/(1 − Forget) フレーム。AutoVJ では、映像の情報の差分を出力ごとの変化の 2 乗で説明する「寄与モデル」に使う（係数 = 出力ごとの見た目の効き）。学習の外側で使う部品（逆伝播はしない）。

共分散行列の更新（(n+1) × (n+1)）はネイティブの CHOP では書けないので、中は Script CHOP（numpy）。特徴の数 n は小さい前提（数十まで）。

入力

- in1: 特徴 f（1 チャンネル × n サンプル）
- in2: 目標 y（1 値）

出力: out1 係数 θ（1 チャンネル × (n + 1) サンプル、最後がバイアス）

パラメータ

- Forget: 忘却係数 λ（0.9〜1）
- Initcov: リセット時の共分散の対角（大きいほど始めの更新が速い）
- Tracecap: 共分散のトレースの上限（入力が動かないときの膨らみ = ワインドアップを止める）
- Biasinit: リセット時のバイアス
- Nonneg: オンで出力の係数を 0 以上にする（中の推定は制約なしのまま。中の θ を切ると RLS が発散するため）
- Active: オフの間は更新しない
- Reset: オンの間、係数と共分散を初めに戻す

## ダウンロード

[OnlineRLS.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineRLS.tox) [使用例 OnlineRLSExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineRLSExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix / 特徴 1 × n |
| 入力 1 | CHOP | `in2` | Control / 目標 1 値 |
| 出力 0 | CHOP | `out1` | Matrix / 係数 θ（n + 1、最後がバイアス） |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Forget` | Forget | RLS | Float | `0.999` | 0.9 … 1.0 |
| `Initcov` | Initcov | RLS | Float | `10` | 0.0 … 1000.0 |
| `Tracecap` | Tracecap | RLS | Float | `100` | 1.0 … 10000.0 |
| `Biasinit` | Biasinit | RLS | Float | `1` | 0.0 … 10.0 |
| `Nonneg` | Nonneg | RLS | Toggle | `True` |  |
| `Active` | Active | RLS | Toggle | `True` |  |
| `Reset` | Reset | RLS | Toggle | `False` |  |

## 使用例

### 係数をその場で推定する

![係数をその場で推定する](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Online-OnlineRLS-example.svg)

毎フレーム変わる 3 つの特徴 f から y = 2·f0 − f1 + 0.5·f2 + 1 を作り、OnlineRLS で係数を推定した例です(600 フレーム後)。図は推定した係数 θ で、2, −1, 0.5, 1(最後がバイアス)に近づきます。Nonneg はオフにしています(負の係数があるため)。

ネットワーク: `in0` (patternCHOP: `channelname=f`, `wavetype=random`, `length=3`, `fromrange=[0, 1]`, `torange=[-1, 1]`, `seed={'expr': 'absTime.frame'}`) → `in1` (constantCHOP: `name0=y`, `value0={'expr': "2 * op('in0')[0][0] - op('in0')[0][1] + 0.5 * op('in0')[0][2] + 1"}`) → `OnlineRLS` (パレット: `Nonneg=False`) → `out1`

[OnlineRLSExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineRLSExample.toe)

??? note "手順(Learning/Online/OnlineRLS.example.py)"

    ```python
    """係数をその場で推定する

    毎フレーム変わる 3 つの特徴 f から y = 2·f0 − f1 + 0.5·f2 + 1 を作り、OnlineRLS で係数を推定した例です(600 フレーム後)。図は推定した係数 θ で、2, −1, 0.5, 1(最後がバイアス)に近づきます。Nonneg はオフにしています(負の係数があるため)。
    """

    FRAMES = 600

    def build(ex, tox):
        f = ex.input("patternCHOP", channelname="f", wavetype="random", length=3, fromrange=(0, 1), torange=(-1, 1),
                     seed={"expr": "absTime.frame"})
        y = ex.input("constantCHOP", name0="y",
                     value0={"expr": "2 * op('in0')[0][0] - op('in0')[0][1] + 0.5 * op('in0')[0][2] + 1"})
        ex.palette(tox, f, y, Nonneg=False)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

9 個のオペレータ。sha256: `45bd049b186e70dd…`
