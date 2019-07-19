onloadGetData = function (page = 0, categoryId = 2) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/product/page/${page}/${categoryId}`, false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        null
    }
    let products = JSON.parse(xhr.response)
    if (products.products.length !== 0) {
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
            if (paginNumber.className !== 'btn active') {
                paginNumber.setAttribute('onclick', `onloadGetData(${offset}, ${categoryId})`)
            } else null
            offset += ITEMS
            pagesBox.appendChild(paginNumber)
        }
        let btns = pagesBox.getElementsByClassName("btn")
        btns[0].className = "btn active"
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function (e) {
                btns[0].className = "btn"
                let currentNum = e.toElement.innerHTML - 1
                let current = document.getElementsByClassName("btn");
                current[currentNum].className = current[currentNum].className.replace("btn", "btn active");
                this.className += " active";
            });
        }
    } else {
        allertFunc("No products in that category yet",'allert')
        setTimeout(function () {
            document.querySelector('.allert').remove()
        }, 2000)
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
    let info = JSON.parse(xhr.response);
    let totalPrice = 0;
    let iteration = 0;
    if (info !== 200) {
        info.productsInfo.forEach(item => {
            let elem = document.createElement('new-element')
            elem.wrapper.style = `
                    justify-content: space-between;
    width: 75%;
    display: flex;
    align-items: center;
    margin: 10px;`
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
            elem.counterItem.textContent = info.productsAmount[iteration].amount
            document.querySelector('.cart-cart').appendChild(elem)
            let multiplyItemsCartButton = document.querySelector('.miltiply-items-button')
            totalPrice += info.productsAmount[iteration].amount * item.price
            multiplyItemsCartButton.textContent = document.querySelector('.cart-cart').children.length
            iteration++;
        })
        total.textContent = `total price: ${totalPrice}`
        document.querySelector('#total-price').value = `${totalPrice}`
        return;
    }
}
