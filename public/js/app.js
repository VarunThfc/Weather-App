
 getWeatheInfo = (universalRes) =>{ fetch(universalRes).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            messageNormal.textContent = " "
            messageError.textContent = data.error
        }
        else{
            console.log(data)
            messageNormal.textContent = data.forecast
            messageError.textContent = data.location

        }

    })
})
}


const weatherForm = document.querySelector("form")
const textValue = document.querySelector("input")
const messageError = document.querySelector("#MessageError")
const messageNormal = document.querySelector("#Message")


weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    messageNormal.textContent = "Loading......."
    messageError.textContent = ""
    const url = "http://localhost:3000/weather?address="+textValue.value
    getWeatheInfo(url)
})