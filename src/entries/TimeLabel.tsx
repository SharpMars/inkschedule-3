interface TimeLabelProps {
  startTime: Date;
  endTime: Date;
  withDate?: true;
}

export function TimeLabel(props: TimeLabelProps) {
  let startTimeStr = "";
  if (props.startTime.getTime() <= Date.now()) {
    startTimeStr = "Now";
  } else {
    if (props.withDate) {
      startTimeStr = props.startTime.toLocaleTimeString([], { weekday: "short", hour: "2-digit", minute: "2-digit" });
    } else {
      startTimeStr = props.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
  }

  let endTimeStr = "";
  if (props.withDate) {
    endTimeStr = props.endTime.toLocaleTimeString([], { weekday: "short", hour: "2-digit", minute: "2-digit" });
  } else {
    endTimeStr = props.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <p class="bg-yellow-3 font-bold text-black rounded text-center w-fit p-l-2 p-r-2 m-0">
      {startTimeStr}-{endTimeStr}
    </p>
  );
}
