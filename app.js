const C=window.PIZZA_CONFIG||{};const NAME=C.name||"Roman's Pizza";
const PIES=[
{id:"pepperoni",n:"Pepperoni",d:"Crispy, cupped pepperoni that curls into little grease-kissed bowls over melty mozzarella and bright tomato sauce."},
{id:"pep-hot-honey",n:"Pepperoni Hot Honey",d:"Our pepperoni pie finished with a glossy drizzle of chili-spiked hot honey. Sweet, spicy, salty, gone fast."},
{id:"pep-hot-honey-ricotta",n:"Pepperoni Hot Honey Ricotta",d:"Pepperoni and hot honey plus cool, creamy dollops of whipped ricotta. The one everybody fights over."},
{id:"margherita",n:"Margherita",d:"Fresh mozzarella, simple tomato sauce, fresh basil and a swirl of olive oil on a blistered crust."},
{id:"cheese",n:"Cheese",d:"Golden, bubbly, browned-edge mozzarella over our house sauce. Classic for a reason, and great for kids."}];
const $=s=>document.querySelector(s);const money=p=>p==null?"":"$"+Number(p).toFixed(p%1?2:0);
document.title=NAME+' | 12" Weekend Pizzas in Plymouth, MI';
document.querySelectorAll("[data-name]").forEach(e=>e.textContent=NAME);
if(C.tagline)document.querySelectorAll("[data-tagline]").forEach(e=>e.textContent=C.tagline);
if(C.area)document.querySelectorAll("[data-area]").forEach(e=>e.textContent=C.area);
if(C.orderDeadline)document.querySelectorAll("[data-deadline]").forEach(e=>e.textContent=C.orderDeadline);
$("#yr").textContent=new Date().getFullYear();
const pr=id=>(C.prices||{})[id];
$("#menuGrid").innerHTML=PIES.map(p=>`<li><img src="img/${p.id}.jpg" alt="${p.n} pizza" loading="lazy"><div><div class="mrow"><h3>${p.n}</h3><span class="dots"></span><span class="${pr(p.id)!=null?"mprice":"msize"}">${pr(p.id)!=null?money(pr(p.id)):"12\""}</span></div><p>${p.d}</p></div></li>`).join("");
const O=Object.assign({crust:["Regular"],cheese:["Regular","Extra","Light","No cheese"],sauce:["Regular","Extra","Light","No sauce"]},C.options||{});
const lines=[];let qn=1;const opt=a=>a.map(x=>`<option>${x}</option>`).join("");
$("#pie").innerHTML=PIES.map(p=>`<option value="${p.id}">${p.n}${pr(p.id)!=null?" · "+money(pr(p.id)):""}</option>`).join("");
["crust","cheese","sauce"].forEach(k=>$("#o-"+k).innerHTML=opt(O[k]));
$("#qm").onclick=()=>{qn=Math.max(1,qn-1);$("#qn").textContent=qn};$("#qp").onclick=()=>{qn=Math.min(50,qn+1);$("#qn").textContent=qn};
function desc(l){const d=[];if(l.crust!==O.crust[0])d.push(l.crust.toLowerCase()+" crust");
if(l.cheese!==O.cheese[0])d.push(/^no /i.test(l.cheese)?l.cheese.toLowerCase():l.cheese.toLowerCase()+" cheese");
if(l.sauce!==O.sauce[0])d.push(/^no /i.test(l.sauce)?l.sauce.toLowerCase():l.sauce.toLowerCase()+" sauce");return d.length?d.join(", "):"regular"}
$("#add").onclick=()=>{const l={id:$("#pie").value,crust:$("#o-crust").value,cheese:$("#o-cheese").value,sauce:$("#o-sauce").value,qty:qn};
const same=lines.find(x=>x.id==l.id&&x.crust==l.crust&&x.cheese==l.cheese&&x.sauce==l.sauce);if(same)same.qty+=l.qty;else lines.push(l);
qn=1;$("#qn").textContent=1;["crust","cheese","sauce"].forEach(k=>$("#o-"+k).selectedIndex=0);render();toast("Added to order")};
function render(){$("#lines").innerHTML=lines.length?lines.map((l,i)=>{const p=PIES.find(x=>x.id==l.id);return `<li><img src="img/${p.id}.jpg" alt=""><div class="n"><b>${l.qty} × ${p.n}</b><small>${desc(l)}</small></div><button class="rm" data-i="${i}" aria-label="Remove">Remove</button></li>`}).join(""):'<li class="empty">Nothing yet. Build a pie and tap Add to order.</li>';upd()}
$("#lines").onclick=e=>{const b=e.target.closest(".rm");if(b){lines.splice(+b.dataset.i,1);render()}};
const times=C.pickupTimes||["12:00 PM","3:00 PM","6:00 PM"];$("#time").innerHTML=times.map(t=>`<option>${t}</option>`).join("");
let day="Saturday";
document.querySelectorAll("#day button").forEach(b=>b.onclick=()=>{day=b.dataset.d;document.querySelectorAll("#day button").forEach(x=>x.classList.toggle("on",x===b));upd()});
["#nm","#ph","#time"].forEach(s=>$(s).addEventListener("input",upd));
function build(){const items=lines.map(l=>`${l.qty} ${PIES.find(p=>p.id==l.id).n} (${desc(l)})`);if(!items.length)return"";
const who=[$("#nm").value.trim(),$("#ph").value.trim()].filter(Boolean).join(", ");
return `Hi! I'd like to order from ${NAME} for ${day} at ${$("#time").value}: ${items.join(", ")}${who?" — "+who:""}`}
function upd(){const n=lines.reduce((a,l)=>a+l.qty,0);let t=n+(n==1?" pizza":" pizzas");
const tot=lines.reduce((a,l)=>a+(pr(l.id)||0)*l.qty,0);if(n&&lines.every(l=>pr(l.id)!=null)&&tot)t+=" · "+money(tot);
$("#count").textContent=t;const m=build();$("#msg").value=m||"Add some pizzas to your order and your message appears here.";
const ok=!!m,ph=(C.phone||"").replace(/[^\d+]/g,"");
$("#sms").hidden=!ph;$("#mail").hidden=!C.email;
$("#sms").href=ph?`sms:${ph}${/iPhone|iPad/.test(navigator.userAgent)?"&":"?"}body=${encodeURIComponent(m)}`:"#";
$("#mail").href=C.email?`mailto:${C.email}?subject=${encodeURIComponent("Pizza request for "+day+" · "+NAME)}&body=${encodeURIComponent(m)}`:"#";
["#sms","#mail","#copy"].forEach(s=>$(s).classList.toggle("off",!ok));
$("#hint").textContent=C.email?`Or copy the message and email it to ${C.email}.`:(!ph?`Copy the message and send it to ${NAME} however you usually reach us.`:"");}
$("#copy").onclick=async()=>{const m=build();if(!m)return;try{await navigator.clipboard.writeText(m)}catch(e){$("#msg").select();document.execCommand("copy")}
toast("Message copied!")};
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
const S=C.socials||{};$("#socials").innerHTML=Object.entries(S).filter(([k,v])=>v).map(([k,v])=>`<a href="${v}" target="_blank" rel="noopener">${k[0].toUpperCase()+k.slice(1)}</a>`).join(" · ");
render();
if(C.email){const e=$("#femail");e.textContent=C.email;e.href="mailto:"+C.email;e.hidden=false}
