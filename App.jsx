import React from 'react';
import ReactDOM from 'react-dom';
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
//湖区随机值
function getRangeRandom(low,high){
	return Math.floor(Math.random() * (high - low) + low);
}

var ImgFigure = React.createClass({
	
	render:function(){

var styleObj={};
if(this.props.arrange.pos){
	styleObj = this.props.arrange.pos;
}
		return(
			<figure className='img-figure' style={styleObj}>
				<img src ={this.props.data.imageURL}
				alt={this.props.data.fileName}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
			)
	}
});

var App  = React.createClass({
		Constans:{
		centerPos:{
			left:0,
			right:0
		},
		hPosRange:{                     //水平方向的取值范围
			leftSecX:[0,0],
			rightSecX:[0,0],
			y:[0,0]
		},
		vPosRange:{                 //垂直方向的取值范围
				x:[0,0],
				topY:[0,0]
		}
	},
//组建加载后，为每章图片
	componentDidMount:function(){
 		var stageDom =ReactDOM.findDOMNode(this.refs.stage),
 			stageW = stageDom.scrollWidth,
 			stageH = stageDom.scrollHeight,
 			halfStageW = Math.ceil(stageW/2),
 			halfstageH =Math.ceil(stageH/2);
 			//get imgfigure size
 			var imgFigureDom = ReactDOM.findDOMNode(this.refs.ImgFigure0),
 				imgW = imgFigureDom.scrollWidth,
 				imgH = imgFigureDom.scrollHeight,
 				halfimgW = Math.ceil(imgW/2),
 				halfimgH=Math.ceil(imgH/2);
 				this.Constans.centerPos={
 					left:halfStageW- halfimgW,
 					top:halfstageH- halfimgH
 				}
 				this.Constans.hPosRange.leftSecX[0] = -halfimgW;
 				this.Constans.hPosRange.leftSecX[1]=halfStageW - halfimgW*3;
 				this.Constans.hPosRange.rightSecX[0]=halfStageW + halfimgW;
 				this.Constans.hPosRange.rightSecX[1] = stageW- halfimgW;
				this.Constans.hPosRange.y[0]= -halfimgH;
				this.Constans.hPosRange.y[1]=stageH -halfimgH;

				this.Constans.vPosRange.topY[0]=-halfimgH;
				this.Constans.vPosRange.topY[1]=halfstageH - halfimgH * 3;
				this.Constans.vPosRange.x[0]=halfStageW - imgW;
				this.Constans.vPosRange.x[1]= halfStageW;
				this.rearrange(0);
	},
	getInitialState:function(){
		return{
			imgsArrangeArr:[/*{
				pos:{
					left:'0',
					top:'0'
				}
			}*/]
		}
	},
	/*
	重新布局所有图片

	*/
	rearrange:function(centerIndex){
		var imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constans,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange  = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangX = vPosRange.x,

			imgsArrangeTopArr=[],
			topImgNum = Math.floor(Math.random() * 2), //取一个或者不取
			topImgSpliceIndex =0,
			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
			// 首先居中
			imgsArrangeCenterArr[0].pos = centerPos;
			topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

			//布局位于上侧的图片
			imgsArrangeTopArr.forEach(function(value,index){
				imgsArrangeTopArr[index].pos={
					top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
					left:getRangeRandom(vPosRangX[0],vPosRangX[1])
				}
			});

			for (var i = 0,j=imgsArrangeArr.length,k=j / 2; i < j; i++) {
				var hPosRangeLORX = null;
				//前半部分左边，
				if(i<k){
					hPosRangeLORX = hPosRangeLeftSecX;
				}else{
					hPosRangeLORX = hPosRangeRightSecX;
				}

				imgsArrangeArr[i].pos = {
					top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
					left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
				}
			}
			if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
				imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
			}

			imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

			this.setState({
				imgsArrangeArr:imgsArrangeArr
			})
	},
	render:function(){
		var controllerUnits = [],
			imgFigures =[];
			var self = this;
		imgDataArray.forEach(function(value,index){
			if(!self.state.imgsArrangeArr[index]){
				self.state.imgsArrangeArr[index]={
					pos:{
						left:'0',
						top:'0'
					}
				}
			}
		imgFigures.push(<ImgFigure ref={'ImgFigure'+index} data={value} arrange={self.state.imgsArrangeArr[index]}/>);
		});
      return (
         <section className="stage" ref="stage">
         	<section className="img-sec">{imgFigures}</section>
         	<nav className="controller-nav">
         	{controllerUnits}
         	</nav>
         </section>
      );
	}
});


export default App;