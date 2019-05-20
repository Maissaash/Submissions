function validate() {
    var password = document.getElementById("password").value;
    var confirmp = document.getElementById("confirmation").value;
    if (password != confirmp) {
        document.getElementById("password").style.border="1px solid red";
        document.getElementById("confirmation").style.border="1px solid red";

    }
}