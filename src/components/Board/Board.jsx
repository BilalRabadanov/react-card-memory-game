import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useGetImages from '../../hooks/useGetImages';
import useGameLogic from '../../hooks/useGameLogic';

import Card from '../Card';
import Loader from './../Loader';
import Result from './../Result';

import styles from './Board.module.css';

const Board = ({ gameOptions, restartGame }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const images = useGetImages(gameOptions);
    const { cards, onCardClick, isWin } = useGameLogic(images, gameOptions.pace)

    useEffect(() => {
        if (images.length > 0) setIsLoading(false)
    }, [images])

    return (
        <div>
            {isWin && <Result restartGame={restartGame} />}
            {isLoading ? (
                <Loader />
            ) : (
                <div className={`${styles.board}`}>
                    {cards.map(card => (
                        <Card key={card.uniqueId} card={card} onCardClick={onCardClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Board;

Board.propTypes = {
    gameOptions: PropTypes.shape({
        pace: PropTypes.string.isRequired,
        cardsCount: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired
    }),
    restartGame: PropTypes.func.isRequired
}