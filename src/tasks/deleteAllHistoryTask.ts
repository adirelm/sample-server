import History from "../models/history";

export const deleteAllHistoryTask = async function () {
  try {
    await History.destroy({ truncate: true });
  } catch (error) {
    console.log(error);
  }
};
