function blog(id) {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var content = `  
    
        <style>
    
    
       @media screen and (max-width: 390px) 
                {
            h1 {
                text-align: left;
                padding-top: 120px;
            }}
    @media screen and (min-width: 390px) 
                {
            h1 {
                text-align: left;
                padding-top: 70px;
            }
    }
            h2 {
                margin-left: 0em;
                padding-top: 0px;
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
    
     <div class="row">
                <div class='column column90'>
                    <div>
                         <h2>HW 3 Display Data</h2>
                        <p>
                            In this homework I learned about JSON and AJAX. JSON (JavaScript Object Notation)
                             is an important part of a web developers toolkit because it offers a way to send data in an easy to read and easy to parse format.
                             It looks very much like javascript objects so that makes it easy for a javascript programer
                             to understand how they work. And That also enables easy parsing into javascript objects which can then be used like regular arrays of objects. 
                        </p>
                        <p>
                         AJAX (asynchronous JavaScript and XML) is great because it allows developers to call data from sources
                         without having to reload the entire page. You can make an AJAX call and have the rest of the site still operating
                         like normal while the component that needs the data waits.
                        </p>
                        <p>
                        The parts i found easy were setting up the JSON file with data. Also making the basic table was pretty simple.
                        The hardest part was getting the click sorting and sort by filtered search to work together correctly. I also 
                        found the part where i had to combine the various JSON fields into one data element on the table confusing. 
                        I was unsure how to make sure that the individual columns for each data table were not duplicated.
                        I eventually figured it by careful inspection of the routing example 18.
                        </p>
                        <p>
                        To see the data displayed, click the menu items under the search icon 
                        in the navigation bar. Later in the semester these links will show live data 
                        from my database, but for now, they just show data from a hard coded JSON file.
                        </p>

                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>
        

<div class="row">
                <div class='column column90'>
                    <div>
                         <h2>HW 4 Tutorial Proposal</h2>
                        <p>
                            In this homework i learned about a few neat effects from W3Schools how to page
                            I learned how to create using css and javascript a cool flip card effect.
                            I also learned how to create an typewriter animation effect using javascript.
                            Lastly i learned how to create cool looking rating stars using HTML and css links.
                        </p>
                        <p>
                        
                        </p>
                        <p>
                            The easy part was choosing my effects. Also getting the card to flip was pretty straight forward.
                            The part i found some what challenging was getting the typewriter text to only work once
                            the card has flipped over. And then getting it to disapear once the card is flipped back.
                        </p>
                        <p>
                        To see the PDF of the proposal click <a href="tutorial/proposal.pdf">here</a>. to see the proof of concept of the tutorial click <a href="tutorial/poc.html">here</a>.
                       
                        </p>

                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>
  
            <div class="row">
                <div class='column column90'>
                    <div>
                         <h2>HW 5 Web Api</h2>
                        <p>
                            In this homework I learned about how to implement a simple web API framework. 
                            This API utilizes .JSP files (java server pages) to call java classes without needing a main method. These Java classes are used to parse and format JSON data using the GSON library.
                             I also learned how to use the my-sql library to call inline SQL statements 
                             from the java classes. Finally using what i learned about ajax from previous 
                            homeworks i connected my front end to the database by using an ajax call on the JSP pages

                        </p>
                        
                        <p>
                           This was an interesting assignment because it allowed the HTML to be affected by the data from my SQL tables.
                             What I found somewhat difficult was getting my SQL statements to join the tables that I wanted. And then making 
                             sure that they were formatted correctly on my website. This was done in the individual javascript components for each page.
                             The easy part was getting the database connection set up. The instructions offered on Sally’s website were very comprehensive. 
                        </p>
                        <p>
                        To see the PDF of potential database errors click <a href="docs/dbErrors.pdf">here</a>. Click <a href="webAPIs/listUsersAPI.jsp">here</a> for the Web API that lists the users from my DB.
                        Click <a href="webAPIs/listBurgersAPI.jsp">here</a> for the Web API that lists the burgers from my DB
                        </p>

                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>
    
     <div class="row">
                <div class='column column90'>
                    <div>
                         <h2>HW 6 Logon</h2>
                        <p>
                            In this homework I learned about how to build the logon functionality.
                            This involved building a web API that ran from a jsp file. 
                            Thie API would allow an SQL statement to be called with two parameterized input fields used.
                            These fields are the user email and password. I learned how to safely create SQL statements that incorporated the user input. 
                            I also learned how to set session attributes so that i could store data persistently server side.
                            This was used to pass the logged in user info between pages.
                            Some things that were difficult were getting the correct error messages to display. 
                            The easier part for was getting the SQL statements to work as we did these already in the labs.
                        </p>
                        
                        <p>
                            This was an interesting assignment because it allowed me to build a feature that is common in many modern websites.
                        </p>
                        <p>
                        Click <a href="webAPIs/getProfileAPI.jsp">here</a> for the Web API that lists the user who is currently logged in.
                        Click <a href="webAPIs/logonAPI.jsp">here</a> for the Web API that logs a user on.
                        Click <a href="webAPIs/logoffAPI.jsp">here</a> for the Web API that logs a user off.
                        Click <a href="webAPIs/listUsersAPI.jsp">here</a> for the Web API that lists all the users.
                        </p>

                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>

            <div class="row">
                <div class='column column90'>
                    <div>
                       <h2>HW 7 Tutorial</h2>
                        <p>
                           
							This Homework was the second part of a two part assignment. My goal was to implement a reusable 
							javascript component that i proposed from HW 4. My proposal was a flipcard that has
                                                        animated text and a start rating icon. I believe I was successful in this respect.
							I learned a lot from this assignment. I will start by addressing the parts I found easiest. 
							I thought getting the javascript to create an empty flip card to be the easiest part.
							when i didn't have to put any text or anything on it. 

							
							<br>
							More difficult for me was getting the event handler to correctly spin the card over on click. 
							then to spin over again when the user was not focusing on it. Also adapting the text typing animation
							was not as trivial as i thought it would be. This required some parameterization of the object values being passed. 
							I was careful to try and make the component as general as possible. Although i could not allow the user of this component 
							to provide unlimited arguments as the card has limited space. The solution to this was to allow the user to create med, 
							large or xlarge size cards. Also the last argument must be an integer value so we can populate the number of stars to display.
							The way i addresed many of my problems was by assignment of class styles to objects at run time. 
							Also document DOM elements were made Anonymous by assignment to variables. So no hardcoded Id values were used.

                        </p>
                        
                        <p>
							This was a very cool assignment. It really helped me understand how javascript components work. I have been working with react
							some recently and i really feel like this gave me a better understanding of what is going on under the hood.
                        </p>
                        <p>
                        Click <a href="tutorial/index.html">here</a> for a tutorial on how to use my component
                        
                        </p>

                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>

    </div>
    `;
        // get rid of burger image when we change to blog
        document.getElementById(id).innerHTML = content;
        }