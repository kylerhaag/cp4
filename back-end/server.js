const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());



// connect to the database
mongoose.connect('mongodb://localhost:27017/teddy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// // Schema for users
// const userSchema = new mongoose.Schema({
//     name: String,
//     //active: Boolean
// })

// // Model for user
// const User = mongoose.model('User', userSchema);


// app.post('/api/users', async(req, res) => {
//     const user = new User({
//         name: req.body.name,
//         //active: req.body.active
//     });
//     try {
//         await user.save();
//         res.send(user);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });
// // Get a list of all users
// app.get('/api/users', async(req, res) => {
//     try {
//         let users = await User.find();
//         res.send(users);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });
// app.delete('/api/users/:id', async(req, res) => {
//     try {
//         await User.deleteOne({
//             _id: req.params.id
//         });
//         res.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

// // Schema for items
// const teddySchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User',

//     },
//     // text: String,
//     // active: Boolean,
//     name: String,
//     image: String,
//     age: String,
//     gender: String
// })

// const Teddy = mongoose.model('Teddy', teddySchema);

// app.post('/api/users/:userID/teddys', async(req, res) => {
//     try {
//         let user = await User.findOne({ _id: req.params.userID });
//         if (!user) {
//             res.send(404);
//             return;
//         }
//         let teddy = new Teddy({
//             user: user,
//             //text: req.body.text,
//             name: req.body.name,
//             image: req.body.image,
//             age: req.body.age,
//             gender: req.body.gender
//                 //completed: req.body.completed,
//         });
//         await teddy.save();
//         res.send(teddy);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

// app.get('/api/users/:userID/teddys', async(req, res) => {
//     try {
//         let user = await User.findOne({ _id: req.params.userID });
//         if (!user) {
//             res.send(404);
//             return;
//         }
//         let teddys = await Teddy.find({ user: user });
//         res.send(teddys);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

// app.put('/api/users/:userID/teddys/:teddyID', async(req, res) => {
//     try {
//         let teddy = await Teddy.findOne({ _id: req.params.teddyID, user: req.params.userID });
//         if (!teddy) {
//             res.send(404);
//             return;
//         }
//         teddy.name = req.body.name
//         teddy.age = req.body.age
//             // teddy.image = req.body.image
//             // teddy.gender = req.body.gender

//         await teddy.save();
//         res.send(teddy);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

// app.delete('/api/users/:userID/teddys/:teddyID', async(req, res) => {
//     try {
//         let teddy = await Teddy.findOne({ _id: req.params.teddyID, user: req.params.userID });
//         if (!teddy) {
//             res.send(404);
//             return;
//         }
//         await teddy.delete();
//         res.sendStatus(200);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });


// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const teddys = require("./teddys.js");
app.use("/api/teddys", teddys.routes);

app.listen(3003, () => console.log('Server listening on port 3003!'));