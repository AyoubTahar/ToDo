const checkTask = () => {
  if (allTasks === null) {
    allTasks = [];
  }
};

let allTasks = JSON.parse(localStorage.getItem("task"));
checkTask();

const taskName = document.getElementById("new-task-input");
const addButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const numberOfTask = document.querySelector(".number-of-task")
const clearAllTask = document.querySelector(".clear-all-task p")

const saveMyTask = () => {
  allTasks.push(taskName.value);
  localStorage.setItem("task", JSON.stringify(allTasks));
};

const deleteOneTask = (event) => {
  const clearTask = event.target; // Le bouton sur lequel on a cliqué
  const taskName = clearTask.previousElementSibling.textContent; // Le texte de la tâche (p)
  // Supprimer la tâche de allTasks
  for (let i = 0; i < allTasks.length; i++) {
    if (taskName === allTasks[i]) {
      allTasks.splice(i, 1); // Supprimer la tâche du tableau
      localStorage.setItem("task", JSON.stringify(allTasks)); // Mettre à jour le localStorage
      break; // On sort de la boucle une fois la tâche trouvée et supprimée
    }
  }
  // Supprimer l'élément du DOM
  clearTask.closest('.task-item').remove(); // Supprime l'élément du DOM
  showNumberOfTask()
};

const completeTask = (event) => {
  const completedTask = event.target.closest('.task-item')
  if (event.target.checked){
    completedTask.classList.add('completed')
  }
  else {
    completedTask.classList.remove('completed')
  }
}

const displayPreviousTask = () => {
  if (allTasks.length > 0) {
    allTasks.forEach((task) => {
      taskList.innerHTML += `<div class="task-item">
                <input type="checkbox" class="task-completed">
                <p class="task-name">${task}</p>
                <button class="delete-task">✖</button>
            </div>`;
    });
    // Attacher l'écouteur d'événements une fois que les tâches sont affichées
    document.querySelectorAll(".delete-task").forEach((clearTask) => {
      clearTask.addEventListener("click", deleteOneTask);
    })
    document.querySelectorAll('.task-completed').forEach((taskCompleted) => {
      taskCompleted.addEventListener("click",completeTask)
    })
    setTimeout(() => {
      document.querySelectorAll(".task-item").forEach((task) => {
        task.classList.add("appear");
      });
    }, 10);
  }
};

const displayNewTask = () => {
  if (taskName.value.trim() === "") return
  saveMyTask();
  const newTaskHTML = `<div class="task-item">
  <input type="checkbox" class="task-completed">
  <p class="task-name">${taskName.value}</p>
  <button class="delete-task">✖</button>
</div>`;
taskList.innerHTML += newTaskHTML;
// Attacher l'écouteur d'événements une fois que les tâches sont affichées
document.querySelectorAll(".delete-task").forEach((clearTask) => {
  clearTask.addEventListener("click", deleteOneTask);
})
document.querySelectorAll('.task-completed').forEach((taskCompleted) => {
  taskCompleted.addEventListener("click",completeTask)
})
// Récupère le dernier élément ajouté et applique l'animation
const newTaskElement = taskList.lastElementChild;
setTimeout(() => {
newTaskElement.classList.add("appear");
}, 10);
  taskName.value = "";
  showNumberOfTask();
};

const showNumberOfTask = () => {
  numberOfTask.innerHTML = `<p>Nombre de tâches : ${allTasks.length}</p>`
}

 const setTaskToZero = () => {
  localStorage.clear()
  location.reload()
}

displayPreviousTask();
showNumberOfTask();
addButton.addEventListener("click", displayNewTask);
clearAllTask.addEventListener("click",setTaskToZero)