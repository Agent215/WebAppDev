function blog(id) {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var content = `  
    
        <style>
            h2 {
                margin-left: 1em;
                padding-top: 0px;
            }
            h1 {
                margin-left: 1em;
                padding-top: 70px;
            }
        </style>

        <div style="margin-left:2em" ;>

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
                            with a home grown "Routing Framework". I also learned ...
                            The parts that I found easy were ... 
                            The parts that I found hard or confusing were ... 
                        </p>  
                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>
        </p>


        <div class="row">
            <div class='column column90'>
                <div>
                    <h2>HW 3 Display Data</h2>
                    <p>
                        In this homework I learned that JSON is ... and AJAX is ... I also learned ... 
                        The parts that I found easy were ... 
                        The parts that I found hard or confusing were ... 
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
                    <h2>HW 4 Slide Show or Tutorial Proposal</h2>
                    <p>
                        <em>[If selecting the Slide Show...]</em> 
                    </p>
                    <p style="margin-left:2em">
                        In this homework I learned another way to display my image data ... 
                        The parts that I found easy were ... 
                        The parts that I found hard or confusing were ... 
                        To see my slide show, click the last entry under the search icon.
                    </p>
                    <p>
                        <em>[If selecting the Tutorial Proposal...]</em>
                    </p>
                    <ul>
                        <li>
                            Click <a target="_blank" href="tutorial/proposal.pdf">here</a> for my Tutorial Proposal, 
                            a pdf that describes the provider style (reusable) JS code I propose to implement. The pdf
                            provides links to the web pages that inspired my idea.
                        </li>
                        <li>
                            Click <a target="_blank" href="tutorial/poc.pdf">here</a> to see my Proof of Concept
                            code, which gives an idea of what I'm trying to accomplish but has not been fully implemented,
                            not converted to consumer/provider style yet.
                        </li>
                    </ul>
                </div>
            </div>
            <div class='stopFloat'></div>
        </div>

        <div class="row">
            <div class='column column90'>
                <div>
                    <h2>HW 5 Web APIs</h2>
                    <p>
                        In this homework I learned ... 
                        The parts that I found easy were ... 
                        The parts that I found hard or confusing were ... 
                    </p>
                    <ul>
                        <li>
                            To invoke my user list Web API, click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a>.
                        </li>
                        <li>
                            To invoke my [other] list Web API, click <a target="_blank" href="webAPIs/listOtherAPI.jsp">here</a>.
                        </li>
                    </ul>
                </div>
            </div>
            <div class='stopFloat'></div>
        </div>

        <div class="row">
            <div class='column column90'>
                <div>
                    <h2>HW 6 Log On</h2>
                    <p>
                        In this homework I learned ...
                        The parts that I found easy were ... 
                        The parts that I found hard or confusing were ... 
                    </p>
                    <ul>
                        <li>
                            To see how my Log On code works, click on these items under the 
                            account icon: "Log On", "Profile", and "Log Off". You'll only see 
                            the profile information if you are logged on.
                        </li>
                    </ul>
                </div>
            </div>
            <div class='stopFloat'></div>
        </div>

        <div class="row">
            <div class='column column90'>
                <div>
                    <h2>HW 7 Delete</h2>
                    <p>
                        In this homework I learned ... 
                        The parts that I found easy were ... 
                        The parts that I found hard or confusing were ... 
                    </p>
                    <ul>
                        <li>
                            To run this code, click to list the data (under the search icon from the nav bar) 
                            then click the delete icon next to the record you want to delete.  
                        </li>
                    </ul>
                </div>
            </div>
            <div class='stopFloat'></div>
        </div>

        <div class="row">
            <div class='column column90'>
                <div>
                    <h2>HW 8 Insert or Tutorial</h2>

                    <em>[If selecting Insert...]</em>

                    <p style="margin-left:2em">
                        In the insert homework  I learned ... 
                        The parts that I found easy were ... 
                        The parts that I found hard or confusing were ... 
                    </p>
                    <ul>
                        <li>
                            To see how insert user works, click on the plus sign at the top of the 
                            user listing page -OR- click on the "register" item under the account icon. 
                        </li>
                        <li>
                            To see how insert [other] works, click on the plus sign at the top of the 
                            [other] data display page.
                        </li>
                    </ul>
                    <em>[If selecting the Tutorial...]</em> 
                    <p style="margin-left:2em">
                        Click <a target="_blank" href="tutorial/index.html">here</a> for my tutorial.
                    </p>

                </div>
            </div>
            <div class='stopFloat'></div>
        </div>

        <div class="row">
            <div class='column column90'>
                <div>
                    <h2>HW 9 Update</h2>
                    <p>
                        In this homework I learned ... 
                        The parts that I found easy were ... 
                        The parts that I found hard or confusing were ... 
                    </p>
                    <ul>
                        <li>
                            To run this code, click to list the data (under the search icon from the nav bar)
                            then click the update icon next to the row you want to update. 
                        </li>
                    </ul>
                </div>
            </div>
            <div class='stopFloat'></div>
        </div>

    </div>
    `;
        // get rid of burger image when we change to blog
        document.getElementById(id).innerHTML = content;
        }