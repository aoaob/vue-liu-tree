<template>
  <li class="TreeItem" :class="{'dragIng':draging}">
      <div class="ItemUp" :class="{'dragEnter':dragenter}"></div>
      <div class="Item" 
            :draggable="isDrop"
            @dragstart='dragStart'
            @drag='drag'
            @dragend='dragEnd'
            @dragenter='dragEnter'
            @dragover='dragOver'
            @drop='drop'
            @dragleave='dragLeave'

            :class="{'dragIng':draging,'dragEnter':dragenter,'dragMove':dragmove,'ItemEdit':isEdit}">
          <div class="title" :title="tree.showName" @dblclick="gotoEdit">
              <template v-if="!isEdit">
                  {{tree.showName}}
              </template>
              <template v-if="isEdit">
                  <input v-model="tree.showName" v-focus @blur="edit" @keyup.enter="edit" />
              </template>
          </div>

          <i class="fa fa-remove RemoveMe" @click="RemoveMe" v-if="!isChild"></i>
          <i class="fa GotoAddChild" :class="{'fa-plus':!isShow,'fa-minus':isShow}" v-if="!isChild" @click="GotoAddChild"></i>
          <i class="fa OpenAndClose" :class="{'fa-minus-circle':isOpen,'fa-plus-circle':!isOpen}" @click="toggleOpen" v-if="isChild"></i>

          <i class="fa fa-angle-down godown" @click="down" v-show="tree.parentId>0&&indexinparent<(parent.Child.length-1)"></i>
          <i class="fa fa-angle-up goup" @click="up" v-show="tree.parentId>0&&indexinparent>0"></i>

      </div>
      <div v-if="isShow" :class="[{IsClose:!isOpen,IsClosed:isClosed,NoneBg:!isChild},classname]" >
          <ul class="Node" draggable="true">
              <liu-tree-item 
              v-for="item,index in tree.Child" 
              :classname="classname" :tree="item"
              :select="select"
              :key="item.Id"
              :indexinparent="index"
              :parent="tree" >
              </liu-tree-item>
              <li class="TreeItem TreeItemAdd">
                  <div class="Item" v-loading="isLoading">
                      <input placeholder="新分类" v-model="newItem" @keyup.enter="add" />
                  </div>
              </li>
          </ul>
      </div>
      <slot></slot>
  </li>
