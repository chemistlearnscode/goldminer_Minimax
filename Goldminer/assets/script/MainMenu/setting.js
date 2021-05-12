// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Emitter = require('../mEmitter')

cc.Class({
    extends: cc.Component,

    properties: {
        ctrmusic:cc.Toggle,
        music: cc.AudioSource,
    },

    controlMusic(){
        if(this.ctrmusic.isChecked==false){
            this.music.pause();
        }else{
            this.music.play();
        }
    },

    // onClickStart() {
    //     cc.director.loadScene("game");
    // },

    // turnOnMusic(){
    //     this.music.play();
    // },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // cc.log(this.ctrmusic);
    },

    // update (dt) {},
});
