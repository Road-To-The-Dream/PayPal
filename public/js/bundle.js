var total = document.querySelector('.total')
total.innerHTML = `total price: ${0}`
var counter = 0;
let currentCounter = 1
const ITEMS = 8;

class CustomElementNew extends HTMLElement {
    constructor() {
        super()
        let wrapper = document.createElement('div')
        wrapper.className = 'wrapper'
        this.minusPlus = document.createElement('div')
        this.minusPlus.className = 'plus-minus'
        this.buttonMinus = document.createElement('button')
        this.buttonMinus.className = 'minus'
        this.buttonMinus.textContent = '-'
        this.buttonMinus.onclick = this.minusItem.bind(this)
        this.counterItem = document.createElement('p')
        this.counterItem.innerHTML = currentCounter
        this.buttonPlus = document.createElement('button')
        this.buttonPlus.className = 'plus'
        this.buttonPlus.textContent = '+'
        this.buttonPlus.onclick = this.plusItem.bind(this)
        this.idNum = document.createElement('p')
        this.idNum.className = 'id-num'
        this.imgHolder = document.createElement('dvi')
        this.imgHolder.className = 'img-holder'
        this.imgItem = document.createElement('img')
        this.itemTitle = document.createElement('p')
        this.itemTitle.className = 'item-title'
        this.itemDescription = document.createElement('p')
        this.itemDescription.className = 'item-description'
        this.itemPrise = document.createElement('p')
        this.itemPrise.className = 'item-prise'
        this.buttonItem = document.createElement('button')
        this.buttonItem.className = 'button-item'
        this.buttonItem.innerHTML = 'add to cart'
        this.buttonItem.onclick = this.addToCart.bind(this)
        this.xButton = document.createElement('button')
        this.xButton.className = 'x-button'
        this.xButton.textContent = 'x'
        this.xButton.onclick = this.removeItemFromCart.bind(this)

        this.iButton = document.createElement('button')
        this.iButton.className = 'i-button'
        this.iButton.textContent = 'i'
        this.iButton.onclick = this.showInfo.bind(this)

        this.shadow = this.attachShadow({mode: 'open'})
        let style = document.createElement('style')
        style.textContent = `
            .wrapper{
                cursor: pointer;
                width: 200px;
                height: auto;
                border: solid 3px #aa2832;
                border-radius: 20px;
                position: relative;
                padding: 20px;
                margin: 20px;
            }
            .plus-minus{
                position: absolute;
                top: 10%;
                right: -50px;
                display: none;
            }
            .plus-minus button{
                text-align: center;
                border: solid 2px #aa2832;
                background-color: #aa2832;
                color: white;
                cursor: pointer;
                margin: 0;
                padding: 0;
                height: 35px;
                width: 35px;
            }
            .plus-minus p{
                text-align: center;
                border: solid 2px #aa2832;
                margin: 0;
                padding: 0;
                height: 25px;
                width: 31px;
            }
            .minus{
                border-radius: 0px 0px 15px 15px;
            }
            .plus{
                border-radius: 15px 15px 0px 0px;
            }
            .button-item{
                border: solid 2px #aa2832;
                background-color: #aa2832;
                color: white;
                cursor: pointer;
                border-radius: 10px;
            }
            .button-item:hover{
                background-color: #ffffff;
                color: #aa2832;
                border: solid 2px #aa2832;
            }
            .img-holder{
                max-width: fit-content;
            }
            .img-holder img{
                width: auto;
                max-height: 120px;
            }
            .x-button{
                display: none;
                position: absolute; 
                left: -10px;
                top: -10px;
                border: solid 2px #aa2832;
                background-color: #aa2832;
                color: white;
                cursor: pointer;
                border-radius: 10px;
            }
              .i-button{
                position: absolute; 
                top: 10px;
                right: 10px;
                border: solid 2px #aa2832;
                background-color: #aa2832;
                color: white;
                cursor: pointer;
                border-radius: 10px;
            }
            .i-button:hover{
                background-color: #ffffff;
                color: #aa2832;
                border: solid 2px #aa2832;
                }
        `
        this.imgHolder.appendChild(this.imgItem)
        this.minusPlus.appendChild(this.buttonPlus)
        this.minusPlus.appendChild(this.counterItem)
        this.minusPlus.appendChild(this.buttonMinus)
        wrapper.appendChild(this.xButton)
        wrapper.appendChild(this.iButton)
        wrapper.appendChild(this.minusPlus)
        wrapper.appendChild(this.idNum)
        wrapper.appendChild(this.imgHolder)
        wrapper.appendChild(this.itemTitle)
        wrapper.appendChild(this.itemDescription)
        wrapper.appendChild(this.itemPrise)
        wrapper.appendChild(this.buttonItem)
        this.shadow.appendChild(style)
        this.shadow.appendChild(wrapper)
    }

