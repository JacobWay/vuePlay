"use strict";

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import logo from '@/assets/logo.png';

import hello from '../src/components/Hello.vue';
import priceCard from '../src/components/priceCard.vue';

Vue.config.productionTip = true

let debug = true;

var app33 = new Vue({
  el: '#app33',
  data: {
    radios: [1, 2],
    picked: ''
  }
});

(function(){

function main() {
  let canvas = document.querySelector("#movingObjectCanvas");
  let context = canvas.getContext("2d");

  // set starting values
  let fps = 60;
  let percent = 0;
  let direction = 1;

  // start the animation
  animate();

  function animate() {
    
    // set the animation position (0-100)
    percent += direction;
    if(percent < 0){
      percent = 0;
      direction = 1;
    }
    if(percent > 100){
      percent = 100;
      direction = -1;
    }

    draw(percent);

    // request another frame
    setTimeout(function(){
      requestAnimationFrame(animate);
    }, 1000/fps);
  }

  function draw(sliderValue) {
    // redraw path
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 5;

    context.beginPath();
    context.moveTo(100, 20);
    context.lineTo(200, 160);
    context.strokeStyle = 'red';
    context.stroke();

    context.beginPath();
    context.moveTo(200, 160);
    context.quadraticCurveTo(230, 200, 250, 120);
    context.strokeStyle = 'green';
    context.stroke();

    context.beginPath();
    context.moveTo(250, 120);
    context.bezierCurveTo(290, -40, 300, 200, 400, 150);
    context.strokeStyle = 'blue';
    context.stroke();

    context.beginPath();
    context.moveTo(400, 150);
    context.lineTo(500, 90);
    context.strokeStyle = 'gold';
    context.stroke();

    // draw the tracking rectangle
    let xy;
    let percent;
    if(sliderValue < 25){
      percent = sliderValue / 24;
      xy = getLineXYatPercent({
        x: 100,
        y: 20
      }, {
        x: 200,
        y: 160
      }, percent);
    }else if(sliderValue < 50){
      percent = (sliderValue - 25) / 24;
      xy = getLineXYatPercent({
        x: 200,
        y: 160
      }, {
        x: 250,
        y: 120
      }, percent);
    }else if(sliderValue < 75){
      percent = (sliderValue - 50) / 24;
      xy = getLineXYatPercent({
        x: 250,
        y: 120
      }, {
        x: 400,
        y: 150
      }, percent);
    }else{
      percent = (sliderValue - 75) /25;
      xy = getLineXYatPercent({
        x: 400,
        y: 150
      }, {
        x: 500,
        y: 90
      }, percent);
    }

    drawRectangle(xy);

  }

  function getLineXYatPercent(startPoint, endPoint, percent) {
    let dx = endPoint.x - startPoint.x;
    let dy = endPoint.y - startPoint.y;
    let x = startPoint.x + dx * percent;
    let y = startPoint.y + dy * percent;
    return ({
      x: x,
      y: y
    });
  }

  function drawRectangle(point, color) {
    context.fillStyle = 'cyan';
    context.strokeStyle = 'gray';
    context.lineWidth = 3;
    context.beginPath();
    context.rect(point.x-13, point.y-8, 25, 15);
    context.fill();
    context.stroke();
  }
}

main();

})();
/* eslint-disable no-new */

function LineChart_1(options){
  // user defined properties
  this.canvas = document.querySelector(options.canvasId);
  this.minX = options.minX;
  this.minY = options.minY;
  this.maxX = options.maxX;
  this.maxY = options.maxY;
  this.unitsPerTickX = options.unitsPerTickX;
  this.unitsPerTickY = options.unitsPerTickY;

  // constants
  this.padding = 10;
  this.tickSize = 10;
  this.axisColor = '#555';
  this.pointRadius = 5;
  this.fontHeight = 12;

  // relationships
  this.context = this.canvas.getContext('2d');
  this.rangeX = this.maxX - this.minX;
  this.rangeY = this.maxY - this.minY;
  this.numXTicks = Math.round(this.rangeX / this.unitsPerTickX);
  this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY);
  this.x = this.getLongestValueWidth() + this.padding * 2;
  this.y = this.padding * 2;
  this.width = this.canvas.width - this.x - this.padding * 2;
  this.height = this.canvas.height - this.y - this.padding - this.fontHeight;
  this.scaleX = this.width / this.rangeX || 1;
  this.scaleY = this.height / this.rangeY || 1;
  console.log('??? LineChart_1 maxX, minX, rangeX, width: ', this.maxX, this.minX, this.rangeX, this.width);

  // draw x y axis and tick marks
  this.drawXAxis();
  this.drawYAxis();

}

