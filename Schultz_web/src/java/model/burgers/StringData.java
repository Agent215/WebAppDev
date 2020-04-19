package model.burgers;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {

    public String burgerName = "";
    public String webUserId = ""; // foreign key
    public String image = "";
    public String burgerDescription = "";
    public String userEmail = "";
    public String userPassword = "";
    public String userRoleId = "";   
    public String userRoleType = "";
    public String stars = "";

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            // plainInteger returns integer converted to string with no commas.
            this.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
            this.burgerName = FormatUtils.formatString(results.getObject("burger_name"));
            this.burgerDescription = FormatUtils.formatString(results.getObject("burger_description"));
            this.image = FormatUtils.formatString(results.getObject("image"));
            this.userEmail =  FormatUtils.formatString(results.getObject("user_email"));
            this.userRoleId =  FormatUtils.plainInteger(results.getObject("user_role_id"));
            this.userRoleType =  FormatUtils.formatString(results.getObject("user_role_type"));
            this.stars =  FormatUtils.plainInteger(results.getObject("stars"));
          
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.burgers.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.webUserId + this.burgerName + this.burgerDescription + this.stars + this.image;
        return s.length();
    }

    public String toString() {
        return "Web User Id:" + this.webUserId
                + ", Burger name: " + this.burgerName
                + ", Burger Description: " + this.burgerDescription
                + ", Image: " + this.image;
    }
}
