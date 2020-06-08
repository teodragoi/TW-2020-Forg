window.addEventListener('onload', loginUser());

const usersUrl = 'http://127.0.0.1:8125/Users/login';

function loginUser() {
    const form = document.getElementById('form');


    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const user = { username: formData.get('username'), password: formData.get('password') };
        login(user);
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

function login(userModel) {
    console.log(userModel);
    fetch(usersUrl, {
        method: 'POST',
        body: JSON.stringify(userModel)
    })
        .then(res => res.json())
        .then(data => {
            if (data.pswError) {
                resetValidationMessages();
                insertValidationMessage('password', data.pswError);
            } else if (data.usrError) {
                resetValidationMessages();
                insertValidationMessage('username', data.usrError);
            } else {
                localStorage.setItem('username', userModel.username);
                window.location.href = `../pages/index.html`;
            }
        })
        .catch(err => console.log(err));
}