import {
    Modal,
    TouchableWithoutFeedback,
    View,
} from 'react-native'


export default function ModalAction({visible, onClose, children}) {
    return (
      <Modal visible={visible} transparent>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              height: '100%',
              position: 'relative',
            }}>
              {children}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }