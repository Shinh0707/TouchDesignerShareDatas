日本語 | [English](./README.en.md)

# Touch Designer Plugins  
自作したTouchDesigner用の追加機能などを置いてます.  

**プラグインのダウンロード・説明・パラメータ一覧はサイトにまとめています → [TouchDesigner Plugins](https://shinh0707.github.io/TouchDesignerShareDatas/)**  
- [Palette](#palette)  
- [Plugin](#plugin)  
	- [導入](#plugin導入)  
	- [説明](#plugin説明)  
		- [CHOP](#chop)
		- [TOP](#top)
  
## Palette  
TouchDesignerの左側のタブにあるプリセットみたいなやつです.  
![Paletteタブ](doc/Palette.png "Paletteの画像")  
  
<!-- tdp:palettes:begin (tools/palettes.py) -->
[サイトのパレット一覧](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/)に、説明・パラメータ・使用例・依存プラグインがあります。
`.tox` をネットワークにドラッグ & ドロップして使います。*詳細は[https://derivative.ca/UserGuide/Palette](https://derivative.ca/UserGuide/Palette)を確認してください*

- [AudioQuantizeRate](Palettes/Audio/Feature/AudioQuantizeRate.tox) — オーディオが Q ビットの段（±1 を 2^Q − 1 段に分けた格子）にどれだけ乗っているか（ビットクラッシュ・ローフ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/AudioQuantizeRate/), [使用例](Palettes/Audio/Feature/AudioQuantizeRateExample.toe))
- [CrestFactor](Palettes/Audio/Feature/CrestFactor.tox) — クレストファクター（ピーク ÷ RMS）。音のとがり具合（打撃音ほど大きく、正弦波で √2 ≈ 1.41、矩形波で 1）… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/CrestFactor/), [使用例](Palettes/Audio/Feature/CrestFactorExample.toe))
- [VU](Palettes/Audio/Feature/VU.tox) — VU メーター。整流した信号を 2 次のフィルタ（減衰比 Dump、固有角周波数 Angf：VU 規格の約 300 ms… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/VU/), [使用例](Palettes/Audio/Feature/VUExample.toe))
- [ZCR](Palettes/Audio/Feature/ZCR.tox) — ゼロ交差率（隣り合うサンプルで符号が変わる割合）。ノイズや高い音ほど大きく、低い音ほど小さい。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/ZCR/), [使用例](Palettes/Audio/Feature/ZCRExample.toe))
- [SpectralFlatness](Palettes/Audio/Spectrum/SpectralFlatness.tox) — スペクトル平坦度（ノイズらしさ）。エネルギー E_k = |X_k|² の幾何平均 ÷ 算術平均で、0（純音・音程感が強… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralFlatness/), [使用例](Palettes/Audio/Spectrum/SpectralFlatnessExample.toe))
- [PanAngleStereo](Palettes/Audio/Stereo/PanAngleStereo.tox) — PanAngle の、L と R を別々の CHOP で受ける版。2 つのモノラル信号のどちらが大きいかを −1〜1 で… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PanAngleStereo/), [使用例](Palettes/Audio/Stereo/PanAngleStereoExample.toe))
- [PhaseCorrelation](Palettes/Audio/Stereo/PhaseCorrelation.tox) — 位相相関計（コリレーションメーター）。左右がどれだけ同じ形かを −1〜1 で出す: Σ L·R / √(Σ L² · Σ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PhaseCorrelation/), [使用例](Palettes/Audio/Stereo/PhaseCorrelationExample.toe))
- [StereoWidth](Palettes/Audio/Stereo/StereoWidth.tox) — ステレオの広がり。Side（L−R）と Mid（L+R）のエネルギーから ΣS² / (ΣS² + ΣM²) を出す。0… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/StereoWidth/), [使用例](Palettes/Audio/Stereo/StereoWidthExample.toe))
- [4DTorus](Palettes/Geometry/4DTorus.tox) — 4 次元のトーラス（クリフォードトーラス風）を 3 次元に射影した点群。4D の 2 つの面（xw と zw）で回転させ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/4DTorus/), [使用例](Palettes/Geometry/4DTorusExample.toe))
- [CrossFade](Palettes/Image/Effect/CrossFade.tox) — 映像の残像・なめらかさ（時間方向のクロスフェード）。前のフレームの結果と今の入力を Crsr の割合で混ぜ続ける（フィー… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CrossFade/), [使用例](Palettes/Image/Effect/CrossFadeExample.toe))
- [CurlNoise](Palettes/Image/Effect/CurlNoise.tox) — カールノイズの流れで画像を流す（液体・煙のように渦を巻いて流れる歪み）。ポテンシャル（ノイズ画像）の勾配を 90° 回し… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CurlNoise/), [使用例](Palettes/Image/Effect/CurlNoiseExample.toe))
- [CurlNoiseFlow](Palettes/Image/Effect/CurlNoiseFlow.tox) — カールノイズの流れで画像を流す（Image/Effect/CurlNoise の発展版）。ポテンシャルを 0〜1 に正規… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CurlNoiseFlow/), [使用例](Palettes/Image/Effect/CurlNoiseFlowExample.toe))
- [ShiftRGB](Palettes/Image/Effect/ShiftRGB.tox) — RGB を別々にずらして重ねる（色収差・RGB ずれのグリッチ）。R・G・B をそれぞれ Shift の x, y だけ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/ShiftRGB/), [使用例](Palettes/Image/Effect/ShiftRGBExample.toe))
- [SoftFade](Palettes/Image/Effect/SoftFade.tox) — 残像のエフェクト。画面の変化したところだけ（重ねた結果との差が大きい所）を、残像のようにやわらかく重ねていく。Freez… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/SoftFade/), [使用例](Palettes/Image/Effect/SoftFadeExample.toe))
- [Dilation](Palettes/Image/Filter/Dilation.tox) — 2 値画像の膨張（モルフォロジー）。白い部分を 1 px 太らせる（3×3 の近くに白があれば白）。マスクの穴埋めや、細… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Dilation/), [使用例](Palettes/Image/Filter/DilationExample.toe))
- [Erosion](Palettes/Image/Filter/Erosion.tox) — 2 値画像の収縮（モルフォロジー）。白い部分を 1 px 細らせる（3×3 がすべて白のときだけ白）。マスクの小さなゴミ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Erosion/), [使用例](Palettes/Image/Filter/ErosionExample.toe))
- [Sobel](Palettes/Image/Filter/Sobel.tox) — Sobel フィルタで縁（明るさの勾配）を出す。Sobelx で横方向の勾配 Gx、Sobely で縦方向の勾配 Gy、… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Sobel/), [使用例](Palettes/Image/Filter/SobelExample.toe))
- [BeatBase](Palettes/Sequence/BeatBase.tox) — ドラムのステップシーケンサーの 1 パート。時間（in1、秒）から、拍子・細分化・スウィング・ユークリッドリズムで決まる… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Sequence/BeatBase/), [使用例](Palettes/Sequence/BeatBaseExample.toe))
- [Boid](Palettes/Simulation/Boid/Boid.tox) — ボイド（群れのシミュレーション）。Points 個の点を円の上に置き、ランダムな速度を与えて、フィードバックで毎フレーム… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/Boid/), [使用例](Palettes/Simulation/Boid/BoidExample.toe))
- [GalaxyBase](Palettes/Simulation/Galaxy/GalaxyBase.tox) — 銀河の初期状態の点群。中心のバルジ（球状、全体の Bulgerate の割合）と、ThinDisk で作る円盤から成る。… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/GalaxyBase/), [使用例](Palettes/Simulation/Galaxy/GalaxyBaseExample.toe))
- [ThinDisk](Palettes/Simulation/Galaxy/ThinDisk.tox) — 薄い円盤状の点群（銀河の円盤など）。半径方向は指数分布（中心ほど密）、厚みは Height で、外側ほど厚くなる（Fla… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/ThinDisk/), [使用例](Palettes/Simulation/Galaxy/ThinDiskExample.toe))
- [GrayScott](Palettes/Simulation/ReactionDiffusion/GrayScott.tox) — Gray-Scott 反応拡散のシミュレーション。2 種類の物質 u, v が拡散しながら反応する式（∂u/∂t = D… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/ReactionDiffusion/GrayScott/), [使用例](Palettes/Simulation/ReactionDiffusion/GrayScottExample.toe))
- [PrintGalleryUV](Palettes/UV/PrintGalleryUV.tox) — エッシャー「版画画廊」風の、ドロステ効果（無限に入れ子になる渦）の UV マップ。対数極座標で画像をらせん状に繰り返す。… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/PrintGalleryUV/), [使用例](Palettes/UV/PrintGalleryUVExample.toe))
- [RTheta](Palettes/UV/RTheta.tox) — 極座標マップ。r チャンネルに中心からの距離、g チャンネルに角度（0〜1 で一周）を入れた画像を作る。Remap に使… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/RTheta/), [使用例](Palettes/UV/RThetaExample.toe))
- [identifyUV](Palettes/UV/identifyUV.tox) — 恒等 UV マップ（各ピクセルに自分の座標を入れた画像）を作る。r = u（左 0 → 右 1）、g = v（下 0 →… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/identifyUV/), [使用例](Palettes/UV/identifyUVExample.toe))
- [lineDrawer](Palettes/UV/lineDrawer.tox) — 点列 CHOP を折れ線として画像の上に描く（GLSL）。Start〜End で線全体の長さのどの区間を描くかを決めるの… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/lineDrawer/), [使用例](Palettes/UV/lineDrawerExample.toe))
- [mandalaUV](Palettes/UV/mandalaUV.tox) — 万華鏡（マンダラ）状の UV マップ。角度を鏡映しながら N 回くり返した値を r に、中心からの距離を折り返した値を … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/mandalaUV/), [使用例](Palettes/UV/mandalaUVExample.toe))
- [pinholeRadtan](Palettes/UV/pinholeRadtan.tox) — カメラのレンズ歪み（Brown-Conrady モデル: 半径方向 k1, k2 と接線方向 p1, p2）をかけた U… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/pinholeRadtan/), [使用例](Palettes/UV/pinholeRadtanExample.toe))
- [ChannelLissajous](Palettes/Visualize/ChannelLissajous.tox) — CHOP の 1 番目のチャンネルを x、2 番目を y にして点を線で結んだ図（XY スコープ）を描く。タイムスライス… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/ChannelLissajous/), [使用例](Palettes/Visualize/ChannelLissajousExample.toe))
- [Goniometer](Palettes/Visualize/Goniometer.tox) — ゴニオメーター（ステレオの位相・広がりを見るスコープ）。L−R を横、L+R を縦にして（1/√2 倍で 45° 回した… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/Goniometer/), [使用例](Palettes/Visualize/GoniometerExample.toe))
- [HzLissajousAnimated](Palettes/Visualize/HzLissajousAnimated.tox) — Lissajous の、位相が時間で回る版。x と y の位相を、それぞれの周波数（in1, in2 の値）の速さで進め… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/HzLissajousAnimated/), [使用例](Palettes/Visualize/HzLissajousAnimatedExample.toe))
- [Lissajous](Palettes/Visualize/Lissajous.tox) — 2 つの値を x と y の周波数比にしたリサジュー図形を描く: x = cos(2π·a·t)、y = sin(2π·… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/Lissajous/), [使用例](Palettes/Visualize/LissajousExample.toe))
- [PlanckianLocus](Palettes/Visualize/PlanckianLocus.tox) — 黒体放射の色（色温度）の横グラデーション。横軸は 1667 K（左端）〜 25000 K（右端）の等間隔で、6500 K… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/PlanckianLocus/), [使用例](Palettes/Visualize/PlanckianLocusExample.toe))
<!-- tdp:palettes:end -->
  
  
## Plugin  
TouchDesignerのオリジナルノードみたいなやつです.  
上手く導入できるとOperatorの選択ウィンドウの`Custom`タブに追加されます.  
![プラグイン導入後のOperator選択ウィンドウ](doc/Plugin.png "Pluginの画像")  
  
