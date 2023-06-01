const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutesAuth = require('../controllers/auth.route');
const userRoutesCompte = require('../controllers/compte.route');
const userRoutesoperation = require('../controllers/operation.route');
const userRoutesCategory = require('../controllers/cate.route');
const userRoutesWishlist = require('../controllers/wishlist.route');


class WebServer {
    app = undefined;
    port = 3000;
    server = undefined;

    constructor() {
        this.app = express();
        //sequelize.sync({force : true});
        require('dotenv').config();
        initializeConfigMiddlewares(this.app);
        this._initializeRoutes();
        initializeErrorMiddlwares(this.app);
    }

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }

    stop() {
        this.server.close();
    }

    _initializeRoutes() {
       this.app.use('/auth', userRoutesAuth.initializeRoutesAuth());
       this.app.use('/compte', userRoutesCompte.initializeRoutesCompte());
       this.app.use('/operation', userRoutesoperation.initializeRoutesOperation());
       this.app.use('/category', userRoutesCategory.initializeRoutesCategory());
       this.app.use('/wishlist', userRoutesWishlist.initializeRoutesWishlist());
    }
}

module.exports = WebServer;