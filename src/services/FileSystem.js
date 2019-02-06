const remote = require('electron').remote;
const fs = remote.require('fs');
const path = remote.require('path');

export default class FileSystem {
    static readDirectoryContents(route) {
        return new Promise((resolve, reject) => {
            fs.readdir(route, {withFileTypes: true}, (err, files) => {
                if(err)
                    return reject(err);

                const tree = [];
                
                // eslint-disable-next-line no-useless-escape
                files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item.name));

                files.forEach((file,i) => {
                    const currentTreeChildObj = {};
                    currentTreeChildObj.name = file.name;
                    currentTreeChildObj.fullPath = path.join(route, file.name);
                    if(file.isDirectory()) {
                        currentTreeChildObj.isDirectory = true;
                    } else {
                        const fileData = fs.statSync(currentTreeChildObj.fullPath);
                        currentTreeChildObj.extraData = {
                            size: fileData.size
                        };                    }
                    
                    tree.push(currentTreeChildObj);
                });
    
                resolve(tree);
            });
        });
    }
}