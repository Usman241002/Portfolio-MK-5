import dayjs from "dayjs";

export function formatDateFields(item) {
  return {
    ...item,
    start_date: dayjs(item.start_date).format("YYYY-MM-DD"),
    end_date: item.end_date
      ? dayjs(item.end_date).format("YYYY-MM-DD")
      : null,
  };
}
