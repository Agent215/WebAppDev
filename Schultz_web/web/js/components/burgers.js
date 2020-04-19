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
(function () {  // This is an IIFE, an immediately executing (anonymous) function
    //alert("I am an IIFE!");


    burgers.display = function (targetId) {

        // for images within the tables
        var imageWidth = "200px";
        // clear out whatever may be currently in the content area
        var contentDOM = document.getElementById(targetId);
        contentDOM.innerHTML = "";
        contentDOM.innerHTML = `  
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
    
            .data td img { /* applies to any <img> tag in a <td> tag in any element classed "clickSort" */
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
            
          
    
            .data table {
                margin:auto;     /* auto makes left and right margins the same, means centered */
                margin-top: 1em; /* em means size of capital M */
                width: 40%;
            }
     </style>
      <p>
        <h1>
            Find a Burger!
        </h1>
        
      
      </p>
         <div class="loaderWrapper">
          <div class="loader">
            
          </div>
          Fetching Burgers...

        </div>
    `;

        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        ajax2({
            url: "webAPIs/listBurgersAPI.jsp",
            successFn: success,
            errorId: targetId
        });

        function success(obj) {

            // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
            console.log(obj);

            if (obj.dbError.length > 0) {
                contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
                var loader = document.getElementsByClassName("loader");
                loader[0].style.visibility = "hidden";
                var loaderWrapper = document.getElementsByClassName("loaderWrapper");
                loaderWrapper[0].style.visibility = "hidden";
                loaderWrapper[0].innerHTML = "";
                return;
            }

            // Want the User List UI (plus headings and search filter) all to be centered. 
            // Cannot be sure content area will be like this, so create a div inside of the 
            // content area and set the div to be aligned center (HTML table will be styled 
            // margin: auto to make it centered as well). 
            var div = Utils.make({
                htmlTag: "div",
                parent: contentDOM
            });
            div.style.textAlign = "center";

            var heading = Utils.make({
                htmlTag: "h2",
                parent: div
            });

            Utils.make({
                htmlTag: "span",
                innerHTML: " Search Filter: ",
                parent: div
            });

            var searchBox = Utils.make({
                htmlTag: "input",
                parent: div
            });
            searchBox.type = "text";
            //searchBox.setAttribute("type", "text");  // same thing...

            var deleteErrorMsg = Utils.make({
                htmlTag: "div",
                innerHTML: "",
                parent: div
            });
            deleteErrorMsg.id = "deleteErrorMsgId";

            var tableDiv = Utils.make({
                htmlTag: "div",
                parent: div
            });

            var loader = document.getElementsByClassName("loader");
            loader[0].style.visibility = "hidden";
            var loaderWrapper = document.getElementsByClassName("loaderWrapper");
            loaderWrapper[0].style.visibility = "hidden";
            loaderWrapper[0].innerHTML = "";
            // create userList (new array of objects) to have only the desired properties of obj.webUserList. 
            // Add the properties in the order you want them to appear in the HTML table.  
            var burgerList = [];
            var list = [];
            list = obj.burgerList;
            for (var i = 0; i < obj.burgerList.length; i++) {
                burgerList[i] = {}; // add new empty object to array

                burgerList[i] = {};

                // combine the name of the burger its rating
                burgerList[i].burgerName = "<p> " + list[i].burgerName + "</p> <p>Rating: " + list[i].stars + "</p>";
                //check if this is a regular known image type, dont add img tag, this is done in table builder
                if (list[i].image.includes(".jpg") || list[i].image.includes(".png") || list[i].image.includes(".asp")) {
                    burgerList[i].image = list[i].image;
                } else {
                    //other wise wrap it in image here
                    burgerList[i].image = "<img width='" + imageWidth + "' src='" + list[i].image + "'>";
                }
                burgerList[i].burgerDescription = list[i].burgerDescription;
                //combine the user email and type in to one column
                burgerList[i].userEmail = "<p>Email: " + list[i].userEmail + "</p> <p>User Type: " +
                        list[i].userRoleType + "</p> <p> User ID# : " +
                        list[i].webUserId + "</p>";



                // *** NEW: ADD EXTRA COLUMN TO DELETE THE RECORD
                // Note: this needs the word "icon" somewhere in userList[i].delete. Otherwise, the alignTableData function 
                // of TableBuilder will try to turn the delete column (aleady an <img> tag complete with onclick function) 
                // into an <img> tag.

                // here we have single quote around the onclick function call. 
                // Inside the single quote we need to put quotes around the value of targetId (which is content). 
                // For this, we use the back tick and it works. 
                burgerList[i].update = "<img src='" + CRUD_icons.update + "' alt='update icon' onclick='burgers.updateUI(`" +
                        list[i].burgerName + "`, `" + targetId + "` )' />";
                burgerList[i].delete = "<img src='" + CRUD_icons.delete + "' alt='delete icon' onclick='burgers.delete(`" +
                        list[i].burgerName + "`, this )' />";
            }

            // add click sortable HTML table to the content area

            // ********************** function tableBuilder.build ***********************************
            // params.list: an array of objects that are to be built into an HTML table.
            // params.target: reference to DOM object where HTML table is to be placed (by buildTable) -- 
            //         (this is not the id string but actual reference like you get from method getElementById()
            // params.style: will be added as className to DOM element target,
            // params.orderPropName (string): name of property (of objects in list) for iniial sort
            // params.reverse (boolean): if true, initial sort will be high to low (else low to high). 
            // params.imgWidth: any columns that hold image files will be turned into <img> tags with this width.

            tableBuilder.build({
                list: burgerList,
                target: tableDiv,
                style: "data",
                orderPropName: "burgerName",
                searchKeyElem: searchBox,
                reverse: false,
                imgWidth: imageWidth
            });
        } // end of function success
    }; // end of function users.list

// invoke a web API passing in userId to say which record you want to delete. 
// but also remove the row (of the clicked upon icon) from the HTML table -- if Web API sucessful... 
    burgers.delete = function (burgerName, icon) {
        if (confirm("Do you really want to delete burger " + burgerName + "? ")) {
            console.log("icon that was passed into JS function is printed on next line");
            console.log(icon);

            ajax2({
                url: "webAPIs/deleteBurgerAPI.jsp?deleteName=" + burgerName,
                successFn: success,
                errorId: "deleteErrorMsgId"
            });

            function success(obj) {
                if (obj.errorMsg.length === 0) {
                    obj.errorMsg = "burgerName " + burgerName + " was deleted!";

                    // icon's parent is cell whose parent is row 
                    var dataRow = icon.parentNode.parentNode;
                    var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
                    var dataTable = dataRow.parentNode;
                    dataTable.deleteRow(rowIndex);
                }
                document.getElementById("deleteErrorMsgId").innerHTML = obj.errorMsg;
            }
        }

    }; // end of users.delete

    // pull out common code (between insert UI and update UI).
    function createInsertUpdateArea(isUpdate, targetId) {

        // set variables as if it will be insert...
        var webUserIdRowStyle = ' style="display:none" '; // hide row with webUserId
        var saveFn = "burgers.insertSave()";

        // change variables for update
        if (isUpdate) {
            webUserIdRowStyle = ""; // don't hide row with webUserId 
            saveFn = "burgers.updateSave()";
        }

        var html = `
        <style>
          table {

               padding-top: 120px;
            }
        </style>
            <div id="insertArea">
                <div id="ajaxError">&nbsp;</div>
                <table>
                  
                    <tr>
                        <td>Burger Name</td>
                        <td><input type="text"  id="burgerName" disabled /></td>
                        <td id="burgerNameError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td><input type="text"  id="burgerImage" /></td>
                        <td id="burgerImageError" class="error"></td>
                    </tr>
                   
                    <tr>
                        <td>Burger Description</td>
                        <td><input type="text" id="burgerDescription" /></td>
                        <td id="burgerDescriptionError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Rating (out of 5 stars)</td>
                        <td><input type="text" id="Star" /></td>
                        <td id="StarError" class="error"></td>
                    </tr>
                   <tr>
                        <td>Web User</td>
                        <td>
                            <select id="rolePickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
                        <td id="webUserIdError" class="error"></td> 
                        <td id="userRoleIdError" class="error"></td>
                    </tr>
                    <tr>
                        <td><button onclick="${saveFn}">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        `;

        document.getElementById(targetId).innerHTML = html;
    }

    burgers.updateUI = function (burgerName, targetId) {

        // This is needed to "reset" the application's perception of the "current" link. 
        // Otherwise, when the user tries to click on "user list" after doing a user list -> update
        // operation, there will be no response (because link would not change). 
        // Setting window.location.hash is like auto-clicking for the user (in code). 
        // But also in index.html, you have to add a routing rule for this link and associate 
        // it will a null function (a do nothing function) - to avoid a routing error.
        window.location.hash = "#/burgerUpdate";

        createInsertUpdateArea(true, targetId); // first param is isUpdate (boolean)
        ajax2({
            url: "webAPIs/findBurgerByName.jsp?id=" + burgerName,
            successFn: proceed,
            errorId: "ajaxError"
        });
        function proceed(obj) { // obj is what got JSON.parsed from Web API's output
            dbDataToUI(obj);
        }
    };

    burgers.insertUI = function (targetId) {

        createInsertUpdateArea(false, targetId); // first param is isUpdate (boolean)

        ajax2({
            url: "webAPIs/getRolesAPI.jsp",
            successFn: setRolePickList,
            errorId: "userRoleIdError"
        });

        function setRolePickList(jsonObj) {

            console.log("setRolePickList was called, see next line for object holding list of roles");
            console.log(jsonObj);

            if (jsonObj.dbError.length > 0) {
                document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
                return;
            }

            Utils.makePickList({
                id: "rolePickList", // id of select tag on the page
                list: jsonObj.roleList, // JS array that holds the objects to populate the select tag
                valueProp: "userRoleType", // field name of objects in list that holds the values of the select tag options
                keyProp: "userRoleId"      // field name of objects in list that holds the keys of the options 
            });

        } // setRolePickList

    }; // users.insertUI


    function dbDataToUI(obj) {

        var burgerObj = obj.burger;
        var idList = obj.userInfo.webUserList;

        console.log("burger object to update " + burgerObj);
        document.getElementById("burgerName").value = burgerObj.burgerName;
        document.getElementById("burgerImage").value = burgerObj.image;
        document.getElementById("burgerDescription").value = burgerObj.burgerDescription;
        document.getElementById("Star").value = burgerObj.stars;
        console.log("webUserId" + burgerObj.webUserId);

        Utils.makePickList({
            id: "rolePickList", // id of <select> tag in UI
            list: idList, // JS array that holds objects to populate the select list
            valueProp: "webUserId", // field name of objects in list that hold the values of the options
            keyProp: "webUserId", // field name of objects in list that hold the keys of the options
            selectedKey: burgerObj.webUserId  // key that is to be pre-selected (optional)
        });

    }
    ;

    function getUserDataFromUI() {  // a private function

        // New code for handling role pick list.
        var ddList = document.getElementById("rolePickList");
        console.log("getUserDataFromUI");
        console.log(" value of pick list is " + ddList.options[ddList.selectedIndex].key);

        // create a user object from the values that the user has typed into the page.
        var userInputObj = {

            "webUserId": ddList.options[ddList.selectedIndex].value,
            "burgerName": document.getElementById("burgerName").value,
            "image": document.getElementById("burgerImage").value,
            "burgerDescription": document.getElementById("burgerDescription").value,
            "stars": document.getElementById("Star").value,
            "errorMsg": ""
        };

        console.log(userInputObj);

        // JSON.stringify converts a javaScript object into JSON format 
        // (like what GSON does on the server side).
        // 
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error). 
        return encodeURIComponent(JSON.stringify(userInputObj));
        //return escape(JSON.stringify(userInputObj));
    }

    function writeErrorObjToUI(jsonObj) {
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);

        document.getElementById("burgerNameError").innerHTML = jsonObj.burgerName;
        document.getElementById("webUserIdError").innerHTML = jsonObj.webUserId;
        document.getElementById("burgerImageError").innerHTML = jsonObj.image;
        document.getElementById("burgerDescriptionError").innerHTML = jsonObj.burgerDescription;
        document.getElementById("StarError").innerHTML = jsonObj.stars;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;

    }

    burgers.insertSave = function () {

        console.log("users.insertSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUserDataFromUI();

        ajax2({
            url: "webAPIs/insertUserAPI.jsp?jsonData=" + myData,
            successFn: processInsert,
            errorId: "recordError"
        });

        function processInsert(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }

            writeErrorObjToUI(jsonObj);
        }
    };

    burgers.updateSave = function () {

        console.log("users.updateSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUserDataFromUI();

        ajax2({
            url: "webAPIs/updateBurgerAPI.jsp?jsonData=" + myData,
            successFn: processUpdate,
            errorId: "recordError"
        });




        function processUpdate(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
            }

            writeErrorObjToUI(jsonObj);
        }

    };

}());  // the end of the IIFE