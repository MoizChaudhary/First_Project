// // Waveform.js
// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet, Dimensions, Button} from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';
// import Sound from 'react-native-sound';

// const {width: SCREEN_WIDTH} = Dimensions.get('window');
// const BAR_WIDTH = 4;
// const BAR_MARGIN = 2;
// const BAR_COUNT = Math.floor(SCREEN_WIDTH / (BAR_WIDTH + BAR_MARGIN));

// const generateWaveformData = () => {
//   return new Array(BAR_COUNT).fill(0).map(() => Math.random());
// };
// //@ts-ignore
// const Waveform = ({audioFile}) => {
//   const waveformData = generateWaveformData();
//   const [sound, setSound] = useState(null);
//   const progress = useSharedValue(0);

//   useEffect(() => {
//     const soundInstance = new Sound(audioFile, Sound.MAIN_BUNDLE, error => {
//       if (error) {
//         console.log('Failed to load the sound', error);
//         return;
//       }
//       return () => {
//         if (soundInstance) {
//           soundInstance.release();
//         }
//       };
//     });

//     return () => {
//       soundInstance.release();
//     };
//   }, [audioFile]);

//   const playSound = () => {
//     if (sound) {
//       //@ts-ignore
//       sound.play((success: any) => {
//         if (success) {
//           console.log('Finished playing');
//         } else {
//           console.log('Playback failed');
//         }
//       });
//       //@ts-ignore
//       sound.getCurrentTime((seconds: any) => {
//         //@ts-ignore
//         progress.value = withTiming(seconds / sound.getDuration(), {
//           duration: 1000,
//         });
//       });
//     }
//   };

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       width: `${progress.value * 100}%`,
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.waveformContainer}>
//         {waveformData.map((value, index) => (
//           <View key={index} style={styles.barContainer}>
//             <Animated.View
//               style={[
//                 styles.bar,
//                 {height: value * 100},
//                 index < progress.value * BAR_COUNT && animatedStyle,
//               ]}
//             />
//           </View>
//         ))}
//       </View>
//       <View style={styles.controls}>
//         <Button title="Play" onPress={playSound} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   waveformContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     height: 100,
//     marginVertical: 20,
//   },
//   barContainer: {
//     width: BAR_WIDTH,
//     marginHorizontal: BAR_MARGIN / 2,
//   },
//   bar: {
//     width: BAR_WIDTH,
//     backgroundColor: '#FF5733',
//   },
//   controls: {
//     marginTop: 20,
//   },
// });

// export default Waveform;
