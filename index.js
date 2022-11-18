const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const keys = require('./config/keys');
require('./models/User');


mongoose.connect(keys.mongoURI);

const app = express();

// app.use(
//     cookieSession({
//         maxAge: 30*24*60*60*1000,
//         keys: [keys.cookieKey]
//     })
// );

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}));

app.use(flash())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./services/passport')(passport);

require('./routes/hrFormRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/formRoutes')(app);

if(process.env.NODE_ENV === 'production') {
    // Express will serve up production assets like our main.js or main.css file
    app.use(express.static('client/build'));
    //Express will serve up the index.html file
    // if doesn't recognise the route
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000

app.listen(PORT);
