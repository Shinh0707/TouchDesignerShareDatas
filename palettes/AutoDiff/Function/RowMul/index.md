<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/RowMul/ -->

# RowMul

`AutoDiff/Function` フォルダのパレットです。

## 説明

2 つの CHOP をチャンネルごとに掛けて、サンプルについて足す（行ごとの内積）。y_c = Σ_s a_cs · b_cs。DL2Norm などの中で使う。

入力

- in1: CHOP
- in2: CHOP（in1 と同じ形）

出力: out1 チャンネルごとの内積（1 サンプル）

## ダウンロード

[RowMul.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/RowMul.tox) [使用例 RowMulExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/RowMulExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 入力 1 | CHOP | `in2` | Any |
| 出力 0 | CHOP | `out1` | Any |

## 使用例

### 行ごとの内積

![行ごとの内積](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Function-RowMul-example.svg)

2 チャンネルの正弦波と、同じ形の波(各 32 サンプル)を、チャンネルごとに掛けて足した例です(行ごとの内積、2 チャンネル × 1 サンプル)。DL2Norm の中で長さを求めるのに使っています。

ネットワーク: `in0` (patternCHOP: `channelname=r0 r1`, `wavetype=sin`, `length=32`) → `in1` (patternCHOP: `channelname=r0 r1`, `wavetype=sin`, `length=32`, `amp=0.5`) → `RowMul` (パレット) → `out1`

[RowMulExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/RowMulExample.toe)

??? note "手順(AutoDiff/Function/RowMul.example.py)"

    ```python
    """行ごとの内積

    2 チャンネルの正弦波と、同じ形の波(各 32 サンプル)を、チャンネルごとに掛けて足した例です(行ごとの内積、2 チャンネル × 1 サンプル)。DL2Norm の中で長さを求めるのに使っています。
    """

    def build(ex, tox):
        a = ex.input("patternCHOP", channelname="r0 r1", wavetype="sin", length=32)
        b = ex.input("patternCHOP", channelname="r0 r1", wavetype="sin", length=32, amp=0.5)
        ex.palette(tox, a, b)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `9987f334894936c7…`
