import React, { PureComponent } from 'react';
import WithLayout from '../HOC/WithLayout';

class RDPView extends PureComponent {
    render() {
        return(
            <div>Hello RDP</div>
        );
    }
}

export default WithLayout(RDPView);