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
            // .setScale(3);

        const title = this.add.text(width/2, height/2, '大小108邊線5：文字測試123', {
            fontFamily: 'Arial Black',
            fontSize: 108,
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const title2 = this.add.text(width/2, height/2 + 160, '大小72：playerBetChipImages', {
            fontFamily: 'Arial Black',
            fontSize: 72,
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 1,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const title3 = this.add.text(width/2, height/2 - 160, '大小108邊線3：文字測試123', {
            fontFamily: 'Arial Black',
            fontSize: 108,
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const title4 = this.add.text(width/2, height/2 - 320, '大小108邊線1：文字測試123', {
            fontFamily: 'Arial Black',
            fontSize: 108,
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 1,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.title.push(title);
        this.title.push(title2);
        this.title.push(title3);
        this.title.push(title4);

        this.player = this.add.image(width/2, height/2 + 580, 'otherch3')
            .setScale(3);

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
