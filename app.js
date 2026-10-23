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
$("#menuGrid").innerHTML=PIES.map(p=>`<li><div><div class="mrow"><h3>${p.n}</h3><span class="dots"></span><span class="${pr(p.id)!=null?"mprice":"msize"}">${pr(p.id)!=null?money(pr(p.id)):"12\""}</span></div><p>${p.d}</p></div></li>`).join("");
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
function render(){$("#lines").innerHTML=lines.length?lines.map((l,i)=>{const p=PIES.find(x=>x.id==l.id);return `<li><div class="n"><b>${l.qty} × ${p.n}</b><small>${desc(l)}</small></div><button class="rm" data-i="${i}" aria-label="Remove">Remove</button></li>`}).join(""):'<li class="empty">Nothing yet. Build a pie and tap Add to order.</li>';upd()}
$("#lines").onclick=e=>{const b=e.target.closest(".rm");if(b){lines.splice(+b.dataset.i,1);render()}};
const times=C.pickupTimes||["12:00 PM","3:00 PM","6:00 PM"];$("#time").innerHTML=times.map(t=>`<option>${t}</option>`).join("");
let day="Saturday";const mode=()=>document.querySelector('input[name=mode]:checked').value;
document.querySelectorAll("#day button").forEach(b=>b.onclick=()=>{day=b.dataset.d;document.querySelectorAll("#day button").forEach(x=>x.classList.toggle("on",x===b));upd()});
if(C.deliveryNote)$("#darea").textContent=C.deliveryNote;
document.querySelectorAll("input[name=mode]").forEach(r=>r.onchange=()=>{const d=mode()=="Delivery";$("#delivery").hidden=!d;
document.querySelectorAll("#mode .radio").forEach(l=>l.classList.toggle("on",l.querySelector("input").checked));upd()});
["#nm","#ph","#time","#street","#city","#zip","#notes"].forEach(s=>$(s).addEventListener("input",()=>{const er=$("#e-"+s.slice(1));if(er){er.textContent="";$(s).classList.remove("bad")}upd()}));
const addr=()=>[$("#street").value.trim(),$("#city").value.trim(),$("#zip").value.trim()].filter(Boolean).join(", ");
const itemsTxt=()=>lines.map(l=>`${l.qty} ${PIES.find(p=>p.id==l.id).n} (${desc(l)})`);
function build(){const items=itemsTxt();if(!items.length)return"";
const who=[$("#nm").value.trim(),$("#ph").value.trim()].filter(Boolean).join(", ");const dl=mode()=="Delivery";
const n=$("#notes").value.trim();
return `Hi! I'd like to order from ${NAME} for ${dl?"delivery":"pickup"} on ${day} at ${$("#time").value}: ${items.join(", ")}${dl&&addr()?". Deliver to: "+addr():""}${n?". Notes: "+n:""}${who?" — "+who:""}`}
function upd(){const n=lines.reduce((a,l)=>a+l.qty,0);let t=n+(n==1?" pizza":" pizzas");
const tot=lines.reduce((a,l)=>a+(pr(l.id)||0)*l.qty,0);if(n&&lines.every(l=>pr(l.id)!=null)&&tot)t+=" · "+money(tot);
$("#count").textContent=t;if(n)$("#e-lines").textContent="";const m=build();$("#msg").value=m;
const ph=(C.phone||"").replace(/[^\d+]/g,"");$("#sms").hidden=!ph;$("#mail").hidden=!C.email;
$("#sms").href=ph?`sms:${ph}${/iPhone|iPad/.test(navigator.userAgent)?"&":"?"}body=${encodeURIComponent(m)}`:"#";
$("#mail").href=C.email?`mailto:${C.email}?subject=${encodeURIComponent("Pizza order for "+day+" · "+NAME)}&body=${encodeURIComponent(m)}`:"#";
$("#hint").textContent=C.email?`Or email it to ${C.email}.`:"";}
function err(id,msg){$("#e-"+id).textContent=msg;if(msg&&$("#"+id))$("#"+id).classList.add("bad");return !msg}
function validate(){let ok=true,first=null;const chk=(id,msg,el)=>{if(!err(id,msg)){ok=false;first=first||el}};
chk("lines",lines.length?"":"Add at least one pizza to your order.",$("#pie"));
const nm=$("#nm").value.trim();chk("nm",nm.length<2?"Please enter your name.":"",$("#nm"));
const pd=$("#ph").value.replace(/\D/g,"");chk("ph",pd.length<10||pd.length>11?"Please enter a valid phone number.":"",$("#ph"));
if(mode()=="Delivery"){chk("street",$("#street").value.trim()?"":"Street address is required for delivery.",$("#street"));
chk("city",$("#city").value.trim()?"":"City is required.",$("#city"));chk("zip",/^\d{5}(-\d{4})?$/.test($("#zip").value.trim())?"":"Enter a 5-digit ZIP.",$("#zip"))}
if(first){first.focus();first.scrollIntoView({block:"center"})}return ok}
function payload(){const nm=$("#nm").value.trim(),dl=mode()=="Delivery";const p={
_subject:`New pizza order – ${nm}`,_template:"table",_captcha:"false",_honey:$("#honey").value,
Name:nm,Phone:$("#ph").value.trim(),"Pickup or delivery":mode(),"Preferred day":day,"Preferred time":$("#time").value,
Pizzas:itemsTxt().join("\n"),"Total pizzas":String(lines.reduce((a,l)=>a+l.qty,0))};
if(dl){p["Delivery address"]=addr()}p["Special instructions"]=$("#notes").value.trim()||"None";return p}
$("#orderForm").onsubmit=async e=>{e.preventDefault();$("#fail").hidden=true;if(!validate())return;
if($("#honey").value)return;const b=$("#place");b.disabled=true;b.classList.add("loading");b.textContent="Sending…";const p=payload();
try{const r=await fetch(C.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(p)});
const j=await r.json().catch(()=>({}));if(!r.ok||j.success===false||j.success==="false")throw new Error(j.message||r.status);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
$("#sumry").innerHTML=`<ul class="lines">${lines.map(l=>`<li><div class="n"><b>${l.qty} × ${PIES.find(x=>x.id==l.id).n}</b><small>${desc(l)}</small></div></li>`).join("")}</ul>
<dl class="dl"><dt>${p["Pickup or delivery"]}</dt><dd>${esc(day)}, ${esc(p["Preferred time"])}${p["Delivery address"]?"<br>"+esc(p["Delivery address"]):""}</dd><dt>Name</dt><dd>${esc(p.Name)}</dd><dt>Phone</dt><dd>${esc(p.Phone)}</dd>${p["Special instructions"]!="None"?`<dt>Notes</dt><dd>${esc(p["Special instructions"])}</dd>`:""}</dl>`;
$("#orderForm").hidden=true;$("#done").hidden=false;$("#done").scrollIntoView({block:"start"});scrollBy(0,-80)}
catch(x){upd();$("#fail").hidden=false;$("#fail").scrollIntoView({block:"center"})}
finally{b.disabled=false;b.classList.remove("loading");b.textContent="Place order"}};
$("#again").onclick=()=>{lines.length=0;$("#orderForm").reset();$("#delivery").hidden=true;document.querySelectorAll("#mode .radio").forEach(l=>l.classList.toggle("on",l.querySelector("input").checked));render();$("#done").hidden=true;$("#orderForm").hidden=false};
$("#copy").onclick=async()=>{const m=build();if(!m)return;try{await navigator.clipboard.writeText(m)}catch(e){$("#msg").select();document.execCommand("copy")}
toast("Message copied!")};
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
const S=C.socials||{};$("#socials").innerHTML=Object.entries(S).filter(([k,v])=>v).map(([k,v])=>`<a href="${v}" target="_blank" rel="noopener">${k[0].toUpperCase()+k.slice(1)}</a>`).join(" · ");
render();
if(C.email){const e=$("#femail");e.textContent=C.email;e.href="mailto:"+C.email;e.hidden=false}
const PH=(C.photos||[]).filter(p=>p&&p.src);if(PH.length){$("#photos").hidden=false;
$("#photoGrid").innerHTML=PH.map(p=>`<figure>${p.placeholder?'<div class="ph"></div>':`<img src="${p.src}" alt="${p.caption||"Pizza from "+NAME}" loading="lazy">`}${p.caption?`<figcaption>${p.caption}</figcaption>`:""}</figure>`).join("")}
let _n=0;document.querySelectorAll("section:not([hidden]) .num").forEach(e=>e.textContent=String(++_n).padStart(2,"0"));
