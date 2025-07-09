import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        // 獲取當前遊戲的實際寬高
        const { width, height } = this.scale;
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(width / 2, height / 2, 'background');

        // 進度條外框 - 使用相對位置
        const barWidth = Math.min(width * 0.8, 468); // 進度條寬度為畫面寬度的80%，但最大不超過468
        const barHeight = 32;
        this.add.rectangle(width / 2, height / 2, barWidth, barHeight).setStrokeStyle(1, 0xffffff);

        // 進度條 - 使用相對位置
        const bar = this.add.rectangle(width / 2 - barWidth / 2 + 2, height / 2, 4, barHeight - 4, 0xffffff);

        // 使用 'progress' 事件更新進度條
        this.load.on('progress', (progress: number) => {
            // 更新進度條寬度
            bar.width = 4 + ((barWidth - 8) * progress);
        });

        // 設置遊戲縮放模式
        this.scale.scaleMode = Phaser.Scale.FIT; // 使用 FIT 模式自適應螢幕
        this.scale.refresh(); // 刷新縮放
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('otherch3', 'otherch3.png');
        this.load.image('btn-play', 'btn-play.png');
        this.load.image('Table','Table.png');
        this.load.image('myBrand','myBrand.png');
        this.load.image('actionButton','actionButton.png');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
