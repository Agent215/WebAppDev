<%@page import="java.util.ArrayList"%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringDataList list = new StringDataList();
    // i add a null contructor here for the string data so at least we always have empty fields
    StringData data = new StringData();
    // the array list of strings matches the webUserList object type from the 
    // string data object. This is used to pass to the jsp session
    // i tried passing the StringDatalist but this caused  
    //  a null pointer exception
    ArrayList<StringData> userList = new ArrayList();
    // set data as null to begin
    list.add(data);
    // grab log in info from URL
    String email = request.getParameter("email");
    String pass = request.getParameter("pass");
    // check if null
    if (email == null) {
        data.errorMsg = "Cannot search for user - 'URLemail' most be supplied";
    } else if (pass == null) {
        data.errorMsg = "Cannot search for user - 'URLpass' most be supplied";
    } else {

        DbConn dbc = new DbConn();
        list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (list.dbError.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call LogonFind");
            list = DbMods.LogonFind(email, pass, dbc);
            userList = list.webUserList;
            if (list.webUserList.isEmpty()) {
                data.errorMsg += "wrong credentials entered try again";
                list.add(data);
            }

        }
        // store obj userList obj into the session under name “user”. 
        //used the Array of String Data because passing the whole list caused problems.
        // The object can be retrieved later (by any page) by asking for “user” as input  
        // parameter to the session.getAttribute method.
        // if we need a new StringDataList we make an empty one then set its webUserList to be
        //equal to session.getAttribute("user")
        session.setAttribute("user", userList);
        dbc.close();
        // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());

%>