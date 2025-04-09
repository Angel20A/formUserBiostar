const URLAPI = 'https://127.0.0.1:8443';
const instancia = axios.create({
    baseURL: URLAPI,
});

async function login(){
    const login_id = document.getElementById("login_id").value;
    const password = document.getElementById("password").value;
    console.log("entra a la función")
    try{
        console.log(login_id);
        console.log(password);
        const response = await instancia.post("/api/login", {
            "User":{
                "login_id": login_id,
                "password": password
            }
        });
        console.log(response);
        if(response.status === 200){
            alert("Login exitoso");
            // Redirigir a la página de inicio
            window.location.href = "index.html";
        }

    }catch(error){
        console.log(error);
    }
}