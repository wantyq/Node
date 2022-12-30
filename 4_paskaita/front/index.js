fetch('http://localhost:3000/pets')
.then((response) => response.json())
.then((data) => draw(data));

const table = document.querySelector(`table`);

const draw = (data) => {
    data.forEach((pet) => {
        const tr = document.createElement(`tr`);
        const tdName = document.createElement(`td`);
        const tdType = document.createElement(`td`);
        const tdAge = document.createElement(`td`);

        tdName.textContent = pet.name;
        tdType.textContent = pet.type;
        tdAge.textContent = pet.age;

        tr.appendChild(tdName);
        tr.appendChild(tdType);
        tr.appendChild(tdAge);
        table.appendChild(tr);
    })
};

const sort = document.querySelector(`#age`);
sort.addEventListener(`click`, () => {
    console.log(table);
    fetch('http://localhost:3000/petsage/?sort=asc&property=age')
    .then((response) => response.json())
    .then((data) => draw(data));
})