Countdown = function () {
    _(this).bindAll('update', 'executeAnimation', 'finishAnimation');
    this.setVars.apply(this, arguments);
    this.update();
};
Countdown.prototype = {
    duration: 1000,
    setVars: function (time, el, template) {
        this.max = time;
        this.time = time;
        this.countNum=time;
        this.el = el;
        this.template = _(template.innerHTML).template();
        this.delta = -1;
        this.isPause=true;
    },
    reset:function () {
        this.time = this.countNum;
    },
    stopCount:function () {
        this.isPause=true;
    },
    reStartCount:function () {
        this.reset();
        if(this.isPause){
            this.isPause=false;
            this.update();
        }
    },
    update: function () {
        if(this.isPause){
            return;
        }
        this.checkTime();
        this.setSizes();
        this.setupAnimation();
        _(this.executeAnimation).delay(20);
        _(this.finishAnimation).delay(this.duration * 0.9);
        _(this.update).delay(this.duration);
    },
    checkTime: function () {
        this.time += this.delta;
        if (this.time === 0){
            var randomAns=new Array("A","B","C","D")
            selectedAnswer=randomAns[Math.round(Math.random()*3)];
            console.log(selectedAnswer);
            Ans(selectedAnswer);
            alert("玩家超时！将由电脑托管，随机为玩家选择答案！");
        }
        this.toggleDirection('down', 'up');
        this.nextTime = this.time + this.delta;
    },
    toggleDirection: function (add, remove) {
        this.el.classList.add(add);
        this.el.classList.remove(remove);
    },
    setSizes: function () {
        this.currentSize = this.getSize(this.time);
        this.nextSize = this.getSize(this.nextTime);
    },
    getSize: function (time) {
        return time > 9 ? 'small' : '';
    },
    setupAnimation: function () {
        this.el.innerHTML = this.template(this);
        this.el.classList.remove('changed');
    },
    executeAnimation: function () {
        this.el.classList.add('changing');
    },
    finishAnimation: function () {
        this.el.classList.add('changed');
        this.el.classList.remove('changing');
    }
};
var maxCountdownNum=30;
var Countdown=new Countdown(maxCountdownNum, document.querySelector('.count'), document.querySelector('#count-template'));
$(document).ready(function() {
    $("#startCount").click(function () {
        if(!this.Countdown){
            Countdown.reStartCount();
        }
    });

    $("#resetCount").click(function () {
        if(!this.Countdown){
            Countdown.stopCount();
        }
    });
})