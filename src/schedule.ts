export async function getCurrentSchedule() {
  const cachedSchedule = localStorage.getItem("schedule");

  if (cachedSchedule != null) {
    const cachedScheduleParsed = JSON.parse(cachedSchedule);
    if (Date.parse(cachedScheduleParsed.expires) <= new Date(Date.now()).getTime()) {
      console.log("fetch new");
      return await fetchNewSchedule();
    } else {
      console.log("cached");
      return cachedScheduleParsed;
    }
  } else {
    console.log("fetch new");
    return await fetchNewSchedule();
  }
}

async function fetchNewSchedule() {
  let res = await (await fetch("https://splatoon3.ink/data/schedules.json")).json();
  let date = new Date(Date.now());
  date.setHours(date.getHours() + 1);
  date.setMinutes(0, 0, 0);
  let newSchedule = {
    expires: date,
    data: res.data
  };
  localStorage.setItem("schedule", JSON.stringify(newSchedule));
  return newSchedule;
}
