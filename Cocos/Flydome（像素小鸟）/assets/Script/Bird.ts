// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import main from "./Main";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   
    @property(main)
    main:main=null;
    onCollisionEnter(other,self){//当碰撞产生的时候调用//other 产生碰撞的另一个碰撞组件self  产生碰撞的自身的碰撞组件
        console.log("发生了碰撞");
        this.main.gameover();//游戏结束
        console.log("被碰撞的是" + other.node.name);
    }
}
