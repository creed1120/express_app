/*************************************************
 *      Express Web Server Setup
 /************************************************/

const cors = require('cors');
 /******** Enable Express *********/
const e = require('express');
const express = require('express');
// craete an instance of express()
const app = express();

app.use(cors());
app.use(express.json());

const path = require('path');

/******** Port number varible/URL variable *********/
//let PORT = 3000;
//let siteUrl = 'http://localhost';
let localPort = 3000;

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
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/frontend', 'home.html'))
// })

// app.get("/api/animal/:name", (req, res) => {
//     if (req.params.name === "meowsalot") {
//       res.json({ name: "Meowsalot", species: "cat", "photo": "https://learnwebcode.github.io/json-example/images/cat-1.jpg", bio: "This cat is great and very vocal. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque." })
//     } else if (req.params.name === "barksalot") {
//       res.json({ name: "Barksalot", species: "dog", "photo": "https://learnwebcode.github.io/json-example/images/dog-1.jpg", bio: "This dog is very communicative. Deleniti, tempora quis commodi qui inventore ratione rem porro doloribus et obcaecati cumque quibusdam voluptatibus iure nisi aut minima consequuntur, officiis esse? Lorem ipsum, dolor sit amet consectetur adipisicing elit." })
//     } else if (req.params.name === "purrsloud") {
//       res.json({ name: "Purrsloud", species: "cat", "photo": "https://learnwebcode.github.io/json-example/images/cat-2.jpg", bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque. Lorem ipsum." })
//     } else {
//       res.json("Animal not found.")
//     }
//   })

//   app.get("/fake-search", (req, res) => {
//     console.log(req.query)
//     res.json("Thank you for your request.")
//   })

//   app.post("/api/secret", (req, res) => {
//     if (req.body.username === "johndoe" && req.body.password === "qwerty") {
//       res.json("You have secret access for us to tell you that 2 + 2 is 4.")
//     } else {
//       res.json("That is incorrect.")
//     }
//   })

/******** END spa route setup *******/


// GET route with 'getWeather' function as Middleware
// it can be in the route itself or add as "app.use()" to use Globally

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


// app.get('/api/pets', (req, res) => {
//     res.json([
//         {
//             breed: 'Husky',
//             name: 'Soso',
//             favoriteTreat: 'Snickers'
//         },
//         {
//             breed: 'Poodle',
//             name: 'Sammsters',
//             favoriteTreat: 'Oreo Cookies'
//         },
//         {
//             breed: 'Alaskan Malmute',
//             name: 'Heroku',
//             favoriteTreat: 'Twinkies'
//         }
//     ])
// })

app.listen(process.env.PORT || localPort);
//console.log(`Express Server up and running at: ${siteUrl}`);