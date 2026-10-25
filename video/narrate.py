"""Generate original German narration locally using the CC0 Thorsten voice."""
import json, os, wave, re, time
from pathlib import Path
from piper import PiperVoice
from piper.config import SynthesisConfig
import onnxruntime as ort
root=Path(__file__).resolve().parent
work=Path(os.environ.get('FIT_VIDEO_WORK','/tmp/fit-video'))
model=work/'vits-piper-de_DE-thorsten-medium/de_DE-thorsten-medium.onnx'
voice=PiperVoice.load(model)
options=ort.SessionOptions();options.intra_op_num_threads=2;options.inter_op_num_threads=1
voice.session=ort.InferenceSession(str(model),sess_options=options,providers=['CPUExecutionProvider'])
scenes=json.loads((root/'storyboard.json').read_text())
for i,scene in enumerate(scenes):
 path=work/'audio'/f"{scene['id']}.wav"
 sentences=re.split(r'(?<=[.!?])\s+',scene['voice'])
 # Generate each sentence separately so captions follow exact sentence times.
 with wave.open(str(path),'wb') as f:
  f.setnchannels(1);f.setsampwidth(2);f.setframerate(voice.config.sample_rate)
  position=0;captions=[]
  for sentence in sentences:
   chunks=list(voice.synthesize(sentence,SynthesisConfig(length_scale=1.12,noise_scale=.55,noise_w_scale=.72)))
   audio=b''.join(chunk.audio_int16_bytes for chunk in chunks)
   duration=len(audio)/2/voice.config.sample_rate
   captions.append({'text':sentence,'start':position+.35,'end':position+duration+.35})
   f.writeframes(audio);f.writeframes(b'\0\0'*int(.1*voice.config.sample_rate));position+=duration+.1
 with wave.open(str(path)) as f: duration=f.getnframes()/f.getframerate()
 scene['voiceDuration']=duration;scene['duration']=round(max(7,duration+1.25),3);scene['captions']=captions
 print(f"{i+1}/{len(scenes)} {scene['id']}: {duration:.1f}s",flush=True)
(work/'timed-storyboard.json').write_text(json.dumps(scenes,ensure_ascii=False,indent=2))
print('Total duration:',sum(s['duration'] for s in scenes),'seconds',flush=True)
