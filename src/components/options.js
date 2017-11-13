import React from 'react';

import Option from './option';

const Options = (props) => (
    <div>
        {props.options.length === 0 &&  <p className="widget-body__message "> {
            props.isEnglish ? 'Please, add an option to get started' : 'Моля, добави опции ...'
        }.</p>}
        <div className="widget-header">
            <h3 className="widget-header__title">
                {props.isEnglish ? 'Your Options' : 'Твоите опции'}
            </h3>
                <button
                    className="button button--link button--white-bg"
                    onClick={props.deleteOptions}>
                    { props.isEnglish ? 'Remove all' : 'Изтрий всички' }
                </button>
            </div>
            <ol className="widget-body__options">
                {
                props.options.map((option,i) => <Option key={i}
                                            count={i+1}
                                            optionText={option}
                                            deleteOption={props.deleteOption} 
                                            isEnglish={props.isEnglish}
                                            />)
                }
            </ol>
    </div>
);

export default Options;