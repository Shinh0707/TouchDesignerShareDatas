<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/pinholeRadtan/ -->

# pinholeRadtan

`UV` フォルダのパレットです。

## 説明

カメラのレンズ歪み（Brown-Conrady モデル: 半径方向 k1, k2 と接線方向 p1, p2）をかけた UV マップを作る。Remap TOP で画像に当てると、樽型・糸巻き型の歪みや、レンズの傾きによる歪みがかかる。

入力: in1 TOP（省略可。繋ぐとその解像度、繋がないと Resolution の解像度。中身は使わない）
出力: out1 歪んだ UV マップ（32 bit float、端は 0.01〜0.99 にクランプ）。焦点距離は幅の px 数、中心は Center × 幅・高さ

パラメータ

- Strength (x, y): 半径方向の歪み係数 k1, k2（正 = 糸巻き型、負 = 樽型）
- Tangent (x, y): 接線方向の歪み係数 p1, p2
- Center (x, y): 歪みの中心（0〜1、既定 0.5, 0.5）
- Resolution: 入力がないときの解像度（既定 256×256、h は w に連動）。以前の pinholeRadtan13 は Resolution 1200 にしたもの

## ダウンロード

[pinholeRadtan.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/pinholeRadtan.tox) [使用例 pinholeRadtanExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/pinholeRadtanExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Any / 解像度だけを使う(省略可) |
| 出力 0 | TOP | `out1` | UV |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Strengthx` | Strength | Parameters | XYZW | `0` | -1.0 … 1.0 |
| `Strengthy` | Strength | Parameters | XYZW | `0` | -1.0 … 1.0 |
| `Tangentx` | Tangent | Parameters | XYZW | `0` | 0.0 … 1.0 |
| `Tangenty` | Tangent | Parameters | XYZW | `0` | 0.0 … 1.0 |
| `Centerx` | Center | Parameters | XYZW | `0.5` | 0.0 … 1.0 |
| `Centery` | Center | Parameters | XYZW | `0.5` | 0.0 … 1.0 |
| `Resolutionw` | Resolution | Parameters | WH | `0` | 0.0 … 1.0 |
| `Resolutionh` | Resolution | Parameters | WH | `0` | 0.0 … 1.0 |

## 使用例

### 樽型のレンズ歪み

![樽型のレンズ歪み](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/UV-pinholeRadtan-example.png)

Strength を負にすると樽型(魚眼寄り)に歪みます。バナナの画像に Remap TOP で当てています。

ネットワーク: `in0` (moviefileinTOP) → `pinholeRadtan` (パレット: `Strength=[-0.35, 0.05]`) → `remap1` (remapTOP) → `out1`

[pinholeRadtanExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/pinholeRadtanExample.toe)

??? note "手順(UV/pinholeRadtan.example.py)"

    ```python
    """樽型のレンズ歪み

    Strength を負にすると樽型(魚眼寄り)に歪みます。バナナの画像に Remap TOP で当てています。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        uv = ex.palette(tox, img, Strength=(-0.35, 0.05))
        remap = ex.op("remapTOP", input=[img, uv])
        ex.out(remap)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## ほかの使用例

- [PinholeRadtanExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Projects/PinholeRadtanExample.toe)(手作りのサンプルプロジェクト)

21 個のオペレータ。sha256: `eff1cfb510e285d8…`
