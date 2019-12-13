<template>
    <div>       
        <Navbar/>
        <alert/>         
        <div class="container-fluid">
            <div class="row">   
                <!-- <Sidebar/> -->
                <main role="main" class="col-md ml-sm-auto col-lg px-4">
                
                    <router-view></router-view>
                
                </main>
            </div>
        </div>
    </div>
</template>

<script>
// import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import Alert from '../components/AlertMsg.vue';


export default {
    
    components:{
        // Sidebar,
        Navbar,
        Alert,
        
    },
};
</script>

<style lang="scss" scoped>

</style>