### Plugin導入  
1. [ダウンロードページ](https://shinh0707.github.io/TouchDesignerShareDatas/downloads/)(または [Releases](https://github.com/Shinh0707/TouchDesignerShareDatas/releases/latest))から、使いたいプラグインの zip を OS に合わせて選びます.  
	全部まとめた `TDPlugins-<version>-<mac|windows>.zip` もあります.  
2. zip を展開して, 中の `.plugin`(Mac)/ `.dll`(Windows)を次の場所に置きます.  
	- Windows: `Documents/Derivative/Plugins`(`C:/Users/<username>/Documents/Derivative/Plugins`)  
	- Mac: `/Users/<username>/Library/Application Support/Derivative/TouchDesigner099/Plugins`  
3. TouchDesignerを再起動します.  

Mac版・Windows版とも, それぞれの OS 上でビルドし自動テストを通したものです.  
以前このリポジトリの `Plugins` フォルダに置いていた旧版は削除しました(Windows 用の DLL が実際には Mac 用で動かなかったため). 上のダウンロードページから取得してください.  
  
*詳細は[https://docs.derivative.ca/Custom_Operators](https://docs.derivative.ca/Custom_Operators)を確認してください*  
  
### Plugin説明  
#### CHOP
1. [`DotCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/)  
	CHOP同士の内積をとります.  
	使用例: [DotProductCHOPExample.toe](Projects/DotProductCHOPExample.toe "DotProductCHOP使用例")  
2. [`GranularCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GranularCHOP/)
	CHOPに簡易的なグラニュラー効果をかけます.  
	２段階かけるといい感じになります.  
	使用例1: [TouchDesigner Plugin "Granular"](https://youtu.be/0uRVfFLauyg "TouchDesigner Plugin Granular YouTube")  
	使用例2: [GranularCHOPExample.toe](Projects/GranularCHOPExample.toe "GranularCHOP使用例")  
3. [`HistogramCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HistogramCHOP/)  
	CHOPのヒストグラムを計算します.  
	使用例: [HistogramCHOPExample.toe](Projects/HistogramCHOPExample.toe "HistogramCHOP使用例")  
4. [`MIDIFileInCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/MidiFileInCHOP/)  
	MIDIファイルを手軽に読めます.(`MIDI In`より機能が少なく、簡単に使えます)  
5. [`SoundFontSynthCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/SoundFontSynthCHOP/)  
	SoundFontファイルを再生します.`MIDIFileInCHOP`と一緒に使うことを想定しています.  
6. [`BLEInCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BLEInCHOP/)  
	BLE（Bluetooth Low Energy）デバイスからカンマ区切りの数値列（例: `123,0.5,3.212`）としてフォーマットされた
	ASCII文字列を受信し、それらをCHOPチャンネルとして出力します.  
	[SimpleBLE](https://github.com/simpleble/simpleble)ライブラリを使用しています.(Mac版のみ)
7. [`LifeGameCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameCHOP/)  
	ライフゲームを動かし, 盤面の各行をチャンネルとして出力します. ランダムな発生・消滅の確率も設定できます.  
8. [`Im2ColCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) / [`Col2ImCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/)  
	画像状に並べたCHOPの値を, 畳み込み用のパッチ列に並べ替えます(im2col)/ 元に戻します(col2im).  
  
#### TOP
1. [`BasicBlockGlitchTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BasicBlockGlitchTOP/)  
	画像をタイル状にバラバラにします. 逐次動かすこともできます.  
	使用例: [BasicBlockGlitchTOPExample.toe](Projects/BasicBlockGlitchTOPExample.toe)  
	![BasicBlockGlitchTOPの適用後](doc/BasicBlockGlitchTOPExample.png "BasicBlockGlitchTOP適用後")  
2. [`BlockNoiseTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BlockNoiseTOP/)  
	四角いノイズ乗っけるだけです. `TOP > Noise`でもいいと思います.  
	使用例: [BlockNoiseTOPExample.toe](Projects/BlockNoiseTOPExample.toe)  
	![BlockNoiseTOPの適用後](doc/BlockNoiseTOPExample.png "BlockNoiseTOP適用後")  
3. [`BitCrushTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitCrushTOP/)  
	画像の色をBit単位で量子化します. 古めの映像とかを表現できます.  
	使用例: [BitCrushTOPExample.toe](Projects/BitCrushTOPExample.toe)  
	![BitCrushTOPの適用後](doc/BitCrushTOPExample.png "BitCrushTOP適用後")  
4. [`PixcelSorterGlitchTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/)  
	Kim Asendorf氏の[ASDFPixelSort](https://github.com/kimasendorf/ASDFPixelSort)を参考に, PixcelSortingをTouchDesignerのプラグイン化したものです.(Black,Brightness,R,G,B,RGBMaxのモードを選択できます)  
	使用例: [PixcelSorterGlitchTOPExample.toe](Projects/PixcelSorterGlitchTOPExample.toe)  
	![PixcelSorterGlitchTOPの適用後](doc/PixcelSorterGlitchTOPExample.png "PixcelSorterGlitchTOP適用後")  
5. [`FlipnoteTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/FlipnoteTOP/)  
	画質・アスペクト比・画像コンテンツを「うごくメモ帳」風にします. DSi/3DS版を選べます.  
	参考程度に, DitherLevelsを動かすと点々の密度, DitherLumaThresholdを動かすと鮮やかさが変わり, Edge系パラメータを動かすと輪郭の強調を制御できます. 多くの画像で共通で良い結果が得られるパラメータのセットは見つかってません.  
	Operatorのパラメータ設定画面の`Common > Viewer Smoothness`を`Nearist Pixcel`にすると, 更に見た目が「うごくメモ帳」らしくなります.  
	使用例: [FlipnoteTOPExample.toe](Projects/FlipnoteTOPExample.toe)  
	![FlipnoteTOPの適用後](doc/FlipnoteTOPExample.png "FlipnoteTOP適用後")
6. [`InstanceTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/InstanceTOP/)  
	入力画像を複製してCHOPで変形して重ねるプラグイン.  
	使用例: [InstanceTOPExample.toe](Projects/InstanceTOPExample.toe)  
	![InstanceTOPの適用後](doc/InstanceTOP.png "FlipnoteTOP適用後")