//declares variables used in later functions
var newCat;
var allCats;
var catArrays = [];

//waits for page to load then begins running functions
$(function(){
    pullCatData();
    makeNewCat();
});

//gets data from server using ajax api get method
function pullCatData() {
    allCats = $.get('https://ga-cat-rescue.herokuapp.com/api/cats').done(function(data){
//calls parseObject function on dataset obtained from server      
        parseObject(data);
    });
}

//takes JSON string and turns it into an object
function parseObject(dataset) {
    var parsedCatObjects = JSON.parse(dataset);
//pushes the cat objects into an array 
    for (i = 0; i < parsedCatObjects.length; i++) {
        catArrays.push(parsedCatObjects[i]);
    }
//calls addCatsToPage function on the resulting array of cat objects
    addCatsToPage(catArrays);
}

//takes each cat object in the array, iterates through it, and 
//creates a new list item containing the cat's name and note
//and appends it to the cats unordered list
function addCatsToPage(array) {
    array.forEach(function(cat){
        $("#cats").append("<li>" + cat.name + " - " + cat.note + "</li>")
    })
//calls makeNewCat function to wait for form input
    makeNewCat();
}

//waits for form submission and captures the values for cat name and note
function makeNewCat() {
    $("#new-cat").submit(function() {
        event.preventDefault();
        var catName = $("#cat-name").val();
        var catNote = $("#cat-note").val();
//sets the values in my newCat object to the captured values        
        newCat = {
            name: catName,
            note: catNote,
            image: null
        };
//pushes the new object, which has been turned into a JSON string to the server
//using the POST ajax api method
        $.post("https://ga-cat-rescue.herokuapp.com/api/cats", JSON.stringify(newCat)).done(function(data) {
        pullCatData();
        }); 
    });  
}

