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

    it('validateSeaons should return false for invalid inputs', function () {
      var season = 'dogs123';
      assert.equal(main.validateSeason(season), false);
    });
});

describe('getConferenceId(value)', function() {
    it('getConferenceId should return the right ESPN conference id given a conference abbreviation from CFB API', function () {
      var identifier = 'acc';
      assert.equal(main.getConferenceId(identifier), '1');
    });
});

describe('getConference(value)', function() {
    it('getConference should return the right conference dictionary given a ESPN conference id', function () {
      var identifier = '1';
      var accDict = {'abbreviation' : 'ACC', 'name' : 'Atlantic Coast Conference'};
      assert.equal(main.getConference(identifier).abbreviation, accDict.abbreviation);
      assert.equal(main.getConference(identifier).name, accDict.name);
    });
});
