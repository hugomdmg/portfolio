import ArcadeGames from "../app/projects/arcade-games/arcade-games";
import GameOfLife1 from "../app/projects/game-life/game-life-1";
import GisMap from "../app/projects/gis/gis-map";
import WorldMap from "../app/projects/world-map/world-map";
import Lissajaus from "../app/projects/lissajaus/lissajaus";
import NasaAsteroids from "../app/projects/nasa-asteroids/nasa-asteroids";
import SolarSystemSimulation from "../app/projects/solar-system-simulation/solar-system-simulation";
import GalaxiesSimulation from "../app/projects/galaxies-simulation/galaxies-simulation";
import CurrentSimulation from "../app/projects/current-simulation/App";
const projects = [
  {
    name: 'Galaxies simulation',
    link: 'galaxies',
    description: 'In this simulation two galaxies that interact gravitationally with each other are represented. You can change their sizes and relative movement to see the different results.',
    component: <GalaxiesSimulation />
  },
  {
    name: 'Solar System simulation',
    link: 'solar-system',
    description: 'A simulation between planets. At the moment you can see the Earth, the Moon and a third satellite orbiting the Moon',
    component: <SolarSystemSimulation />
  },
  {
    name: 'World map projection',
    link: 'world-map',
    description: 'On Earth maps, countries appear distorted, looking larger toward the poles. Here you can move the projection to see how the countries would look at different latitudes',
    component: <WorldMap />
  },
  {
    name: 'Gis maps',
    link: 'gis-map',
    description: 'It processes altimetry lidar data to generate altitude maps. The program accepts .csv format, you can download some examples to see the results.',
    component: <GisMap />
  },
  {
    name: 'Stream simulation',
    link: 'stream',
    description: 'Small challenge of making a current that hits an object (not true to reality)',
    component: <CurrentSimulation />
  },
  {
    name: 'Game of life',
    link: 'life-1',
    description: 'Conways game of life. Each point survives one dies depending on the state of the points around it',
    component: <GameOfLife1 />
  },
  {
    name: 'Arcade games',
    link: 'arcade',
    description: 'Some arcade games',
    component: <ArcadeGames />
  },
  {
    name: 'Nasa asteroids Api',
    link: 'nasa-asteroids',
    description: 'It asks the NASA API for the asteroids discovered for a given date, and shows you the largest one discovered for that date. You can see the data of all asteroids and compare them in size with some cities',
    component: <NasaAsteroids/>
  },
  {
    name: 'Lissajaus',
    link: 'lissajaus',
    description: 'When two waves interfere, characteristic patterns are generated in the vertical plane between them. Enter the amplitudes of two waves and their phase difference, and see the resulting pattern (Lissajaus figure)',
    component: <Lissajaus />
  },
]

export default projects;