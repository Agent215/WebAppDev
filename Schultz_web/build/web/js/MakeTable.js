function MakeTable(list, id, sortOrderPropName) {


    //************************************************************************************
    function jsSort(list, byProperty) {

        // To use the built-in sort method (that is available to any JS array),
        // you pass it a function that compares two of the elements of the array
        // and returns 1, 0 or -1 depending on how the two elements compare with each other.

        list.sort(function (q, z) {  // in line anonymous fn to compare list elements. 
            // returns positive (if first bigger), 0 if equal, negative otherwise.

            // using JS associative array notation, extract the 'byProperty' property from the two
            // list elements so you can compare them.
            // By applying the convert function, each string value is converted to the actual data 
            // type, for example "123" is converted to 123. 
            var qVal = convert(q[byProperty]);
            var zVal = convert(z[byProperty]);

            var c = 0;
            if (qVal > zVal) {
                c = 1;
            } else if (qVal < zVal) {
                c = -1;
            }
            console.log("comparing " + qVal + " to " + zVal + " is " + c);
            return c;
        } // end of the anonymous comparision function
        );

        // check the string to see what type it is, then return that string converted to the right type 
        // so as to get the sort order correct. 
        function convert(s) {

            if (!s || s.length === 0) {
                //console.log("s is null or empty string");
                return -1;
            }

            // a string that holds a date returns true for isNaN(strDate) (it's not a number)  
            // And it returns false for isNaN(Date.parse(strDate))
            var parsedDate = Date.parse(s);
            if (isNaN(s) && !isNaN(parsedDate)) {
                //console.log(s + " is a Date ");
                return parsedDate;
            } else {
                var tmp = s;
                console.log("tmp is " + tmp);
                tmp = tmp.replace("$", ""); // remove dollar signs
                tmp = tmp.replace(",", ""); // remove commas
                if (isNaN(tmp)) { // if not a number, return what was passed in 
                    //console.log(s + " is a string - convert to uppercase for sorting purposes");
                    return s.toUpperCase();
                } else {
                    //console.log(tmp + " is a number");
                    return Number(tmp);
                }
            }
        } // convert 

    } // jsSort
//************************************************************************************
    // Add data as th or td (based on eleType) to row of HTML table.
    function addToRow(eleType, row, data, align, classid) {
        var ele = document.createElement(eleType);
        var id = classid;
        ele.innerHTML = data;
        ele.className = id;
        ele.style.textAlign = align;
        row.appendChild(ele);
        return ele;  // future code may need a reference to this dom object
    }
//************************************************************************************
    function alignment(val) {

        // check if date
        var parsedDate = Date.parse(val);
        if (isNaN(val) && (!isNaN(parsedDate))) {
            return "center";
        }

        // check if numeric (remove $ and , and then check if numeric)
        var possibleNum = val.replace("$", "");
        possibleNum = possibleNum.replace(",", "");
        if (isNaN(possibleNum)) {
            return "left";
        }
        return "right"; // it's a number

    } // alignment

//************************************************************************************
    // return true if any property of obj contains searchKey. Else return false.
    function isToShow(obj, searchKey) {
        if (!searchKey || searchKey.length === 0) {
            return true; // show the object if searchKey is empty
        }
        var searchKeyUpper = searchKey.toUpperCase();
        for (var prop in obj) {
            var propVal = obj[prop]; // associative array, using property name as if index. 
            console.log("checking if " + searchKeyUpper + " is in " + propVal);
            var propValUpper = propVal.toUpperCase();
            if (propValUpper.includes(searchKeyUpper)) {
                console.log("yes it is inside");
                return true;
            }
        }
        console.log("no it is not inside");
        return false;
    } // isToShow 
//************************************************************************************
    function prettyColumnHeading(propName) {

        if (propName.length === 0) {
            return "";
        }

        // capitalize first letter
        var newHdg = propName.charAt(0).toUpperCase();
        // iterate through all characters, inserting space before any capital letters.
        for (var i = 1; i < propName.length; i++) {
            if (propName.charAt(i) < "a") {
                newHdg += " ";
            }
            newHdg += propName.charAt(i);
        }
        return newHdg;
    } // prettyColumnHeading

//************************************************************************************
    // Main Program.

    function addDataRows(filterValue) {

        // remove old tbody element if there is one (else you'll get sorted rows added to end of what's there).
        var oldBody = newTable.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            newTable.removeChild(oldBody[0]);
        }

        // Add one row (to HTML table) per element in the array.
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        var tableBody = document.createElement("tbody");

        newTable.appendChild(tableBody);
        for (var i in list) {
            if (isToShow(list[i], filterValue)) {
                console.log("adding row " + i + " to the HTML table");

                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);

                // create one table data <td> content matching the property name
                var obj = list[i];

                // name each column of elements by number k
                var counter = 0;
                for (var prop in obj) {


                    addToRow("td", tableRow, obj[prop], alignment(obj[prop]), counter);


                    counter++;
                }

            } else {
                console.log("not adding row " + i + " to the HTML table");
            }
        } // for loop 
    } // addDataRows

    console.log("function MakeSortableTable called sorting by " + sortOrderPropName);
    jsSort(list, sortOrderPropName);


    // Remove whatever was in the element with the given id
    document.getElementById(id).innerHTML = "Filter by: ";

    // Create a filter text box for user input and append it.
    var searchInput = document.createElement("input");
    document.getElementById(id).appendChild(searchInput);
    searchInput.id = "searchBar";

    // Create a new HTML table (DOM object) and append it.
    var newTable = document.createElement("table");
    document.getElementById(id).appendChild(newTable);


    // Create a header row for the HTML table
    var tableHead = document.createElement("thead");
    newTable.appendChild(tableHead);
    var tableHeadRow = document.createElement("tr");
    tableHead.appendChild(tableHeadRow);

//************************************************************************************




    // create one column header per property with column header content
    // matching the property name
    var obj = list[0];
    var j = 0;
    for (var prop in obj) {
        var temp = prop;
        var colHead = addToRow("th", tableHeadRow, prettyColumnHeading(prop), alignment(obj[prop]));
        colHead.onclick = function () {
            // take spaces out again
            str = this.innerHTML.replace(/\s+/g, '');
            // put back first char to lower case
            temp = str.charAt(0).toLowerCase();
            // iterate through all characters reconstructing string as camelcase for comparison
            // this is needed for the click sort
            for (var i = 1; i < str.length; i++) {
                temp += str.charAt(i);
            }
            MakeTable(list, id, temp);
        };
    }

    // Initially searchInput.value should be "" and when passing that to 
    // function isToShow should always return meaning all rows will initially show. 
    addDataRows(searchInput.value);

    searchInput.onkeyup = function () {
        console.log("search filter changed to " + searchInput.value);
        addDataRows(searchInput.value);
    };



}  // MakeTable