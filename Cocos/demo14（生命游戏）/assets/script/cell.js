// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        colorNode: cc.Node,
    },
    setState(state = 0) {
        //0白色死亡
        this.state = state;
        if (this.state == 0) {
            this.colorNode.color = new cc.color(255, 255, 255)//白
        }
        else {
            this.colorNode.color = new cc.color(255, 0, 0)//红
        }
    },
    switchState() {
        let state = this.state == 0 ? 1 : 0;
        this.setState(state)
    }





});
