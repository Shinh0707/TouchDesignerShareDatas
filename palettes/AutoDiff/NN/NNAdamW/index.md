<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNAdamW/ -->

# NNAdamW

`AutoDiff/NN` フォルダのパレットです。

## 説明

AdamW の 1 ステップ: 学習するパラメータ（target）を、その勾配（deriv）で更新した値を出す。外の Feedback CHOP で out1 を target に戻して使う（NNLinear の中の使い方）。
m ← β₁m + (1 − β₁)g、v ← β₂v + (1 − β₂)g²、θ ← θ − Lr · (m̂ / (√v̂ + 0.0001) + Lambda · θ)。m̂, v̂ はバイアス補正（1 − βᵗ で割る）。

入力（この順）

- target（1 番目）: 今のパラメータ θ
- deriv（2 番目）: 勾配 g（target と同じ形）

出力: out1 更新したパラメータ

パラメータ

- Lr: 学習率
- Lambda: 重み減衰
- Beta1 / Beta2: 1 次・2 次のモーメントの減衰（既定 0.9 / 0.999）
- Reset: オンの間、モーメントを 0 に戻す

target の形（大きさ）が変わったときも、モーメントを 0 からやり直す（層の大きさを変えたとき古い形が残らない）。

## ダウンロード

[NNAdamW.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNAdamW.tox) [使用例 NNAdamWExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNAdamWExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `target` | Any / 今のパラメータ |
| 入力 1 | CHOP | `deriv` | Any / 勾配 |
| 出力 0 | CHOP | `out1` | Any / 更新したパラメータ |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Lr` | Learning Rate | Parameter | Float | `0.001` | 0.0 … 1.0 |
| `Lambda` | Lambda | Parameter | Float | `0.01` | 0.0 … 1.0 |
| `Beta1` | Beta1 | Parameter | Float | `0.9` | 0.0 … 1.0 |
| `Beta2` | Beta2 | Parameter | Float | `0.999` | 0.0 … 1.0 |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### AdamW で 1 つの値を最適化

![AdamW で 1 つの値を最適化](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-NN-NNAdamW-example.svg)

損失 L = (θ − 3)² を、AdamW(Lr 0.1、Lambda 0)で 5 秒間 小さくしていった例です。θ は 0 から始まり、外の Feedback CHOP で 1 フレーム前の θ を target(1 番目の入力)に戻し、勾配 dL/dθ = 2(θ − 3) を deriv(2 番目の入力)に入れています。θ の推移を Trail CHOP で記録しています。θ は 3 まで上がり、そのあとは 3 のまわりを Lr 程度の幅で揺れます(Adam は学習率を下げない限り、1 ステップがほぼ Lr の大きさのまま残るため)。

ネットワーク: `theta0` (constantCHOP: `const0name=theta`, `const0value=0`) → `adam` (パレット: `Lr=0.1`, `Lambda=0`) → `feedback` (feedbackCHOP) → `prev_theta` (selectCHOP: `channames=theta`) → `in0` (mathCHOP: `preoff=-3`, `gain=2`) → `history` (trailCHOP: `wlength=300`, `wlengthunit=samples`) → `out1`

[NNAdamWExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNAdamWExample.toe)

??? note "手順(AutoDiff/NN/NNAdamW.example.py)"

    ```python
    """AdamW で 1 つの値を最適化

    損失 L = (θ − 3)² を、AdamW(Lr 0.1、Lambda 0)で 5 秒間 小さくしていった例です。θ は 0 から始まり、外の Feedback CHOP で 1 フレーム前の θ を target(1 番目の入力)に戻し、勾配 dL/dθ = 2(θ − 3) を deriv(2 番目の入力)に入れています。θ の推移を Trail CHOP で記録しています。θ は 3 まで上がり、そのあとは 3 のまわりを Lr 程度の幅で揺れます(Adam は学習率を下げない限り、1 ステップがほぼ Lr の大きさのまま残るため)。
    """

    FRAMES = 300

    def build(ex, tox):
        init = ex.op("constantCHOP", name="theta0", const0name="theta", const0value=0)
        adam = ex.palette(tox, None, None, Lr=0.1, Lambda=0)
        fb = ex.op("feedbackCHOP", name="feedback", input=[adam, init])
        prev = ex.op("selectCHOP", name="prev_theta", input=fb, channames="theta")
        grad = ex.input("mathCHOP", input=prev, preoff=-3, gain=2)
        adam.inputConnectors[0].connect(prev)
        adam.inputConnectors[1].connect(grad)
        ex.out(ex.op("trailCHOP", name="history", input=adam, wlength=300, wlengthunit="samples"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

29 個のオペレータ。sha256: `c5942a79f72f6a67…`
