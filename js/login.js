function login(){
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");
    
    form.action = "../index_login.html";
    form.method = "get"
    
   if(check.checked ==true){ //아이디 체크 o
      alert("쿠키를 저장합니다.");
      setCookie("id", id.value, 1); //1을 저장
      alert("쿠키 값: " + id.value);
   }
   else { //아이디 체크 x
      setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
   }
   
    if(id.value.length === 0 || password.value.length === 0){
        alert("아이디와 비밀번호를 모두 입력해주세요.")
    }else{
      	session_set();
        //login_check();
      
      // 10초 후에 자동 로그아웃
   

		form.submit();
		setTimeout(function () {
		  logout();
		  location.href = '/index.html'; // 메인 페이지로 이동
		}, 10000);
  	}
}

function logout(){
   session_del(); //세션 삭제
   location.href='../index.html';
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
*/
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


function login_check() {
	let id = document.querySelector("#floatingInput");
	let pass = document.querySelector("#floatingPassword");
	let form = document.querySelector("#form_main");
	
	form.action = "../index_login.html";
    form.method = "get"
	
	var regExp1 = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	var regExp2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

	var id_result = regExp1.test(id);
	var pass_result = regExp2.test(pass);
	
	
	if (id !== id_result || pass !== pass_result){
		alert("제대로된 패스워드와 아이디를 입력해주세요.")
	}
	
	else{
		if(check.checked == true){ //아이디 체크 o
			alert("쿠키를 저장합니다.");
			setCookie("id", id.value, 1); //1을 저장
			alert("쿠키 값: " + id.value);
		}
		else { //아이디 체크 x
			setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
		}
		session_set();
		form.submit();
	}
}

//내가 만든 쿠키~~

function login_count(name, value, expiredays){
	var date = new Date();
	date.setDate(date.getDate() + expiredays); //expitrdays는 기본적으로 24시간 설정
	
	
}

function setCookie(name, value, expiredays) {
	var date = new Date();
	date.setDate(date.getDate() + expiredays); //expitrdays는 기본적으로 24시간 설정
	document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "SameSite=None; Secure";
}

/*
function login_count(){
	var date = new Date();
	date.setDate(date.getDate() + expiredays); //expitrdays는 기본적으로 24시간 설정
	document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "SameSite=None; Secure";
}
*/

function getCookie(name){
   var cookie = document.cookie;
   console.log("쿠키를 요청합니다.");
   if(cookie != ""){
      var cookie_array = cookie.split("; ");
      for(var index in cookie_array) {
         var cookie_name = cookie_array[index].split("=");
         
         if (cookie_name[0] == "id") {
            return cookie_name[1];
         }
      }
   }
   return;
}

function deleteCookie(cookieName){
   var expireDate = new Date();
   expireDate.setDate(expireDate.getDate() - 1);
   document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function init(){ //로그인 폼에 쿠키에서 가져온 아이디 입력
	let id = document.querySelector("#floatingInput");
	let check = document.querySelector("#idSaveCheck");
	let get_id = getCookie("id");
	
	if(get_id){
		id.value = get_id;
		check.checked = true;
	}
	session_check(); //세션 유무 검사
}


// 세션
/*
function session_set(){ //세션 저장(객체)
   let f_name = document.querySelector("#firstName").value;
   let l_name = document.querySelector("#lastName").value;
   let b_day = document.querySelector("#birthdayDate").value;
   let gender = document.querySelector("#inlineRadioOptions").value;
   let email = document.querySelector("emailAddress").value;
   let p_number = document.querySelector("phoneNumber").value;
   let class_check = document.querySelector(".selector form-control-lg");
   let random = new Date(); // 랜덤 타임스탬프
   
   const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
   console.log(newSignUp.fullName); // John Doe 타임스탬프
   console.log(newSignUp.contactInfo); //Johndoe@email.com
   
   if (sessionStorage){
      const objString = JSON.stringify(newSignUp); //객체 -> JSON 문자열 반환
      let en_text = encrypt_text(objString); //암호화
      sessionStorage.setItem("Session_Storage_object", objString);
      sessionStorage.setItem("Session_Storage_encrypted", en_text);
   }
   else {
      alert("로컬 스토리지 지원 x");
   }
}
*/


function session_set() {
   let id = document.querySelector("#floatingInput");
   let password = document.querySelector("#floatingPassword");
   if (sessionStorage){
      let en_text = encrypt_text(password.value);
	  //en_text = password.value;
      sessionStorage.setItem("Session_Storage_test", en_text);
   }
   else{
      alert("로컬 스토리지 지원 x");
   }
}

/*
function session_get(){ //세션 읽기
   if (sessionStorage){
      return sessionStorage.getItem("Session_Storage_encrypted");
   }
   else {
      alert("세션 스토리지 지원 x");
   }
}
*/

function session_check() {
   if (sessionStorage.getItem("Session_Storage_encypted")){
      alert("이미 로그인 되었습니다.");
      location.href = "../index_login.html"; //로그인된 페이지로 이동
   }
}

function session_del(){
   //Check if the sessionStorage object exists
   if (sessionStorage) {
      //Retrieve data
      sessionStorage.removeItem("Session_Storage_test");
      alert('로그아웃 버튼 클릭 확인: 세션 스토리지를 삭제합니다.');
   }
   else {
      alert("세션 스토리지 지원 x");
   }
}

//암호화 복호화

function encodeByAES256(key, data){
   const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(""),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
   });
   return cipher.toString();
};

function decodeByAES256(key, data){
   const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(""),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
   });
   return cipher.toString(CryptoJS.enc.Utf8);
};


function encrypt_text(password){
   const k = "key"; //클라이언트 키
   const rk = k.padEnd(32, ""); //AES256은 key 길이가 32
   const b = password;
   const eb = this.encodeByAES256(rk, b);
   return eb;
   console.log(eb);
}

function decrypt_text(password){
   const k = "key"; //서버의 키
   const rk = k.padEnd(32, ""); //AES256은 key 길이가 32
   const eb = session_get();
   const b = this.decodeByAES256(rk, eb);
   console.log(b);
}