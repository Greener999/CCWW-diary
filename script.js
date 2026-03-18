let currentPage = 1;
const totalPages = 3;
let envStep = 0;

function renderPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        const pageNum = index + 1;
        
        if (pageNum < currentPage) {
            // 已翻页：确保在底层，旋转 180 度
            page.style.zIndex = pageNum;
            page.style.transform = `rotateY(-180deg)`;
        } else if (pageNum === currentPage) {
            // 当前页：顶层
            page.style.zIndex = 100;
            page.style.transform = `rotateY(0deg)`;
        } else {
            // 待翻页：按顺序堆叠，并增加微小厚度感
            page.style.zIndex = totalPages - index;
            page.style.transform = `rotateY(0deg) translateZ(${(totalPages - index) * -1}px)`;
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

// 信封逻辑：控制文字显隐
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

document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');

renderPages();
