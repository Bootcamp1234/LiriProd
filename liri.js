// var operate = require('./keys.js')


// var twitter = require("twitter");
// var spotify = require("spotify");
// var request = require("request");
// var dotenv = require('dotenv').config()
// var fs = require("fs");
// var command = process.argv[2];
// var inputCommand = process.argv[3];
// var client = new Twitter(keys.twitter); 

//     // function choice(command, inputCommand) {
//     //     switch (command) {
//     //         case "myTweets":
//     //             myTweets();
//     //             break;
//     //         case "mySpotify":
//     //             mySpotify(inputCommand);
//     //             break;
//     //         case "myMovie":
//     //             myMovie(inputCommand);
//     //             break;
//     //         case "do-what-it-says":
//     //             doWhatItSays();
//     //     }
//     // }
//     // choice(command, inputCommand);



// var spotify = new Spotify(keys.spotify);

require('dotenv').config();
var operate = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");

var fs = require("fs");
var command = process.argv[2];
var inputCommand = process.argv[3];
var client = new Twitter({
    consumer_key: operate.twitter.consumer_key,
    consumer_secret: operate.twitter.consumer_secret,
    access_token_key: operate.twitter.access_token_key,
    access_token_secret: operate.twitter.access_token_secret

});


function myTweets() {
    var params = {
        screen_name: 'Mel89266420',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {console.log(tweets[0].text)
            // console.log("Tweets from " + params.screen_name)
            // for (var i = 0; i < tweets.length; i++) {
            //     console.log(("Tweet: " + tweets[i].text) + ("Created At: " + request(tweets[i].created_at)))
            // }
        }
        else { console.log("error") }
    });

}


function spotifyThisSong(songInput){
    var Spotify = require("node-spotify-api");
    var operate = require('./keys.js')
    songTitle = songInput;
    var spotify = new Spotify({
        id: operate.spotify.id,
        secret: operate.spotify.secret
    });

    if (songInput === undefined) {
        songTitle = "Ace of Base - The Sign";
    }

    spotify.search({
        type: 'track',
        query: songInput,
        limit: 20
    }, function (error, data) {
        if (error) {console.log("i work")
            return console.log("Spotify Error: " + error);
        }
        for (i = 0; i < data.tracks.items[i].artists.length; i++) {
            console.log("Artist:" + data.tracks.items[i].artists[0].name)
        }

        console.log("Track: " + data.tracks.items[i].name);
        console.log("Preview URL: " + data.tracks.items[i].preview_url);
        console.log("Album Name: " + data.tracks.items[i].album.name);
        console.log("");

    });

}


function movieThis(movieInput) {
    movieTitle = movieInput;
    if (movieInput === undefined) {
        movieTitle = "Mr Nobody";
    }
    var title = movieTitle.split(" ").join("+");

    request("http://www.omdbapi.com/?t=" + title + "&apikey=b68a4d09", (error, response, body) => {
        if (!error) { console.log("OMDB: " + error) }
        else {

            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);


        }
    })

};



function doWhatItSays() {
    fs.readFile("random.txt", "utf8", (error, data) => {
        var randomInput = data.split(",");
        choice(randomInput[0], randomInput[1]);
    });
}


function choice(command, inputCommand) {
    switch (command) {

        case "myTweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays();
    }
}
choice(command, inputCommand);