    showInfo() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/product/${this.id}`, false);
        xhr.send();
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            null
        }

        let data123 = JSON.parse(xhr.response)
        // console.log(data123)
        data123.images.forEach(item => {
            let liElem = document.querySelector('#slides')
                .appendChild(document.createElement('li'))
            liElem.className = 'slide showing'
            liElem.appendChild(
                document.createElement('img')).src = item.path
        })

        let slides = document.querySelectorAll('#slides .slide');
        let currentSlide = 0;
        let slideInterval = setInterval(nextSlide, 2000);

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function previousSlide() {
            goToSlide(currentSlide - 1);
        }

        function goToSlide(n) {
            slides[currentSlide].className = 'slide';
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].className = 'slide showing';
        }

        let next = document.getElementById('next');
        let previous = document.getElementById('previous');
        next.onclick = function () {
            pauseSlideshow();
            nextSlide();
        }
        previous.onclick = function () {
            pauseSlideshow();
            previousSlide();
        }
        next.onclick = function () {
            pauseSlideshow();
            nextSlide();
        }
        previous.onclick = function () {
            pauseSlideshow();
            previousSlide();
        }
        let playing = true;
        let pauseButton = document.getElementById('pause');

        function pauseSlideshow() {
            pauseButton.innerHTML = '▶';
            playing = false;
            clearInterval(slideInterval);
        }

        function playSlideshow() {
            pauseButton.innerHTML = '||';
            playing = true;
            slideInterval = setInterval(nextSlide, 2000);
        }

        pauseButton.onclick = function () {
            if (playing) {
                pauseSlideshow();
            } else {
                playSlideshow();
            }
        }
        let controls = document.querySelectorAll('.controls');
        for (let i = 0; i < controls.length; i++) {
            controls[i].style.display = 'inline-block';
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.position = 'absolute';
        }


        document.querySelector('.product-info-id')
            .textContent = this.idNum.textContent
        document.querySelector('.product-info-title')
            .textContent = this.itemTitle.textContent
        document.querySelector('.product-info-description')
            .textContent = this.itemDescription.textContent
        document.querySelector('.product-info-price')
            .textContent = this.itemPrise.textContent
        let characteristics = document.querySelector('.product-info-characteristics')
        data123.characteristics.forEach(item => {
            let parag = document.createElement('p')
            parag.style = `display: flex; justify-content: space-between;`
            let name = document.createElement('span')
            name.style = `font-weight: 600;`
            let pivot = document.createElement('span')
            pivot.style = `font-weight: 400;`
            name.textContent = `${item.name} - `
            pivot.textContent = `${item.pivot.value}`
            parag.appendChild(name)
            parag.appendChild(pivot)
            characteristics.appendChild(parag)
        })
        let infoBox = document.querySelector('.product-info')
        infoBox.style = `display: block; z-index: 9999999999;`
    }


    plusItem() {
        this.increaseDecreaseProductAmount('decrease-product-amount');
        this.counterItem.textContent = parseInt(this.counterItem.textContent) + 1;
        total.textContent = `total price: ${parseInt(total.textContent.slice(12)) + parseInt(this.itemPrise.textContent)}`;
    }

    minusItem() {
        if (this.counterItem.textContent > 1) {
            this.increaseDecreaseProductAmount('increase-product-amount');
            this.counterItem.textContent = parseInt(this.counterItem.textContent) - 1
            total.textContent = `total price: ${parseInt(total.textContent.slice(12)) - parseInt(this.itemPrise.textContent)}`
        }
    }

    increaseDecreaseProductAmount(url) {
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                productId: this.idNum.id,
            },
            success: function (response) {
                console.log(url + ", success");
            }
        })
    }

    deleteItemFromCart(url) {
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                productId: this.idNum.id,
            },
            success: function (response) {
                console.log(url + ", success");
            }
        })
    }

    addToCart() {

        if (!Array.from(document.querySelector('.cart-cart').children)
            .find(item => item.idNum.textContent.slice(12) === this.idNum.textContent.slice(12))) {
            this.multiplyItemsCart()
            let elem = document.querySelector('.cart-cart')
            let elemCart = document.createElement('new-element')
            elemCart.minusPlus.style.display = 'block'
            elemCart.buttonItem.style.display = 'none'
            elemCart.itemDescription.style.display = 'none'
            elemCart.xButton.style.display = 'block'
            elemCart.id = `${this.id}copy`
            elemCart.idNum.textContent = `${this.idNum.textContent}`
            elemCart.idNum.id = `${this.id}`
            elemCart.imgItem.src = this.imgItem.src
            elemCart.itemTitle.textContent = this.itemTitle.textContent
            elemCart.itemDescription.style.display = 'none'
            elemCart.itemPrise.textContent = `${this.itemPrise.textContent}`
            elem.appendChild(elemCart)
            total.textContent = `total price: ${+total.textContent.slice(12) + parseInt(elemCart.itemPrise.textContent)}`
            document.querySelector('#total-price').value = `${+total.textContent.slice(12)}`
            this.increaseDecreaseProductAmount('add-to-cart')
        } else {
            alert('matches wit item in cart')
        }
    }

    multiplyItemsCart() {
        let multiplyItemsCartCounter = 0
        let multiplyItemsCartButton = document.querySelector('.miltiply-items-button')
        multiplyItemsCartButton.style.display = 'block'
        multiplyItemsCartButton.textContent = (multiplyItemsCartCounter += 1) && (+multiplyItemsCartButton.textContent + 1)
    }

    removeItemFromCart() {
        let multiplyItemsCartButton = document.querySelector('.miltiply-items-button')
        multiplyItemsCartButton.textContent = +multiplyItemsCartButton.textContent - 1
        total.textContent = `total price: ${+total.textContent.slice(12) > 0 ?
            this.counterItem.textContent > 1 ?
                +total.textContent.slice(12) - (parseInt(this.itemPrise.textContent) * this.counterItem.textContent) :
                +total.textContent.slice(12) - parseInt(this.itemPrise.textContent) :
            null}`
        this.deleteItemFromCart('delete-from-cart');
        document.querySelector('#total-price').value = `${+total.textContent.slice(12)}`
        this.remove()
    }
}

customElements.define('new-element', CustomElementNew)


onloadGetData = function (page) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/product/page/${page}`, false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        null
    }
    let products = JSON.parse(xhr.response)
    $(".products").empty()
    if (JSON.parse(xhr.response) !== 200) {
        products.products.forEach(item => {
            let elem = document.createElement('new-element')
            elem.style.margin = '0 auto'
            elem.id = item.id
            elem.idNum.textContent = `product ID: ${item.id}`
            elem.idNum.id = `${item.id}`
            elem.imgItem.src = item.img
            elem.itemTitle.innerHTML = item.title
            elem.itemDescription.innerHTML = item.description
            elem.itemPrise.innerHTML = `${item.price} USD`
            document.querySelector('.products').appendChild(elem)
        })
    } else null

    let pagesBox = document.querySelector('.pages')
    let offset = 0;
    $(".pages").empty()

    for (let i = 0; i < products.amount; i++) {
        let paginNumber = document.createElement('span')
        paginNumber.textContent = `${i + 1}`
        paginNumber.className = 'btn'
        paginNumber.style.padding = '20px'
        paginNumber.style.cursor = 'pointer'
        paginNumber.style.border = "solid 3px white"
        paginNumber.setAttribute('onclick', `onloadGetData(${offset})`)
        offset += ITEMS
        pagesBox.appendChild(paginNumber)
    }
    let btns = pagesBox.getElementsByClassName("btn")
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) {
            let currentNum = e.toElement.innerHTML - 1
            let current = document.getElementsByClassName("btn");
            current[currentNum].className = current[currentNum].className.replace("btn", "btn active");
            this.className += " active";
        });
    }

}
onloadGetData()


