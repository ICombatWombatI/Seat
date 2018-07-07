const mysql = require("../../app/drivers/mysql");

class CategoriesService {

    // Обновить стадион
    static updateCategory(query) {

    }

    // Удалить категорию
    static deleteCategory(data) {

        let sql = "DELETE FROM `categories` WHERE ?";

        return mysql().query(sql, [{
            category_id: parseInt(data.category_id)
        }]);
    }

    // Создать категорию
    static createCategory(category_name) {
        let sql = "INSERT INTO `categories` SET ?";

        return mysql().query(sql, {
            category_name: category_name,
        });
    }

     // Проверка на существование стадиона
     static isAlreadyExists(category_name) {
        let sql = "SELECT category_id FROM `categories` WHERE ?";

        return mysql().query(sql, [{
            category_name: category_name
        }]);
    }

    // Вернуть стадионы по дате создания
    static getCategories() {
        let sql = "SELECT * FROM `categories` ";

        return mysql().query(sql);
    }
}

module.exports = CategoriesService;