import React from 'react';

const Action = (props) => (
    <div>
        <button
            className="button button--big button--purple"
            disabled={!props.hasOptions}
            onClick={props.handlePick}
        >
            What should I do?
        </button>
    </div>
);

export default Action;