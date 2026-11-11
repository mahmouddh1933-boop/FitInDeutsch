import {isCorrect} from '../autumn/learning.js';
import {paintScore} from './models.js';
export function bookUnitStatus(unit,record={}){
 const tasks=unit.groups.flatMap(g=>g.tasks).filter(q=>q.type!=='open');
 let total=tasks.length,correct=tasks.filter(q=>record.checked?.[q.id]&&isCorrect(q,record.answers?.[q.id])).length;
 for(const group of unit.groups.filter(g=>g.kind==='painting')){const score=paintScore(group,record);total+=score.total;correct+=score.correct;}
 return {total,correct,ready:total>0&&correct===total};
}
