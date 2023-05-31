const express = require('express');
const router = express.Router();
const cateRepository = require('../model/category-repository');
const { body, validationResult } = require('express-validator');
const  jwt= require("jsonwebtoken");

router.post("/allCategory", body('id'),async(req,res) => {

    const all= await cateRepository.getCategory(req.body.id)
    console.log("cate: ", all)
    res.status(200).json({all});

});

router.post("/ajoutcate", body('id'), body('nom_cate'), body('plafond_cate'),  body('couleur_cate'), body('description_cate'), async (req,res)=>{

    const ajout = await cateRepository.add_category(req.body.id, req.body.nom_cate, req.body.plafond_cate, req.body.couleur_cate, req.body.description_cate) ;
    res.status(200).json("okokkkk");

});

router.post("/deletecate", body('id_categorie'), async (req,res)=>{

    const ajout = await cateRepository.delete_category(req.body.id_categorie) ;
    res.status(200).json("okokkkk");

});

router.post("/updatecate", body('id_categorie'),  body('nom_cate'), body('plafond_cate'),  body('couleur_cate'), body('description_cate'), async (req,res)=>{

    const update = await cateRepository.update_category(req.body.id_categorie, req.body.nom_cate, req.body.plafond_cate, req.body.couleur_cate, req.body.description_cate) ;
    res.status(200).json("okokkkk");

});

router.post("/sommecate", body('id_categorie'), async (req,res)=>{

    const somme = await cateRepository.somme_category(req.body.id_categorie)
    console.log("somme: ", somme)
    res.status(200).json({somme});

});

router.post("/operationcate", body('id_categorie'),  body('date_mois'), body('date_annee'),async (req,res)=>{

    const operation = await cateRepository.operation_category(req.body.id_categorie, req.body.date_mois, req.body.date_annee)
    console.log("operation: ", operation)
    res.status(200).json({operation});

});




exports.initializeRoutesCategory= () => router;