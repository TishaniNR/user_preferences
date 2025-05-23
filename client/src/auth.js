export let curreUserId = null;

export const setUserId = (userId) => {
    curreUserId = userId;
}

export const getUserId = () => {
    return curreUserId;
}