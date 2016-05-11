import React from 'react';
//get image data
var imgDataArray = require('./src/json/imgData.json')
//use function to get img url
imgDataArray =(function getImageURL(imgDataArray){
	for (var i = 0; i < imgDataArray.length; i++) {
		var imgData = imgDataArray[i];
		var fileName = './src/img/'+ imgData.fileName;
		imgData.imageURL = fileName;
		imgDataArray[i] = imgData;
	}

	return imgDataArray;
})(imgDataArray)

class App extends React.Component {
   render() {
      return (
         <section className="stage">
         	<section></section>
         	<nav className="nav"></nav>
         </section>
      );
   }
}

export default App;