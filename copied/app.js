const darksky = require("./darksky");


const geocode = require("./geocode");
const command = process.argv;
const address = process.argv[2]
if(!address) {
  return console.log('please provide and address')
}
else{
  geocode(address, (error, data) => {
    if(error){
      return console.log("error:", error);
    }
    console.log("data:", data[0].place_name);
    console.log(data[0].center)
    darksky(data.center[1],data.center[0], (error,{temperature,precipProbability}) => {
      if(error){
        return console.log("error:", error);
      } 
      else{
        console.log('currently the temperature is '+temperature+' fahrenheit '+" the probability of raining is "+precipProbability)
      }
    }); 
  }); 
}



  

 