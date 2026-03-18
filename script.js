let currentPage = 1;
const totalPages = 3;
const book = document.getElementById('book');
const scene = document.getElementById('scene');
const envelope = document.getElementById('envelope');

// 翻页逻辑
function updatePages(direction) {
    if (direction === 'next' && currentPage <= totalPages) {
        const page = document.getElementById(`p${currentPage}`);
        page.classList.add('flipped');
        // 翻过去后，减小它的基础 Z 轴，防止遮挡
        page.style.zIndex = currentPage;
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
        const page = document.getElementById(`p${currentPage}`);
        page.classList.remove('flipped');
        page.style.zIndex = totalPages - currentPage;
    }
}

// 按钮监听
document.getElementById('nextBtn').addEventListener('click', () => updatePages('next'));
document.getElementById('prevBtn').addEventListener('click', () => updatePages('prev'));

// 信封点击交互
envelope.addEventListener('click', (e) => {
    e.stopPropagation(); // 防止触发翻页
    envelope.classList.toggle('open');
});

// 鼠标 3D 随动效果
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 30;
    const y = (window.innerHeight / 2 - e.pageY) / 30;
    scene.style.transform = `rotateX(${10 + y}deg) rotateY(${-10 - x}deg)`;
});

// 触摸支持
let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
document.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) updatePages('next');
    if (touchEndX - touchStartX > 50) updatePages('prev');
});
