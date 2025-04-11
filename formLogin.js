//const URLAPI = 'https://127.0.0.1:8443/api';
const URLAPI = 'http://localhost:4000';
//const URLAPI = 'https://192.168.1.8:8443/api';
const instancia = axios.create({
    baseURL: URLAPI,
});

async function login(){
    const login_id = document.getElementById("login_id").value;
    const password = document.getElementById("password").value;
    console.log("entra a la función");
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
            alert("Login exitoso");
            sessionStorage.setItem("sessionId", response.data[1]);
            sessionStorage.setItem("user", JSON.stringify(response.data[0]));
            // Redirigir a la página de inicio
            window.location.href = "formUser.html";
        }

    }catch(error){
        console.log(error);
    }
}