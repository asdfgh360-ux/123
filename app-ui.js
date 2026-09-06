function isCharlotte(){return norm(state.plan?.title)==='夏洛的网'}

const charlotteDiscussionStarters=[
  '先不用给完整答案。你觉得威尔伯一开始最缺的是“安全”，还是“陪伴”？先选一个，再说一句为什么。',
  '你更倾向于“责任”“友谊”，还是别的原因？先说你的判断，再想一件让你这样判断的事。',
  '坦普尔顿并不无私，但它确实影响了事情的发展。你觉得如果没有它，夏洛的计划会少掉什么？',
  '如果不能靠在网上织出文字来改变人们的看法，你会替夏洛想什么办法？大胆想一个就可以。',
  '到故事后面，威尔伯也开始为夏洛做事。你觉得他们的关系什么时候从“夏洛帮助威尔伯”变成了“彼此帮助”？'
];

const charlotteThoughtReflections={
  doubleBubble:{title:'你觉得哪一个共同点，对他们成为朋友最重要？',options:['都珍惜这段友谊','都会用自己的方式帮助对方','都因为这段关系发生了变化']},
  characterMap:{title:'这张关系图里，谁最容易被忽略，但其实很重要？',options:['芬','坦普尔顿','朱克曼先生']}
};

function renderTools(){
  if(isCharlotte()) return renderCharlotteTools();
  const p=state.plan;
  document.getElementById('panel-tools').innerHTML=`<div class="card"><div class="kicker">每本书只选最合适的1–2个</div><h3>这本书的AI思维地图</h3><p class="muted">正式版会先把思维地图生成好，孩子的任务不是“学会填表”，而是看懂关系、做判断、说理由。</p><div class="toolGrid">${p.thinkingTools.map((t,i)=>toolHTML(t,i)).join('')}</div></div>`;
  bindToolInputs();
}

