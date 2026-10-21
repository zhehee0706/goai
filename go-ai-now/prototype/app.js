import { animate, spring } from "https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm";
import { seal, logo, plat, PLATS, PLAT_ORDER } from "./brand.js";

const { gsap, ScrollTrigger, qrcode } = window;
gsap.registerPlugin(ScrollTrigger);
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((ok) => setTimeout(ok, ms));

/* ======================= words (EN / 中文) ======================= */
const T = {
  "nav.powers": ["Powers", "超能力"], "nav.why": ["Why Go AI", "为什么选 Go AI"], "nav.plans": ["Plans", "价格"], "nav.open": ["Open the app", "打开 App"],
  "hero.chip1": ["Live demo", "实时示范"], "hero.chip2": ["Made in Malaysia", "马来西亚出品"],
  "hero.k": ["The growth engine for real shops", "实体店的增长引擎"],
  "hero.l1": ["One photo.", "一张照片。"], "hero.l2": ["Every platform.", "全平台。"], "hero.l3": ["Real customers.", "真顾客。"],
  "hero.sub": ["Go AI turns one photo into posts for 8 platforms, helps every customer share their own real story, then brings them back with stamps. You just approve.", "Go AI 把一张照片变成 8 个平台的帖子，让每位顾客分享自己的真实体验，再用印章把他们带回来。你只要点确认。"],
  "hero.cta": ["Try it: 60 seconds", "马上试试，60 秒"], "hero.cta2": ["Why it's 10x", "为什么强 10 倍"],
  "yours.l": ["See it as your shop", "换成你的店看看"], "yours.ph": ["Your shop name", "你的店名"], "yours.type": ["Shop type", "店的类型"],
  "yours.h": ["Make it your shop", "换成你的店"], "yours.s": ["Type the shop name. Every poster, card and message changes with it.", "输入店名，海报、会员卡和讯息都会跟着换。"], "m.cafe": ["Café", "咖啡馆"], "m.pet": ["Pet shop", "宠物店"],
  "hero.ready": ["Ready for 8 platforms", "已适配 8 个平台"],
  "cmp.before": ["Your photo", "你拍的"], "cmp.after": ["Go AI", "Go AI"], "cmp.aria": ["Before and after", "前后对比"],
  "pc.hi": ["Hi, {name}", "嗨，{name}"], "pc.lv": ["Level {n}", "{n} 级"], "pc.pts": ["power points", "超能力点数"],
  "pc.next": ["{n} more to level {lv}. Every photo, member and return visit counts.", "再 {n} 点升到 {lv} 级。每张照片、每位会员、每次回店都算。"],
  "pc.go": ["Power up", "马上变身"], "pc.rep": ["See report", "看报告"],
  "wa.on": ["on WhatsApp", "在 WhatsApp"], "wa.ready": ["Your weekend post is ready.\nReply 1 to post it. Reply 2 for a new look.", "周末的帖子准备好了。\n回复 1 马上发布，回复 2 换个风格。"],
  "wa.r1": ["1  Post it", "1  发布"], "wa.r2": ["2  New look", "2  换风格"],
  "wa.posted": ["Posted to Facebook, Instagram and Xiaohongshu.", "已发布到 Facebook、Instagram 和小红书。"],
  "wa.newlook": ["Here's a new look. Reply 1 to post it.", "换好了，回复 1 就发布。"], "wa.again": ["Replay", "再看一次"],
  "tl.create": ["Make a post", "做张海报"], "tl.createS": ["Photo to poster in 60s", "照片变海报，60 秒"],
  "tl.week": ["Week on autopilot", "一周自动驾驶"], "tl.weekS": ["7 posts, one tap", "一键 7 个帖子"],
  "tl.new": ["New", "新"],
  "wall.k": ["Every platform", "全平台"], "wall.h": ["Posts everywhere your customers scroll.", "顾客刷哪里，你就出现在哪里。"],
  "wall.s": ["Each platform gets its own size, words and hashtags. Not one post pasted eight times.", "每个平台都有专属尺寸、文案和标签，不是同一篇复制八次。"],
  "fmt.xhs": ["3:4 cover, title, up to 10 tags", "3:4 封面、标题、最多 10 个标签"], "fmt.ig": ["4:5 photo, caption, tags", "4:5 照片、文案、标签"],
  "fmt.fb": ["Friendly post that tags the shop", "亲切贴文，标记店家"], "fmt.tiktok": ["9:16, a hook line, 4 tags", "9:16、开头金句、4 个标签"],
  "fmt.threads": ["One punchy line", "一句话就够"], "fmt.lemon8": ["Numbered list, 3:4", "清单体、3:4"],
  "fmt.google": ["Honest review, their own stars", "真实评价，星级自己选"], "fmt.wa": ["Quick status, 9:16", "快速动态、9:16"],
  "p1.k": ["Power 1", "超能力 1"], "p1.h": ["Ordinary photo. Famous poster.", "普通照片，秒变大片。"], "p1.s": ["Snap it, pick a look, post it. Done in 60 seconds.", "拍照、选风格、发出去，60 秒搞定。"],
  "p2.k": ["Power 2", "超能力 2"], "p2.h": ["Customers post their own story.", "顾客分享自己的真实体验。"], "p2.s": ["They tap what they got and loved. Go AI writes their post for each platform.", "顾客点选买了什么、喜欢什么，Go AI 帮他们写好每个平台的帖子。"],
  "p3.k": ["Power 3", "超能力 3"], "p3.h": ["They come back.", "顾客回头再来。"], "p3.s": ["Stamps live on their phone. Gone quiet? A welcome-back voucher is ready.", "印章存在手机里。太久没来？回头券已经准备好。"],
  "p4.k": ["Power 4", "超能力 4"], "p4.h": ["You see what worked.", "什么有效，一看就懂。"], "p4.s": ["One tap. Charts and plain words.", "一键生成，图表加白话。"],
  "st.before": ["Your photo", "你拍的"], "st.after": ["60 seconds later", "60 秒后"], "st.miss": ["We miss you!", "好久不见！"], "st.month": ["This month", "本月"], "st.post": ["Post it", "发布"],
  "stat.photos": ["photos made", "张照片"], "stat.members": ["new members", "位新会员"], "stat.returns": ["verified returns", "次确认回店"],
  "why.k": ["Why Go AI", "为什么选 Go AI"], "why.h": ["10x more than a caption page.", "比文案生成器强 10 倍。"],
  "why.col0": ["", ""], "why.col1": ["AI caption page", "AI 文案页面"], "why.col2": ["Go AI", "Go AI"],
  "big.line": ["1 minute, not 1 afternoon.", "一分钟，不用一个下午。"],
  "plans.k": ["Plans", "价格"], "plans.h": ["Priced for shops that want to win.", "为想赢的店而定价。"],
  "pl.1": ["Pro", "专业版"], "pl.2": ["Signature", "尊享版"], "pl.3": ["Group", "集团版"], "pl.yr": ["/year", "/年"], "pl.mo": ["/month", "/月"], "pl.from": ["<small class=\"from\">From</small>{p}", "{p}<small class=\"from\">起</small>"],
  "pl.yrSub": ["{m} a month, billed yearly", "每月 {m}，按年付"], "pl.moSub": ["Billed monthly. No yearly contract.", "按月付，不用签年约。"],
  "pb.h": ["Will it pay for itself?", "能回本吗？"], "pb.spend": ["Average spend per visit", "每次平均消费"], "pb.day": ["Customers a day", "每天客人"],
  "pb.res": ["Go AI Pro pays for itself when <b>1 in {n}</b> of your customers comes back one more time a month.", "只要每 <b>{n}</b> 位客人里有 1 位每月多回来一次，Go AI 专业版就回本了。"],
  "pb.resAll": ["Go AI Pro pays for itself at <b>{v}</b> extra visits a month.", "每月多 <b>{v}</b> 次回店，Go AI 专业版就回本了。"],
  "pb.det": ["That's {v} extra visits a month, about {d} a day, at {p} a month.", "也就是每月多 {v} 次，每天约 {d} 次，以每月 {p} 计算。"],
  "pb.note": ["Uses only your numbers and our price. No made-up conversion rates.", "只用你的数字和我们的价格，没有编造的转化率。"],
  "pr.h": ["Pilot promise", "试点承诺"], "pr.s": ["50 new members in your first 60 days, or your next month is free.", "头 60 天没有 50 位新会员，下个月免费。"],
  "bill.h": ["Billing", "付费方式"], "bill.mo": ["Monthly", "月付"], "bill.yr": ["Yearly", "年付"], "bill.free": ["2 months free", "省 2 个月"], "pl.pick": ["Recommended", "推荐"],
  "plans.note": ["Pilot prices. Setup, training and the Go AI team included.", "试点价格，含设置、培训和 Go AI 团队支援。"],
  "final.h": ["Ready? Go.", "准备好了？Go！"], "final.s": ["Open the demo app and power up {shop}.", "打开示范 App，帮 {shop} 变身。"],
  foot: ["Go AI prototype. Shops, photos and numbers are demo data. Platform logos belong to their owners.", "Go AI 原型。店家、照片和数字均为示范，平台标志归各自所有。"],
  demo: ["Demo", "示范"], "powered": ["Powered by Go AI", "由 Go AI 提供"],
  "tab.home": ["Home", "首页"], "tab.create": ["Create", "创作"], "tab.share": ["Share", "分享"], "tab.members": ["Members", "会员"], "tab.report": ["Report", "报告"],

  "home.powers": ["Your superpowers", "你的超能力"],
  "home.nudge": ["{n} member{s} not back in {d} days.", "{n} 位会员超过 {d} 天没来了。"],
  "home.nudgeBtn": ["Prepare welcome-back voucher", "准备回头券"],
  "home.nudgeDone": ["Welcome-back voucher queued for {n} member{s}.", "回头券已为 {n} 位会员排队发送。"],
  "home.reviews": ["{n} Google review{s} waiting for a reply", "{n} 条 Google 评价等你回复"], "home.reviewsDone": ["All Google reviews answered", "Google 评价都回复了"],


  "cr.h": ["Make a post", "做张海报"], "cr.drop": ["Snap or upload a photo", "拍照或上传照片"], "cr.dropS": ["Any phone photo works", "手机随手拍就可以"],
  "cr.or": ["or try a sample", "或用示范照片"], "cr.change": ["Change", "换照片"], "cr.yours": ["Your photo", "你的照片"],
  "cr.look": ["Pick a look", "选风格"],
  "look.clean": ["Clean", "清爽"], "look.premium": ["Premium", "高级"], "look.fun": ["Fun", "活泼"], "look.festive": ["Deepavali", "屠妖节"],
  "cr.item": ["Item", "品名"], "cr.itemPh": ["What's in the photo?", "照片里是什么？"], "cr.itemNeed": ["Type what's in your photo so the poster is right.", "写上照片里的产品，海报才不会出错。"],
  "cr.price": ["Price (optional)", "价格（可不填）"],
  "cr.magic": ["AI background", "AI 换背景"], "cr.magicS": ["Your product stays exactly as it is", "产品保持原样，只换背景"],
  "cr.magicNo": ["Demo: AI background works on the café sample photo only.", "示范版：AI 换背景只限咖啡馆示范照片。"],
  "cr.go": ["Power up my photo", "一键变大片"],
  "pu.s1": ["Reading your photo", "识别照片"], "pu.s2": ["Fixing the light", "调光调色"], "pu.s3": ["Designing 3 sizes", "设计 3 种尺寸"], "pu.s4": ["Writing captions", "写文案"],
  "pu.w1": ["Planning your week", "规划一周"], "pu.w2": ["Picking the best times", "挑选最佳时间"], "pu.w3": ["Designing 7 posts", "设计 7 个帖子"], "pu.w4": ["Writing 7 captions", "写 7 段文案"],
  "pu.r1": ["Counting your visits", "统计到店人数"], "pu.r2": ["Drawing your charts", "画图表"], "pu.r3": ["Writing it in plain words", "用白话写出来"],
  "pu.c1": ["Reading your taps", "读取你的选择"], "pu.c2": ["Writing 8 posts", "写 8 个平台的帖子"], "pu.c3": ["Checking every word", "检查每个用词"],
  "cr.done": ["Ready to post.", "可以发了！"], "cr.took": ["Made in {s} seconds. Drag to compare.", "{s} 秒完成。拖动对比前后。"],
  "po.s": ["Each platform gets its own size and style. Tap one to leave it out.", "每个平台各有专属尺寸和风格，点一下可以不发。"],
  "cr.cap": ["Caption", "文案"], "cr.another": ["Write another", "换一个"], "cr.copy": ["Copy text", "复制文案"], "cr.copied": ["Copied", "已复制"],
  "cr.share": ["Share", "分享"], "cr.save": ["Save", "保存"], "cr.saved": ["Image saved. Text copied.", "图片已保存，文案已复制。"],
  "cr.new": ["Start over", "重新开始"], "cr.bad": ["Can't open this photo. Try a JPG or PNG.", "打不开这张照片，请用 JPG 或 PNG。"],
  "po.h": ["Post to", "发布到"], "po.go": ["Post to {n} platform{s}", "发布到 {n} 个平台"], "po.none": ["Pick at least one platform", "至少选一个平台"],
  "po.done": ["Scheduled on {n} platform{s}", "已排程到 {n} 个平台"], "po.demo": ["Demo: nothing is posted.", "示范：不会真的发布。"],
  "sc.h": ["Scheduled", "已排程"], "sc.when": ["Goes out {when}, when your customers scroll the most.", "{when}发出，正是顾客最常滑手机的时候。"],
  "sc.today": ["today at {time}", "今天 {time} "], "sc.tmr": ["tomorrow at {time}", "明天 {time} "],
  "sc.auto": ["Posts by itself.", "自动发布。"], "sc.remind": ["You get a WhatsApp with the image and text ready. One tap to post.", "WhatsApp 提醒你，图片和文案都备好，一按就发。"],
  "sc.resT": ["Next day, 9 am", "第二天早上 9 点"], "sc.res": ["How it did, on WhatsApp and in your report.", "成效发到 WhatsApp，也会出现在报告里。"],
  "sc.undo": ["Undo", "撤销"], "sc.undone": ["Cancelled. Nothing will be posted.", "已取消，不会发布。"], "sc.done": ["Done", "完成"],
  "home.next": ["Your {item} poster goes out {when}", "{item} 海报{when}发出"],
  "ap.h": ["Make my whole week", "一键做完一整周"], "ap.s": ["7 posts from this one photo, planned for the best times.", "用这一张照片做 7 个帖子，排在最佳时间。"], "ap.go": ["Power up my week", "一键变出一周"],
  "wk.h": ["Your week is ready.", "一整周搞定了！"], "wk.s": ["7 posts from one photo. Approve once and Go AI posts them for you.", "一张照片变 7 个帖子。确认一次，Go AI 帮你发。"],
  "wk.saved": ["Saved for Deepavali", "已存好，屠妖节用"], "wk.wa": ["Approve on WhatsApp", "用 WhatsApp 确认"], "wk.back": ["Back to my post", "回到我的海报"], "wk.done": ["Week approved", "这周已确认"],
  "ws.online": ["online", "在线"],
  "ws.hi": ["Morning {name}! Your week is ready: 7 posts.\nReply 1 to approve all. Reply 2 to change something.", "早安 {name}！这周的 7 个帖子准备好了。\n回复 1 全部确认，回复 2 修改。"],
  "ws.r1": ["1  Approve all", "1  全部确认"], "ws.r2": ["2  Change", "2  修改"],
  "ws.ok": ["Done! 7 posts are scheduled for Facebook, Instagram and Xiaohongshu. Your results come every Monday.", "搞定！7 个帖子已排好，会发到 Facebook、Instagram 和小红书。每个星期一给你看成绩。"],
  "ws.change": ["No problem. Open any post in the app to change it.", "没问题，在 App 里点任何一个帖子就能改。"],
  "ws.demo": ["Demo: nothing is posted or sent.", "示范：不会真的发布或发送。"],

  "sh.h": ["Customer post QR", "顾客发帖 QR"], "sh.s": ["Customers scan, tap what they got and loved, and get a post written for each platform. No app, no sign-up.", "顾客扫码，点选买了什么、喜欢什么，就有每个平台专属的帖子。不用下载，不用注册。"],
  "sh.results": ["See which platforms and styles work in Report", "在报告里看哪个平台和风格最好"], "sh.themes": ["Their 6 photo styles", "顾客可选 6 种风格"], "sh.chal": ["Monthly photo challenge", "每月拍照挑战"], "sh.chalS": ["Best photo wins a RM50 voucher", "最佳照片赢 RM50 礼券"],
  "sh.go": ["Activate QR", "启用 QR"], "sh.card": ["Scan, tap, post", "扫码、点选、发布"], "sh.open": ["Open customer view", "打开顾客页面"], "sh.print": ["Print table card", "打印桌卡"],
  "f.scans": ["QR scans", "次扫码"], "f.styled": ["photos styled", "张照片美化"], "f.shares": ["share taps", "次点击分享"], "f.sharesS": ["Taps, not confirmed posts", "只算点击，不代表已发布"],
  "f.visits": ["link visits", "次链接访问"], "f.joins": ["joined as members", "位加入会员"],
  "fl.scans": ["QR scans", "扫码"], "fl.styled": ["Posts written", "写好帖子"], "fl.shares": ["Share taps", "点击分享"], "fl.joins": ["Joined as members", "加入会员"],

  "mb.h": ["Members", "会员"], "mb.club": ["{shop} Members", "{shop} 会员"], "mb.total": ["members", "位会员"], "mb.new": ["new this month", "本月新加入"], "mb.rew": ["rewards redeemed", "次奖励兑换"],
  "mb.staff": ["Open staff scan", "打开店员扫码"], "mb.join": ["Open join page", "打开加入页面"], "mb.rules": ["How it works", "怎么运作"],
  "mb.window": ["Quiet = no verified visit for {d} days", "沉睡 = 超过 {d} 天没有确认到店"], "mb.optin": ["Offers only go to members who said yes", "优惠只发给同意接收的会员"], "mb.verify": ["Stamps only after staff checks a receipt", "店员核对单据后才盖章"],

  "v.h": ["Welcome-back voucher", "回头券"], "v.terms": ["Valid 14 days. Once per person.", "14 天有效，每人限一次。"],
  "v.who": ["{a} of {b} quiet members said yes to WhatsApp offers. Only they get it.", "{b} 位沉睡会员中，有 {a} 位同意接收 WhatsApp 优惠，只发给他们。"],
  "v.msg": ["Hi {name}, we miss you at {shop}! Here's {off} on your next visit. Valid till {date}.\nReply STOP to opt out.", "嗨 {name}，{shop} 想你了！下次来享 {off}，有效期到 {date}。\n回复 STOP 取消订阅。"],
  "v.go": ["Approve and send", "确认发送"], "v.done": ["Queued for {n} member{s}", "已为 {n} 位会员排队发送"], "v.demo": ["Demo: no real messages are sent.", "示范：不会真的发出信息。"],
  "rv.h": ["Google reviews", "Google 评价"], "rv.draft": ["Go AI draft", "Go AI 草稿"], "rv.ok": ["Approve reply", "确认回复"], "rv.done": ["Reply approved", "回复已确认"],
  "rv.check": ["Low rating. Read it before you approve.", "低分评价，确认前请先看一下。"], "rv.demo": ["Demo: replies are not posted to Google.", "示范：不会真的发布到 Google。"],

  "rp.h": ["Report", "报告"], "rp.this": ["This month", "本月"], "rp.last": ["Last month", "上个月"],
  "rp.gen": ["Generate my report", "生成报告"], "rp.genS": ["Charts and plain words, in 3 seconds.", "3 秒出图表和白话总结。"],
  "rp.head": ["Members spent <b>{s}</b> here.", "会员在店里消费了 <b>{s}</b>。"],
  "rp.headS": ["{r} stamped visits and {j} new members.", "{r} 次盖章回店，{j} 位新会员。"],
  "rp.vsSpend": ["Spent by members", "会员消费"], "rp.vsPlan": ["Go AI Pro, a month", "Go AI 专业版每月"],
  "rp.cav": ["From receipts your staff stamped. Some of these visits would have happened anyway, so watch the trend, not one month.", "来自店员盖章的单据。有些回店本来就会发生，请看趋势，不只看一个月。"],
  "rp.vs": ["vs same days last month", "对比上月同期"],
  "k.photos": ["photos made", "张照片"], "k.shares": ["share taps", "次点击分享"], "k.joins": ["new members", "位新会员"], "k.returns": ["verified returns", "次确认回店"],
  "ch.daily": ["Customer posts per day", "每天的顾客帖子"], "ch.dailyS": ["Weekends are your busiest days.", "周末最热闹。"],
  "ch.run": ["Verified return visits, running total", "确认回店，累计"], "ch.this": ["This month", "本月"], "ch.last": ["Last month", "上个月"],
  "ch.funnel": ["From scan to member", "从扫码到会员"], "ch.ofScans": ["{p}% of scans", "占扫码 {p}%"],
  "ch.styles": ["Most shared photo styles", "分享最多的照片风格"], "ch.plat": ["Shares by platform", "各平台分享"], "ch.loved": ["What customers loved", "顾客最喜欢"],
  "ch.table": ["See the numbers", "查看数字"], "ch.day": ["Day", "日期"], "ch.photosCol": ["Posts", "帖子"],
  "tip.photos": ["{n} post{s}", "{n} 篇帖子"],
  "rp.s4": ["Do this next", "下一步"], "r.money": ["sales rung up with a redeemed voucher", "使用回头券时的消费额"], "r.moneyS": ["Not proof of extra sales.", "不代表额外营收。"],
  "rp.pdf": ["Save as PDF", "存成 PDF"], "rp.reset": ["Reset demo data", "重置示范数据"], "rp.resetDone": ["Demo data reset", "示范数据已重置"],
  "nx.quiet": ["{n} member{s} gone quiet. Send the welcome-back voucher.", "{n} 位会员沉睡了，发回头券吧。"],
  "nx.sent": ["Welcome-back vouchers are out. Check redemptions next Monday.", "回头券已发出，下星期一看看兑换情况。"],
  "lu.k": ["Level up!", "升级啦！"], "lu.h": ["Level {n}", "{n} 级"], "lu.s": ["Your shop's powers keep growing. Keep going!", "你的店超能力越来越强，继续加油！"],

  "c.h": ["Make your photo look famous.", "让你的照片秒变大片。"], "c.take": ["Take or upload a photo", "拍照或上传照片"], "c.or": ["or use the shop's photo", "或用店家的照片"], "c.free": ["No app. No sign-up.", "不用下载，不用注册。"],
  "c.tellH": ["Tell us in 3 taps.", "点 3 下告诉我们。"], "c.tellS": ["Your post is written from your own answers.", "帖子根据你自己的选择来写。"],
  "c.t1": ["What did you get?", "你买了什么？"], "c.t2": ["What did you love?", "你喜欢什么？"], "c.t2s": ["up to 3", "最多 3 个"],
  "c.write": ["Write my posts", "帮我写帖子"], "c.need": ["Pick what you got and one thing you loved.", "选一个买了的，再选一个喜欢的。"],
  "c.swipe": ["Swipe to pick a style", "左右滑，选风格"], "c.use": ["Use this style", "就用这个"],
  "c.star": ["Your name on the cover (optional)", "封面上的名字（可不填）"], "c.starLine": ["Starring {name}", "封面人物：{name}"],
  "c.ready": ["Your posts are ready.", "你的帖子写好了。"], "c.readyS": ["One for each platform. Edit anything.", "每个平台一篇，随便改。"], "c.where": ["Platforms", "平台"],
  "c.title": ["Title", "标题"], "c.text": ["Post", "正文"], "c.post": ["Post on {p}", "发到{p}"], "c.save": ["Save photo", "保存照片"], "c.another": ["Write another version", "换一个版本"],
  "c.stars": ["Your rating", "你的评分"], "c.starsS": ["Pick your own stars. Only post if it's your real experience.", "星级由你自己选。只在是真实体验时发布。"],
  "c.how": ["Copied. Paste it in {p}.", "已复制，到{p}贴上就好。"], "c.famous": ["You look famous.", "你红了！"],
  "ck.h": ["Content check", "内容检查"], "ck.pass": ["{n}/{m} passed", "{n}/{m} 项通过"],
  "ck.claims": ["No over-the-top claims", "没有极限词或夸大宣传"], "ck.claimsBad": ["Over-the-top words: {w}", "发现极限词：{w}"], "ck.fix": ["Fix", "修正"],
  "ck.tags": ["Hashtags: {n} of {m} allowed", "标签：{n} 个，最多 {m} 个"], "ck.tagsBad": ["{n} hashtag{s}, keep it to {m}", "{n} 个标签，最多 {m} 个"],
  "ck.noTags": ["No hashtags, right for this platform", "不加标签，适合这个平台"], "ck.noTagsBad": ["Remove hashtags for this platform", "这个平台不适合加标签"],
  "ck.len": ["Length fits {p}", "长度适合{p}"], "ck.long": ["Too long for {p}", "对{p}来说太长了"], "ck.short": ["A bit short for {p}", "对{p}来说有点短"],
  "ck.stars": ["Stars picked by you", "星级由你自己选"], "ck.starsBad": ["Pick your stars first", "请先选星级"], "ck.real": ["Written from your own taps", "根据你自己的选择写成"],
  "c.join": ["Join {shop} Members", "加入 {shop} 会员"], "c.joinS": ["Collect stamps on your phone. {reward}.", "用手机集印章。{reward}。"],
  "c.joinBtn": ["Join, it's free", "免费加入"], "c.skip": ["No thanks", "不用了"],
  "c.name": ["Your name", "你的名字"], "c.phone": ["Phone (optional)", "手机号码（可不填）"],
  "c.terms": ["I agree to the membership terms and privacy notice.", "我同意会员条款和隐私声明。"], "c.mkt": ["Send me offers on WhatsApp. I can stop anytime.", "用 WhatsApp 发优惠给我，随时可以取消。"],
  "c.joinGo": ["Get my member card", "领取会员卡"], "c.card": ["Show this at the counter", "结账时出示这个"],
  "c.stamps": ["{n} of {g} stamps", "{n} / {g} 个印章"], "c.member": ["You're a member: {n} of {g} stamps", "你是会员：{n} / {g} 个印章"],
  "c.show": ["Show my card", "出示会员卡"], "c.again": ["Start again", "重新开始"],
  "c.back": ["Demo: back to owner app", "示范：回到店主 App"], "c.staff": ["Demo: open staff scan", "示范：打开店员扫码"], "c.you": ["You", "你"],
  "th.xhs": ["Xiaohongshu cover", "小红书封面"], "th.mag": ["Magazine", "杂志封面"], "th.receipt": ["Receipt", "收据"], "th.film": ["Film", "胶片"], "th.cute": ["Cute", "可爱"], "th.simple": ["Simple", "简约"],
  "s.h": ["Staff scan", "店员扫码"], "s.scan": ["Scan member QR", "扫会员 QR"], "s.scanS": ["Demo: camera is simulated", "示范：相机为模拟"],
  "s.none": ["No members yet. Join from the customer page first.", "还没有会员，请先从顾客页面加入。"], "s.receipt": ["Receipt number", "单据号码"], "s.amount": ["Receipt total (RM)", "单据金额（RM）"],
  "s.add": ["Add stamp", "盖印章"], "s.redeem": ["Redeem reward", "兑换奖励"], "s.ok": ["Stamp added", "已盖章"], "s.okr": ["Reward redeemed", "奖励已兑换"],
  "s.dup": ["This receipt was already used.", "这张单据已经用过了。"], "s.nor": ["Not enough stamps yet.", "印章还不够。"], "s.needr": ["Type the receipt number first.", "请先输入单据号码。"],
  "s.ready": ["Reward ready!", "可以兑换奖励！"], "s.newr": ["New receipt", "换新单据"],
};
const zh = () => S.lang === "zh";
// {s} is the English plural ending for {n}: "1 platform", "2 platforms"
const t = (k, v = {}) => (T[k]?.[zh() ? 1 : 0] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x] ?? (x === "s" && v.n !== 1 ? "s" : ""));
const L = (x) => (Array.isArray(x) ? x[zh() ? 1 : 0] : x);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const loc = () => (zh() ? "zh-CN" : "en-MY");
const pname = (p) => L(PLATS[p].name);

