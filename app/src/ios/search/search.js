'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Switch
} from 'react-native';

import searchResults from './searchResults';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            eventSwitchTitle: true,
            eventSwitchBase: true,
            textSwitchBase: 'Search by phone',
        }
    }

    clearSearch() {
        this.setState({
            searchQuery: '',
            invalidValue: false
        })
    }

    onSearchPressed() {
        if (this.state.searchQuery == undefined ||
            this.state.searchQuery == '') {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.props.navigator.push({
            component: searchResults,
            title: this.state.searchQuery,
            passProps: {
                searchQuery: this.state.searchQuery,
                searchType: this.state.textSwitchBase
            }
        });
    }

    toggleTypeChange() {
        if (!this.state.eventSwitchBase) {
            this.setState({
                textSwitchBase: 'Search by phone',
                eventSwitchBase: true
            });
        } else {
            this.setState({
                textSwitchBase: 'Search by name',
                eventSwitchBase: false
            });
        }
    }

    render() {
        let validCtrl;

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <TouchableHighlight
                        onPress={this.clearSearch.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Search
                        </Text>
                    </TouchableHighlight>

                    <View style={styles.form}>
                        <View style={styles.textForm}>
                            <Text style={styles.text}>
                                {this.state.textSwitchBase}
                            </Text>
                        </View>

                        <View>
                            <Switch
                                onValueChange={(value) => {
                                    this.toggleTypeChange();
                                    this.setState({
                                        eventSwitchTitle: value
                                    });
                                }}
                                value={this.state.eventSwitchTitle}
                            />
                        </View>
                    </View>

                    <TextInput
                        onChangeText={(text) => this.setState({
                            searchQuery: text,
                            invalidValue: false
                        })}
                        value={this.state.searchQuery}
                        style={styles.loginInput}
                        placeholder="Search here">
                    </TextInput>

                    {validCtrl}

                    <TouchableHighlight
                        onPress={this.onSearchPressed.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </TouchableHighlight>

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    form: {
        height: 50,
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        fontSize: 18
    },
    textForm: {
        marginTop: 3,
        flex: 1
    },
    text: {
        fontSize: 18,
        color: 'gray'
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        paddingLeft: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
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
        fontSize: 20,
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

export default Search;