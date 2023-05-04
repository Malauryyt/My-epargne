const sequelize = require('./db');

exports.getOperationdujour = async (id) => {

    const operation = await sequelize.query(`SELECT type_operation, montant_operation, tiers_opération,paimentmoyen_operation, DATE_FORMAT(date_operation, '%H' ) as dateheures, DATE_FORMAT(date_operation, '%d/%m' ) as datejour, lieulien_operation, description_operation, id_categorie
        from operation where  id_utilisateur = "${id}" and date_operation >= now() - interval 1 day order by date_operation desc `)
        .then(([results, metadata]) => {
            return results;
        });

    console.log("ope", operation)
    return operation;
}

exports.getOperation = async (id) => {

    const operation = await sequelize.query(`SELECT type_operation, montant_operation, tiers_opération,paimentmoyen_operation, DATE_FORMAT(date_operation, '%H' ) as dateheures, DATE_FORMAT(date_operation, '%d/%m' ) as datejour, lieulien_operation, description_operation, id_categorie
       
                            from operation where  id_utilisateur = "${id}" and date_operation < now() - interval 1 day order by date_operation desc`)
        .then(([results, metadata]) => {
            return results;
        });

    console.log("ope", operation)
    return operation;
}