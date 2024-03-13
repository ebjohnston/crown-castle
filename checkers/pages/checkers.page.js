const { expect } = require('@playwright/test');

exports.CheckersPage = class CheckersPage {
    TITLE_TEXT = 'Checkers'

    START_MESSAGE = 'Select an orange piece to move.'
    READY_MESSAGE = 'Make a move.'
    VICTORY_MESSAGE = 'You have won!'

    EMPTY_ICON = 'https://www.gamesforthebrain.com/game/checkers/gray.gif'
    OPPONENT_ICON = 'me1.gif'
    PLAYER_ICON_UNSELECTED = 'you1.gif'
    PLAYER_ICON_SELECTED = 'you2.gif'

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.titleHeader = page.locator('h1').first();
        this.playerMessage = page.locator('#message');
        this.restartLink = page.getByText('Restart...');
    }

    async movePiece(oldColumn, oldRow, newColumn, newRow) {
        await expect(this.playerMessage).toHaveText(this.READY_MESSAGE);
        await this.softMovePiece(oldColumn, oldRow, newColumn, newRow);
        const newSpace = await this.getBoardSpace(newColumn, newRow);
        await expect(newSpace).toHaveAttribute('src', this.PLAYER_ICON_UNSELECTED);
        await expect(this.playerMessage).toHaveText(this.READY_MESSAGE);
    }

    async softMovePiece(oldColumn, oldRow, newColumn, newRow) {
        const oldSpace = await this.getBoardSpace(oldColumn, oldRow);
        await oldSpace.click();
        const newSpace = await this.getBoardSpace(newColumn, newRow);
        await newSpace.click();
    }

    async confirmOpponentMove(oldColumn, oldRow, newColumn, newRow) {
        const oldSpace = await this.getBoardSpace(oldColumn, oldRow);
        await expect(oldSpace).toHaveAttribute('src', this.EMPTY_ICON);
        const newSpace = await this.getBoardSpace(newColumn, newRow);
        await expect(newSpace).toHaveAttribute('src', this.OPPONENT_ICON);
    }

    async getBoardSpace(column, row) {
        return this.page.locator(`[name=space${column}${row}]`)
    }

    async goto() {
        await this.page.goto('https://www.gamesforthebrain.com/game/checkers/');
    }
};