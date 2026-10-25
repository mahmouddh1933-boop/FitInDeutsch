import test from 'node:test';
import assert from 'node:assert/strict';
import {topics} from '../src/data.js';
import {definitions,definitionDistractors} from '../src/definitions.js';
test('every one of the 400 words has its own edited German definition',()=>{const words=topics.flatMap(t=>t.words.map(w=>w[0]));assert.equal(Object.keys(definitions).length,400);for(const word of words){const definition=definitions[word];assert.ok(definition&&definition.length>=15,word);const target=word.replace(/^(der|die|das) /,'').toLocaleLowerCase('de');const text=' '+definition.toLocaleLowerCase('de').replace(/[^a-zäöüß ]/g,' ')+' ';assert.equal(text.includes(' '+target+' '),false,word);}});
test('umbrella terms do not compete with their close subtypes',()=>{const school=topics.find(t=>t.id==='school'),transport=topics.find(t=>t.id==='transport');assert.ok(!definitionDistractors(school,'der Rucksack').includes('die Schultasche'));assert.ok(!definitionDistractors(school,'der Stift').includes('der Bleistift'));assert.ok(!definitionDistractors(transport,'das Boot').includes('das Segelboot'));});
