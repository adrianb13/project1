
$(document).ready(function(){

    $("#find").on("click", function congressInfo () {
        $("#infoTable > thead").empty();
        $("#infoTable > tbody").empty();
        $("#result1").empty();
        $("#result2").empty();
        $("#name1").empty();
        $("#name2").empty();
        
        var state = $("#userState").val().trim();
        var searchURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyConiWRnN46UCfMvBRUESD_MvTF2ucsnNE&address=" + state;
        
        $.ajax({
            url: searchURL,
            method: "GET",
            dataType: "json",
        }).then(function(response) {
            console.log(response);

            var newHead = $("<tr>").append(
                $("<th>").text("Name"),
                $("<th>").text("Political Party"),
                $("<th>").text("Mailing Address"),
                $("<th>").text("Phone Number")
            )
                newHead.attr("class", "boldHeader")
            
            $("#infoTable > thead").append(newHead)

            for (j = 2 ; j < 4; j++) {
            var name = response.officials[j].name;
            var party = response.officials[j].party;
            var address = response.officials[j].address[0].line1 + ", " + response.officials[j].address[0].city + ", " + response.officials[j].address[0].state + " " + response.officials[j].address[0].zip;
            var phone = response.officials[j].phones[0];
                state = response.normalizedInput.state;

            var newRow = $("<tr>").append(
                $("<td>").text(name),
                $("<td>").text(party),
                $("<td>").text(address),
                $("<td>").text(phone),
            );
            $("#infoTable > tbody").append(newRow);
            }

        }).then(function(response) {
            
            if (state === "DC") {
                var searchURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyConiWRnN46UCfMvBRUESD_MvTF2ucsnNE&address=district%20of%20columbia";
        
                $.ajax({
                    url: searchURL,
                    method: "GET",
                    dataType: "json",
                }).then(function(response) {
                    console.log(response);
                    for (k = 0; k < 2; k++) {
                        var name = $("#name" + (k + 1));
                            name.addClass("senID");
                            $("#name" + (k + 1)).text(response.officials[k+2].name) 
                        };        
                });

            } else {
                var chamber = "senate"
                var queryURL = "https://api.propublica.org/congress/v1/members/senate/" + state + "/current.json";
        
                $.ajax({
                    url: queryURL,
                    method: "GET",
                    dataType: "json",
                    headers: {
                        "X-API-Key": "t6ac8DG1Hig7X3Uc8v3D1mB8IzW0qvioY0J5ptln"
                    }
                }).then(function(response) {
                    console.log(response);
                
                for (i = 0; i < 2; i++) {
                    var name = $("#name" + (i + 1));
                        name.addClass("senID");
                        name.attr("data-id", response.results[i].id);    
                        name.attr("data-name", response.results[i].name);
                        
                    var party = response.results[i].party;
                    var bioGuideID = response.results[i].id;
                         
                    var photoURL = "https://theunitedstates.io/images/congress/225x275/" +bioGuideID + ".jpg";

// Photo Styline & Upload
                    var photo = $("<img>");
                        photo.attr("src", photoURL);
                        photo.attr("class", "imageSpacing");

// Red/Blue Background
                    if (party === "D") {
                        photo.attr("class", "blue")
                    } else if (party === "R") {
                        photo.attr("class", "red")
                    }; 

// Photo box determination
                    if (i === 0) {
                        $("#result1").append(photo);
                        $("#name1").text(name.attr("data-name"));
                    } else if (i === 1) {
                        $("#result2").append(photo);
                        $("#name2").text(name.attr("data-name"));
                    };
                };
                });
            };
        });

        $("#userState").val("");
    });

    function nameClick() {
        $("#infoTable > thead").empty();
        $("#infoTable > tbody").empty();
        var senName = $(this).attr("data-name");
        var govID = $(this).attr("data-id");
            console.log(govID) 
        var queryURL = "https://api.propublica.org/congress/v1/members/" + govID + ".json"; 
        
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json",
            headers: {
                "X-API-Key": "t6ac8DG1Hig7X3Uc8v3D1mB8IzW0qvioY0J5ptln"
            }
        }).then(function(response) {
            console.log(response);
            var billSponsor = response.results[0].roles[0].bills_sponsored;
            var billCoSponsor = response.results[0].roles[0].bills_cosponsored;
            var parVotingPercent = response.results[0].roles[0].votes_with_party_pct;
            var missedVotesPercent = response.results[0].roles[0].missed_votes_pct;

            var newHeader = $("<tr>").append(
                $("<th>").text("Name"),
                $("<th>").text("# of Bills Sponsored"),
                $("<th>").text("# of Bills Co-Sponsored"),
                $("<th>").text("Votes with Party Lines Percentage"),
                $("<th>").text("Missed Votes Percentage")
            )
                newHeader.attr("class", "boldHeader");

            var newRow = $("<tr>").append(
                $("<td>").text(senName),
                $("<td>").text(billSponsor),
                $("<td>").text(billCoSponsor),
                $("<td>").text(parVotingPercent),
                $("<td>").text(missedVotesPercent)
            )

            $("#infoTable > thead").append(newHeader);
            $("#infoTable > tbody").append(newRow);
            
        });
    };
    
    $(document).on("click", ".senID", nameClick) 
//    congressInfo();
});