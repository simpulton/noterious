'use strict';

describe('Noterious: configuration', function () {

  beforeEach(module('noterious'));

  describe('Constant: noterious firebase endpoint', function () {

    var endpointUri;

    beforeEach(inject(function (_ENDPOINT_URI_) {
      endpointUri = _ENDPOINT_URI_;
    }));

    it('should be defined', function () {
      expect(endpointUri).toBeDefined();
    });

    it('should be secure', function () {
      expect(endpointUri).toContain("https://");
    });

  });
});
