function logout(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
     <style>
           
              @media screen and (max-width: 390px) 
                {
            h1 {
                text-align: center;
                padding-top: 120px;
            }}
    @media screen and (min-width: 390px) 
                {
            h1 {
                text-align: center;
                padding-top: 70px;
            }
    }
     </style>
      <p>
        <h1 id="message">
          Loading...
        </h1>
      
      </p>
    `;




    ajax2({
        url: "webAPIs/logoffAPI.jsp",
        successFn: logout,
        errorId: "message"
    });

    function logout(obj) {



        document.getElementById("message").innerHTML = "you are logged out";



    }

    document.getElementById(id).innerHTML = content;
}