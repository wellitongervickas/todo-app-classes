var addTaskBtnElement = document.getElementById('add-task-btn');
var addTaskModalElement = document.getElementById('add-task-modal');
var addTaskModalCloseBtnElement = document.getElementById('add-task-modal-close-btn');
var addTaskModalFormElement = document.getElementById('add-task-modal-form')
var tasksListElement = document.getElementById('tasks-list')


addTaskBtnElement.addEventListener('click', toggleModal)
addTaskModalCloseBtnElement.addEventListener('click', toggleModal)
addTaskModalFormElement.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const elements = event.target.elements;

    const task = {
        id: '',
        label: '',
        start: '',
        end: '',
        repeat: '',
        done: false,
    }

    Object.values(elements).forEach((element) => {
        if (element.id === 'label') {
            task.label = element.value;
        } 
        else if (element.id === 'start') {
            task.start = element.value;
        }
        else if (element.id === 'end') {
            task.end = element.value;
        }
        else if (element.id === 'repeat') {
            task.repeat = element.value;
        }
    })

    task.id = Date.now()

    saveTask(task)
})

function toggleModal(){
    addTaskModalElement.classList.toggle('hidden')
}

function getTasks() {
    const taskAsString = window.localStorage.getItem('tasks')
    return taskAsString ? JSON.parse(taskAsString) : []
}

function saveTasks(tasks) {
    const tasksAsString = JSON.stringify(tasks)
    window.localStorage.setItem('tasks', tasksAsString)
}

function saveTask(task) {
    const savedTasks = getTasks()
    savedTasks.push(task)

    saveTasks(savedTasks)
}

function doneTask(id, done) {
    const tasks = getTasks()

    const newTasks = tasks.map((task) => {
        if (task.id === id) {
            task.done = done
        }

        return task
    })

    saveTasks(newTasks)
}

function addTasksToList(tasks) {
    tasks.forEach((task, index) => {
        const liElement = document.createElement('li')
        liElement.classList.add('bg-gray-200', 'p-6', 'rounded-lg', 'flex', 'items-center', 'justify-between')
        const divElement = document.createElement('div')
        divElement.classList.add('flex', 'gap-4', 'items-center')

        const checkboxElement = document.createElement('input')
        checkboxElement.type = 'checkbox'
        checkboxElement.id = `task-${index}`
        checkboxElement.classList.add('size-6', 'text-blue-600', 'bg-gray-100', 'border-gray-300', 'rounded', 'focus:ring-blue-500', 'focus:ring-2')
        checkboxElement.checked = task.done

        const labelElement = document.createElement('label')
        labelElement.htmlFor = `task-${index}`
        labelElement.classList.add('font-medium')
        labelElement.textContent = task.label

        liElement.appendChild(divElement)
        divElement.appendChild(checkboxElement)
        divElement.appendChild(labelElement)

        tasksListElement.appendChild(liElement)
    })
}

function addTasksEventListeners(tasks) {
     tasks.forEach((task, index) => {
        const checkboxElement = document.getElementById(`task-${index}`)
        
        checkboxElement.addEventListener('change', () => {
            doneTask(task.id, checkboxElement.checked)
        })
    })
}

const main = () => {
   const tasks = getTasks()

   addTasksToList(tasks)
   addTasksEventListeners(tasks)
}

main()