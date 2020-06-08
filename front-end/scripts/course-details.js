let courseDetails;
let tasksChecked = 0;
let completeButtonDisabled = false;
let userModel;
const noOfTasks = 3;
const coursesUrl = 'http://127.0.0.1:8125/Courses';
const userUrl = 'http://127.0.0.1:8125/Users';

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
    // courseDetails = new CourseDetailsModel(
    //     getId(),
    //     '../assets/course_cover.jpg',
    //     3,
    //     courseDummyDetails.materials,
    //     courseDummyDetails.tasks,
    //     courseDummyDetails.title,
    //     courseDummyDetails.author
    // );
    // generateMaterialElements();
    // generateTaskElements();
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

function setUser() {
    const username = localStorage.getItem('username');

    const url = `${userUrl}/?username=${username}`;

    fetch(url)
        .then(res => res.json())
        .then(user => {
            userModel = new UserModel(user.username, user.password, user.admin, user.coursesCompleted);
            console.log(userModel);
        })
        .catch(err => {
            console.log(err);
        });
}

function completeCourse() {
    if (userModel.coursesCompleted === null) {
        userModel.coursesCompleted = 1;
    } else {
        userModel.coursesCompleted = userModel.coursesCompleted + 1;
    }
    window.location.href = '../pages/index.html';
}