/* ======================= landing content ======================= */
const WHY = [
  [["Platforms", "平台"], ["One Xiaohongshu post pasted everywhere", "一篇小红书文案到处贴"], ["8 platforms, each in its own format", "8 个平台，各有专属格式"]],
  [["Whose story", "谁的故事"], ["A made-up review", "编出来的评价"], ["The customer's own photo and taps", "顾客自己的照片和选择"]],
  [["Content check", "内容检查"], ["A green label", "一个绿色标签"], ["A real check for over-the-top claims, with one-tap fix", "真的检查极限词和夸大宣传，一键修正"]],
  [["Google reviews", "Google 评价"], ["The same marketing text", "同一篇营销文"], ["An honest review, stars picked by the customer", "真实评价，星级由顾客自己选"]],
  [["After they post", "发布之后"], ["Nothing", "没有了"], ["Member card, stamps, welcome-back vouchers", "会员卡、印章、回头券"]],
  [["Your own posts", "店家自己的帖子"], ["Not included", "没有"], ["Posters in 60s, a week on autopilot, WhatsApp approval", "60 秒海报、一周自动驾驶、WhatsApp 确认"]],
  [["Results", "成效"], ["No numbers", "没有数据"], ["Live report with charts", "实时报告和图表"]],
];
const WHY_PRICE = [["Price", "价格"], ["About RM20,000 for one feature", "约 RM20,000，只有一个功能"], ["The whole growth loop", "整套增长循环"]];
// mo = monthly price; paying yearly costs 10 months (2 months free)
const PLANS = [
  { k: "pl.1", mo: 2880, feats: [["1 outlet", "1 间店"], ["All 4 powers", "四大超能力"], ["Customer posts on 8 platforms", "8 个平台的顾客帖子"], ["Members, stamps, vouchers", "会员、印章、回头券"], ["Monthly report", "每月报告"]] },
  { k: "pl.2", hot: true, mo: 4680, feats: [["Everything in Pro", "专业版全部功能"], ["Done-with-you content plan", "陪跑内容计划"], ["Festive campaigns", "节日活动策划"], ["Staff training", "员工培训"], ["Priority WhatsApp support", "WhatsApp 优先支援"]] },
  { k: "pl.3", mo: 8800, from: true, sub: ["For 3 or more outlets", "适合 3 间以上分店"], feats: [["Every outlet in one report", "所有分店一份报告"], ["HQ approvals", "总部审批"], ["Your own brand templates", "专属品牌模板"], ["A dedicated success manager", "专属成功经理"]] },
];
let bill = "yr";
const rm = (n) => "RM" + Math.round(n).toLocaleString("en-MY");
// extra visits a month that cover the plan, and that as "1 in n" of a month's customers
function payback(price, spend, perDay) { const v = Math.ceil(price / spend); return { v, n: Math.floor((perDay * 30) / v), d: Math.ceil(v / 30) }; }
const PB = { spend: 18, day: 120 };
function paintPayback() {
  const price = bill === "yr" ? (PLANS[0].mo * 10) / 12 : PLANS[0].mo, r = payback(price, PB.spend, PB.day);
  $("[data-pb-spend]").textContent = rm(PB.spend);
  $("[data-pb-day]").textContent = PB.day;
  $("[data-pb-res]").innerHTML = r.n >= 2 ? t("pb.res", { n: r.n }) : t("pb.resAll", { v: r.v });
  $("[data-pb-det]").textContent = t("pb.det", { v: r.v, d: r.d, p: rm(price) });
}
function paintPlans() {
  const y = bill === "yr";
  $("[data-billseg]").innerHTML = ["mo", "yr"].map((b) => `<button data-act="bill" data-v="${b}" aria-pressed="${bill === b}">${t("bill." + b)}${b === "yr" ? `<span class="free">${t("bill.free")}</span>` : ""}</button>`).join("");
  $("[data-billseg]").setAttribute("aria-label", t("bill.h"));
  $("[data-plans]").innerHTML = PLANS.map((p) => {
    const amt = rm(y ? p.mo * 10 : p.mo), sub = p.sub ? L(p.sub) : y ? t("pl.yrSub", { m: rm((p.mo * 10) / 12) }) : t("pl.moSub");
    return `<div class="plan ${p.hot ? "hot" : ""}">${p.hot ? `<span class="hot-tag">${t("pl.pick")}</span>` : ""}<h3 class="t-h3">${t(p.k)}</h3><p class="price">${p.from ? t("pl.from", { p: amt }) : amt}<small>${t(y ? "pl.yr" : "pl.mo")}</small></p><p class="mo">${sub}</p><ul>${p.feats.map((f) => `<li>${L(f)}</li>`).join("")}</ul></div>`;
  }).join("");
  $("[data-pb]").innerHTML = `<h3 class="t-h3">${t("pb.h")}</h3>
    <label class="pb-f"><span>${t("pb.spend")}<b data-pb-spend></b></span><input type="range" data-in="pbSpend" min="5" max="150" step="1" value="${PB.spend}"></label>
    <label class="pb-f"><span>${t("pb.day")}<b data-pb-day></b></span><input type="range" data-in="pbDay" min="20" max="600" step="10" value="${PB.day}"></label>
    <p class="pb-res" data-pb-res aria-live="polite"></p><p class="pb-det" data-pb-det></p><p class="fine">${t("pb.note")}</p>`;
  $("[data-promise]").innerHTML = `${seal(44)}<div><b>${t("pr.h")}</b><p>${t("pr.s")}</p></div>`;
  paintPayback();
}
const IC = {
  create: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  week: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M9 15l2 2 4-4"/></svg>',
};
const WEEK_TILE = { ic: "week", k: "week", href: "#/week", tint: "#FDEEDF", ict: "#B4530F" };

/* ======================= demo shops ======================= */
const MERCH = {
  cafe: {
    id: "cafe", name: "Laman Kopi", short: "LAMAN", handle: "@lamankopi", tags: "#LamanKopi #JBcafe", shopTag: "LamanKopi", emoji: "☕",
    city: ["Johor Bahru", "新山"], owner: ["Mei Ling", "Mei Ling"], color: "#1E5B3A", cat: ["café", "咖啡馆"], catTag: ["JBcafe", "新山咖啡"], got: ["got", "点了"],
    item: ["Iced Matcha Latte", "冰抹茶拿铁"], price: "RM 12.90", avg: "17.50",
    photo: "img/matcha-raw.jpg", magic: "img/matcha-magic.jpg", cust: "img/friends-raw.jpg",
    goal: 8, reward: ["8 stamps = 1 free drink", "集满 8 个印章 = 免费饮料一杯"], quietDays: 30, off: ["RM5 off any drink", "任何饮料减 RM5"],
    base: { posts: 12, styled: 186, scans: 240, shares: 74, visits: 131, joins: 46, members: 212, returns: 248, spend: 4346, quiet: 18, yes: 14, sent: 12, redeemed: 7, rewards: 9, money: 84 },
    last: { posts: 11, styled: 205, scans: 290, shares: 81, visits: 160, joins: 52, returns: 265, spend: 4640, sent: 10, redeemed: 5, money: 58 },
    styles: [["xhs", 0.3], ["receipt", 0.24], ["mag", 0.2], ["film", 0.12], ["cute", 0.09], ["simple", 0.05]],
    menu: [["Iced Matcha Latte", "冰抹茶拿铁"], ["Kopi O", "咖啡乌"], ["Kaya Toast", "咖椰吐司"], ["Hojicha Latte", "焙茶拿铁"], ["Butter Croissant", "牛油可颂"]],
    vibes: {
      tasty: { chip: ["Tasty", "味道好"], en: "the {item} was seriously good", zh: "{item}味道真的很好", short: ["so good", "味道超好"], tag: ["#yum", "#好吃"] },
      pretty: { chip: ["Photogenic", "好出片"], en: "every corner is photo-worthy", zh: "随手拍都好出片", short: ["so photogenic", "超出片"], tag: ["#cafehopping", "#拍照打卡"] },
      cosy: { chip: ["Cosy", "很舒服"], en: "it's so cosy I stayed longer than planned", zh: "环境很舒服，不知不觉坐了好久", short: ["so cosy", "好舒服"], tag: ["#cosyvibes", "#氛围感"] },
      staff: { chip: ["Friendly staff", "店员亲切"], en: "the staff were really friendly", zh: "店员很亲切", short: ["lovely staff", "店员超暖"], tag: ["#goodvibes", "#服务好"] },
      value: { chip: ["Good value", "性价比高"], en: "it's great value for what you get", zh: "性价比也很高", short: ["great value", "性价比高"], tag: ["#worthit", "#性价比"] },
      fast: { chip: ["Quick service", "出餐快"], en: "my order came out fast", zh: "出餐很快", short: ["quick service", "出餐快"], tag: ["#quickbite", "#出餐快"] },
      work: { chip: ["Good for work", "适合办公"], en: "it's quiet enough to get work done", zh: "很安静，适合带电脑来办公", short: ["great for work", "适合办公"], tag: ["#workfromcafe", "#办公咖啡馆"] },
    },
    withQ: ["Who with?", "和谁一起？"],
    with: { solo: { chip: ["Solo", "一个人"], en: "Some me-time", zh: "一个人的小确幸" }, friends: { chip: ["Friends", "朋友"], en: "Catch-up with friends", zh: "和朋友聚聚" }, family: { chip: ["Family", "家人"], en: "Family day out", zh: "一家人出来走走" }, partner: { chip: ["Partner", "另一半"], en: "Date day", zh: "和另一半约会" } },
    platW: { xhs: 27, ig: 24, fb: 14, tiktok: 12, wa: 9, google: 7, threads: 4, lemon8: 3 },
    loved: { tasty: 64, pretty: 51, cosy: 38, staff: 33, value: 21, fast: 12, work: 9 },
    cover: { en: ["Today's best seat", "Iced matcha, extra happy", "Laman Kopi, JB"], zh: ["今日好位子", "冰抹茶，快乐加倍", "Laman Kopi，新山"] },
    receipt: { en: [["GOOD MOOD", "RM0.00"], ["BEST FRIEND", "FREE"], ["ICED MATCHA", "YES"]], zh: [["好心情", "RM0.00"], ["好朋友", "免费"], ["冰抹茶", "有"]] },
    cute: ["SO GOOD!", "太赞了!"],
    reviews: [
      { id: "r1", who: "Aisyah R.", stars: 5, text: ["Lovely iced matcha in JB. Staff super friendly!", "新山很好喝的冰抹茶，店员超友善！"], reply: ["Thank you, Aisyah! So glad you loved the matcha. See you again soon. Mei Ling", "谢谢 Aisyah！很开心你喜欢我们的抹茶，下次见～ Mei Ling"] },
      { id: "r2", who: "Daniel T.", stars: 2, text: ["Waited 20 minutes for my drink on Saturday.", "星期六等了 20 分钟才拿到饮料。"], reply: ["Sorry about the wait, Daniel. Saturday got busier than we planned, so we've added a second barista for weekends. Hope to do better next time. Mei Ling", "抱歉让你久等了，Daniel。星期六比我们预计的忙，周末已经多加一位咖啡师。希望下次让你满意。Mei Ling"] },
    ],
    next: [["The Xiaohongshu cover was the most shared style. Keep it on the table card.", "小红书封面分享最多，桌卡继续用它。"], ["Most posts happen on weekends. Put a table card on every table Saturday morning.", "帖子大多在周末，星期六早上每张桌子都放桌卡。"]],
  },
  pet: {
    id: "pet", name: "Go Paws", short: "GO PAWS", handle: "@gopaws", tags: "#GoPaws #bettafish", shopTag: "GoPaws", emoji: "🐠",
    city: ["Johor Bahru", "新山"], owner: ["Go Paws team", "Go Paws 团队"], color: "#0B4F6C", cat: ["pet shop", "宠物店"], catTag: ["JBpets", "新山宠物店"], got: ["picked up", "买了"],
    item: ["Halfmoon Betta", "半月斗鱼"], price: "", avg: "58.00",
    photo: "img/betta-raw.jpg", magic: null, cust: "img/betta-raw.jpg",
    goal: 10, reward: ["10 stamps = RM10 off", "集满 10 个印章 = 减 RM10"], quietDays: 60, off: ["RM10 off your next visit", "下次消费减 RM10"],
    base: { posts: 9, styled: 134, scans: 171, shares: 58, visits: 96, joins: 31, members: 148, returns: 96, spend: 5568, quiet: 11, yes: 9, sent: 6, redeemed: 3, rewards: 4, money: 126 },
    last: { posts: 8, styled: 150, scans: 210, shares: 63, visits: 105, joins: 37, returns: 113, spend: 6554, sent: 5, redeemed: 2, money: 88 },
    styles: [["mag", 0.3], ["xhs", 0.24], ["cute", 0.2], ["film", 0.12], ["receipt", 0.09], ["simple", 0.05]],
    menu: [["Halfmoon Betta", "半月斗鱼"], ["Cat food", "猫粮"], ["Aquarium plants", "水草"], ["Tank setup", "鱼缸造景"], ["Dog treats", "狗零食"]],
    vibes: {
      healthy: { chip: ["Healthy fish", "鱼很健康"], en: "the fish look healthy and active", zh: "鱼都很健康有活力", short: ["healthy fish", "鱼超健康"], tag: ["#aquarium", "#观赏鱼"] },
      advice: { chip: ["Expert advice", "讲解专业"], en: "the staff explained everything clearly", zh: "店员讲解很专业", short: ["real experts", "讲解专业"], tag: ["#fishkeeping", "#养鱼"] },
      variety: { chip: ["Big variety", "选择多"], en: "there's so much to choose from", zh: "选择超多", short: ["so much choice", "选择超多"], tag: ["#petshop", "#宠物店"] },
      clean: { chip: ["Clean shop", "店很干净"], en: "the shop is clean and bright", zh: "店里很干净明亮", short: ["super clean", "超干净"], tag: ["#cleanshop", "#干净"] },
      value: { chip: ["Fair prices", "价格公道"], en: "prices are fair", zh: "价格很公道", short: ["fair prices", "价格公道"], tag: ["#worthit", "#性价比"] },
      staff: { chip: ["Friendly staff", "店员亲切"], en: "the staff were really friendly", zh: "店员很亲切", short: ["lovely staff", "店员超暖"], tag: ["#goodvibes", "#服务好"] },
    },
    withQ: ["Who is it for?", "买给谁？"],
    with: { cat: { chip: ["My cat", "猫主子"], en: "Shopping for my cat", zh: "给猫主子采购" }, dog: { chip: ["My dog", "狗狗"], en: "Treats run for my dog", zh: "给狗狗买零食" }, fish: { chip: ["My fish", "我的鱼"], en: "New friends for my tank", zh: "给鱼缸添新成员" }, gift: { chip: ["A gift", "送人"], en: "Picking a gift", zh: "挑礼物" } },
    platW: { ig: 25, fb: 20, tiktok: 18, xhs: 14, wa: 10, google: 7, threads: 4, lemon8: 2 },
    loved: { healthy: 41, advice: 37, variety: 30, staff: 22, clean: 18, value: 14 },
    cover: { en: ["Star of the tank", "Fins of the month", "Go Paws, JB"], zh: ["本月鱼缸明星", "很美的尾鳍", "Go Paws，新山"] },
    receipt: { en: [["NEW BEST FRIEND", "PRICELESS"], ["TANK GOALS", "MET"], ["HAPPY FISH", "YES"]], zh: [["新朋友", "无价"], ["鱼缸梦想", "达成"], ["开心小鱼", "有"]] },
    cute: ["SO CUTE!", "太可爱了!"],
    reviews: [
      { id: "r1", who: "Jason L.", stars: 5, text: ["Huge betta selection and the staff explained everything.", "斗鱼选择超多，店员讲解得很清楚。"], reply: ["Thanks, Jason! Enjoy your new betta, and drop by if you need any tank tips.", "谢谢 Jason！好好享受你的新斗鱼，鱼缸有问题随时来问我们。"] },
      { id: "r2", who: "Priya K.", stars: 2, text: ["Parking was full and I had to leave.", "停车位满了，只好离开。"], reply: ["Sorry about that, Priya. Weekend parking is tight. The lot behind the shop usually has space. Hope to see you soon.", "抱歉，Priya。周末停车位比较紧，店后面的停车场通常有位。希望很快见到你。"] },
    ],
    next: [["Magazine was the favourite style for fish photos. Keep it for new arrivals.", "鱼的照片最爱杂志风格，新到货继续用它。"], ["Put the QR card next to the betta wall. That's where people take photos.", "把 QR 桌卡放在斗鱼墙旁边，大家都在那里拍照。"]],
  },
};
const ZH_GLYPHS = JSON.stringify(MERCH) + JSON.stringify(T) + "屠妖节快乐新品快乐总计谢谢光临，欢迎再来年月号期封面人物：";

