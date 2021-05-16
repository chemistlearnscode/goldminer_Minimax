// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const status = {
  rotate: 0,
  add: 1,
  reduce: 2,
};

const map1 = {
  posGold: [
    { x: 0, y: 0, score: 100, scale: 1 },
    { x: -400, y: -300, score: 100, scale: 0.5 },
    { x: 80, y: -300, score: 100, scale: 1.5 },
  ],
  posDiamond: [
    { x: 100, y: 50, score: 200, scale: 1 },
    { x: -100, y: -100, score: 200, scale: 1 },
  ],
  posStone: [
    { x: -300, y: -200, score: 10, scale: 1 },
    { x: 280, y: -100, score: 20, scale: 2 },
  ],
  target: 100,
  totalTime: 15,
};
const map2 = {
  posGold: [
    { x: 1, y: 20, score: 100, scale: 1 },
    { x: 100, y: -300, score: 50, scale: 0.5 },
  ],
  posDiamond: [
    { x: 100, y: -200, score: 200, scale: 1 },
    { x: -100, y: -100, score: 200, scale: 1 },
  ],
  posStone: [
    { x: -300, y: -200, score: 10, scale: 1 },
    { x: 150, y: -100, score: 20, scale: 2 },
  ],
  target: 300,
  totalTime: 10,
};
const map3 = {
  posGold: [
    { x: 300, y: -20, score: 100, scale: 1 },
    { x: -1, y: -200, score: 50, scale: 0.5 },
  ],
  posDiamond: [
    { x: 200, y: -200, score: 200, scale: 1 },
    { x: -280, y: -200, score: 200, scale: 1 },
  ],
  posStone: [
    { x: -150, y: 50, score: 10, scale: 1 },
    { x: 270, y: -150, score: 20, scale: 2 },
    { x: 0, y: 0, score: 30, scale: 2.2 },
  ],
  target: 400,
  totalTime: 10,
};
const map4 = {
  posGold: [
    { x: 0, y: 20, score: 100, scale: 1 },
    { x: 100, y: -300, score: 100, scale: 0.5 },
    { x: 320, y: -50, score: 200, scale: 1.5 },
  ],
  posDiamond: [
    { x: 100, y: -150, score: 200, scale: 1 },
    { x: -100, y: -100, score: 200, scale: 1 },
    { x: -180, y: -250, score: 100, scale: 0.5 },
  ],
  posStone: [
    { x: -300, y: -200, score: 10, scale: 1 },
    { x: 150, y: -100, score: 20, scale: 2 },
  ],
  target: 500,
  totalTime: 10,
};
const map5 = {
  posGold: [
    { x: 250, y: -70, score: 100, scale: 1 },
    { x: -100, y: -300, score: 50, scale: 0.75 },
    { x: 180, y: -250, score: 150, scale: 1.5 },
  ],
  posDiamond: [
    { x: 50, y: -150, score: 100, scale: 1 },
    { x: -150, y: -100, score: 100, scale: 1 },
  ],
  posStone: [
    { x: -300, y: -200, score: 10, scale: 1 },
    { x: 0, y: 0, score: 20, scale: 2 },
  ],
  target: 600,
  totalTime: 10,
};
const Emitter = require("mEmitter");

