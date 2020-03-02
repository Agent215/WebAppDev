/*Abraham Schultz
 * 02/2/2020
 * 
 * This is a javascript module to display the burgers section
 * it contains small style to overide the main style
 * it also process JSON data in to a list that then gets
 * passed to the makeTable function.
 * 
 */
var burgers = {};
burgers.display = function (id) {

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
            #searchBar{
            
            size="4";
           
            }
    
            .clickSort td img { /* applies to any <img> tag in a <td> tag in any element classed "clickSort" */
              
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
     </style>
      <p>
        <h1>
            Find a Burger!
        </h1>
         <div id="listHere" class="clickSort"></div>
      </p>
    `;
    document.getElementById(id).innerHTML = content;



    // invoke ajax function to read cars.json and if the call was successful, 
    // run function processJSON, otherwise, put an error message in the DOM element 
    // that has id "listHere".
   // ajax("webAPIs/listBurgersAPI.jsp", processData, "listHere");
    ajax2({
        url: "webAPIs/listBurgersAPI.jsp",
        successFn: processData,
        errorId: "listHere"
    });

    function processData(obj) {




        // do some checking for database errors 
        if (obj.dbError.length > 0) {
            document.getElementById("listHere").innerHTML = obj.dbError;
            return;
        }
        console.log(obj);  // burger list as an array of objects

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var burgerList = [];
        var list = [];
        list = obj.burgerList;
        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < list.length; i++) {
            burgerList[i] = {};

            // combine the name of the burger its rating
            burgerList[i].burgerName = "<p> " + list[i].burgerName + "</p> <p>Rating: " + list[i].stars + "</p>";
            burgerList[i].image = "<img  src='" + list[i].image + "'>";
            burgerList[i].burgerDescription = list[i].burgerDescription;
            //combine the user email and type in to one column
            burgerList[i].userEmail = "<p>Email: " + list[i].userEmail + "</p> <p>User Type: " +
                    list[i].userRoleType + "</p> <p> User ID# : " +
                    list[i].webUserId + "</p>";

        }

        // Making a DOM object, nothing shows yet... 
        MakeTable(burgerList, "listHere", "likes");

    }
};