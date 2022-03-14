import moment from 'moment';
import 'moment-timezone';

const currentTime = (): string => {
  moment.tz.setDefault('Asia/Seoul');
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
};

export default currentTime;
