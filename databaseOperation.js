const fs = require('fs');
// const csv = require('csv-parser');
// let filePath = './location.csv';

const mongoose = require('mongoose');
const conn = require('./connection');
let userSchema = new mongoose.Schema({
	userName:String,
	passWd: String
})

let userModel = conn.model('User', userSchema);


//input -- user is object, strucure:eg.{userName:'Lily', passWd:'123'}
//output-- false : already exist, true: load into database successfully
async function loadData(user){
	
	try {
		const existingUser = await userModel.findOne({ userName: user.userName });
        
        if (existingUser) {
            console.log('User already exists:', existingUser);
            return false; 
        }
        const newUser = await userModel.create(user);
        console.log('New user created:', newUser);
        return true;
		
	} catch (err) {
		console.error('Error processing database 101:', err);
	}

}

//input -- userName is String
//output-- false: user doesn't exsit, string: passWd
async function fetchData(userName){
	try{
		const existingUser = await userModel.findOne({ userName: userName });
        if (existingUser) {
            return user.passWd; 
        }else{
        	return false;

        }
	}catch(err){
		console.error('Error processing database 102:', err);
	}
}

async function deleteData(userName){
	try{
		const result = await userModel.deleteOne({ userName: userName });

        if (result.deletedCount > 0) {
            console.log(`User with username "${userName}" was deleted successfully.`);
            return true; 
        } else {
            console.log(`No user found with username "${userName}".`);
            return false; 
        }

	}catch(err){
		console.error('Error processing database 102:', err);
	}
}


async function showAll(){
    try {
    	let model = userModel;
		const documents = await model.find({});
		console.log('Database showing:');
		console.log(documents);
		console.log('Total count:', documents.length);
	} catch (err) {
		console.error('Error fetching data:', err);
	}
}
//delete the result in database
async function deleteAll(){
	try {
		let model = userModel;
		const result = await model.deleteMany({});
		console.log('Number of documents deleted: ${result.deletedCount}');
	} catch (err) {
		console.error('Error deleting data:', err);
	}
}

// readFile(fs,filePath_soci, socialModel);
// exports = []

module.exports.loadData=loadData;
module.exports.deleteData=deleteData;


(async () => {
    try {
    	//add user example
    	const user = {userName:'Lily', passWd:'123'};
    	// let loadResult = await loadData(user);
        // if(loadResult){
        // 	console.log('load Successfully!');
        // }else{
        // 	console.log('exiting user!');
        // }
        // await showAll();



        //delete user example
        let loadResult = await deleteData(user.userName);
        if(loadResult){
        	console.log('delete Successfully!');
        }else{
        	console.log('not found!');
        }
        await showAll();
        

    } catch (err) {
        console.error('Error in processing 301:', err);
    }
})();




