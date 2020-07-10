$(document).ready(() => {
    console.log("Tabby says, 'Welcome to my errors: '");
    let registerLink = $("#registerLink");
    let registerCard = $(".register");
    let logInLink = $("#logInLink");
    let logInCard = $(".login");

    registerCard.hide();

    registerLink.on("click", event => {
        event.preventDefault();
        registerCard.show();
        logInCard.hide();
    });

    logInLink.on("click", event => {
        event.preventDefault();
        logInCard.show();
        registerCard.hide();
    });
    
    
    
    $("#loginBtn").on("click", event => {
        event.preventDefault();
        let user = {
            username: $("#username1").val().trim(),
            password: $("#password1").val().trim()
        }

        if (user.username.length < 1 && user.password.length < 1){
            alert("oops! you forgot to enter your username and/or password")
        } else {

                $.post("/users/login", user).then((data)=> {
                    if (data === "0"){
                        alert("oopsie wrong username and/or password o_0");
                    } else {
                        let info = {user: user.username, key: Math.random()};
                        sessionStorage.setItem('user', user.username);
                        sessionStorage.setItem('credentials', JSON.stringify(info));
                        location.href="/post";
                    }

                });
        };
        $("#login")[0].reset();
    });

    $("#registerBtn").on("click", event => {
        event.preventDefault();
        let newUser = {
            username: $("#username2").val().trim(),
            password: $("#password2").val().trim()
        }
        if(newUser.username === "" && newUser.password === "") {
            alert("no username and/or password");
        }else {
            $.get("/users/" + newUser.username, (data) => {
                console.log(data);
                if(data) {
                    alert("!username taken!")
                } else{
                    console.log("username available")
                    $.post("/users", newUser).then(() => {
                        alert("registration successful");
                        location.reload();
                    });
                }
                // for( let i = 0; i < data.length; i++){
                //     if(data[i].username.includes(newUser.username)){
                //         console.log("username taken");
                //     } else{
                //         console.log("username available");
    
                        // $.post("/users", newUser).then(() => {
                        //     alert("registration successful");
                        //     location.reload();
                        // });
                //     }
                // }

            }); 
        }

    });

    
    $("#logOutLink").click(() => {
        sessionStorage.removeItem("credentials");
        sessionStorage.removeItem("user");
    });

});