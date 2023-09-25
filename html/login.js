function resetClass(element, className){
    element.classList.remove(className);
}

// 회원가입 네비게이터를 눌렀을 때

document.getElementsByClassName("show-signup")[0].addEventListener("click", function(){
    let form = document.getElementsByClassName("form")[0];
    resetClass(form, "signin");
    form.classList.add("signup");
    document.getElementById("submit-btn").innerText = "가입";
});


// 로그인 네비게이터를 눌렀을 때

document.getElementsByClassName("show-signin")[0].addEventListener("click", function(){
    let form = document.getElementsByClassName("form")[0];
    resetClass(form, "signup");
    form.classList.add("signin");
    document.getElementById("submit-btn").innerText = "로그인";
})