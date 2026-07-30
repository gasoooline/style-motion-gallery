const motionDirections = [
  {
    id: "M01", name: "淡入上移", category: "入场", mode: "replay",
    summary: "最通用的内容入场。用透明度和短位移建立阅读顺序。",
    tags: "淡入 上移 fade slide 入场 页面 卡片",
    purpose: "通过轻微上移和淡入建立视觉层级，适合首屏、区块和卡片进入视口",
    trigger: "页面加载、区块首次进入视口或路由切换",
    motion: "opacity 0 到 1，同时 translateY 24px 到 0",
    timing: "550-750ms，cubic-bezier(0.16, 1, 0.3, 1)",
    note: "只触发一次。多个元素使用 60-90ms 间隔，不要让整页排队等待"
  },
  {
    id: "M02", name: "交错入场", category: "入场", mode: "replay",
    summary: "同类元素依次出现。适合列表、卡片组和导航展开。",
    tags: "交错 stagger 列表 卡片 顺序 入场",
    purpose: "让多个同类元素按阅读顺序出现，传达层级和分组关系",
    trigger: "内容组首次进入视口或菜单展开",
    motion: "子元素 opacity 0 到 1，translateY 18px 到 0，相邻元素延迟 60-100ms",
    timing: "单项 420-560ms，ease-out",
    note: "超过 8 项时只给首屏元素使用交错，避免等待过长"
  },
  {
    id: "M03", name: "弹性浮现", category: "入场", mode: "replay",
    summary: "轻微越界回弹。适合成功反馈、徽章和重点结果。",
    tags: "弹性 spring scale 回弹 成功 徽章",
    purpose: "强调一个新结果或奖励出现，并提供轻松但明确的反馈",
    trigger: "任务完成、结果生成、徽章或小组件出现",
    motion: "scale 0.45 到 1.08 再回到 1，opacity 同步进入",
    timing: "600-800ms，spring 或带轻微 overshoot 的缓动",
    note: "严肃 B2B、金融和医疗界面降低回弹，不用于大段正文"
  },
  {
    id: "M04", name: "磁吸按钮", category: "悬浮", mode: "hover",
    summary: "按钮向指针轻微靠近。适合高端品牌和创意落地页。",
    tags: "磁吸 magnetic hover 按钮 指针 品牌",
    purpose: "强化主要按钮的可交互性，并提供细腻的指针反馈",
    trigger: "桌面端 pointermove 与 pointerleave，键盘 focus 使用静态高亮",
    motion: "按钮在自身范围内跟随指针移动 4-8px，离开时用 spring 回到原位",
    timing: "spring stiffness 100-180，damping 18-24",
    note: "使用 Motion useMotionValue 或原生动画值，不要用 React state 追踪鼠标"
  },
  {
    id: "M05", name: "方向填充", category: "悬浮", mode: "hover",
    summary: "悬浮时色块从一侧进入。适合导航和次级按钮。",
    tags: "方向 hover fill 按钮 导航 填充",
    purpose: "用清晰的色块移动表达控件已进入可操作状态",
    trigger: "hover 与 focus-visible",
    motion: "背景层沿交互方向从 -100% 移动到 0，文字对比同步切换",
    timing: "240-340ms，cubic-bezier(0.16, 1, 0.3, 1)",
    note: "始终保证进入前后文字对比度，移动端保留 active 状态"
  },
  {
    id: "M06", name: "点击波纹", category: "反馈", mode: "replay",
    summary: "从点击位置扩散，明确表示操作已被接收。",
    tags: "波纹 ripple 点击 feedback material",
    purpose: "在操作结果尚未出现前，立即确认点击已被界面接收",
    trigger: "pointerdown 或 click，从实际点击坐标开始",
    motion: "圆形从小尺寸扩展到覆盖控件，同时 opacity 降到 0",
    timing: "500-700ms，ease-out",
    note: "控件需要 overflow hidden，不要在高频操作区叠加过亮波纹"
  },
  {
    id: "M07", name: "骨架微光", category: "状态", mode: "loop",
    summary: "匹配内容形状的加载状态。比通用转圈更稳定。",
    tags: "骨架 skeleton shimmer 加载 状态",
    purpose: "在数据加载期间保留最终布局空间，降低跳动并提示内容正在到达",
    trigger: "请求开始后显示，内容返回立即淡出",
    motion: "低对比高光从左到右经过骨架表面，只改变 transform 和 opacity",
    timing: "每轮 1.2-1.6s，linear 或柔和 ease-in-out",
    note: "骨架必须匹配最终内容形状，reduced-motion 下显示静态骨架"
  },
  {
    id: "M08", name: "文字解码", category: "文字", mode: "replay",
    summary: "字符从随机状态恢复为正文。适合短标题和技术品牌。",
    tags: "文字 解码 scramble hacker tech 标题",
    purpose: "表现系统解析、连接或生成完成，适合短标题和状态切换",
    trigger: "标题进入视口、模式切换或操作完成",
    motion: "从左到右逐步锁定真实字符，未锁定部分短暂显示随机字符",
    timing: "500-900ms，每帧或每 30-45ms 更新一次",
    note: "只用于短句，最终文本必须立即可被辅助技术读取并支持跳过"
  },
  {
    id: "M09", name: "数字递增", category: "状态", mode: "replay",
    summary: "数值平滑到达目标。适合真实指标和结果反馈。",
    tags: "数字 count up 指标 数据 状态",
    purpose: "帮助用户感知数值变化方向和最终结果",
    trigger: "真实数据返回、筛选变化或指标首次进入视口",
    motion: "使用 requestAnimationFrame 或动画库插值，从旧值到新值",
    timing: "800-1200ms，ease-out",
    note: "保留单位、小数和千分位，不要为装饰编造精确数字"
  },
  {
    id: "M10", name: "手风琴展开", category: "状态", mode: "click",
    summary: "内容在原位展开。适合 FAQ、分类说明和移动端详情。",
    tags: "accordion 展开 折叠 FAQ 状态",
    purpose: "在不离开当前上下文的情况下显示或隐藏补充内容",
    trigger: "点击标题、Enter 或 Space",
    motion: "高度与内容透明度协同变化，图标同步旋转表示状态",
    timing: "280-380ms，cubic-bezier(0.16, 1, 0.3, 1)",
    note: "维护 aria-expanded 与键盘操作，退出动画不能截断焦点"
  },
  {
    id: "M11", name: "形态展开", category: "状态", mode: "click",
    summary: "按钮扩展成面板。适合快速操作和轻量详情。",
    tags: "morph modal 形态 展开 面板 按钮",
    purpose: "通过共享形状让用户理解新面板来自哪个触发器",
    trigger: "点击按钮打开，再次点击或 Escape 关闭",
    motion: "宽高、圆角和内容 opacity 协同变化，优先使用 layout 动画",
    timing: "320-460ms，spring 或强调 ease-out",
    note: "完整弹窗仍需焦点陷阱、遮罩和关闭按钮，不能只做视觉变形"
  },
  {
    id: "M12", name: "视差倾斜", category: "悬浮", mode: "hover",
    summary: "卡片随指针轻微倾斜。适合作品、产品和可探索内容。",
    tags: "tilt parallax 卡片 3D hover 指针",
    purpose: "给可探索的媒体卡片增加深度，并强化指针位置反馈",
    trigger: "桌面端 pointermove，pointerleave 回正",
    motion: "perspective 配合 rotateX 和 rotateY，角度控制在 2-8deg",
    timing: "180-280ms，离开时 spring 回正",
    note: "移动端和 reduced-motion 降级为普通静态卡片，不用于长文本"
  },
  {
    id: "M13", name: "聚光边框", category: "悬浮", mode: "hover",
    summary: "边框在指针附近变亮。适合深色科技界面的重点卡片。",
    tags: "spotlight border 聚光 边框 hover 科技",
    purpose: "在不移动卡片的情况下提示当前指针关注区域",
    trigger: "pointermove 更新 CSS 自定义属性，pointerleave 恢复",
    motion: "径向渐变仅作用于边框层，内容层保持稳定",
    timing: "跟随指针实时更新，离开时 200-300ms 淡出",
    note: "限制为少量重点卡片，避免整页发光并保证静态边框仍可见"
  },
  {
    id: "M14", name: "动势跑马灯", category: "文字", mode: "loop",
    summary: "单条水平内容持续移动。适合品牌声明或大量低优先级项目。",
    tags: "marquee 跑马灯 文字 品牌 循环",
    purpose: "展示大量无需逐项停留的品牌词、类别或合作方",
    trigger: "页面可见时低速循环，hover 可暂停",
    motion: "复制一组内容形成无缝轨道，只用 translateX 移动",
    timing: "完整一轮 12-24s，linear",
    note: "每页最多一个，reduced-motion 下静态换行，不承载关键操作"
  },
  {
    id: "M15", name: "Dock 放大", category: "悬浮", mode: "hover",
    summary: "当前图标和相邻项按距离放大。适合紧凑图形导航。",
    tags: "dock magnification 图标 导航 hover",
    purpose: "扩大当前目标并保留相邻上下文，提升密集图标导航的可点性",
    trigger: "指针在 dock 范围内移动，键盘 focus 放大单项",
    motion: "当前项 scale 约 1.35，相邻项 1.1-1.15，底部对齐",
    timing: "160-220ms，spring 或强调 ease-out",
    note: "图标容器尺寸保持稳定，触控端使用固定大点击区域"
  },
  {
    id: "M16", name: "幕布揭示", category: "转场", mode: "replay",
    summary: "两侧内容打开，揭示新场景。适合品牌开场和页面转场。",
    tags: "curtain reveal 幕布 揭示 转场 页面",
    purpose: "清楚区分两个叙事场景，并给关键内容一个正式出场时刻",
    trigger: "首次进入页面或重要章节切换",
    motion: "左右遮罩向外 translateX，底层内容保持稳定",
    timing: "700-1000ms，cubic-bezier(0.76, 0, 0.24, 1)",
    note: "不要每次路由都强制播放，用户返回时应快速进入"
  },
  {
    id: "M17", name: "粘性堆叠", category: "滚动", mode: "replay",
    summary: "新卡片覆盖旧卡片并形成层次。适合分步骤叙事。",
    tags: "sticky stack 粘性 堆叠 滚动 卡片",
    purpose: "让连续章节保留前后关系，适合功能叙事和案例步骤",
    trigger: "滚动到容器顶部后 pin，下一张到达时驱动上一张缩小",
    motion: "前一张 scale 到约 0.92 并降低 opacity，下一张保持完整",
    timing: "与滚动 scrub 绑定，start 必须为 top top",
    note: "使用 GSAP ScrollTrigger 或稳定 sticky 方案，reduced-motion 改为普通纵向列表"
  },
  {
    id: "M18", name: "横向叙事", category: "滚动", mode: "replay",
    summary: "纵向滚动驱动横向内容。适合案例、时间线和媒体序列。",
    tags: "horizontal pan 横向 滚动 叙事 时间线",
    purpose: "在一个明确章节内浏览连续宽幅内容，形成横向时间或空间关系",
    trigger: "章节顶部到达视口顶部后 pin，纵向滚动驱动内层轨道",
    motion: "轨道 translateX 从 0 到负的总溢出宽度，scrub 1",
    timing: "滚动距离等于 track scrollWidth 减 viewport width",
    note: "只用于单一重点章节，移动端和 reduced-motion 改为横向 scroll-snap"
  },
  {
    id: "M19", name: "缩放视差", category: "滚动", mode: "replay",
    summary: "图像或色块随章节推进放大。适合建立空间感与转场。",
    tags: "zoom parallax 缩放 视差 滚动 图像",
    purpose: "把用户视线从全景引导到细节，支持故事推进或章节过渡",
    trigger: "媒体容器进入并通过视口时与滚动进度绑定",
    motion: "背景媒体 scale 1 到 1.15 或局部遮罩逐步放大，只动画 transform",
    timing: "与滚动进度 scrub，避免突然加速",
    note: "必须预留图像尺寸，移动端减小缩放幅度，reduced-motion 保持静态"
  },
  {
    id: "M20", name: "路径绘制", category: "滚动", mode: "replay",
    summary: "线条随着进度被绘制。适合流程、路线和章节导航。",
    tags: "path draw SVG 路径 绘制 滚动 流程",
    purpose: "把流程顺序或空间路线可视化，让用户理解当前进度",
    trigger: "进入视口后播放一次，或将 stroke 进度绑定滚动",
    motion: "使用 stroke-dasharray 与 stroke-dashoffset 从隐藏到完整",
    timing: "独立播放 1000-1800ms，或与滚动线性绑定",
    note: "路径必须表达真实关系，不作为无意义装饰，reduced-motion 直接显示完整路径"
  },
  {
    id: "M21", name: "Gooey Menu", category: "导航", mode: "hover",
    summary: "菜单项像粘液一样分离与归位，适合少量创意导航。",
    tags: "gooey menu 粘液 菜单 导航 分离",
    purpose: "用连续形变表达主菜单与子操作的归属关系",
    trigger: "悬浮或点击主菜单后展开",
    motion: "子项从同一原点分离，配合 blur + contrast 或 SVG filter 形成粘连边缘",
    timing: "420-620ms，spring 回弹",
    note: "只用于 3-5 个项目，保留清晰点击区与键盘顺序"
  },
  {
    id: "M22", name: "Dynamic Island", category: "状态", mode: "hover",
    summary: "紧凑状态容器扩展为操作面板，保留状态连续性。",
    tags: "dynamic island 形态 状态 扩展 胶囊",
    purpose: "让用户理解详细操作来自当前紧凑状态",
    trigger: "状态变化、悬浮、聚焦或点击",
    motion: "外形用 layout 或 scale 连续扩展，内容延迟淡入",
    timing: "320-480ms，spring stiffness 140-190",
    note: "网页实现是交互模式，不宣称为 Apple 官方组件"
  },
  {
    id: "M23", name: "径向菜单", category: "导航", mode: "hover",
    summary: "子操作从触发点向周围展开，适合局部上下文工具。",
    tags: "radial menu 径向 环形 上下文 导航",
    purpose: "在触发位置周围展示少量并列操作，缩短指针移动距离",
    trigger: "右键、长按或显式菜单按钮",
    motion: "4-6 个子项从中心沿圆弧 translate 展开，opacity 同步进入",
    timing: "260-420ms，相邻子项延迟 35-55ms",
    note: "必须提供列表式键盘替代和清晰退出机制"
  },
  {
    id: "M24", name: "Speed Dial", category: "导航", mode: "hover",
    summary: "主操作按钮沿曲线释放次级操作，适合高频工具。",
    tags: "speed dial FAB 浮动按钮 快捷操作",
    purpose: "把一组相关快捷操作收纳到一个明确主触发器中",
    trigger: "点击、键盘激活或桌面端悬浮预览",
    motion: "子按钮沿弧线 translate 移动并依次淡入",
    timing: "300-460ms，spring damping 20-26",
    note: "不要超过 5 个子操作，移动端保留足够触控区"
  },
  {
    id: "M25", name: "Mega Menu Reveal", category: "导航", mode: "hover",
    summary: "大型导航面板分组揭示，适合内容层级较多的站点。",
    tags: "mega menu reveal 大型菜单 导航 分组",
    purpose: "在不离开当前页面的情况下展示清晰的信息架构",
    trigger: "导航项悬浮、点击或键盘展开",
    motion: "面板先淡入上移，内部栏目按列 stagger 进入",
    timing: "面板 280-360ms，项目间隔 45-70ms",
    note: "维护 aria-expanded、Escape 关闭与焦点管理"
  },
  {
    id: "M26", name: "全息箔片", category: "悬浮", mode: "hover",
    summary: "色谱箔层随视角滑过表面，适合少量重点收藏或会员卡。",
    tags: "holographic foil 全息 箔片 卡片 视角",
    purpose: "用材质变化强调稀缺或可收藏对象",
    trigger: "桌面端指针移动，键盘聚焦使用固定高光",
    motion: "大尺寸色谱伪元素通过 transform 滑过卡片，本体只轻微倾斜",
    timing: "360-560ms，ease-out",
    note: "不用在普通信息卡网格，保证文字对比度"
  },
  {
    id: "M27", name: "滑动卡堆", category: "反馈", mode: "hover",
    summary: "顶层卡片被拖离后显示下一张，适合快速取舍。",
    tags: "swipe stack tinder 卡堆 滑动 拖拽",
    purpose: "让用户通过直接操作快速处理一组相同类型的对象",
    trigger: "水平拖拽超过阈值或点击取舍按钮",
    motion: "顶层卡跟随指针 translate + rotate，超过阈值后离场，下层卡放大归位",
    timing: "跟随指针，释放后 spring 300-500ms",
    note: "必须提供撤销、键盘和明确按钮替代"
  },
  {
    id: "M28", name: "Liquid Swipe", category: "转场", mode: "hover",
    summary: "流体边缘横向覆盖场景，用于少量重点页面转场。",
    tags: "liquid swipe 液态 转场 遮罩",
    purpose: "明确分隔两个视觉场景，并保留方向感",
    trigger: "重点路由切换或故事章节转场",
    motion: "带柔和曲线边缘的遮罩层使用 translateX 穿过视口",
    timing: "650-900ms，cubic-bezier(0.76, 0, 0.24, 1)",
    note: "网页轻量实现是近似效果，不应拦截高频路由"
  },
  {
    id: "M29", name: "Coverflow", category: "画廊", mode: "hover",
    summary: "中心媒体放大，两侧项保留倾斜与上下文。",
    tags: "coverflow carousel 画廊 轮播 3D",
    purpose: "在有限宽度内强调当前媒体，同时显示前后关系",
    trigger: "拖拽、滚轮、方向键或点击两侧项",
    motion: "中心项 scale 到 1，两侧 rotateY + translateX，状态变化使用 layout 动画",
    timing: "420-620ms，spring damping 24-30",
    note: "保留标准列表或按钮导航，不让 3D 姿态影响可读性"
  },
  {
    id: "M30", name: "手风琴画廊", category: "画廊", mode: "hover",
    summary: "窄幅媒体在聚焦时展开，适合作品或系列对比。",
    tags: "accordion image slider 手风琴 画廊 图片",
    purpose: "让用户在一个连续画廊中通过局部展开比较媒体",
    trigger: "悬浮、聚焦或点击某一媒体条",
    motion: "当前条目比例扩大，相邻条目退让，标题同步淡入",
    timing: "360-520ms，cubic-bezier(0.16, 1, 0.3, 1)",
    note: "使用 CSS Grid 或 Motion layout，不要在高频列表中使用"
  },
  {
    id: "M31", name: "Hover Image Trail", category: "画廊", mode: "hover",
    summary: "指针路径后方依次出现媒体缩略图，适合创意目录。",
    tags: "hover image trail 图片 轨迹 指针 画廊",
    purpose: "用连续缩略图帮助用户预览当前索引所指的视觉内容",
    trigger: "指针在列表或画布中移动",
    motion: "少量图片按距离阈值出现，使用 transform + opacity 移动与消失",
    timing: "跟随指针，单张保留 450-700ms",
    note: "限制 DOM 数量并复用节点，不要遮挡可点击内容"
  },
  {
    id: "M32", name: "Glitch Image", category: "画廊", mode: "hover",
    summary: "短暂 RGB 错位与切片抽动，适合音乐、游戏与实验品牌。",
    tags: "glitch image RGB 错位 切片 实验",
    purpose: "表达信号干扰、切换或数字媒介感",
    trigger: "悬浮、媒体切换或短暂加载完成",
    motion: "复制媒体层使用 clip-path、轻微 translateX 与不同色通道",
    timing: "180-320ms，最多 2-3 次短促脉冲",
    note: "不要无限循环，避免强烈闪烁并支持 reduced-motion"
  },
  {
    id: "M33", name: "Text Mask Reveal", category: "文字", mode: "hover",
    summary: "大字作为媒体窗口，在文字内部揭示运动层。",
    tags: "text mask reveal 文字 遮罩 媒体",
    purpose: "把文字与媒体合并为一个主视觉信息",
    trigger: "首屏入场、悬浮或章节切换",
    motion: "背景媒体使用文字 mask 裁切，内部层只做 transform 位移",
    timing: "600-900ms，ease-out",
    note: "只适合短标题，另保留真实文本供辅助技术读取"
  },
  {
    id: "M34", name: "Circular Text", category: "文字", mode: "hover",
    summary: "短文字沿环形路径旋转，适合印章、媒体控件与状态。",
    tags: "circular text path 环形 文字 旋转",
    purpose: "用环形路径表达循环、围绕或持续状态",
    trigger: "悬浮、播放状态或页面可见时",
    motion: "文字路径容器使用 rotate 慢速旋转",
    timing: "完整一圈 8-16s，linear",
    note: "不承载关键指令，reduced-motion 下保持静态"
  },
  {
    id: "M35", name: "Gradient Stroke", category: "文字", mode: "hover",
    summary: "色彩高光沿文字轮廓通过，用于少量重点标题。",
    tags: "gradient stroke 渐变 描边 文字 高光",
    purpose: "在不填满文字的情况下强调短标题的边界与节奏",
    trigger: "标题入场或悬浮",
    motion: "大尺寸色谱层经过文字描边 mask，仅动画 transform",
    timing: "700-1100ms，ease-in-out",
    note: "全页最多一处，不要与渐变填充标题叠加"
  },
  {
    id: "M36", name: "Particle Burst", category: "反馈", mode: "hover",
    summary: "操作成功时少量粒子向外释放，强化完成感。",
    tags: "particle explosion burst 粒子 成功 按钮",
    purpose: "对低频、明确成功的操作提供短促庆祝反馈",
    trigger: "收藏、达成或提交成功",
    motion: "8-14 个粒子从按钮边缘使用 translate + scale + opacity 离开",
    timing: "450-700ms，ease-out",
    note: "不用于每次常规点击，避免大量 DOM 与 canvas 浪费"
  },
  {
    id: "M37", name: "Lens Blur", category: "状态", mode: "hover",
    summary: "前景保持清晰，相邻层级轻微失焦，用于强调当前对象。",
    tags: "lens blur depth 景深 模糊 聚焦",
    purpose: "在层叠媒体中用景深明确当前操作层",
    trigger: "悬浮、聚焦、模态面板打开或选中状态",
    motion: "当前层轻微 scale 与淡入，背景层逐步降低 opacity 并应用模糊",
    timing: "280-420ms，ease-out",
    note: "提供 prefers-reduced-transparency 纯色降级，不模糊关键信息"
  },
  {
    id: "M38", name: "Split-Screen Scroll", category: "滚动", mode: "hover",
    summary: "左右画面沿相反方向推进，用于对比两条并行叙事。",
    tags: "split screen scroll 分屏 反向 滚动 叙事",
    purpose: "把两组对照内容放在同一时间轴上推进",
    trigger: "章节通过视口时与滚动进度绑定",
    motion: "左右轨道分别使用相反 translateY，容器保持稳定",
    timing: "与滚动 scrub 绑定，无独立缓动",
    note: "必须存在真实对比关系，普通内容不要强行分屏"
  },
  {
    id: "M39", name: "Drag-to-Pan Grid", category: "画廊", mode: "hover",
    summary: "用户拖动大型画布查看空间分布的媒体。",
    tags: "drag to pan grid 拖动 画布 无边界 画廊",
    purpose: "在空间关系比列表顺序更重要时允许自由探索",
    trigger: "pointerdown 后拖动，释放时保留少量惯性",
    motion: "整个画布轨道使用 motion value translate，不在每帧更新 React state",
    timing: "跟随指针，惯性回收 300-700ms",
    note: "提供缩略导航、重置位置与键盘替代"
  },
  {
    id: "M40", name: "Sequence Scroll", category: "滚动", mode: "hover",
    summary: "帧序列随进度切换，用于拆解产品、过程或空间变化。",
    tags: "locomotive sequence scroll 帧序列 滚动 产品拆解",
    purpose: "把连续过程映射到用户可控的页面进度上",
    trigger: "容器置顶后将滚动进度映射到图像或视频帧",
    motion: "通过 canvas 或视频 currentTime 根据进度渲染当前帧",
    timing: "与滚动 scrub 绑定，预加载关键帧",
    note: "使用成熟帧序列方案，预留尺寸并提供静态首帧降级"
  }
];

