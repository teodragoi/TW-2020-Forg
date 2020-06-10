function addAdminNavbarElements() {
    if (userModel.admin) {
        const navContainer = document.querySelector('.navbar-elements-container');
        const addCourseContainer = document.querySelector('.add-course');
        if (!addCourseContainer) {
            navContainer.insertAdjacentHTML('beforeend', `
        <span class="navbar-element add-course"> <a href="./add-course.html">ADD COURSE</a> </span>
        `);
        }
    }
}