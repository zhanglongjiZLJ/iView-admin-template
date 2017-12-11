<template>
  <div>
    {{ count }}
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:mapState(['menuList','pageOpenedList','todos','count'])
}
</script>

<style>

</style>
