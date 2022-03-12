const currentTime = () => {
  var moment = require('moment');
  require('moment-timezone');
  moment.tz.setDefault('Asia/Seoul');
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
};

export default currentTime;
