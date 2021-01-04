// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    /*  @property(cc.Label)
     label: cc.Label = null;
 
     @property
     text: string = 'hello'; */
    label: cc.Label = null;
    text: string = null;
    index: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.label=this.getComponent(cc.Label);
        this.text=this.label.string;//获取文本
        this.label.string="";//清空文本 从头显示
        //启动计时器，每0.3秒调用一次onTime
        this.schedule(this.onTime,0.3)
    }
    onTime()
    {
        this.index++;
        //获取索引0，长度1 labeltext每次增加字
        let str=this.text.substr(0,this.index)
        this.label.string=str;
        if(this.index>=this.text.length)
        this.unschedule(this.onTime);
    }
    start() {

    }

    // update (dt) {}
}