/* ======================= state, ledger, demo series ======================= */
const fresh = () => ({ posts: 0, styled: 0, shares: 0, joins: 0, returns: 0, rewards: 0, sent: 0, member: null, receipts: [], qr: false, chal: true, quietSent: false, weekOk: false, reviews: {}, byPlat: {}, loved: {} });
const KEY = "goai.demo.v3";
let S;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch { S = null; }
if (!S?.d) S = { lang: "en", m: "cafe", d: { cafe: fresh(), pet: fresh() } };
let mCache;
function M() {
  const base = MERCH[S.m], nm = (S.shop || "").trim();
  if (!nm) return base;
  if (mCache?.k === S.m + nm) return mCache.m;
  const words = nm.split(/\s+/), tag = nm.replace(/[^\p{L}\p{N}]/gu, "");
  const m = { ...base, name: nm, short: (nm.length <= 12 ? nm : words.reduce((a, b) => (b.length > a.length ? b : a))).toUpperCase(),
    handle: "@" + tag.toLowerCase(), shopTag: tag, tags: `#${tag} #${base.catTag[0]}`, owner: ["boss", "老板"],
    cover: { en: [...base.cover.en.slice(0, 2), `${nm}, JB`], zh: [...base.cover.zh.slice(0, 2), `${nm}，新山`] } };
  mCache = { k: S.m + nm, m };
  return m;
}
const D = () => S.d[S.m];
const n = (k) => M().base[k] + (D()[k] || 0);
const photosMade = () => n("posts") + n("styled");
const membersTotal = () => M().base.members + D().joins;
const quietLeft = () => (D().quietSent ? 0 : M().base.quiet);
// power points: a usage score, not a sales claim. 75 points per level.
const power = () => { const p = photosMade() + n("joins") * 3 + n("returns"); return { p, lv: Math.floor(p / 75) + 1, pct: (p % 75) / 75, toNext: 75 - (p % 75) }; };
const save = () => {
  const d = S.d[S.m], lv = power().lv;
  if (!d.lv) d.lv = lv;
  else if (lv > d.lv) { d.lv = lv; d.lvPending = lv; }
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {}
};

function addStamp(d, receipt, amount = 0) {
  const r = String(receipt || "").trim().toUpperCase();
  if (!d.member) return "nomember";
  if (!r) return "needr";
  if (d.receipts.includes(r)) return "dup";
  d.receipts.push(r); d.member.stamps++; d.returns++; d.spend = (d.spend || 0) + (parseFloat(amount) || 0);
  return "ok";
}
function redeem(d, goal) {
  if (!d.member) return "nomember";
  if (d.member.stamps < goal) return "nor";
  d.member.stamps -= goal; d.rewards++;
  return "okr";
}
const seeded = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
// whole numbers that add up to `total` exactly, in proportion to the weights (largest remainder)
function split(total, weights) {
  const sum = weights.reduce((a, b) => a + b, 0), raw = weights.map((w) => (w / sum) * total), out = raw.map(Math.floor);
  const rem = total - out.reduce((a, b) => a + b, 0);
  raw.map((x, i) => [x - out[i], i]).sort((a, b) => b[0] - a[0]).slice(0, rem).forEach(([, i]) => out[i]++);
  return out;
}
const spread = (total, days, seed, weekend) => { const rnd = seeded(seed); return split(total, days.map((d) => (d.getDay() % 6 === 0 ? weekend : 1) * (0.7 + rnd() * 0.6))); };
const cumsum = (a) => a.reduce((o, v) => (o.push((o.at(-1) || 0) + v), o), []);
function monthDays(y, mo, upto) { const last = new Date(y, mo + 1, 0).getDate(); return Array.from({ length: upto ?? last }, (_, i) => new Date(y, mo, i + 1)); }
function series() {
  const m = M(), d = D(), now = new Date(), seed = m.id === "cafe" ? 11 : 23;
  const days = monthDays(now.getFullYear(), now.getMonth(), now.getDate());
  const lastDays = monthDays(now.getFullYear(), now.getMonth() - 1);
  const styled = spread(m.base.styled, days, seed, 1.9), returns = spread(m.base.returns, days, seed + 5, 1.5);
  styled[styled.length - 1] += d.styled; returns[returns.length - 1] += d.returns;
  return {
    days, styled, returns, monthLen: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
    lastDays, lastStyled: spread(m.last.styled, lastDays, seed + 1, 1.9), lastReturns: spread(m.last.returns, lastDays, seed + 6, 1.5),
  };
}
function platCounts(last) {
  const m = M(), d = D(), ids = Object.keys(m.platW), base = split(last ? m.last.shares : m.base.shares, ids.map((k) => m.platW[k]));
  return ids.map((p, i) => [p, base[i] + (last ? 0 : d.byPlat[p] || 0)]).sort((a, b) => b[1] - a[1]);
}
function lovedCounts(last) {
  const m = M(), d = D();
  return Object.entries(m.loved).map(([k, v]) => [k, last ? Math.round(v * 0.72) : v + (d.loved[k] || 0)]).sort((a, b) => b[1] - a[1]);
}

