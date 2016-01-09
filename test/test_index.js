var assert = require('assert');
var main = require("../index.js");

describe('validateDate(value)', function() {
    it('validateDate should return true for correctly formatted dates', function () {
      var date = '20160111';
      assert.equal(main.validateDate(date), true);
    });

    it('validateDate should return false for invalid date', function () {
      var date = 'dogs123';
      assert.equal(main.validateDate(date), false);
    });
});

describe('validateWeek(value)', function() {
    it('validateWeek should return true for single digit weeks', function () {
      var week = '1';
      assert.equal(main.validateWeek(week), true);
    });

    it('validateWeek should return true for double digit weeks', function () {
      var week = '12';
      assert.equal(main.validateWeek(week), true);
    });

    it('validateWeek should return false for weeks greater than 15', function () {
      var week = '16';
      assert.equal(main.validateWeek(week), false);
    });

    it('validateDate should return false for more than two digit input', function () {
      var week = '123';
      assert.equal(main.validateWeek(week), false);
    });

    it('validateDate should return false for invalid input', function () {
      var week = 'dogs123';
      assert.equal(main.validateWeek(week), false);
    });
});

describe('validateSeason(value)', function() {
    it('validateSeason should return true for proper formatted years within the historic bounds', function () {
      var season = '2010';
      assert.equal(main.validateSeason(season), true);
    });

    it('validateSeason should return false for future years not within the historic bounds', function () {
      var season = '2017';
      assert.equal(main.validateSeason(season), false);
    });

    it('validateSeason should return false for past years not within the historic bounds', function () {
      var season = '1900';
      assert.equal(main.validateSeason(season), false);
    });

    it('validateSeason should return false for years not within the current milennium', function () {
      var season = '100';
      assert.equal(main.validateSeason(season), false);
    });

    it('validateSeason should return false for invalid inputs', function () {
      var season = 'dogs123';
      assert.equal(main.validateSeason(season), false);
    });
});

describe('getConferenceId(value)', function() {
    it('getConferenceId should return the right ESPN conference id given a conference abbreviation from CFB API', function () {
      var identifier = 'acc';
      assert.equal(main.getConferenceId(identifier), '1');
    });

    it('getConferenceId should return 369 (AKA an unknown/independent) given an input not in the database', function () {
      var identifier = 'a10';
      var indep = '369';
      assert.equal(main.getConferenceId(identifier), indep);
    });
});

describe('getConference(value)', function() {
    it('getConference should return the right conference dictionary given a ESPN conference id', function () {
      var identifier = '1';
      var accDict = {'abbreviation' : 'ACC', 'name' : 'Atlantic Coast Conference'};
      assert.equal(main.getConference(identifier).abbreviation, accDict.abbreviation);
      assert.equal(main.getConference(identifier).name, accDict.name);
    });

    it('getConference should return the independents dictionary given an input not in the database', function () {
      var identifier = '400';
      var indDict = {'abbreviation' : 'Independent', 'name' : 'FBS Independents'};
      assert.equal(main.getConference(identifier).abbreviation, indDict.abbreviation);
      assert.equal(main.getConference(identifier).name, indDict.name);
    });
});

describe('getTeamId(value)', function() {
    it('getTeamId should return the right team id given a team abbreviation', function () {
      var abbrev = 'GT';
      assert.equal(main.getTeamId(abbrev), 'georgia_tech');
    });

    it('getTeamId should return null given an input not in the database', function () {
      var abbrev = 'GTE';
      assert.equal(main.getTeamId(abbrev), null);
    });
});

describe('getTeamAbbreviation(value)', function() {
    it('getTeamAbbreviation should return the right team abbreviation given a team identifier', function () {
      var identifier = 'georgia_tech';
      assert.equal(main.getTeamAbbreviation(identifier), 'GT');
    });

    it('getTeamAbbreviation should return null given an input not in the database', function () {
      var identifier = 'ndsu';
      assert.equal(main.getTeamAbbreviation(identifier), null);
    });
});

