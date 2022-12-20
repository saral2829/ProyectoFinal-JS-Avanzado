
const form = document.getElementById('form');
const username = document.getElementById('username');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    Validate();
})

const sendData = (usernameVal, sRate, Count) => {
    if(sRate === Count){
        swal("Hola " + usernameVal , "TU REGISTRO FUE EXITOSO", "success");
    }
}

const SuccessMsg = (usernameVal) => {
    let formContr = document.getElementsByClassName('form-control');
    var Count = formContr.length - 1;
    for(var i = 0; i < formContr.length; i++){
        if(formContr[i].className === "form-control success"){
            var sRate = 0 + i;
            console.log(sRate);
            sendData(usernameVal, sRate, Count);
        }
        else{
            return false;
        }
    }
}

const isEmail = (emailVal) =>{
    var atSymbol = emailVal.indexOf('@');
    if(atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if(dot <= atSymbol + 2) return false;
    if(dot === emailVal.length -1) return false;
    return true;
}

function Validate(){
    const usernameVal = username.value.trim();
    const fullnameVal = fullname.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();

    //username
    if(usernameVal === ""){
        setErrorMsg(username, 'El Usuario no puede estar en blanco');
    }
    else if(usernameVal.length <=2){
        setErrorMsg(username, 'min 3 char');
    }
    else{
        setSuccessMsg(username);
    }

    //last name

    if(fullnameVal === ""){
        setErrorMsg(fullname, 'Nombre completo no puede estar en blanco');
    }
    else if(fullname.length <=2){
        setErrorMsg(fullname, 'min 3 char');
    }
    else{
        setSuccessMsg(fullname);
    }

    //email
    if(emailVal === ""){
        setErrorMsg(email, 'email no puede estar en blanco');
    }
    else if(!isEmail(emailVal)){
        setErrorMsg(email, 'email es invalido');
    }
    else{
        setSuccessMsg(email);
    }

    //password
    if(passwordVal === ""){
        setErrorMsg(password, 'password no puede estar en blanco');
    }
    else if(passwordVal.length <= 7){
        setErrorMsg(password, 'min 8 char');
    }
    else{
        setSuccessMsg(password);
    }

    //confirm password
    if(cpasswordVal === ""){
        setErrorMsg(cpassword, 'confirm no puede estar en blanco');
    }
    else if(passwordVal != cpasswordVal){
        setErrorMsg(cpassword, 'Las Password no son iguales!');
    }
    else{
        setSuccessMsg(cpassword);
    }
    SuccessMsg(usernameVal);

}

function setErrorMsg(input, errormsgs){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control error";
    small.innerText = errormsgs;
}

function setSuccessMsg(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

