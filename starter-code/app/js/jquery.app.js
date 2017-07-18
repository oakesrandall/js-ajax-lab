
var allCats;
var catArrays = [];

$(function(){
    var allCatObjects = $.get('https://ga-cat-rescue.herokuapp.com/api/cats').done(function(data){
    parseObject(data);
    });
});


function parseObject(jsonObject) {
    var parsedCatObjects = JSON.parse(jsonObject);
    for (i = 0; i < parsedCatObjects.length; i++) {
        catArrays.push(parsedCatObjects[i]);
    }
}



