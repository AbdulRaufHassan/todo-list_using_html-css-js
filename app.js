function addTask() {
    const userTskName = document.getElementById('inputField');
    if (userTskName.value.trim()) {
        if (userTskName.value.trim().length <= 100) {
            let getData = localStorage.getItem('users');
            let parseData = JSON.parse(getData);
            const taskObj = {
                taskName: userTskName.value,
                tskStatus: 'incomplete'
            }
            if (!getData) {
                parseData = [];
            }
            parseData.push(taskObj);
            localStorage.setItem('users', JSON.stringify(parseData));
            displayData();
            userTskName.value = '';
        }
        else {
            Swal.fire({
                icon: "warning",
                title: 'Character Limit Exceeded',
                text: "Task name should be within 100 characters",
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: 'Empty input field',
            text: "Please enter a task name before adding",
        });
        userTskName.value = '';
    }
}


function displayData() {
    const userTskList = document.getElementById('userTasks');
    const countCompletedTask = document.getElementById('countCompleteTask');
    let getData = localStorage.getItem('users');
    let parseData = JSON.parse(getData);
    if (parseData && parseData.length > 0) {
        userTskList.innerHTML = ``;
        let count = 0;
        for (let i = 0; i < parseData.length; i++) {
            let statusColorChng = parseData[i].tskStatus === 'incomplete' ? 'rgb(1, 1, 71)' : 'green';
            let statusBtnIcon = parseData[i].tskStatus === 'incomplete' ? 'fa-solid fa-check' : 'fa-solid fa-xmark';
            let statusIconColr = parseData[i].tskStatus === 'incomplete' ? 'green' : 'red';
            let lineThroughInput = parseData[i].tskStatus === 'incomplete' ? 'none' : 'line-through';
            if (parseData[i].tskStatus === 'complete') {
                count++;
            }
            document.querySelector('.ParentDivData').classList.remove('removePadding');
            countCompletedTask.innerText = `${count} from ${parseData.length}`;
            countCompletedTask.style.display = 'block';
            userTskList.innerHTML += `
        <div class="task"><span id="statusChngeColor" style="background-color: ${statusColorChng}"></span><span id="userInput" style="text-decoration:${lineThroughInput}">${parseData[i].taskName}</span><span class="btns"><span><i
        class="${statusBtnIcon}" id="statusBtn" onClick="statusChng(${i})" style="color: ${statusIconColr};-webkit-text-stroke:2px ${statusIconColr}"></i></span><span><i class="fa-solid fa-pen-to-square"
        id="editBtn" onClick="focusField(${i})"></i></span><span><i class="fa-solid fa-trash" id="deleteBtn" onClick="deleteTsk(${i})"></i></span></span><span id="status" style="color:${statusColorChng};border:3px solid ${statusColorChng}">${parseData[i].tskStatus}</span></div>`
        }
    } else {
        countCompletedTask.style.display = 'none';
        userTskList.style.height = '100%';
        document.querySelector('.ParentDivData').classList.add('removePadding');
        userTskList.innerHTML = `<div id="emptyListDiv">
        <img src="images_and_fonts/images/emptyList_img.png" height="270px" loading="lazy">
        <p>No todo yet</p></div>`;
    }
}

displayData();

const statusBtn = document.getElementById('statusBtn');
function statusChng(id) {
    let getData = localStorage.getItem('users');
    let parseData = JSON.parse(getData);
    if (parseData[id].tskStatus === 'incomplete') {
        parseData[id].tskStatus = 'complete';
    } else {
        parseData[id].tskStatus = 'incomplete';
    }
    localStorage.setItem('users', JSON.stringify(parseData));
    displayData();
}


const deleteBtn = document.getElementById('deleteBtn');
function deleteTsk(id) {
    let getData = localStorage.getItem('users');
    let parseData = JSON.parse(getData);
    parseData.splice(id, 1);
    localStorage.setItem('users', JSON.stringify(parseData));
    displayData();
}

const saveBtn = document.getElementById('saveNewName');
const addButton = document.getElementById('addBtn');
let edit_id;
function focusField(id) {
    const inputField = document.getElementById('inputField');
    addButton.style.display = 'none';
    saveBtn.style.display = 'block';
    let getData = localStorage.getItem('users');
    let parseData = JSON.parse(getData);
    inputField.focus();
    inputField.value = parseData[id].taskName;
    edit_id = id;
    inputField.placeholder = 'Edit your todo here...';
}

saveBtn.addEventListener('click', function () { editTskName(edit_id) });
function editTskName(edit_id) {
    let getData = localStorage.getItem('users');
    let parseData = JSON.parse(getData);
    const newName = document.getElementById('inputField');
    if (newName.value.trim()) {
        parseData[edit_id].taskName = newName.value;
        localStorage.setItem('users', JSON.stringify(parseData));
    }
    displayData();
    newName.value = '';
    const addBtn = document.getElementById('addBtn');
    addButton.style.display = 'block';
    inputField.placeholder = 'Enter your todo here...';
    saveBtn.style.display = 'none';
}

