function chefs(id) {

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
    
            .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed "clickSort" */
                width: 70px;
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
    
    
            .clickSort table {
                margin:auto;     /* auto makes left and right margins the same, means centered */
                margin-top: 1em; /* em means size of capital M */
                width: 40%;
            }
     </style>
      <p>
        <h1>
            Find a Chef!
        </h1>
      
        <div id="listHere" class="clickSort"></div>
      
      </p>
    `;
        document.getElementById(id).innerHTML = content;
        "use strict"; // turn off the "auto variable declaration" feature of the browser.

        // invoke ajax function to read cars.json and if the call was successful, 
        // run function processJSON, otherwise, put an error message in the DOM element 
        // that has id "listHere".
       // ajax("webAPIs/listUsersAPI.jsp", processData, "listHere");
        ajax2({
        url: "webAPIs/listUsersAPI.jsp",
                successFn: processData,
                errorId: "listHere"
        });
        function processData(obj) {


        // do some checking for database errors 
        if (obj.dbError.length > 0) {
        document.getElementById("listHere").innerHTML = obj.dbError;
                return;
        }

        // print out JS object/array that was converted from JSON data by ajax function
        console.log(list);
                // build new list as we want the fields to appear in the HTML table
                // we can decide the order we want the fields to appear (first property defined is shown first)
                // we can combine, decide to exclude etc...
                var userList = [];
                var list = [];
                list = obj.webUserList;
                // modify properties (image and price) of the array of objects so it will look 
                // better on the page.
                for (var i = 0; i < list.length; i++) {

        userList[i] = {};
                // Don't show the id (no meaningful data)
                userList[i].image = "<img  src='" + list[i].image + "'>";
                userList[i].userEmail = list[i].userEmail; // show this first
                // Don't show the password
                userList[i].birthday = list[i].birthday;
                userList[i].membershipFee = list[i].membershipFee;
                // userList[i].likes = list[i].likes;
                userList[i].role = list[i].userRoleId + " " + list[i].userRoleType;
        }

        console.log("USER LIST");
                console.log(userList);
                // Making a DOM object, nothing shows yet... 
                MakeTable(userList, "listHere", "membershipFee");
        }



}