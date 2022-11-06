// declare firebase
function go() {
const classifier = ml5.charRNN('models/darwin/', (err, model) => {
  console.log('Model Loaded!');
});

// Generate content
classifier.generate({ seed: 'Create two questions and two answers based of the following text: The dog has been selectively bred over millennia for various behaviors, sensory capabilities, and physical attributes.[12] Dog breeds vary widely in shape, size, and color. They perform many roles for humans, such as hunting, herding, pulling loads, protection, assisting police and the military, companionship, therapy, and aiding disabled people. ' , length: 50, temperature: .1 }, (err, results) => {
  console.log(results);
});

}

var storage = firebase.storage()



function upload() {

  window.alert("uploading")
  var files = document.getElementById("file").files;
  console.log(files)
  for (var i = 0; i < files.length; i++) {
    var imageRef = storage.ref(`/images/${files[i].name}`);

    imageRef.put(files[i]).then((snapshot) => {
      console.log(`Uploaded ${i} of ${files.length}`);
console.log(snapshot.metadata.name)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    }
    xhttp.open("GET", `../api/process?fileName=${snapshot.metadata.name}`, true);
    xhttp.send();
  
  }); 
  



  
  }




}