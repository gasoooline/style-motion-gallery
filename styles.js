const styleDirections = [
  {
    id: "S01",
    name: "冷静极简",
    category: "极简",
    className: "style-minimal",
    summary: "黑白中性、清晰层级、克制细节。适合效率工具、开发者产品与专业服务。",
    tags: "黑白 中性 效率 工具 克制 专业",
    dials: [5, 3, 3],
    preview: ["NORTHLINE", "少一点干扰", "让重要内容先被看见。", "查看方案"],
    palette: "off-white #F8F8F4、charcoal #171715、cool gray #BDBDB4，最多一个低饱和蓝色强调",
    type: "Geist 或 Helvetica Neue，标题中等字重，正文紧凑清晰，不使用装饰性衬线",
    layout: "左对齐、强留白、细分隔线、非对称但稳定的两栏结构",
    material: "几乎无阴影，4-8px 圆角，只在真实层级需要时使用卡片",
    avoid: "不要紫色渐变、玻璃拟态、三张等宽功能卡、夸张大标题"
  },
  {
    id: "S02",
    name: "莫兰迪留白",
    category: "极简",
    className: "style-morandi",
    summary: "低饱和灰粉与鼠尾草绿，安静但不甜腻。适合生活方式、内容与轻消费产品。",
    tags: "莫兰迪 灰粉 鼠尾草 低饱和 安静 温柔",
    dials: [6, 3, 2],
    preview: ["STILL", "安静地表达", "用低饱和色和充足留白建立秩序。", "浏览内容"],
    palette: "dusty rose #D8CBC6、sage #93A39A、muted brown #6E5E57、soft white #F3EBE7",
    type: "现代人文无衬线，标题字重 500 左右，正文保持舒展行距",
    layout: "大留白、偏左内容、单个柔和色块或裁切摄影，避免满屏粉色",
    material: "哑光平面材质、柔和边界、8px 圆角、极轻阴影",
    avoid: "不要少女感图标、奶油色堆叠、金色点缀、过多圆角胶囊"
  },
  {
    id: "S03",
    name: "瑞士网格",
    category: "编辑",
    className: "style-swiss",
    summary: "严格网格、强字号对比、红色单点强调。适合作品集、文化机构与发布页。",
    tags: "瑞士 国际主义 网格 排版 海报 编辑",
    dials: [7, 3, 4],
    preview: ["STUDIO 24", "清晰就是风格", "Grid, type and a single signal color.", "查看目录"],
    palette: "paper #F0EEE7、ink #161614、signal red #D63F2F",
    type: "Grotesk 无衬线，超粗标题配常规正文，数字和元信息可用等宽体",
    layout: "12 栏网格、明显基线、错位对齐、可见分隔线与大字号比例",
    material: "纯平面，无投影，锐利边界，0-4px 圆角",
    avoid: "不要居中 hero、柔和渐变、装饰插画、平均分布的卡片"
  },
  {
    id: "S04",
    name: "冷感奢华",
    category: "品牌",
    className: "style-cold",
    summary: "银灰、烟雾与高精度细节。适合高端硬件、可穿戴设备和汽车产品。",
    tags: "冷感 奢华 银灰 金属 高端 硬件",
    dials: [7, 5, 3],
    preview: ["ARC", "精密，不喧哗", "材料、光线与比例构成产品气质。", "探索产品"],
    palette: "silver #EDF0F2、chrome #AEB5BB、graphite #272B2E、white highlight",
    type: "细到中等字重的现代无衬线，宽松字距只用于短标签",
    layout: "大面积产品视觉、窄文本列、错位留白、局部极近景",
    material: "金属渐变、半透明高光、细内边框，阴影染成冷灰",
    avoid: "不要金色、米色、过度玻璃化、频繁发光和浮动装饰"
  },
  {
    id: "S05",
    name: "森林品牌",
    category: "品牌",
    className: "style-forest",
    summary: "深森林绿、骨白与琥珀色。适合户外、可持续品牌和自然材料产品。",
    tags: "森林 自然 户外 可持续 绿色 琥珀",
    dials: [7, 5, 3],
    preview: ["RIDGE", "走进材料本身", "自然色不是装饰，而是品牌证据。", "了解材料"],
    palette: "deep forest #20382D、bone #EDF0DF、amber #C9913F",
    type: "结实的人文无衬线，标题不使用默认复古衬线",
    layout: "大幅自然摄影配不对称文本，色块作为节奏而非背景填充",
    material: "轻微纸张颗粒、低反差阴影、8px 圆角",
    avoid: "不要泛黄米色加黄铜的手作模板，不要叶子图标堆叠"
  },
  {
    id: "S06",
    name: "工业粗野",
    category: "实验",
    className: "style-brutal",
    summary: "硬边框、警示色、等宽文字与直接反馈。适合创意工具、活动和反主流品牌。",
    tags: "粗野 工业 高对比 警示色 机械 brutalist",
    dials: [9, 6, 5],
    preview: ["NO POLISH", "直接构造界面", "Raw structure. Clear action. Zero gloss.", "打开工具"],
    palette: "acid yellow #E7FF43、ink #171715、warning red #F34E35",
    type: "超粗无衬线配等宽正文，允许全大写但控制使用范围",
    layout: "显式边框、块状分区、不等宽网格、内容贴近结构边界",
    material: "0px 圆角、硬投影、2-6px 黑色边框",
    avoid: "不要柔和阴影、玻璃、渐变文字、圆润卡片和精致装饰"
  },
  {
    id: "S07",
    name: "孟菲斯玩心",
    category: "玩心",
    className: "style-memphis",
    summary: "几何撞色和有控制的趣味。适合儿童、教育、活动和轻社交产品。",
    tags: "孟菲斯 几何 撞色 玩心 教育 活动",
    dials: [9, 7, 4],
    preview: ["KITE CLUB", "把好奇心放大", "大胆形状帮助内容建立记忆点。", "开始探索"],
    palette: "sun yellow #F2CC45、coral #EF5947、blue #4F74D9、navy #18324F",
    type: "圆润但不幼稚的粗体无衬线，正文保持正常字重",
    layout: "不对称几何、局部越界、清晰内容层级，移动端回归单栏",
    material: "平面撞色，少量硬阴影，4-8px 圆角",
    avoid: "不要每个区域都有随机图形，不要牺牲文字对比度"
  },
  {
    id: "S08",
    name: "暗黑科技",
    category: "科技",
    className: "style-darktech",
    summary: "近黑底、网格与单一绿色信号。适合开发工具、安全、基础设施和 AI 技术页。",
    tags: "暗黑 科技 黑客 终端 开发者 AI 安全",
    dials: [7, 6, 5],
    preview: ["SIGNAL", "系统保持可见", "Infrastructure should explain itself.", "查看架构"],
    palette: "near black #111815、mint signal #57CF8A、pale text #D4F3E1",
    type: "等宽标题配清晰无衬线正文，数字全部统一等宽",
    layout: "左对齐、技术图表、稀疏网格、局部数据密度",
    material: "细内边框、弱网格背景、无外发光或只在真实状态使用",
    avoid: "不要紫蓝霓虹渐变、假终端截图、无意义版本号和状态点"
  },
  {
    id: "S09",
    name: "日式静谧",
    category: "极简",
    className: "style-japan",
    summary: "和纸感中性色、朱红单点和克制排版。适合文化、餐饮、空间与慢品牌。",
    tags: "日式 和风 静谧 留白 朱红 文化",
    dials: [6, 3, 2],
    preview: ["間", "给内容留出呼吸", "节制的色彩让材料和文字更清楚。", "查看内容"],
    palette: "paper #EDE8DC、charcoal #342F2A、vermilion #B84B3D",
    type: "轻字重无衬线或适配中文的宋体，仅在真实文化语境使用",
    layout: "大量负空间、偏轴构图、一个圆形或印章式色彩锚点",
    material: "哑光纸张、细线、0-4px 圆角，无明显投影",
    avoid: "不要滥用竹子、樱花、竖排字和仿古纹样"
  },
  {
    id: "S10",
    name: "新包豪斯",
    category: "编辑",
    className: "style-bauhaus",
    summary: "基础几何、原色和强结构。适合设计教育、展览、创意机构与发布活动。",
    tags: "包豪斯 几何 原色 现代主义 展览 教育",
    dials: [8, 6, 4],
    preview: ["FORM", "形状组织信息", "Geometry supports hierarchy, not decoration.", "查看展览"],
    palette: "warm gray #E8E5DA、cobalt #3157E5、red #E64D35、ink #181817",
    type: "几何无衬线，粗标题配简洁正文，避免复古字体模仿",
    layout: "圆形、矩形和斜向元素参与真实分区，内容保持可读",
    material: "纯平面色块，无阴影，0-4px 圆角",
    avoid: "不要把几何图形撒满页面，不要做成复古海报复制品"
  },
  {
    id: "S11",
    name: "柔和玻璃",
    category: "品牌",
    className: "style-glass",
    summary: "克制的网页毛玻璃近似效果。适合媒体覆盖、消费电子和沉浸式品牌页。",
    tags: "玻璃 毛玻璃 frosted premium 消费 透明",
    dials: [8, 6, 3],
    preview: ["LAYER", "光线塑造层次", "Use transparency only where depth is meaningful.", "查看体验"],
    palette: "desaturated blue gray #6A8D9B、muted copper #BD9376、soft white",
    type: "现代无衬线，标题 500-650 字重，不使用默认苹果仿制字体语气",
    layout: "大幅真实媒体背景，玻璃只覆盖导航或关键控制层",
    material: "backdrop-filter、1px 高光内边框、透明叠层，并提供纯色降级",
    avoid: "不要声称是官方 Apple Liquid Glass，不要让所有卡片都透明"
  },
  {
    id: "S12",
    name: "钴蓝编辑",
    category: "编辑",
    className: "style-cobalt",
    summary: "高密度钴蓝配纸白，用强排版制造品牌记忆。适合杂志、活动与创意产品。",
    tags: "钴蓝 编辑 高对比 排版 活动 品牌",
    dials: [8, 5, 4],
    preview: ["CURRENT", "观点需要清晰", "A single saturated field can carry the page.", "阅读专题"],
    palette: "cobalt #244DD8、paper #F4F1E8，整页只使用这一强调关系",
    type: "宽体粗无衬线标题配正常正文，靠字号与段落节奏建立层级",
    layout: "大色域、窄内容列、粗标题与细分隔线的对比",
    material: "纯平面，无投影，0-4px 圆角",
    avoid: "不要加入第二个强调色、渐变标题或无意义胶囊标签"
  },
  {
    id: "S13",
    name: "复古未来",
    category: "实验",
    className: "style-retro",
    summary: "银色、品红与青色错位，带有克制的千禧科技感。适合音乐、时尚和活动。",
    tags: "Y2K 复古未来 千禧 银色 品红 音乐 时尚",
    dials: [9, 7, 4],
    preview: ["AFTER 2000", "过去想象的未来", "Chrome, offset color and compact type.", "进入频道"],
    palette: "chrome #BEC4C8、magenta #CF285F、cyan #6DD4D3、blue #3B7DE5",
    type: "紧凑粗无衬线，可用轻微色彩错位，不使用难读的像素字体作正文",
    layout: "重叠媒体、椭圆和紧凑信息块，保留明确主路径",
    material: "金属渐变、硬边框、少量模糊高光",
    avoid: "不要无限霓虹发光、随机贴纸、满屏怀旧符号"
  },
  {
    id: "S14",
    name: "杂志叙事",
    category: "编辑",
    className: "style-magazine",
    summary: "真正的编辑语境才使用衬线。适合出版、文化文章、长篇故事和奢侈品牌内容。",
    tags: "杂志 编辑 衬线 出版 文化 长文",
    dials: [7, 4, 3],
    preview: ["MONUMENT", "阅读也可以有空间感", "Typography carries the narrative when content is the product.", "阅读全文"],
    palette: "paper #F1EFE8、ink #1D1B19，不额外加入装饰性色彩",
    type: "Tiempos、EB Garamond 或合适中文宋体作标题，正文保持高可读性",
    layout: "非对称编辑网格、大图、窄文栏、清晰引用与章节节奏",
    material: "纸张感、细线、无卡片堆叠、无明显投影",
    avoid: "非编辑项目不要强行用衬线，不要混入随机手写或第二套衬线"
  },
  {
    id: "S15",
    name: "温暖功能主义",
    category: "极简",
    className: "style-warmutility",
    summary: "暖砂色、陶土与冷蓝灰的实用组合。适合家居、餐饮和实体消费产品。",
    tags: "温暖 功能主义 陶土 家居 餐饮 实用",
    dials: [6, 4, 4],
    preview: ["COMMON", "好用，也有温度", "Functional structure with one warm material cue.", "查看系列"],
    palette: "sand #E4D6C3、terracotta #C85F45、slate #25313B",
    type: "有亲和力的无衬线，标题不使用默认手作衬线",
    layout: "清晰产品信息、色块分区、大图与参数摘要，避免长规格表",
    material: "哑光色面、实用边框、6-8px 圆角",
    avoid: "不要米色加黄铜加咖啡黑的通用高端消费模板"
  },
  {
    id: "S16",
    name: "黑与棕",
    category: "品牌",
    className: "style-blacktan",
    summary: "近黑与暖棕的锐利对比。适合服装、皮具、家具和高端实体品牌。",
    tags: "黑色 棕色 高端 时尚 家具 皮具",
    dials: [7, 5, 3],
    preview: ["FOUND", "材料决定语气", "Contrast stays sharp while the palette remains warm.", "查看产品"],
    palette: "near black #171816、tan #E6C69C、deep olive #282923",
    type: "克制的宽体无衬线，短标题可用 500 字重与较大字号",
    layout: "深色全页主题、产品局部特写、窄文本与强边界",
    material: "低反射表面、细棕色边框、极轻暖色阴影",
    avoid: "不要中途切换成浅色区块，不要加入金色和酒红作为第二强调色"
  }
];

