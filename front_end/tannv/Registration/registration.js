function login() {
    window.location = "https://www.google.com"
}
function reset(){
    var fullname= document.getElementById('fullname').value="";
    var username = document.querySelector('input[name="username"]').value= "";
    var password = document.querySelector('input[name="password"]').value="";
    var age = document.querySelector('input[name="age"]').value="";
    // var gender = document.getElementsByName('gender').checked = false;
    var telephone = document.querySelector('input[name="telephone"]').value="";
    var email = document.querySelector('input[name="email"]').value="";
}
function register() {
    // var fullname = document.querySelector('input[name="fullname"]').value;
    var fullname= document.getElementById('fullname').value.trim();
    var username = document.querySelector('input[name="username"]').value.trim();
    var password = document.querySelector('input[name="password"]').value.trim();
    var age = document.querySelector('input[name="age"]').value.trim();
    var gender = document.getElementsByName('gender');
    var telephone = document.querySelector('input[name="telephone"]').value.trim();
    var email = document.querySelector('input[name="email"]').value.trim();
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regexName = /^[a-zA-Z !@#\$%\^\&*\)\(+=._-]{2,}$/g;
    var genders="";
    for(var i=0; i<gender.length;i++){
        if(gender[i].checked == true){
            genders +=gender[i].value;
            var check = 1;
        }
    }
    var email = document.querySelector('input[name="email"]').value;
    
    if(fullname == '' || username == "" || check !==1|| password == "" || age == ""  || telephone == "" || email =="") {
        alert( "Bạn cần phải điền tất cả các trường")
    }
    else{
        if(regexEmail.test(email))
        {
            $.ajax({
                url: 'http://localhost:8080/manager/api/v1.0/registration',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    fullName: fullname,
                    username: username,
                    password: password,
                    age: age,
                    gender: genders,
                    telephone: telephone,
                    email: email,
                }),
                success: function (res) {
                    if (res.ecode == "10") {
                        // alert(`${res.edesc}`);
                        alert("Tên tài khoản đã tồn tại")
                    }
                    else {
                        Email.send({
                            SecureToken : "17df55c5-abb1-4ca3-b2ce-1a9cdbafece7",
                            // Username : "username",
                            // Password : "athasaqvcqjkyqtb",
                            To : 'nguyenvantan230201@gmail.com',
                            From : 'nguyenvantan230201@gmail.com',
                            Subject : "Tài khoản và mật khẩu của bạn",
                            Body :"TANNGUYEN",
                        }).then(
                          message => alert(message)
                        );
                        alert("Đăng ký thành công username và password đã gửi vào email của bạn!")
                        reset();
                        
    
                    }
                },
                error: function () {
                    alert("Thất bại")
                }
            });
        }
        else{
            alert("Email không hợp lệ")
        }
        
       
    }

}
// function sendEmail() {
//     var email = document.querySelector('input[name="email"]').value;
//     Email.send({
//         SecureToken : "17df55c5-abb1-4ca3-b2ce-1a9cdbafece7",
//         Username : "username",
//         Password : "athasaqvcqjkyqtb",
//         To : 'nguyenvantan230201@gmail.com',
//         From : 'nttlinh15082001@gmail.com',
//         Subject : "Tài khoản và mật khẩu của bạn",
//         Body :"TANNGUYEN",
//     }).then(
//       message => alert(message)
//     );
    
    
    
//   }

// function sendEmail() {
//     var email = document.querySelector('input[name="email"]').value;
//     Email.send({
//         SecureToken : "17df55c5-abb1-4ca3-b2ce-1a9cdbafece7",
//         Username : "username",
//         Password : "athasaqvcqjkyqtb",
//         To : 'nguyenvantan230201@gmail.com',
//         From : 'nttlinh15082001@gmail.com',
//         Subject : "Tài khoản và mật khẩu của bạn",
//         Body :"TANNGUYEN",
//     }).then(
//       message => alert(message)
//     );
    
    
    
//   }