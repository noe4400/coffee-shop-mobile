import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgWalletOutline = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.171 14.676h-3.886a2.563 2.563 0 0 1 0-5.127h3.856M17.722 12.053h-.297M7.606 8.144h4.06"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.714 12.253c0-6.405 2.325-8.539 9.301-8.539 6.975 0 9.3 2.134 9.3 8.54 0 6.403-2.325 8.538-9.3 8.538s-9.3-2.135-9.3-8.539"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgWalletOutline;
