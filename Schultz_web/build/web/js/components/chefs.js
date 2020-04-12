var chefs = {};
        chefs.list = function (id) {

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
                // clear out whatever may be currently in the content area
                var contentDOM = document.getElementById(id);
                contentDOM.innerHTML = "";
                ajax2({
                url: "webAPIs/listUsersAPI.jsp",
                        successFn: success,
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
                } // end process data

        function success(obj) {

        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        console.log(obj);
                if (obj.dbError.length > 0) {
        contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
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
                Utils.make({// don't need reference to this span tag...
                htmlTag: "span",
                        innerHTML: "Web User List ",
                        parent: heading
                });
                var img = Utils.make({
                htmlTag: "img",
                        parent: heading
                });
                img.src = CRUD_icons.insert;
                img.onclick = function () { // you cant pass input params directly into an event handler

                // Originally I had this line of code here:  
                //     users.insertUI(targetId);
                // And that worked (insert UI displayed and save worked), BUT, afterwards, if you tried to re-run 
                // the user list, nothing would happen -- because this would cause no change in the 
                // browser's address bar (the window.location.hash).  
                // 
                // The solution here is to invoke the user insert UI through a routing rule (since we 
                // happen to have "user register" that can be directly invoked). 
                // For "other" insert (even though you probably won't have a Nav Bar link for inserting "other", 
                // you may need to create a routing rule and invoke that similarly (from the "other" list UI).
                window.location.hash = "#/userInsert";
                };
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
                // create userList (new array of objects) to have only the desired properties of obj.webUserList. 
                // Add the properties in the order you want them to appear in the HTML table.  
                var userList = [];
                for (var i = 0; i < obj.webUserList.length; i++) {
        userList[i] = {}; // add new empty object to array

                userList[i].userCredentials = obj.webUserList[i].userEmail + "<br/> PW (to test Logon): " +
                obj.webUserList[i].userPassword;
                userList[i].image = obj.webUserList[i].image;
                userList[i].birthday = obj.webUserList[i].birthday;
                userList[i].membershipFee = obj.webUserList[i].membershipFee;
                userList[i].role = obj.webUserList[i].userRoleId + "&nbsp;" +
                obj.webUserList[i].userRoleType;
                userList[i].userId = obj.webUserList[i].webUserId;
                // Remove this once you are done debugging...
                userList[i].errorMsg = obj.webUserList[i].errorMsg;
                // *** NEW: ADD EXTRA COLUMN TO DELETE THE RECORD
                // Note: this needs the word "icon" somewhere in userList[i].delete. Otherwise, the alignTableData function 
                // of TableBuilder will try to turn the delete column (aleady an <img> tag complete with onclick function) 
                // into an <img> tag.

                // here we have single quote around the onclick function call. 
                // Inside the single quote we need to put quotes around the value of targetId (which is content). 
                // For this, we use the back tick and it works. 
                userList[i].update = "<img src='" + CRUD_icons.update + "' alt='update icon' onclick='users.updateUI(" +
                userList[i].userId + ", `" + id + "` )' />";
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
                imgWidth: "50px"
        });
        } // end of function success



        };