LineChart_1.prototype.getLongestValueWidth = function () {
  let longestValueWidth = 0;
  for (let n=0; n<=this.numYTicks; n++) {
    let value = this.maxY - (n*this.unitsPerTickY);
    longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);
  }
  return longestValueWidth;
};

LineChart_1.prototype.drawXAxis = function () {
  let context = this.context;

  context.save();
  context.beginPath();
  context.moveTo(this.x, this.y + this.height);
  context.lineTo(this.x + this.width, this.y + this.height);
  context.closePath();
  context.strokeStyle = this.axisColor;
  context.lineWidth = 2;
  context.stroke();

  // draw tick marks
  for (let n=0; n<this.numXTicks; n++){
    context.beginPath();
    context.moveTo((n+1)*this.width/this.numXTicks+this.x, this.y+this.height);
    context.lineTo((n+1)*this.width/this.numXTicks+this.x, this.y+this.height-this.tickSize);
    context.closePath();
    context.stroke();
  }

  // draw labels
  context.fillStyle = 'black';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  for (let n=0; n<this.numXTicks; n++) {
    let label = Math.round((n+1)*this.maxX/this.numXTicks);
    context.save();
    context.translate((n+1)*this.width/this.numXTicks+this.x, this.y+this.height+this.padding);
    context.fillText(label, 0, 0);
    context.restore();
  }
  context.restore();
}

LineChart_1.prototype.drawYAxis = function () {
  let context = this.context;
  context.save();

  context.save();
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(this.x, this.y + this.height);
  context.closePath();
  context.strokeStyle = this.axisColor;
  context.lineWidth = 2;
  context.stroke();
  context.restore();

  // draw tick marks
  for (let n=0; n<this.numYTicks; n++) {
    context.beginPath();
    context.moveTo(this.x, n*this.height/this.numYTicks+this.y);
    context.lineTo(this.x+this.tickSize, n*this.height/this.numYTicks+this.y);
    context.closePath();
    context.stroke();
  }

  // draw values
  context.fillStyle = 'black';
  context.textAlign = 'right';
  context.textBaseline = 'middle';

  for (let n=0; n<this.numYTicks; n++) {
    let value = Math.round(this.maxY - n*this.maxY/this.numYTicks);

    context.save();
    context.translate(this.x-this.padding, n*this.height/this.numYTicks+this.y);
    context.fillText(value, 0, 0);
    context.restore();
  }
  context.restore();
};

LineChart_1.prototype.drawLine = function(data, color, width) {
  let context = this.context;

  context.save();
  this.transformContext();
  context.lineWidth = width;
  context.strokeStyle = color;
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(data[0].x * this.scaleX, 0 * this.scaleY);

  for (let n=0; n<data.length; n++) {
    let point = data[n];

    // draw segment
    context.lineTo(point.x*this.scaleX, point.y*this.scaleY);
    context.stroke();

    context.save();
    context.beginPath();
    context.arc(point.x*this.scaleX, point.y*this.scaleY,this.pointRadius, 0, 2*Math.PI, false);
    context.fill();
    context.closePath();
    context.restore();

    // position for next segment
    context.moveTo(point.x*this.scaleX, point.y*this.scaleY);
  }
  context.lineTo(data[data.length-1].x*this.scaleX, 0*this.scaleY);
  context.lineTo(data[0].x*this.scaleX, data[0]*this.scaleY);
  console.log('??? drawLine data: ', data[data.length-1]);
  context.closePath();
  context.fill();
  context.restore();
};

LineChart_1.prototype.transformContext = function () {
  let context = this.context;

  // move context to center of canvas
  context.translate(this.x, this.y + this.height);

  // invert the y scale so that that increments 
  // as you move upwards
  context.scale(1, -1);
};

