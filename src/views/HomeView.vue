<template>

  <Suspense>
    <template #default>

      <div class="px-4 pt-4 pb-[5rem] md:pb-14 lg:px-6">

        <Carousel 
          v-if="spotlightAnimes.length > 0"
          #default="{ currentSlide }" 
          :slides="spotlightAnimes.length"
          class="relative md:flex-grow" 
        >
          <Slide v-for="anime, index in spotlightAnimes" :key="index">
            <AnimeSlide
              v-show="currentSlide === index"
              class="absolute inset-0 w-full h-full max-h-[100%]"
              :rank="anime.rank" :id="anime.id"
              :name="anime.name" :poster="anime.poster"
              :description="anime.description"
              :category="'Spotlight'"
            />
          </Slide>
        </Carousel>

        <TrendingAnimeDeck
          class="mt-12 xl:mt-12"
          :animes="trendingAnimes"
        />

        <section class="xl:flex md:gap-10 flex-grow pt-12 max-w-full w-full">
          
          <div class="w-full flex-[70%] 2xl:flex-[75%]">
            <AnimeDeck
              class="flex-auto"
              :animes="latestEpisodeAnimes"
              :name="'Latest Episode'"
              :href="'recently-updated'"
            />
            
            <AnimeDeck
              class="flex-auto mt-12"
              :animes="topUpcomingAnimes"
              :name="'Top Upcoming'"
              :href="'top-upcoming'"
            />
          </div>

          <div class="flex-[35%] 2xl:flex-[25%] mb-auto mx-auto mt-3">

            <FeatAnimeDeck
              class="mt-8 w-full"
              :name="'Top Airing Animes'"
              :href="'top-airing'"
              :animes="topAiringAnimes"
            />

            <GenreDeck
              :genres="genres"
              :length="genres.length"
              class="mt-8"
            />

            <MostViewedDeck
              class="mt-8"
              :all-animes="mostViewedAnimes"
            />

          </div>

        </section>

      </div>

    </template>

    <template #fallback>
      <h1>LOADING</h1>
    </template>
  </Suspense>

</template>

<script setup>
import { ref } from 'vue';
import Carousel from '@/components/home/Carousel.vue';
import Slide from '@/components/home/Slide.vue';
import AnimeSlide from '@/components/home/AnimeSlide.vue';
import TrendingAnimeDeck from '@/components/home/TrendingAnimeDeck.vue';
import AnimeDeck from '@/components/AnimeDeck.vue';
import FeatAnimeDeck from '@/components/home/FeatAnimeDeck.vue';
import GenreDeck from '@/components/home/GenreDeck.vue';
import MostViewedDeck from '@/components/home/MostViewedDeck.vue';
import AnimeAPI from '@/services/animeAPI';


const spotlightAnimes = ref([]);
const trendingAnimes = ref([]);
const topUpcomingAnimes = ref([]);
const topAiringAnimes = ref([]);
const latestEpisodeAnimes = ref([]);
const mostViewedAnimes = ref({});
const genres = ref([]);


const getData = async () => {
  try {
    const { data } = await AnimeAPI.getHome();

    spotlightAnimes.value = data.spotlightAnimes;
    trendingAnimes.value = data.trendingAnimes;
    topUpcomingAnimes.value = data.topUpcomingAnimes;
    topAiringAnimes.value = data.topAiringAnimes;
    latestEpisodeAnimes.value = data.latestEpisodeAnimes;
    mostViewedAnimes.value = data.mostViewedAnimes;
    genres.value = data.genres;

  } catch (err) {
    console.log(err.response.status)
  }
}

getData();


</script>
