const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;


// // Schema for items
const teddySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',

    },
    name: String,
    image: String,
    age: String,
    gender: String,
    created: {
        type: Date,
        default: Date.now
    },
})

const Teddy = mongoose.model('Teddy', teddySchema);

//  /:userID/teddys
router.post('/', validUser, async(req, res) => {
    try {
        // let user = await User.findOne({ _id: req.params.userID });
        // if (!user) {
        //     res.send(404);
        //     return;
        // }
        const teddy = new Teddy({
            user: req.user,
            name: req.body.name,
            image: req.body.image,
            age: req.body.age,
            gender: req.body.gender
        });
        await teddy.save();
        ///////// ?????
        return res.sendStatus(200);
        //res.send(teddy);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Does it need .sort? NEEDS A DATE?

router.get('/', validUser, async(req, res) => {
    try {
        let teddys = await Teddy.find({
            user: req.user
        }).sort({
            created: -1
        }).populate('user');;
        return res.send(teddys);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
router.delete('/:teddyID', validUser, async(req, res) => {
    try {
        let teddy = await Teddy.findOne({ _id: req.params.teddyID });
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

router.put('/:teddyID', validUser, async(req, res) => {
    try {
        let teddy = await Teddy.findOne({ _id: req.params.teddyID });
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

module.exports = {
    model: Teddy,
    routes: router,
}


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