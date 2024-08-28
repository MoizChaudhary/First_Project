import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Sound from 'react-native-sound';
import ToggleSwitch from 'toggle-switch-react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import {Images} from '../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';

const Library = () => {
  const [theme, setTheme] = useState('light'); // Default to light mode

  const handleToggle = (isOn: any) => {
    setTheme(isOn ? 'dark' : 'light'); // Toggle between dark and light mode
  };

  const isDarkMode = theme === 'dark';
  const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;

  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Initialize the Sound object
    const newSound = new Sound('demo.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      console.log('Sound loaded successfully');
      setSound(newSound);
      setDuration(newSound.getDuration());
    });

    // Clean up the sound object on unmount
    return () => {
      if (newSound) {
        newSound.release();
      }
    };
  }, []);

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sound, isPlaying]);

  const playSound = () => {
    if (sound) {
      if (!isPlaying) {
        setIsPlaying(true);
        sound.play(success => {
          if (success) {
            console.log('Successfully finished playing');
            setIsPlaying(false);
          } else {
            console.log('Playback failed due to audio decoding errors');
            setIsPlaying(false);
          }
        });
      } else {
        // Resume playback if paused
        sound.play(success => {
          if (success) {
            console.log('Successfully resumed playing');
            setIsPlaying(true);
          } else {
            console.log('Playback failed due to audio decoding errors');
            setIsPlaying(false);
          }
        });
      }
    } else {
      console.log('Sound is not loaded yet');
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.pause(() => {
        console.log('Sound paused');
        setIsPlaying(false);
      });
    }
  };

  const onSliderValueChange = (value: number) => {
    if (sound) {
      sound.setCurrentTime(value);
      setCurrentTime(value);
    }
  };

  const skipForward = () => {
    if (sound) {
      const newTime = Math.min(currentTime + 5, duration); // Ensure it doesn't exceed duration
      sound.setCurrentTime(newTime);
      setCurrentTime(newTime);
    }
  };

  const skipBackward = () => {
    if (sound) {
      const newTime = Math.max(currentTime - 5, 0); // Ensure it doesn't go below 0
      sound.setCurrentTime(newTime);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Animation Setup
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSpring(1.5, {
        duration: 500,
        //@ts-ignore
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <View style={[styles.container, themeStyles]}>
      <View style={styles.toggleContainer}>
        <ToggleSwitch
          isOn={isDarkMode} // Reflect the current theme in the toggle switch
          onColor="#0166FF"
          offColor="#C4C4C4"
          label="Dark Mode"
          labelStyle={[
            styles.labelStyle,
            {color: isDarkMode ? '#ffffff' : '#000000'},
          ]}
          size="medium"
          onToggle={handleToggle}
          animationSpeed={300}
        />
      </View>
      <View style={styles.containerMain}>
        <View style={styles.centeredFlex}>
          <Animated.View style={[styles.waveform, animatedStyle]} />
          <View style={styles.containerView}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              onValueChange={onSliderValueChange}
              minimumTrackTintColor="#0166FF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#0166FF"
            />
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>

          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.marginHorizontal20}>
              <Image source={Images.PreviousSong} style={styles.controlIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipBackward}>
              <Image source={Images.Reverse5} style={styles.skipIcon} />
            </TouchableOpacity>

            {isPlaying ? (
              <TouchableOpacity onPress={stopSound}>
                <Image source={Images.StopSong} style={styles.skipIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={playSound}>
                <Image source={Images.PlaySong} style={styles.controlIcon} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={skipForward}
              style={styles.marginHorizontal20}>
              <Image source={Images.Forward5} style={styles.skipIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={Images.NextSong} style={styles.skipIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subsContainer}>
          <Image source={Images.subs1} style={styles.subsImage} />
          <Image source={Images.MusicHead} style={styles.subsImage} />
        </View>
      </View>
    </View>
  );
};

export default Library;
