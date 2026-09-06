// 《夏洛的网》母版 V5：网页交互修订

// 统一常见畅销版译名
if (typeof charlotteThoughtReflections !== 'undefined') {
  charlotteThoughtReflections.characterMap.options = ['弗恩','坦普尔顿','朱克曼先生'];
}

// 模型图片改为稳定的绝对地址，避免相对路径失效
loadModelImage = async function(imgId, path){
  try{
    const target = path.includes('relationship')
      ? 'https://raw.githubusercontent.com/asdfgh360-ux/123/ai-reading-assistant/assets/relationship.b64'
      : 'https://raw.githubusercontent.com/asdfgh360-ux/123/ai-reading-assistant/assets/double_bubble.b64';
    const r = await fetch(target,{cache:'no-store'});
    if(!r.ok) throw new Error('image asset '+r.status);
    const b64=(await r.text()).trim();
    const img=document.getElementById(imgId);
    if(img){
      img.src='data:image/jpeg;base64,'+b64;
      img.style.cursor='zoom-in';
      img.onclick=()=>openModelZoom(img.src,img.alt);
    }
  }catch(e){
    const frame=document.getElementById(imgId)?.parentElement;
    if(frame) frame.innerHTML='<div class="modelLoadError">图片加载失败，请刷新页面重试。</div>';
  }
}

function openModelZoom(src,alt){
  let m=document.getElementById('modelZoom');
  if(!m){
    m=document.createElement('div');m.id='modelZoom';m.className='modelZoom';
    m.innerHTML='<button class="modelZoomClose">×</button><img><div class="zoomHint">点击 × 返回阅读页面</div>';
    document.body.appendChild(m);
    m.querySelector('.modelZoomClose').onclick=()=>m.classList.remove('show');
    m.onclick=e=>{if(e.target===m)m.classList.remove('show')};
  }
  const im=m.querySelector('img');im.src=src;im.alt=alt||'思维模型';m.classList.add('show');
}

// 认识这本书：只在这一页增加作品视觉横幅
const renderIntroBeforeV5 = renderIntro;
renderIntro = function(){
  renderIntroBeforeV5();
  if(!isCharlotte()) return;
  const panel=document.getElementById('panel-intro');
  if(!panel || panel.querySelector('.introBookVisual')) return;
  panel.insertAdjacentHTML('afterbegin',`
    <div class="introBookVisual" aria-label="《夏洛的网》作品视觉导读">
      <div class="introCover">
        <div class="coverTiny">CHARLOTTE'S WEB</div>
        <div class="coverAnimals">🐷 <span>🕷️</span></div>
        <div class="coverCn">夏洛的网</div>
      </div>
      <div class="introVisualText">
        <div class="introVisualEyebrow">一本关于友谊、生命与承诺的故事</div>
        <div class="introVisualTitle">《夏洛的网》</div>
        <div class="introVisualMeta"><span>作者：E. B. 怀特</span><span>儿童小说</span><span>适合整本书精读</span></div>
        <div class="introVisualQuote">“真正重要的，不是一个角色有多强大，而是他愿意为另一个生命做什么。”</div>
      </div>
      <div class="introScene" aria-hidden="true">
        <div class="webLines">✦</div><div class="moon"></div><div class="barn">⌂</div><div class="pigSil">🐷</div><div class="spiderSil">🕷️</div>
      </div>
    </div>`);
  scrubLegacyWords();
}

// 整本书地图：从列表改成真正的阅读路线图
const renderMapBeforeV5 = renderMap;
renderMap = function(){
  if(!isCharlotte()) return renderMapBeforeV5();
  const p=state.plan;
  const icons=['🌱','🤝','⚠️','🕸️','✨'];
  const positions=[
    ['7%','64%'],['27%','24%'],['49%','62%'],['70%','22%'],['88%','58%']
  ];
  document.getElementById('panel-map').innerHTML=`
    <div class="card mapCardV5">
      <div class="kicker">WHOLE-BOOK ROUTE</div>
      <h3>整本书阅读地图</h3>
      <p class="muted">把一本书看成一段旅程。沿着5个关键站点走一遍，你会看到人物关系和故事走向是怎样一步步发生变化的。</p>
      <div class="routeMapV5">
        <svg viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true"><path d="M70 235 C170 235,170 90,285 90 S410 235,500 235 S620 80,705 80 S810 220,900 220"/><circle cx="70" cy="235" r="8"/><circle cx="285" cy="90" r="8"/><circle cx="500" cy="235" r="8"/><circle cx="705" cy="80" r="8"/><circle cx="900" cy="220" r="8"/></svg>
        ${p.wholeBookMap.map((s,i)=>`<div class="routeStopV5" style="left:${positions[i][0]};top:${positions[i][1]}"><div class="routePin"><span>${icons[i]}</span><b>${i+1}</b></div><div class="routeLabel"><strong>${esc(s.title)}</strong><small>${esc(s.goal)}</small></div></div>`).join('')}
        <div class="routeStart">起点</div><div class="routeFinish">终点</div>
      </div>
      <div class="mapTipV5">不用记住5个答案。先知道自己现在走到了故事的哪一站。</div>
    </div>`;
}

