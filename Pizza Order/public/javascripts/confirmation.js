var orderData = Cookies.getJSON('orderData');
var price = orderData.price;
var tax = orderData.tax;
$(function ready() {
    $.getJSON("/api/pizza", (data) => {
        var size = data.size;
        var crust = data.crust;
        var topping = data.topping;
        console.log(size);
        console.log(orderData);
        $('div#firstname').html(orderData.order.firstname);
        $('div#lastname').html(orderData.order.lastname);
        $('div#address').html(orderData.order.address);
        $('div#phone').html(orderData.order.phone);
        $('div#quantity').html(orderData.order.quantity);
        $('div#sizeText').html(size[orderData.order.size].text);
        $('div#sizePrice').html("$" + size[orderData.order.size].price);
        $('div#crustText').html(crust[orderData.order.crust].text);
        if (crust[orderData.order.crust].price > 0) {
            $('div#crustPrice').html("$" + crust[orderData.order.crust].price);
        }
        Object.keys(orderData.order.topping).forEach((data) => {
            var ID = orderData.order.topping[data]
            $('#toppingText').append(topping[ID].text + '</br>');
            $('#toppingPrice').append('$' + topping[ID].price + '</br>');
        });
        $('#subTotal').html('$' + (price - tax));
        $('#tax').html('$' + tax);
        $('#total').html('$' + price);
    });
});

function conformation() {
    var url = "/api/orders/save"
    $.post(url, orderData).done((data) => {
        if (data == "OK") {
            alert("Success! \n Your order will deliver within 30 minutes");
        } else {
            alert("Error please order again");
        }
        window.location.replace("/");
    })
}