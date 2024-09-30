// UNSPLASH API
//Function to fetch images using the Usplash API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature") //visits the url to extract the available data
    .then(res => res.json()) //fetch the data and convert it into a JSON Format
    .then(data => {
        //extract the image and the author of the image and display
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author if no response/data was found
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })
    //END OF UNSPLASH API


 //COINGECKO API   
//Function to fetch data from the Cryptoc-currenccy API 
fetch("https://api.coingecko.com/api/v3/coins/dogecoin") //visits the url to extract the available data
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")//alert user if resonse/data fetching failed
        }
        return res.json()//convert the fetched data into a JSON Format
    })
    .then(data => {
        //display the coin image and coin name from the crypto currency API
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        //display the currency values from the crypto currency API
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))//console log the error for data fetch failure
    //END OF COINGECKO API


function getCurrentTime() {
    const date = new Date() //use javascript date object to get current time/date
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

//GEOLOCATION API
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)//use geolocation API to get client's/user's location 
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")//alert weather inavalibilty if there is no response/data fetched
            }
            return res.json()//convert the fetched data into a JSON Format
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` // get and display the weather icon
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});