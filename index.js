import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://www.alphavantage.co/"
const apiKey = process.env.API_KEY;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/price", async (req, res) => {
    const symbol = req.body.symbol.trim().toUpperCase();
    const type = req.body.type;

    try {
        if (type === "stock") {
            const response = await axios.get(API_URL + `query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
            const result = response.data["Global Quote"];

            if (!result || Object.keys(result).length === 0) {
                return res.render("price", {
                    symbol,
                    price: null,
                    changePercentage: null,
                    openPrice: null,
                    highPrice: null,
                    lowPrice: null,
                    previousClose: null,
                    volume: null,
                    change: null,
                    error: "Stock not found or not supported"
                });
            }

            res.render("price", {
                symbol: symbol,
                price: result["05. price"],
                changePercentage: result["10. change percent"],
                openPrice: result["02. open"],
                highPrice: result["03. high"],
                lowPrice: result["04. low"],
                previousClose: result["08. previous close"],
                volume: result["06. volume"],
                change: result["09. change"]
            })
        }
        else {
            const response = await axios.get(API_URL + `query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${apiKey}`);
            const result = response.data["Realtime Currency Exchange Rate"];

            if (!result || Object.keys(result).length === 0) {
                return res.render("price", {
                    symbol,
                    price: null,
                    changePercentage: null,
                    error: "Crypto not supported"
                });
            }

            res.render("price", {
                symbol: symbol,
                price: result["5. Exchange Rate"],
                changePercentage: "N/A"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the price.");
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})