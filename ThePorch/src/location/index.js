import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PaddedView, ButtonLink } from '@apollosproject/ui-kit';
import { get } from 'lodash';

import MapView from '@apollosproject/ui-mapview';

import { CampusConsumer } from '../CampusProvider';
import GET_CAMPUSES from './getCampusLocations';

class Location extends PureComponent {
  static propTypes = {
    Component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
      PropTypes.object, // type check for React fragments
    ]),
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
      goBack: PropTypes.func,
    }),
    initialRegion: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
    changeCampusOptions: PropTypes.shape({
      refetchQueries: PropTypes.arrayOf(PropTypes.shape()),
    }),
    onChangeCampus: PropTypes.func,
  };

  static defaultProps = {
    Component: MapView,
    initialRegion: {
      // roughly show the entire USA by default
      latitude: 39.809734,
      longitude: -98.555618,
      latitudeDelta: 100,
      longitudeDelta:
        (100 * Dimensions.get('window').width) /
        Dimensions.get('window').height,
    },
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Location',
    headerLeft: null,
    headerRight: (
      <PaddedView vertical={false}>
        <ButtonLink
          style={{ color: navigation.getParam('headerTitleColor', []) }}
          onPress={() => navigation.goBack()}
        >
          Back
        </ButtonLink>
      </PaddedView>
    ),
    headerStyle: {
      backgroundColor: navigation.getParam('headerBackgroundColor', []),
    },
    headerTitleStyle: {
      color: navigation.getParam('headerTitleColor', []),
    },
  });

  state = {
    userLocation: null,
    loadingNewCampus: false,
  };

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (e) => console.warn('Error getting location!', e), // eslint-disable-line no-console
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  render() {
    const { Component, changeCampusOptions } = this.props; // is just to appease the linter 😢
    return (
      <Query
        query={GET_CAMPUSES}
        variables={{
          latitude: get(this.state, 'userLocation.latitude'),
          longitude: get(this.state, 'userLocation.longitude'),
        }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data: { campuses } = {} }) => (
          <CampusConsumer>
            {({ changeCampus, userCampus }) =>
              console.log(userCampus) || (
                <Component
                  navigation={this.props.navigation}
                  isLoading={loading}
                  error={error}
                  campuses={campuses || []}
                  initialRegion={this.props.initialRegion}
                  userLocation={this.state.userLocation}
                  currentCampus={campuses?.length && userCampus}
                  isLoadingSelectedCampus={this.state.loadingNewCampus}
                  onLocationSelect={async (campus) => {
                    this.setState({ loadingNewCampus: true });
                    changeCampus(campus);
                    // eslint-disable-next-line no-unused-expressions
                    this.props.onChangeCampus &&
                      this.props.onChangeCampus({ campus });
                    this.props.navigation.goBack();
                  }}
                />
              )
            }
          </CampusConsumer>
        )}
      </Query>
    );
  }
}

export default Location;