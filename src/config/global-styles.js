import { StyleSheet } from 'react-native';
import {darkGrey, lightGray, primaryColor, white} from './global-theme';

const style = StyleSheet.create({
  addIcon: {
    color: white,
  },
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colView: {
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
  fabButton: {
    backgroundColor: primaryColor,
  },
  formLabel: {
    color: lightGray,
    fontSize: 14,
    fontWeight: "500"
  },
  fullWidth: {
    width: '100%',
  },
  fullWidthPadding: {
    paddingHorizontal: 20,
  },
  imgBG: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imgBGSimple: {
    resizeMode: 'cover',
    opacity: 0.8,
  },
  imgBGTranslucent: {
    resizeMode: 'cover',
    opacity: 0.25,
  },
  imgBGMenuTranslucent: {
    resizeMode: 'cover',
    opacity: 0.70,
  },
  rowView: {
    flexDirection: 'row',
  },
  separatorComponent: {
    width: "100%",
    height: 2,
    backgroundColor: lightGray,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  textInput: {
    borderBottomColor: lightGray,
    borderBottomWidth: 1,
    color: darkGrey,
    fontSize: 18,
    fontWeight: "700"
  }
});

export default style;
