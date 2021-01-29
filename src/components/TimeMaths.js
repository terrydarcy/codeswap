export const getTimeDiff = (time0) => {
  if (time0 != null) {
    const time1 = new Date().getTime() / 1000;
    var secsTimeDiff = time1 - time0.seconds,
      minsTimeDiff,
      hoursTimeDiff,
      prevNum,
      ret,
      isHours = false;

    if (secsTimeDiff < 30) {
      return "Just now";
    }
    if (Math.floor(secsTimeDiff) === 1) {
      ret = String(Math.floor(secsTimeDiff)) + " second ago";
    } else {
      ret = String(Math.floor(secsTimeDiff)) + " seconds ago";
    }

    if (secsTimeDiff > 60) {
      prevNum = Math.floor((minsTimeDiff = secsTimeDiff / 60));
      if (prevNum === 1) {
        ret = String(Math.floor((minsTimeDiff = secsTimeDiff / 60))) + " min ago";
      } else {
        ret = String(Math.floor((minsTimeDiff = secsTimeDiff / 60))) + " mins ago";
      }
    }
    if (prevNum > 60) {
      prevNum = Math.floor((hoursTimeDiff = minsTimeDiff / 60));
      isHours = true;
      if (prevNum === 1) {
        ret = String(Math.floor((hoursTimeDiff = minsTimeDiff / 60))) + " hour ago";
      } else {
        ret = String(Math.floor((hoursTimeDiff = minsTimeDiff / 60))) + " hours ago";
      }
    } else {
      return ret;
    }

    if (isHours && prevNum >= 24) {
      prevNum = Math.floor(hoursTimeDiff / 24);
      if (prevNum === 1) {
        ret = String(Math.floor(hoursTimeDiff / 24)) + " day ago";
      } else {
        ret = String(Math.floor(hoursTimeDiff / 24)) + " days ago";
      }
    }
    return ret;
  }
};
