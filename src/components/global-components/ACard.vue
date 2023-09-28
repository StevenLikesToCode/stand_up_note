<template>
  <div class="card" style="width: 25rem; height: 20rem">
    <div class="card-body">
      <h5 class="card-title" v-if="$slots.cardTitle"><slot name="cardTitle"></slot></h5>
      <h6 class="card-subtitle mb-2 text-muted" v-if="$slots.cardSubtitle">
        <slot name="cardSubtitle"></slot>
      </h6>
      <p class="card-text" v-if="$slots.cardText"><slot name="cardText"></slot></p>
    </div>
  </div>
</template>
