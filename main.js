var C=window.CONTENT||{};
(function(){document.querySelectorAll('[data-c]').forEach(function(el){var k=el.getAttribute('data-c');if(C[k]!=null)el.innerHTML=C[k]});
document.title=C.groom+' & '+C.bride+' \u00b7 '+C.eventTitle;
var a=document.getElementById('dir');if(a)a.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(C.mapQuery||'');
var p=document.getElementById('photo');if(p&&C.photo){p.src=C.photo;p.hidden=false}})();

var NS='http://www.w3.org/2000/svg',i,e;
function mk(t,a,p){var n=document.createElementNS(NS,t);for(var k in a)n.setAttribute(k,a[k]);p.appendChild(n);return n}
var sg=document.getElementById('stars');
for(i=0;i<55;i++){e=mk('circle',{cx:Math.random()*400,cy:Math.random()*135,r:.4+Math.random()*.8,fill:'#fff','class':'tw'},sg);e.style.animationDelay=Math.random()*3+'s'}
var fg=document.getElementById('fairy');
for(i=0;i<=14;i++){var t=i/14,x=(1-t)*(1-t)*-10+2*(1-t)*t*200+t*t*410,y=(1-t)*(1-t)*58+2*(1-t)*t*128+t*t*58;
mk('circle',{cx:x,cy:y+2,r:5,fill:'#ffc982',opacity:.18},fg);e=mk('circle',{cx:x,cy:y+2,r:1.8,fill:'#ffe3b0','class':'tw'},fg);e.style.animationDelay=(i%5)*.5+'s'}
var fx=document.getElementById('fx'),cols=['#c0c0c8','#fff','#9c1428','#c4283f'];
for(i=0;i<16;i++){e=document.createElement('i');e.style.cssText='left:'+Math.random()*100+'%;background:'+cols[i%4]+';animation-duration:'+(9+Math.random()*8)+'s;animation-delay:'+Math.random()*9+'s;border-radius:'+(i%2?'50%':'1px');fx.appendChild(e)}
var bu=document.getElementById('bu');
for(i=0;i<12;i++){e=document.createElement('b');var a=i/12*6.283,d=22+Math.random()*24;e.style.setProperty('--x',Math.cos(a)*d+'px');e.style.setProperty('--y',Math.sin(a)*d-6+'px');bu.appendChild(e)}
function reveal(){var els=document.querySelectorAll('.rv');if(!window.IntersectionObserver){els.forEach(function(x){x.classList.add('in')});return}
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15});els.forEach(function(x,j){x.style.transitionDelay=x.style.transitionDelay||(j<8?j*.18+'s':'0s');io.observe(x)})}
document.getElementById('ob').onclick=function(){document.getElementById('open').className='go';window.scrollTo(0,0);window.opened=true;try{bgm()}catch(e){}setTimeout(reveal,500)};
var T=new Date(C.eventStart).getTime(),E=new Date(C.eventEnd).getTime(),cd=document.getElementById('cd');
function tick(){var n0=Date.now(),cl=document.getElementById('cl');if(n0>=T){cd.innerHTML='<p class="st">'+(n0<E?C.statusOngoing:C.statusEnded)+'</p>';cl.style.display='none';return}
var s=Math.floor((T-n0)/1000),v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60],nm=['DAYS','HRS','MIN','SEC'],h='';
for(var k=0;k<4;k++)h+='<div><b>'+String(v[k]).padStart(2,'0')+'</b><span>'+nm[k]+'</span></div>';cd.innerHTML=h}
tick();setInterval(tick,1000);

// ---- Background photo slideshow: begins only after the guest opens the invitation AND scrolls down ----
// Photos are picked up automatically from the photos/ folder, named 1.jpg, 2.jpg, 3.jpg ... (jpg, jpeg, png or webp).
// Or list exact paths in content.js (slideshow: [...]) to override.
// When the slideshow plays, the text fades away slowly so the photos show clearly.
// Scrolling or touching the screen brings the text back; it fades again after a short pause.
(function(){var L=C.slideshow||[],box=document.getElementById('bgshow');if(!box)return;
var imgs=[],cur=-1,want=false,shown=false,dt=0,PF=C.photosFolder||'photos/',EX=['jpg','jpeg','png','webp'];
function next(){var old=cur>=0?imgs[cur]:null;cur=(cur+1)%imgs.length;var im=imgs[cur];
if(old){old.classList.remove('act');setTimeout(function(){old.classList.remove('kb')},1800)}
im.classList.remove('kb');void im.offsetWidth;im.classList.add('act','kb')}
function show(){if(shown||!want||!imgs.length)return;shown=true;box.classList.add('on');next();setInterval(function(){if(imgs.length>1)next()},(C.slideInterval||3)*1000)}
function wake(){document.body.classList.remove('dim');clearTimeout(dt);if(shown)dt=setTimeout(function(){document.body.classList.add('dim')},C.fadeDelay||2500)}
function probe(n,e){if(n>(C.maxPhotos||40))return;var im=new Image();im.alt='';im.decoding='async';
im.onload=function(){box.appendChild(im);imgs.push(im);show();probe(n+1,0)};
im.onerror=function(){if(e+1<EX.length)probe(n,e+1)};im.src=PF+n+'.'+EX[e]}
if(L.length){L.forEach(function(f){var im=new Image();im.alt='';im.src=f;box.appendChild(im);imgs.push(im)})}else probe(1,0);
function act(){if(!window.opened)return;if(window.scrollY>(C.slideshowStartScroll||80)){want=true;show()}wake()}
['scroll','touchstart','wheel','keydown'].forEach(function(ev){window.addEventListener(ev,act,{passive:true})});
})();
