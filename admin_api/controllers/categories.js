const CategoriesService = require("../sevices/categories");
let  util = require("util");

class CategoriesController {

    static getCategories() {
        return async (req, res) => {
            const categories = await CategoriesService.getCategories();
            let status = false;

            if(categories.length) {
                status = true;
            }

            return res.status(200).send({
                categories: categories,
                status: status
            });
        }
    }

    static getCategoryById() {
        return async (req, res) => {
           let category = await CategoriesService.getCategoryById(req.query.id);

            return res.status(200).send({
                category: category
            });
        }
    }

    static createCategory() {
        return async (req, res) => {
            let flag = await CategoriesService.isAlreadyExists(req.query.category_name)

            if(!flag.length) {
                await CategoriesService.createCategory(req.query.category_name);

                let categories = await CategoriesService.getCategories();

                return res.status(200).send({
                    message: "Category is created!",
                    categories: categories
                });
            } else {
                return res.status(200).send({
                    message: "Category is alredy exist!"
                });
            }
        }
    }

    static deleteCategory() {
        return async (req, res) => {
            // id стадиона
            const categoryId = req.body.category_id;
            // Получаю данные стадиона перед удалением (что бы знать имя картинки для удалениея из хранилища)
            const categoryData = await CategoriesService.getCategoryById(categoryId);

            await CategoriesService.deleteCategory(categoryData);
            return res.status(200).send({
                message: "Category is deleted!"
            });
        }
    }

    static updateCategory() {
        return async (req, res) => {
            
            await CategoriesService.updateCategory(req.query);

            return res.status(200).send({ message: "Category is updated!" });
        }
    }
}

module.exports = CategoriesController;