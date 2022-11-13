<template>
    <div class='block-serve-button'>
        <p class='block-serve'>
        <button class="serve-button" @click="onClick()">พร้อมเสิร์ฟ</button>
        </p>
    </div>
</template>
<script>
export default {
    props: ['onClick']
}
</script>
<style>
.block-serve-button {
    width: 400px;
    height: 70px;
    gap: 15px;
    border-radius: 16px;;
    background: var( --md-sys-color-secondary-container);
}
.serve-button {
    width: 90px;
    height: 40px;
    background: var( --md-sys-color-primary);
    color: var( --md-sys-color-on-primary);

    /* outline */
    border-radius: 100px;
}

.block-serve {
    gap: 16px;
    padding: 16px 26px;

}

@media screen and (max-width: 768px) {
  .block-serve-button {
    width: 300px;
    height: 70px;
    gap: 15px;
    border-radius: 16px;;
    background: var( --md-sys-color-secondary-container);
  }
}
</style>
