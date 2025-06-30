BaseURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/`
secUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
let container = document.querySelectorAll(".dropdown select")
let from = document.querySelector(".from select")
let to = document.querySelector(".to select")
for (const select of container) {

    for (const key in countryList) {
        const curr = key;
        let opt = document.createElement("option")
        opt.innerText = curr
        opt.value = curr;
        select.append(opt)
        if (select.name === "from" && opt.value === "USD") {
            opt.selected = "selected"
            select.parentElement.querySelector("p").innerText = "US Dollar"
        }
        else if (select.name === "to" && opt.value === "PKR") {
            opt.selected = "selected"
            select.parentElement.querySelector("p").innerText = "pakistani Rupee"

        }
    }
    select.addEventListener("change", (e) => {
        updateflag(e.target)
        getRate()
    })
}
const getRate = async () => {
    let msg = document.querySelector(".msg h3")
    let inpfield = document.querySelector("input")
    if (inpfield.value === "" || inpfield.value < 1) {
        inpfield.value = 1
    }
    let fromvalue = from.value.toLowerCase()
    let tovalue = to.value.toLowerCase()
    let response = await fetch(`${BaseURL}${fromvalue}.json`)
    let data = await response.json()
    let rate = data[fromvalue][tovalue]
    let result = inpfield.value * rate
    msg.innerText = `${inpfield.value} ${from.value} = ${result.toFixed(3)} ${to.value}`
}
const updateflag = async (element) => {
    let response = await fetch(secUrl)
    let data = await response.json()
    let fact = data[element.value.toLowerCase()]
    let namecount = element.nextElementSibling
    namecount.innerText = fact
    let curval = countryList[element.value]
    let img = element.previousElementSibling
    img.src = `https://flagsapi.com/${curval}/flat/64.png`
}
window.addEventListener("load", () => {
    getRate()
})
document.querySelector("button").addEventListener("click", (evt) => {
    evt.preventDefault()
    getRate()
})