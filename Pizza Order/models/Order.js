module.exports = class Order {
    constructor(body) {
        this.size = body.size;
        this.crust = body.crust;
        this.topping = body.topping;
        this.quantity = body.quantity;
        this.firstname = body.firstname;
        this.lastname = body.lastname;
        this.address = body.address;
        this.phone = body.phone;
        this.comment = body.comment;
    }
}