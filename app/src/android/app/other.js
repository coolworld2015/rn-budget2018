'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
	TouchableWithoutFeedback,
    ListView,
    ScrollView
} from 'react-native';

class Other extends Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([
                {name: appConfig.language.reports, id: 1},
                {name: appConfig.language.projects, id: 10},
                {name: appConfig.language.departments, id: 30},
                {name: appConfig.language.employees, id: 40},
                {name: appConfig.language.resources, id: 20},
                {name: appConfig.language.users, id: 50},
                {name: appConfig.language.audit, id: 60},
                {name: appConfig.language.config, id: 70},
                {name: appConfig.language.logout, id: 80}
            ]),
            showProgress: true,
            resultsCount: 9,
            recordsCount: 25,
            positionY: 0
        };
    }

    showDetails(rowData) {
        switch (rowData.id) {
            case 1:
                this.props.navigator.push({
                    index: 1,
                });
                break;

            case 10:
                this.props.navigator.push({
                    index: 10,
                });
                break;

            case 20:
                this.props.navigator.push({
                    index: 20,
                    data: rowData
                });
                break;

            case 30:
                this.props.navigator.push({
                    index: 30,
                    data: rowData
                });
                break;

            case 40:
                this.props.navigator.push({
                    index: 40,
                    data: rowData
                });
                break;

            case 50:
                this.props.navigator.push({
                    index: 50,
                    data: rowData
                });
                break;

            case 60:
                this.props.navigator.push({
                    index: 60,
                    data: rowData
                });
                break;

            case 70:
                this.props.navigator.push({
                    index: 70,
                    data: rowData
                });
                break;

            case 80:
                appConfig.login.showProgress = false;
                this.props.onLogOut();
                break;
        }
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.showDetails(rowData)}
                underlayColor='#ddd'
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
                }}>
                    <Text style={{
                        backgroundColor: '#fff',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textLarge}>
                                    {appConfig.language.other}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <ScrollView>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        color: 'white',
        fontWeight: 'bold'
    },
	textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 13,
        marginRight: 0,
        fontWeight: 'bold',
        color: 'white'
    }	
});

export default Other;
