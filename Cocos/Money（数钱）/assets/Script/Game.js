// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    //页面的钱
    nodeMoney: cc.Node,
    //箭头
    nodeGuide: cc.Node,
    //红色的开始区域
    nodeStart: cc.Node,
    //文字框金额
    txtCount: cc.Label,
    //文字框时间
    txtTime: cc.Label,
    //包含文字框金额的父节点
    nodeMonyeBg: cc.Node,
    //包含文字框时间的父节点
    nodeTimerBg: cc.Node,
    //下落的钱
    nodeSpillMoney: cc.Node,
    //红色的开始区域金额显示文字框
    txtTotal: cc.Label,
    //开始按钮
    nodeButtonStart: cc.Node,
    //开始按钮
    nodeButtonres: cc.Node,
  },



  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, event => {
      this.onTouchStart(event);
    });
    this.node.on(cc.Node.EventType.TOUCH_MOVE, event => {
      this.onTouchMove(event);
    });
    this.node.on(cc.Node.EventType.TOUCH_END, event => {
      this.onTouchEnd(event);
    });
    /*  this.nodeMonyeBg.zIndex = 10;
     this.nodeTimerBg.zIndex = 10;
     this.nodeStart.zIndex = 20; */

    this._touchNode = null;
    this._count = 0;
    this._isPlaying = false;
  },

  start() {

  },
  resstartGame()
  {
    this._isPlaying = true;
    this.nodeStart.active = false;

    this.txtTime.string = 10;
    this.txtCount.string = 0;
    this._count = 0;
    this.startTimer();
    //下落的钱
    this.spillMoney();
  },
  startGame() {
    
    this._isPlaying = true;
    this.nodeStart.active = false;

    this.txtTime.string = 10;
    this.txtCount.string = 0;
    this._count = 0;
    this.startTimer();
    //下落的钱
    this.spillMoney();
  },
  startTimer() {
    this.schedule(this.timeCallback, 1);
  },
  timeCallback() {
    let time = parseInt(this.txtTime.string);
    time--;
    this.txtTime.string = time;
    if (time <= 0) {
      this.unschedule(this.timeCallback);
      this.onTimeout();
      
    }
  },
  onTimeout() {
    this.onGamend();
  },
  onGamend() {
    this.nodeStart.active = true;
    this.nodeButtonStart.active=false;
    this.nodeButtonres.active=true;
/*  let s=this.nodeMoney.getSiblingIndex();
    console.log(s);
    let y=this.nodeStart.getSiblingIndex();
    console.log(y); */
    this._isPlaying = false;
   
    this.node.stopActionByTag(0xff);
    /*  this.txtTotal.string= this.txtCount.string */
    this.txtTotal.string = `￥${this._count * 100}`;
  },
 
 /*   update (dt) {
     console.log("1")
 },   */

  onTouchStart(event) {
    if (!this._isPlaying) {
      return;
    }
    //存页面的大钱
    this._touchNode = cc.instantiate(this.nodeMoney);
    this._touchNode.active = true;
    this._touchNode.parent = this.nodeMoney.parent;
    //箭头
    this.nodeGuide.active = false;
  },
  onTouchMove(event) {
    if (!this._isPlaying) {
      return;
    }
    let pos = event.getLocation();
    pos = this._touchNode.parent.convertToNodeSpaceAR(pos);
    if (pos.y - this._touchNode.y>50) {
      this._touchNode.y = pos.y;
    }
  },

  onTouchEnd(event) {
    if (!this._isPlaying) {
      return;
    }
    let now = event.getLocation();
    let start = event.getStartLocation();
    if (now.y - start.y > 10) {
      //顺序执行动作，创建的动作将按顺序依次运行。 
      let seq = cc.sequence(
        //同步执行动作，同步执行一组动作。
        cc.spawn(
          //移动指定的距离
          cc.moveBy(0.3, 0, cc.winSize.height),
          //按指定的倍数缩放节点大小
          cc.scaleBy(0.3, 0.7),   
        ),
        cc.removeSelf(),
      );
      this._touchNode.runAction(seq);

    }
    this._count++;
    this.txtCount.string = `${this._count * 100}`;
    /*  let counts = parseInt(this.txtCount.string);
     counts++;
     console.log(counts);
     this.txtCount.string = counts+"百"; */

  },
  onClick() {
    this.startGame();
  },
  onResClick()
  {
    this.resstartGame();

  },
  /* spillMoney() {
    let seq = cc.sequence(
      //延迟指定的时间量
      cc.delayTime(0.2),
      cc.callFunc(() => {
        let x = Math.random() * cc.winSize.width;
        x -= cc.winSize.width / 2;
        //克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点。
        let node = cc.instantiate(this.nodeSpillMoney);
        node.active = true;
        node.parent = this.nodeSpillMoney.parent;
        node.runAction(cc.sequence(
          cc.place(x, cc.winSize.height / 2 + node.height / 2),
          //同步执行动作，同步执行一组动作
          cc.spawn(cc.moveBy(1, 0. - cc.winSize.height - node.height / 2), cc.rotateBy(1, 1080)),
          cc.removeSelf(),
        ));
      }),
    );
    seq.setTag(0xff);
    this.node.runAction(seq.repeatForever());
  } */
  spillMoney() {
    let seq = cc.sequence(
      //延迟指定的时间量
      cc.delayTime(0.2),
      cc.callFunc(() => {
        let x = Math.random() * cc.winSize.width;
        x -= cc.winSize.width / 2;
        //克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点。
        let node = cc.instantiate(this.nodeSpillMoney);
        node.active = true;
        node.parent = this.nodeSpillMoney.parent;
        node.runAction(cc.sequence(
          cc.place(x, cc.winSize.height / 2 + node.height / 2),
           //同步执行动作，同步执行一组动作
          cc.spawn(cc.moveBy(1, 0, -cc.winSize.height - node.height / 2), cc.rotateBy(1, 1080)),
          cc.removeSelf(),
        ));
      }),
    );

    seq.setTag(0xff);
    this.node.runAction(seq.repeatForever());
  },
});
