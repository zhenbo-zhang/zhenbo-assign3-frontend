import Axios from 'axios';
import React from 'react';

class RequestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shortenedURL: '',
            originalUrl: '',
            uniquePathId: '',
            msg: '',
            validUrl: true,
        };
    }

    async onSubmit() {
        await Axios.get(this.state.originalUrl).catch(() => {
            this.setState({
                shortenedURL: '',
                msg: 'The URL you entered is not valid.',
                validUrl: false,
            });
        });

        if (this.state.originalUrl === '') {
            this.setState({
                shortenedURL: '',
                originalUrl: '',
                uniquePathId: '',
                msg: 'Please enter original URL.',
                validUrl: false,
            });
        }

        if (this.state.validUrl) {
            Axios.post(
                'https://zhenhui-assignment3-server.herokuapp.com/api/url/',
                {
                    originalUrl: this.state.originalUrl,
                    uniquePathId: this.state.uniquePathId,
                }
            )
                .then(resp => {
                    if (resp.data.brandInUse) {
                        this.setState({
                            msg:
                                'This Brand is already used. Try a different one.',
                        });
                    } else {
                        var url = window.location.href
                            .concat('url/')
                            .concat(resp.data.uniquePathId);
                        this.setState({ shortenedURL: url });
                        if (resp.data.urlFound) {
                            this.setState({
                                msg:
                                    'This URL is already shorted before. The shortened URL is ' +
                                    url,
                            });
                        } else {
                            this.setState({
                                msg: 'Success! The shortened URL is ' + url,
                            });
                        }
                    }
                })
                .catch(() => {
                    this.setState({ msg: 'System Error!' });
                })
                .finally(() => {
                    this.setState({
                        shortenedURL: '',
                        originalUrl: '',
                        uniquePathId: '',
                        validUrl: true,
                    });
                });
        }

        this.setState({
            validUrl: true,
        });
    }

    onChange(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <div>
                    <a href="/">
                        <h1 className="brand">Simple URL Shortener</h1>
                    </a>
                </div>
                <div className="container">
                    <div className="option-container">
                        <h3 className="title">Please Enter URL Info:</h3>
                    </div>
                    <div className="option-container">
                        <div className="options">
                            <input
                                className="option"
                                type="text"
                                name="originalURL"
                                value={this.state.originalUrl}
                                placeholder="Orinial URL"
                                onChange={e => this.onChange('originalUrl', e)}
                                required
                            />
                        </div>
                    </div>
                    <div className="option-container">
                        <div className="options">
                            <input
                                className="option"
                                type="text"
                                name="uniquePathID"
                                value={this.state.uniquePathId}
                                placeholder="Custom URL Brand"
                                onChange={e => this.onChange('uniquePathId', e)}
                            />
                        </div>
                    </div>
                    <div className="option-container">
                        <div className="options">
                            <button
                                className="button"
                                type="submit"
                                onClick={() => this.onSubmit()}>
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="option-container">
                        <div className="options">
                            <h4>{this.state.msg}</h4>
                            <h4>{this.state.shortenedURL}</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RequestPage;
