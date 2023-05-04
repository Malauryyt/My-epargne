const express = require('express');
const router = express.Router();
const userRepository = require('../model/user-repository');
const { body, validationResult } = require('express-validator');
const  jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {stringify} = require("nodemon/lib/utils");

router.post("/creationcompte", body('login'), body('mdp'), body('montant'),async(req,res) => {

     const createUser =  await userRepository.createUsers(req.body.login, req.body.mdp, req.body.montant);
     console.log(createUser);
     if(createUser === "ok"){
         res.status(204).end();
     }
     else{
         res.status(400).send("login déjà pris");
     }
});

router.post("/authentification", body('login'), body('mdp'), async(req,res) =>{

   const is_user =  await userRepository.loginUsers(req.body.login) ;
   console.log("mon user : ", is_user);

    if(is_user != undefined){

        if (bcrypt.compareSync(req.body.mdp, is_user.mdp_utilisateur)) {

            const token = jwt.sign({ id_utilisateur: is_user.id_utilisateur, nom_utilisatur : req.body.login}, process.env.SECRET_KEY);
            res.status(200).json({ token });

        } else {
            res.status(400).send("Login ou mot de passe incorrect")
        }
    }
    else{
        res.status(400).send("Login ou mot de passe incorrect")
        return false;
    }

});



exports.initializeRoutesAuth = () => router;