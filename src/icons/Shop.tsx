import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgShop = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Mask
      id="shop_svg__a"
      width={20}
      height={17}
      x={2}
      y={6}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M2 6.54h19.586v16.182H2z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#shop_svg__a)">
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.716 8.04c-.442 0-1.915.178-2.338 2.462l-.772 6c-.252 1.683-.057 2.901.578 3.638.627.728 1.749 1.082 3.428 1.082h8.348c1.049 0 2.48-.209 3.343-1.207.686-.79.922-1.969.703-3.502l-.78-6.052c-.331-1.49-1.207-2.42-2.331-2.42zm9.245 14.682H7.612c-2.144 0-3.637-.525-4.566-1.604-.933-1.082-1.245-2.705-.927-4.823l.777-6.026c.51-2.763 2.375-3.729 3.819-3.729h10.179c1.45 0 3.213.963 3.808 3.664l.788 6.107c.284 1.971-.07 3.552-1.053 4.686-.979 1.128-2.526 1.725-4.477 1.725"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.098 7.82a.75.75 0 0 1-.75-.75 3.574 3.574 0 0 0-3.57-3.57h-.015A3.6 3.6 0 0 0 9.24 4.54a3.6 3.6 0 0 0-1.051 2.53.75.75 0 0 1-1.5 0c0-1.339.544-2.648 1.492-3.593A5.1 5.1 0 0 1 11.76 2h.02a5.075 5.075 0 0 1 5.068 5.07.75.75 0 0 1-.75.75M14.743 12.324h-.046a.75.75 0 0 1 0-1.5c.414 0 .773.336.773.75s-.313.75-.727.75M8.912 12.324h-.045a.75.75 0 0 1 0-1.5c.414 0 .773.336.773.75s-.314.75-.728.75"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgShop;
