import React from 'react';

const Action = (props) => (
    <div>
        <button
            className="button button--big button--purple"
            disabled={!props.hasOptions}
            onClick={props.handlePick}
        >
            {props.isEnglish ? 'What should I do?' : 'С какво да се захвана сега?'}
        </button>
    </div>
);

export default Action;