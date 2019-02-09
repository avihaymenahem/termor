import { remote } from 'electron';

const ssh2 = remote.require('ssh2');
const Client = ssh2.Client;

export default class FTP {
    state = {
        isConnected: false
    };
    connection = null;
    config = {};

    constructor() {
        this.connection = new Client();
    }

    _connectionReady() {
        return new Promise((resolve, reject) => {
            this.connection.on('ready', () => {
                this.state.isConnected = true;
                resolve();
            });
        });
    }

    _execute(command) {
        return new Promise((resolve, reject) => {
            this.connection.exec(command, (err, stream) => {
                if (err) return reject(err);

                resolve(stream);
            })
        })
    }

    async connect() {
        this.connection.connect(this.config);

        await this._connectionReady();
        console.log("Connected");
    }

    async readDirectoryContents(route) {
        return new Promise((resolve, reject) => {
            if(!this.state.isConnected) {
                return reject();
            }
            
            this.connection.sftp((err, sftp) => {
                if(err) return reject(err);

                sftp.readdir(route, (sftpErr, list) => {
                    if(sftpErr) return reject(sftpErr);

                    const newTreeStruct = list.map(item => {
                        const obj = {
                            name: item.filename,
                            isDirectory: item.attrs.isDirectory(),
                            fullPath: `${route}item.filename`
                        };
                        
                        if(!obj.isDirectory) {
                            obj.extraData = {
                                size: item.attrs.size
                            }
                        }
                        return obj;
                    });

                    resolve(newTreeStruct);
                });
            });
        });
    }
    
}