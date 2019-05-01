import {createStackNavigator, createAppContainer} from 'react-navigation';

import DashboardScreen from '../screens/DashboardScreen'
import ProjectScreen from '../screens/ProjectScreen'

const ProjectNavigator = createStackNavigator(
  {
    Dashboard: {screen: DashboardScreen},
    Project: {screen: ProjectScreen}
  },
  {
    headerMode: 'none',
    navigationOptions:
    {
      headerVisible: false
    }
  }
)

const AppNavigator = createAppContainer(ProjectNavigator)


export default AppNavigator
