const mysql = require("../../app/drivers/mysql");

class KiosksService {

    // Обновить стадион
    static updateProduct(query) {
        // обновить разве что имя
    }

    // Удалить Kiosk
    static deleteKiosk(data) {
        // удалить продукты на складе
        let sql = "DELETE FROM `kiosk` WHERE ?";

        return mysql().query(sql, [{
            kiosk_id: parseInt(data.kiosk_id)
        }]);
    }

    // Создать Kiosk 
    static createKiosk(data) {

        let sql = "INSERT INTO `kiosks` SET ?";

        return mysql().query(sql, {
            stand_id         : data.stand_id,
            kiosk_name       : data.kiosk_name
        });
    }

    // Вернуть стадионы по дате создания
    static getKiosks(stadium_id) {
        let sql = "SELECT * FROM `kiosks` ";
            sql +="INNER JOIN `stands` ON stands.stand_id = kiosks.stand_id ";
            sql +="INNER JOIN `stadiums` ON stadiums.stadium_id = stands.stadium_id ";
            sql +=" WHERE stadiums.stadium_id = '" + stadium_id+ "' ";
        return mysql().query(sql);

    }
}

module.exports = KiosksService;