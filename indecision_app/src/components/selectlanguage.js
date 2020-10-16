import React from 'react';

const SelectLanguage = (props) => (
   <div className="select-language">
        <span>{props.isEnglish ? 'Language' : 'Eзик'}</span>
        <select 
            className="form-control"
            value={ props.isEnglish ? 'english' : 'bulgarian' }
            onChange={(e) => {
                props.selectLanguage(e.target.value);
            }}
        >
            <option value="english">EN</option>
            <option value="bulgarian">BG</option>
        </select>
   </div>
);

export default SelectLanguage;