var total = document.querySelector('.total')
total.innerHTML = `total price: ${0}`
var counter = 0;
let currentCounter = 1

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
        xhr.open('GET', `/product/1`, false);
        xhr.send();
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            null
        }
        let data123 = JSON.parse(xhr.response)
        console.log(data123.images)
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
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: url,
            type: 'POST',
            data: {
                productId: this.idNum.id,
            },
            success: function (response) {
                console.log(url + ", success");
            }
        })
    }

    deleteItemFromCart(url) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: url,
            type: 'POST',
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
        console.log(+total.textContent.slice(12), parseInt(this.itemPrise.textContent))
        total.textContent = `total price: ${+total.textContent.slice(12) > 0 ?
            this.counterItem.textContent > 1 ?
                +total.textContent.slice(12) - (parseInt(this.itemPrise.textContent) * this.counterItem.textContent) :
                +total.textContent.slice(12) - parseInt(this.itemPrise.textContent) :
            null}`
        this.deleteItemFromCart('delete-from-cart');
        this.remove()
    }
}

customElements.define('new-element', CustomElementNew)


onloadGetData = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/all-products`, false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        null
    }
    console.log(JSON.parse(xhr.response))
    if (JSON.parse(xhr.response) !== 200) {
        return JSON.parse(xhr.response).forEach(item => {
            let elem = document.createElement('new-element')
            elem.style.margin = '0 auto'
            elem.id = item.id
            elem.idNum.textContent = `product ID: ${item.id}`
            elem.idNum.id = `${item.id}`
            elem.imgItem.src = item.img
            elem.itemTitle.innerHTML = item.title
            elem.itemDescription.innerHTML = item.description
            elem.itemPrise.innerHTML = `${item.price} USD`
            document.querySelector('.order').appendChild(elem)
        })
    } else null
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
        console.log(result)
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
            multiplyItemsCartButton.textContent = document.querySelector('.cart-cart').children.length
        })
    } else null
}


let button = document.querySelector('.but-cart')
button.onclick = e => {
    document.querySelector('.cart').style = `display: block; z-index: 9999;`
    document.documentElement.style.overflow = 'hidden'
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
elemLogIn.onclick = function (e) {
    elemFormReg.style = `opacity: 1; z-index: 999999;`
    document.documentElement.style.overflow = 'hidden'
    document.querySelector('.reg_registration_a').style.color = '#aa2832'
}
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
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: 'login',
        type: 'POST',
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
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: 'register',
        type: 'POST',
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

