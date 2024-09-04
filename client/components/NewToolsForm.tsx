//To collect data from users. it's related to AddTool function from apis/tools

import { useState } from 'react'
import { NewTool } from '../../models/tools'
import { addTool } from '../apis/tools'

const NewToolForm = () => {
  const [formData, setFormData] = useState<NewTool>({
    tool_name: '',
    tool_owner: '',
    description: '',
    image: '',
    availability: true, // default value
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTool(formData).then((newTool) => {
      console.log('New tool added:', newTool)
    })
    .catch((error) => {
      console.error('Error adding tool:', error)
    })

  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="tool_name" value={formData.tool_name} onChange={handleChange} placeholder="Tool Name" />
      <input type="text" name="tool_owner" value={formData.tool_owner} onChange={handleChange} placeholder="Owner Name" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
      <label>
        Availability:
        <input type="checkbox" name="availability" checked={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.checked })} />
      </label>
      <button type="submit">Add Tool</button>
    </form>
  )
}

export default NewToolForm