/* ======================= the customer post writer ======================= */
// Every post is built only from what the customer tapped: what they got, what they loved, who with.
// Nothing is invented: no prices, no claims, no experiences they did not pick.
const listEn = (a) => (a.length < 2 ? a[0] : `${a.slice(0, -1).join(", ")} and ${a.at(-1)}`);
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
function writePost(pid, lang, inp, k = 0) {
  const m = inp.m, z = lang === "zh", li = z ? 1 : 0;
  const items = (inp.items.length ? inp.items : [0]).map((i) => m.menu[i][li]);
  const item = items[0], itemsTxt = z ? items.join("、") : listEn(items);
  const keys = inp.vibes.length ? inp.vibes : [Object.keys(m.vibes)[0]];
  const rot = keys.map((_, i) => m.vibes[keys[(i + k) % keys.length]]);
  const sent = rot.map((v) => v[lang].replace("{item}", item)), short = rot[0].short[li];
  // once the post has named the item, say "it" instead of naming it twice
  const after = items.length > 1 ? sent : rot.map((v) => (z ? v.zh.replace("{item}", "") : v.en.replace("the {item}", "it")));
  const w = m.with[inp.with], shop = m.name, city = m.city[li], emo = m.emoji, got = m.got[li];
  const pick = (a) => a[k % a.length];
  const tags = (count) => {
    const base = z ? [`#${m.shopTag}`, `#${m.catTag[1]}`, `#${item.replace(/\s/g, "")}`, "#探店", "#马来西亚"] : [`#${m.shopTag}`, `#${m.catTag[0]}`, `#${city.replace(/\s/g, "")}`, `#${item.replace(/\s/g, "")}`];
    return [...new Set([...base, ...rot.map((v) => v.tag[li])])].slice(0, count).join(" ");
  };
  const cn = (a) => a.join("，"), en = (a) => a.map(cap).join(". ");
  switch (pid) {
    case "xhs": {
      const titles = z ? [`${city}${m.cat[1]}｜${item}${short}`, `${item}${short}！值得专程来`, `${w ? w.zh + "，" : ""}被${shop}圈粉了`]
        : [`${item}, ${short}!`, `${shop}: ${short}`, `${city} find: ${shop}`];
      let title = pick(titles);
      if ([...title].length > (z ? 20 : 40)) title = z ? `${item}${short}！` : `${shop}: ${short}`;
      const close = z ? ["下次还会再来～", "推荐给大家！", "已经想好下次点什么了😆"] : ["Will be back for sure.", "Highly recommend!", "Already planning my next visit 😆"];
      const body = z ? `${w ? w.zh : "今天"}${emo}\n来了${shop}，${got}${itemsTxt}。\n${cn(after)}！\n${pick(close)}\n\n📍${shop}·${city}\n${tags(10)}`
        : `${w ? w.en : "Today"} ${emo}\nVisited ${shop} and ${got} the ${itemsTxt}.\n${en(after)}!\n${pick(close)}\n\n📍${shop}, ${city}\n${tags(10)}`;
      return { title, body };
    }
    case "ig": {
      const open = z ? ["今日份快乐", "收藏这一刻", "又来报到"] : ["Today's happy place", "Saving this moment", "Back again"];
      return { body: z ? `${pick(open)}${emo}\n${shop}的${item}，${cn(sent.slice(0, 2))}。\n📍${shop}·${city}\n\n${tags(8)}` : `${pick(open)} ${emo}\n${en(sent.slice(0, 2))}.\n📍${shop}, ${city}\n\n${tags(8)}` };
    }
    case "fb":
      return { body: z ? `${w ? w.zh + "，" : ""}来了${shop}${emo}\n${got}${itemsTxt}，${cn(after)}。\n在${city}的朋友可以去看看！ ${m.handle}` : `${w ? w.en + " at " : "Visited "}${shop} ${emo}\n${cap(got)} the ${itemsTxt}, and ${after.join(", ")}.\nWorth a visit if you're in ${city}! ${m.handle}` };
    case "threads":
      return { body: z ? `${pick([`${shop}的${item}，${short}。就这样，推荐。`, `${city}的朋友，${shop}，${short}。`])} #${m.shopTag}` : `${pick([`${shop}, ${city}: ${item}, ${short}. That's the post.`, `Note to self: ${shop} is ${short}.`])} #${m.shopTag}` };
    case "tiktok":
      return { body: z ? `原来${city}有这样的${m.cat[1]}！${sent[0]}${emo}\n${tags(3)} #fyp` : `POV: you found the ${city} ${m.cat[0]} where ${sent[0]} ${emo}\n${tags(3)} #fyp` };
    case "lemon8": {
      const many = rot.length > 1;
      return {
        title: z ? (many ? `喜欢${shop}的${rot.length}个理由` : `为什么我喜欢${shop}`) : many ? `${rot.length} reasons I love ${shop}` : `Why I love ${shop}`,
        body: `${emo} ${w ? w[lang] : ""}\n${sent.map((s, i) => `${i + 1}. ${z ? s : cap(s)}`).join("\n")}\n📍${shop}${z ? "·" : ", "}${city}\n${tags(6)}`,
      };
    }
    case "google": {
      const open = z ? { 5: "这次来很满意。", 4: "整体不错。", 3: "还可以。", 2: "这次体验一般。", 1: "这次有点失望。" } : { 5: "Really enjoyed my visit.", 4: "Good visit overall.", 3: "It was okay.", 2: "Not my best visit.", 1: "Disappointing visit this time." };
      return { body: z ? `${inp.stars ? open[inp.stars] : ""}${got}${itemsTxt}，${cn(after)}。${w ? w.zh + "。" : ""}` : `${inp.stars ? open[inp.stars] + " " : ""}I ${got} the ${itemsTxt}. ${en(after)}.${w ? " " + w.en + "." : ""}` };
    }
    default:
      return { body: z ? `${shop}的${item}${emo} ${short}！` : `${item} at ${shop} ${emo} ${cap(short)}!` };
  }
}

/* ---- content check: real rules, not a badge ---- */
const ABS = ["最好", "最强", "最佳", "最便宜", "最低价", "第一", "顶级", "极致", "国家级", "全网", "百分百", "保证", "绝对", "根治", "治愈", "特效", "无敌", "the best", "best ever", "number one", "#1", "100%", "guaranteed", "guarantee", "cure", "miracle"];
const FIX = { 最好: "很好", 最强: "很强", 最佳: "很棒", 最便宜: "实惠", 最低价: "实惠", 第一: "超", 顶级: "高级", 极致: "很", 国家级: "", 全网: "", 百分百: "", 保证: "", 绝对: "真的", 根治: "改善", 治愈: "舒缓", 特效: "", 无敌: "超", "the best": "really good", "best ever": "really good", "number one": "a favourite", "#1": "a favourite", "100%": "", guaranteed: "", guarantee: "", cure: "help", miracle: "lovely" };
const LIM = { xhs: { tags: 10, title: [20, 40], len: 1000 }, ig: { tags: 30, len: 2200 }, fb: { tags: 5, len: 5000 }, tiktok: { tags: 8, len: 2200 }, threads: { tags: 1, len: 500 }, lemon8: { tags: 10, title: [30, 60], len: 1000 }, google: { tags: 0, min: 30, len: 4000 }, wa: { tags: 0, len: 700 } };
const findClaims = (text) => { const low = text.toLowerCase(), hit = ABS.filter((w) => low.includes(w.toLowerCase())); return hit.filter((w) => !hit.some((o) => o !== w && o.includes(w))); };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function fixText(s) {
  for (const w of Object.keys(FIX).sort((a, b) => b.length - a.length)) s = s.replace(new RegExp(escRe(w), "gi"), FIX[w]);
  return s.replace(/ {2,}/g, " ").replace(/ ([.,!])/g, "$1").replace(/[,，]\s*([.!?。！？])/g, "$1");
}
function checkPost(pid, lang, post, stars) {
  const lim = LIM[pid], body = post.body || "", claims = findClaims(`${post.title || ""}\n${body}`);
  const tags = (body.match(/#[^\s#]+/g) || []).length, len = [...body].length, p = pname(pid);
  const titleLong = lim.title && post.title && [...post.title].length > lim.title[lang === "zh" ? 0 : 1];
  const out = [
    claims.length ? { bad: true, msg: t("ck.claimsBad", { w: claims.join(", ") }), fix: true } : { msg: t("ck.claims") },
    tags <= lim.tags ? { msg: lim.tags ? t("ck.tags", { n: tags, m: lim.tags }) : t("ck.noTags") } : { bad: true, msg: lim.tags ? t("ck.tagsBad", { n: tags, m: lim.tags }) : t("ck.noTagsBad"), fix: true },
    len > lim.len || titleLong ? { bad: true, msg: t("ck.long", { p }) } : lim.min && len < lim.min ? { bad: true, msg: t("ck.short", { p }) } : { msg: t("ck.len", { p }) },
  ];
  if (pid === "google") out.push(stars ? { msg: t("ck.stars") } : { bad: true, msg: t("ck.starsBad") });
  out.push({ msg: t("ck.real") });
  return out;
}
function fixPost(pid, post) {
  const lim = LIM[pid], out = { ...post, body: fixText(post.body) };
  if (out.title !== undefined) out.title = fixText(out.title);
  let seen = 0;
  out.body = out.body.replace(/#[^\s#]+/g, (m) => (++seen > lim.tags ? "" : m)).replace(/[ \t]+\n/g, "\n").trimEnd();
  return out;
}

if (location.search.includes("selftest")) {
  const d = fresh();
  console.assert(addStamp(d, "a1") === "nomember");
  d.member = { stamps: 0 };
  console.assert(addStamp(d, " ") === "needr");
  console.assert(addStamp(d, "a1") === "ok" && addStamp(d, "A1 ") === "dup", "duplicate receipt must be rejected");
  console.assert(redeem(d, 2) === "nor", "cannot redeem before goal");
  const pbx = payback(2880, 18, 120);
  console.assert(pbx.v === 160 && pbx.n === 22 && pbx.d === 6, "payback: RM2,880 at RM18 is 160 visits, 1 in 22 of 3,600 customers");
  console.assert(addStamp(d, "a2") === "ok" && redeem(d, 2) === "okr" && d.member.stamps === 0 && redeem(d, 2) === "nor", "redeem once");
  console.assert(addStamp(d, "s1", "17.50") === "ok" && d.spend === 17.5, "stamp adds the receipt total");
  console.assert(spread(186, monthDays(2026, 9, 19), 11, 1.9).reduce((a, b) => a + b, 0) === 186, "daily series must add up");
  console.assert(split(74, [0.32, 0.26, 0.19, 0.13, 0.1]).reduce((a, b) => a + b, 0) === 74, "split must add up");
  for (const m of Object.values(MERCH)) for (const lang of ["en", "zh"]) for (const p of PLAT_ORDER) {
    const inp = { m, items: [0, 1], vibes: Object.keys(m.vibes).slice(0, 3), with: Object.keys(m.with)[1], stars: 5 };
    for (const k of [0, 1, 2]) {
      const post = writePost(p, lang, inp, k), L0 = LIM[p], tags = (post.body.match(/#[^\s#]+/g) || []).length;
      console.assert(post.body && !post.body.includes("undefined"), `${m.id}/${lang}/${p}: empty or undefined`);
      console.assert(!findClaims(`${post.title || ""}${post.body}`).length, `${m.id}/${lang}/${p}: writer must not make claims`);
      console.assert(tags <= L0.tags, `${m.id}/${lang}/${p}: too many tags (${tags})`);
      if (L0.title && post.title) console.assert([...post.title].length <= L0.title[lang === "zh" ? 0 : 1], `${m.id}/${lang}/${p}: title too long: ${post.title}`);
    }
  }
  console.assert(!findClaims(fixText("全网最好喝，保证100%满意，the best cure")).length, "fix must remove every claim");
  console.log("goai selftest done");
}
/* ======================= canvas toolkit + poster looks ======================= */
const INK = "#17120F", SEA = "#D3271C", FLASH = "#FFD84A", CREAM = "#F5EEDF", CHART_A = "#D3271C", CHART_B = "#2F6FB0";
const F = { sans: '"Archivo", "Noto Sans SC", sans-serif', serif: '"Bodoni Moda", "Noto Serif SC", serif', mono: '"Courier New", "Noto Sans SC", monospace' };
const isCJK = (s) => /[　-鿿＀-￯]/.test(s);
const IMG = {};
const loadImg = (src) => (IMG[src] ||= new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src; }));
const fontsReady = Promise.all(["900 80px Archivo", "800 80px Archivo", "700 80px Archivo", "600 80px Archivo", "300 80px Archivo", '400 80px "Bodoni Moda"', 'italic 400 80px "Bodoni Moda"', '600 80px "Bodoni Moda"', '900 80px "Bodoni Moda"'].map((f) => document.fonts.load(f))).catch(() => {});
let zhReady;
const zhFonts = () => (zhReady ||= Promise.all(['900 80px "Noto Sans SC"', '700 80px "Noto Sans SC"', '400 80px "Noto Sans SC"', '900 80px "Noto Serif SC"', '600 80px "Noto Serif SC"'].map((f) => document.fonts.load(f, ZH_GLYPHS))).catch(() => {}));

function font(ctx, w, s, fam = F.sans, { it = false, cond = false, ls = 0 } = {}) {
  ctx.font = `${it ? "italic " : ""}${w} ${Math.round(s)}px ${fam}`;
  if ("fontStretch" in ctx) ctx.fontStretch = cond ? "extra-condensed" : "normal";
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${ls}px`;
}
function wrap(ctx, text, maxW) {
  const cjk = isCJK(text), lines = [];
  if (cjk && text.includes("｜")) return text.split("｜").flatMap((s) => wrap(ctx, s, maxW)); // break titles at the bar first
  const parts = cjk ? [...text] : text.split(" ");
  let cur = "";
  for (const p of parts) {
    const test = cur ? (cjk ? cur + p : cur + " " + p) : p;
    if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = p; } else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}
function fitLines(ctx, text, maxW, maxLines, size, set) {
  let s = size, lines;
  for (;;) { set(s); lines = wrap(ctx, text, maxW); if ((lines.length <= maxLines && lines.every((l) => ctx.measureText(l).width <= maxW)) || s < 14) return { lines, size: s }; s *= 0.94; }
}
function cover(ctx, img, x, y, w, h, fy = 0.5) {
  const r = Math.max(w / img.width, h / img.height), iw = img.width * r, ih = img.height * r;
  ctx.drawImage(img, x + (w - iw) / 2, y + (h - ih) * fy, iw, ih);
}
function graded(ctx, filter, fn) { ctx.save(); if ("filter" in ctx) ctx.filter = filter; fn(); ctx.restore(); }
function burst(ctx, cx, cy, ro, ri, pts, rot, fill) {
  ctx.beginPath();
  for (let i = 0; i < pts * 2; i++) { const r = i % 2 ? ri : ro, a = rot + (i * Math.PI) / pts; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
  ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
}
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); }
function priceParts(p) { const m = /^\s*(RM)\s*(.+)$/i.exec(p || ""); return m ? ["RM", m[2]] : ["", p || ""]; }
function priceBurst(ctx, cx, cy, r, o, bg, fg) {
  burst(ctx, cx, cy, r, r * 0.8, 16, -0.2, bg);
  ctx.fillStyle = fg; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  const [cur, amt] = priceParts(o.price);
  if (!amt) { const s = fitLines(ctx, zh() ? "新品" : "NEW", r * 1.25, 1, r * 0.62, (s) => font(ctx, 900, s, F.sans, { cond: true })); ctx.fillText(s.lines[0], cx, cy + r * 0.04); return; }
  font(ctx, 800, r * 0.24); ctx.fillText(cur, cx, cy - r * 0.34);
  const f = fitLines(ctx, amt, r * 1.3, 1, r * 0.62, (s) => font(ctx, 900, s, F.sans, { cond: true }));
  ctx.fillText(f.lines[0], cx, cy + r * 0.12);
}

// owner poster looks (Design route: the product photo is never redrawn)
const LOOKS = {
  clean(ctx, W, H, o) {
    const u = W / 1080, pad = 70 * u, band = 330 * u, ph = H - band;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
    graded(ctx, "brightness(1.07) contrast(1.08) saturate(1.2)", () => cover(ctx, o.img, 0, 0, W, ph));
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    ctx.fillStyle = SEA; font(ctx, 800, 32 * u, F.sans, { ls: 1 * u });
    ctx.fillText(`${o.m.name}, ${L(o.m.city)}`, pad, ph + 78 * u);
    ctx.fillStyle = INK;
    const f = fitLines(ctx, o.item, W - pad * 2 - 300 * u, 2, 128 * u, (s) => font(ctx, 900, s, F.sans, { cond: true }));
    const lh = f.size * (isCJK(o.item) ? 1.08 : 0.9);
    f.lines.forEach((l, i) => ctx.fillText(l, pad, ph + 80 * u + lh * (i + 1)));
    font(ctx, 600, 28 * u); ctx.fillStyle = "rgba(12,27,38,.55)"; ctx.fillText(o.m.handle, pad, H - 44 * u);
    priceBurst(ctx, W - pad - 135 * u, ph + 10 * u, 150 * u, o, FLASH, INK);
  },
  premium(ctx, W, H, o) {
    const u = W / 1080, pad = 80 * u, img = o.magicImg || o.img;
    graded(ctx, "contrast(1.06) saturate(1.04) brightness(.97)", () => cover(ctx, img, 0, 0, W, H, 0.45));
    let g = ctx.createLinearGradient(0, H * 0.42, 0, H); g.addColorStop(0, "rgba(14,12,10,0)"); g.addColorStop(1, "rgba(14,12,10,.88)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    g = ctx.createLinearGradient(0, 0, 0, 240 * u); g.addColorStop(0, "rgba(14,12,10,.5)"); g.addColorStop(1, "rgba(14,12,10,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, 240 * u);
    ctx.fillStyle = CREAM; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    font(ctx, 600, 30 * u, F.serif, { ls: 12 * u }); ctx.fillText(o.m.name.toUpperCase(), W / 2, 100 * u);
    const cjk = isCJK(o.item), bottom = H - (o.price ? 200 * u : 120 * u);
    const f = fitLines(ctx, o.item, W - pad * 2, 2, (cjk ? 110 : 130) * u, (s) => font(ctx, cjk ? 600 : 400, s, F.serif, { it: !cjk }));
    const lh = f.size * (cjk ? 1.15 : 1);
    f.lines.forEach((l, i) => ctx.fillText(l, W / 2, bottom - lh * (f.lines.length - 1 - i)));
    if (o.price) {
      ctx.fillRect(W / 2 - 50 * u, H - 160 * u, 100 * u, 2 * u);
      font(ctx, 300, 40 * u, F.sans, { ls: 8 * u }); ctx.fillText(o.price, W / 2, H - 92 * u);
    }
  },
  fun(ctx, W, H, o) {
    const u = W / 1080, pad = 64 * u;
    ctx.fillStyle = FLASH; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(12,27,38,.07)";
    for (let y = 0; y < H; y += 36 * u) for (let x = (y / (36 * u)) % 2 ? 18 * u : 0; x < W; x += 36 * u) { ctx.beginPath(); ctx.arc(x, y, 5 * u, 0, 7); ctx.fill(); }
    const head = isCJK(o.item) ? o.item : o.item.toUpperCase();
    ctx.fillStyle = INK; ctx.textAlign = "left"; ctx.textBaseline = "top";
    const f = fitLines(ctx, head, W - pad * 2, 2, 240 * u, (s) => font(ctx, 900, s, F.sans, { cond: true }));
    const lh = f.size * (isCJK(head) ? 1.08 : 0.86);
    f.lines.forEach((l, i) => ctx.fillText(l, pad, 56 * u + lh * i));
    const top = 56 * u + lh * f.lines.length + 34 * u, bottom = H - 110 * u;
    const pw = Math.min(W * 0.8, (bottom - top) * 0.82), phh = Math.min(bottom - top, pw * 1.22);
    ctx.save();
    ctx.translate(W / 2 + 20 * u, top + phh / 2); ctx.rotate(-0.06);
    ctx.shadowColor = "rgba(12,27,38,.35)"; ctx.shadowBlur = 40 * u; ctx.shadowOffsetY = 18 * u;
    ctx.fillStyle = "#fff"; ctx.fillRect(-pw / 2 - 18 * u, -phh / 2 - 18 * u, pw + 36 * u, phh + 36 * u);
    ctx.shadowColor = "transparent";
    ctx.beginPath(); ctx.rect(-pw / 2, -phh / 2, pw, phh); ctx.clip();
    graded(ctx, "saturate(1.35) contrast(1.1) brightness(1.05)", () => cover(ctx, o.img, -pw / 2, -phh / 2, pw, phh));
    ctx.restore();
    priceBurst(ctx, pad + 120 * u, bottom - 40 * u, 140 * u, o, INK, FLASH);
    ctx.fillStyle = INK; ctx.textAlign = "right"; ctx.textBaseline = "alphabetic"; font(ctx, 800, 34 * u);
    ctx.fillText(o.m.handle, W - pad, H - 50 * u);
  },
  festive(ctx, W, H, o) {
    const u = W / 1080, GOLD = "#FFC94A", MARI = "#FF9F1C";
    ctx.fillStyle = "#4B0C36"; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, H * 0.45, 50 * u, W / 2, H * 0.45, H * 0.7); g.addColorStop(0, "rgba(255,120,60,.35)"); g.addColorStop(1, "rgba(75,12,54,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (const [x, y] of [[0, 0], [W, 0], [0, H], [W, H]]) rangoli(ctx, x, y, 230 * u);
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = GOLD;
    if (zh()) font(ctx, 900, 84 * u, F.serif); else font(ctx, 400, 96 * u, F.serif, { it: true });
    ctx.fillText(zh() ? "屠妖节快乐" : "Happy Deepavali", W / 2, 150 * u);
    const aw = W * 0.62, ax = (W - aw) / 2, ay = 200 * u, ah = H - ay - 330 * u, r = aw / 2;
    const arch = () => { ctx.beginPath(); ctx.moveTo(ax, ay + ah); ctx.lineTo(ax, ay + r); ctx.arc(W / 2, ay + r, r, Math.PI, 0); ctx.lineTo(ax + aw, ay + ah); ctx.closePath(); };
    ctx.save(); arch(); ctx.clip(); graded(ctx, "saturate(1.2) contrast(1.06) sepia(.12)", () => cover(ctx, o.img, ax, ay, aw, ah)); ctx.restore();
    ctx.strokeStyle = GOLD; ctx.lineWidth = 8 * u; arch(); ctx.stroke();
    ctx.fillStyle = CREAM;
    const f = fitLines(ctx, o.item, W - 200 * u, 1, 66 * u, (s) => font(ctx, 800, s));
    ctx.fillText(f.lines[0], W / 2, ay + ah + 100 * u);
    ctx.fillStyle = MARI;
    font(ctx, 900, 74 * u, F.sans, { cond: true }); ctx.fillText(o.price || (zh() ? "新品" : "NEW IN"), W / 2, ay + ah + 186 * u);
    for (let i = 0; i < 7; i++) diya(ctx, W / 2 + (i - 3) * 110 * u, H - 64 * u, u);
  },
};
function rangoli(ctx, cx, cy, r) {
  const ring = (k, rad, len, wid, col, off = 0) => {
    ctx.fillStyle = col;
    for (let i = 0; i < k; i++) { const a = off + (i / k) * Math.PI * 2; ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, len, wid, a, 0, 7); ctx.fill(); }
  };
  ring(16, r * 0.78, r * 0.2, r * 0.08, "#FF9F1C");
  ring(12, r * 0.52, r * 0.16, r * 0.07, "#FF4F9A", 0.26);
  ring(8, r * 0.28, r * 0.12, r * 0.06, "#FFC94A");
  ring(24, r * 0.98, r * 0.025, r * 0.025, "#F5EEDF");
  ctx.fillStyle = "#F5EEDF"; ctx.beginPath(); ctx.arc(cx, cy, r * 0.1, 0, 7); ctx.fill();
}
function diya(ctx, x, y, u) {
  ctx.fillStyle = "#C2552B"; ctx.beginPath(); ctx.ellipse(x, y, 30 * u, 14 * u, 0, 0, Math.PI); ctx.fill();
  ctx.fillStyle = "#FF9F1C"; ctx.beginPath(); ctx.ellipse(x, y - 14 * u, 9 * u, 20 * u, 0, 0, 7); ctx.fill();
  ctx.fillStyle = "#FFE9A8"; ctx.beginPath(); ctx.ellipse(x, y - 10 * u, 4 * u, 10 * u, 0, 0, 7); ctx.fill();
}

// customer overlays (template route: their photo is only framed, never regenerated)
const THEMES = [
  ["xhs", function (ctx, W, H, o) {
    const u = W / 1080;
    graded(ctx, "contrast(1.06) saturate(1.12) brightness(1.02)", () => cover(ctx, o.img, 0, 0, W, H));
    const g = ctx.createLinearGradient(0, H * 0.45, 0, H); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.35)"); ctx.fillStyle = g; ctx.fillRect(0, H * 0.45, W, H * 0.55);
    const title = o.title || o.m.name, sub = o.sub || "";
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.lineJoin = "round";
    const f = fitLines(ctx, title, W - 120 * u, 2, 132 * u, (s) => font(ctx, 900, s, F.sans));
    const lh = f.size * 1.16, y0 = H * 0.6 - ((f.lines.length - 1) * lh) / 2;
    f.lines.forEach((l, i) => {
      const y = y0 + i * lh;
      ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 18 * u; ctx.shadowOffsetY = 6 * u;
      ctx.lineWidth = f.size * 0.2; ctx.strokeStyle = "#E8202A"; ctx.strokeText(l, W / 2, y);
      ctx.shadowColor = "transparent"; ctx.fillStyle = "#fff"; ctx.fillText(l, W / 2, y);
    });
    if (sub) {
      const fs = fitLines(ctx, sub, W - 200 * u, 1, 64 * u, (s) => font(ctx, 800, s, F.sans));
      const y = y0 + f.lines.length * lh + 6 * u;
      ctx.lineWidth = fs.size * 0.22; ctx.strokeStyle = "#fff"; ctx.strokeText(fs.lines[0], W / 2, y);
      ctx.fillStyle = "#17120F"; ctx.fillText(fs.lines[0], W / 2, y);
    }
  }],
  ["mag", function (ctx, W, H, o) {
    const u = W / 1080, pad = 64 * u;
    graded(ctx, "contrast(1.06) saturate(1.12)", () => cover(ctx, o.img, 0, 0, W, H));
    let g = ctx.createLinearGradient(0, 0, 0, H * 0.34); g.addColorStop(0, "rgba(0,0,0,.5)"); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * 0.34);
    g = ctx.createLinearGradient(0, H * 0.55, 0, H); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.62)"); ctx.fillStyle = g; ctx.fillRect(0, H * 0.55, W, H * 0.45);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "top";
    const f = fitLines(ctx, o.m.short, W - 2 * 48 * u, 1, 320 * u, (s) => font(ctx, 900, s, F.serif));
    ctx.fillText(f.lines[0], W / 2, 50 * u);
    const d = new Date();
    font(ctx, 700, 24 * u, F.sans, { ls: 5 * u });
    ctx.fillText(zh() ? `${d.getFullYear()}年${d.getMonth() + 1}月号` : `ISSUE ${d.getMonth() + 1} / ${d.toLocaleString("en", { month: "long" }).toUpperCase()} ${d.getFullYear()}`, W / 2, 50 * u + f.size * 0.86);
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    const lines = [...o.m.cover[zh() ? "zh" : "en"]];
    if (o.star) lines[0] = t("c.starLine", { name: o.star });
    ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 16 * u;
    ctx.fillStyle = FLASH;
    const f1 = fitLines(ctx, lines[0], W - pad * 2 - 200 * u, 1, 92 * u, (s) => font(ctx, 900, s, F.sans, { cond: true }));
    ctx.fillText(f1.lines[0], pad, H - 250 * u);
    ctx.fillStyle = "#fff"; font(ctx, 800, 50 * u, F.sans, { cond: true });
    ctx.fillText(lines[1], pad, H - 176 * u); ctx.fillText(lines[2], pad, H - 116 * u);
    ctx.shadowColor = "transparent";
    const bx = W - pad - 170 * u, by = H - pad - 100 * u, rnd = seeded(7);
    ctx.fillStyle = "#fff"; ctx.fillRect(bx, by, 170 * u, 100 * u); ctx.fillStyle = "#111";
    for (let x = bx + 12 * u; x < bx + 158 * u; x += 0) { const w = (1 + Math.floor(rnd() * 3)) * 2.4 * u; ctx.fillRect(x, by + 12 * u, w, 66 * u); x += w + (1 + Math.floor(rnd() * 3)) * 2.4 * u; }
  }],
  ["receipt", function (ctx, W, H, o) {
    const u = W / 1080, rows = o.m.receipt[zh() ? "zh" : "en"], rw = 500 * u, lh = 46 * u;
    graded(ctx, "contrast(1.05) saturate(1.1)", () => cover(ctx, o.img, 0, 0, W, H));
    const rh = 300 * u + rows.length * lh + 120 * u, x = 64 * u, y = H - rh - 70 * u;
    ctx.save(); ctx.translate(x + rw / 2, y + rh / 2); ctx.rotate(-0.05); ctx.translate(-rw / 2, -rh / 2);
    ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 30 * u; ctx.shadowOffsetY = 12 * u;
    const z = 16 * u; ctx.beginPath(); ctx.moveTo(0, z);
    for (let i = 0; i <= rw; i += z * 2) { ctx.lineTo(i + z, 0); ctx.lineTo(Math.min(i + z * 2, rw), z); }
    ctx.lineTo(rw, rh - z);
    for (let i = rw; i >= 0; i -= z * 2) { ctx.lineTo(i - z, rh); ctx.lineTo(Math.max(i - z * 2, 0), rh - z); }
    ctx.closePath(); ctx.fillStyle = "#FBFAF4"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.fillStyle = "#1d1d1d"; ctx.textBaseline = "alphabetic"; ctx.textAlign = "center";
    const d = new Date(), p2 = (v) => String(v).padStart(2, "0");
    font(ctx, 700, 38 * u, F.mono); ctx.fillText(o.m.name.toUpperCase(), rw / 2, 74 * u);
    font(ctx, 400, 24 * u, F.mono); ctx.fillText(L(o.m.city).toUpperCase(), rw / 2, 110 * u);
    ctx.fillText(`${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()}  ${p2(d.getHours())}:${p2(d.getMinutes())}`, rw / 2, 142 * u);
    const dash = (yy) => { ctx.fillText("- ".repeat(18), rw / 2, yy); };
    dash(178 * u);
    font(ctx, 400, 26 * u, F.mono);
    rows.forEach(([a, b], i) => { const yy = 222 * u + i * lh; ctx.textAlign = "left"; ctx.fillText(`1 x ${a}`, 30 * u, yy); ctx.textAlign = "right"; ctx.fillText(b, rw - 30 * u, yy); });
    const yb = 222 * u + rows.length * lh; ctx.textAlign = "center"; dash(yb - 8 * u);
    font(ctx, 700, 30 * u, F.mono); ctx.textAlign = "left"; ctx.fillText(zh() ? "快乐总计" : "TOTAL HAPPINESS", 30 * u, yb + 40 * u);
    ctx.textAlign = "right"; ctx.fillText("100%", rw - 30 * u, yb + 40 * u);
    font(ctx, 400, 24 * u, F.mono); ctx.textAlign = "center"; ctx.fillText(zh() ? "谢谢光临，欢迎再来" : "THANK YOU, COME AGAIN", rw / 2, yb + 96 * u);
    ctx.restore();
  }],
  ["film", function (ctx, W, H, o) {
    const u = W / 1080;
    graded(ctx, "sepia(.22) saturate(1.2) contrast(1.06) brightness(1.04)", () => cover(ctx, o.img, 0, 0, W, H));
    let g = ctx.createRadialGradient(W * 0.95, 0, 0, W * 0.95, 0, W * 0.7); g.addColorStop(0, "rgba(255,120,40,.4)"); g.addColorStop(1, "rgba(255,120,40,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    g = ctx.createRadialGradient(W / 2, H / 2, W * 0.35, W / 2, H / 2, H * 0.75); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.45)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const rnd = seeded(42);
    for (let i = 0; i < 5000; i++) { ctx.fillStyle = rnd() > 0.5 ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.08)"; ctx.fillRect(rnd() * W, rnd() * H, 2 * u, 2 * u); }
    const d = new Date(), p2 = (v) => String(v).padStart(2, "0");
    ctx.fillStyle = "#FF9A3C"; ctx.shadowColor = "#FF5A00"; ctx.shadowBlur = 14 * u;
    ctx.textAlign = "right"; ctx.textBaseline = "alphabetic"; font(ctx, 600, 56 * u, F.sans, { ls: 6 * u });
    ctx.fillText(`'${String(d.getFullYear()).slice(2)} ${p2(d.getMonth() + 1)} ${p2(d.getDate())}`, W - 64 * u, H - 64 * u);
    ctx.textAlign = "left"; font(ctx, 600, 26 * u, F.sans, { ls: 6 * u }); ctx.fillText(o.m.name.toUpperCase(), 64 * u, H - 70 * u);
    ctx.shadowColor = "transparent";
  }],
  ["cute", function (ctx, W, H, o) {
    const u = W / 1080, inset = 36 * u;
    ctx.fillStyle = "#FFF4F7"; ctx.fillRect(0, 0, W, H);
    ctx.save(); rr(ctx, inset, inset, W - inset * 2, H - inset * 2, 70 * u); ctx.clip();
    graded(ctx, "saturate(1.2) brightness(1.05)", () => cover(ctx, o.img, inset, inset, W - inset * 2, H - inset * 2));
    ctx.restore();
    ctx.save(); ctx.translate(W - 210 * u, 220 * u); ctx.rotate(0.14);
    burst(ctx, 0, 0, 170 * u, 138 * u, 14, 0, FLASH);
    ctx.fillStyle = INK; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const f = fitLines(ctx, L(o.m.cute), 230 * u, 2, 80 * u, (s) => font(ctx, 900, s, F.sans, { cond: true }));
    f.lines.forEach((l, i) => ctx.fillText(l, 0, (i - (f.lines.length - 1) / 2) * f.size * 0.95));
    ctx.restore();
    for (const [x, y, s] of [[150, H / u - 300, 60], [250, H / u - 380, 36], [110, H / u - 420, 28]]) heart(ctx, x * u, y * u, s * u, "#FF5C8A");
    font(ctx, 800, 36 * u); const label = o.m.name, lw = ctx.measureText(label).width + 80 * u;
    ctx.fillStyle = "#fff"; rr(ctx, 70 * u, H - 170 * u, lw, 78 * u, 39 * u); ctx.fill();
    ctx.fillStyle = INK; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillText(label, 110 * u, H - 131 * u);
  }],
  ["simple", function (ctx, W, H, o) {
    const u = W / 1080;
    graded(ctx, "contrast(1.04) saturate(1.06)", () => cover(ctx, o.img, 0, 0, W, H));
    const g = ctx.createLinearGradient(0, H * 0.7, 0, H); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.45)"); ctx.fillStyle = g; ctx.fillRect(0, H * 0.7, W, H * 0.3);
    ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 3 * u; ctx.strokeRect(30 * u, 30 * u, W - 60 * u, H - 60 * u);
    ctx.fillStyle = "#fff"; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    font(ctx, 800, 48 * u); ctx.fillText(o.m.name, 72 * u, H - 112 * u);
    font(ctx, 500, 28 * u); ctx.globalAlpha = 0.85; ctx.fillText(L(o.m.city), 72 * u, H - 70 * u); ctx.globalAlpha = 1;
  }],
];
const themeFn = (k) => THEMES.find(([id]) => id === k)[1];
function heart(ctx, x, y, s, col) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3); ctx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.8, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.8, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3); ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3); ctx.fill();
}
async function paint(canvas, W, H, draw, o) {
  await fontsReady;
  if (zh()) await zhFonts();
  canvas.width = Math.round(W); canvas.height = Math.round(H);
  const ctx = canvas.getContext("2d");
  ctx.save(); draw(ctx, canvas.width, canvas.height, o); ctx.restore();
  return canvas;
}
function drawQR(canvas, text, dark = INK) {
  const q = qrcode(0, "M"); q.addData(text); q.make();
  const k = q.getModuleCount(), cell = 12, size = k * cell;
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, size, size); ctx.fillStyle = dark;
  for (let r = 0; r < k; r++) for (let c = 0; c < k; c++) if (q.isDark(r, c)) { rr(ctx, c * cell + 0.6, r * cell + 0.6, cell - 1.2, cell - 1.2, 3); ctx.fill(); }
}
const SIZES = { feed: [1080, 1350], story: [1080, 1920], cover: [1080, 1440] };
const custUrl = () => `${location.origin}${location.pathname}#/c?m=${S.m}`;

/* ======================= captions ======================= */
const CAP = {
  clean: { en: ["New at {shop}: {item}, {price}. Come say hi in {city}.", "Fresh in at {shop}: {item}. Come see it in {city}.", "Meet our {item}. Only at {shop}, {city}."], zh: ["{shop} 新品：{item}，{price}。来{city}找我们！", "{shop} 新到：{item}，欢迎来{city}看看。", "认识一下我们的 {item}，只在 {shop}。"] },
  premium: { en: ["{item}, {price}. Quietly beautiful, at {shop}.", "Take a closer look: {item}. {shop}, {city}.", "Some things are worth slowing down for. {item} at {shop}."], zh: ["{item}，{price}。安静的美好，在 {shop}。", "靠近一点看：{item}。{shop}，{city}。", "有些美好，值得慢下来。{shop} 的 {item}。"] },
  fun: { en: ["{item} is HERE!! Only {price}. Run to {shop}!", "Warning: {item} may cause instant happiness. Only at {shop}!", "Stop scrolling. {item} at {shop}. That's the post."], zh: ["{item} 来了！！只要 {price}，快冲 {shop}！", "注意：{item} 会让人瞬间开心。只在 {shop}！", "别滑了，{shop} 的 {item}，就是这么好。"] },
  festive: { en: ["Happy Deepavali! {item} at {price}, only at {shop}. 🪔", "Happy Deepavali from all of us at {shop}! Come see our {item}. 🪔", "Lights, family and good times. Happy Deepavali from {shop}, {city}!"], zh: ["屠妖节快乐！🪔 {shop} 的 {item}，{price}。", "{shop} 全体祝你屠妖节快乐！🪔 来看看我们的 {item}。", "灯火、家人、好时光。{shop} 祝你屠妖节快乐！"] },
};
function ownerCaption(look, lang, i) {
  const m = M(), item = C.item ?? (C.isSample ? m.item[lang === "zh" ? 1 : 0] : ""), price = C.price;
  const pool = CAP[look][lang].filter((s) => price || !s.includes("{price}"));
  const s = pool[i % pool.length];
  return s.replace(/\{(\w+)\}/g, (_, k) => ({ shop: m.name, item, price, city: m.city[lang === "zh" ? 1 : 0] })[k]) + `\n\n${m.tags}`;
}

