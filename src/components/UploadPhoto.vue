<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadImage">Upload Image</button>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { supabase } from '../supabase'

const selectedFile = ref(null)

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const uploadImage = async () => {
  if (!selectedFile.value) {
    alert('Please select a file')
    return
  }

  const fileExt = selectedFile.value.name.split('.').pop()
  const fileName = `${uuidv4()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('recipe-images')
    .upload(fileName, selectedFile.value)

  if (error) {
    console.error('Upload Error:', error)
    return
  }

  console.log('Upload Successful:', data.path)
}
</script>
