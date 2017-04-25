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
    Picker,
    CameraRoll
} from 'react-native';

class AuditAdd extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            showProgress: false,
			serverError: true,
            items: [],
            item: 'New item',
            dataSource: ds.cloneWithRows([])
        };
    }
	
	componentDidMount() {
		this.getUsers();
	}
	
    getUsers() {
        fetch(appConfig.url + 'api/users/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				var items = responseData.sort(this.sort);
				items.unshift({name: 'Select user'});
				//console.log(items);
                this.setState({
                    items: items
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false,
                    serverError: false
                });
            });
    }

    sort(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    addUser() {
        if (this.state.name == undefined ||
            this.state.pass == undefined ||
            this.state.description == undefined) {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true,
			bugANDROID: ' '
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
								Back
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 20,
								textAlign: 'center',
								margin: 10,
								marginRight: 40,
								fontWeight: 'bold',
								color: 'white'
							}}>
								 New
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold'
							}}>
								 
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				<ScrollView>
					<View style={{backgroundColor: 'white'}}>
						<View style={{
							borderColor: 'lightgray',
							borderWidth: 5,
							marginTop: 15,
							margin: 5,
							marginBottom: 0,
							flex: 1,
						}}>
							<Picker style={{marginTop: 0}}
                                selectedValue={this.state.item}

                                onValueChange={(value) => {
									let arr = [].concat(this.state.items);
 									let item = arr.filter((el) => el.id == value);
 
                                    this.setState({
                                        item: value,
                                        id: item[0].id,
                                        name: item[0].name,
										pass: item[0].pass,
										description: item[0].description,
										invalidValue: false
                                    })
                                }}>

								{this.state.items.map((item, i) =>
									<Picker.Item value={item.id} label={item.name} key={i}/>
								)}
							</Picker>
						</View>
					</View>

					<View style={{
						flex: 1,
						padding: 10,
						paddingTop: 0,
						marginTop: 0,
						backgroundColor: 'white'
					}}>
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								name: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.name}
							placeholder="Name">
						</TextInput>
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							style={styles.loginInput}
							value={this.state.id}
							placeholder="ID">
						</TextInput>

						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								pass: text,
								invalidValue: false
							})}
							style={styles.loginInput}
							value={this.state.pass}
							placeholder="Password">
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
							placeholder="Description">
						</TextInput>

						{validCtrl}

						<TouchableHighlight
							onPress={()=> this.addUser()}
							style={styles.button}>
							<Text style={styles.buttonText}>Add</Text>
						</TouchableHighlight>
						
						{errorCtrl}

						<ActivityIndicator
							animating={this.state.showProgress}
							size="large"
							style={styles.loader}
						/>
					</View>
				</ScrollView>
			</View>
        )
    }
}

const styles = StyleSheet.create({
    imgsList: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
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
        borderRadius: 0,
        color: 'black'
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
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
		marginTop: 30
    },
    error: {
        color: 'red',
        paddingTop: 20,
        textAlign: 'center'
    },
    img: {
        height: 300,
        width: 300,
        borderRadius: 20,
        margin: 20,
        alignItems: 'center'
    }
});

export default AuditAdd;
