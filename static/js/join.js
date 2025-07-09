let isIdAvailable = false;

//아이디가 중복된 아이디인지를 확인하는 함수임
function checkIdDuplicate(){
    let user_id = $("#new-id-check-btn").val()

    $.ajax({
        type:'POST',
        url:"/checkid",
        
        data:{id:user_id},
        success:function(response){
            if (response.result === 'success') {
                alert("response.msg");
                isIdAvailable = true;
            } else {
                alert("response.msg");
                isIdAvailable = false;
            }
        }

    })
}
//회원가입을 위한 함수
//아이디 중복 체크를 통과해야 하며
//비밀번호 체크 여부가 확인되어야 서버에 정보를 전송함
function postMember() {
    let new_name = $("#new-name").val();
    let new_id = $("#new-id").val();
    let new_password = $("#new-password").val();
    let check_password = $("#new-password-check").val();
    let new_github = $("#new-github").val();


    if (!isIdAvailable) {
        alert("아이디 중복 체크를 먼저 해주세요!");
        return;
    }


    if (new_password !== check_password) {
        alert("비밀번호가 일치하지 않습니다!");
        return;
}

    
    $.ajax({
        type: 'POST',
        url: "/signup",
        data: {
            name: new_name,
            id: new_id,
            pw: new_password,
            id_github: new_github
        },
        success: function (response) {
            if (response.result === 'success') {
                alert("회원가입 성공!");
                location.href = "login.html";
            } else {
                alert("회원가입 실패");
            }
        }
    });
}

function loginSuccess(){
    let user_id = $("#user-id").val()
    let user_password = $("#user-password").val()

    $.ajax({
        type:'POST',
        url:"/login",
        data:{id:user_id , pw:user_password},
        success:function(response){
            if (response.result === 'success') {
                alert("로그인 성공🔥!");   
                location.href = "main.html";
            } else {
                alert("로그인 실패");        
            }
        },
        complete: function (xhr) {
            const token = xhr.getResponseHeader('Authorization');
            if (token) {
                localStorage.setItem('jwt_token', token);
            }
        }
    });
}




