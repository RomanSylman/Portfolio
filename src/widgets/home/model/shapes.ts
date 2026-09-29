import {
  BoxGeometry,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from "three";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";

const PARTICLE_COUNT = 4000;

const material = new MeshBasicMaterial();

function sample(
  geometry: BoxGeometry | SphereGeometry | TorusGeometry | IcosahedronGeometry,
) {
  const mesh = new Mesh(geometry, material);
  const sampler = new MeshSurfaceSampler(mesh).build();
  const points = new Float32Array(PARTICLE_COUNT * 3);
  const point = new Vector3();

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    sampler.sample(point);
    points[index * 3] = point.x;
    points[index * 3 + 1] = point.y;
    points[index * 3 + 2] = point.z;
  }

  geometry.dispose();
  return points;
}

function wavePlane() {
  const points = new Float32Array(PARTICLE_COUNT * 3);
  const columns = Math.ceil(Math.sqrt(PARTICLE_COUNT));

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = (column / (columns - 1) - 0.5) * 5;
    const y = (row / (columns - 1) - 0.5) * 3.2;
    points[index * 3] = x;
    points[index * 3 + 1] = Math.sin(x * 1.6) * 0.45;
    points[index * 3 + 2] = y * 0.35;
  }

  return points;
}

function spiral() {
  const points = new Float32Array(PARTICLE_COUNT * 3);
  const turns = 4;

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const t = index / PARTICLE_COUNT;
    const angle = t * Math.PI * 2 * turns;
    const radius = 0.3 + t * 1.7;
    points[index * 3] = Math.cos(angle) * radius;
    points[index * 3 + 1] = (t - 0.5) * 4;
    points[index * 3 + 2] = Math.sin(angle) * radius;
  }

  return points;
}

let cached: Float32Array[] | null = null;

export function getShapeTargets() {
  cached ??= [
    sample(new SphereGeometry(1.7, 64, 64)),
    sample(new TorusGeometry(1.3, 0.45, 32, 96)),
    sample(new BoxGeometry(2.6, 2.6, 2.6, 12, 12, 12)),
    spiral(),
    wavePlane(),
    sample(new IcosahedronGeometry(1.8, 2)),
  ];
  return cached;
}

export { PARTICLE_COUNT };
