const mysql = require("../../app/drivers/mysql");

class ProductsService {

    // Удалить Product
    static deleteProduct(product_id) {
        //удалить картинку
        let sql = "DELETE FROM `products` WHERE ?";

        return mysql().query(sql, [{
            product_id: parseInt(product_id)
        }]);
    }

    // Создать продукт
    static createProduct(data) {
        let sql = "INSERT INTO `products` SET ?";

        return mysql().query(sql, {
            product_name           : data.product_name,
            category_id            : data.category_id,
            product_price          : data.product_price
           // product_description    : data.product_description,
        });
    }

     // Проверка на существование продукта
     static isAlreadyExists(product_name) {

        let sql = "SELECT product_id FROM `products` WHERE ?";

        return mysql().query(sql, [{
            product_name: product_name
        }]);
    }

    // Вернуть продукт по id
    static getProductById(product_id) {
        let sql = "SELECT * FROM `products` WHERE product_id = " + parseInt(product_id) + " LIMIT 1";

        return mysql().query(sql);
    }

    // Вернуть Product по дате создания
    static getProducts(page) {
        let sql = "SELECT * FROM `products` ";
        sql    += "ORDER BY product_id DESC "
        sql    += "LIMIT 10 OFFSET " + (parseInt(page) - 1) * 10;

        return mysql().query(sql);
    }

    // Вернуть число стадионов
    static getProductsCount() {
        let sql = "SELECT COUNT(*) AS product_count FROM `products` ";

        return mysql().query(sql);
    }

      // Обновить стадион
      static updateProduct(query) {

    }

}

module.exports = ProductsService;