<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/PeriodicTanh/ -->

# PeriodicTanh

`Math` フォルダのパレットです。

## 説明

角度の列を、なめらかな矩形波 tanh(k·sin θ) / tanh(k) にする（k = Constk が大きいほど矩形に近く、小さいほど正弦波に近い）。入力がなければ −半周〜半周の角度の列（1000 サンプル）を使う。

入力

- in1: 角度（省略可）
- in2: k（省略可。省略時は Constk）

出力: out1 −1〜1

パラメータ

- Angunit: 角度の単位（Degrees / Radians / Cycles）
- Constk: k

## ダウンロード

[PeriodicTanh.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/PeriodicTanh.tox) [使用例 PeriodicTanhExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/PeriodicTanhExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inRot` |  |
| 入力 1 | CHOP | `inK` |  |
| 出力 0 | CHOP | `out1` | Sequence |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Constk` | Constk | Parameter | Float | `1` | 0.0 … 10.0 |
| `Angunit` | Angle Unit | Parameter | Menu | `0` | `0` / `1` / `2` |

## 使用例

### なめらかな矩形波

![なめらかな矩形波](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-PeriodicTanh-example.svg)

角度の列(−半周〜半周、1000 サンプル)を tanh(k·sin θ) / tanh(k) にした例です。k = 0.5 ではほぼ正弦波、k = 3 で台形、k = 20 でほぼ矩形波になります。

ネットワーク: `PeriodicTanh` (パレット: `Constk=0.5`) → `k0_5` (renameCHOP: `renamefrom=*`, `renameto=k0_5`) → `PeriodicTanh1` (パレット: `Constk=3`) → `k3` (renameCHOP: `renamefrom=*`, `renameto=k3`) → `PeriodicTanh2` (パレット: `Constk=20`) → `k20` (renameCHOP: `renamefrom=*`, `renameto=k20`) → `curves` (mergeCHOP) → `out1`

[PeriodicTanhExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/PeriodicTanhExample.toe)

??? note "手順(Math/PeriodicTanh.example.py)"

    ```python
    """なめらかな矩形波

    角度の列(−半周〜半周、1000 サンプル)を tanh(k·sin θ) / tanh(k) にした例です。k = 0.5 ではほぼ正弦波、k = 3 で台形、k = 20 でほぼ矩形波になります。
    """

    def build(ex, tox):
        curves = []
        for k in (0.5, 3, 20):
            c = ex.palette(tox, Constk=k)
            curves.append(ex.op("renameCHOP", name="k%s" % str(k).replace(".", "_"), input=c, renamefrom="*",
                                renameto="k%s" % str(k).replace(".", "_")))
        ex.out(ex.op("mergeCHOP", name="curves", input=curves))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

12 個のオペレータ。sha256: `e88a1408805c5e7d…`
