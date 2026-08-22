

const CONFIG = {
  // ヒーロー部分
  name: "あいちゃん",
  catchCopy: "私とあなたに七色の虹をかけるスマイル天使",
  avatarEmoji: "🎀", // アバターに表示する絵文字。

  // プロフィール
  profile: [
    { label: "所属", value: "AKB48" },
    { label: "ペンライトカラー", value: "赤・白" },
    { label: "センター回数", value: "1回" },
  ],

  // 推しポイント（icon: 絵文字, text: 説明）
  points: [
    { icon: "🌸", text: "ハーフツインが似合う" },
    { icon: "🎶", text: "パフォーマンスがピカイチ" },
    { icon: "💪", text: "とっても努力家" },
    { icon: "🐣", text: "仲良し星月花（星：佐藤綺星、月：八木愛月、花：伊藤百花）" },
  ],

  // トリビアガチャの中身
  trivia: [
    "憧れまゆゆ",
    "姉、佐藤妃星もAKBのOG",
    "会いたかった2026センター",
    "初センターは『恋　詰んじゃった』",
    "10年間チアダンスをやっていた",
    "千葉ロッテマリーンズのファン",
  ],

  // 布教コメント
  fukyouComment:
    "一度ライブに行けば感じる輝き……！\n" +
    "話すと実はばぶちゃん👶\n" +
    "推し始めて損はさせません、一緒に沼りましょう🕊️💗",
};

/* ============================================================
   ここから下は表示・動作のロジック
============================================================= */

// ---------- 1. CONFIGの内容をページに反映 ----------
document.getElementById("avatar").textContent = CONFIG.avatarEmoji;
document.getElementById("oshiName").textContent = CONFIG.name;
document.getElementById("oshiCatch").textContent = CONFIG.catchCopy;
document.getElementById("fukyouText").textContent = CONFIG.fukyouComment;

const profileList = document.getElementById("profileList");
profileList.innerHTML = CONFIG.profile
  .map(
    (item) =>
      `<li><span class="label">${item.label}</span><span class="value">${item.value}</span></li>`
  )
  .join("");

const pointList = document.getElementById("pointList");
pointList.innerHTML = CONFIG.points
  .map(
    (p) => `<li><span class="icon">${p.icon}</span><span>${p.text}</span></li>`
  )
  .join("");

// ---------- 2. 好き度メーター ----------
const meterFill = document.getElementById("meterFill");
const meterLabel = document.getElementById("meterLabel");
const heartBtn = document.getElementById("heartBtn");

let love = 8; // スタート地点(%)

const LOVE_MESSAGES = [
  { max: 20, text: "まだ気になる程度…?" },
  { max: 40, text: "ちょっと目で追っちゃうかも" },
  { max: 60, text: "気づいたら考えてる時間が増えてきた" },
  { max: 80, text: "完全に沼、抜け出せない" },
  { max: 100, text: "尊すぎて語彙力が消滅した" },
];

function updateMeter() {
  meterFill.style.width = love + "%";
  const msg = LOVE_MESSAGES.find((m) => love <= m.max) || LOVE_MESSAGES.at(-1);
  meterLabel.textContent = msg.text;
}
updateMeter();

heartBtn.addEventListener("click", () => {
  love = Math.min(100, love + 12);
  updateMeter();
  spawnHearts(6);
});

// ---------- 3. トリビアガチャ ----------
const gachaBtn = document.getElementById("gachaBtn");
const gachaResult = document.getElementById("gachaResult");

gachaBtn.addEventListener("click", () => {
  const pick = CONFIG.trivia[Math.floor(Math.random() * CONFIG.trivia.length)];
  gachaResult.textContent = pick;
  gachaResult.classList.remove("pop");
  void gachaResult.offsetWidth; // アニメーション再トリガー用
  gachaResult.classList.add("pop");
});

// ---------- 4. 背景にふわふわ浮かぶハート ----------
const bgHearts = document.getElementById("bgHearts");
const HEART_EMOJIS = ["💗", "💓", "💕", "✨"];

function spawnHearts(count = 1) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "floating-heart";
    el.textContent =
      HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = 16 + Math.random() * 18 + "px";
    const duration = 4 + Math.random() * 3;
    el.style.animationDuration = duration + "s";
    bgHearts.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }
}

// 起動直後にも少しハートを流しておく
spawnHearts(4);
setInterval(() => spawnHearts(1), 2200);
