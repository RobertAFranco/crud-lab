import express from "express"
import dotenv from "dotenv" 
import mongoose from "mongoose" 
import methodOverride from "method-override"
import morgan from "morgan"
import Dog from "./models/dog.js"

import * as dogsCtrl from "./controllers/dogs.js"

dotenv.config(); 
const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 


app.get("/", async (req, res) => {
    res.render("index.ejs");
});



app.get("/dogs/new", dogsCtrl.newDogs);



app.get("/dogs", dogsCtrl.index);
    
  

app.post("/dogs", async (req, res) => {
    if (req.body.isReadyToAdopt === "on") {
      req.body.isReadyToAdopt = true;
    } else {
      req.body.isReadyToAdopt = false;
    }
    await Dog.create(req.body);
    res.redirect("/dogs");
  });
  
  app.get("/dogs/:dogId", async (req, res) => {
    const foundDog = await Dog.findById(req.params.dogId);
    res.render("dogs/show.ejs", {dog: foundDog});
  });

  app.delete("/dogs/:dogId", async (req, res) => {
    await Dog.findByIdAndDelete(req.params.dogId);
    res.redirect("/dogs");
  });

  app.get("/dogs/:dogId/edit", async (req, res) => {
    const foundDog = await Dog.findById(req.params.dogId);
    res.render("dogs/edit.ejs", {
      dog: foundDog,
    });
  });

  // server.js

app.put("/dogs/:dogId", async (req, res) => {
   
    if (req.body.isReadyToAdopt === "on") {
      req.body.isReadyToAdopt = true;
    } else {
      req.body.isReadyToAdopt = false;
    }
    
  
    await Dog.findByIdAndUpdate(req.params.dogId, req.body);
  
   
    res.redirect(`/dogs/${req.params.dogId}`);
  });
  
  
  
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
    app.listen(3000, () => {
        console.log("Listening on port 3000");
        });
})