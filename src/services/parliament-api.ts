export const getAllMps = async () => {
  const mps = await fetch(
    "https://members-api.parliament.uk/api/Members/Search?skip=0&take=20"
  );

  const mpsJson = await mps.json();
  console.log(mpsJson);
};
