let courseId = -1;
let courseDetails;
let tasksChecked = 0;
let completeButtonDisabled = false;
const noOfTasks = 3;

window.addEventListener('onload', initializeCourse());

function getId() {
    const splitUrl = window.location.href.split('/');
    const fullParam = splitUrl[splitUrl.length - 1];
    const splitParam = fullParam.split('=');
    courseId = splitParam[splitParam.length - 1];
    return courseId;
}

function initializeCourse() {
    courseDetails = new CourseDetailsModel(
        getId(),
        '../assets/course_cover.jpg',
        3,
        courseDummyDetails.materials,
        courseDummyDetails.tasks,
        courseDummyDetails.title,
        courseDummyDetails.author
    );
    generateMaterialElements();
    generateTaskElements();
}

function generateMaterialElements() {
    const materialsContainer = document.querySelector('.material-list');
    courseDetails.materials.forEach(material => {
        materialsContainer.insertAdjacentHTML('beforeend', `
        <li class="list-item">
            ${material}
        </li>
        `);
    });
}

function generateTaskElements() {
    const tasksContainer = document.querySelector('.task-list');
    for (i = 0; i < courseDetails.tasks.length; i++) {
        tasksContainer.insertAdjacentHTML('beforeend', `
        <li class="list-item" tabindex="-1" role="option">
            <input tabindex="-1" id="check-${i}" type="checkbox" onclick="checkTasksDone('check-${i}')">
            <label for="check-${i}"> ${courseDetails.tasks[i]} </label>
        </li>
        `);
    }
}

function checkTasksDone(checkId) {
    const checkbox = document.getElementById(checkId);
    if (checkbox.checked) {
        tasksChecked = tasksChecked + 1;
    } else {
        tasksChecked = tasksChecked - 1;
    }
    if (tasksChecked === noOfTasks) {
        document.getElementById('complete-button').disabled = false;
    } else {
        document.getElementById('complete-button').disabled = true;
    }
}