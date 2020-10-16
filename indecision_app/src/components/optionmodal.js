import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.clearSelectedOption}
        contentLabel={props.isEnglish ? "Selected Option" : 'Компютърът избра!'}
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">
            {props.isEnglish ? "Selected Option" : 'Компютърът избра!'}
        </h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button
            className="button button--medium button--purple" 
            onClick={props.clearSelectedOption}>
                { props.isEnglish ? 'Okey' : 'Добре' }
            </button>
    </Modal>

);

export default OptionModal;