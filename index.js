var express = require('express');
var http = require('http');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

//Utility Functions
function getConference(conferenceId) {
  if (conferenceId === '1') {
    return {'abbreviation' : 'ACC', 'name' : 'Atlantic Coast Conference'};
  } else if (conferenceId === '4') {
    return {'abbreviation' : 'Big 12', 'name' : 'Big 12 Conference'};
  } else if (conferenceId === '5') {
    return {'abbreviation' : 'B1G', 'name' : 'Big Ten Conference'};
  } else if (conferenceId === '8') {
    return {'abbreviation' : 'SEC', 'name' : 'Southeastern Conference'};
  } else if (conferenceId === '9') {
    return {'abbreviation' : 'PAC12', 'name' : 'Pacific 12 Conference'};
  } else if (conferenceId === '12') {
    return {'abbreviation' : 'CUSA', 'name' : 'Conference USA'};
  } else if (conferenceId === '15') {
    return {'abbreviation' : 'MAC', 'name' : 'Mid-American Conference'};
  } else if (conferenceId === '17') {
    return {'abbreviation' : 'MWC', 'name' : 'Mountain West Conference'};
  } else if (conferenceId === '37') {
    return {'abbreviation' : 'Sun Belt', 'name' : 'Sun Belt Conference'};
  } else if (conferenceId === '151') {
    return {'abbreviation' : 'AAC', 'name' : 'American Athletic Conference'};
  } else {
    return {'abbreviation' : 'Independent', 'name' : 'FBS Independents'};
  }
}

function getTeamId(teamAbbrev) {
  Object.prototype.getKeyByValue = function(value) {
    for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
             if (this[prop] === value)
                 return prop;
        }
    }
  }

  var teamNames = {
        "air_force": "AFA",
        "akron": "AKR",
        "alabama": "ALA",
        "appalachian_st": "APP",
        "arizona": "ARIZ",
        "arizona_st": "ASU",
        "arkansas": "ARK",
        "arkansas_st": "ARST",
        "army": "ARMY",
        "auburn": "AUB",
        "ball_st": "BALL",
        "baylor": "BAY",
        "boise_st": "BSU",
        "boston_college": "BC",
        "bowling_green": "BGSU",
        "buffalo": "BUFF",
        "byu": "BYU",
        "california": "CAL",
        "cincinnati": "CIN",
        "clemson": "CLEM",
        "colorado": "COLO",
        "colorado_st": "CSU",
        "connecticut": "CONN",
        "c_michigan": "CMU",
        "duke": "DUKE",
        "east_carolina": "ECU",
        "e_michigan": "EMU",
        "florida": "FLA",
        "florida_intl": "FIU",
        "florida_st": "FSU",
        "fl_atlantic": "FAU",
        "fresno_st": "FRES",
        "ga_southern": "GASO",
        "georgia": "UGA",
        "georgia_st": "GAST",
        "georgia_tech": "GT",
        "hawaii": "HAW",
        "houston": "HOU",
        "idaho": "IDHO",
        "illinois": "ILL",
        "indiana": "IND",
        "iowa": "IOWA",
        "iowa_st": "ISU",
        "kansas": "KU",
        "kansas_st": "KSU",
        "kent": "KENT",
        "kentucky": "UK",
        "louisiana_tech": "LT",
        "louisville": "LOU",
        "lsu": "LSU",
        "marshall": "MRSH",
        "maryland": "UMD",
        "massachusetts": "UMASS",
        "memphis": "MEM",
        "miami_fl": "MIA",
        "miami_oh": "M-(OH)",
        "michigan": "MICH",
        "michigan_st": "MSU",
        "minnesota": "MINN",
        "mississippi": "MISS",
        "mississippi_st": "MSST",
        "missouri": "MIZZ",
        "mtsu": "MTSU",
        "navy": "NAVY",
        "nc_state": "NCST",
        "nebraska": "NEB",
        "nevada": "NEV",
        "new_mexico": "UNM",
        "new_mexico_st": "NMSU",
        "northwestern": "NW",
        "north_carolina": "UNC",
        "north_texas": "UNT",
        "notre_dame": "ND",
        "n_illinois": "NIU",
        "ohio": "OHIO",
        "ohio_st": "OSU",
        "oklahoma": "OU",
        "oklahoma_st": "OKST",
        "old_dominion": "ODU",
        "oregon": "Oregon",
        "oregon_st": "Oregon State",
        "penn_st": "Penn State",
        "pittsburgh": "Pittsburgh",
        "purdue": "Purdue",
        "rice": "Rice",
        "rutgers": "Rutgers",
        "san_diego_st": "ORE",
        "san_jose_st": "SJSU",
        "smu": "SMU",
        "southern_miss": "USM",
        "south_alabama": "USA",
        "south_carolina": "SCAR",
        "south_florida": "USF",
        "stanford": "STAN",
        "syracuse": "SYR",
        "tcu": "TCU",
        "temple": "TEM",
        "tennessee": "TENN",
        "texas": "TEX",
        "texas_am": "TAMU",
        "texas_st": "TXST",
        "texas_tech": "TTU",
        "toledo": "TOL",
        "troy": "TROY",
        "tulane": "TULN",
        "tulsa": "TLSA",
        "uab": "UAB",
        "ucf": "UCF",
        "ucla": "UCLA",
        "ull": "ULL",
        "ulm": "ULM",
        "unlv": "UNLV",
        "usc": "USC",
        "utah": "UTAH",
        "utah_st": "USU",
        "utep": "UTEP",
        "ut_san_antonio": "UTSA",
        "vanderbilt": "VAN",
        "virginia": "UVA",
        "virginia_tech": "VT",
        "wake_forest": "WAKE",
        "washington": "UW",
        "washington_st": "WSU",
        "west_virginia": "WVU",
        "wisconsin": "WIS",
        "wyoming": "WYO",
        "w_kentucky": "WKU",
        "w_michigan": "WMU"
      };

      return teamNames.getKeyByValue(teamAbbrev);
}

