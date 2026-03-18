let currentPage = 1;
const totalPages = 3;
let envStep = 0; // 0:关闭, 1:开盖, 2:滑出

// 初始化页面物理堆叠
function initBook() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        // 初始 Z 轴微小偏移产生厚度感
        page.style.zIndex = totalPages - index;
        page.style.transform = `translateZ(${(totalPages - index) * 1}px)`;
    });
}

function updatePages(dir) {
    if (dir === 'next' && currentPage < totalPages) {
        const page = document.getElementById(`p${currentPage}`);
        page.classList.add('flipped');
        setTimeout(() => { page.style.zIndex = currentPage; }, 700);
        currentPage++;
    } else if (dir === 'prev' && currentPage > 1) {
        currentPage--;
        const page = document.getElementById(`p${currentPage}`);
        page.classList.remove('flipped');
        setTimeout(() => { page.style.zIndex = totalPages - currentPage + 1; }, 700);
    }
}

// 信封三段式逻辑
const envelope = document.getElementById('envelope');
const hint = document.getElementById('hint-text');

envelope.onclick = (e) => {
    e.stopPropagation();
    if (envStep === 0) {
        // 第一步：只开盖，看到信纸边缘
        envelope.classList.add('step1');
        hint.innerText = "看到信纸了，再次点击取出";
        envStep = 1;
    } else if (envStep === 1) {
        // 第二步：信纸滑出到最前方
        envelope.classList.add('step2');
        hint.innerText = "阅读完毕，点击收回";
        envStep = 2;
    } else {
        // 第三步：全部收回
        envelope.classList.remove('step1', 'step2');
        hint.innerText = "点击封口开启信封";
        envStep = 0;
    }
};

document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');

// 视角随动
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    document.getElementById('scene').style.transform = `rotateX(${10 + y}deg) rotateY(${-5 - x}deg)`;
});

initBook();
