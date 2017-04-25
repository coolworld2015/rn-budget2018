import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput,
	BackAndroid,
	Alert
} from 'react-native';

class ProjectDetails extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});			
		
		this.state = {
			serverError: false
		}	
		
		if (props.data) {
			this.state = {
				id: props.data.id,
				name: props.data.name,
				address: props.data.address,
				phone: props.data.phone,
				description: props.data.description,
				sumShow: ((+props.data.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
				sum: props.data.sum,
				showProgress: false
			};
		}		
    }

    updateItem() {
        if (this.state.name == '' ||
            this.state.address == '' ||
            this.state.phone == '' ||
            this.state.sum == '' ||
            this.state.description == '') {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true,
			bugANDROID: ' '
        });

        fetch(appConfig.url + 'api/projects/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
				address: this.state.address,
				phone: this.state.phone,
                description: this.state.description,
                sum: this.state.sum,
				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				if (responseData) {
					appConfig.projects.refresh = true;
					this.props.navigator.pop();
				} else {
					this.setState({
						badCredentials: true
					});
				}
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    deleteItemDialog() {
		Alert.alert(
			appConfig.language.delrec,
			appConfig.language.conform + this.state.name + '?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
				{
					text: 'OK', onPress: () => {
					this.deleteItem();
					}
				},
			]
		);	
	}
	
    deleteItem() {		
        this.setState({
            showProgress: true,
			bugANDROID: ' '
        });
		
        fetch(appConfig.url + 'api/projects/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
			.then((response)=> response.json())
            .then((responseData)=> {
				console.log(responseData);
				if (responseData.text) {
					appConfig.projects.refresh = true;
					this.props.navigator.pop();
				} else {
					this.setState({
						badCredentials: true
					});
				}
            })
            .catch((error)=> {
                console.log(error);
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });

    }
    
	goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        var errorCtrl = <View />;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        var validCtrl = <View />;

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					backgroundColor: '#48BBEC',
					borderWidth: 0,
					borderColor: 'whitesmoke'
				}}>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{appConfig.language.back}
							</Text>
						</TouchableHighlight>	
					</View>
					<View style={{flex:1,flexDirection:'column', flexWrap:'wrap'}}>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 20,
								textAlign: 'center',
								margin: 10,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{this.state.name}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							onPress={()=> this.deleteItemDialog()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{appConfig.language.delete}
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
				<ScrollView>
					<View style={{
						flex: 1,
						padding: 10,
						paddingBottom: 40,
						justifyContent: 'flex-start',
						backgroundColor: 'white'
					}}>						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							multiline={true}
							editable={false}
							style={styles.loginInputBold}
							value={this.state.name}
							placeholder="Name">						
						</TextInput>	
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								address: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.address}
							placeholder={appConfig.language.address}>
						</TextInput>
												
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								phone: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.phone}
							placeholder={appConfig.language.phone}>
						</TextInput>

						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							multiline={true}
							onChangeText={(text)=> this.setState({
								description: text,
								invalidValue: false
							})}
							style={styles.loginInput1}
							value={this.state.description}
							placeholder={appConfig.language.description}>
						</TextInput>
						
						<View style={{
							flexDirection: 'row',
							marginTop: 10
						}}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.total}: {this.state.sumShow}
							</Text>		
						</View>

						{validCtrl}

						<TouchableHighlight
							onPress={()=> this.updateItem()}

							style={styles.button}>
							<Text style={styles.buttonText}>{appConfig.language.submit}</Text>
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
			</View>
        );
    }
}

const styles = StyleSheet.create({
    itemTextBold: {
		fontSize: 20,
		textAlign: 'left',
		margin: 5,
		fontWeight: 'bold',
		color: 'black'
    },    
	itemText: {
		fontSize: 20,
		textAlign: 'left',
		margin: 5,
		marginLeft: 2,
		color: 'black'
    },
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'whitesmoke'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
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
	loginInputBold: {
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
    loginInput1: {
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
    },
    img: {
        height: 95,
        width: 75,
        borderRadius: 20,
        margin: 20
    }
});

export default ProjectDetails;
