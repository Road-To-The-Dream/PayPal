var total = document.querySelector('.total')
total.innerHTML = 'total price:'
var counter = 0;
let data = JSON.parse(products)
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
        this.counterItem.textContent = currentCounter
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
        `
        this.imgHolder.appendChild(this.imgItem)
        this.minusPlus.appendChild(this.buttonPlus)
        this.minusPlus.appendChild(this.counterItem)
        this.minusPlus.appendChild(this.buttonMinus)
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

    addNotification(){

    }

    addToCart() {
        let elem = document.querySelector('.cart-cart')
        let div = document.createElement('div')
        div.style.display = 'flex'
        let x = document.createElement('button')
        x.textContent = 'x'
        x.style = `
        position: absolute; 
        border: solid 2px #aa2832;
        background-color: #aa2832;
        color: white;
        cursor: pointer;
        border-radius: 10px;`
        x.onclick = e => {
            this.buttonItem.style.display = 'block'
            this.itemDescription.style.display = 'block'
            this.minusPlus.style.display = 'none'
            document.querySelector('.order').appendChild(this)
            x.remove()
            total.textContent = `total price: ${counter > 0 ?
                counter -= parseInt(this.itemPrise.textContent) :
                null}`
            document.querySelector('#total-price').value = `${+total.textContent.slice(12)}`
            this.increaseProductAmount();
        }
        this.minusPlus.style.display = 'block'
        this.buttonItem.style.display = 'none'
        this.itemDescription.style.display = 'none'
        div.appendChild(this)
        div.appendChild(x)
        elem.appendChild(div)
        console.log(this)
        total.textContent = `total price: ${counter += parseInt(this.itemPrise.textContent)}`
        document.querySelector('#total-price').value = `${+total.textContent.slice(12)}`

        this.decreaseProductAmount();
    }
}

customElements.define('new-element', CustomElementNew)

data.forEach(item => {
    let elem = document.createElement('new-element')
    elem.idNum.textContent = `product ID: ${item.id}`
    elem.idNum.id = `${item.id}`
    elem.imgItem.src = item.img
    elem.itemTitle.innerHTML = item.title
    elem.itemDescription.innerHTML = item.description
    elem.itemPrise.innerHTML = `${item.price} USD`
    document.querySelector('.order').appendChild(elem)
})
let button = document.querySelector('.but-cart')
button.onclick = e => document.querySelector('.cart').style = `display: block; z-index: 999;`
let x = document.querySelector('.x')
x.onclick = e => document.querySelector('.cart').style = `display: none; z-index: -1;`
