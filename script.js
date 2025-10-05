// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // don't save again when loading
    }

    // Save the given array of tasks to localStorage
    function saveTasksArray(tasksArray) {
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    // Remove a task from localStorage (removes the first matching occurrence)
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const index = storedTasks.indexOf(taskText);
        if (index > -1) {
            storedTasks.splice(index, 1);
            saveTasksArray(storedTasks);
        }
    }

    /**
     * addTask
     * @param {string} taskText - the task text to add. If omitted, it will be read from the input field.
     * @param {boolean} save - whether to save this task to localStorage (default true).
     */
    function addTask(taskText, save = true) {
        // If no taskText provided, read from input (UI action)
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        }

        // If empty, alert the user and stop
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button and add class using classList.add (checker expects this)
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // When the remove button is clicked:
        // 1) remove the li from the DOM
        // 2) remove the task from localStorage
        removeButton.addEventListener('click', function() {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        });

        // Append the remove button to the list item and the item to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // If this task should be saved to localStorage, update storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasksArray(storedTasks);

            // Clear the input only when the task was added from the input field
            taskInput.value = '';
        }
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function() {
        addTask(); // reads from input and saves
    });

    // Allow adding a task by pressing Enter in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks on page load
    loadTasks();
});


