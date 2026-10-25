"""Compose a German narrated product tour from authentic app captures.

No remote media at render time. The background score is synthesized here.
"""
from pathlib import Path
import os,json,math,re,base64,subprocess,wave,concurrent.futures
import numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageFilter
ROOT=Path(__file__).resolve().parent.parent
WORK=Path(os.environ.get('FIT_VIDEO_WORK','/tmp/fit-video'))
OUT=ROOT/'downloads';OUT.mkdir(exist_ok=True)
FPS=24;W,H=1920,1080;RATE=22050
BG='#f2f4eb';INK='#244c40';ACCENT='#d7ea9c';CORAL='#e9987f';MUTED='#6d8375'
(WORK/'fonts').mkdir(exist_ok=True)
fontfile=WORK/'fonts/Manrope-Regular.ttf'
fontfile.write_bytes(base64.b64decode(re.search(r"export const pdfFont = '([^']+)'",(ROOT/'src/pdfFont.js').read_text()).group(1)))
def font(size,bold=False):
 return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else str(fontfile),size)
def wrap(draw,text,f,width):
 lines=[]
 for para in text.split('\n'):
  line=''
  for word in para.split():
   trial=(line+' '+word).strip()
   if draw.textlength(trial,font=f)>width and line:lines.append(line);line=word
   else:line=trial
  lines.append(line)
 return lines
def put(draw,text,xy,f,fill,width,line_height=None):
 x,y=xy
 for line in wrap(draw,text,f,width):draw.text((x,y),line,font=f,fill=fill);y+=line_height or int(f.size*1.35)
 return y
scenes=json.loads((WORK/'timed-storyboard.json').read_text());meta=json.loads((WORK/'screens/metadata.json').read_text())
time=0
for i,s in enumerate(scenes):
 s['duration']=math.ceil(s['duration']*FPS)/FPS;s['start']=time;s['index']=i;time+=s['duration']
