function go() {
const classifier = ml5.charRNN('models/darwin/', (err, model) => {
  console.log('Model Loaded!');
});

// Generate content
classifier.generate({ seed: 'Create two questions and two answers based of the following text: The dog has been selectively bred over millennia for various behaviors, sensory capabilities, and physical attributes.[12] Dog breeds vary widely in shape, size, and color. They perform many roles for humans, such as hunting, herding, pulling loads, protection, assisting police and the military, companionship, therapy, and aiding disabled people. ' , length: 50, temperature: .1 }, (err, results) => {
  console.log(results);
});

}


