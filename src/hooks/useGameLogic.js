/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';

import { addUniqueIds, getFormedData, getPairedPics, shuffleCards } from '../utils/index';

const MAX_VISIBLE_CARDS = 2;
const PACES = {
    easy: 1500,
    medium: 1000,
    hard: 500,
    pro: 200,
};

const useGameLogic = (images, gamePace) => {
    const [score, setScore] = React.useState(0);
    const [isWin, setIsWin] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [visibleCards, setVisibleCards] = React.useState([]);

    const prepareCards = () => {
        const a = getFormedData(images);
        const b = getPairedPics(a);
        const c = addUniqueIds(b);
        const d = shuffleCards(c);
        setCards(d);
    };

    const flipCard = clickedCardId => {
        const flippedCards = cards.map(card => {
            if (card.uniqueId === clickedCardId) {
                card.isShown = true;
            }

            if (card.isShown) setVisibleCards(oldState => [...oldState, card.uniqueId]);
            return card;
        });

        setCards(flippedCards);
    };

    const onCardClick = clickedCardId => {
        if (visibleCards.length < MAX_VISIBLE_CARDS) {
            flipCard(clickedCardId);
        }
    };

    const updateScore = () => {
        setScore(oldScore => oldScore + 1);
    };

    const checkMatch = () => {
        const visible = cards.filter(card => visibleCards.indexOf(card.uniqueId) !== -1);

        const matched = visible[0].id === visible[1].id;

        const updatedCards = cards.map(card => {
            if (visibleCards.indexOf(card.uniqueId) !== -1) {
                card.isShown = false;
                card.isFound = matched;
            }

            return card;
        });

        setTimeout(() => {
            setCards(updatedCards);
            setVisibleCards([]);
            if (matched) updateScore();
        }, PACES[gamePace]);
    };

    React.useEffect(() => {
        if (images.length > 0) prepareCards();
    }, [images]);

    React.useEffect(() => {
        if (visibleCards.length >= MAX_VISIBLE_CARDS) {
            checkMatch();
        }
    }, [visibleCards]);

    React.useEffect(() => {
        if (images.length && score === images.length) {
            setIsWin(true);
        }
    }, [score]);

    return { cards, onCardClick, isWin };
};

export default useGameLogic;
