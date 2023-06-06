const express = require('express');
const router = express.Router();
const wishRepository = require('../model/wishlist-repository');
const { body, validationResult } = require('express-validator');
const  jwt= require("jsonwebtoken");
const recapRepository = require("../model/recapitulatif-repository");


router.get("/mensuelRetraitSansCataegorie/:id_utilisateur/:mois", async(req,res) => {

    const all= await recapRepository.get_recapMoisRetraitPAsdeCategorie(req.params.id_utilisateur, req.params.mois)
    res.status(200).json({all});

});
router.get("/mensuelRetrait/:id_categorie/:mois", async(req,res) => {

    const all= await recapRepository.get_recapMoisRetrait(req.params.id_categorie, req.params.mois)
    res.status(200).json({all});

});

router.get("/mensuelAjout/:mois/:id_utilisateur", async(req,res) => {

    const all= await recapRepository.get_recapMoisAjout( req.params.mois, req.params.id_utilisateur)
    res.status(200).json({all});

});

router.get("/annuelAjout/:annee/:id_utilisateur", async(req,res) => {

    const all= await recapRepository.get_recapAnneeAjout( req.params.annee, req.params.id_utilisateur)
    res.status(200).json({all});

});
router.get("/annuelRetrait/:annee/:id_utilisateur", async(req,res) => {

    const all= await recapRepository.get_recapAnneeRetrait(req.params.annee, req.params.id_utilisateur)
    res.status(200).json({all});

});


exports.initializeRoutesRecap= () => router;