/* Sci-fi dynamic background: particles + aurora blobs */
(() => {
  const root = document.getElementById('bg-root');
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed'; canvas.style.inset = '0'; canvas.style.width = '100%'; canvas.style.height = '100%'; canvas.style.zIndex = '0';
  root.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let DPR = Math.min(window.devicePixelRatio || 1, 2);
  function resize(){ canvas.width = Math.floor(window.innerWidth * DPR); canvas.height = Math.floor(window.innerHeight * DPR); canvas.style.width = window.innerWidth+'px'; canvas.style.height = window.innerHeight+'px'; ctx.setTransform(DPR,0,0,DPR,0,0);} 
  window.addEventListener('resize', resize);
  resize();

  // aurora blobs
  const blobs = [ {x:0.12,y:-0.08,r:0.75,color:['rgba(124,92,255,0.26)','rgba(47,229,204,0.08)']}, {x:0.92,y:0.06,r:0.6,color:['rgba(0,200,255,0.18)']} ];

  // particles
  const P = [];
  const COUNT = Math.max(80, Math.floor(Math.min(window.innerWidth,1200)/12));
  function rnd(min,max){return Math.random()*(max-min)+min}
  for(let i=0;i<COUNT;i++){P.push({x:rnd(0,window.innerWidth),y:rnd(0,window.innerHeight),vx:rnd(-0.05,0.05),vy:rnd(-0.05,0.05),r:rnd(0.6,1.6),alpha:rnd(0.2,0.9)})}

  let last = performance.now();
  function loop(t){ const dt = Math.min(40,t-last); last=t; ctx.clearRect(0,0,canvas.width/DPR,canvas.height/DPR);
    // dark vignette
    const w = canvas.width/DPR, h = canvas.height/DPR;
    const g = ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,'rgba(2,4,14,0.55)'); g.addColorStop(1,'rgba(3,1,12,0.65)'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);

    // aurora blobs
    blobs.forEach((b,idx)=>{
      const bx = w*b.x + Math.cos(t/800 + idx)*40;
      const by = h*b.y + Math.sin(t/900 + idx)*30;
      const rad = Math.max(w,h)*b.r*0.6;
      const g2 = ctx.createRadialGradient(bx,by,0,bx,by,rad);
      g2.addColorStop(0,b.color[0]||'rgba(124,92,255,0.22)'); g2.addColorStop(1,'rgba(0,0,0,0)'); ctx.globalCompositeOperation='screen'; ctx.fillStyle=g2; ctx.fillRect(bx-rad,by-rad,rad*2,rad*2);
    });

    // grid subtle
    ctx.globalCompositeOperation='source-over'; ctx.strokeStyle='rgba(255,255,255,0.02)'; ctx.lineWidth=1; const gap=76; for(let x=0;x<w;x+=gap){ctx.beginPath();ctx.moveTo(x+0.5,0);ctx.lineTo(x+0.5,h);ctx.stroke();}
    // particles and links
    for(let i=0;i<P.length;i++){ const p=P[i]; p.x+=p.vx*dt; p.y+=p.vy*dt; if(p.x<-50)p.x=w+50; if(p.x>w+50)p.x=-50; if(p.y<-50)p.y=h+50; if(p.y>h+50)p.y=-50; }
    // links
    ctx.lineWidth=0.8; for(let i=0;i<P.length;i++){ for(let j=i+1;j<P.length;j++){ const a=P[i], b=P[j]; const dx=a.x-b.x, dy=a.y-b.y; const dist=Math.sqrt(dx*dx+dy*dy); if(dist<110){ const alpha=(1-dist/110)*0.14; ctx.strokeStyle='rgba(124,92,255,'+alpha+')'; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); } } }
    // draw particles
    for(let p of P){ ctx.beginPath(); ctx.fillStyle='rgba(200,200,255,'+p.alpha*0.85+')'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }

    // subtle scanline
    ctx.globalCompositeOperation='overlay'; ctx.fillStyle='rgba(255,255,255,0.006)'; ctx.fillRect(0,(t/30%8),w,1);
    ctx.globalCompositeOperation='source-over'; requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
