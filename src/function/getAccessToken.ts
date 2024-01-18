const getAccessToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.accessToken}`,
  },
});

export default getAccessToken;