function renderCharlotteTools(){
  const d=charlotteThoughtReflections.doubleBubble,c=charlotteThoughtReflections.characterMap;
  const choice=state.thoughtReflection||{};
  document.getElementById('panel-tools').innerHTML=`
  <div class="card thoughtIntro">
    <div class="kicker">AI已经帮你把结构画出来了</div>
    <h3>换一种方式看《夏洛的网》</h3>
    <p class="muted">你不用自己画复杂的图。先看懂AI整理出的关系，再判断：哪些地方最重要？有没有你不同意的地方？</p>
  </div>

  <div class="card modelCard">
    <div class="modelTop"><div><div class="kicker">思维方式 01</div><h3>威尔伯 VS 夏洛</h3></div><span class="modelBadge">双重气泡图</span></div>
    <div class="modelExplain"><div><b>它有什么用？</b><span>把两个对象放在一起比较，既能看见“哪里不同”，也能找到“为什么他们仍然能建立联系”。</span></div><div><b>怎么看？</b><span>左边看威尔伯独有的特点，中间看两者共同点，右边看夏洛独有的特点。</span></div></div>
    <div class="bubbleMap">
      <div class="bubbleSide left">
        <div class="personBubble pig">🐷<b>威尔伯</b></div>
        <span>需要陪伴，情绪比较外露</span><span>对危险非常敏感</span><span>前期更依赖别人的帮助</span>
      </div>
      <div class="bubbleCommon">
        <div class="commonTitle">共同点</div>
        <span>都珍惜这段友谊</span><span>都会用自己的方式帮助对方</span><span>都因为这段关系发生了变化</span>
      </div>
      <div class="bubbleSide right">
        <div class="personBubble spider">🕷️<b>夏洛</b></div>
        <span>冷静、善于观察</span><span>会用文字改变人们的看法</span><span>面对生命变化更加从容</span>
      </div>
    </div>
    <div class="thinkBox"><b>🤔 轮到你想一想</b><p>${d.title}</p><div class="choiceRow">${d.options.map(x=>`<button class="choiceBtn ${choice.doubleBubble===x?'picked':''}" data-reflect="doubleBubble" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div><button class="talkBtn" data-talk-tool="doubleBubble">和AI聊聊为什么 →</button></div>
  </div>

  <div class="card modelCard">
    <div class="modelTop"><div><div class="kicker">思维方式 02</div><h3>谁在影响威尔伯？</h3></div><span class="modelBadge">人物关系图</span></div>
    <div class="modelExplain"><div><b>它有什么用？</b><span>人物多的时候，关系图能帮助我们看清：谁在帮助谁、谁在改变谁、一个看似次要的人为什么也会影响结果。</span></div><div><b>怎么看？</b><span>把中心人物放在中间，再看周围人物与他的关系，以及这种关系怎样影响故事走向。</span></div></div>
    <div class="relationMap">
      <div class="relationNode fern"><b>芬</b><span>最初保护、照顾威尔伯</span></div>
      <div class="relationNode charlotte"><b>夏洛</b><span>朋友｜用行动和文字帮助它</span></div>
      <div class="relationCenter">🐷<b>威尔伯</b><small>中心人物</small></div>
      <div class="relationNode templeton"><b>坦普尔顿</b><span>自利，但多次间接帮助计划推进</span></div>
      <div class="relationNode zuckerman"><b>朱克曼先生</b><span>农场主人｜对威尔伯的评价被蛛网上的文字改变</span></div>
    </div>
    <div class="thinkBox"><b>🤔 轮到你想一想</b><p>${c.title}</p><div class="choiceRow">${c.options.map(x=>`<button class="choiceBtn ${choice.characterMap===x?'picked':''}" data-reflect="characterMap" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div><button class="talkBtn" data-talk-tool="characterMap">和AI聊聊为什么 →</button></div>
  </div>`;

  document.querySelectorAll('[data-reflect]').forEach(b=>b.onclick=()=>{state.thoughtReflection=state.thoughtReflection||{};state.thoughtReflection[b.dataset.reflect]=b.dataset.value;save();renderCharlotteTools()});
  document.querySelectorAll('[data-talk-tool]').forEach(b=>b.onclick=()=>startThoughtDiscussion(b.dataset.talkTool));
}

function startThoughtDiscussion(kind){
  const ref=charlotteThoughtReflections[kind],picked=state.thoughtReflection?.[kind];
  if(!picked){alert('先选一个你最认同的答案，再和AI聊聊为什么。');return}
  const text=`我们来聊聊AI思维地图。你刚才选择了“${picked}”。\n\n不用写长答案，你先告诉我：你为什么会选它？`;
  state.chat=state.chat||[];state.chat.push({role:'ai',content:text});save();renderChat();document.getElementById('chatInput').focus();
}

function toolHTML(t,i){const id=resolveId(t);return `<div class="toolCard" data-tool-index="${i}"><div class="kicker">工具 ${i+1}</div><h4>${esc(t.name||modelNames[id]||'思维工具')}</h4><div class="why">${esc(t.whyFit||'')}</div><div class="toolArea">${templateHTML(id,t,i)}</div><button class="softBtn feedbackBtn" data-tool="${i}">✨ 让AI帮我看看</button><div class="feedback" id="feedback-${i}" style="display:${state.toolAnswers?.[i]?.feedback?'block':'none'}">${esc(state.toolAnswers?.[i]?.feedback||'')}</div></div>`}
function getTA(i){state.toolAnswers=state.toolAnswers||{};state.toolAnswers[i]=state.toolAnswers[i]||{values:{}};return state.toolAnswers[i]}
function ta(i,key,ph='写下你的发现…'){const v=getTA(i).values[key]||'';return `<textarea data-i="${i}" data-k="${key}" placeholder="${esc(ph)}">${esc(v)}</textarea>`}
function templateHTML(id,t,i){if(id==='timeline')return `<div id="dyn-${i}">${dynamicListHTML(i,'timeline','事件','发生了什么？为什么重要？')}</div><button type="button" class="softBtn addItem" data-i="${i}" data-kind="timeline">＋添加事件</button>`;
if(id==='storyMountain')return `<div class="cols2">${['开端','发展','冲突','高潮','结局'].map(x=>`<div class="miniBox"><strong>${x}</strong>${ta(i,x)}</div>`).join('')}</div>`;
if(id==='doubleBubble')return `<div class="cols3"><div class="miniBox"><strong>A 独有</strong>${ta(i,'A独有','人物A独有的特点/处境')}</div><div class="miniBox"><strong>共同点</strong>${ta(i,'共同点','他们共同重视什么？')}</div><div class="miniBox"><strong>B 独有</strong>${ta(i,'B独有','人物B独有的特点/能力')}</div></div>`;
if(id==='swot')return `<div class="cols4"><div class="miniBox"><strong>S 强项</strong>${ta(i,'S')}</div><div class="miniBox"><strong>W 弱点</strong>${ta(i,'W')}</div><div class="miniBox"><strong>O 机会</strong>${ta(i,'O')}</div><div class="miniBox"><strong>T 风险</strong>${ta(i,'T')}</div></div>`;
if(id==='logicTree')return `<div class="field"><label>最上面的“大问题”</label>${ta(i,'root','例如：为什么主角会做这个选择？')}</div><div id="dyn-${i}">${dynamicListHTML(i,'logic','分支','把大问题拆成一个小问题')}</div><button type="button" class="softBtn addItem" data-i="${i}" data-kind="logic">＋添加分支</button>`;
if(id==='characterMap')return `<div class="field"><label>中心人物</label>${ta(i,'center','谁放在中心？')}</div><div id="dyn-${i}">${dynamicListHTML(i,'relation','关系','人物A → 关系动词 → 中心人物')}</div><button type="button" class="softBtn addItem" data-i="${i}" data-kind="relation">＋添加关系</button>`;
if(id==='decisionMatrix')return `<div class="cols2"><div class="miniBox"><strong>方案A + 评分理由</strong>${ta(i,'A')}</div><div class="miniBox"><strong>方案B + 评分理由</strong>${ta(i,'B')}</div><div class="miniBox"><strong>比较标准</strong>${ta(i,'criteria','安全/公平/代价/效果…')}</div><div class="miniBox"><strong>我的决定</strong>${ta(i,'decision')}</div></div>`;
if(id==='empathyMap')return `<div class="cols4"><div class="miniBox"><strong>看到</strong>${ta(i,'看到')}</div><div class="miniBox"><strong>听到</strong>${ta(i,'听到')}</div><div class="miniBox"><strong>想到/感到</strong>${ta(i,'想到感到')}</div><div class="miniBox"><strong>说和做</strong>${ta(i,'说和做')}</div></div>`;
const prompts=(t.prompts||['我已经确定的事实','我发现的关系/变化','这说明了什么？']);return prompts.map((x,k)=>`<div class="field"><label>${esc(x)}</label>${ta(i,'p'+k)}</div>`).join('')}
function dynamicListHTML(i,kind,label,ph){const a=getTA(i).values[kind]||[''];return a.map((v,k)=>`<div class="field"><label>${label}${k+1}</label><input data-i="${i}" data-arr="${kind}" data-pos="${k}" value="${esc(v)}" placeholder="${esc(ph)}" /></div>`).join('')}
function bindToolInputs(){document.querySelectorAll('[data-i][data-k]').forEach(el=>el.addEventListener('input',e=>{getTA(+e.target.dataset.i).values[e.target.dataset.k]=e.target.value;save()}));document.querySelectorAll('[data-i][data-arr]').forEach(el=>el.addEventListener('input',e=>{const i=+e.target.dataset.i,k=e.target.dataset.arr,p=+e.target.dataset.pos;getTA(i).values[k]=getTA(i).values[k]||[];getTA(i).values[k][p]=e.target.value;save()}));document.querySelectorAll('.addItem').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,k=b.dataset.kind;getTA(i).values[k]=getTA(i).values[k]||[''];getTA(i).values[k].push('');renderTools()});document.querySelectorAll('.feedbackBtn').forEach(b=>b.onclick=()=>feedbackForTool(+b.dataset.tool))}
async function feedbackForTool(i){const t=state.plan.thinkingTools[i],ans=getTA(i).values;setLoading(true,'AI正在看你的思维图，不会替你填答案…');try{const sys=`你是小学${state.grade}年级的阅读导师。${gradeLanguage(state.grade)}。你只做启发式反馈：第一句指出孩子已经做对/看见的一个具体点；第二句指出一个还可以继续想的地方；最后只问1个问题。不要给标准答案，不要替孩子补完整。不使用“好词好句”。`;const resp=await aiChat([{role:'system',content:sys},{role:'user',content:`书名：《${state.plan.title}》\n思维工具：${t.name}\n孩子填写：${JSON.stringify(ans)}`}]);getTA(i).feedback=responseText(resp)||'我看到了你的思考。再试着找一个“为什么”或“如果换个选择会怎样”？';renderTools();save()}catch(e){getTA(i).feedback='你的图已经有了自己的判断。下一步只追问一个问题：其中哪一条关系最能改变全书的走向？为什么？';renderTools()}finally{setLoading(false)}}

