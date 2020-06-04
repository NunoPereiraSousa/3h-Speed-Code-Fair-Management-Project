const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const router = require("./Routes/routes");

app.use(cors({
    credentials: true,
    origin: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

app.listen(port, () => console.log(`Serving working on port ${port}`));