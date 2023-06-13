function login(){
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    
    form.action = "../index_login.html";
    form.method = "get"
    
    if(id.value.length === 0 || password.value.length === 0){
        alert("아이디와 비밀번호를 모두 입력해주세요.")
    }else{
        //login_check();
		form.submit();
    }
	
}
/*
function addJavascript(jsname){
   var th = document.getElementsByTagName("head")[0];
   var s = document.createElement('script');
   s.setAttribute('type', 'text/jvascript');
   s.setAttribute('src', jsname);
   th.appendChild(s);
}

addJavascript('security.js'); // 암복호화 함수
addJavascript('session.js'); // 세션 함수
addJavascript('cookie.js'); // 쿠키 함수

function init(){
   let id = document.querySelector("#floatingInput");
   let check = document.querySelector("#idSaveCheck");
   let get_id = getCookie("id");
   
   if (get_id) {
      id.value = get_id;
      check.checked = true;
   }
   session_check(); //세션 유무 검사
}
*/
function logout(){
   //session_del(); //세션 삭제
   location.href='../index.html';
}

function get_id(){
    var getParameters = function(paramName){ // 변수 = 함수(이름)
    var returnValue; // 리턴값을 위한 변수 선언
    var url = location.href; // 현재 접속 중인 주소 정보 저장
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
        for(var i = 0; i < parameters.length; i++) { 
		    var varName = parameters[i].split('=')[0];
            
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
		    }
	    } // 2중 for문 끝
	}; // 함수 끝
	alert(getParameters('id') + '님 방갑습니다!'); // 메시지 창 출력
}

/*
function login_check() {
	var getParameters = function(paramName){ // 변수 = 함수(이름)
	var returnValue; // 리턴값을 위한 변수 선언
	var url = location.href; // 현재 접속 중인 주소 정보 저장
	var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
		for(var i = 0; i < parameters.length; i++) { 
			var varName = parameters[i].split('=')[0];

			if (varName.toUpperCase() == paramName.toUpperCase()) {
				returnValue = parameters[i].split('=')[1];
				return decodeURIComponent(returnValue);
			// 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
			}
		} // 2중 for문 끝
	};
	let id = document.querySelector("#floatingInput");
	let pass = document.querySelector("#floatingPassword");
	let form = document.querySelector("#form_main");
	var id_check = getParameters('id'); 
	var pass_check = 'pass';

	var regExp1 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
	var regExp2 = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

	var id_result = regExp1.test(id_check);
	var pass_result = regExp2.test(pass_check);
	
	
	
	if (!id_result){
		alert("제대로된 패스워드와 아이디를 입력해주세요.")
		return false;
	}
	if (!id_result){
		
		alert("제대로된 패스워드와 아이디를 입력해주세요.")
		return false;
	}
	
	else{
		form.submit();
	}
}
*/