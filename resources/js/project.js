class CustomElementNew extends HTMLElement {
    constructor () {
        super()
        let wrapper = document.createElement ( 'form' )
        wrapper.className = 'wrapper'
        wrapper.action = this.getAttribute('action')
        wrapper.method = this.getAttribute('method')
        wrapper.value = this.getAttribute('value')
        this.idNum = document.createElement('p')
        this.idNum.className = 'id-num'
        this.idNum.textContent = `ID:${this.getAttribute('item-id')}`
        this.imgHolder = document.createElement('dvi')
        this.imgHolder.className = 'img-holder'
        this.imgItem = document.createElement('img')
        this.imgItem.src = this.getAttribute('src')
        this.itemTitle = document.createElement('p')
        this.itemTitle.className = 'item-title'
        this.itemTitle.innerHTML = this.getAttribute('title')
        this.itemDescription = document.createElement('p')
        this.itemDescription.className = 'item-description'
        this.itemDescription.innerHTML = this.getAttribute('desc')
        this.itemPrise = document.createElement('input')
        this.itemPrise.className = 'item-prise'
        this.itemPrise.type = 'hidden'
        this.itemPriseLabel = document.createElement('label')
        this.itemPriseLabel.textContent = this.getAttribute('price')
        this.itemPriseLabel.htmlFor = 'item-price'
        this.itemPrise.setAttribute('name', 'price')
        this.itemPrise.setAttribute('value', '20')
        this.buttonItem = document.createElement('button')
        this.buttonItem.className = 'button-item'
        this.buttonItem.innerHTML = 'add to cart'
        this.shadow = this.attachShadow ( { mode: 'open' } )
        let style = document.createElement ( 'style' )
        style.textContent = `
            .wrapper{
                width: 200px;
                height: auto;
                border: solid 1px black;
                position: relative;
                padding: 20px;
                margin: 20px;
            } 
            .img-holder{
                width: 80%
                position: relative;
            }
            .img-holder img{
                width: 80%;
            }
        `
        this.imgHolder.appendChild(this.imgItem)
        wrapper.appendChild(this.idNum)
        wrapper.appendChild(this.imgHolder)
        wrapper.appendChild(this.itemTitle)
        wrapper.appendChild(this.itemDescription)
        wrapper.appendChild(this.itemPrise)
        wrapper.appendChild(this.itemPriseLabel)
        wrapper.appendChild(this.buttonItem)
        this.shadow.appendChild(style)
        this.shadow.appendChild(wrapper)
    };
}
customElements.define ( 'new-element', CustomElementNew )