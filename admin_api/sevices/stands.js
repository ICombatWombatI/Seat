const mysql = require("../../app/drivers/mysql");

class StandsService {

    static getStands(stadium_id) {
        let sql = "SELECT * FROM `stands` WHERE ?";

        return mysql().query(sql, [{
            stadium_id: parseInt(stadium_id)
        }]);
    }

    static updateProduct(query) {
        
    }

    static deleteStand(data) {
        // удалить все связи
        let sql = "DELETE FROM `stands` WHERE ?";

        return mysql().query(sql, [{
            stand_id: parseInt(data.stand_id)
        }]);
    }

    // Создать Stand 
    static createStand(data) {
        let sql = "INSERT INTO `stands` SET ?";

        return mysql().query(sql, {
            stadium_id             : data.stadium_id,
            stand_name             : data.stand_name
        });
    }
}

module.exports = StandsService;