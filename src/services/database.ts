import { AirTableRecord, PointOfInterest } from "./../components/Map";
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000/queryAirtable"
    : "/.netlify/functions/queryAirtable";

export const fetchAllLocations = (): Promise<PointOfInterest[]> => {
  return fetch(url)
    .then(res => res.json())
    .then(({ records }) => {
      return records
        .filter((r: AirTableRecord) => r.fields.title !== undefined)
        .map((r: AirTableRecord) => ({
          ...r.fields,
          createdTime: r.createdTime,
          id: r.id
        }));
    });
};

export const fetchLocationById = (id: string): Promise<PointOfInterest> => {
  return fetch(url + "?id=" + id)
    .then(res => res.json())
    .then(res => {
      return { ...res.fields, createdTime: res.createdTime, id: res.id };
    });
};
