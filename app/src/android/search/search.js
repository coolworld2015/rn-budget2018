'use strict';

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
    Switch,
	Dimensions,
	Picker,
	DatePickerAndroid,
	TouchableWithoutFeedback,
} from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);
		
		var width = Dimensions.get('window').width;
		
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
		
		let d = new Date;
		var todayDate = d.toLocaleDateString();
		
        this.state = {
            showProgress: false,
			serverError: false,
            eventSwitchTitle: true,
			eventSwitchBase: true,
            textSwitchBase: 'Choose project',
			projectName: appConfig.language.allproj,
			departmentName: appConfig.language.alldep,
			employeeName: appConfig.language.allemp,
			bugANDROID: '',
            projects: [],
            departments: [],
            employees: [],
            dataSource: ds.cloneWithRows([]),
			
			presetDate: new Date(),
			simpleDate: new Date(),
			spinnerDate: new Date(),
			calendarDate: new Date(),
			defaultDate: new Date(),
			allDate: new Date(),
			startText: '01/01/17',
			endText: todayDate,
			simpleText: 'pick a date',
			spinnerText: 'pick a date',
			calendarText: 'pick a date',
			defaultText: 'pick a date',
			minText: 'pick a date, no earlier than today',
			maxText: 'pick a date, no later than today',
			presetText: 'pick a date, preset to 2020/5/5',
			allText: 'pick a date between 2020/5/1 and 2020/5/10'
        }
    }
	
	componentDidMount() {
		this.setState({
			width: Dimensions.get('window').width
        });
		this.getProjects();
		this.getDepartments();
		this.getEmployees();
	}
	
	getProjects() {
        fetch(appConfig.url + 'api/projects/get', {			
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
				items.unshift({name: appConfig.language.allproj});
                this.setState({
                    projects: items,
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
				items.unshift({name: appConfig.language.alldep});
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

	getEmployees() {
        fetch(appConfig.url + 'api/employees/get', {			
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
				items.unshift({name: appConfig.language.allemp});
                this.setState({
                    employees: items,
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
	
    goBack() {
		this.props.navigator.pop();
	}
	
    clearSearch() {
        this.setState({
            searchQuery: '',
            invalidValue: false
        })
    }

    onSearchPressed() { 
		this.props.navigator.push({
			index: 2,
			data: {
				projectName: this.state.projectName,
				departmentName: this.state.departmentName,
				employeeName: this.state.employeeName,
				startDate: this.state.startText,
				endDate: this.state.endText
			}
		});
    }
	
    toggleTypeChange() {
        if (!this.state.eventSwitchBase) {
            this.setState({
                textSwitchBase: 'Choose project'
            });
        } else {
            this.setState({
                textSwitchBase: 'Choose project'
            });
        }
    }
	
	showPicker = async (stateKey, options) => {
		try {
			var newState = {};
			const {action, year, month, day} = await DatePickerAndroid.open(options);
			if (action === DatePickerAndroid.dismissedAction) {
				//newState[stateKey + 'Text'] = 'dismissed';
			} else {
				var date = new Date(year, month, day);
				newState[stateKey + 'Text'] = date.toLocaleDateString();
				newState[stateKey + 'Date'] = date;
			}
			this.setState(newState);
		} catch ({code, message}) {
			console.warn(`Error in example '${stateKey}': `, message);
		}
	};

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
		
		var loader = <View />;

        if (this.state.showProgress) {
			loader = <ActivityIndicator
				animating={true}
				size="large"
			/>
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
							
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 20,
								textAlign: 'center',
								margin: 10,
								//marginRight: 40,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{appConfig.language.reports} 
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
						{errorCtrl}
						
						{loader}
						
						<View style={{
							borderColor: 'lightgray',
							borderWidth: 5,
							marginTop: 10,
							margin: 10,
							marginBottom: 0,
							flex: 1,
						}}>
							<Picker style={{marginTop: 0}}
								selectedValue={this.state.project}

								onValueChange={(value) => {
									let arr = [].concat(this.state.projects);
									let project = arr.filter((el) => el.id == value);
									
									this.setState({
										project: value,
										projectID: project[0].id,
										projectName: project[0].name,
										invalidValue: false
									})
								}}>

								{this.state.projects.map((item, i) =>
									<Picker.Item value={item.id} label={item.name} key={i}/>
								)}
							</Picker>
						</View>
					</View>
					
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
								selectedValue={this.state.employee}

								onValueChange={(value) => {
									let arr = [].concat(this.state.employees);
									let employee = arr.filter((el) => el.id == value);
 
									this.setState({
										employee: value,
										employeeID: employee[0].id,
										employeeName: employee[0].name,
										invalidValue: false
									})
								}}>

								{this.state.employees.map((item, i) =>
									<Picker.Item value={item.id} label={item.name} key={i}/>
								)}
							</Picker>
						</View>
					</View>					

					<View style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}>				
						<TouchableHighlight
							onPress={this.showPicker.bind(this, 'start', {date: this.state.simpleDate})}
							style={styles.button1}>
							<Text style={styles.buttonText1}>{appConfig.language.firstday}: {this.state.startText}</Text>
						</TouchableHighlight>						
						
						<TouchableHighlight
							onPress={this.showPicker.bind(this, 'end', {date: this.state.simpleDate})}
							style={styles.button1}>
							<Text style={styles.buttonText1}>{appConfig.language.lastday}: {this.state.endText}</Text>
						</TouchableHighlight>	
										
						{validCtrl}

						<TouchableHighlight
							onPress={this.onSearchPressed.bind(this)}
							style={styles.button}>
							<Text style={styles.buttonText}>{appConfig.language.submit}</Text>
						</TouchableHighlight>
					</View>
				</ScrollView>
			</View>
        )
    }
}

const styles = StyleSheet.create({
	text: {
		color: 'black',
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
    countHeader1: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    container: {
		padding: 10,
        paddingBottom: 210,
        alignItems: 'center',
        flex: 1,
		backgroundColor: 'white',
    },
    logo: {
        width: 66,
        height: 65
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
		width: 360,
        marginTop: 10,
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
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    button1: {
        height: 50,
        borderWidth: 1,
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        margin: 10,
        marginBottom: 0,
        justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 5
    },    
    buttonText: {
        color: '#fff',
        fontSize: 20,
		fontWeight: 'bold'
    },    
	buttonText1: {
        fontSize: 20,
		fontWeight: 'bold',
		color: 'gray',
		textAlign: 'left',
		marginLeft: 5,
    },
    loader: {
        marginTop: 40
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Search;