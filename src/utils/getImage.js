import { supabase } from '../supabase';

export const getImageUrl = (filePath) => {
  const { data } = supabase.storage.from('recipe-images').getPublicUrl(filePath);

  return data.publicUrl;
};
