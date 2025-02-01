const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const Task = require("./models/Tasks");
const Project = require("./models/Project");
const db = mongoose.connection;
const session = require("express-session");
const projectsCollection = db.collection("projects");

const UserRoute = require("./routes/user.js");
const ProjectRoute = require("./routes/project.js");

// mongoose.connect('mongodb://127.0.0.1:27017/taskapp', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(
	"mongodb+srv://bish150b:HFwETV9HRWgmk7am@cluster0.uorwthh.mongodb.net/Temp",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

db.on("error", (err) => {
	console.log(err);
});

db.once("open", () => {
	console.log("Database connection established");
});

// app.use(morgan('dev'))
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());
app.use(session({ resave: true, secret: "123456", saveUninitialized: true }));
app.use("/user", UserRoute);
app.use("/project", ProjectRoute);
// app.use(express.static('pages'))
// app.use(express.static('public'))

// app.get('/', (req, res) =>  {
//     // res.redirect("/login.html")
//     // res.sendFile(path.join(__dirname, '/public/index.html'))
//     res.sendFile(path.join(__dirname, '/pages/login.html'))
//     // var dt = D.find({});
//     // console.log(dt);

// })

// get data from database
async function getItems(userEmail) {
	var projCol = db.collection("projects");
	const Items = await projCol.find({ email: userEmail }).toArray();
	return Items;
}

function ConvertDBDataToJSON(mongodbData) {
	const transformedData = mongodbData.map((item) => {
		const { _id, projectName, id, name, tasks } = item;
		return { _id, projectName, id: parseInt(id), name, tasks };
	});

	return JSON.stringify(transformedData);
}

const connectedUser = {
	connected: false,
	username: "Logout",
};

app.get("/", async (req, res) => {
	if (!req.session.initialised) {
		// Initialise our variables on the session object (that's persisted across requests by the same user
		req.session.initialised = true;
		req.session.connected = false;
		req.session.username = "";
		req.session.message = "";
		app.locals.projects = [];
		// req.session.projects = [];
	}
	if (req.session.connected == true) {
		req.session.message = "";
		app.locals.connected = true;
		app.locals.username = req.session.username;
		let allProjects = getItems(app.locals.email);
		allProjects.then(function (result) {
			let projectsJson = ConvertDBDataToJSON(result);
			app.locals.projects = projectsJson;
			res.render("landingPage.ejs");
		});
	} else {
		req.session.message = "";
		app.locals.connected = false;
		res.render("landingPage.ejs");
	}
});

app.get("/signup", async (req, res) => {
	if (req.session.connected == true) {
		return res.redirect("/");
	}
	app.locals.message = "";
	if (req.session.message != "") {
		app.locals.message = req.session.message;
	}
	app.locals.connected = false;
	res.render("signup.ejs");
});

app.get("/login", async (req, res) => {
	if (req.session.connected == true) {
		return res.redirect("/");
	}
	app.locals.message = "";
	if (req.session.message != "") {
		app.locals.message = req.session.message;
	}
	app.locals.connected = false;
	res.render("login.ejs");
});

app.get("/logout", async (req, res) => {
	if (req.session.connected == true) {
		req.session.connected = false;
		req.session.username = "";
		req.session.password = "";
		req.session.email = "";
	}
	res.redirect("/");
});

app.get("/tutorial", async (req, res) => {
	if (req.session.connected == false) {
		return res.redirect("/");
	}
	res.render("tutorial.ejs");
});

app.get("/gantt", async (req, res) => {
	if (req.session.connected == false) {
		return res.redirect("/");
	}
	res.render("gantt.ejs");
});

app.get("/tasks", async (req, res) => {
	// res.sendFile(__dirname + "/public/tasksPage.html");
	app.locals.email = req.session.email;
	res.render("tasksPage.ejs");
});

app.get("/tasks/getEmail", async (req, res) => {
	// const data = { email: req.session.email };
	// res.setHeader("Content-Type", "application/json"); // Set the Content-Type header
	// res.send(JSON.stringify(data));
});

app.post("/tasks/save", async (req, res) => {
	req.body.forEach((project) => {
		const query = { name: project.name };
		const update = {
			$set: {
				name: project.name,
				id: project.id,
				user: project.user,
				tasks: project.tasks,
			},
		};
		const options = { upsert: true };
		projectsCollection.updateOne(query, update, options);
	});
	// for (var projectIndex = 0; projectIndex < data.)
	// const query = { projectName: "Tests" };
	// const newProject = new Project({
	//   projectName: "Test",
	//   id: "0",
	//   tasks: "idk"
	// })
	// const update = { $set: { name: newProject.name, id: newProject.id, tasks: newProject.tasks} };
	// const options = { upsert: true };
	// projectsCollection.updateOne(query, update, options);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// app.use('/api/employee', EmployeeRoute)
