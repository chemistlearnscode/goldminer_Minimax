// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const status={
    rotate: 0,
    add: 1,
    reduce: 2,
}

cc.Class({
    extends: cc.Component,

    properties: {
        rope: cc.Sprite,
        _isRotate: true,
        _rotateSpeed: 60,
        _lengthSpeed: 100000,
        _standardRopeHeight: 50,
        // _iswaitState:false,
        // _time:0
    },

    ropeLengthen(dt){
        //When it becomes longer
    if (this.ropeState == status.add) {
        this.rope.node.height += this._lengthSpeed * dt;
        if(this.rope.node.height>=500){
            // this._isRotate = true;
            this.ropeState = status.reduce;
            cc.log("hihi");
        }
    } else if (this.ropeState == status.reduce) {
                 //When shortening
        this.rope.node.height -= this._lengthSpeed * dt;
                 //When the length is less than or equal to the initial length
        if (this.rope.node.height <= this._standardRopeHeight) {
                         //The rope starts spinning again
            this._isRotate = true;
                         //Reset various attributes
            this.ropeState = status.rotate;
            this.rope.node.height = this._standardRopeHeight;
            this.node.angle = 0;
            // this.rotateSpeed = 100;
        }
    }
    },

    rotateRope(dt) {
        if (!this._isRotate) {
            return;
        }
        if (this.rope.node.angle >= 85) {
            this._rotateSpeed = -this._rotateSpeed;
        } else if (this.rope.node.angle <= -85) {
            this._rotateSpeed = Math.abs(this._rotateSpeed);
        }
        this.rope.node.angle += this._rotateSpeed * dt;
    },



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this._isRotate=true;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.takeGold, this);
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
    },

    takeGold(){
        this._isRotate = false;
        // if (this.ropeState == status.add&&this.rope.node.height>=600) {
        //     this.ropeState = status.reduce;
        // }
             // Click while the rope is waiting, the rope will switch to the variable length state
        if (this.ropeState == status.rotate) {
            this.ropeState = status.add;
        }
    },

    // sendHook() {
    //     this._isRotate = false;
    //     // this.rope.node.height += this._lengthSpeed * this._time;
    //     // if (this.rope.node.height >= 400) {
    //     //     this.rope.node.height -= this._lengthSpeed * this._time;
    //     // } else if (this.rope.node.height <= this._standardRopeHeight) {
    //     //     this.rope.node.height = this._standardRopeHeight;
    //     //     this._isRotate = true;
    //     //     this.isClick=false
    //     // }
    //     cc.tween(this.rope.node)
    //     .to(1,{height:600})
    //     .to(3,{height: this._standardRopeHeight})
    //     .call(()=>{
    //         this._isRotate = true;
    //     })
    //     .start()
    //     // this._isRotate = true;
    // },



    

    start() {
        this.ropeState=status.rotate;
    },

    update(dt) {
        this.rotateRope(dt);
        this.ropeLengthen(dt);
        // this._time=dt
    },
});
