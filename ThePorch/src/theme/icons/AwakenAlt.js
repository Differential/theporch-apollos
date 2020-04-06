import React from 'react';
import Svg, { G, Path, Polyline } from 'react-native-svg';
import PropTypes from 'prop-types';
import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(
  ({ size = 32, fill, focused, secondaryFill, ...otherProps } = {}) => (
    <Svg width={size} height={size} viewBox="0 0 32 32" {...otherProps}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.66675 12H11.3334H16.0001H25.3334V20C25.3334 22.9455 22.9455 25.3333 20.0001 25.3333H12.0001C9.05456 25.3333 6.66675 22.9455 6.66675 20V12Z"
        fill={focused ? secondaryFill : 'none'}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.6666 2C11.0348 2 11.3333 2.29848 11.3333 2.66667V4.66667H20.6666V2.66667C20.6666 2.29848 20.9651 2 21.3333 2C21.7014 2 21.9999 2.29848 21.9999 2.66667V4.66667H23.9999C26.5773 4.66667 28.6666 6.756 28.6666 9.33333V12V22.6667C28.6666 25.9804 25.9803 28.6667 22.6666 28.6667H9.33325C6.01954 28.6667 3.33325 25.9804 3.33325 22.6667V12V9.33333C3.33325 6.756 5.42259 4.66667 7.99992 4.66667H9.99992V2.66667C9.99992 2.29848 10.2984 2 10.6666 2ZM10.6666 6H21.3333H23.9999C25.8409 6 27.3333 7.49239 27.3333 9.33333V11.3333H4.66659V9.33333C4.66659 7.49239 6.15897 6 7.99992 6H10.6666ZM4.66659 12.6667H27.3333V22.6667C27.3333 25.244 25.2439 27.3333 22.6666 27.3333H9.33325C6.75592 27.3333 4.66659 25.244 4.66659 22.6667V12.6667ZM9.33325 14.6667C8.59688 14.6667 7.99992 15.2636 7.99992 16V18.6667C7.99992 19.4031 8.59688 20 9.33325 20H11.9999C12.7363 20 13.3333 19.4031 13.3333 18.6667V16C13.3333 15.2636 12.7363 14.6667 11.9999 14.6667H9.33325Z"
        fill={fill}
      />
    </Svg>
  )
);

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
