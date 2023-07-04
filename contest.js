let ipAddress
let postOfficeData

let dataButton=document.getElementById("dataButton")
dataButton.addEventListener("click" , displayUserLocationDetails)
function displayUserLocationDetails() {
    
    dataButton.style.display="none"
    document.getElementById("userLocationDetails").style.display="block"
    
 }

let latitude=document.getElementById("latitude")
let longitude=document.getElementById("longitude")
let city=document.getElementById("city")
let region=document.getElementById("region")
let timezone=document.getElementById("timezone")
let dateandTime=document.getElementById("dateandTime")
let pincode=document.getElementById("pincode")
let message=document.getElementById("message")
let mapLocation=document.getElementById("mapLocation")
let postOfficeDisplay=document.getElementById("postOfficeDisplay")
let searchBar=document.getElementById("searchBar")
searchBar.addEventListener("change", filteringPostOffice)

$.getJSON("https://api.ipify.org?format=json", function(data) {

        if(data.ip){
        ipAddress=data.ip 
        $("#ipAddress").html(data.ip);
         gettinguserLocationDetails(ipAddress)
    } 

    else{
        alert("Cant found Ip Address. Please load the page again")
    }

})

async function gettinguserLocationDetails(IP){
    const response= await fetch(`https://api.ipgeolocation.io/timezone?apiKey=ebcaf7fe59e142d0819dbf0a2f23d407&ip=${IP}`)
    const data= await response.json()
    pritingUserLocationDetails(data)
}




async function gettingpostOffices(pincode){
    let response= await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    let data= await response.json()
    message.innerText=`Message: ${data[0].Message}`
    postOfficeData=data[0].PostOffice
    displayPostOfficeData(postOfficeData)
    
}


function pritingUserLocationDetails(data){
   latitude.innerText=data.geo.latitude
   longitude.innerText=data.geo.longitude
   city.innerText=data.geo.city
   region.innerText=data.geo.state_code
   timezone.innerText=data.timezone
   dateandTime.innerText = new Date().toLocaleString("en-US", { timeZone: data.timeZone });
   pincode.innerText=data.geo.zipcode
   gettingpostOffices(data.geo.zipcode)
   mapLocation.src=`https://www.google.com/maps?q=${data.geo.latitude},${data.geo.longitude}&output=embed`
}

function displayPostOfficeData(postOfficeData){
   postOfficeData.forEach((postOffice)=>{
    let div= document.createElement("div")
    div.className="item"

    let name=document.createElement("p")
    name.innerText=`Name: ${postOffice.Name}`

    let branchType=document.createElement("p")
    branchType.innerText=`BranchType: ${postOffice.BranchType}`

    let deliveryStatus=document.createElement("p")
    deliveryStatus.innerText=`Delivery Status: ${postOffice.DeliveryStatus}`

    
    let district=document.createElement("p")
   district.innerText=`District: ${postOffice.District}`


    
    let division=document.createElement("p")
    division.innerText=`Division: ${postOffice.Division}`

    div.appendChild(name)
    div.appendChild(branchType)
    div.appendChild(deliveryStatus)
    div.appendChild(district)
    div.appendChild(division)

    postOfficeDisplay.appendChild(div)
   })
}

function  filteringPostOffice(event) {
    
    postOfficeDisplay.innerHTML=""
     let searcharray=[]
    let searchValue=event.target.value;
    if(searchValue!==""){
    postOfficeData.forEach((postOffice)=>{
        for(let i in postOffice){
            if(postOffice[`${i}`]!==null){
                let str1=postOffice[`${i}`].toUpperCase()
            if(str1.includes(searchValue.toUpperCase())){
                searcharray.push(postOffice)
            }
        }
    }
    })
}
else{
    searcharray=postOfficeData
}
    displayPostOfficeData(searcharray)
}
