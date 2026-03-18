// ========== 自定义内容（你需要替换这里的文字） ==========
// 日记内容（每一个数组元素对应一页）
const diaryContent = [
    "2024年5月10日 晴\n\n今天院子里的枇杷树又结果了，阳光透过叶子洒在石桌上，像撒了一把碎金。妈妈煮了枇杷糖水，甜滋滋的，喝完整个人都暖乎乎的。\n\n想起小时候总缠着爷爷摘枇杷，他的大手牵着我的小手，一步一步走到树下，现在爷爷不在了，但枇杷树还在，家的味道也还在。",
    "2024年6月18日 多云\n\n今天整理旧物，翻出了小时候的相册，里面有我和爸爸妈妈在枇杷树下的合照。那时候我才五岁，穿着小花裙，手里攥着刚摘的枇杷，笑得眯起了眼睛。\n\n妈妈说，这棵枇杷树是我出生那年爷爷亲手种的，一晃十几年，树长高了，我也长大了，可家的温暖从来没变。",
    "2024年7月2日 雨\n\n下雨天，坐在窗边听着雨声打在枇杷叶上，沙沙的声音特别治愈。爸爸煮了热茶，一家人围坐在客厅里聊天，说说笑笑，外面的雨再大，心里也是暖的。\n\n家是什么？大概就是不管走多远，回头总有一盏灯为你亮着，总有一碗热饭等着你。"
];

// 信封地址
const envelopeAddress = "收件人：亲爱的家人\n地址：心里的小院子\n邮编：5201314\n寄件人：爱你的我";

// 信件内容
const letterContent = "亲爱的家人：\n\n提笔写下这些话，心里满是温暖。这棵枇杷树，见证了我们家的点点滴滴，有欢笑，有陪伴，有岁月留下的温柔。\n\n家不是一栋房子，而是有你们在的每一个瞬间。谢谢你们给我的爱和包容，谢谢这棵枇杷树，谢谢所有平凡又珍贵的日常。\n\n愿我们永远相依，愿家的温暖永远都在。\n\n爱你们的我\n2024年7月";
// ========== 自定义内容结束 ==========

// 获取DOM元素
const diaryCover = document.getElementById('diaryCover');
const diaryPages = document.getElementById('diaryPages');
const pageContent = document.getElementById('pageContent');
const currentPageEl = document.getElementById('currentPage');
const totalPagesEl = document.getElementById('totalPages');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const envelopeContainer = document.getElementById('envelopeContainer');
const envelope = document.getElementById('envelope');
const envelopeFront = document.querySelector('.envelope-front');
const envelopeInside = document.getElementById('envelopeInside');
const envelopeAddressEl = document.getElementById('envelopeAddress');
const letterContentEl = document.getElementById('letterContent');
const closeLetter = document.getElementById('closeLetter');

// 初始化页码
let currentPage = 0;
const totalPages = diaryContent.length;

// 设置总页数
totalPagesEl.textContent = totalPages;

// 打开日记本
diaryCover.addEventListener('click', () => {
    diaryCover.style.display = 'none';
    diaryPages.style.display = 'block';
    renderPage();
});

// 渲染当前页内容
function renderPage() {
    currentPageEl.textContent = currentPage + 1;
    pageContent.textContent = diaryContent[currentPage];
    
    // 禁用/启用翻页按钮
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
    
    // 最后一页显示信封
    if (currentPage === totalPages - 1) {
        setTimeout(() => {
            envelopeContainer.style.display = 'flex';
            // 设置信封内容
            envelopeAddressEl.textContent = envelopeAddress;
            letterContentEl.textContent = letterContent;
        }, 500);
    } else {
        envelopeContainer.style.display = 'none';
    }
}

// 上一页
prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        renderPage();
    }
});

// 下一页
nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        renderPage();
    }
});

// 打开信封
envelope.addEventListener('click', () => {
    envelopeFront.classList.add('open');
    setTimeout(() => {
        envelopeInside.style.display = 'block';
    }, 500);
});

// 关闭信件
closeLetter.addEventListener('click', () => {
    envelopeInside.style.display = 'none';
    setTimeout(() => {
        envelopeFront.classList.remove('open');
    }, 300);
});
