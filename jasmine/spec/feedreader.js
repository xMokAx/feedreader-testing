/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All the tests are placed within the $() function
 * to ensure they don't run until the DOM is ready,
 * since some of these tests may require DOM elements.
 */
$(
  (function() {
    // This test suite is all about the allFeeds variable and the feeds definition
    describe("RSS Feeds", function() {
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      it("each feed should have a none empty valid url", function() {
        allFeeds.forEach(feed => {
          expect(feed.url).not.toBeFalsy();
          expect(typeof feed.url).toBe("string");
          expect(feed.url).toMatch(/^(http|https):\/\//);
        });
      });

      it("each feed should have a none empty name", function() {
        allFeeds.forEach(feed => {
          expect(feed.name).not.toBeFalsy();
          expect(typeof feed.name).toBe("string");
        });
      });
    });

    // This test suite is all about the menu functionality
    describe("The Menu", function() {
      let body, menuIcon;
      beforeEach(function() {
        body = $("body");
        menuIcon = $(".menu-icon-link");
      });

      it("should be hidden by default", function() {
        expect(body.hasClass("menu-hidden")).toBeTruthy();
      });

      it("should be toggled by clicking the menu icon", function() {
        menuIcon.click();
        expect(body.hasClass("menu-hidden")).toBeFalsy();
        menuIcon.click();
        expect(body.hasClass("menu-hidden")).toBeTruthy();
      });
    });

    // This test suite is to check if the initial load of feeds works correctly
    describe("Initial Entries", function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it("should have at least one entry", function(done) {
        expect($(".feed .entry").length).toBeTruthy();
        done();
      });
    });

    // This test suite is to check if the content actually changes when another feed is selected from the menu
    describe("New Feed Selection", function() {
      let oldFeed, newFeed;
      beforeEach(function(done) {
        oldFeed = $(".feed .entry")[0].innerHTML;
        loadFeed(1, function() {
          newFeed = $(".feed .entry")[0].innerHTML;
          done();
        });
      });

      it("should change content", function(done) {
        expect(oldFeed).toBeTruthy();
        expect(newFeed).toBeTruthy();
        expect(oldFeed).not.toBe(newFeed);
        done();
      });
    });
  })()
);
