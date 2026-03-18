let currentPage = 1;
const totalPages = 3;

// 初始化页面堆叠顺序
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
        
        // 在翻页动画中段（700ms）切换层级，确保不遮挡
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

// 绑定按钮
document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');

// 封面点击也能翻页
document.getElementById('p1').onclick = (e) => {
    if (currentPage === 1) updatePages('next');
};

// 信封点击交互
const envelope = document.getElementById('envelope');
envelope.onclick = (e) => {
    e.stopPropagation(); // 阻止冒泡到页面点击事件
    envelope.classList.toggle('open');
};

// 鼠标视角随动效果
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 45;
    const y = (window.innerHeight / 2 - e.pageY) / 45;
    document.getElementById('scene').style.transform = `rotateX(${10 + y}deg) rotateY(${-5 - x}deg)`;
});

// 初始化执行
init();
