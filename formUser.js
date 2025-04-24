//const URLAPI = 'https://127.0.0.1:8443/api';
const URLAPI = 'http://localhost:4000';
//const URLAPI = 'https://192.168.1.8:8443/api';
const instancia = axios.create({
    baseURL: URLAPI,
});

async function getUserGroup(){
    try{
        const sessionId = sessionStorage.getItem("sessionId");
        //console.log(sessionId);
        const response = await instancia.get("/getUserGroup", {
            headers:{
                "accept": "application/json",
                "bs-session-id": sessionId,
                "Content-Type": "application/json"
            }
        });
        console.log(response.data); //Imprime la data del usuario
        
        if(response.status === 200){
            //alert("Login exitoso");
            //console.log(response.data.UserGroupCollection.rows[2]);
            const element = document.getElementById("user_group_id");

            const userGroup = response.data.UserGroupCollection.rows;
            for(let i = 0; i < userGroup.length; i++){
                console.log((i+1)+  ". " + userGroup[i].name);
                const option = document.createElement("option");
                option.value = userGroup[i].id;
                option.text = userGroup[i].name;

                element.appendChild(option);
            }
        }
    }catch(error){
        console.log(error.response.data);
    }
}
window.onload = getUserGroup();

async function createUser(){
    const sessionId = sessionStorage.getItem("sessionId");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const user_id = document.getElementById("user_id").value;
    const user_group_id = document.getElementById("user_group_id").value;
    const disabled = document.getElementById("disabled").value;
    const start_datetime = document.getElementById("start_datetime").value + "T00:00:00.00Z";
    const expiry_datetime = document.getElementById("expiry_datetime").value + "T23:59:00.00Z";
    
    const span = document.getElementById("span-user");
    span.innerHTML = ""; //Limpiar el span de error
    try{
        if(name != "" && email != "" && phone != "" && user_id != "" && user_group_id != "Selecciona un grupo" && disabled != "Selecciona una opcion" && start_datetime != "T00:00:00.00Z" && expiry_datetime != "T23:59:00.00Z"){
            console.log(name);
            console.log(email);
            console.log(phone);
            console.log(user_id);
            console.log(user_group_id);
            console.log(disabled);
            console.log(start_datetime);
            console.log(expiry_datetime);
            
            const response = await instancia.post("/createUser", {
                "User": {
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "user_id": user_id,
                    "user_group_id": {
                        "id": user_group_id
                    },
                    "disabled": disabled,
                    "start_datetime": start_datetime,
                    "expiry_datetime": expiry_datetime
                }
            }, {
                headers: {
                    'bs-session-id': sessionId
                }  
            });
    
            if(response.status === 200){
                console.log(response.data); //Imprime la data del usuario
                alert("Usuario creado exitosamente");
                // Redirigir a la página de inicio
                //window.location.href = "formUser.html";
            }
        }else{
            span.innerHTML = "Error: Todos los campos son obligatorios";
            console.log("Error: Todos los campos son obligatorios");
        }
    }catch(error){
        console.log(error.response.data);
        const span = document.getElementById("span-user");
        span.innerHTML = "Error: " + error.response.data.Response.message;
    }
}

async function getUser(){
    const sessionId = sessionStorage.getItem("sessionId");
    const userId = document.getElementById("id");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const user_id = document.getElementById("user_id");
    const user_group_id = document.getElementById("user_group_id");
    const disabled = document.getElementById("disabled");
    const start_datetime = document.getElementById("start_datetime");
    const expiry_datetime = document.getElementById("expiry_datetime");
    
    const span = document.getElementById("span-user");
    span.innerHTML = ""; //Limpiar el span de error
    
    try{
        if(userId.value != ""){
            const response = await instancia.get("/getUser/" + userId.value, {
                headers:{
                    "bs-session-id": sessionId
                }
            })
            console.log(response.data); //Imprime la data del usuario
            if(response.status === 200){
                name.value = response.data.User.name;
                email.value = response.data.User.email;
                phone.value = response.data.User.phone;

                user_id.value = response.data.User.user_id;
                user_id.disabled = true; //Deshabilitar el campo user_id

                user_group_id.value = response.data.User.user_group_id.id;
                disabled.value = response.data.User.disabled;
                start_datetime.value = response.data.User.start_datetime.split("T")[0];
                expiry_datetime.value = response.data.User.expiry_datetime.split("T")[0];

                userId.value = "";
            }
        }else{
            name.value = "";
            email.value = "";
            phone.value = "";

            user_id.value = "";
            user_id.disabled = false; //Deshabilitar el campo user_id
            
            user_group_id.value = "Selecciona un grupo";
            disabled.value = "Selecciona una opcion";
            start_datetime.value = "";
            expiry_datetime.value = "";
        }
    }catch(error){
        console.log(error.response.data);
        span.innerHTML = "Error: " + error.response.data.Response.message;
    }
}

