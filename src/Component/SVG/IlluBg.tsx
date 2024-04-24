import * as React from "react";
const IlluBg = (props:any) => (
  <svg
    width={640}
    height={1024}
    viewBox="0 0 640 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_13_422"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={640}
      height={1024}
    >
      <rect width={640} height={1024} fill="#F8FBFF" />
    </mask>
    <g mask="url(#mask0_13_422)">
      <g filter="url(#filter0_f_13_422)">
        <ellipse cx={403.5} cy={434} rx={86.5} ry={88} fill="#B8D4FE" />
      </g>
      <g opacity={0.6} filter="url(#filter1_f_13_422)">
        <ellipse cx={321.5} cy={-131} rx={168.5} ry={171} fill="#B8D4FE" />
      </g>
      <g filter="url(#filter2_f_13_422)">
        <ellipse cx={138} cy={1058.5} rx={93} ry={94.5} fill="#B8D4FE" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_13_422"
        x={117}
        y={146}
        width={573}
        height={576}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={100}
          result="effect1_foregroundBlur_13_422"
        />
      </filter>
      <filter
        id="filter1_f_13_422"
        x={-47}
        y={-502}
        width={737}
        height={742}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={100}
          result="effect1_foregroundBlur_13_422"
        />
      </filter>
      <filter
        id="filter2_f_13_422"
        x={-255}
        y={664}
        width={786}
        height={789}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={150}
          result="effect1_foregroundBlur_13_422"
        />
      </filter>
    </defs>
  </svg>
);
export default IlluBg;
