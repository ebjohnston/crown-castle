// @ts-check
const { test, expect } = require('@playwright/test');
const { BlackjackUtil } = require('../utils/blackjack.util');

let DECK_ID;
let FIRST_HAND = [];
let SECOND_HAND = [];

test('cards api - check blackjack', async ({ request }) => {
  const baseUrl = await request.get(`/`);
  expect(baseUrl.ok()).toBeTruthy();

  const newDeck = await request.get(`/api/deck/new/shuffle/?deck_count=1`);
  expect(newDeck.ok()).toBeTruthy();
  const newDeckJson = await newDeck.json();
  DECK_ID = newDeckJson['deck_id'];
  console.log(`DECK ID: ${DECK_ID}`);

  const firstDraw = await request.get(`/api/deck/${DECK_ID}/draw/?count=3`);
  expect(firstDraw.ok()).toBeTruthy();
  const firstDrawJson = await firstDraw.json();
  for (const index in firstDrawJson['cards']) {
    const cardCode = firstDrawJson['cards'][index]['code'];
    FIRST_HAND.push(cardCode);
  }
  console.log(`First Hand: ${FIRST_HAND}`);

  const secondDraw = await request.get(`/api/deck/${DECK_ID}/draw/?count=3`);
  expect(secondDraw.ok()).toBeTruthy();
  const secondDrawJson = await secondDraw.json();
  for (const index in secondDrawJson['cards']) {
    const cardCode = secondDrawJson['cards'][index]['code'];
    SECOND_HAND.push(cardCode);
  }
  console.log(`Second Hand: ${SECOND_HAND}`);

  const blackjackUtil = new BlackjackUtil();
  blackjackUtil.checkHand('A', FIRST_HAND);
  blackjackUtil.checkHand('B', SECOND_HAND);
});
