const nrOfTabs = 5;
const numberOfCourses = 6;

window.addEventListener("onload", setUpTabs());
window.addEventListener("onload", setUpCourseList());

function setUpTabs() {
    const tabContainer = document.querySelector('.tabs-container');
    for (i = 0; i < nrOfTabs; i++) {
        tabContainer.insertAdjacentHTML("beforeend", `
            <div class="tab tab_${i}"> Tab ${i} </div>
        `);
        document.querySelector(`.tab_${i}`).addEventListener("click", tabClicked(i));
    }
}

function tabClicked(i) {
    document.querySelector(`.tab_${i}`).addEventListener("click", () => {
        console.log(i);
        for (tab = 0; tab < nrOfTabs; tab++) {
            document.querySelector(`.tab_${tab}`).style.color = "#b3b3b3";
            document.querySelector(`.tab_${tab}`).style.borderBottom = "none";
        }
        document.querySelector(`.tab_${i}`).style.color = "#000000";
        document.querySelector(`.tab_${i}`).style.borderBottom = "solid 0.02em #000000";
    });
}

function setUpCourseList() {
    const courseContainer = document.querySelector('.course-list-container');
    for (i = 0; i < numberOfCourses; i++) {
        courseContainer.insertAdjacentHTML("beforeend", `
        <div class="course-container">
            <img src="../assets/course_cover.jpg" alt="">
            <span class="course-description">The complete presentation on gardening by TEDx</span>
            <span class="course-author">Author goes here</span>
            <button class="read-button" data-course-number="${i}">Read this course</button>
        </div>
    `)
    }
}