function users(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
        <style>
           
            h1 {
                padding-top: 70px;
            }
     </style>
      <p>
        <h1>
           User Content COMING SOON !
        </h1>
      
      </p>
    `;
    document.getElementById(id).innerHTML = content;
}