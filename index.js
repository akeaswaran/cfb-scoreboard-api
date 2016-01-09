//Static variables
var express = require('express');
var http = require('http');
var request = require('request');
var app = express();
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

//App setup
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});


//Utility Functions
function getConferenceId(conferenceAbbr) {
    if (conferenceAbbr === 'acc') {
       return '1';
    } else if (conferenceAbbr === 'big_10') {
      return '4';
    } else if (conferenceAbbr === 'big_12') {
      return '5';
    } else if (conferenceAbbr === 'sec') {
      return '8';
    } else if (conferenceAbbr === 'pac_12') {
      return '9';
    } else if (conferenceAbbr === 'c_usa') {
      return '12';
    } else if (conferenceAbbr === 'mac') {
      return '15';
    } else if (conferenceAbbr === 'mwc') {
      return '17';
    } else if (conferenceAbbr === 'sun_belt') {
      return '37';
    } else if (conferenceAbbr === 'aac') {
      return '151';
    } else {
      return '369';
    }
}

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

  return teamNames.getKeyByValue(teamAbbrev);
}

function getTeamAbbreviation(teamId) {
  return teamNames[teamId];
}

function formTeamHistoryUrl(teamAbbrev) {
  var teamId = getTeamId(teamAbbrev);
  return 'https://collegefootballapi.com/api/1.0/teams/' + teamId;
}

function createESPNTeam(competitorDict) {
  var team = {};
  team.id = competitorDict.team.id;
  team.location = competitorDict.team.location;
  team.name = competitorDict.team.name;
  team.abbreviation = competitorDict.team.abbreviation;
  team.displayName = competitorDict.team.displayName;
  team.color = competitorDict.team.color;
  team.logoUrl = competitorDict.team.logo;
  team.links = {};
  if (competitorDict.team.links && competitorDict.team.links.length > 0) {
    for (var i = 0; i < competitorDict.team.links.length; i++) {
      var linkDict = competitorDict.team.links[i];
      team.links[linkDict.rel[0]] = linkDict.href;
    }
  }

  if (getTeamId(team.abbreviation)) {
    team.links.history = formTeamHistoryUrl(team.abbreviation);
    team.links.details = 'https://api.fieldbook.com/v1/5674066102cb300300dfd764/teams?team_name=' + getTeamId(team.abbreviation);
  } else {
    team.links.history = '';
    team.links.details = '';
  }
  team.conference = getConference(competitorDict.team.conferenceId);
  team.rank = competitorDict.curatedRank.current;
  team.records = {};
  if (competitorDict.records && competitorDict.records.length > 0) {
    team.records.overall = competitorDict.records[0].summary;
    team.records.conference = competitorDict.records[1].summary;
    team.records.home = competitorDict.records[2].summary;
    team.records.away = competitorDict.records[3].summary;
  }

  return team;
}

function createESPNGame(gameEvent) {
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
  if (gameEvent.competitions[0].notes && gameEvent.competitions[0].notes.length > 0) {
    game.headline = gameEvent.competitions[0].notes[0].headline;
  } else {
    game.headline = '';
  }
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
  game.homeTeam = createESPNTeam(gameEvent.competitions[0].competitors[0]);
  game.awayTeam = createESPNTeam(gameEvent.competitions[0].competitors[1]);

  var awayId = getTeamId(game.awayTeam.abbreviation);
  var homeId = getTeamId(game.homeTeam.abbreviation);
  if (homeId && awayId) {
    game.matchupUrl = 'https://collegefootballapi.com/api/1.0/matchup/' + homeId + '/' + awayId;
  } else {
    game.matchupUrl = '';
  }
  return game;
}

function createCFBGame(apiGame) {
  var createdGame = {};
  createdGame.id = apiGame.id;
  createdGame.season = apiGame.season.season;
  createdGame.date = (new Date(apiGame.date.year, (apiGame.date.month - 1), apiGame.date.day, 0, 0, 0, 0)).toISOString();

  createdGame.scores = {};
  createdGame.scores.home = apiGame.results.home_score;
  createdGame.scores.away = apiGame.results.away_score;
  if (parseInt(createdGame.scores.home) > parseInt(createdGame.scores.away)) {
    createdGame.winner = 'home';
  } else if (parseInt(createdGame.scores.home) < parseInt(createdGame.scores.away)) {
    createdGame.winner = 'away';
  } else {
    createdGame.winner = null;
  }

  createdGame.status = {};
  createdGame.status.clock = '0:00';
  createdGame.status.type = 'FINAL';
  createdGame.status.period = 'F';

  var awayId = apiGame.teams.away_team;
  var homeId = apiGame.teams.home_team;

  createdGame.awayTeam = {'abbreviation' : getTeamAbbreviation(awayId), 'links' : {'details':'https://api.fieldbook.com/v1/5674066102cb300300dfd764/teams?team_name=' + awayId}};
  createdGame.homeTeam = {'abbreviation' : getTeamAbbreviation(homeId), 'links' : {'details':'https://api.fieldbook.com/v1/5674066102cb300300dfd764/teams?team_name=' + homeId}};

  createdGame.matchupUrl = 'https://collegefootballapi.com/api/1.0/matchup/' + homeId + '/' + awayId;
  return createdGame;
}

function validateDate(date)
{
  re = /^\d{4}\d{2}\d{2}$/;

  if(date && date !== '' && date.match(re)) {
    return true;
  }

  console.log("Invalid date: " + date);
  return false;
}

