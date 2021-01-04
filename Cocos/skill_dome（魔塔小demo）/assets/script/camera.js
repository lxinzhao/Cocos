// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//相机跟随
cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: cc.Node,
    },

    // onLoad () {},

    start() {

    },

    update(dt) {
        //贴墙被卡顿这个问题是多碰撞体导致的，cocos目前没有类似于复合碰撞体的概念
        //暂时的解决方案，可以给hero设置一个默认的弹性系数，比如把Restitution改成0.2即可
        if (!this.playerNode) return;
        let w_pos = this.playerNode.convertToWorldSpaceAR(cc.v2(0, 0));
        self = this;
        let n_pos = self.node.parent.convertToNodeSpaceAR(w_pos);
        this.node.position = n_pos;
    },
});
