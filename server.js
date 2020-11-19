/*************************************************
 *      Express Web Server Setup
 /************************************************/

 /******** Enable Express *********/
const e = require('express');
const express = require('express');
// craete an instance of express()
const app = express();
const path = require('path');

/******** Port number varible/URL variable *********/
let PORT = 8800;
let siteUrl = 'http://localhost';

/******** Set the VIEW Engine ( ejs, handlebars, pug ) *********/
app.set('views', './views');
app.set('view engine', 'ejs');
//let ejs = require('ejs');

/******** Serve static file folders *********/
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/frontend')));
app.use(express.static(path.join(__dirname, 'views/partials')));

/******** MIDDLEWARE *********/
app.use(express.urlencoded({
    extended: false
}));
// use the middleware function
app.use(getWeather);

// Middleware function
function getWeather(req, res, next) {
    req.visitorWeather = false
    if (req.visitorWeather) {
        res.send("Please come back to our app when it is not raining.")
    }
    else {
        next()
    }
}

/*************************************************
 *   SPA (single page application) route setup
 /************************************************/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/frontend', 'home.html'))
})


app.get('/api/:name', (req, res) => {
    //console.log(req.params.name);
    res.send('Check the console for the dynamic name.')
})

/******** END spa route setup *******/


// GET route with 'getWeather' function as Middleware
// it can be in the route itself or add as "app.use()" to use Globally

/**
 * UNCOMMENT

// Home Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        subTitle: 'Welcome to our Brand new App',
        isRaining: req.visitorWeather,
        pets: [
            {
                breed: 'Husky',
                name: 'Soso',
                favoriteTreat: 'Snickers'
            },
            {
                breed: 'Poodle',
                name: 'Sammsters',
                favoriteTreat: 'Oreo Cookies'
            },
            {
                breed: 'Alaskan Malmute',
                name: 'Heroku',
                favoriteTreat: 'Twinkies'
            }
        ]
    });
});

app.get('/users', (req, res) => {
    res.render('users', {
        name: 'ceddy',
        email: 'creed@mail.com'
    })
});

// About Us Route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us Page',
        subTitle: 'Here you can read all about this exciting new App.'
    });
});

// Form Result Route
app.post('/result', (req, res) => {
    if (req.body.color.trim().toUpperCase() === "BLUE") {
        res.render('result', {theAnswer: 'Congrats! You are Correct.'});
    }
    else {
        res.render('result', {theAnswer: 'Sorry! That is not correct, Try Again.'});
    }
});


app.get('/api/pets', (req, res) => {
    res.json([
        {
            breed: 'Husky',
            name: 'Soso',
            favoriteTreat: 'Snickers'
        },
        {
            breed: 'Poodle',
            name: 'Sammsters',
            favoriteTreat: 'Oreo Cookies'
        },
        {
            breed: 'Alaskan Malmute',
            name: 'Heroku',
            favoriteTreat: 'Twinkies'
        }
    ])
})

* UNCOMMENT
**/

app.listen(PORT);
console.log(`Express Server up and running at: ${siteUrl}:${PORT}`);