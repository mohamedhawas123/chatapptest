import React from 'react'
import { Button, Checkbox, Form, Select } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


class AddChatForm extends React.Component  {


  state = {
    username : [],
    error: null
}


  handlechange = value => {
    this.setState({
        username: value
    })
  }


  


  render() {
    return(
      <Form  >
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
        <Select mode="tags" style={{ width: "100%" }} placeholder="add a user" onChange={this.handlechange}  >
                {[]}
            </Select>
        </Form.Field>
       
        <Button type='submit'>Submit</Button>
      </Form>
    )
    
  }
}
 
export default AddChatForm