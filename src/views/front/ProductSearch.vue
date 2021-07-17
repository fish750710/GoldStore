<template>
  <div>
    <div class="h4 my-5 pt-5 text-info d-flex justify-content-center">
      <span class>搜尋結果：</span>
      <span v-if="products.length === 0">很抱歉，找不到您想要的商品</span>
    </div>
    <div class="mt-4">
      <div class="row col-lg-12">
        <div
          class="col-xl-3 col-md-4 col-sm-6 mb-4 item-hover"
          v-for="item in products"
          :key="item.id"
        >
          <div class="card border-0 shadow-sm" v-if="item.is_enabled != 0">
            <a href="#" @click.prevent="goDetail(item.id)">
              <div
                style="height: 200px; background-size: 60%; background-repeat: no-repeat; background-position: center"
                :style="{backgroundImage: `url(${item.imageUrl})`}"
              ></div>
            </a>
            <div >
              <a href="#" v-if="item.is_favorite">
                 <i
                  class="fas fa-heart text-danger position-absolute"
                  @click.prevent="removeFavorite(item)"
                  style="top:20px;right:20px; font-size:20px"
                ></i>
              </a>
              <a href="#" v-else>
                <i
                  class="far fa-heart text-danger position-absolute"
                  @click.prevent="addFavorite(item)"
                  style="top:20px;right:20px; font-size:20px"
                ></i>
              </a>
            </div>
            <div class="card-body pt-2 pb-2" style="min-height:130px">
              <h5 class="h6 card-title mb-1" style="min-height:58px">
                <a
                  href="#"
                  class="text-dark font-weight-bold text-decoration-none"
                  @click.prevent="goDetail(item.id)"
                >{{ item.title }}</a>
              </h5>
              <div class="d-flex justify-content-between" style="height:25px">
                <p class="card-text text-info font-weight-bold">{{ item.content }}</p>
                <div>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="h7" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5 text-danger font-weight-bold" v-if="item.price">特價 {{ item.price }} 元</div>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-sm col-12 cart-move"
              @click="addtoCartMerge(item.id)"
              style="border-top-left-radius:0px ; border-top-right-radius:0px "
              :disabled="item.id ===loadingItem"
            >
              <i class="fas fa-spinner fa-pulse text-black" v-if="item.id === loadingItem"></i>
              <i class="fas fa-cart-plus text-black" v-else></i>
              <span class="ml-4 text-black">加到購物車</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex' //, mapActions

export default {
  components: {},
  data () {
    return {
    }
  },
  methods: {
    // 加入購物車(新增前先判斷購物車是否有重複資料，如有先刪除後新增)
    addtoCartMerge (id, qty = 1) {
      this.$store.dispatch('addtoCartMerge', { id, qty })
      $('#productModal').modal('hide')
    },
    getCategory (page) {
      // 取商品資料
      this.$store.dispatch('getProducts', page)
    },
    goDetail (id) {
      this.$router.push(`/detail/${id}`).catch(err => (err))
    },
    // 加入我的最愛
    addFavorite (item) {
      this.$store.dispatch('addFavorite', item)
    },
    // 移除我的最愛
    removeFavorite (item) {
      this.$store.dispatch('removefavorite', item)
    }
  },

  computed: {
    ...mapGetters(['products', 'myfavorite', 'loadingItem'])
  },
  mounted () {
    // 從frontNavbar傳來
    this.$bus.$on('search', () => {
      this.getCategory()
    })
  },
  created () {
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/all";

.item-hover > div:hover {
  box-shadow: 5px 5px 10px rgba(227, 219, 208, 0.5);
}

.cart-move {
  width: 100%;
  transition: all 0.3s;

  &:hover i {
    transform: translate(22px, 0);
    transition: transform 0.3s linear;
    color: $primary;
  }
  &:hover span {
    color: $secondary;
  }
}
</style>
