// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
cc.Class({
  extends: cc.Component,

  properties: {
    username: cc.Label,
    score: cc.Label,
  },

  // LIFE-CYCLE CALLBACKS:

  setData(data) {
    this.username.string = data.username;
    this.score.string = data.score;
  },

  // update (dt) {},
});