var app31 = new Vue({
  el: '#app31',
  mounted () {
    let options = {
      canvasId: '#myCanvas',
      minX: 0,
      minY: 0,
      maxX: 140,
      maxY: 100,
      unitsPerTickX: 10,
      unitsPerTickY: 10
    };
    let lineChart = new LineChart_1(options);
    let data = [{
      x: 0,
      y: 0
    }, {
      x: 20,
      y: 10
    }, {
      x: 40,
      y: 15
    }, {
      x: 60,
      y: 40
    }, {
      x: 80,
      y: 60
    }, {
      x: 100,
      y: 50
    }, {
      x: 120,
      y: 85
    }, {
      x: 140,
      y: 100
    }];

    lineChart.drawLine(data, 'blue', 3);

    data = [{
      x: 20,
      y: 85
    }, {
      x: 40,
      y: 75
    }, {
      x: 60,
      y: 75
    }, {
      x: 80,
      y: 45
    }, {
      x: 100,
      y: 65
    }, {
      x: 120,
      y: 40
    }, {
      x: 140,
      y: 35
    }];

    //lineChart.drawLine(data, 'red', 3);
  }
});


var app1 = new Vue({
  el: '#app1',
  data: {
    message: 'Hello Jay!'
  }
});

Vue.component('component1', {
  template: '<div>component1</div>'
});

var app2 = new Vue({
  el: '#app2',
});

Vue.component('my-row', {
  template: '<span>some row</span>'
});

var app3 = new Vue({
  el: '#app3'
});

Vue.component('component2', {
  props: [`myMessage`],
  template: `<div @click="changeValue">{{myMessage}}</div>`,
  methods: {
    changeValue(){
      this.$emit('click', 'change message');
    }
  }
});

var app4 = new Vue({
  el: '#app4',
  data: function(){
    return {
      message: 'good'
    }
  },
  methods: {
    _changeValue(v){
      this.message = v;
    }
  },
});

Vue.component('simpleCounter', {
  template: `
    <button @click='increment'>{{counter}}</button>
  `,
  data: function(){
    return {
      counter: 0
    }
  },
  methods: {
    increment(){
      this.counter += 1;
      this.$emit('click');
    }
  }

});

var app5 = new Vue({
  el: '#app5',
  data: {
    total: 0
  },
  methods: {
    increseTotal(){
      this.total += 1;
    }
  },
});

Vue.component('component3', {
  template: `
    <div @click='update'>{{foo}}</div>
  `,
  props: ['foo'],
  //created(){
    //this.$emit('update:foo', '!');
  //},
  methods: {
    update(){
      this.$emit('update:foo', '!');
    }
  },
});

var app6 = new Vue({
  el: '#app6',
  data: {
    bar: '?'
  },
});


Vue.component('currency-input', {
  template: `
    <span>
      $
      <input 
        v-on:input='updateValue($event.target.value)'
        ref='input'
        :value='value'
      />
    </span>
  `,
  props: ['value'],
  methods: {
    updateValue(value){
      let value_ = value
        .trim()
        .slice(
          0,
          value.indexOf('.') === -1
          ? value.length
          : value.indexOf('.') + 3
        );
      this.$refs.input.value = value_;
      this.$emit('input', value_);
    }
  },
});

var app7 = new Vue({
  el: '#app7',
  data: {
    price: 0
  }

});

Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    value: String
  },
  //props: ['value', 'checked'],
  template: `
    <input 
      type="checkbox"
      :checked="checked"
      :value="value"
      @change="change"
    />
  `,
  methods: {
    change(){
      this.$emit('change', !this.checked);
    }
  }
});

var app8 = new Vue({
  el: '#app8',
  data: {
    foo: true,
    some_value: 'This is a value from parent.'
  },
  methods: {
    changeChecked(value) {
      this.foo = value;
    }
  }

});

Vue.component('my-checkbox-1', {
  template: `
    <input
      type='checkbox'
      :checked='checked'
      :value='value'
      @change='change'
    />
  `,
  props: {
    checked: Boolean,
    value: String
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  methods: {
    change() {
      this.$emit('change', !this.checked);
    }
  }
});

var app9 = new Vue({
  el: '#app9',
  data: function() {
    return {
      foo: true
    }
  },
  methods: {
    //change(value) {
      //this.foo = value;
    //}
  }
});

var bus = new Vue();
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function() {
      return EventBus;
    }
  }
})

