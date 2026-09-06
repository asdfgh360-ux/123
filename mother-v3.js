async function loadModelImage(imgId, path){
  try{
    const r=await fetch(path,{cache:'no-store'});
    const b64=(await r.text()).trim();
    const img=document.getElementById(imgId);
    if(img) img.src='data:image/jpeg;base64,'+b64;
  }catch(e){console.warn('model image load failed',e)}
}

function renderTools(){
  if(isCharlotte()) return renderCharlotteToolsV3();
  return renderCharlotteTools ? renderCharlotteTools() : undefined;
}

function renderCharlotteToolsV3(){
  const d=charlotteThoughtReflections.doubleBubble;
  const c=charlotteThoughtReflections.characterMap;
  const choice=state.thoughtReflection||{};
  document.getElementById('panel-tools').innerHTML=`
    <div class="card thoughtIntro">
      <div class="kicker">这本书，我们用两种思考方式来看</div>
      <h3>《夏洛的网》的思维模型</h3>
      <p class="muted">模型已经提前整理好。你不用自己画复杂的图，先看懂它，再判断：哪些关系最重要？你有没有不同的理解？</p>
    </div>

    <div class="card modelCard">
      <div class="modelTop"><div><div class="kicker">思维模型 01</div><h3>威尔伯 VS 夏洛</h3></div><span class="modelBadge">双重气泡图</span></div>
      <div class="modelExplain singleExplain">
        <div><b>💡 思维模型解读</b><span>双重气泡图用来比较两个对象。左右分别放两个人物独有的特点，中间放他们共同的特点。它能帮助我们同时看见“哪里不同”和“为什么两个不同的人仍然能够建立联系”。</span></div>
      </div>
      <div class="generatedModelFrame"><img id="doubleBubbleGenerated" alt="威尔伯与夏洛双重气泡图（AI生成）"></div>
      <div class="thinkBox"><b>🤔 轮到你想一想</b><p>${d.title}</p><div class="choiceRow">${d.options.map(x=>`<button class="choiceBtn ${choice.doubleBubble===x?'picked':''}" data-reflect="doubleBubble" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div><button class="talkBtn" data-talk-tool="doubleBubble">和AI聊聊为什么 →</button></div>
    </div>

    <div class="card modelCard">
      <div class="modelTop"><div><div class="kicker">思维模型 02</div><h3>谁在影响威尔伯？</h3></div><span class="modelBadge">人物关系图</span></div>
      <div class="modelExplain singleExplain">
        <div><b>💡 思维模型解读</b><span>人物关系图把中心人物放在中间，再把与他有关的人物连接起来。它能帮助我们看清谁在帮助谁、谁在影响谁，以及一个看似不重要的人为什么也可能改变故事结果。</span></div>
      </div>
      <div class="generatedModelFrame"><img id="relationshipGenerated" alt="夏洛的网人物关系图（AI生成）"></div>
      <div class="thinkBox"><b>🤔 轮到你想一想</b><p>${c.title}</p><div class="choiceRow">${c.options.map(x=>`<button class="choiceBtn ${choice.characterMap===x?'picked':''}" data-reflect="characterMap" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div><button class="talkBtn" data-talk-tool="characterMap">和AI聊聊为什么 →</button></div>
    </div>`;

  document.querySelectorAll('[data-reflect]').forEach(b=>b.onclick=()=>{state.thoughtReflection=state.thoughtReflection||{};state.thoughtReflection[b.dataset.reflect]=b.dataset.value;save();renderCharlotteToolsV3()});
  document.querySelectorAll('[data-talk-tool]').forEach(b=>b.onclick=()=>startThoughtDiscussion(b.dataset.talkTool));
  loadModelImage('doubleBubbleGenerated','assets/double_bubble.b64');
  loadModelImage('relationshipGenerated','assets/relationship.b64');
}

const oldRenderChatV3 = renderChat;
renderChat = function(){
  const box=document.getElementById('messages');
  if(!state.chat?.length)state.chat=[{role:'ai',content:`哈喽！我们正在读《${state.plan.title}》，关于这本书，你有什么问题都可以跟我讨论。`}];
  box.innerHTML=state.chat.map(m=>`<div class="msg ${m.role==='user'?'user':'ai'}">${esc(m.content)}</div>`).join('');
  box.scrollTop=box.scrollHeight;
};
