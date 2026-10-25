import {legacyTopics} from './grammar/legacy.js';
import {enrichment} from './grammar/enrichment.js';
import {grade1} from './grammar/grade1.js';
import {grade2} from './grammar/grade2.js';
import {grade3} from './grammar/grade3.js';
import {grade4} from './grammar/grade4.js';
import {plainGrammar} from './grammar/helpers.js';
const existing=legacyTopics.map(t=>({...t,...enrichment[t.id],title:enrichment[t.id].title||t.title,questions:[...t.questions,...enrichment[t.id].extra]}));
export const grammarGradeOrder={
 1:['nouns','verbs','adjectives','noun-capitals','sentence-capitals','plural','sentence-words','full-stop'],
 2:['articles','indefinite','infinitive','personal-forms','opposites','statements','question-sentences','exclamations','present','sein','haben','negation','questions','order','place'],
 3:['pronouns','possessive','comparison','compound-nouns','compound-verbs-adjectives','rearrange','subject','predicate','past-simple','perfect','prefixes','suffixes'],
 4:['cases','nominative','genitive','dative','accusative','dative-object','accusative-object','adverb-place','adverb-time','future','past-perfect','speech-before','speech-after','quotation-marks','main-subordinate','conjunction-commas','nominalized-verbs','nominalized-adjectives']
};
const all=[...existing,...grade1,...grade2,...grade3,...grade4];
export const grammarTopics=Object.values(grammarGradeOrder).flatMap(ids=>ids.map(id=>all.find(t=>t.id===id)));
export const grammarTaskCount=grammarTopics.reduce((n,t)=>n+t.questions.length,0);
export function grammarQuestions(topic){return topic.questions.map((q,i)=>({...q,id:`grammar:${topic.id}:${i}`,mode:'grammar',hint:q.hint||topic.steps[0],options:q.options?[...q.options.slice(i%q.options.length),...q.options.slice(0,i%q.options.length)]:undefined}));}
export function grammarSearchText(topic){return plainGrammar(`${topic.title} ${topic.rule} ${topic.steps.join(' ')} ${topic.examples.map(e=>e.text).join(' ')}`);}
