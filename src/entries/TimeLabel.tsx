interface TimeLabelProps {
  startTime: Date;
  endTime: Date;
  withDate?: true;
}

export function TimeLabel(props: TimeLabelProps) {
  const startTimeStr = () => {
    if (props.startTime.getTime() <= Date.now()) {
      return "Now";
    } else {
      if (props.withDate) {
        return props.startTime.toLocaleTimeString([], { weekday: "short", hour: "2-digit", minute: "2-digit" });
      } else {
        return props.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
    }
  };

  const endTimeStr = () => {
    if (props.withDate) {
      return props.endTime.toLocaleTimeString([], { weekday: "short", hour: "2-digit", minute: "2-digit" });
    } else {
      return props.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
  };

  return (
    <p class="bg-yellow-3 font-bold text-black rounded text-center w-fit p-l-2 p-r-2 m-0">
      {startTimeStr()}-{endTimeStr()}
    </p>
  );
}
