import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    Table: GameObjects.Image;
    title:  (GameObjects.Text | null)[] = [];
    player: GameObjects.Image;
    logoTween: Phaser.Tweens.Tween | null;
    refreshButton: GameObjects.Text;
    group: Phaser.GameObjects.Group;

    ellipse: Phaser.Geom.Ellipse;
    players: GameObjects.Image[] = [];
    rotationSpeed: number = 0.5; // 旋轉速度
    
    // 玩家在橢圓上的角度
    playerAngles: number[] = [];

    // 新增變數來控制動畫
    ellipsePoints: Phaser.Geom.Point[] = [];
    currentEllipse: Phaser.Geom.Ellipse;
    targetEllipse: Phaser.Geom.Ellipse;
    isAnimating: boolean = false;
    animationProgress: number = 0;
    animationDuration: number = 2000; // 動畫持續時間，單位為毫秒

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // 取得當前螢幕大小
        const { width, height } = this.scale;

        // 添加背景圖片
        this.background = this.add.image(width / 2, height / 2, 'background')
            .setDisplaySize(width, height); // 設定寬高以適應螢幕

        // 添加背景2
        this.Table = this.add.image(width/2, height/2 + 20, 'Table')
            .setScale(1);

        // 添加玩家圖片
        this.player = this.add.image(width/5 - 20, height/2 + 380, 'otherch3')
            .setScale(1.3);

        for(let i = 1; i < 12; i++) {
            const gap = i*60;
            const size = 16 + 2 * i;

            const title = this.add.text(width/2, height/2 - 400  + gap, `大小${size}文字測試ABC`,{
                fontFamily: 'Arial',
                fontSize: `${size}px`,
                color: '#ffffff',
                stroke: '#000000', 
                strokeThickness: 1,
                align: 'center'
            }).setOrigin(0.5).setDepth(100).setScale(1);

            this.title.push(title);
        }
        
        this.ellipse = new Phaser.Geom.Ellipse(width/2, height/2, 600, 900);

        this.players = [];
        this.playerAngles = [];

        // 初始化玩家及其角度
        for (let i = 0; i < 8; i++) {
            this.players.push(this.add.image(0, 0, 'btn-play').setScale(0.5));
            // 均勻分布在橢圓上，每個玩家的初始角度
            this.playerAngles.push((i / 8) * Math.PI * 2);
        }

        // 初始化玩家位置
        this.updatePlayersPosition();

        EventBus.emit('current-scene-ready', this);
    }

    // 開始橢圓動畫
    startEllipseAnimation() {
        this.isAnimating = true;
        this.animationProgress = 0;
        
        // 使用 Phaser 的 tween 系統來創建動畫
        this.tweens.add({
            targets: this,
            animationProgress: 1,
            duration: this.animationDuration,
            ease: 'Sine.easeInOut',
            yoyo: true, // 動畫來回播放
            repeat: -1, // 無限重複
            onUpdate: () => {
                this.updateEllipseShape();
            }
        });
    }

    // 更新橢圓形狀
    updateEllipseShape() {
        // 根據動畫進度計算當前橢圓的高度
        const currentHeight = Phaser.Math.Linear(
            this.currentEllipse.height, 
            this.targetEllipse.height, 
            this.animationProgress
        );
        
        // 更新橢圓形狀
        this.ellipse.height = currentHeight;
        
        // 更新玩家位置
        this.updatePlayersPosition();
    }

    // 更新玩家位置的方法
    updatePlayersPosition() {
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            const angle = this.playerAngles[i];
            
            // 計算橢圓上的位置
            const x = this.ellipse.x + Math.cos(angle) * (this.ellipse.width / 2);
            const y = this.ellipse.y + Math.sin(angle) * (this.ellipse.height / 2);
            
            // 更新玩家位置
            player.setPosition(x, y);
        }
    }

    // 添加 update 方法來實現玩家沿橢圓移動效果
    update(time: number, delta: number) {
        // 計算每一幀的角度變化（根據旋轉速度和幀時間）
        const angleChange = (0.01 * delta) / 16.67; // 標準化為60fps的變化率
        
        // 更新每個玩家的角度
        for (let i = 0; i < this.playerAngles.length; i++) {
            this.playerAngles[i] += angleChange;
            
            // 確保角度在 0 到 2π 之間
            if (this.playerAngles[i] > Math.PI * 2) {
                this.playerAngles[i] -= Math.PI * 2;
            }
        }
        
        // 更新玩家位置
        this.updatePlayersPosition();
    }
    
    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }
}