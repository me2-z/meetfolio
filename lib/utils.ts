import { detectGPU } from 'detect-gpu';

export async function detectQualityTier(): Promise<'low' | 'medium' | 'high'> {
  try {
    const gpuInfo = await detectGPU();
    
    if (!gpuInfo?.tier) {
      return 'medium';
    }

    if (gpuInfo.tier <= 2) {
      return 'low';
    } else if (gpuInfo.tier <= 4) {
      return 'medium';
    } else {
      return 'high';
    }
  } catch {
    return 'medium';
  }
}

export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

export function damp(current: number, target: number, lambda: number, dt: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}
