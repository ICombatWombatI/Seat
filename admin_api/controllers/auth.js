const AuthService = require("../sevices/auth");
const verifyToken = require('../middlewares/verifyToken');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const settings = require('../../settings');

class AuthController {

    static changePassword() {
        return async (req, res, next) => {
            // Меняю пароль
            await AuthService.changePassword(req.body.user_id, req.body.new_password);
            // Отправляю статус 200 и подтврждение о смене пароля
            return res.status(200).send({ message: "Password are changed!", auth: false, token: null });
        }
    }

    static register() {
        return async (req, res) => {
            await AuthService.register(req, res);

            return res.status(200).send({ message: "User are created!" });
        }
    }

    static auth() {
        return async (req, res) => {
            console.log(req.body);
            const user = (await AuthService.findUser(req.body.email))[0];
         
            // Ищу пользователя по email
            if (!user) {
                // Возвращаю ответ 401
                return res.status(401).send({
                    auth: false,
                    message: "Password or Email are wrong!"
                });
            }

            // Сравниваю пароли если пользователь найден
            let isEqual = bcrypt.compareSync(req.body.password, user.vendor_password)
            // Если пароли не совпали 
            if (!isEqual) {
                // Возвращаю ответ 401
                return res.status(401).send({
                    auth: false,
                    message: "Password or Email are wrong!"
                });
            } else {

                // Если пароли совпали, cоздаю accessToken
                const accessToken = JWT.sign({
                    id: user.user_id,
                    name: user.user_name
                }, settings.secret, {
                        expiresIn: 43200 // 12 hour to expierd
                    });

                // Возвращаю ответ 200
                res.status(200).send({
                    auth: true,
                    token: accessToken
                });
            }
        }
    }
}

module.exports = AuthController;