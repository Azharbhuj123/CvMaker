// import React from "react";
// import { BiBorderRadius } from "react-icons/bi";

// const ProgressBar = (props) => {
//   const {
//     title,
//     percentage,
//     color,
//     backgroundcolor,
//     dashed,
//     borderradius,
//     wrapperColor,
//     height,
//     maxWidth,
//     fontSize,
//     fontFamily,
//   } = props;


//   return (
//     <div className="progress-bar">
//       <p style={{ fontSize: fontSize, fontFamily: fontFamily }}>{title}</p>
//       <div
//         className="progress-bar-fuel"
//         style={{
//           borderRadius: `${borderradius}`,
//           backgroundColor: `${wrapperColor}`,
//           height: `${height}`,
//           width: `${maxWidth}%`,
//         }}
//       >
//         <div
//           className="progress-bar-fuel-wrapper"
//           style={{
//             width: `${percentage}%`,
//             color: `${color}`,
//             borderBottom: `${dashed}`,
//             backgroundColor: `${backgroundcolor}`,
//             borderRadius: `${borderradius}`,
//             height: `${height}`,
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;

import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { BiBorderRadius } from "react-icons/bi";

const ProgressBar = (props) => {
  const {
    title,
    percentage,
    color,
    backgroundcolor,
    dashed,
    borderradius,
    wrapperColor,
    height,
    maxWidth,
    fontSize,
    fontFamily,
  } = props;

  return (
    <View 
    // style={styles.progressBar}
    >
      <Text style={{ fontSize: fontSize, fontFamily: fontFamily }}>{title}</Text>
      <View
        // style={styles.progressBarFuel}
        style={{
          borderRadius: `${borderradius}`,
          backgroundColor: `${wrapperColor}`,
          height: `${height}`,
          width: `${maxWidth}%`,
        }}
      >
        <View
          // style={styles.progressBarFuelWrapper}
          style={{
            width: `${percentage}%`,
            color: `${color}`,
            borderBottom: `${dashed}`,
            backgroundColor: `${backgroundcolor}`,
            borderRadius: `${borderradius}`,
            height: `${height}`,
          }}
        ></View>
      </View>
    </View>
  );
};

export default ProgressBar;
