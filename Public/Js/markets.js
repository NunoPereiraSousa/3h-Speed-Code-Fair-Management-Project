let URL = "http://localhost:8080";




window.onload = () => {
    loadMarkets();
}


const HTTP = axios.create({
    baseURL: URL
});



async function loadMarkets() {

    let token = JSON.parse(localStorage.getItem("users"))
    let logUser = JSON.parse(localStorage.getItem("logUser"))

    let headers = {
        'Access-Control-Allow-Origin': '*',
    }

    try {
        const response = await HTTP.get("/markets", {}, {
            headers
        });
        let str = "";
        for (const market of response.data) {
            str += `<div class="col-lg-4">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${market.photo}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${market.name}</h5>
                    <p class="card-text">location: ${market.place}</p>
                    <p class="card-text">date: ${market.date} </p>
                    <button onclick="goToMarket(${market.id_tp2_market})">Going</button>
                </div>
            </div>
        </div>
                    `
        }
        document.querySelector("#markets").innerHTML = str;
    } catch (err) {
        console.log(err);
    }
}

function goToMarket(market_id) {
 
}