function renderDiscuss(){
  const q=state.plan.discussionQuestions||[];
  document.getElementById('panel-discuss').innerHTML=`<div class="card"><div class="kicker">思维与讨论</div><h3>挑一个你真的想聊的问题</h3><p class="muted">不用抄题，也不用回复“Q1”。直接点击问题下面的“和AI聊聊”，右侧会自动开始这个话题。</p>${q.map((x,i)=>`<div class="question discussionCard ${state.activeDiscussion===i?'activeQ':''}"><div class="qLine"><b>Q${i+1}</b><span>${esc(x)}</span></div><div class="qActions"><button class="softBtn discussBtn" data-q="${i}">${state.activeDiscussion===i?'正在讨论这个问题':'和AI聊聊这个问题 →'}</button>${state.discussionResponded?.[i]?'<span class="doneMark">✓ 已经聊过</span>':''}</div></div>`).join('')}</div>`;
  document.querySelectorAll('.discussBtn').forEach(b=>b.onclick=()=>startDiscussion(+b.dataset.q));
}

function startDiscussion(i){
  const q=state.plan.discussionQuestions?.[i];if(!q)return;
  state.activeDiscussion=i;state.discussionOpened=state.discussionOpened||{};state.discussionOpened[i]=true;
  const starter=isCharlotte()?charlotteDiscussionStarters[i]||'你先说一个最直觉的想法就好。':`我们来聊这个问题：${q}\n\n你先说一个最直觉的想法就好，不需要写得很完整。`;
  state.chat=state.chat||[];
  state.chat.push({role:'ai',content:`我们来聊 Q${i+1}：\n${q}\n\n${starter}`});
  save();renderDiscuss();renderChat();document.getElementById('chatInput').focus();
}

