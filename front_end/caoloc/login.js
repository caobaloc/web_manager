//Monly110901    Caoloc2002@gmail.com caoloc2001
function logout() {
    sessionStorage.removeItem("username");
    window.location = "../caoloc/login.html";
}
function chaomung() {
    let temp = sessionStorage.getItem("username");
    document.getElementById("chaomung").innerHTML = "Welcome " + temp;
}
// function check() {
//     if (sessionStorage.getItem("username") == null || !sessionStorage.getItem("username")) {
//         window.location = "http://127.0.0.1:5500/front_end/caoloc/login.html";
//     }
// };
// function check() {
//     if (sessionStorage.getItem("username") == null || !sessionStorage.getItem("username")) {
//         window.location = "http://127.0.0.1:5500/front_end/caoloc/login.html";
//     }
// };
// alert("session: " + sessionStorage.getItem("username"));

function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    $.ajax({
        url: "http://localhost:8080/manager/api/v1.0/login",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            username: username,
            password: password
        }),
        success: function (res) {
            if (res.ecode == '00') {
                sessionStorage.setItem("username", username);
                window.location = '../caoloc/html/index.html';
                // let username = document.getElementById("username").value="2019600824";
                // document.querySelector('.name_user').innerHTML = `WELCOME ${sessionStorage.getItem("username")}`;
                $.ajax({
                    url: 'http://localhost:8080/manager/api/v1.0/user',
                    method: 'PUT',
                    data: JSON.stringify({
                        username: username,
                    }),
                    success: function (res) {
                        document.querySelector('.name_user').innerHTML = `WELCOME ${res.data.username}`;
                    },
                    error: function (res) {
                        document.querySelector(".data").innerHTML = "Không tìm thấy dữ liệu";
                    }
                });
            }
            else {
                if (username == "") {
                    document.getElementById("error1").innerHTML = "Please enter a username ";
                    document.querySelector(".notify").style.display = "block";
                } else {
                    document.querySelector(".notify").style.display = "none";
                }
                if (password == "") {
                    document.getElementById("error2").innerHTML = "Please enter a password ";
                    document.querySelector(".notify2").style.display = "block";
                } else {
                    document.querySelector(".notify2").style.display = "none";
                }
                if (res.ecode == '10') {
                    document.getElementById("error1").innerHTML = "Username is wrong";
                    document.querySelector(".notify").style.display = "block";
                    document.getElementById("error2").innerHTML = "Password is wrong";
                    document.querySelector(".notify2").style.display = "block";
                }
                else {
                    document.querySelector(".notify").style.display = "none";
                    document.querySelector(".notify2").style.display = "none";
                }
            }
        },
        error: function (res) {
            alert("Loi ket noi");
        }
    });
}
