const mysql = require("../../app/drivers/mysql");
const bcrypt = require('bcrypt');

class AuthService {
    //Поиск юзера (проверка на его существование)
    static findUser(email) {
        let sql = "SELECT * FROM vendors WHERE ?";

        return mysql().query(sql, [{
            vendor_email: email
        }]);
    }

    //Смена пароля
    static changePassword(vendor_id, new_password) {
        var salt = bcrypt.genSaltSync(10);

        var hash = bcrypt.hashSync(new_password, salt);

        return mysql().query("UPDATE `vendors` SET `vendor_password` = '" + hash + "' WHERE `vendors`.`vendor_id` = '" + vendor_id + "'");
    }

    //Регистрацыя
    static register(req, res) {
        var salt = bcrypt.genSaltSync(10);

        var hash = bcrypt.hashSync(req.body.password, salt);

        return mysql().query("INSERT INTO vendors (vendor_email, vendor_password) VALUES ('" + req.body.email + "', '" + hash + "') ");
    }
}

module.exports = AuthService;