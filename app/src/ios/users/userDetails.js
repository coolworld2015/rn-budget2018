'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    TextInput
} from 'react-native';

class UserDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.pushEvent.id,
            name: props.pushEvent.name,
            pass: props.pushEvent.pass,
            description: props.pushEvent.description,
            showProgress: false
        };
    }

    updateUser() {
        if (this.state.name == '' ||
            this.state.pass == '' ||
            this.state.description == '') {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });

        fetch(appConfig.url + 'api/users/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                pass: this.state.pass,
                description: this.state.description,
                authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                appConfig.users.refresh = true;
                this.props.navigator.pop();
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    serverError: true
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    render() {
        let errorCtrl, validCtrl;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    padding: 10,
                    justifyContent: 'flex-start'
                }}>

                    <TextInput
                        onChangeText={(text) => this.setState({
                            name: text,
                            invalidValue: false
                        })}
                        style={styles.formInputBold}
                        value={this.state.name}
                        placeholder="Login">
                    </TextInput>

                    <TextInput
                        onChangeText={(text) => this.setState({
                            pass: text,
                            invalidValue: false
                        })}
                        style={styles.loginInput}
                        value={this.state.pass}
                        placeholder="Password">
                    </TextInput>

                    <TextInput
                        multiline={true}
                        onChangeText={(text) => this.setState({
                            description: text,
                            invalidValue: false
                        })}
                        style={styles.formInputArea}
                        value={this.state.description}
                        placeholder="Description">
                    </TextInput>

                    {validCtrl}

                    <TouchableHighlight
                        onPress={() => this.updateUser()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>

                    {errorCtrl}

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formInputBold: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black',
        fontWeight: 'bold'
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
    },
    formInputArea: {
        height: 100,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
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

export default UserDetails;