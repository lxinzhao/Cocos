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
    bg: cc.Node = null;
    @property(cc.Node)//相机
    cam: cc.Node = null;

    @property(cc.Node)//相机
    cammin: cc.Node = null;
    onLoad() {
        this.bg.on(cc.Node.EventType.TOUCH_MOVE, this.move, this);
        this.cam.width = this.node.width;
        this.cam.height = this.node.height;
        this.cammin.width = 0.2*this.node.width;
        this.cammin.height = 0.2*this.node.height;
    }
    move(event: cc.Event.EventTouch,) {
        let last_pos = event.getPreviousLocation();//获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性
        let pos = event.getLocation();
        var dir = last_pos.sub(pos)//做向量减法
        this.cam.x += dir.x;
        this.cam.y += dir.y;
        this.cammin.x += dir.x;
        this.cammin.y += dir.y;
    }
    start() {

    }

    update() {
        if (this.cam.x - this.cam.width / 2 < this.bg.x - this.bg.width / 2) {
            this.cam.x = this.bg.x - this.bg.width / 2 + this.cam.width / 2;
            console.log("到左边的边缘了");//如果相机的最左边小于了背景的最左边那么相机的X坐标就等于背景的最左边加上相机的宽的一半
        }
        if (this.cam.x + this.cam.width / 2 > this.bg.x + this.bg.width / 2) {
            this.cam.x = this.bg.x + this.bg.width / 2 - this.cam.width / 2;
            console.log("到右边的边缘了");//如果相机的最右边大于了背景的最右边那么相机的X坐标就等于背景的最右边减去相机的宽的一半
        }
        if (this.cam.y + this.cam.height / 2 > this.bg.y + this.bg.height / 2) {
            this.cam.y = this.bg.y + this.bg.height / 2 - this.cam.height / 2;
            console.log("到上边的边缘了");//如果相机的最上边大于了背景的最上边那么相机的Y坐标就等于背景的最上边减去相机的高的一半
        }
        if (this.cam.y - this.cam.height / 2 < this.bg.y - this.bg.height / 2) {
            this.cam.y = this.bg.y - this.bg.height / 2 + this.cam.height / 2;
            console.log("到下边的边缘了");//如果相机的最下边小于了背景的最下边那么相机的Y坐标就等于背景的最下边加上相机的高的一半
        }
    }
}
