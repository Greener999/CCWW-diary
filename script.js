// ====================== 你的日记内容 ======================
const diaryPages = [
  `3月1日 晴
今天阳光很暖，风吹过窗台，像家里温柔的气息。
想起小时候院子里的枇杷树，夏天满树金黄，甜到心里。`,

  `3月5日 多云
家，是不管走多远，回头永远都在的地方。
一盏灯，一碗热汤，一句问候，就足够安心。`,

  `3月10日 暖
愿所有温柔都被珍藏，
愿所有想念都有回应。
你永远是被爱着的。`
];

// 信封地址
const envelopeText = `收件人：心里的家
寄件人：一直温暖的你`;

// 信件内容
const letterText = `亲爱的你：

见字如面。
这本日记，写的都是温柔与想念。
家不是一个地方，而是一种感觉，
是无论何时，都能让你安心的温暖。

愿你永远被爱，永远柔软，永远明亮。

—— 来自心底的信`;
// ==========================================================

const book = document.getElementById('book');
const pagesEl = document.getElementById('pages');
const coverFront = document.querySelector('.cover-front');
const letterWrap = document.getElementById('letterWrap');
const envelope = document.getElementById('envelope');
const letterPaper = document.getElementById('letterPaper');
const address = document.getElementById('address');
const letterContent = document.getElementById('letterContent');

address.textContent = envelopeText;
letterContent.textContent = letterText;

let currentPage = 0;
let pages = [];

// 创建书页
function createPages() {
  diaryPages.forEach((text, i) => {
    const page = document.createElement('div');
    page.className = 'page';
    page.textContent = text;
    page.style.zIndex = diaryPages.length - i;
    pagesEl.appendChild(page);
    pages.push(page);
  });
}
createPages();

// 点击封面打开
book.addEventListener('click', () => {
  if (currentPage === 0) {
    coverFront.style.transform = 'rotateY(-180deg)';
    setTimeout(() => flipPage(), 600);
  } else {
    flipPage();
  }
});

// 翻页
function flipPage() {
  if (currentPage >= pages.length) return;
  pages[currentPage].classList.add('flipped');
  currentPage++;

  // 翻到最后一页 → 弹出信件
  if (currentPage === pages.length) {
    setTimeout(() => {
      letterWrap.style.display = 'flex';
    }, 700);
  }
}

// 打开信封
envelope.addEventListener('click', () => {
  envelope.classList.toggle('open');
  letterPaper.classList.toggle('show');
});
