document.querySelector('.but-cart').onclick = e => {
    let identifier = document.querySelector('.miltiply-items-button')
    if (+identifier.textContent !== 0) {
        document.querySelector('.cart-wrapper').style = `display: block; z-index: 9999;`
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
    document.querySelector('.cart-wrapper').style = `display: none; z-index: -1;`
    document.documentElement.style.overflow = 'auto'
}

document.getElementById("btn-pay").onclick = (function () {
    $.ajax({
        url: 'check-amount-products',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            pay_email: $('#pay_email').val(),
            pay_phone: $('#pay_phone').val(),
            total_price: $('#total-price').val(),
        },
        success: function () {
            document.getElementById('pay-form').submit();
            console.log("success");
        },
        error: function (response) {
            $('#errors-pay').empty();

            $.each(response['responseJSON']['errors'], function (key, value) {
                $('#errors-pay').append(key + ": " + value + "</br>");
            });
        }
    })

});