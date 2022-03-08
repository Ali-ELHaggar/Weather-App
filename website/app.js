// Creating a new date instance dynamically with JS
let d = new Date();
let nDate = d.toDateString();

// The URL to retrieve weather information from his API (country : US)
const bURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// // Personal API Key for OpenWeatherMap API
// &units=metric to get the Celsius Temperature
const aKey = ",&appid=81279864f42dadf2528451f49df8e2f3&units=metric";


// the URL of the server to post data
const serverLocation = "http://127.0.0.1:4000";

// showing the error to the user
const errorS = document.getElementById("errorS");
/**
 * // generateData //
 * function to get input 
 * call getWeather to fetch  data from API
 * create object from API object using destructuring
 * post the data to server
 *  update UI
 */

const generatedData = () => {
    //get value after click on the button
    const zipp = document.getElementById("zipCode").value;
    const feeling = document.getElementById("feeling").value;

    // getWeatherData return promise
    getWeather(zipp).then((data) => {
        //making sure from the received data to execute rest of the steps
        if (data) {
            const {
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;

            const info = {
                nDate,
                city,
                temp: Math.round(temp), // to get integer number
                description,
                feeling,
            };

            postData(serverLocation + "/add", info);

            updatingUI();
            document.getElementById('entries').style.opacity = 1;
        }
    });
};

// Event listener to add function to existing HTML DOM element
// Function called by event listener
document.getElementById("generateD").addEventListener("click", generatedData);

//Function to GET Web API Data
const getWeather = async (zipp) => {
    try {
        const response = await fetch(bURL + zipp + aKey);
        const data = await response.json();

        if (data.cod != 200) {
            // display the error message on UI
            errorS.innerHTML = data.message;
            setTimeout(_ => errorS.innerHTML = '', 2000)
            throw `${data.message}`;
        }

        return data;
    } catch (errorS) {
        console.log(errorS);
    }
};

// Function to POST data
const postData = async (url = "", info = {}) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const newData = await response.json();
        console.log(`You just saved`, newData);
        return newData;
    } catch (errorS) {
        console.log(errorS);
    }
};

//Function to GET Project Data
// and updating UI by this data
const updatingUI = async () => {
    const response = await fetch(serverLocation + "/all");
    try {
        const savedData = await response.json();

        document.getElementById("ndate").innerHTML = savedData.nDate;
        document.getElementById("cities").innerHTML = savedData.city;
        document.getElementById("temperature").innerHTML = savedData.temp + '&degC';
        document.getElementById("description").innerHTML = savedData.description;
        document.getElementById("contents").innerHTML = savedData.feeling;
    } catch (errorS) {
        console.log(errorS);
    }
};
