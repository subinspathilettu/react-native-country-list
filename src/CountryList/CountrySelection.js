import React from 'react';
import {
  View, TextInput, Image, SectionList, Text, TouchableOpacity,
} from 'react-native';
import styles from './countrySelectionStyles';
import NavigationBackButton from '../../components/NavigationBackButton/NavigationBackButton';
import { searchIcon, countrySelectionTick, countries } from '../../utils/Constants';
import translate from '../../utils/translate';

/**
 * Item view
 * @param {*} params
 */
const ItemView = (params) => {
  let text = `${params.item.name} (+${params.item.callingCode})`;
  if (params.type === 'country') {
    text = `${params.item.name}`;
  }

  let selected = null;
  if (params.selected != null && params.selected.callingCode === params.item.callingCode) {
    selected = <Image source={countrySelectionTick} style={styles.selectionTick} />;
  }
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.itemTextContainer} onPress={() => params.action(params)}>
        <Image source={{ uri: params.item.flag }} style={styles.flag} />
        <Text numberOfLines={1} style={styles.itemText}>{text}</Text>
        <View style={styles.selectionView}>
          { selected }
        </View>
      </TouchableOpacity>
      <View style={styles.itemSeparator} />
    </View>
  );
};


/**
 * Section header view
 * @param {*} params
 */
const SectionHeader = params => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>{params.title}</Text>
  </View>
);

/**
 * Country selection screen
 */
export default class CountrySelection extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: translate('SELECT COUNTRY CODE'),
    headerTitleStyle: styles.headerTitle,
    headerTransparent: false,
    headerLeft: (
      <NavigationBackButton navigation={navigation} mode="black" />
    ),
  })

  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    };
  }

  componentWillMount() {
    this.generateSectionData(countries);
  }

  /**
   * Country selection action
   */
  onCountrySelection = (params) => {
    const { navigation } = this.props;
    navigation.state.params.actionCallBack(params);
    navigation.goBack();
  }

  /**
   * Change search text action
   */
  onChangeSearchText = (text) => {
    const filtered = countries.filter(country => country.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
    this.generateSectionData(filtered);
  }

  /**
   * Generate section data from country list
   */
  generateSectionData(countryList) {
    const sections = [];
    const { navigation } = this.props;
    const { selected } = navigation.state.params;
    if (selected != null) {
      sections.push({ title: translate('SELECTED LOCATION'), data: [selected] });
    }

    const sectionHeaders = countryList.map(data => data.name.charAt(0));
    const uniqueHeaders = Array.from(new Set(sectionHeaders));

    uniqueHeaders.forEach((item) => {
      const filtered = countryList.filter(country => country.name.charAt(0) === item);
      sections.push({ title: item, data: filtered });
    });
    this.setState({ sections });
  }

  render() {
    const { navigation } = this.props;
    const { sections } = this.state;
    const { type, selected } = navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.textInput}
              placeholder={translate('Search')}
              placeholderTextColor="#2d2926"
              enablesReturnKeyAutomatically
              clearButtonMode="while-editing"
              onChangeText={text => this.onChangeSearchText(text)}
            />
          </View>
        </View>
        <SectionList
          renderItem={({ item, index, section }) => (
            <ItemView
              item={item}
              index={index}
              section={section}
              action={() => this.onCountrySelection(item)}
              type={type}
              selected={selected}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (<SectionHeader title={title} />)}
          sections={sections}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}
