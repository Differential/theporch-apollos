import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(
  ({ size = 32, fill, secondaryFill, ...otherProps } = {}) => (
    <Svg width={size} height={size} viewBox="0 0 32 32" {...otherProps}>
      <Path
        d="M13.2642 7.29256C13.2597 7.29243 13.2551 7.29236 13.2505 7.29236C13.2459 7.29236 13.2414 7.29243 13.2368 7.29256L12.3458 7.29256L12.3454 7.29256C11.0422 7.29383 9.79003 7.79979 8.85172 8.70414L5.27734 12.141L5.27133 12.1469C5.18597 12.2321 5.11825 12.3332 5.07204 12.4446C5.02583 12.5559 5.00204 12.6753 5.00204 12.7959C5.00204 12.9164 5.02583 13.0358 5.07204 13.1472C5.11821 13.2584 5.18586 13.3595 5.27111 13.4446L5.27133 13.4448L7.39984 15.5733L7.40007 15.5736C7.56171 15.7355 7.77806 15.8311 8.0066 15.8416C8.23208 15.852 8.45335 15.7788 8.62809 15.6362L10.5007 14.1854V23.7915C10.5007 24.0346 10.5973 24.2678 10.7692 24.4397C10.9411 24.6116 11.1742 24.7081 11.4173 24.7081H20.5834C20.8265 24.7081 21.0596 24.6116 21.2315 24.4397C21.4034 24.2678 21.5 24.0346 21.5 23.7915V14.1841L23.3737 15.6327C23.5484 15.7752 23.7696 15.8483 23.995 15.8379C24.2236 15.8274 24.4401 15.7317 24.6018 15.5697L26.7316 13.4407C26.8169 13.3554 26.8845 13.2542 26.9305 13.1428C26.9766 13.0314 27.0002 12.9119 27 12.7914C26.9998 12.6708 26.9759 12.5515 26.9295 12.4402C26.8831 12.3289 26.8153 12.2278 26.7298 12.1428L26.7243 12.1374L23.1495 8.70009C22.21 7.79671 20.9571 7.29225 19.6538 7.29256L18.7639 7.29256C18.7593 7.29243 18.7547 7.29236 18.7502 7.29236C18.7456 7.29236 18.741 7.29243 18.7365 7.29256L13.2642 7.29256ZM12.8251 8.20917H12.346C11.2798 8.21026 10.2555 8.62418 9.48782 9.36409L5.91871 12.7959L5.91906 12.7963L8.04871 14.9259L8.06137 14.9158L10.6783 12.8882C10.8165 12.7811 11.0037 12.762 11.1607 12.839C11.3178 12.916 11.4173 13.0756 11.4173 13.2505V23.7915H20.5834V13.2505C20.5834 13.0757 20.6828 12.9161 20.8397 12.8391C20.9966 12.7621 21.1837 12.781 21.322 12.8879L23.9398 14.9118C23.9421 14.9135 23.9443 14.9153 23.9465 14.917C23.9486 14.9188 23.9508 14.9205 23.9529 14.9223L23.9533 14.9218L26.0833 12.7927L22.5141 9.36079C21.7455 8.62163 20.7204 8.20889 19.6541 8.20917H19.1756C19.0772 8.89049 18.7613 9.52665 18.2688 10.0192C17.6672 10.6208 16.8512 10.9588 16.0003 10.9588C15.1495 10.9588 14.3335 10.6208 13.7319 10.0192C13.2393 9.52665 12.9235 8.89049 12.8251 8.20917ZM18.2455 8.20917C18.1563 8.64606 17.9407 9.05099 17.6207 9.37101C17.191 9.80076 16.6081 10.0422 16.0003 10.0422C15.3926 10.0422 14.8097 9.80076 14.38 9.37101C14.06 9.05099 13.8444 8.64606 13.7552 8.20917H18.2455Z"
        fill-rule="evenodd"
        clip-rule="evenodd"
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
