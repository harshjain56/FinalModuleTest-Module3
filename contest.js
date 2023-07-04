let ipAddress
$.getJSON("https://api.ipify.org?format=json", function(data) {

        if(data.ip){
        ipAddress=data.ip 
        $("#ipAddress").html(data.ip);
         gettingLatandLong(ipAddress)
    } 

    else{
        alert("Cant found Ip Address. Please load the page again")
    }

})

async function gettingLatandLong(IP){
    const response= await fetch(`https://api.ipgeolocation.io/timezone?apiKey=ebcaf7fe59e142d0819dbf0a2f23d407&ip=${IP}`)
    const data= await response.json()
    

}

let dataButton=document.getElementById("dataButton")
dataButton.addEventListener("click" , displayUserLocationDetails)

function displayUserLocationDetails() {
    
   dataButton.style.display="none"
}

