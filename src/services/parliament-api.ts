export const getMp = async (name: string) => {
  const apiUrl = "https://members-api.parliament.uk/api";

  console.log("fetching mp" + name);
  const mp = await fetch(`${apiUrl}/Members/search?name=${name}`).then((res) =>
    res.json()
  );
  console.log(mp);
  return mp.items[0].value;
};
