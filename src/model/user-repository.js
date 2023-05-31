const sequelize = require('./db');
const bcrypt = require('bcryptjs');
const md5 = require('md5');


exports.createUsers = async (login, mdp, montant) => {
    const  sel = bcrypt.genSaltSync(12);
    const mdphash = bcrypt.hashSync(mdp , sel);

    const user = await this.loginUsers(login);

   if( user === undefined ){
       sequelize.query(`insert into utilisateur (login_utilisateur, mdp_utilisateur, solde_utilisateur) values ('${login}', '${mdphash}',${montant} )`)
           .then(([results, metadata]) => {
               console.log(results);
           });
       return 'ok';
   }
   else{
       return 'logindejause';
   }

}

exports.loginUsers = async (login) => {

    const user = await sequelize.query(`SELECT id_utilisateur, login_utilisateur, mdp_utilisateur  from utilisateur where  login_utilisateur = "${login}" `)
        .then(([results, metadata]) => {
            return results[0];
        });
    return user;
}



exports.idUsers = async (login, mdp) =>{

    sequelize.query(`SELECT id_utilisateur  from utilisateur where  login_utilisateur = "${login}" `)
        .then(([results, metadata]) => {
                return results[0].id_utilisateur ;
        });
}



