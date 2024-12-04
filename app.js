const form = document.querySelector('#form');
const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const age = document.querySelector('#age');
const image = document.querySelector('#image');
const email = document.querySelector('#email');
const button = document.querySelector('#button');
const wrapper = document.querySelector('#wrapper');



function validate(firstname, lastname, age, email) {
    if (firstname.value.length < 3) {
        alert('Ism 3 ta harfdan iborat bo‘lishi kerak.');
        firstname.focus();
        return false;
    }

    if (lastname.value.length < 3) {
        alert('Familiya 3 ta harfdan iborat bolishi kerak.');
        lastname.focus();
        return false;
    }

    if (age.value < 0 || age.value > 200) {
        alert('Yosh bunday bo‘lishi mumkin emas.');
        age.focus();
        return false;
    }

    if (!email.value.match(/^\S+@\S+\.\S+$/)) {
        alert('Emailda xato bor.');
        email.focus();
        return false;
    }

    return true;
}

function createCard(data) {
    return `
      <div class="card" data-id="${data.id}">
         <img src="${data.image}" alt="${data.firstname}">
         <h3>${data.firstname} ${data.lastname}</h3>
         <p>Age: ${data.age}</p>
         <p>Email: ${data.email}</p>
         <button class="delete-btn">Delete</button>
      </div>
    `;
}

function getData() {
    let data = [];
    if (localStorage.getItem('users')) {
        data = JSON.parse(localStorage.getItem('users'));
    }
    return data;
}

function setData(data) {
    localStorage.setItem('users', JSON.stringify(data));
}

button.addEventListener('click', function () {
    const isValid = validate(firstname, lastname, age, email);
    if (!isValid) return;

    const user = {
        id: Date.now(),
        firstname: firstname.value,
        lastname: lastname.value,
        age: age.value,
        image: image.value,
        email: email.value,
    };

    const card = createCard(user);
    wrapper.innerHTML += card;

    const users = getData();
    users.push(user);
    setData(users);

    form.reset();
});

document.addEventListener('DOMContentLoaded', function () {
    const users = getData();
    users.forEach(user => {
        const card = createCard(user);
        wrapper.innerHTML += card;
    });
});

wrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const card = e.target.closest('.card');
        const userId = Number(card.getAttribute('data-id'));

        card.remove();

        let users = getData();
        users = users.filter(user => user.id !== userId);
        setData(users);
    } 
});