function formTeamHistoryUrl(teamAbbrev) {
  var teamId = getTeamId(teamAbbrev);
  return 'https://collegefootballapi.com/api/1.0/teams/' + teamId;
}

function createTeam(competitorDict) {
  var team = {};
  team.id = competitorDict.team.id;
  team.location = competitorDict.team.location;
  team.name = competitorDict.team.name;
  team.abbreviation = competitorDict.team.abbreviation;
  team.displayName = competitorDict.team.displayName;
  team.color = competitorDict.team.color;
  team.logoUrl = competitorDict.team.logo;
  team.links = {};
  team.links.teamPage = competitorDict.team.links[0].href;
  team.links.roster = competitorDict.team.links[1].href;
  team.links.statistics = competitorDict.team.links[2].href;
  team.links.schedule = competitorDict.team.links[3].href;
  team.links.photos = competitorDict.team.links[4].href;
  team.links.stadium = competitorDict.team.links[5].href;
  team.links.awards = competitorDict.team.links[6].href;
  if (getTeamId(team.abbreviation)) {
    team.links.history = formTeamHistoryUrl(team.abbreviation);
  } else {
    team.links.history = '';
  }
  team.conference = getConference(competitorDict.team.conferenceId);
  team.rank = competitorDict.curatedRank.current;
  team.records = {};
  team.records.overall = competitorDict.records[0].summary;
  team.records.conference = competitorDict.records[1].summary;
  team.records.home = competitorDict.records[2].summary;
  team.records.away = competitorDict.records[3].summary;
  return team;
}

//Main scoreboard API call
app.get('/scoreboard', function(request, response) {

  Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd  = this.getDate().toString();
    return yyyy + (mm[1] ? mm: '0' + mm[0]) + (dd[1] ? dd: '0' + dd[0]);
  };

  var dateString;
  if (request.query.date) {
    dateString = request.query.date;
  } else {
    var curDate = new Date();
    dateString = curDate.yyyymmdd();
  }

  var url = 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?calendartype=blacklist&dates=' + dateString;

  http.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var cfbResponse = JSON.parse(body);
      if (cfbResponse.events) {
        var apiResponse = {};
        apiResponse.retrievedAt = new Date();
        apiResponse.queriedDate = request.query.date;
        apiResponse.queriedUrl = url;
        var games = [];
        for (var i = 0; i < cfbResponse.events.length; i++) {
          var gameEvent = cfbResponse.events[i];
          var game = {};

          //Basic game data
          game.id = gameEvent.id;
          game.season = gameEvent.season.year;
          game.date = gameEvent.date;
          game.attendance = gameEvent.competitions[0].attendance;
          game.venue = {};
          game.venue.name = gameEvent.competitions[0].venue.fullName;
          game.venue.city = gameEvent.competitions[0].venue.address.city;
          game.venue.state = gameEvent.competitions[0].venue.address.state;
          game.headline = gameEvent.competitions[0].notes[0].headline;
          game.scores = {};
          game.scores.home = gameEvent.competitions[0].competitors[0].score;
          game.scores.away = gameEvent.competitions[0].competitors[1].score;

          //Game Status
          game.status = {};
          game.status.clock = gameEvent.status.displayClock;
          game.status.type = gameEvent.status.type.name;
          if (game.status.type == 'STATUS_FINAL' || game.status.type == 'STATUS_SCHEDULED') {
            if (parseInt(game.scores.home) > parseInt(game.scores.away)) {
              game.winner = 'home';
            } else if (parseInt(game.scores.home) < parseInt(game.scores.away)) {
              game.winner = 'away';
            } else {
              game.winner = null;
            }

            if (game.status.type == 'STATUS_FINAL') {
              game.status.period = 'F';
              if (gameEvent.status.period > 4) {
                game.status.period = 'F/' + (gameEvent.status.period - 4) + 'OT';
              }
            } else {
              game.status.period = 'S';
            }
          } else {
            if (gameEvent.status.period > 5) {
              game.status.period = (gameEvent.status.period - 4) + 'OT';
            } else {
              game.status.period = 'Q' + gameEvent.status.period;
            }
          }

          //Odds
          game.odds = {};
          if (gameEvent.competitions[0].odds) {
            game.odds.spread = gameEvent.competitions[0].odds[0].details;
            game.odds.overUnder = gameEvent.competitions[0].odds[0].overUnder;
          } else {
            game.odds.spread = 'N/A';
            game.odds.overUnder = 'N/A';
          }

          //Teams
          game.homeTeam = createTeam(gameEvent.competitions[0].competitors[0]);
          game.awayTeam = createTeam(gameEvent.competitions[0].competitors[1]);

          var awayId = getTeamId(game.awayTeam.abbreviation);
          var homeId = getTeamId(game.homeTeam.abbreviation);
          if (homeId && awayId) {
            game.matchupUrl = 'https://collegefootballapi.com/api/1.0/matchup/' + homeId + '/' + awayId;
          } else {
            game.matchupUrl = '';
          }

          games.push(game);
        }

        apiResponse.games = games;
        response.write(JSON.stringify(apiResponse));
      } else {
        console.log('ERROR: no data');
        response.write(JSON.stringify(cfbResponse.events));
      }

      response.end();
    });
  }).on('error', function(e) {
    console.log('Got an error: ', e);
    response.render('pages/index');
  });
});

//some port listening thingy
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
