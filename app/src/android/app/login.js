'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Dimensions
} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            username: '1',
            password: '1',
            bugANDROID: ''
        }
    }

    componentDidMount() {
        this.setState({
            width: Dimensions.get('window').width
        });
    }

    onLogin() {
        if (appConfig.login.showProgress === true) {
            return;
        }

        if (this.state.username === undefined || this.state.username === '' ||
            this.state.password === undefined || this.state.password === '') {
            this.setState({
                badCredentials: true
            });
            return;
        }

        this.setState({
            showProgress: true,
            bugANDROID: ' '
        });

        appConfig.login.showProgress = true;

        fetch(appConfig.url + 'api/login', {
            method: 'post',
            body: JSON.stringify({
                name: this.state.username,
                pass: this.state.password,
                description: 'Android'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.token) {
                    appConfig.access_token = responseData.token;

                    this.setState({
                        badCredentials: false
                    });

                    this.props.onLogin();
                } else {
                    this.setState({
                        badCredentials: true
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    badCredentials: true
                });
            })
            .finally(() => {
                appConfig.login.showProgress = false;
                this.setState({
                    showProgress: false
                });
            });
    }

    render() {
        let errorCtrl;

        if (this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>;
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.logo}
                           source={require('../../../img/logo.jpg')}
                    />
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={styles.heading}>
                            {appConfig.language.title}
                        </Text>
                    </View>
                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text) => this.setState({
                            username: text,
                            badCredentials: false
                        })}
                        style={{
                            height: 50,
                            width: this.state.width * .90,
                            marginTop: 10,
                            padding: 4,
                            fontSize: 18,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 5,
                            color: 'black',
                            backgroundColor: 'white'
                        }}
                        value={this.state.username}
                        placeholder={appConfig.language.login}>
                    </TextInput>

                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text) => this.setState({
                            password: text,
                            badCredentials: false
                        })}
                        style={{
                            height: 50,
                            width: this.state.width * .90,
                            marginTop: 10,
                            padding: 4,
                            fontSize: 18,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 5,
                            color: 'black',
                            backgroundColor: 'white'
                        }}
                        value={this.state.password}
                        placeholder={appConfig.language.pass}
                        secureTextEntry={true}>
                    </TextInput>

                    <TouchableHighlight
                        //onPress={this.onLoginPressed.bind(this)}
                        onPress={() => this.onLogin()}
                        style={{
                            height: 50,
                            backgroundColor: '#48BBEC',
                            borderColor: '#48BBEC',
                            alignSelf: 'stretch',
                            marginTop: 10,
                            margin: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5
                        }}>
                        <Text style={styles.buttonText}>
                            {appConfig.language.enter}
                        </Text>
                    </TouchableHighlight>

                    {errorCtrl}

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                    />

                    <Text>{this.state.bugANDROID}</Text>
                </View>
            </ScrollView>
        )
    }

    onLoginPressed() {
        this.props.onLogin();
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    container: {
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 150,
        height: 150,
        paddingTop: 140,
        borderRadius: 20,
    },
    heading: {
        fontSize: 30,
        marginTop: 10,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    footer: {
        fontSize: 30,
        marginTop: 10,
    },
    loginInput1: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 0,
        color: 'black',
        backgroundColor: 'white'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Login;
