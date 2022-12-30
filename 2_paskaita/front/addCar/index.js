const form = document.querySelector(`form`);
const make = document.querySelector(`#make`);
const model = document.querySelector(`#model`);
const color = document.querySelector(`#color`);

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/cars', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        make: `${make.value}`,
        model: `${model.value}`,
        color: `${color.value}`
    }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', make.value, model.value, color.value);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
