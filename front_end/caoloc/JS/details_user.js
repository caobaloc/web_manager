function search() {
    var sothe = document.querySelector('input[name="input_username"]').value;
    var test = `        <thead><th>Card Number</th>
                        <th>Card Name</th>
                        <th>Create Date</th>
                        <th>Expire Date</th>
                        <th colspan=2>Function</th>
                        </thead>`
    $.ajax({
        url: 'http://localhost:8080/intern/card/search?search_data=' + sothe,
        method: 'GET',
        success: function (res) {
            if (sothe == "" || res.data.length == 0) {
                // document.querySelector(".data").innerHTML = "NOT FOUND";
                alert("Not found")
            }
            else {
                for (var i = 0; i < res.data.length; i++) {
                    test += `<tr><td>${res.data[i].card_no}</td>
                    <td>${res.data[i].card_name}</td>
                    <td>${res.data[i].create_dt}</td>
                    <td>${res.data[i].expire_dt}</td>
                    <td><input type="button" value="Active" onclick="Active()"></td>
                    <td><input type="button" value="Delete" onclick="Xoa(${res.data[i].card_no})"></td>
                    </tr>`
                    document.querySelector(".data").innerHTML = test;
                }
                // Hienthi();
            }
        },
        error: function (res) {
            document.querySelector(".data").innerHTML = "Không tìm thấy dữ liệu";
        }
    });
}
function active(b) {
    let a = document.querySelector('.active').value;
    if (a == "Active") {
        document.querySelector('.active').value = "Deactivated";
    }
    else {
        document.querySelector('.active').value = "Active";
    }
}

function create_new() {
    const regexName = /^[a-zA-Z !@#\$%\^\&*\)\(+=._-]{2,}$/g;
    const regexNumber = /^\d+$/;//^[\d+$];
    var sothe = document.querySelector('input[name="input_create_card_number"]').value;
    var tenthe = document.querySelector('input[name="input_create_card_name"]').value;
    var ngayphathanh = document.querySelector('input[name="input_create_create_date"]').value;
    var ngayhethan = document.querySelector('input[name="input_create_expire_date"]').value;
    if (regexName.test(tenthe) && regexNumber.test(sothe)) {
        $.ajax({
            url: 'http://localhost:8080/intern/card/insert',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({
                card_no: sothe,
                card_name: tenthe,
                create_dt: ngayphathanh,
                expire_dt: ngayhethan,
            }),
            success: function (res) {
                if (res.ecode == "00") {
                    alert("Success!");
                    Hienthi();
                    clearTextbox()
                }
                else {
                    alert(`Mã đã đã tồn tại`);
                }
            },
            error: function (res) {
                alert("Có lỗi xảy ra")
            },
        });
    }
    else {
        alert("Tên là chữ tiếng việt không dấu")
    }
}
function Hienthi() {
    var test = `        <thead><th>Card Number</th>
                        <th>Card Name</th>
                        <th>Create Date</th>
                        <th>Expire Date</th>
                        <th colspan=2>Function</th>
                        </thead>`
    $.ajax({
        url: 'http://localhost:8080/intern/card/search?search_data=',
        method: 'GET',
        success: function (res) {
            if (res.data == undefined) {
                alert("Không có")
            }
            else {
                for (var i = 0; i < res.data.length; i++) {

                    test += `<tr><td>${res.data[i].card_no}</td>
                    <td>${res.data[i].card_name}</td>
                    <td>${res.data[i].create_dt}</td>
                    <td>${res.data[i].expire_dt}</td>
                    <td><input type="button" value="Active" onclick="Active()"></td>
                    <td><input type="button" value="Delete" onclick="Xoa(${res.data[i].card_no})"></td>
                    </tr>`
                    document.querySelector(".data").innerHTML = test;
                }
            }
        },
        error: function (res) {
            document.querySelector(".data").innerHTML = "Không tìm thấy dữ liệu";
        }
    });
}
function Xoa(so_the) {

    // var sothe = document.querySelector('input[name="input_create_card_number"]').value;
    if (confirm("Are you sure you want to delete ?")) {
        $.ajax({
            url: 'http://localhost:8080/intern/card/delete',
            contentType: 'application/json',
            method: 'PUT',
            data: JSON.stringify({
                card_no: so_the,
            }),
            success: function (res) {
                if(res.ecode == "00")
                {
                    alert(res.edesc);
                    Hienthi();
                }
                else{
                    alert("Not found");
                }
            },
            error: function(res){
                alert.error("Error");
            }
        });
    }

}
function clearTextbox() {
    var sothe = document.querySelector('input[name="input_create_card_number"]').value = "";
    var tenthe = document.querySelector('input[name="input_create_card_name"]').value = "";
    var ngayphathanh = document.querySelector('input[name="input_create_create_date"]').value="";
    var ngayhethan = document.querySelector('input[name="input_create_expire_date"]').value="";
}
function GetNameUser(){
    var getusername = sessionStorage.getItem("username");
    document.querySelector('.name_user').innerHTML = `<b><span style="color:red" class="click_name_user" >${getusername}<span/><b/>`;
    // console.log(getusername);
}
function info_user(){
    var getusername = sessionStorage.getItem("username");
        $.ajax({
            url: 'http://localhost:8080/manager/api/v1.0/user',
            contentType: 'application/json',
            method: 'PUT',
            data: JSON.stringify({
                username: getusername,
            }),
            success: function (res) {
                if(res.ecode == "00")
                {
                   document.querySelector('.info-user-name').innerHTML=`Username: ${res.data.username} `;
                   document.querySelector('.info-full-name').innerHTML=`Fullname: ${res.data.fullName} `;
                   document.querySelector('.info-age').innerHTML=`Age: ${res.data.age} `;
                   document.querySelector('.info-gender').innerHTML=`Gender: ${res.data.gender} `;
                   document.querySelector('.info-telephone').innerHTML=`Telephone: ${res.data.telephone} `;
                   document.querySelector('.info-email').innerHTML=`Email: ${res.data.email} `;
                   document.querySelector('.fullname_user').innerHTML=`<b>${res.data.fullName}<b/>`;
                }
                else{
                    alert("Không tồn tại mã");
                }
            },
            error: function(res){
                alert("Có lỗi xảy ra");
            }
        });
}