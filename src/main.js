// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import logo from '@/assets/logo.png';

import hello from '../src/components/Hello.vue';
import priceCard from '../src/components/priceCard.vue';

Vue.config.productionTip = true

/* eslint-disable no-new */
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
      console.log('??? Coming from event a.');
    },
    doThat(){
      console.log('??? Coming from event b.');
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