describe('createESPNTeam(value)', function() {
    it('getESPNTeam should return a correctly formatted dictionary given a dictionary from ESPN', function () {
      var inputJSON = '{\"id\":\"254\",\"uid\":\"s:20~l:23~t:254\",\"type\":\"team\",\"homeAway\":\"home\",\"team\":{\"id\":\"254\",\"uid\":\"s:20~l:23~t:254\",\"location\":\"Utah\",\"name\":\"Utes\",\"abbreviation\":\"UTAH\",\"displayName\":\"Utah Utes\",\"shortDisplayName\":\"Utes\",\"color\":\"890012\",\"isActive\":true,\"venue\":{\"id\":\"587\"},\"links\":[{\"rel\":[\"clubhouse\",\"desktop\"],\"href\":\"http:\/\/espn.go.com\/college-football\/team\/_\/id\/254\",\"text\":\"Clubhouse\",\"isExternal\":false,\"isPremium\":false},{\"rel\":[\"roster\",\"desktop\"],\"href\":\"http:\/\/espn.go.com\/college-football\/team\/roster\/_\/id\/254\",\"text\":\"Roster\",\"isExternal\":false,\"isPremium\":false},{\"rel\":[\"stats\",\"desktop\"],\"href\":\"http:\/\/espn.go.com\/college-football\/team\/stats\/_\/id\/254\",\"text\":\"Statistics\",\"isExternal\":false,\"isPremium\":false},{\"rel\":[\"schedule\",\"desktop\"],\"href\":\"http:\/\/espn.go.com\/college-football\/team\/schedule\/_\/id\/254\",\"text\":\"Schedule\",\"isExternal\":false,\"isPremium\":false},{\"rel\":[\"photos\",\"desktop\"],\"href\":\"http:\/\/espn.go.com\/college-football\/team\/photos\/_\/id\/254\",\"text\":\"photos\",\"isExternal\":false,\"isPremium\":false},{\"rel\":[\"stadium\",\"desktop\"],\"href\":\"http:\/\/espn.go.com\/college-football\/team\/stadium\/_\/id\/254\",\"text\":\"Stadium\",\"isExternal\":false,\"isPremium\":false},{\"rel\":[\"awards\",\"desktop\"],\"href\":\"http:\/\/espn.go.com\/college-football\/awards\/_\/team\/254\",\"text\":\"Awards\",\"isExternal\":false,\"isPremium\":false}],\"conferenceId\":\"9\",\"logo\":\"http:\/\/a.espncdn.com\/i\/teamlogos\/ncaa\/500\/254.png\"},\"score\":\"35\",\"linescores\":[{\"value\":35.0},{\"value\":0.0},{\"value\":0.0},{\"value\":0.0}],\"statistics\":[],\"curatedRank\":{\"current\":22},\"winner\":true,\"records\":[{\"name\":\"YTD\",\"abbreviation\":\"Game\",\"type\":\"total\",\"summary\":\"10-3\"},{\"name\":\"Home\",\"type\":\"home\",\"summary\":\"6-1\"},{\"name\":\"Road\",\"type\":\"road\",\"summary\":\"3-2\"},{\"name\":\"vs. Conf.\",\"type\":\"vsconf\",\"summary\":\"6-3\"}]}';
      var inputDict = {};
      inputDict.id = '254';
      inputDict.uid = 's:20~l:23~t:254';
      inputDict.type = 'team';
      inputDict.homeAway = 'home'
      inputDict.team = {};
      inputDict.team.id = '254';
      inputDict.team.uid = 's:20~l:23~t:254';
      inputDict.team.location = 'Utah';
      inputDict.team.location = 'Utes';
      inputDict.team.abbreviation = 'UTAH';
      inputDict.team.displayName = 'Utah Utes'
      inputDict.team.color = '890012';
      inputDict.team.conferenceId = '9';
      inputDict.curatedRank = {};
      inputDict.curatedRank.current = '22';
      inputDict.records = [
        {
          "name" : 'YTD',
          "abbreviation" : 'Game',
          "type" : 'total',
          "summary" : '10-3'
        },
        {
          "name" : 'Home',
          "type" : 'home',
          "summary" : '6-1'
        },
        {
          "name" : 'Road',
          "type" : 'road',
          "summary" : '3-2'
        },
        {
          "name" : 'vs. Conf.',
          "type" : 'vsconf',
          "summary" : '6-3'
        }
      ];
      inputDict.team.links = [
        {
          "rel" : [
            'clubhouse',
            'desktop'
          ],
          "href" : 'http://espn.go.com/college-football/team/_/id/254',
          "text" : 'Clubhouse',
          "isExternal" : false,
          "isPremium" : false
        },
        {
          "rel" : [
            'roster',
            'desktop'
          ],
          "href" : 'http://espn.go.com/college-football/team/roster/_/id/254',
          "text" : 'Roster',
          "isExternal" : false,
          "isPremium" : false
        },
        {
          "rel" : [
            'stats',
            'desktop'
          ],
          "href" : 'http://espn.go.com/college-football/team/stats/_/id/254',
          "text" : 'Statistics',
          "isExternal" : false,
          "isPremium" : false
        },
        {
          "rel" : [
            'schedule',
            'desktop'
          ],
          "href" : 'http://espn.go.com/college-football/team/schedule/_/id/254',
          "text" : 'Schedule',
          "isExternal" : false,
          "isPremium" : false
        },
        {
          "rel" : [
            'photos',
            'desktop'
          ],
          "href" : 'http://espn.go.com/college-football/team/photos/_/id/254',
          "text" : 'photos',
          "isExternal" : false,
          "isPremium" : false
        },
        {
          "rel" : [
            'stadium',
            'desktop'
          ],
          "href" : 'http://espn.go.com/college-football/team/stadium/_/id/254',
          "text" : 'Stadium',
          "isExternal" : false,
          "isPremium" : false
        },
        {
          "rel" : [
            'awards',
            'desktop'
          ],
          "href" : 'http://espn.go.com/college-football/awards/_/team/254',
          "text" : 'Awards',
          "isExternal" : false,
          "isPremium" : false
        }
      ];

      var team = main.createESPNTeam(inputDict);
      assert.equal(team.id, inputDict.team.id);
      assert.equal(team.location, inputDict.team.location);
      assert.equal(team.name, inputDict.team.name);
      assert.equal(team.abbreviation, inputDict.team.abbreviation);
      assert.equal(team.displayName, inputDict.team.displayName);
      assert.equal(team.color, inputDict.team.color);
      assert.equal(team.logoUrl, inputDict.team.logo);
      assert.deepEqual(team.links.clubhouse, inputDict.team.links[0].href);
      assert.deepEqual(team.links.roster, inputDict.team.links[1].href);
      assert.deepEqual(team.links.stats, inputDict.team.links[2].href);
      assert.deepEqual(team.links.schedule, inputDict.team.links[3].href);
      assert.deepEqual(team.links.photos, inputDict.team.links[4].href);
      assert.deepEqual(team.links.stadium, inputDict.team.links[5].href);
      assert.deepEqual(team.links.awards, inputDict.team.links[6].href);


      if (main.getTeamId(team.abbreviation)) {
        assert.equal(team.links.history, main.formTeamHistoryUrl(inputDict.team.abbreviation));
        assert.equal(team.links.details, 'https://api.fieldbook.com/v1/5674066102cb300300dfd764/teams?team_name=' + main.getTeamId(inputDict.team.abbreviation));
      } else {
        assert.equal(team.links.history, '');
        assert.equal(team.links.details, '');
      }
      assert.equal(Object.keys(team.links).length, 9);
      assert.deepEqual(team.conference, main.getConference(inputDict.team.conferenceId));
      assert.equal(team.rank, inputDict.curatedRank.current);

      if (inputDict.records && inputDict.records.length > 0) {
        assert.equal(team.records.overall, inputDict.records[0].summary);
        assert.equal(team.records.conference, inputDict.records[1].summary);
        assert.equal(team.records.home, inputDict.records[2].summary);
        assert.equal(team.records.away, inputDict.records[3].summary);
      }
    });
});

describe('yyyymmdd()', function() {
    it('yyyymmdd should a correctly formatted date', function () {
      var date = new Date();
      assert.equal(date.yyyymmdd(), date.getFullYear().toString() + ((date.getMonth() + 1).toString()[1] ? (date.getMonth() + 1).toString(): '0' + (date.getMonth() + 1).toString()[0]) + (date.getDate().toString()[1] ? date.getDate().toString(): '0' + date.getDate().toString()[0]));
    });
});

describe('formTeamHistoryUrl(value)', function() {
    it('yyyymmdd should return a correctly formatted history URL', function () {
      var teamAbbrev = 'GT';
      assert.equal(main.formTeamHistoryUrl(teamAbbrev), 'https://collegefootballapi.com/api/1.0/teams/georgia_tech');
    });
});
