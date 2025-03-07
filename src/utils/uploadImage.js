import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabase';

export const uploadImage = async (selectedFile) => {
  if (!selectedFile) {
    alert('Please select a file');
    return;
  }

  const fileExt = selectedFile.name.split('.').pop(); // ファイルの拡張子
  const fileName = `${uuidv4()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('recipe-images')
    .upload(fileName, selectedFile);

  if (error) {
    console.error('Upload Error:', error);
    return;
  }

  console.log('Upload Successful:', data.path);

  return fileName;
};
