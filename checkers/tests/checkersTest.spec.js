// @ts-check
const { test, expect } = require('@playwright/test');
const { CheckersPage } = require('../pages/checkers.page');

test.beforeEach(async ({ page }) => {
  const checkersPage = new CheckersPage(page);
  await checkersPage.goto();
  await expect(checkersPage.titleHeader).toHaveText(checkersPage.TITLE_TEXT);
  await expect(checkersPage.playerMessage).toHaveText(checkersPage.START_MESSAGE);
});

test('test checkers - capture and reset', async ({ page }) => {
  const checkersPage = new CheckersPage(page);

  await page.pause();

  await checkersPage.softMovePiece(0, 2, 1, 3);
  await checkersPage.confirmOpponentMove(1, 5, 2, 4);

  await checkersPage.movePiece(1, 1, 0, 2);
  await checkersPage.confirmOpponentMove(3, 5, 4, 4);

  await checkersPage.softMovePiece(1, 3, 3, 5);
  await checkersPage.confirmOpponentMove(4, 6, 2, 4);

  await checkersPage.movePiece(2, 2, 1, 3);
  await checkersPage.confirmOpponentMove(2, 4, 3, 3);

  await checkersPage.movePiece(4, 2, 2, 4);
  await checkersPage.confirmOpponentMove(4, 4, 3, 3);

  await checkersPage.restartLink.click();
  await expect(checkersPage.titleHeader).toHaveText(checkersPage.TITLE_TEXT);
  await expect(checkersPage.playerMessage).toHaveText(checkersPage.START_MESSAGE);
});

test('test checkers - gridlock victory', async ({ page }) => {
  const checkersPage = new CheckersPage(page);

  await checkersPage.softMovePiece(6, 2, 7, 3);
  await checkersPage.confirmOpponentMove(1, 5, 2, 4);

  await checkersPage.movePiece(4, 2, 5, 3);
  await checkersPage.confirmOpponentMove(5, 5, 4, 4);

  await checkersPage.movePiece(7, 1, 6, 2);
  await checkersPage.confirmOpponentMove(2, 4, 3, 3);

  await checkersPage.movePiece(3, 1, 4, 2);
  await checkersPage.confirmOpponentMove(3, 5, 2, 4);

  await checkersPage.movePiece(2, 2, 1, 3);
  await checkersPage.confirmOpponentMove(2, 6, 3, 5);

  await checkersPage.movePiece(4, 0, 3, 1);
  await checkersPage.confirmOpponentMove(0, 6, 1, 5);

  await checkersPage.movePiece(3, 1, 2, 2);
  await checkersPage.confirmOpponentMove(1, 5, 0, 4);

  await checkersPage.movePiece(2, 0, 3, 1);
  await checkersPage.confirmOpponentMove(4, 6, 5, 5);

  await checkersPage.movePiece(5, 3, 6, 4);
  await checkersPage.confirmOpponentMove(3, 7, 4, 6);

  await checkersPage.movePiece(4, 2, 5, 3);
  await checkersPage.confirmOpponentMove(1, 7, 2, 6);

  await checkersPage.movePiece(3, 1, 4, 2);
  await checkersPage.confirmOpponentMove(2, 6, 1, 5);

  await checkersPage.softMovePiece(6, 0, 7, 1);
  await expect(checkersPage.playerMessage).toHaveText(checkersPage.VICTORY_MESSAGE);
});
