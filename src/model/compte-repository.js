const sequelize = require('./db');
const bcrypt = require('bcryptjs');
const md5 = require('md5');

exports.getSolde = async (id) => {

    const compte = await sequelize.query(`SELECT solde_utilisateur from utilisateur where  id_utilisateur = "${id}" `)
        .then(([results, metadata]) => {
            return results[0];
        });
    console.log("compte", compte)
    return compte.solde_utilisateur;
}

exports.addMoney = async (montant, id) => {

    sequelize.query(`SELECT solde_utilisateur from utilisateur where  id_utilisateur = "${id}" `)
        .then(([results, metadata]) => {

            let solde = parseFloat(results[0].solde_utilisateur) + parseFloat(montant) ;

            // on ajoute maintenat l'argent au bon utilisateur
            sequelize.query(`UPDATE utilisateur SET solde_utilisateur = ${solde} WHERE id_utilisateur = "${id}" `)
                .then(([results, metadata]) => {
                    console.log(results);
                });
        });

}

exports.retraitMoney = async (montant, id) => {

    sequelize.query(`SELECT solde_utilisateur from utilisateur where  id_utilisateur = "${id}" `)
        .then(([results, metadata]) => {

            let solde = parseFloat(results[0].solde_utilisateur) - parseFloat(montant) ;

            // on ajoute maintenat l'argent au bon utilisateur
            sequelize.query(`UPDATE utilisateur SET solde_utilisateur = ${solde} WHERE id_utilisateur = "${id}" `)
                .then(([results, metadata]) => {
                    console.log(results);
                });
        });

}

exports.add_operation = async (id, type, montant, tiers, moyenpaiment,  description,  id_categorie) =>{

     if (type === "ajout"){
         sequelize.query(` INSERT INTO operation ( id_utilisateur, type_operation, montant_operation, tiers_opération, paimentmoyen_operation, date_operation,  description_operation) 
                        VALUES ( '${id}', '${type}', '${montant}', "${tiers}", '${moyenpaiment}', now() ,  "${description}") `)
             .then(([results, metadata]) => {
                 console.log(results);
             });
         this.addMoney(montant, id);
     }
     else{
         console.log("lieu lien", tiers);
         sequelize.query(` INSERT INTO operation ( id_utilisateur, type_operation, montant_operation, paimentmoyen_operation, date_operation, lieulien_operation , description_operation, id_categorie) 
                        VALUES ( '${id}', '${type}', '${montant}',  '${moyenpaiment}', now() ,"${tiers}",  "${description}", "${id_categorie}") `)
             .then(([results, metadata]) => {
                 console.log(results);
             });
         this.retraitMoney(montant,id);
     }
}






