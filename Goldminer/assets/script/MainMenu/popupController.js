// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Emitter = require("mEmitter");

cc.Class({
  extends: cc.Component,

  properties: {
    play: cc.Sprite,
    setting: cc.Sprite,
    ranking: cc.Sprite,
    _currentPop: null,
  },

  showWindow(args) {
    this._currentPop = args;
    args.node.active = true;
    args.node.opacity = 0;
    args.node.scale = 0.2;
    cc.tween(args.node)
      .to(0.5, { scale: 1, opacity: 255 }, { easing: "quartInOut" })
      .start();
  },

  hideWindow() {
    cc.tween(this._currentPop.node)
      .to(0.5, { scale: 0.2, opacity: 0 }, { easing: "quartInOut" })
      .call(() => {
        this._currentPop.node.active = false;
      })
      .start();
  },

  clickPopup(str) {
    let args = null;
    if (str === "play") args = this.play;
    else if (str === "setting") args = this.setting;
    else args = this.ranking;
    this.showWindow(args);
  },

  // },
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    Emitter.instance.registerEvent("showWindow", this.clickPopup.bind(this));
    // cc.log('popup controller');
  },

  start() {},

  // update (dt) {},
});
