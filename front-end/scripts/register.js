window.addEventListener('onload', registerUser());

const usersUrl = 'http://127.0.0.1:8125/Users';

function registerUser() {
    const form = document.getElementById('form');


    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        if (formData.get('password') !== formData.get('psw-repeat')) {
            resetValidationMessages();
            insertValidationMessage('password', 'Passwords do not match');
            insertValidationMessage('psw-repeat', 'Passwords do not match');
        } else {
            const newUser = new UserModel(formData.get('username'), formData.get('password'), false, 0);
            console.log(newUser);
            addNewUser(newUser);
        }
    }
}

function insertValidationMessage(elementId, message) {
    const element = document.getElementById(elementId);

    element.insertAdjacentHTML('beforeend', `
        <span class="validation-message">${message}</span>
    `);
}

function resetValidationMessages() {
    const validationMessages = document.querySelectorAll('.validation-message');
    validationMessages.forEach(msg => {
        msg.innerHTML = '';
    });
}

function addNewUser(userModel) {
    fetch(usersUrl, {
        method: 'POST',
        body: JSON.stringify(userModel)
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                resetValidationMessages();
                insertValidationMessage('username', data.error);
            } else {
                localStorage.setItem('username', userModel.username);
                window.location.href = `../pages/index.html`;
            }
        })
        .catch(err => console.log(err));
}