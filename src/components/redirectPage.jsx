import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

class RedirectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validMsg: 'Loading...',
        };
    }

    componentDidMount() {
        const {
            match: { params },
        } = this.props;

        var url = 'https://zhenhui-assignment3-server.herokuapp.com/api/url/'.concat(
            params.uniquePathId
        );

        Axios.get(url)
            .then(resp => {
                if (!resp.data) {
                    this.setState({ validMsg: 'Page Not Found' });
                    window.location.replace('/');
                } else {
                    this.setState({ validMsg: 'Redirecting...' });
                    if (resp.data.startsWith("http")) {
                        window.location.replace(resp.data);
                    } else {
                        window.location.replace("//"+resp.data);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div>
                    <a href="/">
                        <h1 className="brand">Simple URL Shortener</h1>
                    </a>
                    <h1>{this.state.validMsg}</h1>
                </div>
            </div>
        );
    }
}

RedirectPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            uniquePathId: PropTypes.string.isRequired,
        }),
    }),
};

export default RedirectPage;
