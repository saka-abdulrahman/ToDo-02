//! ..........................GET ELEMENTS.......................... !//

const leftList = document.querySelector("#left-list");
const rightList = document.querySelector("#right-list");
const taskHTML = document.querySelector(".task");
const add = document.querySelector("#add-button");

// console.log(leftList, rightList, taskHTML, add);

const taskBottons = document.querySelectorAll(".task-buttons-childs");
const bottom = document.querySelector(".bottom");
//! .......................END : GET ELEMENTS .......................!//

//* ..........................FUNCTIONS.......................... *//

leftList.innerHTML = "";
// print the out put in HTML
const printLeftList = function () {
  leftList.innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `
         
         <div class="task">
            <div class="top">
              <!-- task title -->
              <div class="task-title">
                <h3 class="task-title-content">
                  ${task.title}
                </h3>
              </div>
              <!-- ///end of task title -->
              <!-- task buttons  -->
              <div class="task-buttons button">
                <button onclick="checkDone(${index},${"tasks"},${"doneTasks"})" class="task-buttons-childs button done">
                  <span class="material-symbols-outlined"> check </span>
                </button>
                <button onclick="editTaskTitle(${index},${"tasks"})" class="task-buttons-childs button edit">
                  <span class="material-symbols-outlined"> edit </span>
                </button>
                <button onclick="deleteTask(
                  ${index},${"tasks"}
                )" class="task-buttons-childs button delete">
                  <span class="material-symbols-outlined"> delete </span>
                </button>
              </div>
            </div>
            <!-- ///end of task buttons  -->
            <!-- date  -->
            <div class="bottom">
              <span class="material-symbols-outlined calendar">
                calendar_month
              </span>
              <h4 class="date">${task.date}</h4>
            </div>
            <!-- ///end of date  -->
          </div>
  `;
    leftList.innerHTML += content;
    index++;
  }
};
//
const printRightList = function () {
  rightList.innerHTML = "";
  let index = 0;
  for (donetask of doneTasks) {
    let content = `
  
         <div class="task">
            <div class="top">
              <!-- task title -->
              <div class="task-title">
                <h3 class="task-title-content">
                  ${donetask.title}
                </h3>
              </div>
              <!-- ///end of task title -->
              <!-- task buttons  -->
              <div class="task-buttons button">
                <button onclick="checkDone(${index},${"doneTasks"},${"tasks"})" class="task-buttons-childs button done">
                  <span class="material-symbols-outlined"> check </span>
                </button>
                <button onclick="editTaskTitle(${index},${"doneTasks"})" class="task-buttons-childs button edit">
                  <span class="material-symbols-outlined"> edit </span>
                </button>
                <button onclick="deleteTask(
                  ${index},${"doneTasks"}
                )" class="task-buttons-childs button delete">
                  <span class="material-symbols-outlined"> delete </span>
                </button>
              </div>
            </div>
            <!-- ///end of task buttons  -->
            <!-- date  -->
            <div class="bottom">
              <span class="material-symbols-outlined calendar">
                calendar_month
              </span>
              <h4 class="date">${donetask.date}</h4>
            </div>
            <!-- ///end of date  -->
          </div>
  `;
    rightList.innerHTML += content;
    index++;
  }
};
// check if the title only string with no spaces
const checkForTitle = function (title) {
  let count = 0;
  for (letter of title) {
    letter === " " ? count++ : "";
  }

  return typeof title === "string" && title.length !== count ? true : false;
};
// return the date of layout DD/MM/YYYY
const getTheDate = function () {
  let d = new Date();
  let date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  return date;
};

//* ........................END:  FUNCTIONS .......................*//

//?..............................MAIN..............................?//

let tasks = [];
let doneTasks = [];

add.addEventListener("click", () => {
  let title = prompt("Enter the task title");

  if (checkForTitle(title)) {
    let date = getTheDate();
    let task = {
      title,
      date,
      isDone: false,
    };

    tasks.push(task);
    printLeftList();
    printRightList();
  }
});

// ! Main Functions ! //
// * > delete
function deleteTask(index, arr) {
  let taskOfindex = arr[index];
  let confirmQ = confirm(`Are you sure? delete "${taskOfindex.title}"`);

  if (confirmQ) {
    arr.splice(index, 1);
    printLeftList();
    printRightList();
  }
}
// * > edit

function editTaskTitle(index, arr) {
  let taskOfindex = arr[index];
  let editedTitle = prompt(`Enter the new title of "${taskOfindex.title}"`);
  taskOfindex.title = editedTitle;

  printLeftList();
  printRightList();
}

// * > check-done       // need to be fixed
function checkDone(index, tasks1, tasks2) {
  tasks1[index].isDone = !tasks1[index].isDone;

  tasks2.push(tasks1[index]);
  tasks1.splice(index, 1);

  printLeftList();
  printRightList();
}

//? ...........................END: MAIN?...........................//
