import gql from 'graphql-tag';

import { schema as mediaPlayerSchema } from '@apollosproject/ui-media-player';
import { updatePushId } from '@apollosproject/ui-notifications';
import CACHE_LOADED from '../client/getCacheLoaded'; // eslint-disable-line

// TODO: this will require more organization...ie...not keeping everything in one file.
// But this is simple while our needs our small.

export const schema = `
  type Query {
    pushId: String
    cacheLoaded: Boolean
    notificationsEnabled: Boolean
  }

  type Mutation {
    cacheMarkLoaded
    updateDevicePushId(pushId: String!)
    updatePushPermissions(enabled: Boolean!)
  }
${mediaPlayerSchema}
`;

export const defaults = {
  __typename: 'Query',
  cacheLoaded: false,
};

export const resolvers = {
  Mutation: {
    cacheMarkLoaded: async (root, args, { cache, client }) => {
      cache.writeQuery({
        query: CACHE_LOADED,
        data: {
          cacheLoaded: true,
        },
      });

      // const { pushId } = cache.readQuery({
      //   query: gql`
      //     query {
      //       pushId @client
      //     }
      //   `,
      // });
      // if (pushId) {
      //   updatePushId({ pushId, client });
      // }

      return null;
    },
  },
};
