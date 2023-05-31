const request = require('supertest');

// Décrivez votre suite de tests avec la fonction "describe"

//test insertion utilisateur
describe('POST /auth/creationcompte', () => {

    test('test authentification', async () => {

        const payload = {login : "thierryyyy", mdp : "azerty", montant : '13.2'}

        // Effectuez l'appel POST à votre route et récupérez la réponse
        const response = await request('http://localhost:3000/')
            .post('auth/creationcompte')
            .send(payload);

        // Vérifiez le code de statut HTTP et la réponse attendus
        expect(response.statusCode).toBe(204);
        //expect(response.body).toEqual({ success: true, message: '' });
    });
});


// test utilisateur mauvais
describe('POST /auth/authentification', () => {

    test('test authentification faux', async () => {

        const payload = {login : "mdpest123", mdp : "12345"}

        // Effectuez l'appel POST à votre route et récupérez la réponse
        const response = await request('http://localhost:3000/')
            .post('auth/authentification')
            .send(payload);

        // Vérifiez le code de statut HTTP et la réponse attendus
        expect(response.statusCode).toBe(400);
        //expect(response.body).toContain( "Login ou mot de passe incorrect");
    });
});

// test bon utilisateur
describe('POST /auth/authentification', () => {

    test('test authentification faux', async () => {

        const payload = {login : "mdpest123", mdp : "123"}

        // Effectuez l'appel POST à votre route et récupérez la réponse
        const response = await request('http://localhost:3000/')
            .post('auth/authentification')
            .send(payload);

        // Vérifiez le code de statut HTTP et la réponse attendus
        expect(response.statusCode).toBe(204);
        //expect(response.body).toContain( "Login ou mot de passe incorrect");
    });
});