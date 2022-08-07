import React from "react"

const PersonForm = ({ valueProp, onChangeProp }) => {
  return <input type="text" value={valueProp} onChange={onChangeProp} />
}

export default PersonForm
