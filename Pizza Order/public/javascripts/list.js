$(function ready() {
    $.getJSON("/api/pizza", (data) => {
        var size = data.size;
        var crust = data.crust;
        var topping = data.topping;
        $.getJSON("/api/orders", function (data) {
            data.forEach(function (item) {
                function getTopping() {
                    var toppings = "";
                    Object.keys(item['order[topping][]']).forEach((
                        data) => {
                        console.log(data);
                        toppings += topping[item['order[topping][]']
                            [data]].text + ","
                    });
                    return toppings.substring(0, toppings.length - 1);
                }
                $('#courses').
                append('<tr><th scope="row">' + item.orderID +
                    '</th><td>' + size[item['order[size]']].text +
                    '</td><td>' + crust[item['order[crust]']].text +
                    '</td><td>' + getTopping() +
                    '</td><td>' + item['order[quantity]'] +
                    '</td><td>' + item['order[firstname]'] +
                    '</td><td>' + item['order[lastname]'] +
                    '</td><td>' + item['order[address]'] +
                    '</td><td>' + item['order[phone]'] +
                    '</td><td>' + item['order[comment]'] +
                    '</td><td>' + item.price +
                    '</td></tr>');
            });
        });
    });

    function showResult(str) {
        $.getJSON("/api/pizza", (data) => {
            var size = data.size;
            var crust = data.crust;
            var topping = data.topping;
            var jsons = '{"search":"' + str + '"}';
            jsons = JSON.parse(JSON.stringify(jsons));
            $.ajax({
                url: '/api/orders',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: jsons,
                success: (json, status, request) => {
                    $('#courses').html('');
                    Object.keys(request.responseJSON).forEach((data) => {
                        var item = request.responseJSON[data];

                        function getTopping() {
                            var toppings = "";
                            Object.keys(item['order[topping][]']).forEach((
                                data) => {
                                console.log(data);
                                toppings += topping[item['order[topping][]']
                                    [data]].text + ","
                            });
                            return toppings.substring(0, toppings.length - 1);
                        }
                        $('#courses').
                        append('<tr><th scope="row">' + item.orderID +
                            '</th><td>' + size[item['order[size]']].text +
                            '</td><td>' + crust[item['order[crust]']].text +
                            '</td><td>' + getTopping() +
                            '</td><td>' + item['order[quantity]'] +
                            '</td><td>' + item['order[firstname]'] +
                            '</td><td>' + item['order[lastname]'] +
                            '</td><td>' + item['order[address]'] +
                            '</td><td>' + item['order[phone]'] +
                            '</td><td>' + item['order[comment]'] +
                            '</td><td>' + item.price +
                            '</td></tr>');
                    });
                },
                error: (request, status) => {
                    console.log("error");
                }
            })
        });
    }
});