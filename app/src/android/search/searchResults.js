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
	BackAndroid
} from 'react-native';

class SearchResults extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
		
		this.state = {
			dataSource1: ds.cloneWithRows([]),
			dataSource2: ds.cloneWithRows([])
		}	
		
		if (props.data) {
			this.state = {
				dataSource1: ds.cloneWithRows([]),
				dataSource2: ds.cloneWithRows([]),
				
				projectName: props.data.projectName,
				departmentName: props.data.departmentName,
				employeeName: props.data.employeeName,
				
				startDate: props.data.startDate,
				endDate: props.data.endDate,
				
				searchType: props.data.searchType,
				showProgress: true,
				
				resultsCount1: 0,
				recordsCount1: 25,
				positionY1: 0,
								
				resultsCount2: 0,
				recordsCount2: 25,
				positionY2: 0,
				
				inputsTotal: 0,
				outputsTotal: 0
			};
		}
    }
	
	componentDidMount() {
		this.getInputs();
		this.getOutputs();
	}
	
	dateCheck(dateFrom, dateTo, dateCheck) {
		var start = Date.parse(dateFrom);
		var end = Date.parse(dateTo);
		var check = Date.parse(dateCheck );
		if((check <= end && check >= start)) {
			return true;
		}
	}

    getInputs() {
        fetch(appConfig.url + 'api/inputs/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				var itemsDate, itemsProject, itemsDepartment, itemsEmployee, items;
				
				itemsDate = [].concat(responseData.sort(this.sort));	
				itemsDate = itemsDate.filter((el) => this.dateCheck(this.state.startDate, this.state.endDate, el.date.split(' ')[0]));
				
				itemsProject = [].concat(itemsDate);	
				if (this.state.projectName != appConfig.language.allproj) {
					itemsProject = itemsDate.filter((el) => el.project.toLowerCase() == this.state.projectName.toLowerCase());
				}	
					
				itemsDepartment = [].concat(itemsProject);
				if (this.state.departmentName != appConfig.language.alldep) {
					itemsDepartment = itemsProject.filter((el) => el.department.toLowerCase() == this.state.departmentName.toLowerCase());
				}					
				
				itemsEmployee = [].concat(itemsDepartment);
				if (this.state.employeeName != appConfig.language.allemp) {
					itemsEmployee = itemsDepartment.filter((el) => el.employee.toLowerCase() == this.state.employeeName.toLowerCase());
				}

				items = [].concat(itemsEmployee);
				items.forEach((el) => this.state.inputsTotal = +this.state.inputsTotal + +el.total)
				
                this.setState({
				    dataSource1: this.state.dataSource1.cloneWithRows(items.slice(0, 25)),
                    resultsCount1: items.length,
					recordsCount1: 25,
                    responseData1: items,
                    filteredItems1: items
                });
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

    getOutputs() {
        fetch(appConfig.url + 'api/outputs/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				var itemsDate, itemsProject, itemsDepartment, itemsEmployee, items;
				
				itemsDate = [].concat(responseData.sort(this.sort));	
				itemsDate = itemsDate.filter((el) => this.dateCheck(this.state.startDate, this.state.endDate, el.date.split(' ')[0]));
				
				itemsProject = [].concat(itemsDate);	
				if (this.state.projectName != appConfig.language.allproj) {
					itemsProject = itemsDate.filter((el) => el.project.toLowerCase() == this.state.projectName.toLowerCase());
				}	
					
				itemsDepartment = [].concat(itemsProject);
				if (this.state.departmentName != appConfig.language.alldep) {
					itemsDepartment = itemsProject.filter((el) => el.department.toLowerCase() == this.state.departmentName.toLowerCase());
				}					
				
				itemsEmployee = [].concat(itemsDepartment);
				if (this.state.employeeName != appConfig.language.allemp) {
					itemsEmployee = itemsDepartment.filter((el) => el.employee.toLowerCase() == this.state.employeeName.toLowerCase());
				}

				items = [].concat(itemsEmployee);
				items.forEach((el) => this.state.outputsTotal = +this.state.outputsTotal + +el.total)
								
                this.setState({
				    dataSource2: this.state.dataSource2.cloneWithRows(items.slice(0, 25)),
                    resultsCount2: items.length,
					recordsCount2: 25,
                    responseData2: items,
                    filteredItems2: items
                });
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
	
    sort(a, b) {
        var nameA = +a.invoiceID.toLowerCase(), nameB = +b.invoiceID.toLowerCase();
        if (nameA < nameB) {
            return 1
        }
        if (nameA > nameB) {
            return -1
        }
        return 0;
    }

    showDetails(rowData) {
		this.props.navigator.push({
			index: 3,
			data: rowData
		});
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
				onPress={()=> this.showDetails(rowData)}
                underlayColor='#ddd'
            >
				<View style={{
					flex: 1,
					flexDirection: 'column',
					padding: 12,
					borderColor: '#D7D7D7',
					borderBottomWidth: 1,
					backgroundColor: '#fff'
				}}>              
					<Text style={{backgroundColor: '#fff', color: 'black', fontWeight: 'bold'}}>
						{rowData.invoiceID} - {rowData.project} - {(rowData.date).split(' ')[0]}
					</Text>						
					
					<Text style={{backgroundColor: '#fff', color: 'black', fontWeight: 'bold'}}>
						{rowData.description}
					</Text>						
					
					<Text style={{backgroundColor: '#fff', color: 'black', fontWeight: 'bold'}}>
						{appConfig.language.total}: {((+rowData.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
					</Text>
				</View>
            </TouchableHighlight>
        );
    }

    refreshData1(event) {
        if (this.state.showProgress == true) {
            return;
        }

        var items, positionY, recordsCount;
        recordsCount = this.state.recordsCount1;
        positionY = this.state.positionY1;
        items = this.state.filteredItems1.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
            this.setState({
                dataSource1: this.state.dataSource1.cloneWithRows(items),
                recordsCount1: recordsCount + 10,
                positionY1: positionY + 500
            });
        }
    }
	
    refreshData2(event) {
        if (this.state.showProgress == true) {
            return;
        }

        var items, positionY, recordsCount;
        recordsCount = this.state.recordsCount2;
        positionY = this.state.positionY2;
        items = this.state.filteredItems2.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
            this.setState({
                dataSource2: this.state.dataSource2.cloneWithRows(items),
                recordsCount2: recordsCount + 10,
                positionY2: positionY + 500
            });
        }
    }
	
    goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        var errorCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={{
                justifyContent: 'center',
                height: 100
            }}>
                <ActivityIndicator
                    size="large"
                    animating={true}/>
            </View>;
        }

        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
				<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						backgroundColor: '#48BBEC'
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
								{this.state.projectName}
							</Text>
						</TouchableHighlight>	
					</View>						
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
				</View>
									
				{errorCtrl}
				
				{loader}
				
				<View style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
	
					<ScrollView
						onScroll={this.refreshData2.bind(this)} scrollEventThrottle={16}>
	
						<ListView
							enableEmptySections={true}
							style={{marginTop: 0, marginBottom: 0}}
							dataSource={this.state.dataSource2}
							renderRow={this.renderRow.bind(this)}
						/>
					</ScrollView>				
 
					<ScrollView
						onScroll={this.refreshData1.bind(this)} scrollEventThrottle={16}>
					
						<ListView
							enableEmptySections={true}
							style={{marginTop: 0, marginBottom: 0}}
							dataSource={this.state.dataSource1}
							renderRow={this.renderRow.bind(this)}
						/>
					</ScrollView>				
				</View>
				
				<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						backgroundColor: '#48BBEC'
					}}>
					<View style={{marginBottom: 0}}>
						<Text style={styles.countFooter1}>
							{appConfig.language.outputs}: {this.state.resultsCount2}
						</Text>
						<Text style={styles.countFooter1}>
							{((+this.state.outputsTotal).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
						</Text>						
					</View>	
					<View style={{marginBottom: 0}}>
						<Text style={styles.countFooter2}>
							{appConfig.language.total}:
						</Text>						
						<Text style={styles.countFooter2}>
							{((+this.state.inputsTotal - +this.state.outputsTotal).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
						</Text>
					</View>					
					<View style={{marginBottom: 0}}>
						<Text style={styles.countFooter3}>
							{appConfig.language.inputs}: {this.state.resultsCount1}
						</Text>						
						<Text style={styles.countFooter3}>
							{((+this.state.inputsTotal).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
						</Text>
					</View>	
				</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
		color: 'white',
		fontWeight: 'bold'
    },    
	countFooter1: {
        fontSize: 16,
        textAlign: 'left',
		marginTop: 1,   
        marginLeft: 10,
        borderColor: '#D7D7D7',
		color: 'white',
		fontWeight: 'bold'
    },	
	countFooter2: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 1,        
		//margin: 3,
        borderColor: '#D7D7D7',
		color: 'white',
		fontWeight: 'bold'
    },	
	countFooter3: {
        fontSize: 16,
        textAlign: 'right',
		marginTop: 1,
        marginRight: 10,
        borderColor: '#D7D7D7',
		color: 'white',
		fontWeight: 'bold'
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
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
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
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
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
        fontSize: 24
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

export default SearchResults;
