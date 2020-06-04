let URL = "https://imarkett.herokuapp.com";

let idEdit = null

window.onload = () => {
    loadMarketsTable();
    document.querySelector("#admin").value = user_id[0].id_tp2_user;
    document.querySelector("#admin2").value = user_id[0].id_tp2_user;
}

const HTTP = axios.create({
    baseURL: URL
});

let headers = {
    'Access-Control-Allow-Origin': '*'
}

let user_id = JSON.parse(localStorage.getItem("logUser"));
let form = document.querySelector("#addMarket")
let form2 = document.querySelector("#editMarket")

async function loadMarketsTable() {
    try {
        const response = await HTTP.get(`/markets/${user_id[0].id_tp2_user}`);
        let table = "";
        for (const market of response.data) {
            table += `
                    <tr>
                        <td>${market.id_tp2_market}</td>
                        <td>${market.name}</td>
                        <td>@${market.place}</td>
                        <td>@${market.date}</td>
                        <td>@${market.num_tent}</td>
                        <td><button type="button" class="btn btn-primary"  onclick='deleteMarket(${market.id_tp2_market})'> delete</button></td>
                        <td><button type="button" class="btn btn-primary"  onclick='choseToEdit(${market.id_tp2_market})' data-target="#exampleModalCenter">Update</button></td>
                    </tr>
                    `
        }
        document.querySelector("#tableBody").innerHTML = table;
    } catch (err) {
        return err;
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const request = await HTTP.post("/add-market", {
            name: document.querySelector("#name").value,
            date: document.querySelector("#date").value,
            place: document.querySelector("#place").value,
            num_tent: document.querySelector("#num_tent").value,
            photo: "asd",
            admin: user_id[0].id_tp2_user,
            deleted: 0
        }, {
            headers
        })
        alert("Market Added!")
    } catch (err) {
        console.log(err)
    }
})

async function deleteMarket(id) {
    try {
        const response = await HTTP.put(`/markets/delete/${id}`, {}, {
            headers
        });
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

function choseToEdit(id) {
    idEdit = id
    $("#exampleModalCenter").modal()
}

form2.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const request = await HTTP.put(`/markets/update/${idEdit}`, {
            name: document.querySelector("#name_edit").value,
            date: document.querySelector("#date_edit").value,
            place: document.querySelector("#place_edit").value,
            num_tent: document.querySelector("#num_tent_edit").value,
            photo: "asd",
            admin: user_id[0].id_tp2_user,
            deleted: 0
        }, {
            headers
        })
        alert("Market Edited!")
    } catch (err) {
        console.log(err)
    }
})