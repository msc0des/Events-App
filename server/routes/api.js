//Here we define Api Endpoints USER REGISTRATION API
const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const User = require('../models/user')
const db="mongodb+srv://event_user:abcde@cluster0.7zkba.mongodb.net/userdb?retryWrites=true&w=majority"

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true}, err =>{
    if(err)
        console.log('Errorrrrrr!' +err)
    else
    {
        console.log('Connected to mongodb')
    }   
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return req.status(401).send('Unauthorized request')
    }

    let token=req.headers.authorization.split(' ')[1]
    if(token=='null'){
        return req.status(401).send('Unauthorized request')
    }

    let payload=jwt.verify(token,'secretKey')
    if(!payload){
        return req.status(401).send('Unauthorized request')
    }

    req.userId=payload.subject
    next()

    try {
         let payload = jwt.verify (token, 'secretKey')
         req.userId = payload.subject
         next ()
        } catch (err) {
         return res.status (401) .send ('Unauthorized request')
     }
}

router.post('/register',(req,res)=>{
    let userData=req.body
    let user=new User(userData)
    user.save((error,registeredUser)=>{
        if(error)
        {
            console.log(error)
        }
        else{
            let payload={subject: registeredUser._id}
            let token=jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    })
})

router.get('/',(req,res)=>{
    res.send('From API Route')
})

//Login API
router.post('/login',(req,res)=>{
    const userData=req.body
    User.findOne({email:userData.email},(error,user)=>{  //findOne() is method in mongodb which returnns one document from db that matches the condition
        if(error){
            console.log(error)
        }
        else{
            if(!user)
            {
                res.status(401).send('Invalid Email')
            }else{
                if(user.password!=userData.password){
                    res.status(401).send('Invalid Password')
                }
                else{
                    let payload={subject:user._id}
                    let token=jwt.sign(payload,'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})
router.get('/events',(req,res)=>{
    let events=[
        {
        "_id" : "1",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
        {
        "_id" : "2",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
        {
        "_id" : "3",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
        {
        "_id" : "4",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
        {
        "_id" : "5",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
         {
        "_id" : "5",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

router.get('/specialevents',verifyToken,(req,res)=>{
    let events=[
        {
        "_id" : "1",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
        {
        "_id" : "2",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
        {
        "_id" : "3",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
        {
        "_id" : "4",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
        {
        "_id" : "5",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        },
         {
        "_id" : "6",
        "name":"Auto Expo",
        "description":"lorem ipsum",
        "date":"2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})


module.exports=router