// 思维模型讨论文案统一
startThoughtDiscussion = function(kind){
  const ref=charlotteThoughtReflections[kind],picked=state.thoughtReflection?.[kind];
  if(!picked){alert('先选一个你最认同的答案，再和AI聊聊为什么。');return}
  const text=`我们来聊聊这个思维模型。你刚才选择了“${picked}”。\n\n不用写长答案，你先告诉我：你为什么会选它？`;
  state.chat=state.chat||[];state.chat.push({role:'ai',content:text});save();renderChat();document.getElementById('chatInput').focus();
}

// 阅读作品：译名修正 + 3:4作品 + 可下载保存
renderCharlotteProject = function(){
  const selected=state.projectSelections||[];
  const actions=['弗恩在一开始保护并照顾威尔伯','夏洛想办法用蛛网上的文字改变人们对威尔伯的看法','坦普尔顿带回文字线索，间接帮助夏洛的计划','威尔伯把夏洛的卵囊带回谷仓，并守护它'];
  document.getElementById('panel-project').innerHTML=`
  <div class="card projectHero"><div class="kicker">做个阅读作品</div><h3>做一张《友谊行动海报》</h3><p>不用写长篇读后感。只要找出故事里3个你认为最能代表“朋友”的行动，再说说为什么。</p><div class="finalLook">你最后会得到：<b>一张3:4、可以保存和分享的“友谊行动海报”</b></div></div>
  <div class="card"><h3>① 先选3个行动</h3><p class="muted">哪些行动最能说明“朋友不是只说好听的话，而是真的会做些什么”？</p><div class="actionChoices">${actions.map((x,i)=>`<button class="actionChoice ${selected.includes(i)?'picked':''}" data-action="${i}"><span>${selected.includes(i)?'✓':'○'}</span>${esc(x)}</button>`).join('')}</div></div>
  <div class="card"><h3>② 选一个你最想说的</h3><p class="muted">不用写很多。告诉别人：你为什么觉得这个行动特别重要？</p><textarea class="projectReason" id="projectReason" placeholder="例如：我觉得这个行动最重要，因为……">${esc(state.projectReason||'')}</textarea></div>
  <div class="card"><h3>③ 生成我的3:4阅读作品</h3><button class="primary projectBtn" id="makeDraft">生成我的作品 →</button><div id="projectPreview"></div></div>`;
  document.querySelectorAll('.actionChoice').forEach(b=>b.onclick=()=>{const i=+b.dataset.action;state.projectSelections=state.projectSelections||[];if(state.projectSelections.includes(i))state.projectSelections=state.projectSelections.filter(x=>x!==i);else if(state.projectSelections.length<3)state.projectSelections.push(i);else alert('先选3个最重要的行动就够了。');save();renderCharlotteProject()});
  document.getElementById('projectReason').oninput=e=>{state.projectReason=e.target.value;save()};
  document.getElementById('makeDraft').onclick=()=>makeCharlotteDraft(actions);
  if(state.projectDraft)showCharlotteDraft();
}

