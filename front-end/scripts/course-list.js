const numberOfCourses = 18;
const courseList = [];

let pageNumber = 0;
let pageSize = 6;

function setUpCourseList() {
    for (i = 0; i < numberOfCourses; i++) {
        const course = new CourseListItem(i, `Image-${i}`, `Course-${i}`, `Author-${i}`);
        courseList.push(course);
    }

}
function setUpCourseListContainer() {
    const courseContainer = document.querySelector('.course-list-container');
    for (i = pageNumber * pageSize; i < pageNumber + pageSize; i++) {
        courseContainer.insertAdjacentHTML("beforeend", `
        <div class="course-container">
            <img src="../assets/course_cover.jpg" alt="">
            <span class="course-description">${courseList[i].description}</span>
            <span class="course-author">${courseList[i].author}</span>
            <button class="read-button" data-course-number="${courseList[i].id}">Read this course</button>
        </div>
    `)
    }
}

function updateCourseListContainer() {
    const courseContainer = document.querySelector('.course-list-container');
    courseContainer.innerHTML = '';
    for (i = pageNumber * pageSize; i < pageNumber * pageSize + pageSize; i++) {
        courseContainer.insertAdjacentHTML("beforeend", `
        <div class="course-container">
            <img src="../assets/course_cover.jpg" alt="">
            <span class="course-description">${courseList[i].description}</span>
            <span class="course-author">${courseList[i].author}</span>
            <button class="read-button" data-course-number="${courseList[i].id}">Read this course</button>
        </div>
    `)
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
        console.log(pageNumber);
        updateCourseListContainer();
    }
}

function scrollRight() {
    if (pageNumber + 1 < numberOfCourses / pageSize) {
        pageNumber = pageNumber + 1;
        console.log(pageNumber);
        updateCourseListContainer();
    }
}