const motionCategories = ["全部", "入场", "悬浮", "反馈", "状态", "文字", "导航", "画廊", "转场", "滚动"];
let activeMotionCategory = "全部";
let motionQuery = "";

function motionStage(id) {
  const stages = {
    M01: '<div class="motion-object demo-fade">Content</div>',
    M02: '<div class="stagger-set"><span></span><span></span><span></span><span></span></div>',
    M03: '<div class="motion-object demo-spring">Done</div>',
    M04: '<button class="motion-button-ui demo-magnetic" type="button">靠近我</button>',
    M05: '<button class="motion-button-ui demo-directional" type="button">悬浮填充</button>',
    M06: '<button class="motion-button-ui demo-ripple" type="button">点击反馈</button>',
    M07: '<div class="skeleton-demo"><span></span><span></span><span></span></div>',
    M08: '<div class="scramble-text" data-text="SYSTEM READY">SYSTEM READY</div>',
    M09: '<div class="count-demo" data-target="2472">0</div>',
    M10: '<div class="accordion-demo"><button class="accordion-trigger" type="button" aria-expanded="false">设计说明 <span>+</span></button><div class="accordion-panel">展开内容保留在当前上下文中，并支持键盘操作。</div></div>',
    M11: '<div class="morph-demo"><button class="morph-panel" type="button" aria-expanded="false">打开面板</button></div>',
    M12: '<div class="motion-card-ui demo-tilt">悬浮倾斜</div>',
    M13: '<div class="motion-card-ui spotlight-demo">Spotlight</div>',
    M14: '<div class="marquee-window"><div class="marquee-track"><span>TYPE</span><span>FORM</span><span>MOTION</span><span>TYPE</span><span>FORM</span><span>MOTION</span></div></div>',
    M15: '<div class="dock-demo"><span></span><span></span><span></span><span></span></div>',
    M16: '<div class="curtain-demo">REVEAL</div>',
    M17: '<div class="stack-demo"><span></span><span></span><span></span></div>',
    M18: '<div class="pan-demo"><span></span><span></span><span></span></div>',
    M19: '<div class="zoom-demo"><span>FOCUS</span></div>',
    M20: '<div class="path-demo"><svg viewBox="0 0 220 90" role="img" aria-label="弯曲路径逐步绘制"><path d="M8 70 C 48 8, 84 82, 122 34 S 180 8, 212 48" /></svg></div>',
    M21: '<div class="gooey-demo"><span></span><span></span><span></span><span></span></div>',
    M22: '<div class="island-demo"><div><span>正在播放</span><small>STILL</small></div></div>',
    M23: '<div class="radial-demo"><b>+</b><span></span><span></span><span></span><span></span></div>',
    M24: '<div class="speed-dial-demo"><b>+</b><span></span><span></span><span></span></div>',
    M25: '<div class="mega-demo"><strong>导航</strong><div><span></span><span></span><span></span></div></div>',
    M26: '<div class="foil-demo"><strong>MEMBER</strong><span>HOLOGRAPHIC</span></div>',
    M27: '<div class="swipe-demo"><span></span><span></span><span></span></div>',
    M28: '<div class="liquid-demo"><strong>NEXT</strong></div>',
    M29: '<div class="coverflow-demo"><span></span><span></span><span></span></div>',
    M30: '<div class="image-accordion-demo"><span></span><span></span><span></span><span></span></div>',
    M31: '<div class="trail-demo"><span></span><span></span><span></span><span></span></div>',
    M32: '<div class="glitch-demo" data-label="SIGNAL">SIGNAL</div>',
    M33: '<div class="text-mask-demo">FORM</div>',
    M34: '<div class="circular-demo"><div><span>TYPE</span><span>FORM</span><span>MOVE</span><span>LOOP</span></div><b>+</b></div>',
    M35: '<div class="stroke-demo">CHROMA</div>',
    M36: '<div class="particle-demo"><button type="button">完成</button><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>',
    M37: '<div class="lens-demo"><span></span><span></span><span></span></div>',
    M38: '<div class="split-demo"><div><span></span><span></span></div><div><span></span><span></span></div></div>',
    M39: '<div class="drag-grid-demo"><div><span></span><span></span><span></span><span></span><span></span><span></span></div></div>',
    M40: '<div class="sequence-demo"><span></span><span></span><span></span><span></span></div>'
  };
  return stages[id];
}

