fetch('http://localhost:3000/cars')
.then((response) => response.json())
.then((data) => draw(data));

const tbody = document.querySelector(`#tableBody`);
const nextBtn = document.querySelector(`#next`);
nextBtn.addEventListener(`click`, () => {
    window.location.href = `http://127.0.0.1:5500/2_paskaita/front/addCar`;
})

const draw = (data) => {
    console.log(data)
    data.forEach((car) => {
        let tr = document.createElement(`tr`);
        let tdMake = document.createElement(`tr`);
        let tdModel = document.createElement(`tr`);
        let tdColor = document.createElement(`tr`);
        let tdId = document.createElement(`tr`);
        let btn = document.createElement(`button`);

        tdMake.textContent = car.make;
        tdModel.textContent = car.model;
        tdColor.textContent = car.color;
        tdId.textContent = car.id;
        btn.textContent = `Delete`; 
     
        tr.appendChild(tdMake);
        tr.appendChild(tdModel);
        tr.appendChild(tdColor);
        tr.appendChild(tdId);
        tr.appendChild(btn);
        tbody.appendChild(tr);
     })
     
}
