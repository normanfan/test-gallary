var config = {
   entry: './main.js',
	
   output: {
      path:'./',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 1000
   },
	
   module: {
      loaders: [ {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel',
			
         query: {
            presets: ['es2015', 'react']
         }
      },{
         test: /\.json?$/,
         loader: 'json-loader',     
      },{ test: /\.css$/,
       loader: "style-loader!css-loader" },
      { test: /\.png$/, 
         loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, 
         loader: "file-loader" }]
   }
	
}

module.exports = config;