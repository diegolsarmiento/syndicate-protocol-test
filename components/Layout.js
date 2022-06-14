import React from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Layout = (props) => {
    return (
        <div>
            <Container>
                {props.children}
            </Container>
        </div>
    )
};
export default Layout;