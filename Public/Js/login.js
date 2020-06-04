let URL = "http://localhost:8080";

let form = document.querySelector("#login");

const HTTP = axios.create({
    baseURL: URL
});

let headers = {
    'Access-Control-Allow-Origin': '*'
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const request = await HTTP.post("/login", {
            input: document.querySelector("#username").value,
            password: document.querySelector("#password").value,
        }, {
            headers
        })
        
        localStorage.setItem("token", JSON.stringify(request.data.token));
        localStorage.setItem("logUser", JSON.stringify(request.data.response));
        if (request.data.response[0].id_tp2_user_type === 1) {
            window.location.href = "../Views/admin.html";
        } else {
            window.location.href = "../Views/home.html";
        }
    } catch (err) {
        return res.status(400).send({
            "error": err
        });
    }
})