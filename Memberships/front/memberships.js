fetch('http://localhost:3000/services')
.then((response) => response.json())
.then((data) => draw(data));

const memberships = document.querySelector(`.memberships`);
const add = document.querySelector(`.add`);
add.addEventListener(`click`, () => {
    window.location.href = "/Memberships/front/addmembership.html";
})

const draw = (data) => {
    data.forEach((service) => {
        console.log(service);
        const block = document.createElement(`div`);
        block.setAttribute(`class`, `block`);

        const top = document.createElement(`div`);
        top.setAttribute(`class`, `topSide`);

        const bottom = document.createElement(`div`);
        bottom.setAttribute(`class`, `bottomSide`);

        const name = document.createElement(`p`);
        name.setAttribute(`class`, `title`);
        name.textContent = `$${service.price} ${service.name}`;

        const description = document.createElement(`p`);
        description.setAttribute(`class`, `description`);
        description.textContent = `${service.description}`;

        const deleteBtn = document.createElement(`button`);
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

        deleteBtn.addEventListener(`click`, () => {
            fetch(`http://localhost:3000/services/${service._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
        });

        top.appendChild(name);
        top.appendChild(description);
        bottom.appendChild(deleteBtn);

        block.appendChild(top);
        block.appendChild(bottom);
        memberships.appendChild(block);
    })
};