const styleCategories = ["全部", "极简", "编辑", "品牌", "实验", "科技", "玩心"];
let activeStyleCategory = "全部";
let styleQuery = "";

function stylePrompt(style) {
  return `请使用 design-taste-frontend，并采用 ${style.id}「${style.name}」作为目标页面的视觉方向。

Design Read：先根据我的产品类型、目标用户与核心动作确认这个方向是否合适。如存在明显分歧，只问一个澄清问题。
三项参数：DESIGN_VARIANCE ${style.dials[0]} / MOTION_INTENSITY ${style.dials[1]} / VISUAL_DENSITY ${style.dials[2]}。
色彩：${style.palette}。
字体：${style.type}。
版式：${style.layout}。
材质与组件：${style.material}。
明确避免：${style.avoid}。

请不要只替换配色。需要把这一方向落实到页面构图、字体层级、间距、图像策略、按钮、导航和交互状态。先输出一行 Design Read 与三项参数，再开始实现。完成后执行 design-taste-frontend 的 Pre-Flight Check。`;
}

function styleCard(style) {
  const article = document.createElement("article");
  article.className = "specimen-card";
  article.dataset.category = style.category;
  article.dataset.search = TasteGallery.normalize(`${style.id}${style.name}${style.category}${style.summary}${style.tags}`);
  const [brand, title, copy, cta] = style.preview;
  article.innerHTML = `
    <div class="specimen-preview style-stage ${style.className}">
      <div class="sample-nav"><span>${brand}</span><span>Overview&nbsp;&nbsp;Archive</span></div>
      <div class="sample-body">
        <span class="sample-kicker">${style.category}</span>
        <div class="sample-title">${title}</div>
        <div class="sample-copy">${copy}</div>
        <span class="sample-cta">${cta}</span>
      </div>
    </div>
    <div class="specimen-info">
      <div>
        <span class="specimen-id">${style.id}</span>
        <h2>${style.name}</h2>
        <p>${style.summary}</p>
        <div class="dial-row">
          <span>VAR ${style.dials[0]}</span><span>MOTION ${style.dials[1]}</span><span>DENSITY ${style.dials[2]}</span>
        </div>
      </div>
      <div class="card-actions"><button class="copy-button" type="button">复制 Prompt</button></div>
    </div>`;

  article.querySelector(".copy-button").addEventListener("click", async (event) => {
    try {
      await TasteGallery.copyText(stylePrompt(style));
      TasteGallery.setCopyState(event.currentTarget, style.id);
    } catch (error) {
      console.error(error);
      TasteGallery.showToast("复制失败，请重试");
    }
  });
  return article;
}

function filterStyles() {
  let visible = 0;
  document.querySelectorAll("#styleGrid .specimen-card").forEach((card) => {
    const categoryMatch = activeStyleCategory === "全部" || card.dataset.category === activeStyleCategory;
    const searchMatch = !styleQuery || card.dataset.search.includes(TasteGallery.normalize(styleQuery));
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });
  document.getElementById("styleCount").textContent = `${visible} / ${styleDirections.length}`;
  styleGrid.hidden = visible === 0;
  document.getElementById("styleEmpty").hidden = visible !== 0;
}

const styleGrid = document.getElementById("styleGrid");
styleDirections.forEach((style) => styleGrid.appendChild(styleCard(style)));
TasteGallery.createFilters(document.getElementById("styleFilters"), styleCategories, (category) => {
  activeStyleCategory = category;
  filterStyles();
});
document.getElementById("styleSearch").addEventListener("input", (event) => {
  styleQuery = event.target.value;
  filterStyles();
});
filterStyles();
