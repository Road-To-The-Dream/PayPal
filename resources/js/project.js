var total = document.querySelector('.total')
total.innerHTML = 'total price:'
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
        this.shadow = this.attachShadow({mode: 'open'})
        let style = document.createElement('style')
        style.textContent = `
            .wrapper{
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
        `
        this.imgHolder.appendChild(this.imgItem)
        this.minusPlus.appendChild(this.buttonPlus)
        this.minusPlus.appendChild(this.counterItem)
        this.minusPlus.appendChild(this.buttonMinus)
        wrapper.appendChild(this.xButton)
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

    plusItem() {
        let amount = this.counterItem;
        let totalPrice = this.itemPrise.textContent;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: 'decrease-product-amount',
            type: 'POST',
            data: {
                productId: this.idNum.id,
            },
            success: function (response) {
                if (response === true) {
                    amount.textContent = parseInt(amount.textContent) + 1;
                    total.textContent = `total price: ${parseInt(total.textContent.slice(12)) + parseInt(totalPrice)}`;
                }
            }
        })
    }

    minusItem() {
        if (this.counterItem.textContent > 1) {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: 'increase-product-amount',
                type: 'POST',
                data: {
                    productId: this.idNum.id
                },
                success: function (response) {

                }
            });
            this.counterItem.textContent = parseInt(this.counterItem.textContent) - 1
            total.textContent = `total price: ${parseInt(total.textContent.slice(12)) - parseInt(this.itemPrise.textContent)}`
        } else {
            console.log('looser')
        }
    }

    increaseProductAmount() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: 'increase-product-amount',
            type: 'POST',
            data: {
                productId: this.idNum.id,
                productAmount: this.counterItem.textContent
            },
            success: function (response) {
                console.log("Sergey");
            }
        })
    }

    decreaseProductAmount() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: 'decrease-product-amount',
            type: 'POST',
            data: {
                productId: this.idNum.id,
            },
            success: function (response) {
                console.log("Sergey");
            }
        })
    }

    addToCart() {
        this.multiplyItemsCart()
        let elem = document.querySelector('.cart-cart')
        let elemCart = document.createElement('new-element')
        elemCart.minusPlus.style.display = 'block'
        elemCart.buttonItem.style.display = 'none'
        elemCart.itemDescription.style.display = 'none'
        elemCart.xButton.style.display = 'block'
        elemCart.id = `${this.id}copy`
        elemCart.idNum.textContent = `product ID: ${this.idNum.textContent}`
        elemCart.idNum.id = `${this.id}`
        elemCart.imgItem.src = this.imgItem.src
        elemCart.itemTitle.textContent = this.itemTitle.textContent
        elemCart.itemDescription.style.display = 'none'
        elemCart.itemPrise.textContent = `${this.itemPrise.textContent} USD`
        elem.appendChild(elemCart)
        total.textContent = `total price: ${counter += parseInt(elemCart.itemPrise.textContent)}`
        document.querySelector('#total-price').value = `${+total.textContent.slice(12)}`
        this.decreaseProductAmount();
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
        total.textContent = `total price: ${counter > 0 ?
            counter -= parseInt(this.itemPrise.textContent) :
            null}`
        document.querySelector('#total-price').value = `${+total.textContent.slice(12)}`
        this.remove()
    }
}

customElements.define('new-element', CustomElementNew)

onloadGetData = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/all-products`, false);
    xhr.send();
    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        null
    }
    return JSON.parse(xhr.response).forEach(item => {
        let elem = document.createElement('new-element')

        elem.id = item.id
        elem.idNum.textContent = `product ID: ${item.id}`
        elem.idNum.id = `${item.id}`
        elem.imgItem.src = item.img
        elem.itemTitle.innerHTML = item.title
        elem.itemDescription.innerHTML = item.description
        elem.itemPrise.innerHTML = `${item.price} USD`
        document.querySelector('.order').appendChild(elem)
    })
}
onloadGetData()

onloadPage = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/`, false);
    xhr.send();
    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        null
    }
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
    })
}


let button = document.querySelector('.but-cart')
button.onclick =  e => {
    document.querySelector('.cart').style = `display: block; z-index: 999;`
    document.documentElement.style.overflow = 'hidden'
}
let x = document.querySelector('.x')
x.onclick =  e => {
    document.querySelector('.cart').style = `display: none; z-index: -1;`
    document.documentElement.style.overflow = 'auto'
}