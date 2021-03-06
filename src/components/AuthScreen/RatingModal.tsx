import React, { PropsWithChildren } from 'react'
import { Modal, Platform, Pressable, StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  cardMain: {
    position: 'relative',
    width: 327,
    alignSelf: 'center',
    zIndex: 1000,
    elevation: 1000,
    height: '100%',
    justifyContent: 'flex-end',
  },
  card: {
    width: 327,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { textAlign: 'center', fontSize: 17, fontWeight: '500' },
})

// = ({ isModalVisible, children }) =>
type TaskProps = {
  isModalVisible: boolean
  setModalVisible: (visible: boolean) => void
}
export const RatingModal = ({
  isModalVisible,
  children,
  setModalVisible,
}: PropsWithChildren<TaskProps>) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={[
          styles.container,
          {
            ...Platform.select({
              android: {
                // paddingTop: shouldMove ? 240 : null,
              },
            }),
          },
        ]}
      >
        <View style={styles.cardMain}>
          <View style={styles.card}>{children}</View>
          <Pressable onPress={() => setModalVisible(false)}>
            <Text>Ask me later</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
