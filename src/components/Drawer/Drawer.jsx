import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './Drawer.style.css';

export default class Drawer extends PureComponent {
    static defaultProps = {
        isOpened: false,
        onClose: () => {
            console.error("No 'onClose' prop exists")
        }
    };

    render() {
        const ContentElement = this.props.content;

        return (
            <div className='drawer-container' style={{ right: (this.props.isOpened ? 0 : '-400px') }}>
                <FontAwesomeIcon
                    onClick={this.props.onClose}
                    icon={faTimes}
                    color="white"
                    className='drawer-close-icon' />
                <ContentElement/>
            </div>
        );
    }
}