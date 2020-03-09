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
    // null constructor so we have data sections visable even if they are empty
    StringData data = new StringData();
    // add empty meta data sections to list
    list.add(data);
    //check if session is null
    if (session != null) {
        userList = (ArrayList) session.getAttribute("user");
    } else {
        System.out.println("Session is null");
    }
    // check if user list is null, if it is no one is logged in
    if (userList == null) {

        data.errorMsg += "Cannot get user - There is no user logged in";

    } else {
        // if we have a user logged in then set the list with correct user meta data
        list.webUserList = userList;
    }

    //  we now can add the userlist to the blank StringDataList to recreate the entire java Object
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();

    out.print(gson.toJson(list).trim());

%>