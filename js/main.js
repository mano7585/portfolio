window.addEventListener("load", function(){
	// 1) 페이지 이동 관련
	var t=0; //윈도우의 상단 위치 변수입니다.
	var n=0; // 카테고리 번호 변수입니다.
	// var categoryFlag=false;
	var categoryList=[]; // 이동 카테고리를 넣어둘 배열입니다.
	var wrapper=document.getElementsByClassName("wrapper")[0];
	var timer; // 카테고리 활성화 스크롤 타이머입니다.
    var menuTimer; // 메뉴 활성화 관련 스크롤 타이머입니다.

    for(var i=0; i<wrapper.children.length; i++){
		if(wrapper.children[i].id == "header"){
			var header=wrapper.children[i];
			categoryList.push(header);
		}
		else if(wrapper.children[i].id == "business"){
			var business=wrapper.children[i];
			categoryList.push(business);
		}
		else if(wrapper.children[i].id == "portfolio"){
			var business=wrapper.children[i];
			categoryList.push(portfolio);
		}
		else if(wrapper.children[i].id == "culture"){
			var culture=wrapper.children[i];
			categoryList.push(culture);
		}
		else if(wrapper.children[i].id == "awards"){
			var awards=wrapper.children[i];
			categoryList.push(awards);
		}
		else if(wrapper.children[i].id == "contact"){
			var contact=wrapper.children[i];
			categoryList.push(contact);
		}
		else if(wrapper.children[i].id == "footer"){
			var footer=wrapper.children[i];
		}
	}
    categoryList[n].classList.add("active");
    
    var pcNav=document.getElementById("gnb");
	var pcNavLi=pcNav.children[0].children;
	pcNavLi[0].children[0].classList.add("on");
	var mobileNav=document.getElementById("m_gnb");
	var mobileNavLi=mobileNav.children[0].children;
    var menuZone=header.children[0];
    var topBtn=footer.children[0];
    
    window.addEventListener("scroll", scrollHandler);
	window.addEventListener("scroll", menuScrollHandler);
	
	function scrollHandler(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			categoryList[n].classList.add("active");

			if(n == 5){
				window.removeEventListener("scroll", scrollHandler);
			}
		}, 10);
	}
	scrollHandler(); // 초반에 발생될수있게 categoryList[n].classList.add("active"); 와 같은의미임.
    
    function menuScrollHandler(){
		clearTimeout(menuTimer);
		menuTimer=setTimeout(function(){
			t=window.pageYOffset;

			if(t < categoryList[1].offsetTop){
				n=0;
			}
			else if(t < categoryList[2].offsetTop){
				n=1;
			}
			else if(t < categoryList[3].offsetTop){
				n=2;
			}
			else if(t < categoryList[4].offsetTop){
				n=3;
			}
			else if(t < categoryList[5].offsetTop){
				n=4;

				if(t == (document.body.clientHeight-window.innerHeight)){
					n=5;
				} // 끝에 도달했을때
			}
			else{
				n=5;
			}

			for(var i=0; i<pcNavLi.length; i++){
				if(i == n){
					pcNavLi[i].children[0].classList.add("on");
				}
				else{
					pcNavLi[i].children[0].classList.remove("on");
				}
			}

			if(t > 100){
				menuZone.classList.add("active"); // .menu_zone.active{ position:fixed; }
				topBtn.classList.add("active"); // .top_btn.active{ right: 20px; }
			}
			else{
				menuZone.classList.remove("active");
				topBtn.classList.remove("active");
			}
		}, 10);
    }

    // 2) 탭 이동 관련
	var mobile=mobileNav.parentElement;
	var tab=mobile.nextElementSibling;
	var dim=tab.nextElementSibling;

	tab.addEventListener("click", function(e){
		e.preventDefault();
		document.body.classList.add("static");
		mobile.classList.add("active");
		tab.classList.add("active");
		dim.classList.add("active");
	});
	dim.addEventListener("click", function(e){
		document.body.classList.remove("static");
		mobile.classList.remove("active");
		tab.classList.remove("active");
		dim.classList.remove("active");
    });
    
    // 3) 클릭이동관련
	var targetArea="";
	var offsety=0;
	var targety=0;

	for(var i=0; i<pcNavLi.length; i++){
		pcNavLi[i].addEventListener("click", function(e){
			clickMoving(e);
		});
		mobileNavLi[i].addEventListener("click", function(e){
			clickMoving(e);
		});
		function clickMoving(evt){
            evt.preventDefault();
            
            if(mobile.classList.contains("active")){
                document.body.classList.remove("static");
                mobile.classList.remove("active");
                tab.classList.remove("active");
                dim.classList.remove("active");
            }
			targetArea=evt.currentTarget.children[0].getAttribute("href"); // String (찾아가면 e)
			targetArea=document.querySelector(targetArea); // Node
			offsety=window.pageYOffset; // 현재 윈도우 위치
			targety=targetArea.offsetTop; // 목표 윈도우 위치, header.offsetTop
			moveCategory(offsety, targety);
		}
	}
	function moveCategory(current, target){ // current=offsety, target=targety
		var timer=setInterval(function(){
			if(target > current){ // 밑으로 내려가는 겨우
				if(Math.abs(target-current) > 8){
					current+=8;
				}
				else{
					current=target;
					moving=false;
					clearInterval(timer);
				}
			}
			else{
				if(Math.abs(target-current) > 8){
					current-=8;
				}
				else{
					current=target;
					moving=false;
					clearInterval(timer);
				}
			}
			// window.scrollTo(0, current);

			window.scrollTo({
				top: current,
				behavior: "instant" // auto, instant, smooth
			});
		}, 1);
    }
    
    // 4) 상단 이동 관련
	// var topBtn=footer.children[0];

	topBtn.addEventListener("click", function(e){
		e.preventDefault();
		offsety=window.pageYOffset;
		targety=0;
		moveCategory(offsety, targety);
	});
    
    // 5) 화면크기 조정관련
	var w;
	var h;

	window.addEventListener("resize", resizeHandler);

	function resizeHandler(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			w=window.innerWidth;

			if(w > 720){
				if(mobile.classList.contains("active")){
					document.body.classList.remove("static");
					mobile.classList.remove("active");
					tab.classList.remove("active");
					dim.classList.remove("active");
				}
			}
		}, 10);
	}
    resizeHandler();
    
});