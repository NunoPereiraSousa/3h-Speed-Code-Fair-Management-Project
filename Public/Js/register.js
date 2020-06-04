let URL = "https://imarkett.herokuapp.com";

let form = document.querySelector("#register");

const HTTP = axios.create({
    baseURL: URL
});

let headers = {
    'Access-Control-Allow-Origin': '*'
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const request = await HTTP.post("/register", {
            name: document.querySelector("#name").value,
            username: document.querySelector("#username").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
        }, {
            headers
        })
        window.location.href = "../Views/login.html";

    } catch (err) {
        return res.status(400).send({
            "error": err
        });
    }
})