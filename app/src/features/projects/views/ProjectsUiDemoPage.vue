<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { default as Input } from '@/components/ui/input/Input.vue'
import { default as Checkbox } from '@/components/ui/checkbox/Checkbox.vue'
import { Separator } from '@/components/ui/separator'
import { default as Skeleton } from '@/components/ui/skeleton/Skeleton.vue'
import { default as Card } from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import { default as Dialog } from '@/components/ui/dialog/Dialog.vue'
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue'
import { default as DatePicker } from '@/components/ui/date-picker/DatePicker.vue'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import DataTable from '@/components/ui/data-table/DataTable.vue'

const picked = ref<string | null>(null)
const loading = ref(true)
window.setTimeout(() => (loading.value = false), 600)
const checked = ref(false)
const name = ref('')
</script>

<template>
  <section class="mx-auto max-w-5xl p-4 space-y-10">
    <h1 class="text-2xl font-semibold tracking-tight">Projects UI Demo</h1>

    <!-- Buttons & Badges -->
    <div class="space-y-3">
      <h2 class="font-medium">Buttons & Badges</h2>
      <div class="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Badge>Badge</Badge>
      </div>
    </div>

    <Separator />

    <!-- Inputs -->
    <div class="space-y-3">
      <h2 class="font-medium">Inputs</h2>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="grid gap-1">
          <Label for="name">Name</Label>
          <Input id="name" v-model="name" placeholder="Project name" />
        </div>
        <div class="flex items-center gap-2 pt-6">
          <Checkbox id="check" v-model:checked="checked" />
          <Label for="check">Agree</Label>
        </div>
      </div>
    </div>

    <Separator />

    <!-- Accordion -->
    <div class="space-y-3">
      <h2 class="font-medium">Accordion</h2>
      <Accordion>
        <AccordionItem value="a1">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent> Lorem ipsum dolor sit amet. </AccordionContent>
        </AccordionItem>
        <AccordionItem value="a2">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionContent> Consectetur adipiscing elit. </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <Separator />

    <!-- Date Picker -->
    <div class="space-y-3">
      <h2 class="font-medium">Date Picker</h2>
      <DatePicker v-model="picked" />
      <div class="text-sm text-muted-foreground">Selected: {{ picked || 'none' }}</div>
    </div>

    <Separator />

    <!-- Dialog / Tooltip / Popover / Tabs in a Card -->
    <Card>
      <CardHeader>
        <CardTitle>Interactions</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sample Dialog</DialogTitle>
              </DialogHeader>
              <p class="text-sm text-muted-foreground">Works inside Projects demo.</p>
            </DialogContent>
          </Dialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip content</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>Popover content</PopoverContent>
          </Popover>
        </div>

        <Tabs default-value="one" class="w-full">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one" class="mt-3 text-sm text-muted-foreground">Tab one</TabsContent>
          <TabsContent value="two" class="mt-3 text-sm text-muted-foreground">Tab two</TabsContent>
        </Tabs>
      </CardContent>
    </Card>

    <Separator />

    <!-- Skeleton & Data Table -->
    <div class="space-y-3">
      <h2 class="font-medium">Skeleton & Data Table</h2>
      <div class="grid gap-2 sm:grid-cols-2">
        <div class="space-y-2">
          <div v-if="loading" class="space-y-2">
            <Skeleton class="h-6 w-40" />
            <Skeleton class="h-24 w-full" />
          </div>
          <div v-else>
            <div class="h-6 w-40 rounded-md bg-muted/40" />
            <p class="text-sm text-muted-foreground">Loaded content.</p>
          </div>
        </div>
      </div>
      <DataTable />
    </div>
  </section>
</template>