TOTAL=time
# A warm neutral background with soft geometric accents.
background=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(background)
d.ellipse((1390,-470,2250,400),fill='#e6edda');d.ellipse((-380,630,100,1120),fill='#e9eddc');d.ellipse((1520,750,2130,1300),fill='#eae5d4')
for x,y in [(94,860),(112,860),(130,860),(94,878),(112,878),(130,878)]:d.ellipse((x,y,x+4,y+4),fill='#b0c29f')
def compose(scene,shot,index):
 im=background.copy();d=ImageDraw.Draw(im)
 # Original brand and chapter typography.
 d.rounded_rectangle((64,35,112,83),12,fill=INK)
 d.line((76,49,76,69,86,65,97,69,97,49,86,46,76,49),fill=ACCENT,width=2);d.line((86,47,86,65),fill=ACCENT,width=2)
 d.text((128,36),'fit in deutsch.',font=font(32,True),fill=INK)
 d.text((66,96),'Die App einfach erklärt',font=font(17),fill=MUTED)
 d.text((1513,48),'DEIN TEMPO. DEIN WEG.',font=font(16),fill=MUTED)
 pill=f"{scene['index']+1:02d} / {len(scenes):02d}"
 d.rounded_rectangle((64,172,159,208),18,fill=ACCENT);d.text((82,180),pill,font=font(16,True),fill=INK)
 put(d,scene['chapter'].upper(),(64,229),font(14,True),MUTED,445,22)
 title_font=font(60 if scene.get('hero') else 53,True)
 end=put(d,scene['title'],(60,278),title_font,INK,465,int(title_font.size*1.25))
 y=max(515,end+40)
 for bullet in scene['bullets']:
  d.ellipse((65,y+10,73,y+18),fill=CORAL)
  y=put(d,bullet,(91,y),font(23),INK,405,32)+22
 if scene.get('hero'):
  d.rounded_rectangle((64,max(y+5,825),480,max(y+5,825)+55),24,fill=INK)
  d.text((87,max(y+5,825)+15),'Deutsch entdecken  →',font=font(21),fill='#fff')
 else:
  d.text((65,884),'SEHEN  ·  HÖREN  ·  AUSPROBIEREN',font=font(14),fill=MUTED)
 shotim=Image.open(WORK/'screens'/f'{shot}.png').convert('RGB')
 if not scene.get('mobile'):
  # Browser-like frame; the app itself is captured without changing its UI.
  shadow=Image.new('RGBA',(W,H));sd=ImageDraw.Draw(shadow);sd.rounded_rectangle((592,135,1856,955),22,fill=(32,62,43,46));shadow=shadow.filter(ImageFilter.GaussianBlur(20));im=Image.alpha_composite(im.convert('RGBA'),shadow).convert('RGB');d=ImageDraw.Draw(im)
  d.rounded_rectangle((592,126,1856,948),20,fill='#fff',outline='#d5dece',width=2)
  for x,color in [(612,CORAL),(631,'#d8c585'),(650,'#9db686')]:d.ellipse((x,139,x+9,148),fill=color)
  d.text((1020,134),'Fit in Deutsch · App-Demo',font=font(12),fill=MUTED)
  screenshot=shotim.resize((1240,775),Image.Resampling.LANCZOS)
  im.paste(screenshot,(604,158));d=ImageDraw.Draw(im)
  box=meta[shot].get('highlight')
  if box and box['y']>=0 and box['y']+box['height']<=800:
   sx,sy=604,158;scale=1240/1280
   x=sx+box['x']*scale;y=sy+box['y']*scale;bw=box['width']*scale;bh=box['height']*scale
   d.rounded_rectangle((x-5,y-5,x+bw+5,y+bh+5),9,outline=CORAL,width=4)
   px=x+bw-7;py=y+bh-7
   d.polygon([(px,py),(px+8,py+32),(px+14,py+23),(px+26,py+23)],fill='#fff',outline=INK,width=2)
 else:
  # Portrait capture remains at its true aspect ratio inside a phone frame.
  sw,sh=meta[shot]['viewport']['width'],meta[shot]['viewport']['height'];height=746;width=round(height*sw/sh);x=1040-width//2;y=166
  d.rounded_rectangle((x-16,y-16,x+width+16,y+height+16),42,fill=INK)
  mask=Image.new('L',(width,height));ImageDraw.Draw(mask).rounded_rectangle((0,0,width,height),29,fill=255)
  im.paste(shotim.resize((width,height),Image.Resampling.LANCZOS),(x,y),mask)
  d=ImageDraw.Draw(im);d.rounded_rectangle((x+width//2-45,y+5,x+width//2+45,y+18),7,fill=INK)
  d.text((1440,400),'Lernen passt\nin deinen Alltag.',font=font(30,True),fill=INK,spacing=15)
  d.text((1440,515),'Am Computer.\nAuf dem Tablet.\nAuf dem Smartphone.',font=font(22),fill=MUTED,spacing=18)
 # Dedicated subtitle area never covers the app content.
 d.rounded_rectangle((64,966,1856,1050),16,fill=INK)
 d.rounded_rectangle((64,1063,1856,1068),2,fill='#dbe2d0')
 p=(scene['index']+1)/len(scenes);d.rounded_rectangle((64,1063,64+1792*p,1068),2,fill='#91ab69')
 path=WORK/'frames'/f"{scene['id']}-{index}.png";im.save(path,optimize=False);return path

def srt_time(t):
 ms=round(t*1000);return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d},{ms%1000:03d}'
def ass_time(t):
 cs=round(t*100);return f'{cs//360000}:{cs//6000%60:02d}:{cs//100%60:02d}.{cs%100:02d}'
# Sentence boundaries come from individual synthesis calls, not guessed timing.
subtitles=[]
for s in scenes:
 for cap in s['captions']:
  words=cap['text'].split();groups=[];line=''
  for word in words:
   if len(line)+len(word)>100 and line:groups.append(line);line=word
   else:line=(line+' '+word).strip()
  if line:groups.append(line)
  weight=sum(len(g) for g in groups);position=0
  for g in groups:
   a=s['start']+cap['start']+(cap['end']-cap['start'])*position/weight;position+=len(g)
   b=s['start']+cap['start']+(cap['end']-cap['start'])*position/weight
   subtitles.append((a,b,g))
srt='\n\n'.join(f'{i+1}\n{srt_time(a)} --> {srt_time(b)}\n{text}' for i,(a,b,text) in enumerate(subtitles))+'\n'
(OUT/'Fit-in-Deutsch-Untertitel.srt').write_text(srt)
ass='''[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Caption,Manrope,36,&H00FFFFFF,&H00FFFFFF,&H00244C40,&H00244C40,0,0,0,0,100,100,0,0,1,0,0,2,105,105,45,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
'''
for a,b,text in subtitles:ass+=f'Dialogue: 0,{ass_time(a)},{ass_time(b)},Caption,,0,0,0,,{{\\an5\\pos(960,1008)}}{text}\n'
(WORK/'captions.ass').write_text(ass)
# All forty-eight features are chaptered in the MP4 and in the companion index.
metadata=';FFMETADATA1\ntitle=Fit in Deutsch – Alle Funktionen einfach erklärt\nartist=Fit in Deutsch\ncomment=Originaler App-Rundgang mit synthetischer deutscher Sprecherstimme und eigener Musik.\n'
chapter_lines=['Fit in Deutsch – Kapitelübersicht','Alle Funktionen einzeln erklärt.','']
for s in scenes:
 title=s['title'].replace('\n',' ')
 metadata+=f"[CHAPTER]\nTIMEBASE=1/1000\nSTART={round(s['start']*1000)}\nEND={round((s['start']+s['duration'])*1000)}\ntitle={title}\n"
 chapter_lines.append(f"{int(s['start'])//60:02d}:{int(s['start'])%60:02d}  {title}")
(WORK/'chapters.ffmeta').write_text(metadata)
(OUT/'Fit-in-Deutsch-Kapitel.txt').write_text('\n'.join(chapter_lines)+'\n')
# Compose every state first so visual validation can happen before encoding.
for s in scenes:
 s['frames']=[str(compose(s,shot,i)) for i,shot in enumerate(s['shots'])]
 print('Composed',s['id'],flush=True)
poster=Image.open(scenes[0]['frames'][0]);pd=ImageDraw.Draw(poster);pd.text((442,988),'Alle Funktionen · Deutsche Sprecherstimme · Mit Untertiteln',font=font(28),fill='#fff');poster.save(OUT/'Fit-in-Deutsch-Videovorschau.jpg',quality=93)
(WORK/'render-timeline.json').write_text(json.dumps(scenes,ensure_ascii=False,indent=2))
if os.environ.get('FIT_VIDEO_COMPOSE_ONLY')=='1':raise SystemExit(0)

def run(cmd,log):
 with open(log,'w') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
 if r.returncode:raise RuntimeError(Path(log).read_text()[-4000:])
def render_scene(s):
 output=WORK/'clips'/f"{s['index']:02d}-{s['id']}.mp4"
 if output.exists():return output
 n=len(s['frames']);part=s['duration']/n;transition=.3
 cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-threads','1']
 for path in s['frames']:cmd+=['-loop','1','-framerate',str(FPS),'-t',str(part+transition),'-i',path]
 filters=[]
 for i in range(n):
  filters.append(f"[{i}:v]zoompan=z='1.003+0.006*on/({part}*{FPS})':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1920x1080:fps={FPS},format=yuv420p,settb=AVTB[v{i}]")
 current='v0'
 for i in range(1,n):
  name=f'm{i}';filters.append(f'[{current}][v{i}]xfade=transition=fade:duration={transition}:offset={part*i}[{name}]');current=name
 filters.append(f'[{current}]trim=duration={s["duration"]},setpts=PTS-STARTPTS,fade=t=in:st=0:d=0.16:color=0xf2f4eb,fade=t=out:st={s["duration"]-.16}:d=0.16:color=0xf2f4eb[out]')
 cmd+=['-filter_complex_threads','1','-filter_complex',';'.join(filters),'-map','[out]','-an','-c:v','libx264','-preset','veryfast','-crf','24','-threads','2','-pix_fmt','yuv420p','-r',str(FPS),'-movflags','+faststart',str(output)]
 run(cmd,WORK/f"encode-{s['id']}.log");print('Encoded',s['id'],flush=True);return output
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:clips=list(pool.map(render_scene,scenes))
(WORK/'concat.txt').write_text('\n'.join(f"file '{p}'" for p in clips))
run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(WORK/'concat.txt'),'-c','copy',str(WORK/'picture.mp4')],WORK/'concat.log')
# Original soft marimba/piano bed. No stock track or third-party composition.
length=int((TOTAL+1)*RATE);music=np.zeros(length,dtype=np.float32);voice_track=np.zeros(length,dtype=np.float32)
rng=np.random.default_rng(28)
def note(at,midi,duration,amplitude):
 start=int(at*RATE);n=min(int(duration*RATE),length-start)
 if n<=0:return
 t=np.arange(n)/RATE;freq=440*2**((midi-69)/12)
 tone=(np.sin(2*np.pi*freq*t)+.26*np.sin(2*np.pi*freq*2*t)+.11*np.sin(2*np.pi*freq*3*t))
 env=(1-np.exp(-t*130))*np.exp(-t*3.3)*np.minimum(1,(duration-t)*30)
 music[start:start+n]+=(tone*env*amplitude).astype(np.float32)
