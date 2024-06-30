To Run in local

1. Clone the Repository to your local.
2. One Config.js needs to be created inside server/config folder and export it.
const config = {
    DB_NAME : 'speedometer',
    DB_USER : '',
    DB_PASSWORD : '',
    DB_HOST : 'localhost'
}
3. Do npm install in both Client and server root.
4. Start both the server using npm start and you can access the app on http://localhost:3000/.
