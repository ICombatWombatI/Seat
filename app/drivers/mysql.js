const mysql = require('mysql');
const settings = require('../../settings');

const mysqlDriver = function() {

    let instance;

    function init() {
        const pool = mysql.createPool({
            host     :  settings.database.mysql.host,
            user     :  settings.database.mysql.user,
            password :  settings.database.mysql.password,
            database :  settings.database.mysql.database
        });

        return {
            query: function(sql, props) {
                return new Promise(function (resolve, reject) {
                    
                    pool.getConnection(function(err, connection) {
                        // Use the connection
                        connection.query(sql, props, function (err, result) {
                            // And done with the connection.
                            connection.release();

                            // Handle error after the release.
                            if (err) {
                                // dev mode
                                reject({ message: "dev_mode: " + err.message });

                                // prod mode
                                /*reject({ message: "Error db query!"  });*/
                            } else {
                                resolve(result);
                            };
                      
                            // Don't use the connection here, it has been returned to the pool.
                        });
                    });

                    /*pool.on('release', function (connection) {
                        console.log('Connection %d released', connection.threadId);
                    });*/

                });
            }
        };
    };


    return {
        getInstance: function() {
            if (! instance) {
                //console.log("CREATE instance!");
                instance = init();
            }

            //console.log("ISSET instance!!!");
            return instance;
        }
    };

};

module.exports = mysqlDriver().getInstance;