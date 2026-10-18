// tiger quick assistant (simplified)
(function(){
  const wrap = document.getElementById('tigerWrap');
  if(!wrap) return;
  // create button
  const btn = document.createElement('button');
  btn.setAttribute('aria-label','顾问 / 快速访问');
  btn.className = 'tiger-btn';
  btn.style.width='64px';btn.style.height='64px';btn.style.borderRadius='50%';btn.style.border='none';btn.style.cursor='pointer';btn.style.background='linear-gradient(135deg,#FFC178,#F0761B)';btn.style.boxShadow='0 10px 30px rgba(124,92,255,0.12)';
  btn.innerHTML = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="9" r="3" fill="#fff" opacity="0.9"/><path d="M4 20c2-2 6-2 8-2s6 0 8 2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  wrap.appendChild(btn);

  const panel = document.createElement('div');
  panel.className='tiger-panel';
  panel.style.position='fixed';panel.style.right='94px';panel.style.bottom='20px';panel.style.padding='12px';panel.style.background='rgba(3,2,14,0.9)';panel.style.border='1px solid rgba(124,92,255,0.12)';panel.style.borderRadius='12px';panel.style.boxShadow='0 12px 40px rgba(0,0,0,0.5)';panel.style.display='none';panel.style.minWidth='180px';panel.style.zIndex=20;
  panel.innerHTML = '<div style="color:#fff;font-weight:600;margin-bottom:8px">顾问 / 快速访问</div>'+
    '<div style="display:flex;flex-direction:column;gap:6px">'+
    '<a href="/thermal.html" style="color:var(--accent);text-decoration:none">热分析笔记</a>'+
    '<a href="/projects.html" style="color:var(--accent);text-decoration:none">倒腾日记</a>'+
    '<a href="/games/index.html" style="color:var(--accent);text-decoration:none">小游戏</a>'+
    '<a href="/contact.html" style="color:var(--accent);text-decoration:none">联系我</a>'+
    '</div>';
  document.body.appendChild(panel);

  function toggle(){ if(panel.style.display==='none') panel.style.display='block'; else panel.style.display='none'; }
  btn.addEventListener('click', (e)=>{ e.stopPropagation(); toggle(); });
  document.addEventListener('click', ()=>{ panel.style.display='none'; });
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') panel.style.display='none'; });
})();
