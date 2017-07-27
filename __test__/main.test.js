import {getRemainingTime} from '../src/main.js';

test('get remaining time', () => {
  let endTime = '2017-7-17 18:00:00';
  let time = getRemainingTime(endTime);
  console.log('??? time: ', time);
});
