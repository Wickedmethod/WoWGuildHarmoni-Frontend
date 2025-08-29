<script setup lang="ts">
import { computed } from 'vue';
import type { DateValue } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
import { DatePickerRoot, DatePickerTrigger, DatePickerContent, DatePickerCalendar } from 'reka-ui';
import {
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarGrid,
  CalendarGridHead,
  CalendarGridBody,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarCell,
  CalendarCellTrigger,
} from '@/components/ui/calendar';

const model = defineModel<string | null>({ default: null });
defineProps<{ class?: string }>();

// Bridge the external string model (YYYY-MM-DD) to Reka UI's DateValue
const dateValue = computed<DateValue | undefined>({
  get() {
    return model.value ? parseDate(model.value) : undefined;
  },
  set(v) {
    model.value = v ? v.toString() : null;
  },
});
</script>

<template>
  <DatePickerRoot v-model="dateValue">
    <DatePickerTrigger as-child>
      <button
        type="button"
        :class="[
          'inline-flex w-[240px] items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm',
          'bg-background hover:bg-accent/30 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          $props.class,
        ]"
      >
        <span class="truncate text-foreground">{{ model || 'Pick a date' }}</span>
        <svg
          class="h-4 w-4 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>
    </DatePickerTrigger>
    <DatePickerContent class="z-50 rounded-md border bg-popover p-2 shadow-md">
      <DatePickerCalendar v-slot="{ grid, weekDays }">
        <CalendarHeader>
          <CalendarHeading />

          <div class="flex items-center gap-1">
            <CalendarPrevButton />
            <CalendarNextButton />
          </div>
        </CalendarHeader>

        <div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
          <CalendarGrid v-for="month in grid" :key="month.value.toString()">
            <CalendarGridHead>
              <CalendarGridRow>
                <CalendarHeadCell v-for="day in weekDays" :key="day">{{ day }}</CalendarHeadCell>
              </CalendarGridRow>
            </CalendarGridHead>
            <CalendarGridBody>
              <CalendarGridRow
                v-for="(weekDates, index) in month.rows"
                :key="`weekDate-${index}`"
                class="mt-2 w-full"
              >
                <CalendarCell
                  v-for="weekDate in weekDates"
                  :key="weekDate.toString()"
                  :date="weekDate"
                >
                  <CalendarCellTrigger :day="weekDate" :month="month.value" />
                </CalendarCell>
              </CalendarGridRow>
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      </DatePickerCalendar>
    </DatePickerContent>
  </DatePickerRoot>
</template>
