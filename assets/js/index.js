var _DATAGLOBAL = {leagueCode:""};
const _APIKEY = "b010fe05a02c4ddc8336e4c77243bb3c";

function getData(leagueCode, teamNumber) {

    
    var query = "competitions/" + leagueCode + "/standings";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            the_response = xhr.responseText;            
            var league_data = JSON.parse(the_response);
            _DATAGLOBAL.leagueCode = league_data;

            dropDownOptionsInMyPage(teamNumber, league_data)
            
        }

        else {
            console.log("This isn't working") 
        }
    };
    xhr.open("GET", "https://api.football-data.org/v2/" + query);
    xhr.setRequestHeader("X-Auth-Token", _APIKEY)
    xhr.send();
};

function dropDownOptionsInMyPage(teamNumber, teamListData) {

    var team_dropdown_div = document.getElementById("team-list-" + teamNumber);

   // var team_dropdown_div = document.getElemen("team-list-" + teamNumber);

    var dropdown_html_string = "";
    var table = teamListData.standings[0].table;
    for (let i in table) {
        
        dropdown_html_string += "<p class=\"dropdown-item\" onclick=\"teamStatsInMyPage("+i+", 'team-stats-" + teamNumber + "')\">"  + table[i]["team"]["name"] + "</p>";
       
    }
    team_dropdown_div.innerHTML = dropdown_html_string;

}

//getData("PL", "team-list-1");
//getData("FL1", "team-list-2");

function teamStatsInMyPage(selectedTeam, teamDataId) {

    var team_stats_div = document.getElementById(teamDataId);
    var league_table = _DATAGLOBAL.leagueCode.standings[0].table[selectedTeam];

    var stats_html_string = "<p> Team Name: " +  league_table.team.name + "</p>" + "<img src=\"" + league_table.team.crestURL + "\">" + "<p> League Position: " + league_table.position + "</p>" + 
                            "<p> Played Games: " + league_table.playedGames + "</p>" + "<p> Wins: " + league_table.won + "</p>" + "<p> Draws: " + league_table.draw + "</p>" + "<p> Losses: " + league_table.lost + "</p>" +
                            "<p> Points: " + league_table.points + "</p>" + "<p> Goals For: " + league_table.goalsFor + "</p>" + "<p> Goals Against: " + league_table.goalsAgainst + "</p>" + "<p> Goal Difference: " + league_table.goalDifference + "</p>";
    
    team_stats_div.innerHTML = stats_html_string;


};


// $(".league-list").change(function() {

   // var leagueCode = $( "select.league-list option:checked" ).val();
   // let teamNumber = $(".team-list").attr("data-team-number");
    
   

   // console.log(teamNumber)
    // $(this).attr('id').replace(/[^d]/g, ''); https://www.sitepoint.com/jquery-numbers-element-id/
    // var id = $("div").attr('id').replace(/button/, '') https://stackoverflow.com/questions/2427853/jquery-get-number-from-id
    // var leagueCode = ;
   // var teamNumber = ;
   // getData(leagueCode, teamNumber)
//});

function populate(v) {
    
    var myselect = document.getElementById("list-" + v);
    var league = myselect.options[myselect.selectedIndex].value;
    getData(league, v);
    var i ;
    if(v === "1") {
        i = "2";
    }
    else {
        i = "1";
    }
    var myselect1 = document.getElementById("list-" + i);
    var league1 = myselect1.options[myselect1.selectedIndex].value;
    console.log(league1);
    getData(league1, i);
}