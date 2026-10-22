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
$("#menuGrid").innerHTML=PIES.map(p=>`<article class="card"><img src="img/${p.id}.jpg" alt="${p.n} pizza" loading="lazy"><div class="b"><h3>${p.n}<span class="price">${money(pr(p.id))}</span></h3><p>${p.d}</p></div></article>`).join("");
const q={};PIES.forEach(p=>q[p.id]=0);
$("#qtys").innerHTML=PIES.map(p=>`<div class="q"><img src="img/${p.id}.jpg" alt=""><div class="n">${p.n}<small>12"${pr(p.id)!=null?" · "+money(pr(p.id)):""}</small></div><div class="st"><button aria-label="Less ${p.n}" data-m="${p.id}">−</button><span id="q-${p.id}">0</span><button aria-label="More ${p.n}" data-p="${p.id}">+</button></div></div>`).join("");
const times=C.pickupTimes||["12:00 PM","3:00 PM","6:00 PM"];$("#time").innerHTML=times.map(t=>`<option>${t}</option>`).join("");
let day="Saturday";
document.querySelectorAll("#day button").forEach(b=>b.onclick=()=>{day=b.dataset.d;document.querySelectorAll("#day button").forEach(x=>x.classList.toggle("on",x===b));upd()});
$("#qtys").onclick=e=>{const b=e.target.closest("button");if(!b)return;const id=b.dataset.p||b.dataset.m;q[id]=Math.max(0,Math.min(50,q[id]+(b.dataset.p?1:-1)));$("#q-"+id).textContent=q[id];upd()};
["#nm","#ph","#time"].forEach(s=>$(s).addEventListener("input",upd));
function build(){const items=PIES.filter(p=>q[p.id]).map(p=>`${q[p.id]} ${p.n}`);if(!items.length)return"";
const who=[$("#nm").value.trim(),$("#ph").value.trim()].filter(Boolean).join(", ");
return `Hi! I'd like to order from ${NAME} for ${day} at ${$("#time").value}: ${items.join(", ")}${who?" — "+who:""}`}
function upd(){const n=Object.values(q).reduce((a,b)=>a+b,0);let t=n+(n==1?" pizza":" pizzas");
const tot=PIES.reduce((a,p)=>pr(p.id)==null?a:a+pr(p.id)*q[p.id],0);if(n&&PIES.every(p=>!q[p.id]||pr(p.id)!=null)&&tot)t+=" · "+money(tot);
$("#count").textContent=t;const m=build();$("#msg").value=m||"Add some pizzas above and your message appears here.";
const ok=!!m,ph=(C.phone||"").replace(/[^\d+]/g,"");
$("#sms").hidden=!ph;$("#mail").hidden=!C.email;
$("#sms").href=ph?`sms:${ph}${/iPhone|iPad/.test(navigator.userAgent)?"&":"?"}body=${encodeURIComponent(m)}`:"#";
$("#mail").href=C.email?`mailto:${C.email}?subject=${encodeURIComponent("Pizza order for "+day)}&body=${encodeURIComponent(m)}`:"#";
["#sms","#mail","#copy"].forEach(s=>$(s).classList.toggle("off",!ok));
$("#hint").textContent=(!ph&&!C.email)?`Copy the message and send it to ${NAME} however you usually reach us.`:"";}
$("#copy").onclick=async()=>{const m=build();if(!m)return;try{await navigator.clipboard.writeText(m)}catch(e){$("#msg").select();document.execCommand("copy")}
const t=$("#toast");t.textContent="Message copied!";t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)};
const S=C.socials||{};$("#socials").innerHTML=Object.entries(S).filter(([k,v])=>v).map(([k,v])=>`<a href="${v}" target="_blank" rel="noopener">${k[0].toUpperCase()+k.slice(1)}</a>`).join(" · ");
upd();
