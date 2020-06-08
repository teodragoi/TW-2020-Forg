const coursesUrl = 'http://127.0.0.1:8125/Courses';
const http = new XMLHttpRequest();

let courseList = [];
let numberOfCourses = 0;
let pageNumber = 0;
let pageSize = 6;


function setUpCourseListContainer() {
    const courseContainer = document.querySelector('.course-list-container');
    for (i = pageNumber * pageSize; i < pageNumber + pageSize; i++) {
        if (courseList[i]) {
            courseContainer.insertAdjacentHTML("beforeend", `
                <div class="course-container">
                    <img src="../assets/course_cover.jpg" alt="">
                    <span class="course-description">${courseList[i].title}</span>
                    <span class="course-author">${courseList[i].author}</span>
                    <button class="read-button" onclick="selectCourse('${courseList[i].id}')">Read this course</button>
                </div>
            `)
        }
    }
}

function updateCourseListContainer() {
    const courseContainer = document.querySelector('.course-list-container');
    courseContainer.innerHTML = '';
    if (courseList.length > 0) {
        for (i = pageNumber * pageSize; i < pageNumber * pageSize + pageSize; i++) {
            if (courseList[i]) {
                courseContainer.insertAdjacentHTML("beforeend", `
            <div class="course-container">
                <img src="../assets/course_cover.jpg" alt="">
                <span class="course-description">${courseList[i].title}</span>
                <span class="course-author">${courseList[i].author}</span>
                <button class="read-button" onclick="selectCourse('${courseList[i].id}')">Read this course</button>
            </div>
            `)
            }
        }
    }
}

function scrollCourse(direction) {
    if (direction === -1) {
        scrollLeft();
    } else {
        scrollRight();
    }
}

function scrollLeft() {
    if (pageNumber > 0) {
        pageNumber = pageNumber - 1;
        updateCourseListContainer();
    }
}

function scrollRight() {
    if (pageNumber + 1 < numberOfCourses / pageSize) {
        pageNumber = pageNumber + 1;
        updateCourseListContainer();
    }
}

function selectCourse(i) {
    window.location.href = `../pages/course-details.html?courseId=${i}`;
}

function getCourses() {
    fetch(coursesUrl)
        .then(res => res.json())
        .then(courses => {
            courses.forEach(c => {
                const course = new CourseListItem(c._id, c.image, c.title, c.author);
                courseList.push(course);
            });
            numberOfCourses = courseList.length;
            setUpCourseListContainer();
        })
        .catch(err => console.log(err));
}

function searchCourse() {
    if (window.location.href.includes('searchString')) {
        const param = window.location.href.split('=')[1];
        let searchString = '';
        param.split('+').forEach(string => {
            searchString = searchString.concat(string + ' ');
        });
        searchString = searchString.trim();

        fetch(`${coursesUrl}/?searchString="${searchString}"`)
            .then(res => res.json())
            .then(courses => {
                courseList = []
                courses.forEach(c => {
                    const course = new CourseListItem(c._id, c.image, c.title, c.author);
                    courseList.push(course);
                });
                numberOfCourses = courseList.length;
                updateCourseListContainer();
            })
            .catch(err => {
                courseList = [];
                updateCourseListContainer();
                console.log(err);
            })
    }
}