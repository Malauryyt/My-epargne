const express = require('express');
const router = express.Router();
const wishRepository = require('../model/wishlist-repository');
const { body, validationResult } = require('express-validator');
const  jwt= require("jsonwebtoken");
const cateRepository = require("../model/category-repository");

router.post("/allWishlist", body('id_utilisateur'),async(req,res) => {

    const all= await wishRepository.get_wishlist(req.body.id_utilisateur)
    res.status(200).json({all});

});

router.post("/ajoutWishlist", body('id_utilisateur'), body('titre'), body('description'), body('icon'), async (req,res)=>{

    const ajout = await wishRepository.add_wishlist(req.body.id_utilisateur, req.body.titre, req.body.description, req.body.icon) ;
    res.status(200).json("okokkkk");

});

router.post("/allSouhait", body('id_wishlist'),async(req,res) => {

    const all= await wishRepository.get_souhait(req.body.id_wishlist)
    res.status(200).json({all});

});

router.post("/ajoutSouhait", body('id_wishlist'), body('nom_souhait'), body('montant_souhait'), body('lieulien_souhait'), body('description_souhait'),body('tiers_souhait'),async (req,res)=>{

    const ajout = await wishRepository.add_souhait(req.body.id_wishlist, req.body.nom_souhait, req.body.montant_souhait, req.body.lieulien_souhait, req.body.description_souhait, req.body.tiers_souhait) ;
    res.status(200).json("okokkkk");

});

router.post("/updateSouhait", body('id_souhait'), body('value'), async (req,res)=>{

    const ajout = await wishRepository.update_souhait(req.body.id_souhait, req.body.value) ;
    res.status(200).json("okokkkk");

});



exports.initializeRoutesWishlist= () => router;