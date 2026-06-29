'use client'

import React, { useState } from 'react'
import { useGameStore } from '@/app/Store/gameStore'

interface FormData {
  title: string
  year: string
  genre: string
  platform: string
  state: string
  description: string
  imageUrl: string
}

interface FormErrors {
  [key: string]: string
}

const AddGame = () => {
  const { games, setGames } = useGameStore()
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    year: new Date().getFullYear().toString(),
    genre: '',
    platform: '',
    state: 'new',
    description: '',
    imageUrl: ''
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setFormData(prev => ({...prev, imageUrl: reader.result as string}))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Year is required'
    } else if (isNaN(Number(formData.year)) || Number(formData.year) < 1900 || Number(formData.year) > new Date().getFullYear() + 5) {
      newErrors.year = 'Invalid year'
    }

    if (!formData.genre || formData.genre === '') {
      newErrors.genre = 'Genre is required'
    }

    if (!formData.platform || formData.platform === '') {
      newErrors.platform = 'Platform is required'
    }

    if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]: value}))
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const newGame = {
      id: Math.max(...games.map(g => g.id), 0) + 1,
      title: formData.title,
      description: formData.description,
      genre: formData.genre,
      state: formData.state as 'completed' | 'playing' | 'new',
      releaseDate: `${formData.year}-01-01`,
      imageUrl: previewImage || '/games/default.jpg'
    }

    setGames([...games, newGame])
    setSuccessMessage('Game added successfully!')
    
    // Reset form
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      genre: '',
      platform: '',
      state: 'new',
      description: '',
      imageUrl: ''
    })
    setPreviewImage(null)

    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleReset = () => {
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      genre: '',
      platform: '',
      state: 'new',
      description: '',
      imageUrl: ''
    })
    setPreviewImage(null)
    setErrors({})
  }

  return (
    <div className='bg-[#05050F] w-full min-h-screen pt-25 pb-10'>
      <div className='max-w-4xl mx-auto px-6'>
        <h1 className='text-4xl font-bold font-[Orbitron] text-white/80 mb-8'>Import Your Uniqueverse</h1>
        
        {successMessage && (
          <div className='mb-6 p-4 bg-lime-500/20 border border-lime-500 text-lime-300 rounded'>
            {successMessage}
          </div>
        )}

        <form className='flex flex-col font-[JetMono] gap-6 text-white' onSubmit={handleSubmit}>
          
          {/* Cover Image Selector */}
          <div>
            <label className='text-cyan-400 text-sm mb-3 block'>COVER ICON</label>
            <div className='flex gap-4 items-start'>
              {/* Preview */}
              <div className='w-24 h-24 border-2 border-slate-700 rounded-lg flex items-center justify-center bg-slate-900 flex-shrink-0'>
                {previewImage ? (
                  <img src={previewImage} alt='preview' className='w-full h-full object-cover rounded-lg' />
                ) : (
                  <div className='text-slate-600 text-sm text-center'>No image</div>
                )}
              </div>

              {/* Icon Grid */}
              <div className='flex-1'>
               
                {/* Upload */}
                <label className='inline-flex items-center px-4 py-2 border border-slate-700 rounded cursor-pointer hover:border-cyan-400 transition'>
                  <span className='text-sm'>Upload Image</span>
                  <input 
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Title and Year */}
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <label className='text-cyan-400 text-sm mb-2 block'>TITLE <span className='text-red-500'>*</span></label>
              <input 
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                placeholder='Game title...' 
                className={`w-full bg-slate-900 border text-white p-3 rounded focus:outline-none transition ${
                  errors.title ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-cyan-400'
                }`}
              />
              {errors.title && <p className='text-red-400 text-xs mt-1'>{errors.title}</p>}
            </div>
            <div>
              <label className='text-cyan-400 text-sm mb-2 block'>YEAR</label>
              <input 
                type='text'
                name='year'
                value={formData.year}
                onChange={handleInputChange}
                placeholder='2026'
                className={`w-full bg-slate-900 border text-white p-3 rounded focus:outline-none transition ${
                  errors.year ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-cyan-400'
                }`}
              />
              {errors.year && <p className='text-red-400 text-xs mt-1'>{errors.year}</p>}
            </div>
          </div>

          {/* Genre and Platform */}
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <label className='text-cyan-400 text-sm mb-2 block'>GENRE</label>
              <select 
                name='genre'
                value={formData.genre}
                onChange={handleInputChange}
                className={`w-full bg-slate-900 border text-white p-3 rounded focus:outline-none transition ${
                  errors.genre ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-cyan-400'
                }`}>
                <option value=''>Select genre</option>
                <option value='Action'>Action</option>
                <option value='RPG'>RPG</option>
                <option value='Adventure'>Adventure</option>
                <option value='Strategy'>Strategy</option>
              </select>
              {errors.genre && <p className='text-red-400 text-xs mt-1'>{errors.genre}</p>}
            </div>
            <div>
              <label className='text-cyan-400 text-sm mb-2 block'>PLATFORM</label>
              <select 
                name='platform'
                value={formData.platform}
                onChange={handleInputChange}
                className={`w-full bg-slate-900 border text-white p-3 rounded focus:outline-none transition ${
                  errors.platform ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-cyan-400'
                }`}>
                <option value=''>Select platform</option>
                <option value='PC'>PC</option>
                <option value='PlayStation'>PlayStation</option>
                <option value='Xbox'>Xbox</option>
              </select>
              {errors.platform && <p className='text-red-400 text-xs mt-1'>{errors.platform}</p>}
            </div>
          </div>
          {/* Status */}
          <div>
            <label className='text-cyan-400 text-sm mb-2 block'>STATUS</label>
            <select 
              name='state'
              value={formData.state}
              onChange={handleInputChange}
              className='w-full bg-slate-900 border border-slate-700 text-white p-3 rounded focus:border-cyan-400 outline-none'>
              <option value='new'>New</option>
              <option value='playing'>Playing</option>
              <option value='completed'>Completed</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className='text-cyan-400 text-sm mb-2 block'>DESCRIPTION</label>
            <textarea 
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              placeholder='Brief description...' 
              className={`w-full bg-slate-900 border text-white p-3 rounded min-h-32 focus:outline-none resize-none transition ${
                errors.description ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-cyan-400'
              }`}
            />
            {errors.description && <p className='text-red-400 text-xs mt-1'>{errors.description}</p>}
          </div>

          {/* Submit Button */}
          <div className='flex gap-4 pt-4'>
            <button type='submit' className='px-8 py-3 bg-cyan-500 text-slate-900 font-bold rounded hover:bg-cyan-400 transition'>
              Import Game
            </button>
            <button type='button' onClick={handleReset} className='px-8 py-3 border border-slate-700 text-white rounded hover:border-cyan-400 transition'>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddGame
