<template>
  <div id="app">
    <div style="display: flex; justify-content: space-between;margin-bottom: 20px">
      <!-- <el-button type="primary" @click="saveConfig">保存配置</el-button> -->
      <!-- <el-button @click="test" type="primary">测试</el-button> -->

      <!-- <span style="color: red">注意：使用后，请务必点击左侧“保存配置”按钮</span> -->
      <div style="display: inline-block;float: right;margin-right: 20px">
        <el-popover placement="top-start" title="使用说明" width="600" trigger="hover">
          <p>
            步骤一：在“设置”选项卡中，输入产品名称，如：电动车充电器5V1A
            <br>
            步骤二：点击“选择文件”按钮，选择需要上传的excel文件。即可自动生成物料明细
            <br>
            步骤三：也可以点击“增加元器件”按钮来手动添加元器件
            <br>
            步骤四：点击“保存”按钮。
            <br>
            步骤四：点击上方“物料计算”选项卡，切换到计算物料数量页面
            <br>
            步骤五：点击“添加产品”按钮，选择需要生产的产品。并输入产品数量。然后点击“计算”按钮
            <br>
            步骤六：点击“下载”按钮，将生成的物料清单下载到电脑
          </p>
          <el-button slot="reference">使用说明</el-button>
        </el-popover>
      </div>
    </div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="设置" name="setting">
        <span slot="label"><i class="el-icon-s-tools" /> 设置</span>
        <div style="background: rgb(160, 207, 255);text-align:center;">新增产品</div>
        <div style="background: rgb(217, 236, 255);padding: 0 20px">
          <div style="padding-top: 10px">
            <span>产品名称 :</span>
            <el-input v-model="settingProductName" placeholder="请输入产品名称...如：充电器5V1A" style="width:50%" />
          </div>
        </div>
        <div style="margin:20px 0">
          <el-button type="primary" plain @click="onAddElement">增加元器件</el-button>
          <input id="excel-file" ref="refExcelFile" type="file">
          <el-button type="primary" plain @click="onSaveAddElement">保存</el-button>
        </div>
        <el-table :data="addElementList" border style="width: 100%;">
          <el-table-column type="index" width="50" />
          <el-table-column label="元件名称">
            <template slot-scope="scope">
              <el-autocomplete
                v-model="scope.row.name"
                class="inline-input"
                :fetch-suggestions="querySearchElement"
                placeholder="请输入所需元件名称"
                style="width:80%"
                @select="handleSelectElement"
              />
            </template>
          </el-table-column>
          <el-table-column label="元件封装/规格">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pack" placeholder="元件封装/规格" style="width:80%" />
            </template>
          </el-table-column>
          <el-table-column label="元件数值">
            <template slot-scope="scope">
              <el-input v-model="scope.row.model" placeholder="元件数值" style="width:80%" />
            </template>
          </el-table-column>
          <el-table-column label="元件数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.number" placeholder="所需元件数量" style="width:80%" />
            </template>
          </el-table-column>
          <!-- <el-table-column label="元件位置">
            <template slot-scope="scope">
              <el-input v-model="scope.row.location" placeholder="元件位置" style="width:80%" />
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="onDeletEditElement(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="background: rgb(160, 207, 255);;text-align:center;">产品列表</div>
        <el-table :data="productList" border style="width: 100%;">
          <el-table-column type="index" width="50" />
          <el-table-column label="产品名称" prop="name" />
          <el-table-column label="物料信息" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ formatElementList(scope) }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="onDeleteProduct(scope)">删除</el-button>
              <el-button @click="onVieMaterielDetail(scope)">物料详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="`${curProduct}-物料详情`" :visible.sync="showMaterielDetail">
          <el-table :data="curMaterielDetail">
            <el-table-column label="元件名称" prop="name" />
            <el-table-column label="封装/规格" prop="pack" />
            <el-table-column label="数值" prop="model" />
            <el-table-column label="位置" prop="location" />
            <el-table-column label="数量" prop="number" />
          </el-table>
        </el-dialog>
        <div style="background: rgb(160, 207, 255);text-align:center;">元件列表</div>
        <el-table :data="elementList" border style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column label="元件名称" prop="name" />
          <el-table-column label="封装/规格" prop="pack" />
          <el-table-column label="数值" prop="model" />
          <!-- <el-table-column label="位置" prop="location"> </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="onDeleteElement(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="物料计算" name="calculate">
        <span slot="label"><i class="el-icon-edit-outline" />物料计算</span>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column fixed="right" label="产品名称">
            <template slot-scope="scope">
              <el-select v-model="scope.row.name" placeholder="请选择产品名称" @change="selectChange">
                <el-option v-for="product in productList" :key="product.name" :label="product.name" :value="product.name" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.number" placeholder="请输入产品数量" />
            </template>
          </el-table-column>
        </el-table>
        <div style="margin:20px 0">
          <el-button type="primary" plain @click="onAddProduct">添加产品</el-button>
          <el-button type="primary" plain @click="onCalculate">计算</el-button>
          <el-button type="primary" style="float: right" @click="onDownLoad">下载</el-button>
        </div>

        <el-table :data="showTableData" border style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column label="元件名称" prop="name" />
          <el-table-column label="封装/规格" prop="pack" />
          <el-table-column label="数值" prop="model" />
          <!-- <el-table-column label="位置" prop="location" /> -->
          <el-table-column label="需求数量" prop="number" />
        </el-table>

        <!-- <el-table :data="showTableData" border style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column label="元件名称" prop="elementName" />
          <el-table-column label="元件数量" prop="elementNumber" />
        </el-table> -->
      </el-tab-pane>

      <el-tab-pane label="库存统计" name="productStock">
        <span slot="label"><i class="el-icon-office-building" />产品库存</span>
        <span>敬请期待</span>
      </el-tab-pane>

      <el-tab-pane label="物料库存" name="materielStock">
        <span slot="label"><i class="el-icon-s-data" />物料库存</span>
        <span>敬请期待</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import XLSX from 'xlsx'

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      result: {},
      activeName: 'setting',
      showMaterielDetail: false,
      curMaterielDetail: [],
      curProduct: '',
      settingProductName: '',
      tableData: [],
      // tableData: [{
      // name: '充电器',
      // number: '20'
      // },
      // {
      // name: '电池',
      // number: '20'
      // }],
      addElementList: [],
      productList: [],
      elementList: [],
      elementType: ['电阻', '电路板', '场管', '二极管', '三极管', 'pcb', 'PCB', '电容', '变压器'],
      // productList: [{
      //   name: '充电器',
      //   elementList: []
      // }, {
      //   name: '电池',
      //   elementList: []
      // }],
      showTableData: []
    }
  },
  mounted() {
    this.productList = []
    this.elementList = []
    // this.productList = CONFIG.productList || []
    // this.elementList = CONFIG.elementList || []
    this.$('#excel-file').change(e => {
      this.onUploadExcelFile(e, this)
    })
    this.getProductList()
  },
  methods: {
    getProductList() {
      this.API.getProductList().then(res => {
        const data = res.data
        this.productList = Object.keys(data).map(key => {
          return {
            name: key,
            elementList: JSON.parse(data[key])
          }
        })
        console.log(this.productList)
      })
    },
    onDownLoad() {
      // console.log(this.showTableData)
      this.tableToExcel(this.showTableData)
    },
    tableToExcel(outData) {
      // 要导出的json数据
      const jsonData = outData
      // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `name,pack,model,number\n`
      let arr = ['name', 'pack', 'model', 'number']
      // 增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < jsonData.length; i++) {
        arr.forEach(key => {
          str += `${jsonData[i][key] || '###' + '\t'},`
        })
        str += '\n'
      }
      // encodeURIComponent解决中文乱码
      const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
      // 通过创建a标签实现
      const link = document.createElement('a')
      link.href = uri
      // 对下载的文件命名
      link.download = 'json数据表.csv'
      link.click()
    },
    formatElementList(scope) {
      const elementList = scope.row.elementList
      let res = ''
      elementList.forEach(item => {
        res = res + item.key + ':' + item.number + '个  .  '
      })
      return res
    },
    selectChange() {
      // console.log(this.tableData)
    },
    handleClick(tab, event) {
    },
    onAddElement() {
      this.addElementList.push({
        name: '',
        number: ''
      })
    },
    onDeletEditElement(scope) {
      const index = scope.$index
      this.addElementList.splice(index, 1)
    },
    onSaveAddElement() {
      if (!this.settingProductName) {
        this.$message.error('请输入产品名称')
        return
      }
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
      this.API.saveProduct({
        productName: this.settingProductName,
        elementList: this.elementList
      }).then(res => {
        this.getProductList()
        // 清空设置页
        this.addElementList = []
        this.settingProductName = ''
      })
    },
    onUploadExcelFile(e, _this) {
      var files = e.target.files
      var fileReader = new FileReader()
      fileReader.onload = function(ev) {
        try {
          var data = ev.target.result
          var workbook = XLSX.read(data, {
            type: 'binary'
          }) // 以二进制流方式读取得到整份excel表格对象
          var persons = [] // 存储获取到的数据
        } catch (e) {
          console.log('文件类型不正确')
          return
        }
        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = ''
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workbook.Sheets[sheet]['!ref']
            // console.log(fromTo);
            persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            break // 如果只取第一张表，就取消注释这行
          }
        }
        // 在控制台打印出来表格中的数据
        // console.log(persons)
        // this.addElementList = persons
        _this.handleResult(persons)
      }
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0])
    },
    handleResult(result) {
      // location  model  name  number  pack
      const addElementList = result.map(item => {
        const name = item.name && item.name.replace(/ /g, '').trim()
        const pack = item.pack && item.pack.replace(/ /g, '').trim()
        const model = item.model && (item.model + '').replace(/ /g, '').trim()
        const number = item.number && (item.number + '').replace(/ /g, '').trim()
        const key = name + pack + model
        return {
          name,
          pack,
          model,
          number,
          key
          // location: item.location
        }
      })
      this.addElementList = addElementList
      // console.log(JSON.stringify(result))
    },

    onAddProduct() {
      this.tableData.push({
        name: '',
        number: ''
      })
    },
    onCalculate() {
      // productMap = {'充电器'： 20}
      this.result = {}
      const productMap = {}
      this.tableData.forEach(item => {
        // console.log(item)
        productMap[item.name] = item.number
      })
      this.tableData.forEach(item => {
        let product = {}
        this.productList.forEach(pro => {
          if (pro.name === item.name) {
            product = pro
          }
        })
        this.sum(product, productMap[item.name])
      })
    },
    sum(product, number) {
      // console.log(product)
      // console.log(number)

      const elementList = product.elementList

      elementList.forEach(element => {
        // 如果元件存在
        if (this.result[element.key]) {
          const temp = 1 * this.result[element.key].number
          this.result[element.key] = { ...element }
          this.result[element.key].number = temp + Number(number) * Number(element.number)
        } else {
          const temp = Number(number) * Number(element.number)
          this.result[element.key] = { ...element }
          this.result[element.key].number = Number(number) * Number(element.number)
        }
      })
      // console.log('result+++++++++')
      // console.log(this.result)
      let showTableData = []
      Object.keys(this.result).map(item => {
        if (this.result[item] && this.result[item] !== 0) {
          showTableData.push({
            name: this.result[item].name,
            number: this.result[item].number,
            key: this.result[item].key,
            pack: this.result[item].pack,
            model: this.result[item].model
            // location: this.result[item].location,
          })
        }
      })
      this.showTableData = showTableData
    },
    onDeleteProduct(scope) {
      const productName = scope.row.name
      this.API.deleteProduct({ productName }).then(() => {
        this.getProductList()
        const index = scope.$index
        this.productList.splice(index, 1)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    onDeleteElement(scope) {
      const index = scope.$index
      this.elementList.splice(index, 1)
    },
    onVieMaterielDetail(scope) {
      const index = scope.$index
      this.showMaterielDetail = true
      this.curMaterielDetail = this.productList[index].elementList
      // console.log(this.curMaterielDetail)
      this.curProduct = this.productList[index].name
    },
    querySearchElement(queryString, cb) {
      var elements = this.elementList
      elements.forEach(item => {
        item.value = item.name
      })
      // console.log(elements)
      var results = queryString ? elements.filter(this.createFilter(queryString)) : elements
      // console.log(results)
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelectElement() {

    },
    saveJSON(data, filename) {
      if (!data) {
        alert('保存的数据为空')
        return
      }
      if (!filename) { filename = 'json.json' }
      if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 4)
      }
      var blob = new Blob([data], { type: 'text/json' })
      var e = document.createEvent('MouseEvents')
      var a = document.createElement('a')
      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
    // saveConfig() {
    //   const json = JSON.stringify({
    //     productList: this.productList,
    //     elementList: this.elementList
    //   })
    //   const config = `config(${json})`
    //   this.saveJSON(config, 'config.json')
    // }
  }
}
</script>

<style lang="scss">
.el-table td, .el-table th.is-leaf{
  background: rgb(217, 236, 255);
}
// 公用样式
.svg {
  position: relative;
  top: -4px;
}
</style>
