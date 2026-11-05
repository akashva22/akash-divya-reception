// Background music. Plays ONCE after the guest taps 'Open Invitation'.
// If content/content.js sets bgm.file, that file from the bgm/ folder is played;
// otherwise the built-in soft melody is generated.
var played=false;
function synth(){var A=new (window.AudioContext||window.webkitAudioContext)();if(A.resume)A.resume();var m=A.createGain();m.gain.value=.55;m.connect(A.destination);
var d=A.createDelay();d.delayTime.value=.4;var fb=A.createGain();fb.gain.value=.35;d.connect(fb);fb.connect(d);var w=A.createGain();w.gain.value=.3;d.connect(w);w.connect(m);
function n(fr,t,l,v,ty){var o=A.createOscillator(),g=A.createGain();o.type=ty||'sine';o.frequency.value=fr;g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(v,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+l);o.connect(g);g.connect(m);g.connect(d);o.start(t);o.stop(t+l+.1)}
function F(s){return 261.63*Math.pow(2,s/12)}
var i,ch=[[0,4],[-3,3],[-7,4],[-5,4]],t0=A.currentTime+.3,k,r,th,s,p;
for(i=0;i<9;i++){r=ch[i%4][0];th=ch[i%4][1];if(i==8){r=0;th=4}s=t0+i*3;
n(F(r-12),s,3.2,.2,'triangle');n(F(r),s,3,.07,'sine');
p=[r,r+7,r+12,r+12+th,r+12,r+7];
for(k=0;k<6;k++)n(F(p[k]),s+k*.5,1.8,.12,'sine');
if(i>=2&&i<8){n(F(r+24),s,1.4,.09,'sine');n(F(r+19),s+1.5,1.2,.08,'sine');n(F(r+12+th+12),s+2.25,.9,.07,'sine')}}
m.gain.setValueAtTime(.55,t0+27);m.gain.linearRampToValueAtTime(0,t0+31);
setTimeout(function(){A.close()},35000)}
function bgm(){if(played)return;played=true;var b=(window.CONTENT||{}).bgm||{};
if(b.file){var a=new Audio('bgm/'+b.file);a.loop=false;a.volume=b.volume||.7;a.play().catch(function(){synth()})}else synth()}
