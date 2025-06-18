//유저가 값을 입력한다
//+ 버튼을 클릭하면, 할일이 추가된다
//delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할이이 끝나면서 밑줄이 간다
//1. check버튼을 클릭하는 순간 false->true로 바꿔준다
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로

//진행중 끝남 탭을 누르면, 언더바가 이동한다
//완료 탭은 끝난 아이템만, 진행중 탭은 진행중 아이템만
//전체 탭을 누르면 전체 아이템으로 돌아옴

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let underLine = document.getElementById('tab-underline');
let taskList = [];
let mode = 'all';
let filterList = [];

addButton.addEventListener('mousedown', addTask);
taskInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
function addTask() {
  let taskValue = taskInput.value;
  if (taskValue === '') return alert('할일을 입력해주세요');
  let task = {
    content: taskValue,
    isComplete: false,
    id: randomIDGenerate(),
  };

  taskList.push(task);
  taskInput.value = '';
  render();
}

function render() {
  let result = '';
  list = [];
  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'ongoing' || mode === 'done') {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      result += `<div class="task" id="${list[i].id}">
            <span class="task-done">${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    } else {
      result += `<div class="task" id="${list[i].id}" >
            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fa fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    }
  }

  document.getElementById('task-board').innerHTML = result;
}

function toggleDone(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
    }
  }

  filter();
}
function filter(e) {
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + 'px';
    underLine.style.left = e.target.offsetLeft + 'px';
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + 'px';
  } // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가

  filterList = [];
  if (mode === 'ongoing') {
    //진행중인 아이템을 보여준다.
    //task.isComplete=false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log('진행중', taskList);
  } else if (mode === 'done') {
    //끝나는 케이스
    //task.isComplete=true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
  console.log;
}
function randomIDGenerate() {
  return '_' + Math.random().toString(36).substring(2, 9);
}
