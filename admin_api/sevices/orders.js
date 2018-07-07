const mysql = require("../../app/drivers/mysql");

class OrdersService {

    static getOrders(data) {
        let sql = "SELECT * FROM `orders` ";

        return mysql().query(sql);
    }
}

module.exports = OrdersService;