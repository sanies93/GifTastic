var topics = ["happy", "sad", "angry", "annoyed", "fun", "bored", "funny", "stressed", "anxious", "tired", "energized", "hyper", "optimistic", "neutral", "emotionless"];

//Create buttons for each topic
function topicBtn() {
    $("#buttons").empty();      //Empty div before creating buttons
    for (var i = 0; i < topics.length; i++) {

        var button = $("<button>");
        button.text(topics[i]);
        button.addClass("topics");
        button.attr("tag", topics[i]);
        $("#buttons").append(button);
    }
}

topicBtn();

$(document).on("click", ".topics", function () {

    $("#gifs").empty();     //Replace GIFs with new button click

    var q = $(this).attr("tag");    //Grabs the value of topic button
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=DbEUfSBzCSHQ4M7S5LLCylyl7xF74W2W&q=" + q + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        //Create GIFs for limit of 10
        for (var i = 0; i < 10; i++) {

            var imageWithText = $("<div>");     //Contain the GIF with text as a block
            imageWithText.addClass("imageWithText")

            var image = $("<img>");
            image.attr("width", "350px");
            image.attr("height", "350px");
            var gif = response.data[i].images.original.url;     //Get GIF url
            image.attr("src", gif);     //Set image source to GIF url

            var rating = response.data[i].rating;       //Get rating of GIF

            imageWithText.append(image);
            imageWithText.append("Rated " + rating);

            $("#gifs").append(imageWithText);

        }

    });

});

//Create new button for user input
$(document).on("click", "#make-btn", function () {
    event.preventDefault();

    var newButton = $("#new-mood").val().toLowerCase();
    topics.push(newButton);
    topicBtn();
});
