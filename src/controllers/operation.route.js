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

exports.initializeRoutesOperation= () => router;