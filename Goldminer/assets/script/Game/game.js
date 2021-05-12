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
        rope:cc.Sprite,
        _isRotate:true,
        rotateSpeed:60,
    },

    rotateRope(dt){
        if (!this._isRotate){
            return;
        }
        if (this.rope.node.angle >=75){
            this.rotateSpeed = -this.rotateSpeed;
        } else if (this.rope.node.angle <= -75){
            this.rotateSpeed = Math.abs(this.rotateSpeed);
        }
        this.rope.node.angle += this.rotateSpeed*dt;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.rotateRope(dt);
    },
});
