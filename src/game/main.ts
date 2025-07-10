import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game, Scale } from 'phaser';
import { Preloader } from './scenes/Preloader';

// 創建一個標誌變量，確保遊戲只被初始化一次
let gameInstance: Phaser.Game | null = null;

// 基準設計尺寸 在電腦設計時要用640*1136 傳送到手機 375*667
// const BASE_WIDTH = 640;
// const BASE_HEIGHT = 1136;

const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

var winH = window.innerHeight
var winW = window.innerWidth
var dpr = Math.min(window.devicePixelRatio || 1, 2);

var H5 = winH > winW
var isGullScreen = winH/winW; //是否是全面屏
var canH,canW,bl;

// 計算畫布尺寸的函數
function calculateCanvasSize() {
    winH = window.innerHeight;
    winW = window.innerWidth;
    H5 = winH > winW;
    isGullScreen = winH/winW;
    
    if(isGullScreen > 1.9 && H5){
        // canW = winW;
        // canH = winH;

        // 全面屏手機，保持寬度適應，高度可能超出基準比例
        canW = BASE_WIDTH;
        canH = BASE_WIDTH * (winH / winW);
        console.log('全面屏手機', canW, canH);
    }else if(H5 && isGullScreen<1.9){
        // canH = winH;
        // canW = canH*640/1136;

        // 一般豎屏設備，保持基準比例
        canW = BASE_WIDTH;
        canH = BASE_HEIGHT;
        console.log('一般豎屏設備', canW, canH);
    }else{
        // canW = winH*640/1136;
        // canH = winH;

        // 橫屏設備，保持基準比例
        canH = BASE_HEIGHT;
        canW = BASE_WIDTH;
        console.log('橫屏設備', canW, canH);
    }
    
    // bl = canW / 640;
    bl = canW / BASE_WIDTH;

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
    winH = window.innerHeight;
    winW = window.innerWidth;
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
    resolution: Math.min(window.devicePixelRatio, 2),
    autoRound: true,
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
        failIfMajorPerformanceCaveat: false, // 避免低階設備中斷
        powerPreference: 'high-performance', // 優先使用高性能 GPU
    },
    scale: {
        mode: Scale.FIT,  // 自動縮放遊戲來適應視窗
        autoCenter: Scale.CENTER_BOTH, // 居中顯示遊戲
        orientation: Scale.PORTRAIT, // 強制豎屏方向
    },
} as unknown as Phaser.Types.Core.GameConfig;

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
