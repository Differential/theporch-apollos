import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import PropTypes from 'prop-types';

import { styled, BackgroundView } from '@apollosproject/ui-kit';

import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';
import FeaturesFeedWithCampus from './FeaturesFeedWithCampus';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit * 2,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

class Home extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  handleOnPress = ({ openUrl }) => ({ action, relatedNode }) => {
    if (action === 'READ_CONTENT') {
      this.props.navigation.navigate('ContentSingle', {
        itemId: relatedNode.id,
        transitionKey: 2,
      });
    }
    if (action === 'READ_EVENT') {
      this.props.navigation.navigate('Event', {
        eventId: relatedNode.id,
        transitionKey: 2,
      });
    }
    if (action === 'OPEN_URL') {
      openUrl(relatedNode.url);
    }
    if (action === 'OPEN_CONTENT_CHANNEL') {
      this.props.navigation.navigate('ContentFeed', {
        itemId: relatedNode.id,
        itemTitle: relatedNode.name,
        transitionKey: 2,
      });
    }
  };

  render() {
    return (
      <RockAuthedWebBrowser>
        {(openUrl) => (
          <BackgroundView>
            <SafeAreaView>
              <FeaturesFeedWithCampus
                onPressActionItem={this.handleOnPress({ openUrl })}
                ListHeaderComponent={
                  <LogoTitle source={require('./wordmark.png')} />
                }
              />
            </SafeAreaView>
          </BackgroundView>
        )}
      </RockAuthedWebBrowser>
    );
  }
}

export default Home;
