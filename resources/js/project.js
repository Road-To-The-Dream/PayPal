var total = document.querySelector('.total')
total.innerHTML = 'total price:'
var counter = 0;
let data = JSON.parse(products)
// var data = [
//     {
//         img: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5792/5792903ld.jpg',
//         title: 'lg tv',
//         description: 'wrwerwr rtgtvte tvevtvr rtrgetgfe rtrtegt rt r',
//         prise: '25000',
//         id: '0001'
//     },
//     {
//         img: 'https://www.lg.com/au/images/tvs/42ln5400/gallery/medium01.jpg',
//         title: 'lg tv',
//         description: 'wrwerwr rtgtvte tvevtvr rtrgetgfe rtrtegt rt r',
//         prise: '17000',
//         id: '0002'
//     },
//     {
//         img: 'https://www.lg.com/ca_en/images/desktop-monitors/md05883096/gallery/28LJ4540_d1_270917.jpg',
//         title: 'lg tv',
//         description: 'wrwerwr rtgtvte tvevtvr rtrgetgfe rtrtegt rt r',
//         prise: '20000',
//         id: '0003'
//     },
//     {
//         img: 'https://www.lg.com/ru/images/televisions/md05934072/gallery/49SK8500_logo_medium.jpg',
//         title: 'lg tv',
//         description: 'wrwerwr rtgtvte tvevtvr rtrgetgfe rtrtegt rt r',
//         prise: '55000',
//         id: '0004'
//     },
//     {
//         img: 'https://www.lg.com/ru/images/televisions/md05934072/gallery/49SK8500_logo_medium.jpg',
//         title: 'lg tv',
//         description: 'wrwerwr rtgtvte tvevtvr rtrgetgfe rtrtegt rt r',
//         prise: '55000',
//         id: '0005'
//     },
//     {
//         img: 'https://www.lg.com/ru/images/televisions/md05934072/gallery/49SK8500_logo_medium.jpg',
//         title: 'lg tv',
//         description: 'wrwerwr rtgtvte tvevtvr rtrgetgfe rtrtegt rt r',
//         prise: '55000',
//         id: '0006'
//     },
//     {
//         img: 'https://www.lg.com/ru/images/televisions/md05934072/gallery/49SK8500_logo_medium.jpg',
//         title: 'lg tv',
//         description: 'wrwerwr rtgtvte tvevtvr rtrgetgfe rtrtegt rt r',
//         prise: '55000',
//         id: '0007'
//     }
// ]

class CustomElementNew extends HTMLElement {
    constructor () {
        super()
        let wrapper = document.createElement ( 'div' )
        wrapper.className = 'wrapper'
        this.idNum = document.createElement('p')
        this.idNum.className = 'id-num'
        this.imgHolder = document.createElement('dvi')
        this.imgHolder.className = 'img-holder'
        this.imgItem = document.createElement('img')
        this.itemTitle = document.createElement('p')
        this.itemTitle.className = 'item-title'
        this.itemDescription = document.createElement('p')
        this.itemDescription.className = 'item-description'
        this.itemPrise =document.createElement('p')
        this.itemPrise.className = 'item-prise'
        this.buttonItem = document.createElement('button')
        this.buttonItem.className = 'button-item'
        this.buttonItem.innerHTML = 'add to cart'
        this.buttonItem.onclick = this.addToCart.bind(this)
        this.shadow = this.attachShadow ( { mode: 'open' } )
        let style = document.createElement ( 'style' )
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
        wrapper.appendChild(this.idNum)
        wrapper.appendChild(this.imgHolder)
        wrapper.appendChild(this.itemTitle)
        wrapper.appendChild(this.itemDescription)
        wrapper.appendChild(this.itemPrise)
        wrapper.appendChild(this.buttonItem)
        this.shadow.appendChild(style)
        this.shadow.appendChild(wrapper)
    }
    addToCart(){
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
            document.querySelector('.order').appendChild(this)
            x.remove()
            total.textContent = `total price: ${counter > 0 ?
                counter-=parseInt(this.itemPrise.textContent) :
                null}`
            document.querySelector('#total-price').value = `${+total.textContent.slice(12)}`
        }
        this.buttonItem.style.display = 'none'
        this.itemDescription.style.display = 'none'
        div.appendChild(this)
        div.appendChild(x)
        elem.appendChild(div)
        alert(`"${this.itemTitle.textContent}" has been added to cart`)
        console.log(this)
        total.textContent = `total price: ${counter+=parseInt(this.itemPrise.textContent)}`
        document.querySelector('#total-price').value = `${+total.textContent.slice(12)}`
    }

}
customElements.define ( 'new-element', CustomElementNew )


data.forEach(item => {
    let elem = document.createElement('new-element')
    elem.idNum.textContent = `product ID: ${item.id}`
    elem.imgItem.src = item.img
    elem.itemTitle.innerHTML = item.title
    elem.itemDescription.innerHTML = item.description
    elem.itemPrise.innerHTML = `${item.prise} USD`
    document.querySelector('.order').appendChild(elem)
})
let button = document.querySelector('.but-cart')
button.onclick =  e => document.querySelector('.cart').style = `display: block; z-index: 999;`
let x = document.querySelector('.x')
x.onclick =  e => document.querySelector('.cart').style = `display: none; z-index: -1;`
