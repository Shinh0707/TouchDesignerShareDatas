<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/Loxodrome/ -->

# Loxodrome

`Geometry` フォルダのパレットです。

## 説明

ロクソドローム（球面上の等角航路のらせん）をもとにした曲線の座標を出す。半径 R、経度の角度 T、傾き A から、x = R·cos T / cosh(A·T)、y = R·sin T / cosh(A·T)、z = R·tanh(P·sin(A·T)) / tanh(P)（PeriodicTanh）。z を周期的にしているので、極に巻きついたあと戻ってくる。本来のロクソドロームの z = R·tanh(A·T) とは違うので、点は球面にちょうどは乗らない。

入力

- inR: 半径
- inT: 角度
- inA: 傾き（大きいほど早く極へ巻きつく）
- inP: PeriodicTanh の k

出力: outX, outY, outZ

パラメータ

- Angunit: 角度の単位（Degrees / Radians / Cycles）

## ダウンロード

[Loxodrome.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/Loxodrome.tox) [使用例 LoxodromeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/LoxodromeExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inR` | Any |
| 入力 1 | CHOP | `inT` | Sequence |
| 入力 2 | CHOP | `inA` | Any |
| 入力 3 | CHOP | `inP` | Any |
| 出力 0 | CHOP | `outX` | Sequence |
| 出力 1 | CHOP | `outY` | Sequence |
| 出力 2 | CHOP | `outZ` | Sequence |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Angunit` | Angle Unit | Parameter | Menu | `0` | `0` / `1` / `2` |

## 使用例

### ロクソドロームの曲線

![ロクソドロームの曲線](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-Loxodrome-example.svg)

半径 R = 1、角度 T = 0〜1080°(3 周)、傾き A = 0.2、PeriodicTanh の k = P = 2 の曲線の x, y, z を出した例です(Angunit = Degrees)。x, y は回りながら小さくなり、z は 0 から極へ向かってから戻ってきます。

ネットワーク: `in0` (constantCHOP: `const0name=R`, `const0value=1`) → `in1` (patternCHOP: `channelname=T`, `wavetype=ramp`, `length=600`, `torange=[0, 1080]`) → `in2` (constantCHOP: `const0name=A`, `const0value=0.2`) → `in3` (constantCHOP: `const0name=P`, `const0value=2`) → `Loxodrome` (パレット: `Angunit=0`) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `z` (renameCHOP: `renamefrom=*`, `renameto=z`) → `xyz` (mergeCHOP) → `out1`

[LoxodromeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/LoxodromeExample.toe)

??? note "手順(Geometry/Loxodrome.example.py)"

    ```python
    """ロクソドロームの曲線

    半径 R = 1、角度 T = 0〜1080°(3 周)、傾き A = 0.2、PeriodicTanh の k = P = 2 の曲線の x, y, z を出した例です(Angunit = Degrees)。x, y は回りながら小さくなり、z は 0 から極へ向かってから戻ってきます。
    """

    def build(ex, tox):
        r = ex.input("constantCHOP", const0name="R", const0value=1)
        t = ex.input("patternCHOP", channelname="T", wavetype="ramp", length=600, torange=(0, 1080))
        a = ex.input("constantCHOP", const0name="A", const0value=0.2)
        p = ex.input("constantCHOP", const0name="P", const0value=2)
        lx = ex.palette(tox, r, t, a, p, Angunit="0")
        parts = [ex.op("renameCHOP", name=n, input=lx.op("out" + n.upper()), renamefrom="*", renameto=n) for n in "xyz"]
        ex.out(ex.op("mergeCHOP", name="xyz", input=parts))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

28 個のオペレータ。sha256: `b7b05c3c204a9c17…`
