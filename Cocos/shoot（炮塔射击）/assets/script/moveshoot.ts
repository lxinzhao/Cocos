// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletScript extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.SpriteFrame)
    explodeEffect: cc.SpriteFrame = null;

    onLoad() {
        this.schedule(this.onTimer, 0.016)
    }
    onTimer() {
        if (this.node.y > 300) {
            this.unschedule(this.onTimer); // 停止定时器
            /* this.node.destroy(); // 销毁节点 */
            this.beginExplode();
            return
        }
        this.node.y += 10;
    }
    beginExplode() {
        let sp: cc.Sprite = this.node.getComponent(cc.Sprite);
        sp.spriteFrame = this.explodeEffect;// 显示爆炸图片
        this.node.scale = 0.1;

        let self = this; // 使用闭包语法

        cc.tween(this.node)
            .to(0.5, { scale: 1 , opacity: 0})
            .call( function(){ self.afterExplode(); } )
            .start();
    }
    afterExplode(){
        this.node.destroy();
    }
    start() {
       
    }

    // update (dt) {}
}
