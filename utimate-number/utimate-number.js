//變數
let min_num = 1;
let max_num = 100;
let gusse_num = RandomNum(min_num, max_num);

//DOM
let display_range = document.querySelector('.range-display');
let input_numbers = document.querySelector('.input-numbers');
let reset_btn = document.querySelector('.btn-reset');
let clear_btn = document.querySelector('.btn-clear')
let enter_btn = document.querySelector('.btn-enter');
let btn_number = document.querySelector('.main-btn-numbers');
let btn_numberAll = document.querySelectorAll('.btn-number');


//監聽
//數字按鈕顯示到輸入框
btn_numberAll.forEach(e => e.addEventListener('click', getNumbers));
//重來
reset_btn.addEventListener('click', resetGame);
//清除
clear_btn.addEventListener('click', clearNumber);
//確定
enter_btn.addEventListener('click', enterNumber);



//函式
//產生隨機亂數
function RandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
};

//重來
function resetGame() {
    min_num = 1;
    max_num = 100;
    display_range.innerText = `${min_num}-${max_num}`;
    gusse_num = RandomNum(min_num, max_num);
    input_numbers.value = ""
}

//清除
function clearNumber() {
    input_numbers.value = ''
}

//確定
function enterNumber(e) {
    let num = parseInt(input_numbers.value, 10);
    if (num > gusse_num && num < max_num) {
        max_num = num;
    }
    else if (num < gusse_num && num > min_num) {
        min_num = num;
    }
    else if (num == gusse_num) {
        alert("Good job！恭喜答對！");
        alert("再玩一次!");
        resetGame();
    }
    display_range.innerText = `${min_num}-${max_num}`;
    input_numbers.value = "";
}

//數字按鈕
function getNumbers(e) {
    let str = e.target.textContent;
    if (input_numbers.value.length < 2)
        input_numbers.value += str;
}