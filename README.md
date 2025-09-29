# Touch Designer Plugins  
自作したTouchDesigner用の追加機能などを置いてます.  
- [Palette](#palette)  
	- [導入](#palette導入)  
	- [説明](#palette説明)  
- [Plugin](#plugin)  
	- [導入](#plugin導入)  
	- [説明](#plugin説明)  
		- [CHOP](#chop)
		- [TOP](#top)
  
## Palette  
TouchDesignerの左側のタブにあるプリセットみたいなやつです.  
![Paletteタブ](doc/Palette.png "Paletteの画像")  
  
### Palette導入  
[Palettes](Palettes)の中から使いたい`.tox`ファイルを選んでプロジェクト内にDrag＆Dropで使うことができます.  
  
*詳細は[https://derivative.ca/UserGuide/Palette](https://derivative.ca/UserGuide/Palette)を確認してください*  
  
### Palette説明
1. [identifyUV](Palette/identifyUV.tox)  
	初期状態のUVです.
2. [mandrauv](Palette/mandrauv.tox)  
	曼荼羅模様(シンメトリーな幾何学模様)を簡単に作れるUVです.  
	使用例: [MandraExample.toe](Projects/MandraExample.toe)  
3. [pinholeRadtan](Palette/pinholeRadtan.tox)  
	画像の一部を膨張/縮小するUVです.  
	使用例: [PinholeRadtanExample.toe](Projects/PinholeRadtanExample.toe)  
4. [lineDrawer](Palette/lineDrawer.tox)  
	CHOPで座標と色を指定して線を描画します.  
	![lineDrawer](doc/LineDrawer.png)  
	使用例: [LineDrawerExample.toe](Projects/LineDrawerExample.toe "LineDrawerの使用例")  
  
## Plugin  
TouchDesignerのオリジナルノードみたいなやつです.  
上手く導入できるとOperatorの選択ウィンドウの`Custom`タブに追加されます.  
![プラグイン導入後のOperator選択ウィンドウ](doc/Plugin.png "Pluginの画像")  
  
### Plugin導入  
- Windows  
	[Plugins/Windows](Plugins/Windows)内から使いたいプラグイン(`.dll`)ファイルを選び  
	`Documents/Derivative/Plugins`  
	もしくは、  
	`C:/Users/<username>/Documents/Derivative/Plugins`  
	内に配置する  
- Mac  
	[Plugins/Mac](Plugins/Mac)内から使いたいプラグイン(`.plugin`)ファイルを選び  
	`/Users/<username>/Library/Application Support/Derivative/TouchDesigner099/Plugins`  
	内に配置する  
  
*詳細は[https://docs.derivative.ca/Custom_Operators](https://docs.derivative.ca/Custom_Operators)を確認してください*  
  
### Plugin説明  
#### CHOP
1. `DotCHOP`  
	CHOP同士の内積をとります.  
	使用例: [DotProductCHOPExample.toe](Projects/DotProductCHOPExample.toe "DotProductCHOP使用例")  
2. `GranularCHOP`
	CHOPに簡易的なグラニュラー効果をかけます.  
	２段階かけるといい感じになります.  
	使用例1: [TouchDesigner Plugin "Granular"](https://youtu.be/0uRVfFLauyg "TouchDesigner Plugin Granular YouTube")  
	使用例2: [GranularCHOPExample.toe](Projects/GranularCHOPExample.toe "GranularCHOP使用例")  
3. `HistogramCHOP`  
	CHOPのヒストグラムを計算します.  
	使用例: [HistogramCHOPExample.toe](Projects/HistogramCHOPExample.toe "HistogramCHOP使用例")  
#### TOP
1. `BasicBlockGlitchTOP`  
	画像をタイル状にバラバラにします. 逐次動かすこともできます.  
	使用例: [BasicBlockGlitchTOPExample.toe](Projects/BasicBlockGlitchTOPExample.toe)  
	![BasicBlockGlitchTOPの適用後](doc/BasicBlockGlitchTOPExample.png "BasicBlockGlitchTOP適用後")  
2. `BlockNoiseTOP`  
	四角いノイズ乗っけるだけです. `TOP > Noise`でもいいと思います.  
	使用例: [BlockNoiseTOPExample.toe](Projects/BlockNoiseTOPExample.toe)  
	![BlockNoiseTOPの適用後](doc/BlockNoiseTOPExample.png "BlockNoiseTOP適用後")  
3. `BitCrushTOP`  
	画像の色をBit単位で量子化します. 古めの映像とかを表現できます.  
	使用例: [BitCrushTOPExample.toe](Projects/BitCrushTOPExample.toe)  
	![BitCrushTOPの適用後](doc/BitCrushTOPExample.png "BitCrushTOP適用後")  
4. `PixcelSorterGlitchTOP`  
	Kim Asendorf氏の[ASDFPixelSort](https://github.com/kimasendorf/ASDFPixelSort)を参考に, PixcelSortingをTouchDesignerのプラグイン化したものです.(Black,Brightness,R,G,B,RGBMaxのモードを選択できます)  
	使用例: [PixcelSorterGlitchTOPExample.toe](Projects/PixcelSorterGlitchTOPExample.toe)  
	![PixcelSorterGlitchTOPの適用後](doc/PixcelSorterGlitchTOPExample.png "PixcelSorterGlitchTOP適用後")  
5. `FlipnoteTOP`  
	画質・アスペクト比・画像コンテンツを「うごくメモ帳」風にします. DSi/3DS版を選べます.  
	参考程度に, DitherLevelsを動かすと点々の密度, DitherLumaThresholdを動かすと鮮やかさが変わり, Edge系パラメータを動かすと輪郭の強調を制御できます. 多くの画像で共通で良い結果が得られるパラメータのセットは見つかってません.  
	Operatorのパラメータ設定画面の`Common > Viewer Smoothness`を`Nearist Pixcel`にすると, 更に見た目が「うごくメモ帳」らしくなります.  
	使用例: [FlipnoteTOPExample.toe](Projects/FlipnoteTOPExample.toe)  
	![FlipnoteTOPの適用後](doc/FlipnoteTOPExample.png "FlipnoteTOP適用後")