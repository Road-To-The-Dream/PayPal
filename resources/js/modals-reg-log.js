let elemLogIn = document.querySelector('.ellipse_user')
let elemFormReg = document.querySelector('.registration_div')
let elemFormLog = document.querySelector('.log_in_div')
let elemCloseFormReg = document.querySelector('.close_form_registration')
let elemCloseFormLog = document.querySelector('.close_form_log_in')
let elemOrEnter = document.querySelector('.or_enter')
let elemOrRegister = document.querySelector('.or_register')
let elemTopLogReg = document.querySelector('.enter_registration')
let elemTopRegReg = document.querySelector('.reg_registration')
let elemTopLogLog = document.querySelector('.enter_log_in')
let elemTopRegLog = document.querySelector('.reg_log_in')
let switchItems = function (par1, par2) {
    par1.style = `opacity: 0; z-index: -1;`
    par2.style = `opacity: 1; z-index: 999999;`
}
let closeItem = function (par) {
    par.style = `opacity: 0; z-index: -1;`
}
if (elemLogIn) {
    elemLogIn.onclick = function (e) {
        elemFormReg.style = `opacity: 1; z-index: 999999;`
        document.documentElement.style.overflow = 'hidden'
        document.querySelector('.reg_registration_a').style.color = '#6a9ba0'
    }
} else null
elemCloseFormReg.onclick = function (e) {
    closeItem(elemFormReg)
    document.documentElement.style.overflow = 'auto'
}
elemCloseFormLog.onclick = function (e) {
    closeItem(elemFormLog)
    document.documentElement.style.overflow = 'auto'
}
elemOrEnter.onclick = function (e) {
    switchItems(elemFormReg, elemFormLog)
    document.querySelector('.enter_log_in_a').style.color = '#6a9ba0'
}
elemOrRegister.onclick = function (e) {
    switchItems(elemFormLog, elemFormReg)
}
elemTopLogLog.onclick = function (e) {
    switchItems(elemFormReg, elemFormLog)

}
elemTopRegLog.onclick = function (e) {
    switchItems(elemFormLog, elemFormReg)
}
elemTopLogReg.onclick = function (e) {
    switchItems(elemFormReg, elemFormLog)
    document.querySelector('.enter_log_in_a').style.color = '#6a9ba0'
}
elemTopRegReg.onclick = function (e) {
    switchItems(elemFormLog, elemFormReg)
}

document.getElementById("submit-register").onclick = (function () {
    $.ajax({
        url: 'register',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            name: $('#name').val(),
            email: $('#email-register').val(),
            phone: $('#phone-register').val(),
            password: $('#password-register').val(),
            password_confirmation: $('#password_confirmation').val(),
        },
        success: function () {
            location.reload();
        },
        error: function (response) {
            $('#errors-register').empty();

            $.each(response['responseJSON']['errors'], function (key, value) {
                $('#errors-register').append(key + ": " + value + "</br>");
            });
        }
    })
});

document.getElementById("submit-login").onclick = (function () {
    $.ajax({
        url: 'login',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            email: $('#email').val(),
            password: $('#password').val(),
        },
        success: function () {
            location.reload();
        },
        error: function (response) {
            $('#errors-login').empty();

            $.each(response['responseJSON']['errors'], function (key, value) {
                $('#errors-login').append(key + ": " + value + "</br>");
            });
        }
    })
});