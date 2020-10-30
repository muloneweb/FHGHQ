/////RUN ONCE CODE
//These ancient technologies covered in dust were used only once to create the world we know

const SQLite = require("better-sqlite3");
const sql = SQLite('./.data/global-data.db'); 
const warapi = require('./warapi.js');


//warapi.updateStaticTowns();
//warapi.updateMap();
////SQL MANAGEMENT
//sql.prepare("CREATE TABLE global (id TEXT PRIMARY KEY, admin TEXT, settings TEXT, techtree TEXT, fobs TEXT, requests TEXT, misc TEXT, arty TEXT, squads TEXT, refinery TEXT, production TEXT, storage TEXT, stockpiles TEXT, logi TEXT, events TEXT);").run();
//SETTINGS: name, side, channel, secure, password
//sql.prepare("CREATE TABLE userglobal (id TEXT PRIMARY KEY, userid TEXT, globalid TEXT, rank INT, role INT, FOREIGN KEY (userid) REFERENCES users(id), FOREIGN KEY (globalid) REFERENCES global(id));").run(); 
//sql.prepare("CREATE TABLE events (region INT, date TEXT, prevItem TEXT, newItem TEXT);")
//sql.prepare("CREATE TABLE users (id TEXT PRIMARY KEY, salt TEXT, name TEXT, avatar TEXT);").run();
//INSERT INTO users (id, salt, name, avatar) VALUES ("anonymous","anonymous","anonymous","anonymous");
//warapi.pullStatic();


//You should have gone for the HEAD
//NO
//sql.prepare("DROP TABLE userglobal;").run();
//sql.prepare("DROP TABLE users;").run();
//sql.prepare("DROP TABLE global;").run();
//sql.prepare("CREATE TABLE warhistory (warnumber INT, warstats TEXT, events TEXT, reports TEXT, startpoint TEXT);").run();
exports.wipe = function (){
sql.prepare("DELETE FROM userglobal;").run();
sql.prepare("DELETE FROM global;").run();
//sql.prepare("DELETE FROM towns;").run();  
//sql.prepare("DELETE FROM forts;").run();
//sql.prepare("DELETE FROM fobs;").run();
//sql.prepare("DELETE FROM ambushes;").run();
//sql.prepare("DELETE FROM requests;").run();
//sql.prepare("DELETE FROM techtrees;").run();
//sql.prepare("DELETE FROM mines;").run();
}



exports.cunt = function test(string){
console.log("One-time command module "+string);
}