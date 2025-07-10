export function setupUI(startCallback) {
  const menu = document.getElementById('menuScreen'),
        settings = document.getElementById('settingsScreen'),
        credits = document.getElementById('creditsScreen'),
        toolbar = document.getElementById('toolbar');

  document.getElementById('playBtn').onclick = () => {
    hideMenus();
    startCallback();
  };
  document.getElementById('settingsBtn').onclick = ()=>show(settings);
  document.getElementById('creditsBtn').onclick = ()=>show(credits);
  document.getElementById('settingsBack').onclick = ()=>show(menu);
  document.getElementById('creditsBack').onclick = ()=>show(menu);

  show(menu);

  const blocks = ['grass','dirt','stone'];
  const toolbarDiv = document.getElementById('toolbar');
  toolbarDiv.innerHTML = '';
  blocks.forEach((type, idx) => {
    const div = document.createElement('div');
    div.className='slot'+(idx===0?' selected':'');
    div.textContent = type[0].toUpperCase();
    div.onclick=()=>{
      document.querySelectorAll('.slot').forEach(s=>s.classList.remove('selected'));
      div.classList.add('selected');
      window.selectedBlock = type;
    };
    toolbarDiv.appendChild(div);
  });
}

function show(elem) {
  document.querySelectorAll('.screen').forEach(s => s.style.display='none');
  elem.style.display = '';
}

function hideMenus(){
  document.querySelectorAll('.screen').forEach(s => s.style.display='none');
}
