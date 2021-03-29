import { Component, Vue } from 'vue-property-decorator';
import { formatDistanceToNow } from 'date-fns';
import firebase from '@/firebase';

@Component
class DateTimeMixin extends Vue {
  get timeAgo(): (dt: firebase.firestore.Timestamp) => string {
    return (time: firebase.firestore.Timestamp) => formatDistanceToNow(time.toDate(), {
      addSuffix: true,
    });
  }
}
export default DateTimeMixin;