/* ======================= small UI helpers ======================= */
const toastEl = $(".toast");
let toastT;
function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("on"), 2600); }
const sheet = $(".sheet"), scrim = $(".scrim");
let sheetFrom, sheetKind;
function openSheet(kind) {
  sheetKind = kind; sheetFrom = document.activeElement;
  sheet.innerHTML = SHEETS[kind](); seals(sheet); SHEET_AFTER[kind]?.();
  sheet.setAttribute("aria-label", sheet.querySelector("h2, b")?.textContent || "");
  sheet.hidden = scrim.hidden = false;
  $$(".screen").forEach((x) => (x.inert = true));
  if (!REDUCED) { animate(sheet, { y: ["100%", "0%"] }, { type: spring, bounce: 0.12, visualDuration: 0.4 }); animate(scrim, { opacity: [0, 1] }, { duration: 0.25 }); }
  sheet.querySelector("button")?.focus();
}
async function closeSheet() {
  if (sheet.hidden) return;
  if (!REDUCED) { const a = animate(sheet, { y: "100%" }, { duration: 0.22, ease: "easeIn" }); await (a.finished || a); }
  sheet.hidden = scrim.hidden = true; sheetKind = null; $$(".screen").forEach((x) => (x.inert = false)); sheetFrom?.focus?.();
}
const refreshSheet = () => { if (sheetKind) { sheet.innerHTML = SHEETS[sheetKind](); seals(sheet); SHEET_AFTER[sheetKind]?.(); } };
async function copy(text) { try { await navigator.clipboard.writeText(text); return true; } catch { return false; } }
function download(blob, name) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
const toBlob = (canvas) => new Promise((ok, no) => { try { canvas.toBlob((b) => (b ? ok(b) : no()), "image/jpeg", 0.92); } catch (e) { no(e); } });
async function shareCanvas(canvas, name, text) {
  let blob;
  try { blob = await toBlob(canvas); } catch { toast("Open via http://, not file://"); return; }
  const file = new File([blob], name, { type: "image/jpeg" });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], text }); return; } catch (e) { if (e.name === "AbortError") return; }
  }
  download(blob, name); await copy(text); toast(t("cr.saved"));
}
const fmtDate = (days) => new Intl.DateTimeFormat(loc(), { day: "numeric", month: "short" }).format(Date.now() + days * 864e5);
const SVG = {
  ok: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  no: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  arrows: '<svg viewBox="0 0 24 24"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg>',
  share: '<svg viewBox="0 0 24 24"><path d="M12 15V3M7 8l5-5 5 5M5 13v7h14v-7"/></svg>',
  down: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
};
// stamp-shaped placeholders in the HTML become real seals
function seals(root = document) {
  $$("[data-seal]", root).forEach((el) => { el.innerHTML = seal(+el.dataset.seal || 40); el.removeAttribute("data-seal"); });
  $$("[data-logo]", root).forEach((el) => { el.innerHTML = logo(36).replace(/^<span class="logo">|<\/span>$/g, ""); el.removeAttribute("data-logo"); });
}
const stampsHTML = (have, goal) => `<div class="pstamps" style="--n:${goal}">${Array.from({ length: goal }, (_, i) => `<span class="${i < have ? "on" : ""}" style="--r:${((i * 37) % 13) - 6}deg"><i></i></span>`).join("")}</div>`;
// a seal hitting paper: big and tilted, then flat, with an ink ring
function slam(el, ring) {
  if (!el || REDUCED) return;
  gsap.fromTo(el, { scale: 1.7, rotation: -14, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.42, ease: "back.out(2.2)" });
  if (ring) gsap.fromTo(ring, { scale: 0.7, opacity: 0.9 }, { scale: 1.7, opacity: 0, duration: 0.7, delay: 0.18, ease: "power2.out" });
}

// press feedback: Motion springs on everything tappable
const PRESSABLE = ".btn, .tile, .look, .huge, .tabs a, .row-link, .samples button, .who button, .lang-pills button, .shop-pill, .qr-replies button, .seg button, .final, .qchips button, .ptabs button, .pv, .starpick button";
document.addEventListener("pointerdown", (e) => {
  const el = e.target.closest(PRESSABLE);
  if (!el || REDUCED) return;
  animate(el, { scale: 0.96 }, { type: spring, stiffness: 700, damping: 32 });
  const up = () => { animate(el, { scale: 1 }, { type: spring, stiffness: 520, damping: 13 }); ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => el.removeEventListener(ev, up)); };
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => el.addEventListener(ev, up));
});
const pop = (el) => !REDUCED && el && animate(el, { opacity: [0, 1], y: [12, 0], scale: [0.96, 1] }, { type: spring, bounce: 0.3, visualDuration: 0.35 });
const buzz = (p) => { try { navigator.vibrate?.(p); } catch {} };

/* ---- before / after compare ---- */
const compareInner = (p) => `<img class="cmp-before" alt=""><canvas class="cmp-after"></canvas><span class="cmp-line"><b class="cmp-knob">${SVG.arrows}</b></span><span class="cmp-tag l">${t("cmp.before")}</span><span class="cmp-tag r">${t("cmp.after")}</span><input type="range" min="0" max="100" value="${p}" aria-label="${t("cmp.aria")}">`;
const compareHTML = (key, p = 50) => `<div class="compare" data-compare="${key}" style="--p:${p}%">${compareInner(p)}</div>`;

/* ---- the power-up: carve G O A I letter by letter, then stamp ---- */
const pu = $(".powerup");
seals(pu);
async function powerUp(stepKeys, work, dur = 2.2) {
  if (REDUCED) { await work(); return; }
  const pct = $(".pu-pct b", pu), bar = $(".pu-bar i", pu), step = $(".pu-step", pu), flash = $(".pu-flash", pu), sealEl = $(".pu-seal", pu), ring = $(".pu-ring", pu);
  const strokes = $$(".pu-seal path", pu);
  strokes.forEach((s) => (s.style.strokeDashoffset = 1));
  pct.textContent = "0"; bar.style.width = "0";
  pu.hidden = false;
  gsap.set(flash, { opacity: 0 }); gsap.set(sealEl, { scale: 1, rotation: 0 });
  gsap.fromTo(pu, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 });
  const o = { p: 0 }, job = work();
  await gsap.to(o, {
    p: 100, duration: dur, ease: "power2.inOut",
    onUpdate() {
      const v = Math.round(o.p);
      pct.textContent = v; bar.style.width = v + "%";
      strokes.forEach((s, i) => (s.style.strokeDashoffset = 1 - Math.min(1, Math.max(0, (o.p / 100) * strokes.length - i))));
      step.textContent = t(stepKeys[Math.min(stepKeys.length - 1, Math.floor(o.p / (100 / stepKeys.length)))]);
    },
  });
  await job;
  buzz(15);
  await gsap.timeline()
    .fromTo(sealEl, { scale: 1.22, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.32, ease: "back.out(3)" })
    .fromTo(ring, { scale: 0.75, opacity: 0.9 }, { scale: 1.75, opacity: 0, duration: 0.6, ease: "power2.out" }, "<0.1")
    .to(flash, { opacity: 0.85, duration: 0.08 }, "-=0.3")
    .to(pu, { autoAlpha: 0, duration: 0.4 }, "+=0.12");
  pu.hidden = true;
}
function typeInto(el, text) {
  if (!el) return;
  if (REDUCED) { el.value = text; return; }
  const o = { i: 0 };
  gsap.to(o, { i: text.length, duration: Math.min(1.6, text.length / 55), ease: "none", onUpdate: () => (el.value = text.slice(0, Math.round(o.i))) });
}

/* ---- level up: shown in the owner app when power points cross a level ---- */
async function showLevel() {
  const d = D();
  if (!d.lvPending || !APP_VIEWS.includes(route)) return;
  const lv = d.lvPending; d.lvPending = 0; save();
  const el = $(".levelup");
  $(".lu-k", el).textContent = t("lu.k"); $(".lu-h", el).textContent = t("lu.h", { n: lv }); $(".lu-s", el).textContent = t("lu.s");
  el.hidden = false; buzz([20, 40, 20]);
  if (!REDUCED) { pop($(".lu-card", el)); slam($(".lu-seal", el), $(".lu-ring", el)); }
  await wait(2400);
  if (!REDUCED) { const a = animate(el, { opacity: [1, 0] }, { duration: 0.3 }); await (a.finished || a); }
  el.hidden = true; el.style.opacity = "";
}

/* ---- Home tile + power card (the power card is also on the landing) ---- */
const tileHTML = (x, cls = "") => `<a class="tile ${cls}" href="${x.href}" style="--tint:${x.tint};--ict:${x.ict}"><span class="ic">${IC[x.ic]}</span><b>${t("tl." + x.k)}</b><span class="sub">${t("tl." + x.k + "S")}</span>${x.isNew ? `<span class="zone zone-red new">${t("tl.new")}</span>` : ""}</a>`;
function powerCardHTML(hi = true) {
  const pw = power();
  return `<div class="pc-top"><span class="pc-hi">${hi ? t("pc.hi", { name: esc(L(M().owner)) }) : t("rp.this")}</span><span class="grow"></span><span class="lv">${seal(24)}${t("pc.lv", { n: pw.lv })}</span></div>
    <div class="pc-big"><b data-count="${pw.p}">${pw.p}</b><span>${t("pc.pts")}</span></div>
    <div class="pc-bar" style="--v:${Math.round(pw.pct * 100)}%"><i></i></div>
    <p class="pc-note">${t("pc.next", { n: pw.toNext, lv: pw.lv + 1 })}</p>
    <div class="pc-btns"><a class="btn btn-seal btn-s" href="#/create">${t("pc.go")}</a><a class="btn btn-ghost btn-s" href="#/report">${t("pc.rep")}</a></div>`;
}
function countUp(el, to) {
  if (!el || REDUCED) return;
  const o = { v: Math.max(0, to - 80) };
  gsap.to(o, { v: to, duration: 1.2, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(o.v)) });
}
function setTitle() {
  document.title = route === "landing" ? "Go AI" : `${{ c: M().name, staff: t("s.h") }[route] ?? t("tab." + route)} | Go AI`;
}

