const sequelize = require('./db');
const bcrypt = require('bcryptjs');
const md5 = require('md5');


exports.get_recapMoisRetraitPAsdeCategorie = async (id_utilisateur, mois) => {

    const souhait = await sequelize.query(`SELECT *, sum(montant_operation) as "somme"
                                                FROM  operation
                                                where id_categorie = 0
                                                and MONTH( date_operation ) = ${mois}
                                                and type_operation = "retrait"
                                                and id_utilisateur = ${id_utilisateur}
                                                `)
        .then(([results, metadata]) => {
            return results;
        });

    return souhait;
}

exports.get_recapMoisRetrait = async (id_categorie, mois) => {

    const souhait = await sequelize.query(`SELECT *, sum(montant_operation) as "somme"
                                                FROM categorie, operation  
                                                WHERE categorie.id_categorie = operation.id_categorie 
                                                 and categorie.id_categorie = ${id_categorie}
                                                and MONTH( date_operation ) = ${mois}
                                                and type_operation = "retrait" `)
        .then(([results, metadata]) => {
            return results;
        });

    return souhait;
}

exports.get_recapMoisAjout = async ( mois , id_utilisateur) => {

    const souhait = await sequelize.query(`SELECT *, sum(montant_operation) as "somme" FROM operation where MONTH( date_operation ) = ${mois} and type_operation = "ajout"  and id_utilisateur = ${id_utilisateur}`)
        .then(([results, metadata]) => {
            return results;
        });

    return souhait;
}

exports.get_recapAnneeAjout = async ( annee, id_utilisateur) => {

    const souhait = await sequelize.query(`SELECT *, sum(montant_operation) as "somme" FROM operation where YEAR( date_operation ) = ${annee} and type_operation = "ajout"  and id_utilisateur =${id_utilisateur}`)
        .then(([results, metadata]) => {
            return results;
        });

    return souhait;
}

exports.get_recapAnneeRetrait = async ( annee, id_utilisateur) => {

    const souhait = await sequelize.query(`SELECT *, sum(montant_operation) as "somme" FROM operation where YEAR( date_operation ) = ${annee} and type_operation = "retrait" and id_utilisateur =${id_utilisateur} `)
        .then(([results, metadata]) => {
            return results;
        });

    return souhait;
}


