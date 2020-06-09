let userModel;
const userUrl = 'http://127.0.0.1:8125/Users';

window.addEventListener('onload', setUser());

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