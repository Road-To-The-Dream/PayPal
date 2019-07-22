let dropdown = document.querySelector('.logout')
    .appendChild(document.createElement('div'))
dropdown.className = 'dropdown-xxx'
dropdown.style = `display: none;`
let dropdownHistory = dropdown.appendChild(document.createElement('a'))
dropdownHistory.textContent = 'Order history'
dropdownHistory.style.cursor = 'pointer'
dropdownHistory.style.margin = '10px'
dropdownHistory.onclick = (e)=> {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/order-history`, false);
    xhr.send();
    let orderHistoryContent = document.querySelector('.order-history-content')
    orderHistoryContent.style = `width: 90%;
                                padding: 30px 0;
                                border-top: solid 2px #6a9ba0;
                                margin: 0 auto;
                                max-height: 50vh;
                                overflow-y: auto;
                                `
    let currentId = 0
    if (JSON.parse(xhr.response).orders.length) {

        JSON.parse(xhr.response).orders.forEach(item => {
            if (currentId === item.order_id) {
                let currentDiv = document.querySelector(`#order-${currentId}`)
                let parag = document.createElement('p')
                parag.style = `display: flex; justify-content: space-around; align-items: center;`
                let spanID = document.createElement('span')
                spanID.textContent = item.order_id
                let spanImg = document.createElement('span')
                let imgProduct = document.createElement('img')
                imgProduct.style.width = '100px'
                imgProduct.src = item.img
                let spanTitle = document.createElement('span')
                spanTitle.textContent = item.title
                let spanPrice = document.createElement('span')
                spanPrice.textContent = `${item.product_price} USD  x ${item.product_amount}`
                let spanTotalPrice = document.createElement('span')
                spanTotalPrice.textContent = `${item.product_price * item.product_amount} USD`
                parag.appendChild(spanID)
                spanImg.appendChild(imgProduct)
                parag.appendChild(spanImg)
                parag.appendChild(spanTitle)
                parag.appendChild(spanPrice)
                parag.appendChild(spanTotalPrice)
                currentDiv.appendChild(parag)
            } else {
                let elenm = document.createElement('div')
                elenm.className = 'orders'
                elenm.id = `order-${item.order_id}`
                let parag = document.createElement('p')
                parag.style = `display: flex; justify-content: space-around; align-items: center;`
                let spanID = document.createElement('span')
                spanID.textContent = item.order_id
                let spanImg = document.createElement('span')
                let imgProduct = document.createElement('img')
                imgProduct.style.width = '100px'
                imgProduct.src = item.img
                let spanTitle = document.createElement('span')
                spanTitle.textContent = item.title
                let spanPrice = document.createElement('span')
                spanPrice.textContent = `${item.product_price} USD  x ${item.product_amount}`
                let spanTotalPrice = document.createElement('span')
                spanTotalPrice.textContent = `${item.product_price * item.product_amount} USD`
                parag.appendChild(spanID)
                spanImg.appendChild(imgProduct)
                parag.appendChild(spanImg)
                parag.appendChild(spanTitle)
                parag.appendChild(spanPrice)
                parag.appendChild(spanTotalPrice)
                elenm.appendChild(parag)
                orderHistoryContent.appendChild(elenm)
            }
            currentId = item.order_id
        })
    }else {
        document.querySelector('.order-history-content').appendChild(document.createElement('h1')).textContent = 'No any orders yet'
    }
    document.querySelector('.dropdown-xxx').style = `display: none; z-index: -1;`
    let orderHistory = document.querySelector('.order-history-wrapper')
    orderHistory.style = `display: block; z-index: 9999999999;`
    document.documentElement.style =`overflow: hidden;`
}

document.querySelector('.close-history').onclick = () => {
    let toRemoveContent = document.querySelector('.order-history-content')
    while (toRemoveContent.firstChild) {
        toRemoveContent.removeChild(toRemoveContent.firstChild)
    }
    document.querySelector('.order-history-wrapper')
        .style = `display: none; z-index: -1;`
    document.documentElement.style =`overflow: auto;`
}

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
                    z-index: 9;
                    
        `
let errorsBlockChangePassword = document.createElement('div')
errorsBlockChangePassword.id = 'errors-change-password'
let oldPass = document.createElement('input')
oldPass.type = 'password'
oldPass.className = 'pas-change-input'
oldPass.placeholder = 'Old pasword'
oldPass.name = 'old_password'
oldPass.maxLength = '23'
let newPass = document.createElement('input')
newPass.type = 'password'
newPass.className = 'pas-change-input'
newPass.placeholder = 'New password'
newPass.name = 'new_password'
newPass.maxLength = '23'
let comfim = document.createElement('input')
comfim.type = 'password'
comfim.className = 'pas-change-input'
comfim.placeholder = 'Confirm new password'
comfim.name = 'password_confirmation'
comfim.maxLength = '23'
let btn = document.createElement('button')
btn.textContent = 'Submit'
btn.id = 'submit-change-password';
btn.style = `
                border: solid 2px #6a9ba0;
                background-color: #6a9ba0;
                color: white;
                cursor: pointer;
                border-radius: 10px;
                margin: 10px auto 0;
                width: 50%;
                `
btn.onmouseover = function (e) {
    btn.style = `
                border: solid 2px #6a9ba0;
                cursor: pointer;
                border-radius: 10px;
                margin: 10px auto 0;
                width: 50%;\`
                background-color: #ffffff;
                color: #6a9ba0;
                border: solid 2px #6a9ba0;
                `
}
passwordChangeBlock.appendChild(errorsBlockChangePassword)
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
if (dropdownItem) {
    dropdownItem.style = `
                    margin: 10px; 
                    display: block; 
                    text-align: end;
                    `
    let img = document.createElement('img')
    img.src = 'data:image/png;base64,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'
    img.style.width = '20px'
    dropdownItem.appendChild(img)
    dropdown.appendChild(dropdownItem)
} else null
if (document.querySelector('.nav-link')) {
    document.querySelector('.nav-link').onclick = function (e) {
        dropdown.style = `
                    width: 250px;
                    height: auto;
                    border: solid 3px #6a9ba0;
                    border-radius: 20px;
                    position: absolute;
                    right: 0;
                    top: 40px;
                    padding: 15px 5px;
                    background-color: white;
                    z-index: 99999;
                    display: grid; 
                    `
    }
} else null

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
            old_password: $('input[name="old_password"]').val(),
            new_password: $('input[name="new_password"]').val(),
            password_confirmation: $('input[name="password_confirmation"]').val(),
        },
        success: function (response) {
            location.reload();
        },
        error: function (response) {
            $('#errors-change-password').empty();
            if (response['responseJSON']['response'] === 'false') {
                $('#errors-change-password').append(response['responseJSON']['errors']);
            } else {
                $.each(response['responseJSON']['errors'], function (key, value) {
                    $('#errors-change-password').append(key + ": " + value + "</br></br>");
                });
            }
        }
    })
});
