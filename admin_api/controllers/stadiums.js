const StadiumsService = require("../sevices/stadiums");
let  util = require("util");

class StadiumsController {

    static getStadiums() {
        return async (req, res) => {
            const stadiums = await StadiumsService.getStadiums(req.query.page);

            return res.status(200).send({
                stadiums: stadiums
            });
        }
    }

    static getStadiumById() {
        return async (req, res) => {
           let stadium = await StadiumsService.getStadiumById(req.query.stadium_id);

            return res.status(200).send({
                stadium: stadium
            });
        }
    }

    static createStadium() {
        return async (req, res) => {console.log(req.body.stadium_name);
            let flag = await StadiumsService.isAlreadyExists(req.body.stadium_name)

            if(!flag.length) {
               await StadiumsService.createStadium(req.body);

                return res.status(200).send({ message: "Stadium created!" });
            } else {
                return res.status(200).send({ message: "Stadium is alredy exist!" });
            }
        }
    }

    static deleteStadium() {
        return async (req, res) => {
            // id стадиона
            const StadiumId = req.body.stadium_id;
            // Получаю данные стадиона перед удалением (что бы знать имя картинки для удалениея из хранилища)
            const postData = await StadiumsService.getStadiumById(StadiumId);

            await StadiumsService.deleteStadium(postData);
            return res.status(200).send({
                message: "Stadium is delete!"
            });
        }
    }

    static updateStadium() {
        return async (req, res) => {
            
            await StadiumsService.updateStadium(req.query);

            return res.status(200).send({ message: "User are created!" });
        }
    }

    static getStadiumsCount() {
        return async (req, res) => {
            let stadium_count = await StadiumsService.getStadiumsCount();

            res.status(200).send({
                stadium_count : stadium_count
            });
        }
    }
}

module.exports = StadiumsController;