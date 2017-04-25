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
	Picker
} from 'react-native';

class EmployeeAdd extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
        this.state = {
            showProgress: false,
			departments: [],
			bugANDROID: ''
        }
    }
	
	componentDidMount() {
		this.getDepartments();
	}

    getDepartments() {
        fetch(appConfig.url + 'api/departments/get', {			
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
				items.unshift({name: appConfig.language.selectdep});
                this.setState({
                    departments: items,
					serverError: false
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    //showProgress: false
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
	
    addItem() {
		if (appConfig.employees.showProgress == true) {
            return;
        }
		
        if (this.state.name == undefined ||
            this.state.address == undefined ||
            this.state.phone == undefined ||
            this.state.departmentID == undefined ||
            this.state.departmentName == undefined ||			
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
		
		appConfig.employees.showProgress = true;
		
        fetch(appConfig.url + 'api/employees/add', {
            method: 'post',
            body: JSON.stringify({
                id: + new Date,
                name: this.state.name,
                address: this.state.address,
                phone: this.state.phone,
                description: this.state.description,
                departmentID: this.state.departmentID,
                department: this.state.departmentName,
				sum: 0,
				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                appConfig.employees.refresh = true;
                this.props.navigator.pop();
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
								{appConfig.language.newrec}
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
							marginTop: 10,
							margin: 10,
							marginBottom: 0,
							flex: 1,
						}}>
							<Picker style={{marginTop: 0}}
                                selectedValue={this.state.department}

                                onValueChange={(value) => {
									let arr = [].concat(this.state.departments);
 									let department = arr.filter((el) => el.id == value);
 
                                    this.setState({
                                        department: value,
                                        departmentID: department[0].id,
                                        departmentName: department[0].name,
										invalidValue: false
                                    })
                                }}>

								{this.state.departments.map((item, i) =>
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
							placeholder={appConfig.language.name}>
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

						{validCtrl}

						<TouchableHighlight
							onPress={()=> this.addItem()}
							style={styles.button}>
							<Text style={styles.buttonText}>{appConfig.language.add}</Text>
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
        )
    }
}

const styles = StyleSheet.create({
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
        borderRadius: 5,
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

export default EmployeeAdd;
