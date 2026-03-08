import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgMore = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path
        strokeWidth={1.5}
        d="M12 2.75a9.25 9.25 0 1 1 0 18.5 9.25 9.25 0 0 1 0-18.5"
      />
      <Path
        strokeWidth={2}
        d="M15.939 12.013h.009M11.93 12.013h.009M7.921 12.013h.009"
      />
    </G>
  </Svg>
);
export default SvgMore;