Vue.component('component3', {
  template: `
    <div @click='change'>
      {{id}}
    </div>
  `,
  props: ['id'],
  methods: {
    change() {
      this.$bus.$emit('idSelected', 3);
    }
  },
  mounted() {
  }
});

Vue.component('component4', {
  template: `
    <div>
      {{id}}
    </div>
  `,
  props: ['id'],
});

var app10 = new Vue({
  el: '#app10',
  data: function() {
    return {
      id: '?'
    }
  },
  mounted() {
    let self = this;
    this.$bus.$on('idSelected', function(value) {
      self.id = value;
    });
  },
  methods: {
  }
});

Vue.component('app-layout', {
  template: `
    <div>
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  `,

});

var app11 = new Vue({
  el: '#app11',
});

Vue.component('child', {
  template: `
    <div class="child">
      <slot text="hello from child"></slot>
    </div>
  `,

});

var app12 = new Vue({
  el: '#app12',
});

Vue.component('my-awesome-list', {
  template: `
    <ul>
      <slot name="item"
        v-for="item in items"
        :text="item.text"
      >
      </slot>
    </ul>
  `,
  props: ['items'],
  mounted(){
  }

});

var app13 = new Vue({
  el: '#app13',
  data: function(){
      let items = [
        {
          text: 'list 1'
        },
        {
          text: 'list 2'
        },
        {
          text: 'list 3'
        },
      ]
    return {items};
  },
});

Vue.component('component-14', {
});

var app14 = new Vue({
  el: '#app14',
  components: {
    home: {
      template: `
        <div>
          This is a home page.
        </div>
      `
    },
    posts: {
      template: `
        <div>
          This is a post page.
        </div>
      `
    }
  },
  data: {
    currentView: 'home'
  },
  mounted(){
    let self = this;
    setTimeout(function(){
      self.currentView = 'posts';
    }, 500);
  }
});

Vue.component('component-15', {
  template: `
    <div>
      <p>
        <span @click='clickAhandler'>{{foo}}</span>
        <span @click='clickBhandler'>{{bar}}</span>
      </p>

      <slot name='icon'></slot>
      <slot name='main-text'></slot>
    </div>
  `,
  props: ['foo', 'bar'],
  methods: {
    clickAhandler(){
      this.$emit('event-a');
    },
    clickBhandler(){
      this.$emit('event-b');
    }
  },
});

var app15 = new Vue({
  el: '#app15',
  data: {
    baz: 'This baz',
    qux: 'This qux',
    logo: logo
  },
  methods: {
    doThis(){
    },
    doThat(){
    }
  },
});

Vue.component('tree-folder-contents', {
  template: `
    <div>
      <ul>
        <li v-for="child in children">
          {{child.name}}
        </li>
      </ul>
    </div>
  `,
  props: ['children']
});

var app16 = new Vue({
  el: '#app16',
  data: {
    folder: {
      name: 'Folder1',
      children: [
        { name: 'Child1' },
        { name: 'Child2' },
      ]
    }
  }
});

Vue.component('tree-folder', {
  template: `
    <p>
      <span>{{folder.name}}</span>
      <tree-folder-contents-1 :children="folder.children" />
    </p>
  `,
  props: ['folder'],
});

Vue.component('tree-folder-contents-1', {
  template: `
    <div>
      <ul>
        <li v-for="child in children">
          <tree-folder v-if="child.children" :folder="child" />
          <span v-else>{{child.name}}</span>
        </li>
      </ul>
    </div>
  `,
  props: ['children']
});

var app17 = new Vue({
  el: '#app17',
  data: {
    folder: {
      name: 'Folder1',
      children: [
        {
          name: 'Child1', 
          children: [
            {name: 'Child11'}
          ]
        },
        {name: 'Child2'},
      ]
    }
  }
});


var app18 = new Vue({
  el: '#app18',
  data: {
    period: 0
  },
  methods: {
  },
  mounted(){
    let c = 100;
    this.period = c;
    let self = this;
    function countDown(){
      setInterval(function(){
        c = c - 1;
        self.period = c;
      }, 1000);
    }
    //countDown();
  },
  watched: {
  }
});

