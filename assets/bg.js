/* Sci-fi dynamic background: denser particles + brighter aurora blobs + stronger contrast */
(() => {
  const root = document.getElementById('bg-root');
  if(!root) return;
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed'; canvas.style.inset = '0'; canvas.style.width = '100%'; canvas.style.height = '100%'; canvas.style.zIndex = '0';
  root.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let DPR = Math.min(window.devicePixelRatio || 1, 2);
  function resize(){ canvas.width = Math.floor(window.innerWidth * DPR); canvas.height = Math.floor(window.innerHeight * DPR); canvas.style.width = window.innerWidth+'px'; canvas.style.height = window.innerHeight+'px'; ctx.setTransform(DPR,0,0,DPR,0,0);} 
  window.addEventListener('resize', resize);
  resize();

  // aurora blobs (brighter)
  const blobs = [
    {x:0.12,y:-0.08,r:0.9,color:['rgba(124,92,255,0.40)','rgba(124,92,255,0.08)']},
    {x:0.92,y:0.06,r:0.75,color:['rgba(47,229,204,0.30)','rgba(47,229,204,0.06)']},
    {x:0.5,y:1.08,r:0.6,color:['rgba(255,138,101,0.22)','rgba(255,138,101,0.04)']}
  ];

  // particles (denser)
  const P = [];
  const COUNT = Math.max(180, Math.floor(Math.min(window.innerWidth,1600)/8));
  function rnd(min,max){return Math.random()*(max-min)+min}
  for(let i=0;i<COUNT;i++){P.push({x:rnd(0,window.innerWidth),y:rnd(0,window.innerHeight),vx:rnd(-0.06,0.06),vy:rnd(-0.06,0.06),r:rnd(0.6,2.2),alpha:rnd(0.18,0.95)})}

  let last = performance.now();
  function loop(t){ const dt = Math.min(40,t-last); last=t; ctx.clearRect(0,0,canvas.width/DPR,canvas.height/DPR);
    const w = canvas.width/DPR, h = canvas.height/DPR;

    // stronger vignette + contrast
    const g = ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,'rgba(2,4,14,0.72)'); g.addColorStop(1,'rgba(3,1,12,0.78)'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);

    // brighter aurora blobs with motion
    blobs.forEach((b,idx)=>{
      const bx = w*b.x + Math.cos(t/700 + idx*1.2)*60;
      const by = h*b.y + Math.sin(t/900 + idx*1.3)*45;
      const rad = Math.max(w,h)*b.r*0.7;
      const g2 = ctx.createRadialGradient(bx,by,0,bx,by,rad);
      g2.addColorStop(0,b.color[0]||'rgba(124,92,255,0.36)'); g2.addColorStop(0.5,'rgba(124,92,255,0.06)'); g2.addColorStop(1,'rgba(0,0,0,0)');
      ctx.globalCompositeOperation='screen'; ctx.fillStyle=g2; ctx.fillRect(bx-rad,by-rad,rad*2,rad*2);
    });

    // subtle rotated grid for depth
    ctx.globalCompositeOperation='source-over'; ctx.strokeStyle='rgba(255,255,255,0.018)'; ctx.lineWidth=1; const gap=72; ctx.save(); ctx.translate(w/2,h/2); ctx.rotate(-0.06); ctx.translate(-w/2,-h/2);
    for(let x=-gap;x<w+gap;x+=gap){ctx.beginPath();ctx.moveTo(x+0.5,0);ctx.lineTo(x+0.5,h);ctx.stroke();}
    ctx.restore();

    // update particles
    for(let i=0;i<P.length;i++){ const p=P[i]; p.x+=p.vx*dt; p.y+=p.vy*dt; if(p.x<-80)p.x=w+80; if(p.x>w+80)p.x=-80; if(p.y<-80)p.y=h+80; if(p.y>h+80)p.y=-80; }

    // links (stronger shimmer)
    ctx.lineWidth=0.9; for(let i=0;i<P.length;i++){ for(let j=i+1;j<P.length;j++){ const a=P[i], b=P[j]; const dx=a.x-b.x, dy=a.y-b.y; const dist=Math.sqrt(dx*dx+dy*dy); if(dist<140){ const alpha=(1-dist/140)*0.18; ctx.strokeStyle='rgba(124,92,255,'+alpha+')'; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); } } }

    // draw particles (brighter, some glow)
    for(let p of P){ ctx.beginPath(); ctx.fillStyle='rgba(220,220,255,'+Math.min(1,p.alpha*1.05)+')'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }

    // soft scanline and noise
    ctx.globalCompositeOperation='overlay'; ctx.fillStyle='rgba(255,255,255,0.007)'; const yoff = (t/20)%6; for(let y=yoff;y<h;y+=6){ ctx.fillRect(0,y,w,1); }
    ctx.globalCompositeOperation='source-over'; requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
