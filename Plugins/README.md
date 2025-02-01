# Pluginsの使い方
詳細は[https://docs.derivative.ca/Custom_Operators](https://docs.derivative.ca/Custom_Operators)を確認してください。  
Plugins内のファイルを以下のディレクトリに配置  
- Windows  
	Documents/Derivative/Plugins  
	もしくは、  
	C:/Users/<username>/Documents/Derivative/Plugins  
- macOS  
	/Users/<username>/Library/Application Support/Derivative/TouchDesigner099/Plugins  

## 各プラグインの説明
**⚠プラグインを使うときは、念の為プロジェクトのバックアップを取っておいてください。⚠**  
- MatMul　(MatMulPlugin.dll)  
	CHOP同士の行列積を計算するプラグイン  
	- 使用用途  
		２つのCHOPの関連性の計算/１次元のCHOPのデータを２次元に拡張する
- ValueBarTOP　(ValueBarTOPPlugin.dll)  
	'opencv_world4100.dll'と一緒に利用するので、'opencv_world4100.dll'も同じディレクトリに入れておく。  
	CHOPの値をグラフとしてTOPに可視化するプラグイン  
	- 使用用途  
		スペクトラムの可視化/音声信号の可視化  

