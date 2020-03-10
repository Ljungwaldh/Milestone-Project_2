var _DATAGLOBAL = {};
const _APIKEY = "b010fe05a02c4ddc8336e4c77243bb3c";

function getData(leagueCode, teamNumber, callback) {

    
    var query = "competitions/" + leagueCode + "/standings";

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            the_response = xhr.responseText;            
            var league_data = JSON.parse(the_response);
            _DATAGLOBAL[leagueCode] = league_data;

            dropDownOptionsInMyPage(teamNumber, leagueCode, league_data)
            
        }

        else {
            console.log("This isn't working") 
        }
        if (callback) {
            callback();
        }
    };
    xhr.open("GET", "https://api.football-data.org/v2/" + query);
    xhr.setRequestHeader("X-Auth-Token", _APIKEY)
    xhr.send();
};

function dropDownOptionsInMyPage(teamNumber, leagueCode, teamListData) {

    var team_dropdown_div = document.getElementById("team-list-" + teamNumber);

   // var team_dropdown_div = document.getElemen("team-list-" + teamNumber);

    var dropdown_html_string = "";
    var table = teamListData.standings[0].table;
    for (let i in table) {
        
        dropdown_html_string += "<p class=\"dropdown-item\" onclick=\"teamMatchUp('"+leagueCode+"', 'team-stats-" + teamNumber + "'," + i + ")\">"  + table[i]["team"]["name"] + "</p>";
       
    }
    team_dropdown_div.innerHTML = dropdown_html_string;

}

function getsDataAndSetsTeamStats (teamNumber, statsDiv, selectedTeam) {
    var selectedLeague = getSelectedLeague(teamNumber);

    function callsDataDisplay ()  {
        teamStatsInMyPage(selectedLeague, statsDiv, selectedTeam);
    }

    getData(selectedLeague, teamNumber, callsDataDisplay);
}

function teamMatchUp (leagueCode, teamDataId, selectedTeam) {
     if(teamDataId === 'team-stats-2') {
         getsDataAndSetsTeamStats("1", "team-stats-1", selectedTeam);
    } 
    else {
        getsDataAndSetsTeamStats("2", "team-stats-2", selectedTeam);
    }
    teamStatsInMyPage(leagueCode, teamDataId, selectedTeam);
}

//getData("PL", "team-list-1");
//getData("FL1", "team-list-2");

function teamStatsInMyPage(leagueCode, teamDataId, selectedTeam) {
    console.log(_DATAGLOBAL)
    var team_stats_div = document.getElementById(teamDataId);
   
    var league_table = _DATAGLOBAL[leagueCode].standings[0].table[selectedTeam];
    console.log(league_table);
    var stats_html_string = "<p> Team Name: " + league_table.team.name + "</p>" + "<p> League Position: " + league_table.position + "</p>" +  "<p> Played Games: " + league_table.playedGames + "</p>" + "<p> Wins: " + league_table.won + "</p>" + "<p> Draws: " + league_table.draw + "</p>" + "<p> Losses: " + league_table.lost + "</p>" +
                            "<p> Points: " + league_table.points + "</p>" + "<p> Goals For: " + league_table.goalsFor + "</p>" + "<p> Goals Against: " + league_table.goalsAgainst + "</p>" + "<p> Goal Difference: " + league_table.goalDifference + "</p>";
    
                            console.log(stats_html_string);

    team_stats_div.innerHTML = stats_html_string;

    //"<img src=\"" + league_table.team.crestURL + "\">" need to figure out how I can convert this

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

function getSelectedLeague (v) {
    var myselect = document.getElementById("list-" + v);
    var league = myselect.options[myselect.selectedIndex].value;
    return league;
}

function populate(v) {
    var league = getSelectedLeague(v)
    getData(league, v);


    // console.log(league)
    //var i ;
    //if(v === "1") {
     //   i = "2";
    //}
    //else {
     //   i = "1";
   // }
   // var myselect1 = document.getElementById("list-" + i);
   // var league1 = myselect1.options[myselect1.selectedIndex].value;
   // console.log(league1);
   // getData(league1, i);
}
