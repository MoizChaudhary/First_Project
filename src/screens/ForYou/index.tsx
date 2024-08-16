import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import BookItem from '../../components/Flatlist_component';
import styles from './styles';
const data = [
  {id: '1', image: Images.F1},
  {id: '2', image: Images.F2},
  {id: '3', image: Images.F3},
  {id: '4', image: Images.F4},
  {id: '5', image: Images.F5},
];
const Book = [
  {id: '1', title: 'The Black Witch', image: Images.Book1},
  {id: '2', title: 'The Prisoner’s Key', image: Images.Book2},
  {id: '3', title: 'The Black Witch', image: Images.Book3},
];
const Money = [
  {id: '1', title: 'Tafseer AS-SADE', image: Images.Book4},
  {id: '2', title: 'Tafseer', image: Images.Book5},
  {id: '3', title: 'The Black Witch', image: Images.Book6},
];
const Prodctive = [
  {id: '1', title: 'Al Quran', image: Images.Book7},
  {id: '2', title: 'The book of Manieers', image: Images.Book8},
  {id: '3', title: 'The Quran', image: Images.Book9},
];
const Product = [
  {id: '1', title: 'Productivity', image: Images.Productivity},
  {id: '2', title: 'Development', image: Images.Development},
  {id: '3', title: 'Play', image: Images.Play},
];
const Summaries = [
  {
    id: '1',
    title: 'How to Pray Salah',
    image: Images.F2_1,
    ideas: '9 Ideas',
  },
  {
    id: '2',
    title: 'Halal Food Hacks',
    image: Images.F2_2,
    ideas: '9 Ideas',
  },
  {
    id: '3',
    title: 'How to Pray Salah',
    image: Images.F2_1,
    ideas: '9 Ideas',
  },
];
const Home = (onPress: any) => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <ScrollView style={styles.ScrollView}>
        <View style={styles.Logo_View}>
          <Image source={Images.logo} style={styles.Logo_Style} />
          <Text style={styles.Logo_Text}>Audio</Text>
        </View>
        <View style={styles.line_view}></View>

        <View style={styles.Steaks_View}>
          <View style={{alignSelf: 'center'}}>
            <Image source={Images.Fire} style={styles.Steaks_Img} />
          </View>
          <View style={styles.Steaks_Text_View}>
            <Text style={styles.Steaks_Text}>Start your Steak!</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text>0 sec to </Text>
            <View>
              <Text>make day 1</Text>
            </View>
          </View>
        </View>
        <View style={styles.Daily_view}>
          <View>
            <Text style={styles.Daily_Text}>Free daily</Text>
            <Text style={styles.Daily_Text}>summary</Text>
            <TouchableOpacity style={styles.Get_it_Touch}>
              <Text style={styles.Get_it_Text}>Get it now</Text>
              <Image
                source={Images.RightArrow}
                style={styles.RightArrow_style}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={Images.Img_Summary}
              style={styles.Img_Summary_Style}
            />
          </View>
        </View>
        <View style={styles.Categories_View}>
          <Text style={styles.Categories_Text}>
            Categories you're interested in
          </Text>
        </View>
        <FlatList
          data={Product}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.productContainer}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.Heading_View}>
          <Text style={styles.Heading_Title}>Today for you</Text>
          <Text style={styles.Heading_Text}>
            Similar summaries to the ones you liked
          </Text>
        </View>
        <BookItem Book={Book} />
        <View style={styles.Heading_View}>
          <Text style={styles.Heading_Title}>Daily Microlearning Session</Text>
        </View>
        <FlatList
          style={{marginHorizontal: 25}}
          data={data}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.Heading_View}>
          <Text style={styles.Heading_Title}>To have more money</Text>
          <Text style={styles.Heading_Text}>
            Top rated summaries for this goal
          </Text>
        </View>
        <BookItem Book={Money} lock noText />
        <View style={styles.Heading_View}>
          <Text style={styles.Heading_Title}>To be productive</Text>
          <Text style={styles.Heading_Text}>
            Top rated summaries for this goal
          </Text>
        </View>
        <BookItem Book={Prodctive} />
        <View style={styles.Heading_View}>
          <Text style={styles.Heading_Title}>Summaries</Text>
        </View>
        <FlatList
          data={Summaries}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.Flatlist_Container}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.summaryContainer}>
              <Image source={item.image} style={styles.summaryImage} />
              <Text style={styles.summaryTitle}>{item.title}</Text>
              <View style={styles.ideaContainer}>
                <Image source={Images.Idea} style={styles.ideaIcon} />
                <Text style={styles.ideaText}>{item.ideas}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={styles.Heading_View}>
          <Text style={styles.Heading_Title}>Challenges</Text>
        </View>
        <View style={styles.Challenges_View}>
          <View>
            <Text style={styles.Challenges_Text}>Morning</Text>
            <Text style={styles.Challenges_Text}>Routine</Text>
            <Text style={styles.Challenges_5_day}>5-day Challenge</Text>
          </View>
          <View>
            <Image source={Images.Rateing} style={styles.Rateing_Style} />
          </View>
        </View>
        <View style={styles.Heading_View}>
          <Text style={styles.Heading_Title}>Collections for you</Text>
        </View>
        <BookItem Book={Book} noText />
        <View style={styles.Manage_View}>
          <View>
            <Text style={styles.Heading_Title}>Manage Recommendations</Text>
            <Text style={styles.Heading_Text}>
              To get new recommendations, you need to adjust your goals
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <View style={styles.Manage_Img_View_Trophie}>
              <Image source={Images.Trophie} style={styles.Manage_Img} />
              <Text style={styles.Manage_Text}>Win at work</Text>
              <View style={styles.Manage_Img_View_Dollar}>
                <Image source={Images.Dollar} style={styles.Manage_Img} />
                <Text style={styles.Manage_Text}>Have More Money</Text>
              </View>
            </View>
            <View style={styles.Manage_Img_View_Time}>
              <Image source={Images.Time} style={styles.Manage_Img} />
              <Text style={styles.Manage_Text}>Be Productive</Text>
            </View>
            <View style={styles.Button_View}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('');
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>Manage</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
