<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-3">
      <button class="btn btn-primary text-black" @click="openModel(true)">建立新的產品</button>
    </div>
    <table class="table mt-4 table-rwd">
      <thead>
        <th width="120">分類</th>
        <th width="220">ID</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td data-th="分類">{{ item.category }}</td>
          <td data-th="ID">{{ item.id }}</td>
          <td data-th="產品名稱">{{ item.title }}</td>
          <td data-th="原價" class>{{ item.origin_price | currency }}</td>
          <td data-th="售價" class>{{ item.price | currency }}</td>
          <td data-th="是否啟用">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td data-th="編輯" class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm text-black"
              @click="openModel(false, item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="delModel(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagin @postPage="getProducts" :getpagin="pagination"></Pagin>
    <!-- Modal -->
    <div
      class="modal fade modal-rwd"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title text-white" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid img-rwd"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-12 col-md-12 col-lg-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-sm-12 col-md-4 col-lg-4">
                    <label for="brand">品牌</label>
                    <select
                      class="custom-select custom-select-sm"
                      v-model="tempProduct.brand"
                      id="brand"
                    >
                      <option value="Apple">Apple</option>
                      <option value="ASUS">ASUS</option>
                      <option value="HTC">HTC</option>
                      <option value="小米">小米</option>
                    </select>
                  </div>
                  <div class="form-group col-sm-12 col-md-4 col-lg-4">
                    <label for="category">類別</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入類別"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-sm-12 col-md-4 col-lg-4">
                    <label for="spec">規格</label>
                    <input
                      type="text"
                      class="form-control"
                      id="spec"
                      placeholder="請輸入規格"
                      v-model="tempProduct.spec"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-sm-12 col-md-6 col-lg-3">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-sm-12 col-md-6 col-lg-3">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                  <div class="form-group col-sm-12 col-md-6 col-lg-3">
                    <label for="stock">可賣數量</label>
                    <input
                      type="number"
                      class="form-control"
                      id="stock"
                      placeholder="請輸入數量"
                      v-model="tempProduct.stock"
                    />
                  </div>
                  <div class="form-group col-sm-12 col-md-6 col-lg-3">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="content"
                      rows="1"
                      placeholder="請輸入產品說明內容"
                      v-model="tempProduct.content"
                    ></textarea>
                  </div>
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    rows="5"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-switch">
                    <input
                      class="custom-control-input align-middle"
                      type="checkbox"
                      id="is_enabled"
                      :true-value="1"
                      :false-value="0"
                      v-model="tempProduct.is_enabled"
                    />
                    <label class="custom-control-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除 -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagin from "@/components/Pagination.vue";

export default {
  components: {
    Pagin
  },
  data() {
    return {
      products: [], //用來儲存資料
      pagination: {}, //分頁
      tempProduct: {}, //綁定欄位資料
      isNew: false,
      status: {
        fileUploading: false
      },
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      //page 如未帶入數值，初始值=1
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`; //https://vue-course-api.hexschool.io/api/hans/products
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModel(isNew, item) {
      if (isNew) {
        //如果是新增產品
        this.tempProduct = {};
        this.isNew = true;
      } else {
        //不是新增產品
        this.tempProduct = Object.assign({}, item); //避免物件傳參考特性影響，先將item資料傳送到空物件再給tempProduct用
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    delProduct() {
      //刪除
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          //已刪除產品
          $("#delProductModal").modal("hide");
          vm.getProducts(); //重新取得畫面資料
          this.$bus.$emit("messsage:push", response.data.message, "success");
        } else {
          //找不到產品
          this.$bus.$emit("messsage:push", response.data.message, "danger");
        }
      });
    },
    delModel(item) {
      const vm = this;
      vm.tempProduct = item; //抓取item資料
      $("#delProductModal").modal("show");
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`; //https://vue-course-api.hexschool.io/api/hans/products
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        //不是新的時候，=修改
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      //將 tempProduct 的欄位資料放到data物件裡送出
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        if (response.data.success) {
          $("#productModal").modal("hide");
          this.$bus.$emit("messsage:push", response.data.message, "success");
          vm.getProducts();
        } else {
          //新增失敗
          $("#productModal").modal("hide");
          this.$bus.$emit("messsage:push", response.data.message, "danger");
          vm.getProducts();
        }
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0]; //取得上傳來源位置(本機)第 0 個
      const id = this.$refs.files.id;
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile); //將檔案加入指定file-to-upload名稱
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true; //上傳讀取動畫
      //上傳
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data" //表頭資訊-內容類型
          }
        })
        .then(response => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            //上傳成功
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl); //強制寫入圖片網址到vm.tempProduct裡面的imageUrl (雙向綁定)
            document.getElementById(id).value = ""; //將上傳檔案欄位中清空
          } else {
            //上傳失敗  $emit觸發意思
            this.$bus.$emit("messsage:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    //hook 用來觸發getProducts事件
    //直接觸發
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/all";
@include pad() {
  .img-rwd {
    width: 150px;
  }
}
@include m568() {
  .img-rwd {
    width: 100px;
  }
}

@media (max-width: 736px) {
  .table-rwd {
    min-width: 100%;
  }
  /*針對tr去做隱藏*/
  tr.tr-only-hide {
    display: none !important;
  }
  /*讓tr變成區塊主要讓他有個區塊*/
  thead {
    display: none;
  }
  .table-rwd tr {
    display: block;
    border: 1px solid #ddd;
    margin-top: 5px;
  }
  .table-rwd td {
    text-align: left;
    font-size: 15px;
    overflow: hidden;
    width: 100%;
    display: block;
  }
  .table-rwd td:before {
    /*最重要的就是這串*/
    content: attr(data-th) " : ";
    /*最重要的就是這串*/
    display: inline-block;
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 10px;
    color: #d20b2a;
  }
  /*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
  .table-rwd.table-bordered td,
  .table-rwd.table-bordered th,
  .table-rwd.table-bordered {
    border: 0;
  }
}
</style>