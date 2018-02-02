<template>  
  <liu-tree 
  :tree="model" 
  :is-editor="true" 
  :editor-text="'编辑模板'" 
  :editoring-text="'正在编辑'" 
  :axios-url="AxiosUrl" 
  @select="select" 
  ref="treeElement">
  </liu-tree>
</template>
<style lang="less">
@import "./less/bootstrap.less";

body {
  padding: 3rem;
  background-color: black;
}
</style>

<script>
var testTree = {
  Id: 14,
  classType: "test",
  name: "test",
  showName: "测试",
  parentId: 0,
  order: 1,
  namePath: "test/",
  showNamePath: "测试/",
  idPath: "14/",
  grandFather: 14,
  Child: [
    {
      Id: 15,
      classType: "test",
      name: "NiShiZhu",
      showName: "你是猪",
      parentId: 14,
      order: 2,
      namePath: "test/NiShiZhu/",
      showNamePath: "测试/你是猪/",
      idPath: "14/15/",
      grandFather: 14,
      Child: [
        {
          Id: 16,
          classType: "test",
          name: "NiBuShiZhu",
          showName: "你不是猪",
          parentId: 15,
          order: 3,
          namePath: "test/NiShiZhu/NiBuShiZhu/",
          showNamePath: "测试/你是猪/你不是猪/",
          idPath: "14/15/16/",
          grandFather: 14,
          Child: [
            {
              Id: 23,
              classType: "test",
              name: "AnShiFengDeng",
              showName: "暗室逢灯",
              parentId: 16,
              order: 4,
              namePath: "test/NiShiZhu/NiBuShiZhu/AnShiFengDeng/",
              showNamePath: "测试/你是猪/你不是猪/暗室逢灯/",
              idPath: "14/15/16/23/",
              grandFather: 14,
              Child: []
            },
            {
              Id: 24,
              classType: "test",
              name: "AnShiFengs",
              showName: "暗室逢s",
              parentId: 16,
              order: 5,
              namePath: "test/NiShiZhu/NiBuShiZhu/AnShiFengs/",
              showNamePath: "测试/你是猪/你不是猪/暗室逢s/",
              idPath: "14/15/16/24/",
              grandFather: 14,
              Child: []
            },
            {
              Id: 25,
              classType: "test",
              name: "AShiDunFaSiDiFen",
              showName: "阿什顿发斯蒂芬",
              parentId: 16,
              order: 6,
              namePath: "test/NiShiZhu/NiBuShiZhu/AShiDunFaSiDiFen/",
              showNamePath: "测试/你是猪/你不是猪/阿什顿发斯蒂芬/",
              idPath: "14/15/16/25/",
              grandFather: 14,
              Child: []
            },
            {
              Id: 26,
              classType: "test",
              name: "ASiDiFenDe",
              showName: "阿斯蒂芬的",
              parentId: 16,
              order: 7,
              namePath: "test/NiShiZhu/NiBuShiZhu/ASiDiFenDe/",
              showNamePath: "测试/你是猪/你不是猪/阿斯蒂芬的/",
              idPath: "14/15/16/26/",
              grandFather: 14,
              Child: []
            }
          ]
        }
      ]
    },
    {
      Id: 17,
      classType: "test",
      name: "WoJiuShiZhu",
      showName: "我就是猪",
      parentId: 14,
      order: 8,
      namePath: "test/WoJiuShiZhu/",
      showNamePath: "测试/我就是猪/",
      idPath: "14/17/",
      grandFather: 14,
      Child: []
    },
    {
      Id: 18,
      classType: "test",
      name: "WoShiGou",
      showName: "我是狗",
      parentId: 14,
      order: 9,
      namePath: "test/WoShiGou/",
      showNamePath: "测试/我是狗/",
      idPath: "14/18/",
      grandFather: 14,
      Child: [
        {
          Id: 19,
          classType: "test",
          name: "WoBuShiGou",
          showName: "我不是狗",
          parentId: 18,
          order: 10,
          namePath: "test/WoShiGou/WoBuShiGou/",
          showNamePath: "测试/我是狗/我不是狗/",
          idPath: "14/18/19/",
          grandFather: 14,
          Child: []
        }
      ]
    },
    {
      Id: 20,
      classType: "test",
      name: "NiShiDaHuaMao",
      showName: "你是大花猫",
      parentId: 14,
      order: 11,
      namePath: "test/NiShiDaHuaMao/",
      showNamePath: "测试/你是大花猫/",
      idPath: "14/20/",
      grandFather: 14,
      Child: [
        {
          Id: 21,
          classType: "test",
          name: "MiBu",
          showName: "弥补",
          parentId: 20,
          order: 12,
          namePath: "test/NiShiDaHuaMao/MiBu/",
          showNamePath: "测试/你是大花猫/弥补/",
          idPath: "14/20/21/",
          grandFather: 14,
          Child: [
            {
              Id: 22,
              classType: "test",
              name: "AnShiFengDeng",
              showName: "暗室逢灯",
              parentId: 21,
              order: 13,
              namePath: "test/NiShiDaHuaMao/MiBu/AnShiFengDeng/",
              showNamePath: "测试/你是大花猫/弥补/暗室逢灯/",
              idPath: "14/20/21/22/",
              grandFather: 14,
              Child: []
            }
          ]
        }
      ]
    }
  ]
};
import LiuTree from "./LiuTree.vue";
import LiuTreeItem from "./LiuTreeItem.vue";

export default {
  name: "app",
  components: {
    LiuTree,
    LiuTreeItem
  },
  data() {
    return {
      model: testTree,
      AxiosUrl: {
        UpdateMin: "http://www.nfwin.com/ClassManage/UpdateMin",
        DelMin: "http://www.nfwin.com/ClassManage/DelMin",
        Addmin: "http://www.nfwin.com/ClassManage/AddMin",
        GetPinyin: "http://www.nfwin.com/Min/GetPinyin"
      }
    };
  },
  mounted: function() {},
  methods: {
    select: function(select) {
      var self = this;
      self
        .$confirm("确认切换模板编辑？")
        .then(_ => {
          self.$refs.treeElement.trueSelect(select);
        })
        .catch(_ => {
          self.$refs.treeElement.falseSelect(select);
        });
    }
  }
};
</script>