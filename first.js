// this is first javascript file
const express = require("express");
const request = require("request");
const hbs = require("hbs");
const path = require("path");

const geocode = require("./copied/geocode");
const darksky = require("./copied/darksky");
const directory = path.join(__dirname, "/frontend");
const viewpath = path.join(__dirname, "/templates");
const partialpath = path.join(__dirname, "/partials");
console.log(directory);
const app = express();

app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);
app.use(express.static(directory));

app.get("", (req, res) => {
  res.render("index", {
    title: "welcome",
    content: "enter location to get its weather report",
    name: "charan"
  });
});
//      res.render('index',{
//          title:'this is a title',
//          content:'this is the content',
//          name:'its name is nothing '
//      })
//  })

app.get("/main", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide a search term"
    });
  } else {
    geocode(req.query.address, (error, data) => {
      if (error) {
        return res.send({
          error: error
        });
      } else {
        darksky(
          data[0].center[1],
          data[0].center[0],
          (
            error,
            { temperature, precipProbability, summary, humidity } = {}
          ) => {
            if (error) {
              return res.send({ error: error });
            } else {
              res.send({
                placename: data[0].place_name,
                weatherreport:
                  "the current temperature is " +
                  temperature +
                  " in fahrenheit " +
                  "and probability of rain is " +
                  precipProbability +
                  " the humidity is " +
                  humidity +
                  " totally the condition of weather is " +
                  summary
              });
            }
          }
        );
      }
    });
  }
});
app.get("/trial", (req, res) => {
  if (!req.query.search) {
    return res.send("Error! Require a search term");
  } else {
    res.send({
      game: "its a game",
      name: "charan rapeti"
    });
    console.log(req.query.search);
  }
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    content:
      "this app is about to tell the weather report of specified location",
    name: "charan"
  });
});
app.get("/help", (req, res) => {
  res.render("Help", {
    title: "help",
    content:
      "enter a location in form to get the weather report of that location",
    name: "charan"
  });
});
// app.get('/help',(req,res) => {
//     res.render('help',{
//         title:'this is the help title',
//         content:'this is the help cotent',
//         name:'its name is help'
//     })
// })

app.get("/home", (req, res) => {
  res.send("hello this is the home of the express");
});
// app.get('/about',(req,res) => {
//     res.send('hello this is about the express framework of the node.js')
// })
// app.listen(3000 , () => {
//     console.log('starting the server on port 3000')
// })
app.get("*", (req, res) => {
  res.send("Page 404 not found");
});
app.listen(3000, () => {
  console.log("starting the server on port 3000");
});
