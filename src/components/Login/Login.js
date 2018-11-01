import React, {Component} from 'react';
import styled from 'styled-components';

const Body = styled.div`

`


class Login extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    
    login = () => {
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

        window.location = `http://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }

    render(){
        return (
            <Body>
                Title Page
                <br/>
                <hr/>
                <hr/>
                Login Page
                <br/>
                <br/>
                <button onClick={this.login}>Login / Register</button>
                {/* <button>Register</button> */}
            </Body>
        )
    }
}
export default Login;