import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { StatusBar } from 'react-native';
import {
  BackgroundView,
  // TabView,
  ActivityIndicator,
  H6,
  ThemeMixin,
  withThemeMixin,
  ErrorCard,
} from '@apollosproject/ui-kit';
import { TabView } from 'react-native-tab-view';

import SearchInputHeader, {
  ReactNavigationStyleReset,
} from '../../ui/SearchInputHeader';

import moment from 'moment';
import ThemedBottomTabBar from '../tabBar';
import headerOptions from '../headerOptions';
import AppStateRefetch from '../../ui/AppStateRefetch';

import Day from './Day';

const getDays = gql`
  query {
    conference {
      id
      days {
        id
        title
        date
      }
    }
  }
`;

class Schedule extends PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    title: 'Schedule',
    ...headerOptions,
    headerStyle: ReactNavigationStyleReset.header,
    headerTitle: (props) => (
      <ThemeMixin mixin={{ type: 'dark' }}>
        <headerOptions.headerTitle {...props} />
      </ThemeMixin>
    ),
  });

  state = {
    index: 0,
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#EF5E24'); // todo: don't hard-code color value
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <BackgroundView>
        <Query query={getDays} fetchPolicy="cache-and-network">
          {({
            loading,
            data: { conference: { days = [] } = {} } = {},
            error,
            refetch,
          }) => {
            if (loading && !days.length) return <ActivityIndicator />;
            if (error) return <ErrorCard error={error} />;

            let initialIndex = days.findIndex(
              (day) => moment(day.date) > new Date()
            ); // find the first day that falls after today
            if (initialIndex === -1) {
              initialIndex = days.length - 1;
            } else {
              initialIndex -= 1;
            }
            initialIndex = Math.max(initialIndex, 0);
            initialIndex = Math.min(initialIndex, days.length - 1);

            return (
              <>
                <AppStateRefetch refetch={refetch} />
                <TabView
                  navigationState={{
                    index: this.state.index,
                    routes: days.map((day) => ({
                      key: day.id,
                      title: day.title,
                    })),
                  }}
                  renderScene={({ route }) => <Day id={route.key} />}
                  onIndexChange={(index) => this.setState({ index })}
                />
              </>
            );
          }}
        </Query>
      </BackgroundView>
    );
  }
}

export default Schedule;
