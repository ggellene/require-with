describe('requireWith', function() {
    var requireWith = require('../index.js');

    it('should insert mock objects', function () {
        var A = 'mock A';
        var app = requireWith('./App', {"DependencyA": A});
        expect(app.a).toBe(A);
    });

    it('should not affect the global require cache', function () {
        var A = 'mocked';
        var appwith = requireWith('./App', {"./DependencyA.js": A});
        var app = require('./App');
        expect(app.a).not.toBe('mocked');
    });

    it('should allow mocks to omit the file extension', function () {
        var app = requireWith('./App', {"DependencyA": 'mocked'});
        expect(app.a).toBe('mocked');
    })
});