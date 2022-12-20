let btn= document.getElementById('iniciar');
let username=document.getElementById('username');
let password =document.getElementById('password');
let form = document.getElementById('form');

btn.addEventListener('click', function(evt){
    if(password.value === ''){
        
        console.log('el campo contraseña es obligatorio')
        evt.preventDefault();
        return false;
    
    }else if(username.value === ''){
    
    console.log('el campo de usuario es obligatorio')
        evt.preventDefault();
        return false;
    
    }else if(username.value.length > 30){
    
      console.log('El nombre del usuario es demasiado largo')
        evt.preventDefault();
        return false;
    
    }
})