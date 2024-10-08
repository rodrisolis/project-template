/**
 * [Chart.PieceLabel.js]{@link https://github.com/emn178/Chart.PieceLabel.js}
 *
 * @version 0.15.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2017-2018
 * @license MIT
 */(function(){function p(){this.drawDataset=this.drawDataset.bind(this)}function g(t,i){if(t.options.pieceLabel){var e=1;if(Array.isArray(t.options.pieceLabel)&&(e=t.options.pieceLabel.length),!t.pieceLabel||e!==t.pieceLabel.length){t.pieceLabel=[];for(var a=0;a<e;++a)t.pieceLabel.push(new p)}}else t.pieceLabel&&delete t.pieceLabel;if(t.pieceLabel)for(e=0;e<t.pieceLabel.length;++e)t.pieceLabel[e][i](t,e)}typeof Chart>"u"?console.warn("Can not find Chart object."):(Array.isArray||(Array.isArray=function(t){return Object.prototype.toString.call(t)==="[object Array]"}),p.prototype.beforeDatasetsUpdate=function(t,i){if(this.parseOptions(t,i),this.position==="outside"){var e=1.5*this.fontSize+this.outsidePadding;t.chartArea.top+=e,t.chartArea.bottom-=e}},p.prototype.afterDatasetsDraw=function(t,i){this.parseOptions(t,i),this.labelBounds=[],t.config.data.datasets.forEach(this.drawDataset)},p.prototype.drawDataset=function(t){var i=this.ctx,e=this.chartInstance,a=t._meta[Object.keys(t._meta)[0]];this.totalPercentage=0,this.total=null;for(var r=0;r<a.data.length;r++){var l=a.data[r],o=l._view;if(this.shouldRenderData(o)){switch(this.render){case"value":var s=t.data[r];this.format&&(s=this.format(s)),s=s.toString();break;case"label":s=e.config.data.labels[r];break;case"image":s=this.images[r]?this.loadImage(this.images[r]):"";break;default:percentage=this.getPercentage(o,t,r),s=percentage+"%"}if(typeof this.render=="function"&&(s=this.render({label:e.config.data.labels[r],value:t.data[r],percentage,dataset:t,index:r}),s=s==null?"":typeof s=="object"?this.loadImage(s):s.toString()),s){i.save(),i.beginPath(),i.font=Chart.helpers.fontString(this.fontSize,this.fontStyle,this.fontFamily);var h=0;if(this.position==="outside"||this.position==="border"){var f=o.outerRadius/2,n=this.fontSize+this.textMargin,c=o.startAngle+(o.endAngle-o.startAngle)/2;if(this.position==="border")var u=(o.outerRadius-f)/2+f;else this.position==="outside"&&(this.arc||(n=this.textMargin),u=o.outerRadius-f+f+n);c={x:o.x+Math.cos(c)*u,y:o.y+Math.sin(c)*u},this.position==="outside"&&(this.arc||(n+=this.measureText(s).width/2),c.x=c.x<o.x?c.x-n:c.x+n,h=o.outerRadius+n)}else f=o.innerRadius,c=l.tooltipPosition();if(n=this.fontColor,typeof n=="function"?n=n({label:e.config.data.labels[r],value:t.data[r],percentage,text:s,backgroundColor:t.backgroundColor[r],dataset:t,index:r}):typeof n!="string"&&(n=n[r]||this.options.defaultFontColor),this.arc)h||(h=(f+o.outerRadius)/2),i.fillStyle=n,i.textBaseline="middle",this.drawArcText(s,h,o,this.overlap);else{var d=this.measureText(s);o=c.x-d.width/2,f=c.x+d.width/2,h=c.y-d.height/2,d=c.y+d.height/2,(this.overlap||(this.position==="outside"?this.checkTextBound(o,f,h,d):l.inRange(o,h)&&l.inRange(o,d)&&l.inRange(f,h)&&l.inRange(f,d)))&&this.fillText(s,c,n)}i.restore()}}}},p.prototype.shouldRenderData=function(t){return this.chartInstance.config.type==="polarArea"?t.outerRadius!==0:t.circumference!==0||this.showZero},p.prototype.getPercentage=function(t,i,e){if(this.chartInstance.config.type==="polarArea"){if(this.total===null)for(t=this.total=0;t<i.data.length;++t)this.total+=i.data[t];i=i.data[e]/this.total*100}else i=t.circumference/this.options.circumference*100;return i=parseFloat(i.toFixed(this.precision)),this.showActualPercentages||(this.totalPercentage+=i,100<this.totalPercentage&&(i-=this.totalPercentage-100,i=parseFloat(i.toFixed(this.precision)))),i},p.prototype.parseOptions=function(t,i){var e=t.options.pieceLabel;Array.isArray(e)&&(e=e[i]),this.chartInstance=t,this.ctx=t.chart.ctx,this.options=t.config.options,this.render=e.render||e.mode,this.position=e.position||"default",this.arc=e.arc,this.format=e.format,this.precision=e.precision||0,this.fontSize=e.fontSize||this.options.defaultFontSize,this.fontColor=e.fontColor||this.options.defaultFontColor,this.fontStyle=e.fontStyle||this.options.defaultFontStyle,this.fontFamily=e.fontFamily||this.options.defaultFontFamily,this.shadowOffsetX=e.shadowOffsetX||3,this.shadowOffsetY=e.shadowOffsetY||3,this.shadowColor=e.shadowColor||"rgba(0,0,0,0.3)",this.shadowBlur=e.shadowBlur||6,this.textShadow=e.textShadow||!1,this.hasTooltip=t.tooltip._active&&t.tooltip._active.length,this.showZero=e.showZero,this.overlap=e.overlap,this.images=e.images||[],this.outsidePadding=e.outsidePadding||2,this.textMargin=e.textMargin||2,this.showActualPercentages=e.showActualPercentages||!1},p.prototype.checkTextBound=function(t,i,e,a){for(var r=this.labelBounds,l=0;l<r.length;++l){for(var o=r[l],s=[[t,e],[t,a],[i,e],[i,a]],h=0;h<s.length;++h){var f=s[h][0],n=s[h][1];if(f>=o.left&&f<=o.right&&n>=o.top&&n<=o.bottom)return!1}for(s=[[o.left,o.top],[o.left,o.bottom],[o.right,o.top],[o.right,o.bottom]],h=0;h<s.length;++h)if(f=s[h][0],n=s[h][1],f>=t&&f<=i&&n>=e&&n<=a)return!1}return r.push({left:t,right:i,top:e,bottom:a}),!0},p.prototype.measureText=function(t){if(typeof t=="object")return{width:t.width,height:t.height};var i=0;t=t.split(`
`);for(var e=0;e<t.length;++e){var a=this.ctx.measureText(t[e]);a.width>i&&(i=a.width)}return{width:i,height:this.fontSize*t.length}},p.prototype.fillText=function(t,i,e){var a=this.ctx;if(typeof t=="object")a.drawImage(t,i.x-t.width/2,i.y-t.height/2,t.width,t.height);else{for(a.save(),a.fillStyle=e,a.textBaseline="top",a.textAlign="center",this.textShadow&&(a.shadowOffsetX=this.shadowOffsetX,a.shadowOffsetY=this.shadowOffsetY,a.shadowColor=this.shadowColor,a.shadowBlur=this.shadowBlur),t=t.split(`
`),e=0;e<t.length;e++)a.fillText(t[e],i.x,i.y-this.fontSize/2*t.length+this.fontSize*e);a.restore()}},p.prototype.loadImage=function(t){var i=new Image;return i.src=t.src,i.width=t.width,i.height=t.height,i},p.prototype.drawArcText=function(t,i,e,a){var r=this.ctx,l=e.x,o=e.y,s=e.startAngle;e=e.endAngle,r.save(),r.translate(l,o),r.textAlign="left",o=e-s,s+=Math.PI/2,e+=Math.PI/2;var h=s;if(l=this.measureText(t),s+=(e-(l.width/i+s))/2,a||!(e-s>o))if(typeof t=="string"){for(r.rotate(s),t=t.split(`
`),a=0,s=[],e=0,this.position==="border"&&(e=(t.length-1)*this.fontSize/2),o=0;o<t.length;++o)l=r.measureText(t[o]),l.width>a&&(a=l.width),s.push(l.width);for(o=0;o<t.length;++o){h=t[o];var f=(t.length-1-o)*-this.fontSize+e;r.save(),r.rotate((a-s[o])/2/i);for(var n=0;n<h.length;n++){var c=h.charAt(n);l=r.measureText(c),r.save(),r.translate(0,-1*i),r.fillText(c,0,f),r.restore(),r.rotate(l.width/i)}r.restore()}}else r.rotate((h+e)/2),r.translate(0,-1*i),this.fillText(t,{x:0,y:0});r.restore()},Chart.pluginService.register({name:"PieceLabel",beforeDatasetsUpdate:function(t){g(t,"beforeDatasetsUpdate")},afterDatasetsDraw:function(t){g(t,"afterDatasetsDraw")}}))})();