function renderProject(){
  if(isCharlotte()) return renderCharlotteProject();
  const f=state.plan.finalProject||{};
  document.getElementById('panel-project').innerHTML=`<div class="card drive"><div class="kicker">做个阅读作品</div><h3>${esc(f.title||'我的阅读作品')}</h3><p class="muted">${esc(f.brief||'')}</p></div><div class="card"><h3>只需要完成这几步</h3><div class="projectSteps">${(f.steps||[]).map((s,i)=>`<div class="step"><i>${i+1}</i><div>${esc(s)}</div></div>`).join('')}</div></div>`;
}

function renderCharlotteProject(){
  const selected=state.projectSelections||[];
  const actions=['芬在一开始保护并照顾威尔伯','夏洛想办法用蛛网上的文字改变人们对威尔伯的看法','坦普尔顿带回文字线索，间接帮助夏洛的计划','威尔伯把夏洛的卵囊带回谷仓，并守护它'];
  document.getElementById('panel-project').innerHTML=`
  <div class="card projectHero"><div class="kicker">做个阅读作品</div><h3>做一张《友谊行动海报》</h3><p>不用写长篇读后感。只要找出故事里3个你认为最能代表“朋友”的行动，再说说为什么。</p><div class="finalLook">你最后会得到：<b>一张可以展示给别人看的“友谊行动海报”</b></div></div>
  <div class="card"><h3>① 先选3个行动</h3><p class="muted">哪些行动最能说明“朋友不是只说好听的话，而是真的会做些什么”？</p><div class="actionChoices">${actions.map((x,i)=>`<button class="actionChoice ${selected.includes(i)?'picked':''}" data-action="${i}"><span>${selected.includes(i)?'✓':'○'}</span>${esc(x)}</button>`).join('')}</div></div>
  <div class="card"><h3>② 选一个你最想说的</h3><p class="muted">不用写很多。告诉别人：你为什么觉得这个行动特别重要？</p><textarea class="projectReason" id="projectReason" placeholder="例如：我觉得这个行动最重要，因为……">${esc(state.projectReason||'')}</textarea></div>
  <div class="card"><h3>③ 看看我的作品草稿</h3><button class="primary projectBtn" id="makeDraft">生成我的作品草稿 →</button><div id="projectPreview"></div></div>`;
  document.querySelectorAll('.actionChoice').forEach(b=>b.onclick=()=>{const i=+b.dataset.action;state.projectSelections=state.projectSelections||[];if(state.projectSelections.includes(i))state.projectSelections=state.projectSelections.filter(x=>x!==i);else if(state.projectSelections.length<3)state.projectSelections.push(i);else alert('先选3个最重要的行动就够了。');save();renderCharlotteProject()});
  document.getElementById('projectReason').oninput=e=>{state.projectReason=e.target.value;save()};
  document.getElementById('makeDraft').onclick=()=>makeCharlotteDraft(actions);
  if(state.projectDraft)showCharlotteDraft();
}

