<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/PlanckianLocus/ -->

# PlanckianLocus

`Visualize` フォルダのパレットです。

## 説明

黒体放射の色（色温度）の横グラデーション。横軸は 1667 K（左端）〜 25000 K（右端）の等間隔で、6500 K（昼光の白）が 0.207 の位置。色は Planckian locus の色度（Kim らの近似式）を sRGB（D65）に変換し、いちばん大きいチャンネルを 1 にしたもの（sRGB のガンマ済み）。色温度を色に変える参照表として、Lookup TOP の表に使える。

入力: in1 TOP（省略可。繋ぐとその解像度、繋がないと Resolution の解像度）
出力: out1 色温度のグラデーション（32 bit float）

パラメータ

- Resolution: 入力がないときの解像度（既定 256×256、h は w に連動）

## ダウンロード

[PlanckianLocus.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/PlanckianLocus.tox) [使用例 PlanckianLocusExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/PlanckianLocusExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Any / 解像度だけを使う(省略可) |
| 出力 0 | TOP | `out1` | Image / 左 1667 K 〜 右 25000 K（等間隔）, range: [0, 1] |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Resolutionw` | Resolution | Parameter | WH | `256` | 0.0 … 2048.0 |
| `Resolutionh` | Resolution | Parameter | WH | `256` | 0.0 … 2048.0 |

## 使用例

### 色温度のグラデーション

![色温度のグラデーション](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Visualize-PlanckianLocus-example.png)

1667 K(左端)から 25000 K(右端)までの黒体放射の色です。Lookup TOP の表に使うと、0〜1 の値を色温度の色に変えられます。

ネットワーク: `PlanckianLocus` (パレット: `Resolution=[720, 720]`) → `out1`

[PlanckianLocusExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/PlanckianLocusExample.toe)

??? note "手順(Visualize/PlanckianLocus.example.py)"

    ```python
    """色温度のグラデーション

    1667 K(左端)から 25000 K(右端)までの黒体放射の色です。Lookup TOP の表に使うと、0〜1 の値を色温度の色に変えられます。
    """

    def build(ex, tox):
        ex.palette(tox, Resolution=(720, 720))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `890379a952dd788b…`
