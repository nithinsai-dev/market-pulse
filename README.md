# 📊 Market Pulse

A simple web application to track stock and cryptocurrency prices using the Alpha Vantage API.

## Features

- Get stock price data
- Get cryptocurrency exchange rates
- Supports both stock and crypto inputs
- Server-side rendering using EJS
- Basic error handling for invalid symbols

## Tech Stack

- Node.js
- Express.js
- Axios
- EJS
- Alpha Vantage API

## Setup Instructions

### 1. Clone the repository

git clone <your-repo-link>  
cd market-pulse

### 2. Install dependencies

npm install

### 3. Create environment file

Create a `.env` file in the root directory:

API_KEY=your_alpha_vantage_api_key

### 4. Run the application

node app.js

### 5. Open in browser

http://localhost:3000

## Usage

- Select type: Stock or Crypto  
- Enter symbol:  
  - Stocks: AAPL, TSLA, MSFT  
  - Crypto: BTC, ETH  
- Click "Get Price"

## Notes

- Some symbols may not be supported by the API  
- Free API has request limits  
- Crypto data may not be fully real-time

## Future Improvements

- Improve UI design  
- Add charts for price trends  
- Support more APIs for broader stock coverage  
- Add database for saving user data