async function updateUser(){
    const sessionId = sessionStorage.getItem("sessionId");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const user_id = document.getElementById("user_id");
    const user_group_id = document.getElementById("user_group_id");
    const disabled = document.getElementById("disabled");
    const start_datetime = document.getElementById("start_datetime");
    const expiry_datetime = document.getElementById("expiry_datetime");

    const span = document.getElementById("span-user");
    span.innerHTML = ""; //Limpiar el span de error

    try{
        if(name.value != "" && email.value != "" && phone.value != "" && user_id.value != "" && user_group_id.value != "Selecciona un grupo" && disabled.value != "Selecciona una opcion" && start_datetime.value != "" && expiry_datetime.value != ""){
            const response = await instancia.put("/updateUser/" + user_id.value, {
                "User": {
                    "name": name.value,
                    "email": email.value,
                    "phone": phone.value,
                    "user_id": user_id.value,
                    "user_group_id": {
                        "id": user_group_id.value
                    },
                    "disabled": disabled.value,
                    "start_datetime": start_datetime.value + "T00:00:00.00Z",
                    "expiry_datetime": expiry_datetime.value + "T23:59:00.00Z"
                }
            }, {
                headers: {
                    'bs-session-id': sessionId
                }  
            });
    
            if(response.status === 200){
                console.log(response.data); //Imprime la data del usuario
                alert("Usuario actualizado exitosamente");
    
                name.value = "";
                email.value = "";
                phone.value = "";
                user_id.value = "";
    
                user_group_id.value = "Selecciona un grupo";
                user_id.disabled = false; //Deshabilitar el campo user_id
    
                disabled.value = "Selecciona una opcion";
                start_datetime.value = "";
                expiry_datetime.value = "";
            }
        }else{
            span.innerHTML = "Error: Todos los campos son obligatorios";
            console.log("Error: Todos los campos son obligatorios");
        }
        
    }catch(error){
        console.log(error.response.data);
        span.innerHTML = "Error: " + error.response.data.Response.message;
    }
}

async function deleteUser(){
    const sessionId = sessionStorage.getItem("sessionId");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const user_id = document.getElementById("user_id");
    const user_group_id = document.getElementById("user_group_id");
    const disabled = document.getElementById("disabled");
    const start_datetime = document.getElementById("start_datetime");
    const expiry_datetime = document.getElementById("expiry_datetime");

    const span = document.getElementById("span-user");
    span.innerHTML = ""; //Limpiar el span de error

    try{
        if(user_id.value != "" && user_group_id.value != "Selecciona un grupo"){
            const response = await instancia.delete("/deleteUser/" + user_id.value + "/" + user_group_id.value, {
                headers: {
                    'bs-session-id': sessionId
                }  
            });
    
            if(response.status === 200){
                console.log(response.data); //Imprime la data del usuario
                alert("Usuario eliminado exitosamente");
    
                name.value = "";
                email.value = "";
                phone.value = "";
                user_id.value = "";
    
                user_group_id.value = "Selecciona un grupo";
                user_id.disabled = false; //Deshabilitar el campo user_id
    
                disabled.value = "Selecciona una opcion";
                start_datetime.value = "";
                expiry_datetime.value = "";
            }
        }else{
            span.innerHTML = "Error: ID de usuario o Grupo de usuario están vacíos.";
            console.log("Error: ID de usuario o Grupo de usuario están vacíos.");
        }
    }catch(error){
        console.log(error.response.data);
        span.innerHTML = "Error: " + error.response.data.Response.message;
    }
}