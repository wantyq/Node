const users = document.querySelector('#users');
const order = document.querySelector('#order');
const changeOrder = document.querySelector('#changeOrder');
const addBtn = document.querySelector('.add');

fetch('http://localhost:3000/users')
.then((response) => response.json())
.then((data) => draw(data));

let asc = false;
let desc = false;

order.addEventListener('click', orderAsc);

function orderAsc() {
  asc = true;
  desc = false;
  changeOrder.textContent = "ASC";
  users.innerHTML = '';
  fetch('http://localhost:3000/users/asc', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      draw(response);
    })
    .catch((error) => {
      console.log(error);
    });
  order.removeEventListener('click', orderAsc);
  order.addEventListener('click', orderDesc);
};

function orderDesc() {
  asc = false;
  desc = true;
  changeOrder.textContent = "DESC";
  users.innerHTML = '';
  fetch('http://localhost:3000/users/desc', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      draw(response);
    })
    .catch((error) => {
      console.log(error);
    });

  order.removeEventListener('click', orderDesc);
  order.addEventListener('click', orderAsc);
};

const draw = (data) => {
    data.forEach((user) => {
      console.log(user);
        const block = document.createElement(`div`);
        const name = document.createElement(`p`);
        const email = document.createElement(`p`);
        const emailSpan = document.createElement(`span`);
        const service = document.createElement(`p`);
        const serviceSpan = document.createElement(`span`);

        name.setAttribute(`class`, `name`);

        name.textContent = `${user.name} ${user.surname}`;
        email.textContent = `Email Address: `;
        emailSpan.textContent = `${user.email}`;
        service.textContent = `Membership: `;
        serviceSpan.textContent = `${user.service_id}`;

        email.appendChild(emailSpan);
        service.appendChild(serviceSpan);
        block.appendChild(name);
        block.appendChild(email);
        block.appendChild(service);
        users.appendChild(block);
    })
};

addBtn.addEventListener("click", () => {
  location.href = "addUser.html";
});

