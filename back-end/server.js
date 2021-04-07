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
/*
// Create a scheme for projects
const projectSchema = new mongoose.Schema({
    name: String,
    image: String,
    age: String,
    gender: String
});

// Create a model for projects
const Teddy = mongoose.model('Teddy', projectSchema);

// Create a project
app.post('/api/teddy', async(req, res) => {
    const teddy = new Teddy({
        name: req.body.name,
        image: req.body.image,
        age: req.body.age,
        gender: req.body.gender
    });
    try {
        await teddy.save();
        res.send(teddy);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all of the items in the museum.
app.get('/api/teddys', async(req, res) => {
    try {
        let teddy = await Teddy.find();
        res.send(teddy);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/teddy/:id', async(req, res) => {
    try {
        await Teddy.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.put('/api/teddy/:id', async(req, res) => {
    try {
        let item = await Teddy.findOne({
            _id: req.params.id
        });
        item.name = req.body.name
        item.age = req.body.age
        item.save()
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
*/

// Schema for users
const userSchema = new mongoose.Schema({
    name: String,
    //active: Boolean
})

// Model for user
const User = mongoose.model('User', userSchema);


app.post('/api/users', async(req, res) => {
    const user = new User({
        name: req.body.name,
        //active: req.body.active
    });
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// Get a list of all users
app.get('/api/users', async(req, res) => {
    try {
        let users = await User.find();
        res.send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.delete('/api/users/:id', async(req, res) => {
    try {
        await User.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Schema for items
const teddySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',

    },
    // text: String,
    // active: Boolean,
    name: String,
    image: String,
    age: String,
    gender: String
})

const Teddy = mongoose.model('Teddy', teddySchema);

app.post('/api/users/:userID/teddys', async(req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.userID });
        if (!user) {
            res.send(404);
            return;
        }
        let teddy = new Teddy({
            user: user,
            //text: req.body.text,
            name: req.body.name,
            image: req.body.image,
            age: req.body.age,
            gender: req.body.gender
                //completed: req.body.completed,
        });
        await teddy.save();
        res.send(teddy);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/users/:userID/teddys', async(req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.userID });
        if (!user) {
            res.send(404);
            return;
        }
        let teddys = await Teddy.find({ user: user });
        res.send(teddys);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/users/:userID/teddys/:teddyID', async(req, res) => {
    try {
        let teddy = await Teddy.findOne({ _id: req.params.teddyID, user: req.params.userID });
        if (!teddy) {
            res.send(404);
            return;
        }
        teddy.name = req.body.name
        teddy.age = req.body.age
            // teddy.image = req.body.image
            // teddy.gender = req.body.gender

        await teddy.save();
        res.send(teddy);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/users/:userID/teddys/:teddyID', async(req, res) => {
    try {
        let teddy = await Teddy.findOne({ _id: req.params.teddyID, user: req.params.userID });
        if (!teddy) {
            res.send(404);
            return;
        }
        await teddy.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));