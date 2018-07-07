const StandsService = require("../sevices/stands");
let  util = require("util");

class StandsController {
    
    static getStands() {
        return async (req, res) => {
            const stands = await StandsService.getStands(req.query.stadium_id);

            let status = false;
            if(stands.length)
                status = true;

            return res.status(200).send({
                status: status,
                stands: stands
            });
        }
    }

    static createStand() {
        return async (req, res) => {
            await StandsService.createStand(req.query);
            let stands = await StandsService.getStands(req.query.stadium_id);

            return res.status(200).send({
                 stands  :    stands,
                 message: "Stand created!" 
                });
        }
    }

    static deleteStand() {
        return async (req, res) => {
            // id стадиона
            const standId = req.body.stand_id;
            // Получаю данные стадиона перед удалением (что бы знать имя картинки для удалениея из хранилища)
            const standData = await StandsService.getStandById(standId);

            await StandsService.deleteStand(standData);

            return res.status(200).send({
                message: "Stand is delete!"
            });
        }
    }

    static updateStand() {
        return async (req, res) => {
            await StandsService.updateStand(req.body);

            return res.status(200).send({ message: "Stand is update!" });
        }
    }
}

module.exports = StandsController;