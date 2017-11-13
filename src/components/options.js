import React from 'react';

import Option from './option';

const Options = (props) => (
    <div>
        {props.options.length === 0 &&  <p className="widget-body__message ">Please, add an option to get started.</p>}
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
                <button
                    className="button button--link button--white-bg"
                    onClick={props.deleteOptions}>
                    Remove all
                </button>
            </div>
            <ol className="widget-body__options">
                {
                props.options.map((option,i) => <Option key={i}
                                            count={i+1}
                                            optionText={option}
                                            deleteOption={props.deleteOption} />)
                }
            </ol>
    </div>
);

export default Options;