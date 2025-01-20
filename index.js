import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


//https://open-meteo.com/en/docs/historical-forecast-api#start_date=2024-08-28&daily=
// THIS WEBSITE GETS THE TEMP AT A GIVEN TIME
// Website for getting weather


//https://geocode.maps.co
// THIS WEBSITE GETS THE LAT AND LON FOR INPUT CITY
//API KEY: 66e312de05897811598481sdn3fa102

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
        res.render("index.ejs");
});


app.post("/townInput", async (req, res) => {
    var city = req.body.city;
    if(city.includes('+')){
        city = city.replace('+', ' ');
    }
    var state = req.body.state;
    var selectedMonth = req.body.monthSelect;
    var displayMonth;
    if(selectedMonth == "01"){
        displayMonth = "January";
    }else if(selectedMonth == "02"){
        displayMonth = "February";
    }else if(selectedMonth == "03"){
        displayMonth = "March";
    }else if(selectedMonth == "04"){
        displayMonth = "April";
    }else if(selectedMonth == "05"){
        displayMonth = "May";
    }else if(selectedMonth == "06"){
        displayMonth = "June";
    }else if(selectedMonth == "07"){
        displayMonth = "July";
    }else if(selectedMonth == "08"){
        displayMonth = "August";
    }else if(selectedMonth == "09"){
        displayMonth = "September";
    }else if(selectedMonth == "10"){
        displayMonth = "October";
    }else if(selectedMonth == "11"){
        displayMonth = "November";
    }else if(selectedMonth == "12"){
        displayMonth = "December";
    }
    var selectedDay = req.body.daySelect;
    var displayDay = selectedDay;
    console.log(selectedDay);
    if(selectedDay.toString().length === 1){
        let temp2 = selectedDay;
        selectedDay = "0" + temp2.toString();
    }
    var tomorrow = new Date(`${req.body.year}/${selectedMonth}/${selectedDay}`);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);
    let endYear = tomorrow.getFullYear()
    console.log("END YEAR: " + endYear);
    let endMonth = tomorrow.getMonth() + 1;
    if(endMonth.toString().length === 1){
        let temp = endMonth;
        endMonth = "0" + temp.toString();
    }
    console.log("END MONTH: " + endMonth);
    let endDay = tomorrow.getDate();
    if(endDay.toString().length === 1){
        let temp3 = endDay;
        endDay = "0" + temp3.toString();
    }
    console.log("END DAY: " + endDay);
    try{
        const coords = await axios.post(`https://geocode.maps.co/search?city=${city}&state=${state}&api_key=66e312de05897811598481sdn3fa102`);
        var inputLat = coords.data[0].lat;
        var inputLon = coords.data[0].lon;
        try{
            const weather = await axios.get(`https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${inputLat}&longitude=${inputLon}&start_date=${req.body.year}-${selectedMonth}-${selectedDay}&end_date=${endYear}-${endMonth}-${endDay}&hourly=temperature_2m`);
            const weatherData = weather.data;
            console.log(weatherData);

            res.render("index.ejs", {city: city, state: state, month: displayMonth, day: displayDay, year: req.body.year,
                weather1: JSON.stringify(weatherData.hourly.temperature_2m[0]),
                weather2: JSON.stringify(weatherData.hourly.temperature_2m[1]), 
                weather3: JSON.stringify(weatherData.hourly.temperature_2m[2]), 
                weather4: JSON.stringify(weatherData.hourly.temperature_2m[3]), 
                weather5: JSON.stringify(weatherData.hourly.temperature_2m[4]), 
                weather6: JSON.stringify(weatherData.hourly.temperature_2m[5]), 
                weather7: JSON.stringify(weatherData.hourly.temperature_2m[6]), 
                weather8: JSON.stringify(weatherData.hourly.temperature_2m[7]), 
                weather9: JSON.stringify(weatherData.hourly.temperature_2m[8]), 
                weather10: JSON.stringify(weatherData.hourly.temperature_2m[9]), 
                weather11: JSON.stringify(weatherData.hourly.temperature_2m[10]), 
                weather12: JSON.stringify(weatherData.hourly.temperature_2m[11]), 
                weather13: JSON.stringify(weatherData.hourly.temperature_2m[12]), 
                weather14: JSON.stringify(weatherData.hourly.temperature_2m[13]), 
                weather15: JSON.stringify(weatherData.hourly.temperature_2m[14]), 
                weather16: JSON.stringify(weatherData.hourly.temperature_2m[15]), 
                weather17: JSON.stringify(weatherData.hourly.temperature_2m[16]), 
                weather18: JSON.stringify(weatherData.hourly.temperature_2m[17]), 
                weather19: JSON.stringify(weatherData.hourly.temperature_2m[18]), 
                weather20: JSON.stringify(weatherData.hourly.temperature_2m[19]), 
                weather21: JSON.stringify(weatherData.hourly.temperature_2m[20]), 
                weather22: JSON.stringify(weatherData.hourly.temperature_2m[21]), 
                weather23: JSON.stringify(weatherData.hourly.temperature_2m[22]), 
                weather24: JSON.stringify(weatherData.hourly.temperature_2m[23]), 
                coords: JSON.stringify(coords.data[0].lat)});
        } catch (error) {
            res.render("index.ejs", {weather: error.message});
            console.log("WE ARE GETTING AN ERROR!");
        }       
    }catch(error){
        res.render("index.ejs", {weather: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server is now running at port ${port}`);
});