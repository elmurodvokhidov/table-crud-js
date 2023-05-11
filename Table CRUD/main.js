// let information = [
//     {
//         firstName: 'Elmurod',
//         lastName: 'Vokhidov',
//         studentId: 2531231,
//         grNumber: 'C-21'
//     },
//     {
//         firstName: 'Bobur',
//         lastName: 'Madaminov',
//         studentId: 1235487,
//         grNumber: 'C-20'
//     },
//     {
//         firstName: 'Qosim',
//         lastName: 'Salimov',
//         studentId: 4568210,
//         grNumber: 'C-21'
//     },
//     {
//         firstName: 'Doston',
//         lastName: 'Rahimov',
//         studentId: 7896145,
//         grNumber: 'C-22'
//     }
// ]

// localStorage.setItem('informations', JSON.stringify(information));

let table = document.querySelector(".list"),
    form = document.querySelector("form"),
    inputs = document.querySelectorAll("input"),
    submit = document.querySelector("#submit"),
    reset = document.querySelector("#reset"),
    inputData = {},
    p = null;

// Ma'lumot qo'shish -------------------------

let getInfo = JSON.parse(localStorage.getItem("informations")) || []
function innerFunc() {
    table.innerHTML = '';
    getInfo = JSON.parse(localStorage.getItem("informations")) || []
    getInfo.length > 0 ?
        getInfo.map((element, index) => {
            table.innerHTML += `
        <tr>
            <th>${element.firstName}</th>
            <th>${element.lastName}</th>
            <th>${element.studentId}</th>
            <th>${element.grNumber}</th>
            <th>
                <button id="edit" onclick=edit(${index})>Edit</button>
                <button id="delete" onclick=del(${index})>Delete</button>
            </th>
        </tr>
        `;
        }) : table.innerHTML = "<p id='notF'>No information found!</p>";
};

innerFunc();

inputs.forEach((a) => {
    a.addEventListener('input', (e) => {
        inputData = {
            ...inputData,
            [e.target.name]: e.target.value
        };
    });
});

// Ma'lumot tahrirlash

function edit(a) {
    p = a;
    inputData = JSON.parse(localStorage.getItem('informations'))[a];
    inputs.forEach(item => {
        item.value = getInfo[a][item.name];
    })
}


submit.addEventListener('click', (e) => {
    getInfo = JSON.parse(localStorage.getItem("informations"))
    inputData = {
        ...inputData,
        id: new Date().getTime()
    }
    e.preventDefault()
    if (inputs[0].value != '' && inputs[1].value != '' && inputs[2].value != '') {
        if (p === null) {
            if (localStorage.getItem('informations')) {
                localStorage.setItem('informations', JSON.stringify([...JSON.parse(localStorage.getItem('informations')), inputData]));
            } else {
                localStorage.setItem('informations', JSON.stringify([{
                    ...inputData
                }]));
            }
        }
        else {
            if (localStorage.getItem('informations')) {
                localStorage.setItem('informations', JSON.stringify([
                    ...getInfo.slice(0, p),
                    inputData,
                    ...getInfo.slice(p + 1, getInfo.length)
                ]))
                p = null
            }
        }
        innerFunc();
        inputs.forEach(element => element.value = "");
    } else {
        alert("Please, fill in the blanks!");
    };

})

let del = (i) => {
    let sorov = confirm("Do you want to delete it?")
    if (sorov) {
        localStorage.setItem('informations', JSON.stringify(
            JSON.parse(localStorage.getItem('informations')).filter((item) => item.id !== getInfo[i].id)
        ))
        innerFunc();
    }
}

reset.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach(element => element.value = "");
})