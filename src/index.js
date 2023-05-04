/*console.log('Hello there');
require ("./model/db");
const user = require("./model/user-repository");


//user.createUsers('test2', '2345', 12.6)

user.getUsers();*/
const WebServer = require('./core/web-server');

const webServer = new WebServer();
webServer.start();