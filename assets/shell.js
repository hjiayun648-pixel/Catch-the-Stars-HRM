/* 承星 HRM 原型壳层：侧栏/顶栏注入 + 交互助手 */
(function () {
  const ICONS = {
    work: '<svg viewBox="0 0 24 24" fill="none" stroke="#5A6B7C" stroke-width="2"><path d="M3 10h18M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/></svg>',
    job: '<svg viewBox="0 0 24 24" fill="none" stroke="#5A6B7C" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    cand: '<svg viewBox="0 0 24 24" fill="none" stroke="#5A6B7C" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
    art: '<svg viewBox="0 0 24 24" fill="none" stroke="#5A6B7C" stroke-width="2"><path d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    rev: '<svg viewBox="0 0 24 24" fill="none" stroke="#5A6B7C" stroke-width="2"><circle cx="9" cy="8" r="3.4"/><path d="M3 20c0-3.4 2.7-5 6-5s6 1.6 6 5"/><path d="M17 8h5M17 12h5M17 16h3"/></svg>',
    data: '<svg viewBox="0 0 24 24" fill="none" stroke="#5A6B7C" stroke-width="2"><path d="M4 20V10M10 20V4M16 20v-8M21 20H3"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  };
  const NAV = [
    ['招聘工作台', 'workbench.html', 'work', ['workbench']],
    ['GRP 招聘管理', null, null, null],
    ['岗位与需求', 'jobs.html', 'job', ['jobs', 'jobdetail', 'standard']],
    ['候选人管理', 'candidates.html', 'cand', ['candidates', 'canddetail']],
    ['作品与成果评估', 'outcomes.html', 'art', ['outcomes', 'aireport', 'evidence']],
    ['协同评审中心', 'review.html', 'rev', ['review', 'decision']],
    ['GRP 沉淀与分析', null, null, null],
    ['人才库与数据分析', 'analytics.html', 'data', ['analytics']],
  ];
  const PAGES = {
    workbench: ['招聘工作台', '首页', 'workbench.html'],
    jobs: ['岗位与需求', '岗位列表', 'jobs.html'],
    jobdetail: ['岗位与需求', '岗位详情', 'jobs.html'],
    standard: ['岗位与需求', '岗位能力标准共创', 'jobs.html'],
    candidates: ['候选人管理', '候选人列表', 'candidates.html'],
    canddetail: ['候选人管理', '候选人详情', 'candidates.html'],
    outcomes: ['作品与成果评估', '候选人能力档案', 'outcomes.html'],
    aireport: ['作品与成果评估', 'AI 成果解析报告', 'outcomes.html'],
    evidence: ['作品与成果评估', '项目详情与证据定位', 'outcomes.html'],
    review: ['协同评审中心', '专业评审工作台', 'review.html'],
    decision: ['协同评审中心', '招聘决策汇总', 'review.html'],
    analytics: ['人才库与数据分析', '招聘数据看板', 'analytics.html'],
  };
  const active = document.body.dataset.page || 'workbench';
  const crumb = PAGES[active] || ['', ''];

  const side = document.createElement('aside');
  side.className = 'side';
  side.innerHTML = `
    <a href="index.html" class="logo" title="返回产品介绍页"><div class="logo-mark"></div><div><b>承星 HRM</b><span>CHENGXING · RESULT-FIRST HIRING</span></div></a>
    <nav class="nav">${NAV.map(([t, href, ic, keys]) =>
      href ? `<a href="${href}" class="${keys.includes(active) ? 'on' : ''}">${ICONS[ic]}<span>${t}</span></a>`
      : `<div class="grp">${t}</div>`).join('')}</nav>
    <div class="foot">概念设计原型 · v2.0</div>`;

  const top = document.createElement('header');
  top.className = 'top';
  top.innerHTML = `
    <div class="co">承星科技有限公司<small>2026年11月26日 · 品牌设计中心</small></div>
    <div class="search">${ICONS.search}<input id="cxSearch" placeholder="搜索候选人 / 岗位 / 项目" style="border:0;outline:0;background:transparent;font:inherit;color:var(--deep);width:100%"></div>
    <div class="ic" title="消息" onclick="CX.toast('演示数据：暂无新消息')">🔔</div>
    <div class="ic" title="帮助" onclick="CX.toast('概念原型：交互均为模拟')">❔</div>
    <a class="btn btn-ghost btn-sm" href="index.html" title="返回产品介绍页">首页</a>
    <a class="btn btn-ghost btn-sm" href="login.html" title="退出登录">退出</a>
    <div class="avatar">韩</div>
    <div style="font-size:13px;color:var(--gray)">韩女士 · HR 负责人</div>`;
  const app = document.querySelector('.app');
  if (app) { app.prepend(side); const main = document.querySelector('.main'); main.prepend(top); }
  const sc = document.getElementById('cxSearch');
  if (sc) sc.addEventListener('keydown', e => { if (e.key === 'Enter' && sc.value.trim()) CX.toast('搜索「' + sc.value.trim() + '」（演示环境返回模拟结果）'); });

  // 面包屑注入（模块可点返回 + 显式返回按钮）
  document.querySelectorAll('[data-crumb]').forEach(el => {
    el.innerHTML = `<a href="${crumb[2]}" class="cbk" title="返回上一页">‹ 返回</a>${crumb[0]}<i>›</i><b>${crumb[1]}</b>`;
  });

  // ===== 交互助手 =====
  window.CX = {
    toast(msg) {
      let t = document.querySelector('.toast');
      if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
      t.textContent = msg; t.classList.add('show');
      clearTimeout(this._tt); this._tt = setTimeout(() => t.classList.remove('show'), 2200);
    },
    openDrawer(id) { document.getElementById(id)?.classList.add('show'); this.mask(true); },
    closeDrawer(id) { document.getElementById(id)?.classList.remove('show'); this.mask(false); },
    openModal(id) { document.getElementById(id)?.classList.add('show'); this.mask(true); },
    closeModal(id) { document.getElementById(id)?.classList.remove('show'); this.mask(false); },
    mask(on) { let m = document.querySelector('.mask'); if (!m) { m = document.createElement('div'); m.className = 'mask'; m.onclick = () => CX.closeAll(); document.body.appendChild(m); } m.classList.toggle('show', on); },
    closeAll() { document.querySelectorAll('.drawer.show,.modal.show').forEach(e => e.classList.remove('show')); this.mask(false); },
    chips(el) {
      const group = el.closest('[data-chipgroup]');
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
      el.classList.add('on');
      const f = group.dataset.filter;
      if (f) document.querySelectorAll(`[data-row-src]`).forEach(r => {
        r.style.display = (el.dataset.val === 'all' || r.dataset.rowSrc === el.dataset.val) ? '' : 'none';
      });
      this.toast(`筛选：${el.textContent.trim()}`);
    },
    pick(el) { // radio-card 选择
      const group = el.closest('[data-radiogroup]');
      group.querySelectorAll('.radio-card').forEach(c => c.classList.remove('on'));
      el.classList.add('on');
      const dyn = document.getElementById(group.dataset.dynamic);
      if (dyn) { dyn.querySelectorAll('.dyn').forEach(p => p.style.display = 'none'); const t = document.getElementById('dyn-' + el.dataset.val); if (t) t.style.display = ''; }
    },
    hl(pg) { // 证据定位高亮 + 琥珀脉冲
      document.querySelectorAll('.pdf .pg').forEach(p => p.classList.remove('hl'));
      const el = document.getElementById('pg' + pg);
      if (el) {
        el.classList.add('hl'); el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse');
        this.toast(`已定位到作品集第 ${pg} 页证据`);
      }
    },
    tab(el, name) {
      el.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
      el.classList.add('on');
      document.querySelectorAll('[data-tabpane]').forEach(p => p.style.display = p.dataset.tabpane === name ? '' : 'none');
    },
    rate(el, dim) {
      el.closest('.rate-g').querySelectorAll('.rbtn').forEach(b => b.classList.remove('on'));
      el.classList.add('on');
      this.toast(`${dim}：已选择「${el.textContent}」`);
    },
    cite(el, label) {
      const box = el.closest('.cap-card').querySelector('.cites');
      const s = document.createElement('span'); s.className = 'tag tag-amber'; s.textContent = label; box.appendChild(s);
      this.toast('已引用证据：' + label);
    },
    addQ(el, q) {
      const list = document.getElementById('outline');
      const li = document.createElement('li'); li.textContent = q; list.appendChild(li);
      el.textContent = '已加入'; el.disabled = true; el.style.opacity = .5;
      this.toast('已加入面试提纲');
    },
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') CX.closeAll(); });

  // ===== 全站轻动效（克制版）=====
  // 1) 页面转场进度条
  const prog = document.createElement('div'); prog.id = 'cxProg'; document.body.appendChild(prog);
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href$=".html"]');
    if (a) prog.classList.add('go');
  });
  // 2) 数字 count-up
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count); if (isNaN(target)) return;
    const t0 = performance.now(), dur = 700;
    (function tick(t){ const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); })(t0);
  });
  // 3) 滚动入场（仅介绍页使用 .reveal；兜底：1.2s 后强制显示）
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in')), 1200);
})();
