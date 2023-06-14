function addJavascript(jsname){
   var th = document.getElementsByTagName("head")[0];
   var s = document.createElement('script');
   s.setAttribute('type', 'text/jvascript');
   s.setAttribute('src', jsname);
   th.appendChild(s);
}

addJavascript('session.js'); // 세션 함수
addJavascript('security.js'); // 암복호화 

class SignUp {
   constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random){
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthdayDate = birthdayDate;
      this.gender = gender;
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.classNumber = classNumber;
      this.random = random;
   }
   
   get fullName() {
      return '${this.firstName} ${this.lastName}';
   }
   set fullName(fullName){
      const [firstName, lastName] = fullName.split("");
      this.firstName = firstName;
      this.lastName = lastName;
   }
   get contaction() {
      return '${this.emailAddress} ${this.phoneNumber} ${this.random}';
   }
   set contactinfo(contactinfo) {
      const [emailAddress, phoneNumber, random] = contactinfo.split(" ");
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.random = random;
   }
}

function join(){ // 회원가입
    let form = document.querySelector("#form_main");
    let f_name = document.querySelector("#firstName");
    let l_name = document.querySelector("#lastName");
    let b_day = document.querySelector("#birthdayDate");
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress");
    let p_number = document.querySelector("#phoneNumber");
    let class_check = document.querySelector(".select form-control-lg");
    
    form.action = "../index_join.html";
    form.method = "get";
    
    if(f_name.value.length === 0 || l_name.value.length === 0 || b_day.value.length === 0 || email.value.length === 0 || p_number.value.length === 0){
        alert("회원가입 폼에 모든 정보를 입력해주세요.(성별, 분반 제외)");
    }else{
        session_join_set(); // 회원가입 용 세션 생성
        form.submit();
    }
}

function session_join_set(){ //세션 저장(객체)    
    let f_name = document.querySelector("#firstName").value;
    let l_name = document.querySelector("#lastName").value;
    let b_day = document.querySelector("#birthdayDate").value;
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress").value;
    let p_number = document.querySelector("#phoneNumber").value;
    let class_check = document.querySelector(".select form-control-lg");
    let random = new Date(); // 랜덤 타임스탬프
    
    const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
    console.log(newSignUp.fullName); // John Doe
    console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890
    
    if (sessionStorage) {
        const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encryted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}

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