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
    description: '',
    component: <GalaxiesSimulation />
  },
  {
    name: 'Solar System simulation',
    link: 'solar-system',
    description: '',
    component: <SolarSystemSimulation />
  },
  {
    name: 'World map projection',
    link: 'world-map',
    description: '',
    component: <WorldMap />
  },
  {
    name: 'Gis maps',
    link: 'gis-map',
    description: '',
    component: <GisMap />
  },
  {
    name: 'Stream simulation',
    link: 'stream',
    description: '',
    component: <CurrentSimulation />
  },
  {
    name: 'Game of life',
    link: 'life-1',
    description: '',
    component: <GameOfLife1 />
  },
  {
    name: 'Arcade games',
    link: 'arcade',
    description: '',
    component: <ArcadeGames />
  },
  {
    name: 'Nasa asteroids Api',
    link: 'nasa-asteroids',
    description: '',
    component: <NasaAsteroids/>
  },
  {
    name: 'Lissajaus',
    link: 'lissajaus',
    description: '',
    component: <Lissajaus />
  },
]

export default projects;