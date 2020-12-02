import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUrl: '',
            uniquePathId: '',
            msg: '',
            validUrl: true,
            validPath: true,
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
                    this.setState({ validPath: false });
                } else {
                    this.setState({ validPath: true });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    async handleUpdate() {
        const {
            match: { params },
        } = this.props;

        await Axios.get("https://cors-anywhere.herokuapp.com/".concat(this.state.newUrl)).catch(() => {
            this.setState({
                msg: 'The URL you entered is not valid.',
                validUrl: false,
            });
        });

        if (this.state.newUrl === '') {
            this.setState({
                msg: 'Please enter new URL',
                validUrl: false,
            });
        }

        if (this.state.validUrl) {
            Axios.put(
                'https://zhenhui-assignment3-server.herokuapp.com/api/url/',
                {
                    originalUrl: this.state.newUrl,
                    uniquePathId: params.uniquePathId,
                }
            )
                .then(resp => {
                    if (resp.status === 200) {
                        this.setState({ msg: 'Updated!' });
                    } else if (resp.status === 204) {
                        this.setState({
                            msg: 'Same URL provided. Nothing happened.',
                        });
                    } else {
                        this.setState({ msg: 'Something went wrong...' });
                    }
                })
                .catch(() => {
                    this.setState({ msg: 'System Error!' });
                });
        }

        this.setState({ validUrl: true });
    }

    handleDelete() {
        const {
            match: { params },
        } = this.props;
        console.log(params);
        Axios.delete(
            'https://zhenhui-assignment3-server.herokuapp.com/api/url/',
            { data: { uniquePathId: params.uniquePathId } }
        ).then(resp => {
            console.log(resp);
            if (resp.status === 200) {
                this.setState({ msg: 'Deleted! Redirecting to home page...' });
                window.location.replace('/');
            } else {
                this.setState({ msg: 'Something went wrong...' });
            }
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
                {!this.state.validPath ? (
                    <div>
                        <div>
                            <a href="/">
                                <h1 className="brand">Simple URL Shortener</h1>
                            </a>
                        </div>
                        <h1>Invalid Brand Name.</h1>
                    </div>
                ) : (
                    <div>
                        <div>
                            <a href="/">
                                <h1 className="brand">Simple URL Shortener</h1>
                            </a>
                        </div>
                        <div className="container">
                            <div className="option-container">
                                <h3 className="title">
                                    Please Enter new URL Info:
                                </h3>
                            </div>
                            <div className="option-container">
                                <div className="options">
                                    <input
                                        className="option"
                                        type="text"
                                        name="newURL"
                                        value={this.state.originalUrl}
                                        placeholder="New URL"
                                        onChange={e =>
                                            this.onChange('newUrl', e)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="option-container">
                                <div className="options">
                                    <button
                                        className="button"
                                        type="submit"
                                        onClick={() => this.handleUpdate()}>
                                        Update URL
                                    </button>
                                </div>
                            </div>
                            <div className="option-container">
                                <div className="options">
                                    <button
                                        className="button"
                                        tyep="submit"
                                        onClick={() => this.handleDelete()}>
                                        Delete this entry
                                    </button>
                                </div>
                            </div>
                            <div className="option-container">
                                <div className="options">
                                    <h4>{this.state.msg}</h4>
                                </div>
                            </div>
                            </div>
                        </div>
                )}
            </div>
        );
    }
}

EditPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            uniquePathId: PropTypes.string.isRequired,
        }),
    }),
};

export default EditPage;
