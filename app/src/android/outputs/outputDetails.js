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

class OutputDetails extends Component {
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
				invoiceID: props.data.invoiceID,
				date: props.data.date,
				project: props.data.project,
				projectID: props.data.projectID,
				department: props.data.department,				
				departmentID: props.data.departmentID,				
				employee: props.data.employee,
				employeeID: props.data.employeeID,
				product: props.data.product,	
				productID: props.data.productID,				
				description: props.data.description,
				
				priceShow: ((+props.data.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
				quantityShow: ((+props.data.quantity).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
				totalShow: ((+props.data.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),				
				
				price: props.data.price,
				quantity: props.data.quantity,
				total: props.data.total,
				showProgress: false,
				serverError: false
			};
		}		
    }

    deleteItemDialog() {
		Alert.alert(
			appConfig.language.delrec,
			appConfig.language.conform + this.state.invoiceID + '?',
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

        fetch(appConfig.url + 'api/outputs/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
				date: this.state.date,
				department: this.state.department,
				departmentID: this.state.departmentID,
				description: this.state.description,
				employee: this.state.employee,
				employeeID: this.state.employeeID,
				invoiceID: this.state.invoiceID,
				price: this.state.price,
				product: this.state.product,
				productID: this.state.productID,
				project: this.state.project,
				projectID: this.state.projectID,
				quantity: this.state.quantity,
				total: this.state.total,
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
				if (responseData) {
					appConfig.outputs.refresh = true;
					appConfig.assets.refresh = true;
					appConfig.projects.refresh = true;
					appConfig.departments.refresh = true;
					appConfig.employees.refresh = true;
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
        return (
            <View style={styles.container}>
				<View style={styles.header}>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
								{appConfig.language.back}
							</Text>
						</TouchableHighlight>	
					</View>
					<View style={styles.itemWrap}>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textLarge}>
								{this.state.project}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							onPress={()=> this.deleteItemDialog()}
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
								{appConfig.language.delete}
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
										
				<ScrollView>
					<View style={styles.form}>								
						<View style={styles.itemBlock}>
							<Text style={styles.itemTextBold}>
								ID:
							</Text>									
							<Text style={styles.itemText}>
								{this.state.invoiceID}
							</Text>		
						</View>
						
						<View style={styles.itemBlock}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.date}:
							</Text>									
							<Text style={styles.itemText}>
								{this.state.date}
							</Text>		
						</View>
						
						<View style={styles.itemBlock}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.project}:
							</Text>				
							<View style={styles.itemWrap}>	
								<Text style={styles.itemText}>
									{this.state.project}
								</Text>		
							</View>	
						</View>	
												
						<View style={styles.itemBlock}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.department}:
							</Text>			
							<View style={styles.itemWrap}>							
								<Text style={styles.itemText}>
									{this.state.department}
								</Text>		
							</View>		
						</View>		
						
						<View style={styles.itemBlock}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.employee}:
							</Text>					
							<View style={styles.itemWrap}>	
								<Text style={styles.itemText}>
									{this.state.employee}
								</Text>		
							</View>	
						</View>	
						
						<View style={styles.itemBlock}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.resource}:
							</Text>				
							<View style={styles.itemWrap}>	
								<Text style={styles.itemText}>
									{this.state.product}
								</Text>		
							</View>		
						</View>		
						
						<View style={styles.itemBlock}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.price}:
							</Text>									
							<Text style={styles.itemText}>
								{this.state.priceShow}
							</Text>		
						</View>			
						
						<View style={styles.itemBlock}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.quantity}:
							</Text>									
							<Text style={styles.itemText}>
								{this.state.quantityShow}
							</Text>		
						</View>			
						
						<View style={styles.itemBlock}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.description}:
							</Text>
							<View style={styles.itemWrap}>								
								<Text style={styles.itemText}>
									{this.state.description}
								</Text>		
							</View>			
						</View>			
									
						<Text style={styles.itemTextBold}>
							{appConfig.language.total}: {this.state.totalShow}
						</Text>

						<TouchableHighlight
							onPress={()=> this.goBack()}
							style={styles.button}>
							<Text style={styles.buttonText}>
								{appConfig.language.back}
							</Text>
						</TouchableHighlight>
						
						<Text>{this.state.bugANDROID}</Text>
					</View>
				</ScrollView>
			</View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		backgroundColor: 'white'
	},		
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#48BBEC',
		borderWidth: 0,
		borderColor: 'whitesmoke'
	},	
	textSmall: {
		fontSize: 16,
		textAlign: 'center',
		margin: 14,
		fontWeight: 'bold',
		color: 'white'
	},		
	textLarge: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		marginRight: 20,
		fontWeight: 'bold',
		color: 'white'
	},
    form: {
		flex: 1,
		padding: 10,
		justifyContent: 'flex-start',
		paddingBottom: 130,
		backgroundColor: 'white'
    },
	itemBlock: {
		flexDirection: 'row'
    },
 	itemWrap: {
		flex: 1,
		flexDirection: 'column', 
		flexWrap: 'wrap'
    },	
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
    }
});

export default OutputDetails;