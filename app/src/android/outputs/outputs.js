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
    Alert
} from 'react-native';

class Outputs extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
		
        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true,
            serverError: false,
            resultsCount: 0,
            recordsCount: 25,
            positionY: 0
        };
    }
	
	componentDidMount() {
		appConfig.outputs.showProgress = true;
		this.getItems();
	}
	
    componentWillUpdate() {
        if (appConfig.outputs.refresh) {
            appConfig.outputs.refresh = false;

            this.setState({
                showProgress: true,
				resultsCount: 0
            });

            this.getItems();
        }
    }

    getItems() {
		this.setState({
            resultsCount: 0,
            recordsCount: 25,
            positionY: 0
        });
		
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

                this.setState({
				    dataSource: this.state.dataSource.cloneWithRows(responseData.sort(this.sort).slice(0, 25)),
                    resultsCount: responseData.length,
                    responseData: responseData,
                    filteredItems: responseData
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
			index: 1,
			data: rowData
		});
    }
	
    addItem() {
		appConfig.outputs.showProgress = false;
		appConfig.outputs.outputsCount = (this.state.resultsCount + 1).toString();
		this.props.navigator.push({
			index: 2
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

    refreshData(event) {
		console.log(event.nativeEvent.contentOffset);
        if (this.state.showProgress == true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -150) {
            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 25,
                positionY: 0,
                searchQuery: ''
            });

            setTimeout(() => {
                this.getUsers()
            }, 300);
        }

        if (this.state.filteredItems == undefined) {
            return;
        }

        var recordsCount = this.state.recordsCount;
        var positionY = this.state.positionY;
        var items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
            console.log(items.length);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 500
            });
        }
    }

    onChangeText(text) {
        if (this.state.dataSource == undefined) {
            return;
        }

        var arr = [].concat(this.state.responseData);
        var items = arr.filter((el) => el.description.toLowerCase().indexOf(text.toLowerCase()) != -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items.slice(0, 25)),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }
	
	refreshDataAndroid() {
		this.setState({
			showProgress: true,
			resultsCount: 0
		});

		this.getItems();
	}
	
	clearSearchQuery() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 25)),
            resultsCount: this.state.responseData.length,
            filteredItems: this.state.responseData,
			positionY: 0,
			recordsCount: 25,
			searchQuery: ''
		});
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
					backgroundColor: '#48BBEC',
					borderWidth: 0,
					borderColor: 'whitesmoke'
				}}>
					<View>
						<TouchableHighlight
							onPress={()=> this.refreshDataAndroid()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{appConfig.language.reload}
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							onPress={()=> this.clearSearchQuery()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 20,
								textAlign: 'center',
								margin: 10,
								marginRight: 20,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{appConfig.language.outputs}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							onPress={()=> this.addItem()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{appConfig.language.add}
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
                <View style={{marginTop: 0}}>
                    <TextInput style={{
                        height: 45,
						marginTop: 0,
                        padding: 5,
                        backgroundColor: 'white',
                        borderWidth: 3,
                        borderColor: 'lightgray',
                        borderRadius: 0,
                    }}
						underlineColorAndroid='rgba(0,0,0,0)'
						onChangeText={this.onChangeText.bind(this)}
						value={this.state.searchQuery}
						placeholder={appConfig.language.search}>
                    </TextInput>    

					{errorCtrl}
					
				</View>

                {loader}	
				
				<ScrollView
					onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
					<ListView
						enableEmptySections={true}
						style={{marginTop: 0, marginBottom: 0}}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
				</ScrollView>
				
				<View style={{marginBottom: 0}}>
					<Text style={styles.countFooter}>
						{appConfig.language.records} {this.state.resultsCount} 
					</Text>
				</View>

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
        backgroundColor: '#48BBEC',
		color: 'white',
		fontWeight: 'bold'
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
        color: 'gray'
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
    },
    img: {
        height: 95,
        width: 75,
        borderRadius: 20,
        margin: 20
    }
});

export default Outputs;
