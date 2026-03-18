let currentPage = 1;
const totalPages = 3;
let envStep = 0; // 0:关闭, 1:开盖, 2:弹信

// 1. 初始化书本厚度感
function initBook() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.zIndex = totalPages - index;
        // 赋予物理堆叠微移
        page.style.transform = `translateZ(${(totalPages - index) * 0.8}px)`;
    });
}

// 2. 翻页逻辑（带层级保护）
function updatePages(direction) {
    if (direction === 'next' && currentPage < totalPages) {
        const page = document.getElementById(`p${currentPage}`);
        page.classList.add('flipped');
        // 关键：翻转至中途切换 z-index
        setTimeout(() => {
            page.style.zIndex = currentPage;
        }, 700);
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
        const page = document.getElementById(`p${currentPage}`);
        page.classList.remove('flipped');
        setTimeout(() => {
            page.style.zIndex = totalPages - currentPage + 1;
        }, 700);
    }
}

// 3. 信封三阶段状态机
const envelope = document.getElementById('envelope');
const hint = document.getElementById('hint-text');

envelope.onclick = (e) => {
    e.stopPropagation(); // 阻止触发翻页
    if (envStep === 0) {
        envelope.classList.add('step1');
        hint.innerText = "已开启，再次点击信纸边缘取出";
        envStep = 1;
    } else if (envStep === 1) {
        envelope.classList.add('step2');
        hint.innerText = "点击信纸收回信封";
        envStep = 2;
    } else {
        envelope.classList.remove('step1', 'step2');
        hint.innerText = "点击封口开启信封";
        envStep = 0;
    }
};

// 4. 事件绑定
document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');
document.getElementById('p1').onclick = () => { if(currentPage === 1) updatePages('next'); };

// 5. 视角随动
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 45;
    const y = (window.innerHeight / 2 - e.pageY) / 45;
    document.getElementById('scene').style.transform = `rotateX(${10 + y}deg) rotateY(${-5 - x}deg)`;
});

initBook();
