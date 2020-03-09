var login = {};
// Inject the UI that allows the user to type in an id and click submit.
login.LoginUI = function (targetId) {

    console.log("login.LoginUI was called");
    var contentDOM = document.getElementById(targetId);
    var content = `
        <div class='logon'>
                <br/>
                Email Address <input type="text" id="emailIn"/>
                <br/>
                Password <input type="text" id="passwordIn"/>
                <br/>
                <input type="button" value="Submit" onclick="login.logIn('emailIn', 'passwordIn', 'msgArea')"/>
                <br/> <br/>
                <div id="msgArea"></div> 
        </div>
    `;
    contentDOM.innerHTML = content;
};
// This public function of global object will be called when the user clicks the button created just above.
// This function will 
login.logIn = function (email, pass, targetId) {

    console.log("login.login was called");
    // clear out any previous values in the target area
    var targetDOM = document.getElementById(targetId);
    targetDOM.innerHTML = "";
    var desiredEmail = escape(document.getElementById(email).value);
    var desiredPass = escape(document.getElementById(pass).value);
    // the JS escape function cleans input so it can be used as a URL paramenter
    var myUrl = "webAPIs/logonAPI.jsp?email=" + desiredEmail + "&pass=" + desiredPass;
    console.log("login.logIn ready to invoke web API with this url: " + myUrl);
    // Remember: getting a DB error does NOT mean ajax call unsuccessful. That is a secondary error after ajax call OK.
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: targetId
    });
    function success(obj) {

        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            targetDOM.innerHTML += "login.logIn (success private fn): Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log("login.logIn (success private fn): the obj passed in by ajax2 is on next line.");
        console.log(obj);
        if (obj.dbError.length > 0) {
            targetDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
            //check for error message 
        } else if (obj.webUserList[0].errorMsg.length > 0) {
            targetDOM.innerHTML = obj.webUserList[0].errorMsg;
        } else {
            var msg = "Found Web User " + obj.webUserList[0].webUserId;
            msg += "<br/> &nbsp; Birthday: " + obj.webUserList[0].birthday;
            msg += "<br/> &nbsp; MembershipFee: " + obj.webUserList[0].membershipFee;
            msg += "<br/> &nbsp; User Role: " + obj.webUserList[0].userRoleId + " " + obj.webUserList[0].userRoleType;
            msg += "<br/> <img src ='" + obj.webUserList[0].image + "'>";
            targetDOM.innerHTML = msg;
        }

    } // end of function success
}; // users.findUI