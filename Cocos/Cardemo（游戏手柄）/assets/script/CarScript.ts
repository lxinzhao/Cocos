// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    speed: number = 3;
    direction: cc.Vec2 = null
     onLoad () {
        cc.game.setFrameRate(30)
     }

    start() {

    }

    update(dt) {
        if (this.direction == null) return;
        //speed 一次3
        //direction 方向
        let dx=this.speed*this.direction.x;
        let dy=this.speed*this.direction.y;

        let pos=this.node.getPosition();
        pos.x+=dx;
        pos.y+=dy;
        this.node.setPosition(pos);
    }
}
