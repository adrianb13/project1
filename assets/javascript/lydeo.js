// Youtube API - AIzaSyCMK88QjFF99XdEN0UXcvTCPt5AS9ZbQvo
// Musixmatch API - 8778b78669074e61c1501f792dac12f8

// https://api.musixmatch.com/ws/1.1/

$(document).ready(function() {

var youtubeapikey = "AIzaSyCMK88QjFF99XdEN0UXcvTCPt5AS9ZbQvo"
var musixmatchapikey = "8778b78669074e61c1501f792dac12f8"

function songSearch() {
    //var songVideo = $("#user-input").val().trim();
    var searchVideo = "usher my way";
    var corsProxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&q=" + searchVideo + "&key=" + youtubeapikey
    var fullQueryURL = corsProxy + queryURL;

    $.ajax({
        url: fullQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#results").empty();

        for (i = 0; i < 5; i++) {
            var newVid = $("<img>");
            var vidThumbnail = response.items[i].snippet.thumbnails.default.url
                newVid.addClass("vid-results");
                newVid.attr("src", vidThumbnail);
                newVid.attr("title", response.items[i].snippet.title)
                newVid.attr("videoID", response.items[i].id.videoId)
                $("#results").append(newVid);

        }
        
        $(".vid-results").on("click", function () {
            $("#video").empty();
            //var songTitle = $(this).attr("title");

            var songTitle = "usher - my way"
            var corsProxy = "https://cors-anywhere.herokuapp.com/";
            var trackURL = "https://api.musixmatch.com/ws/1.1/track.search?page_size=1&q_track_artist=" + songTitle + "&apikey=" + musixmatchapikey;
            var fullTrackURL = corsProxy + trackURL;
            var track = ""

            $.ajax({
                url: fullTrackURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                $("#lyrics").empty();
                track = response.message.body.track_list.track.track_id;
                track.attr("trackID", response.message.body.track_list.track.track_id);
                console.log(response.message.body.track_list.track.track_id)
            });

            var lyricURL = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + songTitle + "&apikey=" + musixmatchapikey;
            var fullLyricURL = corsProxy + lyricURL;
            $.ajax({
                url: fullLyricURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
            })

            var selectedVideo = $(this).attr("videoID");
            //var videourl = "https://www.youtube.com/embed/" + selectedVideo + "?enablejsapi=1"
            var videourl = "https://youtu.be/" + selectedVideo;
            console.log(videourl)
            $("#video").append($(this).attr("src", videourl))
            

//            return
            
        })
    })

/*     .then(
        function(response){

        }
    )
 */    
    .catch(function (error){
        console.log(error);
    })
}       
songSearch();


/* google client library function
function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': "AIzaSyCMK88QjFF99XdEN0UXcvTCPt5AS9ZbQvo",
    // clientId and scope are optional if auth is not required.
    'clientId': 'phoenixajb.apps.googleusercontent.com',
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.request({
      'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
    })
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};
// 1. Load the JavaScript client library.
gapi.load('client', start);
*/
});