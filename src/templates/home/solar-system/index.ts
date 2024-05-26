import ThreePlanetsEarth from './planets/three-earth';
import ThreePlanetsMercury from './planets/three-mercury';
import ThreePlanetsSaturn from './planets/three-saturn';
import ThreePlanetsMoon from './planets/three-moon';
import ThreePlanetsVenus from './planets/three-venus';
import ThreePlanetsMars from './planets/three-mars';
import ThreePlanetsJupiter from './planets/three-jupiter';
import ThreePlanetsNeptune from './planets/three-neptune';
import ThreePlanetsUranus from './planets/three-uranus';
import planetsThumbs from './thumbs/planets-thumbs';
import ThreePlanetsSun from './planets/three-sun';
import ThreePlanetsTest from './planets/three-test';

export enum PlanetsKeys {
  sun = 'sun',
  earth = 'earth',
  mercury = 'mercury',
  saturn = 'saturn',
  moon = 'moon',
  venus = 'venus',
  mars = 'mars',
  jupiter = 'jupiter',
  uranus = 'uranus',
  neptune = 'neptune',
  test = 'test',
}

export const solarSystem = {
  [PlanetsKeys.earth]: {
    id: PlanetsKeys.earth,
    name: 'Earth',
    Planet: ThreePlanetsEarth,
    thumb: planetsThumbs.earth,
    atmosphere: true,
  },
  [PlanetsKeys.moon]: {
    id: PlanetsKeys.moon,
    name: 'Moon',
    Planet: ThreePlanetsMoon,
    thumb: planetsThumbs.moon,
    atmosphere: true,
  },
  [PlanetsKeys.mercury]: {
    id: PlanetsKeys.mercury,
    name: 'Mercury',
    Planet: ThreePlanetsMercury,
    thumb: planetsThumbs.mercury,
    atmosphere: true,
  },
  [PlanetsKeys.venus]: {
    id: PlanetsKeys.venus,
    name: 'Venus',
    Planet: ThreePlanetsVenus,
    thumb: planetsThumbs.venus,
    atmosphere: true,
  },
  [PlanetsKeys.mars]: {
    id: PlanetsKeys.mars,
    name: 'Mars',
    Planet: ThreePlanetsMars,
    thumb: planetsThumbs.mars,
    atmosphere: true,
  },
  [PlanetsKeys.saturn]: {
    id: PlanetsKeys.saturn,
    name: 'Saturn',
    Planet: ThreePlanetsSaturn,
    thumb: planetsThumbs.saturn,
    atmosphere: true,
  },
  [PlanetsKeys.jupiter]: {
    id: PlanetsKeys.jupiter,
    name: 'Jupiter',
    Planet: ThreePlanetsJupiter,
    thumb: planetsThumbs.jupiter,
    atmosphere: true,
  },
  [PlanetsKeys.uranus]: {
    id: PlanetsKeys.uranus,
    name: 'Uranus',
    Planet: ThreePlanetsUranus,
    thumb: planetsThumbs.uranus,
    atmosphere: true,
  },
  [PlanetsKeys.neptune]: {
    id: PlanetsKeys.neptune,
    name: 'Neptune',
    Planet: ThreePlanetsNeptune,
    thumb: planetsThumbs.neptune,
    atmosphere: true,
  },
  [PlanetsKeys.sun]: {
    id: PlanetsKeys.sun,
    name: 'Sun',
    Planet: ThreePlanetsSun,
    thumb: planetsThumbs.sun,
    atmosphere: false,
  },
  [PlanetsKeys.test]: {
    id: PlanetsKeys.test,
    name: 'Test',
    Planet: ThreePlanetsTest,
    thumb: planetsThumbs.test,
    atmosphere: false,
  },
};

export const solarSystemPlanets = [
  solarSystem[PlanetsKeys.earth],
  solarSystem[PlanetsKeys.sun],
  solarSystem[PlanetsKeys.moon],
  solarSystem[PlanetsKeys.mercury],
  solarSystem[PlanetsKeys.venus],
  solarSystem[PlanetsKeys.mars],
  solarSystem[PlanetsKeys.saturn],
  solarSystem[PlanetsKeys.jupiter],
  solarSystem[PlanetsKeys.uranus],
  solarSystem[PlanetsKeys.neptune],
  solarSystem[PlanetsKeys.test],
];
