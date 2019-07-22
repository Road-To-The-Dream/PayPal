var total = document.querySelector('.total')
total.innerHTML = `total price: ${0}`
var counter = 0;
let currentCounter = 1
const ITEMS = 8;

class CustomElementNew extends HTMLElement {
    constructor() {
        super()
        this.wrapper = document.createElement('div')
        this.wrapper.className = 'wrapper'
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
                border: solid 3px #6a9ba0;
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
                border: solid 2px #6a9ba0;
                background-color: #6a9ba0;
                color: white;
                cursor: pointer;
                margin: 0;
                padding: 0;
                height: 35px;
                width: 35px;
            }
            .plus-minus p{
                text-align: center;
                border: solid 2px #6a9ba0;
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
                border: solid 2px #6a9ba0;
                background-color: #6a9ba0;
                color: white;
                cursor: pointer;
                border-radius: 10px;
            }
            .button-item:hover{
                background-color: #ffffff;
                color: #6a9ba0;
                border: solid 2px #6a9ba0;
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
                border: solid 2px #6a9ba0;
                background-color: #6a9ba0;
                color: white;
                cursor: pointer;
                border-radius: 10px;
            }
            .x-button:hover{
                background-color: #ffffff;
                color: #6a9ba0;
                border: solid 2px #6a9ba0;
                }
              .i-button{
                position: absolute; 
                top: 10px;
                right: 10px;
                border: solid 2px #6a9ba0;
                background-color: #6a9ba0;
                color: white;
                cursor: pointer;
                border-radius: 10px;
            }
            .i-button:hover{
                background-color: #ffffff;
                color: #6a9ba0;
                border: solid 2px #6a9ba0;
                }
            @media (max-width: 767px){
                .wrapper{
                    justify-content: space-between;
                    width: 87vw;
                    display: flex;
                    align-items: center;
                    margin: 10px auto;
                    padding: 20px 5px;
                }
                .item-description{
                display: none;
                }
                .button-item{
                position: absolute;
                bottom: 5px;
                right: 5px;
                }
                .img-holder img{
                    max-height: 70px;
                }
                .plus-minus{
                top: 5%;
                right: -43px;
                }
             }
        `
        this.imgHolder.appendChild(this.imgItem)
        this.minusPlus.appendChild(this.buttonPlus)
        this.minusPlus.appendChild(this.counterItem)
        this.minusPlus.appendChild(this.buttonMinus)
        this.wrapper.appendChild(this.xButton)
        this.wrapper.appendChild(this.iButton)
        this.wrapper.appendChild(this.minusPlus)
        this.wrapper.appendChild(this.idNum)
        this.wrapper.appendChild(this.imgHolder)
        this.wrapper.appendChild(this.itemTitle)
        this.wrapper.appendChild(this.itemDescription)
        this.wrapper.appendChild(this.itemPrise)
        this.wrapper.appendChild(this.buttonItem)
        this.shadow.appendChild(style)
        this.shadow.appendChild(this.wrapper)
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
        if (data123.images.length) {
            data123.images.forEach(item => {
                let liElem = document.querySelector('#slides')
                    .appendChild(document.createElement('li'))
                liElem.className = 'slide showing'
                liElem.appendChild(
                    document.createElement('img')).src = item.path
            })
            let goToSlide = function (n) {
                slides[currentSlide].className = 'slide';
                currentSlide = (n + slides.length) % slides.length;
                slides[currentSlide].className = 'slide showing';
            }
            let nextSlide = function () {
                goToSlide(currentSlide + 1);
            }
            let previousSlide = function () {
                goToSlide(currentSlide - 1);
            }
            let slides = document.querySelectorAll('#slides .slide');
            let currentSlide = 0;
            let slideInterval = setInterval(nextSlide, 2000);
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
            let pauseSlideshow = function () {
                pauseButton.innerHTML = '▶';
                playing = false;
                clearInterval(slideInterval);
            }
            let playSlideshow = function () {
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
        } else null
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
        document.querySelector('#total-price').value = `${parseInt(total.textContent.slice(12))}`;
    }
    minusItem() {
        if (this.counterItem.textContent > 1) {
            this.increaseDecreaseProductAmount('increase-product-amount');
            this.counterItem.textContent = parseInt(this.counterItem.textContent) - 1
            total.textContent = `total price: ${parseInt(total.textContent.slice(12)) - parseInt(this.itemPrise.textContent)}`
            document.querySelector('#total-price').value = `${parseInt(total.textContent.slice(12))}`;
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
            }
        })
    }
    addToCart() {
        if (!Array.from(document.querySelector('.cart-cart').children)
            .find(item => item.idNum.textContent.slice(12) === this.idNum.textContent.slice(12))) {
            this.multiplyItemsCart()
            let elem = document.querySelector('.cart-cart')
            let elemCart = document.createElement('new-element')
            elemCart.wrapper.style = `
                    justify-content: space-between;
    width: 75%;
    display: flex;
    align-items: center;
    margin: 10px;`
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
            allertFunc("Matches with item in the cart",'allert')
            setTimeout(function () {
                document.querySelector('.allert').remove()
            }, 2000)
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
        if (!document.querySelector('.cart-cart').children.length) {
            document.querySelector('.cart').style = `display: none; z-index: -1;`
            document.documentElement.style.overflow = 'auto'
        }
    }
}
customElements.define('new-element', CustomElementNew)