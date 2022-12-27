const form = document.querySelector('form');
const select = document.querySelector('#memberships');

const selectOptions = (name, id) => {
  const membership = document.createElement('option');

  membership.textContent = name;
  membership.value = id;

  select.appendChild(membership);
};

fetch('http://localhost:3000/services/', {
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
    const memberships = response;
    memberships.forEach((service) => {
    selectOptions(service.name, service._id);
    });
  })
  .catch((err) => {
    console.warn(err);
  });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name');
  const surname = document.querySelector('#surname');
  const email = document.querySelector('#email');
  console.log(name.value, surname.value, email.value);

  fetch('http://localhost:3000/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.value,
      surname: surname.value,
      email: email.value,
      service_id: select.value,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(() => {
      console.log(`ok`);
    })
    .catch((error) => {
     console.log(error);
    });
});