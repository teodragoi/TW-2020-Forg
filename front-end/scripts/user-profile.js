window.addEventListener('onload', loadProfileModal());

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
                <p>Image here</p>
                <p> Name here </p>
                <p> Coompleted here </p>
                <p> Ranking here </p>
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