function animate(){
  let start = null;
  let element = document.querySelector('#SomeElementYouWantToAnimate');
  element.style.position = 'absolute';

  function step(timestamp){
    if(!start) start = timestamp;
    let progress = timestamp - start;
    element.style.left = Math.min(progress / 10, 200) + 'px';
    if(progress < 2000){
      window.requestAnimationFrame(step);
    }else{
      start = timestamp;
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
  //step(Date.now());
}

var app19 = new Vue({
  el: '#app19',
  mounted(){
    //this.animate();
  },
  methods: {
    animate: animate
  }
});

function displayTime(duration, timeElement){
  let timer = duration, minutes, seconds;
  setInterval(function(){
    minutes = parseInt( timer / 60, 10 );
    seconds = parseInt( timer % 60, 10 );
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let textContent = minutes + ' : ' + seconds;
    timeElement.textContent = textContent;
    if(--timer < 0){
      timer = duration;
    }
  }, 1000);
}

var app20 = new Vue({
  el: '#app20',
  mounted(){
    let duration = 60 * 5 * 1;
    let timeElement = document.querySelector('.displayTime');
    displayTime(duration, timeElement);
  }
});

function startTimer(duration, display){
  let start = Date.now();
  let minutes, seconds;
  let diff;
  function timer(){
    diff  = duration - (((Date.now() - start)/1000) | 0);
    minutes = parseInt(diff / 60);
    seconds = parseInt(diff % 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let displayContent = minutes + ' : ' + seconds;
    display.textContent = displayContent;

    if(diff < 0){
      start = Date.now();
    }
  }
  timer();
  setInterval(timer, 1000);
}

var app21 = new Vue({
  el: '#app21',
  mounted(){
    let duration = 60*5;
    let timerElement = document.querySelector('.displayTime1');
    startTimer(duration, timerElement);
  }
});

function countDownTimerHelper() {
  let timer = new CountDownTimer(5*60);
  let display = document.querySelector('#time');
  timer.onTick(format).onTick(restart).start();

  function restart() {
    if (this.expired()){
      setTimeout(function() {
        timer.start();
      }, 1000);
    }
  }

  function format(minutes, seconds) {
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    display.textContent = minutes + ' : ' + seconds;
  }
}

function CountDownTimer(duration, granularity){
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function() {
  if(this.running) {
    return;
  }
  this.running = true;

  let diff, self = this, obj;
  let start = Date.now();

  (function timer() {
    diff = self.duration - parseInt((Date.now() - start) / 1000);
    if(diff > 0) {
      setTimeout(timer, self.granularity);
    } else {
      diff = 0;
      self.running = false;
    }

    obj = CountDownTimer.parse(diff);
    self.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, self);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if(typeof(ftn) === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0,
  };
};

var app22 = new Vue({
  el: '#app22',
  mounted() {
    countDownTimerHelper();
  }
});

export function getRemainingTime(endTime){
  let total, days, hours, minutes, seconds;
  let endTimeMS = Date.parse(endTime);
  let startTimeMS = Date.parse(new Date());
  total = endTimeMS - startTimeMS;
  seconds = Math.floor((total/1000) % 60);
  minutes = Math.floor((total/(1000*60)) % 60);
  hours = Math.floor((total/(1000*60*24)) % 24);
  days = Math.floor(total/(1000*60*24));
  return {
    total,
    days,
    hours,
    minutes,
    seconds
  }
}


var app24 = new Vue({
  el: '#app24',
  components: {
    hello
  }
});

var app25 = new Vue({
  el: '#app25',
  components: {
    priceCard
  }
});

var app26 = new Vue({
  el: '#app26',
  data: {
    dataObj: {
      a: 1
    }
  },
  computed: {
    dataObjClone: function(){
      //return JSON.parse(JSON.stringify(this.dataObj));
      let newObj = Object.assign({}, this.dataObj);
      return newObj;
    }
  },
  watch: {
    dataObjClone: function(newVal, oldVal){
    }
  }
});

window.app26 = app26;

var app27 = new Vue({
  el: '#app27',
  data: {
    items: [{name: 'J', age: '22'}, {name: 'R', age: '33'}]
  },
  watch: {
    itemsClone: function(newVal, oldVal){
    }
  },
  computed: {
    itemsClone: function(){
      let newItems = this.items.slice(0);
      //return newItems;
      return JSON.parse(JSON.stringify(this.items));
    }
  },
  methods: {
    changeAge: function(item, event){
    }
  },

});

window.app27 = app27;


let app28 = new Vue({
  el: '#app28',
  data() {
    return {
      now: 0,
      intervalId: 0
    }
  },
  mounted() {
    let self = this;
    function step(ts){
      self.now = Date.now();
      self.intervalId = requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  },
  computed: {
    difference () {
      let [year, month, day, hour, minute, second] = [2017, 7, 13, 21, 45, 0];
      let objectTime = Date.parse(new Date(year, month, day, hour, minute, second));
      let difference = Math.floor((objectTime - this.now)/1000);
      if(difference <= 0){
        cancelAnimationFrame(this.intervalId);
      }
      return difference;
    }
  },
  methods: {
  },
  watched: {
  }
});

function draw () {
  let canvas = document.querySelector('#canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    ctx.fillRect(0, 0, 50, 50);
    ctx.clearRect(10, 10, 10, 10);
    ctx.strokeRect(10, 10, 5, 5);

  }
}

function drawTriangle () {
  let canvas = document.querySelector('#canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo( 100, 100 );
    ctx.lineTo( 200, 100 );
    ctx.lineTo( 100, 200 );
    ctx.closePath();
    ctx.fill();
  }
}

function drawSmile () {
  let canvas = document.querySelector('#canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
    ctx.moveTo(25, 25);
    ctx.arc(25, 25, 10, 0, Math.PI * 2, true);
    ctx.moveTo(75, 25);
    ctx.arc(75, 25, 10, 0, Math.PI * 2, true);
    ctx.moveTo(50, 55);
    ctx.arc(50, 55, 30, Math.PI * 1, Math.PI * 2, true);
    ctx.stroke();
  }
}

function drawTwoTriangles () {
  let canvas = document.querySelector('#canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(75, 25);
    ctx.lineTo(25, 75);
    ctx.lineTo(25, 25);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(25, 75);
    ctx.lineTo(75, 75);
    ctx.lineTo(75, 25);
    ctx.closePath();
    ctx.stroke();

    ctx.lineTo(200, 200);
    ctx.stroke();

  }
}

function drawLoopFor () {
  let canvas = document.querySelector('#canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    for (let i=0; i<4; i++) {
      for (let j=0; j<3; j++) {
        ctx.beginPath();
        let x = 25 + j * 50;
        let y = 25 + i * 50;
        let radius = 20;
        let startAngle = 0;
        let endAngle = Math.PI + (Math.PI * j) / 2;
        let anticlockwise = i % 2 !== 0;

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i > 1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }

      }
    }
  }
}

function drawPath2D () {
  let canvas = document.querySelector('#canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';

    let rectangle = new Path2D();
    rectangle.rect(10, 10, 30, 30);
    ctx.stroke(rectangle);

    let circle = new Path2D();
    circle.arc(100, 100, 50, 0, Math.PI, true);
    ctx.stroke(circle);
    ctx.fill(circle);

    ctx.strokeStyle = 'blue';

    ctx.arc(200, 200, 10, 0, Math.PI * 2, false);
    ctx.stroke();

    let p = new Path2D('M10 10 h 80 v 80 h -80 Z');
    ctx.stroke(p);

  }
}

function drawGlobalAlpha () {
  let canvas = document.querySelector('#canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fd0';
    ctx.fillRect(10, 10, 50, 50);

    ctx.globalAlpha = 0.2;

    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.arc(60, 60, 10 + 10 * i, 0, Math.PI * 2);
      ctx.fill();
    }
  }


}

var app29 = new Vue({
  el: '#app29',
  mounted() {
    //draw();
    //drawTriangle();
    //drawSmile();
    //drawTwoTriangles();
    //drawLoopFor();
    //drawPath2D();
    drawGlobalAlpha();
  }
});


let data = [
  {
    x: 120,
    y: 48
  },
  {
    x: 240,
    y: 96
  },
  {
    x: 360,
    y: 144
  },
  {
    x: 480,
    y: 192
  },
  {
    x: 840,
    y: 336
  },
  {
    x: 1100,
    y: 30
  },
];

function drawDepthChart () {
  let canvas = document.querySelector('#depthChart');
  let ctx = canvas.getContext('2d');
  let options = {
    canvasId: '#depthChart',
    maxX: 1200,
    minX: 0,
    maxY: 480,
    minY: 0,
    unitsPerTickX: 120,
    unitsPerTickY: 48,
  }
  let fillColor = 'LightCoral';

  let lineChart = new LineChart(options);
  lineChart.drawXAxis();
  lineChart.drawYAxis();
  lineChart.drawLine(data, fillColor);
}

function LineChart (options) {
  // user defined properties
  this.canvas = document.querySelector(options.canvasId);
  this.maxX = options.maxX;
  this.minX = options.minX;
  this.maxY = options.maxY;
  this.minY = options.minY;
  this.unitsPerTickX = options.unitsPerTickX;
  this.unitsPerTickY = options.unitsPerTickY;

  // constants
  this.padding = 10;
  this.axisColor = '#555';
  this.tickSize = 10;
  this.fontHeight = 12;

  // relationships
  this.context = this.canvas.getContext('2d');
  this.rangeY = this.maxY - this.minY;
  this.rangeX = this.maxX - this.minX;
  this.numXTicks = Math.round(this.rangeX / this.unitsPerTickX);
  this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY);
  this.x = this.getLongestValueWidth() + this.padding * 2;
  this.y = this.padding * 2;
  this.width = this.canvas.width - this.x - this.padding * 2;
  this.height = this.canvas.height - this.y - this.padding - this.fontHeight;
}

LineChart.prototype.getLongestValueWidth = function () {
  let longestValueWidth = 0;
  for (let n = 0; n <= this.numYTicks; n++) {
    let value = this.maxY - (n * this.unitsPerTickY);
    let width = this.context.measureText(value).width;
    longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);
  }
  return longestValueWidth;
};

LineChart.prototype.drawXAxis = function () {
  let context = this.context;
  context.save();

  // draw the xAxis
  context.beginPath();
  context.moveTo(this.x, this.y + this.height);
  context.lineTo(this.x + this.width, this.y + this.height);
  context.strokeStyle = this.axisColor;
  context.lineWidth = 2;
  context.stroke();

  // draw tick marks
  for (let n = 0; n < this.numXTicks; n++) {
    context.beginPath();
    context.moveTo((n+1)*this.width/this.numXTicks + this.x, this.y + this.height);
    context.lineTo((n+1)*this.width/this.numXTicks + this.x, this.y + this.height-this.tickSize);
    context.stroke();
  }

  // draw labels
  context.fillStyle = 'black';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  for (let n=0; n<this.numXTicks; n++){
    let label = Math.round((n+1)*this.maxX/this.numXTicks);
    context.save();
    context.translate((n+1)*this.width/this.numXTicks + this.x, this.y + this.height + this.padding);
    context.fillText(label, 0, 0);
    context.restore();
  }
  context.restore();
  
};

LineChart.prototype.drawYAxis = function () {
  let {context, x, y, height, numYTicks, tickSize, fontHeight, maxY } = this;

  // draw y axis
  context.moveTo(x, y);
  context.lineTo(x, y + height);
  context.stroke();

  // draw tick marks
  for (let n=0; n<numYTicks; n++) {
    context.moveTo(x, (n) * (height/numYTicks) + y);
    context.lineTo(x+tickSize, (n) * (height/numYTicks) + y);
    context.stroke();
  }

  // draw labels
  context.fillStyle = 'black';
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  for (let n=0; n<numYTicks; n++) {
    let label = Math.round((numYTicks-n)*(maxY/numYTicks));
    context.fillText(label, x-tickSize-fontHeight, (n) * (height/numYTicks) + y);
  }
}

LineChart.prototype.drawLine = function (data, fillColor) {
  let {context, y} = this;
  let length = data.length;
  this.transformContext();
  context.moveTo(data[0].x, 0);
  for (let d of data) {
    context.lineTo(d.x, d.y);
  }
  context.lineTo(data[length-1].x, 0)
  context.fillStyle = fillColor;
  context.fill();
};

LineChart.prototype.transformContext = function () {
  let {context} = this;
  context.translate(this.x, this.y + this.height);
  context.scale(1, -1);
}

var app30 = new Vue({
  el: '#app30',
  mounted () {
    drawDepthChart();
  }
});
