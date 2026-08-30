const fs = require('fs');
const path = 'c:/Users/asus/Desktop/Resume/index.html';
let c = fs.readFileSync(path, 'utf8');

console.log('File size before:', c.length);

// ============ 1. 替换先特工作经历 ============
const oldStart = c.indexOf('<span class="tl-company">天津先特网络科技有限公司</span>');
const nextCompany = c.indexOf('<span class="tl-company">房王网</span>');

console.log('先特位置:', oldStart, '房王位置:', nextCompany);
console.log('先特片段预览:', c.substring(oldStart-50, oldStart+100));

// 找到先特 tl-card 开始和结束
const cardStart = c.lastIndexOf('<div class="tl-item">', oldStart);
// 找下一个 tl-item
const nextTlItem = c.indexOf('<div class="tl-item">', nextCompany);

console.log('先特cardStart:', cardStart, '下一个tl-item:', nextTlItem);

const newXianteCard = `<div class="tl-item">
        <div class="tl-dot"></div>
        <div class="tl-card">
          <div class="tl-head">
            <div>
              <span class="tl-company">天津先特网络科技有限公司</span>
              <span class="tl-role">前端高级工程师</span>
            </div>
            <span class="tl-period">2019.04 — 至今（6年+）</span>
          </div>
          <div class="tl-sub">工作职责</div>
          <ul>
            <li>负责公司核心项目前端架构与研发，主导多个政务/国企项目交付</li>
            <li>主导内部万象表单平台、数据 BI 可视化平台的设计与研发</li>
            <li>封装通用组件库，输出可复用业务组件至多个项目</li>
            <li>负责内部 OA 系统迁移升级、营销管理系统改造</li>
            <li>指导实习生完成项目任务，参与代码审查与技术选型</li>
          </ul>
          <div class="tl-sub">代表项目</div>
          <ul>
            <li><strong>公积金运维管理平台</strong> — 天津市住房公积金管理中心，运维/设备台账/网络管理全模块</li>
            <li><strong>政府采购招投标系统</strong> — 天津市政府采购办 2026 版升级改造，配置与定制研发</li>
            <li><strong>政务网站改版升级</strong> — 天津市政务网站，热点推荐、栏目管理、技术预研与落地</li>
            <li><strong>万象表单平台</strong> — 多态定制化、表单自定义组控、批量更新、联动逻辑、移动端适配</li>
            <li><strong>数据 BI 平台</strong> — Dashboard、图表组件、拖拽生成大屏、PC/移动端双端</li>
            <li><strong>OA 迁移平台</strong> — 营销管理系统、报价导出、合同管理、差旅报销、个人日志</li>
          </ul>
          <div class="tags">
            <span class="tag">Vue</span><span class="tag">React</span><span class="tag">ECharts</span><span class="tag">BI</span><span class="tag">万象表单</span><span class="tag">政务项目</span><span class="tag">组件库</span>
          </div>
        </div>
      </div>

      <div class="tl-item">
`;

// 构建完整替换
const before = c.substring(0, cardStart);
const after = c.substring(nextTlItem);
let result = before + newXianteCard + after;

console.log('After work replace:', result.length);
console.log('Has 6年:', result.includes('6年'));

// ============ 2. 替换项目经历中先特相关项目 ============
// 找到旧的"数据 BI"项目，在它前面插入新项目
const oldBiProjStart = result.indexOf('<div class="proj-head"><span class="proj-name">数据 BI</span>');
console.log('BI proj 位置:', oldBiProjStart);

