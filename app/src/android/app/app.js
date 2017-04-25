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
    ActivityIndicatorIOS,
    TabBarIOS,
    NavigatorIOS,
    TextInput,
	BackAndroid,
	AsyncStorage,
	ActivityIndicator
} from 'react-native';

console.disableYellowBox = true;

import Login from './login';
import AppContainer from './appContainer';

class App extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
        this.state = {
            isLoggedIn: false,
			isLoading: true
        };
		
        appConfig = {
            access_token: '',
			url: 'http://jwt-budget.herokuapp.com/',
			login: {
				showProgress: false
            },			
			users: {
                refresh: false,
				showProgress: false
            },
			goods: {
                refresh: false,
				showProgress: false
            },
			projects: {
                refresh: false,
				showProgress: false
            },
			departments: {
                refresh: false,
				showProgress: false
            },
			employees: {
                refresh: false,
				showProgress: false
            },			
			assets: {
                refresh: false
            },
			inputs: {
                refresh: false,
				inputsCount: 0,
				showProgress: false
            },
			outputs: {
                refresh: false,
				outputsCount: 0,
				showProgress: false
            },
			rus: {
				title: 'RN-Budget',	
				user: 'Пользователь',
				users: 'Пользователи',
				firstday: 'Начало',
				lastday: 'Конец',
				selectdep: 'Выбор отдела',
				alldep: 'Все отделы',
				selectproj: 'Выбор проекта',
				allproj: 'Все проекты',
				selectemp: 'Выбор сотрудника',
				allemp: 'Все сотрудники',
				selectres: 'Выбор ресурса',
				allres: 'Все ресурсы',
				delrec: 'Удаление записи',
				reload: 'Загрузка',
				other: 'Другое',		
				results: 'Результаты для ',
				quantity: 'Количество',
				date: 'Дата',
				phone: 'Телефон',
				address: 'Адрес',
				yes: 'Да',
				no: 'Нет',
				conform: 'Вы уверены, что хотите удалить ',
				delete: 'Удалить',
				price: 'Цена',
				submit: 'Применить',
				newrec: 'Новая запись',
				trans: 'Транзакция',
				app: 'Режим приложения',
				lang: 'Выбор языка',
				action: 'Применить',
				menu: 'Главное меню',
				config: 'Настройки',
				log: 'Проверка полномочий',
				login: 'Логин',
				pass: 'Пароль',
				enter: 'Вход',
				error: 'Ошибка. Неверное имя или пароль !!!',
				back: 'Назад',
				assets: 'Активы',
				reports: 'Отчеты',
				resource: 'Ресурс',
				resources: 'Ресурсы',
				search: 'Поиск',
				outputs: 'Расход',
				inputs: 'Приход',
				project: 'Проект',
				projects: 'Проекты',
				department: 'Отдел',
				departments: 'Отделы',
				employee: 'Сотрудник',
				employees: 'Сотрудники',
				users: 'Пользователи',
				audit: 'Аудит',
				logout: 'Выход',
				change: 'Изменить',
				sys: 'Системная информация',
				load: 'Загрузка данных...',
				project_count: 'Количесто проектов: ',
				runs_count: 'Количесто запусков программы: ',
				dep_count: 'Количесто отделов: ',
				staff_count: 'Количесто сотрудников: ',
				size: 'Размер: ',
				in_count: 'Количесто приходов: ',
				out_count: 'Количесто расходов: ',
				records: 'Количесто записей:',
				name: 'Наименование',
				sum: 'Сумма',
				add: 'Добавить',
				description: 'Описание',
				grn: 'Гривны',
				grns: ' грн.',
				total: 'Итого'
			},
			eng: {
				title: 'RN-Budget',				
				user: 'User',
				users: 'Users',
				firstday: 'First day',
				lastday: 'Last day',
				selectdep: 'Select department',
				alldep: 'All departments',
				selectproj: 'Select project',
				allproj: 'All projects',
				selectemp: 'Select employee',
				allemp: 'All employees',
				selectres: 'Select resource',
				allres: 'All resources',
				delrec: 'Delete record',
				reload: 'Reload',
				other: 'Other',
				results: 'Results for ',
				quantity: 'Quantity',
				date: 'Date',
				phone: 'Phone',
				address: 'Address',
				yes: 'Yes',
				no: 'No',
				conform: 'Are you sure you want to delete ',
				delete: 'Delete',			
				price: 'Price',
				submit: 'Submit',
				newrec: 'New record',
				trans: 'Transaction',			
				app: 'Application mode',			
				lang: 'Language mode',
				action: 'Action',
				menu: 'Main menu',
				config: 'Setup',
				log: 'Login',
				login: 'Login',
				pass: 'Password',
				enter: 'Log in',
				error: 'Error. Wrong name or password !!!',
				back: 'Back',
				assets: 'Assets',
				reports: 'Reports',
				resource: 'Resource',
				resources: 'Resources',
				search: 'Search here',
				outputs: 'Outputs',
				inputs: 'Inputs',
				project: 'Project',
				projects: 'Projects',
				department: 'Departament',
				departments: 'Departaments',
				employee: 'Employee',
				employees: 'Employees',
				users: 'Users',
				audit: 'Audit',
				logout: 'Logout',
				change: 'Change',
				sys: 'System information',
				load: 'Loading...',
				project_count: 'Projects: ',
				runs_count: 'Program runs: ',
				dep_count: 'Departaments: ',
				staff_count: 'Staff: ',
				size: 'Total: ',
				in_count: 'Inputs: ',
				out_count: 'Outputs: ',
				records: 'Records:',
				name: 'Name',
				sum: 'Total',
				add: 'Add',
				description: 'Description',
				grn: 'UAH',
				grns: ' uah.',
				total: 'Total'
			},
			language: {}			
        };		
    }
	
	componentWillMount() {
		this.init();
	}
	
    init() {
        AsyncStorage.getItem('rn-budget.language')
            .then(req => JSON.parse(req))
            .then(json => {
                if (json == undefined || json == null || json[0] == null) {
					appConfig.lang = 'eng';
					appConfig.language = appConfig.eng;
					AsyncStorage.setItem('rn-budget.language', JSON.stringify('eng'))
						.then(json => {})
						.catch(error => console.log(error))
                } else {
					appConfig.lang = json;
					appConfig.language = appConfig[json];
                }
            })
            .catch(error => console.log(error))
			.finally(()=> {
                this.setState({
					isLoading: false
                });
            });
    }
	
    render() {
		if (this.state.isLoading) {
			return <View style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
						<ActivityIndicator
							animating={true}
							size="large"
						/>
					</View>;
		}
		
        if (this.state.isLoggedIn) {
            return (
                <AppContainer onLogOut={this.onLogOut.bind(this)}/>
            )
        } else {
            return (
                <Login onLogin={this.onLogin.bind(this)}/>
            )
        }
    }

    onLogin() {
        console.log('onLogin');
        this.setState({isLoggedIn: true});
    }

    onLogOut() {
        console.log('onLogOut');
        this.setState({isLoggedIn: false});
    }
}

export default App;
