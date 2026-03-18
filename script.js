let currentPage = 1;
const totalPages = 6;
let envStep = 0;

/**
 * 修复翻页跳变核心逻辑
 * 动态调整每页的 Z 轴位置，确保当前页始终覆盖后续页的内容
 */
function renderPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        const pageNum = index + 1;
        
        if (pageNum < currentPage) {
            // 已翻过的页：在底层，向左折叠
            page.style.zIndex = pageNum;
            page.style.transform = `rotateY(-180deg) translateZ(${pageNum * 0.1}px)`;
        } else if (pageNum === currentPage) {
            // 当前显示的页：最顶层
            page.style.zIndex = 100;
            page.style.transform = `rotateY(0deg) translateZ(1px)`;
        } else {
            // 待翻开的页：层级递减，增加 translateZ 模拟厚度
            page.style.zIndex = totalPages - index;
            page.style.transform = `rotateY(0deg) translateZ(${(totalPages - index) * -0.5}px)`;
        }
    });
}

function updatePages(dir) {
    if (dir === 'next' && currentPage < totalPages) {
        currentPage++;
    } else if (dir === 'prev' && currentPage > 1) {
        currentPage--;
    }
    renderPages();
}

// 信封逻辑：包裹、文字显隐
const envelope = document.getElementById('envelope');
const hint = document.getElementById('hint-text');

envelope.onclick = (e) => {
    e.stopPropagation();
    if (envStep === 0) {
        envelope.classList.add('step1');
        hint.innerText = "已开启，点击信件取出";
        envStep = 1;
    } else if (envStep === 1) {
        envelope.classList.add('step2');
        hint.innerText = "阅读完毕，点击收回";
        envStep = 2;
    } else {
        envelope.classList.remove('step1', 'step2');
        hint.innerText = "点击封口开启信封";
        envStep = 0;
    }
};

document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');

// 初始化
renderPages();

// 视角随动
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    document.getElementById('scene').style.transform = `rotateX(${10 + y}deg) rotateY(${-5 - x}deg)`;
});
