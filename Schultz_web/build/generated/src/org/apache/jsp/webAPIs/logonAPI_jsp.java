package org.apache.jsp.webAPIs;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.ArrayList;
import dbUtils.*;
import model.webUser.*;
import view.WebUserView;
import com.google.gson.*;

public final class logonAPI_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("application/json; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write(" \n");
      out.write("\n");
      out.write("\n");
      out.write(" \n");
      out.write(" \n");
      out.write("\n");
      out.write("\n");


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
        list.dbError = "Cannot search for user - 'URLemail' most be supplied";
    } else if (pass == null) {
        list.dbError = "Cannot search for user - 'URLpass' most be supplied";
    } else {

        DbConn dbc = new DbConn();
        list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (list.dbError.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call LogonFind");
            list = DbMods.LogonFind(email, pass, dbc);
            userList = list.webUserList;
            if (list.webUserList.isEmpty()) {
                list.dbError += "wrong credentials entered try again";
                //list.add(data);
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


    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
