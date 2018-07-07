const KiosksService = require("../sevices/kiosks");
let  util = require("util");

class KiosksController {

    static getKiosks() {
        return async (req, res) => {
            const kiosks = await KiosksService.getKiosks(req.query.stadium_id);
        
            let status = false;
            if(kiosks.length)
                status = true;

            return res.status(200).send({
                status: status,
                kiosks: kiosks
            });
        }
    }

    static createKiosk() {
        return async (req, res) => {
           await KiosksService.createKiosk(req.query);
            const kiosks = await KiosksService.getKiosks(req.query.stadium_id);

            return res.status(200).send({
                kiosks: kiosks,
                message: "Kiosk created!"
            });
        }
    }

    static deleteKiosk() {
        return async (req, res) => {
            // Получаю данные киоска перед удалением (что бы очистить связи)
            const kioskData = await KiosksService.getKioskById(req.body.kiosk_id);

            await KiosksService.deleteKiosk(kioskData);
            return res.status(200).send({
                message: "kiosk is deleted!"
            });
        }
    }

    static updateKiosk() {
        return async (req, res) => {
            await KiosksService.updateKiosk(req.query);

            return res.status(200).send({ message: "kiosk is updated!" });
        }
    }
}

module.exports = KiosksController;