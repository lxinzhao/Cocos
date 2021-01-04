// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        cellPerfab: cc.Prefab,
        cellAreaNode: cc.Node,
    },



    onLoad() {
        this.maxSize = 10;
        this.maxWCnt = this.cellAreaNode.width / this.maxSize;
        this.maxHCnt = this.cellAreaNode.height / this.maxSize
        //暂停
        this.pause = true;
        //计时
        this.tt = 0;
        this.cellNodeArr = [];
        for (let i = 0; i < this.maxHCnt; i++) {
            this.cellNodeArr[i] = [];
            for (let j = 0; j < this.maxWCnt; j++) {
                /* console.log(i,j) */
                let cellNode = cc.instantiate(this.cellPerfab);
                cellNode.setPosition(cc.v2(j * this.maxSize, i * this.maxSize));
                cellNode.getComponent('cell').setState(0);
                this.cellAreaNode.addChild(cellNode);
                this.cellNodeArr[i][j] = cellNode;
            }
        }
        this.cellAreaNode.on("touchstart", this.onTouchStart, this)
    },
    onTouchStart(e) {
        let pos = e.getLocation();
        let n_pos = this.cellAreaNode.convertToNodeSpaceAR(pos);
        let i = parseInt(n_pos.y / this.maxSize);
        let j = parseInt(n_pos.x / this.maxSize);

        let cellNode = this.cellNodeArr[i][j];
        cellNode.getComponent('cell').switchState();//变红
    },
    update(dt) {
        if (this.pause) return;
        this.tt += dt;
        if (this.tt >= 0.1) {
            /* console.log(this.tt) */
            this.tt = 0;
            this.lifeChange();
        }
    },

    pauseGame() {
        this.pause = !this.pause;
        cc.find('Canvas/bg/pauseBtn/Background/Label').getComponent(cc.Label).string = !this.pause ? "暂停" : "开始";
    },

    lifeChange() {
        let nowStateMap = [];//当前状态
        let nextStateMap = [];//下次状态

        for (let i = 0; i < this.maxHCnt; i++) {
            nowStateMap[i] = [];
            nextStateMap[i] = [];
            for (j = 0; j < this.maxWCnt; j++) {
                let cellState = this.cellNodeArr[i][j].getComponent('cell').state;
                nowStateMap[i][j] = cellState;
                nextStateMap[i][j] = cellState;
            }
        }
        for (let i = 0; i < this.maxHCnt; i++) {
            for (j = 0; j < this.maxWCnt; j++) {
                let state = this.cellLifeCheck(nowStateMap, { i, j })
              /*   console.log(state); 0*/
                if (state == 1 || state == 0) {
                    nextStateMap[i][j] = state;
                }
            }
        }
        for (let i = 0; i < this.maxHCnt; i++) {
            for (j = 0; j < this.maxWCnt; j++) {
                let cellState = nextStateMap[i][j];
              /*   console.log(cellState);0 */
                this.cellNodeArr[i][j].getComponent('cell').setState(cellState);
            }
        }
    },

    cellLifeCheck(stateMap, index) {
        //偏移量 9宫格在中间的上下左右坐标
        let grid = [
            { i: 1, j: - 1 }, { i: 1, j: 0 }, { i: 1, j: 1 },
            { i: 0, j: -1 }, { i: 0, j: 1 },
            { i: - 1, j: - 1 }, { i: -1, j: 0 }, { i: -1, j: 1 },
        ];
        //白色细胞的个数 大于3繁殖 2不变 其他情况死亡
        let totaLife = 0;
        for (let g of grid) {
            let i = g.i + index.i;
        /*     console.long(i); */
            let j = g.j + index + j;

            if (i >= this.maxHCnt) {
                i = 0;
            }
            if (j >= this.maxWCnt) {
                j = 0;
            }
            if (i < 0) {
                i = this.maxHCnt - 1;
            }
            if (j < 0) {
                j = this.maxWCnt - 1;
            }
            let cellState = stateMap[i][j];
            if (cellState != 0) totaLife++;
        }
        if (totaLife == 3) {
            return 1;//存活
        }
        else if (totaLife == 2) {
            return -1;//不变
        }
        else {
            return 0;//死亡
        }
    }
});
