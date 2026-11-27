<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/InverseStereographicProjection/ -->

# InverseStereographicProjection

`Geometry` フォルダのパレットです。

## 説明

3 次元の点を 3 次元球面 S³（4 次元の単位球面）の上に持ち上げる（逆立体射影）: (2x, |x|² − 1) / (|x|² + 1)。4D で回転させてから StereographicProjection で 3D に戻す使い方をする。

入力: in1 POP（Target 属性 = 3 成分、既定 P）
出力: out1 POP（Output 属性 = 4 成分、既定 P4）

## ダウンロード

[InverseStereographicProjection.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/InverseStereographicProjection.tox) [使用例 InverseStereographicProjectionExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/InverseStereographicProjectionExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | POP | `in1` | Points / Target（3 成分） |
| 出力 0 | POP | `out1` | Points / Output（4 成分の P4） |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Target` | Target | Parameter | Str | `P` |  |
| `Output` | Output | Parameter | Str | `P4` |  |

## 使用例

### 3 次元の点を 4 次元の球面へ

![3 次元の点を 4 次元の球面へ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-InverseStereographicProjection-example.svg)

x 軸の上の 9 点(−4〜4)を、逆立体射影で 3 次元球面 S³ の上に持ち上げた例です。出力 P4 の 4 成分を並べています。原点は南極 (0, 0, 0, −1)、x = ±1 は赤道 (±1, 0, 0, 0)、遠い点ほど北極 (0, 0, 0, 1) に近づき、どの点も長さ 1 です。

ネットワーク: `in0` (gridPOP: `surftype=none`, `sizex=8`, `sizey=0`, `cols=9`, `rows=1`) → `InverseStereographicProjection` (パレット) → `p4` (poptoCHOP: `pop=out1`, `attribscope=P4`) → `out1`

[InverseStereographicProjectionExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/InverseStereographicProjectionExample.toe)

??? note "手順(Geometry/InverseStereographicProjection.example.py)"

    ```python
    """3 次元の点を 4 次元の球面へ

    x 軸の上の 9 点(−4〜4)を、逆立体射影で 3 次元球面 S³ の上に持ち上げた例です。出力 P4 の 4 成分を並べています。原点は南極 (0, 0, 0, −1)、x = ±1 は赤道 (±1, 0, 0, 0)、遠い点ほど北極 (0, 0, 0, 1) に近づき、どの点も長さ 1 です。
    """

    def build(ex, tox):
        pts = ex.input("gridPOP", surftype="none", sizex=8, sizey=0, cols=9, rows=1)
        s = ex.palette(tox, pts)
        ex.out(ex.op("poptoCHOP", name="p4", pop=s.op("out1"), attribscope="P4"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `2e9373f83a42efe5…`
