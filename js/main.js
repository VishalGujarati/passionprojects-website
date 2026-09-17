(async()=>{
const $=s=>document.querySelector(s);
const y=$('#year'); if(y)y.textContent=new Date().getFullYear();
const menu=$('#menu'),mobile=$('#mobileLinks');
menu?.addEventListener('click',()=>mobile?.classList.toggle('open'));
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));
let data=null;
for(const path of ['data/site.json','../data/site.json','../../data/site.json']){
 try{const r=await fetch(path);if(r.ok){data=await r.json();break}}catch(e){}
}
if(!data)return;
document.querySelectorAll('[data-contact-email]').forEach(e=>{e.textContent=data.contactEmail;e.href='mailto:'+data.contactEmail});
document.querySelectorAll('[data-payment-link]').forEach(e=>e.href=data.paymentUrl);
const softwareList=$('#softwareList');
if(softwareList){softwareList.innerHTML=data.products.map(p=>`<article class="software-card"><div class="software-icon"><img src="../assets/gujarati-converter.png" alt="Gujarati Legacy Font Converter"></div><div class="software-body"><div class="meta"><span>${p.category}</span><span>v${p.version}</span></div><h3>${p.name}</h3><p>${p.summary}</p><div class="chip-row">${p.platforms.map(x=>`<span>${x}</span>`).join('')}<span>${p.status}</span></div><a class="btn primary" href="view.html?id=${encodeURIComponent(p.id)}">View project ↗</a></div></article>`).join('')}
const downloadList=$('#downloadList');
if(downloadList){downloadList.innerHTML=data.products.map(p=>`<article class="card"><div class="meta"><span>${p.category}</span><span>v${p.version}</span></div><h3>${p.name}</h3><p>${p.summary}</p><div class="chip-row">${p.platforms.map(x=>`<span>${x}</span>`).join('')}</div><a class="btn primary" href="../software/view.html?id=${encodeURIComponent(p.id)}#downloads">Choose platform</a></article>`).join('')}
const detail=$('#softwareDetail');
if(detail){
 const id=new URLSearchParams(location.search).get('id'); const p=data.products.find(x=>x.id===id)||data.products[0];
 if(p){document.title=p.name+' | Passion Projects';detail.innerHTML=`
 <div class="product-grid"><div><div class="product-kicker">PASSION PROJECT / SOFTWARE</div><h1 class="product-title">${p.name.replace(' Font ','<br>Font ')}</h1><p class="product-copy">${p.description}</p><div class="release-meta">${p.platforms.map(x=>`<span>${x}</span>`).join('')}<span>v${p.version}</span><span>${p.status}</span></div><div class="actions"><a class="btn primary" href="#downloads">Choose download</a><a class="btn" href="../contact/">Need help?</a></div></div><div class="product-visual"><img class="product-logo" src="../assets/gujarati-converter.png" alt="Gujarati Legacy Font Converter"><small>LEGACY → UNICODE</small></div></div>
 <section class="section" style="padding-bottom:0"><div class="section-head"><div><label>WHAT IT DOES</label><h2>Old Gujarati text,<br>ready for today.</h2></div><p class="head-copy">The converter is built around the practical problem of moving supported legacy Gujarati text into Unicode for modern documents and digital workflows.</p></div><div class="feature-list">${p.features.map((f,i)=>`<div><b>${String(i+1).padStart(2,'0')} · ${f}</b><span>Included in the current release.</span></div>`).join('')}</div></section>
 <section class="section" id="downloads"><div class="section-head"><div><label>DOWNLOADS</label><h2>Choose your<br><em>platform.</em></h2></div><p class="head-copy">The release links can be added later without changing the project page.</p></div><div class="download-box"><div class="platform"><label>WINDOWS</label><h3>Windows package</h3><p>Latest Windows build.</p><a class="btn primary" href="${p.downloads.windows}">${p.downloads.windows==='#'?'Windows link coming soon':'Download Windows'}</a></div><div class="platform"><label>UBUNTU</label><h3>Ubuntu package</h3><p>Latest Ubuntu/Debian package.</p><a class="btn primary" href="${p.downloads.ubuntu}">${p.downloads.ubuntu==='#'?'Ubuntu link coming soon':'Download Ubuntu'}</a></div></div></section>`}
}
})();
