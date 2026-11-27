<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/RTheta/ -->

# RTheta

`UV` フォルダのパレットです。

## 説明

極座標マップ。r チャンネルに中心からの距離、g チャンネルに角度（0〜1 で一周）を入れた画像を作る。Remap に使うと画像を極座標に展開でき、ramp や GLSL の入力にすると円・放射状の模様が作れる。

入力: なし
出力: out1 r = 半径（中心 0、ramp の端で √2）、g = 角度/2π（解像度 Resolution、32 bit float）

パラメータ

- Resolution: 解像度（既定 1024×1024、h は w に連動）

## ダウンロード

[RTheta.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/RTheta.tox) [使用例 RThetaExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/RThetaExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | TOP | `out1` | UV / r = 中心からの距離、g = 角度/2π, range: [0, 1.4143] |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Resolutionw` | Resolution | Parameter | WH | `256` | 128.0 … 2048.0 |
| `Resolutionh` | Resolution | Parameter | WH | `256` | 128.0 … 2048.0 |

## 使用例

### 極座標で放射状の縞

![極座標で放射状の縞](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/UV-RTheta-example.png)

RTheta を Remap TOP の UV にして、縦の縞(Ramp TOP)を当てた例です。Remap は g(角度)で縦方向を引くので、縞が放射状に並びます。横方向に模様を置くと、r(中心からの距離)で同心円になります。

ネットワーク: `RTheta` (パレット: `Resolution=[720, 720]`) → `ramp1` (rampTOP: `type=vertical`, `period=0.0625`, `extendright=repeat`, `resolutionw=1`, `resolutionh=256`) → `remap1` (remapTOP: `outputresolution=custom`, `resolutionw=720`, `resolutionh=720`) → `out1`

[RThetaExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/RThetaExample.toe)

??? note "手順(UV/RTheta.example.py)"

    ```python
    """極座標で放射状の縞

    RTheta を Remap TOP の UV にして、縦の縞(Ramp TOP)を当てた例です。Remap は g(角度)で縦方向を引くので、縞が放射状に並びます。横方向に模様を置くと、r(中心からの距離)で同心円になります。
    """

    def build(ex, tox):
        uv = ex.palette(tox, Resolution=(720, 720))
        stripes = ex.op("rampTOP", type="vertical", period=0.0625, extendright="repeat",
                        resolutionw=1, resolutionh=256)
        ex.out(ex.op("remapTOP", input=[stripes, uv], outputresolution="custom", resolutionw=720, resolutionh=720))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `230a829013bbef2d…`
