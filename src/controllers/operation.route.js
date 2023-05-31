const express = require('express');
const router = express.Router();
const operationRepository = require('../model/operation-repository');
const { body, validationResult } = require('express-validator');
const  jwt= require("jsonwebtoken");

router.get("/journaliere/:id", body('id'), async(req,res) => {

    const operationdujour = await operationRepository.getOperationdujour(req.params.id);
    res.status(200).json({operationdujour});

});
router.get("/liste/:id", body('id'), async(req,res) => {

    const all = await operationRepository.getOperation(req.params.id);
    res.status(200).json({all});

});

router.get("/listeOperationMois/:id/:date_mois/:id_categorie/:date_annee", async(req,res) => {

    const all = await operationRepository.getOperationByMois(req.params.id, req.params.date_mois, req.params.id_categorie, req.params.date_annee);
    res.status(200).json({all});

});

exports.initializeRoutesOperation= () => router;