cc.Class({
  extends: cc.Component,

  properties: {
    rope: cc.Node,
    gold: cc.Prefab,
    diamond: cc.Prefab,
    stone: cc.Prefab,
    hook: cc.Node,
    listItems: cc.Node,
    _currentItem: cc.Node,
    timer: cc.ProgressBar,
    _totalScore: (cc.Float = 0),
    totalScore: cc.Label,
    // _currentTarget: cc.Float,
    target: cc.Label,
    _isRotate: true,
    _rotateSpeed: {
      default: 60,
      serializable: false,
    },
    _lengthSpeed: {
      default: 200,
      serializable: false,
    },
    _standardRopeHeight: {
      default: 50,
      serializable: false,
    },
    _x: 0,
    _y: 0,
    _currentLevel: (cc.Float = 1),
    _currentTime: cc.Float,
    // _iswaitState:false,
    // _time:0
  },

  initMap() {
    var map;
    switch (this._currentLevel) {
      case 1:
        map = map1;
        break;
      case 2:
        map = map2;
        break;
      case 3:
        map = map3;
        break;
      case 4:
        map = map4;
        break;
      case 5:
        map = map5;
        break;
      default:
        break;
    }
    const { posGold, posDiamond, posStone, target, totalTime } = map;
    this.target.string = target;
    this._currentTime = totalTime;
    this.currentMap = map;
    for (let i = 0; i < posGold.length; i++) {
      let gold = cc.instantiate(this.gold);
      this.listItems.addChild(gold);
      gold.getComponent("item").setData(posGold[i]);
    }
    for (let i = 0; i < posDiamond.length; i++) {
      let diamond = cc.instantiate(this.diamond);
      this.listItems.addChild(diamond);
      diamond.getComponent("item").setData(posDiamond[i]);
    }
    for (let i = 0; i < posStone.length; i++) {
      let stone = cc.instantiate(this.stone);
      this.listItems.addChild(stone);
      stone.getComponent("item").setData(posStone[i]);
    }
    this._countDown();
  },
  ropeLengthen(dt) {
    //When it becomes longer
    if (this.ropeState == status.add) {
      this.rope.height += this._lengthSpeed * dt;
      this.hook.x += this.hook.angle * this._lengthSpeed * dt;
      this.hook.y -= this._lengthSpeed * dt;
      this._x = this.hook.x;
      this._y = this.hook.y;
      if (
        this.rope.height >= 500 &&
        Math.abs(this.hook.x) >= Math.abs(this.hook.angle * 500)
      ) {
        // this._isRotate = true;
        this.ropeState = status.reduce;
        // cc.log(this.rope);
      }
    } else if (this.ropeState == status.reduce) {
      //When shortening
      this.rope.height -= this._lengthSpeed * dt;
      cc.log(this.hook.x, this.hook.y);
      if (this.hook.y <= this._standardRopeHeight - 25) {
        this.hook.y += this._lengthSpeed * dt;
      }
      this.hook.x -= this.hook.angle * this._lengthSpeed * dt;
      //When the length is less than or equal to the initial length
      if (this.rope.height <= this._standardRopeHeight) {
        //The rope starts spinning again
        this._isRotate = true;
        //Reset various attributes
        this.ropeState = status.rotate;
        this.rope.height = this._standardRopeHeight;
        this.node.angle = 0;
        // console.log(this.rope.height );
        if (this._currentItem) {
          this._currentItem.active = false;
          this._totalScore += this._currentItem.getComponent("item").getScore();
          this._currentItem.destroy();
          this._currentItem = null;
          this.totalScore.string = this._totalScore;
        }

        // this.rotateSpeed = 100;
      }
    }
  },

  rotateRope(dt) {
    if (!this._isRotate) {
      return;
    }
    if (this.rope.angle >= 85) {
      this._rotateSpeed = -this._rotateSpeed;
    } else if (this.rope.angle <= -85) {
      this._rotateSpeed = Math.abs(this._rotateSpeed);
    }
    this.rope.angle += this._rotateSpeed * dt;
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // this._isRotate=true;
    cc.log(cc.director.getCollisionManager());
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.sendHook, this);
    let manager = cc.director.getCollisionManager();
    manager.enabled = true;
    manager.enabledDebugDraw = true;
    Emitter.instance = new Emitter();
    Emitter.instance.registerEvent(
      "withdrawRope",
      this.withdrawRope.bind(this)
    );
    this.initMap();
  },
  _countDown() {
    this._currentTime -= 1;
    this.timer.progress = this._currentTime / this.currentMap.totalTime;
    if (this._currentTime > 0) {
      setTimeout(() => {
        this._countDown();
      }, 1000);
    }
    if (this.checkIsMapEnd()) this.nextMap();
  },
  nextMap() {
    this.listItems.removeAllChildren();
    // this.ropeState = status.rotateRope;
    this.rope.height = this._standardRopeHeight;
    this.hook.x = this.hook.angle * this.rope.height;
    this.hook.y = -this.rope.height - 10;
    if (this._totalScore >= this.currentMap.target) {
      this._currentLevel++;
      // this.target.string = this.currentMap.target;
      this.initMap();
    } else {
      let ranking = localStorage.ranking;
      if (!ranking) {
        ranking = [];
      } else {
        ranking = JSON.parse(ranking);
      }
      ranking.push({ username: window.username, score: this._totalScore });
      localStorage.ranking = JSON.stringify(ranking);

      //hien popup thua
      console.log("thua");
    }
  },
  checkIsMapEnd() {
    if (this.listItems.children.length == 0 || this._currentTime <= 0) {
      return true;
    }
    return false;
  },

  withdrawRope(node) {
    this.takeItem(node);
    this.ropeState = status.reduce;
  },

  takeItem(node) {
    switch (node.group) {
      case "gold":
      case "diamond":
      case "stone":
        node.x = 0;
        node.y = 0;
        node.parent = this.hook;
        // node.active = false;
        this._currentItem = node;
        break;
    }
  },

  sendHook() {
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

  // onCollisionEnter: function(other,self){
  //     cc.log(self);
  //     cc.log('hi');
  //     cc.log(other);
  //     this.ropeState= status.reduce;
  //     // this.originPosY = this.node.y;
  // },

  start() {
    this.ropeState = status.rotate;
  },

  update(dt) {
    if (this.checkIsMapEnd()) return;
    this.rotateRope(dt);
    this.ropeLengthen(dt);
    // if (this.checkIsMapEnd()) this.nextMap();
    // this._time=dt
  },
});
