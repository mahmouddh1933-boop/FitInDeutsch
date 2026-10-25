"""Verify the finished audiovisual artifact, chapter timing and captions."""
from pathlib import Path
import json,subprocess,os
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
WORK=Path(os.environ.get('FIT_VIDEO_WORK','/tmp/fit-video'))
path=ROOT/'downloads/Fit-in-Deutsch-Erklaervideo.mp4'
timeline=json.loads((WORK/'render-timeline.json').read_text())
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-show_chapters','-of','json',str(path)]))
video=next(s for s in probe['streams'] if s['codec_type']=='video')
audio=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (video['width'],video['height'],video['codec_name'],video['pix_fmt'])==(1920,1080,'h264','yuv420p')
assert video['r_frame_rate']=='24/1'
assert audio['codec_name']=='aac' and audio['channels']==2
assert len(probe['chapters'])==len(timeline)==48
expected=timeline[-1]['start']+timeline[-1]['duration'];actual=float(probe['format']['duration'])
assert abs(actual-expected)<.15,(actual,expected)
for source,chapter in zip(timeline,probe['chapters']):
 assert abs(float(chapter['start_time'])-source['start'])<.003
 assert abs(float(chapter['end_time'])-(source['start']+source['duration']))<.003
assert path.stat().st_size<95_000_000,'Keep the downloadable file below GitHub’s single-file limit.'
for name in ['intro','listen','helper-paint','plan-pdf','mobile','outro']:
 s=next(s for s in timeline if s['id']==name);cap=s['captions'][0];at=s['start']+(cap['start']+cap['end'])/2
 image=WORK/f'check-{name}.png'
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-ss',str(at),'-i',str(path),'-frames:v','1',str(image)],check=True)
 pixels=np.asarray(Image.open(image).convert('RGB'))[974:1043,105:1815,:]
 assert np.count_nonzero(np.min(pixels,axis=2)>180)>400,f'Missing visible subtitles: {name}'
 print('Visual subtitle sample:',name,flush=True)
# Decode the full file, including its audio stream, to catch broken segments.
subprocess.run(['ffmpeg','-hide_banner','-v','error','-xerror','-i',str(path),'-map','0:v:0','-map','0:a:0','-f','null','-'],check=True)
print(f'PASS: {actual:.2f}s, 1920x1080/24fps, H.264/AAC, 48 complete chapters, visible subtitles, full decode. {path.stat().st_size/1e6:.1f} MB',flush=True)
