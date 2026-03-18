let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const p3 = document.querySelector("#p3");

// 翻页逻辑修正
function openBook() {
    book.style.transform = "translateX(50%)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                p1.classList.add("flipped");
                p1.style.zIndex = 1;
                break;
            case 2:
                p2.classList.add("flipped");
                p2.style.zIndex = 2;
                break;
            case 3:
                p3.classList.add("flipped");
                p3.style.zIndex = 3;
                break;
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                p1.classList.remove("flipped");
                p1.style.zIndex = 3;
                break;
            case 3:
                p2.classList.remove("flipped");
                p2.style.zIndex = 2;
                break;
            case 4:
                p3.classList.remove("flipped");
                p3.style.zIndex = 1;
                break;
        }
        currentLocation--;
    }
}

// 按钮事件
nextBtn.addEventListener("click", goNextPage);
prevBtn.addEventListener("click", goPrevPage);

// 信封显示控制
function showEnvelope() {
    document.getElementById('overlay').style.display = 'flex';
}

function hideEnvelope() {
    document.getElementById('overlay').style.display = 'none';
}
