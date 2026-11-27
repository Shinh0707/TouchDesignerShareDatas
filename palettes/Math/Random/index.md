<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Random/ -->

# Random

`Math` フォルダのパレットです。

## 説明

乱数の行列（Sizeh チャンネル × Sizew サンプル。TOP と同じく w が横 = サンプル、h が縦 = チャンネル）。Mode 0 で一様乱数（Min〜Max）、Mode 1 で正規乱数（平均 Avg、分散 Var。ボックス＝ミュラー法）。

入力: なし（in に繋ぐと、その形を使う）
出力: out1 乱数

パラメータ

- Size: 大きさ（w = サンプル数、h = チャンネル数）
- Seed: 乱数の種
- Mode: Uniform（一様）/ Normal（正規）
- Min / Max: 一様乱数の範囲
- Avg / Var: 正規乱数の平均と分散

## ダウンロード

[Random.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Random.tox) [使用例 RandomExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/RandomExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inSize` |  |
| 出力 0 | CHOP | `out1` | Matrix / Sizeh チャンネル × Sizew サンプル |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Sizew` | Size | Parameter | WH | `100` | 1.0 … 500.0 |
| `Sizeh` | Size | Parameter | WH | `1` | 1.0 … 500.0 |
| `Seed` | Seed | Parameter | Float | `0` | 0.0 … 1.0 |
| `Min` | Min | Parameter | Float | `0` | -1.0 … 1.0 |
| `Max` | Max | Parameter | Float | `1` | -1.0 … 1.0 |
| `Avg` | Average | Parameter | Float | `0` | -1.0 … 1.0 |
| `Var` | Variance | Parameter | Float | `1` | 0.0 … 1.0 |
| `Mode` | Mode | Parameter | Menu | `0` | `0` / `1` |

## 使用例

### 乱数の行列

![乱数の行列](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Random-example.svg)

Sizew=64・Sizeh=4 で、4 チャンネル × 64 サンプルの一様乱数(Min=−1〜Max=1)を作った例です。

ネットワーク: `Random` (パレット: `Sizew=64`, `Sizeh=4`, `Min=-1`, `Max=1`) → `out1`

[RandomExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/RandomExample.toe)

??? note "手順(Math/Random.example.py)"

    ```python
    """乱数の行列

    Sizew=64・Sizeh=4 で、4 チャンネル × 64 サンプルの一様乱数(Min=−1〜Max=1)を作った例です。
    """

    def build(ex, tox):
        ex.palette(tox, Sizew=64, Sizeh=4, Min=-1, Max=1)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

21 個のオペレータ。sha256: `9ccef9806997fe1b…`
