let taskToAdd = document.querySelector("#task");
let buttonToAdd = document.querySelector(".add");
let addHere = document.querySelector(".list");
let tagToMotivate = document.querySelector(".tagLine");
let tasksCount=0;
let tasks=JSON.parse(localStorage.getItem("tasks")) ||  [];   //Tasks is added to store each task seperately in array. first it find task value in local storage through task key but if no task is present we cant find value then return empty array . that key have array as its value
                                    
function toggleTaglineVisibility() {        //this function is for tagline adjustment .  tagline appears only when there is not any task added in the list
    tagToMotivate.style.display = tasksCount === 0 ? "flex" : "none";
}

function addTask(taskObj)
{
    //the main task box
    let newTask = document.createElement("div");

    let Checkbox = document.createElement("input");  //the check if completed
    let theTask = document.createElement("label");   //the text of task
    let removeTheTask = document.createElement("button");  //to remove task the (cross)
    removeTheTask.textContent="✕"

    //classes and id define for styling
    newTask.id="myTask";
    newTask.classList.add("task-box");
    Checkbox.type = "checkbox";
    Checkbox.classList.add("checker");
    Checkbox.checked=taskObj.completed;
    theTask.classList.add("textOfTask");
    removeTheTask.classList.add("remove");

    theTask.textContent = taskObj.text;

    //to remove the task when completed
    removeTheTask.addEventListener("click",()=>{
    newTask.remove();    
    tasks=tasks.filter(t=>t.text!=taskObj.text);  //this just completely removes your task from the memory
    localStorage.setItem("tasks",JSON.stringify(tasks));
    tasksCount--;
    toggleTaglineVisibility();
    })

    Checkbox.addEventListener("change",()=>{
        taskObj.completed=Checkbox.checked;
        newTask.remove();
        let removeTask=taskObj;
        tasks=tasks.filter(t=>t.text!=taskObj.text);
        tasks.push(removeTask);
        localStorage.setItem("tasks",JSON.stringify(tasks));
        addTask(removeTask);
    })

    newTask.appendChild(Checkbox);
    newTask.appendChild(theTask);
    newTask.appendChild(removeTheTask);
    if(taskObj.completed===false) addHere.prepend(newTask);
    else addHere.appendChild(newTask);
}

function toAddInTheList() {

    let task=taskToAdd.value.trim();
    if(task=="")  return;

    let taskObj={text:task , completed:false};
    tasks.push(taskObj);
    localStorage.setItem("tasks",JSON.stringify(tasks));

    addTask(taskObj);
        
    taskToAdd.value="";
    tasksCount++;
    toggleTaglineVisibility();
}

window.addEventListener("load",()=>{
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(eachTask => {
        addTask(eachTask);
        tasksCount++;
    });
    toggleTaglineVisibility();
})

buttonToAdd.addEventListener("click", toAddInTheList);

taskToAdd.addEventListener("keydown", function (e) {
    if (e.key === "Enter") 
        toAddInTheList();
});