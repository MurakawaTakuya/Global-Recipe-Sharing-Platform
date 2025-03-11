import { supabase } from '../supabase';

export const fetchAverageRating = async (recipeId) => {
  const { data, error } = await supabase.from('ratings').select('rating').eq('recipeId', recipeId);

  if (error) {
    console.error('Error while loading rating:', error);
    return null;
  } else {
    const total = data.reduce((sum, { rating }) => sum + rating, 0);
    return total / data.length;
  }
};

export const submitRating = async (recipeId, value) => {
  const { error } = await supabase.from('ratings').insert([{ recipeId, rating: value }]);

  if (error) {
    console.error('Error while submitting rating:', error);
    return false;
  } else {
    return true;
  }
};
