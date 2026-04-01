export const getDefaultDates = () => {
  const now = new Date();
  const todayDate = now.toISOString().split("T")[0];

  let after;
  const isFirstDayOfMonth = now.getDate() === 1;
  if (isFirstDayOfMonth) {
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    after = lastMonthDate.toISOString().split("T")[0];
  } else {
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    after = currentMonth.toISOString().split("T")[0];
  }
  return { after, before: todayDate };
};
