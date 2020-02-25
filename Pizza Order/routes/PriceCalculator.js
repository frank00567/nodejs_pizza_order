
var JSON_Data;
var orderData;
var price = 0;
const tax = 1.05;
exports.setJSONData = function(pizzaData) {
    JSON_Data = pizzaData;
}

exports.setOrderData = function(order) {
    price = 0;
    orderData = order;
    calculatePrice(orderData["size"]);
    calculatePrice(orderData["crust"]);
    calculatePrice(orderData["topping"]);
    price *= orderData["quantity"];
}

exports.getTotal = function(){ 
    return Math.round(price * tax*100)/100;
}

exports.getTax = function(){
    return Math.round((price * tax - price)*100)/100
}
function calculatePrice(id) {
    if(!(id >100)){
        for(var ID in id){
            getPrice(id[ID]);
        }
    }else{
        getPrice(id);
    }
}
function getPrice(id) {
    console.log(id);
    if(id >300){
        for(var topping in JSON_Data.topping){
            if(id == topping){
                price += JSON_Data.topping[topping]["price"];
            }
        }
    }else if(id >200){
        for(var crust in JSON_Data.crust){
            if(id == crust){
                price += JSON_Data.crust[crust]["price"];
            }
        }
    }else if(id > 100){
        for(var size in JSON_Data.size){
            if(id == size){
                price += JSON_Data.size[size]["price"];
            }
        }
    }
}