function makeCharlotteDraft(actions){
  if((state.projectSelections||[]).length<3){alert('先选满3个行动。');return}
  if(!(state.projectReason||'').trim()){alert('再写一句“为什么”，作品就完整了。');return}
  state.projectDraft={actions:state.projectSelections.map(i=>actions[i]),reason:state.projectReason.trim()};save();showCharlotteDraft();
}
function showCharlotteDraft(){const d=state.projectDraft;if(!d)return;document.getElementById('projectPreview').innerHTML=`<div class="posterPreview"><div class="posterEyebrow">我的《夏洛的网》阅读作品</div><h3>友谊行动海报</h3><div class="posterQuestion">真正的朋友，会为彼此做什么？</div><div class="posterActions">${d.actions.map((x,i)=>`<div><i>${i+1}</i><span>${esc(x)}</span></div>`).join('')}</div><div class="posterReason"><b>我最想说：</b>${esc(d.reason)}</div></div>`}

function renderChat(){
  const box=document.getElementById('messages');
  if(!state.chat?.length)state.chat=[{role:'ai',content:`哈喽！我们正在读《${state.plan.title}》，关于这本书，你有什么问题都可以跟我讨论。`}];
  const quick=state.chat.length===1?`<div class="chatQuick"><button data-quick="我想聊聊一个人物">聊聊一个人物</button><button data-quick="有个情节我没看懂">有个情节没看懂</button><button data-quick="我有一个不同的想法">我有不同的想法</button><button data-quick="帮我理一理人物关系">帮我理一理关系</button></div>`:'';
  box.innerHTML=state.chat.map(m=>`<div class="msg ${m.role==='user'?'user':'ai'}">${esc(m.content)}</div>`).join('')+quick;
  document.querySelectorAll('[data-quick]').forEach(b=>b.onclick=()=>{document.getElementById('chatInput').value=b.dataset.quick;document.getElementById('chatInput').focus()});
  box.scrollTop=box.scrollHeight;
}

async function sendChat(text){
  if(!text.trim())return;
  if(state.activeDiscussion!=null){state.discussionResponded=state.discussionResponded||{};state.discussionResponded[state.activeDiscussion]=true;renderDiscuss()}
  state.chat.push({role:'user',content:text.trim()});renderChat();save();
  const input=document.getElementById('chatInput');input.value='';
  const temp={role:'ai',content:'正在想一个能让你继续发现的问题…'};state.chat.push(temp);renderChat();
  try{
    const active=state.activeDiscussion!=null?`当前正在讨论的问题：${state.plan.discussionQuestions[state.activeDiscussion]}。`:'';
    const sys=`你是AI阅读导师，面向小学${state.grade}年级。当前书名《${state.plan.title}》，体裁${state.plan.genre}，驱动问题：${state.plan.drivingQuestion}。${active}${gradeLanguage(state.grade)}。你绝不提供“标准答案”、不要求摘好词好句、不把阅读变成考试。优先用追问帮助孩子发现人物关系、变化、因果、选择与证据。先回应孩子刚才真实说出的内容，再只推进一个思考点。一次最多问1个主要问题。回复尽量80-150字以内。不要长篇复述原书。`;
    const hist=state.chat.slice(-9,-1).map(m=>({role:m.role==='ai'?'assistant':'user',content:m.content}));
    const resp=await aiChat([{role:'system',content:sys},...hist,{role:'user',content:text.trim()}]);
    temp.content=responseText(resp)||'你已经抓到一个点了。接着想：你是从哪件事看出来的？如果把这个选择换掉，后面可能会有什么不同？';
  }catch(e){temp.content='我先不替你补答案。你可以再往前走一步：这件事为什么会发生？如果换一个角色来做决定，结果会不会不一样？'}
  renderChat();save();
}

