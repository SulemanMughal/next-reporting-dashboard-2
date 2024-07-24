// https://www.digitalocean.com/community/tutorials/how-to-use-sqlite-with-node-js-on-ubuntu-22-04

// https://medium.com/@benmorel/creating-a-linux-service-with-systemd-611b5c8b91d6


const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
var path = require('path');
const filepath = path.resolve('./data_5.db');



templates = {
    "protocol" : {
        "FTP" : [
            "SRC IP Address for initialization of FTP Attack?",
            "how many different IP Addresses, FTP Attack have been used in FTP Attack?",
            "When  did the FTP session start based on the timestamp ?",
            "Mostly Which FTP commands were used in the session?",
            "Method used for FTP Authentication?",
            "At which IP Address , FTP Successful Authentication Happened?"
        ]
    }
}



function createDbConnection() {
  return true;
  // if (fs.existsSync(filepath)) {
  //   return new sqlite3.Database(filepath);
  // }
  // else{
  //   const db = new sqlite3.Database(filepath, (error) => {
  //     if (error) {
  //       return console.error(error.message);
  //     }
  //   });
  //   console.log("Connection with SQLite has been established");
  //   return db;
  // }
}


const selectRows = () => {
  return [];
  // return new Promise((resolve, reject) => {
  //   const db = createDbConnection()
  //   let result = []
  //   let index = 0;

  //   db.each(`SELECT * FROM logs`, (err, row) => {
  //     if(err) { reject(err) }
  //       index = index + 1
  //       console.debug(row , index)
  //   }, () => {
  //     resolve(result)
  //   })
  // })
}


// find specific team logs
const selectTeam = (team_id) => {
    // console.debug(`SELECT * FROM logs WHERE team='${team_id}'`)
    return [];
    // return new Promise((resolve, reject) => {
    //   const db = createDbConnection()
    //   let result = []
    //   db.each(`SELECT Count FROM logs WHERE team='${team_id}'`, (err, row) => {
    //     if(err) { reject(err) }
    //       console.debug(row)
    //   }, () => {
    //     resolve(result)
    //   })
    // })
}


const execQuery = (query) => {
  return [];
  // return new Promise((resolve, reject) => {
  //   const db = createDbConnection()
  //   let result = []
  //   db.each(`${query}`, (err, row) => {
  //     if(err) { reject(err) }
  //       console.debug(row)
  //   }, () => {
  //     resolve(result)
  //   })
  // })
}

// fetch all rows
// selectRows();


// select specifi team logs by team-id
// selectTeam(1)
// execQuery(`SELECT Count(*) FROM logs  `)
// execQuery(`SELECT protocol, Count(*) FROM logs WHERE team=1  GROUP BY protocol`)
// execQuery(`SELECT * FROM logs WHERE   protocol='FTP' and team=1 LIMIT 30, 60 `)
// execQuery(`SELECT COUNT(*) FROM logs GROUP BY DATEDIFF(MINUTE, '2000', datetime) / 10 `)
// execQuery(`Select * FROM logs `)
// execQuery(`SELECT   COUNT(*) , protocol, team FROM logs GROUP BY  team, protocol`)
// execQuery(`SELECT  COUNT(DISTINCT src) , COUNT(DISTINCT team)   , protocol FROM logs GROUP BY protocol`)
// execQuery(`SELECT COUNT(*) FROM`)
// execQuery(`SELECT COUNT(*), strftime ('%H',datetime) FROM logs GROUP BY strftime('%H',datetime)`)
