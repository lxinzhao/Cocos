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

    // LIFE-CYCLE CALLBACKS:
    car: cc.Node = null;
    carScript:cc.Component=null;
    speed: number = 3;
    onLoad() {
        cc.game.setFrameRate(30)
        this.car = cc.find("Canvas/小车")
        this.carScript=this.car.getComponent("CarScript")
    }
    start() {
        this.node.on("touchstart", this.onTouchStart, this)
        this.node.on("touchmove", this.onTouchMove, this)//移动时
        this.node.on("touchend", this.onTouchEnd, this)
        this.node.on("touchcancel", this.onTouchCancel, this)
    }
    onTouchStart(e: cc.Event.EventTouch) {

    }
    //移动时
    onTouchMove(e: cc.Event.EventTouch) {
        //e.getLocation() 点击的位置，是世界坐标
        //需要把世界坐标转换为本坐标
        //世界坐标屏幕左下角，如果直接获取e.getLocation（）获取到的坐标是相对世界坐标的而不是父节点
        let parent: cc.Node = this.node.parent;//父节点
        let Pos: cc.Vec2 = parent.convertToNodeSpaceAR(e.getLocation());
        this.node.setPosition(Pos);

        //改点所在的cos值 sin值
        let direction: cc.Vec2 = Pos.normalize();

        //限制在边界内
        let maxR = 100 //拖动最大值 大概是父节点的半径
        let r: number = cc.Vec2.distance(Pos, cc.v2(0, 0))//求出移动的点位置到原位置（0,0）的距离
        if (r > maxR) {
            //截取控制器能移动到的最大位置
            Pos.x = maxR * direction.x;//r*cos
            Pos.y = maxR * direction.y;//r*sin
        }
        this.node.setPosition(Pos)
        //radian=a.angle(b)求a,b两个向量的夹角
        //cc.v2(1,0)表示x轴的方向向量
        let radion = Pos.signAngle(cc.v2(1, 0));//弧度数值
        let angle = radion / Math.PI * 180;//PI π？
        this.car.angle = -angle;//老的rotation 是逆时针转的，新的用angle

        this.carScript.direction=direction;

    }
    onTouchEnd(e: cc.Event.EventTouch) {

    }
    onTouchCancel(e: cc.Event.EventTouch) {
        this.node.setPosition(cc.v2(0, 0))
        this.carScript.direction=null
    }



    update(dt) {
    }
}
