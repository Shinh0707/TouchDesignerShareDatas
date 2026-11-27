<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/GaussianAffinity/ -->

# GaussianAffinity

`Math` フォルダのパレットです。

## 説明

サンプルどうしの似ている度合いの行列（ガウス類似度）: 行列の (i, j) = exp(−(xᵢ − xⱼ)² / std(x))。N サンプルから N チャンネル × N サンプルを出す（対角は 1）。

入力: in1 CHOP（1 チャンネル、N サンプル）
出力: out1 N チャンネル × N サンプル（0〜1）

## ダウンロード

[GaussianAffinity.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/GaussianAffinity.tox) [使用例 GaussianAffinityExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/GaussianAffinityExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Vector |
| 出力 0 | CHOP | `out1` | Matrix / N×N |

## 使用例

### 似ている度合いの行列

![似ている度合いの行列](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-GaussianAffinity-example.svg)

5 つの値 0、1、2、3、10 の、どうしの似ている度合い(ガウス類似度、対角は 1)を出した例です。近い値どうしは 1 に近く、離れた 10 は、ほかとの類似度がほぼ 0 になります。チャンネル i が値 i の行です。

ネットワーク: `zeros` (patternCHOP: `channelname=x`, `wavetype=const`, `length=5`, `amp=0`) → `in0` (expressionCHOP: `expr0expr={'expr': '[0, 1, 2, 3, 10][me.sampleIndex]'}`) → `GaussianAffinity` (パレット) → `out1`

[GaussianAffinityExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/GaussianAffinityExample.toe)

??? note "手順(Math/GaussianAffinity.example.py)"

    ```python
    """似ている度合いの行列

    5 つの値 0、1、2、3、10 の、どうしの似ている度合い(ガウス類似度、対角は 1)を出した例です。近い値どうしは 1 に近く、離れた 10 は、ほかとの類似度がほぼ 0 になります。チャンネル i が値 i の行です。
    """

    def build(ex, tox):
        base = ex.op("patternCHOP", name="zeros", channelname="x", wavetype="const", length=5, amp=0)
        x = ex.input("expressionCHOP", input=base, expr0expr={"expr": "[0, 1, 2, 3, 10][me.sampleIndex]"})
        ex.palette(tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

20 個のオペレータ。sha256: `22a8e203629443ff…`
