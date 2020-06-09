let courseDetails;
let tasksChecked = 0;
let completeButtonDisabled = false;
const noOfTasks = 3;
const coursesUrl = 'http://127.0.0.1:8125/Courses';

window.addEventListener('onload', initializeCourse());
window.addEventListener('onload', setUser());

function getId() {
    const splitUrl = window.location.href.split('/');
    const fullParam = splitUrl[splitUrl.length - 1];
    const splitParam = fullParam.split('=');
    return splitParam[splitParam.length - 1];
}

function initializeCourse() {
    getCourseById(getId());
}

function getCourseById(courseId) {
    fetch(`${coursesUrl}/?courseId=${courseId}`)
        .then(res => res.json())
        .then(course => {
            courseDetails = new CourseDetailsModel(
                course._id,
                course.image,
                course.rating,
                course.materials,
                course.tasks,
                course.title,
                course.author
            );
            generateMaterialElements();
            generateTaskElements();
        })
        .catch(err => console.log(err));
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

function completeCourse() {
    if (userModel.coursesCompleted === null) {
        userModel.coursesCompleted = 1;
    } else {
        userModel.coursesCompleted = userModel.coursesCompleted + 1;
    }

    fetch(`${userUrl}/Update`, {
        method: 'POST',
        body: JSON.stringify({ username: userModel.username, coursesCompleted: userModel.coursesCompleted })
    })
        .then(res => res.json())
        .then(data => console.log('User completed course'))
        .catch (err => console.log(err));
        
        window.location.href = '../pages/index.html';
}