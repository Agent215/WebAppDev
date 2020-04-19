package model.burgers;

import dbUtils.DbConn;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringData findById(DbConn dbc, String id) {

        StringData sd = new StringData();
        try {
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND web_user_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sd = new StringData(results);
            } else {
                sd.errorMsg = "The database has no Web User Record with id " + id;
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.webUser.DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById

    // it returns an error message.
    public static String delete(String burgerName, DbConn dbc) {

        if (burgerName == null) {
            return "Error in modelBurgers.DbMods.delete: cannot delete burger record because 'burgerName' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM burgers WHERE burger_name = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, burgerName);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with burger_name " + burgerName;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.burger.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }

    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        errorMsgs.image = ValidationUtils.stringValidationMsg(inputData.image, 500, false);
        errorMsgs.stars = ValidationUtils.integerValidationMsg(inputData.stars, false);
        errorMsgs.burgerName = ValidationUtils.stringValidationMsg(inputData.burgerName, 45, true);
        errorMsgs.burgerDescription = ValidationUtils.stringValidationMsg(inputData.burgerDescription, 200, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        if (errorMsgs.stars.isEmpty()) {
            int stars = ValidationUtils.integerConversion(inputData.stars);
            if ((stars > 5) || (stars < 0)) {
                errorMsgs.stars = "star rating must be beween 1-5";
            }
        }

        return errorMsgs;
    } // validate 

    public static StringData findByName(DbConn dbc, String id) {

        StringData sd = new StringData();
        try {
            String sql = "SELECT  burger_name, burger_description, burgers.web_user_id, stars, "
                    + "burgers.image ,web_user.user_email , user_role.user_role_id, user_role.user_role_type "
                    + "FROM burgers, web_user, user_role "
                    + "WHERE web_user.web_user_id = burgers.web_user_id AND burger_name = ? "
                    + "ORDER BY burger_name;";  // you always want to order by something, not just random order.

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sd = new StringData(results);
            } else {
                sd.errorMsg = "The database has no burgers with name " + id;
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.burgers.DbMods.findByName(): " + e.getMessage();
        }
        return sd;

    } // findById

    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();

        errorMsgs = validate(inputData);

        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            String sql = "UPDATE burgers SET image=?, burger_name=?, burger_description=?, stars=? ,web_user_id = ? "
                    + " WHERE burger_name = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.image);
            pStatement.setString(2, inputData.burgerName);
            pStatement.setString(3, inputData.burgerDescription);
            pStatement.setInt(4, ValidationUtils.integerConversion(inputData.stars));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setString(6, inputData.burgerName);

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();

            //stars should be between 1-5 
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid web user id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That burger name is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

} // class