/* ======================= language + shop ======================= */
function applyStatic() {
  document.documentElement.lang = zh() ? "zh-Hans" : "en";
  $$("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t, { shop: M().name })));
  $$("[data-setlang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.setlang === S.lang));
  $$("[data-m]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.m === S.m));
  $$("[data-switch]").forEach((b) => (b.textContent = M().name));
  $$("[data-ph]").forEach((el) => (el.placeholder = t(el.dataset.ph)));
  $$("[data-tl]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.tl)));
  document.documentElement.style.setProperty("--mc", M().color);
  setTitle();
}
let langVT = null, langSeq = 0;
function setLang(lang, e) {
  // the newest tap wins; the ripple is decoration and never blocks the switch
  const my = ++langSeq;
  let done = false;
  const go = () => { if (done || my !== langSeq) return; done = true; if (S.lang === lang) return; S.lang = lang; C.capLang = null; K.posts = {}; save(); applyStatic(); refresh(); refreshSheet(); };
  if (!document.startViewTransition || REDUCED || langVT) { langVT?.skipTransition(); return go(); }
  if (lang === S.lang) return;
  const x = e?.clientX ?? innerWidth / 2, y = e?.clientY ?? 0, r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  langVT = document.startViewTransition(go);
  setTimeout(go, 1000);   // a stalled frame (background tab, busy phone) must not swallow the switch
  langVT.finished.catch(() => {}).finally(() => (langVT = null));
  langVT.updateCallbackDone.catch(() => {});
  langVT.ready.then(() =>
    document.documentElement.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 700, easing: "cubic-bezier(.6,0,.2,1)", pseudoElement: "::view-transition-new(root)" })).catch(() => {});
}
const SC_FONTS = ['900 80px "Noto Sans SC"', '700 80px "Noto Sans SC"', '400 80px "Noto Sans SC"', '900 80px "Noto Serif SC"', '600 80px "Noto Serif SC"'];
let nameT;
function setShopName(v) {
  clearTimeout(nameT);
  nameT = setTimeout(async () => {
    S.shop = v.trim().slice(0, 28); save();
    if (isCJK(S.shop)) await Promise.all(SC_FONTS.map((f) => document.fonts.load(f, S.shop)));
    $$("[data-in=shopname]").forEach((i) => i !== document.activeElement && (i.value = S.shop));
    applyStatic(); refresh();
  }, 350);
}
function setShop(id) {
  if (!MERCH[id] || id === S.m) return;
  S.m = id; save();
  Object.assign(C, { img: null, phase: "pick", item: null, price: null });
  Object.assign(K, { img: null, step: "start", star: "", items: [], vibes: [], with: null, posts: {}, stars: 0, plat: "xhs", k: 0 });
  R.made = false;
  applyStatic(); refresh();
}

/* ======================= landing ======================= */
let landingBuilt = false;
const counter = { p: 0 }, stampP = { v: 0 };
const sampleInput = () => ({ m: M(), items: [0], vibes: Object.keys(M().vibes).slice(0, 2), with: Object.keys(M().with)[1], stars: 5 });
function landingNumbers() { $$(".st-report [data-n]").forEach((b) => (b.textContent = Math.round((b.dataset.n === "photos" ? photosMade() : n("returns")) * counter.p))); }
function waDemoHTML() {
  return `<div class="wa-head"><span class="wa-av">${seal(40)}</span><div><b>Go AI</b><small>${t("wa.on")}</small></div><span class="grow"></span><span class="zone zone-demo">${t("demo")}</span></div>
    <div class="wa-thread" data-wthread><div class="bub"><canvas></canvas>${esc(t("wa.ready"))}</div></div>
    <div class="qr-replies" data-wreplies><button data-act="wdYes">${t("wa.r1")}</button><button data-act="wdNo">${t("wa.r2")}</button></div>`;
}
async function paintLanding() {
  const m = M(), o = await lookOpts(true);
  const hc = $("[data-compare=hero]");
  if (!hc.firstChild || hc.dataset.lang !== S.lang) { hc.innerHTML = compareInner(parseFloat(hc.style.getPropertyValue("--p")) || 100); hc.dataset.lang = S.lang; }
  $(".cmp-before", hc).src = m.photo;
  await paint($(".cmp-after", hc), 720, 900, LOOKS.premium, o);
  $("[data-ready]").innerHTML = PLAT_ORDER.map((p) => plat(p, 34, true)).join("");
  $("[data-powercard]").innerHTML = powerCardHTML();
  $("[data-wademo]").innerHTML = waDemoHTML();
  paint($("[data-wademo] canvas"), 432, 540, LOOKS.fun, o);
  $("[data-wall]").innerHTML = PLAT_ORDER.map((p) => `<div>${plat(p, 52)}<b>${pname(p)}</b><span>${t("fmt." + p)}</span></div>`).join("");
  $("[data-why]").innerHTML = `<div class="why-row"><span></span><span>${t("why.col1")}</span><span>${seal(22)}${t("why.col2")}</span></div>`
    + [...WHY, WHY_PRICE].map(([a, b, c], i) => `<div class="why-row ${i === WHY.length ? "price" : ""}"><span>${L(a)}</span><span class="them" data-l="${esc(t("why.col1"))}">${L(b)}</span><span class="us">${L(c)}</span></div>`).join("");
  paintPlans();
  // story
  $(".st-raw").src = m.photo;
  paint($(".st-poster"), 864, 1080, LOOKS.premium, o);
  const ci = await loadImg(m.cust), xp = writePost("xhs", S.lang, sampleInput());
  $$(".st-strip canvas").forEach((c, i) => paint(c, 720, 900, THEMES[i][1], { img: ci, m, title: xp.title, sub: `${m.name}${zh() ? "·" : ", "}${L(m.city)}` }));
  $(".sp-top").textContent = m.name;
  $("[data-sptabs]").innerHTML = ["xhs", "ig", "tiktok", "google"].map((p, i) => plat(p, 40).replace('class="pl"', `class="pl ${i ? "" : "on"}"`)).join("");
  $(".pass-name").textContent = t("mb.club", { shop: m.name });
  $(".pass-rew").textContent = L(m.reward);
  const st = $(".st-card .pstamps");
  if (!st.children.length) st.innerHTML = Array.from({ length: 10 }, (_, i) => `<span style="--r:${((i * 37) % 13) - 6}deg"><i></i></span>`).join("");
  st.style.setProperty("--n", m.goal);
  [...st.children].forEach((s, i) => { s.hidden = i >= m.goal; s.classList.toggle("on", i < Math.round(stampP.v)); });
  $(".v-off").textContent = L(m.off);
  const sr = series(), mx = Math.max(...sr.styled);
  $(".mini-bars").innerHTML = sr.styled.map((v) => `<i style="--v:${Math.round((v / mx) * 100)}%"></i>`).join("");
  landingNumbers();
}
function buildLanding() {
  landingBuilt = true;
  const steps = $$(".step"), dots = $$(".st-dots li");
  const mm = gsap.matchMedia();
  document.documentElement.classList.remove("pre");
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const hc = $("[data-compare=hero]");
    gsap.timeline({ delay: 0.05 })
      .from(".hero-h .ln > span", { yPercent: 115, duration: 0.95, ease: "power4.out", stagger: 0.1 })
      .from(".hero-copy .eyebrow, .hero-sub, .hero-cta, .yours", { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.08 }, 0.35)
      .from(".hero-visual", { autoAlpha: 0, scale: 0.92, duration: 0.9, ease: "back.out(1.4)" }, 0.2)
      .from(".hero-side > *", { autoAlpha: 0, x: 40, duration: 0.7, ease: "power3.out", stagger: 0.12 }, 0.45)
      .fromTo(hc, { "--p": "100%" }, { "--p": "36%", duration: 1.6, ease: "power3.inOut", onComplete: () => ($("input", hc).value = 36) }, 0.9)
      .from("[data-ready] .pl", { scale: 0, autoAlpha: 0, duration: 0.45, ease: "back.out(2.4)", stagger: 0.07 }, 1.9)
      .add(() => countUp($("[data-powercard] [data-count]"), power().p), 1);
    gsap.from(".wall-grid > div", { autoAlpha: 0, y: 30, duration: 0.6, ease: "power3.out", stagger: 0.06, scrollTrigger: { trigger: ".wall-grid", start: "top 85%" } });

    const frame = $(".st-frame");
    const swap = (a, b, at) => tl.to(steps[a], { autoAlpha: 0, y: -24, duration: 0.25 }, at).fromTo(steps[b], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.3 }, `${at}+=0.25`);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "#story", start: "top top", end: "+=420%", scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => {
          const at = ["s2", "s3", "s4"].filter((l) => self.progress >= tl.labels[l] / tl.duration()).length;
          dots.forEach((d, i) => d.classList.toggle("on", i <= at));
          const shown = Math.round(-gsap.getProperty(".st-strip canvas", "xPercent") / 100);
          $$("[data-sptabs] .pl").forEach((p, i) => p.classList.toggle("on", i === Math.min(shown, 3)));
        },
      },
    });
    tl.set(".st-flash", { autoAlpha: 1 })
      .fromTo(".st-flash", { y: 0 }, { y: () => frame.offsetHeight, duration: 1 })
      .fromTo(".st-poster", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, "<")
      .to(".st-flash", { autoAlpha: 0, duration: 0.1 })
      .to(".tag-before", { autoAlpha: 0, duration: 0.1 }, "<")
      .fromTo(".tag-after", { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, "<")
      .to({}, { duration: 0.5 })
      .addLabel("s2")
      .to(".st-a", { xPercent: -25, scale: 0.85, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "s2")
      .fromTo(".st-b", { autoAlpha: 0, yPercent: 25 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: "power2.out" }, "s2+=0.3")
      .to(".st-strip canvas", { xPercent: -100, duration: 0.45, ease: "power2.inOut" }, "+=0.25")
      .to(".st-strip canvas", { xPercent: -200, duration: 0.45, ease: "power2.inOut" }, "+=0.3")
      .to({}, { duration: 0.35 })
      .addLabel("s3")
      .to(".st-b", { autoAlpha: 0, yPercent: -15, duration: 0.45, ease: "power2.in" }, "s3")
      .fromTo(".st-c", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "s3+=0.3")
      .fromTo(stampP, { v: 0 }, { v: () => M().goal, duration: 0.8, onUpdate: () => $$(".st-card .pstamps span").forEach((s, i) => s.classList.toggle("on", i < Math.round(stampP.v))) })
      .to(".st-voucher", { y: 0, autoAlpha: 1, duration: 0.45, ease: "back.out(1.7)" })
      .to({}, { duration: 0.35 })
      .addLabel("s4")
      .to(".st-c", { autoAlpha: 0, scale: 0.92, duration: 0.45, ease: "power2.in" }, "s4")
      .fromTo(".st-d", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "s4+=0.3")
      .fromTo(".mini-bars", { scaleY: 0, transformOrigin: "bottom" }, { scaleY: 1, duration: 0.6, ease: "power2.out" })
      .fromTo(counter, { p: 0 }, { p: 1, duration: 0.9, ease: "power2.out", onUpdate: landingNumbers }, "<")
      .to({}, { duration: 0.4 });
    swap(0, 1, "s2"); swap(1, 2, "s3"); swap(2, 3, "s4");

    const mover = $(".bigline .mover");
    gsap.fromTo(mover, { x: 0 }, { x: () => -(mover.scrollWidth / 2), ease: "none", scrollTrigger: { trigger: ".bigline", start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
  });
  mm.add("(prefers-reduced-motion: reduce)", () => {
    $("#story").classList.add("static"); counter.p = 1; stampP.v = 3; landingNumbers();
    $("[data-compare=hero]").style.setProperty("--p", "40%");
    return () => $("#story").classList.remove("static");
  });
}

/* ======================= owner app ======================= */
const C = { img: null, src: "", isSample: false, look: "clean", magic: true, item: null, price: null, phase: "pick", size: "feed", cap: 0, capLang: null, capText: "", secs: 0, typed: false };
const R = { period: "this", made: false, fresh: false };
// best time to post: 7:30 pm, tomorrow if today's slot is under 30 minutes away
function bestTime() { const d = new Date(); d.setHours(19, 30, 0, 0); if (d - Date.now() < 30 * 60e3) d.setDate(d.getDate() + 1); return d.getTime(); }
const clock = (ms) => new Intl.DateTimeFormat(loc(), { hour: "numeric", minute: "2-digit" }).format(ms);
const whenTxt = (ms) => t(new Date(ms).toDateString() === new Date().toDateString() ? "sc.today" : "sc.tmr", { time: clock(ms) });
const AUTO_PLATS = ["fb", "ig", "tiktok", "threads"]; // open posting APIs; Xiaohongshu and Lemon8 get a WhatsApp reminder
function schedHTML(sc) {
  const auto = sc.plats.filter((p) => AUTO_PLATS.includes(p)), remind = sc.plats.filter((p) => !AUTO_PLATS.includes(p));
  const row = (time, logos, txt) => `<li><b>${time}</b><span class="logos">${logos}</span><span class="tl-txt">${txt}</span></li>`;
  return `<div class="panel sched">
    <div class="sched-h"><span class="sched-seal" data-seal="44"></span><div><h2 class="t-h3">${t("sc.h")}</h2><p class="muted">${t("sc.when", { when: whenTxt(sc.at) })}</p></div><span class="zone zone-demo">${t("demo")}</span></div>
    <ol class="tl">
      ${auto.length ? row(clock(sc.at), auto.map((p) => plat(p, 26, true)).join(""), t("sc.auto")) : ""}
      ${remind.length ? row(clock(sc.at), remind.map((p) => plat(p, 26, true)).join(""), t("sc.remind")) : ""}
      ${row(t("sc.resT"), seal(26), t("sc.res"))}
    </ol>
    <div class="btn-row"><button class="btn btn-white" data-act="unsched">${t("sc.undo")}</button><a class="btn btn-dark" href="#/home">${t("sc.done")}</a></div>
    <p class="fine">${t("po.demo")}</p>
  </div>`;
}
const PLAT_SIZE = { fb: "feed", ig: "feed", threads: "feed", xhs: "cover", lemon8: "cover", tiktok: "story" };
const RATIO = { feed: "4:5", cover: "3:4", story: "9:16" };
const OWN_PLATS = ["fb", "ig", "xhs", "tiktok", "threads", "lemon8"];
async function lookOpts(forceSample = false) {
  const m = M(), sample = forceSample || C.isSample || !C.img;
  const img = forceSample || !C.img ? await loadImg(m.photo) : C.img;
  const magicImg = sample && m.magic && (forceSample || C.magic) ? await loadImg(m.magic) : null;
  return { img, magicImg, m, item: forceSample ? L(m.item) : C.item ?? (C.isSample ? L(m.item) : ""), price: forceSample ? m.price : C.price ?? (C.isSample ? m.price : "") };
}
function weekPlan() {
  const looks = ["fun", "clean", "premium", "clean", "fun", "premium", "clean"], out = [];
  for (let i = 1; i <= 7; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    const weekend = d.getDay() % 6 === 0;
    d.setHours(weekend ? 10 : i % 2 ? 12 : 19, weekend ? 0 : 30, 0, 0);
    out.push({ d, look: looks[i - 1] });
  }
  return out;
}
const hbarLabel = (p) => `${plat(p, 22)}${esc(pname(p))}`;
// rows: [labelHTML, value, sub?, titleText?]
const hbars = (rows, max) => `<div class="hbars">${rows.map(([label, v, sub, title]) => { const w = Math.max(2, Math.round((v / max) * 70)); return `<div class="hbar" title="${esc(title || label)}: ${v}"><span>${title ? label : esc(label)}</span><div class="track"><i class="fill" style="--v:${w}%"></i><b class="val" style="--v:${w}%">${v}${sub ? `<small>${esc(sub)}</small>` : ""}</b></div></div>`; }).join("")}</div>`;
const platBars = (last) => { const rows = platCounts(last); return hbars(rows.map(([p, v]) => [hbarLabel(p), v, "", pname(p)]), rows[0][1]); };
const lovedBars = (last) => { const m = M(), rows = lovedCounts(last); return hbars(rows.map(([k, v]) => [L(m.vibes[k].chip), v]), rows[0][1]); };

const VIEWS = {
  home() {
    const m = M(), d = D(), pending = m.reviews.filter((r) => !d.reviews[r.id]).length, sc = d.sched?.at > Date.now() ? d.sched : null;
    const date = new Intl.DateTimeFormat(loc(), { weekday: "long", day: "numeric", month: "long" }).format(new Date());
    return `
    <div class="hello"><div><p class="muted">${date}</p><h1 class="t-h1">${t("pc.hi", { name: esc(L(m.owner)) })}</h1></div></div>
    <div class="home-grid">
    <div class="power-card app-power">${powerCardHTML(false)}</div>
    <section class="today"><h2 class="t-h3">${t("home.powers")}</h2>
      ${sc ? `<div class="row-link"><span class="ic">${IC.week}</span><span class="txt"><b>${t("home.next", { item: esc(sc.item ?? L(m.item)), when: whenTxt(sc.at) })}</b><span class="logos">${sc.plats.map((p) => plat(p, 20, true)).join("")}</span></span></div>`
        : `<a class="row-link" href="#/create"><span class="ic">${IC.create}</span><span class="txt"><b>${t("tl.create")}</b><small>${t("tl.createS")}</small></span><span class="chev" aria-hidden="true">›</span></a>`}
      ${tileHTML(WEEK_TILE, "wide").replace("</a>", `<span class="zone zone-red">${t("tl.new")}</span></a>`)}
      <div class="nudge">${d.quietSent ? `<p>${t("home.nudgeDone", { n: m.base.yes })}</p>` : `<p>${t("home.nudge", { n: quietLeft(), d: m.quietDays })}</p><button class="btn btn-dark" data-act="voucher">${t("home.nudgeBtn")}</button>`}</div>
      <button class="row-link" data-act="reviews">${pending ? `<i class="dot"></i>${t("home.reviews", { n: pending })}` : t("home.reviewsDone")}<span class="chev" aria-hidden="true">›</span></button>
    </section>
    </div>`;
  },
  create() {
    const m = M();
    if (C.phase === "week") {
      const plan = weekPlan(), df = new Intl.DateTimeFormat(loc(), { weekday: "short", day: "numeric", month: "short" }), tf = new Intl.DateTimeFormat(loc(), { hour: "numeric", minute: "2-digit" });
      return `
      <div class="result-h"><span class="res-seal" data-seal="56"></span><div><h1 class="t-h1">${t("wk.h")}</h1><p class="muted">${t("wk.s")}</p></div></div>
      <div class="week">${plan.map((p, i) => `<div class="day"><canvas data-day="${i}" data-look="${p.look}"></canvas><b>${df.format(p.d)}</b><small>${tf.format(p.d)} · ${t("look." + p.look)}</small><small class="cap">${esc(ownerCaption(p.look, S.lang, i).split("\n")[0])}</small></div>`).join("")}
        <div class="day saved"><canvas data-day="saved" data-look="festive"></canvas><b>${t("wk.saved")}</b><small>${t("look.festive")}</small></div></div>
      ${D().weekOk ? `<p class="zone zone-jade" style="justify-self:start">${t("wk.done")}</p>` : ""}
      <button class="btn btn-seal btn-xl" data-act="waOpen">${plat("wa", 26)}${t("wk.wa")}</button>
      <button class="btn btn-white btn-w" data-act="weekBack">${t("wk.back")}</button>
      <p class="fine" style="text-align:center">${t("ws.demo")}</p>
      <p style="text-align:center"><button class="link" data-act="ownerReset">${t("cr.new")}</button></p>`;
    }
    if (C.phase === "pick" || !C.img) return `
      <h1 class="t-h1">${t("cr.h")}</h1>
      <label class="drop"><span class="ic">${IC.create}</span><b>${t("cr.drop")}</b><span class="muted">${t("cr.dropS")}</span><input type="file" accept="image/*" data-file="owner" hidden></label>
      <p class="or">${t("cr.or")}</p>
      <div class="samples"><button data-act="ownerSample"><img src="${m.photo}" alt="">${esc(L(m.item))}</button></div>`;
    if (C.phase === "edit") {
      const canMagic = C.isSample && m.magic, itemNow = C.item ?? (C.isSample ? L(m.item) : "");
      return `
      <h1 class="t-h1">${t("cr.h")}</h1>
      <div class="photo-row"><img src="${C.src}" alt=""><div><b>${t("cr.yours")}</b><span class="muted">${C.isSample ? esc(L(m.item)) : ""}</span></div><button class="btn btn-white btn-s" data-act="ownerReset">${t("cr.change")}</button></div>
      <h2 class="t-h3">${t("cr.look")}</h2>
      <div class="looks">${Object.keys(LOOKS).map((k) => `<button class="look" data-act="look" data-look="${k}" aria-pressed="${C.look === k}"><canvas data-thumb="${k}"></canvas>${t("look." + k)}</button>`).join("")}</div>
      <div class="fields">
        <label class="fld">${t("cr.item")}<input data-in="item" value="${esc(itemNow)}" maxlength="40" placeholder="${t("cr.itemPh")}" aria-describedby="item-hint"></label>
        <label class="fld">${t("cr.price")}<input data-in="price" value="${esc(C.price)}" maxlength="14" placeholder="RM 9.90"></label>
      </div>
      <p class="hint" id="item-hint" ${itemNow.trim() ? "hidden" : ""}>${t("cr.itemNeed")}</p>
      ${C.look === "premium" ? `<label class="toggle"><span>${t("cr.magic")}<small>${canMagic ? t("cr.magicS") : t("cr.magicNo")}</small></span><input type="checkbox" data-in="magic" ${canMagic && C.magic ? "checked" : ""} ${canMagic ? "" : "disabled"}></label>` : ""}
      <button class="btn btn-seal btn-xl" data-act="make" ${itemNow.trim() ? "" : "disabled"}>${t("cr.go")}</button>`;
    }
    const cl = C.capLang || S.lang;
    return `
      <div class="result-h"><span class="res-seal" data-seal="56"></span><div><h1 class="t-h1">${t("cr.done")}</h1><p class="muted">${t("cr.took", { s: C.secs })}</p></div></div>
      <div class="poster-box ${C.size}-size">${compareHTML("final", 22)}</div>
      <div class="btn-row"><button class="btn btn-white" data-act="ownerShare">${SVG.share}${t("cr.share")}</button><button class="btn btn-white" data-act="ownerSave">${SVG.down}${t("cr.save")}</button></div>
      ${C.sched ? schedHTML(C.sched) + `<div class="autopilot"><span class="ic">${IC.week}</span><h2 class="t-h3">${t("ap.h")}</h2><p>${t("ap.s")}</p><button class="btn btn-seal" data-act="week">${t("ap.go")}</button></div>` : `
      <div class="panel">
        <div class="panel-head"><h2 class="t-h4">${t("po.h")}</h2><span class="zone zone-demo">${t("demo")}</span></div>
        <p class="muted pv-s">${t("po.s")}</p>
        <div class="pvs">${OWN_PLATS.map((p) => { const [w, h] = SIZES[PLAT_SIZE[p]]; return `<label class="pv"><canvas data-pv="${p}" width="${w / 3}" height="${h / 3}"></canvas><span class="pv-name"><input type="checkbox" data-pt="${p}" checked>${plat(p, 22)}${esc(pname(p))}</span><small>${RATIO[PLAT_SIZE[p]]}</small></label>`; }).join("")}</div>
        <div class="cap-head"><h3 class="t-h5">${t("cr.cap")}</h3><button class="link" data-act="capNext">${t("cr.another")}</button>
          <div class="seg seg-s" role="group" aria-label="${t("cr.cap")}"><button data-act="capLang" data-l="en" aria-pressed="${cl === "en"}">EN</button><button data-act="capLang" data-l="zh" aria-pressed="${cl === "zh"}">中文</button></div></div>
        <label class="fld"><textarea data-in="cap" rows="4" aria-label="${t("cr.cap")}">${C.typed ? esc(C.capText) : ""}</textarea></label>
        <button class="btn btn-seal btn-w" data-act="postAll">${t("po.go", { n: OWN_PLATS.length })}</button>
      </div>`}
      <p style="text-align:center"><button class="link" data-act="ownerReset">${t("cr.new")}</button></p>`;
  },
  share() {
    const m = M(), d = D();
    return `
    <h1 class="t-h1">${t("sh.h")}</h1>
    <p class="t-lead muted">${t("sh.s")}</p>
    ${d.qr ? `
      <div class="tent"><div class="tent-top"><span>${esc(m.name)}</span><b>${t("sh.card")}</b></div><canvas data-qr aria-label="QR code"></canvas><div class="ready-row">${PLAT_ORDER.map((p) => plat(p, 28, true)).join("")}</div>${d.chal ? `<span class="zone zone-red chal" style="margin-bottom:18px">${t("sh.chalS")}</span>` : ""}</div>
      <div class="btn-row no-print"><a class="btn btn-seal" href="#/c?m=${m.id}">${t("sh.open")}</a><button class="btn btn-dark" data-act="print">${t("sh.print")}</button></div>`
      : `<button class="btn btn-seal btn-xl" data-act="qrOn">${t("sh.go")}</button>`}
    <label class="toggle no-print"><span>${t("sh.chal")}<small>${t("sh.chalS")}</small></span><input type="checkbox" data-in="chal" ${d.chal ? "checked" : ""}></label>
    <div class="no-print"><h2 class="t-h3" style="margin-bottom:10px">${t("sh.themes")}</h2>
      <div class="themes" tabindex="0" role="region" aria-label="${t("sh.themes")}">${THEMES.map(([k]) => `<figure><canvas data-theme="${k}"></canvas>${t("th." + k)}</figure>`).join("")}</div></div>
    <a class="row-link no-print" href="#/report">${t("sh.results")}<span class="chev" aria-hidden="true">›</span></a>`;
  },
  members() {
    const m = M(), d = D();
    return `
    <h1 class="t-h1">${t("mb.h")}</h1>
    <div class="pass"><div class="pass-top"><p class="pass-name">${t("mb.club", { shop: esc(m.name) })}</p><span class="pass-lv">${t("demo")}</span></div><p class="pass-rew">${L(m.reward)}</p>${stampsHTML(3, m.goal)}</div>
    <div class="kpis" style="grid-template-columns:repeat(3,1fr)"><div class="kpi"><b>${membersTotal()}</b><span>${t("mb.total")}</span></div><div class="kpi"><b>${n("joins")}</b><span>${t("mb.new")}</span></div><div class="kpi"><b>${n("rewards")}</b><span>${t("mb.rew")}</span></div></div>
    <div class="nudge">${d.quietSent ? `<p>${t("home.nudgeDone", { n: m.base.yes })}</p>` : `<p>${t("home.nudge", { n: quietLeft(), d: m.quietDays })}</p><button class="btn btn-dark" data-act="voucher">${t("home.nudgeBtn")}</button>`}</div>
    <div class="btn-row"><a class="btn btn-seal" href="#/staff">${t("mb.staff")}</a><a class="btn btn-white" href="#/c?m=${m.id}">${t("mb.join")}</a></div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("mb.rules")}</h2><ul class="next">
      ${[L(m.reward), t("mb.verify"), t("mb.window", { d: m.quietDays }), t("mb.optin")].map((x) => `<li>${seal(20)}<span>${x}</span></li>`).join("")}</ul></div>`;
  },
  report() {
    const m = M(), d = D(), last = R.period === "last";
    const monthName = new Intl.DateTimeFormat(loc(), { month: "long", year: "numeric" }).format(new Date(new Date().getFullYear(), new Date().getMonth() - (last ? 1 : 0), 1));
    const v = last ? m.last : { posts: n("posts"), styled: n("styled"), scans: n("scans") + d.styled, shares: n("shares"), visits: m.base.visits, joins: n("joins"), returns: n("returns"), spend: n("spend"), sent: n("sent"), redeemed: m.base.redeemed, money: m.base.money };
    if (!R.made) return `
      <div class="rep-head"><p class="eyebrow">${esc(m.name)}, ${monthName}</p><h1 class="t-h1">${t("rp.gen")}</h1><p style="color:rgb(255 255 255 / .75)">${t("rp.genS")}</p>
        <button class="btn btn-seal btn-xl" data-act="makeReport">${t("rp.gen")}</button></div>`;
    const sr = series(), today = sr.days.length;
    const lastSame = (arr) => arr.slice(0, Math.min(today, arr.length)).reduce((a, b) => a + b, 0);
    const prorate = (x) => Math.round((x * today) / sr.lastDays.length);
    const delta = (now, then) => { if (last || !then) return ""; const p = Math.round((now / then - 1) * 100); return `<span class="delta ${p < 0 ? "down" : ""}">${p >= 0 ? "+" : ""}${p}% ${t("rp.vs")}</span>`; };
    const kpi = (val, key, dl) => `<div class="kpi"><b data-v="${val}">${val}</b><span>${t(key)}</span>${dl}</div>`;
    const shares = split(v.shares, m.styles.map(([, w]) => w)), maxStyle = Math.max(...shares);
    const next = [...m.next.map(L), d.quietSent ? t("nx.sent") : t("nx.quiet", { n: m.base.quiet })];
    const dfm = new Intl.DateTimeFormat(loc(), { day: "numeric", month: "short" }), dDays = last ? sr.lastDays : sr.days, dVals = last ? sr.lastStyled : sr.styled;
    const ca = cumsum(sr.returns), cb = cumsum(sr.lastReturns);
    const tv = (head, rows) => `<details class="tv"><summary>${t("ch.table")}</summary><div class="tv-scroll" tabindex="0" role="region" aria-label="${t("ch.table")}"><table><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`)).join("")}</tr>`).join("")}</tbody></table></div></details>`;
    return `
    <div class="rep-head"><p class="eyebrow">${esc(m.name)}, ${monthName}</p><h1 class="t-h1">${t("rp.head", { s: rm(v.spend) })}</h1>
      <p class="rep-sub">${t("rp.headS", { r: v.returns, j: v.joins })}</p>
      <div class="vs">${[[t("rp.vsSpend"), v.spend, ""], [t("rp.vsPlan"), PLANS[0].mo, "cost"]].map(([k, x, c]) => `<div class="vs-row ${c}"><span>${k}</span><i style="--v:${Math.round((x / Math.max(v.spend, PLANS[0].mo)) * 100)}%"></i><b>${rm(x)}</b></div>`).join("")}</div>
      <p class="rep-cav">${t("rp.cav")}</p>
      <div class="seg no-print" role="group"><button data-act="period" data-p="this" aria-pressed="${!last}">${t("rp.this")}</button><button data-act="period" data-p="last" aria-pressed="${last}">${t("rp.last")}</button></div></div>
    <div class="kpis">
      ${kpi(v.posts + v.styled, "k.photos", delta(v.posts + v.styled, lastSame(sr.lastStyled) + prorate(m.last.posts)))}
      ${kpi(v.shares, "k.shares", delta(v.shares, prorate(m.last.shares)))}
      ${kpi(v.joins, "k.joins", delta(v.joins, prorate(m.last.joins)))}
      ${kpi(v.returns, "k.returns", delta(v.returns, lastSame(sr.lastReturns)))}
    </div>
    <div class="rep-grid">
    <div class="panel"><div class="panel-head"><div><h2 class="t-h4">${t("ch.daily")}</h2><p class="fine">${t("ch.dailyS")}</p></div><span class="zone zone-demo">${t("demo")}</span></div><div class="chart" data-chart="daily"></div>${tv([t("ch.day"), t("ch.photosCol")], dDays.map((x, i) => [dfm.format(x), dVals[i]]))}</div>
    <div class="panel"><h2 class="t-h4">${t("ch.run")}</h2><div class="legend"><span><i style="background:var(--chart-a)"></i>${t("ch.this")}</span><span><i style="background:var(--chart-b)"></i>${t("ch.last")}</span></div><div class="chart" data-chart="run"></div>${tv([t("ch.day"), t("ch.this"), t("ch.last")], Array.from({ length: Math.max(ca.length, cb.length) }, (_, i) => [i + 1, ca[i] ?? "-", cb[i] ?? "-"]))}</div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.plat")}</h2>${platBars(last)}</div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.loved")}</h2>${lovedBars(last)}</div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.funnel")}</h2>
      ${hbars([[t("fl.scans"), v.scans], [t("fl.styled"), v.styled, t("ch.ofScans", { p: Math.round((v.styled / v.scans) * 100) })], [t("fl.shares"), v.shares, t("ch.ofScans", { p: Math.round((v.shares / v.scans) * 100) })], [t("fl.joins"), v.joins, t("ch.ofScans", { p: Math.round((v.joins / v.scans) * 100) })]], v.scans)}</div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.styles")}</h2>
      ${hbars(m.styles.map(([k], i) => [t("th." + k), shares[i]]), maxStyle)}</div>
    <div class="panel span2"><h2 class="t-h4" style="margin-bottom:12px">${t("rp.s4")}</h2><ul class="next">${next.map((x) => `<li>${seal(20)}<span>${esc(x)}</span></li>`).join("")}</ul>
      <div class="money" style="margin-top:16px"><b>RM ${v.money}</b><span>${t("r.money")}</span><small>${t("r.moneyS")}</small></div></div>
    </div>
    <button class="btn btn-dark btn-w no-print" data-act="print">${t("rp.pdf")}</button>
    <p class="no-print" style="text-align:center"><button class="link fine" data-act="reset">${t("rp.reset")}</button></p>`;
  },
};

