<template>
  <el-card class="box-card" shadow="never">
    <el-row align="middle" type="flex">
      <el-col :span="2">
        <el-button @click="goBack">
          <font-awesome-icon icon="chevron-left" />
        </el-button>
      </el-col>
      <el-col :span="21">
        <div class="trip-destination-text">
          {{ tripDetail.destination }}
        </div>
        <div class="trip-date-text">
          <font-awesome-icon icon="calendar-alt" />
          {{ tripDetail.start_date }} to {{ tripDetail.end_date }} ({{ dateDiff }}
          days)
        </div>
        <div class="trip-detail-text" v-if="tripDetail.name">
          {{ tripDetail.name }}
        </div>
      </el-col>
      <el-col :span="1">
        <el-button @click="editTrip" circle icon="el-icon-edit" size="mini" type="primary"></el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import { Actions } from '@/constants/actions';

@Component
export default class TripDetailBanner extends Vue {
  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  get dateDiff() {
    const startDateMoment = moment(this.tripDetail.start_date);
    const endDateMoment = moment(this.tripDetail.end_date);
    return endDateMoment.diff(startDateMoment, 'days');
  }

  editTrip() {
    this.$store.dispatch(Actions.OPEN_TRIP_FORM, true);
    this.$store.dispatch(Actions.UPDATE_EDIT, { isEditMode: true, idInEdit: this.tripDetail.id, component: 'trip' });
  }

  goBack() {
    this.$router.go(-1);
  }
}
</script>

<style scoped>
.box-card {
  min-height: 5rem;
}

.trip-destination-text {
  font-size: 2.2rem;
  font-weight: 700;
}

.trip-date-text {
  line-height: 1.8rem;
  font-weight: 500;
}

.trip-detail-text {
  line-height: 1.8rem;
}
</style>