beat=60/94;chords=[[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,59]]
for bar in range(math.ceil(TOTAL/(beat*4))):
 chord=chords[(bar//2)%4];base=bar*beat*4
 for j in range(4):note(base+j*beat,chord[1+j%3]+12,1.25,.010 if j%2 else .014)
 note(base,chord[0],2.5,.014)
 if bar%4==0:note(base+beat*3.5,chord[-1]+12,1.4,.009)
for s in scenes:
 with wave.open(str(WORK/'audio'/f"{s['id']}.wav")) as f:data=np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').astype(np.float32)/32768
 peak=np.max(np.abs(data));data*=.82/max(peak,.1)
 offset=round((s['start']+.35)*RATE);voice_track[offset:offset+len(data)]+=data
# Score fades at both ends; the narrator remains clearly in front.
fade=min(int(3*RATE),length//2);music[:fade]*=np.linspace(0,1,fade);music[-fade:]*=np.linspace(1,0,fade)
mix=np.clip(voice_track+music,-.98,.98)
with wave.open(str(WORK/'mix.wav'),'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(RATE);f.writeframes((mix*32767).astype('<i2').tobytes())
output=OUT/'Fit-in-Deutsch-Erklaervideo.mp4'
run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(WORK/'picture.mp4'),'-i',str(WORK/'mix.wav'),'-i',str(WORK/'chapters.ffmeta'),'-map','0:v:0','-map','1:a:0','-map_metadata','2','-map_chapters','2','-vf',f"ass={WORK}/captions.ass:fontsdir={WORK}/fonts",'-af','loudnorm=I=-16:TP=-1.5:LRA=7','-c:v','libx264','-preset','fast','-crf','25','-threads','3','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-ar','48000','-ac','2','-t',str(TOTAL),'-movflags','+faststart',str(output)],WORK/'final.log')
print('DONE',output,'seconds',TOTAL,'bytes',output.stat().st_size,flush=True)
