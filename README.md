# react-native-country-list

![demo](https://github.com/subinspathilettu/react-native-country-list/blob/master/demo.png)

## Installation

```bash
$ yarn add react-native-country-list
```

## Basic Usage

```jsx
import { CountrySelection } from 'react-native-country-list';

render(){
    const { selected } = this.state;
    return (
      <View style={styles.container}>
        <CountrySelection action={(item) => this.onCountrySelection(item)} selected={selected}/>
      </View>
    );
  }
  ```
  
## Licence

[MIT](https://github.com/subinspathilettu/react-native-country-list/blob/master/LICENCE)
