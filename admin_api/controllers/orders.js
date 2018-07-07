const OrdersService = require("../sevices/orders");
let  util = require("util");

class OrdersController {
    
    static getOrders() {
        return async (req, res) => {
            console.log("in")
            const orders = await OrdersService.getOrders(req);

            let status = false;
            if(orders.length)
                status = true;

            return res.status(200).send({
                status: status,
                orders: orders
            });
        }
    }
}

module.exports = OrdersController;