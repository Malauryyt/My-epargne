const express = require('express');
const router = express.Router();
const compteRepository = require('../model/compte-repository');
const { body, validationResult } = require('express-validator');
const  jwt= require("jsonwebtoken");

router.post("/soldecompte",async(req,res) => {


    console.log("req.body.iddd: ", req.body.id)
    const solde = await compteRepository.getSolde(req.body.id)
    console.log("solde: ", solde)
    res.status(200).json({solde : solde});

});

router.post("/ajoutcompte",  body('id'),  body('montant'),  body('tiers'),  body('moyenpaiment'),  body('description'), async (req,res)=>{

    const ajout = await compteRepository.add_operation(req.body.id, "ajout", req.body.montant, req.body.tiers, req.body.moyenpaiment, req.body.description);
    res.status(200).json("okokkkk");

});
router.post("/retraitcompte",  body('id'),  body('montant'),  body('lieulien'),  body('moyenpaiment'),  body('description'),  body('id_categorie'),async (req,res)=>{

    const ajout = await compteRepository.add_operation(req.body.id, "retrait", req.body.montant, req.body.lieulien, req.body.moyenpaiment, req.body.description, req.body.id_categorie);
    res.status(200).json("okokkkk");

});




exports.initializeRoutesCompte= () => router;