showCharlotteDraft = function(){
  const d=state.projectDraft;if(!d)return;
  document.getElementById('projectPreview').innerHTML=`
    <div class="posterWrapV5">
      <div class="posterPreviewV5" id="posterVisualV5">
        <div class="posterTopV5"><span>我的《夏洛的网》阅读作品</span><span>AI阅读精读助手</span></div>
        <h3>友谊行动海报</h3>
        <div class="posterQuestionV5">真正的朋友，会为彼此做什么？</div>
        <div class="posterArtV5"><span class="pigV5">🐷</span><span class="webV5">🕸️</span><span class="spiderV5">🕷️</span></div>
        <div class="posterActionsV5">${d.actions.map((x,i)=>`<div><i>${i+1}</i><span>${esc(x)}</span></div>`).join('')}</div>
        <div class="posterReasonV5"><b>我最想说</b><p>${esc(d.reason)}</p></div>
        <div class="posterBrandV5">即刻狐教育</div>
      </div>
      <button class="downloadPosterV5" id="downloadPosterV5">⬇ 下载 / 保存图片</button>
      <div class="saveHintV5">作品尺寸：900 × 1200（3:4）</div>
    </div>`;
  document.getElementById('downloadPosterV5').onclick=()=>downloadCharlottePoster(d);
}

function downloadCharlottePoster(d){
  const canvas=document.createElement('canvas');canvas.width=900;canvas.height=1200;
  const ctx=canvas.getContext('2d');
  const grad=ctx.createLinearGradient(0,0,900,1200);grad.addColorStop(0,'#29235f');grad.addColorStop(1,'#5b4be4');ctx.fillStyle=grad;ctx.fillRect(0,0,900,1200);
  // 柔光装饰
  ctx.globalAlpha=.14;ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(760,160,190,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(120,1060,260,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
  ctx.fillStyle='#d8d3ff';ctx.font='26px sans-serif';ctx.fillText('我的《夏洛的网》阅读作品',70,85);
  ctx.fillStyle='#ffffff';ctx.font='bold 58px sans-serif';ctx.fillText('友谊行动海报',70,175);
  ctx.fillStyle='#ffd96a';ctx.font='bold 30px sans-serif';ctx.fillText('真正的朋友，会为彼此做什么？',70,235);
  ctx.font='68px sans-serif';ctx.fillText('🐷',90,345);ctx.fillText('🕷️',725,345);ctx.strokeStyle='rgba(255,255,255,.3)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(190,318);ctx.quadraticCurveTo(450,255,680,318);ctx.stroke();
  let y=420;
  d.actions.forEach((x,i)=>{
    roundRectCanvas(ctx,65,y,770,105,22,'rgba(255,255,255,.14)');
    roundRectCanvas(ctx,85,y+25,52,52,14,'#ffffff');ctx.fillStyle='#5042d6';ctx.font='bold 27px sans-serif';ctx.fillText(String(i+1),103,y+60);
    ctx.fillStyle='#ffffff';ctx.font='25px sans-serif';wrapCanvasText(ctx,x,160,y+40,640,35);y+=125;
  });
  roundRectCanvas(ctx,65,815,770,245,25,'rgba(255,255,255,.1)');ctx.fillStyle='#ffd96a';ctx.font='bold 27px sans-serif';ctx.fillText('我最想说',92,862);ctx.fillStyle='#ffffff';ctx.font='26px sans-serif';wrapCanvasText(ctx,d.reason,92,910,690,40);
  ctx.fillStyle='#d9d5ff';ctx.font='22px sans-serif';ctx.fillText('阅读 · 思考 · 表达',70,1140);ctx.textAlign='right';ctx.fillStyle='#ffffff';ctx.font='bold 24px sans-serif';ctx.fillText('即刻狐教育',830,1140);ctx.textAlign='left';
  const a=document.createElement('a');a.download='夏洛的网-友谊行动海报.png';a.href=canvas.toDataURL('image/png');a.click();
}
function roundRectCanvas(ctx,x,y,w,h,r,fill){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill()}
function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight){let line='';for(const ch of String(text)){const t=line+ch;if(ctx.measureText(t).width>maxWidth&&line){ctx.fillText(line,x,y);line=ch;y+=lineHeight}else line=t}if(line)ctx.fillText(line,x,y)}

function scrubLegacyWords(){
  const root=document.getElementById('workspace');if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{
    if(!n.nodeValue)return;
    let v=n.nodeValue.replaceAll('AI思维地图','思维模型').replaceAll('芬','弗恩');
    if(v!==n.nodeValue)n.nodeValue=v;
  });
}

const scrubObserver=new MutationObserver(()=>scrubLegacyWords());
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const root=document.getElementById('workspace');if(root)scrubObserver.observe(root,{subtree:true,childList:true,characterData:true});
    scrubLegacyWords();
  },250);
});
