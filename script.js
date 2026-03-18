let currentPage = 1;
const totalPages = 3;
let envStep = 0;

// 初始化：为每一页设置物理堆叠高度
function initBook() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.zIndex = totalPages - index;
        // 微小的 translateZ 产生厚度感
        page.style.transform = `translateZ(${(totalPages - index) * 0.5}px)`;
    });
}

function updatePages(direction) {
    if (direction === 'next' && currentPage < totalPages) {
        const page = document.getElementById(`p${currentPage}`);
        page.classList.add('flipped');
        // 翻页过程中段切换 z-index 防止穿透
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

// 信封分步交互逻辑
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
        hint.innerText = "点击信件收回";
        envStep = 2;
    } else {
        envelope.classList.remove('step1', 'step2');
        hint.innerText = "点击封口开启信封";
        envStep = 0;
    }
};

// 按钮绑定
document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');

// 封面点击快捷翻页
document.getElementById('p1').onclick = () => { if(currentPage === 1) updatePages('next'); };

// 视角随动
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 45;
    const y = (window.innerHeight / 2 - e.pageY) / 45;
    document.getElementById('scene').style.transform = `rotateX(${10 + y}deg) rotateY(${-5 - x}deg)`;
});

initBook();
