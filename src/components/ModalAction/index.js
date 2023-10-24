import {
    Modal,
    TouchableWithoutFeedback,
    View,
} from 'react-native'


export default function ModalAction({onClose, children,...props}) {
    return (
      <Modal {...props}>
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