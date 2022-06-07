import React from 'react';
import PropTypes from 'prop-types';

import { CATEGORIES, INITIAL_CARDS_COUNT, PACE } from "../../constants.js"

import RadioBox from "../RadioBox"
import Counter from "../Counter"

import styles from './Settings.module.css';

const Settings = ({ startGame }) => {
    const [category, setCategory] = React.useState(CATEGORIES[1])
    const [pace, setPace] = React.useState(PACE[0])
    const [cardsCount, setCardsCount] = React.useState(INITIAL_CARDS_COUNT)

    const onStartGameClick = () => {
        startGame({ category, pace, cardsCount })
    }

    return (
        <div className={`${styles.settings} frosted`}>
            <h2>Settings</h2>
            <h4>Category:</h4>
            <div className={`${styles.setting}`}>
                {CATEGORIES.map(item => (
                    <RadioBox
                        key={item}
                        name={item}
                        selectedItem={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                ))}
            </div>

            <h4>Amount of cards:</h4>
            <div className={`${styles.setting}`}>
                <Counter
                    cardsCount={cardsCount}
                    onClick={setCardsCount}
                />
            </div>

            <h4>Pace:</h4>
            <div className={`${styles.setting}`}>
                {PACE.map(item => (
                    <RadioBox
                        key={item}
                        name={item}
                        selectedItem={pace}
                        onChange={e => setPace(e.target.value)}
                    />
                ))}
            </div>

            <button className={`${styles.button} frosted`} onClick={onStartGameClick}>
                Start
            </button>
        </div>
    );
};

export default Settings;

Settings.propTypes = {
    startGame: PropTypes.func.isRequired
}