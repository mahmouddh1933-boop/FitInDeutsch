"""Build the reviewed 500-verb snapshot from german-verbs-dict 3.4.0.
Usage: python3 tools/build-verb-data.py path/to/dist/verbs.json
Data attribution and changes: public/licenses/VERB-DATA-NOTICE.txt.
"""
from pathlib import Path
import json,sys,re,copy
root=Path(__file__).resolve().parent.parent
source=json.loads(Path(sys.argv[1]).read_text())
selection=(root/'src/verbs/selection.txt').read_text().split()
assert len(set(selection))==len(selection)==500
unseparated=set('durchsuchen wiederholen unterhalten unternehmen unterrichten unterschreiben unterstützen untersuchen unterscheiden überfallen übergeben überlassen überleben überlegen übernehmen überprüfen überraschen übersehen überzeugen'.split())
reflexive=set('amüsieren bedanken bewerben beeilen befinden benehmen beschweren einigen entschuldigen entspannen erholen erinnern freuen fürchten gewöhnen interessieren irren konzentrieren kümmern nähern rächen schämen verabschieden verhalten wundern'.split())
sein=set('abfahren abhauen ankommen aufstehen auftauchen aufwachen ausgehen aussteigen ausziehen begegnen bleiben eingehen einfallen einschlafen einsteigen entkommen erwachsen erscheinen fahren fallen fliegen fliehen folgen gehen gelingen geraten geschehen herkommen hierbleiben hingehen kommen landen laufen joggen klettern passieren reisen reiten rennen scheiden schwimmen sein spazieren springen steigen sterben umziehen umgehen verschwinden wachsen wandern weggehen weglaufen weitergehen werden zurückgehen zurückkehren zurückkommen'.split())
impersonal=set('regnen schneien donnern blitzen gelingen geschehen passieren einfallen'.split())
noimperative=set('dürfen können mögen müssen sollen wollen'.split())|impersonal
pairs={'muß':'muss','müß':'müss','wuß':'wuss','wißt':'wisst','paß':'pass','faß':'fass','läßt':'lässt','laßt':'lasst','laß':'lass','haß':'hass','küß':'küss','kuß':'kuss','meß':'mess','miß':'miss','vergiß':'vergiss','vergeß':'vergess','riß':'riss','schmiß':'schmiss','biß':'biss','schloß':'schloss','goß':'goss','floß':'floss','genoß':'genoss','schoß':'schoss','preß':'press','friß':'friss'}
def modern(s):
 for old,new in pairs.items():s=s.replace(old,new)
 if s=='iß':s='iss'
 return s

def weak_past(stem):
 base=stem+('ete' if stem.endswith(('d','t')) else 'te')
 return [base,base+'st',base,base+'n',base+'t',base+'n']

def get_forms(record,tense,prefix='',sep=False):
 result=[]
 for number,person in [('S','1'),('S','2'),('S','3'),('P','1'),('P','2'),('P','3')]:
  form=record[tense].get(number,{}).get(person)
  if form is None and number=='P' and person=='3':form=record[tense]['P']['1']
  assert form is not None,(record['INF'],tense,number,person)
  if isinstance(form,list):
   form=[modern(x) for x in form]
   result.append(form if sep else [''.join(form[1:])+form[0]])
  else:
   form=modern(form)
   if sep and prefix and form.startswith(prefix):form=form[len(prefix):]
   result.append([form,prefix] if sep else [form])
 return result

def record_for(w):
 if w=='frühstücken':
  return {'id':w,'present':[[x] for x in ['frühstücke','frühstückst','frühstückt','frühstücken','frühstückt','frühstücken']],'past':[[x] for x in weak_past('frühstück')],'participle':'gefrühstückt','imperative':['frühstücke','frühstückt'],'auxiliary':'haben'}
 r=copy.deepcopy(source[w]);prefix=''
 first=r['PRÄ']['S']['1']
 if isinstance(first,list):prefix=''.join(first[1:])
 manual={'kennenlernen':'kennen','hierbleiben':'hier','festhalten':'fest','teilnehmen':'teil'}
 if w in manual:prefix=manual[w]
 sep=bool(prefix) and w not in unseparated
 if w=='müssen':r['PRT']={'S':{'1':'musste','2':'musstest','3':'musste'},'P':{'1':'mussten','2':'musstet','3':'mussten'}}
 present=get_forms(r,'PRÄ',prefix,sep);past=get_forms(r,'PRT',prefix,sep)
 # Frequent homographs/variants in the upstream export need a consistent
 # pedagogical reading, rather than mixing strong and weak paradigms.
 if w in ['bereiten','vorbereiten']:
  past=[[x,'vor'] if w=='vorbereiten' else [x] for x in weak_past('bereit')]
 if w in ['bewegen','schaffen','erschrecken','backen']:
  past=[[x] for x in weak_past({'bewegen':'beweg','schaffen':'schaff','erschrecken':'erschreck','backen':'back'}[w])]
 if w=='verzeihen':past=[[x] for x in ['verzieh','verziehst','verzieh','verziehen','verzieht','verziehen']]
 parts=[modern(x) for x in r.get('PA2',[])];assert parts,w
 desired={'bewegen':'bewegt','schaffen':'geschafft','hängen':'gehängt','erschrecken':'erschreckt','senden':'gesendet','verwenden':'verwendet','wenden':'gewendet','werden':'geworden','vorbereiten':'vorbereitet','bereiten':'bereitet','durchsuchen':'durchsucht'}
 pp=desired.get(w,parts[0])
 if w=='erschrecken':present=[[x] for x in ['erschrecke','erschreckst','erschreckt','erschrecken','erschreckt','erschrecken']]
 if sep:
  base=w[len(prefix):];base_r=source.get(base,{})
  du=base_r.get('IMP',{}).get('S')
  if not du:du=present[0][0]
  if isinstance(du,list):du=' '.join(du)
  du=modern(du)
 else:
  du=r.get('IMP',{}).get('S') or present[0][0]
  if isinstance(du,list):du=''.join(du[1:])+du[0]
  du=modern(du)
 if w=='erschrecken':du='erschrecke'
 record={'id':w,'present':present,'past':past,'participle':pp,'imperative':[du,present[4][0]],'auxiliary':'sein' if w in sein else 'haben'}
 if sep:record['prefix']=prefix
 if w in reflexive:record['reflexive']=True
 if w in noimperative:record['noImperative']=True;record['imperative']=[]
 if w in impersonal:record['impersonal']=True
 return record
records=[record_for(w) for w in selection]
(root/'src/verbs/lexicon.json').write_text(json.dumps(records,ensure_ascii=False,separators=(',',':'))+'\n')
for i in range(0,len(records),5):print(' | '.join(f"{r['id']}: {' '.join(r['present'][2])} / {' '.join(r['past'][0])} / {r['participle']} / {r['imperative'][0] if r['imperative'] else '—'}" for r in records[i:i+5]))
print('Wrote',len(records),'verbs')
