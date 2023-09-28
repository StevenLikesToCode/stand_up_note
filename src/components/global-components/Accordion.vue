<template>
    <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse' + id" aria-expanded="false" aria-controls="flush-collapse">
                <slot name="accName"></slot>
            </button>
            </h2>
            <div :id="'flush-collapse' + id" class="accordion-collapse collapse" aria-labelledby="flush-heading" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div>
                        <slot name="accContent"></slot>
                    </div>
                    <div class="callOut">
                        <slot name="accCallOut" ></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        entries: Array,
        id: Number,
    },
};
</script>

<style>
    .callOut{
        height: auto;
        background-color: rgb(237, 247, 247);
    }
</style>