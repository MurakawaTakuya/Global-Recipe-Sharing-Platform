export function checkSaved(recipeId) {
  const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
  return savedRecipes.includes(recipeId);
}

export function toggleSave(recipeId, isSaved) {
  let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
  if (isSaved) {
    savedRecipes = savedRecipes.filter((id) => id !== recipeId);
  } else {
    savedRecipes.push(recipeId);
  }
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  return !isSaved;
}
