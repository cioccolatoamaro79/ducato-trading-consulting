(async()=> {
 const list=document.getElementById('agenda-lista'),home=document.getElementById('agenda-anteprima'),filters=document.getElementById('agenda-mesi');
 if(!list&&!home)return;
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=s=>{const d=new Date(s+'T12:00:00');return Number.isNaN(d.getTime())?'':new Intl.DateTimeFormat('it-IT',{day:'numeric',month:'long',year:'numeric'}).format(d)};
 const month=s=>/^[0-9]{4}-[0-9]{2}$/.test(s||'')?new Intl.DateTimeFormat('it-IT',{month:'long',year:'numeric'}).format(new Date(s+'-01T12:00:00')):'';
 const card=x=>{let url='';try{const u=new URL(x.fonte_url);if(['https:','http:'].includes(u.protocol))url=u.href}catch(e){}return '<article class="article"><div class="date">'+escape(fmt(x.data))+' · '+escape(x.categoria||'Scadenza')+'</div><h3>'+escape(x.titolo)+'</h3><p>'+escape(x.descrizione||'')+'</p>'+(url?'<a href="'+escape(url)+'" target="_blank" rel="noopener noreferrer">Fonte ufficiale ↗</a>':'')+'</article>'};
 try{
 const r=await fetch('/contenuti/scadenze.json',{cache:'no-cache'});if(!r.ok)throw Error('Archivio scadenze non disponibile');
 const data=await r.json(), all=(Array.isArray(data.scadenze)?data.scadenze:[]).filter(x=>x.pubblicato===true&&x.titolo&&/^\d{4}-\d{2}-\d{2}$/.test(x.data||'')).sort((a,b)=>String(a.data).localeCompare(String(b.data)));
 const current=new Date();const thisMonth=current.getFullYear()+'-'+String(current.getMonth()+1).padStart(2,'0');
 const active=all.filter(x=>x.data.slice(0,7)>=thisMonth);
 if(home){const monthEntries=active.filter(x=>x.data.slice(0,7)===thisMonth);const chosen=monthEntries.length?monthEntries:active.slice(0,3);home.innerHTML=chosen.length?chosen.slice(0,3).map(card).join(''):'<p>Le prossime scadenze saranno disponibili dopo la pubblicazione del calendario mensile.</p>';}
 if(list){const months=[...new Set(all.map(x=>x.data.slice(0,7)))].sort().reverse();const render=m=>{const shown=m==='Tutti'?all:all.filter(x=>x.data.slice(0,7)===m);list.innerHTML=shown.length?shown.map(card).join(''):'<p>Nessuna scadenza pubblicata per questo periodo.</p>';[...filters.children].forEach(b=>b.classList.toggle('active',b.dataset.month===m))};if(filters){['Tutti',...months].forEach(m=>{const b=document.createElement('button');b.type='button';b.textContent=m==='Tutti'?'Tutte':month(m);b.dataset.month=m;b.addEventListener('click',()=>render(m));filters.appendChild(b)})}render(months.includes(thisMonth)?thisMonth:months[0]||'Tutti')}
 }catch(e){if(home)home.innerHTML='<p>Calendario temporaneamente non disponibile.</p>';if(list)list.innerHTML='<p>Calendario temporaneamente non disponibile.</p>';console.error(e)}
})();