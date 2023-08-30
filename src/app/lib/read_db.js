// https://www.digitalocean.com/community/tutorials/how-to-use-sqlite-with-node-js-on-ubuntu-22-04

// https://medium.com/@benmorel/creating-a-linux-service-with-systemd-611b5c8b91d6

const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
var path = require('path');

const filepath = path.resolve(process.env.LOGS_DATABASE_FILEPATH);
function createDbConnection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  }
  else{
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
}



// read in a table
export const selectRows = () => {
  return new Promise((resolve, reject) => {
    const db = createDbConnection()
    let result = []
    db.each(`SELECT * FROM logs`, (err, row) => {
      if(err) { reject(err) }
      result.push(Object.values(row))
    }, () => {
      resolve(result)
    })
  })
}


export const total_records = () => {
  return new Promise((resolve, reject) => {
    const db = createDbConnection()
    let result = []
    try {
      db.each(`SELECT COUNT(*) as 'count' FROM logs`, (err, row) => {
        if(err) { reject(err) }
          result.push(Object.values(row))
      }, () => {
        resolve(result)
      })
    } catch (error) {
      console.debug(error)
      resolve(result)
    }
  })
}


export const logs_by_hour_count = () => {
  return new Promise((resolve, reject) => {
    const db = createDbConnection()
    let result = []
    db.each(`SELECT COUNT(*), strftime ('%H',datetime) FROM logs GROUP BY strftime('%H',datetime)`, (err, row) => {
      if(err) { reject(err) }
      result.push(Object.values(row))
    }, () => {
      resolve(result)
    })
  })
}

export const teams_per_attack = () => {
  let query = `SELECT  COUNT(DISTINCT team), protocol, COUNT(*) FROM logs GROUP BY protocol`
  return new Promise((resolve, reject) => {
    const db = createDbConnection()
    let result = []
    db.each(query, (err, row) => {
      if(err) { reject(err) }
      result.push(Object.values(row))
    }, () => {
      resolve(result)
    })
  })
}


export const logs_per_protocol = () => {
  let query = `SELECT   protocol, COUNT(*) FROM logs GROUP BY protocol`
  return new Promise((resolve, reject) => {
    const db = createDbConnection()
    let result = []
    db.each(query, (err, row) => {
      if(err) { reject(err) }
      result.push(Object.values(row))
    }, () => {
      resolve(result)
    })
  })
}


export const ips_per_protocol = () => {
  let query = `SELECT  COUNT(DISTINCT src) , COUNT(DISTINCT team)   , protocol FROM logs GROUP BY protocol`
  return new Promise((resolve, reject) => {
    const db = createDbConnection()
    let result = []
    db.each(query, (err, row) => {
      if(err) { reject(err) }
      result.push(Object.values(row))
    }, () => {
      resolve(result)
    })
  })
}



// pagination
export const selectRowsPaginated = (page=1, limit=30) => {
  return new Promise((resolve, reject) => {
    const db = createDbConnection()
    let result = []
    db.each(`SELECT * FROM logs LIMIT ${limit} OFFSET ${(page - 1) * limit} ORDER BY datetime DESC`, (err, row) => {
      if(err) { reject(err) }
      result.push(Object.values(row))
    }, () => {
      resolve(result)
    })
  })
}


