import React from 'react'
import { Modal, Button } from 'antd';
import AddChatForm from './Form'

class Model extends React.Component {
 


  render() {
    return (
   
        <Modal
          centered
          footer={null}
          visible={this.props.isVisible}
          onCancel={this.props.close}>

          
      <AddChatForm />

     </Modal>
     
    
    );
  }
}

export default Model;