onloadPage = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/get-products-cart`, false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        null
    }
    if (JSON.parse(xhr.response) !== 200) {
        let result = JSON.parse(xhr.response).reduce((a, b) => a + b.price, 0)
        return JSON.parse(xhr.response).forEach(item => {
            let elem = document.createElement('new-element')
            elem.minusPlus.style.display = 'block'
            elem.buttonItem.style.display = 'none'
            elem.itemDescription.style.display = 'none'
            elem.xButton.style.display = 'block'
            elem.id = `${item.id}copy`
            elem.idNum.textContent = `product ID: ${item.id}`
            elem.idNum.id = `${item.id}`
            elem.imgItem.src = item.img
            elem.itemTitle.textContent = item.title
            elem.itemDescription.style.display = 'none'
            elem.itemPrise.textContent = `${item.price} USD`
            document.querySelector('.cart-cart').appendChild(elem)
            total.textContent = `total price: ${result}`
            let multiplyItemsCartButton = document.querySelector('.miltiply-items-button')
            document.querySelector('#total-price').value = `${result}`
            multiplyItemsCartButton.textContent = document.querySelector('.cart-cart').children.length
        })
    } else null

}


let button = document.querySelector('.but-cart')

    button.onclick = e => {
        document.querySelector('.cart').style = `display: block; z-index: 9999;`
        document.documentElement.style = `overflow: hidden !important;`
    }


let x = document.querySelector('.x')
x.onclick = e => {
    document.querySelector('.cart').style = `display: none; z-index: -1;`
    document.documentElement.style.overflow = 'auto'
}

document.querySelector('.close-info').onclick = () => {
    let elemq = document.querySelector('#slides')
    while (elemq.firstChild) {
        elemq.removeChild(elemq.firstChild);
    }
    document.querySelector('.product-info')
        .style = `display: none; z-index: -1;`
}


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
if(elemLogIn){
elemLogIn.onclick = function (e) {
    elemFormReg.style = `opacity: 1; z-index: 999999;`
    document.documentElement.style.overflow = 'hidden'
    document.querySelector('.reg_registration_a').style.color = '#aa2832'
}}else null
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
    document.querySelector('.enter_log_in_a').style.color = '#aa2832'
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
    document.querySelector('.enter_log_in_a').style.color = '#aa2832'
}
elemTopRegReg.onclick = function (e) {
    switchItems(elemFormLog, elemFormReg)
}


function diplay_hide(blockId) {
    if ($(blockId).css('display') == 'none') {
        $(blockId).animate({height: 'show'}, 500);
        $('html').css('overflow', 'hidden');
        $(document.querySelector('.menu_rect1')).css('transform', 'rotate(315deg)')
        $(document.querySelector('.menu_rect1')).css('margin-right', '5px')
        $(document.querySelector('.menu_rect1')).css('margin-top', '12px')
        $(document.querySelector('.menu_rect3')).css('transform', 'rotate(-315deg)')
        $(document.querySelector('.menu_rect3')).css('margin-right', '5px')
        $(document.querySelector('.menu_rect1')).css('margin-bottom', '-12px')
        $(document.querySelector('.menu_rect2')).css('opacity', '0')
    } else {
        $(blockId).animate({height: 'hide'}, 500);
        $('html').css('overflow', 'auto')
        $('html').css('overflow-x', 'hidden')
        $(document.querySelector('.menu_rect1')).css('transform', 'rotate(0deg)')
        $(document.querySelector('.menu_rect3')).css('transform', 'rotate(0deg)')
        $(document.querySelector('.menu_rect2')).css('opacity', '1')
        $(document.querySelector('.menu_rect1')).css('margin', '0')
        $(document.querySelector('.menu_rect3')).css('margin', '0')
    }
}


$('.language-select').click(function () {
    $(this).toggleClass('open');
})

$('.language-select li').click(function () {
    var setLang = $('.language-select').data('location'),
        dataLangSelect = $(this).data('lang')
    $('.language-select').data('location', dataLangSelect);
    $('.language-select li').removeClass('active');
    $(this).toggleClass('active');
})

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

let dropdown = document.querySelector('.logout')
    .appendChild(document.createElement('div'))
dropdown.className = 'dropdown-xxx'
dropdown.style = `
                  display: none;   
    `
let dropdownHistory = dropdown.appendChild(document.createElement('a'))
dropdownHistory.textContent = 'Order history'
dropdownHistory.style.cursor = 'pointer'
dropdownHistory.style.margin = '10px'
let dropdownA = dropdown.appendChild(document.createElement('a'))
dropdownA.textContent = 'Change password'
dropdownA.style.cursor = 'pointer'
dropdownA.style.margin = '10px'

let passwordChangeBlock = document.createElement('div')
passwordChangeBlock.className = 'change-password'
passwordChangeBlock.style = `
                    display: none;
                    width: 230px;
                    height: auto;
                    border: none;
                    box-shadow: 0 0 120px rgba(0, 0, 0, .1) inset; 
                    border-radius: 20px;
                    right: 0;
                    top: 40px;
                    padding: 15px 5px;
                    #ffdede
                    z-index: 9;
                    
        `
let errorsBlockChangePassword = document.createElement('div')
errorsBlockChangePassword.id = 'errors-block-change-password'
errorsBlockChangePassword.style.color = '#aa2832'
let email = document.createElement('input')
email.className = 'pas-change-input'
email.placeholder = 'E-mail'
email.type = 'text'
email.name = 'email'
let oldPass = document.createElement('input')
oldPass.type = 'password'
oldPass.className = 'pas-change-input'
oldPass.placeholder = 'Old pasword'
oldPass.name = 'old_password'
let newPass = document.createElement('input')
newPass.type = 'password'
newPass.className = 'pas-change-input'
newPass.placeholder = 'New password'
newPass.name = 'new_password'
let comfim = document.createElement('input')
comfim.type = 'password'
comfim.className = 'pas-change-input'
comfim.placeholder = 'Confirm new password'
comfim.name = 'password_confirmation'
let btn = document.createElement('button')
btn.textContent = 'Submit'
btn.id = 'submit-change-password';
btn.style = `    
        border: solid 2px #aa2832;
        background-color: #aa2832;
        color: white;
        cursor: pointer;
        border-radius: 10px;
        margin: 10px auto 0;
        width: 50%;`
btn.onmouseover = function (e) {
    btn.style = `
    border: solid 2px #aa2832;
    cursor: pointer;
    border-radius: 10px;
    margin: 10px auto 0;
    width: 50%;\`
    background-color: #ffffff;
    color: #aa2832;
    border: solid 2px #aa2832;`
}
passwordChangeBlock.appendChild(errorsBlockChangePassword)
passwordChangeBlock.appendChild(email)
passwordChangeBlock.appendChild(oldPass)
passwordChangeBlock.appendChild(newPass)
passwordChangeBlock.appendChild(comfim)
passwordChangeBlock.appendChild(btn)
dropdown.appendChild(passwordChangeBlock)

