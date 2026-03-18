let currentPage = 1;
const totalPages = 3;

function initPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        // 设置初始物理堆叠，第一页在最前
        page.style.zIndex = totalPages - index;
    });
}

function updatePages(direction) {
    if (direction === 'next' && currentPage <= totalPages) {
        const page = document.getElementById(`p${currentPage}`);
        page.classList.add('flipped');
        
        // 关键：翻页动画中途调整层级，避免视觉卡顿
        setTimeout(() => {
            page.style.zIndex = currentPage; 
        }, 500); 

        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
        const page = document.getElementById(`p${currentPage}`);
        page.classList.remove('flipped');
        
        setTimeout(() => {
            page.style.zIndex = totalPages - currentPage + 1;
        }, 500);
    }
}

// 事件绑定
document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');

const envelope = document.getElementById('envelope');
envelope.onclick = (e) => {
    e.stopPropagation();
    envelope.classList.toggle('open');
};

// 鼠标视角随动（优化阻尼系数）
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    document.getElementById('scene').style.transform = `rotateX(${10 + y}deg) rotateY(${-5 - x}deg)`;
});

initPages();
