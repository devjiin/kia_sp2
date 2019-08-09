var secCnt = 0;
var wheelCheck = false;
var playTime = 800;
var wrapDom = document.getElementById('wrap');
var footDom = document.getElementById('foot');
var secLength = 3;
var sec3InlineEvent = false;
var sec3Txt = document.getElementById('txt');
var sec3Cnt = 0;
var sec3MaxCnt = 3;

var status = 'section_scroll';

function wheelEvent(e){
	if(wheelCheck == false){
		wheelCheck = true;
		if(e.wheelDelta > 0){
			if(secCnt > 0)
				secCnt--;
		}else{
			if(secCnt < secLength){




				if(sec3InlineEvent == false){
					secCnt++;
					if(secCnt == 3){
						sec3InlineEvent = true;
					}	
				}else{
					sec3Cnt++;
				}
			}
		}

		if(secCnt == secLength){
			if(sec3InlineEvent == false){
				var footerTop = wrapDom.offsetHeight - window.innerHeight;
				wrapDom.style.top = '-' + footerTop + 'px';
			}else{
				if(sec3Cnt < sec3MaxCnt){
					var inCnt = 0;
					var intervalFn = setInterval(function(){
						sec3Txt.innerText = sec3Cnt +''+ inCnt++;
						if(inCnt == 10){
							clearInterval(intervalFn);
							wheelCheck = false;
						}
					}, 80);
				}else{
					sec3InlineEvent = false;
				}
				console.log('sec3Cnt : ' + sec3Cnt);
			}
		}else{
			wrapDom.style.top = '-' + secCnt * 100 + '%';
		}

		if(sec3InlineEvent == false){
			setTimeout(function(){
				wheelCheck = false;
				console.log('secCnt : ' + secCnt);
				sec3Txt.innerText = 1;
			}, playTime);	
		}

	}

}

wrapDom.addEventListener('wheel', wheelEvent);




