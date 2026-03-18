let currentPage = 1;
const totalPages = 3;

// 初始化堆叠层级
function initPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.zIndex = totalPages - index;
    });
}

function updatePages(direction) {
    if (direction === 'next' && currentPage <= totalPages) {
        const page = document.getElementById(`p${currentPage}`);
        page.classList.add('flipped');
        
        // 关键修复：利用setTimeout在中段切换层级，杜绝视觉卡顿
        setTimeout(() => {
            page.style.zIndex = currentPage;
        }, 650); // 1.3s翻页时间的中点
        
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
        const page = document.getElementById(`p${currentPage}`);
        page.classList.remove('flipped');
        
        setTimeout(() => {
            page.style.zIndex = totalPages - currentPage + 1;
        }, 650);
    }
}

// 事件监听
document.getElementById('nextBtn').onclick = () => updatePages('next');
document.getElementById('prevBtn').onclick = () => updatePages('prev');

// 封面点击也能翻页
document.getElementById('p1').onclick = (e) => {
    if (currentPage === 1) updatePages('next');
};

const envelope = document.getElementById('envelope');
envelope.onclick = (e) => {
    e.stopPropagation(); // 阻止冒泡到页面点击翻页
    envelope.classList.toggle('open');
};

// 视角随动 3D 效果
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 45;
    const y = (window.innerHeight / 2 - e.pageY) / 45;
    document.getElementById('scene').style.transform = `rotateX(${10 + y}deg) rotateY(${-5 - x}deg)`;
});

initPages();
