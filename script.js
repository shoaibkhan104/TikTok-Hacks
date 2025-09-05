// simple local demo: supports upload from gallery, like/view/follow counters, username & dp change
const videoEl = document.getElementById('video');
const uploadInput = document.getElementById('uploadInput');
const listEl = document.getElementById('list');
const likesEl = document.getElementById('likes');
const fcountEl = document.getElementById('fcount');
const heartEl = document.getElementById('heart');
const nameInput = document.getElementById('nameInput');
const dpInput = document.getElementById('dpInput');
const usernameEl = document.getElementById('username');

let state = JSON.parse(localStorage.getItem('tikstate') || '{"likes":0,"views":0,"followers":0,"videos":[],"username":"@DemoUser"}');

function save(){ localStorage.setItem('tikstate', JSON.stringify(state)) }
function render(){
  likesEl.textContent = state.likes;
  fcountEl.textContent = state.followers;
  usernameEl.textContent = state.username;
  listEl.innerHTML = '';
  state.videos.forEach((v,i)=>{
    const li = document.createElement('li');
    li.textContent = v.name;
    li.onclick = ()=> playVideo(v.url);
    listEl.appendChild(li);
  });
}
function playVideo(url){
  videoEl.src = url;
  videoEl.play().catch(()=>{});
  state.views += 1;
  save();
}
uploadInput.addEventListener('change', (e)=>{
  const f = e.target.files[0];
  if(!f) return;
  const url = URL.createObjectURL(f);
  state.videos.unshift({name:f.name,url});
  save(); render();
  playVideo(url);
});
document.querySelector('.plus-btn').addEventListener('click', ()=> uploadInput.click());
heartEl.addEventListener('click', ()=>{
  heartEl.classList.toggle('active');
  if(heartEl.classList.contains('active')) state.likes += 1;
  else state.likes = Math.max(0, state.likes - 1);
  save(); render();
});
document.getElementById('incViews').addEventListener('click', ()=>{
  state.views += 100; save(); alert('Views +100 (local)');
});
document.getElementById('incLikes').addEventListener('click', ()=>{
  state.likes += 10; save(); render();
});
document.getElementById('incFollowers').addEventListener('click', ()=>{
  state.followers += 1; save(); render();
});
nameInput.addEventListener('input', (e)=>{
  state.username = e.target.value ? '@'+e.target.value.replace(/\s+/g,'') : '@DemoUser';
  save(); render();
});
dpInput.addEventListener('change', (e)=>{
  const f = e.target.files[0];
  if(!f) return;
  const url = URL.createObjectURL(f);
  document.getElementById('dp').src = url;
});
document.getElementById('comment').addEventListener('click', ()=>{
  const c = prompt('Enter comment (local):');
  if(c) alert('Comment saved (local): ' + c);
});
document.getElementById('share').addEventListener('click', ()=> alert('Share (placeholder)'));
render();
