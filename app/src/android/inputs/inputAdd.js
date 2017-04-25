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
	Alert,
	BackAndroid
} from 'react-native';

class InputAdd extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
        let d = new Date;
        let todayDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear();
		let time = d.toTimeString().split(' ');
		let date = todayDate + ' ' + time[0];
		
        this.state = {
            showProgress: true,
            showProgressAdd: true,
			serverError: false,
            projects: [],
            departments: [],
            employees: [],
            employeesFiltered: [{name: appConfig.language.selectemp}],
            goods: [],
			invoiceID: (appConfig.inputs.inputsCount).toString(),
			date: date,
			id: +new Date,
			total: '0.00'
        };
		
    }
	
	componentDidMount() {
		this.getProjects();
		this.getDepartments();
		this.getEmployees();
		this.getGoods();
	}
	
	getGoods() {
        fetch(appConfig.url + 'api/goods/get', {			
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
				items.unshift({name: appConfig.language.selectres});
                this.setState({
                    goods: items,
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
                    showProgress: false,
                    showProgressAdd: false
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
				items.unshift({name: appConfig.language.selectemp});
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
				items.unshift({name: appConfig.language.selectproj});
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

	isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

    addItem() {
		if (appConfig.inputs.showProgress == true) {
            return;
        }
		
        if (this.state.projectID == undefined ||
            this.state.projectName == undefined ||
            this.state.employeeID == undefined ||
            this.state.employeeName == undefined ||
            this.state.departmentID == undefined ||
            this.state.departmentName == undefined ||
            this.state.productID == undefined ||
            this.state.productName == undefined ||

            this.state.invoiceID == undefined ||
            this.state.date == undefined ||
            this.state.quantity == undefined ||
            this.state.description == undefined ||
			
			this.isNumber(this.state.quantity) != true) {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgressAdd: true,
			bugANDROID: ' '
        });
		
		appConfig.inputs.showProgress = true;
		
        fetch(appConfig.url + 'api/inputs/add', {
            method: 'post',
            body: JSON.stringify({
                id: + new Date,
				invoiceID: this.state.invoiceID,
				date: this.state.date,
				price: this.state.price,				
				quantity: this.state.quantity,				
				description: this.state.description,
				total: this.state.total,
				
				projectID: this.state.projectID,
				project: this.state.projectName,
				employeeID: this.state.employeeID,
				employee: this.state.employeeName,
				departmentID: this.state.departmentID,
				department: this.state.departmentName,
				productID: this.state.productID,
				product: this.state.productName,

				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                appConfig.inputs.refresh = true;
                appConfig.assets.refresh = true;
				appConfig.projects.refresh = true;
				appConfig.departments.refresh = true;
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
					<View style={{
						flex: 1,
						padding: 10,
						paddingTop: 0,
						paddingBottom: 0,
						marginTop: 0,
						marginBottom: 0,
						backgroundColor: 'white'
					}}>
						{errorCtrl}
						
						{loader}
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								invoiceID: text,
								invalidValue: false
							})}
							style={styles.loginInputBold}
							value={this.state.invoiceID}
							placeholder="ID">
						</TextInput>

						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							editable={false}
							style={styles.loginInputBold}
							value={this.state.date}
							placeholder="date">
						</TextInput>
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
									
									let arrEmployees = [].concat(this.state.employees);
 									let employees = arrEmployees.filter((el) => el.departmentID == value);
 
                                    this.setState({
                                        department: value,
                                        departmentID: department[0].id,
                                        departmentName: department[0].name,
										invalidValue: false,
										employeesFiltered: employees
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
									let arr = [].concat(this.state.employeesFiltered);
 									let employee = arr.filter((el) => el.id == value);
 
                                    this.setState({
                                        employee: value,
                                        employeeID: employee[0].id,
                                        employeeName: employee[0].name,
										invalidValue: false
                                    })
                                }}>

								{this.state.employeesFiltered.map((item, i) =>
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
                                selectedValue={this.state.good}

                                onValueChange={(value) => {
									let arr = [].concat(this.state.goods);
 									let good = arr.filter((el) => el.id == value);
 
                                    this.setState({
                                        good: value,
                                        productID: good[0].id,
                                        productName: good[0].name,
                                        price: (+good[0].price).toFixed(2),
										total: ((+good[0].price)*(+this.state.quantity)).toFixed(2).toString(),
										invalidValue: false
                                    })
                                }}>

								{this.state.goods.map((item, i) =>
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
							editable={false}
							style={styles.loginInputBold}
							value={this.state.price}
							placeholder={appConfig.language.price}>
						</TextInput>
						
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={(text)=> this.setState({
								quantity: text,
								total: ((+this.state.price)*(+text)).toFixed(2).toString(),								
								invalidValue: false
							})}
							style={styles.loginInputBold}
							value={this.state.quantity}
							placeholder={appConfig.language.quantity}>
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
							marginTop: 10,
							marginBottom: -15
						}}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.total}: {this.state.total}
							</Text>		
						</View>		
						
						{validCtrl}

						<TouchableHighlight
							onPress={()=> this.addItem()}
							style={styles.button}>
							<Text style={styles.buttonText}>{appConfig.language.add}</Text>
						</TouchableHighlight>
						
						{errorCtrl}

						<ActivityIndicator
							animating={this.state.showProgressAdd}
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
    itemTextBold: {
		fontSize: 20,
		textAlign: 'left',
		margin: 5,
		fontWeight: 'bold',
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
        color: 'black',
		fontWeight: 'bold'
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
        fontSize: 20,
		fontWeight: 'bold'
    },
    loader: {
		marginTop: 20
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

export default InputAdd;
