<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/CubeRender/ -->

# CubeRender

`Geometry` フォルダのパレットです。

## 説明

立方体（Box SOP、1 辺 1）を、ライト付きのカメラで描いた画像を出す。回転・大きさ・カメラの位置と視野角をパラメータで変えられる。3D の向きや投影の確認、簡単な素材に使う。

入力: なし
出力: out1 画像 TOP（1280×720）

パラメータ

- Rotate (x, y, z): 立方体の回転（度）
- Scale (x, y, z): 立方体の大きさ
- Translate (x, y, z): カメラの位置（既定 0, 0, 5）
- Fov: カメラの視野角（既定 45°）

## ダウンロード

[CubeRender.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/CubeRender.tox) [使用例 CubeRenderExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/CubeRenderExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Rx` | Rotate | Parameter | XYZW | `0` | 0.0 … 1.0 |
| `Ry` | Rotate | Parameter | XYZW | `0` | 0.0 … 1.0 |
| `Rz` | Rotate | Parameter | XYZW | `0` | 0.0 … 1.0 |
| `Sx` | Scale | Parameter | XYZW | `1` | 0.0 … 1.0 |
| `Sy` | Scale | Parameter | XYZW | `1` | 0.0 … 1.0 |
| `Sz` | Scale | Parameter | XYZW | `1` | 0.0 … 1.0 |
| `Fov` | FOV Angle | Parameter | Float | `45` | 0.0 … 100.0 |
| `Tx` | Translate | Parameter | XYZW | `0` | 0.0 … 1.0 |
| `Ty` | Translate | Parameter | XYZW | `0` | 0.0 … 1.0 |
| `Tz` | Translate | Parameter | XYZW | `0` | 0.0 … 1.0 |

## 使用例

### 立方体を描く

![立方体を描く](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Geometry-CubeRender-example.png)

立方体を x に 30°、y に 45° 回して描いた例です。
出力は背景が透明なので、黒の上に重ねています。

ネットワーク: `CubeRender` (パレット: `Rx=30`, `Ry=45`) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `on_black` (overTOP) → `out1`

[CubeRenderExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/CubeRenderExample.toe)

??? note "手順(Geometry/CubeRender.example.py)"

    ```python
    """立方体を描く

    立方体を x に 30°、y に 45° 回して描いた例です。
    出力は背景が透明なので、黒の上に重ねています。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        on_black(ex, ex.palette(tox, Rx=30, Ry=45))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

31 個のオペレータ。sha256: `00706f7da78b9496…`
