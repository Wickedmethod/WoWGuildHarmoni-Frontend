<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';

import { useUiStore } from '@/stores/ui.store';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { default as Card } from '@/components/ui/card/Card.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Tabs from '@/components/ui/tabs/Tabs.vue';
import TabsList from '@/components/ui/tabs/TabsList.vue';
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue';
import TabsContent from '@/components/ui/tabs/TabsContent.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue';

const ui = useUiStore();
const { t } = useI18n({ useScope: 'global' });
</script>

<template>
  <section class="mx-auto max-w-5xl p-6 flex flex-col items-center gap-8">
    <Toaster />

    <h1 class="text-3xl font-bold tracking-tight">{{ t('title') }}</h1>
    <p class="text-muted-foreground">{{ t('subtitle') }}</p>

    <div class="flex gap-3 items-center">
      <!-- Theme controls -->
      <span class="text-sm text-muted-foreground">{{ t('theme.label') }}:</span>
      <Button variant="outline" @click="ui.theme = 'light'">{{ t('theme.light') }}</Button>
      <Button variant="outline" @click="ui.theme = 'dark'">{{ t('theme.dark') }}</Button>
      <Button variant="outline" @click="ui.theme = 'system'">{{ t('theme.system') }}</Button>

      <!-- Language select -->
      <span class="ml-4 text-sm text-muted-foreground">{{ t('lang.label') }}:</span>
      <select
        v-model="ui.locale as any"
        class="border rounded-md px-2 py-1 bg-background text-foreground"
      >
        <option value="en">{{ t('lang.en') }}</option>
        <option value="es">{{ t('lang.es') }}</option>
  <option value="da">{{ t('lang.da') }}</option>
      </select>
    </div>

    <div class="flex gap-3">
      <Button
        @click="() => toast('Hello from Sonner!', { description: 'Everything is wired up.' })"
      >
        {{ t('buttons.showToast') }}
      </Button>

      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">{{ t('buttons.openDialog') }}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ t('dialog.title') }}</DialogTitle>
          </DialogHeader>
          <p class="text-sm text-muted-foreground">{{ t('dialog.text') }}</p>
        </DialogContent>
      </Dialog>
    </div>

    <Card class="max-w-md w-full">
      <CardHeader>
        <CardTitle>{{ t('card.title') }}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs default-value="account" class="w-full">
          <TabsList>
            <TabsTrigger value="account">{{ t('tabs.account') }}</TabsTrigger>
            <TabsTrigger value="password">{{ t('tabs.password') }}</TabsTrigger>
          </TabsList>
          <TabsContent value="account" class="mt-4">
            <p class="text-sm text-muted-foreground">Account tab content.</p>
          </TabsContent>
          <TabsContent value="password" class="mt-4">
            <p class="text-sm text-muted-foreground">Password tab content.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </section>
</template>
