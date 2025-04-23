//const URLAPI = 'https://127.0.0.1:8443/api';
const URLAPI = 'http://localhost:4000';
//const URLAPI = 'https://192.168.1.8:8443/api';
const instancia = axios.create({
    baseURL: URLAPI,
});

async function login(){
    const login_id = document.getElementById("login_id").value;
    const password = document.getElementById("password").value;
    try{
        console.log(login_id);
        console.log(password);
        const response = await instancia.post("/login", {
            "User":{
                "login_id": login_id,
                "password": password
            }
        });
        console.log(response.data[0]); //Imprime la data del usuario
        console.log(response.data[1]); //Imprime el sessionId

        if(response.status === 200){
            sessionStorage.setItem("sessionId", response.data[1]);
            sessionStorage.setItem("user", JSON.stringify(response.data[0]));
            console.log(sessionStorage.getItem("sessionId"));
            getUserGroup();
            //alert("Login exitoso");
            // Redirigir a la página de inicio
            //window.location.href = "formUser.html";
        }

    }catch(error){
        console.log(error.response.data);
    }
}

async function getUserGroup(){
    try{
        const sessionId = sessionStorage.getItem("sessionId");
        const response = await instancia.get("/getUserGroup", {
        }, {
            headers:{
                'bs-session-id': sessionId
            }
        });
        console.log(response.data); //Imprime la data del usuario

        if(response.status === 200){
            alert("Login exitoso");
            // Redirigir a la página de inicio
            window.location.href = "formUser.html";
        }
    }catch(error){
        console.log(error.response.data);
    }
}

async function createUser(){
    const sessionId = sessionStorage.getItem("sessionId");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const user_id = document.getElementById("user_id").value;
    const user_group_id = document.getElementById("user_group_id").value;
    const disabled = document.getElementById("disabled").value;
    const start_datetime = document.getElementById("start_datetime").value;
    const expiry_datetime = document.getElementById("expiry_datetime").value;
    
    try{
        console.log(login_id);
        console.log(password);
        console.log(name);
        console.log(email);
        const response = await instancia.post("/createUser", {
            "User":{
                "name": name,
                "email": email
            }
        }, {
            headers: {
                'bs-session-id': sessionId
            }  
        });
        console.log(response.data); //Imprime la data del usuario

        if(response.status === 200){
            alert("Usuario creado exitosamente");
            // Redirigir a la página de inicio
            window.location.href = "formUser.html";
        }

    }catch(error){
        console.log(error.response.data);
    }
}