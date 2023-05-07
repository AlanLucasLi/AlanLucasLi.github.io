//宣告
const myStorage = window.localStorage;
const storageDataName = "data";
let localData = [
    // {
    //     state:"",
    //     title: '',
    //     detials: ''
    // }
];
//DOM物件
addTitle = document.querySelector("input");
addBTN = document.querySelector("#button-add");
toDoList = document.querySelector("#todolist");
//添加local資料
function addStorage() {
    let data = {
        state: false,
        title: "無名標題",
        detials: "請輸入詳細內容"
    }
    if (addTitle.value.length != 0) {
        data.title = addTitle.value;
    }
    localData.push(data);
    pushLocalData()
    loadStorage();
}
//讀取local資料
function loadStorage() {
    toDoList.innerHTML = "";
    if (myStorage.getItem(storageDataName) != null) {
        localData = JSON.parse(myStorage.getItem("data"));
        console.log(localData);
        localData.forEach((item, index) => {
            renderToDoList(null, item, index);
        })
    }
}
//渲染todolist
function renderToDoList(e, item, idx) {
    const state = item.state;
    const title = item.title;
    const text = item.detials;
    if (text.length == 0) {
        text = "請輸入詳細內容";
    }
    //標題
    let input = document.createElement('input');
    input.classList.add('form-check-input', 'm-0', 'mx-2');
    input.setAttribute('type', 'checkbox');
    input.onclick = tick;
    let divTitle = document.createElement('div');
    divTitle.classList.add("accordion-button", "collapsed");
    divTitle.setAttribute('type', 'button');
    divTitle.setAttribute('data-bs-toggle', 'collapse');
    divTitle.setAttribute('aria-expanded', 'false');
    if (state == true) {
        input.setAttribute("checked", "");
        divTitle.classList.add("bg-body-secondary");
    }
    let p = document.createElement('p');
    p.classList.add('m-0');
    p.innerText = title;
    divTitle.append(input, p);
    let h2 = document.createElement('h2');
    h2.classList.add('accordion-header');

    h2.addEventListener('click', openDetail);
    h2.appendChild(divTitle);
    //內容
    let textDetails = document.createElement('textarea');
    textDetails.classList.add('text', 'col-12');
    textDetails.setAttribute("disabled", "");
    textDetails.addEventListener("keyup", textAreaHeight);
    textDetails.innerText = text;
    //按鈕
    let btnSave = document.createElement('button');
    btnSave.classList.add("btn", "btn-success", "d-none");
    btnSave.addEventListener("click", save);
    btnSave.innerText = '保存';
    let btnEdit = document.createElement('button');
    btnEdit.classList.add("btn", "btn-warning");
    btnEdit.addEventListener('click', edit);
    btnEdit.innerText = '編輯';
    let btnDelete = document.createElement('button');
    btnDelete.classList.add("btn", "btn-danger");
    btnDelete.addEventListener('click', remove);
    btnDelete.innerText = '刪除';
    //按鈕容器
    let divBTN = document.createElement('div');
    divBTN.classList.add('btn-action', 'text-end');
    divBTN.append(btnSave, btnEdit, btnDelete);
    let divBody = document.createElement('div');
    divBody.classList.add("accordion-collapse", "collapse", "accordion-body", "py-1");
    divBody.setAttribute('data-bs-parent', "#todolist");
    divBody.append(textDetails, divBTN);
    let li = document.createElement('li');
    li.setAttribute("data-idx", idx);
    li.classList.add('accordion-item');

    li.append(h2, divBody);
    toDoList.appendChild(li);
    addTitle.value = '';
}
//打勾
function tick(event) {
    const li = event.target.parentNode.parentNode.parentNode;
    const input = event.target;
    const index = li.dataset.idx;
    if (input.checked) {
        localData[index].state = true;
    } else {
        localData[index].state = false;
    }
    pushLocalData()
    loadStorage()
    event.stopPropagation();
}
// 保存
function save(event) {
    const accordDiv = event.target.parentNode.parentNode;
    const saveBtn = event.target;
    const editBtn = accordDiv.querySelector(".btn-warning");
    const content = accordDiv.querySelector('.text');
    content.setAttribute("readonly", "");
    content.setAttribute("disabled","");
    content.classList.remove("border", "border-secondary", "border-2");
    saveBtn.classList.add("d-none");
    editBtn.classList.remove("d-none");
    const label = accordDiv.querySelector("label");
    const input = accordDiv.querySelector("input");
    const li = accordDiv.parentNode;
    const todoTitle = li.querySelector("p");
    todoTitle.innerText = input.value;
    //待處理為\n
    localData[li.dataset.idx].detials = content.value;
    localData[li.dataset.idx].title = input.value;
    pushLocalData();
    label.remove();
    input.remove();
}
// 編輯
function edit(event) {
    const editBtn = event.target;
    const parent = event.target.parentNode.parentNode;
    const saveBtn = parent.querySelector(".btn-success");
    const content = parent.querySelector('.text');
    const todoTitle = parent.parentNode.querySelector("p");
    content.removeAttribute("readonly");
    content.removeAttribute("disabled");
    content.classList.add("border", "border-secondary", "border-2");
    saveBtn.classList.remove("d-none");
    editBtn.classList.add("d-none");
    //修改標題
    let label = document.createElement('label');
    label.innerText = "標題";
    let input = document.createElement("input");
    input.placeholder = "修改標題";
    input.value = todoTitle.innerText;
    parent.prepend(label);
    parent.insertBefore(input, content);
}
// 刪除
function remove(event) {
    const li = event.target.parentNode.parentNode.parentNode;
    const index = li.dataset.idx;
    localData.splice(index, 1);
    li.remove();
    pushLocalData();
    loadStorage();
}
// 開啟詳細資料
function openDetail(event) {
    let target = event.target.parentNode.parentNode;
    if (event.target.localName != "div") {
        target = target.parentNode;
    }
    let content = target.querySelector('.accordion-body');
    content.classList.toggle('show');
    event.stopPropagation();
}
//更新local
function pushLocalData() {
    myStorage.setItem(storageDataName, JSON.stringify(localData));
}

window.onload = () => {
    loadStorage()
    addBTN.onclick = addStorage;
}
function textAreaHeight(event) {
    while (event.key == "Enter") {
        let textArea = event.target;
        textArea.style.height = (textArea.scrollHeight)+"px";
        break;
    }
}
// function cloneAdd() {
//     //怎樣用????
//     let temp = document.querySelector('template');
//     let li = temp.querySelector('li').cloneNode(true);
//     toDoList.appendChild(li);
// }
