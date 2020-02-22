function register(id) {

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
        <h1>
            Registration Content COMING SOON !
        </h1>
      
      </p>
    `;
    document.getElementById(id).innerHTML = content;
}