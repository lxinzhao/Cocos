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
    logo: cc.Node = null;//logo标志

    @property(cc.Node)
    p0: cc.Node = null;//第一组管子

    @property(cc.Node)
    p1: cc.Node = null;//第二组管子

    @property(cc.Node)
    p2: cc.Node = null;//第三组管子

    @property(cc.Node)
    ground0: cc.Node = null;//第一个地面

    @property(cc.Node)
    ground1: cc.Node = null;//第二个地面

    @property(cc.Node)
    btn_play: cc.Node = null;//开始游戏按钮

    @property(cc.Node)
    btn_gameover: cc.Node = null;//重新开始按钮

    @property(cc.Label)
    score_label: cc.Label = null;//分数文字

    @property(cc.Label)
    history_label: cc.Label = null;//历史最高分的文字

    @property(cc.Animation)
    bird_anim: cc.Animation = null;//小鸟的动画组件

    @property(cc.RigidBody)
    bird_rig: cc.RigidBody = null;//小鸟的刚体

    @property(cc.AudioSource)
    onbtn_music: cc.AudioSource = null;//背景音效

    @property
    is_debug: boolean = false;//是否调试

    @property
    score: number = 0;//分数

    onLoad() {
        //如果历史最高分为空
        /*  在HTML5中，新加入了一个localStorage特性，这个特性主要是用来作为本地存储来使用的，
         解决了cookie存储空间不足的问题(cookie中每条cookie的存储空间为4k)，
         localStorage中一般浏览器支持的是5M大小，这个在不同的浏览器中localStorage会有所不同。*/
        if (cc.sys.localStorage.getItem("his") == null) {
            cc.sys.localStorage.setItem("his", 0);//初始化历史最高分
        }

        //更新历史最高分
        this.history_label.string = "历史最高分:" + cc.sys.localStorage.getItem("his")

        //将第一第二个地板的宽设置为屏幕的宽
        this.ground0.width = this.node.width;
        this.ground1.width = this.node.width;
        //设置两个地面的Y坐标为最佳
        this.ground0.y = -(this.node.height / 2 - this.ground0.height / 2)
        this.ground1.y = this.ground0.y;
        //让第二个地面在第一个地面的右侧，并且紧紧贴在一起
        this.ground0.x = 0;
        this.ground1.x = this.ground0.x + this.ground1.width;

        let phy_manager = cc.director.getPhysicsManager()//获取物理引擎
        phy_manager.enabled = true;//开启物理引擎；
        phy_manager.gravity = cc.v2(0, -500);//下落速度

        //如果需要调试就绘制调试信息
        if (this.is_debug == true) {
            cc.director.getPhysicsManager().debugDrawFlags =
                cc.PhysicsManager.DrawBits.e_aabbBit |
                cc.PhysicsManager.DrawBits.e_pairBit |
                cc.PhysicsManager.DrawBits.e_centerOfMassBit |
                cc.PhysicsManager.DrawBits.e_jointBit |
                cc.PhysicsManager.DrawBits.e_shapeBit;

            let manager = cc.director.getCollisionManager();//获取碰撞引擎
            manager.enabledDebugDraw = true;//是否绘制碰撞组件的形状，默认为不绘制
            manager.enabledDrawBoundingBox = true//是否绘制碰撞组件的包围盒，默认为不绘制
        } else {//如果不调试就不绘制
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
        let manager = cc.director.getCollisionManager();//获取碰撞引擎
        manager.enabled = true;//开启碰撞引擎

        this.bird_anim.play("Bird");//播放小鸟动画

        let width = this.node.width;//获取屏幕宽
        let p_width = this.p0.children[0].width;//获取管子的宽
        let interval = (width + p_width) / 3;//获取间距
        this.p0.x = interval;//设置第一组管子的位置
        this.p1.x = this.p0.x - interval;//设置第二组管子的位置 0
        this.p2.x = this.p1.x - interval;//设置第三组管子的位置 0
        console.log("屏幕宽" + width);//打印log
        console.log("管子宽" + p_width);
        console.log("间距" + interval);
        console.log(this.p0.x, this.p1.x, this.p2.x)

        this.p1.y = 80 - Math.random() * 160////开始的时候除了第一组，每一组管子的Y坐标是随机的
        this.p2.y = 80 - Math.random() * 160;
        this.scheduleOnce(function () {//定时器,0.05秒后执行，目的是在加载一些必要的东西之后再暂停游戏
            cc.director.pause();//暂停游戏
            console.log("暂停游戏");
        }, 0.05);
    }
    update(dt) {
        this.ground0.x -= 2;//移动地面
        this.ground1.x -= 2;
        this.p0.x -= 2;//移动管子
        this.p1.x -= 2;
        this.p2.x -= 2;

        let left = -this.node.width / 2;//屏幕的最左边
        let right = this.node.width / 2;//屏幕的最右边

        if (this.ground0.x + this.ground0.width / 2 < left) {//如果地面一超出屏幕最左边就把地面移动到最右边
            this.ground0.x = this.node.width;//移动到最右边
            console.log("地面移动了")
        }
        if (this.ground1.x + this.ground1.width / 2 < left) {//如果地面二超出屏幕最左边就把地面移动到最右边
            this.ground1.x = this.node.width;//移动到最右边
            console.log("地面移动了")
        }
        if (this.p0.x + this.p0.children[0].width / 2 < left) {//如果第一组管子超出屏幕最左边
            this.p0.x = right + this.p0.children[0].width / 2;//把第一组管子移动到屏幕的最右边
            this.p0.y = 80 - Math.random() * 160;//随机设置y的坐标
            this.add_score(2);//加2分
            console.log("管子1动了")
        }
        if (this.p1.x + this.p1.children[0].width / 2 < left) {//如果第二组管子超出屏幕最左边
            this.p1.x = right + this.p1.children[0].width / 2;//把第二组管子移动到屏幕的最右边
            this.p1.y = 80 - Math.random() * 160;//随机设置y的坐标
            this.add_score(2);//加2分
            console.log("管子2动了")
        }
        if (this.p2.x + this.p2.children[0].width / 2 < left) {//如果第三组管子超出屏幕最左边
            this.p2.x = right + this.p2.children[0].width / 2;//把第三组管子移动到屏幕的最右边
            this.p2.y = 80 - Math.random() * 160;//随机设置y的坐标
            this.add_score(2);//加2分
            console.log("管子3动了")
        }
        this.score_label.string = "分数:" + this.score.toString();//实更新分数
    }
    onbtn()//点击屏幕时候执行的
    {
        console.log("点击了屏幕");
        this.bird_anim.play("Bird");//播放小鸟动画

        this.bird_rig.linearVelocity = cc.v2(0, 200)//让小鸟上升
        this.onbtn_music.play();//播放音效
    }
    onbtnplay()//开始游戏按钮执行的
    {
        console.log("开始游戏");
        cc.director.resume();//恢复已经暂停的游戏按钮
        this.btn_play.active = false;//隐藏开始游戏的按钮
        this.btn_gameover.active = false;//隐藏充新开始的按钮
        this.history_label.node.active = false;//隐藏历史最高分
        this.logo.active = false;//隐藏logo
    }
    onbtn_gameover()//重新开始按钮执行的函数
    {
        console.log("重新开始")
        cc.director.resume();//恢复已经暂停的游戏按钮
        cc.director.loadScene("game");//重新进入游戏
    }
    add_score(num: number) {//加分函数，num为想要加的分值
        this.score += num;//加分
    }
    gameover()//游戏结束时应该执行的代码
    {
        console.log("GG")
        cc.director.pause();//恢复已经暂停的游戏按钮
        this.btn_gameover.active = true;//显示重新开始按钮
        this.bird_anim.stop("Bird");//停止小鸟扇翅膀动画
        if (this.score > cc.sys.localStorage.getItem("his"))//如果当前的得分超过了历史最高分
        {
            cc.sys.localStorage.setItem("his", this.score);//重新记录历史最高分
            console.log("破纪录了！");
        }
    }
    start() {

    }


}
