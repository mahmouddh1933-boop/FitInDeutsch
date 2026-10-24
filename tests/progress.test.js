import test from 'node:test';
import assert from 'node:assert/strict';
import {topics,initialProgress,finishLesson,readProgress} from '../src/data.js';
test('all themes have distinct picture words and a four-part sentence',()=>{assert.equal(topics.length,6);for(const topic of topics){assert.equal(new Set(topic.words.map(w=>w[1])).size,4);assert.equal(topic.sentence.length,4);}});
test('repeat lessons count activity without inflating unique word and theme totals',()=>{const p=finishLesson(initialProgress,topics[0],'2026-10-24');const again=finishLesson(p,topics[0],'2026-10-24');assert.equal(again.learned.length,4);assert.equal(again.completed.length,1);assert.equal(again.daily['2026-10-24'],2);assert.equal(again.days.length,1);assert.equal(again.xp,60);assert.equal(initialProgress.xp,0);});
test('invalid stored state falls back safely',()=>{for(const value of ['invalid','null','{}','{"xp":-1}']){assert.deepEqual(readProgress({getItem:()=>value}),initialProgress);}assert.deepEqual(readProgress({getItem(){throw Error('blocked')}}),initialProgress);});
