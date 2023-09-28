<template>
  <main>
  <h2>Standup Log</h2>
    <div class="container">
      <div class="d-flex justify-content-center">
        <!-- <VueDatePicker
          v-model="date"
          class="date_picker w-25 mx-5"
          format="dd/MM/yyyy"
        ></VueDatePicker> -->
      </div>
      <div class="call-outs">
        <h3>Call Outs:</h3>
        <ul>
          <li v-for="(entry, index) in entries" :key="index">
            <span v-if="Array.isArray(entry.callOut)">
              <strong>{{ entry.name }}:</strong>
              <ul>
                <li v-for="(callOutItem, callOutIndex) in entry.callOut" :key="callOutIndex">
                  {{ callOutItem }}
                </li>
              </ul>
            </span>
            <span v-else-if="entry.callOut">
              <strong>{{ entry.name }}:</strong> {{ entry.callOut }}
            </span>
          </li>
        </ul>
      </div>

        <!-- Accordion -->
      <div v-for="(entry, index) in entries" :key="index">
        <Accordion :entries="entry" :id="index">
          <template #accName>{{ entry.name }}</template>
          <template #accContent>
            <Journal :entryText="entry.note" />
          </template>
          <template #accCallOut>
            <!-- Check if callOut is an array -->
            <h5 class="call-out-title">Call Out</h5>
            <div v-if="entry.callOut == ''">
              <div class="call-out-info" @click="edit_call_out">
                  <AEditor 
                  :modelValue="callOutItem"
                  :placeholder="'Please input a call out.'"
                  />
                  <div class="resolve-button-container">
                    <button class="resolve-button"  @click="resolveCallOut(index, callOutIndex)">resolve</button>
                  </div>
              </div>
            </div>
            <div v-else-if="Array.isArray(entry.callOut)" class="call-out-title">
              <!-- Loop through each item in the callOut array -->
              <div v-for="(callOutItem, callOutIndex) in entry.callOut" :key="callOutIndex" class="call-out-container">
                <div class="call-out-info" @click="edit_call_out">
                   <AEditor :modelValue="callOutItem"/>
                </div>
                <div class="call-out-date">21/09/2023</div>
                <div class="resolve-button-container">
                  <button class="resolve-button"  @click="resolveCallOut(index, callOutIndex)">resolve</button>
                </div>
              </div>
            </div>
            <!-- Check if callOut is a string with line breaks -->
            <div v-else-if="entry.callOut">
              <!-- Split the string by line breaks -->
              <div v-for="(line, lineIndex) in entry.callOut.split('\n')" :key="lineIndex" class="call-out-container">
                <div class="call-out-info">
                  <AEditor :modelValue="line" />
                </div>
                <div class="call-out-date">21/09/2023</div>
                <div class="resolve-button-container">
                  <button class="resolve-button"  @click="resolveCallOut(index, callOutIndex)">resolve</button>
                </div>
              </div>
            </div>
          </template>
        </Accordion>
      </div>
    </div>
  </main>
</template>

<script>
import Accordion from "../components/global-components/Accordion.vue";
import Journal from "../components/journal/journal.vue";
import AModal from "../components/global-components/AModal.vue";
import ACard from "../components/global-components/ACard.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { format, startOfDay } from "date-fns";
import "@vuepic/vue-datepicker/dist/main.css";
import Dropdowns from "../components/global-components/Dropdowns.vue";
import AEditor from "../components/global-components/AEditor.vue";
export default {
  components: {
    Journal,
    Accordion,
    AModal,
    ACard,
    VueDatePicker,
    Dropdowns,
    AEditor
},
  data() {
    return {
      clickedCallOutText: '',
      date: startOfDay(new Date()),
      entries: [
        {
          name: "Brad Carletti",
          date: "14/09/2023",
          note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          callOut: [
            "Dev server was crushed."
          ],
          callOutDate: "18/09/2023"
        },
        {
          name: "Mirko Dukic",
          date: "14/09/2023",
          note: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          callOut: [
            "A critical bug was identified in the latest software release.",
            "The development team is actively working on a fix and will deploy it ASAP"
          ],
        },
        {
          name: "Josie Han",
          date: "14/09/2023",
          note: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          callOut: [
            "Performance issue detected on the live site.",
            "Server downtime reported during peak traffic hours.",
            "Found a critical bug in the production code.",
          ],
          // callOutDate:"21/09/2023"
        },
        {
          name: "Sam Tudman",
          date: "14/09/2023",
          note: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          callOut: [
            "Users reported slow performance on our web application. ",
            "Our performance testing team is analyzing the issue to optimize response times. "
          ],
        },
        {
          name: "Steven Chen",
          date: "14/09/2023",
          note: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          callOut: [
            "Security vulnerability identified in user authentication."
          ],
        },
        {
          name: "Loredana Lo Surdo",
          date: "14/09/2023",
          note: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          callOut: [
            "Database connection failure in the staging environment."
          ]
        },
        {
          name: "Andrew Tieu",
          date: "14/09/2023",
          note: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          callOut: [
            "A new feature request came in from our customer support team. ",
            "We need to discuss its feasibility and prioritize it in the backlog."
          ]
        }
      ]
    };
  },
  methods: {
    edit_call_out(){
      // alert("hello");

    },
    resolveCallOut(entryIndex, callOutIndex) {
      this.entries[entryIndex].callOut.splice(callOutIndex, 1);
    },

  },
};
</script>

<style scoped>
.call-out-title{
  color: rgba(0, 163, 173, 1);
}
.call-out-date{
  margin-right: 1rem;
}
.resolve-button {
  /* margin: 4px; */
  background-color: rgba(0, 163, 173, 1); 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  transition: background-color 0.3s ease;
}

.resolve-button:hover {
  background-color: rgba(0, 143, 153, 1); 
}

.call-out-container {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}

.call-out-container:hover{
  background-color: rgb(217, 226, 218);
  transition: background-color 0.4s ease
}

.call-out-info {
  flex-grow: 1; 
  text-align: left;
}

.resolve-button-container {
  text-align: right;
}

h2 {
  margin-top: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  color:rgba(0, 163, 173, 1);
  font-size: 2rem;
}

.container {
  margin: 0 auto;
  width: 100%;
  padding: 10px;
}

#plus-circle {
  height: 100px;
  margin-top: 100px;
  filter: opacity(0.3);
  pointer-events: none;
}

.entryCard {
  cursor: pointer;
  overflow: hidden;
}

.entryCard:hover {
  overflow: auto;
  background-color: whitesmoke;
}

.call-outs {
  margin-top: 20px; /* Add some top margin for separation */
  border: 1px solid #ccc;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.call-outs h3 {
  font-size: 1.5rem;
  color: #333;
}

.call-outs ul {
  list-style: none;
  padding: 0;
}

.call-outs li {
  margin-bottom: 10px;
}

.call-outs strong {
  font-weight: bold;
  color: #007aae;
}

.call-outs ul li ul {
  list-style: disc;
  margin-left: 20px;
}

.call-outs ul li ul li {
  margin-top: 5px;
  margin-bottom: 5px;
}

/* Add some spacing and styling to the "Not Call Out" message */
.call-outs span[style="display: none;"] {
  font-style: italic;
  color: #888;
}

.call-outs span[style="display: none;"]::before {
  content: "Not Call Out: ";
}

</style>