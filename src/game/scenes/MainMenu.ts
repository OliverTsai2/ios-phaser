import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    Table: GameObjects.Image;
    title: GameObjects.Text;
    player: GameObjects.Image;
    logoTween: Phaser.Tweens.Tween | null;

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
            .setScale(0.5);

        this.title = this.add.text(width/2, height/2, '文字測試123', {
            fontFamily: 'Arial Black',
            fontSize: 16,
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.player = this.add.image(width/2, height/2 + 120, 'otherch3')
            .setScale(0.5);

        EventBus.emit('current-scene-ready', this);
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
