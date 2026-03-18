let currentPage = 1;
const totalPages = 3;
let envStep = 0; // 0:关闭, 1:开盖, 2:弹信

function init() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.zIndex = totalPages - index;
    });
}

function updatePages(direction) {
    if (direction === 'next' && currentPage <= totalPages) {
        const page = document.getElementById(`p${currentPage}`);
        page.classList.add('flipped');
        setTimeout(() => { page.style.zIndex = currentPage; }, 650);
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
        const page = document.getElementById(`p${currentPage}`);
        page.classList.remove('flipped');
        setTimeout(() => { page.style.zIndex = totalPages - currentPage + 1; }, 650);
    }
}

// 信封分步逻辑
const envelope = document.getElementById('envelope');
const hintText = document.getElementById('hint-text');

envelope.onclick = (e) => {
    e.stopPropagation();
    if (envStep === 0) {
        envelope.classList.add('step1');
        hintText.innerText = "再次点击查看信件内容";
        envStep = 1;
    } else if (envStep === 1) {
        envelope.classList.add('step2');
        hintText.innerText = "点击信件收回";
        envStep = 2;
    } else {
        envelope.classList.remove('step1', 'step2');
        hintText.innerText = "点击信封开启";
        envStep = 0;
    }
};

document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');

// 视角随动
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    document.getElementById('scene').style.transform = `rotateX(${10 + y}deg) rotateY(${-5 - x}deg)`;
});

init();
