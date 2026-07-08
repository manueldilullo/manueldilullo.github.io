<template>
  <div class="vue-tabs">
    <ul class="nav nav-tabs">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="{ active: activeIndex === index }"
      >
        <a
          href="#"
          @click.prevent="selectTab(index)"
          :style="activeIndex === index ? { color: activeTextColor } : {}"
        >
          {{ tab.title }}
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueTabs',
  props: {
    activeTextColor: {
      type: String,
      default: '#535A5E'
    }
  },
  data() {
    return {
      tabs: [],
      activeIndex: 0
    }
  },
  methods: {
    registerTab(tab) {
      this.tabs.push(tab)
    },
    selectTab(index) {
      this.activeIndex = index
      this.tabs.forEach((tab, i) => {
        tab.isActive = i === index
      })
    }
  }
}
</script>

<style scoped>
.vue-tabs .nav-tabs {
  border: none;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}
.vue-tabs .nav-tabs > li > a {
  background: transparent;
  border: none;
  transition: all 0.5s;
  padding-right: 0;
  padding-left: 0;
  margin-right: 15px;
  margin-left: 15px;
  text-decoration: none;
  color: #a0a0a0;
  position: relative;
}
.vue-tabs .nav-tabs > li > a:hover {
  background: transparent;
  color: #cbcbcb;
  transition: all 0.5s;
}
.vue-tabs .nav-tabs > li.active > a {
  background: transparent;
  border: none;
  transition: all 0.5s;
  color: inherit;
}
.vue-tabs .nav-tabs > li > a:after {
  content: "";
  width: 20%;
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 0 2px;
  border-style: solid;
  transition: all 0.5s;
}
.vue-tabs .nav-tabs > li.active > a:after {
  width: 100%;
  transition: all 0.5s;
}
</style>
