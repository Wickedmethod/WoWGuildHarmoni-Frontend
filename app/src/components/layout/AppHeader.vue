<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Sun, Moon } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { useUiStore } from '@/stores/ui.store';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

// header nav
const ui = useUiStore();
</script>

<template>
  <header
    class="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
      <!-- Brand -->
      <RouterLink to="/" class="font-semibold hover:text-primary">Harmoni</RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden sm:flex items-center gap-4 text-sm font-medium">
        <RouterLink v-slot="{ href, navigate, isActive }" custom to="/">
          <a
            :href="href"
            :class="['px-2', isActive ? 'text-primary font-semibold' : 'hover:text-primary']"
            @click="navigate"
          >
            {{ $t('nav.home') }}
          </a>
        </RouterLink>
        <RouterLink v-slot="{ href, navigate, isActive }" custom to="/about">
          <a
            :href="href"
            :class="['px-2', isActive ? 'text-primary font-semibold' : 'hover:text-primary']"
            @click="navigate"
          >
            {{ $t('nav.about') }}
          </a>
        </RouterLink>
        <RouterLink v-slot="{ href, navigate, route }" custom to="/projects">
          <a
            :href="href"
            :class="[
              'px-2',
              route.path === '/projects' ? 'text-primary font-semibold' : 'hover:text-primary',
            ]"
            @click="navigate"
          >
            {{ $t('nav.projects') }}
          </a>
        </RouterLink>
        <RouterLink v-slot="{ href, navigate, isActive }" custom to="/forum">
          <RouterLink to="/roster" class="px-2 hover:text-primary">{{
            $t('nav.roster')
          }}</RouterLink>
          <RouterLink to="/events" class="px-2 hover:text-primary">{{
            $t('nav.events')
          }}</RouterLink>
          <RouterLink to="/recruitment" class="px-2 hover:text-primary">{{
            $t('nav.recruitment')
          }}</RouterLink>
          <a
            :href="href"
            :class="['px-2', isActive ? 'text-primary font-semibold' : 'hover:text-primary']"
            @click="navigate"
          >
            {{ $t('nav.forum') }}
          </a>
        </RouterLink>

        <!-- Navigation Menu (shadcn-vue) -->
        <NavigationMenu class="ml-2">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{{ $t('nav.showcase') }}</NavigationMenuTrigger>
              <NavigationMenuContent class="w-[320px]">
                <div class="grid gap-1 p-2">
                  <NavigationMenuLink as-child>
                    <RouterLink to="/showcase" class="rounded px-2 py-2 hover:bg-accent/40">
                      {{ $t('nav.files') }}
                    </RouterLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <RouterLink v-slot="{ href, navigate, isActive }" custom to="/components">
                      <a
                        :href="href"
                        :class="[
                          'rounded px-2 py-2 hover:bg-accent/40',
                          isActive ? 'bg-accent/60 text-primary' : '',
                        ]"
                        @click="navigate"
                      >
                        {{ $t('nav.components') }}
                      </a>
                    </RouterLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <RouterLink v-slot="{ href, navigate, isActive }" custom to="/projects/ui-demo">
                      <a
                        :href="href"
                        :class="[
                          'rounded px-2 py-2 hover:bg-accent/40',
                          isActive ? 'bg-accent/60 text-primary' : '',
                        ]"
                        @click="navigate"
                      >
                        {{ $t('nav.projectsUiDemo') }}
                      </a>
                    </RouterLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <a
                      href="https://vuejs.org"
                      target="_blank"
                      class="rounded px-2 py-2 hover:bg-accent/40"
                    >
                      Vue Docs
                    </a>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <!-- Desktop: preferences -->
        <div class="ml-2 flex items-center gap-3 pl-3 border-l">
          <!-- Theme toggle (light/dark) -->
          <Button
            variant="ghost"
            size="icon"
            :aria-label="$t('theme.label') as string"
            @click="ui.theme = ui.theme === 'dark' ? 'light' : 'dark'"
          >
            <Sun class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon
              class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">{{ $t('theme.label') }}</span>
          </Button>

          <!-- Language select -->
          <label class="sr-only" for="lang-select">{{ $t('lang.label') }}</label>
          <select
            id="lang-select"
            v-model="ui.locale as any"
            class="border rounded-md px-2 py-1 bg-background text-foreground"
          >
            <option value="en">{{ $t('lang.en') }}</option>
            <option value="es">{{ $t('lang.es') }}</option>
            <option value="da">{{ $t('lang.da') }}</option>
          </select>
        </div>
      </nav>

      <!-- Mobile burger as Sheet (drawer) -->
      <div class="sm:hidden">
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" aria-label="Open menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" class="w-[85vw] sm:w-80">
            <SheetHeader>
              <SheetTitle>{{ $t('nav.menu') }}</SheetTitle>
            </SheetHeader>
            <div class="py-2">
              <nav class="grid gap-1">
                <SheetClose as-child>
                  <RouterLink
                    to="/"
                    class="px-4 py-3 text-base rounded-md hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                  >
                    <NavigationMenuLink as-child>
                      <RouterLink to="/roster" class="rounded px-2 py-2 hover:bg-accent/40">
                        {{ $t('nav.roster') }}
                      </RouterLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <RouterLink to="/events" class="rounded px-2 py-2 hover:bg-accent/40">
                        {{ $t('nav.events') }}
                      </RouterLink>
                    </NavigationMenuLink>
                    <NavigationMenuLink as-child>
                      <RouterLink to="/recruitment" class="rounded px-2 py-2 hover:bg-accent/40">
                        {{ $t('nav.recruitment') }}
                      </RouterLink>
                    </NavigationMenuLink>
                    {{ $t('nav.home') }}
                  </RouterLink>
                </SheetClose>
                <SheetClose as-child>
                  <RouterLink
                    to="/about"
                    class="px-4 py-3 text-base rounded-md hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                  >
                    {{ $t('nav.about') }}
                  </RouterLink>
                </SheetClose>
                <SheetClose as-child>
                  <RouterLink
                    to="/projects"
                    class="px-4 py-3 text-base rounded-md hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                  >
                    {{ $t('nav.projects') }}
                  </RouterLink>
                </SheetClose>
                <SheetClose as-child>
                  <RouterLink
                    to="/forum"
                    class="px-4 py-3 text-base rounded-md hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                  >
                    {{ $t('nav.forum') }}
                  </RouterLink>
                </SheetClose>
                <SheetClose as-child>
                  <RouterLink
                    to="/roster"
                    class="px-4 py-3 text-base rounded-md hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                  >
                    {{ $t('nav.roster') }}
                  </RouterLink>
                </SheetClose>
                <SheetClose as-child>
                  <RouterLink
                    to="/events"
                    class="px-4 py-3 text-base rounded-md hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                  >
                    {{ $t('nav.events') }}
                  </RouterLink>
                </SheetClose>
                <SheetClose as-child>
                  <RouterLink
                    to="/recruitment"
                    class="px-4 py-3 text-base rounded-md hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                  >
                    {{ $t('nav.recruitment') }}
                  </RouterLink>
                </SheetClose>
                <div class="px-1 pt-3">
                  <div class="text-xs text-muted-foreground mb-2 px-3">
                    {{ $t('nav.showcase') }}
                  </div>
                  <div class="grid gap-1">
                    <SheetClose as-child>
                      <RouterLink
                        to="/showcase"
                        class="px-4 py-3 rounded-md text-left hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                      >
                        {{ $t('nav.files') }}
                      </RouterLink>
                    </SheetClose>
                    <SheetClose as-child>
                      <RouterLink
                        to="/components"
                        class="px-4 py-3 rounded-md text-left hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                      >
                        {{ $t('nav.components') }}
                      </RouterLink>
                    </SheetClose>
                    <SheetClose as-child>
                      <RouterLink
                        v-slot="{ href, navigate, isActive }"
                        custom
                        to="/projects/ui-demo"
                      >
                        <a
                          :href="href"
                          :class="[
                            'px-4 py-3 rounded-md text-left hover:bg-accent/40 focus-visible:ring-0 focus:outline-none',
                            isActive ? 'bg-accent/60 text-primary' : '',
                          ]"
                          @click="navigate"
                        >
                          {{ $t('nav.projectsUiDemo') }}
                        </a>
                      </RouterLink>
                    </SheetClose>
                    <a
                      href="https://vuejs.org"
                      target="_blank"
                      class="px-4 py-3 rounded-md hover:bg-accent/40 focus-visible:ring-0 focus:outline-none"
                      >Vue Docs</a
                    >
                  </div>
                </div>
                <!-- Mobile: preferences -->
                <div class="px-1 pt-4">
                  <div class="text-xs text-muted-foreground mb-2 px-3">
                    {{ $t('theme.label') }} / {{ $t('lang.label') }}
                  </div>
                  <div class="grid gap-3 px-3">
                    <div class="flex items-center justify-between">
                      <span class="text-sm">{{ $t('theme.label') }}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        :aria-label="$t('theme.label') as string"
                        @click="ui.theme = ui.theme === 'dark' ? 'light' : 'dark'"
                      >
                        <Sun
                          class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        />
                        <Moon
                          class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        />
                        <span class="sr-only">{{ $t('theme.label') }}</span>
                      </Button>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                      <span class="text-sm">{{ $t('lang.label') }}</span>
                      <select
                        v-model="ui.locale as any"
                        class="border rounded-md px-2 py-1 bg-background text-foreground"
                      >
                        <option value="en">{{ $t('lang.en') }}</option>
                        <option value="es">{{ $t('lang.es') }}</option>
                        <option value="da">{{ $t('lang.da') }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <SheetFooter class="p-4 pt-0">
              <SheetClose as-child>
                <Button class="w-full" variant="secondary">{{ $t('nav.close') }}</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
