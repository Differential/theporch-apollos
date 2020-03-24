import { RESTDataSource } from 'apollo-datasource-rest';
import { createCursor, parseCursor } from '@apollosproject/server-core';

import Message from './Message';

import { ApolloError } from 'apollo-server'


class dataSource extends RESTDataSource {
  baseURL = 'https://media.watermark.org/api/v1/messages';

  async getFromId(id) {
    const result = await this.get(id);
    if (!result || typeof result !== 'object' || result.error || !result.message)
      throw new ApolloError(result?.error?.message, result?.error?.code);
    return result.message;
  }

  async paginate({ filters = {}, pagination: { after, first = 20 } = {} } = {}) {
    // used to build the params sent to /messages endpoint
    let requestParams = { ...filters };
    requestParams.limit = first;

    // parse the incoming cursor
    if (after) {
      const parsed = parseCursor(after);
      if (parsed && typeof parsed === 'object') {
        requestParams = { ...requestParams, ...parsed };
      } else {
        throw new Error(`An invalid 'after' cursor was provided: ${after}`);
      }
    }

    // TODO: This feels like something RESTDataSource should handle out of the box,
    // but doesn't seem to be working. `filter` is an object, and the WCC media api
    // expects filter params to look like ?filter[someKey]=someValue&filter[someOtherKey]=someOtherValue
    // yet RESTDataSource does something like ?filter={ someKey: somevalue, someOtherKey: someOtherValue }
    const { filter } = requestParams;
    delete requestParams.filter;
    if (filter) {
      Object.keys(filter).forEach((key) => {
        requestParams[`filter[${key}]`] = filter[key];
      });
    }

    const result = await this.get('', requestParams);
    if (!result || result.error)
      throw new ApollosError(result?.error?.message, result?.error?.code)

    // All pagination cursors below inherit these fields
    const paginationPartsForCursors = {
      limit: result.pagination.limit,
      offset: result.pagination.offset,
      order_by: result.pagination.order_by,
      sort: result.pagination.sort,
      filter: result.pagination.filter,
    };

    const getTotalCount = () => result.pagination.total;

    // build the edges - translate messages to { edges: [{ node, cursor }] } format
    const edges = (result.messages || []).map((node, i) => ({
      node,
      cursor: createCursor({
        ...paginationPartsForCursors,
        offset: paginationPartsForCursors.offset + i + 1,
      }),
    }));

    return {
      edges,
      getTotalCount,
    }
  }
}

export default dataSource;
