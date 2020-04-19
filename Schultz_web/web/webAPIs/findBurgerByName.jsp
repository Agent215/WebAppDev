<%@page import="view.webIdView"%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.burgers.*" %> 
<%@page language="java" import="view.burgerView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringData list = new StringData();
    BurgersWithID burgersWithId = new BurgersWithID();

    DbConn dbc = new DbConn();
    list.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

    String searchId = request.getParameter("id");
    if (searchId == null) {
       burgersWithId.burger.errorMsg  = "Cannot search for burger - 'name' most be supplied";
    } else {
        if ( burgersWithId.burger.errorMsg.length()  == 0) { // if got good DB connection,

            System.out.println("*** Ready to call findBurgerByName");
            list = DbMods.findByName(dbc ,searchId);
            
            System.out.println("*** Ready to call allUsersAPI");
            burgersWithId.burger = DbMods.findByName(dbc ,searchId);
            
            burgersWithId.userInfo = webIdView.getAllwebUserID(dbc);
        
        
        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.

        // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
        Gson gson = new Gson();
        out.print(gson.toJson(burgersWithId).trim());
    }
%>