const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const {Configuration, OpenAIApi} = require("openai")
const tesseract = require("node-tesseract-ocr")
var secret = require('./secret.json');
const openaiKey =  secret.openai;
//import { doc, setDoc, Timestamp } from "firebase/firestore"; 
const { Storage } = require("@google-cloud/storage");
const { initializeApp } = require('firebase-admin/app');

initializeApp({
    credential: GOOGLE_APPLICATION_CREDENTIALS,
    databaseURL: 'https://project-314684023612.firebaseio.com'
}); 
function process(images){
    tesseract.recognize(images, config)
    .then((text) => {
        const completion = openai.createCompletion({
            model: "text-davinci-002",
            prompt: "Create question and answer pairs about: "+ text,
          });
        
        let que = []
        let ans = []
        let fcards = []
        let qapairs = completion.split('\n');
        
        for(i = 0; i<completion.length; i++){
            if(i%2 == 0){
                que.push(qapairs[i]);
            }
            else{
                ans.push(qapairs[i]);
            }
        }

        for(i=0; i<que.length; i++){
            fcards.push(new Flashcard(que[i],ans[i]))
        }
        //push Set of Flashcards to User
       // const userSet = new Set('uid', 'name', userSet);
        return userSet;
    })
    .catch((error) => {
        console.log(error.message)
    })

}
    

const storage = new Storage({
    keyFilename: "./getnudge-e3e3e-fb3e640c3997.json",
 });

let bucketName = "gs://getnudge-e3e3e.appspot.com";


const config = {
    lang: "eng", oem: 1, psm: 3,
}

/*const configuration = new Configuration({
  apiKey: openaiKey
});

const openai = new OpenAIApi(configuration);

//images input
//const images = ['img2.jpg', 'img3.jpg', 'img4.png']


tesseract.recognize(images, config)
    .then((text) => {

        console.log("Result:", text);


      
         const completion = openai.createCompletion({
           model: "text-davinci-002",
            prompt: "Create questions about: "+text.text,
         });

      
        console.log(completion.data.choices[0].text);
    })
    .catch((error) => {
        console.log(error.message)
    })

*/

// console.log(response);


const app = express();

// This will make our form data much more useful
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('public'));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/history", (req, res) => {
    res.sendFile(__dirname + "/views/history.html");
});

app.get("/api/process", async (request, res) => {

  // call firebase storage for data
  
  console.log("[api] processing started")

  
  const bucketName = "getnudge-e3e3e.appspot.com";
  const srcFilename = `images/${request.query.fileName}`;
  const destFilename = __dirname + `/downloaded/${request.query.fileName}`;
  const storage = new Storage();
  const options = {
    destination: destFilename,
  };

    await storage.bucket(bucketName).file(srcFilename).download(options);



  res.send(process(destFilename));
})






app.listen(8080, () => console.log('Server is running...'));

console.log(openaiKey)


/*User class
class User {
    constructor (name, uid, sets) {
        this.name = name;
        this.uid = uid;
        this.sets = sets;
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country;
    }
}

class Set {
    constructor (uid, timestamp, flashcards){
      this.uid = uid;
      this.timestamp = timestamp;
      this.flashcards = flashcards;
    }
}

//Flashcard class
class Flashcard {
    constructor (question, answer, uid ) {
        this.question = question;
        this.answer = answer;
        this.uid = uid;
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country;
    }
}



// Firestore data converter
const userConverter = {
    toFirestore: (user) => {
        return {
            name: user.name
            uid: user.uid
            sets: user.sets
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(user.name, user.uid, user.sets);
    }
};

// Set with userConverter
//const ref = doc(db, "users", "?UID").withConverter(userConverter);
//await setDoc(ref, new User("NAME_USER", "", "?FLASHCARDS"));

const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
};
//await setDoc(doc(db, "data", "one"), docData);*/


//User class
class User {
    constructor (name, uid, sets) {
        this.name = name;
        this.uid = uid;
        this.sets = sets;
    }
    toString() {
        return this.name + ', ' + this.uid + ', ' + this.sets;
    }
}

class Set {
    constructor (flashcards){
    
      this.flashcards = flashcards;
    }
}

//Flashcard class
class Flashcard {
    constructor (question, answer) {
        this.question = question;
        this.answer = answer;
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country;
    }
}



