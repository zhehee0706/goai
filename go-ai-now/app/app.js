import { animate, spring } from "https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm";
import { seal, logo, plat, PLATS, PLAT_ORDER } from "./brand.js";

const { gsap, qrcode } = window;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((ok) => setTimeout(ok, ms));

/* ======================= words (EN / 中文) ======================= */
const T = {
  "nav.powers": ["How it works", "怎么用"], "nav.why": ["Why Go AI", "为什么选 Go AI"], "nav.plans": ["Plans", "价格"], "nav.open": ["Open the app", "打开 App"],
  "hero.big": ["Superpower your shop.", "给小店｜装上超能力。"], "hero.plats": ["Posts for {list}", "发到 {list}"],
  "pw.1": ["AI posters in 60 seconds", "60 秒 AI 海报"], "pw.2": ["AI captions for 8 apps", "AI 文案，8 大平台"], "pw.3": ["Membership system", "会员系统"], "pw.4": ["Monthly report", "每月业绩报告"],
  "hero.cta": ["Start your pilot", "开始试点"], "hero.cta2": ["See how it works", "看看怎么用"],
  "yours.l": ["Try it with your shop's name", "输入店名试试"], "yours.ph": ["Your shop name", "你的店名"], "yours.type": ["Shop type", "店的类型"],
  "m.cafe": ["Café", "咖啡馆"], "m.pet": ["Pet shop", "宠物店"],
  "m.restaurant": ["Restaurant", "餐厅"], "m.bakery": ["Bakery & desserts", "面包甜点"], "m.drinks": ["Drinks & bubble tea", "饮料奶茶"],
  "m.salon": ["Hair & barber", "美发理发"], "m.beauty": ["Beauty & nails", "美容美甲"], "m.florist": ["Florist", "花店"],
  "m.fashion": ["Fashion & retail", "服饰零售"], "m.other": ["Other shop", "其他店铺"],
  "cmp.before": ["Your photo", "你拍的"], "cmp.after": ["Go AI", "Go AI"], "cmp.aria": ["Before and after", "前后对比"],
  "pc.hi": ["Hi, {name}", "嗨，{name}"],
  
  "p1.h": ["AI posters in 60 seconds", "60 秒 AI 海报"], "p1.s": ["Snap a photo, pick a look, post everywhere.", "拍照、选风格，全平台发出去。"],
  "p2.h": ["Customers post for you", "顾客帮你发帖"], "p2.s": ["They scan, tap twice, and AI writes their post.", "顾客扫码点两下，AI 帮他们写好帖子。"],
  "p3.h": ["Membership system", "会员系统"], "p3.s": ["Digital stamps, rewards and welcome-back vouchers.", "电子印章、奖励和回头券。"],
  "p4.h": ["Monthly report", "每月业绩报告"], "p4.s": ["What worked this month, in one tap.", "这个月什么有效，一键看清。"],
  "st.miss": ["We miss you!", "好久不见！"], "st.month": ["This month", "本月"],
  "how.h": ["4 superpowers. 1 app.", "4 种超能力，1 个 App。"],
  "stat.photos": ["photos made", "张照片"], "stat.returns": ["verified returns", "次确认回店"],
  "why.h": ["10x more than a caption page.", "比文案生成器强 10 倍。"],
  "why.col1": ["AI caption page", "AI 文案页面"], "why.col2": ["Go AI", "Go AI"],
  "plans.h": ["Priced for shops that want to win.", "为想赢的店而定价。"],
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
  "final.h": ["Ready? Go.", "准备好了？Go！"], "final.s": ["Set up your shop in 2 minutes.", "两分钟开好你的店。"], 
  "foot": ["The shops and photos on this page are examples. Platform logos belong to their owners.", "本页的店家和照片均为示例，平台标志归各自所有。"], 
  "powered": ["Powered by Go AI", "由 Go AI 提供"],
  "tab.home": ["Home", "首页"], "tab.create": ["Create", "创作"], "tab.share": ["Share", "分享"], "tab.members": ["Members", "会员"], "tab.report": ["Report", "报告"],

  "home.nudge": ["{n} member{s} not back in {d} days.", "{n} 位会员超过 {d} 天没来了。"],
  "home.nudgeBtn": ["Send welcome-back offers", "发回头优惠"],
  "hm.snap": ["Snap a photo", "拍张照片"], "hm.snapS": ["Posts for {n} apps in 60 seconds", "60 秒做好 {n} 个平台的帖子"],
  "hm.posts": ["posts made", "篇帖子"], "hm.joins": ["new members", "位新会员"], "hm.spent": ["spent by members", "会员消费"],
  "hm.all": ["Full report", "完整报告"], "hm.next": ["Next: {s}", "下一步：{s}"],


  "cr.h": ["Make a post", "做张海报"], "cr.drop": ["Snap or upload photos", "拍照或上传照片"], "cr.dropS": ["Up to 6. More than one become one collage.", "最多 6 张，多张会拼成一张。"],
  "cr.layout": ["Layout", "拼图方式"], "lay.grid": ["Grid", "网格"], "lay.big": ["One big", "一大多小"], "lay.strip": ["Side by side", "并排"],
  "cr.photoN": ["Photo {n}", "照片 {n}"], "cr.photoDel": ["Remove photo {n}", "删除照片 {n}"], "cr.addPhotos": ["Add photos", "加照片"], "cr.max": ["Up to {n} photos. The first {n} are used.", "最多 {n} 张，用了前 {n} 张。"],
  "cr.change": ["New photos", "换照片"], "cr.yours": ["Your photo", "你的照片"],
  "cr.look": ["Pick a look", "选风格"],
  "nt.make": ["Make a notice", "做一张公告"], "nt.makeS": ["Closed for a holiday, new hours, a promotion, staff wanted or your menu. No photo needed.", "休假、营业时间、优惠、招聘或菜单，不用照片。"],
  "mp.cta": ["Plan my month", "规划这个月"], "mp.ctaS": ["Festivals, paydays and weekends, with calendar reminders.", "节日、发薪日和周末，加日历提醒。"],
  "mp.h": ["Your month", "这个月的发帖计划"], "mp.s": ["Good days to post in the next 30 days. Tick the ones you want and add them to your calendar. On the day, snap a fresh photo.", "未来 30 天适合发帖的日子。勾选想要的，加到日历。当天拍一张新照片就好。"],
  "mp.k.fest": ["{fest}", "{fest}"], "mp.k.soon": ["{fest} is next week", "下周就是{fest}"], "mp.k.payday": ["Around payday", "发薪日前后"], "mp.k.month": ["New month", "新的一个月"], "mp.k.weekend": ["Weekend", "周末"],
  "mp.i.fest": ["Wish your customers well, in the Festive look.", "用节日风格祝顾客节日快乐。"], "mp.i.soon": ["Post your festival hours or a festive offer.", "发布节日营业时间或节日优惠。"],
  "mp.i.payday": ["Show the treat people come back for.", "拍大家会回来买的那一样。"], "mp.i.month": ["What is new this month, or back again.", "这个月的新品，或回归的老味道。"],
  "mp.i.weekend": ["A wide shot of the shop, or the thing everyone asks about.", "拍店里的全景，或大家最常问的那一样。"],
  "mp.at": ["{time}, {look}", "{time}，{look}"], "mp.noticeL": ["a notice", "公告"], "mp.make": ["Make it now", "现在做"], "mp.pick": ["Remind me on {d}", "{d} 提醒我"],
  "mp.cal": ["Add {n} reminder{s} to my calendar", "加 {n} 个日历提醒"], "mp.back": ["Back to Create", "回到创作"],
  "rem.month": ["{what}: a post for {shop}", "{shop}：{what}"],
  "nt.or": ["or", "或者"], "nt.kind": ["What is it for?", "公告内容"],
  "nt.k.menu": ["Menu board", "菜单牌"], "nt.menuT": ["Our menu", "菜单"], "nt.titleL": ["Title", "标题"], "nt.menuNote": ["Note (optional)", "备注（可不填）"],
  "nt.menuNotePh": ["Prices include SST", "价格已含服务税"], "nt.priceL": ["Price", "价格"], "nt.menuS": ["Tick what goes on the board. Prices you set in Settings are filled in.", "勾选要放上菜单的产品。在设置里填过的价格会自动带入。"],
  "nc.menu": ["{title}:", "{title}："], "set.price": ["Price (optional)", "价格（可不填）"],
  "nt.k.closed": ["Closed", "休息"], "nt.k.hours": ["Opening hours", "营业时间"], "nt.k.promo": ["Promotion", "优惠"], "nt.k.hiring": ["Staff wanted", "招聘"],
  "nt.reasonL": ["Closed for", "休息原因"], "nt.fromL": ["From", "从"], "nt.toL": ["To", "到"], "nt.backL": ["Back on (optional)", "恢复营业（可不填）"],
  "nt.daysL": ["Days", "日子"], "nt.timeL": ["Hours", "时间"], "nt.daysPh": ["Mon – Fri", "星期一至五"], "nt.timePh": ["8am – 6pm", "早上8点 – 傍晚6点"], "nt.startL": ["Starting (optional)", "开始日期（可不填）"],
  "nt.promoL": ["Offer", "优惠内容"], "nt.promoPh": ["Buy 1 Free 1", "买一送一"], "nt.itemL": ["On (optional)", "适用产品（可不填）"], "nt.untilL": ["Until (optional)", "截止日期（可不填）"],
  "nt.termsL": ["Small print (optional)", "附注（可不填）"], "nt.termsPh": ["Dine-in only. While stocks last.", "仅限堂食，售完即止。"],
  "nt.roleL": ["Job", "职位"], "nt.rolePh": ["Barista", "咖啡师"], "nt.jobL": ["Type", "类型"], "nt.job.full": ["Full-time", "全职"], "nt.job.part": ["Part-time", "兼职"],
  "nt.contactL": ["WhatsApp number to apply", "应征 WhatsApp 号码"], "nt.noteL": ["Note (optional)", "备注（可不填）"], "nt.notePh": ["No experience needed", "无需经验"],
  "nt.design": ["Design", "设计"], "nt.d.board": ["Signboard", "招牌"], "nt.d.paper": ["Paper", "纸条"], "nt.d.bold": ["Bold", "醒目"], "nt.langL": ["Language", "语言"],
  "nt.go": ["Make it for every platform", "做好每个平台的尺寸"], "nt.done": ["Your notice is ready.", "公告做好了。"], "nt.doneS": ["Sized for each app, with a caption ready to paste.", "每个平台的尺寸都有，文案也写好了。"],
  "nt.edit": ["Edit the notice", "修改公告"], "nt.pv": ["Notice preview", "公告预览"],
  "nt.closed": ["We're closed", "暂停营业"], "nt.closedFor": ["Closed for {r}", "{r}休息"], "nt.back": ["Back on {d}", "{d}恢复营业"], "nt.thanks": ["Thank you for understanding.", "谢谢您的理解。"],
  "nt.hours": ["New opening hours", "新营业时间"], "nt.from": ["From {d}", "{d}起"], "nt.seeYou": ["See you soon!", "欢迎光临！"],
  "nt.promoK": ["Special offer", "优惠"], "nt.until": ["Until {d}", "至{d}"], "nt.hiring": ["We're hiring", "诚聘"], "nt.apply": ["WhatsApp {c} to apply", "有意者请 WhatsApp {c}"],
  "nc.closed": ["We're closed {range} for {reason}. {back}", "{reason}期间（{range}）暂停营业。{back}"], "nc.closedPlain": ["We're closed {range}. {back}", "{range}暂停营业。{back}"],
  "nc.back": ["We're back on {d}.", "{d}恢复营业。"], "nc.hours": ["New opening hours{from}:", "新营业时间{from}："], "nc.hoursFrom": [" from {d}", "（{d}起）"], "nc.hoursEnd": ["See you soon!", "欢迎光临！"],
  "nc.promo": ["{promo}{on}!", "{on}{promo}！"], "nc.promoOn": [" on our {item}", "{item}："], "nc.until": ["Only until {d}.", "优惠至{d}。"],
  "nc.hiring": ["We're hiring: {role} ({job}).", "诚聘{role}（{job}）。"], "nc.apply": ["WhatsApp {c} to apply.", "有意者请 WhatsApp {c}。"],
  "cr.colour": ["Colours", "配色"], "col.photo": ["From the photo", "取自照片"], "col.brand": ["My brand", "我的品牌色"],
  "fn.h": ["Font", "字体"], "fn.pick": ["Your shop's font", "店铺字体"], "fn.s": ["Used for your shop name and on your posters. In Create you can still change it for one post.", "用于店名和海报。在创作时也可以为单张海报换字体。"],
  "fn.saved": ["Font saved.", "字体已保存。"], "fn.look": ["Each look's own", "跟随风格"], "fn.brand": ["My shop font", "店铺字体"],
  "fn.bold": ["Bold", "粗体"], "fn.elegant": ["Elegant", "优雅"], "fn.friendly": ["Friendly", "亲切"], "fn.hand": ["Handwritten", "手写"], "fn.modern": ["Modern", "现代"], "fn.poster": ["Poster", "海报体"],
  "rw.h": ["Rewards", "奖励设置"], "rw.s": ["What members get. Customers see these on their card, at the counter and in your messages.", "会员能得到什么。顾客会在会员卡、柜台和你的信息里看到。"],
  "rw.mem": ["Membership reward", "集印章奖励"], "rw.memS": ["Every stamped visit earns a stamp. A full card earns this.", "每次确认到店盖一个印章，集满就换这个奖励。"],
  "rw.back": ["Comeback offer", "回头优惠"], "rw.backS": ["Sent on WhatsApp to members who said yes and have not been back for a while. You press send.", "通过 WhatsApp 发给同意接收、又一段时间没来的会员。由你按发送。"],
  "rw.bday": ["Birthday treat", "生日礼"], "rw.bdayS": ["Sent in their birthday month, and shown on their card and at the counter. Leave it empty to use the comeback offer.", "在会员生日月份发出，也会显示在会员卡和柜台上。不填就用回头优惠。"],
  "rw.prize": ["The reward", "奖励内容"], "rw.offer": ["The offer", "优惠内容"], "rw.treat": ["The treat", "礼物内容"], "rw.after": ["Send after", "多久没来就发"], "rw.days": ["{n} days without a visit", "{n} 天没来"],
  "rw.fmt": ["{g} stamps = {p}", "集满 {g} 个印章 = {p}"], "rw.save": ["Save rewards", "保存奖励"], "rw.saved": ["Rewards saved.", "奖励已保存。"], "rw.less": ["One stamp fewer", "少一个印章"], "rw.more": ["One stamp more", "多一个印章"], "rw.ideas": ["Ideas", "参考"],
  "dt.h": ["Shop details", "店铺资料"], "dt.s": ["Customers see these on your page, and notices and printouts use them.", "顾客会在你的页面看到这些，公告和打印品也会用上。"],
  "dt.address": ["Address", "地址"], "dt.phone": ["Shop phone or WhatsApp", "店铺电话或 WhatsApp"], "dt.maps": ["Google Maps link (optional)", "Google 地图链接（可不填）"],
  "dt.hours": ["Opening hours", "营业时间"], "dt.open": ["Open", "营业"], "dt.from": ["opens", "开门"], "dt.to": ["closes", "关门"], "dt.copy": ["Use Monday's hours for every day", "每天都用星期一的时间"],
  "dt.save": ["Save details", "保存资料"], "dt.saved": ["Details saved.", "资料已保存。"], "dt.directions": ["Directions", "导航"], "dt.call": ["Call", "打电话"],
  "hr.closed": ["Closed", "休息"], "hr.daily": ["Every day", "每天"], "hr.open": ["Open now, until {t}", "营业中，到 {t}"], "hr.opensAt": ["Closed now, opens {t}", "还没开，{t} 开门"], "hr.closedNow": ["Closed now", "现在休息"],
  "br.fromLogo": ["From your logo", "取自你的标志"], "br.logoTheme": ["Logo saved. Your app, posters and customer page now use its colour.", "标志已保存。App、海报和顾客页面都换成标志的颜色了。"],
  "br.h": ["Your brand", "你的品牌"], "br.s": ["Your logo goes on every poster you make, and its colour becomes your app's theme. Customers' own posts stay theirs.", "你做的每张海报都会放上标志，标志的颜色也会成为 App 的主题色。顾客自己的帖子不放。"],
  "br.logo": ["Upload logo", "上传标志"], "br.logoNew": ["Change logo", "换标志"], "br.logoDel": ["Remove logo", "删除标志"], "br.logoAlt": ["Your logo", "你的标志"],
  "br.handle": ["Instagram or Xiaohongshu handle", "Instagram 或小红书账号"], "br.colour": ["Brand colour", "品牌色"], "br.none": ["Use each photo's colours", "用每张照片的颜色"],
  "br.custom": ["Pick a colour", "自选颜色"], "br.save": ["Save brand", "保存品牌"], "br.saved": ["Brand saved.", "品牌已保存。"], "br.logoSaved": ["Logo saved. It is on your posters now.", "标志已保存，海报上已经有了。"],
  "br.logoGone": ["Logo removed.", "标志已删除。"], "br.big": ["That image is too big. Try a smaller file.", "图片太大了，请换一张小一点的。"],
  "err.bad_image": ["That file isn't a PNG, JPEG or WebP image.", "这个文件不是 PNG、JPEG 或 WebP 图片。"],
  "cr.fix": ["Light and colour", "光线与色彩"], "fix.off": ["As shot", "原图"], "fix.natural": ["Natural", "自然"], "fix.bold": ["Bold", "鲜明"],
  "cr.presets": ["Quick presets", "一键套用"], "cz.h": ["Customize", "自定义"], "cz.badge": ["Badge", "标签"], "cz.none": ["None", "不要"], "cz.custom": ["Your own words", "自己写"],
  "cz.style": ["Badge style", "标签样式"], "cz.stamp": ["Stamp", "印章"], "cz.tag": ["Tag", "吊牌"], "cz.ribbon": ["Ribbon", "斜角带"],
  "cz.at": ["Badge corner", "标签位置"], "cz.auto": ["Auto", "自动"], "cz.tl": ["Top left", "左上"], "cz.tr": ["Top right", "右上"], "cz.bl": ["Bottom left", "左下"], "cz.br": ["Bottom right", "右下"],
  "cz.colour": ["Colour", "颜色"], "cz.logo": ["Show my logo", "显示标志"], "cz.badgePh": ["Fresh today", "今日新鲜"],
  "bg.new": ["NEW", "新品"], "bg.best": ["BEST SELLER", "人气王"], "bg.try": ["MUST TRY", "必试"], "bg.promo": ["PROMO", "优惠"], "bg.limited": ["LIMITED", "限量"],
  "bg.b1f1": ["BUY 1 FREE 1", "买一送一"], "bg.members": ["MEMBERS ONLY", "会员专享"], "bg.today": ["TODAY ONLY", "今日限定"],
  "pr.launch": ["New item launch", "新品上市"], "pr.weekend": ["Weekend promo", "周末优惠"], "pr.best": ["Best seller", "人气推荐"], "pr.festive": ["Festive special", "节日限定"],
  "pr.flash": ["Today only", "今日限定"], "pr.members": ["Members treat", "会员福利"], "pr.kopitiam": ["Kopitiam classic", "经典茶室"], "pr.b1f1": ["Buy 1 free 1", "买一送一"],
  "pr.menu": ["Menu card", "菜单卡"], "pr.simple": ["Clean and simple", "简约"],
  "cr.frameMany": ["Your photos are arranged to fit each look and each size. Pick a layout below.", "多张照片会按每个风格和尺寸排好。在下面选拼图方式。"],
  "cr.zoom": ["Zoom", "放大"], "cr.frame": ["Drag the poster to move the photo. Every size keeps what you choose.", "拖动海报来移动照片，每个尺寸都会保留你选的部分。"],
  "cr.frameAria": ["Poster preview. Drag, or use the arrow keys, to move the photo.", "海报预览。拖动或用方向键移动照片。"],
  "rp.stmt": ["Monthly statement", "月结单"], "rp.allLabel": ["Full report", "完整报告"],
  "rp.listH": ["Your reports", "你的报告"], "rp.listS": ["Every month since you joined. Generate one month, or the full report.", "加入以来的每个月。可以生成单月报告，也可以生成完整报告。"],
  "rp.full": ["Generate full report", "生成完整报告"], "rp.genOne": ["Generate", "生成"], "rp.mline": ["{s} member spend, {r} visits, {j} new members", "会员消费 {s}，{r} 次回店，{j} 位新会员"],
  "rp.allHead": ["Members spent <b>{s}</b> here so far.", "到目前为止，会员在店里消费了 <b>{s}</b>。"], "rp.allS": ["{n} month{s}. Stamped visits: {r}. New members: {j}.", "{n} 个月，{r} 次盖章回店，{j} 位新会员。"],
  "rp.vsPlanN": ["Go AI Pro, {n} month{s}", "Go AI 专业版 {n} 个月"], "rp.vsPrev": ["vs the month before", "对比前一个月"], "rp.back": ["All months", "所有月份"],
  "rp.byMonth": ["Month by month", "每月一览"], "rp.month": ["Month", "月份"], "rp.spendCol": ["Member spend", "会员消费"], "rp.visitsCol": ["Visits", "回店"], "rp.joinsCol": ["New members", "新会员"], "rp.postsCol": ["Posts", "帖子"],
  "a4.h": ["Counter poster", "柜台海报"], "a4.s": ["A4, for the counter or the front door. The QR code opens your customer page.", "A4 大小，贴在柜台或门口。二维码打开你的顾客页面。"],
  "a4.print": ["Print A4 poster", "打印 A4 海报"], "a4.save": ["Save A4 poster", "保存 A4 海报"], "a4.saved": ["Saved. Any print shop can print it on A4.", "已保存。任何打印店都能用 A4 打印。"],
  "look.clean": ["Clean", "清爽"], "look.premium": ["Premium", "高级"], "look.fun": ["Fun", "活泼"],
  "cr.item": ["Item", "品名"], "cr.itemPh": ["What's in the photo?", "照片里是什么？"], "cr.itemNeed": ["Type what's in your photo so the poster is right.", "写上照片里的产品，海报才不会出错。"],
  "cr.price": ["Price (optional)", "价格（可不填）"],
  "cr.go": ["Power up my photo", "一键变大片"],
  "pu.s1": ["Reading your photo", "识别照片"], "pu.s2": ["Fixing the light", "调光调色"], "pu.s3": ["Designing 3 sizes", "设计 3 种尺寸"], "pu.s4": ["Writing captions", "写文案"],
  "pu.w1": ["Planning your week", "规划一周"], "pu.w2": ["Picking the best times", "挑选最佳时间"], "pu.w3": ["Designing 7 posts", "设计 7 个帖子"], "pu.w4": ["Writing 7 captions", "写 7 段文案"],
  "pu.r1": ["Counting your visits", "统计到店人数"], "pu.r2": ["Drawing your charts", "画图表"], "pu.r3": ["Writing it in plain words", "用白话写出来"],
  "pu.c1": ["Reading your taps", "读取你的选择"], "pu.c2": ["Writing 8 posts", "写 8 个平台的帖子"], "pu.c3": ["Checking every word", "检查每个用词"],
  "cr.done": ["Ready to post.", "可以发了！"], "cr.took": ["Made in {s} seconds. Drag to compare.", "{s} 秒完成。拖动对比前后。"],
  "po.s": ["Each platform gets its own size and style. Untick any you don't use.", "每个平台各有专属尺寸和风格，不用的取消勾选。"], 
  "cr.cap": ["Caption", "文案"], "cr.another": ["Write another", "换一个"], "cr.copy": ["Copy text", "复制文案"], "cr.copied": ["Copied", "已复制"],
  "cr.share": ["Share", "分享"], "cr.save": ["Save", "保存"], "cr.saved": ["Image saved. Text copied.", "图片已保存，文案已复制。"],
  "cr.new": ["Start over", "重新开始"], "cr.bad": ["Can't open this photo. Try a JPG or PNG.", "打不开这张照片，请用 JPG 或 PNG。"],
  "po.h": ["One post per platform", "每个平台一张"], "po.go": ["Save for {n} platform{s}", "保存 {n} 个平台的图片"], "po.none": ["Pick at least one platform", "至少选一个平台"],
  "sc.today": ["today at {time}", "今天 {time} "], "sc.tmr": ["tomorrow at {time}", "明天 {time} "],
  
  "ap.h": ["Make my whole week", "一键做完一整周"], "ap.s": ["7 posts from this one photo, each with a good day and time to post.", "用这一张照片做 7 个帖子，每个都配好发布时间。"], "ap.go": ["Power up my week", "一键变出一周"],
  "wk.h": ["Your week is ready.", "一整周搞定了！"], "wk.s": ["7 posts from one photo. Save them all and add reminders to your calendar.", "一张照片变 7 个帖子。全部保存，再加到日历提醒。"], 
  "wk.saved": ["Saved for {f}", "已存好，{f}用"], "wk.back": ["Back to my post", "回到我的海报"], 
  

  "sh.h": ["Customer post QR", "顾客发帖 QR"], "sh.s": ["Customers scan, tap what they got and loved, and get a post written for each platform. No app, no sign-up.", "顾客扫码，点选买了什么、喜欢什么，就有每个平台专属的帖子。不用下载，不用注册。"],
  "sh.join": ["Join free for stamps", "免费加入集印章"], "sh.results": ["See which platforms and styles work in Report", "在报告里看哪个平台和风格最好"], "sh.themes": ["Their 6 photo styles", "顾客可选 6 种风格"], 
  "sh.card": ["Scan, tap, post", "扫码、点选、发布"], "sh.open": ["Open customer view", "打开顾客页面"], "sh.print": ["Print table card", "打印桌卡"],
  "fl.scans": ["QR scans", "扫码"], "fl.styled": ["Posts written", "写好帖子"], "fl.shares": ["Share taps", "点击分享"], "fl.joins": ["Joined as members", "加入会员"],

  "mb.h": ["Members", "会员"], "mb.club": ["{shop} Members", "{shop} 会员"], "mb.total": ["members", "位会员"], "mb.new": ["new this month", "本月新加入"], "mb.rew": ["rewards redeemed", "次奖励兑换"],
  "mb.staff": ["Open staff scan", "打开店员扫码"], "mb.join": ["Open customer page", "打开顾客页面"], "mb.rules": ["How it works", "怎么运作"],
  "mb.window": ["Quiet = no verified visit for {d} days", "沉睡 = 超过 {d} 天没有确认到店"], "mb.optin": ["Offers only go to members who said yes", "优惠只发给同意接收的会员"], "mb.verify": ["Stamps only after staff checks a receipt", "店员核对单据后才盖章"],

  "v.h": ["Welcome-back offer", "回头优惠"], "v.terms": ["Valid 14 days. Once per person.", "14 天有效，每人限一次。"],
  "mb.search": ["Search by name, code or phone", "按名字、会员码或电话搜索"], "mb.none": ["No member matches that.", "没有找到符合的会员。"], "mb.open": ["Open {name}", "打开 {name}"],
  "mb.joined": ["Joined {d}", "{d} 加入"], "mb.visits": ["Visits", "到店记录"], "mb.noVisits": ["No stamped visits yet.", "还没有盖章的到店记录。"], "mb.rewards": ["Rewards claimed", "已兑换奖励"],
  "mb.fixes": ["Stamp corrections", "印章更正"], "mb.fix": ["Correct the stamps", "更正印章"], "mb.fixAdd": ["Add a stamp", "加一个印章"], "mb.fixTake": ["Take one off", "减一个印章"],
  "mb.why": ["Reason", "原因"], "mb.why1": ["Missed a stamp", "漏盖了印章"], "mb.why2": ["Stamped twice", "重复盖章"], "mb.why3": ["Goodwill", "额外赠送"],
  "mb.fixed": ["Stamps corrected.", "印章已更正。"], "mb.wa2": ["Message on WhatsApp", "用 WhatsApp 联系"], "mb.bday": ["Birthday in {m}", "{m}生日"],
  "bd.h": ["Birthdays in {m}", "{m}生日的会员"], "bd.nudge": ["{n} member{s} {have} a birthday this month.", "本月有 {n} 位会员生日。"], "bd.btn": ["Send birthday wishes", "发生日祝福"],
  "bd.msg": ["Happy birthday, {name}! 🎂 From all of us at {shop}: {reward} is on us this month. Show this message at the counter.\nReply STOP to opt out.", "{name}，生日快乐！🎂 {shop}全体祝你生日快乐：本月来店送你 {reward}。到柜台出示这则信息即可。\n回复 STOP 取消订阅。"],
  "bd.gift": ["a treat", "一份小礼物"], "bd.rest": ["{n} more with a birthday left no phone number or did not say yes to offers, so they are not listed.", "另有 {n} 位生日会员没有留电话，或没有同意接收优惠，所以不在名单上。"], "bd.none": ["No one with a birthday this month has said yes to WhatsApp offers.", "本月生日的会员都没有同意接收 WhatsApp 优惠。"],
  "c.bday": ["Birthday month (optional)", "生日月份（可不填）"], "c.bdayS": ["Birthday treat: {t}.", "生日礼：{t}。"], "c.bdayCard": ["Happy birthday! Your treat: {t}. Show this card at the counter.", "生日快乐！生日礼：{t}。在柜台出示会员卡即可。"], "s.bdayT": ["Birthday treat: {t}", "生日礼：{t}"], "c.bdayNone": ["Rather not say", "不填"], "s.bday": ["Birthday this month", "本月生日"],
  "v.msg": ["Hi {name}, we miss you at {shop}! Here's {off} on your next visit. Valid till {date}.\nReply STOP to opt out.", "嗨 {name}，{shop} 想你了！下次来享 {off}，有效期到 {date}。\n回复 STOP 取消订阅。"],

  "rp.gen": ["Generate my report", "生成报告"], "rp.genS": ["Charts and plain words, in 3 seconds.", "3 秒出图表和白话总结。"],
  "rp.head": ["Members spent <b>{s}</b> here.", "会员在店里消费了 <b>{s}</b>。"],
  "rp.headS": ["Stamped visits: {r}. New members: {j}.", "{r} 次盖章回店，{j} 位新会员。"],
  "rp.vsSpend": ["Spent by members", "会员消费"], "rp.vsPlan": ["Go AI Pro, a month", "Go AI 专业版每月"],
  "rp.cav": ["From receipts your staff stamped. Some of these visits would have happened anyway, so watch the trend, not one month.", "来自店员盖章的单据。有些回店本来就会发生，请看趋势，不只看一个月。"],
  "rp.vs": ["vs same days last month", "对比上月同期"],
  "k.photos": ["photos made", "张照片"], "k.shares": ["share taps", "次点击分享"], "k.joins": ["new members", "位新会员"], "k.returns": ["verified returns", "次确认回店"],
  "ch.daily": ["Customer posts per day", "每天的顾客帖子"], "ch.dailyS": ["Posts your customers wrote, day by day.", "顾客每天写的帖子。"], 
  "ch.run": ["Verified return visits, running total", "确认回店，累计"],
  "ch.week": ["Busiest days", "哪天最多人回店"], "ch.weekS": ["Stamped visits by day of the week, this month and last together. {d} is the busiest.", "这个月和上个月按星期统计的盖章回店。{d}最多。"],
  "ch.funnel": ["From scan to member", "从扫码到会员"], "ch.ofScans": ["{p}% of scans", "占扫码 {p}%"],
  "ch.styles": ["Most shared photo styles", "分享最多的照片风格"], "ch.plat": ["Shares by platform", "各平台分享"], "ch.loved": ["What customers loved", "顾客最喜欢"],
  "ch.table": ["See the numbers", "查看数字"], "ch.day": ["Day", "日期"], "ch.photosCol": ["Posts", "帖子"],
  "tip.photos": ["{n} post{s}", "{n} 篇帖子"],
  "rp.s4": ["Do this next", "下一步"], 
  "rp.pdf": ["Save as PDF", "存成 PDF"], 
  "nx.quiet": ["{n} member{s} gone quiet. Send the welcome-back voucher.", "{n} 位会员沉睡了，发回头券吧。"],

  "c.h": ["Your photo, ready for every app.", "一张照片，各大平台都能发。"], "c.take": ["Take or upload photos", "拍照或上传照片"], "c.free": ["Tap what you liked, pick a look, and your posts are written. No app, no sign-up.", "点一点你喜欢的，选个风格，帖子就写好了。不用下载，不用注册。"],
  "c.tellH": ["Tell us in 3 taps.", "点 3 下告诉我们。"], "c.tellS": ["Your post is written from your own answers.", "帖子根据你自己的选择来写。"],
  "c.t1": ["What did you get?", "你买了什么？"], "c.t2": ["What did you love?", "你喜欢什么？"], "c.t2s": ["up to 3", "最多 3 个"],
  "c.write": ["Write my posts", "帮我写帖子"], "c.need": ["Pick what you got and one thing you loved.", "选一个买了的，再选一个喜欢的。"],
  "c.swipe": ["Swipe to pick a style", "左右滑，选风格"], "c.use": ["Use this style", "就用这个"],
  "c.star": ["Your name on the cover (optional)", "封面上的名字（可不填）"], "c.starLine": ["Starring {name}", "封面人物：{name}"],
  "c.ready": ["Your posts are ready.", "你的帖子写好了。"], "c.readyS": ["One for each platform. Edit anything.", "每个平台一篇，随便改。"], "c.where": ["Platforms", "平台"],
  "c.title": ["Title", "标题"], "c.text": ["Post", "正文"], "c.post": ["Post on {p}", "发到{p}"], "c.save": ["Save photo", "保存照片"], "c.another": ["Write another version", "换一个版本"],
  "c.stars": ["Your rating", "你的评分"], "c.starsS": ["Pick your own stars. Only post if it's your real experience.", "星级由你自己选。只在是真实体验时发布。"],
  "c.how": ["Copied. Paste it in {p}.", "已复制，到{p}贴上就好。"], 
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
  "c.you": ["You", "你"],
  "th.xhs": ["Xiaohongshu cover", "小红书封面"], "th.mag": ["Magazine", "杂志封面"], "th.receipt": ["Receipt", "收据"], "th.film": ["Film", "胶片"], "th.cute": ["Cute", "可爱"], "th.simple": ["Simple", "简约"],
  "th.polaroid": ["Polaroid", "拍立得"], "th.kopitiam": ["Kopitiam", "茶室"], "th.chalk": ["Chalkboard", "黑板"], "th.neon": ["Neon", "霓虹"], "th.split": ["Colour block", "撞色"], "th.minimal": ["Gallery", "留白"],
  "th.duotone": ["Duotone", "双色调"], "th.riso": ["Risograph", "孔版印刷"], "th.batik": ["Batik", "蜡染"], "th.collage": ["Contact sheet", "印样"], "th.ticket": ["Ticket", "票根"], "th.menu": ["Menu card", "菜单卡"],
  "fest.deepavali": ["Deepavali", "屠妖节"], "fest.christmas": ["Christmas", "圣诞节"], "fest.cny": ["Chinese New Year", "农历新年"], "fest.raya": ["Hari Raya", "开斋节"], "fest.merdeka": ["Merdeka", "国庆日"], "fest.msday": ["Malaysia Day", "马来西亚日"], "fest.midautumn": ["Mid-Autumn", "中秋节"],
  "fg.deepavali": ["Happy Deepavali", "屠妖节快乐"], "fg.christmas": ["Merry Christmas", "圣诞快乐"], "fg.cny": ["Gong Xi Fa Cai", "恭喜发财"], "fg.raya": ["Selamat Hari Raya", "开斋节快乐"], "fg.merdeka": ["Selamat Hari Merdeka", "国庆日快乐"], "fg.msday": ["Selamat Hari Malaysia", "马来西亚日快乐"], "fg.midautumn": ["Happy Mid-Autumn", "中秋节快乐"],
  "tc.brand": ["Brand colour", "品牌色"],
  "kit.size": ["Size", "尺寸"], "kit.design": ["Design", "设计"], "kit.head": ["Headline", "标题"], "kit.show": ["Show", "显示"], "kit.lang": ["Language", "语言"], "kit.both": ["Both", "双语"],
  "kit.custom": ["Your own words", "自己写"], "kit.print1": ["Print", "打印"], "kit.printN": ["Print {n} on A4", "一张 A4 印 {n} 个"],
  "kit.a4note": ["The A4 poster uses your brand colour and both languages.", "A4 海报使用你的品牌色和双语。"],
  "kf.table": ["Table card", "桌卡"], "kf.tableS": ["10 × 14 cm", "10 × 14 厘米"], "kf.sticker": ["Sticker", "贴纸"], "kf.stickerS": ["6 cm round", "直径 6 厘米"],
  "kf.card": ["Name card", "名片"], "kf.cardS": ["9 × 5.4 cm", "9 × 5.4 厘米"], "kf.a5": ["Counter stand", "柜台立牌"], "kf.a5S": ["A5", "A5"], "kf.a4": ["Poster", "海报"], "kf.a4S": ["A4", "A4"],
  "ks.logo": ["Logo", "标志"], "ks.name": ["Shop name", "店名"], "ks.reward": ["Reward", "奖励"], "ks.plats": ["App icons", "平台图标"], "ks.info": ["Address and hours", "地址和营业时间"],
  "kh.1": ["Scan, tap, post", "扫码、点选、发布"], "kh.2": ["Post your photo, get a stamp", "晒照发帖，盖个印章"], "kh.3": ["Snap, share, get rewarded", "拍一拍，晒一晒，拿奖励"],
  "kh.4": ["Join free, collect stamps", "免费入会，集印章"], "kh.5": ["Love it? Post it!", "喜欢就晒出来！"],
  "tc.h": ["Card design", "桌卡设计"], "tc.classic": ["Classic", "经典"], "tc.seal": ["Red seal", "红印"], "tc.kopitiam": ["Kopitiam", "茶室"], "tc.night": ["Night", "夜色"], "tc.sunny": ["Sunny", "阳光"], "tc.minimal": ["Minimal", "极简"], "tc.pandan": ["Pandan", "班兰"], "tc.festive": ["Festive", "节日"],
  "s.h": ["Staff scan", "店员扫码"], "s.scan": ["Scan member QR", "扫会员 QR"], 
  "s.receipt": ["Receipt number", "单据号码"], "s.amount": ["Receipt total (RM)", "单据金额（RM）"],
  "s.add": ["Add stamp", "盖印章"], "s.redeem": ["Redeem reward", "兑换奖励"], "s.ok": ["Stamp added", "已盖章"], "s.okr": ["Reward redeemed", "奖励已兑换"],
  "s.dup": ["This receipt was already used.", "这张单据已经用过了。"], "s.nor": ["Not enough stamps yet.", "印章还不够。"], "s.needr": ["Type the receipt number first.", "请先输入单据号码。"],
  "s.ready": ["Reward ready!", "可以兑换奖励！"],
  "nav.login": ["Log in", "登录"], 
  "home.staffS": ["Stamp a member's card at the counter", "在柜台帮会员盖章"], 
  "po.saved": ["Saved. Caption copied.", "已保存，文案已复制。"], 
  "sv.h": ["Saved and ready", "已保存，可以发了"], 
  "sv.s": ["The images are in your photos or downloads and the caption is copied. Open each app to post.", "图片已存好，文案已复制。打开各个 App 发布就好。"], 
  "sv.remind": ["Remind me {when}", "{when}提醒我"], 
  "sv.open": ["Open {p}", "打开 {p}"], 
  "rem.title": ["Post on {p}", "发到{p}"], 
  "rem.week": ["Go AI post for {shop}", "{shop} 的 Go AI 帖子"], 
  "rem.done": ["Calendar file saved. Open it to add the reminder.", "日历文件已保存，打开即可加入提醒。"], 
  "wk.saveAll": ["Save all 8 images", "保存全部 8 张图片"], 
  "wk.cal": ["Add 7 reminders to my calendar", "加 7 个日历提醒"], 
  "sh.link": ["Customer page link", "顾客页面链接"], 
  "sh.themesS": ["Shown with an example photo.", "用示例照片展示。"], 
  "mb.list": ["All members", "全部会员"], 
  "mb.last": ["Last visit {d}", "上次来：{d}"], 
  "mb.never": ["No visit yet", "还没来过"], 
  "mb.empty": ["No members yet. Customers join from your QR page.", "还没有会员。顾客扫 QR 就能加入。"], 
  "mb.wa": ["Offers OK", "接收优惠"], 
  "v.who2": ["{n} quiet member{s} said yes to WhatsApp offers. Tap each one to send.", "{n} 位沉睡会员同意接收 WhatsApp 优惠，逐个点击发送。"], 
  "v.send": ["Send", "发送"], 
  "v.how": ["Each tap opens WhatsApp with the message ready. You press send.", "每次点击都会打开 WhatsApp，讯息已写好，你按发送就行。"], 
  "v.none": ["Nobody to message right now. Members who said yes to offers show up here when they go quiet.", "现在没有需要发送的会员。同意接收优惠的会员沉睡后会出现在这里。"], 
  "ch.none": ["Nothing yet this month.", "这个月还没有数据。"], 
  "nx.qr": ["Print the QR table card and put one on every table.", "打印 QR 桌卡，每张桌子放一张。"], 
  "nx.style": ["{s} is the favourite style. Show it on the table card.", "最受欢迎的风格是{s}，桌卡上就用它。"], 
  "nx.day": ["Most posts happen on {d}. Have the QR card out before then.", "大部分帖子在{d}发，那之前把 QR 卡摆好。"], 
  "nx.keep": ["Keep going. Every scan and stamp shows up here.", "继续加油，每次扫码和盖章都会出现在这里。"], 
  "rp.redeemed": ["rewards redeemed", "次奖励兑换"], 
  "rp.offers": ["welcome-back offers sent", "个回头优惠已发"], 
  "c.code": ["Member code", "会员码"], 
  "c.bad": ["This shop link doesn't work. Ask the shop for a new QR.", "这个链接无效，请向店家要新的 QR。"], 
  "s.stop": ["Stop camera", "关闭相机"], 
  "s.code": ["Member code or phone", "会员码或电话"],
  "s.find": ["Find", "查找"], 
  "s.noCode": ["No member with this code.", "找不到这个会员码。"], "s.noPhone": ["No member with this phone number.", "找不到这个电话号码的会员。"], 
  "s.camNo": ["Can't open the camera. Type the code instead.", "打不开相机，请输入会员码。"], 
  "s.next": ["Next customer", "下一位"], 
  "s.back": ["Back to members", "回到会员"], 
  "au.loginH": ["Log in to your shop", "登录你的店"], 
  "au.signupH": ["Set up your shop", "开设你的店"], 
  "au.signupS": ["Two minutes. You can change everything later.", "两分钟搞定，之后都能改。"], 
  "au.email": ["Email", "电邮"], 
  "au.pass": ["Password", "密码"], 
  "au.passS": ["At least 8 characters", "至少 8 个字符"], 
  "au.login": ["Log in", "登录"], 
  "au.signup": ["Create my shop", "开设我的店"], 
  "au.new": ["New to Go AI?", "第一次用 Go AI？"], 
  "au.have": ["Already have a shop?", "已经有店了？"], 
  "au.toSignup": ["Set up a shop", "开设店铺"], 
  "au.toLogin": ["Log in", "登录"], 
  "au.type": ["Kind of shop", "店的类型"], 
  "au.shop": ["Shop name", "店名"], 
  "au.owner": ["Your name (optional)", "你的名字（可不填）"], 
  "au.city": ["City", "城市"], 
  "au.best": ["Best seller", "招牌产品"], 
  "au.bestZh": ["Best seller in 中文 (optional)", "招牌产品中文名（可不填）"], 
  "au.made": ["Your shop is ready. Put your QR on the counter next.", "店开好了！下一步把 QR 放在柜台。"], 
  "set.h": ["Shop settings", "店铺设置"], 
  "set.items": ["What you sell", "你卖什么"], 
  "set.itemsS": ["Customers pick from these when they post.", "顾客发帖时从这里选。"], 
  "set.add": ["Add item", "加一项"], 
  "set.remove": ["Remove", "删除"], 

  "set.goal": ["Stamps for a reward", "集几个印章换奖励"], 


  "set.review": ["Google review link (optional)", "Google 评价链接（可不填）"], 
  "set.reviewS": ["In Google Business Profile, under Ask for reviews.", "在 Google 商家资料的「索取评价」里。"], 
  "set.save": ["Save", "保存"], 
  "set.saved": ["Saved", "已保存"], 
  "set.logout": ["Log out", "退出登录"], 
  "set.page": ["Your customer page", "你的顾客页面"], 
  "set.en": ["Name", "名称"], 
  "set.zh": ["中文 (optional)", "中文（可不填）"], 
  "err.server": ["Something went wrong. Try again.", "出错了，请再试一次。"], 
  "err.offline": ["Can't reach Go AI. Check your connection.", "连不上 Go AI，请检查网络。"], 
  "err.invalid": ["Some details are missing or too long. Check the form.", "有资料没填或太长，请检查表格。"], 
  "err.email_taken": ["This email already has a shop. Log in instead.", "这个电邮已经开过店，请直接登录。"], 
  "err.bad_login": ["Email or password is wrong.", "电邮或密码不对。"], "err.bad_password": ["That password is not right.", "密码不对。"], 
  "err.too_many": ["Too many tries. Wait a few minutes.", "尝试太多次，请等几分钟。"], 
  "err.need_item": ["Add at least one item.", "至少加一项产品。"], 
  "err.need_terms": ["Please agree to the terms first.", "请先同意条款。"], 
  "err.bad_phone": ["Check the phone number.", "请检查手机号码。"], 
  "err.not_found": ["Not found.", "找不到。"], 
  "err.need_login": ["Please log in again.", "请重新登录。"],
  "err.bad_pin": ["That PIN is not right.", "PIN 码不对。"],
  "pin.h": ["Staff PIN", "店员 PIN 码"],
  "pin.new": ["New PIN (4 to 6 digits)", "新 PIN 码（4 到 6 位数字）"],
  "pin.none": ["No PIN yet. With a PIN, staff can stamp cards without your email and password.", "还没有 PIN 码。有了 PIN 码，店员不用你的电邮和密码也能盖章。"],
  "pin.set": ["A PIN is set. Saving a new one signs out every staff device.", "已设置 PIN 码。保存新的 PIN 码会让所有店员设备退出。"],
  "pin.save": ["Save PIN", "保存 PIN 码"],
  "pin.saved": ["PIN saved", "PIN 码已保存"],
  "pin.page": ["Staff page", "店员页面"],
  "pin.pageS": ["Open this link on the counter phone or tablet, then type the PIN once.", "在柜台的手机或平板打开这个链接，输入一次 PIN 码就好。"],
  "pin.in": ["Staff PIN", "店员 PIN 码"],
  "pin.inS": ["Only once on this device. Ask the owner for it.", "这台设备只需输入一次。PIN 码请问老板。"],
  "pin.go": ["Unlock", "解锁"],
  "pin.off": ["The owner has not set a staff PIN yet. They can set one in Settings.", "老板还没有设置店员 PIN 码，可以在设置里设置。"],
  "pin.again": ["Type the staff PIN again.", "请再输入一次店员 PIN 码。"],
  "pin.badShop": ["This staff link doesn't match a shop. Ask the owner for the link in Settings.", "这个店员链接无效，请向老板要设置里的链接。"],
  "s.undo": ["Undo stamp", "撤销盖章"], "s.undone": ["Stamp taken back", "已撤销盖章"], "s.late": ["Stamps can only be taken back within 10 minutes.", "只能在 10 分钟内撤销盖章。"], "mb.remove": ["Remove", "删除"], "mb.removeQ": ["Remove {name}? Their stamps and visits are deleted too.", "删除 {name}？印章和到店记录也会一起删除。"], "mb.removed": ["Member removed", "会员已删除"], "mb.export": ["Download your data", "下载你的资料"], "mb.exportM": ["Members (CSV)", "会员（CSV）"], "mb.exportV": ["Visits and receipts (CSV)", "到店和单据（CSV）"], "c.optout": ["Stop WhatsApp offers", "不再接收 WhatsApp 优惠"], "c.optedout": ["Done. No more offers from {shop}.", "好了，不会再收到 {shop} 的优惠。"], "c.leave": ["Leave and delete my card", "退出并删除我的会员卡"], "c.leaveQ": ["Leave {shop} Members? Your card and stamps will be deleted.", "退出 {shop} 会员？你的会员卡和印章会被删除。"], "c.left": ["You left. Your card and stamps are deleted.", "已退出，会员卡和印章已删除。"], "c.privacy": ["Privacy notice", "隐私声明"], "pv.h": ["Privacy notice", "隐私声明"], "pv.who": ["{shop} runs this membership. Go AI provides the app.", "这个会员计划由 {shop} 管理，Go AI 提供应用程序。"], "pv.keepH": ["What is kept", "保存哪些资料"], "pv.keep": ["Your name, your phone number if you gave one, your stamps, the dates you visited, and the receipt numbers and totals staff typed when stamping.", "你的名字、你提供的手机号码（如有）、印章、到店日期，以及店员盖章时输入的单据号码和金额。"], "pv.photoH": ["Your photos", "你的照片"], "pv.photo": ["Your photos stay on your phone. Go AI does not upload them. Posts are written on your phone and you choose where to share them.", "你的照片只留在你的手机里，Go AI 不会上传。帖子在你的手机上生成，分享到哪里由你决定。"], "pv.whyH": ["Why", "为什么"], "pv.why": ["To give you stamps and rewards, and, only if you said yes, to send you WhatsApp offers.", "为了给你印章和奖励；只有在你同意时，才会用 WhatsApp 发优惠给你。"], "pv.seeH": ["Who sees it", "谁能看到"], "pv.see": ["{shop} and its staff. Go AI does not sell it or share it with advertisers.", "只有 {shop} 和店员。Go AI 不会出售，也不会提供给广告商。"], "pv.choiceH": ["Your choices", "你的选择"], "pv.choice": ["Stop offers or leave at any time from your member card. Leaving deletes your card, stamps and visits. You can also ask {shop} to do it for you.", "随时可以在会员卡上停止接收优惠或退出。退出会删除你的会员卡、印章和到店记录。你也可以请 {shop} 帮你处理。"], "pv.back": ["Back", "返回"], "set.acct": ["Account", "账户"], "set.pwOld": ["Current password", "当前密码"], "set.pwNew": ["New password", "新密码"], "set.pwSave": ["Change password", "更改密码"], "set.pwDone": ["Password changed. Other phones need to log in again.", "密码已更改，其他手机需要重新登录。"], "set.del": ["Delete my shop", "删除我的店"], "set.delS": ["Deletes the shop, every member, visit and report. This cannot be undone.", "会删除店铺、所有会员、到店记录和报告，无法恢复。"], "set.delPw": ["Type your password to confirm", "输入密码确认"], "set.delGo": ["Delete everything", "全部删除"], "set.deleted": ["Your shop and its data are deleted.", "店铺和所有资料已删除。"], "gs.h": ["Get started", "开始使用"], "gs.n": ["{n} of {m} done", "完成 {n} / {m}"], "gs.items": ["Add what you sell", "加上你卖的东西"], "gs.itemsS": ["Customers pick from these when they post", "顾客发帖时从这里选"], "gs.pin": ["Set a staff PIN", "设置店员 PIN 码"], "gs.pinS": ["So staff can stamp without your password", "店员不用你的密码也能盖章"], "gs.qr": ["Put your QR on the counter", "把 QR 放在柜台"], "gs.qrS": ["Done when the first customer scans it", "第一位顾客扫码后就完成"], "gs.post": ["Make your first poster", "做第一张海报"], "gs.postS": ["One photo, every platform", "一张照片，全平台"], "gs.member": ["Welcome your first member", "迎来第一位会员"], "gs.memberS": ["They join from the QR after posting", "顾客发帖后从 QR 加入"], "gs.review": ["Add your Google review link", "加上 Google 评价链接"], "gs.reviewS": ["Customers land on your review page", "顾客直接到你的评价页"], "c.readPrivacy": ["Read the privacy notice", "阅读隐私声明"],
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
  [["Your own posts", "店家自己的帖子"], ["Not included", "没有"], ["Posters in 60s, a week of posts in one go, calendar reminders", "60 秒海报、一次做好一周、日历提醒"]],
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
// whole ringgit for prices; real receipts keep their sen (RM9.50, not RM10)
const rm = (n) => "RM" + n.toLocaleString("en-MY", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: Number.isInteger(n) ? 0 : 2 });
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
  notice: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M7 8.5h10M7 11.5h6"/></svg>',
  create: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  week: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M9 15l2 2 4-4"/></svg>',
  qr: '<svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 18h2v2h-2zM18 14h2v2h-2z"/></svg>',
  stamp: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="8.5" cy="12" r="1.6"/><circle cx="13" cy="12" r="1.6"/><circle cx="17.5" cy="12" r="1.6"/></svg>',
};

/* ======================= shop types: the words and styles that come with a kind of shop ======================= */
// words several kinds of shop share
const V = {
  staff: { chip: ["Friendly staff", "店员亲切"], en: "the staff were really friendly", zh: "店员很亲切", short: ["lovely staff", "店员超暖"], tag: ["#goodvibes", "#服务好"] },
  value: { chip: ["Good value", "性价比高"], en: "it's great value for what you get", zh: "性价比很高", short: ["great value", "性价比高"], tag: ["#worthit", "#性价比"] },
  fair: { chip: ["Fair prices", "价格公道"], en: "prices are fair", zh: "价格很公道", short: ["fair prices", "价格公道"], tag: ["#worthit", "#性价比"] },
  clean: { chip: ["Clean", "干净"], en: "the place is clean and comfortable", zh: "环境干净舒服", short: ["super clean", "很干净"], tag: ["#clean", "#干净"] },
  tasty: { chip: ["Tasty", "好吃"], en: "the {item} was seriously good", zh: "{item}真的很好吃", short: ["so good", "超好吃"], tag: ["#yum", "#好吃"] },
  result: (tag) => ({ chip: ["Love the result", "效果很满意"], en: "I really love how the {item} turned out", zh: "{item}效果很满意", short: ["love the result", "效果超满意"], tag }),
};
const W = {
  solo: { chip: ["Solo", "一个人"], en: "Some me-time", zh: "一个人的小确幸" }, friends: { chip: ["Friends", "朋友"], en: "Catch-up with friends", zh: "和朋友聚聚" },
  family: { chip: ["Family", "家人"], en: "Family day out", zh: "一家人出来走走" }, partner: { chip: ["Partner", "另一半"], en: "Date day", zh: "和另一半约会" },
  colleagues: { chip: ["Colleagues", "同事"], en: "Lunch with colleagues", zh: "和同事吃午餐" }, me: { chip: ["Me", "自己"], en: "A treat for me", zh: "犒劳自己" },
  gift: { chip: ["A gift", "送人"], en: "Picking a gift", zh: "挑礼物" }, treat: { chip: ["Treat myself", "犒劳自己"], en: "Treating myself", zh: "犒劳一下自己" }, look: { chip: ["Fresh look", "换新造型"], en: "New look day", zh: "换个新造型" },
  event: { chip: ["Big event", "重要场合"], en: "Getting ready for a big day", zh: "为重要场合做准备" }, routine: { chip: ["Regular visit", "定期来"], en: "My regular visit", zh: "定期来报到" },
};
const only = (o, ...keys) => Object.fromEntries(keys.map((k) => [k, o[k]]));
const TYPES = {
  cafe: {
    emoji: "☕", color: "#1E5B3A", cat: ["café", "咖啡馆"], catTag: ["MalaysiaCafe", "大马咖啡"], got: ["got", "点了"],
    goal: 8, quietDays: 30, reward: ["{g} stamps = 1 free drink", "集满 {g} 个印章 = 免费饮料一杯"], offer: ["RM5 off any drink", "任何饮料减 RM5"],
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
    coverLines: { en: ["Today's best seat", "Extra happy today"], zh: ["今日好位子", "快乐加倍"] },
    receipt: { en: [["GOOD MOOD", "RM0.00"], ["BEST FRIEND", "FREE"], ["SMILES", "YES"]], zh: [["好心情", "RM0.00"], ["好朋友", "免费"], ["笑容", "有"]] },
    cute: ["SO GOOD!", "太赞了!"],
  },
  restaurant: {
    emoji: "🍜", color: "#8A2B12", cat: ["restaurant", "餐厅"], catTag: ["MalaysiaFood", "大马美食"], got: ["had", "吃了"],
    goal: 8, quietDays: 30, reward: ["{g} stamps = 1 free main", "集满 {g} 个印章 = 免费主食一份"], offer: ["RM5 off your next meal", "下一餐减 RM5"],
    vibes: {
      tasty: V.tasty,
      portion: { chip: ["Big portions", "份量足"], en: "the portions are generous", zh: "份量很足", short: ["big portions", "份量足"], tag: ["#makan", "#份量足"] },
      value: V.value,
      fast: { chip: ["Quick service", "上菜快"], en: "the food came out fast", zh: "上菜很快", short: ["quick service", "上菜快"], tag: ["#quickbite", "#上菜快"] },
      staff: V.staff, clean: V.clean,
      family: { chip: ["Family friendly", "适合家庭"], en: "it's great for families", zh: "很适合一家大小来", short: ["family friendly", "适合家庭"], tag: ["#familymakan", "#家庭聚餐"] },
    },
    withQ: ["Who with?", "和谁一起？"], with: only(W, "solo", "friends", "family", "colleagues"),
    coverLines: { en: ["Today's makan", "Worth the trip"], zh: ["今日美食", "值得专程来"] },
    receipt: { en: [["HAPPY TUMMY", "FULL"], ["GOOD COMPANY", "FREE"], ["NEXT VISIT", "SOON"]], zh: [["开心肚子", "吃饱"], ["好伙伴", "免费"], ["下次再来", "很快"]] },
    cute: ["YUMMY!", "好好吃!"],
  },
  bakery: {
    emoji: "🥐", color: "#7A4A1E", cat: ["bakery", "面包店"], catTag: ["MalaysiaBakery", "大马烘焙"], got: ["picked up", "买了"],
    goal: 8, quietDays: 30, reward: ["{g} stamps = 1 free pastry", "集满 {g} 个印章 = 免费糕点一个"], offer: ["RM3 off any pastry", "任何糕点减 RM3"],
    vibes: {
      fresh: { chip: ["Fresh", "新鲜出炉"], en: "the {item} was fresh out of the oven", zh: "{item}刚出炉，很新鲜", short: ["so fresh", "超新鲜"], tag: ["#freshbake", "#新鲜出炉"] },
      tasty: V.tasty,
      pretty: { chip: ["Pretty", "颜值高"], en: "everything looks almost too pretty to eat", zh: "颜值高到舍不得吃", short: ["so pretty", "颜值超高"], tag: ["#sweettooth", "#甜点"] },
      sweet: { chip: ["Not too sweet", "不会太甜"], en: "it's not too sweet", zh: "甜度刚好，不会太甜", short: ["just sweet enough", "不会太甜"], tag: ["#lesssweet", "#少甜"] },
      value: V.value, staff: V.staff,
    },
    withQ: ["Who is it for?", "买给谁？"], with: only(W, "me", "family", "friends", "gift"),
    coverLines: { en: ["Fresh today", "Sweet moment"], zh: ["今日新鲜", "甜蜜时刻"] },
    receipt: { en: [["SWEET TOOTH", "YES"], ["FRESH BAKE", "TODAY"], ["SMILES", "FREE"]], zh: [["爱吃甜", "是"], ["新鲜出炉", "今天"], ["笑容", "免费"]] },
    cute: ["SO SWEET!", "好甜!"],
  },
  drinks: {
    emoji: "🧋", color: "#5B2A86", cat: ["drinks shop", "饮料店"], catTag: ["BubbleTeaMY", "大马奶茶"], got: ["got", "点了"],
    goal: 10, quietDays: 21, reward: ["{g} stamps = 1 free drink", "集满 {g} 个印章 = 免费饮料一杯"], offer: ["RM2 off any drink", "任何饮料减 RM2"],
    vibes: {
      tasty: { chip: ["Tasty", "好喝"], en: "the {item} was seriously good", zh: "{item}真的很好喝", short: ["so good", "超好喝"], tag: ["#yum", "#好喝"] },
      pearls: { chip: ["Chewy pearls", "珍珠Q弹"], en: "the pearls are perfectly chewy", zh: "珍珠很Q弹", short: ["chewy pearls", "珍珠Q弹"], tag: ["#boba", "#珍珠奶茶"] },
      sweet: { chip: ["My sweetness", "甜度刚好"], en: "you can pick how sweet it is", zh: "甜度可以自己选", short: ["just sweet enough", "甜度刚好"], tag: ["#lesssweet", "#少甜"] },
      fast: { chip: ["Quick service", "出杯快"], en: "my drink was ready fast", zh: "出杯很快", short: ["quick service", "出杯快"], tag: ["#quickbite", "#出杯快"] },
      value: V.value, staff: V.staff,
    },
    withQ: ["Who with?", "和谁一起？"], with: only(W, "solo", "friends", "partner", "colleagues"),
    coverLines: { en: ["Today's sip", "Happy hour"], zh: ["今日一杯", "快乐时光"] },
    receipt: { en: [["GOOD MOOD", "RM0.00"], ["SUGAR LEVEL", "JUST RIGHT"], ["SMILES", "YES"]], zh: [["好心情", "RM0.00"], ["甜度", "刚好"], ["笑容", "有"]] },
    cute: ["SO GOOD!", "太好喝!"],
  },
  salon: {
    getQ: ["What did you have done?", "你做了什么？"],
    emoji: "✂️", color: "#1F2A44", cat: ["salon", "发廊"], catTag: ["MalaysiaSalon", "大马美发"], got: ["had", "做了"],
    goal: 6, quietDays: 45, reward: ["{g} stamps = 1 free wash and blow", "集满 {g} 个印章 = 免费洗吹一次"], offer: ["RM10 off your next visit", "下次消费减 RM10"],
    vibes: {
      result: V.result(["#newhair", "#新发型"]),
      listen: { chip: ["They listened", "很懂我要什么"], en: "the stylist really listened to what I wanted", zh: "发型师很懂我要什么", short: ["they really listened", "很懂我"], tag: ["#hairstylist", "#发型师"] },
      skill: { chip: ["Skilled", "手艺好"], en: "they really know their craft", zh: "手艺很好", short: ["real skill", "手艺好"], tag: ["#haircut", "#剪发"] },
      ontime: { chip: ["On time", "准时"], en: "they started right on time", zh: "很准时，不用等", short: ["on time", "很准时"], tag: ["#noqueue", "#不用等"] },
      clean: V.clean, value: V.fair,
    },
    withQ: ["What's the occasion?", "为了什么？"], with: only(W, "look", "event", "routine", "treat"),
    coverLines: { en: ["New look today", "Fresh cut"], zh: ["今日新造型", "清爽新发型"] },
    receipt: { en: [["NEW LOOK", "YES"], ["CONFIDENCE", "FULL"], ["GOOD HAIR DAY", "TODAY"]], zh: [["新造型", "有"], ["自信", "满满"], ["好发型日", "今天"]] },
    cute: ["LOVE IT!", "超喜欢!"],
  },
  beauty: {
    getQ: ["What did you have done?", "你做了什么？"],
    emoji: "💅", color: "#8C2155", cat: ["beauty studio", "美容店"], catTag: ["MalaysiaBeauty", "大马美容"], got: ["had", "做了"],
    goal: 6, quietDays: 45, reward: ["{g} stamps = RM20 off", "集满 {g} 个印章 = 减 RM20"], offer: ["RM15 off your next visit", "下次消费减 RM15"],
    vibes: {
      result: V.result(["#beauty", "#美容"]),
      gentle: { chip: ["Gentle", "手法轻柔"], en: "the therapist was gentle and careful", zh: "美容师手法很轻柔", short: ["so gentle", "手法轻柔"], tag: ["#selfcare", "#自我宠爱"] },
      relax: { chip: ["Relaxing", "很放松"], en: "it was really relaxing", zh: "整个过程很放松", short: ["so relaxing", "超放松"], tag: ["#metime", "#放松"] },
      neat: { chip: ["Neat work", "做得很细"], en: "the work is neat and detailed", zh: "做得很细致", short: ["neat work", "很细致"], tag: ["#nailart", "#美甲"] },
      clean: { chip: ["Clean and hygienic", "干净卫生"], en: "everything is clean and hygienic", zh: "环境干净卫生", short: ["super clean", "很卫生"], tag: ["#hygiene", "#干净卫生"] },
      value: V.fair,
    },
    withQ: ["What's the occasion?", "为了什么？"], with: only(W, "treat", "event", "routine", "friends"),
    coverLines: { en: ["Treat yourself", "Glow day"], zh: ["宠爱自己", "发光日"] },
    receipt: { en: [["SELF CARE", "YES"], ["GLOW", "ON"], ["STRESS", "ZERO"]], zh: [["自我宠爱", "有"], ["光彩", "满满"], ["压力", "零"]] },
    cute: ["SO PRETTY!", "好美!"],
  },
  pet: {
    emoji: "🐾", color: "#0B4F6C", cat: ["pet shop", "宠物店"], catTag: ["MalaysiaPets", "大马宠物"], got: ["picked up", "买了"],
    goal: 10, quietDays: 60, reward: ["{g} stamps = RM10 off", "集满 {g} 个印章 = 减 RM10"], offer: ["RM10 off your next visit", "下次消费减 RM10"],
    vibes: {
      healthy: { chip: ["Healthy pets", "宠物很健康"], en: "the animals look healthy and happy", zh: "小动物都很健康有活力", short: ["healthy pets", "很健康"], tag: ["#petlovers", "#萌宠"] },
      advice: { chip: ["Expert advice", "讲解专业"], en: "the staff explained everything clearly", zh: "店员讲解很专业", short: ["real experts", "讲解专业"], tag: ["#petcare", "#养宠"] },
      variety: { chip: ["Big variety", "选择多"], en: "there's so much to choose from", zh: "选择超多", short: ["so much choice", "选择超多"], tag: ["#petshop", "#宠物店"] },
      clean: { chip: ["Clean shop", "店很干净"], en: "the shop is clean and bright", zh: "店里很干净明亮", short: ["super clean", "超干净"], tag: ["#cleanshop", "#干净"] },
      value: { chip: ["Fair prices", "价格公道"], en: "prices are fair", zh: "价格很公道", short: ["fair prices", "价格公道"], tag: ["#worthit", "#性价比"] },
      staff: { chip: ["Friendly staff", "店员亲切"], en: "the staff were really friendly", zh: "店员很亲切", short: ["lovely staff", "店员超暖"], tag: ["#goodvibes", "#服务好"] },
    },
    withQ: ["Who is it for?", "买给谁？"],
    with: { cat: { chip: ["My cat", "猫主子"], en: "Shopping for my cat", zh: "给猫主子采购" }, dog: { chip: ["My dog", "狗狗"], en: "Treats run for my dog", zh: "给狗狗买零食" }, fish: { chip: ["My fish", "我的鱼"], en: "New friends for my tank", zh: "给鱼缸添新成员" }, gift: { chip: ["A gift", "送人"], en: "Picking a gift", zh: "挑礼物" } },
    coverLines: { en: ["Star of the month", "Our new best friend"], zh: ["本月明星", "新朋友"] },
    receipt: { en: [["NEW BEST FRIEND", "PRICELESS"], ["PET GOALS", "MET"], ["HAPPY PET", "YES"]], zh: [["新朋友", "无价"], ["养宠目标", "达成"], ["开心宠物", "有"]] },
    cute: ["SO CUTE!", "太可爱了!"],
  },
  florist: {
    emoji: "💐", color: "#5A6B1F", cat: ["florist", "花店"], catTag: ["MalaysiaFlorist", "大马花店"], got: ["picked up", "买了"],
    goal: 6, quietDays: 60, reward: ["{g} stamps = RM20 off a bouquet", "集满 {g} 个印章 = 花束减 RM20"], offer: ["RM10 off your next bouquet", "下次花束减 RM10"],
    vibes: {
      pretty: { chip: ["Beautiful", "很漂亮"], en: "the {item} is beautiful", zh: "{item}很漂亮", short: ["so beautiful", "超美"], tag: ["#flowers", "#鲜花"] },
      fresh: { chip: ["Fresh flowers", "花很新鲜"], en: "the flowers are really fresh", zh: "花很新鲜", short: ["so fresh", "很新鲜"], tag: ["#freshflowers", "#新鲜花材"] },
      wrap: { chip: ["Lovely wrapping", "包装好看"], en: "the wrapping is lovely", zh: "包装很好看", short: ["lovely wrapping", "包装好美"], tag: ["#bouquet", "#花束"] },
      custom: { chip: ["Made just for me", "按我要求做"], en: "they made it exactly the way I asked", zh: "完全按我的要求做", short: ["made just for me", "按我要求做"], tag: ["#custombouquet", "#定制花束"] },
      value: V.fair, staff: V.staff,
    },
    withQ: ["Who is it for?", "送给谁？"],
    with: { partner: { chip: ["Partner", "另一半"], en: "For my other half", zh: "送给另一半" }, family: { chip: ["Family", "家人"], en: "For the family", zh: "送给家人" }, friend: { chip: ["A friend", "朋友"], en: "For a friend", zh: "送给朋友" }, me: { chip: ["Me", "自己"], en: "A little something for me", zh: "送给自己" } },
    coverLines: { en: ["Fresh today", "Say it with flowers"], zh: ["今日鲜花", "用花说话"] },
    receipt: { en: [["LOVE", "LOTS"], ["SMILES", "YES"], ["FRESH", "TODAY"]], zh: [["爱", "满满"], ["笑容", "有"], ["新鲜", "今天"]] },
    cute: ["SO PRETTY!", "好美!"],
  },
  fashion: {
    emoji: "🛍️", color: "#2B2B2B", cat: ["boutique", "服饰店"], catTag: ["MalaysiaFashion", "大马穿搭"], got: ["picked up", "买了"],
    goal: 8, quietDays: 45, reward: ["{g} stamps = RM20 off", "集满 {g} 个印章 = 减 RM20"], offer: ["RM15 off your next buy", "下次购物减 RM15"],
    vibes: {
      style: { chip: ["Stylish", "很有型"], en: "the {item} looks great on", zh: "{item}上身很好看", short: ["so stylish", "超有型"], tag: ["#ootd", "#穿搭"] },
      quality: { chip: ["Good quality", "质量好"], en: "the quality is really good", zh: "质量很好", short: ["good quality", "质量好"], tag: ["#quality", "#质感"] },
      fit: { chip: ["Great fit", "很合身"], en: "it fits really well", zh: "很合身", short: ["great fit", "超合身"], tag: ["#fitcheck", "#合身"] },
      variety: { chip: ["Big variety", "选择多"], en: "there's so much to choose from", zh: "选择很多", short: ["so much choice", "选择超多"], tag: ["#shopping", "#逛街"] },
      help: { chip: ["Helpful staff", "店员很热心"], en: "the staff were really helpful", zh: "店员很热心", short: ["helpful staff", "店员热心"], tag: ["#goodservice", "#服务好"] },
      value: V.fair,
    },
    withQ: ["Who is it for?", "买给谁？"], with: only(W, "me", "gift", "friends", "event"),
    coverLines: { en: ["New in", "Today's look"], zh: ["新品到货", "今日穿搭"] },
    receipt: { en: [["NEW LOOK", "YES"], ["CONFIDENCE", "FULL"], ["SHOPPING", "DONE"]], zh: [["新造型", "有"], ["自信", "满满"], ["购物", "完成"]] },
    cute: ["SO CUTE!", "太可爱了!"],
  },
  other: {
    emoji: "🏪", color: "#3A3A5C", cat: ["shop", "店"], catTag: ["SupportLocalMY", "支持本地"], got: ["got", "买了"],
    goal: 8, quietDays: 45, reward: ["{g} stamps = 1 free gift", "集满 {g} 个印章 = 送小礼物一份"], offer: ["RM5 off your next visit", "下次消费减 RM5"],
    vibes: {
      quality: { chip: ["Good quality", "质量好"], en: "the {item} is really good quality", zh: "{item}质量很好", short: ["good quality", "质量好"], tag: ["#quality", "#质量好"] },
      staff: V.staff, value: V.value,
      fast: { chip: ["Quick service", "服务快"], en: "the service was quick", zh: "服务很快", short: ["quick service", "服务快"], tag: ["#quickservice", "#服务快"] },
      clean: V.clean,
      local: { chip: ["Local gem", "本地好店"], en: "it's a local gem worth supporting", zh: "值得支持的本地好店", short: ["a local gem", "本地好店"], tag: ["#supportlocal", "#支持本地"] },
    },
    withQ: ["Who is it for?", "买给谁？"], with: only(W, "me", "family", "friends", "gift"),
    coverLines: { en: ["Today's find", "Worth a visit"], zh: ["今日发现", "值得一去"] },
    receipt: { en: [["GOOD FIND", "YES"], ["SMILES", "FREE"], ["NEXT VISIT", "SOON"]], zh: [["好发现", "有"], ["笑容", "免费"], ["下次再来", "很快"]] },
    cute: ["LOVE IT!", "超喜欢!"],
  },
};
// the example shops on the landing page: illustrations only, never real accounts
const SAMPLE = {
  cafe: { slug: "laman-kopi", name: "Laman Kopi", type: "cafe", ownerName: "Mei Ling", city: "Johor Bahru", items: [{ en: "Iced Matcha Latte", zh: "冰抹茶拿铁" }, { en: "Kopi O", zh: "咖啡乌" }, { en: "Kaya Toast", zh: "咖椰吐司" }], goal: 8, reward: "", offer: "", quietDays: 30, reviewUrl: "", photo: "img/matcha-raw.jpg", magic: "img/matcha-magic.jpg", cust: "img/friends-raw.jpg", price: "RM 12.90" },
  pet: { slug: "go-paws", name: "Go Paws", type: "pet", ownerName: "Jason", city: "Johor Bahru", items: [{ en: "Halfmoon Betta", zh: "半月斗鱼" }, { en: "Cat food", zh: "猫粮" }], goal: 10, reward: "", offer: "", quietDays: 60, reviewUrl: "", photo: "img/betta-raw.jpg", magic: null, cust: "img/betta-raw.jpg", price: "" },
};
// one example per type that has a photo (florist has none yet); the photo doubles as the owner's shot and the customer's
const example = (type, name, ownerName, city, items, price) => ({ slug: type, name, type, ownerName, city, items: items.map(([en, zh]) => ({ en, zh })), goal: TYPES[type].goal, reward: "", offer: "", quietDays: TYPES[type].quietDays, reviewUrl: "", photo: `img/${type}-raw.jpg`, magic: null, cust: `img/${type}-raw.jpg`, price });
Object.assign(SAMPLE, {
  restaurant: example("restaurant", "Warung Mak Teh", "Mak Teh", "Kuala Lumpur", [["Nasi Lemak Ayam", "椰浆饭配炸鸡"], ["Mee Goreng", "炒面"], ["Teh Tarik", "拉茶"]], "RM 12.90"),
  bakery: example("bakery", "Roti Lane", "Grace", "Penang", [["Egg Tart", "蛋挞"], ["Butter Croissant", "牛油可颂"], ["Pandan Chiffon", "班兰戚风"]], "RM 4.50"),
  drinks: example("drinks", "Boba Bae", "Wei Jie", "Johor Bahru", [["Brown Sugar Boba", "黑糖珍珠"], ["Matcha Milk Tea", "抹茶奶茶"]], "RM 9.90"),
  salon: example("salon", "Studio Rambut", "Farah", "Kuala Lumpur", [["Haircut", "剪发"], ["Hair Colour", "染发"], ["Keratin Treatment", "角蛋白护理"]], "RM 45"),
  beauty: example("beauty", "Nail Story", "Mei", "Ipoh", [["Gel Manicure", "凝胶美甲"], ["Nail Art", "美甲彩绘"], ["Pedicure", "修脚"]], "RM 68"),
  fashion: example("fashion", "Kain & Co.", "Daniel", "Kuala Lumpur", [["Linen Shirt", "亚麻衬衫"], ["Rattan Tote", "藤编托特包"]], "RM 79"),
  other: example("other", "Kedai Ah Hock", "Ah Hock", "Seremban", [["Gift Box", "礼盒"], ["Local Biscuits", "本地饼干"]], "RM 25"),
});
const ZH_GLYPHS = JSON.stringify(TYPES) + JSON.stringify(SAMPLE) + JSON.stringify(T) + "屠妖节快乐新品快乐总计谢谢光临，欢迎再来年月号期封面人物：";

/* ======================= state ======================= */
const KEY = "goai.v4";
let S;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch { S = null; }
S = { lang: /^zh/i.test(navigator.language || "") ? "zh" : "en", m: "cafe", shop: "", after: "", ...(S || {}) };
if (!SAMPLE[S.m]) S.m = "cafe";
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
// SHOP: the logged-in owner's shop. CSHOP: the shop on a customer page. MEM: this phone's member card there.
let SHOP = null, CSHOP = null, REP = null, REP_AT = 0, MEMBERS = null, MEM = null, SET = null;

// a shop record (from the server, or a landing example) dressed with its type's words
const models = new WeakMap();
function shopModel(s) {
  if (models.has(s)) return models.get(s);
  const ty = TYPES[s.type] || TYPES.cafe, nm = s.name, tag = nm.replace(/[^\p{L}\p{N}]/gu, "") || "shop", words = nm.split(/\s+/);
  const items = s.items?.length ? s.items : [{ en: ty.cat[0], zh: ty.cat[1] }];
  const m = { ...ty, ...s, id: s.slug, short: (nm.length <= 12 ? nm : words.reduce((a, b) => (b.length > a.length ? b : a))).toUpperCase(),
    handle: "@" + (s.handle || tag.toLowerCase()), shopTag: tag, tags: `#${tag} #${ty.catTag[0]}`, brand: s.brand || "", font: s.font || "", logoUrl: s.logoAt ? `/api/s/${s.slug}/logo?v=${s.logoAt}` : "",
    address: s.address || "", tel: s.phone || "", maps: s.maps || "", hours: s.hours?.length === 7 ? s.hours : null,
    city: [s.city, s.city], owner: [s.ownerName || "boss", s.ownerName || "老板"],
    menu: items.map((x) => [x.en, x.zh || x.en]), item: [items[0].en, items[0].zh || items[0].en],
    reward: s.reward ? [s.reward, s.reward] : ty.reward.map((x) => x.replace("{g}", s.goal)), off: s.offer ? [s.offer, s.offer] : ty.offer, bday: s.bday ? [s.bday, s.bday] : s.offer ? [s.offer, s.offer] : ty.offer,
    cover: { en: [...ty.coverLines.en, `${nm}, ${s.city}`], zh: [...ty.coverLines.zh, `${nm}，${s.city}`] } };
  models.set(s, m);
  return m;
}
// the landing page shows the example shop, renamed if the visitor typed their own shop name
let pv;
function previewShop() {
  const k = `${S.m}|${S.shop || ""}`;
  if (pv?.k !== k) { const nm = (S.shop || "").trim(); pv = { k, s: { ...SAMPLE[S.m], name: nm || SAMPLE[S.m].name, ownerName: nm ? "" : SAMPLE[S.m].ownerName } }; }
  return pv.s;
}
const M = () => shopModel(route === "c" || route === "privacy" ? CSHOP || previewShop() : route === "staff" && ST.shop ? ST.shop : route === "landing" || !SHOP ? previewShop() : SHOP);

/* ---- server ---- */
async function api(path, body, method = body ? "POST" : "GET") {
  let r;
  try { r = await fetch(path, { method, headers: body ? { "content-type": "application/json" } : {}, body: body && JSON.stringify(body) }); }
  catch { throw Object.assign(new Error("offline"), { code: "offline" }); }
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(data.error || "server"), { code: data.error || "server", status: r.status });
  return data;
}
const errText = (e) => t(T["err." + e?.code] ? "err." + e.code : "err.server");
const quietCut = () => Date.now() - M().quietDays * 864e5;
const isQuietReach = (x) => x.mkt && x.phone && (x.lastVisit ?? x.created) < quietCut() && (x.lastOffer ?? 0) < quietCut();
async function loadRep(force) {
  if (force || !REP || Date.now() - REP_AT > 15e3) { REP = await api("/api/report"); REP_AT = Date.now(); }
  return REP;
}
let MQ = "", MH = null; // the member search text, and the member sheet's history
const digits = (x) => String(x || "").replace(/\D/g, "");
const matchMember = (x) => { const q = MQ.trim().toLowerCase(); return !q || x.name.toLowerCase().includes(q) || x.code.toLowerCase().includes(q) || (digits(q).length > 2 && digits(x.phone).includes(digits(q))); };
const isBday = (x) => x.birthMonth === new Date().getMonth() + 1;
const monthName = (n) => new Intl.DateTimeFormat(loc(), { month: "long" }).format(new Date(2026, n - 1, 1));
async function loadMembers() { MEMBERS = (await api("/api/members")).members; return MEMBERS; }

const seeded = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
// whole numbers that add up to `total` exactly, in proportion to the weights (largest remainder)
function split(total, weights) {
  const sum = weights.reduce((a, b) => a + b, 0), raw = weights.map((w) => (w / sum) * total), out = raw.map(Math.floor);
  const rem = total - out.reduce((a, b) => a + b, 0);
  raw.map((x, i) => [x - out[i], i]).sort((a, b) => b[0] - a[0]).slice(0, rem).forEach(([, i]) => out[i]++);
  return out;
}
// only the landing page's example chart uses made-up days
const spread = (total, days, seed, weekend) => { const rnd = seeded(seed); return split(total, days.map((d) => (d.getDay() % 6 === 0 ? weekend : 1) * (0.7 + rnd() * 0.6))); };
const cumsum = (a) => a.reduce((o, v) => (o.push((o.at(-1) || 0) + v), o), []);
function monthDays(y, mo, upto) { const last = new Date(y, mo + 1, 0).getDate(); return Array.from({ length: upto ?? last }, (_, i) => new Date(y, mo, i + 1)); }
const repOf = () => RD?.this;
const sorted = (o) => Object.entries(o || {}).sort((a, b) => b[1] - a[1]);

/* ======================= the customer post writer ======================= */
// Every post is built only from what the customer tapped: what they got, what they loved, who with.
// Nothing is invented: no prices, no claims, no experiences they did not pick.
const listEn = (a) => (a.length < 2 ? a[0] : `${a.slice(0, -1).join(", ")} and ${a.at(-1)}`);
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const GOPEN = { zh: { 5: "这次来很满意。", 4: "整体不错。", 3: "还可以。", 2: "这次体验一般。", 1: "这次有点失望。" }, en: { 5: "Really enjoyed my visit.", 4: "Good visit overall.", 3: "It was okay.", 2: "Not my best visit.", 1: "Disappointing visit this time." } };
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
      const open = GOPEN[lang];
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
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// words with Latin letters or digits match whole words only ("cure" is not in "Manicure", "#1" is not in "#10"); Chinese words match anywhere
const claimRe = (w) => new RegExp(/[a-z0-9]/i.test(w) ? `(?<![a-z0-9])${escRe(w)}(?![a-z0-9])` : escRe(w), "gi");
const findClaims = (text) => { const hit = ABS.filter((w) => claimRe(w).test(text)); return hit.filter((w) => !hit.some((o) => o !== w && o.includes(w))); };
function fixText(s) {
  for (const w of Object.keys(FIX).sort((a, b) => b.length - a.length)) s = s.replace(claimRe(w), FIX[w]);
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
  const pbx = payback(2880, 18, 120);
  console.assert(pbx.v === 160 && pbx.n === 22 && pbx.d === 6, "payback: RM2,880 at RM18 is 160 visits, 1 in 22 of 3,600 customers");
  console.assert(spread(186, monthDays(2026, 9, 19), 11, 1.9).reduce((a, b) => a + b, 0) === 186, "daily series must add up");
  console.assert(split(74, [0.32, 0.26, 0.19, 0.13, 0.1]).reduce((a, b) => a + b, 0) === 74, "split must add up");
  // a real shop can be lean: one item, a Chinese name, no owner name
  const lean = { slug: "a", name: "阿成咖啡", type: "cafe", ownerName: "", city: "Ipoh", items: [{ en: "Kopi" }], goal: 8, reward: "", offer: "", quietDays: 30, reviewUrl: "" };
  // every kind of shop, with every chip it offers
  const shops = [...Object.values(SAMPLE), lean, ...Object.keys(TYPES).map((type) => ({ ...lean, slug: type, name: "Kedai Ah Seng", type, items: [{ en: "House special", zh: "招牌" }, { en: "Set B" }] }))];
  for (const shop of shops) for (const lang of ["en", "zh"]) for (const p of PLAT_ORDER) for (const half of [0, 3]) {
    const m = shopModel(shop), inp = { m, items: m.menu.length > 1 ? [0, 1] : [0], vibes: Object.keys(m.vibes).slice(half, half + 3), with: Object.keys(m.with)[half ? 3 : 1], stars: 5 };
    for (const k of [0, 1, 2]) {
      const post = writePost(p, lang, inp, k), L0 = LIM[p], tags = (post.body.match(/#[^\s#]+/g) || []).length;
      console.assert(post.body && !post.body.includes("undefined"), `${m.id}/${lang}/${p}: empty or undefined`);
      console.assert(!/(^|[\n，。！：])的/.test(post.body), `${m.id}/${lang}/${p}: a sentence starts with 的 once the item name is dropped`);
      console.assert(!findClaims(`${post.title || ""}${post.body}`).length, `${m.id}/${lang}/${p}: writer must not make claims`);
      console.assert(tags <= L0.tags, `${m.id}/${lang}/${p}: too many tags (${tags})`);
      if (L0.title && post.title) console.assert([...post.title].length <= L0.title[lang === "zh" ? 0 : 1], `${m.id}/${lang}/${p}: title too long: ${post.title}`);
    }
  }
  console.assert(!findClaims(fixText("全网最好喝，保证100%满意，the best cure")).length, "fix must remove every claim");
  console.assert(!findClaims("Gel Manicure and Pedicure, the #10 bus").length && fixText("Gel Manicure") === "Gel Manicure", "whole words only: manicure is not a claim");
  console.assert(findClaims("A miracle cure, guaranteed").length === 3, "real claims are still caught");
  // looks and captions are defined further down the file, so they are checked once the page has loaded
  setTimeout(async () => {
    const img = await loadImg("img/matcha-raw.jpg"), m = M(), c = document.createElement("canvas");
    for (const [w, h] of [[216, 270], [216, 384], [216, 162]]) {
      for (const k of Object.keys(LOOKS)) try { await paint(c, w, h, LOOKS[k], { img, magicImg: null, m, item: "Iced Matcha Latte", price: "RM 12.90" }); } catch (e) { console.assert(false, `look ${k} at ${w}x${h}: ${e.message}`); }
      for (const [k, fn] of THEMES) try { await paint(c, w, h, fn, { img, m, title: "Iced Matcha Latte, so good!", sub: "Laman Kopi, Ipoh", star: "" }); } catch (e) { console.assert(false, `theme ${k} at ${w}x${h}: ${e.message}`); }
    }
    // collages: one cell per photo, all inside the box, never overlapping, upright and wide alike
    for (let n = 2; n <= MAX_PHOTOS; n++) for (const lay of LAYOUTS) for (const ar of [0.56, 1, 1.6]) {
      const cs = cells(n, lay, ar), area = cs.reduce((a, [, , w, h]) => a + w * h, 0);
      console.assert(cs.length === n && cs.every(([x, y, w, h]) => x >= 0 && y >= 0 && x + w <= 1.0001 && y + h <= 1.0001) && Math.abs(area - 1) < 1e-6, `collage ${n} ${lay} ${ar}`);
    }
    // every look in every shop font, with a badge, at the feed size
    for (const f of FONT_IDS) for (const k of Object.keys(LOOKS)) try { await paint(c, 216, 270, LOOKS[k], { img, magicImg: null, m, item: "Iced Matcha Latte", price: "RM 12.90", font: f, badge: { text: "NEW", style: "stamp", at: "auto" } }); } catch (e) { console.assert(false, `look ${k} in font ${f}: ${e.message}`); }
    console.assert(Object.keys(LOOKS).length === THEMES.length && THEMES.length >= 22, "owner and customer get the same looks");
    console.assert(new Set(THEMES.map(([k]) => k)).size === THEMES.length, "look ids are unique");
    const keep = C.item;
    for (const it of ["Iced Matcha Latte", "Gel Manicure", "冰咖啡"]) for (const lang of ["en", "zh"]) for (const k of Object.keys(LOOKS)) for (const i of [0, 1, 2, 3, 4, 5]) {
      C.item = it;
      const x = ownerCaption(k, lang, i), tags = (x.match(/#[^\s#]+/g) || []).length;
      console.assert(!/undefined|\{|\}/.test(x) && !findClaims(x).length && tags <= 5, `caption ${k}/${lang}/${i}: ${x}`);
    }
    C.item = keep;
    console.assert(nextFest(new Date(2026, 9, 20)).id === "deepavali" && nextFest(new Date(2026, 11, 26)).id === "christmas" && nextFest(new Date(2027, 0, 5)).id === "cny", "festivals follow the calendar");
    console.assert([0, 1, 2, 3, 4, 5, 6].every((d) => new Date(2026, 1, 1 + d).getDay() === d), "weekday names start from a Sunday");
    // 25 Oct 2026 is a Sunday, so payday moves to Friday; 1 Nov is both a new month and a week before Deepavali, and the festival wins
    const mp = Object.fromEntries(monthPlan(new Date(2026, 9, 21)).map((p) => [p.key, p.kind]));
    console.assert(mp["2026-10-23"] === "payday" && mp["2026-10-24"] === "weekend" && mp["2026-11-01"] === "soon" && mp["2026-11-08"] === "fest" && !mp["2026-10-21"] && !mp["2026-11-21"], "month plan: " + JSON.stringify(mp));
    window.goaiLooks = { LOOKS, THEMES, paint, sname, ownerCaption, C, M, K, combine }; // ?selftest only: contact sheets and caption samples from the console
    console.log("goai selftest looks done");
  }, 0);
  console.log("goai selftest done");
}
/* ======================= canvas toolkit + poster looks ======================= */
const INK = "#18181F", SEA = "#E0201B", FLASH = "#FFD84A", CREAM = "#F5EEDF", CHART_A = "#E0201B", CHART_B = "#2F6FB0";
const F = { sans: '"Archivo", "Noto Sans SC", sans-serif', serif: '"Bodoni Moda", "Noto Serif SC", serif', soft: '"Fraunces", "Noto Serif SC", serif', hand: '"Caveat", "Noto Sans SC", cursive', mono: '"Geist Mono", "Noto Sans SC", monospace' };
const isCJK = (s) => /[　-鿿＀-￯]/.test(s);
const IMG = {};
const loadImg = (src) => (IMG[src] ||= new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src; }));
const fontsReady = Promise.all(["700 80px Geist", "400 80px Fraunces", "600 80px Fraunces", "700 80px Fraunces", "900 80px Fraunces", "italic 400 80px Fraunces", "italic 500 80px Fraunces", "italic 600 80px Fraunces", "700 80px Caveat", '400 80px "Geist Mono"', '600 80px "Geist Mono"', '700 80px "Geist Mono"', "900 80px Archivo", "800 80px Archivo", "700 80px Archivo", "600 80px Archivo", "300 80px Archivo", '400 80px "Bodoni Moda"', 'italic 400 80px "Bodoni Moda"', '600 80px "Bodoni Moda"', '900 80px "Bodoni Moda"'].map((f) => document.fonts.load(f))).catch(() => {});
let zhReady;
const zhFonts = () => (zhReady ||= Promise.all(['900 80px "Noto Sans SC"', '700 80px "Noto Sans SC"', '400 80px "Noto Sans SC"', '900 80px "Noto Serif SC"', '600 80px "Noto Serif SC"'].map((f) => document.fonts.load(f, ZH_GLYPHS))).catch(() => {}));

// the shop's font choices; single quotes so one stack works in a style attribute and on a canvas
const FONT_IDS = ["bold", "poster", "elegant", "friendly", "hand", "modern"];
const FONT_CSS = { bold: "'Archivo', 'Noto Sans SC', sans-serif", poster: "'Archivo', 'Noto Sans SC', sans-serif", elegant: "'Bodoni Moda', 'Noto Serif SC', serif", friendly: "'Fraunces', 'Noto Serif SC', serif", hand: "'Caveat', 'Noto Sans SC', cursive", modern: "'Geist', 'Noto Sans SC', sans-serif" };
// Poster is Archivo at its narrowest: the same family as Bold, told apart by its width
const fontStyle = (id) => (FONT_CSS[id] ? `font-family:${FONT_CSS[id]}${id === "poster" ? ";font-stretch:62.5%;font-weight:900" : ""}` : "");
let FONT_ID = ""; // while a poster is drawn in a chosen font: headings and bold words use it, the small mono labels keep theirs
// each look lays its words out for its own fonts, so a wider chosen font is set smaller to take the same width (never larger)
const FONT_K = new Map(), FONT_SAMPLE = "Iced Matcha Latte RM 12.90";
function swapFont(ctx, w, fam, it, cond) {
  const to = FONT_CSS[FONT_ID], cond2 = FONT_ID === "poster" || (cond && FONT_ID === "bold"), it2 = it && (FONT_ID === "elegant" || FONT_ID === "friendly"), key = [FONT_ID, fam, w, it, cond].join("|");
  if (!FONT_K.has(key)) {
    const width = (f, i, c) => { ctx.font = `${i ? "italic " : ""}${w} 100px ${f}`; if ("fontStretch" in ctx) ctx.fontStretch = c ? "extra-condensed" : "normal"; if ("letterSpacing" in ctx) ctx.letterSpacing = "0px"; return ctx.measureText(FONT_SAMPLE).width; };
    FONT_K.set(key, Math.min(1, width(fam, it, cond) / width(to, it2, cond2)));
  }
  return [to, it2, cond2, FONT_K.get(key)];
}
function font(ctx, w, s, fam = F.sans, { it = false, cond = false, ls = 0 } = {}) {
  if (FONT_ID && fam !== F.mono && (w >= 600 || fam !== F.sans)) { let k; [fam, it, cond, k] = swapFont(ctx, w, fam, it, cond); s *= k; }
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
  // a title never ends on an orphan (a lone Chinese character, or a Latin word of one or two letters): shrink until it fits on fewer lines
  const lone = (l) => l.length > 1 && (isCJK(text) ? [...l.at(-1)].length < 2 : l.at(-1).replace(/[^\p{L}\p{N}]/gu, "").length <= 2);
  for (;;) { set(s); lines = wrap(ctx, text, maxW); if ((lines.length <= maxLines && lines.every((l) => ctx.measureText(l).width <= maxW) && !lone(lines)) || s < 14) return { lines, size: s }; s *= 0.94; }
}
// an image may carry the owner's framing (img.framing = { x, y, z }): that point stays at the same place in every frame
function cover(ctx, img, x, y, w, h, fy = 0.5) {
  if (img.collage) return drawCollage(ctx, img.collage, x, y, w, h); // several photos are laid out afresh for each box, so none is cut away
  const f = img.framing, fx = f ? f.x : 0.5, r = Math.max(w / img.width, h / img.height) * (f?.z || 1), iw = img.width * r, ih = img.height * r;
  ctx.drawImage(img, x + (w - iw) * fx, y + (h - ih) * (f ? f.y : fy), iw, ih);
}

/* ---- Fix the light: levels, a gentle grey-world white balance, vibrance and a light sharpen, all on the phone ---- */
const FIX_LEVEL = { natural: { wb: 0.5, vib: 0.22, sharp: 0.35, lift: 0.7, clip: 0.004 }, bold: { wb: 0.85, vib: 0.45, sharp: 0.6, lift: 1, clip: 0.012 } };
function enhance(img, level = "natural") {
  const k = Math.min(1, 2048 / Math.max(img.width, img.height)), W = Math.round(img.width * k), H = Math.round(img.height * k);
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(img, 0, 0, W, H);
  const o = FIX_LEVEL[level];
  if (!o) return c;
  let im; try { im = x.getImageData(0, 0, W, H); } catch { return c; }
  const d = im.data, hist = new Uint32Array(256);
  let sr = 0, sg = 0, sb = 0, mids = 0, lsum = 0, total = 0;
  for (let i = 0; i < d.length; i += 16) { // every 4th pixel is plenty for the statistics
    const l = (d[i] * 54 + d[i + 1] * 183 + d[i + 2] * 19) >> 8;
    hist[l]++; lsum += l; total++;
    if (l > 30 && l < 225) { sr += d[i]; sg += d[i + 1]; sb += d[i + 2]; mids++; }
  }
  let lo = 0, hi = 255, acc = 0;
  for (; lo < 254 && (acc += hist[lo]) < total * o.clip; lo++);
  for (acc = 0; hi > 1 && (acc += hist[hi]) < total * o.clip; hi--);
  if (hi - lo < 102) { const mid = (hi + lo) / 2; lo = Math.max(0, mid - 51); hi = Math.min(255, mid + 51); } // never stretch more than 2.5x
  const grey = (sr + sg + sb) / 3, gain = (a) => (mids && a ? Math.min(1.18, Math.max(0.85, 1 + (grey / a - 1) * o.wb)) : 1);
  const mean = lsum / total / 255, gamma = mean < 0.45 ? Math.max(0.72, 1 - (0.45 - mean) * 1.4 * o.lift) : 1; // a dark photo gets its mid-tones lifted
  const lut = (g) => Uint8ClampedArray.from({ length: 256 }, (_, v) => 255 * Math.min(1, Math.max(0, (v * g - lo) / (hi - lo))) ** gamma);
  const LR = lut(gain(sr)), LG = lut(gain(sg)), LB = lut(gain(sb));
  for (let i = 0; i < d.length; i += 4) {
    const r = LR[d[i]], g = LG[d[i + 1]], b = LB[d[i + 2]], mx = Math.max(r, g, b), mn = Math.min(r, g, b), avg = (r + g + b) / 3, a = o.vib * (1 - (mx - mn) / 255);
    d[i] = r + (r - avg) * a; d[i + 1] = g + (g - avg) * a; d[i + 2] = b + (b - avg) * a;
  }
  x.putImageData(im, 0, 0);
  if ("filter" in x) { // unsharp mask: blur a copy, then push each pixel away from its blur
    const b = document.createElement("canvas"); b.width = W; b.height = H;
    const bx = b.getContext("2d", { willReadFrequently: true }); bx.filter = `blur(${Math.max(1, W / 1400).toFixed(1)}px)`; bx.drawImage(c, 0, 0);
    const bd = bx.getImageData(0, 0, W, H).data, sd = x.getImageData(0, 0, W, H), p = sd.data;
    for (let i = 0; i < p.length; i += 4) { p[i] += (p[i] - bd[i]) * o.sharp; p[i + 1] += (p[i + 1] - bd[i + 1]) * o.sharp; p[i + 2] += (p[i + 2] - bd[i + 2]) * o.sharp; }
    x.putImageData(sd, 0, 0);
  }
  return c;
}
function graded(ctx, filter, fn) { ctx.save(); if ("filter" in ctx) ctx.filter = filter; fn(); ctx.restore(); }
function burst(ctx, cx, cy, ro, ri, pts, rot, fill) {
  ctx.beginPath();
  for (let i = 0; i < pts * 2; i++) { const r = i % 2 ? ri : ro, a = rot + (i * Math.PI) / pts; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
  ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
}
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); }
function priceParts(p) { const m = /^\s*(RM)\s*(.+)$/i.exec(p || ""); return m ? ["RM", m[2]] : ["", p || ""]; }

/* ======================= posters: Kedai Modern (see design/poster-philosophy.md) ======================= */
// Every look draws from one set of facts, s = { img, m, title, price, star, cust }: the title is the owner's item or the
// customer's post title, and only the owner's posters carry a price. Shared rules: a 64-unit margin on a page 1080 units
// wide, three type sizes at most, colour taken from the photo, prices set as type, a fine grain so the work reads as print.

// ---- colour from the photo: its strongest hue becomes the accent; darker and paler versions become ground and paper ----
const PAL = new WeakMap();
function hslRgb(h, s, l) { const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)); return [f(0), f(8), f(4)].map((v) => Math.round(v * 255)); }
const lumOf = (rgb) => rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
function palette(img) {
  if (PAL.has(img)) return PAL.get(img);
  let h = 4, sat = 0.75;
  try {
    const c = document.createElement("canvas"); c.width = c.height = 32;
    const x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(img, 0, 0, 32, 32);
    const d = x.getImageData(0, 0, 32, 32).data, bins = Array.from({ length: 24 }, () => [0, 0, 0]);
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, ch = mx - mn;
      if (ch < 0.08 || l < 0.1 || l > 0.94) continue;
      const s2 = ch / (1 - Math.abs(2 * l - 1)), hh = ((mx === r ? ((g - b) / ch) % 6 : mx === g ? (b - r) / ch + 2 : (r - g) / ch + 4) * 60 + 360) % 360;
      const px = ((i / 4) % 32 + 0.5) / 32 - 0.5, py = (Math.floor(i / 128) + 0.5) / 32 - 0.5, centre = Math.exp(-(px * px + py * py) / 0.16);
      const w = s2 * s2 * (1 - Math.abs(l - 0.5)) * centre, bin = bins[Math.floor(hh / 15)];
      bin[0] += w; bin[1] += hh * w; bin[2] += s2 * w;
    }
    const top = bins.reduce((a, b) => (b[0] > a[0] ? b : a));
    if (top[0] > 1) { h = top[1] / top[0]; sat = top[2] / top[0]; }
  } catch {}
  const P = palFrom(h, sat);
  PAL.set(img, P);
  return P;
}
function palFrom(h, sat) {
  const s = Math.min(0.85, Math.max(0.35, sat));
  const P = { h, s, c: (l, a = 1, sm = 1) => `hsl(${h.toFixed(0)} ${Math.round(Math.min(s, sm) * 100)}% ${Math.round(l * 100)}% / ${a})`, rgb: (l, sm = 1) => hslRgb(h, Math.min(s, sm), l) };
  P.accent = P.c(0.45); P.deep = P.c(0.15, 1, 0.5); P.soft = P.c(0.94, 1, 0.4); P.mid = P.c(0.64, 1, 0.9);
  P.vivid = `hsl(${h.toFixed(0)} ${Math.round(Math.max(s, 0.72) * 100)}% 62%)`; P.pastel = `hsl(${h.toFixed(0)} 62% 91%)`;
  P.textOn = (l, sm = 1) => (lumOf(P.rgb(l, sm)) > 0.28 ? INK : "#fff");
  return P;
}
// the shop's brand colour as a palette: the same hue logic, so every look reads it the way it reads a photo
const BRANDPAL = new Map();
function brandPal(hex) {
  if (!BRANDPAL.has(hex)) {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), ch = mx - mn, l = (mx + mn) / 2;
    const h = ch ? ((mx === r ? ((g - b) / ch) % 6 : mx === g ? (b - r) / ch + 2 : (r - g) / ch + 4) * 60 + 360) % 360 : 0;
    BRANDPAL.set(hex, palFrom(h, ch ? ch / (1 - Math.abs(2 * l - 1)) : 0));
  }
  return BRANDPAL.get(hex);
}
const pal = (s) => (s.brand ? brandPal(s.brand) : palette(s.img));
// ---- print grain, laid over most looks at a few percent ----
let GRAIN;
function grain(ctx, W, H, a = 0.05) {
  if (!GRAIN) {
    GRAIN = document.createElement("canvas"); GRAIN.width = GRAIN.height = 180;
    const x = GRAIN.getContext("2d"), im = x.createImageData(180, 180), rnd = seeded(97);
    for (let i = 0; i < im.data.length; i += 4) { const v = rnd() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    x.putImageData(im, 0, 0);
  }
  ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = "overlay"; ctx.fillStyle = ctx.createPattern(GRAIN, "repeat"); ctx.fillRect(0, 0, W, H); ctx.restore();
}
// ---- type ----
const drawLines = (ctx, f, x, y, lh) => f.lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh));
const fitT = (ctx, text, maxW, lines, size, w, fam, opt = {}) => fitLines(ctx, text, maxW, lines, size, (z) => font(ctx, w, z, fam, opt));
const meta = (s) => [s.m.name, L(s.m.city)].filter(Boolean).join(isCJK(s.m.name) ? "·" : ", ");
// micro-type: the shop's signature, small and widely tracked (Latin in capitals, Chinese as written)
function micro(ctx, text, x, y, u, col, align = "left", size = 22) {
  const cjk = isCJK(text), ls = cjk ? u : size * u * 0.18;
  font(ctx, 600, size * u, F.sans, { ls });
  ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = "alphabetic";
  ctx.fillText(cjk ? text : text.toUpperCase(), x + (align === "right" ? ls : align === "center" ? ls / 2 : 0), y); // tracking trails the last letter
}
// a price set as type: figures on the baseline and a small "RM" riding high before them; returns its width
function price(ctx, p, x, y, size, { align = "left", col = INK, w = 300, fam = F.sans, cond = false, dry = false } = {}) {
  const [cur, amt] = priceParts(p);
  if (!amt) return 0;
  font(ctx, 700, size * 0.3, F.sans, { ls: size * 0.02 }); const cw = cur ? ctx.measureText(cur).width + size * 0.07 : 0;
  font(ctx, w, size, fam, { cond }); const aw = ctx.measureText(amt).width;
  if (dry) return cw + aw;
  const x0 = align === "right" ? x - cw - aw : align === "center" ? x - (cw + aw) / 2 : x;
  ctx.fillStyle = col; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillText(amt, x0 + cw, y);
  if (cur) { font(ctx, 700, size * 0.3, F.sans, { ls: size * 0.02 }); ctx.fillText(cur, x0, y - size * 0.44); }
  return cw + aw;
}
function photo(ctx, img, x, y, w, h, { r = 0, filter = "contrast(1.05) saturate(1.06)", fy = 0.5 } = {}) {
  ctx.save(); if (r) rr(ctx, x, y, w, h, r); else { ctx.beginPath(); ctx.rect(x, y, w, h); } ctx.clip();
  graded(ctx, filter, () => cover(ctx, img, x, y, w, h, fy)); ctx.restore();
}
function shadowed(ctx, u, fn, blur = 40, dy = 16, a = 0.3) { ctx.save(); ctx.shadowColor = `rgba(20,14,8,${a})`; ctx.shadowBlur = blur * u; ctx.shadowOffsetY = dy * u; fn(); ctx.restore(); }
// a strip of translucent tape with torn ends
function tape(ctx, x, y, w, h, rot, col) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = col; ctx.beginPath();
  const n = 7, step = h / n;
  ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(w / 2, -h / 2);
  for (let i = 1; i <= n; i++) ctx.lineTo(w / 2 + (i % 2 ? -step * 0.5 : 0), -h / 2 + i * step);
  ctx.lineTo(-w / 2, h / 2);
  for (let i = n - 1; i >= 0; i--) ctx.lineTo(-w / 2 + (i % 2 ? step * 0.5 : 0), -h / 2 + i * step);
  ctx.closePath(); ctx.fill(); ctx.restore();
}
// pixel work for duotone and risograph: the photo as lightness, 0 = ink, 1 = paper
function lightness(img, W, H, filter = "grayscale(1) contrast(1.15)") {
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const x = c.getContext("2d", { willReadFrequently: true }); graded(x, filter, () => cover(x, img, 0, 0, W, H));
  return { c, x, d: x.getImageData(0, 0, W, H) };
}

/* ---- festivals: the festive look, the festive table card and the captions follow the calendar ---- */
// moon-sighted and lunar dates move every year: check them against Malaysia's official holiday list each year
const FEST_DAYS = { cny: ["2026-02-17", "2027-02-06", "2028-01-26"], raya: ["2026-03-21", "2027-03-10"], midautumn: ["2026-09-25", "2027-09-15"], deepavali: ["2026-11-08"] };
const FEST_FIXED = { merdeka: "08-31", msday: "09-16", christmas: "12-25" };
// the festival on now (up to 3 days after) or the next one, and how many days away it is
const festList = (y) => [...Object.entries(FEST_DAYS).flatMap(([id, ds]) => ds.map((d) => [id, new Date(`${d}T00:00`).getTime()])),
  ...Object.entries(FEST_FIXED).flatMap(([id, md]) => [y, y + 1].map((yy) => [id, new Date(`${yy}-${md}T00:00`).getTime()]))];
function nextFest(now = new Date()) {
  const day0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(), y = now.getFullYear();
  const all = festList(y);
  const [id, at] = all.filter(([, at]) => at >= day0 - 3 * 864e5).sort((a, b) => a[1] - b[1])[0];
  return { id, days: Math.round((at - day0) / 864e5) };
}
function diya(ctx, x, y, u) {
  ctx.fillStyle = "#C2552B"; ctx.beginPath(); ctx.ellipse(x, y, 30 * u, 14 * u, 0, 0, Math.PI); ctx.fill();
  ctx.fillStyle = "#FF9F1C"; ctx.beginPath(); ctx.ellipse(x, y - 14 * u, 9 * u, 20 * u, 0, 0, 7); ctx.fill();
  ctx.fillStyle = "#FFE9A8"; ctx.beginPath(); ctx.ellipse(x, y - 10 * u, 4 * u, 10 * u, 0, 0, 7); ctx.fill();
}
function lantern(ctx, x, y, r, body, trim) {
  ctx.strokeStyle = trim; ctx.lineWidth = r * 0.06;
  ctx.beginPath(); ctx.moveTo(x, y - r * 1.5); ctx.lineTo(x, y - r * 0.8); ctx.stroke();
  ctx.fillStyle = trim; ctx.fillRect(x - r * 0.45, y - r * 0.9, r * 0.9, r * 0.2); ctx.fillRect(x - r * 0.45, y + r * 0.7, r * 0.9, r * 0.2);
  ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.78, 0, 0, 7); ctx.fill();
  ctx.lineWidth = r * 0.05; for (const k of [0.5, 0.01]) { ctx.beginPath(); ctx.ellipse(x, y, r * k, r * 0.78, 0, 0, 7); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x, y + r * 0.9); ctx.lineTo(x, y + r * 1.5); ctx.stroke();
}
function ketupat(ctx, x, y, r, gold) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4);
  ctx.fillStyle = "#3FA34D"; ctx.fillRect(-r / 2, -r / 2, r, r);
  ctx.fillStyle = gold; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) ctx.fillRect(-r / 2 + (i * r) / 4, -r / 2 + (j * r) / 4, r / 4, r / 4);
  ctx.restore();
}
const FEST = {
  deepavali: { bg: "#3E0B2E", glow: "255,140,60", gold: "#F2C14E", motif: (ctx, x, y, r) => diya(ctx, x, y + r * 0.35, r / 26) },
  christmas: { bg: "#0D3A2C", glow: "255,240,200", gold: "#E9CF8B", motif: (ctx, x, y, r, P) => burst(ctx, x, y, r, r * 0.42, 5, -Math.PI / 2, P.gold) },
  cny: { bg: "#9C0F18", glow: "255,200,80", gold: "#F6CF6A", motif: (ctx, x, y, r, P) => lantern(ctx, x, y + r * 0.25, r * 0.72, "#E83A3A", P.gold) },
  raya: { bg: "#0E4630", glow: "255,220,120", gold: "#E9BE57", motif: (ctx, x, y, r, P) => ketupat(ctx, x, y, r * 1.05, P.gold) },
  merdeka: { bg: "#0B2766", glow: "255,204,0", gold: "#FFCC00", motif: (ctx, x, y, r, P) => burst(ctx, x, y, r, r * 0.5, 14, -Math.PI / 2, P.gold) },
  midautumn: { bg: "#17184A", glow: "255,220,140", gold: "#F3D58C", motif: (ctx, x, y, r) => { ctx.save(); ctx.shadowColor = "#FFE7A8"; ctx.shadowBlur = r; ctx.fillStyle = "#FFF1C9"; ctx.beginPath(); ctx.arc(x, y, r * 0.8, 0, 7); ctx.fill(); ctx.restore(); } },
};
FEST.msday = FEST.merdeka;

// duotone ink pairs, picked by the photo's hue: [hue, shadow ink, highlight ink]
const DUO = [[0, [58, 13, 22], [255, 180, 162]], [30, [43, 22, 8], [247, 200, 115]], [55, [31, 33, 8], [232, 240, 122]], [110, [11, 52, 36], [185, 243, 201]], [175, [6, 48, 58], [140, 235, 242]], [215, [15, 31, 92], [249, 214, 91]], [265, [42, 15, 79], [255, 159, 178]], [320, [61, 10, 51], [255, 198, 224]]];
/* ---- the looks ---- */
const STYLES = {
  // Counter: a Swiss product card. The photo above, the item and its price on one baseline, the shop signed below a hairline.
  clean(ctx, W, H, s) {
    const u = W / 1080, M = 64 * u, P = pal(s), band = Math.max(320 * u, H * 0.3), ph = H - band, cjk = isCJK(s.title);
    ctx.fillStyle = "#FBFBF8"; ctx.fillRect(0, 0, W, H);
    photo(ctx, s.img, 0, 0, W, ph, { filter: "contrast(1.06) saturate(1.08)" });
    ctx.fillStyle = P.accent; ctx.fillRect(0, ph, W, 10 * u);
    const pw = s.price ? price(ctx, s.price, 0, 0, 104 * u, { dry: true }) : 0;
    const f = fitT(ctx, s.title, W - 2 * M - (pw ? pw + 48 * u : 0), 2, 96 * u, 800, F.sans, { cond: !cjk }), lh = f.size * (cjk ? 1.12 : 0.94);
    const ty = ph + 10 * u + 64 * u + f.size * 0.78;
    ctx.fillStyle = INK; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; drawLines(ctx, f, M, ty, lh);
    if (pw) price(ctx, s.price, W - M, ty, 104 * u, { align: "right", col: INK, w: 300 });
    ctx.fillStyle = "rgba(24,24,31,.2)"; ctx.fillRect(M, H - 100 * u, W - 2 * M, 1.5 * u);
    micro(ctx, s.m.name, M, H - 56 * u, u, INK);
    micro(ctx, `${L(s.m.city)}   ${s.m.handle}`, W - M, H - 56 * u, u, "#6B6B76", "right");
    grain(ctx, W, H, 0.035);
  },
  // Noir: the photo in low light, a hairline frame, an italic serif title and a small ornament before the price.
  premium(ctx, W, H, s) {
    const u = W / 1080, P = pal(s), CR = "#F5EEDF", cjk = isCJK(s.title);
    photo(ctx, s.img, 0, 0, W, H, { filter: "contrast(1.08) saturate(.9) brightness(.95)", fy: 0.42 });
    let g = ctx.createLinearGradient(0, H * 0.34, 0, H); g.addColorStop(0, P.c(0.07, 0, 0.5)); g.addColorStop(0.6, P.c(0.07, 0.74, 0.5)); g.addColorStop(1, P.c(0.05, 0.94, 0.5));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    g = ctx.createLinearGradient(0, 0, 0, 280 * u); g.addColorStop(0, P.c(0.05, 0.55, 0.5)); g.addColorStop(1, P.c(0.05, 0, 0.5)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 280 * u);
    ctx.strokeStyle = "rgba(245,238,223,.5)"; ctx.lineWidth = 1.5 * u; ctx.strokeRect(40 * u, 40 * u, W - 80 * u, H - 80 * u);
    micro(ctx, s.m.name, W / 2, 116 * u, u, CR, "center", 24);
    const f = fitT(ctx, s.title, W - 220 * u, 2, (cjk ? 104 : 132) * u, cjk ? 600 : 400, F.serif, { it: !cjk }), lh = f.size * (cjk ? 1.18 : 1.02);
    const last = H - (s.price ? 240 : 176) * u;
    ctx.fillStyle = CR; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    f.lines.forEach((l, i) => ctx.fillText(l, W / 2, last - lh * (f.lines.length - 1 - i)));
    const oy = last + 62 * u; ctx.fillStyle = "rgba(245,238,223,.75)";
    ctx.fillRect(W / 2 - 96 * u, oy, 72 * u, 1.5 * u); ctx.fillRect(W / 2 + 24 * u, oy, 72 * u, 1.5 * u);
    ctx.save(); ctx.translate(W / 2, oy + 0.75 * u); ctx.rotate(Math.PI / 4); ctx.fillRect(-5 * u, -5 * u, 10 * u, 10 * u); ctx.restore();
    if (s.price) price(ctx, s.price, W / 2, oy + 104 * u, 58 * u, { align: "center", col: CR, w: 400, fam: F.serif });
    else micro(ctx, L(s.m.city), W / 2, oy + 64 * u, u, "rgba(245,238,223,.8)", "center");
    grain(ctx, W, H, 0.06);
  },
  // Pop: a bright ground in the photo's own colour, a headline that fills the width, the photo with a hard offset shadow.
  fun(ctx, W, H, s) {
    const u = W / 1080, M = 64 * u, P = pal(s), bg = P.vivid, cjk = isCJK(s.title);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(24,24,31,.08)";
    for (let y = 18 * u; y < H; y += 30 * u) for (let x = 18 * u; x < W; x += 30 * u) { ctx.beginPath(); ctx.arc(x, y, 2.6 * u, 0, 7); ctx.fill(); }
    const head = cjk ? s.title : s.title.toUpperCase();
    const f = fitT(ctx, head, W - 2 * M, 3, Math.min(230 * u, H * 0.15), 900, F.sans, { cond: !cjk }), lh = f.size * (cjk ? 1.08 : 0.86);
    ctx.fillStyle = INK; ctx.textAlign = "left"; ctx.textBaseline = "top"; drawLines(ctx, f, M, M, lh);
    const top = M + lh * f.lines.length + 44 * u, ph = Math.max(140 * u, H - 132 * u - top), pw = W - 2 * M - 24 * u;
    ctx.fillStyle = INK; rr(ctx, M + 24 * u, top + 24 * u, pw, ph, 28 * u); ctx.fill();
    photo(ctx, s.img, M, top, pw, ph, { r: 28 * u, filter: "saturate(1.22) contrast(1.08)" });
    ctx.strokeStyle = INK; ctx.lineWidth = 8 * u; rr(ctx, M, top, pw, ph, 28 * u); ctx.stroke();
    if (s.price) { const r = 120 * u, cx = W - M - r + 8 * u, cy = top + ph - r * 0.5; ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill(); price(ctx, s.price, cx, cy + r * 0.22, r * 0.6, { align: "center", col: bg, w: 900, cond: true }); }
    micro(ctx, s.m.handle, M, H - 58 * u, u, INK); micro(ctx, L(s.m.city), W - M, H - 58 * u, u, INK, "right");
    return { mark: [M + 22 * u, top + 22 * u] }; // the logo sits inside the photo card's corner, clear of the headline
  },
  // Festive: the season's palette, a quiet lattice, a double keyline, the photo under a gilded arch.
  festive(ctx, W, H, s) {
    const u = W / 1080, id = nextFest().id, P = FEST[id], CR = "#FBF3E4";
    ctx.fillStyle = P.bg; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, H * 0.42, 40 * u, W / 2, H * 0.42, H * 0.75); g.addColorStop(0, `rgba(${P.glow},.26)`); g.addColorStop(1, `rgba(${P.glow},0)`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalAlpha = 0.13; ctx.fillStyle = P.gold;
    for (let y = 0, r = 0; y < H + 60 * u; y += 54 * u, r++) for (let x = r % 2 ? 27 * u : 0; x < W + 54 * u; x += 54 * u) { ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.fillRect(-4 * u, -4 * u, 8 * u, 8 * u); ctx.restore(); }
    ctx.restore();
    ctx.strokeStyle = P.gold; ctx.lineWidth = 3 * u; ctx.strokeRect(36 * u, 36 * u, W - 72 * u, H - 72 * u); ctx.lineWidth = 1.2 * u; ctx.strokeRect(50 * u, 50 * u, W - 100 * u, H - 100 * u);
    P.motif(ctx, W / 2, 132 * u, 42 * u, P);
    const greet = t("fg." + id), cg = isCJK(greet);
    const fg = fitT(ctx, greet, W - 240 * u, 1, (cg ? 88 : 104) * u, cg ? 900 : 400, cg ? F.serif : F.soft, { it: !cg });
    ctx.fillStyle = P.gold; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; ctx.fillText(fg.lines[0], W / 2, 280 * u);
    const ay = 334 * u, ah = Math.max(150 * u, H - ay - (s.price ? 300 : 236) * u), aw = Math.min(W * 0.6, ah * 1.25), ax = (W - aw) / 2, r = aw / 2;
    const arch = (k) => { ctx.beginPath(); ctx.moveTo(ax - k, ay + ah + k); ctx.lineTo(ax - k, ay + r); ctx.arc(W / 2, ay + r, r + k, Math.PI, 0); ctx.lineTo(ax + aw + k, ay + ah + k); ctx.closePath(); };
    ctx.save(); arch(0); ctx.clip(); graded(ctx, "saturate(1.15) contrast(1.05)", () => cover(ctx, s.img, ax, ay, aw, ah)); ctx.restore();
    ctx.strokeStyle = P.gold; ctx.lineWidth = 3 * u; arch(14 * u); ctx.stroke(); ctx.lineWidth = 1.2 * u; arch(24 * u); ctx.stroke();
    const f = fitT(ctx, s.title, W - 260 * u, 1, 64 * u, 600, F.soft);
    ctx.fillStyle = CR; ctx.textAlign = "center"; ctx.fillText(f.lines[0], W / 2, ay + ah + 112 * u);
    if (s.price) price(ctx, s.price, W / 2, ay + ah + 202 * u, 60 * u, { align: "center", col: P.gold, w: 500, fam: F.soft });
    if (ay + ah + (s.price ? 202 : 112) * u < H - 130 * u) micro(ctx, meta(s), W / 2, H - 86 * u, u, "rgba(251,243,228,.75)", "center");
    grain(ctx, W, H, 0.05);
  },
  // Menu card: a printed card on the table, an oval photo, and the line every menu has: item, dot leaders, price.
  menu(ctx, W, H, s) {
    const u = W / 1080, P = pal(s), PAPER = "#F7F2E8", INKM = "#2A231C", M = 64 * u, cw = W - 2 * M, ch = H - 2 * M;
    ctx.fillStyle = P.c(0.22, 1, 0.45); ctx.fillRect(0, 0, W, H);
    shadowed(ctx, u, () => { ctx.fillStyle = PAPER; ctx.fillRect(M, M, cw, ch); }, 44, 18, 0.4);
    ctx.strokeStyle = INKM; ctx.lineWidth = 3 * u; ctx.strokeRect(M + 24 * u, M + 24 * u, cw - 48 * u, ch - 48 * u); ctx.lineWidth = 1 * u; ctx.strokeRect(M + 34 * u, M + 34 * u, cw - 68 * u, ch - 68 * u);
    const cn = isCJK(s.m.name), fn = fitT(ctx, s.m.name, cw - 200 * u, 1, 66 * u, cn ? 900 : 600, F.soft);
    ctx.fillStyle = INKM; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; ctx.fillText(fn.lines[0], W / 2, M + 136 * u);
    micro(ctx, L(s.m.city), W / 2, M + 180 * u, u, P.c(0.32, 1, 0.6), "center", 20);
    const ow = cw - 240 * u, oh = Math.max(150 * u, Math.min(ow * 1.1, ch - 500 * u)), ox = W / 2, oy = M + 226 * u + oh / 2;
    ctx.save(); ctx.beginPath(); ctx.ellipse(ox, oy, ow / 2, oh / 2, 0, 0, 7); ctx.clip(); graded(ctx, "saturate(1.08) contrast(1.04)", () => cover(ctx, s.img, ox - ow / 2, oy - oh / 2, ow, oh)); ctx.restore();
    ctx.strokeStyle = INKM; ctx.lineWidth = 1.5 * u; ctx.beginPath(); ctx.ellipse(ox, oy, ow / 2 + 16 * u, oh / 2 + 16 * u, 0, 0, 7); ctx.stroke();
    const ly = oy + oh / 2 + 120 * u, x0 = M + 96 * u, x1 = M + cw - 96 * u, cjk = isCJK(s.title);
    const pw = s.price ? price(ctx, s.price, 0, 0, 54 * u, { dry: true, w: 600, fam: F.soft }) : 0;
    const f = fitT(ctx, s.title, x1 - x0 - (pw ? pw + 80 * u : 0), 2, 58 * u, 600, F.soft, { it: !cjk }), lh = f.size * (cjk ? 1.18 : 1.12);
    ctx.fillStyle = INKM;
    if (pw) {
      ctx.textAlign = "left"; drawLines(ctx, f, x0, ly, lh);
      const yl = ly + lh * (f.lines.length - 1), from = x0 + ctx.measureText(f.lines.at(-1)).width + 24 * u;
      for (let x = from; x < x1 - pw - 24 * u; x += 16 * u) { ctx.beginPath(); ctx.arc(x, yl - 6 * u, 2.4 * u, 0, 7); ctx.fill(); }
      price(ctx, s.price, x1, yl, 54 * u, { align: "right", col: INKM, w: 600, fam: F.soft });
    } else { ctx.textAlign = "center"; drawLines(ctx, f, W / 2, ly, lh); }
    micro(ctx, s.m.handle, W / 2, H - M - 70 * u, u, P.c(0.32, 1, 0.6), "center", 20);
  },
  // Snapshot: an instant photo on a desk in the photo's own pale colour, captioned by hand, taped down.
  polaroid(ctx, W, H, s) {
    const u = W / 1080, P = pal(s), rnd = seeded(5), cjk = isCJK(s.title);
    ctx.fillStyle = P.c(0.9, 1, 0.32); ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 900; i++) { ctx.fillStyle = rnd() > 0.5 ? "rgba(90,70,50,.05)" : "rgba(255,255,255,.25)"; ctx.fillRect(rnd() * W, rnd() * H, 3 * u, 3 * u); }
    const pw = Math.min(W * 0.72, H - 500 * u), fw = pw + 60 * u, fh = pw + 250 * u, cy = H / 2 - 24 * u, top = -fh / 2 + 30 * u;
    ctx.save(); ctx.translate(W / 2, cy); ctx.rotate(-0.03);
    shadowed(ctx, u, () => { ctx.fillStyle = "#FFFEFA"; ctx.fillRect(-fw / 2, -fh / 2, fw, fh); }, 46, 20, 0.28);
    photo(ctx, s.img, -pw / 2, top, pw, pw, { filter: "saturate(1.05) contrast(1.04) sepia(.06)" });
    const f = fitT(ctx, s.title, pw - 20 * u, 2, (cjk ? 60 : 84) * u, 700, cjk ? F.sans : F.hand), lh = f.size * (cjk ? 1.2 : 0.98);
    ctx.fillStyle = "#2B2622"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    drawLines(ctx, f, 0, top + pw + (fh - 30 * u - pw) / 2 - ((f.lines.length - 1) * lh) / 2, lh);
    if (s.price) { ctx.save(); ctx.translate(fw / 2 - 40 * u, fh / 2 + 70 * u); ctx.rotate(0.06); price(ctx, s.price, 0, 0, 64 * u, { align: "right", col: SEA, w: 700, fam: F.hand }); ctx.restore(); }
    ctx.restore();
    tape(ctx, W / 2, cy - fh / 2 + 4 * u, 230 * u, 56 * u, -0.05, P.c(0.74, 0.62, 0.7));
    micro(ctx, meta(s), W / 2, H - 52 * u, u, P.c(0.28, 1, 0.5), "center");
  },
  // Heritage: kopitiam enamel green, a cream signboard with a double keyline, penny tiles underfoot, a red enamel price tag.
  kopitiam(ctx, W, H, s) {
    const u = W / 1080, G = "#0F4D3A", CR = "#F3EBD8", R = "#B8312F", GD = "#D9A93E", M = 56 * u, tb = 112 * u, rnd = seeded(8);
    ctx.fillStyle = G; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#E7DFC9"; ctx.fillRect(0, H - tb, W, tb);
    for (let y = H - tb + 14 * u, r = 0; y < H; y += 21 * u, r++) for (let x = (r % 2 ? 10.5 : 0) * u + 6 * u; x < W; x += 21 * u) { const k = rnd(); ctx.fillStyle = k < 0.12 ? R : k < 0.32 ? G : "#FBF7EC"; ctx.beginPath(); ctx.arc(x, y, 8.5 * u, 0, 7); ctx.fill(); }
    const sh = 200 * u;
    ctx.fillStyle = CR; rr(ctx, M, M, W - 2 * M, sh, 18 * u); ctx.fill();
    ctx.strokeStyle = G; ctx.lineWidth = 3 * u; rr(ctx, M + 14 * u, M + 14 * u, W - 2 * M - 28 * u, sh - 28 * u, 10 * u); ctx.stroke();
    ctx.fillStyle = GD; for (const [x, y] of [[M + 34 * u, M + 34 * u], [W - M - 34 * u, M + 34 * u], [M + 34 * u, M + sh - 34 * u], [W - M - 34 * u, M + sh - 34 * u]]) { ctx.beginPath(); ctx.arc(x, y, 6 * u, 0, 7); ctx.fill(); }
    const cn = isCJK(s.m.name), fn = fitT(ctx, s.m.name, W - 2 * M - 160 * u, 1, 92 * u, 900, cn ? F.serif : F.soft);
    ctx.fillStyle = R; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic"; ctx.fillText(fn.lines[0], W / 2, M + sh / 2 + fn.size * 0.22);
    micro(ctx, L(s.m.city), W / 2, M + sh - 36 * u, u, G, "center", 18);
    const py = M + sh + 36 * u, ph = Math.max(150 * u, H - py - tb - (s.price ? 236 : 196) * u);
    ctx.fillStyle = CR; ctx.fillRect(M, py, W - 2 * M, ph);
    photo(ctx, s.img, M + 14 * u, py + 14 * u, W - 2 * M - 28 * u, ph - 28 * u, { filter: "saturate(1.08) contrast(1.05) sepia(.08)" });
    const cjk = isCJK(s.title), f = fitT(ctx, s.title, W - 2 * M - (s.price ? 300 * u : 0), 2, 76 * u, cjk ? 900 : 700, F.soft), lh = f.size * (cjk ? 1.14 : 1.04);
    const ty = py + ph + 86 * u;
    ctx.fillStyle = CR; ctx.textAlign = "left"; drawLines(ctx, f, M, ty, lh);
    if (s.price) {
      const pw = price(ctx, s.price, 0, 0, 60 * u, { dry: true, w: 700, fam: F.soft }) + 64 * u, tx = W - M - pw, tyy = ty - 66 * u;
      ctx.fillStyle = R; rr(ctx, tx, tyy, pw, 96 * u, 12 * u); ctx.fill();
      ctx.strokeStyle = CR; ctx.lineWidth = 2 * u; rr(ctx, tx + 7 * u, tyy + 7 * u, pw - 14 * u, 82 * u, 7 * u); ctx.stroke();
      price(ctx, s.price, tx + pw / 2, tyy + 68 * u, 60 * u, { align: "center", col: CR, w: 700, fam: F.soft });
    }
    grain(ctx, W, H, 0.05);
  },
  // Chalkboard: a board in a wooden frame, a pinned photo, chalk lettering that keeps the dust in it.
  chalk(ctx, W, H, s) {
    const u = W / 1080, fr = 34 * u, rnd = seeded(12), C1 = "#EFEDE4", Y = "#F2DB6E";
    const wood = ctx.createLinearGradient(0, 0, W, H); wood.addColorStop(0, "#8C5A33"); wood.addColorStop(1, "#5A371D"); ctx.fillStyle = wood; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#1F2B27"; ctx.fillRect(fr, fr, W - 2 * fr, H - 2 * fr);
    for (let i = 0; i < 220; i++) { ctx.fillStyle = `rgba(255,255,255,${0.01 + rnd() * 0.028})`; ctx.beginPath(); ctx.ellipse(fr + rnd() * (W - 2 * fr), fr + rnd() * (H - 2 * fr), (20 + rnd() * 90) * u, (6 + rnd() * 20) * u, rnd() * 3, 0, 7); ctx.fill(); }
    const px = fr + 90 * u, py = fr + 150 * u, pw = W - 2 * px, ph = Math.max(130 * u, Math.min(pw * 0.74, H - py - fr - 340 * u));
    ctx.save(); ctx.translate(W / 2, py + ph / 2); ctx.rotate(0.012);
    shadowed(ctx, u, () => { ctx.fillStyle = "#fff"; ctx.fillRect(-pw / 2 - 12 * u, -ph / 2 - 12 * u, pw + 24 * u, ph + 24 * u); }, 24, 10, 0.5);
    photo(ctx, s.img, -pw / 2, -ph / 2, pw, ph, { filter: "saturate(1.05) contrast(1.05)" });
    ctx.restore();
    tape(ctx, px + 10 * u, py - 4 * u, 120 * u, 40 * u, -0.6, "rgba(240,232,200,.7)"); tape(ctx, W - px - 10 * u, py - 4 * u, 120 * u, 40 * u, 0.6, "rgba(240,232,200,.7)");
    // the chalk layer: drawn apart, then rubbed with grain so the board shows through
    const lay = document.createElement("canvas"); lay.width = W; lay.height = H; const c = lay.getContext("2d");
    const cn = isCJK(s.m.name); font(c, 700, 64 * u, cn ? F.sans : F.hand); c.fillStyle = C1; c.textAlign = "center"; c.textBaseline = "alphabetic"; c.fillText(s.m.name, W / 2, fr + 104 * u);
    const cjk = isCJK(s.title), room = H - fr - (py + ph) - 150 * u;
    const f = fitT(c, s.title, W - 2 * px, 2, Math.min(116 * u, room / 2.05), 800, F.sans, { cond: !cjk }), lh = f.size * (cjk ? 1.12 : 0.96);
    f.lines.forEach((l, i) => c.fillText(l, W / 2, py + ph + 46 * u + lh * (i + 1)));
    const uy = py + ph + 46 * u + lh * f.lines.length + 26 * u; c.strokeStyle = Y; c.lineWidth = 4 * u; c.lineCap = "round";
    c.beginPath(); c.moveTo(W / 2 - 150 * u, uy); c.quadraticCurveTo(W / 2, uy + 16 * u, W / 2 + 150 * u, uy - 4 * u); c.stroke();
    if (s.price) {
      const pw2 = price(c, s.price, W - px, H - fr - 52 * u, 64 * u, { align: "right", col: Y, w: 700, fam: F.hand });
      for (const k of [0, 1]) { c.beginPath(); c.ellipse(W - px - pw2 / 2, H - fr - 74 * u, pw2 / 2 + 30 * u + k * 6 * u, 46 * u + k * 4 * u, -0.06 + k * 0.05, 0, 7); c.stroke(); }
    }
    micro(c, s.m.handle, px, H - fr - 56 * u, u, C1);
    grain(c, 0, 0, 0); c.globalCompositeOperation = "destination-out"; c.globalAlpha = 0.34; c.fillStyle = c.createPattern(GRAIN, "repeat"); c.fillRect(0, 0, W, H);
    ctx.drawImage(lay, 0, 0);
  },
  // Neon: the shop window glowing behind, the photo framed in a tube, the title written in light.
  neon(ctx, W, H, s) {
    const u = W / 1080, PK = "#FF4FB8", CY = "#3DF2FF", M = 64 * u, cjk = isCJK(s.title);
    ctx.fillStyle = "#0D0B14"; ctx.fillRect(0, 0, W, H);
    graded(ctx, `brightness(.32) saturate(1.3) blur(${(10 * u).toFixed(1)}px)`, () => cover(ctx, s.img, -20 * u, -20 * u, W + 40 * u, H + 40 * u));
    const glow = (col, fn) => { ctx.save(); ctx.shadowColor = col; for (const b of [48, 22, 6]) { ctx.shadowBlur = b * u; fn(); } ctx.restore(); };
    const ph = Math.min(H * 0.5, W - 2 * M), pw = W - 2 * M - 40 * u, py = M + 30 * u;
    photo(ctx, s.img, M + 20 * u, py, pw, ph, { r: 40 * u, filter: "saturate(1.15) contrast(1.06) brightness(.92)" });
    ctx.strokeStyle = "#E6FEFF"; ctx.lineWidth = 6 * u; glow(CY, () => { rr(ctx, M + 4 * u, py - 16 * u, pw + 32 * u, ph + 32 * u, 52 * u); ctx.stroke(); });
    const room = H - (py + ph) - 170 * u, f = fitT(ctx, s.title, W - 2 * M, 2, Math.min(150 * u, room / 1.9), 700, cjk ? F.sans : F.hand), lh = f.size * (cjk ? 1.16 : 0.98);
    ctx.fillStyle = "#FFE3F4"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const y0 = py + ph + 40 * u + (room - lh * (f.lines.length - 1)) / 2;
    glow(PK, () => drawLines(ctx, f, W / 2, y0, lh));
    ctx.fillStyle = "#E6FEFF"; const by = H - 70 * u;
    if (s.price) { glow(CY, () => price(ctx, s.price, W - M, by, 58 * u, { align: "right", col: "#E6FEFF", w: 700, fam: F.hand })); micro(ctx, s.m.name, M, by - 6 * u, u, "rgba(230,254,255,.85)"); }
    else micro(ctx, meta(s), W / 2, by, u, "rgba(230,254,255,.85)", "center");
  },
  // Colour block: the photo above, the photo's own colour below, and a title that owns the block.
  split(ctx, W, H, s) {
    const u = W / 1080, M = 64 * u, P = pal(s), cut = Math.round(H * 0.56), fg = P.textOn(0.45), cjk = isCJK(s.title);
    photo(ctx, s.img, 0, 0, W, cut, { filter: "saturate(1.1) contrast(1.06)" });
    ctx.fillStyle = P.accent; ctx.fillRect(0, cut, W, H - cut);
    const room = H - cut - 180 * u, f = fitT(ctx, s.title, W - 2 * M, 3, Math.min(176 * u, room / 1.9), 900, F.sans, { cond: !cjk }), lh = f.size * (cjk ? 1.1 : 0.9);
    ctx.fillStyle = fg; ctx.textAlign = "left"; ctx.textBaseline = "top"; drawLines(ctx, f, M, cut + 56 * u, lh);
    micro(ctx, meta(s), M, H - 60 * u, u, fg);
    if (s.price) price(ctx, s.price, W - M, H - 54 * u, 88 * u, { align: "right", col: fg, w: 300 });
    grain(ctx, W, H, 0.04);
  },
  // Gallery: a print mounted on a gallery wall, with a museum label underneath.
  minimal(ctx, W, H, s) {
    const u = W / 1080, cjk = isCJK(s.title), mx = 150 * u;
    ctx.fillStyle = "#EFEEEA"; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, -H * 0.1, 0, W / 2, -H * 0.1, H); g.addColorStop(0, "rgba(255,255,255,.75)"); g.addColorStop(1, "rgba(255,255,255,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const pw = W - 2 * mx, ph = Math.max(150 * u, Math.min(pw * 1.2, H - 2 * mx - 240 * u)), py = Math.max(100 * u, (H - ph - 260 * u) / 2);
    shadowed(ctx, u, () => { ctx.fillStyle = "#fff"; ctx.fillRect(mx - 34 * u, py - 34 * u, pw + 68 * u, ph + 68 * u); }, 40, 16, 0.16);
    photo(ctx, s.img, mx, py, pw, ph, { filter: "contrast(1.04) saturate(1.04)" });
    const lx = mx - 34 * u, ly = py + ph + 34 * u + 92 * u;
    const f = fitT(ctx, s.title, pw * 0.8, 2, 50 * u, cjk ? 600 : 500, F.soft, { it: !cjk }), lh = f.size * (cjk ? 1.22 : 1.15);
    ctx.fillStyle = INK; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; drawLines(ctx, f, lx, ly, lh);
    const end = ly + lh * (f.lines.length - 1);
    micro(ctx, meta(s), lx, end + 50 * u, u, "#5D5D66", "left", 19);
    if (s.price) price(ctx, s.price, lx, end + 112 * u, 40 * u, { col: INK, w: 400, fam: F.soft });
  },
  // Duotone: the photo printed in two inks taken from its own colour, under an outlined headline.
  duotone(ctx, W, H, s) {
    const u = W / 1080, P = pal(s), M = 70 * u, cjk = isCJK(s.title), { c, x, d } = lightness(s.img, W, H, "grayscale(1) contrast(1.2) brightness(1.04)");
    const hd = (x) => Math.min(Math.abs(x - P.h), 360 - Math.abs(x - P.h)), pair = DUO.reduce((p2, q) => (hd(q[0]) < hd(p2[0]) ? q : p2)), a = pair[1], b = pair[2], px = d.data;
    for (let i = 0; i < px.length; i += 4) { const v = px[i] / 255; px[i] = a[0] + (b[0] - a[0]) * v; px[i + 1] = a[1] + (b[1] - a[1]) * v; px[i + 2] = a[2] + (b[2] - a[2]) * v; }
    x.putImageData(d, 0, 0); ctx.drawImage(c, 0, 0);
    const g = ctx.createLinearGradient(0, H * 0.45, 0, H); g.addColorStop(0, `rgba(${a.join(",")},0)`); g.addColorStop(1, `rgba(${a.join(",")},.8)`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const head = cjk ? s.title : s.title.toUpperCase(), f = fitT(ctx, head, W - 2 * M, 3, Math.min(210 * u, H * 0.16), 900, F.sans, { cond: !cjk }), lh = f.size * (cjk ? 1.1 : 0.88);
    const y0 = H - 150 * u - lh * f.lines.length;
    ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.lineWidth = 3 * u; ctx.strokeStyle = `rgb(${b.join(",")})`; ctx.fillStyle = `rgb(${b.join(",")})`; ctx.lineJoin = "round";
    f.lines.forEach((l, i) => (i === f.lines.length - 1 ? ctx.fillText(l, M, y0 + i * lh) : ctx.strokeText(l, M, y0 + i * lh)));
    micro(ctx, meta(s), M, H - 74 * u, u, `rgb(${b.join(",")})`);
    if (s.price) price(ctx, s.price, W - M, H - 68 * u, 72 * u, { align: "right", col: `rgb(${b.join(",")})`, w: 300 });
    grain(ctx, W, H, 0.07);
  },
  // Risograph: two fluorescent inks on uncoated paper, slightly out of register, the way a zine is printed.
  riso(ctx, W, H, s) {
    const u = W / 1080, M = 64 * u, BL = [0, 120, 191], PK = [255, 72, 176], PAPER = [246, 241, 231], cjk = isCJK(s.title);
    const ph = Math.round(H * 0.64), { d } = lightness(s.img, W, ph, "grayscale(1) contrast(1.25)"), src = d.data;
    const out = ctx.createImageData(W, ph), o = out.data, dx = Math.round(7 * u), dy = Math.round(5 * u);
    for (let y = 0; y < ph; y++) for (let x2 = 0; x2 < W; x2++) {
      const i = (y * W + x2) * 4, j = (Math.min(ph - 1, Math.max(0, y - dy)) * W + Math.min(W - 1, Math.max(0, x2 - dx))) * 4;
      const ab = Math.min(1, (1 - src[i] / 255) * 1.15), ap = Math.max(0, Math.min(1, (1 - src[j] / 255) * 1.3 - 0.25));
      for (let k = 0; k < 3; k++) o[i + k] = PAPER[k] * (1 - ab * (1 - BL[k] / 255)) * (1 - ap * (1 - PK[k] / 255));
      o[i + 3] = 255;
    }
    ctx.fillStyle = `rgb(${PAPER.join(",")})`; ctx.fillRect(0, 0, W, H); ctx.putImageData(out, 0, 0);
    const room = H - ph - 150 * u, f = fitT(ctx, cjk ? s.title : s.title.toUpperCase(), W - 2 * M, 2, Math.min(150 * u, room / 1.9), 900, F.sans, { cond: !cjk }), lh = f.size * (cjk ? 1.1 : 0.9);
    ctx.save(); ctx.globalCompositeOperation = "multiply"; ctx.textAlign = "left"; ctx.textBaseline = "top";
    ctx.fillStyle = `rgb(${PK.join(",")})`; drawLines(ctx, f, M + dx, ph + 44 * u + dy, lh);
    ctx.fillStyle = `rgb(${BL.join(",")})`; drawLines(ctx, f, M, ph + 44 * u, lh);
    ctx.restore();
    micro(ctx, meta(s), M, H - 56 * u, u, `rgb(${BL.join(",")})`);
    if (s.price) price(ctx, s.price, W - M, H - 50 * u, 80 * u, { align: "right", col: `rgb(${PK.join(",")})`, w: 800, cond: true });
    grain(ctx, W, H, 0.09);
  },
  // Batik: the kawung motif in indigo and soga brown, the photo in a ringed circle, the title on a calm band.
  batik(ctx, W, H, s) {
    const u = W / 1080, IND = "#1E2A4A", SOGA = "#9C6B3C", CR = "#EFE2C6", sp = 124 * u, cjk = isCJK(s.title);
    ctx.fillStyle = IND; ctx.fillRect(0, 0, W, H);
    ctx.lineWidth = 2 * u;
    for (let y = 0; y < H + sp; y += sp) for (let x = 0; x < W + sp; x += sp) {
      for (let k = 0; k < 4; k++) { const a = Math.PI / 4 + (k * Math.PI) / 2; ctx.save(); ctx.translate(x + Math.cos(a) * sp * 0.27, y + Math.sin(a) * sp * 0.27); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0, 0, sp * 0.22, sp * 0.13, 0, 0, 7); ctx.fillStyle = "rgba(156,107,60,.55)"; ctx.fill(); ctx.strokeStyle = "rgba(239,226,198,.7)"; ctx.stroke(); ctx.restore(); }
      ctx.fillStyle = CR; ctx.beginPath(); ctx.arc(x, y, 3.5 * u, 0, 7); ctx.fill();
    }
    const R = Math.min(W * 0.35, H * 0.28), cx = W / 2, cy = Math.max(R + 100 * u, H * 0.4);
    ctx.fillStyle = IND; ctx.beginPath(); ctx.arc(cx, cy, R + 46 * u, 0, 7); ctx.fill();
    ctx.strokeStyle = SOGA; ctx.lineWidth = 7 * u; ctx.beginPath(); ctx.arc(cx, cy, R + 26 * u, 0, 7); ctx.stroke();
    ctx.strokeStyle = CR; ctx.lineWidth = 1.5 * u; ctx.beginPath(); ctx.arc(cx, cy, R + 38 * u, 0, 7); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip(); graded(ctx, "saturate(1.08) contrast(1.05)", () => cover(ctx, s.img, cx - R, cy - R, 2 * R, 2 * R)); ctx.restore();
    const two = H / u > 1100, f = fitT(ctx, s.title, W - 240 * u, two ? 2 : 1, 82 * u, cjk ? 900 : 700, F.soft), lh = f.size * (cjk ? 1.16 : 1.06);
    const ty = cy + R + 96 * u, bh = lh * f.lines.length + (s.price ? 150 : 96) * u;
    ctx.fillStyle = IND; ctx.fillRect(0, ty - 40 * u, W, bh);
    ctx.fillStyle = SOGA; ctx.fillRect(0, ty - 40 * u, W, 3 * u); ctx.fillRect(0, ty - 40 * u + bh - 3 * u, W, 3 * u);
    ctx.fillStyle = CR; ctx.textAlign = "center"; ctx.textBaseline = "top"; drawLines(ctx, f, W / 2, ty, lh);
    micro(ctx, meta(s), W / 2, ty + lh * f.lines.length + 26 * u, u, "#D9B98C", "center", 20);
    if (s.price) price(ctx, s.price, W / 2, ty + lh * f.lines.length + 100 * u, 54 * u, { align: "center", col: CR, w: 600, fam: F.soft });
    grain(ctx, W, H, 0.05);
  },
  // Contact sheet: frames from one roll on a lightbox, the best one circled in red grease pencil.
  collage(ctx, W, H, s) {
    const u = W / 1080, M = 52 * u, OR = "#E8913A", RED = "#D7322B", gap = 24 * u, cjk = isCJK(s.title);
    ctx.fillStyle = "#151515"; ctx.fillRect(0, 0, W, H);
    const rows = H / u >= 1700 ? 3 : 2, cw = (W - 2 * M - gap) / 2, avail = H - 2 * M - 250 * u, ch = Math.min(cw * 0.8, (avail - (rows - 1) * 64 * u) / rows - 36 * u);
    const crops = [[1, 0.5, 0.5], [1.6, 0.3, 0.35], [2.2, 0.7, 0.6], [1.35, 0.5, 0.85], [1.8, 0.6, 0.2], [1.15, 0.4, 0.6]];
    for (let i = 0; i < rows * 2; i++) {
      const [z, fx, fy] = crops[i], x = M + (i % 2) * (cw + gap), y = M + Math.floor(i / 2) * (ch + 64 * u + 36 * u) + 18 * u;
      ctx.fillStyle = "#EDE8DC"; for (let k = x + 10 * u; k < x + cw - 20 * u; k += 34 * u) { rr(ctx, k, y - 16 * u, 18 * u, 10 * u, 3 * u); ctx.fill(); rr(ctx, k, y + ch + 6 * u, 18 * u, 10 * u, 3 * u); ctx.fill(); }
      ctx.save(); ctx.beginPath(); ctx.rect(x, y, cw, ch); ctx.clip(); graded(ctx, "saturate(1.08) contrast(1.06)", () => cover(ctx, s.img, x - cw * (z - 1) * fx, y - ch * (z - 1) * fy, cw * z, ch * z)); ctx.restore();
      font(ctx, 400, 20 * u, F.mono); ctx.fillStyle = OR; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillText(`${12 + i}${i % 2 ? "A" : ""}  ▸`, x, y + ch + 46 * u);
      if (i === 1) { ctx.strokeStyle = RED; ctx.lineCap = "round"; for (const [k, rot] of [[0, -0.05], [9, 0.04]]) { ctx.lineWidth = (7 - k * 0.3) * u; ctx.beginPath(); ctx.ellipse(x + cw / 2, y + ch / 2, cw / 2 + 14 * u + k * u, ch / 2 + 12 * u + k * u, rot, 0.15, 6.2); ctx.stroke(); } }
    }
    const by = H - M - 150 * u, f = fitT(ctx, s.title, W - 2 * M - (s.price ? 260 * u : 0), 2, (cjk ? 58 : 80) * u, 700, cjk ? F.sans : F.hand), lh = f.size * (cjk ? 1.18 : 0.96);
    ctx.fillStyle = RED; ctx.textAlign = "left"; ctx.textBaseline = "top"; drawLines(ctx, f, M, by, lh);
    if (s.price) price(ctx, s.price, W - M, by + f.size * 0.9, 70 * u, { align: "right", col: RED, w: 700, fam: F.hand });
    font(ctx, 400, 20 * u, F.mono); ctx.fillStyle = OR; ctx.textBaseline = "alphabetic"; ctx.textAlign = "left"; ctx.fillText(meta(s).toUpperCase(), M, H - M + 6 * u);
    ctx.textAlign = "right"; ctx.fillText("GO AI 400", W - M, H - M + 6 * u);
    grain(ctx, W, H, 0.08);
  },
  // Ticket: an admission ticket on the photo's darkest colour, perforated, with a stub that carries the title.
  ticket(ctx, W, H, s) {
    const u = W / 1080, P = pal(s), col = P.c(0.2, 1, 0.55), x = 70 * u, y = 80 * u, w = W - 140 * u, h = H - 160 * u, py = y + h * 0.66, nr = 34 * u, cjk = isCJK(s.title);
    ctx.fillStyle = col; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.strokeStyle = "rgba(255,255,255,.05)"; ctx.lineWidth = 30 * u; for (let k = -H; k < W; k += 84 * u) { ctx.beginPath(); ctx.moveTo(k, H); ctx.lineTo(k + H, 0); ctx.stroke(); } ctx.restore();
    shadowed(ctx, u, () => { ctx.fillStyle = "#FFFDF7"; rr(ctx, x, y, w, h, 28 * u); ctx.fill(); }, 40, 16, 0.35);
    ctx.fillStyle = col; for (const nx of [x, x + w]) { ctx.beginPath(); ctx.arc(nx, py, nr, 0, 7); ctx.fill(); }
    const ix = x + 30 * u, iy = y + 30 * u, iw = w - 60 * u, ih = py - y - 60 * u;
    photo(ctx, s.img, ix, iy, iw, ih, { r: 16 * u, filter: "saturate(1.1) contrast(1.05)" });
    ctx.strokeStyle = "rgba(24,24,31,.28)"; ctx.lineWidth = 3 * u; ctx.setLineDash([14 * u, 11 * u]); ctx.beginPath(); ctx.moveTo(x + nr + 10 * u, py); ctx.lineTo(x + w - nr - 10 * u, py); ctx.stroke(); ctx.setLineDash([]);
    const stub = y + h - py, f = fitT(ctx, s.title, iw - 240 * u, 2, Math.min(78 * u, stub / 3.3), 800, F.sans, { cond: !cjk }), lh = f.size * (cjk ? 1.12 : 0.96), ty = py + 44 * u;
    ctx.fillStyle = INK; ctx.textAlign = "left"; ctx.textBaseline = "top"; drawLines(ctx, f, ix, ty, lh);
    micro(ctx, meta(s), ix, ty + lh * f.lines.length + 34 * u, u, "#5D5D66", "left", 19);
    if (stub > 270 * u) micro(ctx, new Intl.DateTimeFormat(loc(), { day: "numeric", month: "short", year: "numeric" }).format(new Date()), ix, ty + lh * f.lines.length + 70 * u, u, "#5D5D66", "left", 19);
    const bx = x + w - 30 * u - 196 * u, bh = Math.min(120 * u, stub - 120 * u), rnd = seeded(77);
    ctx.fillStyle = INK; for (let k = bx; k < bx + 196 * u;) { const bw = (1 + Math.floor(rnd() * 3)) * 3 * u; ctx.fillRect(k, ty, bw, bh); k += bw + (1 + Math.floor(rnd() * 3)) * 3 * u; }
    if (s.price) price(ctx, s.price, x + w - 30 * u, y + h - 34 * u, 66 * u, { align: "right", col: P.c(0.36, 1, 0.8), w: 800, cond: true });
    grain(ctx, W, H, 0.04);
  },
  // Xiaohongshu cover: the look people expect there, done cleanly: a heavy outlined title, a marker-highlighted second line.
  xhs(ctx, W, H, s) {
    const u = W / 1080, cjk = isCJK(s.title);
    photo(ctx, s.img, 0, 0, W, H, { filter: "contrast(1.06) saturate(1.12) brightness(1.03)" });
    const g = ctx.createLinearGradient(0, H * 0.42, 0, H); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.42)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const f = fitT(ctx, s.title, W - 130 * u, 3, (cjk ? 128 : 120) * u, 900, F.sans), lh = f.size * 1.2, y0 = H * 0.6 - ((f.lines.length - 1) * lh) / 2;
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.lineJoin = "round";
    f.lines.forEach((l, i) => {
      const y = y0 + i * lh;
      if (i % 2) { // the marker line: ink on a yellow highlight
        const w = ctx.measureText(l).width + 50 * u; ctx.save(); ctx.translate(W / 2, y); ctx.rotate(-0.015); ctx.fillStyle = "rgba(255,216,74,.94)"; ctx.fillRect(-w / 2, -f.size * 0.5, w, f.size * 0.98); ctx.restore();
        ctx.fillStyle = INK; ctx.fillText(l, W / 2, y + f.size * 0.03);
      } else {
        ctx.save(); ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 20 * u; ctx.shadowOffsetY = 8 * u;
        ctx.lineWidth = f.size * 0.22; ctx.strokeStyle = "#FF2442"; ctx.strokeText(l, W / 2, y); ctx.restore();
        ctx.lineWidth = f.size * 0.08; ctx.strokeStyle = "#fff"; ctx.strokeText(l, W / 2, y); ctx.fillStyle = "#fff"; ctx.fillText(l, W / 2, y);
      }
    });
    const mt = meta(s); font(ctx, 700, 32 * u, F.sans); const mw = ctx.measureText(mt).width + 56 * u, my = Math.min(H - 110 * u, y0 + (f.lines.length - 1) * lh + f.size * 0.7 + 50 * u);
    ctx.fillStyle = "rgba(24,24,31,.88)"; rr(ctx, (W - mw) / 2, my, mw, 62 * u, 31 * u); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.textBaseline = "middle"; ctx.fillText(mt, W / 2, my + 32 * u);
  },
  // Magazine: a cover with a masthead, an issue line under a hairline, cover lines and a barcode.
  mag(ctx, W, H, s) {
    const u = W / 1080, M = 56 * u, cjk = isCJK(s.m.short);
    photo(ctx, s.img, 0, 0, W, H, { filter: "contrast(1.06) saturate(1.1)" });
    let g = ctx.createLinearGradient(0, 0, 0, H * 0.32); g.addColorStop(0, "rgba(0,0,0,.5)"); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * 0.32);
    g = ctx.createLinearGradient(0, H * 0.55, 0, H); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.62)"); ctx.fillStyle = g; ctx.fillRect(0, H * 0.55, W, H * 0.45);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "top";
    const f = fitT(ctx, s.m.short, W - 2 * M, 1, 300 * u, 900, F.serif, { ls: cjk ? 0 : -4 * u }); ctx.fillText(f.lines[0], W / 2, M - f.size * 0.06);
    const ly = M + f.size * 0.92; ctx.fillRect(M, ly, W - 2 * M, 2 * u);
    const d = new Date(); micro(ctx, zh() ? `${d.getFullYear()}年${d.getMonth() + 1}月号` : `Issue ${d.getMonth() + 1}`, M, ly + 40 * u, u, "#fff");
    micro(ctx, new Intl.DateTimeFormat(loc(), { month: "long", year: "numeric" }).format(d), W - M, ly + 40 * u, u, "#fff", "right");
    const lines = [...s.m.cover[zh() ? "zh" : "en"]]; if (s.star) lines[0] = t("c.starLine", { name: s.star });
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 16 * u;
    const f1 = fitT(ctx, lines[0], W - 2 * M - 220 * u, 1, 96 * u, 900, F.sans, { cond: !isCJK(lines[0]) }); ctx.fillStyle = FLASH; ctx.fillText(f1.lines[0], M, H - 240 * u);
    ctx.fillStyle = "#fff"; for (const [i, l] of [lines[1], lines[2]].entries()) { const fl = fitT(ctx, l, W - 2 * M - 220 * u, 1, 46 * u, 600, F.sans); ctx.fillText(fl.lines[0], M, H - 168 * u + i * 60 * u); }
    ctx.shadowColor = "transparent";
    const bx = W - M - 160 * u, by = H - M - 104 * u, rnd = seeded(7);
    ctx.fillStyle = "#fff"; ctx.fillRect(bx, by, 160 * u, 104 * u); ctx.fillStyle = "#111";
    for (let x = bx + 12 * u; x < bx + 148 * u;) { const w = (1 + Math.floor(rnd() * 3)) * 2.4 * u; ctx.fillRect(x, by + 12 * u, w, 62 * u); x += w + (1 + Math.floor(rnd() * 3)) * 2.4 * u; }
    font(ctx, 600, 14 * u, F.mono); ctx.fillText("9 771234 567003", bx + 12 * u, by + 94 * u);
  },
  // Receipt: a thermal slip with torn edges, set in a mono face, laid over the photo.
  receipt(ctx, W, H, s) {
    const u = W / 1080, rows = s.m.receipt[zh() ? "zh" : "en"], rw = 520 * u, lh = 46 * u;
    photo(ctx, s.img, 0, 0, W, H, { filter: "contrast(1.05) saturate(1.08) brightness(.96)" });
    const rh = 330 * u + rows.length * lh + 150 * u, x = 70 * u, y = Math.max(50 * u, H - rh - 70 * u), z = 11 * u;
    ctx.save(); ctx.translate(x + rw / 2, y + rh / 2); ctx.rotate(-0.045); ctx.translate(-rw / 2, -rh / 2);
    const slip = () => { ctx.beginPath(); ctx.moveTo(0, z); for (let i = 0; i <= rw; i += z * 2) { ctx.lineTo(i + z, 0); ctx.lineTo(Math.min(i + z * 2, rw), z); } ctx.lineTo(rw, rh - z); for (let i = rw; i >= 0; i -= z * 2) { ctx.lineTo(i - z, rh); ctx.lineTo(Math.max(i - z * 2, 0), rh - z); } ctx.closePath(); };
    shadowed(ctx, u, () => { const g = ctx.createLinearGradient(0, 0, rw, 0); g.addColorStop(0, "#F4F3EE"); g.addColorStop(0.5, "#FDFDFA"); g.addColorStop(1, "#F1F0EA"); ctx.fillStyle = g; slip(); ctx.fill(); }, 30, 12, 0.35);
    const d = new Date(), p2 = (v) => String(v).padStart(2, "0"), mid = rw / 2;
    ctx.fillStyle = "#1E1E1E"; ctx.textBaseline = "alphabetic"; ctx.textAlign = "center";
    const fn = fitT(ctx, s.m.name.toUpperCase(), rw - 60 * u, 1, 38 * u, 700, F.mono); ctx.fillText(fn.lines[0], mid, 78 * u);
    font(ctx, 400, 22 * u, F.mono); ctx.fillText(L(s.m.city).toUpperCase(), mid, 112 * u);
    ctx.fillText(`${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()}   ${p2(d.getHours())}:${p2(d.getMinutes())}`, mid, 144 * u);
    const dash = (yy) => { ctx.save(); ctx.strokeStyle = "#1E1E1E"; ctx.setLineDash([6 * u, 6 * u]); ctx.lineWidth = 1.5 * u; ctx.beginPath(); ctx.moveTo(28 * u, yy); ctx.lineTo(rw - 28 * u, yy); ctx.stroke(); ctx.restore(); };
    dash(176 * u); font(ctx, 400, 24 * u, F.mono);
    rows.forEach(([a, b], i) => { const yy = 222 * u + i * lh; ctx.textAlign = "left"; ctx.fillText(`1  ${a}`, 30 * u, yy); ctx.textAlign = "right"; ctx.fillText(b, rw - 30 * u, yy); });
    const yb = 222 * u + rows.length * lh; dash(yb - 10 * u);
    font(ctx, 700, 28 * u, F.mono); ctx.textAlign = "left"; ctx.fillText(zh() ? "快乐总计" : "TOTAL HAPPINESS", 30 * u, yb + 36 * u); ctx.textAlign = "right"; ctx.fillText(zh() ? "满分" : "FULL", rw - 30 * u, yb + 36 * u);
    const rnd = seeded(31); ctx.fillStyle = "#1E1E1E"; for (let k = 60 * u; k < rw - 60 * u;) { const bw = (1 + Math.floor(rnd() * 3)) * 2.2 * u; ctx.fillRect(k, yb + 66 * u, bw, 54 * u); k += bw + (1 + Math.floor(rnd() * 3)) * 2.2 * u; }
    font(ctx, 400, 21 * u, F.mono); ctx.textAlign = "center"; ctx.fillText(zh() ? "谢谢光临，欢迎再来" : "THANK YOU, COME AGAIN", mid, yb + 160 * u);
    ctx.restore();
  },
  // Film: a frame on a negative strip over a lightbox, with sprocket holes, edge print and a date stamp.
  film(ctx, W, H, s) {
    const u = W / 1080, b = 74 * u, OR = "#F08A2C";
    ctx.fillStyle = "#141210"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#EDE6D6"; for (let y = 26 * u; y < H - 20 * u; y += 70 * u) { rr(ctx, 20 * u, y, 34 * u, 42 * u, 6 * u); ctx.fill(); rr(ctx, W - 54 * u, y, 34 * u, 42 * u, 6 * u); ctx.fill(); }
    const px = b, py = 64 * u, pw = W - 2 * b, ph = H - 2 * 64 * u;
    photo(ctx, s.img, px, py, pw, ph, { r: 8 * u, filter: "sepia(.18) saturate(1.18) contrast(1.06) brightness(1.03)" });
    let g = ctx.createRadialGradient(px + pw * 0.95, py, 0, px + pw * 0.95, py, pw * 0.7); g.addColorStop(0, "rgba(255,130,40,.38)"); g.addColorStop(1, "rgba(255,130,40,0)"); ctx.fillStyle = g; ctx.fillRect(px, py, pw, ph);
    g = ctx.createRadialGradient(W / 2, H / 2, pw * 0.4, W / 2, H / 2, H * 0.7); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.4)"); ctx.fillStyle = g; ctx.fillRect(px, py, pw, ph);
    font(ctx, 600, 18 * u, F.mono); ctx.fillStyle = OR; ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left"; ctx.fillText("GO AI 400   ▸ 24", px, 46 * u); ctx.textAlign = "right"; ctx.fillText(`24A   ${s.m.name.toUpperCase()}`, px + pw, H - 26 * u);
    const d = new Date(), p2 = (v) => String(v).padStart(2, "0");
    ctx.save(); ctx.fillStyle = "#FF9A3C"; ctx.shadowColor = "#FF5A00"; ctx.shadowBlur = 12 * u; font(ctx, 600, 52 * u, F.mono, { ls: 4 * u }); ctx.textAlign = "right";
    ctx.fillText(`'${String(d.getFullYear()).slice(2)} ${p2(d.getMonth() + 1)} ${p2(d.getDate())}`, px + pw - 36 * u, py + ph - 40 * u); ctx.restore();
    grain(ctx, W, H, 0.1);
  },
  // Cute: a pastel page in the photo's colour, a rounded photo with a white border, little drawn stars and a written caption.
  cute(ctx, W, H, s) {
    const u = W / 1080, P = pal(s), INKC = "#3B2F35", cjk = isCJK(s.title);
    ctx.fillStyle = P.pastel; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,.55)"; for (let y = 20 * u, r = 0; y < H; y += 44 * u, r++) for (let x = (r % 2 ? 22 : 0) * u + 20 * u; x < W; x += 44 * u) { ctx.beginPath(); ctx.arc(x, y, 5 * u, 0, 7); ctx.fill(); }
    const pw = Math.min(W - 180 * u, H * 0.56), px = (W - pw) / 2, py = Math.max(80 * u, (H - pw - 220 * u) / 2);
    shadowed(ctx, u, () => { ctx.fillStyle = "#fff"; rr(ctx, px - 22 * u, py - 22 * u, pw + 44 * u, pw + 44 * u, 74 * u); ctx.fill(); }, 30, 12, 0.14);
    photo(ctx, s.img, px, py, pw, pw, { r: 56 * u, filter: "saturate(1.15) brightness(1.04)" });
    const sparkle = (x, y, r) => { ctx.beginPath(); ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill(); };
    ctx.fillStyle = P.c(0.55, 1, 0.8); sparkle(px + pw + 4 * u, py + 40 * u, 40 * u); sparkle(px - 6 * u, py + pw - 30 * u, 28 * u); ctx.fillStyle = FLASH; sparkle(px + pw - 40 * u, py - 14 * u, 22 * u);
    const f = fitT(ctx, s.title, W - 200 * u, 2, (cjk ? 60 : 88) * u, 700, cjk ? F.sans : F.hand), lh = f.size * (cjk ? 1.2 : 0.98);
    ctx.fillStyle = INKC; ctx.textAlign = "center"; ctx.textBaseline = "top"; drawLines(ctx, f, W / 2, py + pw + 58 * u, lh);
    micro(ctx, s.m.name, W / 2, Math.min(H - 54 * u, py + pw + 58 * u + lh * f.lines.length + 60 * u), u, INKC, "center", 20);
  },
  // Simple: the photo alone, with viewfinder corners and the shop's signature in the four corners.
  simple(ctx, W, H, s) {
    const u = W / 1080, M = 50 * u, L2 = 64 * u, cjk = isCJK(s.title);
    photo(ctx, s.img, 0, 0, W, H, { filter: "contrast(1.04) saturate(1.06)" });
    let g = ctx.createLinearGradient(0, H * 0.62, 0, H); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,.42)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    g = ctx.createLinearGradient(0, 0, 0, 200 * u); g.addColorStop(0, "rgba(0,0,0,.28)"); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 200 * u);
    ctx.strokeStyle = "rgba(255,255,255,.92)"; ctx.lineWidth = 3 * u;
    for (const [x, y, dx, dy] of [[M, M, 1, 1], [W - M, M, -1, 1], [M, H - M, 1, -1], [W - M, H - M, -1, -1]]) { ctx.beginPath(); ctx.moveTo(x, y + dy * L2); ctx.lineTo(x, y); ctx.lineTo(x + dx * L2, y); ctx.stroke(); }
    micro(ctx, s.m.name, M + 24 * u, M + 52 * u, u, "#fff"); micro(ctx, L(s.m.city), W - M - 24 * u, M + 52 * u, u, "#fff", "right");
    const f = fitT(ctx, s.title, W - 2 * M - 48 * u, 2, 52 * u, 700, F.sans), lh = f.size * (cjk ? 1.2 : 1.1);
    ctx.fillStyle = "#fff"; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; drawLines(ctx, f, M + 24 * u, H - M - 70 * u - lh * (f.lines.length - 1), lh);
    micro(ctx, s.price || s.m.handle, M + 24 * u, H - M - 26 * u, u, "rgba(255,255,255,.85)");
  },
};
// the owner's picker and the customer's swipe list the same looks, each side in its own order
const OWNER_ORDER = ["clean", "premium", "fun", "festive", "menu", "polaroid", "kopitiam", "split", "minimal", "chalk", "neon", "duotone", "riso", "batik", "collage", "ticket", "xhs", "mag", "film", "receipt", "cute", "simple"];
const CUST_ORDER = ["xhs", "mag", "receipt", "film", "cute", "simple", "polaroid", "menu", "kopitiam", "split", "minimal", "chalk", "neon", "duotone", "riso", "batik", "collage", "ticket", "clean", "premium", "fun", "festive"];
const fromOwner = (o) => ({ img: o.magicImg || o.img, m: o.m, title: o.item || o.m.name, price: o.price || "", star: "", cust: false, brand: o.brand || "", logo: o.logo || null });
const fromCust = (o) => ({ img: o.img, m: o.m, title: o.title || o.m.name, price: "", star: o.star || "", cust: true });
// where each look has room for the shop's logo: a corner, or a spot the look returns itself ({ mark: [x, y] }); "" means none
const MARK_AT = { clean: "tr", premium: "tl", fun: "tr", festive: "tl", menu: "bl", polaroid: "tl", kopitiam: "tr", split: "tr", minimal: "tr", chalk: "tr", neon: "tl", duotone: "tl", riso: "tr", batik: "tl", collage: "tl", ticket: "tl", xhs: "tl", mag: "", film: "tl", receipt: "tr", cute: "tr", simple: "tr" };
function logoMark(ctx, W, H, img, spot) {
  const u = W / 1080, side = 112 * u, pad = 14 * u, m = 40 * u, [x, y] = Array.isArray(spot) ? spot : [spot[1] === "l" ? m : W - m - side, spot[0] === "t" ? m : H - m - side];
  shadowed(ctx, u, () => { ctx.fillStyle = "#fff"; rr(ctx, x, y, side, side, 24 * u); ctx.fill(); }, 18, 6, 0.22);
  const k = Math.min((side - 2 * pad) / img.width, (side - 2 * pad) / img.height), w = img.width * k, h = img.height * k;
  ctx.drawImage(img, x + (side - w) / 2, y + (side - h) / 2, w, h);
}
// a badge on an owner poster: a round stamp, a hanging tag or a corner ribbon, in the poster's own accent colour
const BADGES = ["new", "best", "try", "promo", "limited", "b1f1", "members", "today"];
// a free corner for each look, or [x, y] as fractions of the poster where a corner would cover the title
const BADGE_AT = { clean: "tl", premium: "tr", fun: [0.84, 0.44], festive: [0.85, 0.31], menu: "tr", polaroid: "tr", kopitiam: [0.2, 0.33], split: "tl", minimal: "tl", chalk: "tl", neon: "tr", duotone: "tr", riso: "tl", batik: "tr", collage: "tr", ticket: "tr", xhs: "tr", mag: [0.84, 0.2], film: "tr", receipt: "tl", cute: "tl", simple: "tl" };
function badgeMark(ctx, W, H, b, spot, P) {
  const u = W / 1080, m = 44 * u, text = isCJK(b.text) ? b.text : b.text.toUpperCase(), bg = P.accent, ink = P.textOn(0.45), at = Array.isArray(spot);
  const left = at ? spot[0] < 0.5 : spot[1] === "l", top = at ? spot[1] < 0.5 : spot[0] === "t";
  ctx.save();
  if (b.style === "ribbon" && !at) {
    // a band across the corner, cut off by the poster's edge
    const d = 200 * u, bw = 104 * u;
    ctx.translate(left ? 0 : W, top ? 0 : H); ctx.rotate((left === top ? -1 : 1) * Math.PI / 4);
    const y = (top ? 1 : -1) * d * Math.SQRT1_2 * 1.42 - bw / 2;
    shadowed(ctx, u, () => { ctx.fillStyle = bg; ctx.fillRect(-W, y, 2 * W, bw); }, 16, 6, 0.25);
    ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 2 * u; ctx.strokeRect(-W, y + 8 * u, 2 * W, bw - 16 * u);
    const [, draw] = tb(ctx, text, { x: 0, maxW: d * 1.5, size: 46 * u, w: 800, cond: true, col: ink, ls: 2 * u }); draw(y + (bw - 50 * u) / 2);
  } else if (b.style === "tag") {
    font(ctx, 800, 50 * u, F.sans, { cond: !isCJK(text), ls: 2 * u });
    const tw = Math.min(W * 0.62 - 96 * u, ctx.measureText(text).width), w = tw + 96 * u, h = 96 * u;
    const x = at ? Math.min(W - m - w, Math.max(m, spot[0] * W - w / 2)) : left ? m : W - m - w, y = at ? spot[1] * H - h / 2 : top ? m : H - m - h;
    ctx.translate(x + w / 2, y + h / 2); ctx.rotate((left ? -4 : 4) * Math.PI / 180);
    shadowed(ctx, u, () => { ctx.fillStyle = bg; rr(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fill(); }, 18, 8, 0.28);
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-w / 2 + 34 * u, 0, 10 * u, 0, 7); ctx.fill();
    const [th, draw] = tb(ctx, text, { x: 16 * u, maxW: tw + 6 * u, size: 50 * u, w: 800, cond: true, col: ink, ls: 2 * u }); draw(-th / 2);
  } else {
    // a round stamp with a keyline, tilted like it was pressed by hand
    const r = 140 * u, cx = at ? spot[0] * W : left ? m + r : W - m - r, cy = at ? spot[1] * H : top ? m + r : H - m - r;
    ctx.translate(cx, cy); ctx.rotate(-12 * Math.PI / 180);
    shadowed(ctx, u, () => { ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); }, 20, 8, 0.3);
    ctx.strokeStyle = ink === INK ? "rgba(24,24,31,.4)" : "rgba(255,255,255,.7)"; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.arc(0, 0, r - 14 * u, 0, 7); ctx.stroke();
    const [h, draw] = tb(ctx, text, { x: 0, maxW: r * 1.42, lines: 3, size: 62 * u, w: 800, cond: true, col: ink, lh: 0.98 }); draw(-h / 2);
  }
  ctx.restore();
}
// one-tap starting points: a look, and a badge in a style that suits it
const PRESETS = [["launch", "clean", "new", "stamp"], ["weekend", "fun", "promo", "tag"], ["best", "premium", "best", "ribbon"], ["festive", "festive", "limited", "stamp"], ["flash", "neon", "today", "tag"],
  ["members", "polaroid", "members", "tag"], ["b1f1", "split", "b1f1", "stamp"], ["kopitiam", "kopitiam", "", "stamp"], ["menu", "menu", "", "stamp"], ["simple", "minimal", "", "stamp"]];
const LOOKS = Object.fromEntries(OWNER_ORDER.map((k) => [k, (ctx, W, H, o) => {
  FONT_ID = FONT_CSS[o.font] ? o.font : "";
  try {
    const s = fromOwner(o), at = STYLES[k](ctx, W, H, s)?.mark ?? MARK_AT[k];
    if (s.logo && at) logoMark(ctx, W, H, s.logo, at);
    if (o.badge?.text) badgeMark(ctx, W, H, o.badge, o.badge.at !== "auto" ? o.badge.at : BADGE_AT[k] || "tr", pal(s));
  } finally { FONT_ID = ""; }
}]));
const THEMES = CUST_ORDER.map((k) => [k, (ctx, W, H, o) => STYLES[k](ctx, W, H, fromCust(o))]);
const themeFn = (k) => THEMES.find(([id]) => id === k)[1];
// one name per look; the festive look is named after the festival it is drawing
const sname = (k) => (k === "festive" ? t("fest." + nextFest().id) : T["th." + k] ? t("th." + k) : t("look." + k));
/* ======================= notices: closed for a holiday, new hours, a promotion, staff wanted ======================= */
// No photo: a notice is type on the shop's own colour (its brand colour, or its kind of shop's colour), with its logo or name on top.
const NOTICE_KINDS = ["closed", "hours", "promo", "hiring", "menu"], NOTICE_LOOKS = ["board", "paper", "bold"];
const NOTICE_PLATS = ["fb", "ig", "xhs", "tiktok", "threads", "lemon8", "wa"], NOTICE_SIZE = { fb: "feed", ig: "feed", threads: "feed", xhs: "cover", lemon8: "cover", tiktok: "story", wa: "story" };
const N = { kind: "closed", look: "board", lang: "en", reason: "", from: "", to: "", back: "", rows: [["", ""], ["", ""], ["", ""]], start: "", promo: "", item: "", until: "", terms: "", role: "", job: "full", contact: "", note: "", cap: "", typed: false, title: "", menu: [], mnote: "" };
const tl = (k, lang, v = {}) => (T[k]?.[lang === "zh" ? 1 : 0] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x] ?? "");
const isoDay = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dayOf = (iso) => (iso ? new Date(`${iso}T00:00`) : null);
const fmtDay = (iso, lang, opt = { day: "numeric", month: "short" }) => (iso ? new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-MY", opt).format(dayOf(iso)) : "");
function fmtRange(a, b, lang) {
  if (!a) return "";
  if (!b || b <= a) return fmtDay(a, lang);
  const A = dayOf(a), B = dayOf(b), same = A.getMonth() === B.getMonth();
  if (lang === "zh") return same ? `${A.getMonth() + 1}月${A.getDate()}–${B.getDate()}日` : `${fmtDay(a, lang)} – ${fmtDay(b, lang)}`;
  return same ? `${A.getDate()} – ${fmtDay(b, lang)}` : `${fmtDay(a, lang)} – ${fmtDay(b, lang)}`;
}
const backDay = (n) => n.back || (n.to || n.from ? isoDay(new Date(dayOf(n.to > n.from ? n.to : n.from).getTime() + 864e5)) : "");
// a reason that names a festival gets that festival's greeting
const festOfName = (r) => Object.keys(FEST).find((id) => T["fest." + id]?.some((x) => x.toLowerCase() === r.trim().toLowerCase()));
// what a notice says, in its own language (which can differ from the app's)
function noticeText(n) {
  const L2 = (k, v) => tl(k, n.lang, v);
  if (n.kind === "closed") {
    const r = n.reason.trim(), back = backDay(n), fest = festOfName(r);
    return { kicker: r ? L2("nt.closedFor", { r }) : L2("nt.closed"), big: fmtRange(n.from, n.to, n.lang) || L2("nt.closed"),
      body: back ? L2("nt.back", { d: fmtDay(back, n.lang, { weekday: "short", day: "numeric", month: "short" }) }) : "", small: fest ? L2("fg." + fest) + (n.lang === "zh" ? "！" : "!") : L2("nt.thanks") };
  }
  if (n.kind === "menu") return { kicker: n.title.trim() || L2("nt.menuT"), rows: n.menu.filter((x) => x.on).map((x) => [x.name[n.lang === "zh" ? 1 : 0], x.price.trim()]), body: "", small: n.mnote.trim() };
  if (n.kind === "hours") return { kicker: L2("nt.hours"), rows: n.rows.filter(([d, h]) => d.trim() || h.trim()), body: n.start ? L2("nt.from", { d: fmtDay(n.start, n.lang) }) : "", small: L2("nt.seeYou") };
  if (n.kind === "promo") return { kicker: n.item.trim() || L2("nt.promoK"), big: n.promo.trim() || L2("nt.promoPh"), body: n.until ? L2("nt.until", { d: fmtDay(n.until, n.lang) }) : "", small: n.terms.trim() };
  return { kicker: L2("nt.hiring"), big: n.role.trim() || L2("nt.rolePh"), body: [L2("nt.job." + n.job), n.note.trim()].filter(Boolean).join(n.lang === "zh" ? "，" : ". "), small: n.contact.trim() ? L2("nt.apply", { c: n.contact.trim() }) : "" };
}
function noticeCaption(n, m) {
  const L2 = (k, v) => tl(k, n.lang, v), x = noticeText(n), lines = [];
  if (n.kind === "closed") {
    const back = backDay(n), r = n.reason.trim(), range = fmtRange(n.from, n.to, n.lang), b = back ? L2("nc.back", { d: fmtDay(back, n.lang, { weekday: "long", day: "numeric", month: "long" }) }) : "";
    lines.push(range ? L2(r ? "nc.closed" : "nc.closedPlain", { range, reason: r, back: b }).trim() : x.kicker, x.small);
  } else if (n.kind === "menu") {
    lines.push(L2("nc.menu", { title: x.kicker }), ...x.rows.map(([d, h]) => `${d}${h ? (n.lang === "zh" ? "：" : ": ") + h : ""}`), n.mnote.trim());
  } else if (n.kind === "hours") {
    lines.push(L2("nc.hours", { from: n.start ? L2("nc.hoursFrom", { d: fmtDay(n.start, n.lang) }) : "" }), ...x.rows.map(([d, h]) => `${d.trim()}${d.trim() && h.trim() ? (n.lang === "zh" ? "：" : ": ") : ""}${h.trim()}`), L2("nc.hoursEnd"));
  } else if (n.kind === "promo") {
    lines.push(L2("nc.promo", { promo: x.big, on: n.item.trim() ? L2("nc.promoOn", { item: n.item.trim() }) : "" }), n.until ? L2("nc.until", { d: fmtDay(n.until, n.lang, { day: "numeric", month: "long" }) }) : "", n.terms.trim());
  } else lines.push(L2("nc.hiring", { role: x.big, job: L2("nt.job." + n.job) }), n.note.trim(), n.contact.trim() ? L2("nc.apply", { c: n.contact.trim() }) : "");
  const tags = [...m.tags.split(" "), ...(n.kind === "hiring" ? ["#WeAreHiring", "#KerjaKosong"] : n.kind === "promo" ? ["#Promo"] : [])].slice(0, 5);
  return `${fixText(lines.filter(Boolean).join("\n"))}\n\n📍${m.name}${n.lang === "zh" ? "·" : ", "}${m.city[n.lang === "zh" ? 1 : 0]}\n${tags.join(" ")}`;
}
// lay text blocks down a notice: each block is [height, draw(y)], spare room goes above and below
function stack(blocks, top, bottom) { const h = blocks.reduce((a, b) => a + b[0], 0); let y = top + Math.max(0, (bottom - top - h) / 2); for (const [bh, draw] of blocks) { draw(y); y += bh; } }
function tb(ctx, text, { x, maxW, lines = 1, size, w = 700, fam = F.sans, cond = false, it = false, col, lh = 1.08, gap = 0, align = "center", ls = 0 }) {
  if (!text) return [0, () => {}];
  const cjk = isCJK(text), o = { cond: cond && !cjk, it: it && !cjk, ls }, f = fitLines(ctx, text, maxW, lines, size, (z) => font(ctx, w, z, fam, o)), step = f.size * (cjk ? Math.max(lh, 1.2) : lh);
  return [step * f.lines.length + gap, (y) => { font(ctx, w, f.size, fam, o); ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = "top"; f.lines.forEach((l, i) => ctx.fillText(l, x, y + i * step)); }];
}
// opening hours as a little timetable: days on the left, hours on the right, a dotted leader between
function rowsBlock(ctx, rows, { x0, x1, size, fam = F.soft, w = 600, col, dot, gap = 0, maxH = Infinity }) {
  if (!rows?.length) return [0, () => {}];
  // one size for every row, so the column of names and the column of prices stay even
  size = Math.min(size, maxH / (rows.length * 1.75));
  for (; size > 14; size *= 0.95) { font(ctx, w, size, fam); if (rows.every(([d, h]) => ctx.measureText(d.trim()).width <= (x1 - x0) * 0.6 && ctx.measureText(h.trim()).width <= (x1 - x0) * 0.34)) break; }
  const step = size * 1.75;
  return [step * rows.length + gap, (y) => rows.forEach(([d, h], i) => {
    const yy = y + i * step;
    font(ctx, w, size, fam); ctx.fillStyle = col; ctx.textBaseline = "top";
    ctx.textAlign = "left"; ctx.fillText(d.trim(), x0, yy); const wd = ctx.measureText(d.trim()).width;
    ctx.textAlign = "right"; ctx.fillText(h.trim(), x1, yy); const wh = ctx.measureText(h.trim()).width;
    ctx.fillStyle = dot; for (let x = x0 + wd + size * 0.4; x < x1 - wh - size * 0.4; x += size * 0.32) { ctx.beginPath(); ctx.arc(x, yy + size * 0.72, size * 0.05, 0, 7); ctx.fill(); }
  })];
}
const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
function plate(ctx, img, cx, y, side, u) { // the logo on a small white plate
  shadowed(ctx, u, () => { ctx.fillStyle = "#fff"; rr(ctx, cx - side / 2, y, side, side, side * 0.22); ctx.fill(); }, 16, 6, 0.2);
  const k = Math.min((side * 0.78) / img.width, (side * 0.78) / img.height); ctx.drawImage(img, cx - (img.width * k) / 2, y + (side - img.height * k) / 2, img.width * k, img.height * k);
}
function screw(ctx, x, y, r) {
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); g.addColorStop(0, "#F4EFE6"); g.addColorStop(1, "#9C968C");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.strokeStyle = "rgba(40,30,20,.55)"; ctx.lineWidth = r * 0.22; ctx.beginPath(); ctx.moveTo(x - r * 0.6, y + r * 0.2); ctx.lineTo(x + r * 0.6, y - r * 0.2); ctx.stroke();
}
async function paintCounter(canvas) {
  const m = M(), W = 1240, H = 1754, u = W / 1080, logo = m.logoUrl ? await loadImg(m.logoUrl).catch(() => null) : null;
  const head = "扫码，晒照，｜集印章。", steps = [["扫码", "Scan the code"], ["拍照发帖", "Post your photo"], ["集印章", "Collect stamps"]], rw = [...new Set([m.reward[1], m.reward[0]])];
  await fontsReady;
  await Promise.all(['900 80px "Noto Serif SC"', '700 80px "Noto Sans SC"', '400 80px "Noto Sans SC"'].map((f) => document.fonts.load(f, head + steps.join("") + m.name + rw.join("")))).catch(() => {});
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d"), col = m.brand || "#0F4D3A", light = lumOf(hexRgb(col)) > 0.3;
  const ink = light ? INK : "#FBF3E4", soft = light ? "rgba(24,24,31,.72)" : "rgba(251,243,228,.82)", hi = light ? INK : "#F2C14E";
  ctx.fillStyle = col; ctx.fillRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, "rgba(255,255,255,.14)"); g.addColorStop(0.55, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(0,0,0,.2)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = ink; ctx.lineWidth = 6 * u; rr(ctx, 44 * u, 44 * u, W - 88 * u, H - 88 * u, 30 * u); ctx.stroke();
  ctx.lineWidth = 2 * u; rr(ctx, 62 * u, 62 * u, W - 124 * u, H - 124 * u, 20 * u); ctx.stroke();
  for (const [sx, sy] of [[96 * u, 96 * u], [W - 96 * u, 96 * u], [96 * u, H - 96 * u], [W - 96 * u, H - 96 * u]]) screw(ctx, sx, sy, 13 * u);
  if (logo) plate(ctx, logo, W / 2, 104 * u, 112 * u, u);
  const mw = W - 300 * u, qs = 370 * u, cw = (W - 280 * u) / 3;
  const qr = [qs + 46 * u, (y) => {
    shadowed(ctx, u, () => { ctx.fillStyle = "#fff"; rr(ctx, (W - qs) / 2, y, qs, qs, 30 * u); ctx.fill(); }, 30, 12, 0.3);
    const q = document.createElement("canvas"); drawQR(q, custUrl(), INK); ctx.drawImage(q, (W - qs) / 2 + 34 * u, y + 34 * u, qs - 68 * u, qs - 68 * u);
  }];
  const stepRow = [194 * u, (y) => steps.forEach(([z, e], i) => {
    const x = W / 2 + (i - 1) * cw;
    ctx.fillStyle = hi; ctx.beginPath(); ctx.arc(x, y + 34 * u, 34 * u, 0, 7); ctx.fill();
    font(ctx, 800, 40 * u); ctx.fillStyle = light ? "#fff" : col; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String(i + 1), x, y + 36 * u);
    ctx.textBaseline = "top"; ctx.fillStyle = ink; font(ctx, 700, 40 * u); ctx.fillText(z, x, y + 88 * u);
    ctx.fillStyle = soft; font(ctx, 500, 28 * u); ctx.fillText(e, x, y + 138 * u);
  })];
  const reward = [(rw.length > 1 ? 120 : 84) * u, (y) => {
    const h = (rw.length > 1 ? 120 : 84) * u; ctx.fillStyle = light ? "#fff" : "#F3EBD8"; rr(ctx, 150 * u, y, W - 300 * u, h, 22 * u); ctx.fill();
    rw.forEach((r, i) => tb(ctx, r, { x: W / 2, maxW: W - 360 * u, size: (i ? 30 : 38) * u, w: i ? 500 : 700, col: INK })[1](y + (i ? 70 : 22) * u));
  }];
  stack([
    tb(ctx, m.name, { x: W / 2, maxW: mw, size: 58 * u, w: m.font ? 700 : 500, fam: FONT_CSS[m.font] || F.soft, it: !m.font, cond: m.font === "poster", col: ink, gap: 22 * u }),
    tb(ctx, head, { x: W / 2, maxW: mw, lines: 2, size: 88 * u, w: 900, fam: F.serif, col: ink, lh: 1.12, gap: 14 * u }),
    tb(ctx, "SCAN. POST. COLLECT STAMPS.", { x: W / 2, maxW: mw, size: 54 * u, w: 800, cond: true, col: hi, ls: 2 * u, gap: 30 * u }),
    qr, stepRow, reward,
  ], (logo ? 236 : 132) * u, H - 140 * u);
  micro(ctx, "Powered by Go AI", W / 2, H - 120 * u, u, soft, "center", 20);
  grain(ctx, W, H, 0.04);
  return canvas;
}
const NOTICE_DRAW = {
  // Signboard: an enamel sign in the shop's colour, a double keyline, four screws, cream lettering.
  board(ctx, W, H, n) {
    const u = W / 1080, x = n.text, col = n.colour, light = lumOf(hexRgb(col)) > 0.3, ink = light ? INK : "#FBF3E4", soft = light ? "rgba(24,24,31,.72)" : "rgba(251,243,228,.82)";
    ctx.fillStyle = col; ctx.fillRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, "rgba(255,255,255,.14)"); g.addColorStop(0.55, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(0,0,0,.2)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = ink; ctx.lineWidth = 6 * u; rr(ctx, 44 * u, 44 * u, W - 88 * u, H - 88 * u, 30 * u); ctx.stroke();
    ctx.lineWidth = 2 * u; rr(ctx, 62 * u, 62 * u, W - 124 * u, H - 124 * u, 20 * u); ctx.stroke();
    for (const [sx, sy] of [[96 * u, 96 * u], [W - 96 * u, 96 * u], [96 * u, H - 96 * u], [W - 96 * u, H - 96 * u]]) screw(ctx, sx, sy, 13 * u);
    let top = 150 * u;
    if (n.logo) { plate(ctx, n.logo, W / 2, 110 * u, 128 * u, u); top = 290 * u; } else { micro(ctx, n.m.name, W / 2, 168 * u, u, soft, "center", 28); top = 220 * u; }
    const mw = W - 260 * u, z = n.lang === "zh";
    stack([
      tb(ctx, x.kicker, { x: W / 2, maxW: mw, size: 72 * u, w: z ? 700 : 500, fam: F.soft, it: true, col: ink, gap: 34 * u }),
      x.rows ? rowsBlock(ctx, x.rows, { x0: 150 * u, x1: W - 150 * u, size: 58 * u, col: ink, dot: soft, gap: 30 * u, maxH: H - top - 420 * u })
        : tb(ctx, x.big, { x: W / 2, maxW: mw, lines: 2, size: Math.min(250 * u, H * 0.17), w: 900, cond: true, col: ink, lh: 0.9, gap: 34 * u }),
      tb(ctx, x.body, { x: W / 2, maxW: mw, lines: 2, size: 50 * u, w: 600, col: ink, gap: 30 * u }),
      tb(ctx, x.small, { x: W / 2, maxW: mw, lines: 2, size: 44 * u, w: 400, fam: F.soft, it: true, col: soft }),
    ], top, H - 190 * u);
    micro(ctx, n.m.handle, W / 2, H - 132 * u, u, soft, "center", 22);
    grain(ctx, W, H, 0.05);
  },
  // Paper: a printed note taped inside the glass door, signed by the shop in pen.
  paper(ctx, W, H, n) {
    const u = W / 1080, x = n.text, col = n.colour, RED = lumOf(hexRgb(col)) > 0.3 ? "#B3140D" : col;
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#C9D3D8"); g.addColorStop(1, "#8E9EA8"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalAlpha = 0.16; ctx.fillStyle = "#fff"; for (const k of [0.1, 0.42]) { ctx.beginPath(); ctx.moveTo(W * k, 0); ctx.lineTo(W * (k + 0.16), 0); ctx.lineTo(W * (k - 0.12), H); ctx.lineTo(W * (k - 0.2), H); ctx.closePath(); ctx.fill(); } ctx.restore();
    const pw = W * 0.8, ph = H - 210 * u, px = (W - pw) / 2, py = 105 * u;
    ctx.save(); ctx.translate(W / 2, py + ph / 2); ctx.rotate(-0.012); ctx.translate(-W / 2, -(py + ph / 2));
    shadowed(ctx, u, () => { ctx.fillStyle = "#FFFDF7"; ctx.fillRect(px, py, pw, ph); }, 34, 14, 0.28);
    ctx.fillStyle = "rgba(24,24,31,.05)"; for (let yy = py + 60 * u; yy < py + ph - 30 * u; yy += 44 * u) ctx.fillRect(px + 40 * u, yy, pw - 80 * u, 1.2 * u);
    let top = py + 90 * u;
    if (n.logo) { plate(ctx, n.logo, W / 2, py + 60 * u, 104 * u, u); top = py + 200 * u; }
    const mw = pw - 120 * u, z = n.lang === "zh";
    stack([
      tb(ctx, x.kicker, { x: W / 2, maxW: mw, size: (z ? 64 : 84) * u, w: 700, fam: F.hand, col: RED, gap: 26 * u }),
      x.rows ? rowsBlock(ctx, x.rows, { x0: px + 70 * u, x1: px + pw - 70 * u, size: 52 * u, col: INK, dot: "rgba(24,24,31,.4)", gap: 26 * u, maxH: py + ph - top - 380 * u })
        : tb(ctx, x.big, { x: W / 2, maxW: mw, lines: 2, size: Math.min(220 * u, H * 0.15), w: 900, cond: true, col: INK, lh: 0.92, gap: 30 * u }),
      tb(ctx, x.body, { x: W / 2, maxW: mw, lines: 2, size: 48 * u, w: 500, fam: F.soft, col: INK, gap: 24 * u }),
      tb(ctx, x.small, { x: W / 2, maxW: mw, lines: 2, size: (z ? 40 : 54) * u, w: 700, fam: F.hand, col: "#4A4A55" }),
    ], top, py + ph - 150 * u);
    font(ctx, 700, (z ? 40 : 56) * u, F.hand); ctx.fillStyle = RED; ctx.textAlign = "right"; ctx.textBaseline = "alphabetic"; ctx.fillText(`— ${n.m.name}`, px + pw - 60 * u, py + ph - 60 * u);
    ctx.restore();
    for (const [tx, r] of [[px + 70 * u, -0.5], [px + pw - 70 * u, 0.45]]) tape(ctx, tx, py + 6 * u, 170 * u, 52 * u, r, "rgba(255,236,170,.78)");
    grain(ctx, W, H, 0.04);
  },
  // Bold: a Swiss poster, the shop's colour across the top, the message set huge on white.
  bold(ctx, W, H, n) {
    const u = W / 1080, M = 72 * u, x = n.text, col = n.colour, light = lumOf(hexRgb(col)) > 0.3, on = light ? INK : "#fff", band = H * 0.32, z = n.lang === "zh";
    ctx.fillStyle = "#FAFAF7"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = col; ctx.fillRect(0, 0, W, band);
    if (n.logo) plate(ctx, n.logo, M + 56 * u, M, 112 * u, u); else micro(ctx, n.m.name, M, M + 28 * u, u, on, "left", 26);
    const k = tb(ctx, x.kicker, { x: M, maxW: W - 2 * M, lines: 2, size: (z ? 76 : 88) * u, w: 800, col: on, lh: 1, align: "left" });
    k[1](band - M - k[0] + 8 * u);
    stack([
      x.rows ? rowsBlock(ctx, x.rows, { x0: M, x1: W - M, size: 60 * u, fam: F.sans, w: 700, col: INK, dot: "rgba(24,24,31,.35)", gap: 36 * u, maxH: H - band - 420 * u })
        : tb(ctx, x.big, { x: M, maxW: W - 2 * M, lines: 3, size: Math.min(270 * u, H * 0.19), w: 900, cond: true, col: INK, lh: 0.88, gap: 40 * u, align: "left" }),
      [16 * u + 36 * u, (y) => { ctx.fillStyle = light ? INK : col; ctx.fillRect(M, y, 120 * u, 14 * u); }],
      tb(ctx, x.body, { x: M, maxW: W - 2 * M, lines: 2, size: 54 * u, w: 600, col: INK, align: "left", gap: 22 * u }),
      tb(ctx, x.small, { x: M, maxW: W - 2 * M, lines: 2, size: 40 * u, w: 500, col: "#5D5D66", align: "left" }),
    ], band + 70 * u, H - 170 * u);
    ctx.fillStyle = "rgba(24,24,31,.18)"; ctx.fillRect(M, H - 120 * u, W - 2 * M, 1.5 * u);
    micro(ctx, n.m.name, M, H - 70 * u, u, INK); micro(ctx, n.m.handle, W - M, H - 70 * u, u, "#5D5D66", "right");
  },
};
async function paintNotice(canvas, W, H, n = N) {
  const m = M(), logo = m.logoUrl ? await loadImg(m.logoUrl).catch(() => null) : null;
  if (n.lang === "zh" || isCJK(JSON.stringify(n))) await Promise.all(SC_FONTS.map((f) => document.fonts.load(f, JSON.stringify(n) + m.name)));
  return paint(canvas, W, H, (ctx, w, h) => NOTICE_DRAW[n.look](ctx, w, h, { ...n, text: noticeText(n), m, logo, colour: m.brand || m.color }), {});
}
// a new notice starts on the next festival: its date, a day off, back the day after
function startNotice(kind) {
  const f = nextFest(), d = new Date(); d.setDate(d.getDate() + Math.max(0, f.days));
  const long = ["cny", "raya"].includes(f.id), to = new Date(d); if (long) to.setDate(to.getDate() + 1);
  Object.assign(N, { kind, lang: S.lang, reason: kind === "closed" ? T["fest." + f.id][zh() ? 1 : 0] : N.reason, from: kind === "closed" ? isoDay(d) : N.from, to: kind === "closed" ? isoDay(to) : N.to, back: "", typed: false });
  if (kind === "menu" && !N.menu.length) N.menu = (SHOP?.items || []).map((x, i) => ({ name: [x.en, x.zh || x.en], price: x.price || "", on: i < 8 }));
  const own = hoursRows(M().hours);
  if (!N.rows.some(([a, b]) => a || b) && own.length) N.rows = [...own, ["", ""], ["", ""]].slice(0, Math.max(3, own.length));
  if (!N.rows.some(([a, b]) => a || b)) N.rows = zh() ? [["星期一至五", "早上8点 – 傍晚6点"], ["星期六、日", "早上9点 – 下午3点"], ["", ""]] : [["Mon – Fri", "8am – 6pm"], ["Sat – Sun", "9am – 3pm"], ["", ""]];
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
const custUrl = () => `${location.origin}${location.pathname}#/c/${SHOP?.slug || ""}`;
const staffUrl = () => `${location.origin}${location.pathname}#/staff/${SHOP?.slug || ""}`;

/* ======================= captions ======================= */
// the owner's caption: an opening that fits the moment, a line in the look's voice, an invitation, then tags.
// Built only from what the owner typed (item, price) and the shop; nothing about taste, awards or deals is made up.
const FOOD = ["cafe", "restaurant", "bakery", "drinks"];
const TONE = { clean: "friendly", simple: "friendly", split: "friendly", minimal: "calm", premium: "calm", duotone: "calm", mag: "calm", fun: "hype", neon: "hype", riso: "hype", cute: "hype", menu: "menu", polaroid: "story", film: "story", collage: "story", ticket: "story", xhs: "story", kopitiam: "local", batik: "local", receipt: "local", chalk: "menu", festive: "festive" };
const CAPS = {
  en: {
    open: { morning: ["Good morning, {city}! {emo}", "Morning! Starting the day at {shop}?"], lunch: ["Lunch plans? Sorted. {emo}", "Lunch break, upgraded."], tea: ["Tea-time treat? {emo}", "3pm slump? Not today."],
      evening: ["After-work plans? {emo}", "Evening, {city}!"], late: ["Night owls, this one's for you. {emo}", "Still up, {city}?"], day: ["Hello from {shop}! {emo}", "Fresh on our feed today. {emo}"],
      weekend: ["Weekend plans, sorted. {emo}", "Hello, weekend!"], friday: ["Friday feeling. {emo}"], monday: ["Monday needs this. {emo}"], payday: ["Gaji dah masuk? Treat yourself. {emo}"], festive: ["{greet}! {emo}"] },
    body: {
      friendly: ["Say hello to our {item}{p}.", "Have you tried our {item} yet?{pb}", "Our {item}{p}, ready when you are."],
      hype: ["{ITEM} IS HERE!{pb}", "Stop scrolling. {item}{p}.", "Your sign to get the {item}{p}."],
      calm: ["{item}{p}. Simple, and made with care.", "Take a closer look: {item}.", "Slow down for this one: {item}{p}."],
      story: ["Snapped this behind the counter today: our {item}.", "One of our favourite things to make: {item}{p}.", "Today at {shop}: {item}{p}."],
      local: ["Jom, {item} at {shop}!", "{item}{p}. {local}", "Lepak with us and try the {item}."],
      menu: ["On the board today: {item}{p}.", "Today's pick: {item}{p}.", "Write this down: {item}{p}."],
      festive: ["{item}{p}, ready for {fest}.", "Celebrate {fest} with our {item}.", "From all of us at {shop}: {greet}!"] },
    local: { food: "Sedap, try lah.", other: "Steady lah." },
    cta: ["See you at {shop}, {city}.", "Tag someone who needs this.", "Save this for your next visit.", "Drop by {shop} in {city}.", "Which one are you getting?"],
    heat: ["Malaysian heat? This helps.", "Ice-cold and ready.", "Hot day? Cool down with our {item}."],
    either: ["{item} or {other}? Why not both.", "Team {item} or team {other}?", "{item} today, {other} tomorrow?"],
    pair: ["Pair it with our {other}.", "Even better with our {other}.", "Add our {other} while you're here."],
    short: (it, pr) => `${it}. ${pr}. That's it.`,
    p: (x) => `, ${x}`, pb: (x) => ` Only ${x}.`,
    tags: { weekend: "#WeekendVibes", payday: "#Payday", friday: "#TGIF" },
  },
  zh: {
    open: { morning: ["早安{city}！{emo}", "早上好，从{shop}开始新的一天？"], lunch: ["午餐吃什么？交给我们。{emo}", "午休时间，升级一下。"], tea: ["下午茶时间到！{emo}", "三点钟，来点好的？"],
      evening: ["下班后去哪？{emo}", "晚上好，{city}！"], late: ["夜猫子看过来～{emo}", "还没睡吗，{city}？"], day: ["{shop}向你问好！{emo}", "今天的新内容来啦。{emo}"],
      weekend: ["周末去哪儿？这里！{emo}", "周末快乐！"], friday: ["周五啦！{emo}"], monday: ["周一需要一点快乐。{emo}"], payday: ["发薪日，犒劳一下自己！{emo}"], festive: ["{greet}！{emo}"] },
    body: {
      friendly: ["认识一下我们的{item}{p}。", "你试过我们的{item}了吗？{pb}", "我们的{item}{p}，随时等你来。"],
      hype: ["{item}来了！！{pb}", "别滑了，{item}{p}。", "这就是你该来试试{item}的信号。"],
      calm: ["{item}{p}。简单，用心。", "靠近一点看：{item}。", "慢下来，好好感受{item}{p}。"],
      story: ["今天在柜台后面拍下的：我们的{item}。", "我们最喜欢做的之一：{item}{p}。", "今天的{shop}：{item}{p}。"],
      local: ["来{shop}坐坐，试试{item}！", "{item}{p}，{local}", "约朋友来{shop}，点一份{item}。"],
      menu: ["今日黑板推荐：{item}{p}。", "今天就选它：{item}{p}。", "记下来：{item}{p}。"],
      festive: ["{item}{p}，为{fest}准备好了。", "和我们的{item}一起过{fest}。", "{shop}全体祝你{greet}！"] },
    local: { food: "真的好吃。", other: "值得一试。" },
    cta: ["{city}的朋友，{shop}见！", "@一个想一起去的朋友", "先收藏，下次来！", "路过{city}记得来{shop}。", "你会选哪一个？"],
    heat: ["天气这么热，来一杯冰的。", "冰冰凉凉，刚刚好。", "大热天，就要{item}。"],
    either: ["{item}还是{other}？两个都要！", "你是{item}派还是{other}派？", "今天{item}，明天{other}？"],
    pair: ["配上我们的{other}。", "和{other}一起更好。", "顺便来一份{other}吧。"],
    short: (it, pr) => `${it}，${pr}。就这样。`,
    p: (x) => `，${x}`, pb: (x) => `只要${x}！`,
    tags: { weekend: "#周末去哪儿", payday: "#发薪日", friday: "#周五快乐" },
  },
};
function moment(d = new Date()) {
  const h = d.getHours(), day = d.getDay(), date = d.getDate();
  return { part: h < 5 || h >= 22 ? "late" : h < 11 ? "morning" : h < 14 ? "lunch" : h < 17 ? "tea" : "evening", weekend: day % 6 === 0, friday: day === 5, monday: day === 1, payday: date >= 25 || date <= 1 };
}
// openings that fit right now, the most specific first; meal times only for shops that serve food
function openers(lang, look, food) {
  const o = CAPS[lang].open, mo = moment(), out = [];
  if (look === "festive" || nextFest().days <= 14) out.push(...o.festive);
  for (const k of ["payday", "friday", "monday", "weekend"]) if (mo[k]) out.push(...o[k]);
  out.push(...(food || !["lunch", "tea"].includes(mo.part) ? o[mo.part] : o.day));
  return out;
}
// What the item is, read from its name: the writer then talks about it the way people talk about that thing.
// Lines are true of the whole kind (a matcha is a matcha), never claims about this one (no "fresh", "best", "homemade").
const KINDS = [
  ["matcha", /matcha|抹茶/i, "🍵", ["For the matcha people.", "Matcha o'clock.", "Green tea, but make it a treat."], ["抹茶控看过来。", "抹茶时间到。", "绿色的快乐。"], ["#MatchaLove", "#抹茶"]],
  ["boba", /boba|bubble|pearl|tapioca|珍珠|奶茶|波霸/i, "🧋", ["Boba run?", "Chewy pearls, happy you.", "Your sign to get a boba today."], ["奶茶时间！", "珍珠控必看。", "今天就喝这杯。"], ["#BubbleTea", "#奶茶"]],
  ["coffee", /kopi|coffee|latte|americano|espresso|mocha|cappuccino|flat white|cold brew|咖啡|拿铁|美式/i, "☕", ["Your daily caffeine fix.", "Coffee break? We've got you.", "A cup worth slowing down for."], ["今天的咖啡因补给。", "咖啡时间到。", "值得慢下来喝的一杯。"], ["#CoffeeTime", "#咖啡"]],
  ["tea", /\bteh\b|\btea\b|chai|茶/i, "🍵", ["Teh time.", "A proper cuppa.", "Tea break, anyone?"], ["来杯茶吧。", "喝茶时间到。", "歇一歇，喝杯茶。"], ["#TehTime", "#喝茶"]],
  ["juice", /juice|smoothie|lemonade|soda|limau|jus|果汁|柠檬|冰沙|椰/i, "🥤", ["Something fruity for the afternoon.", "Thirsty? Sorted.", "A glass of sunshine."], ["来点果味。", "口渴了吗？", "一杯阳光。"], ["#DrinksMY", "#饮料"]],
  ["dessert", /cake|kek|cendol|ais kacang|ice cream|gelato|pudding|tart|brownie|cheesecake|dessert|waffle|蛋糕|甜品|冰淇淋|布丁|煎蕊|挞/i, "🍰", ["Dessert first? We won't tell.", "For the sweet tooth.", "Treat yourself, you earned it."], ["先吃甜点？我们不说。", "甜食控必看。", "犒劳一下自己。"], ["#DessertTime", "#甜品"]],
  ["bread", /bread|roti|croissant|bun|toast|bagel|scone|kaya|面包|吐司|可颂|包|咖椰/i, "🥐", ["Carbs, sorted.", "Bread o'clock.", "Grab one for later too."], ["面包控看过来。", "面包时间到。", "多拿一个留着晚点吃。"], ["#BakeryLove", "#面包"]],
  ["noodle", /mee|\bmi\b|noodle|laksa|kuey teow|koay teow|ramen|udon|pasta|面|粉|叻沙|板面/i, "🍜", ["Slurp-worthy.", "Noodle craving? Same.", "Comfort in a bowl."], ["一口接一口。", "想吃面了吗？", "一碗暖心。"], ["#NoodleLover", "#面食"]],
  ["rice", /nasi|rice|biryani|claypot|饭|煲仔/i, "🍛", ["Makan time!", "A plate done right.", "A proper plate of comfort."], ["开饭啦！", "一盘满足。", "吃饭就选它。"], ["#MakanTime", "#美食"]],
  ["meat", /chicken|ayam|beef|daging|satay|pork|burger|steak|wing|鸡|牛|猪|肉|烧/i, "🍗", ["Hungry? Good.", "For the meat lovers.", "Come hungry."], ["饿了吗？来这里。", "肉食者的快乐。", "空着肚子来。"], ["#MeatLover", "#吃肉"]],
  ["seafood", /fish|ikan|prawn|udang|crab|ketam|sotong|squid|oyster|鱼|虾|蟹|苏东|蚝/i, "🦐", ["Seafood lovers, this one's for you.", "Ocean vibes on a plate.", "Shell out, dig in."], ["海鲜控看过来。", "满满海味。", "剥开就是快乐。"], ["#SeafoodLover", "#海鲜"]],
  ["hair", /hair|cut|colou?r|perm|rebond|fade|trim|highlight|balayage|理发|剪|染|烫|发/i, "💇", ["Fresh cut, fresh start.", "New look, who dis?", "Hair day, sorted."], ["新发型，新心情。", "换个造型吧。", "头发交给我们。"], ["#NewHair", "#发型"]],
  ["nails", /nail|manicure|pedicure|\bgel\b|美甲|指甲/i, "💅", ["Fresh set, happy hands.", "Nail day!", "Little details, big mood."], ["新指甲，好心情。", "美甲日！", "小细节，大心情。"], ["#NailArt", "#美甲"]],
  ["beauty", /facial|lash|brow|massage|spa|skin|wax|面部|睫毛|眉|按摩|护肤/i, "✨", ["Me-time, booked.", "Glow mode on.", "You deserve a pause."], ["给自己一点时间。", "开启发光模式。", "你值得休息一下。"], ["#SelfCare", "#护肤"]],
  ["pet", /dog|cat|kitten|puppy|groom|pet|kibble|aquarium|guppy|betta|狗|猫|宠物|鱼缸|猫粮|狗粮/i, "🐾", ["For the good boys and girls.", "Spoil your furkid a little.", "Paws up if you need this."], ["给毛孩子的。", "宠一下你的毛孩子。", "铲屎官们看过来。"], ["#FurKids", "#毛孩子"]],
  ["flower", /flower|bouquet|rose|sunflower|lily|tulip|orchid|花|玫瑰|向日葵|百合/i, "💐", ["Say it with flowers.", "Someone deserves these.", "A little colour for someone's day."], ["用花说出来。", "送给值得的人。", "给某人的一天加点颜色。"], ["#Flowers", "#鲜花"]],
  ["fashion", /dress|shirt|tee|blouse|pants|skirt|bag|shoe|sneaker|baju|kurung|jacket|裙|衣|包|鞋|外套/i, "👗", ["Outfit, sorted.", "Your next favourite.", "Wear it your way."], ["穿搭有了。", "你的下一件心头好。", "穿出你的风格。"], ["#OOTD", "#穿搭"]],
];
const KIND_OF_TYPE = { cafe: "coffee", drinks: "boba", bakery: "bread", restaurant: "rice", salon: "hair", beauty: "beauty", pet: "pet", florist: "flower", fashion: "fashion" };
const GENERIC = ["", /$^/, "✨", ["Come see it for yourself.", "Something new to try.", "Have a look."], ["来看看吧。", "来试试新东西。", "过来瞧瞧。"], ["#ShopLocal", "#支持本地"]];
function kindOf(item, type) { return KINDS.find((k) => k[1].test(item)) || KINDS.find((k) => k[0] === KIND_OF_TYPE[type]) || GENERIC; }
const ICED = /iced|\bice\b|\bais\b|cold|冰/i;

// the owner's caption: four shapes that take turns, each built from the item, its kind, the moment, the look's voice
// and the shop's own menu; "Write another" walks through them
function ownerCaption(look, lang, i) {
  const m = M(), z = lang === "zh", W2 = CAPS[lang], food = FOOD.includes(m.type), item = C.item.trim() || L(m.item), price = C.price.trim();
  const tone = TONE[look] || "friendly", f = nextFest(), mo = moment(), tt = (k) => T[k][z ? 1 : 0], kind = kindOf(item, m.type);
  // another thing the shop sells, for "this or that?" and pairings: only ever the shop's own items
  const others = m.menu.map((x) => x[z ? 1 : 0]).filter((x) => x && x.toLowerCase() !== item.toLowerCase()), other = others[i % Math.max(1, others.length)];
  const fill = (x) => x.replace(/\{(\w+)\}/g, (_, k) => ({ shop: m.name, city: m.city[z ? 1 : 0], item, other, ITEM: z ? item : item.toUpperCase(), emo: kind[2], p: price ? W2.p(price) : "", pb: price ? W2.pb(price) : "", greet: tt("fg." + f.id), fest: tt("fest." + f.id), local: W2.local[food ? "food" : "other"] })[k] ?? "");
  const pick = (a, k) => a[k % a.length];
  const kindLine = pick(kind[z ? 4 : 3], i), heat = ICED.test(item) ? pick(W2.heat, i) : "";
  const shapes = [
    () => [pick(openers(lang, look, food), i), kindLine, pick(W2.body[tone], i), pick(W2.cta, i + 1)],
    () => [other ? pick(W2.either, i) : kindLine, pick(W2.body[tone], i + 1), other ? pick(W2.pair, i) : pick(W2.cta, i)],
    () => [heat || pick(openers(lang, look, food), i + 1), pick(W2.body[tone], i + 2), kindLine, pick(W2.cta, i + 2)],
    () => [`${kindLine} ${kind[2]}`, price ? W2.short(item, price) : pick(W2.body[tone], i), pick(W2.cta, i + 3)],
  ];
  const text = shapes[i % shapes.length]().filter(Boolean).map(fill).join("\n");
  const tags = [...new Set([`#${m.shopTag}`, `#${item.replace(/[\s#,.!'’]/g, "")}`, kind[5][z ? 1 : 0], ...(food ? [z ? `#${m.city[1].replace(/\s/g, "")}美食` : `#${m.city[0].replace(/\s/g, "")}Eats`] : [m.tags.split(" ")[1]]),
    ...["weekend", "payday", "friday"].filter((k) => mo[k]).map((k) => W2.tags[k]), ...(tone === "festive" || f.days <= 14 ? [`#${tt("fest." + f.id).replace(/[\s-]/g, "")}`] : [])])].filter((x) => x && x.length > 1).slice(0, 5);
  return `${fixText(text)}\n\n${tags.join(" ")}`;
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
const PRESSABLE = ".btn, .snap, .look, .huge, .tabs a, .row-link, .samples button, .who button, .lang-pills button, .shop-pill, .qr-replies button, .seg button, .final, .qchips button, .ptabs button, .pv, .starpick button";
document.addEventListener("pointerdown", (e) => {
  const el = e.target.closest(PRESSABLE);
  if (!el || REDUCED) return;
  animate(el, { scale: 0.96 }, { type: spring, stiffness: 700, damping: 32 });
  const up = () => { animate(el, { scale: 1 }, { type: spring, stiffness: 520, damping: 13 }); ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => el.removeEventListener(ev, up)); };
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => el.addEventListener(ev, up));
});
const pop = (el) => !REDUCED && el && animate(el, { opacity: [0, 1], y: [12, 0], scale: [0.96, 1] }, { type: spring, bounce: 0.3, visualDuration: 0.35 });
// phones only buzz after the person has touched the page
const buzz = (p) => { try { if (navigator.userActivation?.hasBeenActive !== false) navigator.vibrate?.(p); } catch {} };

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

function setTitle() {
  document.title = route === "landing" || (route === "c" && !CSHOP) ? "Go AI" : `${{ c: CSHOP ? M().name : "Go AI", privacy: t("pv.h"), staff: t("s.h"), login: t("au.login"), signup: t("au.signupH"), settings: t("set.h") }[route] ?? t("tab." + route)} | Go AI`;
}

/* ======================= language + shop ======================= */
function applyStatic() {
  document.documentElement.lang = zh() ? "zh-Hans" : "en";
  $$("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t, { shop: M().name })));
  $$("[data-setlang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.setlang === S.lang));
  $$("[data-m]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.m === S.m));
  $$("[data-in=shoptype]").forEach((sel) => (sel.innerHTML = Object.keys(SAMPLE).map((k) => `<option value="${k}" ${k === S.m ? "selected" : ""}>${t("m." + k)}</option>`).join("")));
  $$("[data-shopname]").forEach((b) => { const u = SHOP?.logoAt ? `/api/s/${SHOP.slug}/logo?v=${SHOP.logoAt}` : ""; b.innerHTML = (u ? `<img src="${u}" alt="">` : "") + esc(SHOP?.name || ""); b.classList.toggle("has-logo", !!u); });
  $$(".app-btn .lg").forEach((b) => (b.textContent = t(SHOP ? "nav.open" : "nav.login")));
  $$(".app-btn .sm").forEach((b) => (b.textContent = SHOP ? "App" : t("nav.login")));
  // the sign says it big in the page's language and small in the other one, like a real shop signboard
  // ｜ marks where a Chinese line may break; each piece stays whole
  $$("[data-hero=big]").forEach((el) => { el.innerHTML = t("hero.big").split("｜").map((x) => `<span>${esc(x)}</span>`).join(""); el.lang = zh() ? "zh-Hans" : "en"; });
  $$("[data-hero=small]").forEach((el) => { el.textContent = T["hero.big"][zh() ? 0 : 1].replace(/[｜]/g, "").replace(/[.。]$/, ""); el.lang = zh() ? "en" : "zh-Hans"; });
  $$("[data-powers]").forEach((ul) => (ul.innerHTML = ["pw.1", "pw.2", "pw.3", "pw.4"].map((k) => `<li>${seal(22)}<span>${t(k)}</span></li>`).join("")));
  // every platform the posts go to, as the marks people know
  $$("[data-signplats]").forEach((el) => { el.innerHTML = PLAT_ORDER.map((p) => plat(p, 40)).join(""); el.setAttribute("role", "img"); el.setAttribute("aria-label", t("hero.plats", { list: PLAT_ORDER.map(pname).join(", ") })); });
  $$("[data-ph]").forEach((el) => (el.placeholder = t(el.dataset.ph)));
  $$("[data-tl]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.tl)));
  document.documentElement.style.setProperty("--mc", M().brand || M().color);
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
// the landing page's example: café or pet shop
function setShop(id) {
  if (!SAMPLE[id] || id === S.m) return;
  S.m = id; save();
  applyStatic(); refresh();
}

/* ======================= landing ======================= */
let landingBuilt = false;
const sampleInput = () => ({ m: M(), items: [0], vibes: Object.keys(M().vibes).slice(0, 2), with: Object.keys(M().with)[1], stars: 5 });
// the shop window: one photo as a post for six platforms, each at its own size, in a different look
const WIN = [["xhs", "cover", "xhs"], ["ig", "feed", "premium"], ["tiktok", "story", "fun"], ["fb", "feed", "clean"], ["lemon8", "cover", "kopitiam"], ["wa", "story", "neon"]];
const winHTML = () => WIN.map(([p, sz], i) => { const [w, h] = SIZES[sz]; return `<div class="wtile" style="--r:${i % 2 ? 3 : -3}deg"><canvas data-win="${p}" width="${w / 3}" height="${h / 3}"></canvas><p class="wcap">${plat(p, 20)}<span>${esc(pname(p))}</span></p></div>`; }).join("");
async function paintLanding() {
  const m = M(), o = await lookOpts(true), cv = { ...coverOf(o), star: "" }, wn = $("[data-window]");
  if (wn.dataset.lang !== S.lang) { wn.innerHTML = winHTML(); wn.dataset.lang = S.lang; }
  $(".source img").src = m.photo;
  await Promise.all(WIN.map(([p, sz, look]) => { const [w, h] = SIZES[sz]; return paint($(`[data-win=${p}]`, wn), w / 3, h / 3, look === "xhs" ? themeFn("xhs") : LOOKS[look], look === "xhs" ? cv : o); }));
  $("[data-why]").innerHTML = `<div class="why-row"><span></span><span>${t("why.col1")}</span><span>${seal(22)}${t("why.col2")}</span></div>`
    + [...WHY, WHY_PRICE].map(([a, b, c], i) => `<div class="why-row ${i === WHY.length ? "price" : ""}"><span>${L(a)}</span><span class="them" data-l="${esc(t("why.col1"))}">${L(b)}</span><span class="us">${L(c)}</span></div>`).join("");
  paintPlans();
  // how it works, drawn with the same example shop
  paint($(".sv-poster"), 432, 540, LOOKS.menu, o);
  const ci = await loadImg(previewShop().cust), xp = writePost("xhs", S.lang, sampleInput());
  paint($(".sv-phone canvas"), 432, 768, themeFn("xhs"), { img: ci, m, title: xp.title });
  $("[data-svmarks]").innerHTML = ["xhs", "ig", "tiktok", "google", "wa"].map((p) => plat(p, 17)).join("");
  $(".sv-pass .pass-name").textContent = t("mb.club", { shop: m.name });
  $(".sv-pass .pass-rew").textContent = L(m.reward);
  $(".sv-pass .pstamps").outerHTML = stampsHTML(Math.min(m.goal - 1, 5), m.goal);
  $(".sv-card .v-off").textContent = L(m.off);
  const now = new Date(), bars = spread(186, monthDays(now.getFullYear(), now.getMonth(), Math.max(7, now.getDate())), 11, 1.9), mx = Math.max(...bars);
  $(".mini-bars").innerHTML = bars.map((v) => `<i style="--v:${Math.round((v / mx) * 100)}%"></i>`).join("");
}
// the one orchestrated moment: the sign's words settle, the photo is stamped, and it deals into the window as six posts
function buildLanding() {
  landingBuilt = true;
  document.documentElement.classList.remove("pre");
  if (REDUCED) return;
  const sb = $(".source").getBoundingClientRect(), sx = sb.left + sb.width / 2, sy = sb.top + sb.height / 2;
  const from = (el) => { const b = el.getBoundingClientRect(); return [sx - (b.left + b.width / 2), sy - (b.top + b.height / 2)]; };
  gsap.timeline({ delay: 0.05 })
    .from(".sb-big, .sb-small", { yPercent: 35, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 })
    .from(".powers li, .sign .hero-cta", { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.06 }, 0.35)
    .from(".sign-plats .pl", { scale: 0.3, autoAlpha: 0, duration: 0.4, ease: "back.out(2.2)", stagger: 0.05 }, 0.55)
    .from(".source", { y: -70, rotation: -16, autoAlpha: 0, duration: 0.65, ease: "back.out(1.4)" }, 0.3)
    .from(".src-seal", { scale: 2.6, rotation: -28, autoAlpha: 0, duration: 0.42, ease: "back.out(2.2)", onComplete: () => buzz(12) }, 0.85)
    .from(".wtile", { x: (i, el) => from(el)[0], y: (i, el) => from(el)[1], scale: 0.25, rotation: (i) => (i % 2 ? 10 : -10), autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.07 }, 1.15)
    .from(".yours", { autoAlpha: 0, y: 12, duration: 0.5 }, 1.7);
}

/* ======================= owner app ======================= */
const C = { imgs: [], srcs: [], layout: "grid", font: "brand", badge: "", badgeText: "", badgeStyle: "stamp", badgeAt: "auto", logoOn: true, img: null, src: "", look: "clean", item: "", price: "", phase: "pick", size: "feed", cap: 0, capLang: null, capText: "", secs: 0, typed: false, saved: null, work: null, fix: "natural", fx: 0.5, fy: 0.5, zoom: 1, colour: "brand" };
// the photo every poster is drawn from: light and colour fixed at the owner's level, framed where they dragged it
/* ---- several photos become one: a square collage with thin white gutters ---- */
const MAX_PHOTOS = 6, LAYOUTS = ["grid", "big", "strip"];
// each photo's cell as [x, y, w, h] fractions of the box: laid out for an upright box, and turned on its side for a wide one
function cells(n, layout, ar = 1) {
  let out;
  if (n < 2) out = [[0, 0, 1, 1]];
  else if (layout === "strip") out = Array.from({ length: n }, (_, i) => [0, i / n, 1, 1 / n]);
  else if (layout === "big") out = [[0, 0, 1, 0.62], ...Array.from({ length: n - 1 }, (_, i) => [i / (n - 1), 0.62, 1 / (n - 1), 0.38])];
  else { const rows = { 2: [1, 1], 3: [1, 2], 4: [2, 2], 5: [2, 3], 6: [2, 2, 2] }[n]; out = rows.flatMap((k, r) => Array.from({ length: k }, (_, i) => [i / k, r / rows.length, 1 / k, 1 / rows.length])); }
  return ar > 1.05 ? out.map(([x, y, w, h]) => [y, x, h, w]) : out;
}
function drawCollage(ctx, { imgs, layout }, x, y, w, h) {
  const g = Math.min(w, h) * 0.014;
  ctx.save(); ctx.fillStyle = "#fff"; ctx.fillRect(x, y, w, h);
  cells(imgs.length, layout, w / h).forEach(([cx, cy, cw, ch], i) => {
    const px = x + cx * w + g / 2, py = y + cy * h + g / 2, pw = cw * w - g, ph = ch * h - g;
    ctx.save(); ctx.beginPath(); ctx.rect(px, py, pw, ph); ctx.clip(); cover(ctx, imgs[i], px, py, pw, ph); ctx.restore(); // each photo stays in its own cell
  });
  ctx.restore();
}
// a square of the photos for the "before" picture and for reading colours; every poster redraws them to fit its own box
function combine(imgs, layout = "grid", S = 1600) {
  const c = document.createElement("canvas");
  c.width = c.height = S; drawCollage(c.getContext("2d"), { imgs, layout }, 0, 0, S, S);
  c.collage = { imgs, layout };
  return c;
}
// photos for a collage are shrunk first: no cell is bigger than this, and the light fix runs faster
const shrink = (img, max = 1400) => { const k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); return c; };
// the poster's photo: one photo as it is, or several combined. Each photo gets its own light fix before they are put together.
function setPhotos() { const many = C.imgs.length > 1; C.img = many ? combine(C.imgs, C.layout) : C.imgs[0]; C.src = many ? C.img.toDataURL("image/jpeg", 0.85) : C.srcs[0]; workImg(); }
function workImg() { C.work = C.imgs.length > 1 ? combine(C.imgs.map((i) => enhance(i, C.fix)), C.layout) : enhance(C.img, C.fix); C.work.framing = { x: C.fx, y: C.fy, z: C.zoom }; }
// the report screen: sel is null for the month list, a month offset (0 = this month, -1 = last), or "all"; RD is what is shown
const R = { sel: null, fresh: false, months: null };
let RD = null;
// a good time to post: 7:30 pm, tomorrow if today's slot is under 30 minutes away
function bestTime() { const d = new Date(); d.setHours(19, 30, 0, 0); if (d - Date.now() < 30 * 60e3) d.setDate(d.getDate() + 1); return d.getTime(); }
const clock = (ms) => new Intl.DateTimeFormat(loc(), { hour: "numeric", minute: "2-digit" }).format(ms);
const whenTxt = (ms) => t(new Date(ms).toDateString() === new Date().toDateString() ? "sc.today" : "sc.tmr", { time: clock(ms) });
const PLAT_SIZE = { fb: "feed", ig: "feed", threads: "feed", xhs: "cover", lemon8: "cover", tiktok: "story", wa: "story" };
const RATIO = { feed: "4:5", cover: "3:4", story: "9:16" };
const OWN_PLATS = ["fb", "ig", "xhs", "tiktok", "threads", "lemon8", "wa"];
// the owner's own photo; the landing page draws with the example shop's photo
async function lookOpts(sample = false) {
  const m = M();
  if (sample || !C.img) { const s = previewShop(); return { img: await loadImg(s.photo), magicImg: s.magic ? await loadImg(s.magic) : null, m, item: shopModel(s).item[zh() ? 1 : 0], price: s.price }; }
  const logo = m.logoUrl ? await loadImg(m.logoUrl).catch(() => null) : null;
  const brand = C.colour === "photo" ? "" : C.colour === "brand" ? m.brand || "" : C.colour, text = C.badge === "custom" ? C.badgeText.trim() : C.badge ? T["bg." + C.badge][zh() ? 1 : 0] : "";
  const font = C.font === "look" ? "" : C.font === "brand" ? m.font : C.font;
  return { img: C.work || C.img, magicImg: null, m, item: C.item, price: C.price, brand, font, logo: C.logoOn ? logo : null, badge: text ? { text, style: C.badgeStyle, at: C.badgeAt } : null };
}
const coverOf = (o) => ({ img: o.magicImg || o.img, m: o.m, title: o.item || o.m.name, sub: [o.m.name, o.price].filter(Boolean).join(" ") });
// Xiaohongshu and Lemon8 get the stroked-title cover people expect there; the rest use the chosen look
async function paintPlat(canvas, p, k = 1) {
  const sz = PLAT_SIZE[p], [w, h] = SIZES[sz], o = await lookOpts();
  return paint(canvas, w * k, h * k, sz === "cover" ? themeFn("xhs") : LOOKS[C.look], sz === "cover" ? coverOf(o) : o);
}
function weekPlan() {
  const looks = ["fun", "polaroid", "premium", "kopitiam", "split", "neon", "clean"], out = [];
  for (let i = 1; i <= 7; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    const weekend = d.getDay() % 6 === 0;
    d.setHours(weekend ? 10 : i % 2 ? 12 : 19, weekend ? 0 : 30, 0, 0);
    out.push({ d, look: looks[i - 1] });
  }
  return out;
}
const MP = { off: new Set() }; // days the owner unticked, by date
const MP_WEEKEND = ["polaroid", "fun", "split", "kopitiam"]; // a different look each Saturday
const MP_KIND = { fest: [9, 0, "festive"], soon: [19, 30, ""], payday: [12, 30, "premium"], month: [12, 0, "clean"], weekend: [10, 0, "polaroid"] };
function monthPlan(now = new Date()) {
  const day0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()), end = day0.getTime() + 30 * 864e5, out = new Map(), rank = Object.keys(MP_KIND);
  const add = (d, kind, fest = "") => {
    const key = isoDay(d), had = out.get(key);
    if (d <= day0 || d.getTime() > end || (had && rank.indexOf(had.kind) <= rank.indexOf(kind))) return;
    const [h, mi, look] = MP_KIND[kind], at = new Date(d); at.setHours(h, mi, 0, 0);
    out.set(key, { key, kind, fest, look: kind === "weekend" ? MP_WEEKEND[Math.floor((d - day0) / 6048e5) % 4] : look, notice: kind === "soon", d: at, title: t("mp.k." + kind, { fest: fest && t("fest." + fest) }), idea: t("mp.i." + kind) });
  };
  for (const [id, ms] of festList(day0.getFullYear())) { const f = new Date(ms); add(f, "fest", id); f.setDate(f.getDate() - 7); add(f, "soon", id); }
  for (let i = 1; i <= 30; i++) {
    const d = new Date(day0); d.setDate(d.getDate() + i);
    const pay = new Date(d.getFullYear(), d.getMonth(), 25); while (pay.getDay() % 6 === 0) pay.setDate(pay.getDate() - 1);
    if (d.getDate() === pay.getDate()) add(d, "payday");
    if (d.getDate() === 1) add(d, "month");
    if (d.getDay() === 6) add(d, "weekend");
  }
  return [...out.values()].sort((a, b) => a.d - b.d);
}
// a calendar file: opens in Google Calendar, Apple Calendar or Outlook, no account needed
function icsFile(events, name) {
  const z = (ms) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const e1 = (x) => String(x).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => "\\" + c);
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Go AI//EN",
    ...events.flatMap((e, i) => ["BEGIN:VEVENT", `UID:${e.at}-${i}@goai`, `DTSTAMP:${z(Date.now())}`, `DTSTART:${z(e.at)}`, `DTEND:${z(e.at + 15 * 60e3)}`, `SUMMARY:${e1(e.title)}`, `DESCRIPTION:${e1(e.text)}`, ...(e.url ? [`URL:${e.url}`] : []),
      "BEGIN:VALARM", "TRIGGER:PT0M", "ACTION:DISPLAY", `DESCRIPTION:${e1(e.title)}`, "END:VALARM", "END:VEVENT"]),
    "END:VCALENDAR"];
  download(new Blob([lines.join("\r\n")], { type: "text/calendar" }), name);
}
const jpg = async (canvas, name) => new File([await toBlob(canvas)], name, { type: "image/jpeg" });
// phones get the share sheet with every image at once; computers get downloads
async function saveFiles(files, text) {
  if (text) await copy(text);
  if (navigator.canShare?.({ files })) { try { await navigator.share({ files, text }); return true; } catch (e) { if (e.name === "AbortError") return false; } }
  for (const f of files) { download(f, f.name); await wait(400); }
  return true;
}
const hbarLabel = (p) => `${plat(p, 22)}${esc(pname(p))}`;
// rows: [labelHTML, value, sub?, titleText?]
const hbars = (rows, max) => (rows.length ? `<div class="hbars">${rows.map(([label, v, sub, title, shown]) => { const w = Math.max(2, Math.round((v / Math.max(1, max)) * 70)); return `<div class="hbar" title="${esc(title || label)}: ${v}"><span>${title ? label : esc(label)}</span><div class="track"><i class="fill" style="--v:${w}%"></i><b class="val" style="--v:${w}%">${shown ?? v}${sub ? `<small>${esc(sub)}</small>` : ""}</b></div></div>`; }).join("")}</div>` : `<p class="muted">${t("ch.none")}</p>`);
const platBars = () => { const rows = sorted(repOf()?.byPlat).filter(([p]) => PLATS[p]); return hbars(rows.map(([p, v]) => [hbarLabel(p), v, "", pname(p)]), rows[0]?.[1]); };
const lovedBars = () => { const m = M(), rows = sorted(repOf()?.loved).filter(([k]) => m.vibes[k]); return hbars(rows.map(([k, v]) => [L(m.vibes[k].chip), v]), rows[0]?.[1]); };
const styleBars = () => { const rows = sorted(repOf()?.styles).filter(([k]) => THEMES.some(([id]) => id === k)); return hbars(rows.map(([k, v]) => [sname(k), v]), rows[0]?.[1]); };
function weekdayPanel(list) {
  const n = Array(7).fill(0);
  for (const r of list) { const s0 = new Date(r.start); r.daily.returns.forEach((v, i) => (n[new Date(s0.getFullYear(), s0.getMonth(), i + 1).getDay()] += v)); }
  if (n.reduce((a, b) => a + b, 0) < 20) return "";
  const order = [1, 2, 3, 4, 5, 6, 0], wf = new Intl.DateTimeFormat(loc(), { weekday: "long" }), name = (d) => wf.format(new Date(2026, 1, 1 + d)); // 1 Feb 2026 was a Sunday
  const top = order.reduce((a, b) => (n[b] > n[a] ? b : a));
  return `<div class="panel"><h2 class="t-h4">${t("ch.week")}</h2><p class="fine" style="margin:2px 0 12px">${t("ch.weekS", { d: name(top) })}</p>${hbars(order.map((d) => [name(d), n[d]]), n[top])}</div>`;
}
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
// the weekday with the most customer posts, once there are enough to say
function busiestDay(r) {
  const by = Array(7).fill(0), s0 = new Date(r.start);
  r.daily.writes.forEach((v, i) => (by[new Date(s0.getFullYear(), s0.getMonth(), i + 1).getDay()] += v));
  const total = by.reduce((a, b) => a + b, 0), top = by.indexOf(Math.max(...by));
  return total >= 8 ? new Intl.DateTimeFormat(loc(), { weekday: "long" }).format(new Date(2026, 0, 4 + top)) : "";
}
function nextSteps(r) {
  const out = [], top = sorted(r.styles)[0], day = busiestDay(r);
  if (!r.scans) out.push(t("nx.qr"));
  if (REP?.quietReach) out.push(t("nx.quiet", { n: REP.quietReach }));
  if (top) out.push(t("nx.style", { s: sname(top[0]) }));
  if (day) out.push(t("nx.day", { d: day }));
  return out.length ? out : [t("nx.keep")];
}
const rwIdeas = (field, list) => `<div class="tc-pick" role="group" aria-label="${t("rw.ideas")}">${list.map((x) => `<button type="button" class="tc-sw" data-act="rwPick" data-f="${field}" data-v="${esc(x)}">${esc(x)}</button>`).join("")}</div>`;
const typeRadios = (v) => Object.keys(TYPES).map((k) => `<label><input type="radio" name="type" value="${k}" ${v === k ? "checked" : ""}>${t("m." + k)}</label>`).join("");
const langPills = () => `<div class="lang-pills" role="group" aria-label="Language"><button data-setlang="en" aria-pressed="${!zh()}">EN</button><button data-setlang="zh" aria-pressed="${zh()}">中文</button></div>`;
const chev = `<span class="chev" aria-hidden="true">›</span>`;

// the next thing to set up, ticked off from what really happened; gone once everything is done
function nextStepHTML() {
  const r = REP, steps = [
    ["items", SHOP.items.length > 1, "#/settings"], ["pin", SHOP.hasPin, "#/settings"], ["qr", r?.all.scans > 0, "#/share"],
    ["post", r?.all.posters > 0, "#/create"], ["member", r?.members > 0, "#/share"], ["review", !!SHOP.reviewUrl, "#/settings"],
  ], done = steps.filter((x) => x[1]).length, next = steps.find((x) => !x[1]);
  if (!next) return "";
  return `<a class="row-link next-step" href="${next[2]}"><span class="meter" style="--v:${Math.round((done / steps.length) * 100)}%"><i>${done}/${steps.length}</i></span><span class="txt"><b>${t("hm.next", { s: t("gs." + next[0]) })}</b><small>${t(`gs.${next[0]}S`)}</small></span>${chev}</a>`;
}
// one-tap ideas for each reward; the owner can change the words after
const RW_PRIZE = [["1 free drink", "免费饮料一杯"], ["1 free dessert", "免费甜点一份"], ["RM10 off", "减 RM10"], ["20% off your bill", "全单 8 折"], ["a free upsize", "免费升级大份"], ["a free add-on", "免费加一项"]];
const RW_OFFER = [["RM5 off your next visit", "下次来店减 RM5"], ["10% off your next visit", "下次来店 9 折"], ["A free drink with any meal", "点餐送饮料一杯"], ["A free topping or add-on", "免费加料一份"], ["Buy 1 free 1 this week", "本周买一送一"]];
const RW_BDAY = [["A free drink", "一杯免费饮料"], ["A free slice of cake", "一块免费蛋糕"], ["A free dessert", "一份免费甜点"], ["RM10 off your bill", "全单减 RM10"], ["15% off your bill", "全单 85 折"]];
const BRANDS = ['#C8161D', '#E0201B', '#F08A24', '#E9B52F', '#1E6B4F', '#2F7D4A', '#0B4F6C', '#1F2A44', '#5B2A86', '#8C2155', '#7A4A1E', '#18181F'];
// the print kit: width and height in mm, and how many print on one A4 sheet
const KIT_FMT = { table: [100, 140, 1], sticker: [60, 60, 12], card: [90, 54, 10], a5: [148, 210, 1], a4: [210, 297, 1] };
const KIT_HEADS = ["kh.1", "kh.2", "kh.3", "kh.4", "kh.5"];
// the owner's choices, kept on this phone like the table card design was
const kit = () => (S.kit = { fmt: "table", design: TENTS.includes(S.tent) ? S.tent : "classic", head: "kh.1", custom: "", logo: true, name: true, reward: true, plats: true, info: false, lang: S.lang, ...(S.kit || {}) });
let qrCache = ["", ""];
const qrURL = () => { const u = custUrl(); if (qrCache[0] !== u) { const c = document.createElement("canvas"); drawQR(c, u, INK); qrCache = [u, c.toDataURL()]; } return qrCache[1]; };
// one printed piece as HTML: the same card in every size, laid out for its shape
function kitCard(m, k) {
  const pick = (pair) => (k.lang === "both" ? [...new Set([pair[1], pair[0]])] : [pair[k.lang === "zh" ? 1 : 0]]);
  const head = k.head === "custom" && k.custom.trim() ? [k.custom.trim()] : pick(T[k.head === "custom" ? "kh.4" : k.head]);
  const fest = nextFest().id, vars = `--fb:${FEST[fest].bg};--fg:${FEST[fest].gold}`, name = esc(m.name), qr = `<img class="kit-qr" src="${qrURL()}" alt="QR code">`;
  const h = `<b class="kit-h">${esc(head[0])}</b>${head[1] ? `<small class="kit-h2">${esc(head[1])}</small>` : ""}`;
  const logo = k.logo && m.logoUrl ? `<img class="tent-logo" src="${esc(m.logoUrl)}" alt="">` : "", rew = pick(m.reward).map(esc).join("<br>");
  if (k.fmt === "sticker") return `<div class="tent kit f-sticker t-${k.design}" style="${vars}">${h}${qr}<span class="kit-name">${name}</span></div>`;
  if (k.fmt === "card") return `<div class="tent kit f-card t-${k.design}" style="${vars}"><div class="kit-txt">${logo}<span class="kit-name">${name}</span>${h}${k.reward ? `<p class="kit-rew">${rew}</p>` : ""}</div>${qr}</div>`;
  const info = k.info ? [m.address, ...hoursRows(m.hours).map(([d, x]) => `${d} ${x}`)].filter(Boolean) : [];
  return `<div class="tent kit f-${k.fmt} t-${k.design}" style="${vars}"><div class="tent-top">${logo}${k.design === "festive" ? `<i class="tent-fest">${esc(pick(T["fg." + fest])[0])}</i>` : ""}${k.name ? `<span>${name}</span>` : ""}${h}</div>${qr}
    ${k.plats ? `<div class="ready-row">${PLAT_ORDER.map((p) => plat(p, 28, true)).join("")}</div>` : ""}${k.reward ? `<p class="tent-foot">${pick(T["sh.join"]).map(esc).join("<br>")}<b>${rew}</b></p>` : ""}${info.length ? `<p class="kit-info">${info.map(esc).join("<br>")}</p>` : ""}</div>`;
}
// the preview shrinks a card to fit the phone; print is always true size
function fitKit() {
  const st = $(".kit-stage"), f = $(".kit-fit");
  if (!st || !f) return;
  f.style.zoom = 1;
  f.style.zoom = Math.min(1, (st.clientWidth - 4) / f.firstElementChild.getBoundingClientRect().width);
}
const TENTS = ["classic", "seal", "kopitiam", "night", "sunny", "minimal", "pandan", "festive"];
const VIEWS = {
  home() {
    const m = M(), v = REP?.this, q = REP?.quietReach ?? 0;
    return `
    <div class="shopsign"${m.brand && lumOf(hexRgb(m.brand)) < 0.3 ? ` style="--sg:${m.brand}"` : ""}>${m.logoUrl ? `<img src="${esc(m.logoUrl)}" alt="">` : ""}<div><p>${t("pc.hi", { name: esc(L(m.owner)) })}</p><h1>${esc(m.name)}</h1><span>${esc(L(m.city))}</span></div>
      <div class="ss-acts"><label class="ss-btn">${IC.create}${t(m.logoUrl ? "br.logoNew" : "br.logo")}<input type="file" accept="image/png,image/jpeg,image/webp" data-file="logo" class="sr-only"></label><button class="ss-btn" data-act="fontSheet"><b aria-hidden="true">Aa</b>${t("fn.h")}</button></div></div>
    <label class="snap"><span class="cam" aria-hidden="true">${IC.create}</span><b>${t("hm.snap")}</b><span>${t("hm.snapS", { n: OWN_PLATS.length })}</span><span class="plats" aria-hidden="true">${OWN_PLATS.map((p) => plat(p, 30)).join("")}</span><input type="file" accept="image/*" multiple data-file="owner" class="sr-only"></label>
    <section><div class="mstats-h"><h2 class="t-h4">${t("st.month")}</h2><a href="#/report">${t("hm.all")}</a></div>
      <div class="mstats"><div class="mstat money"><b>${rm(v?.spend ?? 0)}</b><span>${t("hm.spent")}</span></div><div class="mstat"><b>${(v?.writes ?? 0) + (v?.posters ?? 0)}</b><span>${t("hm.posts")}</span></div><div class="mstat"><b>${v?.joins ?? 0}</b><span>${t("hm.joins")}</span></div></div></section>
    ${q ? `<div class="nudge"><p>${t("home.nudge", { n: q, d: m.quietDays })}</p><button class="btn btn-dark" data-act="offers">${t("home.nudgeBtn")}</button></div>` : ""}
    ${nextStepHTML()}
    <a class="row-link" href="#/staff"><span class="ic">${IC.stamp}</span><span class="txt"><b>${t("mb.staff")}</b><small>${t("home.staffS")}</small></span>${chev}</a>`;
  },
  create() {
    const m = M();
    if (C.phase === "week") {
      const plan = weekPlan(), df = new Intl.DateTimeFormat(loc(), { weekday: "short", day: "numeric", month: "short" }), tf = new Intl.DateTimeFormat(loc(), { hour: "numeric", minute: "2-digit" });
      return `
      <div class="result-h"><span class="res-seal" data-seal="56"></span><div><h1 class="t-h1">${t("wk.h")}</h1><p class="muted">${t("wk.s")}</p></div></div>
      <div class="week">${plan.map((p, i) => `<div class="day"><canvas data-day="${i}" data-look="${p.look}"></canvas><b>${df.format(p.d)}</b><small>${tf.format(p.d)} · ${sname(p.look)}</small><small class="cap">${esc(ownerCaption(p.look, S.lang, i).split("\n")[1])}</small></div>`).join("")}
        <div class="day saved"><canvas data-day="saved" data-look="festive"></canvas><b>${t("wk.saved", { f: t("fest." + nextFest().id) })}</b><small>${sname("festive")}</small></div></div>
      <button class="btn btn-seal btn-xl" data-act="weekSave">${SVG.down}${t("wk.saveAll")}</button>
      <button class="btn btn-dark btn-w" data-act="weekCal">${t("wk.cal")}</button>
      <button class="btn btn-white btn-w" data-act="weekBack">${t("wk.back")}</button>
      <p style="text-align:center"><button class="link" data-act="ownerReset">${t("cr.new")}</button></p>`;
    }
    if (C.phase === "month") {
      const plan = monthPlan(), on = plan.filter((p) => !MP.off.has(p.key)).length, f = (o) => new Intl.DateTimeFormat(loc(), o);
      return `
      <h1 class="t-h1">${t("mp.h")}</h1>
      <p class="muted">${t("mp.s")}</p>
      <ol class="mplan">${plan.map((p) => `<li class="mp-${p.kind}">
        <input type="checkbox" data-mp="${p.key}" ${MP.off.has(p.key) ? "" : "checked"} aria-label="${t("mp.pick", { d: f({ weekday: "long", day: "numeric", month: "long" }).format(p.d) })}">
        <time class="mp-date" datetime="${p.key}"><small>${f({ weekday: "short" }).format(p.d)}</small><b>${p.d.getDate()}</b><small>${f({ month: "short" }).format(p.d)}</small></time>
        <div class="mp-txt"><b>${esc(p.title)}</b><span>${esc(p.idea)}</span><span class="mp-foot"><small>${p.kind === "fest" ? clock(p.d) : t("mp.at", { time: clock(p.d), look: p.notice ? t("mp.noticeL") : sname(p.look) })}</small>
          <button class="link" data-act="mpMake" data-key="${p.key}">${t("mp.make")}</button></span></div></li>`).join("")}</ol>
      <button class="btn btn-seal btn-xl" data-act="mpCal" ${on ? "" : "disabled"}>${t("mp.cal", { n: on })}</button>
      <p style="text-align:center"><button class="link" data-act="ownerReset">${t("mp.back")}</button></p>`;
    }
    if (C.phase === "nform") {
      const fld = (k, type = "text", extra = "") => `<label class="fld">${t("nt." + k + "L")}<input data-in="n.${k}" type="${type}" value="${esc(N[k])}" ${extra}></label>`;
      const body = {
        closed: `${fld("reason", "text", 'maxlength="30"')}<div class="fields">${fld("from", "date")}${fld("to", "date")}</div>${fld("back", "date")}`,
        hours: `${N.rows.map(([d, h], i) => `<div class="fields"><label class="fld">${t("nt.daysL")}<input data-in="n.row" data-r="${i}" data-c="0" value="${esc(d)}" maxlength="24" placeholder="${i ? "" : t("nt.daysPh")}"></label><label class="fld">${t("nt.timeL")}<input data-in="n.row" data-r="${i}" data-c="1" value="${esc(h)}" maxlength="24" placeholder="${i ? "" : t("nt.timePh")}"></label></div>`).join("")}${fld("start", "date")}`,
        promo: `${fld("promo", "text", `maxlength="30" placeholder="${t("nt.promoPh")}"`)}${fld("item", "text", 'maxlength="30" list="menu-items"')}${fld("until", "date")}${fld("terms", "text", `maxlength="60" placeholder="${t("nt.termsPh")}"`)}`,
        menu: `${fld("title", "text", `maxlength="30" placeholder="${t("nt.menuT")}"`)}<p class="fine">${t("nt.menuS")}</p>
          <ul class="mitems">${N.menu.map((x, i) => `<li><label class="check"><input type="checkbox" data-in="n.mon" data-i="${i}" ${x.on ? "checked" : ""}>${esc(L(x.name))}</label><input data-in="n.mprice" data-i="${i}" value="${esc(x.price)}" maxlength="14" placeholder="RM" aria-label="${t("nt.priceL")} ${esc(L(x.name))}" inputmode="decimal"></li>`).join("")}</ul>
          <label class="fld">${t("nt.menuNote")}<input data-in="n.mnote" value="${esc(N.mnote)}" maxlength="50" placeholder="${t("nt.menuNotePh")}"></label>`,
        hiring: `${fld("role", "text", `maxlength="30" placeholder="${t("nt.rolePh")}"`)}<div class="fld"><span id="job-l">${t("nt.jobL")}</span><div class="seg seg-s" role="group" aria-labelledby="job-l">${["full", "part"].map((v) => `<button data-act="nset" data-k="job" data-v="${v}" aria-pressed="${N.job === v}">${t("nt.job." + v)}</button>`).join("")}</div></div>${fld("contact", "tel", 'maxlength="16" placeholder="012-345 6789"')}${fld("note", "text", `maxlength="40" placeholder="${t("nt.notePh")}"`)}`,
      }[N.kind];
      const segs = (k, list, label) => `<div class="fld"><span id="${k}-l">${label}</span><div class="seg seg-s" role="group" aria-labelledby="${k}-l">${list.map(([v, txt]) => `<button data-act="nset" data-k="${k}" data-v="${v}" aria-pressed="${N[k] === v}">${txt}</button>`).join("")}</div></div>`;
      return `
      <h1 class="t-h1">${t("nt.make")}</h1>
      <div class="nkinds" role="group" aria-label="${t("nt.kind")}">${NOTICE_KINDS.map((k) => `<button data-act="nkind" data-k="${k}" aria-pressed="${N.kind === k}">${t("nt.k." + k)}</button>`).join("")}</div>
      <div class="ngrid">
        <canvas class="npv" data-npv width="432" height="540" role="img" aria-label="${t("nt.pv")}"></canvas>
        <div class="nfields">${body}
          ${segs("look", NOTICE_LOOKS.map((v) => [v, t("nt.d." + v)]), t("nt.design"))}
          ${segs("lang", [["en", "EN"], ["zh", "中文"]], t("nt.langL"))}
        </div>
      </div>
      <datalist id="menu-items">${m.menu.map((x) => `<option value="${esc(L(x))}"></option>`).join("")}</datalist>
      <button class="btn btn-seal btn-xl" data-act="nmake">${t("nt.go")}</button>
      <p style="text-align:center"><button class="link" data-act="ownerReset">${t("cr.new")}</button></p>`;
    }
    if (C.phase === "ndone") return `
      <div class="result-h"><span class="res-seal" data-seal="56"></span><div><h1 class="t-h1">${t("nt.done")}</h1><p class="muted">${t("nt.doneS")}</p></div></div>
      <div class="panel">
        <div class="pvs">${NOTICE_PLATS.map((p) => { const [w, h] = SIZES[NOTICE_SIZE[p]]; return `<label class="pv"><canvas data-npl="${p}" width="${w / 3}" height="${h / 3}"></canvas><span class="pv-name"><input type="checkbox" data-npt="${p}" checked>${plat(p, 22)}${esc(pname(p))}</span><small>${RATIO[NOTICE_SIZE[p]]}</small></label>`; }).join("")}</div>
        <div class="cap-head"><h3 class="t-h5">${t("cr.cap")}</h3></div>
        <label class="fld"><textarea data-in="ncap" rows="6" aria-label="${t("cr.cap")}">${esc(N.cap)}</textarea></label>
        <button class="btn btn-seal btn-w" data-act="nsave">${SVG.down}${t("po.go", { n: NOTICE_PLATS.length })}</button>
      </div>
      <div class="btn-row"><button class="btn btn-white" data-act="nedit">${t("nt.edit")}</button><button class="btn btn-white" data-act="ownerReset">${t("cr.new")}</button></div>`;
    if (C.phase === "pick" || !C.img) return `
      <h1 class="t-h1">${t("cr.h")}</h1>
      <label class="drop"><span class="ic">${IC.create}</span><b>${t("cr.drop")}</b><span class="muted">${t("cr.dropS")}</span><input type="file" accept="image/*" multiple data-file="owner" class="sr-only"></label>
      <p class="or">${t("nt.or")}</p>
      <button class="row-link notice-cta" data-act="nstart"><span class="ic">${IC.notice}</span><span class="txt"><b>${t("nt.make")}</b><small>${t("nt.makeS")}</small></span>${chev}</button>
      <button class="row-link notice-cta" data-act="month"><span class="ic">${IC.week}</span><span class="txt"><b>${t("mp.cta")}</b><small>${t("mp.ctaS")}</small></span>${chev}</button>`;
    if (C.phase === "edit") return `
      <h1 class="t-h1">${t("cr.h")}</h1>
      <div class="framing">
        <canvas class="framer" data-framer width="480" height="600" tabindex="0" role="img" aria-label="${t("cr.frameAria")}"></canvas>
        <div class="frame-tools">
          <p class="fine">${t(C.imgs.length > 1 ? "cr.frameMany" : "cr.frame")}</p>
          <div class="fld"><span id="fix-l">${t("cr.fix")}</span><div class="seg seg-s" role="group" aria-labelledby="fix-l">${["off", "natural", "bold"].map((v) => `<button data-act="fix" data-v="${v}" aria-pressed="${C.fix === v}">${t("fix." + v)}</button>`).join("")}</div></div>
          ${C.imgs.length > 1 ? "" : `<label class="fld">${t("cr.zoom")}<input type="range" data-in="zoom" min="100" max="220" step="5" value="${Math.round(C.zoom * 100)}"></label>`}
          ${C.imgs.length > 1 ? `<div class="fld"><span id="lay-l">${t("cr.layout")}</span><div class="seg seg-s" role="group" aria-labelledby="lay-l">${LAYOUTS.map((v) => `<button data-act="layout" data-v="${v}" aria-pressed="${C.layout === v}">${t("lay." + v)}</button>`).join("")}</div></div>` : ""}
          <div class="photos">${C.srcs.map((src, i) => `<span class="ph"><img src="${esc(src)}" alt="${t("cr.photoN", { n: i + 1 })}">${C.imgs.length > 1 ? `<button data-act="photoDel" data-i="${i}" aria-label="${t("cr.photoDel", { n: i + 1 })}">×</button>` : ""}</span>`).join("")}
            ${C.imgs.length < MAX_PHOTOS ? `<label class="ph add"><span aria-hidden="true">+</span><span class="sr-only">${t("cr.addPhotos")}</span><input type="file" accept="image/*" multiple data-file="ownerAdd" class="sr-only"></label>` : ""}</div>
          <button class="btn btn-white btn-s" data-act="ownerReset">${t("cr.change")}</button>
        </div>
      </div>
      <h2 class="t-h3">${t("cr.presets")}</h2>
      <div class="tc-pick" role="group" aria-label="${t("cr.presets")}">${PRESETS.map(([id, look, badge, style]) => `<button class="tc-sw" data-act="preset" data-i="${id}" aria-pressed="${C.look === look && C.badge === badge && (!badge || C.badgeStyle === style)}">${t("pr." + id)}</button>`).join("")}</div>
      <h2 class="t-h3">${t("cr.look")}</h2>
      <div class="looks">${Object.keys(LOOKS).map((k) => `<button class="look" data-act="look" data-look="${k}" aria-pressed="${C.look === k}"><canvas data-thumb="${k}" width="288" height="360"></canvas>${sname(k)}</button>`).join("")}</div>
      <div class="fields">
        <label class="fld">${t("cr.item")}<input data-in="item" value="${esc(C.item)}" maxlength="40" placeholder="${t("cr.itemPh")}" aria-describedby="item-hint" list="menu-items" autocomplete="off"></label>
        <label class="fld">${t("cr.price")}<input data-in="price" value="${esc(C.price)}" maxlength="14" placeholder="RM 9.90"></label>
      </div>
      <datalist id="menu-items">${m.menu.map((x) => `<option value="${esc(L(x))}"></option>`).join("")}</datalist>
      <p class="hint" id="item-hint" ${C.item.trim() ? "hidden" : ""}>${t("cr.itemNeed")}</p>
      <section class="cz" aria-labelledby="cz-h"><h2 class="t-h3" id="cz-h">${t("cz.h")}</h2>
        <div class="fld"><span id="czf-l">${t("fn.h")}</span><div class="tc-pick" role="group" aria-labelledby="czf-l">${[...(m.font ? ["brand"] : []), "look", ...FONT_IDS].map((id) => `<button class="tc-sw" data-act="czSet" data-k="font" data-v="${id}" aria-pressed="${(C.font === "brand" && !m.font ? "look" : C.font) === id}"><span style="${fontStyle(id === "brand" ? m.font : id)}">${t(id === "brand" ? "fn.brand" : "fn." + id)}</span></button>`).join("")}</div></div>
        <div class="fld"><span id="czb-l">${t("cz.badge")}</span><div class="tc-pick" role="group" aria-labelledby="czb-l">${["", ...BADGES, "custom"].map((b) => `<button class="tc-sw" data-act="czSet" data-k="badge" data-v="${b}" aria-pressed="${C.badge === b}">${b === "" ? t("cz.none") : b === "custom" ? t("cz.custom") : esc(T["bg." + b][zh() ? 1 : 0])}</button>`).join("")}</div>
          ${C.badge === "custom" ? `<input class="cz-in" data-in="badgeText" value="${esc(C.badgeText)}" maxlength="24" aria-label="${t("cz.custom")}" placeholder="${t("cz.badgePh")}">` : ""}</div>
        ${C.badge ? `<div class="fields"><div class="fld"><span id="czs-l">${t("cz.style")}</span><div class="seg seg-s" role="group" aria-labelledby="czs-l">${["stamp", "tag", "ribbon"].map((v) => `<button data-act="czSet" data-k="badgeStyle" data-v="${v}" aria-pressed="${C.badgeStyle === v}">${t("cz." + v)}</button>`).join("")}</div></div>
          <div class="fld"><span id="cza-l">${t("cz.at")}</span><div class="seg seg-s cz-at" role="group" aria-labelledby="cza-l">${[["auto", t("cz.auto")], ["tl", "↖"], ["tr", "↗"], ["bl", "↙"], ["br", "↘"]].map(([v, l]) => `<button data-act="czSet" data-k="badgeAt" data-v="${v}" aria-pressed="${C.badgeAt === v}" aria-label="${t("cz." + v)}">${l}</button>`).join("")}</div></div></div>` : ""}
        <fieldset class="swatches"><legend>${t("cz.colour")}</legend>
          ${m.brand ? `<button type="button" class="sw sw-none" data-act="colour" data-v="brand" aria-pressed="${C.colour === "brand"}"><i class="sw-dot" style="background:${m.brand}"></i>${t("col.brand")}</button>` : ""}
          <button type="button" class="sw sw-none" data-act="colour" data-v="photo" aria-pressed="${C.colour === "photo" || (!m.brand && C.colour === "brand")}">${t("col.photo")}</button>
          ${BRANDS.map((c) => `<button type="button" class="sw" data-act="colour" data-v="${c}" aria-pressed="${C.colour === c}" aria-label="${c}"><i style="background:${c}"></i></button>`).join("")}</fieldset>
        ${m.logoUrl ? `<label class="check"><input type="checkbox" data-cz="logoOn" ${C.logoOn ? "checked" : ""}>${t("cz.logo")}</label>` : ""}
      </section>
      <button class="btn btn-seal btn-xl" data-act="make" ${C.item.trim() ? "" : "disabled"}>${t("cr.go")}</button>`;
    const cl = C.capLang || S.lang, sv = C.saved;
    return `
      <div class="result-h"><span class="res-seal" data-seal="56"></span><div><h1 class="t-h1">${t("cr.done")}</h1><p class="muted">${t("cr.took", { s: C.secs })}</p></div></div>
      <div class="poster-box ${C.size}-size">${compareHTML("final", 22)}</div>
      <div class="btn-row"><button class="btn btn-white" data-act="ownerShare">${SVG.share}${t("cr.share")}</button><button class="btn btn-white" data-act="ownerSave">${SVG.down}${t("cr.save")}</button></div>
      <div class="panel">
        <div class="panel-head"><h2 class="t-h4">${t("po.h")}</h2></div>
        <p class="muted pv-s">${t("po.s")}</p>
        <div class="pvs">${OWN_PLATS.map((p) => { const [w, h] = SIZES[PLAT_SIZE[p]]; return `<label class="pv"><canvas data-pv="${p}" width="${w / 3}" height="${h / 3}"></canvas><span class="pv-name"><input type="checkbox" data-pt="${p}" ${!sv || sv.plats.includes(p) ? "checked" : ""}>${plat(p, 22)}${esc(pname(p))}</span><small>${RATIO[PLAT_SIZE[p]]}</small></label>`; }).join("")}</div>
        <div class="cap-head"><h3 class="t-h5">${t("cr.cap")}</h3><button class="link" data-act="capNext">${t("cr.another")}</button>
          <div class="seg seg-s" role="group" aria-label="${t("cr.cap")}"><button data-act="capLang" data-l="en" aria-pressed="${cl === "en"}">EN</button><button data-act="capLang" data-l="zh" aria-pressed="${cl === "zh"}">中文</button></div></div>
        <label class="fld"><textarea data-in="cap" rows="5" aria-label="${t("cr.cap")}">${C.typed ? esc(C.capText) : ""}</textarea></label>
        <button class="btn btn-seal btn-w" data-act="saveAll">${SVG.down}${t("po.go", { n: sv ? sv.plats.length : OWN_PLATS.length })}</button>
      </div>
      ${sv ? `<div class="panel after-save">
        <div class="sched-h"><span class="save-seal" data-seal="44"></span><div><h2 class="t-h3">${t("sv.h")}</h2><p class="muted">${t("sv.s")}</p></div></div>
        <div class="open-row">${sv.plats.filter((p) => p !== "wa").map((p) => `<a class="btn btn-white btn-s" href="${PLATS[p].web}" target="_blank" rel="noopener">${plat(p, 20)}${t("sv.open", { p: esc(pname(p)) })}</a>`).join("")}</div>
        <button class="btn btn-dark btn-w" data-act="remind">${t("sv.remind", { when: whenTxt(bestTime()) })}</button>
      </div>` : ""}
      <div class="autopilot"><span class="ic">${IC.week}</span><h2 class="t-h3">${t("ap.h")}</h2><p>${t("ap.s")}</p><button class="btn btn-seal" data-act="week">${t("ap.go")}</button></div>
      <p style="text-align:center"><button class="link" data-act="ownerReset">${t("cr.new")}</button></p>`;
  },
  share() {
    const m = M(), url = custUrl(), k = kit(), [, , per] = KIT_FMT[k.fmt], fest = nextFest().id;
    const chip = (key, val, label, extra = "") => `<button class="tc-sw" data-act="kitSet" data-k="${key}" data-v="${val}" aria-pressed="${k[key] === val}">${extra}${label}</button>`;
    const shows = { sticker: [], card: ["logo", "reward"] }[k.fmt] || ["logo", "name", "reward", "plats", "info"];
    return `
    <h1 class="t-h1">${t("sh.h")}</h1>
    <p class="t-lead muted">${t("sh.s")}</p>
    <div class="kit-ui no-print">
      <div class="fld"><span id="kf-l">${t("kit.size")}</span><div class="tc-pick" role="group" aria-labelledby="kf-l">${Object.keys(KIT_FMT).map((f) => chip("fmt", f, `<span class="kf"><b>${t("kf." + f)}</b><small>${t("kf." + f + "S")}</small></span>`)).join("")}</div></div></div>
    <div class="kit-stage">${k.fmt === "a4" ? `<canvas class="a4-pv" data-a4 width="1240" height="1754" role="img" aria-label="${t("a4.h")}"></canvas>` : `<div class="kit-fit">${kitCard(m, k)}</div>`}</div>
    <div class="btn-row no-print"><button class="btn btn-dark" data-act="kitPrint">${per > 1 ? t("kit.printN", { n: per }) : t("kit.print1")}</button>${k.fmt === "a4" ? `<button class="btn btn-white" data-act="a4Save">${SVG.down}${t("a4.save")}</button>` : `<a class="btn btn-seal" href="${esc(url)}" target="_blank" rel="noopener">${t("sh.open")}</a>`}</div>
    <div class="kit-ui no-print">
      ${k.fmt === "a4" ? `<p class="fine">${t("kit.a4note")}</p>` : `
      <div class="fld"><span id="kd-l">${t("kit.design")}</span><div class="tc-pick" role="group" aria-labelledby="kd-l">${TENTS.map((d) => chip("design", d, t(d === "seal" && m.brand ? "tc.brand" : "tc." + d), `<i class="tc-dot t-${d}" style="--fb:${FEST[fest].bg};--fg:${FEST[fest].gold}"></i>`)).join("")}</div></div>
      <div class="fld"><span id="kh-l">${t("kit.head")}</span><div class="tc-pick" role="group" aria-labelledby="kh-l">${[...KIT_HEADS, "custom"].map((h) => chip("head", h, h === "custom" ? t("kit.custom") : esc(T[h][zh() ? 1 : 0]))).join("")}</div>
        ${k.head === "custom" ? `<input data-in="kit.custom" value="${esc(k.custom)}" maxlength="40" aria-label="${t("kit.custom")}" placeholder="${esc(T["kh.4"][zh() ? 1 : 0])}">` : ""}</div>
      ${shows.length ? `<fieldset class="kit-show"><legend>${t("kit.show")}</legend>${shows.map((x) => `<label class="check"><input type="checkbox" data-kit="${x}" ${k[x] ? "checked" : ""}>${t("ks." + x)}</label>`).join("")}</fieldset>` : ""}
      <div class="fld"><span id="kl-l">${t("kit.lang")}</span><div class="seg seg-s" role="group" aria-labelledby="kl-l">${[["en", "EN"], ["zh", "中文"], ["both", t("kit.both")]].map(([v, l]) => `<button data-act="kitSet" data-k="lang" data-v="${v}" aria-pressed="${k.lang === v}">${l}</button>`).join("")}</div></div>`}
    </div>
    <label class="fld no-print">${t("sh.link")}<span class="link-row"><input value="${esc(url)}" readonly><button class="btn btn-white btn-s" data-act="copyLink">${t("cr.copy")}</button></span></label>
    <div class="no-print"><h2 class="t-h3">${t("sh.themes")}</h2><p class="fine" style="margin:2px 0 10px">${t("sh.themesS")}</p>
      <div class="themes" tabindex="0" role="region" aria-label="${t("sh.themes")}">${THEMES.map(([x]) => `<figure><canvas data-theme="${x}" width="360" height="450"></canvas>${sname(x)}</figure>`).join("")}</div></div>
    <a class="row-link no-print" href="#/report">${t("sh.results")}${chev}</a>`;
  },
  members() {
    const m = M(), r = REP, all = MEMBERS || [], q = all.filter(isQuietReach).length, b = all.filter(isBday).length, list = all.filter(matchMember);
    const ago = (ms) => new Intl.RelativeTimeFormat(loc(), { numeric: "auto" }).format(Math.round((ms - Date.now()) / 864e5), "day");
    return `
    <h1 class="t-h1">${t("mb.h")}</h1>
    <div class="kpis" style="grid-template-columns:repeat(3,1fr)"><div class="kpi"><b>${r?.members ?? list.length}</b><span>${t("mb.total")}</span></div><div class="kpi"><b>${r?.this.joins ?? 0}</b><span>${t("mb.new")}</span></div><div class="kpi"><b>${r?.this.redeemed ?? 0}</b><span>${t("mb.rew")}</span></div></div>
    ${q ? `<div class="nudge"><p>${t("home.nudge", { n: q, d: m.quietDays })}</p><button class="btn btn-dark" data-act="offers">${t("home.nudgeBtn")}</button></div>` : ""}
    ${b ? `<div class="nudge bday"><p>${t("bd.nudge", { n: b, have: b === 1 ? "has" : "have" })}</p><button class="btn btn-dark" data-act="bdays">${t("bd.btn")}</button></div>` : ""}
    <div class="btn-row"><a class="btn btn-seal" href="#/staff">${t("mb.staff")}</a><a class="btn btn-white" href="${esc(custUrl())}" target="_blank" rel="noopener">${t("mb.join")}</a></div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("mb.list")}</h2>
      ${all.length > 5 ? `<label class="msearch"><span class="sr-only">${t("mb.search")}</span><input type="search" data-in="msearch" value="${esc(MQ)}" placeholder="${t("mb.search")}" autocomplete="off"></label>` : ""}
      ${all.length && !list.length ? `<p class="muted">${t("mb.none")}</p>` : ""}
      ${list.length ? `<ul class="mlist">${list.map((x) => `<li><button class="mname" data-act="member" data-code="${esc(x.code)}" aria-label="${t("mb.open", { name: esc(x.name) })}"><b>${esc(x.name)}${isBday(x) ? ` <span aria-label="${t("s.bday")}">🎂</span>` : ""}</b><small>${esc(x.code)}</small></button>${x.mkt ? `<span class="zone zone-jade">${t("mb.wa")}</span>` : ""}<span class="mst">${t("c.stamps", { n: x.stamps, g: x.goal })}<small>${x.lastVisit ? t("mb.last", { d: ago(x.lastVisit) }) : t("mb.never")}</small></span></li>`).join("")}</ul>` : all.length ? "" : `<p class="muted">${t("mb.empty")}</p>`}</div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("mb.export")}</h2><div class="open-row" style="margin:0"><a class="btn btn-white btn-s" href="/api/export/members.csv" download>${SVG.down}${t("mb.exportM")}</a><a class="btn btn-white btn-s" href="/api/export/visits.csv" download>${SVG.down}${t("mb.exportV")}</a></div></div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("mb.rules")}</h2><ul class="next">
      ${[esc(L(m.reward)), `${t("rw.back")}: ${esc(L(m.off))}`, t("s.bdayT", { t: esc(L(m.bday)) }), t("mb.verify"), t("mb.window", { d: m.quietDays }), t("mb.optin")].map((x) => `<li>${seal(20)}<span>${x}</span></li>`).join("")}</ul></div>`;
  },
  report() {
    const m = M(), mf = (ms, o = { month: "long", year: "numeric" }) => new Intl.DateTimeFormat(loc(), o).format(ms);
    const top = (label, when) => `<div class="stmt-top"><b>${esc(m.name)}${m.address ? `<small>${esc(m.address)}</small>` : ""}</b><span>${label}<br>${when}</span></div>`;
    const back = `<button class="link no-print rep-back" data-act="repList">${t("rp.back")}</button>`;
    const vs = (spend, cost, label) => `<div class="vs">${[[t("rp.vsSpend"), spend, ""], [label, cost, "cost"]].map(([k, x, c]) => `<div class="vs-row ${c}"><span>${k}</span><i style="--v:${Math.max(1, Math.round((x / Math.max(spend, cost, 1)) * 100))}%"></i><b>${rm(x)}</b></div>`).join("")}</div>`;
    const kpi = (val, key, dl = "") => `<div class="kpi"><b data-v="${val}">${val}</b><span>${t(key)}</span>${dl}</div>`;
    const tv = (head, rows, open = false) => `<details class="tv" ${open ? "open" : ""}><summary>${t("ch.table")}</summary><div class="tv-scroll" tabindex="0" role="region" aria-label="${t("ch.table")}"><table><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`)).join("")}</tr>`).join("")}</tbody></table></div></details>`;
    // the list: every month since the shop joined, and the full report
    if (R.sel === null || !RD) {
      const ms = R.months || [];
      return `
      <div class="rep-head">${top(t("rp.allLabel"), ms.length ? `${mf(ms.at(-1).start)} – ${mf(ms[0].start)}` : "")}<h1 class="t-h1">${t("rp.listH")}</h1><p class="rep-sub">${t("rp.listS")}</p>
        <button class="btn btn-seal btn-xl" data-act="makeReport" data-o="all">${t("rp.full")}</button></div>
      <ol class="rmonths">${ms.map((x) => `<li><span><b>${mf(x.start)}</b><small>${t("rp.mline", { s: rm(x.spend), r: x.returns, j: x.joins })}</small></span><button class="btn btn-white btn-s" data-act="makeReport" data-o="${-x.offset}" aria-label="${t("rp.genOne")}, ${mf(x.start)}">${t("rp.genOne")}</button></li>`).join("")}</ol>`;
    }
    // every month together
    if (R.sel === "all") {
      const T0 = RD.this, ms = RD.months, n = ms.length, short = (x) => mf(x.start, { month: "short", year: "2-digit" });
      return `
      <div class="rep-head">${top(t("rp.allLabel"), `${mf(ms[0].start)} – ${mf(ms.at(-1).start)}`)}<h1 class="t-h1">${t("rp.allHead", { s: rm(T0.spend) })}</h1>
        <p class="rep-sub">${t("rp.allS", { n, r: T0.returns, j: T0.joins })}</p>
        ${vs(T0.spend, PLANS[0].mo * n, t("rp.vsPlanN", { n }))}
        <p class="rep-cav">${t("rp.cav")}</p>${back}</div>
      <div class="kpis">${kpi(T0.writes + T0.posters, "k.photos")}${kpi(T0.shares, "k.shares")}${kpi(T0.joins, "k.joins")}${kpi(T0.returns, "k.returns")}</div>
      <div class="rep-grid">
      <div class="panel span2"><h2 class="t-h4" style="margin-bottom:12px">${t("rp.byMonth")}</h2>${hbars(ms.map((x) => [short(x), x.spend, "", mf(x.start), rm(x.spend)]), Math.max(...ms.map((x) => x.spend)))}
        ${tv([t("rp.month"), t("rp.spendCol"), t("rp.visitsCol"), t("rp.joinsCol"), t("rp.postsCol")], ms.map((x) => [mf(x.start), rm(x.spend), x.returns, x.joins, x.writes + x.posters]), true)}</div>
      <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.plat")}</h2>${platBars()}</div>
      <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.loved")}</h2>${lovedBars()}</div>
      ${weekdayPanel(ms)}
      <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.styles")}</h2>${styleBars()}</div>
      </div>
      <button class="btn btn-dark btn-w no-print" data-act="print">${t("rp.pdf")}</button>`;
    }
    // one month: the current one so far, or a finished one against the month before it
    const v = RD.this, L0 = RD.last, cur = R.sel === 0, day = cur ? new Date().getDate() : v.days, photos = (x) => x.writes + x.posters;
    const firstDays = (arr) => arr.slice(0, day).reduce((x, y) => x + y, 0), prorate = (x) => (cur ? Math.round((x * day) / L0.days) : x);
    const delta = (now, then) => { if (!then) return ""; const p = Math.round((now / then - 1) * 100); return `<span class="delta ${p < 0 ? "down" : ""}">${p >= 0 ? "+" : ""}${p}% ${t(cur ? "rp.vs" : "rp.vsPrev")}</span>`; };
    const s0 = new Date(v.start), dayAt = (i) => new Date(s0.getFullYear(), s0.getMonth(), i + 1);
    const dfm = new Intl.DateTimeFormat(loc(), { day: "numeric", month: "short" }), dVals = v.daily.writes.slice(0, day);
    const ca = cumsum(v.daily.returns.slice(0, day)), cb = cumsum(L0.daily.returns), nm = (r) => mf(r.start, { month: "long" });
    return `
    <div class="rep-head">${top(t("rp.stmt"), mf(v.start))}<h1 class="t-h1">${t("rp.head", { s: rm(v.spend) })}</h1>
      <p class="rep-sub">${t("rp.headS", { r: v.returns, j: v.joins })}</p>
      ${vs(v.spend, PLANS[0].mo, t("rp.vsPlan"))}
      <p class="rep-cav">${t("rp.cav")}</p>${back}</div>
    <div class="kpis">
      ${kpi(photos(v), "k.photos", delta(photos(v), firstDays(L0.daily.writes) + prorate(L0.posters)))}
      ${kpi(v.shares, "k.shares", delta(v.shares, prorate(L0.shares)))}
      ${kpi(v.joins, "k.joins", delta(v.joins, prorate(L0.joins)))}
      ${kpi(v.returns, "k.returns", delta(v.returns, firstDays(L0.daily.returns)))}
    </div>
    <div class="rep-grid">
    <div class="panel"><div class="panel-head"><div><h2 class="t-h4">${t("ch.daily")}</h2><p class="fine">${t("ch.dailyS")}</p></div></div><div class="chart" data-chart="daily"></div>${tv([t("ch.day"), t("ch.photosCol")], dVals.map((x, i) => [dfm.format(dayAt(i)), x]))}</div>
    <div class="panel"><h2 class="t-h4">${t("ch.run")}</h2><div class="legend"><span><i style="background:var(--chart-a)"></i>${nm(v)}</span><span><i style="background:var(--chart-b)"></i>${nm(L0)}</span></div><div class="chart" data-chart="run"></div>${tv([t("ch.day"), nm(v), nm(L0)], Array.from({ length: Math.max(ca.length, cb.length) }, (_, i) => [i + 1, ca[i] ?? "-", cb[i] ?? "-"]))}</div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.plat")}</h2>${platBars()}</div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.loved")}</h2>${lovedBars()}</div>
    ${weekdayPanel([v, L0])}
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.funnel")}</h2>
      ${hbars([[t("fl.scans"), v.scans], [t("fl.styled"), v.writes, t("ch.ofScans", { p: pct(v.writes, v.scans) })], [t("fl.shares"), v.shares, t("ch.ofScans", { p: pct(v.shares, v.scans) })], [t("fl.joins"), v.joins, t("ch.ofScans", { p: pct(v.joins, v.scans) })]], Math.max(v.scans, v.writes, v.shares, v.joins))}</div>
    <div class="panel"><h2 class="t-h4" style="margin-bottom:12px">${t("ch.styles")}</h2>${styleBars()}</div>
    <div class="panel span2"><h2 class="t-h4" style="margin-bottom:12px">${t("rp.s4")}</h2><ul class="next">${nextSteps(v).map((x) => `<li>${seal(20)}<span>${esc(x)}</span></li>`).join("")}</ul>
      <div class="kpis" style="margin-top:16px;grid-template-columns:1fr 1fr"><div class="kpi"><b>${v.redeemed}</b><span>${t("rp.redeemed")}</span></div><div class="kpi"><b>${v.offers}</b><span>${t("rp.offers")}</span></div></div></div>
    </div>
    <button class="btn btn-dark btn-w no-print" data-act="print">${t("rp.pdf")}</button>`;
  },
  settings() {
    const f = SET, ty = TYPES[f.type] || TYPES.cafe, m = M();
    return `
    <h1 class="t-h1">${t("set.h")}</h1>
    <form class="setform" data-form="shop">
      <label class="fld">${t("au.shop")}<input name="name" value="${esc(f.name)}" maxlength="40" required autocomplete="organization"></label>
      <fieldset class="seg-radio"><legend>${t("au.type")}</legend>${typeRadios(f.type)}</fieldset>
      <div class="fields"><label class="fld">${t("au.owner")}<input name="ownerName" value="${esc(f.ownerName)}" maxlength="40" autocomplete="given-name"></label>
        <label class="fld">${t("au.city")}<input name="city" value="${esc(f.city)}" maxlength="40" required autocomplete="address-level2"></label></div>
      <fieldset class="items"><legend>${t("set.items")}<small>${t("set.itemsS")}</small></legend>
        ${f.items.map((x, i) => `<div class="item-row"><input name="en" value="${esc(x.en)}" maxlength="40" required placeholder="${t("set.en")}" aria-label="${t("set.en")} ${i + 1}"><input name="zh" value="${esc(x.zh || "")}" maxlength="40" placeholder="${t("set.zh")}" aria-label="${t("set.zh")} ${i + 1}"><input name="price" value="${esc(x.price || "")}" maxlength="14" placeholder="RM" aria-label="${t("set.price")} ${i + 1}" inputmode="decimal"><button type="button" class="btn btn-white btn-s" data-act="itemDel" data-i="${i}" ${f.items.length < 2 ? "disabled" : ""} aria-label="${t("set.remove")} ${i + 1}">×</button></div>`).join("")}
        ${f.items.length < 12 ? `<button type="button" class="link" data-act="itemAdd">${t("set.add")}</button>` : ""}</fieldset>
      <label class="fld">${t("set.review")}<input name="reviewUrl" type="url" value="${esc(f.reviewUrl)}" maxlength="300" placeholder="https://g.page/r/…" aria-describedby="rv-hint"></label>
      <p class="hint" id="rv-hint">${t("set.reviewS")}</p>
      <p class="ferr" role="alert" data-ferr hidden></p>
      <button class="btn btn-seal btn-xl">${t("set.save")}</button>
    </form>
    <form class="setform" data-form="rewards">
      <h2 class="t-h2">${t("rw.h")}</h2>
      <p class="muted">${t("rw.s")}</p>
      <section class="rwcard"><h3 class="t-h4">${t("rw.mem")}</h3><p class="fine">${t("rw.memS")}</p>
        <div class="fld"><span id="rwg-l">${t("set.goal")}</span><div class="stepper"><button type="button" class="btn btn-white btn-s" data-act="rwStep" data-d="-1" aria-label="${t("rw.less")}">−</button><input name="goal" type="number" min="3" max="20" value="${f.goal}" required aria-labelledby="rwg-l"><button type="button" class="btn btn-white btn-s" data-act="rwStep" data-d="1" aria-label="${t("rw.more")}">+</button></div></div>
        <label class="fld">${t("rw.prize")}<input name="reward" value="${esc(f.reward)}" maxlength="80" placeholder="${esc(L(ty.reward).replace("{g}", f.goal))}"></label>
        ${rwIdeas("reward", [...new Set([L(ty.reward).split("=").pop().trim(), ...RW_PRIZE.map(L)])])}</section>
      <section class="rwcard"><h3 class="t-h4">${t("rw.back")}</h3><p class="fine">${t("rw.backS")}</p>
        <label class="fld">${t("rw.after")}<select name="quietDays">${[...new Set([14, 21, 30, 45, 60, 90, f.quietDays])].sort((a, b) => a - b).map((n) => `<option value="${n}" ${n === f.quietDays ? "selected" : ""}>${t("rw.days", { n })}</option>`).join("")}</select></label>
        <label class="fld">${t("rw.offer")}<input name="offer" value="${esc(f.offer)}" maxlength="80" placeholder="${esc(L(ty.offer))}"></label>
        ${rwIdeas("offer", RW_OFFER.map(L))}</section>
      <section class="rwcard"><h3 class="t-h4">${t("rw.bday")}</h3><p class="fine">${t("rw.bdayS")}</p>
        <label class="fld">${t("rw.treat")}<input name="bday" value="${esc(f.bday || "")}" maxlength="80" placeholder="${esc(f.offer || L(ty.offer))}"></label>
        ${rwIdeas("bday", RW_BDAY.map(L))}</section>
      <p class="ferr" role="alert" data-ferr hidden></p>
      <button class="btn btn-seal btn-xl">${t("rw.save")}</button>
    </form>
    <form class="setform" data-form="details">
      <h2 class="t-h2">${t("dt.h")}</h2>
      <p class="muted">${t("dt.s")}</p>
      <label class="fld">${t("dt.address")}<textarea name="address" rows="2" maxlength="160" autocomplete="street-address">${esc(f.address || "")}</textarea></label>
      <div class="fields"><label class="fld">${t("dt.phone")}<input name="phone" type="tel" value="${esc(f.phone || "")}" maxlength="20" autocomplete="tel" placeholder="012-345 6789"></label>
        <label class="fld">${t("dt.maps")}<input name="maps" type="url" value="${esc(f.maps || "")}" maxlength="300" placeholder="https://maps.app.goo.gl/…"></label></div>
      <fieldset class="hours"><legend>${t("dt.hours")}</legend>
        ${DAYS.map((d, i) => { const v = f.hours?.length === 7 ? f.hours[i] : ["10:00", "22:00"], day = dayName(d, "long"); return `<div class="hrow"><span>${day}</span><label class="check"><input type="checkbox" name="on${i}" ${v ? "checked" : ""}>${t("dt.open")}</label><input type="time" name="a${i}" value="${v?.[0] || "10:00"}" aria-label="${day} ${t("dt.from")}"><input type="time" name="b${i}" value="${v?.[1] || "22:00"}" aria-label="${day} ${t("dt.to")}"></div>`; }).join("")}
        <button type="button" class="link" data-act="hoursCopy">${t("dt.copy")}</button></fieldset>
      <p class="ferr" role="alert" data-ferr hidden></p>
      <button class="btn btn-white btn-xl">${t("dt.save")}</button>
    </form>
    <form class="setform" data-form="brand">
      <h2 class="t-h2">${t("br.h")}</h2>
      <p class="muted">${t("br.s")}</p>
      <div class="logo-row"><span class="logo-box">${m.logoUrl ? `<img src="${esc(m.logoUrl)}" alt="${t("br.logoAlt")}">` : `<i aria-hidden="true">${esc([...f.name][0] || "")}</i>`}</span>
        <label class="btn btn-white btn-s">${t(m.logoUrl ? "br.logoNew" : "br.logo")}<input type="file" accept="image/png,image/jpeg,image/webp" data-file="logo" class="sr-only"></label>
        ${m.logoUrl ? `<button type="button" class="link" data-act="logoDel">${t("br.logoDel")}</button>` : ""}</div>
      <label class="fld">${t("br.handle")}<input name="handle" value="${esc(f.handle ? "@" + f.handle : "")}" maxlength="31" placeholder="@${esc(m.shopTag.toLowerCase())}" autocomplete="off" autocapitalize="off" spellcheck="false"></label>
      <div class="fld"><span id="fn-l">${t("fn.h")}</span><div class="fonts" role="group" aria-labelledby="fn-l">${fontChoices(f.font || "")}</div></div>
      <fieldset class="swatches"><legend>${t("br.colour")}</legend>
        <span class="sw-logo" data-logosw hidden><small>${t("br.fromLogo")}</small></span>
        <label class="sw sw-none"><input type="radio" name="brand" value="" ${f.brand ? "" : "checked"}><span>${t("br.none")}</span></label>
        ${BRANDS.map((c) => `<label class="sw"><input type="radio" name="brand" value="${c}" ${f.brand === c ? "checked" : ""} aria-label="${c}"><i style="background:${c}"></i></label>`).join("")}
        <label class="sw sw-pick"><input type="radio" name="brand" value="custom" ${f.brand && !BRANDS.includes(f.brand) ? "checked" : ""}><input type="color" name="brandCustom" value="${f.brand && !BRANDS.includes(f.brand) ? f.brand : "#2F6FB0"}" aria-label="${t("br.custom")}"></label></fieldset>
      <p class="ferr" role="alert" data-ferr hidden></p>
      <button class="btn btn-white btn-xl">${t("br.save")}</button>
    </form>
    <form class="setform" data-form="pin">
      <h2 class="t-h2">${t("pin.h")}</h2>
      <label class="fld">${t("pin.new")}<input name="pin" inputmode="numeric" pattern="[0-9]{4,6}" minlength="4" maxlength="6" required autocomplete="off" aria-describedby="pin-hint"></label>
      <p class="hint" id="pin-hint">${t(f.hasPin ? "pin.set" : "pin.none")}</p>
      <p class="ferr" role="alert" data-ferr hidden></p>
      <button class="btn btn-white btn-xl">${t("pin.save")}</button>
    </form>
    <a class="row-link" href="#/staff/${esc(SHOP.slug)}"><span class="txt"><b>${t("pin.page")}</b><small>${t("pin.pageS")} ${esc(staffUrl())}</small></span>${chev}</a>
    <a class="row-link" href="${esc(custUrl())}" target="_blank" rel="noopener">${t("set.page")}${chev}</a>
    <form class="setform" data-form="password">
      <h2 class="t-h2">${t("set.acct")}</h2>
      <div class="fields"><label class="fld">${t("set.pwOld")}<input name="old" type="password" autocomplete="current-password" required maxlength="200"></label>
        <label class="fld">${t("set.pwNew")}<input name="password" type="password" autocomplete="new-password" required minlength="8" maxlength="200"></label></div>
      <p class="ferr" role="alert" data-ferr hidden></p>
      <button class="btn btn-white btn-w">${t("set.pwSave")}</button>
    </form>
    <button class="btn btn-white btn-w" data-act="logout">${t("set.logout")}</button>
    <form class="setform danger" data-form="deleteAcct">
      <h2 class="t-h4">${t("set.del")}</h2><p class="muted">${t("set.delS")}</p>
      <label class="fld">${t("set.delPw")}<input name="password" type="password" autocomplete="current-password" required maxlength="200"></label>
      <p class="ferr" role="alert" data-ferr hidden></p>
      <button class="btn btn-ghost-red btn-w">${t("set.delGo")}</button>
    </form>`;
  },
};

/* ---- line charts: plain SVG, hover tooltips, colours from the validated pair ---- */
// counts are whole numbers, so ticks never go below 1
function nice(max, k = 3) { const raw = Math.max(1, max) / k, p = 10 ** Math.floor(Math.log10(raw)), step = Math.max(1, [1, 2, 2.5, 5, 10].map((x) => x * p).find((x) => x >= raw)); return { step, top: step * Math.max(1, Math.ceil(max / step)) }; }
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
  if (!daily || !RD?.last) return;
  const v = RD.this, L0 = RD.last, n0 = R.sel === 0 ? new Date().getDate() : v.days, nm = (r) => new Intl.DateTimeFormat(loc(), { month: "long" }).format(r.start);
  const s0 = new Date(v.start), dayAt = (i) => new Date(s0.getFullYear(), s0.getMonth(), i + 1), vals = v.daily.writes.slice(0, n0);
  const df = new Intl.DateTimeFormat(loc(), { weekday: "short", day: "numeric", month: "short" });
  lineChart(daily, { area: true, xLen: Math.max(2, n0), lines: [{ name: t("ch.daily"), color: CHART_A, values: vals }], tipFor: (i) => `${df.format(dayAt(i))}<br><b>${t("tip.photos", { n: vals[i] })}</b>` });
  const a = cumsum(v.daily.returns.slice(0, n0)), b = cumsum(L0.daily.returns);
  lineChart(run, {
    labels: true, xLen: Math.max(v.days, b.length), lines: [{ name: nm(v), color: CHART_A, values: a }, { name: nm(L0), color: CHART_B, values: b }],
    tipFor: (i) => `${zh() ? `${i + 1} 号` : `Day ${i + 1}`}<br>${a[i] !== undefined ? `<i style="background:var(--chart-a)"></i>${nm(v)}: <b>${a[i]}</b><br>` : ""}${b[i] !== undefined ? `<i style="background:var(--chart-b)"></i>${nm(L0)}: <b>${b[i]}</b>` : ""}`,
  });
  if (!animateIn || REDUCED) return;
  $$(".chart .ln").forEach((p) => { const len = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out", clearProps: "strokeDasharray,strokeDashoffset" }); });
  gsap.from(".chart .area", { opacity: 0, duration: 1, delay: 0.4 });
}

// after-render painting (canvases need pixels, not HTML)
const AFTER = {
  async settings() {
    const m = M(), box = $("[data-logosw]");
    if (!box || !m.logoUrl) return;
    const cols = logoColours(await loadImg(m.logoUrl).catch(() => null) || new Image());
    if (!cols.length) return;
    const near = (a, b) => !!a && hexRgb(a).reduce((sum, v, i) => sum + Math.abs(v - hexRgb(b)[i]), 0) < 16; // the saved colour, give or take decoding
    box.insertAdjacentHTML("beforeend", cols.map((c) => { const v = near(SET.brand, c) ? SET.brand : c; return `<label class="sw"><input type="radio" name="brand" value="${v}" ${v === SET.brand ? "checked" : ""} aria-label="${t("br.fromLogo")} ${v}"><i style="background:${v}"></i></label>`; }).join("") + '<i class="sw-break" aria-hidden="true"></i>');
    box.hidden = false;
  },
  async create() {
    if (C.phase === "edit") { drawFramer(); paintThumbs(); }
    if (C.phase === "nform") paintNotice($("[data-npv]"), 432, 540);
    if (C.phase === "ndone") for (const c of $$("[data-npl]")) { const [w, h] = SIZES[NOTICE_SIZE[c.dataset.npl]]; await paintNotice(c, w / 3, h / 3); }
    if (C.phase === "done") {
      const [w, h] = SIZES[C.size], box = $("[data-compare=final]");
      $(".cmp-before", box).src = C.src;
      await paint($(".cmp-after", box), w, h, LOOKS[C.look], await lookOpts());
      for (const c of $$("[data-pv]")) await paintPlat(c, c.dataset.pv, 1 / 3);
      if (!C.typed) { C.typed = true; typeInto($("[data-in=cap]"), C.capText); }
    }
    if (C.phase === "week") {
      const o = { ...(await lookOpts()), badge: null };
      for (const c of $$("[data-day]")) await paint(c, 432, 540, LOOKS[c.dataset.look], o);
    }
  },
  async share() {
    const ci = await loadImg(previewShop().cust), xp = writePost("xhs", S.lang, sampleInput());
    $$("[data-theme]").forEach((c) => paint(c, 360, 450, themeFn(c.dataset.theme), { img: ci, m: M(), title: xp.title, sub: M().name }));
    fitKit();
    const a = $("[data-a4]"); a && paintCounter(a);
  },
  async report() {
    if (!RD || R.sel === null) return;
    if (R.sel !== "all") drawCharts(R.fresh);
    if (R.fresh && !REDUCED) {
      gsap.from("#view .kpi, #view .panel", { autoAlpha: 0, y: 24, duration: 0.5, stagger: 0.06, ease: "power3.out" });
      if ($("#view .hbar .fill")) gsap.from("#view .hbar .fill", { scaleX: 0, duration: 0.9, ease: "power3.out", stagger: 0.04, delay: 0.3 });
      $$("#view .kpi [data-v]").forEach((b) => { const o = { v: 0 }; gsap.to(o, { v: +b.dataset.v, duration: 1.1, ease: "power2.out", onUpdate: () => (b.textContent = Math.round(o.v)) }); });
    }
    R.fresh = false;
  },
};
let thumbT;
// framing: drag the photo, or use the arrow keys, to choose what every poster size keeps in view
let drag = null;
function drawFramer() {
  const c = $("[data-framer]");
  if (!c || !C.work) return;
  const x = c.getContext("2d"), W = c.width, H = c.height;
  x.clearRect(0, 0, W, H); cover(x, C.work, 0, 0, W, H);
  x.strokeStyle = "rgba(255,255,255,.5)"; x.lineWidth = 1; x.beginPath();
  for (const k of [1 / 3, 2 / 3]) { x.moveTo(W * k, 0); x.lineTo(W * k, H); x.moveTo(0, H * k); x.lineTo(W, H * k); }
  x.stroke();
}
function moveFocus(dx, dy) { // dx, dy in framer pixels; moving the photo right shows more of its left side
  const c = $("[data-framer]"), img = C.work;
  if (!c || !img) return;
  const r = Math.max(c.width / img.width, c.height / img.height) * C.zoom, sx = img.width * r - c.width, sy = img.height * r - c.height;
  if (sx > 1) C.fx = Math.min(1, Math.max(0, C.fx - dx / sx));
  if (sy > 1) C.fy = Math.min(1, Math.max(0, C.fy - dy / sy));
  img.framing = { x: C.fx, y: C.fy, z: C.zoom };
  drawFramer(); clearTimeout(thumbT); thumbT = setTimeout(paintThumbs, 180);
}
document.addEventListener("pointerdown", (e) => { const c = e.target.closest("[data-framer]"); if (!c) return; drag = { x: e.clientX, y: e.clientY, k: c.width / c.clientWidth }; c.setPointerCapture?.(e.pointerId); drawFramer(); });
document.addEventListener("pointermove", (e) => { if (!drag) return; moveFocus((e.clientX - drag.x) * drag.k, (e.clientY - drag.y) * drag.k); drag.x = e.clientX; drag.y = e.clientY; });
for (const ev of ["pointerup", "pointercancel"]) document.addEventListener(ev, () => { if (!drag) return; drag = null; clearTimeout(thumbT); thumbT = setTimeout(paintThumbs, 60); });
document.addEventListener("keydown", (e) => {
  if (!e.target.matches?.("[data-framer]")) return;
  const step = { ArrowLeft: [24, 0], ArrowRight: [-24, 0], ArrowUp: [0, 24], ArrowDown: [0, -24] }[e.key];
  if (step) { e.preventDefault(); moveFocus(...step); }
});
async function paintThumbs() {
  const o = await lookOpts(), f = $("[data-framer]");
  if (f && !drag) paint(f, 480, 600, LOOKS[C.look], o);
  $$("[data-thumb]").forEach((c) => paint(c, 288, 360, LOOKS[c.dataset.thumb], o));
}

/* ======================= customer QR flow: photo → 3 taps → style → a post for every platform ======================= */
const K = { img: null, src: "", step: "start", theme: 0, star: "", items: [], vibes: [], with: null, posts: {}, plat: "xhs", stars: 0, k: 0, skip: false, form: { name: "", phone: "", terms: false, mkt: false, bday: 0 } };
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
const custEvent = (body) => { if (CSHOP) api(`/api/s/${CSHOP.slug}/event`, body).catch(() => {}); };
const tokKey = () => `goai.m.${CSHOP.slug}`;
function getToken() { try { return localStorage.getItem(tokKey()) || ""; } catch { return ""; } }
function setToken(v) { try { if (v) localStorage.setItem(tokKey(), v); else localStorage.removeItem(tokKey()); } catch {} }
async function refreshMem() {
  const tok = CSHOP && getToken();
  if (!tok) { MEM = null; return; }
  try { MEM = (await api(`/api/s/${CSHOP.slug}/card/${tok}`)).member; } catch (e) { if (e.code === "not_found") { setToken(""); MEM = null; } }
}
// a customer page: the shop behind the QR, this phone's member card, and the scan counted once per visit
async function openShop(slug = "") {
  if (CSHOP?.slug !== slug) {
    CSHOP = null; MEM = null;
    Object.assign(K, { img: null, step: "start", items: [], vibes: [], with: null, posts: {}, stars: 0, plat: "xhs", k: 0, skip: false });
    try { CSHOP = (await api(`/api/s/${encodeURIComponent(slug)}`)).shop; } catch { CSHOP = null; }
  }
  if (!CSHOP) return;
  await refreshMem();
  try { const k = `goai.scan.${CSHOP.slug}`; if (!sessionStorage.getItem(k)) { sessionStorage.setItem(k, "1"); custEvent({ kind: "scan" }); } } catch {}
}
function custView() {
  const m = M();
  const top = (name) => `<div class="cbar">${m.logoUrl ? `<img class="clogo" src="${esc(m.logoUrl)}" alt="">` : ""}<span class="cname">${esc(name)}</span><span class="grow"></span>${langPills()}</div>`;
  const foot = `${CSHOP ? shopInfo(m) : ""}<p class="powered small-link" style="text-decoration:none;display:flex;gap:8px;align-items:center;justify-content:center;opacity:.75">${seal(18)}${t("powered")}</p>`;
  if (!CSHOP) return `<div class="cwrap">${top("Go AI")}<div class="ch"><h1 class="t-h1">${t("c.bad")}</h1></div>${foot}</div>`;
  if (K.step === "card" && MEM) return `<div class="cwrap">${top(m.name)}
    <div class="pass"><div class="pass-top"><h1 class="pass-name">${t("mb.club", { shop: esc(m.name) })}</h1><span class="pass-lv">${esc(MEM.name)}</span></div><p class="pass-rew">${esc(L(m.reward))}</p>${stampsHTML(MEM.stamps, MEM.goal)}${isBday(MEM) ? `<p class="cbday">🎂 ${t("c.bdayCard", { t: esc(L(m.bday)) })}</p>` : ""}</div>
    <div class="ccard"><canvas class="qr" data-mqr aria-label="${t("c.code")} ${esc(MEM.code)}"></canvas><p class="mcode">${esc(MEM.code)}</p><p style="text-align:center;font-weight:700">${t("c.card")}</p>
      <p class="muted" style="text-align:center">${t("c.stamps", { n: MEM.stamps, g: MEM.goal })}</p></div>
    <button class="btn btn-seal btn-xl" data-act="custReset">${t("c.again")}</button>
    <div class="card-acts">${MEM.mkt ? `<button class="small-link" data-act="custOptout">${t("c.optout")}</button>` : ""}<button class="small-link" data-act="custLeave">${t("c.leave")}</button><a class="small-link" href="#/privacy/${esc(CSHOP.slug)}">${t("c.privacy")}</a></div>${foot}</div>`;
  if (K.step === "start" || !K.img) return `<div class="cwrap cstart">${top(m.name)}
    <div class="fan" aria-hidden="true">${FAN.map((k) => `<canvas data-fan="${k}" width="432" height="540"></canvas>`).join("")}</div>
    <div class="ch"><h1 class="t-h1">${t("c.h")}</h1><p>${t("c.free")}</p></div>
    <div class="cplats">${PLAT_ORDER.map((p) => plat(p, 32, true)).join("")}</div>
    <label class="btn btn-seal btn-xl">${IC.create.replace("<svg", '<svg aria-hidden="true"')}${t("c.take")}<input type="file" accept="image/*" multiple data-file="cust" class="sr-only"></label>
    ${MEM ? `<button class="small-link" data-act="custCard">${t("c.show")}</button>` : ""}${foot}</div>`;
  if (K.step === "tell") return `<div class="cwrap">${top(m.name)}
    <div class="ctell"><img src="${esc(K.src)}" alt=""><div><h1 class="t-h1">${t("c.tellH")}</h1><p>${t("c.tellS")}</p></div></div>
    <div class="qgroup"><h2>${m.getQ ? L(m.getQ) : t("c.t1")}</h2><div class="qchips">${m.menu.map((x, i) => `<button data-act="qItem" data-i="${i}" aria-pressed="${K.items.includes(i)}">${esc(L(x))}</button>`).join("")}</div></div>
    <div class="qgroup"><h2>${t("c.t2")}<small>${t("c.t2s")}</small></h2><div class="qchips">${Object.entries(m.vibes).map(([k, v]) => `<button data-act="qVibe" data-v="${k}" aria-pressed="${K.vibes.includes(k)}">${esc(L(v.chip))}</button>`).join("")}</div></div>
    <div class="qgroup"><h2>${L(m.withQ)}</h2><div class="qchips">${Object.entries(m.with).map(([k, v]) => `<button data-act="qWith" data-w="${k}" aria-pressed="${K.with === k}">${esc(L(v.chip))}</button>`).join("")}</div></div>
    <button class="btn btn-seal btn-xl" data-act="custWrite" ${canWrite() ? "" : "disabled"}>${t("c.write")}</button>
    <p class="tname" data-need ${canWrite() ? "hidden" : ""} style="font-weight:500;color:var(--ink-2)">${t("c.need")}</p></div>`;
  if (K.step === "style") return `<div class="cwrap">${top(m.name)}
    <h1 class="tname">${t("c.swipe")}</h1>
    <div class="carousel" data-carousel tabindex="0" role="region" aria-label="${t("c.swipe")}">${THEMES.map(([k]) => `<canvas data-ctheme="${k}" width="720" height="900" aria-label="${sname(k)}"></canvas>`).join("")}</div>
    <div class="cdots">${THEMES.map((_, i) => `<i class="${i === K.theme ? "on" : ""}"></i>`).join("")}</div>
    <p class="tname" data-tname>${sname(THEMES[K.theme][0])}</p>
    <label class="fld" data-starfld ${THEMES[K.theme][0] === "mag" ? "" : "hidden"}>${t("c.star")}<input data-in="star" value="${esc(K.star)}" maxlength="18" autocomplete="given-name"></label>
    <button class="btn btn-seal btn-xl" data-act="custUse">${t("c.use")}</button>
    <button class="small-link" data-act="custBack">${t("c.tellH")}</button></div>`;
  if (K.step === "posts") {
    ensurePosts();
    const p = K.plat, post = K.posts[p];
    return `<div class="cwrap">${top(m.name)}
    <div class="famous"><span class="fm-seal" data-seal="52"></span><div><h1>${t("c.ready")}</h1><span>${t("c.readyS")}</span></div></div>
    <div class="ccard">
      <div class="ptabs" role="tablist" aria-label="${t("c.where")}">${PLAT_ORDER.map((x) => `<button role="tab" aria-selected="${x === p}" data-act="ptab" data-p="${x}">${plat(x, 34)}${esc(pname(x))}</button>`).join("")}</div>
      <div class="pprev"><canvas data-pcanvas aria-label="${esc(pname(p))}"></canvas></div>
      ${p === "google" ? `<div><p class="t-h4">${t("c.stars")}</p><div class="starpick" role="radiogroup" aria-label="${t("c.stars")}">${[1, 2, 3, 4, 5].map((n) => `<button role="radio" aria-checked="${K.stars === n}" aria-label="${n}" class="${n <= K.stars ? "on" : ""}" data-act="star" data-n="${n}">★</button>`).join("")}</div><p class="honest" style="margin-top:6px">${t("c.starsS")}</p></div>` : ""}
      ${post.title !== undefined ? `<label class="fld">${t("c.title")}<input data-in="ptitle" value="${esc(post.title)}" maxlength="60"></label>` : ""}
      <label class="fld">${t("c.text")}<textarea data-in="pbody" rows="7">${esc(post.body)}</textarea></label>
      <details class="pchecks" data-checks ${checksBad() ? "open" : ""}>${checksHTML()}</details>
      <button class="btn btn-seal btn-xl" data-act="postPlat">${plat(p, 26)}${t("c.post", { p: pname(p) })}</button>
      <div class="btn-row"><button class="btn btn-white" data-act="pCopy">${t("cr.copy")}</button><button class="btn btn-white" data-act="pSave">${t("c.save")}</button></div>
      <button class="link" style="justify-self:center" data-act="pAnother">${t("c.another")}</button>
    </div>
    ${MEM ? `<div class="ccard"><p class="t-h4">${t("c.member", { n: MEM.stamps, g: MEM.goal })}</p><button class="btn btn-dark btn-w" data-act="custCard">${t("c.show")}</button></div>`
      : K.skip ? `<button class="small-link" data-act="custReset">${t("c.again")}</button>`
      : `<div class="ccard"><p class="t-h3">${t("c.join", { shop: esc(m.name) })}</p><p class="muted">${t("c.joinS", { reward: esc(L(m.reward)) })}</p>
         <button class="btn btn-dark btn-w" data-act="custJoin">${t("c.joinBtn")}</button><button class="small-link" data-act="custSkip">${t("c.skip")}</button></div>`}
    ${foot}</div>`;
  }
  if (K.step === "join") return `<div class="cwrap">${top(m.name)}
    <h1 class="t-h1">${t("c.join", { shop: esc(m.name) })}</h1>
    <label class="fld">${t("c.name")}<input data-in="fname" value="${esc(K.form.name)}" autocomplete="given-name" maxlength="30"></label>
    <label class="fld">${t("c.phone")}<input data-in="fphone" value="${esc(K.form.phone)}" type="tel" autocomplete="tel" maxlength="16"></label>
    <label class="fld">${t("c.bday")}<select data-in="fbday"><option value="0">${t("c.bdayNone")}</option>${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${K.form.bday === i + 1 ? "selected" : ""}>${monthName(i + 1)}</option>`).join("")}</select><small class="fine">${t("c.bdayS", { t: esc(L(m.bday)) })}</small></label>
    <label class="check"><input type="checkbox" data-in="fterms" ${K.form.terms ? "checked" : ""}>${t("c.terms")}</label>
    <label class="check"><input type="checkbox" data-in="fmkt" ${K.form.mkt ? "checked" : ""}>${t("c.mkt")}</label>
    <a class="small-link" href="#/privacy/${esc(CSHOP.slug)}" target="_blank" rel="noopener">${t("c.readPrivacy")}</a>
    <button class="btn btn-seal btn-xl" data-act="custJoinGo" ${K.form.terms ? "" : "disabled"}>${t("c.joinGo")}</button></div>`;
  K.step = "start";
  return custView();
}
// a plain-language notice for each shop's members, linked from the join form and the card
function privacyView() {
  const shop = CSHOP ? esc(CSHOP.name) : "";
  const top = `<div class="cbar"><span class="cname">${CSHOP ? shop : "Go AI"}</span><span class="grow"></span>${langPills()}</div>`;
  if (!CSHOP) return `<div class="cwrap">${top}<div class="ch"><h1 class="t-h1">${t("c.bad")}</h1></div></div>`;
  return `<div class="cwrap">${top}<div class="ccard privacy"><h1 class="t-h2">${t("pv.h")}</h1><p>${t("pv.who", { shop })}</p>
    ${["keep", "photo", "why", "see", "choice"].map((k) => `<h2 class="t-h4">${t(`pv.${k}H`)}</h2><p>${t(`pv.${k}`, { shop })}</p>`).join("")}
    <a class="btn btn-dark btn-w" href="#/c/${esc(CSHOP.slug)}">${t("pv.back")}</a></div></div>`;
}
const coverOpts = () => { const m = M(), x = writePost("xhs", S.lang, kInput(), K.k); return { img: K.img, m, star: K.star.trim(), title: (K.posts.xhs || x).title, sub: `${m.name}${zh() ? "·" : ", "}${L(m.city)}` }; };
async function paintPlatform() {
  const c = $("[data-pcanvas]"); if (!c) return;
  const [rw, rh] = PLATS[K.plat].ratio;
  await paint(c, 1080, (1080 * rh) / rw, THEMES[K.theme][1], coverOpts());
}
// the start screen fans out five looks painted with this shop's name around an empty photo spot (never a stand-in photo);
// left cards show their left edge and right cards their right edge, so each look's best corner faces out
const FAN = ["mag", "receipt", "xhs", "cute", "film"];
let fanned = false, paintNear = () => {};
function photoSpot(m) {
  const c = document.createElement("canvas"), x = c.getContext("2d"), W = (c.width = 720), H = (c.height = 900);
  x.fillStyle = m.color; x.fillRect(0, 0, W, H);
  const g = x.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, H * 0.7);
  g.addColorStop(0, "rgba(255,255,255,.3)"); g.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.translate(W / 2 - 96, H * 0.4 - 96); x.scale(8, 8);
  x.strokeStyle = "rgba(255,255,255,.5)"; x.lineWidth = 1.4; x.lineJoin = "round";
  x.stroke(new Path2D("M4 8h3l2-3h6l2 3h3v11H4z")); x.beginPath(); x.arc(12, 13, 3.5, 0, 7); x.stroke();
  return c;
}
async function custAfter() {
  if ($(".fan")) {
    if (!fanned && !REDUCED) gsap.from(".fan canvas", { rotation: 0, y: 30, autoAlpha: 0, duration: 0.8, ease: "back.out(1.4)", stagger: { each: 0.07, from: "center" } });
    fanned = true;
    const m = M(), o = { img: photoSpot(m), m, title: m.name, sub: L(m.city) };
    await Promise.all($$("[data-fan]").map((c) => paint(c, 432, 540, themeFn(c.dataset.fan), o)));
  }
  if (K.step === "style") {
    const car = $("[data-carousel]"), o = coverOpts(), cards = $$("[data-ctheme]"), done = new Set();
    paintNear = (i) => Promise.all([i - 1, i, i + 1].filter((j) => cards[j] && !done.has(j)).map((j) => { done.add(j); return paint(cards[j], 720, 900, THEMES[j][1], o); }));
    await paintNear(K.theme);
    const step = () => car.firstElementChild.offsetWidth + 12;
    car.scrollLeft = K.theme * step();
    car.onscroll = () => {
      const i = Math.round(car.scrollLeft / step());
      if (i === K.theme || !THEMES[i]) return;
      K.theme = i; $$(".cdots i").forEach((d, j) => d.classList.toggle("on", j === i)); $("[data-tname]").textContent = sname(THEMES[i][0]); paintNear(i);
      $("[data-starfld]").hidden = THEMES[i][0] !== "mag";
    };
  }
  if (K.step === "posts") await paintPlatform();
  const q = $("[data-mqr]");
  if (q && MEM) {
    drawQR(q, `GOAI:${MEM.code}`);
    if (!REDUCED) $$(".cwrap .pstamps .on i").forEach((el, i) => gsap.fromTo(el, { scale: 1.8, rotation: -20, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.4, delay: 0.15 + i * 0.08, ease: "back.out(2.2)" }));
  }
}

/* ======================= staff: scan the member card, check the receipt, stamp ======================= */
// ST.shop: the shop on #/staff/<slug>. ST.ok: this device may stamp there (the owner, or the staff PIN was typed here).
const ST = { mem: null, receipt: "", amount: "", res: null, cam: false, err: "", shop: null, ok: false };
const CAN_SCAN = "BarcodeDetector" in window && !!navigator.mediaDevices?.getUserMedia;
async function openStaff(slug) {
  try { Object.assign(ST, await api(`/api/staff/${encodeURIComponent(slug)}`)); } catch { Object.assign(ST, { shop: null, ok: false }); }
}
const staffApi = (p) => `/api/staff/${ST.shop.slug}/${p}`;
// a device whose PIN was changed goes back to the PIN screen
function lockStaff(e) {
  if (e.code !== "need_pin") return false;
  Object.assign(ST, { ok: false, mem: null, res: null, err: "" }); toast(t("pin.again"));
  return true;
}
function staffView() {
  if (!ST.shop) return `<div class="swrap"><div class="cbar"><span class="cname">Go AI</span><span class="grow"></span>${langPills()}</div><h1 class="t-h1">${t("pin.badShop")}</h1></div>`;
  const m = M(), mem = ST.mem;
  const res = ST.res && { ok: t("s.ok"), okr: t("s.okr"), dup: t("s.dup"), nor: t("s.nor"), needr: t("s.needr"), undone: t("s.undone"), late: t("s.late") }[ST.res];
  return `<div class="swrap">
    <div class="cbar"><h1 class="cname">${t("s.h")}${zh() ? "·" : ", "}${esc(m.name)}</h1><span class="grow"></span>${langPills()}</div>
    ${!ST.ok ? (m.hasPin ? `
      <form class="setform" data-form="unlock">
        <label class="fld">${t("pin.in")}<input name="pin" type="password" inputmode="numeric" pattern="[0-9]{4,6}" minlength="4" maxlength="6" required autocomplete="off" aria-describedby="pin-s"></label>
        <p id="pin-s" style="opacity:.85">${t("pin.inS")}</p>
        <p class="ferr" role="alert" data-ferr hidden></p>
        <button class="btn btn-seal huge">${t("pin.go")}</button>
      </form>` : `<p>${t("pin.off")}</p>`)
    : !mem ? `
      ${ST.cam ? `<video class="cam" data-cam playsinline muted aria-label="${t("s.scan")}"></video>` : ""}
      ${CAN_SCAN ? `<button class="btn btn-seal huge" data-act="scan">${ST.cam ? t("s.stop") : t("s.scan")}</button>` : ""}
      <form data-form="code" class="code-row"><label class="fld">${t("s.code")}<input name="code" autocomplete="off" autocapitalize="characters" spellcheck="false" minlength="4" maxlength="16" required></label><button class="btn btn-white">${t("s.find")}</button></form>
      ${ST.err ? `<p class="ferr" role="alert">${esc(ST.err)}</p>` : ""}`
    : `<div class="pass"><div class="pass-top"><p class="pass-name">${esc(mem.name)}</p>${mem.stamps >= mem.goal ? `<span class="pass-lv">${t("s.ready")}</span>` : isBday(mem) ? `<span class="pass-lv">🎂 ${t("s.bdayT", { t: esc(L(M().bday)) })}</span>` : ""}</div><p class="pass-rew">${t("c.stamps", { n: mem.stamps, g: mem.goal })}</p>${stampsHTML(mem.stamps, mem.goal)}</div>
      ${res ? `<div class="result ${ST.res.startsWith("ok") || ST.res === "undone" ? "ok" : "bad"}" data-result>${ST.res.startsWith("ok") || ST.res === "undone" ? SVG.ok : SVG.no}<b>${res}</b>${ST.res === "ok" ? `<button class="btn btn-s btn-ghost" data-act="unstamp">${t("s.undo")}</button>` : ""}</div>` : ""}
      <div class="fields"><label class="fld">${t("s.receipt")}<input data-in="receipt" value="${esc(ST.receipt)}" autocomplete="off" maxlength="20"></label>
        <label class="fld">${t("s.amount")}<input data-in="amount" value="${esc(ST.amount)}" inputmode="decimal" autocomplete="off" maxlength="9"></label></div>
      <div class="big-btns"><button class="btn btn-seal huge" data-act="stamp">${t("s.add")}</button><button class="btn huge btn-ghost" data-act="redeem">${t("s.redeem")}</button></div>
      <button class="btn btn-white btn-w" data-act="nextCust">${t("s.next")}</button>`}
    ${SHOP ? `<a class="small-link" href="#/members">${t("s.back")}</a>` : ""}</div>`;
}
let camStream = null, camT = 0;
async function startCam() {
  const v = $("[data-cam]");
  if (!v) return;
  try { camStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false }); }
  catch { ST.cam = false; ST.err = t("s.camNo"); return renderView(); }
  if (!ST.cam) return stopCam();
  v.srcObject = camStream;
  await v.play().catch(() => {});
  const det = new BarcodeDetector({ formats: ["qr_code"] });
  const tick = async () => {
    if (!ST.cam) return;
    try {
      const [hit] = await det.detect(v), code = /^GOAI:([A-Z0-9]{4,8})$/.exec(hit?.rawValue || "")?.[1];
      if (code) { stopCam(); return findMember(code); }
    } catch {}
    camT = setTimeout(tick, 250);
  };
  tick();
}
function stopCam() { ST.cam = false; clearTimeout(camT); camStream?.getTracks().forEach((tr) => tr.stop()); camStream = null; }
async function findMember(code) {
  const ph = code.replace(/[\s-]/g, ""), byPhone = /^\+?\d{8,15}$/.test(ph);
  try { ST.mem = (await api(staffApi(`${byPhone ? "phone" : "member"}/${byPhone ? ph.replace("+", "") : encodeURIComponent(code)}`))).member; Object.assign(ST, { res: null, err: "", receipt: "", amount: "" }); buzz(10); }
  catch (e) { if (!lockStaff(e)) ST.err = e.code === "not_found" ? t(byPhone ? "s.noPhone" : "s.noCode") : errText(e); }
  renderView();
}
async function staffResult() {
  await renderView();
  const r = $("[data-result]");
  if (r && !REDUCED) animate(r, ST.res.startsWith("ok") ? { scale: [0.7, 1] } : { x: [0, -14, 12, -8, 5, 0] }, ST.res.startsWith("ok") ? { type: spring, bounce: 0.5, visualDuration: 0.4 } : { duration: 0.4 });
  if (ST.res === "ok" && !REDUCED) { const on = $$(".swrap .pstamps .on i"); on.length && gsap.fromTo(on.at(-1), { scale: 2, rotation: -24, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.45, ease: "back.out(2.4)" }); }
}

/* ======================= owner sign-up and log-in ======================= */
const authTop = () => `<div class="au-top"><a href="#/" class="brand" aria-label="Go AI home"><span class="logo" data-logo></span></a><span class="grow"></span>${langPills()}</div>`;
const AUTH = {
  login: () => `${authTop()}<h1 class="t-h1">${t("au.loginH")}</h1>
    <form data-form="login">
      <label class="fld">${t("au.email")}<input name="email" type="email" autocomplete="email" required maxlength="120"></label>
      <label class="fld">${t("au.pass")}<input name="password" type="password" autocomplete="current-password" required minlength="8" maxlength="200"></label>
      <p class="ferr" role="alert" data-ferr hidden></p>
      <button class="btn btn-seal btn-xl">${t("au.login")}</button>
    </form>
    <p class="au-alt">${t("au.new")} <a href="#/signup">${t("au.toSignup")}</a></p>`,
  signup: () => `${authTop()}<h1 class="t-h1">${t("au.signupH")}</h1><p class="muted">${t("au.signupS")}</p>
    <form data-form="signup">
      <label class="fld">${t("au.shop")}<input name="name" required maxlength="40" autocomplete="organization"></label>
      <fieldset class="seg-radio"><legend>${t("au.type")}</legend>${typeRadios("cafe")}</fieldset>
      <div class="fields"><label class="fld">${t("au.city")}<input name="city" required maxlength="40" autocomplete="address-level2"></label>
        <label class="fld">${t("au.owner")}<input name="ownerName" maxlength="40" autocomplete="given-name"></label></div>
      <div class="fields"><label class="fld">${t("au.best")}<input name="best" required maxlength="40"></label>
        <label class="fld">${t("au.bestZh")}<input name="bestZh" maxlength="40"></label></div>
      <label class="fld">${t("au.email")}<input name="email" type="email" autocomplete="email" required maxlength="120"></label>
      <label class="fld">${t("au.pass")}<input name="password" type="password" autocomplete="new-password" required minlength="8" maxlength="200" aria-describedby="pw-hint"></label>
      <p class="hint" id="pw-hint">${t("au.passS")}</p>
      <p class="ferr" role="alert" data-ferr hidden></p>
      <button class="btn btn-seal btn-xl">${t("au.signup")}</button>
    </form>
    <p class="au-alt">${t("au.have")} <a href="#/login">${t("au.toLogin")}</a></p>`,
};
function readShopForm(f = $("form[data-form=shop]")) {
  if (!f) return;
  const v = Object.fromEntries(new FormData(f));
  Object.assign(SET, { name: v.name, type: v.type, ownerName: v.ownerName, city: v.city, reviewUrl: (v.reviewUrl || "").trim(),
    items: $$(".item-row", f).map((r) => ({ en: $("[name=en]", r).value.trim(), zh: $("[name=zh]", r).value.trim(), price: $("[name=price]", r).value.trim() })) });
}
const go = (h) => { if (location.hash === h) onHash(); else location.hash = h; };
const FORMS = {
  async login(v) {
    SHOP = (await api("/api/login", { email: v.email, password: v.password })).shop;
    REP = MEMBERS = null; applyStatic();
    const after = S.after || "#/home"; S.after = ""; save(); go(after);
  },
  async signup(v) {
    const ty = TYPES[v.type] || TYPES.cafe;
    SHOP = (await api("/api/signup", { email: v.email, password: v.password, name: v.name, type: v.type, ownerName: v.ownerName, city: v.city,
      items: [{ en: v.best, zh: v.bestZh }], goal: ty.goal, reward: "", offer: "", quietDays: ty.quietDays })).shop;
    REP = MEMBERS = null; applyStatic(); toast(t("au.made")); go("#/home");
  },
  async shop(v, f) {
    readShopForm(f);
    SHOP = (await api("/api/shop", SET, "PUT")).shop;
    SET = { ...SHOP, items: SHOP.items.map((x) => ({ ...x })) };
    applyStatic(); toast(t("set.saved"));
  },
  async code(v) { await findMember(String(v.code || "").trim().toUpperCase()); },
  async pin(v) {
    readShopForm(); // keep unsaved shop edits when the page redraws
    SHOP = (await api("/api/shop/pin", { pin: v.pin }, "PUT")).shop;
    SET.hasPin = true; toast(t("pin.saved")); renderView();
  },
  async rewards(v) {
    readShopForm();
    SHOP = (await api("/api/shop/rewards", { goal: +v.goal, reward: String(v.reward || "").trim(), offer: String(v.offer || "").trim(), quietDays: +v.quietDays, bday: String(v.bday || "").trim() }, "PUT")).shop;
    Object.assign(SET, { goal: SHOP.goal, reward: SHOP.reward, offer: SHOP.offer, quietDays: SHOP.quietDays, bday: SHOP.bday }); REP = null; toast(t("rw.saved")); renderView();
  },
  async details(v) {
    readShopForm();
    const hours = DAYS.map((_, i) => (v["on" + i] ? [v["a" + i], v["b" + i]] : null));
    SHOP = (await api("/api/shop/details", { address: String(v.address || "").trim(), phone: String(v.phone || "").trim(), maps: String(v.maps || "").trim(), hours }, "PUT")).shop;
    Object.assign(SET, { address: SHOP.address, phone: SHOP.phone, maps: SHOP.maps, hours: SHOP.hours }); toast(t("dt.saved")); renderView();
  },
  async brand(v) {
    readShopForm();
    const brand = v.brand === "custom" ? String(v.brandCustom || "").toUpperCase() : v.brand || "";
    SHOP = (await api("/api/shop/brand", { handle: String(v.handle || "").trim(), brand }, "PUT")).shop;
    Object.assign(SET, { handle: SHOP.handle, brand: SHOP.brand }); applyStatic(); toast(t("br.saved")); renderView();
  },
  // a stamp correction from the member sheet: the button pressed says +1 or -1
  async fix(v, f, e) {
    const delta = Number(e?.submitter?.value || 0);
    if (!delta) return;
    await api(`/api/member/${f.dataset.code}/adjust`, { delta, reason: v.reason });
    MH = await api(`/api/member/${f.dataset.code}/history`); REP = null; await loadMembers();
    refreshSheet(); renderView(); toast(t("mb.fixed"));
  },
  async password(v, f) { await api("/api/password", { old: v.old, password: v.password }, "PUT"); f.reset(); toast(t("set.pwDone")); },
  async deleteAcct(v) {
    if (!confirm(t("set.delS"))) return;
    await api("/api/account/delete", { password: v.password });
    SHOP = REP = MEMBERS = null; R.sel = null; RD = null; applyStatic(); toast(t("set.deleted")); go("#/");
  },
  async unlock(v) { await api(staffApi("login"), { pin: v.pin }); ST.ok = true; await renderView(); focusPage(); },
};

/* ======================= sheets ======================= */
/* ---- opening hours ---- */
const DAYS = [1, 2, 3, 4, 5, 6, 0]; // Monday first, as Date.getDay() numbers
const dayName = (d, weekday = "short") => new Intl.DateTimeFormat(loc(), { weekday }).format(new Date(2026, 1, 1 + d)); // 1 Feb 2026 was a Sunday
const hm = (s) => { const [h, mi] = s.split(":").map(Number); return new Intl.DateTimeFormat(loc(), { hour: "numeric", ...(mi ? { minute: "2-digit" } : {}) }).format(new Date(2026, 0, 1, h, mi)); };
// the week as rows: days with the same hours run together ("Mon–Fri", "8 am – 10 pm")
function hoursRows(h) {
  if (!h) return [];
  const runs = [];
  DAYS.forEach((d, i) => { const key = h[i] ? h[i].join("-") : "x", last = runs.at(-1); if (last?.key === key) last.to = d; else runs.push({ key, from: d, to: d, v: h[i] }); });
  if (runs.length === 1 && runs[0].v) return [[t("hr.daily"), `${hm(runs[0].v[0])} – ${hm(runs[0].v[1])}`]];
  return runs.map((r) => [r.from === r.to ? dayName(r.from) : `${dayName(r.from)}–${dayName(r.to)}`, r.v ? `${hm(r.v[0])} – ${hm(r.v[1])}` : t("hr.closed")]);
}
function openState(h, now = new Date()) {
  if (!h) return "";
  const v = h[(now.getDay() + 6) % 7], mins = now.getHours() * 60 + now.getMinutes(), toM = (s) => +s.slice(0, 2) * 60 + +s.slice(3);
  if (v) { const a = toM(v[0]), b = toM(v[1]) > a ? toM(v[1]) : toM(v[1]) + 1440; if (mins >= a && mins < b) return t("hr.open", { t: hm(v[1]) }); if (mins < a) return t("hr.opensAt", { t: hm(v[0]) }); }
  return t("hr.closedNow");
}
// where the shop is and when it is open, at the foot of every customer screen
function shopInfo(m) {
  const rows = hoursRows(m.hours), map = m.maps || (m.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${m.name} ${m.address}`)}` : "");
  if (!m.address && !m.tel && !rows.length) return "";
  return `<section class="sinfo" aria-label="${t("dt.h")}">
    ${rows.length ? `<p class="sopen">${esc(openState(m.hours))}</p><dl class="shours">${rows.map(([d, h]) => `<div><dt>${esc(d)}</dt><dd>${esc(h)}</dd></div>`).join("")}</dl>` : ""}
    ${m.address ? `<p class="saddr">${esc(m.address)}</p>` : ""}
    <div class="sacts">${map ? `<a class="btn btn-white btn-s" href="${esc(map)}" target="_blank" rel="noopener">${t("dt.directions")}</a>` : ""}${m.tel ? `<a class="btn btn-white btn-s" href="tel:${esc(m.tel)}">${t("dt.call")}</a><a class="btn btn-white btn-s" href="https://wa.me/${esc(waPhone(m.tel))}" target="_blank" rel="noopener">${plat("wa", 18)}WhatsApp</a>` : ""}</div>
  </section>`;
}
/* ---- the shop's colour as the app's theme ---- */
const mixHex = (a, b, k) => "#" + hexRgb(a).map((v, i) => Math.round(v + (hexRgb(b)[i] - v) * k).toString(16).padStart(2, "0")).join("").toUpperCase();
const onWhite = (hex) => 1.05 / (lumOf(hexRgb(hex)) + 0.05); // contrast against white
// the brand colour, darkened until white text on it reads (4.5:1); light tints and deep shades follow from it
function themeOf(hex) {
  let seal = hex;
  for (let k = 0.08; onWhite(seal) < 4.5 && k < 1; k += 0.08) seal = mixHex(hex, "#000000", k);
  return { "--seal": seal, "--seal-hi": mixHex(seal, "#FFFFFF", 0.2), "--seal-deep": mixHex(seal, "#000000", 0.22), "--seal-soft": mixHex(hex, "#FFFFFF", 0.9), "--seal-rgb": hexRgb(seal).join(" "), "--band": mixHex(seal, "#000000", 0.35) };
}
// the owner app, customer page and staff screen take the shop's colour; the landing page and log-in stay Go AI red
function applyTheme() {
  const st = document.documentElement.style, b = route === "landing" || AUTH_VIEWS.includes(route) ? "" : M().brand;
  for (const k of ["--seal", "--seal-hi", "--seal-deep", "--seal-soft", "--seal-rgb", "--band"]) st.removeProperty(k);
  if (b) for (const [k, v] of Object.entries(themeOf(b))) st.setProperty(k, v);
  const fnt = route === "landing" || AUTH_VIEWS.includes(route) ? "" : FONT_CSS[M().font];
  fnt ? st.setProperty("--brand-font", fnt) : st.removeProperty("--brand-font");
  M().font === "poster" && fnt ? st.setProperty("--brand-stretch", "62.5%") : st.removeProperty("--brand-stretch");
}
// a logo's main colours: transparent and near-white pixels are paper, greys count for little, similar colours merge
function logoColours(img) {
  const n = 48, c = document.createElement("canvas"); c.width = c.height = n;
  const x = c.getContext("2d", { willReadFrequently: true }); x.drawImage(img, 0, 0, n, n);
  const d = x.getImageData(0, 0, n, n).data, bins = new Map();
  let seen = 0;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2], mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 510;
    if (d[i + 3] < 200 || l > 0.92) continue;
    seen++;
    const s = mx === mn ? 0 : (mx - mn) / (255 - Math.abs(mx + mn - 255)), dd = mx - mn || 1;
    const hue = ((mx === r ? ((g - b) / dd) % 6 : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4) * 60 + 360) % 360;
    const key = `${s < 0.2 ? "g" : Math.round(hue / 24) % 15}:${Math.round(l * 3)}`, e = bins.get(key) || { n: 0, r: 0, g: 0, b: 0, w: 0 };
    Object.assign(e, { n: e.n + 1, r: e.r + r, g: e.g + g, b: e.b + b, w: e.w + (s < 0.2 ? 0.3 : 0.6 + s) }); bins.set(key, e);
  }
  const out = [];
  for (const e of [...bins.values()].sort((a, b) => b.w - a.w)) {
    const hex = "#" + [e.r, e.g, e.b].map((v) => Math.round(v / e.n).toString(16).padStart(2, "0")).join("").toUpperCase();
    if (e.n > Math.max(12, seen * 0.04) && out.every((o) => hexRgb(o).reduce((a, v, i) => a + Math.abs(v - hexRgb(hex)[i]), 0) > 90)) out.push(hex);
    if (out.length === 3) break;
  }
  return out;
}
const waPhone = (p) => p.replace(/^\+/, "").replace(/^0/, "60"); // Malaysian numbers written 012… become 6012…
const waLink = (x) => `https://wa.me/${waPhone(x.phone)}?text=${encodeURIComponent(t("v.msg", { name: x.name, shop: M().name, off: L(M().off), date: fmtDate(14) }))}`;
const SHEETS = {
  offers() {
    const m = M(), list = (MEMBERS || []).filter(isQuietReach);
    return `<h2 class="t-h2">${t("v.h")}</h2>
      <div class="voucher" style="margin:14px 0 0;border-radius:20px;z-index:auto"><b>${esc(L(m.off))}</b><span class="v-off">${t("v.terms")}</span></div>
      ${list.length ? `<p style="font-weight:500">${t("v.who2", { n: list.length })}</p>
        <ul class="olist">${list.map((x) => `<li><span><b>${esc(x.name)}</b><small>${esc(x.phone)}</small></span><a class="btn btn-seal btn-s" data-act="sendOffer" data-code="${esc(x.code)}" href="${esc(waLink(x))}" target="_blank" rel="noopener">${plat("wa", 20)}${t("v.send")}</a></li>`).join("")}</ul>
        <p class="fine">${t("v.how")}</p>` : `<p>${t("v.none")}</p>`}`;
  },
};
// each choice shows the shop's own name in that font
const fontChoices = (cur) => ["", ...FONT_IDS].map((id) => `<button type="button" class="fontopt" data-act="fontPick" data-v="${id}" aria-pressed="${cur === id}"><b style="${fontStyle(id) || "font-family:'Fraunces', 'Noto Serif SC', serif"}">${esc(M().name)}</b><small>${t(id ? "fn." + id : "fn.look")}</small></button>`).join("");
SHEETS.font = () => `<h2 class="t-h2">${t("fn.pick")}</h2><p class="muted">${t("fn.s")}</p><div class="fonts">${fontChoices(M().font)}</div>`;
SHEETS.member = () => {
  if (!MH) return `<p class="muted">…</p>`;
  const x = MH.member, df = new Intl.DateTimeFormat(loc(), { day: "numeric", month: "short", year: "numeric" }), dt = new Intl.DateTimeFormat(loc(), { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
  return `<div class="mhead"><div><h2 class="t-h2">${esc(x.name)}</h2><p class="muted">${esc(x.code)}  ${t("mb.joined", { d: df.format(x.created) })}${x.birthMonth ? `  ${t("mb.bday", { m: monthName(x.birthMonth) })}` : ""}</p></div></div>
    <div class="pass"><div class="pass-top"><p class="pass-name">${t("c.stamps", { n: x.stamps, g: x.goal })}</p></div>${stampsHTML(Math.min(x.stamps, x.goal), x.goal)}</div>
    ${x.phone ? `<a class="btn btn-white btn-w" href="https://wa.me/${waPhone(x.phone)}" target="_blank" rel="noopener">${plat("wa", 20)}${t("mb.wa2")}</a>` : ""}
    <form class="mfix" data-form="fix" data-code="${esc(x.code)}"><h3 class="t-h4">${t("mb.fix")}</h3>
      <label class="fld">${t("mb.why")}<select name="reason">${["why1", "why2", "why3"].map((k) => `<option>${t("mb." + k)}</option>`).join("")}</select></label>
      <div class="btn-row"><button class="btn btn-white" name="delta" value="-1">${t("mb.fixTake")}</button><button class="btn btn-dark" name="delta" value="1">${t("mb.fixAdd")}</button></div></form>
    <h3 class="t-h4">${t("mb.visits")}</h3>
    ${MH.visits.length ? `<ul class="olist">${MH.visits.map((v) => `<li><span><b>${esc(v.receipt)}</b><small>${dt.format(v.created)}</small></span><b>${rm(v.amount)}</b></li>`).join("")}</ul>` : `<p class="muted">${t("mb.noVisits")}</p>`}
    ${MH.rewards.length ? `<h3 class="t-h4">${t("mb.rewards")}</h3><ul class="olist">${MH.rewards.map((r) => `<li><span>${dt.format(r)}</span><b>${esc(L(M().reward))}</b></li>`).join("")}</ul>` : ""}
    ${MH.fixes.length ? `<h3 class="t-h4">${t("mb.fixes")}</h3><ul class="olist">${MH.fixes.map((f) => `<li><span><b>${esc(f.reason)}</b><small>${dt.format(f.created)}</small></span><b>${f.delta > 0 ? "+1" : "−1"}</b></li>`).join("")}</ul>` : ""}
    <button class="btn btn-ghost-red btn-w" data-act="removeMember" data-code="${esc(x.code)}" data-name="${esc(x.name)}">${t("mb.remove")}</button>`;
};
// birthday wishes go only to members who said yes to WhatsApp offers
SHEETS.bdays = () => {
  const m = M(), mo = monthName(new Date().getMonth() + 1), all = (MEMBERS || []).filter(isBday), list = all.filter((x) => x.mkt && x.phone), rest = all.length - list.length;
  const link = (x) => `https://wa.me/${waPhone(x.phone)}?text=${encodeURIComponent(t("bd.msg", { name: x.name, shop: m.name, reward: L(m.bday) || t("bd.gift") }))}`;
  return `<h2 class="t-h2">${t("bd.h", { m: mo })}</h2>
    ${list.length ? `<ul class="olist">${list.map((x) => `<li><span><b>${esc(x.name)}</b><small>${esc(x.phone)}</small></span><a class="btn btn-seal btn-s" data-act="sendOffer" data-why="birthday" data-code="${esc(x.code)}" href="${esc(link(x))}" target="_blank" rel="noopener">${plat("wa", 20)}${t("v.send")}</a></li>`).join("")}</ul><p class="fine">${t("v.how")}</p>` : `<p>${t("bd.none")}</p>`}${rest && list.length ? `<p class="fine">${t("bd.rest", { n: rest })}</p>` : ""}`;
};
const SHEET_AFTER = {};

/* ======================= actions ======================= */
async function useLogo(file) {
  const img = await loadImg(URL.createObjectURL(file)), k = Math.min(1, 512 / Math.max(img.width, img.height));
  const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  let type = "image/png", url = c.toDataURL(type);
  if (url.length > 300e3) { type = "image/jpeg"; url = c.toDataURL(type, 0.86); }
  if (url.length > 330e3) return toast(t("br.big"));
  readShopForm();
  try {
    SHOP = (await api("/api/shop/logo", { type, data: url.split(",")[1] }, "PUT")).shop; if (SET) SET.logoAt = SHOP.logoAt;
    const main = logoColours(c)[0];
    if (main) { SHOP = (await api("/api/shop/brand", { handle: SHOP.handle, brand: main }, "PUT")).shop; if (SET) SET.brand = SHOP.brand; }
    applyStatic(); toast(t(main ? "br.logoTheme" : "br.logoSaved")); renderView();
  }
  catch (e) { toast(errText(e)); }
}
async function useFile(files, who) {
  files = [...(files || [])];
  if (!files.length) return;
  if (who === "logo") return useLogo(files[0]);
  const add = who === "ownerAdd", room = MAX_PHOTOS - (add ? C.imgs.length : 0);
  if (files.length > room) toast(t("cr.max", { n: MAX_PHOTOS }));
  try {
    const srcs = files.slice(0, room).map((f) => URL.createObjectURL(f)), loaded = await Promise.all(srcs.map(loadImg));
    if (who === "cust") {
      // a customer's photos get the natural fix too, each one, then become one collage
      const one = loaded.length > 1 ? combine(loaded.map((i) => enhance(shrink(i), "natural"))) : enhance(loaded[0], "natural");
      Object.assign(K, { img: one, src: loaded.length > 1 ? one.toDataURL("image/jpeg", 0.85) : srcs[0], step: "tell", theme: 0, posts: {} });
    } else {
      const imgs = add ? [...C.imgs, ...loaded] : loaded;
      Object.assign(C, { imgs: imgs.length > 1 ? imgs.map((i) => (i.tagName === "IMG" ? shrink(i) : i)) : imgs, srcs: add ? [...C.srcs, ...srcs] : srcs, phase: "edit", saved: null, fx: 0.5, fy: 0.5, zoom: 1, ...(add ? {} : { item: "", price: "" }) });
      setPhotos();
    }
    if (who !== "cust" && route !== "create") return go("#/create");
    refresh();
  } catch { toast(t("cr.bad")); }
}
const ownerEvent = (body) => api("/api/event", body).then(() => (REP = null)).catch(() => {});
async function makePoster() {
  const t0 = performance.now();
  await powerUp(["pu.s1", "pu.s2", "pu.s3", "pu.s4"], async () => {
    Object.assign(C, { phase: "done", size: "feed", cap: 0, capLang: S.lang, typed: false, saved: null });
    C.capText = ownerCaption(C.look, C.capLang, 0);
    C.secs = ((performance.now() - t0) / 1000 + (REDUCED ? 0 : 2.2)).toFixed(1);
    ownerEvent({ kind: "poster", look: C.look });
    await renderView(); scrollTo(0, 0);
  });
  slam($(".res-seal"));
  if (!REDUCED) gsap.from(".pv", { autoAlpha: 0, y: 30, rotate: (i) => (i - 2.5) * 4, duration: 0.7, stagger: 0.08, ease: "back.out(1.5)", delay: 0.6 });
  const box = $("[data-compare=final]");
  if (box && !REDUCED) gsap.fromTo(box, { "--p": "100%" }, { "--p": "22%", duration: 1.3, ease: "power3.inOut", delay: 0.1 });
}
async function makeWeek() {
  if (!C.img) { location.hash = "#/create"; return; }
  await powerUp(["pu.w1", "pu.w2", "pu.w3", "pu.w4"], async () => { C.phase = "week"; ownerEvent({ kind: "week" }); await renderView(); scrollTo(0, 0); }, 2.4);
  slam($(".res-seal"));
  if (!REDUCED) gsap.from(".day", { y: 50, autoAlpha: 0, rotation: () => gsap.utils.random(-7, 7), scale: 0.88, duration: 0.6, ease: "back.out(1.6)", stagger: 0.07 });
}
function toggleIn(list, v, max) { const i = list.indexOf(v); if (i >= 0) list.splice(i, 1); else { list.push(v); if (max && list.length > max) list.shift(); } }
function syncTell() {
  $$("[data-act=qItem]").forEach((b) => b.setAttribute("aria-pressed", K.items.includes(+b.dataset.i)));
  $$("[data-act=qVibe]").forEach((b) => b.setAttribute("aria-pressed", K.vibes.includes(b.dataset.v)));
  $$("[data-act=qWith]").forEach((b) => b.setAttribute("aria-pressed", K.with === b.dataset.w));
  $("[data-act=custWrite]").disabled = !canWrite(); $("[data-need]").hidden = canWrite();
}
// a button that shows it is working until its job is done
async function busy(el, fn) { el?.setAttribute("aria-busy", "true"); if (el) el.disabled = true; try { return await fn(); } finally { if (el?.isConnected) { el.disabled = false; el.removeAttribute("aria-busy"); } } }
const ACT = {
  logoDel: (el) => busy(el, async () => {
    try { readShopForm(); SHOP = (await api("/api/shop/logo", null, "DELETE")).shop; SET.logoAt = 0; applyStatic(); toast(t("br.logoGone")); renderView(); } catch (e) { toast(errText(e)); }
  }),
  nstart() { startNotice("closed"); C.phase = "nform"; refresh(); },
  // the stamp count steps by one, and a reward written as "8 stamps = …" follows it
  rwStep(el) {
    const f = el.closest("form").elements, old = f.goal.value, n = Math.min(20, Math.max(3, +old + +el.dataset.d));
    f.goal.value = n; f.reward.value = f.reward.value.replace(new RegExp(`^(\\D{0,4})${old}(?=\\D)`), `$1${n}`);
  },
  rwPick(el) { const f = el.closest("form").elements, k = el.dataset.f; f[k].value = k === "reward" ? t("rw.fmt", { g: f.goal.value, p: el.dataset.v }) : el.dataset.v; f[k].focus(); },
  fontSheet() { openSheet("font"); },
  async fontPick(el) {
    try {
      SHOP = (await api("/api/shop/font", { font: el.dataset.v }, "PUT")).shop;
      if (SET) SET.font = SHOP.font;
      applyStatic(); closeSheet(); toast(t("fn.saved")); renderView();
    } catch (e) { toast(errText(e)); }
  },
  hoursCopy() { const f = $("form[data-form=details]").elements; for (let i = 1; i < 7; i++) { f["on" + i].checked = f.on0.checked; f["a" + i].value = f.a0.value; f["b" + i].value = f.b0.value; } },
  month() { C.phase = "month"; refresh(); scrollTo(0, 0); },
  // a day's post starts now: its look is picked and the photo button is next, or the notice form for the week before a festival
  mpMake(el) {
    const p = monthPlan().find((x) => x.key === el.dataset.key);
    if (!p) return;
    if (p.notice) { startNotice("closed"); C.phase = "nform"; } else Object.assign(C, { look: p.look, img: null, imgs: [], srcs: [], work: null, phase: "pick", item: "", price: "", saved: null });
    refresh(); scrollTo(0, 0);
  },
  mpCal() {
    const shop = M().name, url = `${location.origin}${location.pathname}#/create`;
    icsFile(monthPlan().filter((p) => !MP.off.has(p.key)).map((p) => ({ at: p.d.getTime(), title: t("rem.month", { what: p.title, shop }), text: `${p.idea}\n${url}`, url })), "goai-month.ics");
    toast(t("rem.done"));
  },
  nkind(el) { startNotice(el.dataset.k); refresh(); },
  nset(el) { N[el.dataset.k] = el.dataset.v; refresh(); },
  nmake() { N.cap = noticeCaption(N, M()); C.phase = "ndone"; ownerEvent({ kind: "poster", look: "notice" }); refresh(); scrollTo(0, 0); },
  nedit() { C.phase = "nform"; refresh(); },
  nsave: (el) => busy(el, async () => {
    const plats = $$("[data-npt]:checked").map((i) => i.dataset.npt);
    if (!plats.length) return toast(t("po.none"));
    const files = [];
    for (const p of plats) { const [w, h] = SIZES[NOTICE_SIZE[p]]; files.push(await jpg(await paintNotice(document.createElement("canvas"), w, h), `${M().id}-notice-${p}.jpg`)); }
    if (await saveFiles(files, N.cap)) { toast(t("po.saved")); buzz(15); }
  }),
  ownerReset() { Object.assign(C, { img: null, imgs: [], srcs: [], work: null, phase: "pick", item: "", price: "", saved: null }); refresh(); scrollTo(0, 0); },
  fix(el) { C.fix = el.dataset.v; workImg(); refresh(); },
  layout(el) { C.layout = el.dataset.v; setPhotos(); refresh(); },
  photoDel(el) { const i = +el.dataset.i; C.imgs.splice(i, 1); URL.revokeObjectURL(C.srcs.splice(i, 1)[0]); setPhotos(); refresh(); },
  colour(el) { C.colour = el.dataset.v; refresh(); },
  czSet(el) { C[el.dataset.k] = el.dataset.v; refresh(); },
  preset(el) { const [, look, badge, style] = PRESETS.find(([id]) => id === el.dataset.i); Object.assign(C, { look, badge, badgeStyle: style }); refresh(); },
  look(el) { C.look = el.dataset.look; refresh(); },
  make: makePoster,
  week: makeWeek,
  weekBack() { C.phase = C.capText ? "done" : "edit"; refresh(); },
  weekSave: (el) => busy(el, async () => {
    const o = await lookOpts(), files = [];
    o.badge = null;
    for (const [i, p] of weekPlan().entries()) files.push(await jpg(await paint(document.createElement("canvas"), 1080, 1350, LOOKS[p.look], o), `${M().id}-day-${i + 1}.jpg`));
    files.push(await jpg(await paint(document.createElement("canvas"), 1080, 1350, LOOKS.festive, o), `${M().id}-festive.jpg`));
    if (await saveFiles(files, "")) toast(t("set.saved"));
  }),
  weekCal() {
    const shop = M().name;
    icsFile(weekPlan().map((p, i) => ({ at: p.d.getTime(), title: t("rem.week", { shop }), text: ownerCaption(p.look, S.lang, i) })), "goai-week.ics");
    toast(t("rem.done"));
  },
  capLang(el) {
    Object.assign(C, { capLang: el.dataset.l, cap: 0 }); C.capText = ownerCaption(C.look, C.capLang, 0);
    $$("[data-act=capLang]").forEach((b) => b.setAttribute("aria-pressed", b === el)); typeInto($("[data-in=cap]"), C.capText);
  },
  capNext() { C.cap++; C.capText = ownerCaption(C.look, C.capLang || S.lang, C.cap); typeInto($("[data-in=cap]"), C.capText); },
  ownerShare() { shareCanvas($("[data-compare=final] .cmp-after"), `${M().id}-${C.look}.jpg`, C.capText); },
  async ownerSave() { try { download(await toBlob($("[data-compare=final] .cmp-after")), `${M().id}-${C.look}.jpg`); await copy(C.capText); toast(t("cr.saved")); } catch { toast(t("err.server")); } },
  saveAll: (el) => busy(el, async () => {
    const plats = $$("[data-pt]:checked").map((i) => i.dataset.pt);
    if (!plats.length) return toast(t("po.none"));
    const files = [];
    for (const p of plats) files.push(await jpg(await paintPlat(document.createElement("canvas"), p), `${M().id}-${p}.jpg`));
    if (!(await saveFiles(files, C.capText))) return;
    C.saved = { plats }; toast(t("po.saved")); buzz(15);
    await renderView();
    $(".after-save")?.scrollIntoView({ block: "center", behavior: REDUCED ? "auto" : "smooth" });
    slam($(".save-seal"));
  }),
  remind() {
    icsFile([{ at: bestTime(), title: t("rem.title", { p: C.saved.plats.map(pname).join(", ") }), text: C.capText }], "goai-reminder.ics");
    toast(t("rem.done"));
  },
  print() { window.print(); },
  async a4Save() { try { download(await toBlob($("[data-a4]")), `${M().id}-counter-a4.jpg`); toast(t("a4.saved")); } catch { toast(t("err.server")); } },
  a4Print() {
    const box = $(".a4-print") || document.body.appendChild(Object.assign(document.createElement("div"), { className: "a4-print" }));
    box.innerHTML = `<img src="${$("[data-a4]").toDataURL("image/jpeg", 0.92)}" alt="">`;
    document.body.classList.add("print-a4"); addEventListener("afterprint", () => document.body.classList.remove("print-a4"), { once: true });
    window.print();
  },
  kitSet(el) { kit()[el.dataset.k] = el.dataset.v; save(); renderView(); },
  kitPrint() {
    const k = kit();
    if (k.fmt === "a4") return ACT.a4Print();
    const box = $(".kit-print") || document.body.appendChild(Object.assign(document.createElement("div"), { className: "kit-print" }));
    box.innerHTML = kitCard(M(), k).repeat(KIT_FMT[k.fmt][2]);
    document.body.classList.add("print-kit"); addEventListener("afterprint", () => document.body.classList.remove("print-kit"), { once: true });
    setTimeout(() => window.print(), 300); // the copies' images are already cached; this gives them a frame to lay out
  },
  async copyLink() { if (await copy(custUrl())) toast(t("cr.copied")); },
  offers: (el) => busy(el, async () => { await loadMembers(); openSheet("offers"); }),
  member: (el) => busy(el, async () => {
    try { MH = await api(`/api/member/${el.dataset.code}/history`); openSheet("member"); } catch (e) { toast(errText(e)); }
  }),
  bdays: (el) => busy(el, async () => { await loadMembers(); openSheet("bdays"); }),
  sendOffer(el) { // the link opens WhatsApp; this records that the offer went out
    api("/api/offer", { code: el.dataset.code, why: el.dataset.why || "back" }).then(async () => { REP = null; await loadMembers(); refreshSheet(); if (route !== "landing") renderView(); }).catch(() => {});
  },
  closeSheet() { closeSheet(); },
  bill(el) { bill = el.dataset.v; paintPlans(); },
  repList() { Object.assign(R, { sel: null }); RD = null; renderView(); scrollTo(0, 0); },
  async makeReport(el) {
    const o = el.dataset.o;
    await powerUp(["pu.r1", "pu.r2", "pu.r3"], async () => {
      try {
        [RD] = await Promise.all([api(o === "all" ? "/api/report/all" : `/api/report/month/${o}`), loadRep()]); // the latest numbers say who has gone quiet
        if (o === "all") RD.this = RD.total;
        Object.assign(R, { sel: o === "all" ? "all" : -Number(o), fresh: true });
      } catch (e) { toast(errText(e)); }
      await renderView(); scrollTo(0, 0);
    }, 1.6);
  },
  itemAdd() { readShopForm(); SET.items.push({ en: "", zh: "", price: "" }); renderView().then(() => $$(".item-row [name=en]").at(-1)?.focus()); },
  itemDel(el) { readShopForm(); SET.items.splice(+el.dataset.i, 1); renderView(); },
  async logout() { await api("/api/logout", {}).catch(() => {}); SHOP = REP = MEMBERS = null; R.sel = null; RD = null; applyStatic(); location.hash = "#/"; },
  // customer
  custReset() { Object.assign(K, { img: null, step: "start", items: [], vibes: [], with: null, posts: {}, stars: 0, plat: "xhs", k: 0, skip: false }); refresh(); },
  qItem(el) { toggleIn(K.items, +el.dataset.i, 2); syncTell(); },
  qVibe(el) { toggleIn(K.vibes, el.dataset.v, 3); syncTell(); },
  qWith(el) { K.with = K.with === el.dataset.w ? null : el.dataset.w; syncTell(); },
  custWrite() { if (!canWrite()) return; K.posts = {}; K.step = "style"; refresh(); },
  custBack() { K.step = "tell"; refresh(); },
  async custUse() {
    await powerUp(["pu.c1", "pu.c2", "pu.c3"], async () => {
      K.posts = {}; K.k = 0; K.plat = "xhs"; K.skip = false; ensurePosts();
      custEvent({ kind: "write", vibes: K.vibes, style: THEMES[K.theme][0] });
      K.step = "posts"; await renderView();
    }, 1.6);
    slam($(".fm-seal"));
  },
  ptab(el) { K.plat = el.dataset.p; refresh(); },
  star(el) { K.stars = +el.dataset.n; K.posts.google = writePost("google", S.lang, kInput(), K.k); refresh(); },
  pAnother() { K.k++; K.posts[K.plat] = writePost(K.plat, S.lang, kInput(), K.k); if (K.plat === "xhs") paintPlatform(); refresh(); },
  pFix() { K.posts[K.plat] = fixPost(K.plat, K.posts[K.plat]); refresh(); },
  async pCopy() { if (await copy(postText(K.plat))) toast(t("cr.copied")); },
  async pSave() { try { download(await toBlob($("[data-pcanvas]")), `${M().id}-${K.plat}.jpg`); } catch { toast(t("err.server")); } },
  async postPlat() {
    const p = K.plat, m = M();
    if (p === "google" && !K.stars) return toast(t("ck.starsBad"));
    const text = postText(p);
    custEvent({ kind: "share", plat: p });
    await copy(text);
    let blob; try { blob = await toBlob($("[data-pcanvas]")); } catch { blob = null; }
    const file = blob && new File([blob], `${m.id}-${p}.jpg`, { type: "image/jpeg" });
    if (file && navigator.canShare?.({ files: [file] })) { try { await navigator.share({ files: [file], text }); return; } catch (e) { if (e.name === "AbortError") return; } }
    if (blob && p !== "google") download(blob, `${m.id}-${p}.jpg`);
    toast(t("c.how", { p: pname(p) }));
    window.open(p === "google" ? CSHOP.reviewUrl || PLATS.google.web + encodeURIComponent(`${m.name} ${m.city[0]}`) : PLATS[p].web, "_blank", "noopener");
  },
  custJoin() { K.step = "join"; refresh(); },
  custSkip() { K.skip = true; refresh(); },
  custJoinGo: (el) => busy(el, async () => {
    const f = K.form;
    if (!f.terms) return;
    try {
      const r = await api(`/api/s/${CSHOP.slug}/join`, { name: f.name.trim() || t("c.you"), phone: f.phone.trim(), mkt: f.mkt, terms: true, birthMonth: f.bday || 0 });
      setToken(r.token); MEM = r.member; K.step = "card"; refresh();
    } catch (e) { toast(errText(e)); }
  }),
  async custCard() { await refreshMem(); K.step = "card"; refresh(); },
  // staff
  scan() { if (ST.cam) { stopCam(); return renderView(); } ST.cam = true; ST.err = ""; renderView().then(startCam); },
  stamp: (el) => busy(el, async () => {
    if (!ST.receipt.trim()) { ST.res = "needr"; return staffResult(); }
    try {
      ST.mem = (await api(staffApi("stamp"), { code: ST.mem.code, receipt: ST.receipt, amount: Math.max(0, parseFloat(ST.amount) || 0) })).member;
      Object.assign(ST, { res: "ok", receipt: "", amount: "" }); REP = null; buzz(15);
    } catch (e) { if (lockStaff(e)) return renderView(); ST.res = e.code === "dup_receipt" ? "dup" : null; if (!ST.res) toast(errText(e)); }
    staffResult();
  }),
  redeem: (el) => busy(el, async () => {
    try { ST.mem = (await api(staffApi("redeem"), { code: ST.mem.code })).member; ST.res = "okr"; REP = null; }
    catch (e) { if (lockStaff(e)) return renderView(); ST.res = e.code === "no_reward" ? "nor" : null; if (!ST.res) toast(errText(e)); }
    staffResult();
  }),
  nextCust() { Object.assign(ST, { mem: null, receipt: "", amount: "", res: null, err: "" }); refresh(); },
  unstamp: (el) => busy(el, async () => {
    try { ST.mem = (await api(staffApi("unstamp"), { code: ST.mem.code })).member; ST.res = "undone"; REP = null; }
    catch (e) { if (lockStaff(e)) return renderView(); ST.res = e.code === "too_late" ? "late" : null; if (!ST.res) toast(errText(e)); }
    staffResult();
  }),
  async removeMember(el) {
    if (!confirm(t("mb.removeQ", { name: el.dataset.name }))) return;
    try { await api(`/api/member/${el.dataset.code}`, null, "DELETE"); REP = null; if (sheetKind) await closeSheet(); toast(t("mb.removed")); renderView(); } catch (e) { toast(errText(e)); }
  },
  custOptout: (el) => busy(el, async () => {
    try { MEM = (await api(`/api/s/${CSHOP.slug}/card/${getToken()}/optout`, {})).member; toast(t("c.optedout", { shop: CSHOP.name })); refresh(); } catch (e) { toast(errText(e)); }
  }),
  async custLeave() {
    if (!confirm(t("c.leaveQ", { shop: CSHOP.name }))) return;
    try { await api(`/api/s/${CSHOP.slug}/card/${getToken()}`, null, "DELETE"); setToken(""); MEM = null; K.step = "start"; toast(t("c.left")); refresh(); } catch (e) { toast(errText(e)); }
  },
};

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act],[data-setlang],[data-m]");
  if (!el) return;
  if (el.matches("[data-setlang]")) return setLang(el.dataset.setlang, e);
  if (el.matches("[data-m]")) return setShop(el.dataset.m);
  ACT[el.dataset.act]?.(el, e);
});
document.addEventListener("submit", async (e) => {
  const f = e.target.closest("form[data-form]");
  if (!f) return;
  e.preventDefault();
  const err = $("[data-ferr]", f), btn = $("button:not([type=button])", f);
  if (err) err.hidden = true;
  await busy(btn, async () => {
    try { await FORMS[f.dataset.form](Object.fromEntries(new FormData(f)), f, e); }
    catch (x) { if (err) { err.textContent = errText(x); err.hidden = false; } else toast(errText(x)); }
  });
});
document.addEventListener("change", (e) => {
  const f = e.target.closest("[data-file]");
  if (f) { const files = [...f.files]; f.value = ""; return useFile(files, f.dataset.file); } // cleared, so the same photo can be picked again
  const k = e.target.dataset.in;
  if (k === "shoptype") return setShop(e.target.value);
  if (k === "fbday") K.form.bday = +e.target.value;
  if (k === "fterms" || k === "fmkt") { K.form[k === "fterms" ? "terms" : "mkt"] = e.target.checked; $("[data-act=custJoinGo]").disabled = !K.form.terms; }
  if (e.target.dataset.cz) { C[e.target.dataset.cz] = e.target.checked; refresh(); }
  if (e.target.dataset.kit) { kit()[e.target.dataset.kit] = e.target.checked; save(); renderView(); }
  if (e.target.dataset.mp) {
    const k = e.target.dataset.mp; e.target.checked ? MP.off.delete(k) : MP.off.add(k);
    const n = $$("[data-mp]").filter((x) => x.checked).length, b = $("[data-act=mpCal]"); b.disabled = !n; b.textContent = t("mp.cal", { n });
  }
  if (e.target.dataset.in === "n.mon") { N.menu[+e.target.dataset.i].on = e.target.checked; paintNotice($("[data-npv]"), 432, 540); }
  if (e.target.matches("[data-npt]")) $("[data-act=nsave]").lastChild.textContent = t("po.go", { n: $$("[data-npt]:checked").length });
  if (e.target.matches("[data-pt]")) { const n = $$("[data-pt]:checked").length; $("[data-act=saveAll]").lastChild.textContent = t("po.go", { n }); }
});
let starT, titleT;
document.addEventListener("input", (e) => {
  const cmp = e.target.closest(".compare");
  if (cmp) { cmp.style.setProperty("--p", e.target.value + "%"); return; }
  const k = e.target.dataset.in, v = e.target.value;
  if (k === "shopname") return setShopName(v);
  if (k === "pbSpend" || k === "pbDay") { PB[k === "pbSpend" ? "spend" : "day"] = +v; return paintPayback(); }
  if (k === "kit.custom") { kit().custom = v; save(); $(".kit-fit").innerHTML = kitCard(M(), kit()); fitKit(); }
  if (k === "badgeText") { C.badgeText = v; clearTimeout(thumbT); thumbT = setTimeout(paintThumbs, 250); }
  if (k === "item" || k === "price") { C[k] = v; clearTimeout(thumbT); thumbT = setTimeout(paintThumbs, 200); }
  if (k?.startsWith("n.")) {
    if (k === "n.row") N.rows[+e.target.dataset.r][+e.target.dataset.c] = v; else if (k === "n.mprice") N.menu[+e.target.dataset.i].price = v; else N[k.slice(2)] = v;
    clearTimeout(thumbT); thumbT = setTimeout(() => paintNotice($("[data-npv]"), 432, 540), 160);
  }
  if (k === "ncap") N.cap = v;
  if (k === "msearch") { MQ = v; clearTimeout(thumbT); thumbT = setTimeout(async () => { await renderView(); const i = $("[data-in=msearch]"); i?.focus(); i?.setSelectionRange(v.length, v.length); }, 180); }
  if (k === "zoom" && C.work) { C.zoom = v / 100; C.work.framing = { x: C.fx, y: C.fy, z: C.zoom }; drawFramer(); clearTimeout(thumbT); thumbT = setTimeout(paintThumbs, 180); }
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
addEventListener("resize", () => { clearTimeout(resizeT); resizeT = setTimeout(() => { fitKit(); if (route === "report" && RD && R.sel !== "all") drawCharts(false); }, 200); });

/* ======================= router ======================= */
let route = "landing", lastStep = "";
const APP_VIEWS = Object.keys(VIEWS);
const AUTH_VIEWS = Object.keys(AUTH);
// data each owner screen needs before it draws
const LOAD = { home: () => loadRep(), members: () => Promise.all([loadRep(), loadMembers()]), report: () => R.sel === null && api("/api/report/months").then((x) => (R.months = x.months)) };
async function renderView() {
  applyTheme();
  if (APP_VIEWS.includes(route)) {
    try { await LOAD[route]?.(); }
    catch (e) { if (e.code === "need_login") { SHOP = null; applyStatic(); return go("#/login"); } toast(errText(e)); }
    $("#view").innerHTML = VIEWS[route]();
    $("#view").dataset.route = route;
    seals($("#view"));
    $$(".tabs a").forEach((a) => (a.dataset.tab === route ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    await AFTER[route]?.();
  } else if (route === "c") { if (K.step !== lastStep) { lastStep = K.step; scrollTo(0, 0); } $("#cust").innerHTML = custView(); seals($("#cust")); await custAfter(); }
  else if (route === "privacy") { $("#cust").innerHTML = privacyView(); scrollTo(0, 0); }
  else if (route === "staff") { $("#staff").innerHTML = staffView(); seals($("#staff")); }
  else if (AUTH_VIEWS.includes(route)) { $("#auth").innerHTML = `<div class="awrap">${AUTH[route]()}</div>`; seals($("#auth")); }
}
function refresh() {
  if (route === "landing") { if (landingBuilt) paintLanding(); return; }
  renderView();
}
function focusPage() {
  const h = $(`${APP_VIEWS.includes(route) ? "#view" : route === "landing" ? "#landing" : "#" + ({ c: "cust", privacy: "cust", staff: "staff" }[route] || "auth")} h1`);
  if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
}
function onHash(e) {
  const [path] = location.hash.slice(1).split("?");
  const parts = (path || "/").replace(/^\//, "").split("/"), r = parts[0];
  stopCam();
  route = r === "" ? "landing" : r === "week" ? "create" : ["c", "privacy", "staff", ...AUTH_VIEWS].includes(r) || APP_VIEWS.includes(r) ? r : "home";
  // #/staff is the owner's own shop; #/staff/<slug> also opens for a device with the staff PIN
  if ((APP_VIEWS.includes(route) || (route === "staff" && !parts[1])) && !SHOP) { S.after = location.hash; save(); return go("#/login"); }
  if (AUTH_VIEWS.includes(route) && SHOP) return go("#/home");
  closeSheet();
  $("#landing").hidden = route !== "landing";
  $("#app").hidden = !APP_VIEWS.includes(route);
  $("#cust").hidden = route !== "c" && route !== "privacy";
  $("#staff").hidden = route !== "staff";
  $("#auth").hidden = !AUTH_VIEWS.includes(route);
  if (route !== "landing") document.documentElement.classList.remove("pre");
  applyTheme();
  if (route === "staff") Object.assign(ST, { mem: null, res: null, err: "", cam: false, receipt: "", amount: "" });
  if (route === "report") R.fresh = false;
  if (route === "settings") SET = { ...SHOP, items: SHOP.items.map((x) => ({ ...x })) };
  window.scrollTo(0, 0);
  const then = () => { $('meta[name="theme-color"]').content = route === "staff" ? INK : ["c", "privacy", "landing"].includes(route) ? "#FFFFFF" : "#F4F4F6"; applyStatic(); };
  if (route === "landing") { then(); paintLanding().then(() => { if (!landingBuilt) buildLanding(); }); }
  else if (route === "c" || route === "privacy") openShop(parts[1]).then(() => { then(); return renderView(); }).then(() => e && focusPage());
  else if (route === "staff") openStaff(parts[1] || SHOP.slug).then(() => { then(); return renderView(); }).then(() => e && focusPage());
  else if (r === "week") { then(); renderView().then(() => makeWeek()); history.replaceState(null, "", "#/create"); }
  else { then(); renderView().then(() => e && focusPage()); }
}
seals();
applyStatic();
$("#shopname").value = S.shop || "";
try { SHOP = (await api("/api/me")).shop; } catch { SHOP = null; }
addEventListener("hashchange", onHash);
onHash();
