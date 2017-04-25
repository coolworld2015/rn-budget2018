'use strict';

import React, {Component} from 'react';
import {
    TabBarIOS,
    NavigatorIOS,
} from 'react-native';

import Phones from '../phones/phones';
import Search from '../search/search';
import Audit from '../audit/audit';
import Users from '../users/users';
import UserAdd from '../users/userAdd';

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'Users'
        };
    }

    onLogOut() {
        this.props.onLogOut();
    }

    render() {
        return (
            <TabBarIOS>

                <TabBarIOS.Item
                    title="Phones"
                    icon={require('../../../img/phones.png')}
                    selected={this.state.selectedTab === 'Phones'}
                    onPress={() => this.setState({selectedTab: 'Phones'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="phones"
                        initialRoute={{
                            component: Phones,
                            title: 'Phones',
                            rightButtonTitle: 'Search',
                            onRightButtonPress: () => {
                                this.refs.phones.navigator.push({
                                    title: "Search",
                                    component: Search
                                });
                            }
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Users"
                    icon={require('../../../img/users.png')}
                    selected={this.state.selectedTab === 'Users'}
                    onPress={() => this.setState({selectedTab: 'Users'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="users"
                        initialRoute={{
                            component: Users,
                            title: 'Users',
                            rightButtonTitle: 'New',
                            onRightButtonPress: () => {
                                this.refs.users.navigator.push({
                                    title: "New record",
                                    component: UserAdd
                                });
                            }
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Audit"
                    icon={require('../../../img/clock.png')}
                    selected={this.state.selectedTab === 'Audit'}
                    onPress={() => this.setState({selectedTab: 'Audit'})}>

                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        ref="audit"
                        initialRoute={{
                            component: Audit,
                            title: 'Audit',
                        }}
                    />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Logout"
                    icon={require('../../../img/log-out.png')}
                    selected={this.state.selectedTab === 'Logout'}
                    onPress={this.onLogOut.bind(this)}>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}

export default AppContainer;