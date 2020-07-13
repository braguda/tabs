$(document).ready(() => {
    var user = sessionStorage.getItem("user");
    var credentials = JSON.parse(sessionStorage.getItem("credentials"));
  
    if (credentials === null) {
      $("#yourPosts").hide();
      $("#postBtn").on("click", (event) => {
        event.preventDefault();
        alert("register or log in to post to tabby ^-^");
      });
    } else {
          $.get("/posts/" + user, (data) => {
            for (let i = 0; i < data.length; i++){
              if (data[i].username === user){
                let row = $("<div>");
                row.append("<p>" + data[i].body + "<p>");
                row.append(
                  "<p>✎ Written on " +
                  moment(data[i].created_at).format("h:mma on dddd") +
                  " ✎</p>"
                );
                row.append(
                  "<button class='delete-button' id='deleteBtn'>Delete</button>"
                );
                $("#yourPosts").prepend(row);
                $("#deleteBtn").click(() => {
                  let postIndex = data.indexOf(data[i]);
                  console.log(postIndex + " clicked for delete.");
                  $.ajax({
                    url: "/posts/" + postIndex,
                    type: "DELETE",
                    data: postIndex,
                  })
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((err) => {
                      throw err;  
                    });
                  location.reload();
                  });
              }
            }

          });
  
          $("#postBtn").on("click", (event) => {
          event.preventDefault();
          let body = $(".post-write").val().trim();
          let username = user;
          let newPost = {
              username: username,
              body: $("#postWrite").val().trim(),
              created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          };
          if (body.length < 1) {
              alert("scribble something down first ^-^");
          } else {
              $.post("/posts", newPost).then(() => {
              });
              $("#postForm")[0].reset();
              location.reload();
            }
          });
    }
  
    $("#logOutLink").click(() => {
      sessionStorage.removeItem("credentials");
      sessionStorage.removeItem("user");
    });
  });
  