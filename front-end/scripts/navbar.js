function addAdminNavbarElements() {
    const navContainer = document.querySelector('.navbar-elements-container');
    if (userModel.username === undefined) {
        console.log('In here');
        navContainer.insertAdjacentHTML('beforeend', `
        <span class="navbar-element"> <a href="./login.html">LOGIN</a> </span>
        `);
        navContainer.insertAdjacentHTML('beforeend', `
        <span class="navbar-element"> <a href="./register.html">REGISTER</a> </span>
        `);
    } else if (userModel.admin) {
        const addCourseContainer = document.querySelector('.add-course');
        if (!addCourseContainer) {
            navContainer.insertAdjacentHTML('beforeend', `
            <span class="navbar-element add-course"> <a href="./add-course.html">ADD COURSE</a> </span>
            `);
        }
    }

    if (localStorage.getItem('username')) {
        const logoutContainer = document.querySelector('.logout');
        if (!logoutContainer) {
            navContainer.insertAdjacentHTML('beforeend', `
        <span class="navbar-element logout"> <a onclick="logout()">LOGOUT</a> </span>
    `);
        }
    }

}

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('ranking');
    window.location.href = '../pages/index.html';
}