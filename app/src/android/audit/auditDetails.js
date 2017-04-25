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

class AuditDetails extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
		this.state = {
			name: ''
		}	
					
		if (props.data) {
			var ip = props.data.ip.split(':');

			this.state = {
				id: props.data.id,
				name: props.data.name,
				date: props.data.date,
				ip: ip[3],
				description: props.data.description,
				showProgress: false
			};
		}
    }
	
    goBack(rowData) {
		this.props.navigator.pop();
	}
	
    render() {
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
								marginRight: 20,
								fontWeight: 'bold',
								color: 'white'
							}}>
								{this.state.date}
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
						paddingBottom: 115,
						justifyContent: 'flex-start',
						backgroundColor: 'white'
					}}>
						<View style={{
							flexDirection: 'row'
						}}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.user}:
							</Text>									
							<Text style={styles.itemText}>
								{this.state.name}
							</Text>		
						</View>
						
						<View style={{
							flexDirection: 'row'
						}}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.date}:
							</Text>									
							<Text style={styles.itemText}>
								{this.state.date}
							</Text>		
						</View>
						
						<View style={{
							flexDirection: 'row'
						}}>
							<Text style={styles.itemTextBold}>
								IP:
							</Text>									
							<Text style={styles.itemText}>
								{this.state.ip}
							</Text>		
						</View>		
						
						<View style={{
							flexDirection: 'row'
						}}>
							<Text style={styles.itemTextBold}>
								ID:
							</Text>									
							<Text style={styles.itemText}>
								{this.state.id}
							</Text>		
						</View>
						
						<View style={{
							flexDirection: 'row'
						}}>
							<Text style={styles.itemTextBold}>
								{appConfig.language.description}:
							</Text>									
							<Text style={styles.itemText}>
								{this.state.description}
							</Text>		
						</View>

						<TouchableHighlight
							onPress={()=> this.goBack()}

							style={styles.button}>
							<Text style={styles.buttonText}>{appConfig.language.back}</Text>
						</TouchableHighlight>
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
		margin: 10,
		fontWeight: 'bold',
		color: 'black'
    },    
	itemText: {
		fontSize: 20,
		textAlign: 'left',
		margin: 10,
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

export default AuditDetails;
