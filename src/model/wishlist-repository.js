const sequelize = require('./db');
const bcrypt = require('bcryptjs');
const md5 = require('md5');

exports.get_wishlist = async (id_utilisateur) => {

    const wishlist = await sequelize.query(`SELECT id_wishlist, titre_wishlist, description_wishlist, icon_wishlist FROM wishlist where id_utilisateur = "${id_utilisateur}" `)
        .then(([results, metadata]) => {
            return results;
        });

    return wishlist;
}

exports.add_wishlist = async ( id_utilisateur, titre, description, icon) =>{

    sequelize.query(`  INSERT INTO wishlist (id_wishlist, titre_wishlist, description_wishlist, id_utilisateur, icon_wishlist) VALUES (NULL, "${titre}", "${description}", '${id_utilisateur}', "${icon}") `)
       .then(([results, metadata]) => {
            console.log("ajout wishlist", results);
        });

}

exports.get_souhait = async (id_wishlist) => {

    const souhait = await sequelize.query(`SELECT * FROM souhait where id_wishlist = ${id_wishlist} `)
        .then(([results, metadata]) => {
            return results;
        });

    return souhait;
}



exports.add_souhait = async (id_wishlist, nom_souhait, montant_souhait, lieulien_souhait, description_souhait, tiers_souhait) =>{

    sequelize.query(`  INSERT INTO souhait (id_souhait, id_wishlist, nom_souhait, montant_souhait, lieulien_souhait, description_souhait, tiers_souhait ) VALUES (NULL, "${id_wishlist}", "${nom_souhait}", ${montant_souhait}, "${lieulien_souhait}", "${description_souhait}", "${tiers_souhait}") `)
        .then(([results, metadata]) => {
            console.log("ajout souhait", results);
        });
}



exports.update_souhait = async (id_souhait, value) =>{

    sequelize.query(` UPDATE souhait SET estcoche_souhait = ${value} WHERE souhait.id_souhait = ${id_souhait};`)
        .then(([results, metadata]) => {
            console.log("update souhait", results);
        });
}