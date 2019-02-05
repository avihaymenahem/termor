import React, { PureComponent } from 'react';
import WithLayout from '../HOC/WithLayout';

class NotYetExistView extends PureComponent {
    render() {
        return(
            <div>Not Yet Exist</div>
        );
    }
}

export default WithLayout(NotYetExistView);