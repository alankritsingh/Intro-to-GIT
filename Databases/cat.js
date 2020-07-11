var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
// 	name: "Mrs Norris",
// 	age: 7,
// 	temperament: "Evil"
// });

// george.save(function(err,cat){
// 	if(err){
// 		console.log("SOMMETHING WENT WRONG!!");
// 	}
// 	else{
// 		console.log("YOU  JUST SAVED A CAT TO THE DB");
// 		console.log(cat);
// 	}
// });


Cat.create({
	name: "Snow White",
	age: 6,
	temeperament: "Bland"
},function(err,cat){
	if(err){
		console.log(err);
	}
	else{
		console.log("One single Cat");
		console.log(cat);
	}
});
{ useUnifiedTopology:true }


Cat.find({},function(err,cats){
	if(err)
		{
			console.log("Something went wrong");
			console.log(err);
		}
	else{
		console.log("HERE ARE THE ALL THE CATS FOR YOU:");
		console.log(cats);
	}
});


{ useUnifiedTopology:true }
//mongoose.connect(process.env.test_db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });