exports.BlackjackUtil = class BlackjackUtil {
    checkHand(player, hand) {
        let sum = 0;
        let hasAce = false;
        for (const index in hand) {
            const cardValue = hand[index].charAt(0);
            if (cardValue === 'A') {
                sum += 1;
                hasAce = true;
            }
            else if (cardValue === '0' || cardValue === 'J' || cardValue === 'Q' || cardValue === 'K') {
                sum += 10;
            }
            else { // all other cards 2-9
                sum += parseInt(cardValue);
            }
        }
        if (sum === 21 || (sum === 11 && hasAce)) {
            console.log(`SUCCESS: Player ${player} with hand ${JSON.stringify(hand)} DOES have blackjack!`)
        }
        else {
            console.log(`FAILURE: Player ${player} with hand ${JSON.stringify(hand)} DOES NOT have blackjack.`)
        }
    }
}