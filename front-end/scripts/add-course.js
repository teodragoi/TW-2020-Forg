let materialCount = 1;
let taskCount = 1;

const coursesUrl = 'http://127.0.0.1:8125/Courses';

window.addEventListener('onload', addCourse());

function addCourse() {
    const form = document.getElementById('form');
    const materials = [];
    const tasks = [];

    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        for (i = 1; i <= materialCount; i++) {
            materials.push(formData.get(`material${i}`));
        }
        for (i = 1; i <= taskCount; i++) {
            tasks.push(formData.get(`task${i}`));
        }

        const courseDetails = new CourseDetailsModel(
            null,
            'Some image',
            0,
            materials,
            tasks,
            formData.get('title'),
            formData.get('author'),
        );
        createCourse(courseDetails);
    }
}

function addMaterialField() {
    materialCount = materialCount + 1;
    const materialsContainer = document.querySelector('.materials-container');
    materialsContainer.insertAdjacentHTML('beforeend', `
    <div id="input-material${materialCount}">
        <label for="material${materialCount}">Material ${materialCount}</label>
        <div id="material${materialCount}" class="input-container">
            <input type="text" placeholder="Material${materialCount}" name="material${materialCount}">
            <i id="icon-remove-material${materialCount}" class="far fa-minus-square fa-2x add-remove-icon" onclick="removeField('input-material${materialCount}')"></i>
            <i id="icon-add-material${materialCount}" class="far fa-plus-square fa-2x add-remove-icon" onclick="addMaterialField()"></i>
        </div>
    </div>
    `);
    const removeIcon = document.getElementById(`icon-remove-material${materialCount - 1}`)
    const addIcon = document.getElementById(`icon-add-material${materialCount - 1}`);
    if (addIcon) {
        addIcon.remove();
        if (removeIcon) {
            removeIcon.remove();
        }
    }
}

function addTaskField() {
    taskCount = taskCount + 1;
    const tasksContainer = document.querySelector('.tasks-container');
    tasksContainer.insertAdjacentHTML('beforeend', `
    <div id="input-task${taskCount}">
        <label for="task${taskCount}">Task ${taskCount}</label>
        <div id="task${taskCount}" class="input-container">
            <input type="text" placeholder="Task${taskCount}" name="task${taskCount}">
            <i id="icon-remove-task${taskCount}" class="far fa-minus-square fa-2x add-remove-icon" onclick="removeField('input-task${taskCount}')"></i>
            <i id="icon-add-task${taskCount}" class="far fa-plus-square fa-2x add-remove-icon" onclick="addTaskField()"></i>
        </div>
    </div>
    `);
    const removeIcon = document.getElementById(`icon-remove-task${taskCount - 1}`)
    const addIcon = document.getElementById(`icon-add-task${taskCount - 1}`);
    if (addIcon) {
        addIcon.remove();
        if (removeIcon) {
            removeIcon.remove();
        }
    }
}

function removeField(elementId) {
    const field = document.getElementById(elementId);
    field.remove();

    if (elementId.includes('material')) {
        materialCount = materialCount - 1;
        if (materialCount !== 1) {
            const lastInputContainer = document.getElementById(`material${materialCount}`);
            lastInputContainer.insertAdjacentHTML('beforeend', `
            <i id="icon-remove-material${materialCount}" class="far fa-minus-square fa-2x add-remove-icon" onclick="removeField('input-material${materialCount}')"></i>
            <i id="icon-add-material${materialCount}" class="far fa-plus-square fa-2x add-remove-icon" onclick="addMaterialField()"></i>
        `);
        } else {
            const lastInputContainer = document.getElementById(`material1`);
            lastInputContainer.insertAdjacentHTML('beforeend', `
            <i id="icon-add-material1" class="far fa-plus-square fa-2x add-remove-icon" onclick="addMaterialField()"></i>
        `);
        }
    } else {
        taskCount = taskCount - 1;
        if (taskCount !== 1) {
            const lastInputContainer = document.getElementById(`task${taskCount}`);
            lastInputContainer.insertAdjacentHTML('beforeend', `
            <i id="icon-remove-task${taskCount}" class="far fa-minus-square fa-2x add-remove-icon" onclick="removeField('input-task${taskCount}')"></i>
            <i id="icon-add-task${taskCount}" class="far fa-plus-square fa-2x add-remove-icon" onclick="addTaskField()"></i>
        `);
        } else {
            const lastInputContainer = document.getElementById(`task1`);
            lastInputContainer.insertAdjacentHTML('beforeend', `
            <i id="icon-add-task1" class="far fa-plus-square fa-2x add-remove-icon" onclick="addTaskField()"></i>
        `);
        }
    }
}

function createCourse(courseModel) {
    fetch(coursesUrl, {
            method: 'POST',
            body: JSON.stringify(courseModel)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    window.location.href = "../pages/index.html";
}