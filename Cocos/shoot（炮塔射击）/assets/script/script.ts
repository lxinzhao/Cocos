// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BulletScript from "./moveshoot";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteFrame)
    bulletIcon: cc.SpriteFrame = null;
    // LIFE-CYCLE CALLBACKS:
    bullet: cc.Node;

    @property(cc.SpriteFrame)
    explodeEffect: cc.SpriteFrame = null;

    onLoad() {
        this.node.on("touchstart", this.onstart, this)
    }
    onstart() {
        this.fire()
    }
    fire() {
        if (this.bulletIcon == null) {
            console.log("请设置图片")
                ; return
        }

        //动态创建一个Node，添加sprite组件
        this.bullet = new cc.Node()
        let sprite: cc.Sprite = this.bullet.addComponent(cc.Sprite);
        sprite.spriteFrame = this.bulletIcon;

        this.bullet.parent = this.node;//作为子节点

        this.bullet.setPosition(cc.v3(0, 80, 0));
        // 加持一个脚本组件
        let script: BulletScript  = this.bullet.addComponent(BulletScript);
        script.explodeEffect=this.explodeEffect;
    }

    start() {

    }

    update(dt) {
        /*    this.bullet.setPosition(cc.v3(0,300,0)) */
    }
}
