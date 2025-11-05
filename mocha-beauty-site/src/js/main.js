// Mocha Beauty — interactive product rendering with filters + accessible modal
let PRODUCTS = [];
let activeFilters = {search:'',category:'',maxPrice:Infinity};

async function loadProducts(){
  try{
    const res = await fetch('data/products.json');
    PRODUCTS = await res.json();
    initFilters(PRODUCTS);
    applyFiltersAndRender();
    hookControls();
  }catch(e){
    console.error('Failed to load products', e);
    const grid = document.getElementById('product-grid');
    grid.textContent = 'Unable to load products.';
  }
}

function initFilters(products){
  const categories = Array.from(new Set(products.map(p=>p.category).filter(Boolean)));
  const sel = document.getElementById('category-filter');
  categories.forEach(c=>{
    const opt = document.createElement('option'); opt.value = c; opt.textContent = capitalize(c);
    sel.appendChild(opt);
  });
  const max = Math.ceil(Math.max(...products.map(p=>p.price), 50));
  const range = document.getElementById('max-price');
  range.max = Math.max(max, 50);
  range.value = range.max;
  document.getElementById('max-price-val').textContent = `$${range.value}`;
  activeFilters.maxPrice = Number(range.value);
}

function applyFiltersAndRender(){
  const filtered = PRODUCTS.filter(p=>{
    if(activeFilters.search && !(`${p.name} ${p.description}`.toLowerCase().includes(activeFilters.search.toLowerCase()))) return false;
    if(activeFilters.category && p.category !== activeFilters.category) return false;
    if(Number(p.price) > Number(activeFilters.maxPrice)) return false;
    return true;
  });
  renderProducts(filtered);
}

function renderProducts(products){
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  const template = document.getElementById('product-card-template');
  if(products.length === 0){
    grid.textContent = 'No products found.'; return;
  }
  products.forEach(p=>{
    const node = template.content.cloneNode(true);
    node.querySelector('.product-title').textContent = p.name;
    node.querySelector('.product-price').textContent = `$${p.price.toFixed(2)}`;
    const media = node.querySelector('.product-media');
    if(p.image){
      const img = document.createElement('img');
      img.src = p.image;
      img.alt = p.name;
      img.style.maxWidth = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      media.innerHTML = '';
      media.appendChild(img);
    }
    node.querySelector('.product-view').addEventListener('click', ()=>openProductModal(p));
    grid.appendChild(node);
  })
}

function hookControls(){
  const search = document.getElementById('search');
  const cat = document.getElementById('category-filter');
  const range = document.getElementById('max-price');
  const rangeOut = document.getElementById('max-price-val');
  const clear = document.getElementById('clear-filters');

  search.addEventListener('input', e=>{ activeFilters.search = e.target.value.trim(); applyFiltersAndRender(); });
  cat.addEventListener('change', e=>{ activeFilters.category = e.target.value; applyFiltersAndRender(); });
  range.addEventListener('input', e=>{ activeFilters.maxPrice = Number(e.target.value); rangeOut.textContent = `$${e.target.value}`; applyFiltersAndRender(); });
  clear.addEventListener('click', ()=>{
    search.value = ''; cat.value = ''; range.value = range.max; rangeOut.textContent = `$${range.value}`;
    activeFilters = {search:'',category:'',maxPrice:Number(range.value)}; applyFiltersAndRender();
  });
}

function openProductModal(p){
  const modal = document.getElementById('product-modal');
  const panel = modal.querySelector('.modal-panel');
  const content = modal.querySelector('.modal-content');
  content.innerHTML = `\n+    <h3>${escapeHtml(p.name)}</h3>\n+    <p class=\"muted\">${escapeHtml(p.category || '')} — <strong>$${p.price.toFixed(2)}</strong></p>\n+    <div class=\"modal-media\">${p.image?`<img src=\"${p.image}\" alt=\"${escapeAttr(p.name)}\">`:'<div style="height:180px;background:var(--neutral-300);border-radius:8px"></div>'}</div>\n+    <p style=\"margin-top:12px\">${escapeHtml(p.description)}</p>\n+    `;
  modal.setAttribute('aria-hidden','false');
  // show and trap focus
  lastFocused = document.activeElement;
  modal.querySelector('.modal-close').focus();
  document.body.style.overflow = 'hidden';

  function onKey(e){ if(e.key === 'Escape') closeModal(); }
  function onClickAway(e){ if(!panel.contains(e.target)) closeModal(); }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('click', onClickAway);
    document.body.style.overflow = '';
    if(lastFocused) lastFocused.focus();
  }

  modal.querySelector('.modal-close').onclick = closeModal;
  document.addEventListener('keydown', onKey);
  setTimeout(()=>document.addEventListener('click', onClickAway), 0);
}

function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escapeAttr(s){ return (s||'').replace(/"/g,'&quot;'); }

let lastFocused = null;

// init
loadProducts();
