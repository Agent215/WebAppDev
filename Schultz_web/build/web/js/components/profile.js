var profile = {};

profile.display = function (id) {

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
            #profileHere{
                text-align: center;
                padding-top: 100px;
            }
    }
     </style>
    <div id ="profileHere">
      <p>
        <h1>
            Loading...
        </h1>
      
      </p>
    </div>
    `;
    document.getElementById(id).innerHTML = content;

    // use strict to help with debugging 
    "use strict";

    // make ajax call to check if user is logged in
    ajax2({
        url: "webAPIs/getProfileAPI.jsp",
        successFn: getProfile,
        errorId: "profileHere"
    });
    // have callback success function to call if user is logged in
    function getProfile(obj) {


        //check for ajax success
        if (!obj) {
            document.getElementById("profileHere").innerHTML += "login.logIn (success private fn): Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        // do some checking for database errors 
        if (obj.dbError.length > 0) {
            document.getElementById("profileHere").innerHTML = obj.dbError;
            return;
        } else
        // do some checking for other errors 
        if (obj.webUserList[0].errorMsg.length > 0) {
            document.getElementById("profileHere").innerHTML = obj.webUserList[0].errorMsg;
            return;
        } else {
            //debugging
            console.log("profile.display (success private fn): the obj passed in by ajax2 is on next line.");
            console.log(obj);
            console.log("creating profile UI");
            var contentDOM = document.getElementById(id);
            contentDOM = "";
            var msg = "Found Web User " + obj.webUserList[0].webUserId;
            msg += "<br/> &nbsp; Birthday: " + obj.webUserList[0].birthday;
            msg += "<br/> &nbsp; MembershipFee: " + obj.webUserList[0].membershipFee;
            msg += "<br/> &nbsp; User Role: " + obj.webUserList[0].userRoleId + " " + obj.webUserList[0].userRoleType;
            msg += "<br/> <img src ='" + obj.webUserList[0].image + "'>";
            contentDOM.innerHTML = msg;
            document.getElementById("profileHere").innerHTML = msg;
           
        }



    }
}
;