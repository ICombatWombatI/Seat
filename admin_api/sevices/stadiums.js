const mysql = require("../../app/drivers/mysql");

class StadiumsService {

    // Обновить стадион
    static updateStadium(query) {
        let sql = "SELECT * FROM vendors WHERE ?";

        return mysql().query(sql);
    }

    // Удалить стадион
    static deleteStadium(data) {
        //удалить картинку
        let sql = "DELETE FROM `stadiums` WHERE ?";

        return mysql().query(sql, [{
            stadium_id: parseInt(data.stadium_id)
        }]);
    }

    // Создать стадион 
    static createStadium(data) {
    /* Картинка
    let TitleImageName = "";

            // Загружаем картинку (если она существует)
            if (req.body.T_IMG === 'true') {

                let file = new CImage();

                req.files.T_IMG.name = RenameHelper.reName( req.files.T_IMG.name);

                file.setImg(req.files.T_IMG);

                TitleImageName = req.files.T_IMG.name;
            }
    */
        let sql = "INSERT INTO `stadiums` SET ?";

        return mysql().query(sql, {
            stadium_name           : data.stadium_name,
            stadium_featured_url   : 'images/',//+ data.stadium_featured_url,
            //city_id    : data.city_id,
            //stadium_vendor_email    : req.body.stadium_vendor_email
            //stadium_vendor_name    : req.body.stadium_vendor_name,
            //stadium_vendor_password   : req.body.stadium_vendor_password,
        });
    }

     // Проверка на существование стадиона
     static isAlreadyExists(stadium_name) {

        let sql = "SELECT stadium_id FROM `stadiums` WHERE ?";

        return mysql().query(sql, [{
            stadium_name: stadium_name
        }]);
    }

    // Вернуть стадион по id
    static getStadiumById(stadium_id) {
        let sql = "SELECT * FROM `stadiums` WHERE stadium_id = " + parseInt(stadium_id) + " LIMIT 1";

        return mysql().query(sql);
    }

    // Вернуть стадионы
    static getStadiums(conut=1) {
        let sql = "SELECT * FROM `stadiums` ";
        sql += "ORDER BY stadium_id DESC "
        sql += "LIMIT 10 OFFSET " + (parseInt(conut) - 1) * 10;

        return mysql().query(sql);
    }

    // Вернуть число стадионов
    static getStadiumsCount() {
        let sql = "SELECT COUNT(*) AS stadium_count FROM stadiums ";

        return mysql().query(sql);
    }
}

module.exports = StadiumsService;