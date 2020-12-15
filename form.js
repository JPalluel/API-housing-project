document.getElementById('submit').addEventListener('click', function(){

// get the value entered by the users
// The 4 required values
    let area = new Number(document.getElementById('area').value);
    console.log(area);

    let typeOfHouse = document.querySelector('input[name="type"]:checked').value;
    console.log(typeOfHouse);

    let room = new Number(document.getElementById('room').value);
    console.log(room);

    let zip = new Number(document.getElementById('zip').value);
    console.log(zip);

// the other values are not mandatory

    let landAreaValue = new Number(document.getElementById("land").value);
        console.log(landAreaValue);

    let garden = document.querySelector("input[name='garden']").checked;
        console.log(garden);

    let gardenAreaValue = new Number(document.getElementById("gardenArea").value);
        console.log(gardenAreaValue);

    let equippedkitchen = document.querySelector("input[name='equippedKitchen']").checked;
        console.log(equippedkitchen);

    let swimmingpool = document.querySelector("input[name='swimmingPool']").checked;
        console.log(swimmingpool);

    let furnished = document.querySelector("input[name='furnished']").checked;
        console.log(furnished);

    let openfire = document.querySelector("input[name='openFire']").checked;
    console.log(openfire);

    let terrace = document.querySelector("input[name='terrace']").checked;
        console.log(terrace);

    let terraceAreaValue = new Number(document.getElementById("terraceArea").value);
        console.log(terraceAreaValue);

    let facadesNumberValue = new Number(document.getElementById("facadesNumber").value);
        console.log(facadesNumberValue);

    let buildingState = document.querySelector("input[name='building']:checked").value;
        console.log(buildingState);

    // the expected format is a string, comma separated

    let address = document.getElementById("address").value;
    let arrayAddress = address.split(" ");
    let finalAddress = arrayAddress.join(",");
    console.log(finalAddress);

    let propertysubtype = document.querySelector("input[name='subtype']:checked").value;
        console.log(propertysubtype);

    // create an object with the same format that is inside API
    let data = {
        data:{
        "area" : area,
        "property-type": typeOfHouse,
        "rooms-number": room,
        "zip-code": zip,
        "land-area": landAreaValue,
        "garden": garden,
        "garden-area": gardenAreaValue,
        "equipped-kitchen": equippedkitchen,
        "swimmingpool": swimmingpool,
        "furnished": furnished,
        "open-fire": openfire,
        "terrace": terrace,
        "terrace-area": terraceAreaValue,
        "facades-number": facadesNumberValue,
        "building-state": buildingState,
        "full-address": finalAddress,
        "property-subtype": propertysubtype
        }
    }

    console.log(data)

    // Make the connexion with the API
    const proxyurl = "https://cors-anywhere.herokuapp.com/";// API that modify the header to correct the CORS Policy
    const url = "http://cnos4.herokuapp.com/predict";  
    fetch(proxyurl + url,
    {method: 'POST', // POSt method to send info to the API
    body: JSON.stringify(data),
    headers:{
        'Content-type': 'application/json'}
    })                             
    .then(response => response.json())
    .then((contents) => {
        console.log(contents)
        let propertyValue = new Number(contents.prediction.slice(22,-3)); // slice the string to get only the numbers
        propertyValue = propertyValue.toFixed(2);

// to change the format of the result 
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })
        console.log(formatter.format(propertyValue))
        let form = document.getElementById('form');
        form.insertAdjacentHTML("beforeend", "<h4 id='result'> The estimated price of your good is " + formatter.format(propertyValue) +"</p>")
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    });