function motionPrompt(motion) {
  return `请采用 ${motion.id}「${motion.name}」动效，并结合 design-taste-frontend 实现。

动效目的：${motion.purpose}。
触发方式：${motion.trigger}。
运动规则：${motion.motion}。
时长与缓动：${motion.timing}。
实现注意：${motion.note}。

请先说明这段动效在当前页面中传达什么，只在能够表达层级、叙事、反馈或状态变化时使用。优先动画 transform 与 opacity，避免用 React state 追踪连续指针或滚动值。所有高于 MOTION_INTENSITY 3 的效果必须支持 prefers-reduced-motion，并在移动端给出明确降级。`;
}

function runScramble(card) {
  const element = card.querySelector(".scramble-text");
  if (!element) return;
  const finalText = element.dataset.text;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let frame = 0;
  window.clearInterval(card._scrambleTimer);
  card._scrambleTimer = window.setInterval(() => {
    const locked = Math.floor(frame / 2);
    element.textContent = finalText.split("").map((char, index) => {
      if (char === " ") return " ";
      return index < locked ? char : chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    frame += 1;
    if (locked >= finalText.length) {
      element.textContent = finalText;
      window.clearInterval(card._scrambleTimer);
    }
  }, 42);
}

function runCounter(card) {
  const element = card.querySelector(".count-demo");
  if (!element) return;
  const target = Number(element.dataset.target);
  const started = performance.now();
  cancelAnimationFrame(card._counterFrame);
  function update(now) {
    const progress = Math.min(1, (now - started) / 1100);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(target * eased).toLocaleString("zh-CN");
    if (progress < 1) card._counterFrame = requestAnimationFrame(update);
  }
  card._counterFrame = requestAnimationFrame(update);
}

function replayMotion(card) {
  const stage = card.querySelector(".motion-stage");
  stage.classList.remove("play");
  void stage.offsetWidth;
  stage.classList.add("play");
  if (card.dataset.motionId === "M08") runScramble(card);
  if (card.dataset.motionId === "M09") runCounter(card);
}

function resetMotion(card) {
  card.querySelector(".motion-stage").classList.remove("play");
  window.clearInterval(card._scrambleTimer);
  cancelAnimationFrame(card._counterFrame);

  const scramble = card.querySelector(".scramble-text");
  if (scramble) scramble.textContent = scramble.dataset.text;

  const counter = card.querySelector(".count-demo");
  if (counter) counter.textContent = "0";
}

function wireInteractiveDemo(card, motion) {
  const stage = card.querySelector(".motion-stage");
  if (motion.id === "M06") {
    stage.querySelector(".demo-ripple").addEventListener("pointerdown", (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
      event.currentTarget.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
      replayMotion(card);
    });
  }
  if (motion.id === "M10") {
    const accordion = stage.querySelector(".accordion-demo");
    const trigger = accordion.querySelector(".accordion-trigger");
    trigger.addEventListener("click", () => {
      const open = accordion.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(open));
    });
  }
  if (motion.id === "M11") {
    const morph = stage.querySelector(".morph-demo");
    const trigger = morph.querySelector(".morph-panel");
    trigger.addEventListener("click", () => {
      const open = morph.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(open));
      trigger.textContent = open ? "面板已展开" : "打开面板";
    });
  }
  if (motion.id === "M13") {
    const spotlight = stage.querySelector(".spotlight-demo");
    spotlight.addEventListener("pointermove", (event) => {
      const rect = spotlight.getBoundingClientRect();
      spotlight.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      spotlight.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  }
}

function motionCard(motion) {
  const article = document.createElement("article");
  article.className = "specimen-card";
  article.dataset.category = motion.category;
  article.dataset.motionId = motion.id;
  article.dataset.search = TasteGallery.normalize(`${motion.id}${motion.name}${motion.category}${motion.summary}${motion.tags}`);
  const replayLabel = motion.mode === "hover" ? "悬浮体验" : motion.mode === "click" ? "点击体验" : motion.mode === "loop" ? "循环播放" : "重播";
  const canReplay = motion.mode === "replay";
  article.innerHTML = `
    <div class="specimen-preview motion-stage">${motionStage(motion.id)}</div>
    <div class="specimen-info">
      <div>
        <span class="specimen-id">${motion.id} · ${motion.category}</span>
        <h2>${motion.name}</h2>
        <p>${motion.summary}</p>
      </div>
      <div class="card-actions">
        ${canReplay ? '<button class="replay-button" type="button">重播</button>' : `<button class="replay-button" type="button" disabled aria-disabled="true">${replayLabel}</button>`}
        <button class="copy-button" type="button">复制 Prompt</button>
      </div>
    </div>`;

  const replay = article.querySelector(".replay-button");
  if (canReplay) replay.addEventListener("click", () => replayMotion(article));
  article.addEventListener("pointerenter", () => replayMotion(article));
  article.addEventListener("pointerleave", () => {
    if (!article.contains(document.activeElement)) resetMotion(article);
  });
  article.addEventListener("focusin", (event) => {
    if (!article.contains(event.relatedTarget)) replayMotion(article);
  });
  article.addEventListener("focusout", (event) => {
    if (!article.contains(event.relatedTarget)) resetMotion(article);
  });
  article.querySelector(".copy-button").addEventListener("click", async (event) => {
    try {
      await TasteGallery.copyText(motionPrompt(motion));
      TasteGallery.setCopyState(event.currentTarget, motion.id);
    } catch (error) {
      console.error(error);
      TasteGallery.showToast("复制失败，请重试");
    }
  });
  wireInteractiveDemo(article, motion);
  return article;
}

function filterMotions() {
  let visible = 0;
  document.querySelectorAll("#motionGrid .specimen-card").forEach((card) => {
    const categoryMatch = activeMotionCategory === "全部" || card.dataset.category === activeMotionCategory;
    const searchMatch = !motionQuery || card.dataset.search.includes(TasteGallery.normalize(motionQuery));
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });
  document.getElementById("motionCount").textContent = `${visible} / ${motionDirections.length}`;
  motionGrid.hidden = visible === 0;
  document.getElementById("motionEmpty").hidden = visible !== 0;
}

const motionGrid = document.getElementById("motionGrid");
motionDirections.forEach((motion) => motionGrid.appendChild(motionCard(motion)));
TasteGallery.createFilters(document.getElementById("motionFilters"), motionCategories, (category) => {
  activeMotionCategory = category;
  filterMotions();
});
document.getElementById("motionSearch").addEventListener("input", (event) => {
  motionQuery = event.target.value;
  filterMotions();
});
filterMotions();