if (oldBiProjStart >= 0) {
  // 找到 proj-grid 开始标签后第一个 proj（就是第一个 proj 即旧数据 BI）
  const insertBefore = result.lastIndexOf('<div class="proj">', oldBiProjStart);
  console.log('插入点:', insertBefore);

  const newProjs = `
      <div class="proj">
        <div class="proj-head"><span class="proj-name">天津市住房公积金运维管理平台</span><span class="proj-role">前端高级工程师</span></div>
        <div class="proj-date">2026.03 — 2026.07</div>
        <div class="proj-desc">
          <strong>概述：</strong>天津市住房公积金管理中心内部运维平台，覆盖公积金设备运维、网络管理、配置参数、设备台账等核心模块。
          <div class="proj-block"><strong>职责：</strong>负责前端架构设计、核心模块开发、接口对接、功能优化。</div>
          <div class="proj-block"><strong>技术栈：</strong>【待补充】</div>
          <div class="proj-block"><strong>业绩：</strong>完整交付运维平台，稳定运行至今。</div>
        </div>
        <div class="tags">
          <span class="tag">【待补充】</span><span class="tag">政务</span><span class="tag">运维平台</span>
        </div>
      </div>

      <div class="proj">
        <div class="proj-head"><span class="proj-name">天津政府采购招投标系统升级改造</span><span class="proj-role">前端高级工程师</span></div>
        <div class="proj-date">2026.02 — 2026.05</div>
        <div class="proj-desc">
          <strong>概述：</strong>天津市政府采购办 2026 版招投标系统升级改造项目，涉及采购项目配置与定制研发。
          <div class="proj-block"><strong>职责：</strong>采购项目配置模块开发、定制化功能研发。</div>
          <div class="proj-block"><strong>技术栈：</strong>【待补充】</div>
          <div class="proj-block"><strong>业绩：</strong>按期完成 2026 版系统升级上线。</div>
        </div>
        <div class="tags">
          <span class="tag">【待补充】</span><span class="tag">政府采购</span><span class="tag">招投标</span>
        </div>
      </div>

      <div class="proj">
        <div class="proj-head"><span class="proj-name">天津市政务网站改版升级</span><span class="proj-role">前端高级工程师</span></div>
        <div class="proj-date">2026.04 — 2026.07</div>
        <div class="proj-desc">
          <strong>概述：</strong>天津市政务网站改版，热点推荐项目、栏目管理、技术预研与落地。
          <div class="proj-block"><strong>职责：</strong>热点推荐模块、栏目管理、技术选型与实现。</div>
          <div class="proj-block"><strong>技术栈：</strong>【待补充】</div>
          <div class="proj-block"><strong>业绩：</strong>完成政务网站改版上线。</div>
        </div>
        <div class="tags">
          <span class="tag">【待补充】</span><span class="tag">政务网站</span>
        </div>
      </div>

      <div class="proj">
        <div class="proj-head"><span class="proj-name">2026万象表单平台</span><span class="proj-role">前端高级工程师</span></div>
        <div class="proj-date">2026.01 — 2026.04</div>
        <div class="proj-desc">
          <strong>概述：</strong>公司内部核心低代码表单平台 2026 版升级，支持多态定制化、表单自定义组控、批量更新配置、联动下拉选择、移动端万象表单等。
          <div class="proj-block"><strong>职责：</strong>多态定制化改造、表单自定义组控组件、批量更新配置、联动下拉、移动端万象表单。</div>
          <div class="proj-block"><strong>技术栈：</strong>【待补充】</div>
          <div class="proj-block"><strong>业绩：</strong>万象表单平台持续迭代，支撑多个业务项目快速搭建。</div>
        </div>
        <div class="tags">
          <span class="tag">【待补充】</span><span class="tag">低代码</span><span class="tag">万象表单</span><span class="tag">拖拽</span>
        </div>
      </div>

      <div class="proj">
        <div class="proj-head"><span class="proj-name">2026年先特OA迁移平台</span><span class="proj-role">前端高级工程师</span></div>
        <div class="proj-date">2026.01 — 2026.03</div>
        <div class="proj-desc">
          <strong>概述：</strong>公司内部 OA 系统迁移升级项目，包含营销管理系统改造、报价单导出、合同管理、差旅报销单、个人日志等模块。
          <div class="proj-block"><strong>职责：</strong>营销管理系统改造、报价单导出、合同管理、差旅报销单、个人日志模块开发。</div>
          <div class="proj-block"><strong>技术栈：</strong>【待补充】</div>
          <div class="proj-block"><strong>业绩：</strong>完成 OA 系统迁移，内部员工顺利切换。</div>
        </div>
        <div class="tags">
          <span class="tag">【待补充】</span><span class="tag">OA</span><span class="tag">内部系统</span>
        </div>
      </div>

      <div class="proj">
        <div class="proj-head"><span class="proj-name">2026数据BI平台</span><span class="proj-role">前端高级工程师</span></div>
        <div class="proj-date">2026.01 — 2026.02</div>
        <div class="proj-desc">
          <strong>概述：</strong>公司数据 BI 平台，提供 PC 端 Dashboard、图表组件等能力。
          <div class="proj-block"><strong>职责：</strong>【待补充】</div>
          <div class="proj-block"><strong>技术栈：</strong>【待补充】</div>
          <div class="proj-block"><strong>业绩：</strong>BI 平台上线，支撑内部数据分析。</div>
        </div>
        <div class="tags">
          <span class="tag">【待补充】</span><span class="tag">BI</span><span class="tag">Dashboard</span>
        </div>
      </div>

      <div class="proj">
        <div class="proj-head"><span class="proj-name">天津市政府投资项目管理系统</span><span class="proj-role">Web 前端工程师</span></div>
        <div class="proj-date">2019.04 — 2020.05</div>
        <div class="proj-desc">
          <strong>概述：</strong>天津市政府投资项目管理系统，政府项目立项、审批、跟踪全流程管理。
          <div class="proj-block"><strong>职责：</strong>【待补充】</div>
          <div class="proj-block"><strong>技术栈：</strong>【待补充】</div>
          <div class="proj-block"><strong>业绩：</strong>【待补充】</div>
        </div>
        <div class="tags">
          <span class="tag">【待补充】</span><span class="tag">政务</span><span class="tag">项目管理</span>
        </div>
      </div>

`;

  result = result.substring(0, insertBefore) + newProjs + result.substring(insertBefore);
}

fs.writeFileSync(path, result, 'utf8');
console.log('FINAL size:', result.length);
console.log('Has 公积金:', result.includes('公积金'));
console.log('Has 政府采购:', result.includes('政府采购'));
console.log('Has 待补充标记:', result.includes('待补充'));
