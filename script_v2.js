'use stric';
var wrapDom = document.getElementById('wrap');
var footDom = document.getElementById('foot');
var wheelCheck = false;
var playTime = 800;
var secCnt = 0;
var secLength = 3;
var status = 'global'; // global or section

var sec3InlineEvent = false;
var sec3Txt = document.getElementById('txt');
var sec3Cnt = 0;
var sec3MaxCnt = 3;


function wheelEvent(e){
	if(wheelCheck == false){
		wheelCheck = true;
		var delta;

		// 휠 방향 체크
		if(e.wheelDelta > 0){
			delta = 'up';
		}else{
			delta = 'down';
		}

		// 현재 상태, 전역이냐 세부 섹션이냐, 그리고 세부섹션을 설정
		if(secCnt == 2 || secCnt == 1){
			status = 'section';
		}else{
			status = 'global';
		}

		// 휠방향과 현재 상태에 따른 변동 값 적용
		function globalCount(){
			if(delta == 'up'){
				if(secCnt > 0) secCnt--;
			}else{
				if(secCnt < secLength) secCnt++;
			}
		}

		// 섹션3에 대한 이벤트
		function sec3Event(){
			var inCnt = 0;
			var intervalFn = setInterval(function(){
				sec3Txt.innerText = (sec3Cnt-1)*10 + inCnt++;
				if(inCnt == 10){
					clearInterval(intervalFn);
				}
			}, 80);
		}

		// 글로벌 스크롤 이동인 경우
		if(status == 'global'){
			globalCount();
		}
		// 세부 섹견에 대한 변동 값 & 세부 이벤트
		else{
			// 섹션 지정, 현재는 2, 3번 섹션에 대하여 지정
			switch (secCnt) {
				case 1:
					console.log('section 2');
					status = 'global';
					globalCount();
					break;
				case 2:
					if(delta == 'up'){
						if(sec3Cnt > 0){
							sec3Cnt--;
							sec3Event();
						}else{
							status = 'global';
							globalCount();
						}
					}else{
						if(sec3Cnt < sec3MaxCnt){
							sec3Cnt++;
							sec3Event();
						}else{
							status = 'global';
							globalCount();
						}
					}
					break;
			}
		}



		console.log('delta : '+delta, ', status : '+status, ', secCnt : ' + secCnt, ', sec3Cnt : '+sec3Cnt);

		// 글로벌 섹션 움직임
		if(secCnt == sec3MaxCnt){
			var footerTop = wrapDom.offsetHeight - window.innerHeight;
			wrapDom.style.top = '-' + footerTop + 'px';
		}else{
			wrapDom.style.top = '-' + secCnt * 100 + '%';
		}

		// 휠 체크
		setTimeout(function(){
			wheelCheck = false;
		}, playTime);

	}



}

wrapDom.addEventListener('wheel', wheelEvent);




