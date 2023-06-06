const sequelize = require('./db');

exports.getCategory = async (id) => {

    const category = await sequelize.query(`SELECT  id_categorie, id_utilisateur, nom_categorier, plafond_categorie, couleur_categorie, description_categorie FROM categorie WHERE id_utilisateur =  "${id}" 
                                               ORDER by plafond_categorie desc`)
        .then(([results, metadata]) => {
            return results;
        });
    return category;
}



exports.add_category = async (id_utilisateur,nom_cate, plafond_cate, couleur_cate, description_cate) =>{


    sequelize.query(` INSERT INTO categorie (id_categorie, id_utilisateur, nom_categorier, plafond_categorie, couleur_categorie, description_categorie) 
                        VALUES ( NULL,'${id_utilisateur}', "${nom_cate}", '${plafond_cate}', '${couleur_cate}' , "${description_cate}") `)
        .then(([results, metadata]) => {
            console.log("ajout category", results);
        });

}


exports.delete_category = async (id_categorie) =>{

    sequelize.query(`DELETE FROM categorie WHERE id_categorie = ${id_categorie}`)
        .then(([results, metadata]) => {
            console.log("deelete category", results);
        });

}

exports.update_category = async (id_categorie, nom_cate, plafond_cate, couleur_cate, description_cate) =>{

    sequelize.query(`UPDATE categorie SET nom_categorier = "${nom_cate}",  plafond_categorie = '${plafond_cate}',
        couleur_categorie = '${couleur_cate}', description_categorie = "${description_cate}" WHERE categorie.id_categorie = ${id_categorie}`)
        .then(([results, metadata]) => {
            console.log("update category", results);
        });

}


exports.somme_category = async (id_categorie) =>{

    const category = await sequelize.query(`SELECT operation.description_operation, sum(operation.montant_operation) as "somme"
                          FROM categorie, operation  WHERE categorie.id_categorie = operation.id_categorie and categorie.id_categorie = ${id_categorie}`)
        .then(([results, metadata]) => {
            return results;
        });
    console.log("category", category)
    return category;


}

exports.operation_category = async (id_categorie, date_mois, date_annee) =>{

    const category = await sequelize.query(`SELECT operation.type_operation, operation.montant_operation, operation.tiers_opération, operation.paimentmoyen_operation,
                                                 operation.date_operation, operation.lieulien_operation, operation.description_operation
                                                FROM categorie, operation  
                                                WHERE categorie.id_categorie = operation.id_categorie 
                                                and categorie.id_categorie = ${id_categorie}
                                                and MONTH( date_operation ) = ${date_mois}
                                                and YEAR( date_operation ) = ${date_annee}`)
        .then(([results, metadata]) => {
            return results;
        });
    console.log("category", category)
    return category;


}



