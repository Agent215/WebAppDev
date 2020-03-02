<%@page import="java.util.ArrayList"%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    //user object to return
    StringDataList list = new StringDataList();
    // the array of strings containing user meta data
    ArrayList<StringData> userList = new ArrayList();
    //check if session is null
    if (session != null) {
        userList = (ArrayList) session.getAttribute("user");
    } else {
        System.out.println("Session is null");
    }
    // check if user list is null, if it is no one is logged in
    if (userList == null) {
        list.dbError += "Cannot get user - There is no user logged in";
    } else {
        // do nothing
    }

    //  we now can add the userlist to the blank StringDataList to recreate the entire java Object
    list.webUserList = userList;
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();

    out.print(gson.toJson(list).trim());

%>