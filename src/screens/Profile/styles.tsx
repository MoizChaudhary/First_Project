import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  settingButton: {
    justifyContent: 'flex-end',
    position: 'static',
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: 20,
  },
  settingIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profileTitleContainer: {
    marginHorizontal: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'RobotoBold',
    color: '#000000',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginVertical: 10,
  },
  achievementsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  achievementsText: {
    color: '#191C20',
    margin: 5,
    fontSize: 18,
    fontWeight: '700',
  },
  achievementsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  achievementButton: {
    marginHorizontal: 20,
  },
  achievementImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  achievementText: {
    alignSelf: 'center',
    color: '#191C20',
    margin: 5,
    fontSize: 16,
    fontWeight: '700',
  },
  summaryContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191C20',
    marginTop: 20,
  },
  summaryDescription: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 14,
    color: '#191C20',
    textAlign: 'center',
    lineHeight: 18,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#191C20',
  },
  booksStats: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  bookStat: {
    marginHorizontal: 40,
    alignItems: 'center',
  },
  bookStatCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191C20',
  },
  bookStatLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191C20',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191C20',
    marginTop: 20,
  },
  modalDescription: {
    marginHorizontal: 20,
    fontSize: 16,
    color: '#191C20',
    textAlign: 'center',
    marginVertical: 20,
  },
  modalProgressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  modalText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#191C20',
  },
  adjustGoalButton: {
    backgroundColor: '#26E350',
    borderRadius: 10,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  adjustGoalText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  contentContainer: {
    padding: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191C20',
    marginBottom: 10,
  },
  contactSupportButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  contactSupportText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0066ff',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
