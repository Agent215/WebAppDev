function blog(id) {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var content = `  
    
        <style>
            h2 {
                margin-left: 0em;
                padding-top: 0px;
            }
            h1 {
                margin-left: 0em;
                padding-top: 70px;
            }
        </style>

        <div style="margin-left:0em" ;>

            <h1>Development Blog</h1>


            <div class="row">
                <div class='column column90'>
                    <h2>HW 1 Home Page</h2>
                    <p>
                        I really don't have much experience with web development. I have some knowledge of HTML and have used CSS
                        (cascading style sheets) a little bit before. I have used tools like adobe muse to build sites, but they 
                        do not actually require any coding.
                    </p>
                    <p>
                    <p>
                        In this homework i learned how to use HTML to create the layout of a website.
                        I also learned how to use CSS to style a website. I utilized external CSS style sheets
                        in an effort to create modular code. 
                        Lastly I learned the basics of creating a responsive website that can adapt to a variety of screen sizes.
                    </p>
                    <p>
                        The parts that I found easy were using HTML to design the layout of the site. 
                    </p>
                    <p>
                        The most difficult part for me on this assignment was moving the style to an external sheet.
                        This caused some trouble for me because I sometimes had various CSS styles that interfered with each other.
                        When moved externally they did not work at first, but they had worked when I had been using inline or internal styles.
                        I also spent a good amount of time just trying to get the site to look the way I wanted, making sure everything
                        was centered ect..
                    </p>
                </div>
                <div class='stopFloat'></div>
            </div>

            <div class="row">
                <div class='column column90'>
                    <div>
                        <h2>HW 2 DB &amp; JavaScript Routing</h2>
                        <p>
                            My database experience up to this point consists of one course i took while at 
                            community college. The course focused on database design amd SQL. I designed and created 
                            my own database complete with a data dictionary for documentation. This was accomplished using a
                            mySQL shell environement and SQL commands. No gui was used in the course. 
                        </p>
                        <p>
                            In the database part of the homework I learned how to use the mySQL gui to create and edit 
                            Data tables. I leanred how to relate the tables using primary and foriegn keys.
                            I also learned how to insert data in to the tables.
                            The parts that I found easy were the creation of the tables and inserting the fake data.
                            The part that i found the most difficult was doing an SQL query where i had to join two tables together. 
                            Click <a href="docs/3308_HW2_Schultz.pdf">here</a> to see my database work.

                        </p>
                        <p>
                            In the website part of the homework I learned how to reuse portions of the User Interface 
                            with a home grown "Routing Framework". I also learned how to use internal links using HTML. I learned more
                            about how java script functions work. And learned how to debug client side code using a browsers debugger tool
                            by hitting f12. 
                            The parts that I found easy were setting up the link within the buttons. 
                            The part that I found hard or confusing was getting my routing frame work to set the correct paths. 
                        </p>  
                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>
        </p>


       

    </div>
    `;
        // get rid of burger image when we change to blog
        document.getElementById(id).innerHTML = content;
}