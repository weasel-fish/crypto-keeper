CRYPTO KEEPER README

SUMMARY

Crypto Keeper is a simply cryptocurrency investment platform that presents price history data for over one hundred cryptocurrencies. It also simulates the ability to buy and sell cryptocurrencies and track potential gains and losses due to price fluctuation.

For the frontend, I used the React library using TypeScript. I used several Material-UI components to style the app, as well as ApexCharts to display historical price fluctuation.


For the backend server I used Node with the Express framework, also using TypeScript. The server connects with a PostgreSQL database which stores user and user' cryptocurrency ownership data.

<!-- You can see this app live at:  -->



LOCAL SETUP

App Setup
1. Fork and clone this repository.
2. In the frontend directory, run 'npm install' to install the frontend dependencies.
3. In the backend directory, run 'npm install' to install the backend dependencies.

Database Setup
1. Download and install PostgreSQL.
2. In your terminal, run 'psql' to open the PostgreSQL shell.
3. Run 'CREATE DATABASE crypto_keeper_dev;'
4. Connect to the database by running '\c crypto_keeper_dev'
5. Create the users table by running 'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(50) UNIQUE NOT NULL);'
6. Create the user_wallets table by running 'CREATE TABLE user_wallets (id SERIAL PRIMARY KEY, user_id INT, currency_id VARCHAR(10), amount NUMERIC (20,15), avg_cost NUMERIC (20,15));'

Starting the App
1. In the backend directory, run 'npm start'
2. In the frontend directory, run 'npm start'
3. Everything should be up and running!


OVERVIEW OF THE BACKEND

I designed the backend as an API that communicates user and user-owned currency data between a PostgreSQL database and the frontend; the API serves up that information in the JSON format.

I utilized two tables, users and user_wallets:

- The users table has rows representing each user, with columns for the user's id, name, and email.

- The user_wallets table contains has rows that represent each pairing of a user and a cryptocurrency (the row being generated when a user buys an amount of currency), with columns for the wallet id, user's id, cryptocurrency id, amount of that currency held by the user, and the average cost paid by the user for that currency.

I have included routes to create a new user, get a list of users, get a single user, update a user, and delete a user, although only the first two are utilized by the frontend as it currently exists. As for user wallets, I have included routes to create a new user wallet, get a user wallet for a given user-currency pair, update a user wallet, delete a user wallet, and get all wallets associated with a particular user, although only the first three routes are utilized by the frontend as it currently exists.



OVERVIEW OF THE FRONTEND



USER FLOW AND VIEWS

On starting up Crypto Keeper a user will be greeted by the welcome page, which includes a scrollable list of all the cryptocurrencies that may be viewed. The list may be searched by typing in search box, which will continually filter the list to include only matching currencies or currency symbols. The list may also be toggled between alphabetical order and order of popularity (the default) by clicking on the button next to the search field. Clicking on 'CRYPTO KEEPER' in the top right will always return a user to this page.

<img src="./readme_images/welcome-no-user.png" alt="welcome page" width='500px' title="Welcome Page" />

By clicking on the 'LOG IN / SIGN UP' button in the top right will take the user to the Log In page, where they may select their username from the dropdown menu if they have already made an account. They may then click the Log In button once they have selected their username.

<img src="./readme_images/login-page.png" alt="login page" width='500px' title="Login Page" />

If they do not yet have an account, the user may click the Sign Up button, which will replace the dropdown with a form where they can enter their name and email and then click the Create Account button.

<img src="./readme_images/signup-page.png" alt="signup page" width='500px' title="Signup Page" />

When the user clicks either the Create Account or Log In button, they are logged in as the current (or recently created) user and redirected to the home page, this time with a personalized welcome message.

<img src="./readme_images/welcome-user.png" alt="welcome page" width='500px' title="Welcome Page" />

A user may click on any currency in the list to be directed to that currency's page, which will look different based on if the user is logged in or not. If the user is a guest, the page will display the current price of the currency and a candlestick chart showing the currency's price movement over the past 24 hours.

<img src="./readme_images/currency-page-no-user.png" alt="currency page 24 hours" width='500px' title="Currency Page 24 Hours" />

The user may select additional time periods (the past 30 days and the past 6 months) for the display of historical price fluctuation.

<img src="./readme_images/currency-page-30-days.png" alt="currency page 30 days" width='500px' title="Currency Page 30 Days" />

<img src="./readme_images/currency-page-6-months.png" alt="currency page 6 months" width='500px' title="Currency Page 6 Months" />

If a user is logged in, the currency page will appear different. The candlestick chart will be on the left (with the same time period options), but now the user's ownership information and buying/selling options will appear on the right. Initially a user will not own any currency, and so the sell button will be disabled.

<img src="./readme_images/currency-page-user.png" alt="currency page user logged in" width='500px' title="Currency Page User Logged In" />

If a user clicks on the Buy button, the buy form will appear. The cost in USD will update automatically to reflect the number of coins entered into the field. A user can purchase any fraction of a coin.

<img src="./readme_images/currency-page-buy.png" alt="currency page buy" width='500px' title="Currency Page Buy" />

Once a user owns some of the currency, the amount of currency owned will be displayed along with the loss or gain of value since purchase (determined by comparing the average cost of the currency bought against the current value of the currency). The Sell button will now be available.

<img src="./readme_images/currency-page-owned.png" alt="currency page owned" width='500px' title="Currency Page Owned" />

If a user clicks on the Sell button, the sell form will appear. This form behaves similarly to the buy form.

<img src="./readme_images/currency-page-sell.png" alt="currency page sell" width='500px' title="Currency Page sell" />