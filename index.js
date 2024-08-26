import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// const api_url = "https://bored-api.appbrewery.com/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded( {extended : true} ));
app.set('view-engine', 'ejs');

app.get("/", async(req, res) => {
    try{
        const result = await axios.get("https://secrets-api.appbrewery.com/random")
        res.render("index.ejs", {
        secret: result.data.secret,
        user: result.data.username,
        });
    }catch(error){
        console.log(error.response.data);
        res.status(500);
    }
});

app.get("/api/secret", async(req, res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        res.json({
            secret: result.data.secret,
            user: result.data.username,
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500).json({ error: "Failed to fetch secret." });
    }
});


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})