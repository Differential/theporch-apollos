import { createStackNavigator } from 'react-navigation';
import { withTheme } from '@apollosproject/ui-kit';

import ContentFeed from '../../content-feed';

import tabBarIcon from '../tabBarIcon';

import Schedule from './Schedule';

const ScheduleNavigator = createStackNavigator(
  {
    Schedule,
    ContentFeed,
  },
  {
    initialRouteName: 'Schedule',
    defaultNavigationOptions: ({ screenProps }) => ({
      headerTintColor: screenProps.headerTintColor,
      headerTitleStyle: screenProps.headerTitleStyle,
    }),
    navigationOptions: { tabBarIcon: tabBarIcon('calendar') },
  }
);

const EnhancedSchedule = withTheme(({ theme, ...props }) => ({
  ...props,
  screenProps: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
  },
}))(ScheduleNavigator);

export default EnhancedSchedule;