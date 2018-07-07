var Client = require('ftp');
var fs = require('fs');

module.exports = class CImage {
    deleteFile(file)    {
        let conection = new Client();
        conection.on('ready', function () {
            try {
                conection.delete(file, function (err) {
                    conection.end();
                });
            } catch (error) {
                console.log(error);
                conection.end();
            }
        });

        conection.connect({
            'host': 'files144.hostinger.ru',
            'user': 'u402484752',
            'password': '7bi7duEUbXr6'
        });
    }

    setImg(file) {
        let conection = new Client();
        conection.on('ready', function () {
            try {
                conection.put(file.data, 'images/' + file.name, function (err) {
                    conection.end();
                });
            } catch (error) {
                console.log(error);
                conection.end();
            }
        });

        conection.connect({
            'host': 'files144.hostinger.ru',
            'user': 'u402484752',
            'password': '7bi7duEUbXr6'
        });
    }
}
