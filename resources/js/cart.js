document.querySelector('.but-cart').onclick = e => {
    let identifier = document.querySelector('.miltiply-items-button')
    if (+identifier.textContent !== 0) {
        document.querySelector('.cart').style = `display: block; z-index: 9999;`
        document.documentElement.style = `overflow: hidden !important;`
    } else {
        allertFunc("The cart is empty", 'allert')
        setTimeout(function () {
            document.querySelector('.allert').remove()
        }, 2000)
    }
}
let x = document.querySelector('.x')
x.onclick = e => {
    document.querySelector('.cart').style = `display: none; z-index: -1;`
    document.documentElement.style.overflow = 'auto'
}

document.getElementById("btn-pay").onclick = (function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/check-amount-products`, false);
    xhr.send();
    if (xhr.status != 200) {
        allertFunc(`${JSON.parse(xhr.response).message}`, 'allert')
        setTimeout(function () {
            document.querySelector('.allert').remove()
        }, 3000)

            `${JSON.parse(xhr.response).message}`

    } else {
        $.ajax({
            url: 'create-order',
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                total_price: $('input[name="total_price"]').val(),
                pay_email: $('input[name="pay_email"]').val(),
                pay_phone: $('input[name="pay_phone"]').val(),
            },
            success: function (response) {
                // allertFunc('Order had been successfully sent', 'allert')
                //
                // setTimeout(function () {
                //     document.querySelector('.allert').remove()
                //     location.reload()
                // }, 2000)

                document.getElementById('pay-form').submit();
                //document.querySelector('#dynamic-pay').click();
            },
            error: function (response) {
                $('#errors-pay').empty();

                $.each(response['responseJSON']['errors'], function (key, value) {
                    $('#errors-pay').append(key + ": " + value + "</br>");
                });
            }
        })
    }
});