import * as nedb from 'nedb';

export default class Datastore {
    db = null;

    constructor(dbName) {
        this.db = new nedb({ filename: `${dbName}.db`, autoload: true });
    }

    find(query) {
        return new Promise((resolve, reject) => {
            this.db.find(query, (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            });
        });
    }

    insert(doc) {
        return new Promise((resolve, reject) => {
            this.db.insert(doc, (err, newDoc) => {
                if(err) return reject(err);
                return resolve(newDoc);
            });
            
        });
    }
}