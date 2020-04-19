var users = {};

(function () {  // This is an IIFE, an immediately executing (anonymous) function
    //alert("I am an IIFE!");


    users.list = function (targetId) {

        // clear out whatever may be currently in the content area
        var contentDOM = document.getElementById(targetId);
        var imageWidth = "200px";
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
            Find a Chef!
        </h1>
      </p>
        <div class="loaderWrapper">
          <div class="loader">
            
          </div>
          Fetching Chefs...

        </div>
    
    `;

        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        ajax2({
            url: "webAPIs/listUsersAPI.jsp",
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
                loaderWrapper[0].innerHTML = "";
                loaderWrapper[0].style.visibility = "hidden";
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
            var userList = [];
            for (var i = 0; i < obj.webUserList.length; i++) {
                userList[i] = {}; // add new empty object to array

                //check if this is a regular known image type, dont add img tag, this is done in table builder
                if (obj.webUserList[i].image.includes(".jpg") || obj.webUserList[i].image.includes(".png") || obj.webUserList[i].image.includes(".asp")) {
                    userList[i].image = obj.webUserList[i].image;
                } else {
                    //other wise wrap it in image here
                    userList[i].image = "<img width='" + imageWidth + "' src='" + obj.webUserList[i].image + "'>";

                }

                userList[i].birthday = obj.webUserList[i].birthday;
                userList[i].membershipFee = obj.webUserList[i].membershipFee;
                userList[i].role = obj.webUserList[i].userRoleId + "&nbsp;" +
                        obj.webUserList[i].userRoleType;
                userList[i].userId = obj.webUserList[i].webUserId;


                // *** NEW: ADD EXTRA COLUMN TO DELETE THE RECORD
                // Note: this needs the word "icon" somewhere in userList[i].delete. Otherwise, the alignTableData function 
                // of TableBuilder will try to turn the delete column (aleady an <img> tag complete with onclick function) 
                // into an <img> tag.

                // here we have single quote around the onclick function call. 
                // Inside the single quote we need to put quotes around the value of targetId (which is content). 
                // For this, we use the back tick and it works. 
                userList[i].update = "<img src='" + CRUD_icons.update + "' alt='update icon' onclick='users.updateUI(" +
                        userList[i].userId + ", `" + targetId + "` )' />";
                userList[i].delete = "<img src='" + CRUD_icons.delete + "' alt='delete icon' onclick='users.delete(" +
                        userList[i].userId + ",this)'  />";
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
                list: userList,
                target: tableDiv,
                style: "data",
                orderPropName: "userEmail",
                searchKeyElem: searchBox,
                reverse: false,
                imgWidth: imageWidth
            });
        } // end of function success
    }; // end of function users.list

// invoke a web API passing in userId to say which record you want to delete. 
// but also remove the row (of the clicked upon icon) from the HTML table -- if Web API sucessful... 
    users.delete = function (userId, icon) {
        if (confirm("Do you really want to delete user " + userId + "? ")) {
            console.log("icon that was passed into JS function is printed on next line");
            console.log(icon);

            ajax2({
                url: "webAPIs/deleteUserAPI.jsp?deleteId=" + userId,
                successFn: success,
                errorId: "deleteErrorMsgId"
            });

            function success(obj) {
                if (obj.errorMsg.length === 0) {
                    obj.errorMsg = "Web User " + userId + " was deleted!";

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
        var saveFn = "users.insertSave()";

        // change variables for update
        if (isUpdate) {
            webUserIdRowStyle = ""; // don't hide row with webUserId 
            saveFn = "users.updateSave()";
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
                    <tr ${webUserIdRowStyle}>
                        <td>Web User Id</td>
                        <td><input type="text"  id="webUserId" disabled /></td>
                        <td id="webUserIdError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Email Address</td>
                        <td><input type="text"  id="userEmail" /></td>
                        <td id="userEmailError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password"  id="userPassword" /></td>
                        <td id="userPasswordError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Retype Your Password</td>
                        <td><input type="password" id="userPassword2" /></td>
                        <td id="userPassword2Error" class="error"></td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td><input type="text" id="birthday" /></td>
                        <td id="birthdayError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Membership Fee</td>
                        <td><input type="text" id="membershipFee" /></td>
                        <td id="membershipFeeError" class="error"></td>
                    </tr>
        
                    <tr>
                        <td>Member Image</td>
                        <td><input type="text" id="image" /></td>
                        <td id="imageError" class="error"></td>
                    </tr>
                    <tr>
                        <td>User Role</td>
                        <td>
                            <select id="rolePickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
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

    users.updateUI = function (webUserId, targetId) {

        // This is needed to "reset" the application's perception of the "current" link. 
        // Otherwise, when the user tries to click on "user list" after doing a user list -> update
        // operation, there will be no response (because link would not change). 
        // Setting window.location.hash is like auto-clicking for the user (in code). 
        // But also in index.html, you have to add a routing rule for this link and associate 
        // it will a null function (a do nothing function) - to avoid a routing error.
        window.location.hash = "#/userUpdate";

        createInsertUpdateArea(true, targetId); // first param is isUpdate (boolean)
        ajax2({
            url: "webAPIs/getUserWithRolesAPI.jsp?id=" + webUserId,
            successFn: proceed,
            errorId: "ajaxError"
        });
        function proceed(obj) { // obj is what got JSON.parsed from Web API's output
            dbDataToUI(obj);
        }
    };

    users.insertUI = function (targetId) {

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

        var webUserObj = obj.webUser;
        var roleList = obj.roleInfo.roleList;

        document.getElementById("webUserId").value = webUserObj.webUserId;
        document.getElementById("userEmail").value = webUserObj.userEmail;
        document.getElementById("userPassword").value = webUserObj.userPassword;
        document.getElementById("userPassword2").value = webUserObj.userPassword;
        document.getElementById("birthday").value = webUserObj.birthday;
        document.getElementById("membershipFee").value = webUserObj.membershipFee;
        document.getElementById("image").value = webUserObj.image;
        console.log("selected role id is " + webUserObj.userRoleId);
        Utils.makePickList({
            id: "rolePickList", // id of <select> tag in UI
            list: roleList, // JS array that holds objects to populate the select list
            valueProp: "userRoleType", // field name of objects in list that hold the values of the options
            keyProp: "userRoleId", // field name of objects in list that hold the keys of the options
            selectedKey: webUserObj.userRoleId  // key that is to be pre-selected (optional)
        });
    }
    ;

    function getUserDataFromUI() {  // a private function

        // New code for handling role pick list.
        var ddList = document.getElementById("rolePickList");
        console.log("getUserDataFromUI");

        // create a user object from the values that the user has typed into the page.
        var userInputObj = {

            "webUserId": document.getElementById("webUserId").value,
            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "birthday": document.getElementById("birthday").value,
            "membershipFee": document.getElementById("membershipFee").value,
            "image": document.getElementById("image").value,

            "userRoleId": ddList.options[ddList.selectedIndex].value,
            "userRoleType": "",
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

        document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
        document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
        document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
        document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
        document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
        document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;
        document.getElementById("imageError").innerHTML = jsonObj.userRoleId;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }

    users.insertSave = function () {

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

    users.updateSave = function () {

        console.log("users.updateSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUserDataFromUI();

        ajax2({
            url: "webAPIs/updateUserAPI.jsp?jsonData=" + myData,
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