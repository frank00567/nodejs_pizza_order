$(function ready() {
    $.getJSON("/api/pizza", (data) => {
        var size = data.size;
        var crust = data.crust;
        var topping = data.topping;

        Object.keys(size).forEach((data) => {
            $("#size").append('<input type="radio" name="size" value="' + data + '" required>' + size[data].text + ' $' + size[data].price + '<br>');
        });

        Object.keys(crust).forEach((data) => {
            var price = (crust[data].price != 0) ? ' $' + crust[data].price : '';
            $("#crust").append('<input type="radio" name="crust" value="' + data + '" required>' + crust[data].text + price + '<br>');
        });

        Object.keys(topping).forEach((data) => {
            $("#topping").append('<option value="' + data + '">' + topping[data].text + ' +$1.00</option>')
        });
    });
});

function ready() {
    event.preventDefault();
    var order = {};
    if ($('p.topping').length < 1) {
        alert('at least one Topping');
    } else {
        var rawdata = JSON.parse(JSON.stringify($('form').serializeArray()));
        order["topping"] = [];
        Object.keys(rawdata).forEach((data) => {
            var name = rawdata[data].name;
            if (name == "topping") {
                order["topping"].push(rawdata[data].value);
            } else {
                order[name] = rawdata[data].value;
            }
        });

        order = JSON.stringify(order);
        $.ajax({
            url: '/confirmation',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: order,
            success: (json, status, request) => {
                console.log(request.responseJSON);
                Cookies.set("orderData", request.responseJSON);
                window.location.replace("/confirmation");
            },
            error: (request, status) => {
                console.log("error");
            }
        })
    }
}

function append() {
    var topping = $('#topping');
    if (topping.val() != "Select topping") {
        var htmlText = "<p class='topping'>" + $('#topping option[value=' + topping.val() + ']').text() + "</p>";
        var inputText = '<input type="hidden" name="topping" value="' + topping.val() + '">'
        $('#topping_added').append(htmlText);
        $('#topping_data').append(inputText);
    }
    $('#topping').val('default');
}

function validateForm(form) {
    if ($('p.topping').length < 1) {
        alert('at least one Topping');
        return false;
    }
    return true;
}