dropdownA.onclick = function (e) {
    passwordChangeBlock.style.display = "none" ?
        passwordChangeBlock.style.display = 'grid' :
        passwordChangeBlock.style.display = "none"
}

let dropdownItem = document.querySelector('.dropdown-item')
if(dropdownItem){
    dropdownItem.style = `
    margin: 10px; 
    display: block; 
    text-align: end;`
    let img = document.createElement('img')
    img.src = 'data:image/png;base64,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'
    img.style.width = '20px'
    dropdownItem.appendChild(img)
    dropdown.appendChild(dropdownItem)
}else  null
if (document.querySelector('.nav-link')) {
    document.querySelector('.nav-link').onclick = function (e) {
        dropdown.style = `
                    width: 250px;
                    height: auto;
                    border: solid 3px #aa2832;
                    border-radius: 20px;
                    position: absolute;
                    right: 0;
                    top: 40px;
                    padding: 15px 5px;
                    background-color: white;
                    z-index: 9;
                    display: grid; `
    }
}else null
document.querySelector('.order').onclick = function (e) {
    if (document.querySelector('.dropdown-xxx') || document.querySelector('.change-password')) {
        document.querySelector('.change-password').style = `
        display: none; 
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 120px inset;
        border-radius: 20px;
        padding: 15px 5px;
        `
        document.querySelector('.dropdown-xxx').style = `display: none; z-index: -1`

    } else null
}

document.getElementById("submit-change-password").onclick = (function () {
    $.ajax({
        url: 'change-password',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            email: $('input[name="email"]').val(),
            old_password: $('input[name="old_password"]').val(),
            new_password: $('input[name="new_password"]').val(),
            password_confirmation: $('input[name="password_confirmation"]').val(),
        },
        success: function () {
            location.reload();
        },
        error: function (response) {
            $('#errors-block-change-password').empty();

            $.each(response['responseJSON']['errors'], function (key, value) {
                $('#errors-block-change-password').append(key + ": " + value + "</br></br>");
            });
        }
    })
});

