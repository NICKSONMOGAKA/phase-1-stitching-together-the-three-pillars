const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const { initializeHearts, mockServerResponse } = require('../index.js');

describe('index.js', () => {
  let document, window;

  before(() => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="like-heart" data-post-id="1"></div>
      <div class="like-heart" data-post-id="2"></div>
    </body>`);
    document = dom.window.document;
    window = dom.window;
    global.document = document;
    global.window = window;

    // Initialize hearts in the test DOM
    initializeHearts();
  });

  it('should initialize articleHearts correctly', () => {
    const articleHearts = document.querySelectorAll('.like-heart');
    expect(articleHearts).to.have.lengthOf(2);
  });

  it('should mock server response correctly', async () => {
    const response = await mockServerResponse(1, true);
    expect(response).to.deep.equal({ postId: 1, liked: true });
  });

  // Add more tests as needed...
});
