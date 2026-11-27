<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/ThinDisk/ -->

# ThinDisk

`Simulation/Galaxy` フォルダのパレットです。

## 説明

薄い円盤状の点群（銀河の円盤など）。半径方向は指数分布（中心ほど密）、厚みは Height で、外側ほど厚くなる（Flare）。

入力: なし
出力: out1 POP（Points 個）

パラメータ

- Points: 点の数（既定 10000）
- Radius: 円盤の大きさ（指数分布の長さ、既定 1）
- Hscale / Height: 厚み（Height = Hscale × Radius）
- Flare: 外側ほど厚くなる度合い

## ダウンロード

[ThinDisk.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/ThinDisk.tox) [使用例 ThinDiskExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/ThinDiskExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | POP | `out1` | Points |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Points` | Points | Parameter | Int | `2000` | 0.0 … 10000.0 |
| `Radius` | Radius | Parameter | Float | `5` | 0.0001 … 10.0 |
| `Hscale` | Height Scale | Parameter | Float | `0.2` | 0.0 … 1.0 |
| `Height` | Height | Parameter | Float | `0` | 0.0 … 1.0 |
| `Flare` | Flare | Parameter | Float | `0.2` | 0.0 … 1.0 |

## 使用例

### 薄い円盤を斜めから見る

![薄い円盤を斜めから見る](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Simulation-Galaxy-ThinDisk-example.png)

ThinDisk の点群を、斜め上から点で描いた例です。中心ほど密で、外側ほど厚くなっています。

ネットワーク: `ThinDisk` (パレット: `Points=20000`, `Radius=1`) → `geo` (geometryCOMP: `rx=65`, `ry=0.0`) → `points` (pointspriteMAT: `pointsize=1`, `sizingmodel=const`, `colorr=0.7`, `colorg=0.85`, `colorb=1`) → `cam` (cameraCOMP: `tz=16`, `ty=0.0`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[ThinDiskExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/ThinDiskExample.toe)

??? note "手順(Simulation/Galaxy/ThinDisk.example.py)"

    ```python
    """薄い円盤を斜めから見る

    ThinDisk の点群を、斜め上から点で描いた例です。中心ほど密で、外側ほど厚くなっています。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import render_pop  # noqa: E402

    def build(ex, tox):
        d = ex.palette(tox, Points=20000, Radius=1)
        render_pop(ex, d, tz=16, rx=65, size=1, color=(0.7, 0.85, 1))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `0954708c283acaf3…`
