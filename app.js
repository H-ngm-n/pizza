const C=window.PIZZA_CONFIG||{};const NAME=C.name||"Roman's Pizza";
const PIES=[
{id:"pepperoni",n:"Pepperoni",d:"Crispy, cupped pepperoni that curls into little grease-kissed bowls over melty mozzarella and bright tomato sauce."},
{id:"pep-hot-honey",n:"Pepperoni Hot Honey",d:"Our pepperoni pie finished with a glossy drizzle of chili-spiked hot honey. Sweet, spicy, salty, gone fast."},
{id:"pep-hot-honey-ricotta",n:"Pepperoni Hot Honey Ricotta",d:"Pepperoni and hot honey plus cool, creamy dollops of whipped ricotta. The one everybody fights over."},
{id:"margherita",n:"Margherita",d:"Fresh mozzarella, simple tomato sauce, fresh basil and a swirl of olive oil on a blistered crust."},
{id:"cheese",n:"Cheese",d:"Golden, bubbly, browned-edge mozzarella over our house sauce. Classic for a reason, and great for kids."},
{id:"byo",n:"Build your own",d:"Start with cheese and sauce, then add pepperoni, banana peppers and onion however you like."}];
const $=s=>document.querySelector(s);const money=p=>p==null?"":"$"+(Math.round(p*100)/100).toFixed(2);
document.title=NAME+' | 12" Weekend Pizzas in Plymouth, MI';
document.querySelectorAll("[data-name]").forEach(e=>e.textContent=NAME);
if(C.tagline)document.querySelectorAll("[data-tagline]").forEach(e=>e.textContent=C.tagline);
if(C.area)document.querySelectorAll("[data-area]").forEach(e=>e.textContent=C.area);
if(C.orderDeadline)document.querySelectorAll("[data-deadline]").forEach(e=>e.textContent=C.orderDeadline);
$("#yr").textContent=new Date().getFullYear();
const P=Object.assign({base:14.99,pepperoniBase:15.99,perTopping:1.00},C.pricing||{});const RCP=C.pies||{};const BYO=C.byoToppings||["Pepperoni","Banana peppers","Onion"];
const r2=x=>Math.round(x*100)/100;
const isPep=(id,tops)=>id=="byo"?(tops||[]).includes("Pepperoni"):!!(RCP[id]&&RCP[id].pepperoni);
function unitPrice(id,tops){if(id=="byo"){const t=tops||[];return r2((t.includes("Pepperoni")?P.pepperoniBase:P.base)+P.perTopping*t.filter(x=>x!="Pepperoni").length)}
const r=RCP[id]||{};return r2((r.pepperoni?P.pepperoniBase:P.base)+P.perTopping*(r.toppings||[]).length)}
const pr=id=>id=="byo"?unitPrice("byo",[]):unitPrice(id);
$("#menuGrid").innerHTML=PIES.map(p=>`<li><div class="mitem" role="button" tabindex="0" data-pie="${p.id}" aria-label="${p.id=="byo"?"Build your own pizza":"See "+p.n}"><div class="mrow"><h3>${p.n}</h3><span class="dots"></span><span class="mprice">${p.id=="byo"?"from "+money(pr(p.id)):money(pr(p.id))}</span></div><p>${p.d}</p></div></li>`).join("");
const O=Object.assign({crust:["Regular"],bake:["Regular","Well done"],cheese:["Regular","Extra","Light","No cheese"],sauce:["Regular","Extra","Light","No sauce"],pepperoni:["Regular","Extra","Light"]},C.options||{});
const lines=[];let qn=1;const cnt=()=>lines.reduce((a,l)=>a+l.qty,0);
function capOk(add){if(cnt()+add<=MAX)return true;const left=MAX-cnt();$("#e-lines").textContent=`Sorry, max ${MAX} pizzas per order (one oven!).`+(left>0?` You can add ${left} more.`:"");toast(`Max ${MAX} pizzas per order`);return false}
const opt=a=>a.map(x=>`<option>${x}</option>`).join("");
$("#pie").innerHTML=PIES.map(p=>`<option value="${p.id}">${p.n}</option>`).join("");
["crust","bake","cheese","sauce","pepperoni"].forEach(k=>$("#o-"+k).innerHTML=opt(O[k]));
$("#tops").innerHTML=BYO.map(t=>`<label class="chk"><input type="checkbox" value="${t}">${t}</label>`).join("");
const selTops=()=>[...document.querySelectorAll("#tops input:checked")].map(x=>x.value);
function syncB(){const id=$("#pie").value,b=id=="byo";$("#byo").hidden=!b;$("#pepwrap").hidden=!isPep(id,selTops());
document.querySelectorAll("#tops .chk").forEach(l=>l.classList.toggle("on",l.querySelector("input").checked));$("#unit").textContent=money(unitPrice(id,selTops()));$("#wd").hidden=!(C.wellDonePhoto&&$("#o-bake").value!==O.bake[0])}
$("#wd img").src=C.wellDonePhoto||"";$("#o-bake").onchange=syncB;
$("#pie").onchange=syncB;$("#tops").onchange=syncB;
$("#qm").onclick=()=>{qn=Math.max(1,qn-1);$("#qn").textContent=qn};$("#qp").onclick=()=>{qn=Math.min(MAX,qn+1);$("#qn").textContent=qn};
function desc(l){const d=[];if(l.id=="byo")return (l.tops.length?l.tops.map(t=>t.toLowerCase()).join(", "):"no toppings")+"; "+opts(l);return opts(l)}
function opts(l){const d=[];if(l.pep&&l.pep!==O.pepperoni[0])d.push(l.pep.toLowerCase()+" pepperoni");if(l.crust!==O.crust[0])d.push(l.crust.toLowerCase()+" crust");if(l.bake&&l.bake!==O.bake[0])d.push(l.bake.toLowerCase());
if(l.cheese!==O.cheese[0])d.push(/^no /i.test(l.cheese)?l.cheese.toLowerCase():l.cheese.toLowerCase()+" cheese");
if(l.sauce!==O.sauce[0])d.push(/^no /i.test(l.sauce)?l.sauce.toLowerCase():l.sauce.toLowerCase()+" sauce");return d.length?d.join(", "):"regular"}
$("#add").onclick=()=>{if(!capOk(qn))return;const id=$("#pie").value,tops=id=="byo"?selTops():[];const l={id,tops,pep:isPep(id,tops)?$("#o-pepperoni").value:"",crust:$("#o-crust").value,bake:$("#o-bake").value,cheese:$("#o-cheese").value,sauce:$("#o-sauce").value,qty:qn,price:unitPrice(id,tops)};
const same=lines.find(x=>x.id==l.id&&x.crust==l.crust&&x.bake==l.bake&&x.cheese==l.cheese&&x.sauce==l.sauce&&x.pep==l.pep&&x.tops.join()==l.tops.join());if(same)same.qty+=l.qty;else lines.push(l);
qn=1;$("#qn").textContent=1;["crust","bake","cheese","sauce","pepperoni"].forEach(k=>$("#o-"+k).selectedIndex=0);document.querySelectorAll("#tops input").forEach(x=>x.checked=false);syncB();render();toast("Added to order")};
function render(){$("#lines").innerHTML=lines.length?lines.map((l,i)=>{const p=PIES.find(x=>x.id==l.id);return `<li><div class="n"><b>${l.qty} × ${p.n}</b><small>${desc(l)}</small></div><span class="lt">${money(l.price*l.qty)}</span><button class="rm" data-i="${i}" aria-label="Remove">Remove</button></li>`}).join(""):'<li class="empty">Nothing yet. Build a pie and tap Add to order.</li>';upd()}
$("#lines").onclick=e=>{const b=e.target.closest(".rm");if(b){lines.splice(+b.dataset.i,1);render()}};
const times=C.pickupTimes||["12:00 PM","3:00 PM","6:00 PM"];$("#time").innerHTML=times.map(t=>`<option>${t}</option>`).join("");
const MAX=+C.maxPerDay||10;const ADDR=C.pickupAddress||"";
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const DAYS=(()=>{const t=new Date();t.setHours(0,0,0,0);const o=[];for(let i=0;i<8&&o.length<2;i++){const d=new Date(t);d.setDate(t.getDate()+i);if(d.getDay()==6||d.getDay()==0)o.push(d)}
return o.map(d=>({iso:iso(d),label:d.toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"}),short:d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}))})();
let dsel=DAYS[0];let day=dsel.label;
$("#day").innerHTML=DAYS.map((d,i)=>`<button type="button" data-iso="${d.iso}"${i?"":' class="on"'}>${d.short}</button>`).join("");
document.querySelectorAll("#day button").forEach(b=>b.onclick=()=>{dsel=DAYS.find(d=>d.iso==b.dataset.iso);day=dsel.label;document.querySelectorAll("#day button").forEach(x=>x.classList.toggle("on",x===b));upd()});
if(ADDR){$("#paddr").textContent="Pickup at "+ADDR}else $("#paddr").hidden=true;
if(C.pickupNote)$("#pnote").textContent=C.pickupNote;
["#nm","#ph","#time","#notes"].forEach(s=>$(s).addEventListener("input",()=>{const er=$("#e-"+s.slice(1));if(er){er.textContent="";$(s).classList.remove("bad")}upd()}));
const total=()=>r2(lines.reduce((a,l)=>a+l.price*l.qty,0));
const itemsTxt=()=>lines.map(l=>`${l.qty} ${PIES.find(p=>p.id==l.id).n} (${desc(l)}) @ ${money(l.price)} = ${money(l.price*l.qty)}`);
function build(){const items=itemsTxt();if(!items.length)return"";
const who=[$("#nm").value.trim(),$("#ph").value.trim()].filter(Boolean).join(", ");
const n=$("#notes").value.trim();
return `Hi! I'd like to order from ${NAME} for pickup on ${day} at ${$("#time").value}: ${items.join(", ")}. Total ${money(total())}${n?". Notes: "+n:""}${who?" — "+who:""}`}
function upd(){const n=lines.reduce((a,l)=>a+l.qty,0);let t=n+(n==1?" pizza":" pizzas");
$("#totalRow").hidden=!n;$("#total").textContent=money(total());
$("#count").textContent=t;if(n&&n<=MAX&&!/Max|max/.test($("#e-lines").textContent))$("#e-lines").textContent="";if(n<MAX&&/max/.test($("#e-lines").textContent))$("#e-lines").textContent="";const m=build();$("#msg").value=m;
const ph=(C.phone||"").replace(/[^\d+]/g,"");$("#sms").hidden=!ph;$("#mail").hidden=!C.email;
$("#sms").href=ph?`sms:${ph}${/iPhone|iPad/.test(navigator.userAgent)?"&":"?"}body=${encodeURIComponent(m)}`:"#";
$("#mail").href=C.email?`mailto:${C.email}?subject=${encodeURIComponent("Pizza order for "+day+" · "+NAME)}&body=${encodeURIComponent(m)}`:"#";
$("#hint").textContent=C.email?`Or email it to ${C.email}.`:"";}
function err(id,msg){$("#e-"+id).textContent=msg;if(msg&&$("#"+id))$("#"+id).classList.add("bad");return !msg}
function validate(){let ok=true,first=null;const chk=(id,msg,el)=>{if(!err(id,msg)){ok=false;first=first||el}};
chk("lines",!lines.length?"Add at least one pizza to your order.":cnt()>MAX?`Max ${MAX} pizzas per order. Please remove ${cnt()-MAX}.`:"",$("#pie"));
const nm=$("#nm").value.trim();chk("nm",nm.length<2?"Please enter your name.":"",$("#nm"));
const pd=$("#ph").value.replace(/\D/g,"");chk("ph",pd.length<10||pd.length>11?"Please enter a valid phone number.":"",$("#ph"));
if(first){first.focus();first.scrollIntoView({block:"center"})}return ok}
function payload(){const nm=$("#nm").value.trim();const p={
_subject:`New pizza order – ${nm}`,_template:"table",_captcha:"false",_honey:$("#honey").value,
Name:nm,Phone:$("#ph").value.trim(),"Order type":"Pickup only","Preferred day":day,"Pickup date":dsel.iso,"Pickup address":ADDR||"TBD","Preferred time":$("#time").value,
Pizzas:itemsTxt().join("\n"),"Total pizzas":String(lines.reduce((a,l)=>a+l.qty,0)),"Order total":money(total())};
p["Special instructions"]=$("#notes").value.trim()||"None";return p}
$("#orderForm").onsubmit=async e=>{e.preventDefault();$("#fail").hidden=true;if(!validate())return;
if($("#honey").value)return;const b=$("#place");b.disabled=true;b.classList.add("loading");b.textContent="Sending…";const p=payload();
try{const r=await fetch(C.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(p)});
const j=await r.json().catch(()=>({}));if(!r.ok||j.success===false||j.success==="false")throw new Error(j.message||r.status);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
$("#sumry").innerHTML=`<ul class="lines">${lines.map(l=>`<li><div class="n"><b>${l.qty} × ${PIES.find(x=>x.id==l.id).n}</b><small>${desc(l)}</small></div><span class="lt">${money(l.price*l.qty)}</span></li>`).join("")}</ul><p class="total">Order total <b>${money(total())}</b></p>
<dl class="dl"><dt>Pickup</dt><dd>${esc(day)}, ${esc(p["Preferred time"])}</dd>${ADDR?`<dt>Address</dt><dd>${esc(ADDR)}</dd>`:""}<dt>Name</dt><dd>${esc(p.Name)}</dd><dt>Phone</dt><dd>${esc(p.Phone)}</dd>${p["Special instructions"]!="None"?`<dt>Notes</dt><dd>${esc(p["Special instructions"])}</dd>`:""}</dl>`;
$("#orderForm").hidden=true;$("#done").hidden=false;$("#done").scrollIntoView({block:"start"});scrollBy(0,-80)}
catch(x){upd();$("#fail").hidden=false;$("#fail").scrollIntoView({block:"center"})}
finally{b.disabled=false;b.classList.remove("loading");b.textContent="Place order"}};
$("#again").onclick=()=>{lines.length=0;$("#orderForm").reset();syncB();render();$("#done").hidden=true;$("#orderForm").hidden=false};
$("#copy").onclick=async()=>{const m=build();if(!m)return;try{await navigator.clipboard.writeText(m)}catch(e){$("#msg").select();document.execCommand("copy")}
toast("Message copied!")};
function goOrder(){$("#order").scrollIntoView({behavior:"smooth",block:"start"})}
function quick(id,o){o=o||{};if(id=="byo"){$("#pie").value="byo";document.querySelectorAll("#tops input").forEach(x=>x.checked=(o.tops||[]).includes(x.value));syncB();if(o.noScroll)toast("Build your own set up in the order form");else goOrder();return}
if(!capOk(1))return;const crust=o.crust&&O.crust.includes(o.crust)?o.crust:O.crust[0];const l={id,tops:[],pep:isPep(id,[])?O.pepperoni[0]:"",crust,bake:O.bake[0],cheese:O.cheese[0],sauce:O.sauce[0],qty:1,price:unitPrice(id,[])};
const same=lines.find(x=>x.id==l.id&&x.crust==l.crust&&x.bake==l.bake&&x.cheese==l.cheese&&x.sauce==l.sauce&&x.pep==l.pep&&x.tops.join()==l.tops.join());if(same)same.qty++;else lines.push(l);render();if(!o.noScroll)goOrder();toast("Added to order")}
function clicky(el,fn){el.addEventListener("click",e=>{const t=e.target.closest("[data-pie]");if(t)fn(t)});el.addEventListener("keydown",e=>{const t=e.target.closest("[data-pie]");if(t&&(e.key=="Enter"||e.key==" ")){e.preventDefault();fn(t)}})}
function showPhoto(id){const f=document.querySelector(`#photoGrid figure[data-pie="${id}"]`);if(!f||id=="byo")return quick(id);
document.querySelectorAll("#photoGrid .hl").forEach(x=>x.classList.remove("hl"));f.scrollIntoView({behavior:"smooth",block:"center"});f.classList.add("hl");f.focus({preventScroll:true});setTimeout(()=>f.classList.remove("hl"),2200)}
clicky($("#menuGrid"),t=>showPhoto(t.dataset.pie));
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
const S=C.socials||{};$("#socials").innerHTML=Object.entries(S).filter(([k,v])=>v).map(([k,v])=>`<a href="${v}" target="_blank" rel="noopener">${k[0].toUpperCase()+k.slice(1)}</a>`).join(" · ");
syncB();render();
if(C.email){const e=$("#femail");e.textContent=C.email;e.href="mailto:"+C.email;e.hidden=false}
const PH=(C.photos||[]).filter(p=>p&&p.src);if(PH.length){$("#photos").hidden=false;
$("#photoGrid").innerHTML=PH.map((p,i)=>{const ok=p.pie&&PIES.some(x=>x.id==p.pie);return `<figure${ok?` class="pclick" role="button" tabindex="0" data-pie="${p.pie}" data-i="${i}" aria-label="${p.pie=="byo"?"Build your own: "+p.caption:"Add 1 "+(p.caption||"")+" to order"}"`:""}>${p.placeholder?'<div class="ph"></div>':`<img src="${p.src}" alt="${p.caption||"Pizza from "+NAME}" loading="lazy">`}${p.caption?`<figcaption>${p.caption}</figcaption>`:""}</figure>`}).join("");
clicky($("#photoGrid"),t=>{const p=PH[+t.dataset.i];quick(p.pie,Object.assign({noScroll:1},p))})}
let _n=0;document.querySelectorAll("section:not([hidden]) .num").forEach(e=>e.textContent=String(++_n).padStart(2,"0"));
