let currentPage = 1;
const totalPages = 3;
let envStep = 0;

/**
 * 修复核心：动态计算每一页的物理位置
 * 翻页状态下，translateZ 必须小心处理，否则会阻碍旋转
 */
function renderPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        const pageNum = index + 1;
        
        if (pageNum < currentPage) {
            // 已翻过去的页：层级低，在左侧
            page.style.zIndex = pageNum;
            page.style.transform = `rotateY(-180deg) translateZ(${pageNum * 0.5}px)`;
        } else if (pageNum === currentPage) {
            // 当前激活页：层级最高
            page.style.zIndex = 100;
            page.style.transform = `rotateY(0deg) translateZ(1px)`;
        } else {
            // 未翻开的页：层级按顺序递减，体现厚度
            page.style.zIndex = totalPages - index;
            page.style.transform = `rotateY(0deg) translateZ(${(totalPages - index) * -0.5}px)`;
        }
    });
}

function updatePages(direction) {
    if (direction === 'next' && currentPage < totalPages) {
        const page = document.getElementById(`p${currentPage}`);
        page.classList.add('flipped');
        currentPage++;
        renderPages();
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
        const page = document.getElementById(`p${currentPage}`);
        page.classList.remove('flipped');
        renderPages();
    }
}

// 信封逻辑：保留所有交互，不干涉翻页
const envelope = document.getElementById('envelope');
const hint = document.getElementById('hint-text');

envelope.onclick = (e) => {
    e.stopPropagation(); 
    if (envStep === 0) {
        envelope.classList.add('step1');
        hint.innerText = "已开启，点击信纸边缘取出";
        envStep = 1;
    } else if (envStep === 1) {
        envelope.classList.add('step2');
        hint.innerText = "点击信纸收回";
        envStep = 2;
    } else {
        envelope.classList.remove('step1', 'step2');
        hint.innerText = "点击封口开启信封";
        envStep = 0;
    }
};

// 事件绑定
document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');
document.getElementById('p1').onclick = () => { if(currentPage === 1) updatePages('next'); };

// 视角随动
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    document.getElementById('scene').style.transform = `rotateX(${10 + y}deg) rotateY(${-5 - x}deg)`;
});

// 初始化渲染
renderPages();
