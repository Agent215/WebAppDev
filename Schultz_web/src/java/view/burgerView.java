package view;

// classes imported from java.sql.*
import model.burgers.StringDataList;
import model.burgers.StringData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// classes in my project
import dbUtils.*;

public class burgerView {

    public static StringDataList getAllUsers(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT  burger_name, burger_description, burgers.web_user_id, stars, "
                    + "burgers.image ,web_user.user_email , user_role.user_role_id, user_role.user_role_type "
                    + "FROM burgers, web_user, user_role "
                    + "WHERE web_user.web_user_id = burgers.web_user_id AND user_role.user_role_id = web_user.user_role_id "
                    + "ORDER BY burger_name;";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in burgerView.allBurgersAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
