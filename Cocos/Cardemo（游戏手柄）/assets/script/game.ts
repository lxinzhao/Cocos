// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    car: cc.Node = null;

    carScript: cc.Component = null;
    onLoad() {
        this.carScript = this.car.getComponent("CarScript")
    }


    start() {
        this.node.on("touchstart", this.onTouchStart, this)
        this.node.on("touchmove", this.onTouchMove, this)//移动时
        this.node.on("touchend", this.onTouchEnd, this)
        this.node.on("touchcancel", this.onTouchCancel, this)
    }
    onTouchStart(e: cc.Event.EventTouch) {

    }
    onTouchMove(e: cc.Event.EventTouch) {
        let pos = this.node.parent.convertToNodeSpaceAR(e.getLocation());
        this.node.setPosition(pos);

        let direction: cc.Vec2 = pos.normalize();
        /*     console.log(direction); */
        let max = 100;
        let r: Number = cc.Vec2.distance(pos, cc.v2(0, 0));
        if (r > max) {
            pos.x = max * direction.x;
            pos.y = max * direction.y;
        }
        this.node.setPosition(pos);

        let randion = pos.signAngle(cc.v2(1, 0));
        let angle = randion / Math.PI * 180;
        this.car.angle = -angle;
        this.direction = direction;
        /*  this.carScript.direction = direction; */
    }
    onTouchEnd(e: cc.Event.EventTouch) {

    }
    onTouchCancel(e: cc.Event.EventTouch) {
        this.node.setPosition(cc.v2(0, 0));
        this.direction = null;
    }

    speed: number = 3;
    direction: cc.Vec2 = null;
    update(dt) {
        if (this.direction == null) return;
        //speed 一次3
        //direction 方向
        let dx = this.speed * this.direction.x;
        let dy = this.speed * this.direction.y;

        let pos = this.car.getPosition();
        pos.x += dx;
        pos.y += dy;
        this.car.setPosition(pos);
    }
}
