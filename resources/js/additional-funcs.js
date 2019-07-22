let allertFunc = function (mess, clas) {
    let wrapper = document.createElement('div')
    let allert = document.createElement("div")

    wrapper.className = `${clas}`
    wrapper.style = `
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99999999999;`
    allert.style = `
                    max-width: 550px;
                    height: max-content;
                    display: flex;
                    flex-direction: column;
                    border: solid 2px black;
                    position: relative;
                    border-radius: 10px;
                    border: solid 1px #e5e5e5;
                    padding: 0 0 40px 0;
                    position: fixed;
                    top: 15%;
                    margin-left: auto;
                    margin-right: auto;
                    left: 0;
                    right: 0;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px 5000px rgba(60, 60, 60, 0.45);
                    align-items: center;
                    z-index: 999999999999;
                    `
    let message = document.createElement('p')
    message.style = `
                        margin: 50px 0;
                        font-size: 50px;
                        text-align: center;
                        padding: 50px;
                    `

    message.textContent = `${mess}`
    allert.appendChild(message)
    wrapper.appendChild(allert)
    document.body.appendChild(wrapper)
}
let hideMenu = function () {
    (window.innerWidth < 768) ? diplay_hide('.top_page_main_menu') : null
}