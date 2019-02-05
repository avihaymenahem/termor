import React, { PureComponent } from 'react';
import Layout from '../components/Layout/Layout';

const WithLayout = (WrappedComponent) => {
    return class extends PureComponent {
        render() {
            return (
                <Layout>
                    <WrappedComponent {...this.props}/>
                </Layout>
            );
        }
    }
}

export default WithLayout;