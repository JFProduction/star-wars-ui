export const fetchData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    return {
      error: true,
      err: e
    }
  }
};