</template>
<script>
import Vue from "vue";
import axios from "axios";
// var loading = Element.Loading;
// Vue.component(Loading.name, loading);
export default {
  name: "LiuTreeItem",
  props: {
    classname: {
      type: String,
      default: "classname"
    },
    tree: {
      type: Object,
      default: { Child: [] }
    },
    select: {
      type: Number,
      default: 0
    },
    indexinparent: {
      type: Number,
      default: 0
    },
    parent: {
      type: Object,
      default: { Child: [] }
    }
  },
  inject: ["eventBus"],
  data: function() {
    return {
      newItem: "",
      isEdit: false,
      isLoading: false,
      isOpen: true,
      isClosed: false,
      gotoAddChild: false,
      draging: false,
      dragenter: false,
      dragmove: false
    };
  },
  computed: {
    isDrop: function() {
      return this.tree.parentId > 0 && this.isEdit == false;
    },
    isChild: function() {
      //return true;
      return this.tree.Child && this.tree.Child.length > 0;
    },
    isShow: function() {
      if (this.isChild || this.gotoAddChild) {
        return true;
      }
    }
  },
  methods: {
    // executeTree:function(tree,step){
    //   this.eventBus.$emit("executeTree",tree,step);
    // },
    // executeTreePost:function(){
    //   this.eventBus.$emit("executeTreePost");
    // },
    up: function() {
      if (this.indexinparent > 0) {
        var item = this.parent.Child[this.indexinparent];
        this.parent.Child.splice(this.indexinparent, 1);
        this.parent.Child.splice(this.indexinparent - 1, 0, item);

        this.eventBus.$emit("executeTree", null, 1);
        this.eventBus.$emit("executeTreePost");
      }
    },
    down: function() {
      if (this.indexinparent < this.parent.Child.length - 1) {
        var item = this.parent.Child[this.indexinparent];
        this.parent.Child.splice(this.indexinparent, 1);
        this.parent.Child.splice(this.indexinparent + 1, 0, item);

        this.eventBus.$emit("executeTree", null, 1);
        this.eventBus.$emit("executeTreePost");
      }
    },
    gotoEdit: function() {
      if (!this.isEdit) {
        this.isEdit = !this.isEdit;
      }
      return;
    },
    toggleOpen: function() {
      var self = this;
      if (!self.isOpen) {
        self.isOpen = !self.isOpen;
        self.isClosed = false;
      } else {
        self.isOpen = !self.isOpen;
        setTimeout(function() {
          self.isClosed = true;
        }, 300);
      }
      // $.cookie("class" + this.tree.Id, self.isOpen, { expires: 7, path: "/" });
      // console.log(
      //   "class" + this.tree.Id + ": " + $.cookie("class" + this.tree.Id)
      // );
    },
    RemoveMe: function() {
      // vm.removeMe(vm.tree, this.tree.Id);
      this.eventBus.$emit("removeMe", null, this.tree.Id);
    },
    GotoAddChild: function() {
      this.gotoAddChild = !this.gotoAddChild;
    },
    add: function() {
      this.eventBus.$emit("addNewItem", this);
    },
    edit: function() {
      this.isEdit = false;
      this.eventBus.$emit("executeTree", null, 1);
      this.eventBus.$emit("executeTreePost");
    },
    //拖拽事件
    dragStart: function(e) {
      //ondragstart：源对象开始被拖动
      this.draging = true;
      this.dragmove = true;
      e.dataTransfer.effectAllowed = "copy";

      this.eventBus.$emit("setCacheModelfrom", this.tree, this.$parent.tree);
      this.eventBus.$emit("addLog","dragStart");
      this.$message({
         message: '开始拖动，找到可放下的位置'
      });
    },
    drag: function(e) {
      //ondrag：源对象被拖动过程中(鼠标可能在移动也可能未移动)
      this.draging = true;
      this.dragmove = true;
      e.dataTransfer.effectAllowed = "move";
      this.eventBus.$emit("setCacheModelfrom", this.tree, this.$parent.tree);
      this.eventBus.$emit("addLog","drag");
    },
    dragEnd: function(e) {
      //ondragend：源对象被拖动结束
      this.draging = false;
      this.dragmove = false;
      this.eventBus.$emit("addLog","dragEnd");
    },
    //目标事件
    dragEnter: function(e) {
      //ondragenter：目标对象被源对象拖动着进入
      this.dragenter = true;
      this.eventBus.$emit("setCacheModelover", this.tree);
      this.eventBus.$emit("addLog","dragEnter");
    },
    dragOver: function(e) {
      //ondragover：目标对象被源对象拖动着悬停在上方
      this.dragenter = true;
      e.preventDefault();
      this.eventBus.$emit("setCacheModelover", this.tree);
      return true;
    },
    dragLeave: function(e) {
      //ondragleave：源对象拖动着离开了目标对象
      this.dragenter = false;
      this.eventBus.$emit("setCacheModelleveal", this.tree);
      this.eventBus.$emit("setCacheModelover", null);
      this.eventBus.$emit("addLog","dragLeave");
    },
    drop: function(e) {
      //ondrop：源对象拖动着在目标对象上方释放/松手
      this.dragenter = false;
      this.eventBus.$emit("setCacheModelto", this.tree,this.$parent.tree);
      // this.eventBus.$emit("addLog","drop "+vm.CacheModel.from.Id+" to "+vm.CacheModel.to.Id);
      this.eventBus.$emit("move");
    }
  },
  mounted: function() {}
};
</script>