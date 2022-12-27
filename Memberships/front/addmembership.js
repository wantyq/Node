const form = document.querySelector(`form`);

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const name = document.querySelector(`#name`);
    const price = document.querySelector(`#price`);
    const description = document.querySelector(`#description`);

    fetch('http://localhost:3000/services/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          price: price.value,
          description: description.value,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(() => {
          location.href = 'memberships.html';
        })
    .catch((error) => {
        console.log(error);
    })
})