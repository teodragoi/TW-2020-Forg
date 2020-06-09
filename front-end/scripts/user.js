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
            loadProfileModal();
            getUserRanking();
        })
        .catch(err => {
            console.log(err);
        });
}

function getUserRanking() {
    const username = localStorage.getItem('username');

    const url = `${userUrl}/?userRanking=${username}`;

    fetch(url)
        .then(res => res.json())
        .then(ranking => {
            console.log(ranking.ranking);
            localStorage.setItem('ranking', ranking.ranking)
        })
        .catch(err => {
            console.log(err)
        });
}

var span = document.querySelector('.close');

function loadProfileModal() {
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', `
    <div id="profileModal" class="modal">
        <div class="modal-content">
            <div class="profile-top">
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <div class="profile-content">
                <i class="far fa-user-circle fa-5x"></i>
                <p> Name: ${userModel.username} </p>
                <p> Courses Completed: ${userModel.coursesCompleted === null ? 0 : userModel.coursesCompleted} </p>
                <p> Ranking: ${localStorage.getItem('ranking')} </p>
            </div>
        </div>
    </div>
`);
}

function openProfileModal() {
    console.log('In open');
    const modal = document.getElementById('profileModal');
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('profileModal');
    modal.style.display = 'none';
}

window.onclick = (event) => {
    const modal = document.getElementById('profileModal')
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}