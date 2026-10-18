// games helper
window.GAMES = [
  { id:'tetris', title:'俄罗斯方块', route:'/games/tetris/index.html', desc:'经典俄罗斯方块小游戏（键盘 & 触控支持）', playable:true }
];

function openGameInline(id){
  const g = window.GAMES.find(x=>x.id===id);
  if(!g) return;
  let holder = document.getElementById('gameHolder');
  if(!holder){ holder = document.createElement('div'); holder.id='gameHolder'; holder.style.position='fixed'; holder.style.inset='60px'; holder.style.zIndex=50; holder.style.background='rgba(3,2,14,0.94)'; holder.style.display='flex'; holder.style.alignItems='center'; holder.style.justifyContent='center'; document.body.appendChild(holder);
    const close = document.createElement('button'); close.textContent='关闭'; close.style.position='absolute'; close.style.right='18px'; close.style.top='18px'; close.style.zIndex=60; close.addEventListener('click', closeHolder); holder.appendChild(close);
  }
  holder.innerHTML = '';
  const iframe = document.createElement('iframe'); iframe.src = g.route; iframe.title = g.title; iframe.style.width='100%'; iframe.style.height='100%'; iframe.style.border='0'; iframe.setAttribute('allow',''); iframe.setAttribute('sandbox','allow-same-origin allow-scripts'); holder.appendChild(iframe);
  function closeHolder(){ holder.remove(); window.removeEventListener('message', onMsg); }
  function onMsg(e){ /* optional messaging */ }
  window.addEventListener('message', onMsg);
}
