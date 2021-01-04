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
  //每次移动的像素
  speed: number = 3;
  //水平向右（1,0） 竖直向下（0，-1）
  direction: cc.Vec2 = null;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let node: cc.Node = cc.find("Canvas/佩奇");
    cc.systemEvent.on("keydown", this.keyDown, this)
  }
  keyDown(e: cc.Event.EventKeyboard) {
    switch (e.keyCode) {
      case cc.macro.KEY.left:
        this.direction = cc.v2(-1, 0)
        break;
      case cc.macro.KEY.right:
        this.direction = cc.v2(1, 0)
        break;
      case cc.macro.KEY.up:
        this.direction = cc.v2(0, 1)
        break;
      case cc.macro.KEY.down:
        this.direction = cc.v2(0, -1)
        break;
      case cc.macro.KEY.space:
        this.direction = null;
        break;
      default:
        break;
    }
  }

  start() { }

  update(dt) {
    if (this.direction == null) return;//不动
    let pos: cc.Vec2 = this.node.getPosition();
    pos.x += this.speed * this.direction.x;
    pos.y += this.speed * this.direction.y;
    this.node.setPosition(pos);
    /*  console.log("update() is clalled,time="+new Date().getTime); */
    /*  if (this.node.x >= 120) return;
     this.node.x += 5; */
  }
}
