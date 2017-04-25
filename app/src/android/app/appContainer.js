import React, {Component} from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
//import DefaultTabBar from './DefaultTabBar';

import Audit from '../audit/audit';
import AuditDetails from '../audit/auditDetails';
import AuditAdd from '../audit/auditAdd';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Resources from '../resources/resources';
import ResourceDetails from '../resources/resourceDetails';
import ResourceAdd from '../resources/resourceAdd';

import Projects from '../projects/projects';
import ProjectDetails from '../projects/projectDetails';
import ProjectAdd from '../projects/projectAdd';

import Departments from '../departments/departments';
import DepartmentDetails from '../departments/departmentDetails';
import DepartmentAdd from '../departments/departmentAdd';

import Employees from '../employees/employees';
import EmployeeDetails from '../employees/employeeDetails';
import EmployeeAdd from '../employees/employeeAdd';

import Assets from '../resources/assets';

import Inputs from '../inputs/inputs';
import InputDetails from '../inputs/inputDetails';
import InputAdd from '../inputs/inputAdd';

import Outputs from '../outputs/outputs';
import OutputDetails from '../outputs/outputDetails';
import OutputAdd from '../outputs/outputAdd';

import Other from './other';
import Config from './config';

import Search from '../search/search';
import SearchResults from '../search/searchResults';
import SearchDetails from '../search/searchDetails';

class AppContainer extends Component {
	constructor(props) {
		super(props);				
	}
	
	onLogOut() {
        this.props.onLogOut();
    }
	
	//backgroundColor='rgba(255, 255, 255, 0.7)'
	
	render() {
		return (
			<ScrollableTabView 
				renderTabBar={() => <DefaultTabBar backgroundColor='white' />}
			>
 				<AssetsTab tabLabel={appConfig.language.assets} />
 				<OutputsTab tabLabel={appConfig.language.outputs} />
 				<InputsTab tabLabel={appConfig.language.inputs} /> 				
				<OtherTab onLogOut={this.onLogOut.bind(this)} tabLabel={appConfig.language.other} />
			</ScrollableTabView>
		);
	}
}
				
class OtherTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Other', index: 0},
			
			{title: 'Projects', index: 1},
			{title: 'Project Details', index: 2},
			{title: 'Add Project', index: 3},
			
			{title: 'Resources', index: 4},
			{title: 'Resource Details', index: 5},
			{title: 'Add Resource', index: 6},		
			
			{title: 'Departments', index: 7},
			{title: 'Department Details', index: 8},
			{title: 'Add Department', index: 9},		
			
			{title: 'Employees', index: 10},
			{title: 'Employee Details', index: 11},
			{title: 'Add Employee', index: 12},		
			
			{title: 'Users', index: 13},
			{title: 'User Details', index: 14},
			{title: 'Add User', index: 15},	
			
			{title: 'Audit', index: 16},
			{title: 'Audit Details', index: 17},
			{title: 'Add Audit', index: 18},
			
			{title: 'Search', index: 19},
			{title: 'Search Results', index: 20},
			{title: 'Search Details', index: 21},
			
			{title: 'Config', index: 22}
		];
	}
	
	onLogOut() {
        this.props.onLogOut();
    }		
	
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Other routes={this.routes} onLogOut={this.onLogOut.bind(this)} navigator={navigator} />
					break;			
					
			case 1: return <Search routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <SearchResults data={route.data} routes={this.routes} navigator={navigator} />
					break;				
			case 3: return <SearchDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;	
					 
			case 10: return <Projects routes={this.routes} navigator={navigator} />
					 break;			
			case 11: return <ProjectDetails data={route.data} routes={this.routes} navigator={navigator} />
					 break;
			case 12: return <ProjectAdd data={route.data} routes={this.routes} navigator={navigator} />
					 break;		
					
			case 20: return <Resources routes={this.routes} navigator={navigator} />
					 break;			
			case 21: return <ResourceDetails data={route.data} routes={this.routes} navigator={navigator} />
					 break;
			case 22: return <ResourceAdd data={route.data} routes={this.routes} navigator={navigator} />
					 break;	
					
			case 30: return <Departments routes={this.routes} navigator={navigator} />
					 break;			
			case 31: return <DepartmentDetails data={route.data} routes={this.routes} navigator={navigator} />
					 break;
			case 32: return <DepartmentAdd data={route.data} routes={this.routes} navigator={navigator} />
					 break;	
					
			case 40: return <Employees routes={this.routes} navigator={navigator} />
					 break;			
			case 41: return <EmployeeDetails data={route.data} routes={this.routes} navigator={navigator} />
					 break;
			case 42: return <EmployeeAdd data={route.data} routes={this.routes} navigator={navigator} />
					 break;	
					 
			case 50: return <Users routes={this.routes} navigator={navigator} />
					 break;			
			case 51: return <UserDetails data={route.data} routes={this.routes} navigator={navigator} />
					 break;
			case 52: return <UserAdd data={route.data} routes={this.routes} navigator={navigator} />
					 break;		
					 
			case 60: return <Audit routes={this.routes} navigator={navigator} />
					 break;			
			case 61: return <AuditDetails data={route.data} routes={this.routes} navigator={navigator} />
					 break;
			case 62: return <AuditAdd data={route.data} routes={this.routes} navigator={navigator} />
					 break;
					 
			case 70: return <Config onLogOut={this.onLogOut.bind(this)} routes={this.routes} navigator={navigator} />
					 break;			 
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}
				
class OutputsTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Outputs', index: 0},
			{title: 'Output Details', index: 1},
			{title: 'Add Output', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Outputs routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <OutputDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <OutputAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class InputsTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Inputs', index: 0},
			{title: 'Input Details', index: 1},
			{title: 'Add Input', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Inputs routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <InputDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <InputAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class AssetsTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Assets', index: 0}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Assets routes={this.routes} navigator={navigator} />
					break;
		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class LogOut extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'LogOut', index: 0}
		];
	}
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.props.logOut.bind(this)}
			/>
		)
	}
}

class EmployeesTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Employees', index: 0},
			{title: 'Employee Details', index: 1},
			{title: 'Add Employee', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Employees routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <EmployeeDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <EmployeeAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class DepartmentsTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Departments', index: 0},
			{title: 'Department Details', index: 1},
			{title: 'Add Department', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Departments routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <DepartmentDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <DepartmentAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class ProjectsTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Projects', index: 0},
			{title: 'Project Details', index: 1},
			{title: 'Add Project', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Projects routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <ProjectDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <ProjectAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class ResourcesTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Resources', index: 0},
			{title: 'Resource Details', index: 1},
			{title: 'Add Resource', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Resources routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <ResourceDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <ResourceAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class UsersTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Users', index: 0},
			{title: 'User Details', index: 1},
			{title: 'Add User', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Users routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <UserDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 2: return <UserAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class AuditTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Audit', index: 0},
			{title: 'Audit Details', index: 1},
			{title: 'Add Audit', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Audit routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <AuditDetails data={route.data} routes={this.routes} navigator={navigator} />
					break			
			case 2: return <AuditAdd data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});

module.exports = AppContainer;
