<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    //reset any session variables 
    // this is used to log the user off.
    session.invalidate();
    Gson gson = new Gson();
    System.out.println("session attributes invalidated - logging all users off");
    out.print(gson.toJson("session attributes invalidated - logging all users off").trim());
%>