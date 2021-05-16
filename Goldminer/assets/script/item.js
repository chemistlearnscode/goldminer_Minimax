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
        type :cc.String,
        score:cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    getScore(){
        return this.score;
    },

    setData (data) {
        this.node.x=data.x;
        this.node.y=data.y;
        this.node.scale=data.scale;
        this.score=data.score;
        // if(this.type==="diamond"){
        //     this.node.scale= randomNumber(0.75,1);
        // }else{
        //     this.node.scale=randomNumber(0.5,1);
        // }
        // let maxY= cc.winSize.height/2-210-this.node.height/2;
        // let minY=-cc.winSize.height/2+this.node.height/2;
        // let maxX = cc.winSize.width/2-this.node.width/2;
        // let minX = -cc.winSize.width/2+this.node.width/2;
        // const ranX = randomNumber(minX,maxX);
        // const ranY = randomNumber(minY,maxY)
        // this.node.y = ranY;
        // this.node.x= ranX;
        // cc.log(ranX,ranY);
        // cc.log(ranY);
    },

    // update (dt) {},
});
