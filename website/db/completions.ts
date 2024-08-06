/**
 * Mark a challenge as completed in localstorage
 *
 * @param {number} challenge_id
 * @returns
 */
export async function createCompletion({ challenge_id }) {
  return localStorage.setItem(`challenge-${challenge_id}`, "completed");
}

/**
 * Mark a challenge as incomplete
 *
 * @param {number} challenge_no
 * @param {string} user_id
 * @returns
 */
export async function deleteCompletion({ challenge_id }) {
  return localStorage.removeItem(`challenge-${challenge_id}`);
}

/**
 * Get all completed challenges for a user
 *
 * @param user_id
 * @returns
 */
export async function getCompletions() {
  return Object.keys(localStorage).filter((key) => key.includes("challenge-"));
}
