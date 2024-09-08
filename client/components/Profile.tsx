import React, { useEffect, useState } from 'react'
import { useTools, useAddTool, useEditTool, useDeleteTool } from '../hooks/useTools'
import { Tools } from '../../models/tools'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from './SignedInUser'

const Profile = () => {
  const { data: tools, isLoading, isError, refetch } = useTools()
  const addToolMutation = useAddTool()
  const editToolMutation = useEditTool()
  const deleteToolMutation = useDeleteTool()

  const { user } = useAuth0()
  const SignedInUser = useUser()

  console.log(SignedInUser)

  const [userTools, setUserTools] = useState<Tools[] | undefined>(tools)

  useEffect(() => {
    const filterTools = () => {
      if (!tools || !user) return
      const filtered = tools.filter(tool => tool.tool_owner === user.nickname)
      setUserTools(filtered)
    };
  
    filterTools()
  }, [tools, user])

  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true);
    console.log('modal open')
  };

  const closeModal = () => {
    setIsOpen(false);
    console.log('modal closed')
  };

  const [formData, setFormData] = useState<Partial<Tools>>({
    tool_name: '',
    tool_owner: '',
    tool_owner_id: 0,
    description: '',
    availability: true,
    image: '',
    category: '',
    price: '',
  })
  const [editMode, setEditMode] = useState(false)
  const [currentToolId, setCurrentToolId] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const toolOwnerId = SignedInUser?.id ? Number(SignedInUser.id) : 0;

  const handleAddTool = () => {
    if (user) {
      const newTool: Tools = {
        ...formData,
        tool_owner: user.nickname || '',
        tool_owner_id: toolOwnerId
      };

      console.log('New Tool:', newTool);

      addToolMutation.mutate(newTool, {
        onSuccess: () => {
          setFormData({ tool_name: '', tool_owner: '', tool_owner_id: 0, description: '', availability: true, image: '', category: '', price: '' });
          refetch();
        },
      });
    }
  }

  const uniqueCategories = Array.from(new Set(tools?.map(tool => tool.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>(formData.category || '')

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    setFormData((prevData) => ({
      ...prevData,
      category: selectedCategory
    }));
  };

  const handleEditTool = () => {
    if (currentToolId !== null) {
      editToolMutation.mutate({ id: currentToolId, updates: formData }, {
        onSuccess: () => {
          setEditMode(false)
          setFormData({ tool_name: '', tool_owner: '', tool_owner_id: 0, description: '', availability: true, image: '', price: '', category: '' })
          setCurrentToolId(null)
          refetch()
        },
      })
    }
  }

  const handleDeleteTool = (id: number) => {
    deleteToolMutation.mutate(id, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  const handleSetEditMode = (tool: Tools) => {
    setFormData(tool)
    setCurrentToolId(tool.id)
    setEditMode(true)
  }

  if (isLoading) return <p>Loading tools...</p>
  if (isError) return <p>Error loading tools</p>

  return (
    <div>
      <h1>Your Profile</h1>

      <button onClick={openModal}>Open Modal</button>
      <dialog open={isOpen} onClose={closeModal} className={`modal-container ${isOpen ? 'open' : ''}`}>
      <button onClick={closeModal} className='modal-close-button'>&times;</button>
        <h2>{editMode ? 'Edit Tool' : 'Add New Tool'}</h2>
        <input
          type="text"
          name="tool_name"
          value={formData.tool_name}
          onChange={handleChange}
          placeholder="Tool Name"
          className='tool_name'
        />
        {uniqueCategories.map((category) => (
        <div key={category}>
          <input
            type="radio"
            id={category}
            name={category}
            value={category}
            onChange={handleCategoryChange}
            checked={selectedCategory === category}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className='tool-description'
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className='tool-image'
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className='Price'
        />
        <label>
          Please tick if the tool available now:
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, availability: e.target.checked }))}
          />
          </label>
        
        <button onClick={editMode ? handleEditTool : handleAddTool}>
          {editMode ? 'Update Tool' : 'Add Tool'}
        </button>
        {editMode && (
          <button
            onClick={() => {
              setEditMode(false)
              setFormData({ tool_name: '', tool_owner: '', tool_owner_id: 0, description: '', availability: true, image: '', price: '', category: '' })
            }}
          >
            Cancel
          </button>
          
        )}
        
      </dialog>

      <h2>Your Tools</h2>
      <ul>
        {userTools?.map((tool) => (
          <li key={tool.id}>
            <h3>{tool.tool_name}</h3>
            <p>Availability: {tool.availability ? 'Available' : 'Not Available'}</p>
            <button onClick={() => handleSetEditMode(tool)}>Edit</button>
            <button onClick={() => handleDeleteTool(tool.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <Link to="/">Back to Homepage</Link>
      <Link to="/tools">Back to Tools</Link>
    </div>
  )
}

export default Profile
