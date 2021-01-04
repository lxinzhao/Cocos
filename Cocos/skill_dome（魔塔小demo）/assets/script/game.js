// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        mapNode: cc.Node,
        dialogNode: cc.Node,
        loadNode:cc.Node,
    },



    onLoad() {
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        //碰撞区域的提示框
        /*  p.debugDrawFlags = true; */
        p.gravity = cc.v2(0, 0);

            cc.director.getCollisionManager().enabled = true; 
        /*  cc.director.getCollisionManager().enabledDebugDraw = true; */

        this.loadNode.active=true;

        let mapNameArr = [
            ['00000', '01010', '00100'],
            ['00010', '11110', '00100'],
            ['00000', '11000', '00000'],
            ['00000', '10000', '00000'],
        ];
        this.initMap(mapNameArr);
    },
    //根据地图名字数组生成地图
    initMap(mapNameArr) {
        let mapSt = null;
        let loadcnt=0;
        //多少个mapNameArr
        for (let i = 0; i < mapNameArr.length; i++) {
            console.log(mapNameArr.length);
            //当前这行的长度
            for (let j = 0; j < mapNameArr[i].length; j++) {
                console.log(mapNameArr[i].length);
                let mapName = mapNameArr[i][j];
                if (!mapName || mapName == '00000') continue;
                if(!mapSt)
                {
                    mapSt={i,j};
                }
                loadcnt++;

                cc.loader.loadRes(`map/${mapName}`, cc.TiledMapAsset, (err, assets) => {
                    let node = new cc.Node();
                    let map = node.addComponent(cc.TiledMap);
                    node.anchorX = node.anchorY = 0;
                    node.x=(j-mapSt.j)*384;
                    node.y=-(i-mapSt.i)*384;

                    map.tmxAsset=assets;
                    node.parent=this.mapNode;
                    this.initMapNode(node);
                    if(--loadcnt==0)
                    {
                        this.loadNode.active=false;
                    }
                });
            }
        }
    },
    initMapNode(mapNode) {
        let tiledMap = mapNode.getComponent(cc.TiledMap);
        //给tiledMap wall层添加碰撞检测
        let tiledSize = tiledMap.getTileSize();

        let layer = tiledMap.getLayer("wall");
        let layerSize = layer.getLayerSize();

        /* let smoglayer = tiledMap.getLayer("smog");
           smoglayer.node.active = true; */

        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.gid != 0) {
                    //节点的分组
                    tiled.node.group = "wall";
                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    /*  collider.Restitution = 0.2; */
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2)
                    collider.size = tiledSize;
                    collider.apply();
                }
                /*  tiled = smoglayer.getTiledTileAt(i, j, true);
                 if (tiled.gid != 0) {
                     //迷雾
                     tiled.node.group = "smog"
                     let collider = tiled.node.addComponent(cc.BoxCollider);
                     collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2)
                     collider.size = tiledSize;
                 } */
            }

        }
    },
    start() {
        this.dialog = this.dialogNode.getComponent('dialog');
        this.dialog.init([
            { role: 1, content: '...' },
            { role: 2, content: "我是魔王" },
            { role: 1, content: '我穿越了？' },
            { role: 2, content: "是的年轻人" },
            { role: 1, content: '嘶~我怎么死的' },
            { role: 2, content: "拉屎的时候马桶炸了你就死了" },
            { role: 1, content: '可恶啊 这么窝囊 岂可修' },
            { role: 2, content: "想得到我的宝藏吗 那就来寻找吧 哈哈哈哈哈" },
            { role: 1, content: '？？？' },
        ]); 
    },

    // update (dt) {},
});