/* ---- line charts: plain SVG, hover tooltips, colours from the validated pair ---- */
function nice(max, k = 3) { const raw = Math.max(1, max) / k, p = 10 ** Math.floor(Math.log10(raw)), step = [1, 2, 2.5, 5, 10].map((x) => x * p).find((x) => x >= raw); return { step, top: step * Math.ceil(max / step) }; }
function lineChart(el, { lines, xLen, labels, tipFor, area }) {
  const W = Math.max(280, el.clientWidth), H = Math.round(Math.min(260, Math.max(190, W * 0.4))), pl = 34, pr = labels ? 104 : 16, pt = 14, pb = 28;
  const iw = W - pl - pr, ih = H - pt - pb, max = Math.max(...lines.flatMap((l) => l.values)), { step, top } = nice(max);
  const x = (i) => pl + (i / (xLen - 1)) * iw, y = (v) => pt + ih - (v / top) * ih;
  const ticks = []; for (let v = 0; v <= top; v += step) ticks.push(v);
  const xt = [0, 7, 14, 21, 28].filter((i) => i < xLen);
  const path = (vals) => vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const ends = lines.map((l) => ({ ...l, ex: x(l.values.length - 1), ey: y(l.values.at(-1)) }));
  if (ends.length === 2 && Math.abs(ends[0].ey - ends[1].ey) < 30) { const [a, b] = ends[0].ey < ends[1].ey ? ends : [ends[1], ends[0]]; const mid = (a.ey + b.ey) / 2; a.ly = mid - 15; b.ly = mid + 15; }
  const endLabel = (l) => (l.values.length < xLen - 1
    ? `<text class="lbl" x="${l.ex - 8}" y="${l.ey - 12}" text-anchor="end">${l.values.at(-1)}<tspan class="lbl-2" dx="5">${esc(l.name)}</tspan></text>`
    : `<text class="lbl" x="${l.ex + 10}" y="${(l.ly ?? l.ey) + 4}">${l.values.at(-1)}<tspan class="lbl-2" dx="5">${esc(l.name)}</tspan></text>`);
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(el.closest(".panel")?.querySelector("h2")?.textContent || "")}">
    <defs><linearGradient id="ga-${el.dataset.chart}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${CHART_A}" stop-opacity=".18"/><stop offset="1" stop-color="${CHART_A}" stop-opacity="0"/></linearGradient></defs>
    <g class="grid">${ticks.map((v) => `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}"/>`).join("")}</g>
    <g class="axis">${ticks.map((v) => `<text x="${pl - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}${xt.map((i) => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle">${i + 1}</text>`).join("")}</g>
    ${area ? `<path class="area" d="${path(lines[0].values)}L${x(lines[0].values.length - 1)},${y(0)}L${x(0)},${y(0)}Z" fill="url(#ga-${el.dataset.chart})"/>` : ""}
    ${lines.map((l) => `<path class="ln" d="${path(l.values)}" fill="none" stroke="${l.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`).join("")}
    ${ends.map((l) => `<circle cx="${l.ex}" cy="${l.ey}" r="4.5" fill="${l.color}" stroke="#fff" stroke-width="2"/>${labels ? endLabel(l) : ""}`).join("")}
    <line class="cross" y1="${pt}" y2="${pt + ih}" x1="-10" x2="-10"/>
    ${lines.map((l, i) => `<circle class="hov" data-i="${i}" r="5" cx="-10" cy="-10" fill="${l.color}" stroke="#fff" stroke-width="2"/>`).join("")}
    <rect class="hit" x="${pl}" y="${pt}" width="${iw}" height="${ih}"/></svg><div class="tip" hidden></div>`;
  const svg = $("svg", el), tip = $(".tip", el), cross = $(".cross", el), hov = $$(".hov", el);
  const show = (e) => {
    const r = svg.getBoundingClientRect(), px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.max(0, Math.min(xLen - 1, Math.round(((px - pl) / iw) * (xLen - 1))));
    cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i));
    let topY = H;
    hov.forEach((c, k) => { const v = lines[k].values[i]; if (v === undefined) { c.setAttribute("cy", -10); return; } c.setAttribute("cx", x(i)); c.setAttribute("cy", y(v)); topY = Math.min(topY, y(v)); });
    tip.innerHTML = tipFor(i); tip.hidden = false; el.classList.add("hovering");
    tip.style.left = `${(x(i) / W) * r.width}px`; tip.style.top = `${(topY / H) * r.height}px`;
  };
  const hide = () => { tip.hidden = true; el.classList.remove("hovering"); };
  $(".hit", el).addEventListener("pointermove", show);
  $(".hit", el).addEventListener("pointerdown", show);
  $(".hit", el).addEventListener("pointerleave", hide);
}
function drawCharts(animateIn) {
  const daily = $("[data-chart=daily]"), run = $("[data-chart=run]");
  if (!daily) return;
  const sr = series(), last = R.period === "last";
  const days = last ? sr.lastDays : sr.days, vals = last ? sr.lastStyled : sr.styled;
  const df = new Intl.DateTimeFormat(loc(), { weekday: "short", day: "numeric", month: "short" });
  lineChart(daily, { area: true, xLen: days.length, lines: [{ name: t("ch.daily"), color: CHART_A, values: vals }], tipFor: (i) => `${df.format(days[i])}<br><b>${t("tip.photos", { n: vals[i] })}</b>` });
  const a = cumsum(sr.returns), b = cumsum(sr.lastReturns);
  lineChart(run, {
    labels: true, xLen: Math.max(sr.monthLen, b.length), lines: [{ name: t("ch.this"), color: CHART_A, values: a }, { name: t("ch.last"), color: CHART_B, values: b }],
    tipFor: (i) => `${zh() ? `${i + 1} 号` : `Day ${i + 1}`}<br>${a[i] !== undefined ? `<i style="background:var(--chart-a)"></i>${t("ch.this")}: <b>${a[i]}</b><br>` : ""}${b[i] !== undefined ? `<i style="background:var(--chart-b)"></i>${t("ch.last")}: <b>${b[i]}</b>` : ""}`,
  });
  if (!animateIn || REDUCED) return;
  $$(".chart .ln").forEach((p) => { const len = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out", clearProps: "strokeDasharray,strokeDashoffset" }); });
  gsap.from(".chart .area", { opacity: 0, duration: 1, delay: 0.4 });
}

// after-render painting (canvases need pixels, not HTML)
const AFTER = {
  async home() { countUp($("#view [data-count]"), power().p); },
  async create() {
    if (C.phase === "edit") paintThumbs();
    if (C.phase === "done") {
      const [w, h] = SIZES[C.size], box = $("[data-compare=final]");
      $(".cmp-before", box).src = C.src;
      const o = await lookOpts();
      await paint($(".cmp-after", box), w, h, LOOKS[C.look], o);
      // Xiaohongshu and Lemon8 get the stroked-title cover people expect there; the rest use the chosen look
      for (const c of $$("[data-pv]")) {
        const sz = PLAT_SIZE[c.dataset.pv], [pw, ph] = SIZES[sz];
        await paint(c, pw / 3, ph / 3, sz === "cover" ? themeFn("xhs") : LOOKS[C.look], sz === "cover" ? { img: o.magicImg || o.img, m: o.m, title: o.item || o.m.name, sub: [o.m.name, o.price].filter(Boolean).join(" ") } : o);
      }
      if (!C.typed) { C.typed = true; typeInto($("[data-in=cap]"), C.capText); }
    }
    if (C.phase === "week") {
      const o = await lookOpts();
      for (const c of $$("[data-day]")) await paint(c, 432, 540, LOOKS[c.dataset.look], o);
    }
  },
  async share() {
    const ci = await loadImg(M().cust), xp = writePost("xhs", S.lang, sampleInput());
    $$("[data-theme]").forEach((c) => paint(c, 360, 450, themeFn(c.dataset.theme), { img: ci, m: M(), title: xp.title, sub: M().name }));
    const q = $("[data-qr]"); q && drawQR(q, custUrl(), INK);
  },
  async report() {
    if (!R.made) return;
    drawCharts(R.fresh);
    if (R.fresh && !REDUCED) {
      gsap.from("#view .kpi, #view .panel", { autoAlpha: 0, y: 24, duration: 0.5, stagger: 0.06, ease: "power3.out" });
      gsap.from("#view .hbar .fill", { scaleX: 0, duration: 0.9, ease: "power3.out", stagger: 0.04, delay: 0.3 });
      $$("#view .kpi [data-v]").forEach((b) => { const o = { v: 0 }; gsap.to(o, { v: +b.dataset.v, duration: 1.1, ease: "power2.out", onUpdate: () => (b.textContent = Math.round(o.v)) }); });
    }
    R.fresh = false;
  },
};
let thumbT;
async function paintThumbs() {
  const o = await lookOpts();
  $$("[data-thumb]").forEach((c) => paint(c, 288, 360, LOOKS[c.dataset.thumb], o));
}

/* ======================= customer QR flow: photo → 3 taps → style → a post for every platform ======================= */
const K = { img: null, src: "", isSample: false, step: "start", theme: 0, star: "", items: [], vibes: [], with: null, posts: {}, plat: "xhs", stars: 0, k: 0, skip: false, form: { name: "", phone: "", terms: false, mkt: false } };
const kInput = () => ({ m: M(), items: K.items, vibes: K.vibes, with: K.with, stars: K.stars });
const canWrite = () => K.items.length > 0 && K.vibes.length > 0;
function ensurePosts() { for (const p of PLAT_ORDER) if (!K.posts[p]) K.posts[p] = writePost(p, S.lang, kInput(), K.k); }
const postText = (p) => { const x = K.posts[p]; return (x.title ? `${x.title}\n\n` : "") + x.body; };
function checksHTML() {
  const res = checkPost(K.plat, S.lang, K.posts[K.plat], K.stars), ok = res.filter((r) => !r.bad).length;
  return `<summary><h2>${seal(18)}${t("ck.h")}<span class="grow"></span><span class="zone ${ok === res.length ? "zone-jade" : "zone-red"}">${t("ck.pass", { n: ok, m: res.length })}</span></h2></summary>
    <ul>${res.map((r) => `<li class="${r.bad ? "bad" : ""}">${esc(r.msg)}${r.fix ? `<button class="btn btn-white btn-s" data-act="pFix">${t("ck.fix")}</button>` : ""}</li>`).join("")}</ul>`;
}
// the check folds to one line when everything passes and opens itself when something needs fixing
const checksBad = () => checkPost(K.plat, S.lang, K.posts[K.plat], K.stars).some((r) => r.bad);
function repaintChecks() { const el = $("[data-checks]"); el.innerHTML = checksHTML(); if (checksBad()) el.open = true; seals(el); }
function custView() {
  const m = M(), d = D();
  const top = `<div class="cbar"><span class="cname">${esc(m.name)}</span><span class="grow"></span><div class="lang-pills" role="group" aria-label="Language"><button data-setlang="en" aria-pressed="${!zh()}">EN</button><button data-setlang="zh" aria-pressed="${zh()}">中文</button></div></div>`;
  const foot = `<p class="powered small-link" style="text-decoration:none;display:flex;gap:8px;align-items:center;justify-content:center;opacity:.75">${seal(18)}${t("powered")}</p>`;
  if (K.step === "start" || !K.img) return `<div class="cwrap">${top}
    <div class="ch"><h1 class="t-display">${t("c.h")}</h1><p style="opacity:.85">${t("c.free")}</p></div>
    <label class="btn btn-seal btn-xl">${IC.create.replace("<svg", '<svg aria-hidden="true"')}${t("c.take")}<input type="file" accept="image/*" data-file="cust" hidden></label>
    <div class="samples"><button data-act="custSample"><img src="${m.cust}" alt="">${t("c.or")}</button></div>
    <a class="small-link" href="#/home">${t("c.back")}</a>${foot}</div>`;
  if (K.step === "tell") return `<div class="cwrap">${top}
    <div><h1 class="t-h1">${t("c.tellH")}</h1><p style="opacity:.85;margin-top:6px">${t("c.tellS")}</p></div>
    <div class="qgroup"><h2>${t("c.t1")}</h2><div class="qchips">${m.menu.map((x, i) => `<button data-act="qItem" data-i="${i}" aria-pressed="${K.items.includes(i)}">${esc(L(x))}</button>`).join("")}</div></div>
    <div class="qgroup"><h2>${t("c.t2")}<small>${t("c.t2s")}</small></h2><div class="qchips">${Object.entries(m.vibes).map(([k, v]) => `<button data-act="qVibe" data-v="${k}" aria-pressed="${K.vibes.includes(k)}">${esc(L(v.chip))}</button>`).join("")}</div></div>
    <div class="qgroup"><h2>${L(m.withQ)}</h2><div class="qchips">${Object.entries(m.with).map(([k, v]) => `<button data-act="qWith" data-w="${k}" aria-pressed="${K.with === k}">${esc(L(v.chip))}</button>`).join("")}</div></div>
    <button class="btn btn-seal btn-xl" data-act="custWrite" ${canWrite() ? "" : "disabled"}>${t("c.write")}</button>
    <p class="tname" data-need ${canWrite() ? "hidden" : ""} style="font-weight:500;opacity:.85">${t("c.need")}</p></div>`;
  if (K.step === "style") return `<div class="cwrap">${top}
    <h1 class="tname">${t("c.swipe")}</h1>
    <div class="carousel" data-carousel tabindex="0" role="region" aria-label="${t("c.swipe")}">${THEMES.map(([k]) => `<canvas data-ctheme="${k}" aria-label="${t("th." + k)}"></canvas>`).join("")}</div>
    <div class="cdots">${THEMES.map((_, i) => `<i class="${i === K.theme ? "on" : ""}"></i>`).join("")}</div>
    <p class="tname" data-tname>${t("th." + THEMES[K.theme][0])}</p>
    <label class="fld" data-starfld ${THEMES[K.theme][0] === "mag" ? "" : "hidden"}>${t("c.star")}<input data-in="star" value="${esc(K.star)}" maxlength="18" autocomplete="given-name"></label>
    <button class="btn btn-seal btn-xl" data-act="custUse">${t("c.use")}</button>
    <button class="small-link" data-act="custBack">${t("c.tellH")}</button></div>`;
  if (K.step === "posts") {
    ensurePosts();
    const p = K.plat, post = K.posts[p];
    return `<div class="cwrap">${top}
    <div class="famous"><span class="fm-seal" data-seal="52"></span><div><h1>${t("c.ready")}</h1><span>${t("c.readyS")}</span></div></div>
    <div class="ccard">
      <div class="ptabs" role="tablist" aria-label="${t("c.where")}">${PLAT_ORDER.map((x) => `<button role="tab" aria-selected="${x === p}" data-act="ptab" data-p="${x}">${plat(x, 34)}${esc(pname(x))}</button>`).join("")}</div>
      <div class="pprev"><canvas data-pcanvas aria-label="${esc(pname(p))}"></canvas></div>
      ${p === "google" ? `<div><p class="t-h4">${t("c.stars")}</p><div class="starpick" role="radiogroup" aria-label="${t("c.stars")}">${[1, 2, 3, 4, 5].map((s) => `<button role="radio" aria-checked="${K.stars === s}" aria-label="${s}" class="${s <= K.stars ? "on" : ""}" data-act="star" data-n="${s}">★</button>`).join("")}</div><p class="honest" style="margin-top:6px">${t("c.starsS")}</p></div>` : ""}
      ${post.title !== undefined ? `<label class="fld">${t("c.title")}<input data-in="ptitle" value="${esc(post.title)}" maxlength="60"></label>` : ""}
      <label class="fld">${t("c.text")}<textarea data-in="pbody" rows="7">${esc(post.body)}</textarea></label>
      <details class="pchecks" data-checks ${checksBad() ? "open" : ""}>${checksHTML()}</details>
      <button class="btn btn-seal btn-xl" data-act="postPlat">${plat(p, 26)}${t("c.post", { p: pname(p) })}</button>
      <div class="btn-row"><button class="btn btn-white" data-act="pCopy">${t("cr.copy")}</button><button class="btn btn-white" data-act="pSave">${t("c.save")}</button></div>
      <button class="link" style="justify-self:center" data-act="pAnother">${t("c.another")}</button>
    </div>
    ${d.member ? `<div class="ccard"><p class="t-h4">${t("c.member", { n: d.member.stamps, g: m.goal })}</p><button class="btn btn-dark btn-w" data-act="custCard">${t("c.show")}</button></div>`
      : K.skip ? `<button class="small-link" data-act="custReset">${t("c.again")}</button>`
      : `<div class="ccard"><p class="t-h3">${t("c.join", { shop: esc(m.name) })}</p><p class="muted">${t("c.joinS", { reward: L(m.reward) })}</p>
         <button class="btn btn-dark btn-w" data-act="custJoin">${t("c.joinBtn")}</button><button class="small-link" style="color:var(--ink)" data-act="custSkip">${t("c.skip")}</button></div>`}
    ${foot}</div>`;
  }
  if (K.step === "join") return `<div class="cwrap">${top}
    <h1 class="t-h1 ch">${t("c.join", { shop: esc(m.name) })}</h1>
    <label class="fld">${t("c.name")}<input data-in="fname" value="${esc(K.form.name)}" autocomplete="given-name" maxlength="30"></label>
    <label class="fld">${t("c.phone")}<input data-in="fphone" value="${esc(K.form.phone)}" type="tel" autocomplete="tel" maxlength="16"></label>
    <label class="check"><input type="checkbox" data-in="fterms" ${K.form.terms ? "checked" : ""}>${t("c.terms")}</label>
    <label class="check"><input type="checkbox" data-in="fmkt" ${K.form.mkt ? "checked" : ""}>${t("c.mkt")}</label>
    <button class="btn btn-seal btn-xl" data-act="custJoinGo" ${K.form.terms ? "" : "disabled"}>${t("c.joinGo")}</button></div>`;
  if (!d.member) { K.step = "start"; return custView(); }
  return `<div class="cwrap">${top}
    <div class="pass"><div class="pass-top"><p class="pass-name">${t("mb.club", { shop: esc(m.name) })}</p><span class="pass-lv">${esc(d.member.name)}</span></div><p class="pass-rew">${L(m.reward)}</p>${stampsHTML(d.member.stamps, m.goal)}</div>
    <div class="ccard"><canvas class="qr" data-mqr aria-label="Member QR"></canvas><p style="text-align:center;font-weight:700">${t("c.card")}</p>
      <p class="muted" style="text-align:center">${t("c.stamps", { n: d.member.stamps, g: m.goal })}</p></div>
    <button class="btn btn-seal btn-xl" data-act="custReset">${t("c.again")}</button>
    <a class="small-link" href="#/staff">${t("c.staff")}</a>
    <a class="small-link" href="#/home">${t("c.back")}</a>${foot}</div>`;
}
const coverOpts = () => { const m = M(), x = writePost("xhs", S.lang, kInput(), K.k); return { img: K.img, m, star: K.star.trim(), title: (K.posts.xhs || x).title, sub: `${m.name}${zh() ? "·" : ", "}${L(m.city)}` }; };
async function paintPlatform() {
  const c = $("[data-pcanvas]"); if (!c) return;
  const [rw, rh] = PLATS[K.plat].ratio;
  await paint(c, 1080, (1080 * rh) / rw, THEMES[K.theme][1], coverOpts());
}
async function custAfter() {
  const m = M();
  if (K.step === "style") {
    const car = $("[data-carousel]"), o = coverOpts();
    await Promise.all($$("[data-ctheme]").map((c, i) => paint(c, 720, 900, THEMES[i][1], o)));
    const step = () => car.firstElementChild.offsetWidth + 12;
    car.scrollLeft = K.theme * step();
    car.onscroll = () => {
      const i = Math.round(car.scrollLeft / step());
      if (i === K.theme || !THEMES[i]) return;
      K.theme = i; $$(".cdots i").forEach((d, j) => d.classList.toggle("on", j === i)); $("[data-tname]").textContent = t("th." + THEMES[i][0]);
      $("[data-starfld]").hidden = THEMES[i][0] !== "mag";
    };
  }
  if (K.step === "posts") { await paintPlatform(); }
  if (K.step === "card") {
    drawQR($("[data-mqr]"), `GOAI-MEMBER:${m.id}:${D().member.id}`);
    if (!REDUCED) $$(".cwrap .pstamps .on i").forEach((el, i) => gsap.fromTo(el, { scale: 1.8, rotation: -20, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.4, delay: 0.15 + i * 0.08, ease: "back.out(2.2)" }));
  }
}

/* ======================= staff scan ======================= */
const ST = { scanned: false, receipt: "", amount: null, res: null };
const newReceipt = () => `A-${1000 + Math.floor(Math.random() * 9000)}`;
function staffView() {
  const m = M(), d = D(), mem = d.member;
  const res = ST.res && { ok: t("s.ok"), okr: t("s.okr"), dup: t("s.dup"), nor: t("s.nor"), needr: t("s.needr") }[ST.res];
  return `<div class="swrap">
    <div class="cbar"><h1 class="cname">${t("s.h")}${zh() ? "·" : ", "}${esc(m.name)}</h1><span class="grow"></span><div class="lang-pills" role="group" aria-label="Language"><button data-setlang="en" aria-pressed="${!zh()}">EN</button><button data-setlang="zh" aria-pressed="${zh()}">中文</button></div></div>
    ${!mem ? `<p class="t-h3">${t("s.none")}</p><a class="btn btn-seal" href="#/c?m=${m.id}">${t("mb.join")}</a>` : !ST.scanned
      ? `<button class="btn btn-seal huge" data-act="scan">${t("s.scan")}</button><p style="text-align:center;opacity:.7;font-size:14px">${t("s.scanS")}</p>`
      : `<div class="pass"><div class="pass-top"><p class="pass-name">${esc(mem.name)}</p>${mem.stamps >= m.goal ? `<span class="pass-lv">${t("s.ready")}</span>` : ""}</div><p class="pass-rew">${t("c.stamps", { n: mem.stamps, g: m.goal })}</p>${stampsHTML(mem.stamps, m.goal)}</div>
        ${res ? `<div class="result ${ST.res.startsWith("ok") ? "ok" : "bad"}" data-result>${ST.res.startsWith("ok") ? SVG.ok : SVG.no}<b>${res}</b>${ST.res === "dup" ? `<button class="btn btn-s btn-ghost" data-act="newReceipt">${t("s.newr")}</button>` : ""}</div>` : ""}
        <div class="fields"><label class="fld">${t("s.receipt")}<input data-in="receipt" value="${esc(ST.receipt)}" autocomplete="off" maxlength="12"></label>
          <label class="fld">${t("s.amount")}<input data-in="amount" value="${esc(ST.amount ?? m.avg)}" inputmode="decimal" autocomplete="off" maxlength="8"></label></div>
        <div class="big-btns"><button class="btn btn-seal huge" data-act="stamp">${t("s.add")}</button><button class="btn huge btn-ghost" data-act="redeem">${t("s.redeem")}</button></div>`}
    <a class="small-link" href="#/members">${t("c.back")}</a></div>`;
}

/* ======================= sheets ======================= */
const SHEETS = {
  shop() {
    return `<h2 class="t-h2">${t("yours.h")}</h2><p class="muted">${t("yours.s")}</p>
      <label class="fld">${t("yours.ph")}<input data-in="shopname" value="${esc(S.shop || "")}" placeholder="${esc(MERCH[S.m].name)}" maxlength="28" autocomplete="off"></label>
      <div class="seg" role="group" aria-label="${t("yours.type")}">${["cafe", "pet"].map((id) => `<button data-m="${id}" aria-pressed="${S.m === id}">${t("m." + id)}</button>`).join("")}</div>
      <button class="btn btn-dark btn-w" data-act="closeSheet">${t("sc.done")}</button>`;
  },
  voucher() {
    const m = M();
    return `<h2 class="t-h2">${t("v.h")}</h2>
      <div class="voucher" style="margin:14px 0 0;border-radius:20px;z-index:auto"><b>${L(m.off)}</b><span class="v-off">${t("v.terms")}</span></div>
      <p style="font-weight:500">${t("v.who", { a: m.base.yes, b: m.base.quiet })}</p>
      <div class="wa-thread"><div class="bub">${esc(t("v.msg", { name: "Aisyah", shop: m.name, off: L(m.off), date: fmtDate(14) }))}</div></div>
      <button class="btn btn-seal btn-w" data-act="sendQuiet">${t("v.go")}</button>
      <p class="fine" style="text-align:center">${t("v.demo")}</p>`;
  },
  reviews() {
    const m = M(), d = D();
    return `<h2 class="t-h2">${plat("google", 28).replace('class="pl"', 'class="pl" style="display:inline-block;vertical-align:-6px;margin-right:8px"')}${t("rv.h")}</h2>${m.reviews.map((r) => `
      <div class="review panel"><p><b>${r.who}</b> <span class="stars" aria-label="${r.stars} stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</span></p>
        <p>${esc(L(r.text))}</p>${r.stars <= 3 ? `<p class="flag">${t("rv.check")}</p>` : ""}
        <p class="eyebrow">${t("rv.draft")}</p><div class="wa-thread" style="min-height:0"><div class="bub">${esc(L(r.reply))}</div></div>
        ${d.reviews[r.id] ? `<p style="font-weight:600;color:var(--jade)">${t("rv.done")}</p>` : `<button class="btn btn-dark btn-s" data-act="approve" data-id="${r.id}">${t("rv.ok")}</button>`}</div>`).join("")}
      <p class="fine" style="text-align:center">${t("rv.demo")}</p>`;
  },
  wa() {
    return `<div class="wa-head"><span class="wa-av">${seal(40)}</span><div><b>Go AI</b><small>${t("ws.online")}</small></div><span class="grow"></span><span class="zone zone-demo">${t("demo")}</span></div>
      <div class="wa-thread" data-sthread><div class="bub"><div class="thumbs">${[0, 1, 2, 3].map((i) => `<canvas data-wt="${i}"></canvas>`).join("")}</div>${esc(t("ws.hi", { name: L(M().owner) }))}</div></div>
      <div class="qr-replies" data-sreplies><button data-act="waYes">${t("ws.r1")}</button><button data-act="waNo">${t("ws.r2")}</button></div>
      <p class="fine" style="text-align:center">${t("ws.demo")}</p>`;
  },
};
const SHEET_AFTER = {
  async wa() {
    const o = await lookOpts(), plan = weekPlan();
    $$("[data-wt]").forEach((c, i) => paint(c, 216, 270, LOOKS[plan[i].look], o));
  },
};
// a tiny chat: my reply, typing dots, the bot's answer
async function chat(thread, mine, theirs, extra = "") {
  thread.insertAdjacentHTML("beforeend", `<div class="bub me">${esc(mine)}</div>`);
  pop(thread.lastElementChild);
  await wait(350);
  thread.insertAdjacentHTML("beforeend", `<div class="bub typing"><i></i><i></i><i></i></div>`);
  await wait(REDUCED ? 0 : 900);
  thread.lastElementChild.outerHTML = `<div class="bub">${extra}${esc(theirs)}</div>`;
  pop(thread.lastElementChild);
  thread.scrollTop = thread.scrollHeight;
}

/* ======================= actions ======================= */
async function useFile(file, who) {
  if (!file) return;
  const src = URL.createObjectURL(file);
  try {
    const img = await loadImg(src);
    if (who === "owner") Object.assign(C, { img, src, isSample: false, phase: "edit", item: "", price: "", magic: false });
    else Object.assign(K, { img, src, isSample: false, step: "tell", theme: 0, posts: {} });
    refresh();
  } catch { toast(t("cr.bad")); }
}
async function ensurePhoto() {
  if (C.img) return;
  const m = M();
  Object.assign(C, { img: await loadImg(m.photo), src: m.photo, isSample: true, item: null, price: m.price, magic: true });
}
async function makePoster() {
  const t0 = performance.now();
  await powerUp(["pu.s1", "pu.s2", "pu.s3", "pu.s4"], async () => {
    C.phase = "done"; C.size = "feed"; C.cap = 0; C.capLang = S.lang; C.typed = false; C.sched = null;
    C.capText = ownerCaption(C.look, C.capLang, 0);
    D().posts++; save();
    C.secs = ((performance.now() - t0) / 1000 + (REDUCED ? 0 : 2.2)).toFixed(1);
    await renderView(); scrollTo(0, 0);
  });
  slam($(".res-seal"));
  if (!REDUCED) gsap.from(".pv", { autoAlpha: 0, y: 30, rotate: (i) => (i - 2.5) * 4, duration: 0.7, stagger: 0.08, ease: "back.out(1.5)", delay: 0.6 });
  const box = $("[data-compare=final]");
  if (box && !REDUCED) gsap.fromTo(box, { "--p": "100%" }, { "--p": "22%", duration: 1.3, ease: "power3.inOut", delay: 0.1 });
}
async function makeWeek(openWa) {
  await ensurePhoto();
  await powerUp(["pu.w1", "pu.w2", "pu.w3", "pu.w4"], async () => { C.phase = "week"; await renderView(); scrollTo(0, 0); }, 2.4);
  slam($(".res-seal"));
  if (!REDUCED) gsap.from(".day", { y: 50, autoAlpha: 0, rotation: () => gsap.utils.random(-7, 7), scale: 0.88, duration: 0.6, ease: "back.out(1.6)", stagger: 0.07 });
  if (openWa) setTimeout(() => openSheet("wa"), REDUCED ? 0 : 1000);
}
function toggleIn(list, v, max) { const i = list.indexOf(v); if (i >= 0) list.splice(i, 1); else { list.push(v); if (max && list.length > max) list.shift(); } }
function syncTell() {
  $$("[data-act=qItem]").forEach((b) => b.setAttribute("aria-pressed", K.items.includes(+b.dataset.i)));
  $$("[data-act=qVibe]").forEach((b) => b.setAttribute("aria-pressed", K.vibes.includes(b.dataset.v)));
  $$("[data-act=qWith]").forEach((b) => b.setAttribute("aria-pressed", K.with === b.dataset.w));
  $("[data-act=custWrite]").disabled = !canWrite(); $("[data-need]").hidden = canWrite();
}
const ACT = {
  ownerSample() { const m = M(); loadImg(m.photo).then((img) => { Object.assign(C, { img, src: m.photo, isSample: true, phase: "edit", item: null, price: m.price, magic: true }); refresh(); }); },
  ownerReset() { Object.assign(C, { img: null, phase: "pick", item: null, price: null, sched: null }); refresh(); },
  look(el) { C.look = el.dataset.look; refresh(); },
  make: makePoster,
  week: () => makeWeek(false),
  weekBack() { C.phase = C.capText ? "done" : "edit"; refresh(); },
  waOpen: () => openSheet("wa"),
  async waYes() {
    $("[data-sreplies]").hidden = true;
    await chat($("[data-sthread]"), t("ws.r1"), t("ws.ok"), seal(36) + "");
    const d = D(); if (!d.weekOk) { d.weekOk = true; d.posts += 7; save(); }
    toast(t("wk.done")); buzz(20);
    await renderView(); showLevel();
  },
  async waNo() { $("[data-sreplies]").hidden = true; await chat($("[data-sthread]"), t("ws.r2"), t("ws.change")); },
  async wdYes() { $("[data-wreplies]").hidden = true; await chat($("[data-wthread]"), t("wa.r1"), t("wa.posted"), seal(32)); $("[data-wthread]").insertAdjacentHTML("afterend", `<button class="link" data-act="wdReset">${t("wa.again")}</button>`); },
  async wdNo() {
    $("[data-wreplies]").hidden = true;
    await chat($("[data-wthread]"), t("wa.r2"), t("wa.newlook"), `<canvas data-newlook></canvas>`);
    await paint($("[data-newlook]"), 432, 540, LOOKS.premium, await lookOpts(true));
    $("[data-wreplies]").hidden = false; $("[data-wreplies] [data-act=wdNo]").hidden = true;
  },
  async wdReset() { $("[data-wademo]").innerHTML = waDemoHTML(); paint($("[data-wademo] canvas"), 432, 540, LOOKS.fun, await lookOpts(true)); },
  capLang(el) { C.capLang = el.dataset.l; C.capText = ownerCaption(C.look, C.capLang, C.cap); $$("[data-act=capLang]").forEach((b) => b.setAttribute("aria-pressed", b === el)); typeInto($("[data-in=cap]"), C.capText); },
  capNext() { C.cap++; C.capText = ownerCaption(C.look, C.capLang || S.lang, C.cap); typeInto($("[data-in=cap]"), C.capText); },
  async capCopy() { if (await copy(C.capText)) toast(t("cr.copied")); },
  ownerShare() { shareCanvas($("[data-compare=final] .cmp-after"), `goai-${C.look}-${C.size}.jpg`, C.capText); },
  async ownerSave() { try { download(await toBlob($("[data-compare=final] .cmp-after")), `goai-${C.look}-${C.size}.jpg`); await copy(C.capText); toast(t("cr.saved")); } catch { toast("Open via http://, not file://"); } },
  async postAll() {
    const plats = $$("[data-pt]:checked").map((i) => i.dataset.pt);
    if (!plats.length) return toast(t("po.none"));
    C.sched = { at: bestTime(), plats };
    D().sched = { ...C.sched, item: C.item }; save(); // null = the sample item, named in the current language
    buzz(15); await renderView();
    $(".sched").scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" });
    slam($(".sched-seal"));
  },
  unsched() { C.sched = null; delete D().sched; save(); toast(t("sc.undone")); refresh(); },
  qrOn() { D().qr = true; save(); refresh(); },
  print() { window.print(); },
  voucher() { openSheet("voucher"); },
  reviews() { openSheet("reviews"); },
  closeSheet() { closeSheet(); },
  sendQuiet() { const d = D(); d.quietSent = true; d.sent += M().base.yes; save(); closeSheet(); toast(t("v.done", { n: M().base.yes })); refresh(); },
  approve(el) { D().reviews[el.dataset.id] = 1; save(); refreshSheet(); refresh(); },
  period(el) { R.period = el.dataset.p; R.fresh = true; refresh(); },
  bill(el) { bill = el.dataset.v; paintPlans(); },
  async makeReport() { await powerUp(["pu.r1", "pu.r2", "pu.r3"], async () => { R.made = true; R.fresh = true; await renderView(); scrollTo(0, 0); }, 1.6); },
  reset() { S.d = { cafe: fresh(), pet: fresh() }; save(); R.made = false; toast(t("rp.resetDone")); refresh(); },
  // customer
  custSample() { const m = M(); loadImg(m.cust).then((img) => { Object.assign(K, { img, src: m.cust, isSample: true, step: "tell", theme: 0, posts: {} }); refresh(); }); },
  custReset() { Object.assign(K, { img: null, step: "start", items: [], vibes: [], with: null, posts: {}, stars: 0, plat: "xhs", k: 0, skip: false }); refresh(); },
  qItem(el) { toggleIn(K.items, +el.dataset.i, 2); syncTell(); },
  qVibe(el) { toggleIn(K.vibes, el.dataset.v, 3); syncTell(); },
  qWith(el) { K.with = K.with === el.dataset.w ? null : el.dataset.w; syncTell(); },
  custWrite() { if (!canWrite()) return; K.posts = {}; K.step = "style"; refresh(); },
  custBack() { K.step = "tell"; refresh(); },
  async custUse() {
    await powerUp(["pu.c1", "pu.c2", "pu.c3"], async () => {
      const d = D();
      K.posts = {}; K.k = 0; K.plat = "xhs"; K.skip = false; ensurePosts();
      d.styled++; for (const v of K.vibes) d.loved[v] = (d.loved[v] || 0) + 1; save();
      K.step = "posts"; await renderView();
    }, 1.6);
    slam($(".fm-seal"));
  },
  ptab(el) { K.plat = el.dataset.p; refresh(); },
  star(el) { K.stars = +el.dataset.n; K.posts.google = writePost("google", S.lang, kInput(), K.k); refresh(); },
  pAnother() { K.k++; K.posts[K.plat] = writePost(K.plat, S.lang, kInput(), K.k); if (K.plat === "xhs") paintPlatform(); refresh(); },
  pFix() { K.posts[K.plat] = fixPost(K.plat, K.posts[K.plat]); refresh(); },
  async pCopy() { if (await copy(postText(K.plat))) toast(t("cr.copied")); },
  async pSave() { try { download(await toBlob($("[data-pcanvas]")), `${M().id}-${K.plat}.jpg`); } catch { toast("Open via http://, not file://"); } },
  async postPlat() {
    const p = K.plat, m = M(), d = D();
    if (p === "google" && !K.stars) return toast(t("ck.starsBad"));
    const text = postText(p);
    d.shares++; d.byPlat[p] = (d.byPlat[p] || 0) + 1; save();
    await copy(text);
    let blob; try { blob = await toBlob($("[data-pcanvas]")); } catch { blob = null; }
    const file = blob && new File([blob], `${m.id}-${p}.jpg`, { type: "image/jpeg" });
    if (file && navigator.canShare?.({ files: [file] })) { try { await navigator.share({ files: [file], text }); return; } catch (e) { if (e.name === "AbortError") return; } }
    if (blob && p !== "google") download(blob, `${m.id}-${p}.jpg`);
    toast(t("c.how", { p: pname(p) }));
    window.open(p === "google" ? PLATS.google.web + encodeURIComponent(`${m.name} ${m.city[0]}`) : PLATS[p].web, "_blank", "noopener");
  },
  custJoin() { K.step = "join"; refresh(); },
  custSkip() { K.skip = true; refresh(); },
  custJoinGo() {
    const f = K.form;
    if (!f.terms) return;
    const d = D();
    d.member = { id: Math.random().toString(36).slice(2, 8).toUpperCase(), name: f.name.trim() || t("c.you"), phone: f.phone.trim(), optIn: f.mkt, stamps: 0, joined: Date.now() };
    d.joins++; save(); K.step = "card"; refresh();
  },
  custCard() { K.step = "card"; refresh(); },
  // staff
  scan() { ST.scanned = true; ST.receipt = newReceipt(); ST.res = null; refresh(); },
  newReceipt() { ST.receipt = newReceipt(); ST.res = null; refresh(); },
  stamp() { ST.res = addStamp(D(), ST.receipt, ST.amount ?? M().avg); save(); if (ST.res === "ok") buzz(15); staffResult(); },
  redeem() { ST.res = redeem(D(), M().goal); save(); staffResult(); },
};
async function staffResult() {
  await renderView();
  const r = $("[data-result]");
  if (r && !REDUCED) animate(r, ST.res.startsWith("ok") ? { scale: [0.7, 1] } : { x: [0, -14, 12, -8, 5, 0] }, ST.res.startsWith("ok") ? { type: spring, bounce: 0.5, visualDuration: 0.4 } : { duration: 0.4 });
  if (ST.res === "ok" && !REDUCED) { const on = $$(".swrap .pstamps .on i"); on.length && gsap.fromTo(on.at(-1), { scale: 2, rotation: -24, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.45, ease: "back.out(2.4)" }); }
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act],[data-setlang],[data-m],[data-switch]");
  if (!el) return;
  if (el.matches("[data-setlang]")) return setLang(el.dataset.setlang, e);
  if (el.matches("[data-m]")) return setShop(el.dataset.m);
  if (el.matches("[data-switch]")) return openSheet("shop");
  ACT[el.dataset.act]?.(el, e);
});
document.addEventListener("change", (e) => {
  const f = e.target.closest("[data-file]");
  if (f) return useFile(f.files[0], f.dataset.file);
  const k = e.target.dataset.in;
  if (k === "magic") { C.magic = e.target.checked; paintThumbs(); }
  if (k === "chal") { D().chal = e.target.checked; save(); refresh(); }
  if (k === "fterms" || k === "fmkt") { K.form[k === "fterms" ? "terms" : "mkt"] = e.target.checked; $("[data-act=custJoinGo]").disabled = !K.form.terms; }
  if (e.target.matches("[data-pt]")) { const k2 = $$("[data-pt]:checked").length; $("[data-act=postAll]").textContent = t("po.go", { n: k2 }); }
});
let starT, titleT;
document.addEventListener("input", (e) => {
  const cmp = e.target.closest(".compare");
  if (cmp) { cmp.style.setProperty("--p", e.target.value + "%"); return; }
  const k = e.target.dataset.in, v = e.target.value;
  if (k === "shopname") return setShopName(v);
  if (k === "pbSpend" || k === "pbDay") { PB[k === "pbSpend" ? "spend" : "day"] = +v; return paintPayback(); }
  if (k === "item" || k === "price") { C[k] = v; clearTimeout(thumbT); thumbT = setTimeout(paintThumbs, 200); }
  if (k === "item") { const ok = !!v.trim(); $("[data-act=make]").disabled = !ok; $("#item-hint").hidden = ok; }
  if (k === "cap") C.capText = v;
  if (k === "pbody") { K.posts[K.plat].body = v; repaintChecks(); }
  if (k === "ptitle") { K.posts[K.plat].title = v; repaintChecks(); if (K.plat === "xhs") { clearTimeout(titleT); titleT = setTimeout(paintPlatform, 250); } }
  if (k === "fname") K.form.name = v;
  if (k === "fphone") K.form.phone = v;
  if (k === "receipt") ST.receipt = v;
  if (k === "amount") ST.amount = v;
  if (k === "star") { K.star = v; clearTimeout(starT); starT = setTimeout(() => paint($("[data-ctheme=mag]"), 720, 900, themeFn("mag"), coverOpts()), 150); }
});
scrim.addEventListener("click", closeSheet);
document.addEventListener("keydown", (e) => e.key === "Escape" && closeSheet());
let resizeT;
addEventListener("resize", () => { clearTimeout(resizeT); resizeT = setTimeout(() => route === "report" && R.made && drawCharts(false), 200); });

/* ======================= router ======================= */
let route = "landing", lastStep = "";
const APP_VIEWS = Object.keys(VIEWS);
async function renderView() {
  if (APP_VIEWS.includes(route)) {
    $("#view").innerHTML = VIEWS[route]();
    $("#view").dataset.route = route;
    seals($("#view"));
    $$(".tabs a").forEach((a) => (a.dataset.tab === route ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    await AFTER[route]?.();
    showLevel();
  } else if (route === "c") { if (K.step !== lastStep) { lastStep = K.step; scrollTo(0, 0); } $("#cust").innerHTML = custView(); seals($("#cust")); await custAfter(); }
  else if (route === "staff") { $("#staff").innerHTML = staffView(); seals($("#staff")); }
}
function refresh() {
  if (route === "landing") { if (landingBuilt) paintLanding().then(() => ScrollTrigger.refresh()); return; }
  renderView();
}
function focusPage() {
  const h = $(`${APP_VIEWS.includes(route) ? "#view" : route === "landing" ? "#landing" : "#" + (route === "c" ? "cust" : "staff")} h1`);
  if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
}
function onHash(e) {
  const [path, qs] = location.hash.slice(1).split("?");
  const q = new URLSearchParams(qs || "");
  if (MERCH[q.get("m")] && q.get("m") !== S.m) setShop(q.get("m"));
  const r = (path || "/").replace(/^\//, "");
  const week = r === "week";
  route = r === "" ? "landing" : week ? "create" : r === "c" || r === "staff" || APP_VIEWS.includes(r) ? r : "home";
  closeSheet();
  $("#landing").hidden = route !== "landing";
  $("#app").hidden = !APP_VIEWS.includes(route);
  $("#cust").hidden = route !== "c";
  $("#staff").hidden = route !== "staff";
  if (route !== "landing") document.documentElement.classList.remove("pre");
  if (route === "staff") ST.res = null;
  if (route === "report") R.fresh = false;
  $('meta[name="theme-color"]').content = route === "c" ? M().color : route === "staff" ? INK : "#F6F5F1";
  window.scrollTo(0, 0);
  setTitle();
  if (route === "landing") paintLanding().then(() => { if (!landingBuilt) buildLanding(); ScrollTrigger.refresh(); });
  else if (week) { renderView().then(() => makeWeek(q.get("wa") === "1")); history.replaceState(null, "", "#/create"); }
  else renderView().then(() => e && focusPage());
}
seals();
applyStatic();
$("#shopname").value = S.shop || "";
save();
addEventListener("hashchange", onHash);
onHash();
