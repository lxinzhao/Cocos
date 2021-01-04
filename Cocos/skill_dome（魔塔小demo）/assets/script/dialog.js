// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

let roleMap = {
    1: {
        name: "勇者",
        url: "role/hero"
    },
    2: {
        name: "骷髅王",
        url: "role/npc"
    }
}
cc.Class({
    extends: cc.Component,

    properties: {
        picSprote: cc.Sprite,
        namelabel: cc.Label,
        textlabe: cc.Label
    },
    onLoad() {
        window.dialog=this.node;
        cc.systemEvent.on("keydown", this.onkeydown, this)
    },
    onDestroy() {
        cc.systemEvent.off("keydown", this.onkeydown, this)
    },
    onkeydown(e) {
        switch (e.keyCode) {
            case cc.macro.KEY.space: {
                this.nextTextData();
                break;
            }
        }
    },
    init(textDataArr) {
        //当前总的content
        this.nowText = null;
        //当前文本是否已经播放完毕 默认ture
        this.textEnd = true;
        //播放总时长
        this.tt = 0;

        this.textIndex = -1;
        this.textDataArr = textDataArr;
        this.node.active = true;
        this.nextTextData();
    },
    nextTextData() {
        if(!this.textEnd) return;
        if (++this.textIndex < this.textDataArr.length) {
            this.setTextData(this.textDataArr[this.textIndex])
        }
        else {
            this.closeDialog();
        }
    },

    setTextData(textData) {
        if(!this.textEnd) return;
        this.textEnd=false;

        this.namelabel.string = roleMap[textData.role].name;
        this.textlabe.string = "";
        this.nowText=textData.content;

        cc.loader.loadRes(roleMap[textData.role].url, cc.SpriteFrame, (err, texture) => {
            this.picSprote.spriteFrame = texture;
        });
    },
    closeDialog() {
        this.node.active = false;
    },
    update (dt) {
        if(!this.nowText)return;
        this.tt+=dt;
        if(this.tt>=0.1)
        {
            if(this.textlabe.string.length<this.nowText.length)
            {
                this.textlabe.string=this.nowText.slice(0,this.textlabe.string.length+1);
            }
            else{
                this.textEnd=true;
                this.nowText=null;
            }
            this.tt=0;
        }
    },
    start() {

    },

     
});
