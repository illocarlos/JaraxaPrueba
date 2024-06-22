import PropTypes from 'prop-types';
import Modal from 'react-modal';

const ModalComponent = ({ isOpen, onRequestClose, selectMedically }) => {


    const customStyles = {
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            border: 'none',
            borderRadius: '0.80vw',
            overflow: 'hidden',
            width: `90%`,
            height: `90%`
        }
    };

    return (
        <Modal

            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
            <p className='text-center'>{selectMedically.brand_name}</p>
            <div className=' overflow-y-scroll '>
                <p className='text-center'>{selectMedically.label_principal}</p>
                <p className='text-center'>{selectMedically.manufacturer_name}</p>
                <p className='text-center'>{selectMedically.dosage_and_administration}</p>
                <p className='text-center'>{selectMedically.ingredient}</p>
                <p className='text-center'>{selectMedically.administration}</p>

                <div>
                    <p className='text-center'>{selectMedically.administration}</p>
                    <p className='text-center'>{selectMedically.dont_use}</p>
                    <p className='text-center'>{selectMedically.when_using}</p>
                    <p className='text-center'>{selectMedically.when_stop}</p>
                    <p className='text-center'>{selectMedically.stop_use}</p>
                    <p className='text-center'>{selectMedically.do_not_use}</p>
                </div>
                <div>
                    <p className='text-center'>{selectMedically.purpose}</p>
                    <p className='text-center'>{selectMedically.pregnancy}</p>
                    <p className='text-center'>{selectMedically.do_not_use}</p>
                </div>
            </div>
            <div className="button-container">
                <button className='bg-red-500 px-2  rounded-lg text-white mb-4 absolute right-2 top-2' onClick={onRequestClose}>X</button>
            </div>
        </Modal>
    );
};

ModalComponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    selectMedically: PropTypes.object.isRequired
};

export default ModalComponent;
