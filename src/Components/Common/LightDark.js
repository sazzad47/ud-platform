import React from 'react';

//constants
import { layoutModeTypes } from '../../Components/constants/layout';

const LightDark = ({ layoutMode, onChangeLayoutMode }) => {
    const mode =
        layoutMode === layoutModeTypes['DARKMODE']
            ? layoutModeTypes['LIGHTMODE']
            : layoutModeTypes['DARKMODE'];

    console.log(
        'in LightDark - layoutMode (the mode we are now setting): ',
        layoutMode
    );
    console.log(
        'in LightDark - mode (the mode that the new button will set): ',
        mode
    );
    console.log(
        `If we click on the button (${
            layoutMode === 'dark' ? 'sun' : 'moon'
        }) we will call onChangeLayoutMode with mode: `,
        mode
    );
    console.log('-------------------------');

    return (
        <div className='ms-1 header-item d-none d-sm-flex'>
            <button
                onClick={() => {
                    console.log(
                        'Button clicked. now calling onChangeLayoutMode with mode: ',
                        mode
                    );
                    onChangeLayoutMode(mode);
                }}
                type='button'
                className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode'
            >
                <i className='bx bx-moon fs-22'></i>
            </button>
        </div>
    );
};

export default LightDark;
