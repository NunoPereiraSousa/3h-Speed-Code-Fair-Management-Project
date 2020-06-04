let URL = "http://localhost:8080";

window.onload = () => {
    loadMarketsTable();
    document.querySelector("#admin").value = user_id[0].id_tp2_user;
}

const HTTP = axios.create({
    baseURL: URL
});

let headers = {
    'Access-Control-Allow-Origin': '*'
}

let user_id = JSON.parse(localStorage.getItem("logUser"));
let form = document.querySelector("#addMarket")

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
        console.log(request);
        
        alert("Market Added!")
    } catch (err) {
        console.log(err)
    }
})