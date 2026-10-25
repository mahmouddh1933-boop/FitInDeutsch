import {pronunciations} from './audio/pronunciations.js';
export function chooseGermanVoice(voices=[]) {
 return [...voices].filter(v=>/^de(?:[-_]|$)/i.test(v.lang||'')).sort((a,b)=>{
  const score=v=>(/^de[-_]DE$/i.test(v.lang)?0:10)+(v.localService?0:1);
  return score(a)-score(b);
 })[0]||null;
}
export function createSpeechPlayer(onMessage,host=window){
 let currentAudio=null,generation=0,timer=null,waiting=null;
 const synth=host.speechSynthesis;
 function clearWait(){if(timer!==null){host.clearTimeout(timer);timer=null;}if(waiting){synth?.removeEventListener?.('voiceschanged',waiting);waiting=null;}}
 function stop(){generation++;clearWait();if(currentAudio){currentAudio.onended=null;currentAudio.onerror=null;try{currentAudio.pause();currentAudio.currentTime=0;}catch{}currentAudio=null;}try{synth?.cancel?.();}catch{}}
 function voices(){try{return synth?.getVoices?.()||[];}catch{return [];}}
 function browserSpeech(text,ticket){
  if(ticket!==generation)return;
  if(!synth||!host.SpeechSynthesisUtterance){onMessage('Dein Browser unterstützt das Vorlesen nicht. Du kannst mit den Bild- und Satzübungen weiterlernen.');return;}
  function play(){clearWait();if(ticket!==generation)return;const available=voices(),voice=chooseGermanVoice(available);
   if(available.length&&!voice){onMessage('Auf deinem Gerät ist keine deutsche Stimme verfügbar. Wähle oder installiere eine deutsche Sprachausgabe.');return;}
   const utterance=new host.SpeechSynthesisUtterance(text);utterance.lang=voice?.lang?.replaceAll('_','-')||'de-DE';if(voice)utterance.voice=voice;utterance.rate=.8;
   utterance.onerror=()=>{if(ticket===generation)onMessage('Das Vorlesen ist gerade nicht verfügbar. Versuche einen Browser mit deutscher Sprachausgabe.');};
   try{synth.speak(utterance);}catch{utterance.onerror();}
  }
  if(typeof synth.getVoices==='function'&&!voices().length&&typeof synth.addEventListener==='function'){
   waiting=()=>{if(voices().length)play();};synth.addEventListener('voiceschanged',waiting);timer=host.setTimeout(play,600);
  }else play();
 }
 function speak(value){stop();onMessage('');const text=String(value).normalize('NFC').replace(/\s+/g,' ').trim();if(!text)return;const ticket=generation;
  const key=Object.keys(pronunciations).find(k=>k.toLocaleLowerCase('de')===text.toLocaleLowerCase('de').replace(/[.!?]$/,''));
  if(key&&host.Audio){let audio;try{audio=new host.Audio(pronunciations[key]);}catch{browserSpeech(text,ticket);return;}currentAudio=audio;let failed=false;
   const fallback=()=>{if(failed||ticket!==generation)return;failed=true;try{audio.pause();}catch{}currentAudio=null;browserSpeech(text,ticket);};
   audio.onended=()=>{if(ticket===generation)currentAudio=null;};audio.onerror=fallback;
   try{Promise.resolve(audio.play()).catch(fallback);}catch{fallback();}
  }else browserSpeech(text,ticket);
 }
 return {speak,stop};
}
