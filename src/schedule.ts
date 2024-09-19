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
  const res = await (await fetch("https://splatoon3.ink/data/schedules.json")).json();
  const date = new Date(Date.now());
  date.setHours(date.getHours() + 1);
  date.setMinutes(0, 0, 0);
  // eslint-disable-next-line prefer-const
  let newSchedule = {
    expires: date,
    data: res.data
  };

  newSchedule.data.regularSchedules.nodes = newSchedule.data.regularSchedules.nodes.filter((node: any) => {
    return node.regularMatchSetting != null;
  });

  newSchedule.data.bankaraSchedules.nodes = newSchedule.data.bankaraSchedules.nodes.filter((node: any) => {
    return node.bankaraMatchSettings != null;
  });

  newSchedule.data.xSchedules.nodes = newSchedule.data.xSchedules.nodes.filter((node: any) => {
    return node.xMatchSetting != null;
  });

  newSchedule.data.festSchedules.nodes = newSchedule.data.festSchedules.nodes.filter((node: any) => {
    return node.festMatchSettings != null;
  });

  newSchedule.data.coopGroupingSchedule.combinedSchedules = {
    nodes: []
  };

  newSchedule.data.coopGroupingSchedule.combinedSchedules.nodes = [
    ...newSchedule.data.coopGroupingSchedule.regularSchedules.nodes,
    ...newSchedule.data.coopGroupingSchedule.bigRunSchedules.nodes.map((node: any) => {
      return {
        ...node,
        isBigRun: true
      };
    }),
    ...newSchedule.data.coopGroupingSchedule.teamContestSchedules.nodes.map((node: any) => {
      return {
        ...node,
        isEggstra: true
      };
    })
  ];

  newSchedule.data.coopGroupingSchedule.combinedSchedules.nodes.sort((a: any, b: any) => {
    const startTimeA = Date.parse(a.startTime);
    const startTimeB = Date.parse(b.startTime);
    const endTimeA = Date.parse(a.endTime);
    const endTimeB = Date.parse(b.endTime);

    const happeningNowA = startTimeA <= Date.now() && endTimeA >= Date.now();
    const happeningNowB = startTimeB <= Date.now() && endTimeB >= Date.now();

    const isEggstraA = a.isEggstra;
    const isEggstraB = b.isEggstra;

    if (happeningNowA && happeningNowB) {
      if (!isEggstraA && isEggstraB) {
        return 1;
      }
      if (isEggstraA && !isEggstraB) {
        return -1;
      }

      return 0;
    } else {
      return startTimeA - startTimeB;
    }
  });

  if (newSchedule.data.currentFest.timetable.length == 0) {
    newSchedule.data.currentFest.currentTricolorMatch = newSchedule.data.currentFest.tricolorStages[0];
  } else {
    let stageId;
    let startTime;
    const triColorTimetable = [];

    for (const match of newSchedule.data.currentFest.timetable) {
      if (stageId == undefined) stageId = match.festMatchSettings[0].vsStages[0].id;

      if (startTime == undefined) startTime = match.startTime;

      if (
        match.festMatchSettings[0].vsStages[0].id != stageId ||
        newSchedule.data.currentFest.timetable.at(-1) === match
      ) {
        triColorTimetable.push({ ...match, startTime: startTime, endTime: match.endTime });
        startTime = undefined;
        stageId = undefined;
      }
    }

    newSchedule.data.currentFest.timetable = triColorTimetable;

    const currentTriColorStage = newSchedule.data.currentFest.tricolorStages[0];
    const currentTriColorMatch = newSchedule.data.currentFest.timetable.find(
      (match: { festMatchSettings: any[] }) => match.festMatchSettings[0].vsStages[0].id === currentTriColorStage.id
    );

    const nextTriColorMatch =
      newSchedule.data.currentFest.timetable[
        (newSchedule.data.currentFest.timetable as any[]).indexOf(
          newSchedule.data.currentFest.timetable.find(
            (match: { festMatchSettings: any[] }) =>
              match.festMatchSettings[0].vsStages[0].id === currentTriColorStage.id
          )
        ) + 1
      ];

    newSchedule.data.currentFest.currentTricolorMatch = currentTriColorMatch;
    newSchedule.data.currentFest.nextTricolorMatch = nextTriColorMatch;
  }

  localStorage.setItem("schedule", JSON.stringify(newSchedule));
  return newSchedule;
}
