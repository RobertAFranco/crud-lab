import Dog from '../models/dog.js'

const index = async (req, res) => {
    const allDogss = await Dog.find();
    res.render("dogs/index.ejs", { dogs: allDogs });
}

const newDogs = async (req, res) => {
    const allDogs = await Dog.find();
    res.render("dogs/new.ejs", {dogs: allDogs});
}

export {
    index, newDogs
}
