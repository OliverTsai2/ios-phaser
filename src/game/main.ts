import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game, Scale } from 'phaser';
import { Preloader } from './scenes/Preloader';

// 創建一個標誌變量，確保遊戲只被初始化一次
let gameInstance: Phaser.Game | null = null;

var winH = window.innerHeight
var winW = window.innerWidth
var dpr = window.devicePixelRatio || 1;

var H5 = winH > winW
var isGullScreen = winH/winW; //是否是全面屏
var canH,canW,bl;

// 計算畫布尺寸的函數
function calculateCanvasSize() {
  H5 = winH > winW;
  isGullScreen = winH/winW;
  
  if(isGullScreen > 1.9 && H5){
    canW = winW;
    canH = winH;
  }else if(H5 && isGullScreen<1.9){
    canH = winH;
    canW = canH*640/1136;
  }else{
    canW = winH*640/1136;
    canH = winH;
  }
  
  bl = canW / 640;

  canH *= dpr;
  canW *= dpr;
  
  // 如果遊戲實例存在，則調整其大小
  if (gameInstance) {
    gameInstance.scale.resize(canW, canH);
    gameInstance.scale.refresh();
  }
}

// 初始計算
calculateCanvasSize();

// 監聽窗口大小變化
window.addEventListener('resize', () => {
  winW = window.innerWidth;
  winH = window.innerHeight;
  calculateCanvasSize(); // 重新計算並應用新尺寸
});

const config = {
    type: AUTO,
    // width: window.innerWidth,   // 設定為螢幕寬度
    width:canW,
    // height: window.innerHeight, // 設定為螢幕高度
    height:canH,
    parent: 'game-container',
    pixelArt: true,
    backgroundColor: '#000000',
    resolution: dpr,
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ],
    render: {
        antialias: true, // ✅ 關鍵：禁用抗鋸齒（會導致模糊）
        pixelArt: false,     // ✅ 雙保險：確保 pixel 精準顯示
        clearBeforeRender: true,
    },
    scale: {
        mode: Scale.FIT,  // 自動縮放遊戲來適應視窗
        autoCenter: Scale.CENTER_BOTH, // 居中顯示遊戲
    },
} as unknown as Phaser.Types.Core.GameConfig;

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
