const getIp = async () => {
  return await fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => getLocationByIp(data.ip));
};

const getLocationByIp = async (ip: string) => {
  return await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)
    .then((response) => response.json())
    .then((data) => data);
};

export { getIp, getLocationByIp };
