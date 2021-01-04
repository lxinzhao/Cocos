// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const Input = {}
cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        this._speed = 1000;
        this.sp = cc.v2(0, 0);
        this.state = '';
      
        this.heroAni = this.node.getComponent(cc.Animation);
        cc.systemEvent.on("keydown", this.onkeydown, this);
        cc.systemEvent.on("keyup", this.onkeyup, this);
    },
    setState(state) {
        if (this.state != state) {
            this.state = state;
        }
        this.heroAni.play(state);
    },
    onkeydown(e) {
        /* console.log(e.keyCode); */
        Input[e.keyCode] = 1;
    },
    onkeyup(e) {
        Input[e.keyCode] = 0;
    },

    update(dt) {

        if (window.dialog && window.dialog.active == true) return;
        if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]) {
            this.sp.x = -1;
            console.log("向左")
        }
        else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]) {
            this.sp.x = 1;
            console.log("向右")
        }
        else {
            this.sp.x = 0;
        }
        if (Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up]) {
            this.sp.y = 1;
            console.log("向上")
        }
        else if (Input[cc.macro.KEY.s] || Input[cc.macro.KEY.down]) {
            this.sp.y = -1;
            console.log("向下")
        }
        else {
            this.sp.y = 0;
        }
        //拿到hero的速度
        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

        if (this.sp.x) {
            /* this.node.x += this.sp.x * this._speed * dt; */
            this.lv.y = 0;
            this.lv.x = this.sp.x * this._speed;
        }
        else if (this.sp.y) {
            /* this.node.y += this.sp.y * this._speed * dt; */
            this.lv.x = 0;
            this.lv.y = this.sp.y * this._speed;
        }
        else {
            this.lv.y = this.lv.x = 0;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;


        let state = '';

        if (this.sp.x == 1) {
            state = "hero_right";
            console.log(state);

        } else if (this.sp.x == -1) {
            state = "hero_left"
            console.log(state);
        }
        else if (this.sp.y == 1) {
            state = "hero_up"
        }
        else if (this.sp.y == -1) {
            state = "hero_down"
        }
        if (state) {
            this.setState(state);
            console.log(state);
        }
    },
    //碰撞回调
    onCollisionEnter(other, self) {
        if (other.node.gruop == "smog");
        other.node.active = true;
        other.node.getComponent(cc.TiledTile).gid = 0;
    }
});