function renderIntro(){
  const p=state.plan;
  if(isCharlotte()){
    document.getElementById('panel-intro').innerHTML=`
    <div class="card"><div class="kicker">先认识作品</div><h3>这本书在讲什么？</h3><p class="muted">小猪威尔伯在谷仓里认识了蜘蛛夏洛。威尔伯面临被宰杀的危险，夏洛想办法用蛛网上的文字改变人们对它的看法。故事不只是在讲“救一只小猪”，也在讲友谊、承诺、生命与告别。</p></div>
    <div class="card authorCard">
      <div class="authorHeader"><div class="authorAvatar">E.B.</div><div><div class="kicker">认识写这本书的人</div><h3>E. B. 怀特 <small>1899–1985</small></h3><p>美国作家、散文家，也是《纽约客》的重要撰稿人之一。</p></div></div>
      <div class="authorGrid">
        <div><b>📚 他还写过</b><p>《精灵鼠小弟》<br>《吹小号的天鹅》</p></div>
        <div><b>✍️ 他喜欢怎样写</b><p>语言清楚、自然，常带一点幽默；他很会观察动物与日常生活，也会把生命、孤独和友谊这些大问题写得让孩子能理解。</p></div>
        <div class="storySpan"><b>🌿 一个和这本书有关的人生故事</b><p>怀特长期在美国缅因州的农场生活，也照料动物。1947年，一头生病的猪去世，让他非常难过；后来他又在谷仓里仔细观察蜘蛛结网、产卵。这些真实生活经验慢慢进入了《夏洛的网》的创作。</p><div class="readingClue"><b>带着这条线索去读：</b>留意作者是不是一直把动物当成“有自己生命和感受的角色”，而不只是故事里的道具。</div></div>
      </div>
    </div>
    <div class="card drive"><div class="kicker">带着一个问题读完整本书</div><div class="q">${esc(p.drivingQuestion)}</div><p class="muted">这个问题没有唯一答案。后面的整本书地图、AI思维地图和讨论，都会帮你慢慢形成自己的答案。</p></div>`;
    return;
  }
  document.getElementById('panel-intro').innerHTML=`<div class="card"><div class="kicker">先看全书，不急着做题</div><h3>这本书大概在讲什么？</h3><p class="muted">${esc(p.bookIntro)}</p>${p.confidence==='low'?'<div class="feedback">这本书的信息把握有限，我会避免假装知道具体章节，先用“通用整本书路线”陪你读。你不需要粘贴原文。</div>':''}</div><div class="card drive"><div class="kicker">PBL 驱动性问题</div><div class="q">${esc(p.drivingQuestion)}</div><p class="muted">这不是一道“答完就结束”的题。你会带着它读完整本书，并在最后用作品回答它。</p></div>`
}

function initUI(){
  document.getElementById('chips').innerHTML=quick.map(x=>`<button class="chip" data-book="${x}">${x}</button>`).join('');
  document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{document.getElementById('bookInput').value=b.dataset.book});
  document.getElementById('booklist').innerHTML=Object.entries(rawBooks).map(([g,arr])=>`<div class="gradecol"><b>${g}年级</b><p>${arr.slice(0,9).map(x=>x[0]).join(' · ')}${arr.length>9?' …':''}</p></div>`).join('');
  document.getElementById('bookForm').onsubmit=async e=>{e.preventDefault();const title=document.getElementById('bookInput').value.trim();if(!title)return;setLoading(true);const p=await analyze(title);setLoading(false);state={plan:p,grade:p.recommendedGrade||3,toolAnswers:{},chat:[]};openWorkspace();if(p._error){const er=document.getElementById('homeError');er.textContent='AI连接刚才没有成功，所以我先打开了可用的通用精读路线。你仍然可以继续使用阅读地图。';}};
  document.getElementById('demoBtn').onclick=()=>{const p=demoCharlotte();state={plan:p,grade:3,toolAnswers:{},chat:[],thoughtReflection:{},discussionResponded:{},projectSelections:[]};openWorkspace()};
  document.getElementById('restartBtn').onclick=()=>{localStorage.removeItem('ai-reading-agent-v2');location.reload()};
  document.getElementById('gradeSelect').onchange=e=>{state.grade=+e.target.value;renderProject();renderChat();save()};
  document.getElementById('tabs').onclick=e=>{const b=e.target.closest('.tab');if(!b)return;document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));document.getElementById('panel-'+b.dataset.tab).classList.add('active')};
  document.getElementById('chatForm').onsubmit=e=>{e.preventDefault();sendChat(document.getElementById('chatInput').value)};
  document.getElementById('chatInput').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();document.getElementById('chatForm').requestSubmit()}};
  loadSaved();
}
initUI();