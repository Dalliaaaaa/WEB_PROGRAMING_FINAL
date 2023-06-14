var logoutUser = false; // 기본 로그아웃 상태는 비활성화
var timeoutHnd = null;
var logoutTimeInterval = 1000; // 1 = 1분, 0.5 = 30초 시간 설정

function onuser_activite() { // 시간 리셋
    if (logoutUser) {
        ;
    } else {
        ResetLogOutTimer();
    }
}

function OnTimeoutReached() { // 설정 시간이 되면
    logoutUser = true;
    alert(" 세션의 지속 시간은 5분 입니다. 만료되면 자동 로그아웃됩니다. !");
    session_del(); // 세션 삭제.
   	window.location.href = "index.html"; // 메인 페이지로 이동
    }

function ResetLogOutTimer() { // 시간 타이머 리셋
	
   clearTimeout(timeoutHnd);
    // set new timer
    timeoutHnd = setTimeout('OnTimeoutReached();', logoutTimeInterval);
    //document.body.onclick = onuser_activite(); //클릭 감지
    //timeoutHnd = setTimeout('OnTimeoutReached();', logoutTimeInterval);
}
//세션 삭제
function session_del() {
    // Check if the sessionStorage object exists
    if (sessionStorage) {
        // Retrieve data
        sessionStorage.removeItem("Session_Storage_test");
        alert('세션 만료 확인! : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}