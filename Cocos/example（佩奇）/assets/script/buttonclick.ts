// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.SpriteFrame)
    face1: cc.SpriteFrame = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on("touchstart", this.buttonclick, this)


    }
    buttonclick() {
        //获取节点
        let node: cc.Node = cc.find("Canvas/佩奇") 
     
        //设置节点左边，大小比例
        /*  node.setPosition(cc.v3(250, -138, 0))
         node.setScale(cc.v3(0.5, 0.5, 0)) */

        //let sprite: cc.Sprite = node.getComponent(cc.Sprite);
        //sprite.spriteFrame=this.face1 

        //缓动类似Egret动画
        /*   cc.tween(node)
              .to(1, { position: cc.v3(250, -118, 0), angle: 360 })
              .to(1, { scale: 0.5 })
              .start(); */

        /* cc.tween(node)
            .by(1, { position: cc.v3(400, 0, 0) })
            .by(1, { position: cc.v3(0, 400, 0) })
            .by(1, { position: cc.v3(-400, 0, 0) })
            .by(1, { position: cc.v3(0, -400, 0) })
            .start(); */
             cc.tween(node)
            .by(1, { position: cc.v3(400, 0, 0) },{easing:"quaOut"})  
            .start(); 
            //篮球 
            let nodes: cc.Node = cc.find("Canvas/篮球")
            let h:number=300;
            cc.tween(nodes)
            //让篮球在地面上弹起 落回地面，主要是两个图之间的锚点距离
            .by(0.5,{position:cc.v3(0,-h,0)},{easing:"quartIn"})//加速下降
            .by(0.2,{position:cc.v3(0,h/6,0)},{easing:"quartOut"})//反弹匀速上升
            .by(0.55,{position:cc.v3(0,-h/6,0)},{easing:"quartIn"})//在下降
            .start();
    }
    start() {

    }

    // update (dt) {}
}
