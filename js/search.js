document.getElementById("search_btn").addEventListener('click', search_message);

var search_array = [];

function search_message(){
   
    /*alert("검색을 수행합니다!");
    let search_str = document.querySelector("#search_txt"); // 변수에 저장
    document.getElementById("search_message").innerHTML = search_str.value; // 태그에 값 추가
    console.log(search_str.value); // 콘솔에 출력
	*/
	let search_str = document.querySelector("#search_txt");
    
	if(search_str.value.length === 0){ // 문자 길이, 엄격한 비교
		alert("검색어가 비었습니다. 입력해주세요"); 
    }
    else{
		no_str();
		/* alert("검색을 수행합니다!");
		search_array.push(search_str.value); //배열에 검색어 추가
		let text = document.getElementById("search_message").innerHTML = search_array.toString();
		document.querySelector("#form_main").submit(); */
    }
}

function no_str(){
	var str_nope = ["바보", "멍청이", "종강없음"]
	let search_str = document.querySelector("#search_txt");
	let n = "";
	
	for (let i=0; i < 3; i++){
		
		if (str_nope[i] === search_str.value){
			alert(str_nope[i] + "는 검색어로 적절하지 않습니다.");
			n = "1";
			break;
		} else{
			n = "굳";
		}
	}
	if (n === "굳"){
		alert("검색을 수행합니다!");
		search_array.push(search_str.value); //배열에 검색어 추가
		let text = document.getElementById("search_message").innerHTML = search_array.toString();
		document.querySelector("#form_main").submit();
	}
	
}