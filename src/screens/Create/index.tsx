import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import Sound from 'react-native-sound';
import Svg, {Rect} from 'react-native-svg';
import {Images} from '../../assets/images';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Next, Play, Previous, Stop} from '../../assets/svg/play';
import {SvgXml} from 'react-native-svg';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BAR_WIDTH = 4;
const BAR_MARGIN = 2;
const BAR_COUNT = Math.floor(SCREEN_WIDTH / (BAR_WIDTH + BAR_MARGIN));

const App = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [waveformData, setWaveformData] = useState([]);
  const translateX = useRef(new Animated.Value(0)).current;
  const [isDragging, setIsDragging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //@ts-ignore
  const generateWaveformData = useCallback((duration, barCount) => {
    const maxValue = 80; // Maximum height of waveform bars
    return new Array(barCount).fill(0).map(() => Math.random() * maxValue);
  }, []);
  //@ts-ignore
  const formatTime = useCallback(seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }, []);

  const Waveform = useMemo(
    () =>
      ({progress, translateX, waveformData}: any) => {
        const barCount = waveformData.length;

        return (
          <Animated.View style={{transform: [{translateX}]}}>
            <Svg height="300" width={SCREEN_WIDTH}>
              {waveformData.map((value: any, index: any) => {
                const xPos =
                  (index - barCount / 2) * (BAR_WIDTH + BAR_MARGIN) +
                  SCREEN_WIDTH / 2;

                return (
                  <React.Fragment key={index}>
                    <Rect
                      x={xPos}
                      y={100 - value}
                      width={BAR_WIDTH}
                      height={value}
                      fill={index < progress * barCount ? '#FF5733' : '#CCCCCC'}
                    />
                    <Rect
                      x={xPos}
                      y={100}
                      width={BAR_WIDTH}
                      height={value}
                      fill={index < progress * barCount ? '#FFA732' : '#CCCCCC'}
                    />
                  </React.Fragment>
                );
              })}
            </Svg>
          </Animated.View>
        );
      },
    [],
  );

  useEffect(() => {
    const soundInstance = new Sound('demo.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      //@ts-ignore
      setSound(soundInstance);
      const duration = soundInstance.getDuration();
      setDuration(duration);

      const barCount = Math.floor(SCREEN_WIDTH / (BAR_WIDTH + BAR_MARGIN));
      //@ts-ignore
      setWaveformData(generateWaveformData(duration, barCount));
    });

    return () => {
      if (sound) {
        //@ts-ignore
        sound.release();
      }
    };
  }, [generateWaveformData]);

  const handlePlayPause = () => {
    if (isPlaying) {
      //@ts-ignore
      sound.pause();
      setIsPlaying(false);
    } else {
      //@ts-ignore
      sound.play(() => {
        //@ts-ignore
        sound.setCurrentTime(0);
        setIsPlaying(false);
        setProgress(0);
      });
      setIsPlaying(true);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying && !isDragging) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1 / (duration * 5);
          const newTime = newProgress * duration;
          setCurrentTime(newTime);

          if (newProgress >= 1) {
            clearInterval(interval);
            setIsPlaying(false);
            //@ts-ignore
            sound.pause();
            setProgress(0);
          }

          Animated.timing(translateX, {
            toValue: -SCREEN_WIDTH * newProgress,
            duration: 200,
            useNativeDriver: true,
          }).start();

          return newProgress;
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isPlaying, sound, duration, isDragging]);

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {
      useNativeDriver: true,
      listener: event => {
        setIsDragging(true); // Start dragging
        const newProgress = Math.min(
          //@ts-ignore
          Math.max(-event.nativeEvent.translationX / SCREEN_WIDTH, 0),
          1,
        );

        const newTime = newProgress * duration;
        setProgress(newProgress);
        setCurrentTime(newTime);
      },
    },
  );

  const onHandlerStateChange = ({nativeEvent}: any) => {
    if (nativeEvent.state === 5 || nativeEvent.state === 2) {
      setIsDragging(false); // End dragging

      // Set the sound's playback position to the correct point
      //@ts-ignore
      sound.setCurrentTime(currentTime);

      if (!isPlaying) {
        handlePlayPause();
      }
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Animated.View style={[styles.background, {transform: [{translateX}]}]}>
        <ImageBackground
          source={Images.splash}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.overlay} />
          <TouchableOpacity
            style={{flex: 9}}
            onPress={() => setModalVisible(true)}
          />
          <View style={styles.container}>
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}>
              <Animated.View style={styles.waveformContainer}>
                <Text style={styles.timeText}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </Text>
                <Waveform
                  progress={progress}
                  translateX={translateX}
                  waveformData={waveformData}
                />
              </Animated.View>
            </PanGestureHandler>
          </View>
        </ImageBackground>
      </Animated.View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade">
        <View style={styles.modalContainer}>
          <Text style={{color: 'red'}}> Duration: {formatTime(duration)}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <SvgXml xml={Previous} style={styles.skipIcon} />
            </TouchableOpacity>

            {isPlaying ? (
              <TouchableOpacity onPress={handlePlayPause}>
                <SvgXml xml={Play} style={styles.controlIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handlePlayPause}>
                <SvgXml xml={Stop} style={styles.controlIcon} />
              </TouchableOpacity>
            )}
            <TouchableOpacity>
              <SvgXml xml={Next} style={styles.skipIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: 850,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  waveformContainer: {
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  controlIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  skipIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});

export default App;
