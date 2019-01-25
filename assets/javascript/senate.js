// t6ac8DG1Hig7X3Uc8v3D1mB8IzW0qvioY0J5ptln
// AIzaSyConiWRnN46UCfMvBRUESD_MvTF2ucsnNE

$(document).ready(function(){

    function congressInfo () {
        var state = "ca"
        var searchURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyConiWRnN46UCfMvBRUESD_MvTF2ucsnNE&address=" + state;
        
        $.ajax({
            url: searchURL,
            method: "GET",
            dataType: "json",
        }).then(function(response) {
            console.log(response);
            for (j = 2 ; j < 4; j++) {
            var name = response.officials[j].name;
            var party = response.officials[j].party;
            var address = response.officials[j].address[0].line1 + ", " + response.officials[j].address[0].city + ", " + response.officials[j].address[0].state + " " + response.officials[j].address[0].zip;
            var phone = response.officials[j].phones[0];
            var url = response.officials[j].urls[0];

            var newRow = $("<tr>").append(
                $("<td>").text(name),
                $("<td>").text(party),
                $("<td>").text(address),
                $("<td>").text(phone),
                $("<td>").text(url)
            );
            
            $("#infoTable > tbody").append(newRow)
            }

        }).then(function(response) {
            var chamber = "senate";
            var state = "ca"
            var queryURL = "https://api.propublica.org/congress/v1/members/senate/CA/current.json";
        
            $.ajax({
                url: queryURL,
                method: "GET",
                dataType: "json",
                headers: {
                    "X-API-Key": "t6ac8DG1Hig7X3Uc8v3D1mB8IzW0qvioY0J5ptln"
                }
            }).then(function(response) {
                console.log(response);
                $("#results").empty();
                console.log(response.copyright)
//                $("#copyright").text(response.copyright)
/*                for (i = 0; i < 2; i++) {
                    var name = response.results[i].name;
                    var polParty = response.results[i].party;
                    var id = response.results[i].id; 
        
                    var newRow = $("<tr>").append(
                        $("<td>").text(name),
                        $("<td>").text(polParty),
                        $("<td>").text(id)
                    ); 
*/
//              $("#infoTable > tbody").append(newRow)
//              }
                })
            })    
        
    }
    congressInfo();
});