function validateWeek(week)
{
  re = /^\d{1,2}$/;

  if(week && week !== '' && week.match(re) && week < 16) {
    return true;
  }

  console.log("Invalid week: " + week);
  return false;
}

function validateSeason(season)
{
  re = /^\d{4}$/;

  if (season && season !== '' && season.match(re) && season < 2015 && season > 1984) {
    return true;
  }
  console.log("Invalid season: " + season);
  return false;
}

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth() + 1).toString();
  var dd  = this.getDate().toString();
  return yyyy + (mm[1] ? mm: '0' + mm[0]) + (dd[1] ? dd: '0' + dd[0]);
};

//Main scoreboard functions
app.get('/scoreboard', function(request, response) {
  var queryString;
  var curDate = new Date();
  if (!request.query.season) { // current data
    if (request.query.date && validateDate(request.query.date)) {
      queryString = '?calendartype=blacklist&dates=' + request.query.date;
    } else if (request.query.week && validateWeek(request.query.week)) {
      queryString = '?week=' + request.query.week;
    } else {
      queryString = '?calendartype=blacklist&dates=' + curDate.yyyymmdd();
    }
    var url = 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard' + queryString;

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
          apiResponse.espnUrl = url;
          var games = [];
          for (var i = 0; i < cfbResponse.events.length; i++) {
            var gameEvent = cfbResponse.events[i];
            var game = createESPNGame(gameEvent);
            games.push(game);
          }

          apiResponse.games = games;
          if (games.length > 0) {
            if (request.query.date) {
              apiResponse.date = request.query.date;
            } else if (request.query.week) {
              apiResponse.week = request.query.week;
              apiResponse.season = games[0].season.toString();
            } else {
              apiResponse.season = games[0].season.toString();
            }
          }
          response.write(JSON.stringify(apiResponse, null, 2));
          response.end();
        } else {
          response.write('{"code":404,"detail": "error: data not found"}');
          response.end();
        }
      });
    }).on('error', function(e) {
      console.log('Got an error: ', e);
      response.write('{"code":404,"detail":' + e + '}');
      response.end();
    });
  } else { //historical data
      if (validateSeason(request.query.season) && validateWeek(request.query.week)) {
        fetchCFBHistory(request.query.season, request.query.week, response);
      } else if (validateSeason(request.query.season) && !validateWeek(request.query.week)) {
        fetchCFBHistory(request.query.season, null, response);
      } else {
        response.write('{"code":404,"detail": "error: data not found"}');
        response.end();
      }
  }
});

function fetchCFBHistory(season, week, orgResponse) {
  var url = 'https://collegefootballapi.com/api/1.0/season/' + season + '/';
  if (week) {
      url = 'https://collegefootballapi.com/api/1.0/season/' + season + '/week/' + week;
  }

  request(url, function(error, response, body) {
    if (season && week) {
      if (!error) {
        var cfbResponse = JSON.parse(body);
        var apiResponse = {};
        var createdGames = [];
        apiResponse.retrievedAt = new Date();
        apiResponse.week = week;
        apiResponse.season = season;
        apiResponse.cfbUrl = url;

        if (cfbResponse.games) {
          for (var i = 0; i < cfbResponse.games.length; i++) {
            var apiGame = cfbResponse.games[i];
            createdGame = createCFBGame(apiGame);
            createdGames.push(createdGame);
          }
          apiResponse.games = createdGames;
        } else {
          console.log('ERROR: no data');
          apiResponse = {"code":404,"detail": "error: data not found"};
        }
        orgResponse.write(JSON.stringify(apiResponse, null, 2));
        orgResponse.end();
      } else {
        console.log('ERROR: ' + error);
        orgResponse.write(JSON.stringify({"code":error.code,'detail': 'error: ' + error}));
        orgResponse.end();
      }
    } else if (season && !week) {
      if (!error) {
        var cfbResponse = JSON.parse(body);
        var apiResponse = {};
        var createdGames = [];
        apiResponse.retrievedAt = new Date();
        apiResponse.season = season;
        apiResponse.cfbUrl = url;
        if (cfbResponse.games) {
          for (var i = 0; i < cfbResponse.games.length; i++) {
            var apiGame = cfbResponse.games[i];
            createdGame = createCFBGame(apiGame);
            createdGames.push(createdGame);
          }
          apiResponse.games = createdGames;
        } else {
          console.log('ERROR: no data');
          apiResponse = {"code":404,"detail": "error: data not found"};
        }
        orgResponse.write(JSON.stringify(apiResponse, null, 2));
        orgResponse.end();
      } else {
        console.log('ERROR: ' + error);
        orgResponse.write(JSON.stringify({"code":error.code,'detail': 'error: ' + error}));
        orgResponse.end();
      }
    } else {
      console.log('ERROR: no data');
      orgResponse.write(JSON.stringify({"code":404,"detail": "error: data not found"}));
      orgResponse.end();
    }
  });
}

//some port listening thingy
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = {
  validateDate: validateDate,
  validateWeek: validateWeek,
  validateSeason: validateSeason,
  getConference: getConference,
  getConferenceId: getConferenceId,
  getTeamId: getTeamId,
  getTeamAbbreviation: getTeamAbbreviation,
  createESPNTeam: createESPNTeam,
  yyyymmdd: Date.prototype.yyyymmdd,
  formTeamHistoryUrl: formTeamHistoryUrl,
  createESPNGame: createESPNGame,
  createCFBGame: createCFBGame,
};
