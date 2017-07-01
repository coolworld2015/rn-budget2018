'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
	TouchableWithoutFeedback,
    ScrollView,
    Switch,
    Dimensions,
    AsyncStorage
} from 'react-native';

class Config extends Component {
    constructor(props) {
        super(props);

        let lang, check, language;
        language = appConfig.lang;

        if (language === 'eng') {
            lang = 'English';
            check = true;
        } else {
            lang = 'Русский';
            check = false;
        }

        this.state = {
            eventSwitchBase: check,
            textSwitchBase: lang,
            bugANDROID: '',
        }
    }

    componentDidMount() {
        this.setState({
            width: Dimensions.get('window').width
        });
    }

    goBack() {
        this.props.navigator.pop();
    }

    toggleTypeChange() {
        if (!this.state.eventSwitchBase) {
            appConfig.lang = 'eng';
            appConfig.language = appConfig.eng;
            this.setState({
                textSwitchBase: 'English'
            });
        } else {
            appConfig.lang = 'rus';
            appConfig.language = appConfig.rus;
            this.setState({
                textSwitchBase: 'Русский'
            });
        }
    }

    setLanguage() {
        AsyncStorage.setItem('rn-budget.language', JSON.stringify(appConfig.lang))
            .then(json => {
                appConfig.login.showProgress = false;
                this.props.onLogOut();
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'darkblue',
                    borderWidth: 0,
                    borderColor: 'whitesmoke'
                }}>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='darkblue'
						>
                            <View>
                                <Text style={styles.textSmall}>
									{appConfig.language.back}
                                </Text>
                            </View>
                        </TouchableHighlight>
					</View>
					<View>
						<TouchableWithoutFeedback>
							<View>
								<Text style={{
									fontSize: 20,
									textAlign: 'center',
									margin: 10,
									marginRight: 40,
									fontWeight: 'bold',
									color: 'white'
								}}>
									{appConfig.language.config}
								</Text>
							</View>
						</TouchableWithoutFeedback>	
					</View>
					<View>
						<TouchableWithoutFeedback>
							<View>
								<Text style={{
									fontSize: 16,
									textAlign: 'center',
									margin: 14,
									fontWeight: 'bold'
								}}>
								</Text>
							</View>
						</TouchableWithoutFeedback>	
					</View>
                </View>

                <ScrollView>
                    <View style={{
                        flex: 1,
                        padding: 10,
                        paddingBottom: 40,
                        justifyContent: 'center',
                        backgroundColor: 'white'
                    }}>
                        <View style={{
                            height: 50,
                            borderWidth: 1,
                            borderColor: 'darkblue',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderRadius: 5
                        }}>
                            <View style={{
                                fontSize: 18,
                                marginTop: 10,
                                margin: 10,
                            }}>
                                <Text style={{
                                    fontSize: 18,
									color: 'darkblue'
                                }}>
                                    {this.state.textSwitchBase}
                                </Text>
                            </View>

                            <View style={{
                                fontSize: 18,
                                marginTop: 10,
                                margin: 10,
                            }}>
                                <Switch
                                    onValueChange={(value) => {
                                        this.toggleTypeChange();
                                        this.setState({
                                            eventSwitchBase: value
                                        });
                                    }}
                                    value={this.state.eventSwitchBase}
                                />
                            </View>
                        </View>

                        <TouchableHighlight
                            onPress={() => this.setLanguage()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                {appConfig.language.submit}
                            </Text>
                        </TouchableHighlight>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        height: 50,
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
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
    }
});

export default Config;