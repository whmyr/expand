class Expand{constructor(i){this.config=Expand.settingsOverride(i),this.selector="string"==typeof this.config.selector?document.querySelector(this.config.selector):this.config.selector,this.selectorWidth=this.selector.offsetWidth,this.innerItems=[].slice.call(this.selector.children),this.curSlide=this.config.loop?this.config.startIndex%this.innerItems.length:Math.max(0,Math.min(this.config.startIndex,this.innerItems.length-this.visibleSlides)),["resizeHandler","clickHandler","touchstartHandler","touchendHandler","touchmoveHandler","mousedownHandler","mouseupHandler","mouseleaveHandler","mousemoveHandler"].forEach(i=>{this[i]=this[i].bind(this)}),this.slidesAmount(),this.init()}static settingsOverride(i){return{selector:".expand-js",visibleSlides:1,useCssFile:0,cssCustomPath:"",startIndex:0,draggable:!0,multipleDrag:!0,triggerDistance:20,loop:!0,rtl:!1,duration:200,easeMode:"ease-out",slidesToSlide:1,autoplay:0,autoplayDuration:3e3,arrows:!1,arrowsVisible:1,prevArrowClass:"expand-prev",nextArrowClass:"expand-next",prevArrowInner:"prev",nextArrowInner:"next",gap:0,keyboard:!1,onInit:()=>{},onChange:()=>{},...i}}attachEvents(){this.config.draggable&&(this.pointerDown=!1,this.drag={startXAxis:0,endXAxis:0,startYAxis:0,endYAxis:0,dragOff:null,preventClick:!1},window.addEventListener("resize",this.resizeHandler),this.selector.addEventListener("click",this.clickHandler),this.selector.addEventListener("touchstart",this.touchstartHandler),this.selector.addEventListener("touchend",this.touchendHandler),this.selector.addEventListener("touchmove",this.touchmoveHandler),this.selector.addEventListener("mousedown",this.mousedownHandler),this.selector.addEventListener("mouseup",this.mouseupHandler),this.selector.addEventListener("mouseleave",this.mouseleaveHandler),this.selector.addEventListener("mousemove",this.mousemoveHandler))}init(){this.attachEvents(),this.selector.classList.add("expand-js"),this.config.useCssFile?(this.selector.classList.add("-hidden"),this.config.rtl&&this.selector.classList.add("-rtl")):(this.selector.style.overflow="hidden",this.selector.style.direction=this.config.rtl?"rtl":"ltr"),this.sliderContainerCreate(),this.config.autoplay&&this.autoPlay(),this.config.arrows&&(this.arrowsVisibility(),this.arrowsInit()),this.config.keyboard&&this.keyboardNavigaion(),this.config.onInit.call(this)}sliderContainerCreate(){const i=this.selectorWidth/this.visibleSlides,t=this.config.loop?2*this.visibleSlides+this.innerItems.length:this.innerItems.length;this.slideItem=document.createElement("div"),this.slideItem.classList.add("expand-js--container"),this.slideItem.style.width=`${i*t}px`,this.isTransition();const e=document.createDocumentFragment();if(this.config.loop)for(let i=this.innerItems.length-this.visibleSlides;i<this.innerItems.length;i+=1){const t=this.createSliderItem(this.innerItems[i].cloneNode(!0));e.appendChild(t)}for(let i=0;i<this.innerItems.length;i+=1){const t=this.createSliderItem(this.innerItems[i]);e.appendChild(t)}if(this.config.loop)for(let i=0;i<this.visibleSlides;i+=1){const t=this.createSliderItem(this.innerItems[i].cloneNode(!0));e.appendChild(t)}this.selector.innerHTML="",this.slideItem.appendChild(e),this.selector.appendChild(this.slideItem),this.slideToCurrent()}createSliderItem(i){const t=document.createElement("div");return this.config.useCssFile?(t.classList.add("expand-js--item"),this.config.rtl?t.classList.add("f-right"):t.classList.add("f-left")):t.style.cssFloat=this.config.rtl?"right":"left",this.config.gap?t.style.width=`calc(${this.config.loop?100/(this.innerItems.length+2*this.visibleSlides):100/this.innerItems.length}% - ${this.config.gap}px)`:t.style.width=`${this.config.loop?100/(this.innerItems.length+2*this.visibleSlides):100/this.innerItems.length}%`,t.appendChild(i),t}slidesAmount(){"number"==typeof this.config.visibleSlides?this.visibleSlides=this.config.visibleSlides:"object"==typeof this.config.visibleSlides&&(this.visibleSlides=1,Object.keys(this.config.visibleSlides).forEach(i=>{window.innerWidth>=i&&(this.visibleSlides=this.config.visibleSlides[i])}))}prevSlide(i=1){if(this.innerItems.length<=this.visibleSlides)return;this.config.slidesToSlide>1&&(i=this.config.slidesToSlide);const t=this.curSlide;if(this.config.loop){if(this.curSlide-i<0){const t=this.curSlide+this.innerItems.length,e=t+this.visibleSlides,s=(this.config.rtl?1:-1)*e*(this.selectorWidth/this.visibleSlides)+(this.config.gap?this.config.gap:0),n=this.config.draggable?this.drag.endXAxis-this.drag.startXAxis:0;this.isNotTransition(),this.slideItem.style.transform=`translate3d(${s+n}px, 0, 0)`,this.curSlide=t-i}else this.curSlide-=i}else this.curSlide=Math.max(this.curSlide-i,0);t!==this.curSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this))}nextSlide(i=1){if(this.innerItems.length<=this.visibleSlides)return;this.config.slidesToSlide>1&&(i=this.config.slidesToSlide);const t=this.curSlide;if(this.config.loop){if(this.curSlide+i>this.innerItems.length-this.visibleSlides){this.isNotTransition();const t=this.curSlide-this.innerItems.length,e=t+this.visibleSlides,s=(this.config.rtl?1:-1)*e*(this.selectorWidth/this.visibleSlides)+(this.config.gap?this.config.gap:0),n=this.config.draggable?this.drag.endXAxis-this.drag.startXAxis:0;this.slideItem.style.transform=`translate3d(${s+n}px, 0, 0)`,this.curSlide=t+i}else this.curSlide+=i}else this.curSlide=Math.min(this.curSlide+i,this.innerItems.length-this.visibleSlides);t!==this.curSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this))}isNotTransition(){this.slideItem.style.webkitTransition=`all 0ms ${this.config.easeMode}`,this.slideItem.style.transition=`all 0ms ${this.config.easeMode}`}isTransition(){this.slideItem.style.webkitTransition=`all ${this.config.duration}ms ${this.config.easeMode}`,this.slideItem.style.transition=`all ${this.config.duration}ms ${this.config.easeMode}`}goToSlide(i){if(this.innerItems.length<=this.visibleSlides)return;const t=this.curSlide;this.curSlide=this.config.loop?i%this.innerItems.length:Math.min(Math.max(i,0),this.innerItems.length-this.visibleSlides),t!==this.curSlide&&(this.slideToCurrent(),this.config.onChange.call(this))}slideToCurrent(i){const t=this.config.loop?this.curSlide+this.visibleSlides:this.curSlide,e=(this.config.rtl?1:-1)*t*(this.selectorWidth/this.visibleSlides)+(this.config.gap?this.config.gap:0);i?requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.isTransition(),this.slideItem.style.transform=`translate3d(${e+this.config.gap}px, 0, 0)`})}):this.slideItem.style.transform=`translate3d(${e}px, 0, 0)`}updateAfterDrag(){const i=(this.config.rtl?-1:1)*(this.drag.endXAxis-this.drag.startXAxis),t=Math.abs(i),e=this.config.multipleDrag?Math.ceil(t/(this.selectorWidth/this.visibleSlides)):1,s=i>0&&this.curSlide-e<0,n=i<0&&this.curSlide+e>this.innerItems.length-this.visibleSlides;i>0&&t>this.config.triggerDistance&&this.innerItems.length>this.visibleSlides?this.prevSlide(e):i<0&&t>this.config.triggerDistance&&this.innerItems.length>this.visibleSlides&&this.nextSlide(e),this.slideToCurrent(s||n)}resizeHandler(){this.slidesAmount(),this.curSlide+this.visibleSlides>this.innerItems.length&&(this.curSlide=this.innerItems.length<=this.visibleSlides?0:this.innerItems.length-this.visibleSlides),this.selectorWidth=this.selector.offsetWidth,this.sliderContainerCreate(),this.arrowsVisibility(),this.arrowsInit()}stopDragging(){this.drag={startXAxis:0,endXAxis:0,startYAxis:0,dragOff:null,preventClick:this.drag.preventClick}}remove(i){const t=i<this.curSlide,e=this.curSlide+this.visibleSlides-1===i;(t||e)&&(this.curSlide-=1),this.innerItems.splice(i,1),this.sliderContainerCreate()}insert(i,t){this.innerItems.splice(t,0,i),this.sliderContainerCreate()}prepend(i){this.insert(i,0)}append(i){this.insert(i,this.innerItems.length+1)}autoPlay(){setInterval(()=>this.nextSlide(),this.config.autoplayDuration)}arrowsInit(){this.arrowsVisible>=1&&this.config.arrows&&(this.prevSelector=document.createElement("button"),this.prevSelector.setAttribute("class",this.config.prevArrowClass),this.prevSelector.innerHTML=this.config.prevArrowInner,this.selector.appendChild(this.prevSelector),this.nextSelector=document.createElement("button"),this.nextSelector.setAttribute("class",this.config.nextArrowClass),this.nextSelector.innerHTML=this.config.nextArrowInner,this.selector.appendChild(this.nextSelector),this.prevSelector.addEventListener("click",()=>this.prevSlide()),this.nextSelector.addEventListener("click",()=>this.nextSlide()))}arrowsVisibility(){"number"==typeof this.config.arrowsVisible?this.arrowsVisible=this.config.arrowsVisible:"object"==typeof this.config.arrowsVisible&&(this.arrowsVisible=1,Object.keys(this.config.arrowsVisible).forEach(i=>{window.innerWidth>=i&&(this.arrowsVisible=this.config.arrowsVisible[i])}))}keyboardNavigaion(){document.addEventListener("keydown",i=>{"ArrowLeft"===i.key&&this.prevSlide(),"ArrowRight"===i.key&&this.nextSlide()})}clickHandler(i){this.drag.preventClick&&i.preventDefault(),this.drag.preventClick=!1}mousedownHandler(i){i.preventDefault(),i.stopPropagation(),this.pointerDown=!0,this.drag.startXAxis=i.pageX}mouseupHandler(i){i.stopPropagation(),this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.isTransition(),this.drag.endXAxis&&this.updateAfterDrag(),this.stopDragging()}mousemoveHandler(i){if(i.preventDefault(),this.pointerDown){"A"===i.target.nodeName&&(this.drag.preventClick=!0),this.drag.endXAxis=i.pageX,this.selector.style.cursor="-webkit-grabbing",this.slideItem.style.webkitTransition=`all 0ms ${this.config.easeMode}`,this.slideItem.style.transition=`all 0ms ${this.config.easeMode}`;const t=(this.config.loop?this.curSlide+this.visibleSlides:this.curSlide)*(this.selectorWidth/this.visibleSlides),e=this.drag.endXAxis-this.drag.startXAxis,s=this.config.rtl?t+e+(this.config.gap?this.config.gap:0):t-e-(this.config.gap?this.config.gap:0);this.slideItem.style.transform=`translate3d(${(this.config.rtl?1:-1)*s}px, 0, 0)`}}mouseleaveHandler(i){this.pointerDown&&(this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.drag.endXAxis=i.pageX,this.drag.preventClick=!1,this.isTransition(),this.updateAfterDrag(),this.stopDragging())}touchstartHandler(i){i.stopPropagation(),this.drag.startXAxis=i.touches[0].pageX,this.drag.startYAxis=i.touches[0].pageY,this.pointerDown=!0}touchendHandler(i){i.stopPropagation(),this.pointerDown=!1,this.isTransition(),this.drag.endXAxis&&this.updateAfterDrag(),this.stopDragging()}touchmoveHandler(i){if(i.stopPropagation(),null===this.drag.dragOff&&(this.drag.dragOff=Math.abs(this.drag.startYAxis-i.touches[0].pageY)<Math.abs(this.drag.startXAxis-i.touches[0].pageX)),this.pointerDown&&this.drag.dragOff){i.preventDefault(),this.drag.endXAxis=i.touches[0].pageX,this.slideItem.style.webkitTransition=`0 all ${this.config.easeMode} `,this.slideItem.style.transition=`0 all ${this.config.easeMode} `;const t=(this.config.loop?this.curSlide+this.visibleSlides:this.curSlide)*(this.selectorWidth/this.visibleSlides),e=this.drag.endXAxis-this.drag.startXAxis,s=this.config.rtl?t+e+(this.config.gap?this.config.gap:0):t-e-(this.config.gap?this.config.gap:0);this.slideItem.style.transform=`translate3d(${(this.config.rtl?1:-1)*s}px, 0, 0)`}}destroy(i=!1){if(window.removeEventListener("resize",this.resizeHandler),this.selector.removeEventListener("click",this.clickHandler),this.selector.removeEventListener("mouseup",this.mouseupHandler),this.selector.removeEventListener("mousedown",this.mousedownHandler),this.selector.removeEventListener("mouseleave",this.mouseleaveHandler),this.selector.removeEventListener("mousemove",this.mousemoveHandler),this.selector.removeEventListener("touchstart",this.touchstartHandler),this.selector.removeEventListener("touchend",this.touchendHandler),this.selector.removeEventListener("touchmove",this.touchmoveHandler),i){const i=document.createDocumentFragment();for(let t=0;t<this.innerItems.length;t+=1)i.appendChild(this.innerItems[t]);this.selector.innerHTML="",this.selector.appendChild(i).removeAttribute("style")}}}
