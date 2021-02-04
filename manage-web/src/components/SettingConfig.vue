<template>
  <div />
</template>
<script>
export default {
  name: 'SettingConfig',
  components: {
  },
  props: {
  },
  data() {
    return {
      settingProductName: ''

    }
  },
  watch: {
    // textarea(newValue) {
    //   this.monacoEditor.updateOptions({ value: newValue })
    // }
  },
  mounted() {
    this.$('#excel-file').change(e => {
      this.onUploadExcelFile(e, this)
    })
  },
  methods: {
    onAddElement() {
      this.addElementList.push({
        name: '',
        number: ''
      })
    },
    onSaveAddElement() {
      const elementList = this.addElementList.map(element => {
        return {
          ...element
        }
      })
      let exist = false
      this.productList.forEach(item => {
        if (item.name === this.settingProductName) {
          alert('请勿重复添加')
          exist = true
        }
      })
      if (!exist) {
        this.productList.push({
          name: this.settingProductName,
          elementList: elementList
        })
      }
      // console.log(this.productList)
      // 增加元件
      let set = new Set()
      let tempList = []
      this.elementList.forEach(item => {
        set.add(item.key)
        tempList.push(item)
      })
      this.addElementList.forEach(item => {
        if (!set.has(item.key)) {
          set.add(item.key)
          tempList.push(item)
        }
      })

      this.elementList = tempList
      // console.log(this.elementList)
      // 清空设置页
      this.addElementList = []
      this.settingProductName = ''
    }
  }
}
</script>
<style lang="scss">
// @import '@/assets/css/new-layout.scss';
</style>
