// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    rankItem: cc.Prefab,
    listContent: cc.Node,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.renderData();
  },

  start() {},
  renderData() {
    let listData = localStorage.ranking;
    let itemheight = 50;
    if (listData) {
      listData = JSON.parse(listData);
      listData = listData.sort((x, y) => (+x.score > +y.score ? -1 : 1));
      listData = listData.slice(0, 9);
      listData.forEach((item, i) => {
        console.log(item);
        let object = cc.instantiate(this.rankItem);
        object.getComponent("rankItem").setData(item);
        object.y = -100 - i * itemheight;
        this.listContent.addChild(object);
      });
      this.listContent.height = listData.length * itemheight + 100;
    }
  },
  // update (dt) {},
});
