//Profile page shows:
//All relevant information on their profile, including: distance, cost, user rating, availability of tools, rental status.
//Ability to select "rent this tool"
//Use Trademe as inspiration (change colour scheme and icons)
//Include a "back to tools" and "back to homepage" buttons

import React, { useEffect, useState } from 'react'
import {
  useTools,
  useAddTool,
  useEditTool,
  useDeleteTool,
  // useRentals,
} from '../hooks/useTools'
import { Tools } from '../../models/tools'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
  // Fetch tools using the useTools hook
  const { data: tools, isLoading, isError, refetch } = useTools()
  const addToolMutation = useAddTool()
  const editToolMutation = useEditTool()
  const deleteToolMutation = useDeleteTool()

  const { user } = useAuth0()

  console.log(user)

  const [userTools, setUserTools] = useState<Tools[] | undefined>(tools)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterTools = () => {
    if (!tools || !user) return
    const filtered = tools.filter((tool) => tool.tool_owner === user.nickname)
    console.log(filtered)
    setUserTools(filtered)
  }

  useEffect(() => {
    filterTools()
  }, [filterTools, tools, user])

  // state for modal pop up
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
    console.log('modal open')
  }

  const closeModal = () => {
    setIsOpen(false)
    console.log('modal closed')
  }

  // State for form data
  const [formData, setFormData] = useState<Partial<Tools>>({
    tool_name: '',
    tool_owner: '',
    description: '',
    availability: true,
    image: '',
  })
  const [editMode, setEditMode] = useState(false)
  const [currentToolId, setCurrentToolId] = useState<number | null>(null)

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Add a new tool
  const handleAddTool = () => {
    addToolMutation.mutate(formData as Tools, {
      onSuccess: () => {
        setFormData({
          tool_name: '',
          tool_owner: '',
          description: '',
          availability: true,
          image: '',
        })
        refetch()
      },
    })
  }

  // Edit an existing tool
  const handleEditTool = () => {
    if (currentToolId !== null) {
      editToolMutation.mutate(
        { id: currentToolId, updates: formData },
        {
          onSuccess: () => {
            setEditMode(false)
            setFormData({
              tool_name: '',
              tool_owner: '',
              description: '',
              availability: true,
              image: '',
            })
            setCurrentToolId(null)
            refetch()
          },
        },
      )
    }
  }

  // Delete a tool
  const handleDeleteTool = (id: number) => {
    deleteToolMutation.mutate(id, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  // Set the tool data for editing
  const handleSetEditMode = (tool: Tools) => {
    setFormData(tool)
    setCurrentToolId(tool.id)
    setEditMode(true)
  }

  // Display rentals
  // const userId = React.useMemo(() => {
  //   return user?.sub ? parseInt(user.sub.split('|')[1], 10) : 0
  // }, [user?.sub])
  // const { data: rentals } = useRentals(userId)

  if (isLoading) return <p>Loading tools...</p>
  if (isError) return <p>Error loading tools</p>

  return (
    <div>
      <h1>Your Profile</h1>

      {/* Tool Form: Add/Edit */}
      <button onClick={openModal}>Open Modal</button>
      <dialog
        open={isOpen}
        onClose={closeModal}
        className={`modal-container ${isOpen ? 'open' : ''}`}
      >
        <button onClick={closeModal} className="modal-close-button">
          &times;
        </button>
        <h2>{editMode ? 'Edit Tool' : 'Add New Tool'}</h2>
        <input
          type="text"
          name="tool_name"
          value={formData.tool_name}
          onChange={handleChange}
          placeholder="Tool Name"
          className="tool_name"
        />
        <input
          type="text"
          name="tool_owner"
          value={formData.tool_owner}
          onChange={handleChange}
          placeholder="Tool Owner"
          className="tool_owner"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="tool-description"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="tool-image"
        />
        <label>
          Availability:
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                availability: e.target.checked,
              }))
            }
          />
        </label>
        <button onClick={editMode ? handleEditTool : handleAddTool}>
          {editMode ? 'Update Tool' : 'Add Tool'}
        </button>
        {editMode && (
          <button
            onClick={() => {
              setEditMode(false)
              setFormData({
                tool_name: '',
                tool_owner: '',
                description: '',
                availability: true,
                image: '',
              })
            }}
          >
            Cancel
          </button>
        )}
      </dialog>

      {/* Tool List */}
      <h2>Your Tools</h2>
      <ul>
        {userTools?.map((tool) => (
          <li key={tool.id}>
            <h3>{tool.tool_name}</h3>
            <p>
              Availability: {tool.availability ? 'Available' : 'Not Available'}
            </p>
            <button onClick={() => handleSetEditMode(tool)}>Edit</button>
            <button onClick={() => handleDeleteTool(tool.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/*Rentals List*/}
      <h2>Your Rentals</h2>

      {/* Navigation Links */}
      <Link to="/">Back to Homepage</Link>
      <Link to="/tools">Back to Tools</Link>
    </div>
  )
}

export default Profile
