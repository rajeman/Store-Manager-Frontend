export const getFormattedTime = (unixMillis) => {
    const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(parseInt(unixMillis));
    const year = (date.getFullYear());
    const month = months_arr[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`;
    return `${month}-${day}-${year} ${hours}:${minutes.substr(-2)}`;
  };