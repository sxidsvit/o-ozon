!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),function(){const e=document.querySelector(".goods");return fetch("db/db.json").then(e=>{if(e.ok)return e.json();throw new Error("Данные не были получены. Ошибка: "+e.status)}).catch(t=>{console.warn(t),e.innerHTML='<div class="mt-5 p-5 text-danger bg-light shadow lead text-center" >Что-то пошло не так<br> Возможно проблема с сервером ...</div>'})}().then(e=>{!function(e){const t=document.querySelector(".goods");e.goods.forEach(e=>{const n=document.createElement("div");n.className="col-12 col-md-6 col-lg-4 col-xl-3",n.innerHTML=`\n      <div class="card" data-category = "${e.category}">\n        ${e.sale?'<div class="card-sale">🔥Hot Sale💖</div>':""}\n\t\t\t\t<div class="card-img-wrapper">\n\t\t\t\t\t<span class="card-img-top"\n\t\t\t\t\t\tstyle="background-image: url('${e.img}')"></span>\n\t\t\t\t</div>\n\t\t\t\t<div class="card-body justify-content-between">\n\t\t\t\t\t<div class="card-price" style = "${e.sale?"color : red":""}">${e.price} ₽</div>\n        <h5 class= "card-title" > ${e.title}</h5 >\n        <button class="btn btn-primary">В корзину</button>\n\t\t\t</div >\n    `,t.appendChild(n)})}(e),document.querySelectorAll(".filter-check_checkbox").forEach(e=>{e.addEventListener("change",function(){this.checked?this.nextElementSibling.classList.add("checked"):this.nextElementSibling.classList.remove("checked")})}),function(){const e=document.getElementById("cart"),t=document.querySelector(".cart"),n=document.querySelector(".cart-close");e.addEventListener("click",()=>{t.style.display="flex",document.body.style.overflow="hidden"}),n.addEventListener("click",()=>{t.style.display="none",document.body.style.overflow=""})}(),function(){const e=document.querySelectorAll(".goods .card"),t=document.querySelector(".cart-wrapper"),n=document.getElementById("cart-empty"),r=document.querySelector(".counter");function o(){const e=t.querySelectorAll(".card"),o=t.querySelectorAll(".card-price"),c=document.querySelector(".cart-total span");r.textContent=e.length;let l=0;o.forEach(e=>{l+=parseFloat(e.textContent)}),c.textContent=l,0!==e.length?n.remove():t.appendChild(n)}e.forEach(e=>{e.querySelector("button").addEventListener("click",()=>{const n=e.cloneNode(!0);t.appendChild(n),o();const r=n.querySelector(".btn");r.textContent="Удалить",r.addEventListener("click",()=>{n.remove(),o()})})})}(),function(){const e=document.querySelectorAll(".goods .card"),t=document.getElementById("discount-checkbox");t.addEventListener("click",()=>{e.forEach(e=>{e.setAttribute("discont-filter","yes"),t.checked&&(e.querySelector(".card-sale")&&"no"!==e.getAttribute("price-filter")&&"no"!==e.getAttribute("category-filter")||(e.parentNode.style.display="none")),t.checked||(e.parentNode.style.display="flex",e.setAttribute("discont-filter","no"),"no"!==e.getAttribute("price-filter")&&"no"!==e.getAttribute("category-filter")||(e.parentNode.style.display="none"))})});const n=document.getElementById("min"),r=document.getElementById("max");function o(){e.forEach(e=>{e.parentNode.style.display="flex",e.setAttribute("price-filter","yes");const t=e.querySelector(".card-price"),o=parseFloat(t.textContent);n.value&&o<n.value||o>r.value&&r.value||"no"===e.getAttribute("discont-filter")||"no"==e.getAttribute("category-filter")?e.parentNode.style.display="none":e.parentNode.style.display="flex"})}n.addEventListener("change",o),r.addEventListener("change",o);const c=document.querySelector(".search-btn"),l=document.querySelector(".search-wrapper_input");c.addEventListener("click",()=>{const t=new RegExp(l.value.trim(),"i");e.forEach(e=>{const n=e.querySelector(".card-title");t.test(n.textContent)?e.parentNode.style.display="flex":e.parentNode.style.display="none"})})}(),function(){const e=document.querySelectorAll(".goods .card"),t=document.querySelector(".catalog-button"),n=document.querySelector(".catalog"),r=document.querySelector(".catalog-list"),o=new Set;e.forEach(e=>{o.add(e.dataset.category)}),o.forEach(e=>{const t=document.createElement("li");t.textContent=e,r.appendChild(t)}),t.addEventListener("click",t=>{n.style.display?n.style.display="":n.style.display="block","LI"===t.target.tagName&&e.forEach(e=>{e.dataset.category===t.target.textContent?(e.parentNode.style.display="flex",e.setAttribute("category-filter","yes")):(e.parentNode.style.display="none",e.setAttribute("category-filter","no"))})})}()})}]);